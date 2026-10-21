import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { capturePage } from "../src/capture.js";
import {
  sanitizeArticle,
  safeHttpURL,
  CONTENT_LIMITS,
} from "../src/content.js";

const paragraph =
  "叶笺让读过的好文章变成可随身携带的 Markdown 笔记。这个项目不会把网页发送到云端，而是在浏览器本地完成正文识别、阅读和导出。你可以保留标题、段落、代码和表格，稍后再搜索整理这些资料。";

function page(
  body,
  url = "https://example.com/articles/local?token=secret#section",
) {
  return new JSDOM(
    `<!doctype html><html lang="zh-CN"><head><title>本地阅读笔记</title><meta name="author" content="叶笺作者"><meta property="article:published_time" content="2026-10-21T08:00:00Z"></head><body>${body}</body></html>`,
    { url },
  );
}

test("extracts a Chinese article without changing the original page", () => {
  const dom = page(
    `<nav>分类 账号 设置</nav><article><h1>本地阅读笔记</h1><p>${paragraph}</p><p>${paragraph}</p><h2>使用方式</h2><p>${paragraph}</p></article><footer>版权信息</footer>`,
  );
  const before = dom.window.document.documentElement.outerHTML;
  const note = capturePage(dom.window.document);
  assert.equal(note.mode, "article");
  assert.equal(note.url, "https://example.com/articles/local");
  assert.equal(note.lang, "zh-CN");
  assert.equal(note.author, "叶笺作者");
  assert.equal(note.publishedTime, "2026-10-21T08:00:00.000Z");
  assert.ok(note.markdown.includes(paragraph));
  assert.ok(note.wordCount > 150);
  assert.ok(note.minutes >= 1);
  assert.equal(dom.window.document.documentElement.outerHTML, before);
  dom.window.close();
});

test("a selection takes precedence over the rest of the article", () => {
  const dom = page(
    `<article><p>${paragraph}</p><p id="chosen">只需要收藏这段已经选中的中文文字。</p><p>这一段不应出现在采集结果中。</p></article>`,
  );
  const range = dom.window.document.createRange();
  range.selectNodeContents(dom.window.document.getElementById("chosen"));
  dom.window.getSelection().addRange(range);
  const note = capturePage(dom.window.document);
  assert.equal(note.mode, "selection");
  assert.equal(note.textContent, "只需要收藏这段已经选中的中文文字。");
  assert.ok(!note.markdown.includes("不应出现在"));
  dom.window.close();
});

test("sanitizer drops active content, external resources, forms and clobbering attributes", () => {
  const dom = page("");
  const clean = sanitizeArticle(
    `<article id="__proto__" onclick="evil()"><p style="background:url(https://evil.example/pixel)">安全正文<strong>加粗</strong></p><script>stealSecrets()</script><iframe src="https://evil.example"></iframe><img src="https://evil.example/pixel"><svg><a href="javascript:evil()">bad</a></svg><form name="attributes"><input value="private"><p>private draft</p></form><p contenteditable>unsaved draft</p><a id="constructor" name="document" href="javascript:evil()" onmouseover="evil()">危险链接的文字</a></article>`,
    "https://example.com/base/",
    dom.window.document,
  );
  assert.ok(clean.includes("<strong>加粗</strong>"));
  assert.ok(clean.includes("危险链接的文字"));
  assert.ok(
    !/script|iframe|img|svg|form|input|contenteditable|onclick|onmouseover|style=|id=|name=|javascript:|private|unsaved|evil\.example/i.test(
      clean,
    ),
  );
  dom.window.close();
});

test("normalizes relative HTTP links and removes query secrets and credentials", () => {
  const dom = page("");
  const clean = sanitizeArticle(
    '<p><a href="../guide?access_token=secret&amp;q=term#top">指南</a><a href="https://user:password@other.example/a?token=x">外部</a><a href="data:text/html,evil">数据链接</a></p>',
    "https://example.com/articles/read",
    dom.window.document,
  );
  assert.ok(clean.includes('href="https://example.com/guide"'));
  assert.ok(clean.includes('href="https://other.example/a"'));
  assert.ok(!/access_token|password|secret|data:|#top/.test(clean));
  assert.equal(safeHttpURL("ftp://example.com/file"), "");
  assert.equal(
    safeHttpURL("https://name:secret@example.com/x?q=private#hash"),
    "https://example.com/x",
  );
  dom.window.close();
});

test("preserves headings, code fences, lists and GFM tables in Markdown", () => {
  const dom = page(
    `<article id="chosen"><h2>代码示例</h2><p>${paragraph}</p><pre><code class="language-js">const value = 42;\nconsole.log(value);</code></pre><ul><li>本地保存</li><li>导出笔记</li></ul><table><thead><tr><th>项目</th><th>支持</th></tr></thead><tbody><tr><td>Markdown</td><td>是</td></tr></tbody></table></article>`,
  );
  const range = dom.window.document.createRange();
  range.selectNodeContents(dom.window.document.getElementById("chosen"));
  dom.window.getSelection().addRange(range);
  const note = capturePage(dom.window.document);
  assert.match(note.markdown, /## 代码示例/);
  assert.match(
    note.markdown,
    /```js\nconst value = 42;\nconsole\.log\(value\);\n```/,
  );
  assert.match(note.markdown, /-\s+本地保存/);
  assert.match(note.markdown, /\| 项目 \| 支持 \|/);
  assert.match(note.markdown, /\| Markdown \| 是 \|/);
  dom.window.close();
});

test("rejects unsupported pages, tiny selections and excessive content", () => {
  const unsupported = page(
    `<article><p>${paragraph}</p></article>`,
    "file:///private/note.html",
  );
  assert.throws(() => capturePage(unsupported.window.document), /HTTP/);
  unsupported.window.close();
  const tiny = page('<p id="chosen">短文</p>');
  const range = tiny.window.document.createRange();
  range.selectNodeContents(tiny.window.document.getElementById("chosen"));
  tiny.window.getSelection().addRange(range);
  assert.throws(() => capturePage(tiny.window.document), /8 个字符/);
  assert.throws(
    () =>
      sanitizeArticle(
        "x".repeat(CONTENT_LIMITS.inputHTML + 1),
        "https://example.com",
        tiny.window.document,
      ),
    /正文过长/,
  );
  tiny.window.close();
});

test("does not capture private editable text", () => {
  const dom = page(
    '<div contenteditable="true" id="chosen">这里是一段尚未发布的私人草稿。</div>',
  );
  const range = dom.window.document.createRange();
  range.selectNodeContents(dom.window.document.getElementById("chosen"));
  dom.window.getSelection().addRange(range);
  assert.throws(() => capturePage(dom.window.document), /可编辑区域/);
  dom.window.close();
});

test("literal HTML in page text remains inert in Markdown while code stays exact", () => {
  const dom = page(
    '<article id="chosen"><p>例子中的标签只是文字：&lt;img src="https://evil.example/pixel"&gt; &lt;script&gt;alert(1)&lt;/script&gt;</p><pre><code class="language-html">&lt;strong&gt;代码中的标签&lt;/strong&gt;</code></pre></article>',
  );
  const range = dom.window.document.createRange();
  range.selectNodeContents(dom.window.document.getElementById("chosen"));
  dom.window.getSelection().addRange(range);
  const note = capturePage(dom.window.document);
  assert.ok(note.markdown.includes("&lt;img"));
  assert.ok(note.markdown.includes("&lt;script&gt;"));
  assert.ok(!note.markdown.includes("<img"));
  assert.match(note.markdown, /```html\n<strong>代码中的标签<\/strong>\n```/);
  dom.window.close();
});

test("selected relative links use the page base URL", () => {
  const dom = page(
    '<article><p id="chosen">阅读这份<a href="start.html?token=secret#top">入门指南</a>，可以了解更多本地笔记的使用方法。</p></article>',
    "https://example.com/app/index.html",
  );
  const base = dom.window.document.createElement("base");
  base.href = "https://example.com/docs/";
  dom.window.document.head.appendChild(base);
  const range = dom.window.document.createRange();
  range.selectNodeContents(dom.window.document.getElementById("chosen"));
  dom.window.getSelection().addRange(range);
  assert.match(
    capturePage(dom.window.document).markdown,
    /\[入门指南\]\(https:\/\/example\.com\/docs\/start\.html\)/,
  );
  dom.window.close();
});

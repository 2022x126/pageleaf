import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import {
  BACKUP_LIMITS,
  MAX_BACKUP_BYTES,
  createBackup,
  parseBackup,
  planImport,
} from "../src/backup.js";

function note(overrides = {}) {
  return {
    id: "note-1",
    title: "备份测试",
    url: "https://example.com/article",
    siteName: "示例站",
    author: "作者",
    excerpt: "正文摘录",
    lang: "zh-CN",
    publishedTime: "",
    content:
      '<h2>正文标题</h2><p>这是需要保存的正文与自己的理解。</p><pre><code class="language-js">const x = "&lt;img&gt;";</code></pre>',
    markdown: "旧 Markdown 应重新生成",
    textContent: "旧正文缓存",
    note: "我的想法 **重点**",
    wordCount: 25,
    minutes: 1,
    capturedAt: "2026-10-21T08:00:00.000Z",
    updatedAt: "2026-10-21T09:00:00.000Z",
    mode: "article",
    warnings: [],
    ...overrides,
  };
}
const document = () =>
  new JSDOM("<!doctype html><html><body><p>现有页面</p></body></html>", {
    url: "https://reader.example/",
  }).window.document;
function envelope(notes) {
  return JSON.stringify({
    format: "pageleaf-backup",
    version: 1,
    exportedAt: "2026-10-21T10:00:00Z",
    notes,
  });
}

test("backup round trip retains only saved note fields and rebuilds derived content", () => {
  const item = note({
    apiKey: "not-for-export",
    account: { email: "private@example.test" },
    settings: { dark: true },
  });
  const backup = createBackup([item]);
  assert.equal(JSON.parse(backup).format, "pageleaf-backup");
  assert.ok(
    !backup.includes("not-for-export") &&
      !backup.includes("private@example.test") &&
      !backup.includes('"settings"'),
  );
  const { notes, warnings } = parseBackup(backup, document());
  assert.equal(notes[0].id, item.id);
  assert.equal(notes[0].note, item.note);
  assert.match(notes[0].markdown, /^## 正文标题/);
  assert.match(notes[0].markdown, /```js\nconst x = "<img>";/);
  assert.match(notes[0].textContent, /这是需要保存/);
  assert.ok(notes[0].wordCount > 0);
  assert.ok(Array.isArray(warnings));
});

test("import strips active HTML, remote resources, dangerous URLs and query secrets without changing the current document", () => {
  const doc = document();
  const before = doc.documentElement.outerHTML;
  const dangerous = note({
    url: "https://user:pass@example.com/article?token=private#position",
    content:
      '<script>globalThis.pwned=true</script><img src="https://evil.test/pixel"><iframe src="https://evil.test"></iframe><p id="save" onclick="bad()">正文 &lt;img src="https://evil.test/literal"&gt; <a href="javascript:bad()">危险</a> <a href="/next?secret=abc#part">正常</a></p>',
    markdown:
      '<img src="https://evil.test/imported-markdown">[evil](javascript:bad())',
  });
  const { notes, warnings } = parseBackup(envelope([dangerous]), doc);
  assert.equal(notes[0].url, "https://example.com/article");
  assert.ok(!/<(?:script|img|iframe)|\sonclick=|\sid=/.test(notes[0].content));
  assert.match(notes[0].content, /href="https:\/\/example.com\/next"/);
  assert.ok(
    !notes[0].content.includes("javascript:") &&
      !notes[0].content.includes("secret=") &&
      !notes[0].content.includes("pass"),
  );
  assert.ok(
    !/<img/.test(notes[0].markdown) &&
      !notes[0].markdown.includes("javascript:"),
  );
  assert.ok(!notes[0].markdown.includes("imported-markdown"));
  assert.ok(warnings.length > 0);
  assert.equal(doc.documentElement.outerHTML, before);
});

test("unknown and prototype-related keys cannot escape the explicit note whitelist", () => {
  const raw = envelope([note()]).replace(
    '"id":"note-1"',
    '"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"id":"note-1"',
  );
  const imported = parseBackup(raw, document()).notes[0];
  assert.equal(Object.hasOwn(imported, "__proto__"), false);
  assert.equal(Object.hasOwn(imported, "constructor"), false);
  assert.equal({}.polluted, undefined);
});

test("invalid envelope, field types, dates, duplicate IDs and empty sanitized articles fail the entire import", () => {
  assert.throws(() => parseBackup("not JSON", document()), /JSON/);
  assert.throws(
    () =>
      parseBackup(
        JSON.stringify({ format: "other", version: 1, notes: [] }),
        document(),
      ),
    /格式|版本/,
  );
  assert.throws(
    () => parseBackup(envelope([note({ note: { text: "bad" } })]), document()),
    /note/,
  );
  assert.throws(
    () => parseBackup(envelope([note({ title: "x".repeat(201) })]), document()),
    /title/,
  );
  assert.throws(
    () =>
      parseBackup(
        envelope([note({ capturedAt: "2026-02-30T00:00:00Z" })]),
        document(),
      ),
    /日期/,
  );
  assert.throws(
    () => parseBackup(envelope([note({ updatedAt: "tomorrow" })]), document()),
    /日期/,
  );
  assert.throws(
    () => parseBackup(envelope([note(), note()]), document()),
    /重复笔记 ID/,
  );
  assert.throws(
    () => parseBackup(envelope([note({ id: "../unsafe" })]), document()),
    /ID/,
  );
  assert.throws(
    () =>
      parseBackup(
        envelope([note({ content: "<script>only script</script>" })]),
        document(),
      ),
    /正文/,
  );
});

test("metadata controls are removed while personal Markdown notes are preserved", () => {
  const imported = parseBackup(
    envelope([
      note({
        title: "Hello\u0000\nTitle\u202e",
        author: "A\nB",
        note: "# 我的笔记\n\n- 项目一",
      }),
    ]),
    document(),
  ).notes[0];
  assert.equal(imported.title, "Hello Title");
  assert.equal(imported.author, "A B");
  assert.equal(imported.note, "# 我的笔记\n\n- 项目一");
});

test("backup and import use the same 20 MB limit and per-note limit", () => {
  assert.equal(MAX_BACKUP_BYTES, 20_000_000);
  assert.equal(BACKUP_LIMITS.bytes, MAX_BACKUP_BYTES);
  const tooLarge = " ".repeat(MAX_BACKUP_BYTES + 1);
  assert.throws(() => parseBackup(tooLarge, document()), /20 MB/);
  assert.throws(
    () => createBackup([note({ note: "x".repeat(20_001) })]),
    /note/,
  );
  const heavy = note({
    content: `<p>${"中".repeat(150_000)}</p>`,
    textContent: "中".repeat(150_000),
    markdown: "中".repeat(150_000),
  });
  assert.throws(() => createBackup([heavy]), /单篇 1 MB/);
  const medium = note({
    content: `<p>${"x".repeat(150_000)}</p>`,
    textContent: "x".repeat(150_000),
    markdown: "x".repeat(150_000),
  });
  assert.throws(
    () =>
      createBackup(
        Array.from({ length: 46 }, (_, index) => ({
          ...medium,
          id: `bulk-${index}`,
        })),
      ),
    /20 MB/,
  );
});

test("import planning skips existing IDs and equivalent sources without overwriting notes", () => {
  const first = note();
  const existing = [first];
  const incoming = [
    note({ note: "changed private note" }),
    note({ id: "new-id", url: "https://example.com/article?token=1" }),
    note({ id: "different", url: "https://example.com/new" }),
  ];
  const before = JSON.stringify(existing);
  const result = planImport(existing, incoming);
  assert.equal(result.skipped, 2);
  assert.equal(result.notesToAdd.length, 1);
  assert.equal(result.notesToAdd[0].id, "different");
  assert.equal(JSON.stringify(existing), before);
  assert.equal(existing[0].note, first.note);
});

test("empty-source notes use their IDs and selections remain distinct from whole articles", () => {
  const existing = [
    note({ url: "", mode: "demo" }),
    note({ id: "source-article" }),
  ];
  const result = planImport(existing, [
    note({ id: "note-1", url: "", mode: "demo" }),
    note({ id: "new-demo", url: "", mode: "demo" }),
    note({ id: "selection", mode: "selection" }),
  ]);
  assert.equal(result.skipped, 1);
  assert.deepEqual(
    result.notesToAdd.map((x) => x.id),
    ["new-demo", "selection"],
  );
});

test("a library-limit failure produces no partial plan or input mutation", () => {
  const existing = Array.from({ length: 100 }, (_, index) =>
    note({ id: `old-${index}`, url: `https://example.com/${index}` }),
  );
  const incoming = [note({ id: "incoming", url: "https://example.com/new" })];
  const before = JSON.stringify(existing);
  assert.throws(() => planImport(existing, incoming), /100 篇/);
  assert.equal(existing.length, 100);
  assert.equal(JSON.stringify(existing), before);
  assert.equal(incoming.length, 1);
  assert.deepEqual(planImport([], []), { notesToAdd: [], skipped: 0 });
});

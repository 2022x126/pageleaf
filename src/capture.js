import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { sanitizeArticle, safeHttpURL } from "./content.js";

const MAX_PAGE_NODES = 50_000;
const MAX_PAGE_TEXT = 2_000_000;
const MAX_MARKDOWN = 250_000;

function plain(value, maxLength = 200) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function meta(document, selector) {
  return document.querySelector(selector)?.getAttribute("content") || "";
}

function textOf(html, document) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.textContent.replace(/\s+/g, " ").trim();
}

function countWords(text) {
  const cjk =
    text.match(
      /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu,
    ) || [];
  const other = text.replace(
    /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu,
    " ",
  );
  return (
    cjk.length +
    (other.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length
  );
}

function isEditable(node) {
  const element = node?.nodeType === 1 ? node : node?.parentElement;
  return Boolean(
    element?.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"])',
    ),
  );
}

function selectionHTML(document) {
  const selection = document.defaultView?.getSelection();
  if (
    !selection ||
    selection.isCollapsed ||
    !selection.rangeCount ||
    !selection.toString().trim()
  )
    return "";
  if (isEditable(selection.anchorNode) || isEditable(selection.focusNode)) {
    throw new Error("暂不采集表单或可编辑区域，请选中网页上已经发布的正文。");
  }
  const template = document.createElement("template");
  for (let index = 0; index < selection.rangeCount; index += 1) {
    const range = selection.getRangeAt(index);
    if (isEditable(range.commonAncestorContainer)) {
      throw new Error("暂不采集表单或可编辑区域，请选中网页上已经发布的正文。");
    }
    template.content.appendChild(range.cloneContents());
  }
  return template.innerHTML;
}

function toMarkdown(html, document) {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
  });
  turndown.use(gfm);
  // Literal HTML examples arrive as DOM text. Keep them text after Markdown export;
  // Turndown's default escaping leaves angle brackets untouched.
  const escapeMarkdown = turndown.escape.bind(turndown);
  turndown.escape = (value) =>
    escapeMarkdown(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  // Use an inert node rather than asking Turndown to create its own browser document.
  const template = document.createElement("template");
  template.innerHTML = html;
  const container = document.createElement("div");
  container.appendChild(template.content.cloneNode(true));
  return turndown.turndown(container).trim();
}

/** Read a user-requested page or selection locally. Does not mutate the live document. */
export function capturePage(document) {
  if (!document?.documentElement || !document.body) {
    throw new Error("当前页面还没有可读取的正文，请等待页面加载完成后重试。");
  }
  const url = safeHttpURL(document.URL);
  if (!url) throw new Error("叶笺目前只支持普通的 HTTP 或 HTTPS 网页。");
  const selected = selectionHTML(document);
  let article;
  let mode;

  if (selected) {
    article = { content: selected, title: document.title };
    mode = "selection";
  } else {
    if (
      document.getElementsByTagName("*").length > MAX_PAGE_NODES ||
      document.body.textContent.length > MAX_PAGE_TEXT
    ) {
      throw new Error("页面内容太多，请先选中需要保存的段落，再重新采集。");
    }
    const clone = document.cloneNode(true);
    for (const element of clone.querySelectorAll(
      'script, style, iframe, form, input, textarea, select, svg, img, picture, video, audio, object, embed, [contenteditable]:not([contenteditable="false"])',
    )) {
      element.remove();
    }
    try {
      article = new Readability(clone, {
        charThreshold: 80,
        maxElemsToParse: MAX_PAGE_NODES,
      }).parse();
    } catch {
      throw new Error("未能识别这页正文，请选中需要保存的文字后重试。");
    }
    mode = "article";
    if (!article?.content)
      throw new Error("这页没有识别到文章正文。你可以先选中文字，再重新采集。");
  }

  const linkBase = safeHttpURL(document.baseURI)
    ? document.baseURI
    : document.URL;
  const content = sanitizeArticle(article.content, linkBase, document);
  const textContent = textOf(content, document);
  const minimum = mode === "selection" ? 8 : 80;
  if (textContent.length < minimum) {
    throw new Error(
      mode === "selection"
        ? "选中的内容太短，请至少选中 8 个字符。"
        : "这页可识别的正文太短，请先选中需要保存的段落，再重新采集。",
    );
  }
  const markdown = toMarkdown(content, document);
  if (!markdown || markdown.length > MAX_MARKDOWN) {
    throw new Error("转换后的正文过长或为空，请选中需要保存的段落后重试。");
  }
  const wordCount = countWords(textContent);
  const rawPublished =
    article.publishedTime ||
    meta(document, 'meta[property="article:published_time"]') ||
    document.querySelector("time[datetime]")?.getAttribute("datetime");
  const timestamp = rawPublished ? Date.parse(rawPublished) : NaN;
  const warnings = ["仅保存文字和安全链接，图片、音视频及交互内容不会保存。"];
  const originalURL = new URL(document.URL);
  if (
    originalURL.search ||
    originalURL.hash ||
    originalURL.username ||
    originalURL.password
  ) {
    warnings.push("来源链接中的查询参数、片段与登录凭据已移除。");
  }

  return {
    title: plain(article.title || document.title || textContent, 200),
    url,
    siteName: plain(
      article.siteName ||
        meta(document, 'meta[property="og:site_name"]') ||
        originalURL.hostname,
      120,
    ),
    author: plain(article.byline || meta(document, 'meta[name="author"]'), 120),
    excerpt: plain(article.excerpt || textContent, 280),
    lang: plain(article.lang || document.documentElement.lang, 32),
    publishedTime: Number.isNaN(timestamp)
      ? ""
      : new Date(timestamp).toISOString(),
    content,
    markdown,
    textContent,
    wordCount,
    minutes: Math.max(1, Math.ceil(wordCount / 350)),
    capturedAt: new Date().toISOString(),
    mode,
    warnings,
  };
}

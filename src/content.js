/** Content is parsed inside an inert template and rebuilt without page attributes. */
export const CONTENT_LIMITS = Object.freeze({
  inputHTML: 600_000,
  outputHTML: 300_000,
  text: 180_000,
  nodes: 25_000,
  depth: 120,
});

const ALLOWED = new Set([
  "article",
  "section",
  "div",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "a",
  "strong",
  "b",
  "em",
  "i",
  "s",
  "del",
  "u",
  "sub",
  "sup",
  "br",
  "hr",
  "table",
  "caption",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "dl",
  "dt",
  "dd",
  "figure",
  "figcaption",
  "small",
  "mark",
  "kbd",
  "samp",
  "var",
  "span",
]);

const DROP = new Set([
  "script",
  "style",
  "iframe",
  "frame",
  "frameset",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "option",
  "datalist",
  "output",
  "object",
  "embed",
  "applet",
  "svg",
  "math",
  "canvas",
  "img",
  "picture",
  "source",
  "audio",
  "video",
  "track",
  "link",
  "meta",
  "base",
  "template",
  "noscript",
  "nav",
  "aside",
  "footer",
]);

/** Strip URL credentials, fragments, and all query parameters, including tracking tokens. */
export function safeHttpURL(value, baseURL) {
  if (typeof value !== "string" || !value.trim() || value.length > 4_096)
    return "";
  try {
    const url = new URL(value, baseURL);
    if (!["http:", "https:"].includes(url.protocol)) return "";
    url.username = "";
    url.password = "";
    url.search = "";
    url.hash = "";
    return url.href;
  } catch {
    return "";
  }
}

/**
 * Produces an inert article fragment with safe HTTP links and no resource-loading tags.
 * No original DOM node or attribute is reused, preventing DOM clobbering and event handlers.
 */
export function sanitizeArticle(html, baseURL, document) {
  if (!document?.createElement || typeof html !== "string") {
    throw new Error("无法处理这段网页内容。请重新打开页面后再试。");
  }
  if (html.length > CONTENT_LIMITS.inputHTML) {
    throw new Error("正文过长，请先选中需要保存的段落，再重新采集。");
  }
  const input = document.createElement("template");
  input.innerHTML = html;
  const output = document.createElement("template");
  let visited = 0;
  let textLength = 0;

  function copy(node, parent, depth) {
    visited += 1;
    if (visited > CONTENT_LIMITS.nodes || depth > CONTENT_LIMITS.depth) {
      throw new Error("这段网页结构过于复杂，请选中需要保存的段落后重试。");
    }
    if (node.nodeType === 3) {
      textLength += node.data.length;
      if (textLength > CONTENT_LIMITS.text) {
        throw new Error("正文过长，请选中需要保存的段落后重试。");
      }
      parent.appendChild(document.createTextNode(node.data));
      return;
    }
    if (node.nodeType !== 1) return;
    const tag = node.localName.toLowerCase();
    if (
      DROP.has(tag) ||
      node.hasAttribute("hidden") ||
      node.getAttribute("aria-hidden") === "true"
    )
      return;
    // Editable regions are drafts rather than the published article.
    if (
      node.hasAttribute("contenteditable") &&
      node.getAttribute("contenteditable") !== "false"
    )
      return;
    if (!ALLOWED.has(tag)) {
      for (const child of node.childNodes) copy(child, parent, depth + 1);
      return;
    }
    const element = document.createElement(tag);
    if (tag === "a") {
      const href = safeHttpURL(node.getAttribute("href"), baseURL);
      if (href) {
        element.setAttribute("href", href);
        element.setAttribute("rel", "noopener noreferrer");
      }
    }
    if (tag === "code") {
      const language = (node.getAttribute("class") || "").match(
        /(?:^|\s)language-([a-z0-9_+-]{1,32})(?:\s|$)/i,
      );
      if (language) element.setAttribute("class", `language-${language[1]}`);
    }
    if (tag === "ol" && /^\d{1,6}$/.test(node.getAttribute("start") || "")) {
      element.setAttribute("start", node.getAttribute("start"));
    }
    if (tag === "th" || tag === "td") {
      const align = node.getAttribute("align");
      if (["left", "center", "right"].includes(align))
        element.setAttribute("align", align);
      for (const name of ["colspan", "rowspan"]) {
        const value = node.getAttribute(name);
        if (/^[1-9]\d?$/.test(value || "")) element.setAttribute(name, value);
      }
    }
    for (const child of node.childNodes) copy(child, element, depth + 1);
    parent.appendChild(element);
  }

  for (const child of input.content.childNodes) copy(child, output.content, 0);
  const cleaned = output.innerHTML;
  if (cleaned.length > CONTENT_LIMITS.outputHTML) {
    throw new Error("正文过长，请先选中需要保存的段落，再重新采集。");
  }
  return cleaned;
}

/** Local annotations use UTF-16 offsets, matching DOM Range text offsets.
 * The saved source article remains separate from these rendered wrappers.
 */
export const ANNOTATION_LIMITS = Object.freeze({
  text: 100,
  pen: 50,
  points: 500,
  exact: 10_000,
  total: 150,
  documentText: 180_000,
  documentNodes: 25_000,
});
export const ANNOTATION_STYLES = Object.freeze(["highlight", "underline", "wavy"]);
const STYLES = new Set(ANNOTATION_STYLES);
const OWN_ATTRIBUTE = "data-pageleaf-annotation";
const PROTECTED_TAGS = new Set([
  "SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT", "OPTION",
  "BUTTON", "FORM", "NAV", "ASIDE", "IFRAME", "OBJECT", "EMBED", "SVG", "MATH", "CANVAS",
]);
const PROTECTED_ROLES = new Set(["button", "textbox", "combobox", "listbox", "menu", "slider", "spinbutton"]);
const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);
const isRoot = root => root?.nodeType === 1 && root.ownerDocument?.createTreeWalker;

function protectedText(node, root) {
  for (let parent = node.parentElement; parent; parent = parent.parentElement) {
    if (PROTECTED_TAGS.has(parent.tagName) || PROTECTED_ROLES.has(parent.getAttribute("role"))) return true;
    const editable = parent.getAttribute("contenteditable");
    if (editable !== null && editable.toLowerCase() !== "false") return true;
    if (parent.hidden || parent.getAttribute("aria-hidden") === "true") return true;
    if (parent === root) break;
  }
  // The root may itself live inside an editor in an unsanitized preview.
  for (let parent = root.parentElement; parent; parent = parent.parentElement) {
    const editable = parent.getAttribute("contenteditable");
    if (editable !== null && editable.toLowerCase() !== "false") return true;
  }
  return false;
}

function sourceInfo(source) {
  if (source === undefined) return { text: null, nodes: null };
  if (typeof source === "string") return source.length <= ANNOTATION_LIMITS.documentText ? { text: source, nodes: null } : null;
  if (!isRoot(source)) return null;
  const text = source.textContent || "";
  if (text.length > ANNOTATION_LIMITS.documentText) return null;
  const walker = source.ownerDocument.createTreeWalker(source, 4 /* SHOW_TEXT */);
  const nodes = [];
  let offset = 0;
  let node;
  while ((node = walker.nextNode())) {
    if (nodes.length >= ANNOTATION_LIMITS.documentNodes) return null;
    const end = offset + node.data.length;
    nodes.push({ node, start: offset, end, protected: protectedText(node, source) });
    offset = end;
  }
  return { text, nodes };
}

function splitsSurrogate(text, offset) {
  if (offset <= 0 || offset >= text.length) return false;
  const before = text.charCodeAt(offset - 1), after = text.charCodeAt(offset);
  return before >= 0xd800 && before <= 0xdbff && after >= 0xdc00 && after <= 0xdfff;
}

function normalizeText(value, info) {
  if (!info || !STYLES.has(value.style) || !Number.isSafeInteger(value.start) || !Number.isSafeInteger(value.end)) return null;
  const { start, end, exact, style } = value;
  if (start < 0 || end <= start || end > ANNOTATION_LIMITS.documentText || end - start > ANNOTATION_LIMITS.exact) return null;
  if (typeof exact !== "string" || exact.length !== end - start || !/\S/u.test(exact)) return null;
  if (info.text !== null && (end > info.text.length || info.text.slice(start, end) !== exact || splitsSurrogate(info.text, start) || splitsSurrogate(info.text, end))) return null;
  if (info.nodes?.some(item => item.protected && item.start < end && item.end > start)) return null;
  return { type: "text", style, start, end, exact };
}

function normalizePen(value) {
  if (!Array.isArray(value.points) || value.points.length < 2 || value.points.length > ANNOTATION_LIMITS.points) return null;
  const points = [];
  for (const pair of value.points) {
    if (!Array.isArray(pair) || pair.length !== 2 || pair.some(number => typeof number !== "number" || !Number.isFinite(number) || number < 0 || number > 1)) return null;
    points.push([pair[0], pair[1]]);
  }
  return { type: "pen", points };
}

/** Copy only documented fields. Invalid, stale, duplicate and over-limit items are omitted.
 * Pass the original article's raw textContent or its rendered article element as `source`.
 * Omit `source` for structural backup validation; restoration verifies the exact text again.
 * Pen coordinates are normalized to that element; no CSS or HTML is accepted.
 */
export function normalizeAnnotations(value, source) {
  if (!Array.isArray(value)) return [];
  const info = sourceInfo(source);
  const result = [];
  const seen = new Set();
  let textCount = 0, penCount = 0;
  for (const entry of value.slice(0, ANNOTATION_LIMITS.total)) {
    if (!isRecord(entry)) continue;
    let clean;
    if (entry.type === "text" && textCount < ANNOTATION_LIMITS.text) clean = normalizeText(entry, info);
    else if (entry.type === "pen" && penCount < ANNOTATION_LIMITS.pen) clean = normalizePen(entry);
    if (!clean) continue;
    const key = JSON.stringify(clean);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(clean);
    if (clean.type === "text") textCount += 1;
    else penCount += 1;
  }
  return result;
}
export const validateAnnotations = normalizeAnnotations;
export function serializeAnnotations(value, source) {
  return JSON.stringify(normalizeAnnotations(value, source));
}

function containsPoint(root, node) {
  return node === root || root.contains(node);
}
function offsetAt(root, container, offset) {
  const prefix = root.ownerDocument.createRange();
  prefix.selectNodeContents(root);
  prefix.setEnd(container, offset);
  return prefix.toString().length;
}

/** Return one article-only selection anchor, or null without altering the selection/DOM. */
export function getSelectionAnnotation(root, selection, style) {
  if (!isRoot(root) || !STYLES.has(style) || !selection || selection.rangeCount !== 1 || selection.isCollapsed) return null;
  try {
    const range = selection.getRangeAt(0);
    if (range.collapsed || !containsPoint(root, range.startContainer) || !containsPoint(root, range.endContainer)) return null;
    const info = sourceInfo(root);
    if (!info) return null;
    const start = offsetAt(root, range.startContainer, range.startOffset);
    const end = offsetAt(root, range.endContainer, range.endOffset);
    return normalizeText({ type: "text", style, start, end, exact: info.text.slice(start, end) }, info);
  } catch {
    return null;
  }
}

function unwrap(root) {
  // These attributes are only produced by this module; source sanitization strips attributes.
  for (const element of [...root.querySelectorAll(`[${OWN_ATTRIBUTE}]`)].reverse()) {
    const fragment = root.ownerDocument.createDocumentFragment();
    while (element.firstChild) fragment.appendChild(element.firstChild);
    element.replaceWith(fragment);
  }
  root.normalize();
}

/** Render safe text wrappers only. Pen strokes are returned by normalizeAnnotations
 * for a separate local drawing layer. Returns the number of valid text annotations.
 */
export function renderAnnotations(root, annotations, document = root?.ownerDocument) {
  if (!isRoot(root) || document !== root.ownerDocument || !document?.createElement) return 0;
  unwrap(root);
  const info = sourceInfo(root);
  if (!info) return 0;
  const textAnnotations = normalizeAnnotations(annotations, root).filter(entry => entry.type === "text");
  for (const item of info.nodes) {
    if (item.protected || item.start === item.end) continue;
    const matching = textAnnotations.filter(entry => entry.start < item.end && entry.end > item.start);
    if (!matching.length) continue;
    const cuts = [...new Set([item.start, item.end, ...matching.flatMap(entry => [Math.max(item.start, entry.start), Math.min(item.end, entry.end)])])].sort((a, b) => a - b);
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < cuts.length - 1; index += 1) {
      const start = cuts[index], end = cuts[index + 1];
      let segment = document.createTextNode(item.node.data.slice(start - item.start, end - item.start));
      const styles = new Set(matching.filter(entry => entry.start <= start && entry.end >= end).map(entry => entry.style));
      for (const style of ANNOTATION_STYLES) {
        if (!styles.has(style)) continue;
        const wrapper = document.createElement(style === "highlight" ? "mark" : "span");
        wrapper.setAttribute(OWN_ATTRIBUTE, style);
        wrapper.className = `annotation-${style}`;
        wrapper.appendChild(segment);
        segment = wrapper;
      }
      fragment.appendChild(segment);
    }
    item.node.replaceWith(fragment);
  }
  return textAnnotations.length;
}

import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { ANNOTATION_LIMITS, getSelectionAnnotation, normalizeAnnotations, validateAnnotations, serializeAnnotations, renderAnnotations } from "../src/markup.js";

function fixture(html = "<p>Hello <strong>世界</strong> and مرحبا.</p>") {
  const dom = new JSDOM(`<!doctype html><body><article id="article">${html}</article><textarea id="note">Personal note</textarea><p id="outside">Outside</p></body>`);
  const document = dom.window.document;
  return { dom, document, root: document.getElementById("article"), close: () => dom.window.close() };
}
function select(app, startNode, startOffset, endNode, endOffset) {
  const range = app.document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  const selection = app.dom.window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
}
function annotation(text, start, end, style = "highlight") {
  return { type: "text", style, start, end, exact: text.slice(start, end) };
}

test("captures a mixed-language selection across inline text nodes without changing the article", t => {
  const app = fixture(); t.after(app.close);
  const original = app.root.innerHTML;
  const first = app.root.querySelector("strong").firstChild;
  const last = app.root.querySelector("p").lastChild;
  const selection = select(app, first, 0, last, 5);
  const result = getSelectionAnnotation(app.root, selection, "wavy");
  assert.deepEqual(result, { type: "text", style: "wavy", start: 6, end: 13, exact: "世界 and " });
  assert.equal(app.root.innerHTML, original);
  assert.equal(selection.toString(), result.exact);
});

test("ignores collapsed selections, unsupported styles and selections extending outside the article", t => {
  const app = fixture(); t.after(app.close);
  const text = app.root.querySelector("p").firstChild;
  const outside = app.document.getElementById("outside").firstChild;
  assert.equal(getSelectionAnnotation(app.root, select(app, text, 1, text, 1), "highlight"), null);
  assert.equal(getSelectionAnnotation(app.root, select(app, text, 0, text, 4), "url(javascript:1)"), null);
  assert.equal(getSelectionAnnotation(app.root, select(app, text, 0, outside, 3), "highlight"), null);
  assert.equal(getSelectionAnnotation(app.root, null, "underline"), null);
});

test("does not annotate editors, controls or hidden text, including inherited editable containers", t => {
  const app = fixture('<p>Before <span contenteditable="true">editable</span> after</p><button>button</button><p hidden>hidden</p>'); t.after(app.close);
  const editable = app.root.querySelector("[contenteditable]").firstChild;
  assert.equal(getSelectionAnnotation(app.root, select(app, editable, 0, editable, 8), "highlight"), null);
  const text = app.root.textContent;
  const entries = ["editable", "button", "hidden"].map(word => annotation(text, text.indexOf(word), text.indexOf(word) + word.length));
  assert.deepEqual(validateAnnotations(entries, app.root), []);
  assert.equal(renderAnnotations(app.root, entries), 0);
  assert.equal(app.root.querySelectorAll("[data-pageleaf-annotation]").length, 0);
  app.document.body.setAttribute("contenteditable", "true");
  const before = app.root.querySelector("p").firstChild;
  assert.equal(getSelectionAnnotation(app.root, select(app, before, 0, before, 6), "wavy"), null);
});

test("renders overlapping marks across nodes, retains original inline formatting and can clear them", t => {
  const app = fixture(); t.after(app.close);
  const text = app.root.textContent, original = app.root.innerHTML;
  const entries = [annotation(text, 3, 13), annotation(text, 6, 16, "wavy"), annotation(text, 8, 13, "underline")];
  assert.equal(renderAnnotations(app.root, entries, app.document), 3);
  assert.equal(app.root.textContent, text);
  assert.equal(app.root.querySelector("strong").textContent, "世界");
  assert.ok(app.root.querySelector('mark[data-pageleaf-annotation="highlight"]'));
  assert.ok(app.root.querySelector('span[data-pageleaf-annotation="wavy"]'));
  assert.ok(app.root.querySelector('span[data-pageleaf-annotation="underline"]'));
  const once = app.root.innerHTML;
  assert.equal(renderAnnotations(app.root, entries), 3);
  assert.equal(app.root.innerHTML, once, "restoration must be idempotent, without nested duplicate wrappers");
  assert.equal(renderAnnotations(app.root, []), 0);
  assert.equal(app.root.innerHTML, original);
});

test("preserves original whitespace offsets and selects the intended repeated quotation", t => {
  const app = fixture('<p>  repeat\n</p>\n<p>repeat  tail</p>'); t.after(app.close);
  const text = app.root.textContent;
  const start = text.lastIndexOf("repeat");
  const entry = annotation(text, start, start + 6, "underline");
  assert.deepEqual(validateAnnotations([entry], app.root), [entry]);
  renderAnnotations(app.root, [entry]);
  assert.equal(app.root.querySelector("p:first-child").querySelector("span"), null);
  assert.equal(app.root.querySelector("p:last-child span").textContent, "repeat");
  assert.equal(app.root.textContent, text);
  const normalizedText = text.replace(/\s+/g, " ").trim();
  assert.deepEqual(validateAnnotations([entry], normalizedText), []);
});

test("drops stale anchors, invalid bounds, whitespace-only text and partial UTF-16 surrogate selections", t => {
  const app = fixture("<p>A😀中文 café العربية</p>"); t.after(app.close);
  const text = app.root.textContent;
  const valid = annotation(text, 1, 5);
  assert.equal(validateAnnotations([valid], text).length, 1);
  assert.deepEqual(validateAnnotations([
    {...valid, exact: "changed"}, {...valid, start: -1}, {...valid, start: 1.5},
    annotation(text, 1, 2), annotation(text, 2, 3), annotation(text, 5, 6),
    {type: "text", style: "highlight", start: 0, end: 999, exact: text},
  ], text), []);
  assert.equal(renderAnnotations(app.root, [{...valid, exact: "changed"}]), 0);
  const range = select(app, app.root.querySelector("p").firstChild, 1, app.root.querySelector("p").firstChild, 2);
  assert.equal(getSelectionAnnotation(app.root, range, "highlight"), null);
});

test("copies only documented fields and never interprets annotation strings as HTML or CSS", t => {
  const app = fixture('<p>&lt;img src=x onerror=alert(1)&gt;</p>'); t.after(app.close);
  const text = app.root.textContent;
  const hostile = {...annotation(text, 0, text.length), html: '<script>alert(1)</script>', onclick: "attack()", color: "url(https://evil.invalid)"};
  const clean = normalizeAnnotations([hostile], app.root);
  assert.deepEqual(Object.keys(clean[0]).sort(), ["end", "exact", "start", "style", "type"]);
  renderAnnotations(app.root, clean);
  assert.equal(app.root.querySelector("img,script,[onclick],[style]"), null);
  assert.equal(app.root.querySelector("mark").textContent, text);
  assert.equal(serializeAnnotations([hostile], text), JSON.stringify(clean));
});

test("structural validation works without a DOM and later restoration verifies the source", () => {
  const entry = {type: "text", style: "highlight", start: 20, end: 25, exact: "hello"};
  assert.deepEqual(validateAnnotations([entry]), [entry]);
  assert.deepEqual(validateAnnotations([entry], "short"), []);
  assert.deepEqual(validateAnnotations([entry], "x".repeat(20) + "hello"), [entry]);
  assert.deepEqual(validateAnnotations(null), []);
  assert.deepEqual(validateAnnotations([{...entry, end: 180001, exact: ""}]), []);
});

test("enforces independent text, stroke and point limits while dropping duplicate anchors", () => {
  const text = "x".repeat(200);
  const anchors = Array.from({length: 120}, (_, index) => annotation(text, index, index + 1));
  assert.equal(validateAnnotations(anchors, text).length, ANNOTATION_LIMITS.text);
  const strokes = Array.from({length: 60}, (_, index) => ({type: "pen", points: [[index / 100, 0], [index / 100, 1]]}));
  assert.equal(validateAnnotations(strokes, text).length, ANNOTATION_LIMITS.pen);
  assert.equal(validateAnnotations([anchors[0], {...anchors[0]}], text).length, 1);
  const points = Array.from({length: 501}, (_, index) => [index / 501, 0]);
  assert.deepEqual(validateAnnotations([{type: "pen", points}]), []);
  assert.equal(validateAnnotations([{type: "pen", points: points.slice(0, 500)}]).length, 1);
  assert.deepEqual(validateAnnotations([annotation("x".repeat(10001), 0, 10001)]), []);
});

test("validates finite normalized pen points and returns independent data without drawing into the article", t => {
  const app = fixture(); t.after(app.close);
  const original = app.root.innerHTML;
  const pen = {type: "pen", points: [[0, 0.5], [1, 1]], style: "evil", html: "bad"};
  const clean = validateAnnotations([pen], app.root);
  assert.deepEqual(clean, [{type: "pen", points: [[0, 0.5], [1, 1]]}]);
  pen.points[0][0] = 0.8;
  assert.equal(clean[0].points[0][0], 0);
  assert.equal(renderAnnotations(app.root, clean), 0);
  assert.equal(app.root.innerHTML, original);
  for (const points of [[[NaN, 0], [1, 1]], [[Infinity, 0], [1, 1]], [[-0.1, 0], [1, 1]], [[0, 0], [1.1, 1]], [[0, 0]], [[0, "0"], [1, 1]]]) {
    assert.deepEqual(validateAnnotations([{type: "pen", points}]), []);
  }
});

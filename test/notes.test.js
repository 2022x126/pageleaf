import test from "node:test";
import assert from "node:assert/strict";
import { buildMarkdown, noteFilename, searchNotes } from "../src/notes.js";

function article(overrides = {}) {
  return {
    title: "一篇文章",
    url: "https://example.com/read",
    author: "作者",
    capturedAt: "2026-10-21T08:00:00.000Z",
    markdown: "## 正文章节\n\n第一段。",
    ...overrides,
  };
}

test("exports source metadata, user notes and original Markdown", () => {
  const result = buildMarkdown(article(), "读后记录 **重点**");
  assert.match(result, /^# 一篇文章\n/);
  assert.ok(result.includes("Source: <https://example.com/read>"));
  assert.ok(result.includes("Captured: 2026-10-21T08:00:00.000Z"));
  assert.ok(result.includes("## My notes\n\n读后记录 **重点**"));
  assert.ok(result.endsWith("## Article excerpt\n\n## 正文章节\n\n第一段。\n"));
});

test("does not allow a page title to add Markdown headings or raw HTML", () => {
  const result = buildMarkdown(
    article({ title: "标题\n# 假章节 <img src=x>" }),
  );
  assert.ok(!result.includes("\n# 假章节"));
  assert.ok(!/(?<!\\)<img/.test(result));
  assert.ok(result.includes("\\# 假章节"));
});

test("treats page-controlled author metadata as literal text", () => {
  const result = buildMarkdown(
    article({
      author:
        '<img src="https://evil.example/pixel"> [链接](javascript:alert(1))',
    }),
  );
  assert.ok(
    !/(?<!\\)<img/.test(result),
    "Author metadata must not create an external image in a Markdown reader.",
  );
  assert.ok(
    result.includes("\\[链接\\]"),
    "Author text must not create an executable Markdown link.",
  );
});

test("exports only safe source URLs without private query parameters", () => {
  const result = buildMarkdown(
    article({
      url: "https://user:secret@example.com/read?token=private#location",
    }),
  );
  assert.ok(result.includes("Source: <https://example.com/read>"));
  assert.ok(
    !result.includes("secret") &&
      !result.includes("private") &&
      !result.includes("#location"),
  );
  const dangerous = buildMarkdown(article({ url: "javascript:alert(1)" }));
  assert.ok(!dangerous.includes("Source:"));
});

test("creates bounded, filesystem-safe Markdown filenames", () => {
  const filename = noteFilename('a/b\\c:*?<>|"\n');
  assert.match(filename, /\.md$/);
  assert.ok(!/[<>:"/\\|?*\u0000-\u001f\u007f]/.test(filename));
  assert.equal(noteFilename(".."), "pageleaf-note.md");
  assert.ok(noteFilename("长".repeat(200)).length <= 93);
});

test("searches titles, URLs and personal notes without mutating note order", () => {
  const notes = [
    {
      title: "Older note",
      url: "https://example.com/a",
      note: "Markdown",
      updatedAt: "2026-10-20T00:00:00Z",
    },
    {
      title: "Newer Markdown",
      url: "https://example.com/b",
      note: "",
      updatedAt: "2026-10-21T00:00:00Z",
    },
  ];
  const result = searchNotes(notes, "  MARKDOWN ");
  assert.equal(result.length, 2);
  assert.equal(result[0].title, "Newer Markdown");
  assert.equal(notes[0].title, "Older note");
  assert.equal(searchNotes(notes, "example.com/a")[0].title, "Older note");
});

test("finds matches in article text and Markdown while keeping newest matches first", () => {
  const notes = [
    {
      id: "text-only",
      title: "Caching guide",
      textContent: "The article explains IndexedDB transactions and local persistence.",
      updatedAt: "2026-10-20T00:00:00Z",
    },
    {
      id: "unrelated",
      title: "A reading habit",
      textContent: "A quiet place for your notes.",
      markdown: "## Read slowly",
      updatedAt: "2026-10-22T00:00:00Z",
    },
    {
      id: "markdown-only",
      title: "Offline notes",
      markdown: "## 数据保存\n\n用 IndexedDB 在本机保留阅读资料。",
      updatedAt: "2026-10-21T00:00:00Z",
    },
  ];
  assert.deepEqual(
    searchNotes(notes, "  INDEXEDdb \n").map((value) => value.id),
    ["markdown-only", "text-only"],
  );
  assert.deepEqual(notes.map((value) => value.id), ["text-only", "unrelated", "markdown-only"]);
});

test("search remains compatible with notes that have no stored article body", () => {
  const notes = [
    {
      id: "legacy",
      title: "Old field notes",
      url: "https://example.com/archive",
      note: "Keep the original quotation.",
      updatedAt: "2026-10-20T00:00:00Z",
    },
    {
      id: "empty-body",
      title: "A newer note",
      textContent: null,
      markdown: "",
      updatedAt: "2026-10-21T00:00:00Z",
    },
  ];
  assert.deepEqual(searchNotes(notes, "QUOTATION").map((value) => value.id), ["legacy"]);
  assert.deepEqual(searchNotes(notes, "archive").map((value) => value.id), ["legacy"]);
  assert.deepEqual(searchNotes(notes, "missing正文").map((value) => value.id), []);
  assert.deepEqual(searchNotes(notes, " \n").map((value) => value.id), ["empty-body", "legacy"]);
});


test("exports localized metadata without translating user content", () => {
  const original = article();
  for (const [locale, source, heading] of [["zh-CN", "来源", "我的笔记"], ["ar", "المصدر", "ملاحظاتي"], ["ja", "出典", "自分のメモ"]]) {
    const result = buildMarkdown(original, "Keep my English — 保留中文", {locale});
    assert.ok(result.includes(`${source}: <https://example.com/read>`));
    assert.ok(result.includes(`## ${heading}\n\nKeep my English — 保留中文`));
    assert.ok(result.includes(original.markdown));
  }
});

test('Markdown includes marked quotations as inert text and does not serialize pen paths', () => {
  const exact = '<img src=x onload=';
  const article = {title:'Article',capturedAt:'2026-10-24T00:00:00Z',markdown:'Original body',annotations:[
    {type:'text',style:'highlight',start:0,end:exact.length,exact},
    {type:'pen',points:[[0,0],[1,1]]},
  ]};
  const exported = buildMarkdown(article,'My note');
  assert.match(exported, /&lt;img/);
  assert.ok(!exported.includes('<img') && !exported.includes('"points"'));
  assert.match(exported, /Original body/);
});

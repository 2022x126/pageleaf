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
  assert.ok(result.includes("来源：<https://example.com/read>"));
  assert.ok(result.includes("整理时间：2026-10-21T08:00:00.000Z"));
  assert.ok(result.includes("## 我的笔记\n\n读后记录 **重点**"));
  assert.ok(result.endsWith("## 原文摘录\n\n## 正文章节\n\n第一段。\n"));
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
  assert.ok(result.includes("来源：<https://example.com/read>"));
  assert.ok(
    !result.includes("secret") &&
      !result.includes("private") &&
      !result.includes("#location"),
  );
  const dangerous = buildMarkdown(article({ url: "javascript:alert(1)" }));
  assert.ok(!dangerous.includes("来源："));
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

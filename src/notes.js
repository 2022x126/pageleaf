import { safeHttpURL } from "./content.js";

function escapeMetadata(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\\`*_{}[\]#!|]/g, "\\$&")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildMarkdown(article, note = "") {
  article = article && typeof article === "object" ? article : {};
  const title = escapeMetadata(article.title || "未命名文章");
  const parts = [`# ${title}`];
  const source = safeHttpURL(article.url);
  if (source) parts.push(`来源：<${source}>`);
  if (article.author) parts.push(`作者：${escapeMetadata(article.author)}`);
  const time = new Date(article.capturedAt);
  if (!Number.isNaN(time.valueOf()))
    parts.push(`整理时间：${time.toISOString()}`);
  const personalNote = typeof note === "string" ? note.trim() : "";
  if (personalNote) parts.push(`## 我的笔记\n\n${personalNote}`);
  const markdown =
    typeof article.markdown === "string" ? article.markdown.trim() : "";
  parts.push(`## 原文摘录\n\n${markdown}`);
  return `${parts.join("\n\n")}\n`;
}
export function noteFilename(title) {
  return `${
    String(title || "未命名文章")
      .normalize("NFKC")
      .replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, "-")
      .replace(/[. ]+$/g, "")
      .slice(0, 90) || "pageleaf-note"
  }.md`;
}
export function searchNotes(notes, query) {
  const needle = query.trim().toLocaleLowerCase();
  return notes
    .filter(
      (note) =>
        !needle ||
        [note.title, note.url, note.note].some((x) =>
          String(x || "")
            .toLocaleLowerCase()
            .includes(needle),
        ),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

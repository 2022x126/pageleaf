import { safeHttpURL } from "./content.js";
import { t } from "./i18n.js";
import { validateAnnotations } from "./markup.js";

function escapeMetadata(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\\`*_{}[\]#!|]/g, "\\$&")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildMarkdown(article, note = "", { locale = "en" } = {}) {
  article = article && typeof article === "object" ? article : {};
  const title = escapeMetadata(article.title || t(locale, "mdUntitled"));
  const parts = [`# ${title}`];
  const source = safeHttpURL(article.url);
  if (source) parts.push(`${t(locale, "mdSource")}: <${source}>`);
  if (article.author) parts.push(`${t(locale, "mdAuthor")}: ${escapeMetadata(article.author)}`);
  const time = new Date(article.capturedAt);
  if (!Number.isNaN(time.valueOf()))
    parts.push(`${t(locale, "mdCaptured")}: ${time.toISOString()}`);
  const personalNote = typeof note === "string" ? note.trim() : "";
  if (personalNote) parts.push(`## ${t(locale, "mdNotes")}\n\n${personalNote}`);
  const marked = [...new Set(validateAnnotations(article.annotations).filter(item => item.type === "text").map(item => item.exact))];
  if (marked.length) parts.push(`## ${t(locale, "mdMarks")}\n\n${marked.map(text => `> ${escapeMetadata(text)}`).join("\n\n")}`);
  const markdown =
    typeof article.markdown === "string" ? article.markdown.trim() : "";
  parts.push(`## ${t(locale, "mdArticle")}\n\n${markdown}`);
  return `${parts.join("\n\n")}\n`;
}
export function noteFilename(title) {
  return `${
    String(title || "pageleaf-note")
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
        [note.title, note.url, note.note, note.textContent, note.markdown].some((x) =>
          String(x || "")
            .toLocaleLowerCase()
            .includes(needle),
        ),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

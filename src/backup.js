import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { CONTENT_LIMITS, safeHttpURL, sanitizeArticle } from "./content.js";

export const MAX_BACKUP_BYTES = 20_000_000;
export const BACKUP_LIMITS = Object.freeze({
  bytes: MAX_BACKUP_BYTES,
  records: 100,
  noteBytes: 1_000_000,
});

const MARKDOWN_LIMIT = 250_000;
const MODES = new Set(["article", "selection", "demo"]);
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
const utf8Size = (value) => new TextEncoder().encode(value).byteLength;
const isRecord = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

function textField(record, key, limit, { required = false } = {}) {
  const value = Object.hasOwn(record, key) ? record[key] : "";
  if (typeof value !== "string" || value.length > limit)
    throw new Error(`备份中的 ${key} 字段无效或过长。`);
  if (required && !value.trim())
    throw new Error(`备份缺少有效的 ${key} 字段。`);
  return value;
}

function metadata(value) {
  return value
    .replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isoDate(record, key, required = true) {
  const value = textField(record, key, 40, { required });
  if (!value && !required) return "";
  const parts = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/,
  );
  const date = new Date(value);
  if (!parts || !Number.isFinite(date.valueOf()))
    throw new Error(`备份中的 ${key} 日期无效。`);
  const [, year, month, day, hour, minute, second] = parts.map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > days[month - 1] ||
    hour > 23 ||
    minute > 59 ||
    second > 59
  )
    throw new Error(`备份中的 ${key} 日期无效。`);
  return date.toISOString();
}

/** Read only documented note fields; backup files never include settings or account data. */
function noteFields(record) {
  if (!isRecord(record)) throw new Error("备份中的笔记格式无效。");
  const id = textField(record, "id", 128, { required: true });
  if (!ID_PATTERN.test(id)) throw new Error("备份中的笔记 ID 无效。");
  const title = metadata(textField(record, "title", 200, { required: true }));
  if (!title) throw new Error("备份中的笔记标题无效。");
  const mode = textField(record, "mode", 16, { required: true });
  if (!MODES.has(mode)) throw new Error("备份中的笔记类型无效。");
  const fields = {
    id,
    title,
    url: textField(record, "url", 4_096),
    siteName: metadata(textField(record, "siteName", 120)),
    author: metadata(textField(record, "author", 120)),
    excerpt: metadata(textField(record, "excerpt", 280)),
    lang: metadata(textField(record, "lang", 32)),
    publishedTime: isoDate(record, "publishedTime", false),
    content: textField(record, "content", CONTENT_LIMITS.inputHTML, {
      required: true,
    }),
    markdown: textField(record, "markdown", MARKDOWN_LIMIT),
    textContent: textField(record, "textContent", CONTENT_LIMITS.text),
    note: textField(record, "note", 20_000),
    wordCount: 0,
    minutes: 1,
    capturedAt: isoDate(record, "capturedAt"),
    updatedAt: isoDate(record, "updatedAt"),
    mode,
    warnings: [],
  };
  for (const key of ["wordCount", "minutes"]) {
    if (Object.hasOwn(record, key)) {
      if (
        !Number.isSafeInteger(record[key]) ||
        record[key] < 0 ||
        record[key] > CONTENT_LIMITS.text
      )
        throw new Error(`备份中的 ${key} 字段无效。`);
      fields[key] = record[key];
    }
  }
  if (Object.hasOwn(record, "warnings")) {
    if (
      !Array.isArray(record.warnings) ||
      record.warnings.length > 12 ||
      record.warnings.some(
        (value) => typeof value !== "string" || value.length > 500,
      )
    )
      throw new Error("备份中的提示信息无效。");
    fields.warnings = record.warnings.map(metadata);
  }
  if (utf8Size(JSON.stringify(fields)) > BACKUP_LIMITS.noteBytes)
    throw new Error("备份中有笔记超过单篇 1 MB 上限，请先缩减内容。");
  return fields;
}

function checkNotes(notes) {
  if (!Array.isArray(notes) || notes.length > BACKUP_LIMITS.records)
    throw new Error("备份必须包含笔记列表，且最多为 100 篇。");
  const ids = new Set();
  return notes.map((note) => {
    const fields = noteFields(note);
    if (ids.has(fields.id))
      throw new Error("备份中存在重复笔记 ID，请重新导出备份。");
    ids.add(fields.id);
    return fields;
  });
}

export function createBackup(notes) {
  const result = JSON.stringify(
    {
      format: "pageleaf-backup",
      version: 1,
      exportedAt: new Date().toISOString(),
      notes: checkNotes(notes),
    },
    null,
    2,
  );
  if (utf8Size(result) > MAX_BACKUP_BYTES)
    throw new Error(
      "笔记库备份超过 20 MB 上限，请分批导出 Markdown 后再缩减笔记库。",
    );
  return result;
}

function toMarkdown(content, document) {
  const service = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
  });
  service.use(gfm);
  const escape = service.escape.bind(service);
  service.escape = (value) =>
    escape(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const input = document.createElement("template");
  input.innerHTML = content;
  const container = document.createElement("div");
  container.appendChild(input.content.cloneNode(true));
  return service.turndown(container).trim();
}

function countWords(text) {
  const cjk =
    /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;
  return (
    (text.match(cjk) || []).length +
    (
      text.replace(cjk, " ").match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ||
      []
    ).length
  );
}

/** Parse untrusted backup data without adding nodes to the active document. */
export function parseBackup(json, document) {
  if (typeof json !== "string") throw new Error("请选择有效的 JSON 备份文件。");
  if (utf8Size(json) > MAX_BACKUP_BYTES)
    throw new Error("备份文件超过 20 MB 上限。");
  let envelope;
  try {
    envelope = JSON.parse(json);
  } catch {
    throw new Error("无法读取这个 JSON 文件，请选择叶笺导出的备份。");
  }
  if (
    !isRecord(envelope) ||
    envelope.format !== "pageleaf-backup" ||
    envelope.version !== 1
  )
    throw new Error("备份格式或版本不受支持，请选择叶笺导出的备份。");
  isoDate(envelope, "exportedAt");
  if (!document?.createElement)
    throw new Error("当前页面无法处理备份，请重新打开叶笺。");
  const warnings = [];
  const notes = checkNotes(envelope.notes).map((fields) => {
    const url = safeHttpURL(fields.url);
    const content = sanitizeArticle(fields.content, url || undefined, document);
    const fragment = document.createElement("template");
    fragment.innerHTML = content;
    const textContent = fragment.content.textContent
      .replace(/\s+/g, " ")
      .trim();
    if (!textContent)
      throw new Error("备份中有笔记没有可恢复的正文，导入已取消。");
    const markdown = toMarkdown(content, document);
    if (markdown.length > MARKDOWN_LIMIT)
      throw new Error("备份中有笔记正文过长，导入已取消。");
    const wordCount = countWords(textContent);
    const note = {
      ...fields,
      url,
      content,
      textContent,
      markdown,
      wordCount,
      minutes: Math.max(1, Math.ceil(wordCount / 350)),
    };
    if (utf8Size(JSON.stringify(note)) > BACKUP_LIMITS.noteBytes)
      throw new Error("恢复后的笔记超过单篇 1 MB 上限，导入已取消。");
    if (url !== fields.url || content !== fields.content)
      warnings.push(`“${fields.title}”的正文或链接已重新清理。`);
    return note;
  });
  return { notes, warnings };
}

function contentKey(note) {
  const url = safeHttpURL(note?.url);
  return url ? JSON.stringify([url, note.mode, note.textContent]) : "";
}

/** Produce a complete write plan, leaving existing notes and both input arrays intact. */
export function planImport(existing, incoming) {
  if (
    !Array.isArray(existing) ||
    !Array.isArray(incoming) ||
    existing.length > BACKUP_LIMITS.records ||
    incoming.length > BACKUP_LIMITS.records
  )
    throw new Error("笔记库或导入列表无效，最多支持 100 篇笔记。");
  const ids = new Set(
    existing.map((note) => note?.id).filter((id) => typeof id === "string"),
  );
  const content = new Set(existing.map(contentKey).filter(Boolean));
  const notesToAdd = [];
  let skipped = 0;
  for (const note of incoming) {
    if (
      !isRecord(note) ||
      typeof note.id !== "string" ||
      !ID_PATTERN.test(note.id)
    )
      throw new Error("导入笔记缺少有效 ID。");
    const key = contentKey(note);
    if (ids.has(note.id) || (key && content.has(key))) {
      skipped += 1;
      continue;
    }
    ids.add(note.id);
    if (key) content.add(key);
    notesToAdd.push(note);
  }
  if (existing.length + notesToAdd.length > BACKUP_LIMITS.records)
    throw new Error(
      "导入后会超过 100 篇上限。请先导出并删除不再需要的笔记，再重试；当前笔记库未改变。",
    );
  return { notesToAdd, skipped };
}

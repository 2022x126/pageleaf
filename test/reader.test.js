import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { randomUUID } from "node:crypto";
import { JSDOM } from "jsdom";
import { sanitizeArticle, safeHttpURL } from "../src/content.js";
import { buildMarkdown, noteFilename, searchNotes } from "../src/notes.js";
import { createReadingProgress } from "../src/progress.js";
import * as i18n from "../src/i18n.js";
import * as markup from "../src/markup.js";
import { demoArticle as makeDemoArticle } from "../src/demo.js";
import { organizeArticle } from "../src/organize.js";
import { createBackup, parseBackup, planImport, MAX_BACKUP_BYTES } from "../src/backup.js";

const root = new URL("../", import.meta.url);
const html = (
  await readFile(new URL("public/reader.html", root), "utf8")
).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const source = (await readFile(new URL("src/reader.js", root), "utf8")).replace(
  /^import\s+[\s\S]*?\sfrom\s+["'][^"']+["'];?\s*(?:\r?\n|$)/gm,
  "",
);

function note(id, overrides = {}) {
  return {
    id,
    title: `文章 ${id}`,
    url: `https://example.com/${id}`,
    siteName: "Example",
    author: "作者",
    excerpt: "",
    lang: "zh-CN",
    publishedTime: "",
    textContent: "正文小标题这是一篇用于验证本机保存行为的测试文章。",
    wordCount: 100,
    minutes: 1,
    capturedAt: "2026-10-20T08:00:00.000Z",
    updatedAt: "2026-10-20T08:00:00.000Z",
    mode: "article",
    warnings: [],
    content:
      "<h2>正文小标题</h2><p>这是一篇用于验证本机保存行为的测试文章。</p>",
    markdown: "## 正文小标题\n\n这是一篇用于验证本机保存行为的测试文章。",
    note: "",
    ...overrides,
  };
}

function deferred() {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

// Web Locks serialize writers across reader windows. The fake preserves that
// browser contract rather than bypassing locks by invoking every callback at once.
function lockManager() {
  const queues = new Map();
  async function drain(name, queue) {
    while (queue.length) {
      const request = queue[0];
      try {
        request.resolve(await request.callback({ name }));
      } catch (error) {
        request.reject(error);
      }
      queue.shift();
    }
    queues.delete(name);
  }
  return {
    request(name, callback) {
      return new Promise((resolve, reject) => {
        const queue = queues.get(name) || [];
        queues.set(name, queue);
        queue.push({ callback, resolve, reject });
        if (queue.length === 1) void drain(name, queue);
      });
    },
  };
}

function memoryStorage(initial = {}) {
  const values = structuredClone(initial);
  const api = {
    values,
    beforeGet: null,
    beforeSet: null,
    beforeRemove: null,
    async get(keys) {
      if (api.beforeGet) await api.beforeGet(keys);
      if (keys === null) return structuredClone(values);
      const selected = {};
      for (const key of Array.isArray(keys) ? keys : [keys]) {
        if (Object.hasOwn(values, key))
          selected[key] = structuredClone(values[key]);
      }
      return selected;
    },
    async set(changes) {
      if (api.beforeSet) await api.beforeSet(changes);
      Object.assign(values, structuredClone(changes));
    },
    async remove(keys) {
      if (api.beforeRemove) await api.beforeRemove(keys);
      for (const key of Array.isArray(keys) ? keys : [keys]) delete values[key];
    },
  };
  return api;
}

async function reader({
  local,
  locks = lockManager(),
  hash = "#note=first",
  languages = ["en"],
} = {}) {
  local ||= memoryStorage({
    "note:first": note("first"),
    "note:second": note("second"),
  });
  const dom = new JSDOM(html, {
    url: `https://pageleaf.test/reader.html${hash}`,
  });
  const { window } = dom;
  const downloads = [];
  const blobs = new Map();
  let printCalls = 0;
  class TestURL extends URL {
    static createObjectURL(blob) {
      const url = `blob:https://pageleaf.test/${randomUUID()}`;
      blobs.set(url, blob);
      return url;
    }
    static revokeObjectURL(url) { blobs.delete(url); }
  }
  window.HTMLAnchorElement.prototype.click = function () {
    downloads.push({ href: this.href, filename: this.download, blob: blobs.get(this.href) });
  };
  window.scrollTo = () => {};
  window.confirm = () => true;
  window.requestAnimationFrame = callback => window.setTimeout(() => callback(0), 0);
  window.print = () => {
    printCalls += 1;
    window.dispatchEvent(new window.Event("beforeprint"));
  };
  window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new window.Event("close"));
  };
  const context = vm.createContext({
    window,
    document: window.document,
    location: window.location,
    history: window.history,
    URL: TestURL,
    URLSearchParams,
    Blob,
    TextEncoder,
    crypto: { randomUUID },
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    matchMedia: () => ({ matches: false }),
    IntersectionObserver: class {
      observe() {}
      disconnect() {}
    },
    navigator: { languages, locks, clipboard: { async writeText() {} } },
    chrome: {
      storage: {
        local,
        session: memoryStorage(),
        onChanged: { addListener() {} },
      },
    },
    sanitizeArticle,
    safeHttpURL,
    buildMarkdown,
    noteFilename,
    searchNotes,
    createReadingProgress,
    createBackup,
    parseBackup,
    planImport,
    MAX_BACKUP_BYTES,
    ...i18n,
    ...markup,
    makeDemoArticle,
    organizeArticle,
  });
  // An async function allows the real top-level await without SourceTextModule or flags.
  const script = new vm.Script(
    `(async () => {\n${source}\nreturn {saveNote,deleteNote,renderArticle,progress:typeof readingProgress === "undefined" ? null : readingProgress};\n})()`,
    { filename: "reader-under-test.js" },
  );
  const api = await script.runInContext(context);
  // Complete the two restoration frames before tests begin pausing storage calls.
  for (let frame = 0; frame < 4; frame += 1) await new Promise(resolve => setTimeout(resolve, 0));
  const element = (id) => window.document.getElementById(id);
  const edit = (text) => {
    element("personal-note").value = text;
    element("personal-note").dispatchEvent(
      new window.Event("input", { bubbles: true }),
    );
  };
  return {
    dom,
    window,
    local,
    api,
    element,
    edit,
    downloads,
    getPrintCalls: () => printCalls,
    async close() { await api.progress?.dispose(); window.close(); },
  };
}

async function until(predicate, description) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  assert.fail(`Timed out waiting for ${description}`);
}


function selectArticleText(app, exact) {
  const body = app.element("article-body");
  const start = body.textContent.indexOf(exact);
  assert.ok(start >= 0, `Test selection must exist in article: ${exact}`);
  const end = start + exact.length;
  const walker = app.window.document.createTreeWalker(body, 4);
  let offset = 0, startPoint = null, endPoint = null, node;
  while ((node = walker.nextNode())) {
    const next = offset + node.data.length;
    if (!startPoint && start >= offset && start < next) startPoint = [node, start - offset];
    if (!endPoint && end > offset && end <= next) endPoint = [node, end - offset];
    offset = next;
  }
  assert.ok(startPoint && endPoint);
  const range = app.window.document.createRange();
  range.setStart(...startPoint);
  range.setEnd(...endPoint);
  const selection = app.window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  assert.equal(selection.toString(), exact);
  return {start, end, exact};
}
function clickTextMark(app, exact, style = "highlight") {
  const anchor = selectArticleText(app, exact);
  const button = app.window.document.querySelector(`[data-mark="${style}"]`);
  assert.ok(button);
  const down = new app.window.MouseEvent("pointerdown", {bubbles: true, cancelable: true});
  button.dispatchEvent(down);
  assert.equal(down.defaultPrevented, true, "mark toolbar must preserve the browser text selection");
  button.click();
  return {type: "text", style, ...anchor};
}
function pointer(app, type, clientX, clientY) {
  const event = new app.window.MouseEvent(type, {bubbles: true, cancelable: true, button: 0, clientX, clientY});
  Object.defineProperty(event, "pointerId", {value: 1});
  app.element("pen-layer").dispatchEvent(event);
  return event;
}

function selectBackup(app, backup) {
  const input = app.element("import-file");
  Object.defineProperty(input, "files", {
    configurable: true,
    value: [{ name: "pageleaf-backup.json", size: new TextEncoder().encode(backup).length, type: "application/json", async text() { return backup; } }],
  });
  input.dispatchEvent(new app.window.Event("change", { bubbles: true }));
}

test("saving disables editing and prevents switching to a different library note", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.edit("这份内容应保存到第一篇文章。");
  const entered = deferred();
  const release = deferred();
  let blocked = false;
  app.local.beforeGet = async (key) => {
    if (key === "note:first" && !blocked) {
      blocked = true;
      entered.resolve();
      await release.promise;
    }
  };
  const saving = app.api.saveNote();
  await entered.promise;
  assert.equal(app.element("save").disabled, true);
  assert.equal(app.element("personal-note").disabled, true);
  app.window.document
    .querySelector('[aria-label="Open note: 文章 second"]')
    .click();
  assert.equal(app.element("article-title").textContent, "文章 first");
  assert.equal(app.window.location.hash, "#note=first");
  assert.match(app.element("toast").textContent, /Saving/);
  release.resolve();
  await saving;
  assert.equal(
    app.local.values["note:first"].note,
    "这份内容应保存到第一篇文章。",
  );
  assert.equal(app.local.values["note:second"].note, "");
  assert.equal(app.element("personal-note").disabled, false);
  assert.match(app.element("save-state").textContent, /Saved/);
});

test("save writes its initial article and note snapshot even if the reader changes programmatically", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.edit("第一篇文章的保存快照");
  const requestedMark = clickTextMark(app, "用于验证", "highlight");
  const entered = deferred();
  const release = deferred();
  let blocked = false;
  app.local.beforeGet = async (key) => {
    if (key === "note:first" && !blocked) {
      blocked = true;
      entered.resolve();
      await release.promise;
    }
  };
  const saving = app.api.saveNote();
  await entered.promise;
  // Exercise the snapshot guarantee independently of the click-navigation guard.
  app.api.renderArticle(note("second", { note: "另一篇文章的内容", annotations: [{type: "text", style: "wavy", start: 0, end: 5, exact: "正文小标题"}] }));
  release.resolve();
  await saving;
  assert.equal(app.local.values["note:first"].note, "第一篇文章的保存快照");
  assert.equal(app.local.values["note:second"].note, "");
  assert.deepEqual(app.local.values["note:first"].annotations, [requestedMark]);
  assert.equal(app.local.values["note:first"].content, note("first").content);
  assert.equal(app.local.values["note:second"].annotations, undefined);
  assert.ok(app.element("article-body").querySelector('[data-pageleaf-annotation="wavy"]'));
  assert.equal(app.element("article-title").textContent, "文章 second");
  assert.equal(app.element("personal-note").value, "另一篇文章的内容");
});

test("simultaneous saves in two windows preserve both edits by copying the stale version", async (t) => {
  const local = memoryStorage({ "note:first": note("first") });
  const locks = lockManager();
  const first = await reader({ local, locks });
  const second = await reader({ local, locks });
  t.after(first.close);
  t.after(second.close);
  first.edit("窗口一的笔记");
  second.edit("窗口二的笔记");
  await Promise.all([first.api.saveNote(), second.api.saveNote()]);
  const saved = Object.entries(local.values)
    .filter(([key]) => key.startsWith("note:"))
    .map(([, value]) => value);
  assert.equal(saved.length, 2);
  assert.deepEqual(saved.map((value) => value.note).sort(), [
    "窗口一的笔记",
    "窗口二的笔记",
  ]);
  assert.equal(new Set(saved.map((value) => value.id)).size, 2);
  assert.notEqual(first.window.location.hash, second.window.location.hash);
  assert.match(second.element("toast").textContent, /new note/);
});

test("opening a note from the library updates the URL hash and preserves unsaved-change cancellation", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.edit("尚未保存的想法");
  app.window.confirm = () => false;
  app.window.document
    .querySelector('[aria-label="Open note: 文章 second"]')
    .click();
  assert.equal(app.window.location.hash, "#note=first");
  assert.equal(app.element("personal-note").value, "尚未保存的想法");
  app.window.confirm = () => true;
  app.window.document
    .querySelector('[aria-label="Open note: 文章 second"]')
    .click();
  assert.equal(app.window.location.hash, "#note=second");
  assert.equal(app.element("article-title").textContent, "文章 second");
});

test("a failed deletion leaves the confirmation open and permits retry", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.window.document
    .querySelector('[aria-label="Delete note: 文章 first"]')
    .click();
  let failures = 1;
  app.local.beforeRemove = async () => {
    if (failures-- > 0) throw new Error("temporary storage failure");
  };
  await app.api.deleteNote();
  assert.ok(app.local.values["note:first"]);
  assert.equal(app.element("delete-dialog").open, true);
  assert.equal(app.element("confirm-delete").disabled, false);
  assert.match(app.element("toast").textContent, /Deletion failed/);
  await app.api.deleteNote();
  assert.equal(app.local.values["note:first"], undefined);
  assert.equal(app.element("delete-dialog").open, false);
  assert.equal(app.element("welcome").hidden, false);
  assert.equal(app.window.location.hash, "");
});

test("storage rejection keeps unsaved notes available and re-enables controls", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.edit("即使空间不足，也不能丢失这段笔记。");
  app.local.beforeSet = async () => {
    throw new Error("QUOTA_BYTES quota exceeded");
  };
  await app.api.saveNote();
  assert.equal(app.local.values["note:first"].note, "");
  assert.equal(
    app.element("personal-note").value,
    "即使空间不足，也不能丢失这段笔记。",
  );
  assert.equal(app.element("save").disabled, false);
  assert.equal(app.element("personal-note").disabled, false);
  assert.match(app.element("save-state").textContent, /Unsaved/);
  assert.match(app.element("toast").textContent, /storage is full or unavailable/);
});

test("the library backup download contains saved notes without settings or reading progress", async (t) => {
  const local = memoryStorage({
    "note:first": note("first", { note: "已经保存的笔记" }),
    "settings": { dark: true, fontSize: 22 },
    "progress:first": { ratio: 0.65, updatedAt: "2026-10-21T00:00:00Z" },
    "capture:temporary": note("temporary"),
  });
  const app = await reader({ local });
  t.after(app.close);
  app.element("backup-library").click();
  await until(() => app.downloads.length === 1, "the backup download");
  const download = app.downloads[0];
  assert.match(download.filename, /^pageleaf-backup-\d{4}-\d{2}-\d{2}\.json$/);
  assert.match(download.blob.type, /^application\/json/);
  const envelope = JSON.parse(await download.blob.text());
  assert.equal(envelope.format, "pageleaf-backup");
  assert.equal(envelope.notes.length, 1);
  assert.equal(envelope.notes[0].note, "已经保存的笔记");
  assert.deepEqual(Object.keys(envelope).sort(), ["exportedAt", "format", "notes", "version"]);
  assert.ok(!Object.hasOwn(envelope.notes[0], "settings"));
  assert.ok(!Object.hasOwn(envelope.notes[0], "ratio"));
  assert.equal(app.element("backup-library").disabled, false);
});

test("backup import previews changes, preserves existing notes and skips a repeated import", async (t) => {
  const app = await reader();
  t.after(app.close);
  const original = structuredClone(app.local.values["note:first"]);
  const backup = createBackup([
    note("first", { note: "备份不能覆盖当前笔记" }),
    note("third", { note: "来自备份的新笔记" }),
  ]);
  selectBackup(app, backup);
  await until(() => app.element("import-dialog").open, "the import preview");
  assert.match(app.element("import-summary").textContent, /Notes to restore: 1. Duplicates to skip: 1/);
  assert.equal(app.local.values["note:third"], undefined);
  assert.deepEqual(app.local.values["note:first"], original);
  app.element("confirm-import").click();
  await until(() => !app.element("import-dialog").open && !app.element("confirm-import").disabled, "the confirmed import");
  assert.equal(app.local.values["note:third"].note, "来自备份的新笔记");
  assert.deepEqual(app.local.values["note:first"], original);
  assert.equal(app.element("note-count").textContent, "3");
  selectBackup(app, backup);
  await until(() => app.element("import-dialog").open, "the repeated import preview");
  assert.match(app.element("import-summary").textContent, /Notes to restore: 0. Duplicates to skip: 2/);
  app.element("confirm-import").click();
  await until(() => !app.element("import-dialog").open && !app.element("confirm-import").disabled, "the repeated import result");
  assert.equal(Object.keys(app.local.values).filter(key => key.startsWith("note:")).length, 3);
  assert.deepEqual(app.local.values["note:first"], original);
});

test("closing the import preview clears pending notes without writing the library", async (t) => {
  const app = await reader();
  t.after(app.close);
  selectBackup(app, createBackup([note("third")]));
  await until(() => app.element("import-dialog").open, "the cancelable import preview");
  app.element("cancel-import").click();
  assert.equal(app.element("import-dialog").open, false);
  // A late confirmation event after closing must not revive the previous file.
  app.element("confirm-import").click();
  await new Promise(resolve => setTimeout(resolve, 0));
  assert.equal(app.local.values["note:third"], undefined);
  assert.equal(app.element("note-count").textContent, "2");
});

test("printing includes the current unsaved personal note as text and refreshes it before print", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.edit('  未保存的想法 <img src="https://example.com/pixel">  ');
  app.element("print").click();
  assert.equal(app.getPrintCalls(), 1);
  assert.equal(app.element("print-note").textContent, '未保存的想法 <img src="https://example.com/pixel">');
  assert.equal(app.element("print-note").querySelector("img"), null);
  assert.equal(app.local.values["note:first"].note, "");
  app.edit("打印前又补充了一句话。");
  app.window.dispatchEvent(new app.window.Event("beforeprint"));
  assert.equal(app.element("print-note").textContent, "打印前又补充了一句话。");
  assert.match(app.element("save-state").textContent, /Unsaved/);
});

test("switching UI language preserves an unsaved draft, source text and article direction", async (testContext) => {
  const app = await reader();
  testContext.after(app.close);
  const body = app.element("article-body").innerHTML;
  const hash = app.window.location.hash;
  let confirmCalls = 0;
  app.window.confirm = () => { confirmCalls += 1; return false; };
  app.edit("My own words — 我的想法 — أفكاري");
  app.element("language").value = "ar";
  app.element("language").dispatchEvent(new app.window.Event("change", {bubbles: true}));
  await until(() => app.local.values.settings?.language === "ar", "the saved UI language");
  assert.equal(app.window.document.documentElement.lang, "ar");
  assert.equal(app.window.document.documentElement.dir, "rtl");
  assert.equal(app.element("article-body").lang, "zh-CN");
  assert.equal(app.element("article-body").dir, "auto");
  assert.equal(app.element("article-body").innerHTML, body);
  assert.equal(app.element("personal-note").value, "My own words — 我的想法 — أفكاري");
  assert.equal(app.element("save-state").textContent, i18n.t("ar", "unsavedChanges"));
  assert.equal(app.window.location.hash, hash);
  assert.equal(new URLSearchParams(app.window.location.search).get("lang"), "ar");
  assert.equal(confirmCalls, 0);
  assert.equal(app.local.values["note:first"].note, "");
  // Top-level navigation must still honor the draft after a language switch.
  const event = new app.window.MouseEvent("click", {bubbles: true, cancelable: true});
  const link = app.window.document.querySelector(".reader-nav a");
  link.dispatchEvent(event);
  assert.equal(event.defaultPrevented, true);
  assert.equal(confirmCalls, 1);
});

test("English fallback, preferred browser locale and explicit URL language resolve independently of article language", async (testContext) => {
  const fallback = await reader({languages: ["pt-BR"]});
  const french = await reader({languages: ["it", "fr-CA"]});
  const german = await reader({languages: ["fr"], hash: "?lang=de#note=first"});
  for (const app of [fallback, french, german]) testContext.after(app.close);
  assert.equal(fallback.window.document.documentElement.lang, "en");
  assert.equal(french.window.document.documentElement.lang, "fr");
  assert.equal(german.window.document.documentElement.lang, "de");
  assert.equal(german.element("article-title").textContent, "文章 first");
  assert.match(german.element("article-meta").textContent, /1 Min/);
});

test("saved language survives reopening and no supported locale has unresolved UI keys", async (testContext) => {
  const local = memoryStorage({"note:first": note("first"), settings: {dark: false, fontSize: 21, language: "ja"}});
  const app = await reader({local});
  testContext.after(app.close);
  assert.equal(app.window.document.documentElement.lang, "ja");
  for (const language of i18n.SUPPORTED_LANGUAGES) {
    app.element("language").value = language;
    app.element("language").dispatchEvent(new app.window.Event("change", {bubbles: true}));
    await until(() => app.local.values.settings?.language === language, "language persistence");
    assert.equal(app.element("save").textContent, i18n.t(language, "saveChanges"));
    for (const element of app.window.document.querySelectorAll("[data-i18n]")) {
      assert.notEqual(element.textContent, element.getAttribute("data-i18n"));
    }
  }
});


test("sample articles keep their actual language when the UI changes", async (testContext) => {
  const app = await reader({hash: "?lang=es&demo=1"});
  testContext.after(app.close);
  const sampleLanguage = makeDemoArticle("es").lang;
  assert.equal(app.element("article-body").lang, sampleLanguage);
  assert.equal(app.element("article-title").textContent, makeDemoArticle("es").title);
  const body = app.element("article-body").innerHTML;
  app.element("language").value = "zh-CN";
  app.element("language").dispatchEvent(new app.window.Event("change", {bubbles: true}));
  await until(() => app.local.values.settings?.language === "zh-CN", "sample language preference");
  assert.equal(app.element("article-body").lang, sampleLanguage);
  assert.equal(app.element("article-body").innerHTML, body);
  assert.equal(app.element("article-title").textContent, makeDemoArticle("es").title);
  assert.equal(new URLSearchParams(app.window.location.search).get("demo"), "1");
});

test("article text marks become unsaved edits, save separately from the source, and restore on reopening", async (t) => {
  const app = await reader(); t.after(app.close);
  const original = structuredClone(app.local.values["note:first"]);
  const text = app.element("article-body").textContent;
  const highlight = clickTextMark(app, "用于验证", "highlight");
  const wavy = clickTextMark(app, "本机保存行为", "wavy");
  assert.equal(app.element("save-state").textContent, i18n.t("en", "unsavedChanges"));
  assert.ok(app.element("article-body").querySelector('mark[data-pageleaf-annotation="highlight"]'));
  assert.ok(app.element("article-body").querySelector('span[data-pageleaf-annotation="wavy"]'));
  assert.equal(app.element("article-body").textContent, text);
  assert.equal(app.local.values["note:first"].annotations, undefined, "unsaved marks must not bypass Save");
  app.edit("Keep this personal note.");
  await app.api.saveNote();
  assert.deepEqual(app.local.values["note:first"].annotations, [highlight, wavy]);
  assert.equal(app.local.values["note:first"].content, original.content);
  assert.equal(app.local.values["note:first"].markdown, original.markdown);
  assert.equal(app.local.values["note:first"].note, "Keep this personal note.");
  const reopened = await reader({local: app.local}); t.after(reopened.close);
  assert.equal(reopened.element("personal-note").value, "Keep this personal note.");
  assert.equal(reopened.element("article-body").textContent, text);
  assert.equal(reopened.element("article-body").querySelector('[data-pageleaf-annotation="highlight"]').textContent, highlight.exact);
  assert.equal(reopened.element("article-body").querySelector('[data-pageleaf-annotation="wavy"]').textContent, wavy.exact);
  assert.equal(reopened.element("save-state").textContent, i18n.t("en", "savedLocal"));
});

test("organizing marked text previews it without replacing the draft and appends only after confirmation", async (t) => {
  const app = await reader(); t.after(app.close);
  const original = structuredClone(app.local.values["note:first"]);
  const draft = "    My existing thought — 这句话要保留。  \n";
  app.edit(draft);
  const mark = clickTextMark(app, "用于验证本机保存行为", "underline");
  app.element("organize").click();
  assert.equal(app.element("organize-dialog").open, true);
  const preview = app.element("organize-preview").textContent;
  assert.ok(preview.includes(mark.exact));
  assert.equal(app.element("organize-preview").querySelectorAll("ol > li").length, 1);
  assert.equal(preview.includes("##"), false, "the preview shows readable excerpts, not Markdown syntax");
  const appended = `${draft}\n\n${i18n.t("en", "organizeTitle")}\n• ${mark.exact}`;
  assert.equal(app.element("personal-note").value, draft);
  assert.deepEqual(app.local.values["note:first"], original);
  app.element("cancel-organize").click();
  assert.equal(app.element("organize-dialog").open, false);
  app.element("append-organize").click();
  assert.equal(app.element("personal-note").value, draft, "a closed preview cannot append stale generated notes");
  assert.deepEqual(app.local.values["note:first"], original);
  app.element("organize").click();
  assert.equal(app.element("organize-dialog").open, true);
  app.element("append-organize").click();
  assert.equal(app.element("organize-dialog").open, false);
  assert.equal(app.element("personal-note").value, appended);
  assert.equal(app.element("save-state").textContent, i18n.t("en", "unsavedChanges"));
  assert.deepEqual(app.local.values["note:first"], original);
  await app.api.saveNote();
  assert.equal(app.local.values["note:first"].note, appended);
  assert.deepEqual(app.local.values["note:first"].annotations, [mark]);
  assert.equal(app.local.values["note:first"].content, original.content);
});

test("undo and confirmed clear change marks without deleting personal notes or article text", async (t) => {
  const app = await reader(); t.after(app.close);
  const original = structuredClone(app.local.values["note:first"]);
  const draft = "A personal note that must survive clearing marks.";
  app.edit(draft);
  const text = app.element("article-body").textContent;
  clickTextMark(app, "用于验证", "highlight");
  clickTextMark(app, "本机保存行为", "wavy");
  app.element("undo-mark").click();
  assert.ok(app.element("article-body").querySelector('[data-pageleaf-annotation="highlight"]'));
  assert.equal(app.element("article-body").querySelector('[data-pageleaf-annotation="wavy"]'), null);
  assert.equal(app.element("personal-note").value, draft);
  app.window.confirm = () => false;
  app.element("clear-marks").click();
  assert.ok(app.element("article-body").querySelector('[data-pageleaf-annotation="highlight"]'));
  app.window.confirm = () => true;
  app.element("clear-marks").click();
  assert.equal(app.element("article-body").querySelector('[data-pageleaf-annotation]'), null);
  assert.equal(app.element("personal-note").value, draft);
  assert.equal(app.element("article-body").textContent, text);
  assert.equal(app.element("undo-mark").disabled, true);
  assert.equal(app.element("clear-marks").disabled, true);
  assert.deepEqual(app.local.values["note:first"], original);
  await app.api.saveNote();
  assert.deepEqual(app.local.values["note:first"].annotations, []);
  assert.equal(app.local.values["note:first"].note, draft);
  assert.equal(app.local.values["note:first"].content, original.content);
});

test("pen pointer input saves normalized strokes and restores its drawing without changing source text", async (t) => {
  const app = await reader(); t.after(app.close);
  const original = structuredClone(app.local.values["note:first"]);
  const text = app.element("article-body").textContent;
  const layer = app.element("pen-layer");
  layer.getBoundingClientRect = () => ({left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100});
  app.element("pen").click();
  assert.equal(app.element("pen").getAttribute("aria-pressed"), "true");
  assert.ok(app.element("article-surface").classList.contains("drawing"));
  assert.equal(pointer(app, "pointerdown", 10, 20).defaultPrevented, true);
  pointer(app, "pointermove", 50, 60);
  pointer(app, "pointerup", 90, 80);
  const path = layer.querySelector("path");
  assert.ok(path);
  assert.equal(path.getAttribute("d"), "M100.00,200.00 L500.00,600.00 L900.00,800.00");
  assert.equal(app.element("save-state").textContent, i18n.t("en", "unsavedChanges"));
  assert.equal(app.element("article-body").textContent, text);
  app.edit("My pen annotation.");
  await app.api.saveNote();
  assert.deepEqual(app.local.values["note:first"].annotations, [{type: "pen", points: [[0.1, 0.2], [0.5, 0.6], [0.9, 0.8]]}]);
  assert.equal(app.local.values["note:first"].content, original.content);
  assert.equal(app.element("pen").getAttribute("aria-pressed"), "false");
  const reopened = await reader({local: app.local}); t.after(reopened.close);
  assert.equal(reopened.element("pen-layer").querySelector("path").getAttribute("d"), path.getAttribute("d"));
  assert.equal(reopened.element("personal-note").value, "My pen annotation.");
  assert.equal(reopened.element("article-body").textContent, text);
});

test("collecting section excerpts can highlight matching source sentences without replacing the saved note", async (t) => {
  const original = note("first", {
    note: "Already saved: check access to the room.",
    content: '<h2>Before the meetup</h2><p>  Confirm <strong>the room</strong>\n before Friday. Send a reminder later.</p>',
    markdown: "## Before the meetup\n\nConfirm **the room** before Friday. Send a reminder later.",
    textContent: "Before the meetup  Confirm the room\n before Friday. Send a reminder later.",
    lang: "en",
  });
  const local = memoryStorage({"note:first": original});
  const app = await reader({local}); t.after(app.close);
  const text = app.element("article-body").textContent;
  assert.equal(app.element("article-body").querySelector("mark"), null);
  assert.equal(app.element("save-state").textContent, i18n.t("en", "savedLocal"));
  app.element("organize").click();
  assert.equal(app.element("organize-dialog").open, true);
  assert.ok(app.element("organize-preview").textContent.includes("Confirm the room before Friday."));
  assert.equal(app.element("personal-note").value, original.note);
  app.element("mark-organized").click();
  assert.equal(app.element("organize-dialog").open, false);
  assert.ok(app.element("article-body").querySelector('mark[data-pageleaf-annotation="highlight"]'));
  assert.equal(app.element("article-body").textContent, text);
  assert.equal(app.element("personal-note").value, original.note);
  assert.equal(app.element("save-state").textContent, i18n.t("en", "unsavedChanges"));
  assert.deepEqual(app.local.values["note:first"], original);
  await app.api.saveNote();
  const saved = app.local.values["note:first"];
  assert.equal(saved.annotations.length, 1);
  assert.equal(saved.annotations[0].exact.replace(/\s+/g, " "), "Confirm the room before Friday.");
  assert.equal(saved.annotations[0].style, "highlight");
  assert.equal(saved.content, original.content);
  assert.equal(saved.note, original.note);
  const reopened = await reader({local}); t.after(reopened.close);
  assert.ok(reopened.element("article-body").querySelector('mark[data-pageleaf-annotation="highlight"]'));
  assert.equal(reopened.element("article-body").textContent, text);
  assert.equal(reopened.element("personal-note").value, original.note);
});

test("opening the demo after a missing note clears its stale route and remains reloadable", async (t) => {
  const app = await reader({hash: "#note=missing"}); t.after(app.close);
  assert.equal(app.element("error-view").hidden, false);
  app.element("error-demo").click();
  assert.equal(app.window.location.hash, "");
  assert.equal(new URL(app.window.location.href).searchParams.has("demo"), true);
  assert.equal(app.element("error-view").hidden, true);
  const reopened = await reader({hash: app.window.location.search}); t.after(reopened.close);
  assert.equal(reopened.element("article-title").textContent, app.element("article-title").textContent);
  assert.equal(reopened.element("error-view").hidden, true);
});

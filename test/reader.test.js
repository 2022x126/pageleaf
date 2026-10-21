import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { randomUUID } from "node:crypto";
import { JSDOM } from "jsdom";
import { sanitizeArticle, safeHttpURL } from "../src/content.js";
import { buildMarkdown, noteFilename, searchNotes } from "../src/notes.js";

const root = new URL("../", import.meta.url);
const html = (
  await readFile(new URL("public/reader.html", root), "utf8")
).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const source = (await readFile(new URL("src/reader.js", root), "utf8")).replace(
  /^import[^\n]*\n/gm,
  "",
);

function note(id, overrides = {}) {
  return {
    id,
    title: `文章 ${id}`,
    url: `https://example.com/${id}`,
    siteName: "Example",
    author: "作者",
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
} = {}) {
  local ||= memoryStorage({
    "note:first": note("first"),
    "note:second": note("second"),
  });
  const dom = new JSDOM(html, {
    url: `https://pageleaf.test/reader.html${hash}`,
  });
  const { window } = dom;
  window.scrollTo = () => {};
  window.confirm = () => true;
  window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  const context = vm.createContext({
    window,
    document: window.document,
    location: window.location,
    history: window.history,
    URL,
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
    navigator: { locks, clipboard: { async writeText() {} } },
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
  });
  // An async function allows the real top-level await without SourceTextModule or flags.
  const script = new vm.Script(
    `(async () => {\n${source}\nreturn {saveNote,deleteNote,renderArticle};\n})()`,
    { filename: "reader-under-test.js" },
  );
  const api = await script.runInContext(context);
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
    close: () => window.close(),
  };
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
    .querySelector('[aria-label="打开笔记：文章 second"]')
    .click();
  assert.equal(app.element("article-title").textContent, "文章 first");
  assert.equal(app.window.location.hash, "#note=first");
  assert.match(app.element("toast").textContent, /正在保存/);
  release.resolve();
  await saving;
  assert.equal(
    app.local.values["note:first"].note,
    "这份内容应保存到第一篇文章。",
  );
  assert.equal(app.local.values["note:second"].note, "");
  assert.equal(app.element("personal-note").disabled, false);
  assert.match(app.element("save-state").textContent, /已保存/);
});

test("save writes its initial article and note snapshot even if the reader changes programmatically", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.edit("第一篇文章的保存快照");
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
  app.api.renderArticle(note("second", { note: "另一篇文章的内容" }));
  release.resolve();
  await saving;
  assert.equal(app.local.values["note:first"].note, "第一篇文章的保存快照");
  assert.equal(app.local.values["note:second"].note, "");
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
  assert.match(second.element("toast").textContent, /另存为新笔记/);
});

test("opening a note from the library updates the URL hash and preserves unsaved-change cancellation", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.edit("尚未保存的想法");
  app.window.confirm = () => false;
  app.window.document
    .querySelector('[aria-label="打开笔记：文章 second"]')
    .click();
  assert.equal(app.window.location.hash, "#note=first");
  assert.equal(app.element("personal-note").value, "尚未保存的想法");
  app.window.confirm = () => true;
  app.window.document
    .querySelector('[aria-label="打开笔记：文章 second"]')
    .click();
  assert.equal(app.window.location.hash, "#note=second");
  assert.equal(app.element("article-title").textContent, "文章 second");
});

test("a failed deletion leaves the confirmation open and permits retry", async (t) => {
  const app = await reader();
  t.after(app.close);
  app.window.document
    .querySelector('[aria-label="删除笔记：文章 first"]')
    .click();
  let failures = 1;
  app.local.beforeRemove = async () => {
    if (failures-- > 0) throw new Error("temporary storage failure");
  };
  await app.api.deleteNote();
  assert.ok(app.local.values["note:first"]);
  assert.equal(app.element("delete-dialog").open, true);
  assert.equal(app.element("confirm-delete").disabled, false);
  assert.match(app.element("toast").textContent, /删除失败/);
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
  assert.match(app.element("save-state").textContent, /未保存/);
  assert.match(app.element("toast").textContent, /存储空间不足或不可用/);
});

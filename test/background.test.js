import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(
  new URL("../src/background.js", import.meta.url),
  "utf8",
);
const NOW = Date.parse("2026-10-21T12:00:00.000Z");
const article = {
  title: "A real article",
  url: "https://example.com/article",
  content: "<p>Useful content</p>",
  markdown: "Useful content",
  capturedAt: new Date(NOW).toISOString(),
};
const plain = (value) => JSON.parse(JSON.stringify(value));
function deferred() {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
function harness(options = {}) {
  const state = plain(options.session ?? {});
  const calls = { scripts: [], tabs: [], badges: [], removals: [], locks: [] };
  const listeners = {},
    held = new Map();
  let sequence = 0;
  class Clock extends Date {
    constructor(...args) {
      super(...(args.length ? args : [NOW]));
    }
    static now() {
      return NOW;
    }
  }
  const chrome = {
    action: {
      onClicked: {
        addListener: (listener) => {
          listeners.click = listener;
        },
      },
      async setBadgeBackgroundColor(value) {
        calls.badges.push({ type: "color", ...plain(value) });
      },
      async setBadgeText(value) {
        calls.badges.push({ type: "text", ...plain(value) });
        if (value.text === "" && options.closedTab)
          throw new Error("No tab with id");
      },
    },
    scripting: {
      async executeScript(request) {
        calls.scripts.push(request);
        if (request.files) {
          options.injectionStarted?.resolve();
          if (options.injectionGate) await options.injectionGate.promise;
          if (options.injectionError) throw new Error(options.injectionError);
          return [
            {
              documentId: `document-${request.target.tabId}`,
              result: undefined,
            },
          ];
        }
        return [
          { result: options.result ?? { ok: true, article: plain(article) } },
        ];
      },
    },
    storage: {
      session: {
        async get(key) {
          return key === null
            ? plain(state)
            : Object.hasOwn(state, key)
              ? { [key]: plain(state[key]) }
              : {};
        },
        async set(values) {
          Object.assign(state, plain(values));
        },
        async remove(keys) {
          const list = Array.isArray(keys) ? [...keys] : [keys];
          calls.removals.push(list);
          for (const key of list) delete state[key];
        },
      },
    },
    runtime: {
      getURL: (value) => `chrome-extension://pageleaf-test/${value}`,
      onInstalled: {
        addListener: (listener) => {
          listeners.install = listener;
        },
      },
    },
    tabs: {
      async create(value) {
        calls.tabs.push(plain(value));
        if (options.createError) throw new Error("Browser window is closing");
        return { id: 100 + calls.tabs.length };
      },
    },
  };
  const navigator = {
    locks: {
      async request(name, config, callback) {
        if (typeof config === "function") {
          callback = config;
          config = {};
        }
        calls.locks.push({ name, config: plain(config) });
        while (held.has(name)) {
          if (config.ifAvailable) return await callback(null);
          await held.get(name).promise;
        }
        const release = deferred();
        held.set(name, release);
        try {
          return await callback({ name });
        } finally {
          held.delete(name);
          release.resolve();
        }
      },
    },
  };
  vm.runInNewContext(
    source,
    {
      chrome,
      navigator,
      Date: Clock,
      crypto: { randomUUID: () => `new-${++sequence}` },
      encodeURIComponent,
      TextEncoder,
      console,
    },
    { filename: "background.js" },
  );
  assert.equal(typeof listeners.click, "function");
  return {
    state,
    calls,
    listeners,
    click: (id = 7) => listeners.click({ id }),
  };
}

test("action captures only the invoked tab, stores its article and opens the corresponding reader", async () => {
  const env = harness({ session: { unrelated: { keep: true } } });
  await env.click(7);
  assert.equal(env.calls.scripts.length, 2);
  assert.deepEqual(plain(env.calls.scripts[0]), {
    target: { tabId: 7 },
    files: ["capture.js"],
  });
  assert.equal(typeof env.calls.scripts[1].func, "function");
  assert.deepEqual(plain(env.calls.scripts[1].target), {
    tabId: 7,
    documentIds: ["document-7"],
  });
  assert.deepEqual(env.state["capture:new-1"], { ...article, id: "new-1" });
  assert.deepEqual(env.state.unrelated, { keep: true });
  assert.deepEqual(env.calls.tabs, [
    { url: "chrome-extension://pageleaf-test/reader.html#capture=new-1" },
  ]);
  assert.deepEqual(env.calls.badges.at(-1), {
    type: "text",
    text: "",
    tabId: 7,
  });
});

test("restricted pages open a readable error without exposing the technical rejection", async () => {
  const env = harness({
    injectionError: "Cannot access contents of url chrome://settings/",
  });
  await env.click();
  assert.equal(env.calls.scripts.length, 1);
  assert.deepEqual(env.state, {});
  assert.equal(env.calls.tabs.length, 1);
  const url = new URL(env.calls.tabs[0].url);
  const message = new URLSearchParams(url.hash.slice(1)).get("error");
  assert.match(message, /普通文章网页/);
  assert.match(message, /浏览器设置/);
  assert.doesNotMatch(message, /Cannot access|chrome:\/\//);
  assert.equal(env.calls.badges.at(-1).text, "");
});

test("extractor failures preserve a user-facing explanation and create no saved capture", async () => {
  const env = harness({
    result: { ok: false, error: "选中的内容过长，请选中更少的文字。" },
  });
  await env.click();
  const url = new URL(env.calls.tabs[0].url);
  assert.equal(
    new URLSearchParams(url.hash.slice(1)).get("error"),
    "选中的内容过长，请选中更少的文字。",
  );
  assert.equal(Object.keys(env.state).length, 0);
});

test("rapid concurrent clicks produce one extraction, and a later click can reuse the released lock", async () => {
  const started = deferred(),
    gate = deferred();
  const env = harness({ injectionStarted: started, injectionGate: gate });
  const first = env.click(7);
  await started.promise;
  await env.click(7);
  assert.equal(
    env.calls.scripts.length,
    1,
    "second click must not inject during pending capture",
  );
  assert.equal(env.calls.tabs.length, 0);
  assert.deepEqual(env.calls.locks[0], {
    name: "pageleaf-capture:7",
    config: { ifAvailable: true },
  });
  gate.resolve();
  await first;
  assert.equal(env.calls.scripts.length, 2);
  assert.equal(env.calls.tabs.length, 1);
  await env.click(7);
  assert.equal(
    env.calls.scripts.length,
    4,
    "lock must release when capture completes",
  );
  assert.equal(env.calls.tabs.length, 2);
});

test("new captures retain the newest six and prune expired entries without touching unrelated keys", async () => {
  const session = {
    settings: { dark: true },
    "note:private": { note: "keep me" },
  };
  for (let index = 1; index <= 8; index++)
    session[`capture:recent-${index}`] = {
      ...article,
      id: `recent-${index}`,
      capturedAt: new Date(NOW - index * 60_000).toISOString(),
    };
  session["capture:old"] = {
    ...article,
    id: "old",
    capturedAt: new Date(NOW - 25 * 60 * 60 * 1000).toISOString(),
  };
  const env = harness({ session });
  await env.click();
  assert.deepEqual(
    Object.keys(env.state)
      .filter((key) => key.startsWith("capture:"))
      .sort(),
    [
      "capture:new-1",
      ...[1, 2, 3, 4, 5].map((index) => `capture:recent-${index}`),
    ].sort(),
  );
  assert.deepEqual(env.state.settings, { dark: true });
  assert.deepEqual(env.state["note:private"], { note: "keep me" });
  assert.deepEqual(
    [...env.calls.removals.flat()].sort(),
    [
      "capture:old",
      "capture:recent-6",
      "capture:recent-7",
      "capture:recent-8",
    ].sort(),
  );
});

test("a capture older than 24 hours expires even below the six-record limit", async () => {
  const env = harness({
    session: {
      "capture:expired": {
        ...article,
        capturedAt: new Date(NOW - 24 * 60 * 60 * 1000 - 1).toISOString(),
      },
      "capture:boundary": {
        ...article,
        capturedAt: new Date(NOW - 24 * 60 * 60 * 1000).toISOString(),
      },
    },
  });
  await env.click();
  assert.equal(env.state["capture:expired"], undefined);
  assert.ok(env.state["capture:boundary"]);
  assert.ok(env.state["capture:new-1"]);
});

test("closing the source tab during finally cleanup does not reject the action listener", async () => {
  const env = harness({ closedTab: true });
  await assert.doesNotReject(env.click());
  assert.ok(env.state["capture:new-1"]);
  assert.equal(env.calls.tabs.length, 1);
  assert.equal(env.calls.badges.at(-1).text, "");
});

test("a browser that rejects the error tab still leaves no rejected action promise", async () => {
  const env = harness({
    injectionError: "No tab with id",
    createError: true,
    closedTab: true,
  });
  await assert.doesNotReject(env.click());
  assert.equal(env.calls.tabs.length, 1);
  assert.equal(env.calls.badges.at(-1).text, "");
});

test("an invocation without a numeric tab id does no capture work", async () => {
  const env = harness();
  await env.listeners.click({ id: undefined });
  assert.equal(env.calls.scripts.length, 0);
  assert.equal(env.calls.tabs.length, 0);
  assert.deepEqual(env.state, {});
});

test("captures from different tabs serialize cache writes so the shared six-record cap holds", async () => {
  const session = {};
  for (let index = 1; index <= 5; index++)
    session[`capture:recent-${index}`] = {
      ...article,
      id: `recent-${index}`,
      capturedAt: new Date(NOW - index * 60_000).toISOString(),
    };
  const env = harness({ session });
  await Promise.all([env.click(7), env.click(8)]);
  const captures = Object.keys(env.state).filter((key) =>
    key.startsWith("capture:"),
  );
  assert.equal(captures.length, 6);
  assert.ok(env.state["capture:new-1"]);
  assert.ok(env.state["capture:new-2"]);
  assert.equal(env.state["capture:recent-5"], undefined);
  assert.equal(env.calls.tabs.length, 2);
  assert.equal(
    env.calls.locks.filter((call) => call.name === "pageleaf-capture-cache")
      .length,
    2,
  );
});

test("oversized UTF-8 captures produce an explanation before writing session storage", async () => {
  const env = harness({
    result: {
      ok: true,
      article: { ...article, markdown: "汉".repeat(340_000) },
    },
  });
  await env.click();
  assert.deepEqual(env.state, {});
  const url = new URL(env.calls.tabs[0].url);
  assert.match(
    new URLSearchParams(url.hash.slice(1)).get("error"),
    /正文内容太大/,
  );
  assert.equal(
    env.calls.locks.filter((call) => call.name === "pageleaf-capture-cache")
      .length,
    0,
  );
});

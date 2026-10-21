import test from 'node:test';
import assert from 'node:assert/strict';
import { createReadingProgress } from '../src/progress.js';

function deferred() {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
}

function environment(initial = {}) {
  const window = new EventTarget();
  const document = new EventTarget();
  const records = structuredClone(initial);
  const timers = new Map();
  const errors = [];
  const changes = [];
  const lockNames = [];
  let timerId = 0;
  let beforeGet = null;
  let failWrite = false;
  window.innerHeight = 1_000;
  window.scrollY = 0;
  window.scrollTo = (_x, y) => {
    window.scrollY = y;
    window.dispatchEvent(new Event('scroll'));
  };
  window.setTimeout = callback => { timers.set(++timerId, callback); return timerId; };
  window.clearTimeout = id => timers.delete(id);
  window.requestAnimationFrame = callback => queueMicrotask(() => callback(0));
  document.scrollingElement = { scrollHeight: 2_000, clientHeight: 1_000 };
  document.visibilityState = 'visible';
  const storage = {
    async get(keys) {
      if (beforeGet) await beforeGet(keys);
      const result = {};
      for (const key of Array.isArray(keys) ? keys : [keys]) {
        if (Object.hasOwn(records, key)) result[key] = structuredClone(records[key]);
      }
      return result;
    },
    async set(values) {
      if (failWrite) throw new Error('storage quota exceeded');
      Object.assign(records, structuredClone(values));
    },
  };
  const progress = createReadingProgress({
    storage,
    locks: { async request(name, callback) { lockNames.push(name); return await callback({ name }); } },
    window, document,
    onChange: ratio => changes.push(ratio),
    onError: error => errors.push(error),
  });
  return {
    window, document, records, errors, changes, lockNames, timers, progress,
    blockGet(callback) { beforeGet = callback; },
    rejectWrites() { failWrite = true; },
    scroll(y) { window.scrollTo(0, y); },
  };
}

test('unsaved captures report a bounded percentage but never create persistent progress', async () => {
  const app = environment();
  await app.progress.open('draft', false);
  app.scroll(400);
  await app.progress.flush();
  assert.equal(app.changes.at(-1), 0.4);
  assert.deepEqual(app.records, {});
  assert.equal(app.lockNames.length, 0);
  app.scroll(5_000);
  assert.equal(app.changes.at(-1), 1);
  await app.progress.dispose();
});

test('saved notes write only ratio and timestamp without modifying article data', async () => {
  const original = { id: 'a', note: '我的私人草稿', content: '<p>正文</p>', updatedAt: '2026-10-20T00:00:00Z' };
  const app = environment({ 'note:a': original });
  await app.progress.open('a', true);
  app.scroll(625);
  await app.progress.flush();
  assert.equal(app.records['progress:a'].ratio, 0.625);
  assert.deepEqual(Object.keys(app.records['progress:a']).sort(), ['ratio', 'updatedAt']);
  assert.ok(!Number.isNaN(Date.parse(app.records['progress:a'].updatedAt)));
  assert.deepEqual(app.records['note:a'], original);
  assert.ok(app.lockNames.every(name => name === 'pageleaf-notes-write'));
  await app.progress.dispose();
});

test('opening a new note flushes the previous tracked ratio despite an initial scroll reset', async () => {
  const app = environment({ 'note:a': { id: 'a' }, 'note:b': { id: 'b' } });
  await app.progress.open('a', true);
  app.scroll(700);
  // A render resets the new page before progress.open; browser scroll events are deferred.
  app.window.scrollY = 0;
  await app.progress.open('b', true);
  assert.equal(app.records['progress:a'].ratio, 0.7);
  assert.equal(app.window.scrollY, 0);
  await app.progress.dispose();
});

test('a delayed restore cannot scroll or report progress for a different note', async () => {
  const app = environment({
    'note:a': { id: 'a' }, 'progress:a': { ratio: 0.8 },
    'note:b': { id: 'b' }, 'progress:b': { ratio: 0.25 },
  });
  const entered = deferred();
  const release = deferred();
  app.blockGet(async keys => {
    if (Array.isArray(keys) && keys.includes('progress:a')) { entered.resolve(); await release.promise; }
  });
  const oldRestore = app.progress.open('a', true);
  await entered.promise;
  await app.progress.open('b', true);
  assert.equal(app.window.scrollY, 250);
  release.resolve();
  await oldRestore;
  assert.equal(app.window.scrollY, 250);
  assert.equal(app.changes.at(-1), 0.25);
  assert.equal(app.records['progress:a'].ratio, 0.8);
  await app.progress.dispose();
});

test('deleted notes never acquire orphan progress records', async () => {
  const app = environment({ 'note:a': { id: 'a' } });
  await app.progress.open('a', true);
  app.scroll(300);
  delete app.records['note:a'];
  await app.progress.flush();
  assert.equal(app.records['progress:a'], undefined);
  assert.deepEqual(app.records, {});
  await app.progress.dispose();
});

test('progress write failures report an error without changing note content or the reading position', async () => {
  const original = { id: 'a', note: '尚未整理完的想法', content: '保留原文' };
  const app = environment({ 'note:a': original });
  await app.progress.open('a', true);
  app.scroll(450);
  app.rejectWrites();
  await app.progress.flush();
  assert.equal(app.errors.length, 1);
  assert.deepEqual(app.records['note:a'], original);
  assert.equal(app.window.scrollY, 450);
  assert.equal(app.changes.at(-1), 0.45);
  await app.progress.dispose();
});

test('markSaved preserves the current position and resize restores the same ratio', async () => {
  const app = environment();
  await app.progress.open('draft', false);
  app.scroll(600);
  app.records['note:saved-copy'] = { id: 'saved-copy' };
  app.progress.markSaved('saved-copy');
  assert.equal(app.window.scrollY, 600);
  app.document.scrollingElement.scrollHeight = 3_000;
  app.window.dispatchEvent(new Event('resize'));
  assert.equal(app.window.scrollY, 1_200);
  await app.progress.flush();
  assert.equal(app.records['progress:saved-copy'].ratio, 0.6);
  assert.equal(app.records['progress:draft'], undefined);
  await app.progress.dispose();
});

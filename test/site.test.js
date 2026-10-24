import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { SITE_CONTENT, SITE_LANGUAGES, WEBSITE_PRIVACY } from '../src/site-content.js';
import { siteMarkup, renderSite, filterHelp, initSite } from '../src/site.js';

const shell = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
const helpShell = await readFile(new URL('../public/help.html', import.meta.url), 'utf8');
const setup = (html = shell, url = 'https://example.test/pageleaf/index.html') => new JSDOM(html, { url });
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, shape(entry)]));
  assert.equal(typeof value, 'string');
  assert.ok(value.trim().length > 0, 'No blank translation');
  return 'string';
}

test('all seven product locales contain every navigation, help and privacy item', () => {
  const expected = shape(SITE_CONTENT.en);
  assert.deepEqual(Object.keys(SITE_CONTENT), Object.keys(SITE_LANGUAGES));
  for (const [locale, content] of Object.entries(SITE_CONTENT)) {
    assert.deepEqual(shape(content), expected, locale);
    assert.equal(content.help.questions.length, 16);
    assert.deepEqual(content.help.questions.map(([id]) => id), SITE_CONTENT.en.help.questions.map(([id]) => id));
    assert.ok(WEBSITE_PRIVACY[locale][1].includes('GitHub'));
  }
});

test('home, help, privacy and about have meaningful static English content without JavaScript', async () => {
  for (const [page, file] of [['home','index'],['help','help'],['privacy','privacy'],['about','about']]) {
    const html = await readFile(new URL(`../public/${file}.html`, import.meta.url), 'utf8');
    const dom = setup(html);
    try {
      assert.equal(dom.window.document.querySelectorAll('h1').length, 1);
      assert.equal(dom.window.document.body.dataset.page, page);
      assert.ok(dom.window.document.getElementById('main').textContent.trim().length > 500);
      assert.equal(dom.window.document.querySelectorAll('.site-nav a').length, 4);
      assert.ok(!/<script\b(?![^>]*\bsrc=)[^>]*>/i.test(html));
    } finally { dom.window.close(); }
  }
});

test('all locales render every page, Arabic uses RTL, links keep language and demo flag', () => {
  const dom = setup();
  try {
    for (const locale of Object.keys(SITE_CONTENT)) for (const page of ['home', 'help', 'privacy', 'about']) {
      renderSite(dom.window.document, page, locale, true);
      const document = dom.window.document;
      assert.equal(document.documentElement.lang, locale);
      assert.equal(document.documentElement.dir, locale === 'ar' ? 'rtl' : 'ltr');
      assert.equal(document.querySelectorAll('h1').length, 1);
      assert.equal(document.querySelector('.site-nav [aria-current]').textContent, SITE_CONTENT[locale].nav[['home','help','privacy','about'].indexOf(page)]);
      assert.equal(document.getElementById('language').value, locale);
      assert.ok(document.body.classList.contains('dark'));
      for (const link of document.querySelectorAll('a[href]')) {
        if (/^(index|help|privacy|about|reader)\.html/.test(link.getAttribute('href'))) assert.equal(new URL(link.href).searchParams.get('lang'), locale);
        if (link.target === '_blank') assert.ok(link.rel.includes('noreferrer'));
      }
      if (page === 'home') assert.ok(new URL(document.querySelector('a[href^="reader.html"]').href).searchParams.has('demo'));
      if (page === 'home') {
        assert.equal(document.querySelectorAll('.sample-body li').length, 3);
        assert.equal(document.querySelector('.sample-body u').textContent, SITE_CONTENT[locale].home.exampleMarked);
      }
      if (page === 'privacy') assert.equal(document.querySelectorAll('.document-section').length, 9);
    }
  } finally { dom.window.close(); }
});

test('FAQ search matches answers, filters all terms, clears and treats HTML as inert text', () => {
  const dom = setup(helpShell);
  try {
    const document = dom.window.document;
    renderSite(document, 'help', 'en');
    assert.equal(document.getElementById('help-count').textContent, 'Results: 16');
    assert.equal(filterHelp(document, 'en', '20 MB'), 1);
    assert.equal(document.getElementById('help-count').textContent, 'Results: 1');
    assert.ok(!document.getElementById('limits').hidden);
    assert.ok(document.getElementById('limits').open);
    assert.equal(filterHelp(document, 'en', '<img onerror=alert(1)>'), 0);
    assert.equal(document.getElementById('help-empty').hidden, false);
    assert.equal(document.querySelectorAll('#faq-list img').length, 0);
    assert.equal(filterHelp(document, 'en', ''), 16);
    assert.ok([...document.querySelectorAll('.faq')].every((faq) => !faq.hidden && !faq.open));
    assert.equal(filterHelp(document, 'en', 'rule-based'), 1);
    assert.ok(!document.getElementById('organize').hidden);
    renderSite(document, 'help', 'zh-CN');
    assert.ok(filterHelp(document, 'zh-CN', '20 MB') > 0);
  } finally { dom.window.close(); }
});

test('locale priority and manual switches share preview keys with reader and preserve URL anchors', async () => {
  const dom = setup(helpShell, 'https://example.test/pageleaf/help.html?lang=ar#backup');
  try {
    const { window } = dom;
    window.localStorage.setItem('pageleaf-language', 'de');
    window.localStorage.setItem('pageleaf-dark', 'true');
    await initSite(window);
    assert.equal(window.document.documentElement.lang, 'ar');
    assert.ok(window.document.getElementById('backup').open);
    const select = window.document.getElementById('language');
    select.value = 'ja';
    select.dispatchEvent(new window.Event('change'));
    assert.equal(window.document.documentElement.lang, 'ja');
    assert.equal(window.localStorage.getItem('pageleaf-language'), 'ja');
    assert.equal(window.location.hash, '#backup');
    const input = window.document.getElementById('help-search');
    input.value = 'PDF';
    input.dispatchEvent(new window.Event('input'));
    window.document.getElementById('theme').click();
    assert.equal(window.localStorage.getItem('pageleaf-dark'), 'false');
    assert.equal(input.value, 'PDF');
  } finally { dom.window.close(); }
});

test('extension preference writes merge with existing reader settings and unsupported locales use English', async () => {
  const dom = setup();
  try {
    const { window } = dom;
    let saved = { settings: { language: 'xx', dark: false, fontSize: 22 } };
    window.chrome = { storage: { local: { async get() { return structuredClone(saved); }, async set(data) { saved = data; } } } };
    await initSite(window);
    assert.equal(window.document.documentElement.lang, 'en');
    const select = window.document.getElementById('language');
    select.value = 'fr';
    select.dispatchEvent(new window.Event('change'));
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(saved.settings, { language: 'fr', dark: false, fontSize: 22 });
    window.document.getElementById('theme').click();
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(saved.settings.dark, true);
    assert.equal(saved.settings.fontSize, 22);
  } finally { dom.window.close(); }
});

test('privacy copy explains actual storage, permissions and limits without certifications or remote assets', () => {
  const html = siteMarkup('privacy', 'en');
  for (const term of ['activeTab', 'scripting', 'storage', 'six', '24 hours', 'not additionally encrypted', 'GitHub Pages']) assert.ok(html.includes(term), term);
  const help = siteMarkup('help', 'en');
  for (const term of ['100 notes', '1 MB', '20 MB', 'chrome://extensions', 'never replaces']) assert.ok(help.includes(term), term);
  assert.ok(!/https?:\/\/[^"\s]*(?:\.png|\.svg|\.css|\.js)/.test(html));
});

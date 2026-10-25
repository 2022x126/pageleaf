import { SITE_CONTENT, SITE_LANGUAGES, WEBSITE_PRIVACY } from './site-content.js';
import { resolveLanguage } from './i18n.js';

const PAGES = ['index.html', 'help.html', 'privacy.html', 'about.html'];
const REPO = 'https://github.com/2022x126/pageleaf';
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const lines = (value) => escape(value).replace(/\n/g, '<br>');
const external = (path, label) => `<a href="${REPO}${path}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">↗</span></a>`;
const number = (locale, value) => new Intl.NumberFormat(locale).format(value);

export function siteMarkup(page = 'home', locale = 'en') {
  const c = SITE_CONTENT[locale] ?? SITE_CONTENT.en;
  const h = c.home;
  if (page === 'home') return `
    <section class="hero" aria-labelledby="page-title">
      <div class="hero-copy"><p class="eyebrow">${escape(h.eyebrow)}</p><h1 id="page-title">${lines(h.title)}</h1><p class="lead">${escape(h.lead)}</p>
        <div class="actions"><a class="button primary" href="reader.html?demo">${escape(h.try)} <span aria-hidden="true">↗</span></a><a class="button" href="help.html#install">${escape(h.install)}</a></div><p class="fineprint">${escape(h.hint)}</p></div>
      <aside class="sample" aria-label="${escape(h.example)}"><p class="sample-label">${escape(h.example)}</p><div class="sample-heading"><img src="assets/logo.svg" width="24" height="24" alt=""><span>Pageleaf</span></div><p class="sample-source">${escape(h.exampleSource)}</p><h2>${escape(h.exampleTitle)}</h2><div class="sample-note"><span>${escape(h.exampleNote)}</span><p>${escape(h.exampleThought)}</p></div><div class="sample-body"><p>${escape(h.exampleBody)}</p><ul>${h.examplePoints.map((point) => `<li>${point === h.exampleMarked ? `<u>${escape(point)}</u>` : escape(point)}</li>`).join('')}</ul></div><span class="sample-format" aria-hidden="true">.md</span></aside>
    </section>
    <section class="features section" aria-labelledby="features-title"><h2 id="features-title">${escape(h.featuresTitle)}</h2><div class="feature-grid">${h.features.map(([title, body], i) => `<article><span class="section-number" aria-hidden="true">${number(locale, i + 1).padStart(2, '0')}</span><h3>${escape(title)}</h3><p>${escape(body)}</p></article>`).join('')}</div></section>
    <section class="steps section" aria-labelledby="steps-title"><h2 id="steps-title">${escape(h.stepsTitle)}</h2><ol>${h.steps.map(([title, body]) => `<li><h3>${escape(title)}</h3><p>${escape(body)}</p></li>`).join('')}</ol><a class="text-link" href="help.html">${escape(h.helpLink)} <span aria-hidden="true">↗</span></a></section>
    <section class="local section"><div><h2>${escape(h.localTitle)}</h2><p>${escape(h.localBody)}</p><a class="text-link" href="privacy.html">${escape(h.privacyLink)} <span aria-hidden="true">↗</span></a></div><p class="compatibility">${escape(h.compatibility)}</p></section>`;
  const info = c[page] ?? c.about;
  const heading = `<header class="page-heading"><h1 id="page-title">${lines(info.title)}</h1><p class="lead">${escape(info.lead)}</p></header>`;
  if (page === 'help') return `${heading}
    <section id="install" class="install document-section"><div><span class="section-number" aria-hidden="true">01</span><h2>${escape(info.installTitle)}</h2><p>${escape(info.installIntro)}</p>${external('/releases', info.releases)}</div><ol>${info.installSteps.map((step) => `<li>${escape(step)}</li>`).join('')}</ol></section>
    <section class="help-articles section" aria-label="${escape(c.nav[1])}"><div class="help-search"><label for="help-search">${escape(info.search)}</label><input type="search" id="help-search" placeholder="${escape(info.placeholder)}" autocomplete="off" spellcheck="false"><p id="help-count" class="fineprint" role="status" aria-live="polite">${escape(info.results.replace('{count}', number(locale, info.questions.length)))}</p></div><div id="faq-list">${info.questions.map(([id, question, answer]) => `<details id="${id}" class="faq"><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join('')}</div><p id="help-empty" class="empty" hidden>${escape(info.empty)}</p><p class="support-link">${external('/issues', info.feedback)}</p></section>`;
  const sections = page === 'privacy' ? [...info.sections, WEBSITE_PRIVACY[locale] ?? WEBSITE_PRIVACY.en] : info.sections;
  return `${heading}<div class="document"><p class="fineprint">${escape(info.updated ?? `${c.version} · v0.3.1`)}</p>${sections.map(([title, body], i) => `<section class="document-section"><span class="section-number" aria-hidden="true">${number(locale, i + 1).padStart(2, '0')}</span><div><h2>${escape(title)}</h2><p>${escape(body)}</p></div></section>`).join('')}
    <div class="document-links">${page === 'privacy' ? external('/issues', info.link) : [external('', info.code), external('/releases', info.releases), external('/blob/main/LICENSE', info.license), external('/blob/main/CONTRIBUTING.md', info.contribute)].join('')}</div></div>`;
}

export function filterHelp(document, locale, query = '') {
  const c = SITE_CONTENT[locale] ?? SITE_CONTENT.en;
  const tokens = query.trim().normalize('NFKC').toLocaleLowerCase(locale).split(/\s+/u).filter(Boolean);
  let count = 0;
  for (const entry of document.querySelectorAll('.faq')) {
    const text = entry.textContent.normalize('NFKC').toLocaleLowerCase(locale);
    const show = tokens.every((token) => text.includes(token));
    entry.hidden = !show;
    if (tokens.length) entry.open = show;
    else entry.open = false;
    if (show) count++;
  }
  const result = document.getElementById('help-count');
  if (result) result.textContent = c.help.results.replace('{count}', number(locale, count));
  const empty = document.getElementById('help-empty');
  if (empty) empty.hidden = count > 0;
  return count;
}

export function renderSite(document, page, locale, dark = false) {
  locale = resolveLanguage(locale);
  const c = SITE_CONTENT[locale];
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('dark', dark);
  document.title = `${page === 'home' ? 'Pageleaf' : c.nav[['help', 'privacy', 'about'].indexOf(page) + 1] + ' · Pageleaf'}`;
  document.querySelector('.skip').textContent = c.skip;
  const nav = document.querySelector('.site-nav');
  nav.setAttribute('aria-label', c.nav[0]);
  nav.innerHTML = c.nav.map((name, i) => `<a href="${PAGES[i]}"${i === ['home', 'help', 'privacy', 'about'].indexOf(page) ? ' aria-current="page"' : ''}>${escape(name)}</a>`).join('');
  const label = document.getElementById('language-label');
  label.textContent = c.language;
  const select = document.getElementById('language');
  select.innerHTML = Object.entries(SITE_LANGUAGES).map(([code, name]) => `<option value="${code}" lang="${code}"${code === locale ? ' selected' : ''}>${name}</option>`).join('');
  const theme = document.getElementById('theme');
  theme.setAttribute('aria-label', c.theme[dark ? 1 : 0]);
  theme.title = c.theme[dark ? 1 : 0];
  theme.setAttribute('aria-pressed', String(dark));
  theme.textContent = dark ? '☀' : '◐';
  document.getElementById('main').innerHTML = siteMarkup(page, locale);
  document.getElementById('footer-message').textContent = c.footer;
  document.getElementById('footer-version').textContent = `${c.version} · 0.3.1`;
  document.getElementById('footer-privacy').textContent = c.nav[2];
  document.getElementById('footer-license').textContent = c.about.license + ' ↗';
  for (const link of document.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    if (!/^(?:index|help|privacy|about|reader)\.html(?:[?#]|$)/.test(href)) continue;
    const [path, hash = ''] = href.split('#');
    const [file, search = ''] = path.split('?');
    const params = new URLSearchParams(search);
    params.set('lang', locale);
    link.setAttribute('href', `${file}?${params}${hash ? '#' + hash : ''}`);
  }
  if (page === 'help') {
    filterHelp(document, locale);
    document.getElementById('help-search').addEventListener('input', (event) => filterHelp(document, locale, event.target.value));
    const target = document.defaultView?.location.hash.slice(1);
    const details = document.getElementById(target);
    if (details?.tagName === 'DETAILS') details.open = true;
  }
}

export async function initSite(window) {
  const { document } = window;
  const page = document.body.dataset.page ?? 'home';
  const extensionStorage = window.chrome?.storage?.local;
  let settings = {};
  let savedLanguage;
  let savedDark;
  try {
    if (extensionStorage) settings = (await extensionStorage.get('settings')).settings ?? {};
    else {
      savedLanguage = window.localStorage.getItem('pageleaf-language');
      const value = window.localStorage.getItem('pageleaf-dark');
      if (value !== null) savedDark = value === 'true';
    }
  } catch { /* Guides remain usable when preferences cannot be read. */ }
  const param = new URLSearchParams(window.location.search).get('lang');
  let locale = resolveLanguage(param || settings.language || savedLanguage || window.navigator.languages);
  let dark = typeof settings.dark === 'boolean' ? settings.dark : (savedDark ?? window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const render = () => renderSite(document, page, locale, dark);
  const persist = async (patch) => {
    try {
      if (extensionStorage) {
        const write = async () => {
          const previous = (await extensionStorage.get('settings')).settings ?? {};
          await extensionStorage.set({ settings: { ...previous, ...patch } });
        };
        if (window.navigator.locks) await window.navigator.locks.request('pageleaf-settings-write', write);
        else await write();
      } else {
        if ('language' in patch) window.localStorage.setItem('pageleaf-language', patch.language);
        if ('dark' in patch) window.localStorage.setItem('pageleaf-dark', String(patch.dark));
      }
    } catch { /* A denied preference write must not block reading or navigation. */ }
  };
  render();
  document.getElementById('language').addEventListener('change', async (event) => {
    locale = resolveLanguage(event.target.value);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    window.history.replaceState(null, '', url);
    render();
    await persist({ language: locale });
  });
  document.getElementById('theme').addEventListener('click', async () => {
    dark = !dark;
    // Keep FAQ input and disclosure state when only changing appearance.
    document.body.classList.toggle('dark', dark);
    const button = document.getElementById('theme');
    button.setAttribute('aria-label', SITE_CONTENT[locale].theme[dark ? 1 : 0]);
    button.title = button.getAttribute('aria-label');
    button.setAttribute('aria-pressed', String(dark));
    button.textContent = dark ? '☀' : '◐';
    await persist({ dark });
  });
}

if (typeof window !== 'undefined' && window.document.body?.dataset.page) void initSite(window);

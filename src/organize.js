import { sanitizeArticle } from './content.js';
import { resolveLanguage, t } from './i18n.js';

const MAX_ITEMS = 6;
const MAX_CHARACTERS = 300;
const cleanText = (value) => String(value || '').replace(/\s+/gu, ' ').trim();
const escapeMarkdown = (value) => cleanText(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/[\\`*_{}[\]#!|]/g, '\\$&');

function shorten(value) {
  const characters = Array.from(cleanText(value));
  return characters.length > MAX_CHARACTERS
    ? characters.slice(0, MAX_CHARACTERS - 1).join('') + '…'
    : characters.join('');
}

function firstSentence(value, locale) {
  const text = cleanText(value);
  if (!text) return '';
  if (typeof Intl.Segmenter === 'function') {
    const segments = new Intl.Segmenter(locale, { granularity: 'sentence' }).segment(text);
    const first = segments[Symbol.iterator]().next().value;
    return shorten(first?.segment || text);
  }
  return shorten(text.match(/^.*?[.!?。！？](?:\s|$)/u)?.[0] || text);
}

/**
 * Collect source quotations, not generated conclusions. Text marks take priority.
 * With no valid text marks, use the first sentence below each article heading.
 * The active document and its source article are never changed.
 */
export function organizeArticle({ content = '', annotations = [], document, locale = 'en' } = {}) {
  if (!document?.createElement) throw new Error('A document is required to collect excerpts.');
  const language = resolveLanguage(locale);
  const template = document.createElement('template');
  template.innerHTML = sanitizeArticle(content, undefined, document);
  const sourceText = cleanText(template.content.textContent);
  const seen = new Set();
  const markedItems = [];
  const marks = Array.isArray(annotations) ? annotations.slice(0, 100) : [];
  const orderedMarks = marks
    .map((mark, index) => ({ mark, index }))
    .filter(({mark}) => mark && typeof mark === 'object' && mark.type !== 'pen' && typeof mark.exact === 'string')
    .sort((a, b) => (Number.isInteger(a.mark.start) ? a.mark.start : a.index) - (Number.isInteger(b.mark.start) ? b.mark.start : b.index));
  for (const {mark} of orderedMarks) {
    const exact = cleanText(mark.exact);
    if (!exact || !sourceText.includes(exact) || seen.has(exact)) continue;
    seen.add(exact);
    markedItems.push({ text: shorten(exact), heading: '' });
    if (markedItems.length === MAX_ITEMS) break;
  }

  const items = markedItems;
  const source = items.length ? 'marks' : 'sections';
  if (!items.length) {
    let heading = '';
    let sectionIndex = 0;
    const hasHeadings = Boolean(template.content.querySelector('h1,h2,h3,h4,h5,h6'));
    const sectionUsed = new Set();
    for (const element of template.content.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li')) {
      if (/^H[1-6]$/.test(element.tagName)) {
        heading = cleanText(element.textContent);
        sectionIndex += 1;
        continue;
      }
      if (hasHeadings && !sectionIndex) continue;
      if (element.closest('pre') || (element.tagName === 'P' && element.closest('li'))) continue;
      const text = firstSentence(element.textContent, language);
      if (!text || seen.has(text) || (hasHeadings && sectionUsed.has(sectionIndex))) continue;
      seen.add(text);
      sectionUsed.add(sectionIndex);
      items.push({ text, heading: shorten(heading) });
      if (items.length === MAX_ITEMS) break;
    }
  }
  if (!items.length) return { items, markdown: '', source };
  const hint = t(language, source === 'marks' ? 'organizeMarksHint' : 'organizeSectionsHint');
  const quotes = items.map(({ text, heading }) => `${heading ? `### ${escapeMarkdown(heading)}\n\n` : ''}> ${escapeMarkdown(text)}`);
  return { items, source, markdown: `## ${t(language, 'organizeTitle')}\n\n${hint}\n\n${quotes.join('\n\n')}\n` };
}

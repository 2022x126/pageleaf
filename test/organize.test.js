import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { organizeArticle } from '../src/organize.js';
import { demoArticle } from '../src/demo.js';
import { SUPPORTED_LANGUAGES, t } from '../src/i18n.js';

function withDocument(run) {
  const dom = new JSDOM('<!doctype html><html><body><p id="keep">Do not change me.</p></body></html>');
  try { return run(dom.window.document); } finally { dom.window.close(); }
}

test('marked source passages take priority, sort in article order and skip duplicates or invented text', () => withDocument(document => {
  const content = '<h2>Plan</h2><p>Book the room. Tell the group.</p><h2>Afterwards</h2><p>Send the book list.</p>';
  const annotations = [
    { exact: 'Send the book list.', start: 50, type: 'text' },
    { exact: 'Book the room.', start: 4, type: 'text' },
    { exact: 'Book the room.', start: 4, style: 'wavy' },
    { exact: 'Invented recommendation.', start: 1 },
    { type: 'pen', exact: 'Tell the group.', start: 20 },
  ];
  const before = structuredClone(annotations);
  const result = organizeArticle({ content, annotations, document, locale: 'en' });
  assert.equal(result.source, 'marks');
  assert.deepEqual(result.items.map(x => x.text), ['Book the room.', 'Send the book list.']);
  assert.deepEqual(annotations, before);
  assert.equal(document.getElementById('keep').textContent, 'Do not change me.');
  assert.match(result.markdown, /These are the passages you marked/);
}));

test('without marks, quotes the first sentence of each section rather than writing a new summary', () => withDocument(document => {
  const result = organizeArticle({ content: '<p>Example instructions.</p><h2>时间</h2><p>周五确认场地。周六开始活动。</p><h2>材料</h2><p>每人带一本书。不要带多余的东西。</p>', document, locale: 'en' });
  assert.equal(result.source, 'sections');
  assert.deepEqual(result.items, [{heading: '时间', text: '周五确认场地。'}, {heading: '材料', text: '每人带一本书。'}]);
  assert.ok(!result.markdown.includes('Example instructions.'));
  assert.match(result.markdown, /not an AI summary/);
}));

test('pages without headings can supply opening sentences from several paragraphs', () => withDocument(document => {
  const result = organizeArticle({content:'<p>One task. More detail.</p><p>Another task. Further detail.</p>',document});
  assert.deepEqual(result.items.map(x=>x.text), ['One task.', 'Another task.']);
}));

test('literal HTML and Markdown syntax in source stays inert in generated quotation Markdown', () => withDocument(document => {
  const text = '<script>alert(1)</script> # heading **bold** & data';
  const result = organizeArticle({ content:'<h2>&lt;img src=x&gt; # title</h2><p>&lt;script&gt;alert(1)&lt;/script&gt; # heading **bold** &amp; data</p>', annotations:[{type:'text',exact:text,start:0}],document });
  assert.equal(result.items[0].text, text);
  assert.ok(!result.markdown.includes('<script>'));
  assert.match(result.markdown, /&lt;script&gt;/);
  assert.ok(result.markdown.includes(String.raw`\# heading \*\*bold\*\*`));
  assert.match(result.markdown, /&amp; data/);
  const sections = organizeArticle({content:'<h2>&lt;img src=x&gt; # title</h2><p>Useful text.</p>',document});
  assert.ok(!sections.markdown.includes('<img'));
  assert.match(sections.markdown, /&lt;img src=x&gt; \\# title/);
}));

test('limits excerpts to six items and 300 Unicode characters each', () => withDocument(document => {
  const content=Array.from({length:10},(_,i)=>`<h2>Section ${i}</h2><p>${i} ${'🙂'.repeat(350)}.</p>`).join('');
  const result=organizeArticle({content,document});
  assert.equal(result.items.length,6);
  for(const item of result.items) assert.ok(Array.from(item.text).length<=300);
  assert.equal(result.items[0].text.endsWith('…'),true);
}));

test('empty and active content produces no invented excerpt or executable markup', () => withDocument(document => {
  const result=organizeArticle({content:'<script>fake note</script><img src="https://example.com/pixel">',annotations:[{exact:'fake note'}],document});
  assert.deepEqual(result.items,[]);
  assert.equal(result.markdown,'');
  assert.equal(document.querySelector('img'),null);
}));

test('all seven demo articles are specific fictional plans with tasks and matching content language', () => withDocument(document => {
  for(const locale of SUPPORTED_LANGUAGES){
    const article=demoArticle(locale);
    assert.equal(article.lang,locale);
    assert.equal(article.mode,'demo');
    assert.equal(article.url,'');
    assert.ok(article.id && article.markdown && article.textContent);
    const template=document.createElement('template');template.innerHTML=article.content;
    assert.equal(template.content.querySelectorAll('h2').length,4);
    assert.equal(template.content.querySelectorAll('li').length,3);
    assert.equal(template.content.querySelector('script'),null);
    assert.ok(organizeArticle({content:article.content,document,locale}).items.length>=3);
    for(const key of ['markTools','mdMarks','markInArticle','autoMarked','organize','appendToNote']) assert.notEqual(t(locale,key),key);
  }
}));

test('the demo opens with real editable highlights and wavy marks anchored to its source in every language', () => {
  for (const locale of ['en','zh-CN','es','fr','de','ja','ar']) {
    const article = demoArticle(locale);
    const doc = new JSDOM('<main></main>').window.document;
    const template = doc.createElement('template'); template.innerHTML = article.content;
    const raw = template.content.textContent;
    assert.equal(article.annotations.length, 2);
    for (const mark of article.annotations) assert.equal(raw.slice(mark.start, mark.end),mark.exact);
    assert.deepEqual(article.annotations.map(mark=>mark.style),['highlight','wavy']);
  }
});

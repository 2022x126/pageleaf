# Validation — 0.3.0

Date: 2026-10-24

## Automated checks

- `npm run check`: 97 tests pass. Build and static checks confirm Manifest V3, only `activeTab` / `scripting` / `storage`, seven manifest locales, icon dimensions, local assets, CSP, inert SVGs and no application network calls.
- Extraction runs real Readability, Turndown and sanitization against controlled multilingual HTML, selected text, dangerous markup, editable regions, tables, code and source URL cleaning. Background tests cover tab/document binding, concurrent capture, size limits and temporary-cache cleanup.
- Reader tests run actual reader code in a DOM with simulated Chrome storage: save snapshots, concurrent windows, conflict copies, drafts, errors, deletion retries, backup import/export preparation and literal print-note preparation.
- Annotation tests cover mixed-language ranges, inline formatting, overlaps, whitespace offsets, invalid or stale anchors, safe field whitelists and normalized pen strokes. Reader integration verifies marking, undo/clear, save/reopen, pen input, organization preview/cancellation/append, automatic source marking and preserving the exact existing note, including whitespace. Opening the demo after a missing note clears the stale route so refresh can load the example.
- JSON backup round trips retain validated text and pen marks, sanitize HTML and skip duplicates without replacing notes. Markdown includes inert marked quotations and omits pen strokes. Existing backup/progress/search limits and failure tests pass.
- All seven languages have complete reader/product labels. Tests cover locale matching, English fallback, Arabic RTL, navigation, preference merging, source-language preservation, FAQ answer search and static English pages without JavaScript. Demo marks match the source text in every supported language. No native-speaker review is claimed.

## Visible browser checks

The public examples were opened in the user's visible Chrome profile. Only fictional sample content was used.

- Chinese Home, Help and Privacy show the rewritten short copy, shared logo and working navigation. Searching Help for `画笔` returns the pen and organization explanations. Earlier checks also covered English answer-only Help search and Arabic cross-page navigation.
- The revised reading example displays a real editable highlight and wavy underline in pure white and pure black. A real pointer drag creates a pen stroke. Organization opens a clean numbered list without Markdown syntax; confirming appends source excerpts to My notes and Save updates the preview library. Automated tests additionally cover restoration in extension storage; the website itself only uses page memory.
- The Arabic sample was checked at 390 × 844: the toolbar wraps, the article remains right-to-left and document client/scroll widths both equal 390 px. The temporary viewport override was reset. Earlier language-switch checks confirmed that a multilingual personal draft and source text remain unchanged.
- Current screenshots: `home.png`, `help.png`, `privacy.png`, `reader.png`, `reader-dark.png`, `reader-ar.png`, `demo-markup.png` and `organize.png`. These are web previews, not proof of installed-extension acceptance.

## Remaining acceptance boundaries

Chrome's extension-management page was blocked by the browser automation URL policy; no workaround was attempted. Loading the unpacked build, real toolbar activation and capture in the daily profile, browser-restart persistence and an end-to-end installed-extension file download remain manual acceptance items.

Browser download file contents and actual print/PDF pagination have not been confirmed through the UI. Tests verify payload and print-content preparation. Pen strokes use proportional page coordinates and can shift after font or window changes; inspect drawings and the print preview before exporting.

No Chrome Web Store submission has been made. There are no claims about users, installations, Stars, adoption or OpenAI program approval. No activity application was resubmitted.

## Public website

The public site is live at https://2022x126.github.io/pageleaf/. GitHub Pages reports `built`, `gh-pages` source at `/`, and HTTPS enforced. The homepage returns HTTP 200. Home, Privacy and the interactive reader were opened through the deployed HTTPS site in the visible Chrome profile; the clean organization preview and source marking controls work there. Only the 18 whitelisted public assets were deployed; the extension manifest, worker and private workspace files are excluded.

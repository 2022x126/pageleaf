# Chrome Web Store Listing — Pageleaf

> Last updated: 2026-10-24
> Version: 0.3.0
> Chrome Web Store status: Draft; not submitted or published. GitHub development releases and a product website are separate from store publication.

## Store listing

**Extension name**: Pageleaf

**Short description**: Turn articles and selected text into local notes. Read, search, back up and export Markdown.

**Detailed description**:

Pageleaf turns a web article or selected passage into a readable note, with a minimal white or black appearance.

Highlight selected text, add straight or wavy underlines, or draw with the pen. Collect marked quotations, or section-opening sentences, into a preview before adding them to your note. Save to keep marks and drawings. Markdown includes marked text; JSON includes both text marks and pen strokes.

Read with an article outline and adjustable text size. Add your own thoughts, explicitly save a note, and find it again with full-text search. Saved notes remember your reading position on this device.

Copy or download Markdown, back up the whole note library as JSON, and preview a restore before confirming. Restoration skips duplicates and preserves existing notes. Print or choose Save as PDF through the browser's print dialog.

A Home page, searchable Help center, Privacy page and About page explain how to start, what is stored and how to export or delete your data. These guides ship inside the extension. The interface and product guides are available in English, Simplified Chinese, Spanish, French, German, Japanese and Arabic, with automatic browser-language selection, an English fallback and a manual language selector. Arabic uses a right-to-left interface. Changing the interface language does not translate the article or your personal notes.

No account, API key or subscription is required. Article content, notes and preferences stay in your current Chrome profile. There is no telemetry, advertising or cloud sync. The reader does not automatically load original article images or embeds.

Open an ordinary HTTP/HTTPS article and click the Pageleaf toolbar icon; select a passage first if you only need that part. Extraction depends on page structure. PDFs, browser-internal pages, image/video-only articles and some complex pages are unsupported. Pageleaf does not bypass logins, paywalls or access controls.

Support: https://github.com/2022x126/pageleaf/issues

**Category**: Productivity

**Single purpose**: Turn the current article or selected passage that the user explicitly invokes Pageleaf on into a personal note for local reading, saving, search and export.

**Primary language**: English (`en`; also the manifest's default locale).

**Bundled localizations**: `en`, `zh_CN`, `es`, `fr`, `de`, `ja`, `ar` in the Chrome manifest catalogs; UI language codes use `zh-CN`. The Chinese localized name is Pageleaf · 叶笺. Seven included translations are not a claim of support for all languages, universal website compatibility or native-speaker review.

## Graphics and assets

| Asset | Dimensions | Status | File |
| --- | --- | --- | --- |
| Store/extension icon | 128×128 PNG | Leaf-P mark; reproduce with `node scripts/generate-icons.mjs`, verify against final build | `dist/icons/icon-128.png` |
| Toolbar/management icons | 16×16, 32×32, 48×48 PNG | Actual separate RGBA PNG files; white carrier and black mark for light/dark toolbars | `dist/icons/icon-16.png`, `icon-32.png`, `icon-48.png` |
| Vector master | 64×64 view box | Transparent single-color master; see `docs/BRAND.md` | `public/assets/logo.svg` |
| Home | Store screenshot dimensions require checking | Web preview; installed-extension/store acceptance pending | `docs/home.png` |
| Help center | Store screenshot dimensions require checking | Web preview; installed-extension/store acceptance pending | `docs/help.png` |
| Privacy | Store screenshot dimensions require checking | Web preview; installed-extension/store acceptance pending | `docs/privacy.png` |
| Reader | Store screenshot dimensions require checking | Web preview; installed-extension/store acceptance pending | `docs/reader.png` |
| Arabic reader | Store screenshot dimensions require checking | Web preview of RTL interface with original-language article | `docs/reader-ar.png` |
| Small promo tile | 440×280 | Not created; optional | |
| Marquee promo tile | 1400×560 | Not created; optional | |

Use only public sample content in screenshots. Web previews do not establish installed Chrome behavior. Before submission, take final screenshots at the currently required store size and record the actual measurements and installed-extension checks in `docs/VALIDATION.md`. The interface uses white/black with no illustrations, gradients, decorative backgrounds, textures or remote fonts.

## Permissions justification

| Permission | Type | Specific purpose |
| --- | --- | --- |
| `activeTab` | permissions | Temporarily reads the current page when the user invokes Pageleaf, so an article or selected passage can become a personal note. |
| `scripting` | permissions | Runs the bundled extractor on that temporarily authorized page. No persistent content script or remote code is installed. |
| `storage` | permissions | Keeps session captures, explicitly saved notes, saved-note reading positions and language/display preferences locally, and supplies user-controlled backup/restore. |

**host_permissions**: none. **optional_host_permissions**: none. No `tabs`, `history`, `cookies`, `identity`, `downloads` or general filesystem permission. Home, help, translations and the new logo add no permissions. User-triggered browser operations handle download, file selection, clipboard and printing.

## Privacy and data use

**Handles user data?** Yes, locally. **Developer receives articles, notes, progress, preferences or backups?** No. Dashboard disclosures must distinguish local handling from off-device transmission and match `PRIVACY.md` and the bundled Privacy page.

| Data type | Local handling | Off-device transmission by extension | Purpose |
| --- | --- | --- | --- |
| Website content | Invoked article/selection, metadata, personal notes, text marks, pen coordinates and user-selected JSON backup | No | Reading, search, notes, export and restoration |
| User activity/preferences | Saved-note reading ratio/update time, interface language and display preferences; no browsing log | No | Continue reading and remember interface choices |
| Web history | No history access; individual notes retain their cleaned source URLs | No | Attribution |
| Personal, health, financial or location data; private communications | May occur in content the user chooses; never separately requested | No | The same user-requested note features |
| Authentication information | No credential/cookie access; URL credentials, query parameters and fragments removed | No | Not collected as account data |

Temporary captures use session memory: at most six records, records older than 24 hours pruned on a later capture, and cleared on browser exit. An open reader may hold a memory copy until closed. Saved notes use local storage, up to 100 notes and 1 MB each, until deletion/uninstall. Saved-note progress is a local ratio and update time, with scroll writes throttled to 750 ms; deleting a note deletes its progress. Language selection uses browser preferences locally, or the user's manual choice. Arabic RTL and locale-formatted dates do not use a remote translation or detection service.

JSON backups contain notes only, excluding progress and language/display preferences. Files are limited to 20 MB; restoration validates limits, re-sanitizes content and rebuilds Markdown before adding notes. Existing IDs or matching source/extraction-mode/article-text combinations are skipped. Existing notes are not overwritten.

Local data and exported files are not additionally encrypted. Clipboard, downloads and browser print/PDF saving are user-controlled. Deletion does not remove export files, clipboard copies, printouts or system backups. Clicking an external link visits the destination site under its own policy. There is no backend, telemetry, advertising, cloud sync, remote runtime code/font loading or passive article-image/embedded-resource loading inside the extension.

A standalone product-site preview is distinct from extension storage: notes are page-memory only and disappear on refresh. Only language and white/black appearance choices can be kept in that site's `localStorage`. If the static product site is hosted on GitHub Pages, visiting it requires normal requests to GitHub for pages/assets; that hosting traffic is distinct from Pageleaf telemetry or transmission of note content. See `docs/WEBSITE.md` for deployment and hosting boundaries.

### Data-use certification

- [x] Data is not sold to third parties.
- [x] Data is not used for purposes unrelated to the extension's core function.
- [x] Data is not used for creditworthiness or lending purposes.

These describe project behavior, not a legal certification or independent privacy audit.

## Privacy policy

**Source**: `PRIVACY.md`, included in source and install packages; readable bundled policy at `privacy.html`.

**Privacy policy URL**: https://2022x126.github.io/pageleaf/privacy.html

Verified publicly reachable in Chrome on 2026-10-24. This does not establish store submission or approval.

## Distribution

**Visibility**:

**Regions**:

## Developer information

**Publisher name** [REQUIRED]:

**Contact email** [REQUIRED]:

**Support URL / email**: https://github.com/2022x126/pageleaf/issues

**Repository URL**: https://github.com/2022x126/pageleaf

**Public product homepage URL**:

**Chrome Web Store extension ID / listing URL**:

## Version history

| Version | Date | Changes | Chrome Web Store status |
| --- | --- | --- | --- |
| 0.3.0 | 2026-10-24 | Text highlights, underlines, wavy lines, pen strokes and reviewed excerpt collection; practical seven-language demo and plainer product copy; shared Pageleaf identity and Leaf-P logo; Home, searchable Help, Privacy and About; first-install/options Home; seven interface/guide languages, automatic selection/English fallback, Arabic RTL and locale-aware dates. No new permissions or note-content transmission. | Draft |
| 0.2.0 | 2026-10-21 | White/black interface, full-text search, JSON backup/restore, browser print/PDF and local saved-note reading progress. | Draft |
| 0.1.0 | 2026-10-21 | Initial article/selection extraction, reader, local notes and Markdown export. | Draft |

## Review notes

### Known limits

Extraction depends on page structure. No PDF/image/video extraction, login/paywall bypass, iframe crawling or pagination retrieval. Images are omitted; complex tables/formulas and query-dependent links may need manual correction. Browser print/PDF output depends on user settings. UI translations are included for seven languages, but articles are not translated; further translation review and browser-specific verification remain useful.

### Publication readiness

- [ ] Listing, permissions, translations and icons checked against the final build.
- [ ] Installed Chrome end-to-end acceptance recorded in `docs/VALIDATION.md`.
- [ ] Store screenshots at required dimensions captured with public sample content.
- [ ] Reachable public policy/homepage URLs, publisher, contact, visibility and regions completed.
- [ ] Install ZIP checked; disclosures matched to actual runtime code and product policy.
- [ ] Publisher submitted the version and recorded its review result.

### Rejection history

None. No Chrome Web Store submission has been made.

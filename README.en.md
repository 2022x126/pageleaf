# Pageleaf

Turn a page worth keeping into a portable Markdown note.

Pageleaf is a local-first Chrome extension. Click its icon to extract an article or selected text, read it in a focused reader, add a personal note, and copy, download, or explicitly save it in a local library. No account, API key, paid service, or cloud backend is required.

[简体中文](README.md) · [Privacy](PRIVACY.md) · [Contributing](CONTRIBUTING.md)

## Features

- On-demand article extraction; selected text takes priority.
- A reading view with a table of contents, font size controls, and light/dark themes.
- Markdown export with source attribution and personal notes, retaining headings, lists, code blocks, links, and simple tables.
- A searchable local library with explicit save and confirmed deletion.
- No persistent site access, analytics, cloud sync, remote scripts, or automatic browsing-history scans.

## Build and install

Use Node.js 22+ and desktop Chrome:

```sh
npm ci
npm run check
```

Visit `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select the generated **`dist` directory**. Pin Pageleaf in Chrome's extension menu, open an ordinary HTTP/HTTPS article, and click the extension icon. For a release ZIP, extract it first and select the directory containing `manifest.json`.

## Privacy and permissions

`activeTab` grants access to the current page when you invoke the extension. `scripting` runs the bundled extractor. `storage` keeps temporary captures, explicitly saved notes, and reader preferences. There are no persistent host permissions or access to all tabs/history.

Unsaved captures are held in `chrome.storage.session`, cleared when the browser exits, limited to six records, and pruned after 24 hours when a new capture is made. Explicitly saved notes are kept in `chrome.storage.local`, up to 100 records, **without additional encryption**. Reader preferences are local too. The reader omits remote images to avoid image requests. Opening the original page or a link is a normal browser navigation to that site. Source URL credentials, query strings, and fragments are stripped, so query-based article links may require manual repair.

See [PRIVACY.md](PRIVACY.md) for the complete policy. Local storage does not make the extension a secure vault.

## Development

```sh
npm test
npm run build
npm run check
npm run package
```

The lockfile fixes dependency versions. All runtime code is bundled; the extension does not load remote code. Packaging creates install and source ZIPs in the parent directory. Third-party licenses are recorded in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Automated checks do not replace manual Chrome acceptance. Before publishing, verify loading, toolbar invocation, real article capture, clipboard and download actions, refresh, persistence after reopening, deletion, and restricted-page errors.

## Status and limitations

Version **0.1.0** is an initial development release and is not published in the Chrome Web Store. No adoption, download, star, or maintenance-history claims are made.

Extraction varies by page structure. PDFs, image-only content, video, complex applications, browser-internal pages, and other restricted pages are unsupported. Pageleaf does not bypass authentication, paywalls, or access controls. It reads currently loaded content rather than downloading pagination or iframe contents. Images are omitted; complex tables and mathematical notation may need manual correction. Large captures are limited and produce a visible explanation.

Original project code is [MIT licensed](LICENSE). Extracted website content remains subject to its authors' rights and terms. Publisher identity and public support channels must be supplied by the maintainer before publication.

## Browser preview

After building, serve the project locally and open `dist/reader.html?demo`. This is an in-memory reader preview: notes disappear on refresh. It does not verify toolbar capture or persistent extension storage. See [validation notes](docs/VALIDATION.md) for the exact completed checks and remaining manual acceptance.

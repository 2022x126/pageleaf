# Pageleaf

Turn an article into a readable, editable, portable note.

Pageleaf is a local-first Chrome extension. Invoke its toolbar action to extract an article or selected text, add your thoughts, and save, search or export the result. **v0.2.0** has a minimal white/black interface. No account, API key or paid service is required.

[简体中文](README.md) · [Privacy](PRIVACY.md) · [Contributing](CONTRIBUTING.md) · [Releases](https://github.com/2022x126/pageleaf/releases)

![White reader web preview](docs/reader.png)

## Features

- On-demand article extraction, with selected text taking priority.
- A table of contents, font controls, white/black themes and personal notes.
- Full-text search across titles, source URLs, personal notes, article text and Markdown.
- Explicitly saved local notes, confirmed deletion and reading-position restoration for saved notes only.
- Markdown copy/download with source attribution, headings, lists, code and simple tables.
- Whole-library JSON backup and validated restoration, with content sanitized again and existing notes preserved.
- Browser printing: choose a printer or Save as PDF in the browser's print dialog.

There are no illustrations, gradients, textures or remote fonts. [Black reader](docs/reader-dark.png) and [welcome page](docs/welcome.png) images are web previews, not proof of an installed-extension acceptance test.

## Install a development build

Download and extract the install ZIP from Releases. Open `chrome://extensions`, enable Developer mode, select **Load unpacked**, and choose the directory containing `manifest.json`. Pin Pageleaf, open an ordinary HTTP/HTTPS article and invoke the toolbar action or `Alt/⌥ + Shift + L`.

To build from source, use Node.js 22+ and desktop Chrome:

```sh
npm ci
npm run check
```

Load the generated **`dist` directory**, not the source root or ZIP file.

## Backup and local data

JSON backups are limited to **20 MB**, the library to **100 notes**, and each saved or restored note to **1 MB**. Restoration validates format, sizes and the resulting library count before writing. It re-sanitizes content/links and rebuilds Markdown. Existing IDs and matching source/extraction-mode/article-text combinations are skipped; existing notes are not overwritten. Backups include notes only, excluding reading progress and display preferences. If the complete library exceeds the backup size limit, export individual Markdown files before reducing it.

Unsaved captures stay in browser session memory, with at most six records; entries older than 24 hours are pruned when a new capture is made, and browser exit clears them. Explicitly saved notes, reading positions and preferences stay in the current Chrome profile without additional encryption. Deleting a note also removes its saved reading position, but not exported Markdown, JSON or PDF files.

Permissions are only `activeTab`, `scripting` and `storage`. No persistent host access, telemetry or cloud sync is used. Remote article images and embeds are removed. Opening a source or article link is a normal browser navigation. Credentials, query strings and fragments are stripped from links, which may require manual correction on query-based sites. See [PRIVACY.md](PRIVACY.md).

## Development and validation

```sh
npm test
npm run build
npm run check
npm run package
```

The lockfile fixes dependency versions; all runtime code ships with the extension. Packaging creates install and source ZIPs in the parent directory. See [third-party licenses](THIRD_PARTY_NOTICES.md), [maintenance notes](docs/MAINTENANCE.md) and [validation notes](docs/VALIDATION.md).

Automated tests and web previews do not replace installed Chrome checks for loading, toolbar capture, persistence across browser restarts or downloaded files.

## Status and limitations

v0.2.0 is a development version, not a Chrome Web Store publication. Extraction depends on page structure. PDFs, image/video-only articles, internal browser pages and some complex applications are unsupported. Pageleaf does not bypass login, paywalls or access controls, or fetch unloaded pagination/iframe contents. Images are omitted; complex tables and formulas may need manual correction.

Original code is [MIT licensed](LICENSE). Extracted content remains subject to its authors' rights. Report problems through [GitHub Issues](https://github.com/2022x126/pageleaf/issues).

## Local web preview

After building, run `python3 -m http.server 8765 --bind 127.0.0.1` from the project directory and open `http://127.0.0.1:8765/dist/reader.html?demo`. Preview notes live only in the current page and disappear on refresh; export anything you want to keep.

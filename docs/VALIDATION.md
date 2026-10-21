# Validation — 0.2.0

Date: 2026-10-21

## Confirmed

- `npm run check`: 54 automated tests pass; Manifest V3, three scoped permissions, icon dimensions, local asset references, CSP and source network checks pass.
- Capture tests exercise real Readability, Turndown and sanitizer code against controlled HTML, including Chinese text, selections, dangerous HTML, editable regions, tables, fenced code and source URL cleaning.
- Background tests use a simulated Chrome API and Web Locks to verify active-tab targeting, document binding, failure messages, concurrent-click exclusion, UTF-8 size limits and six-item / 24-hour cache cleanup.
- Reader tests execute the actual reader code against a DOM and simulated extension storage: save snapshots, concurrent windows, conflict copies, unsaved drafts, route updates, quota errors, retryable deletion, backup download payloads, import preview/confirmation/cancellation and printing the current unsaved personal note as literal text.
- Backup tests cover a round trip, size/count limits, malformed files, duplicate skipping, no overwrites, HTML/link sanitization and prototype-key rejection. Progress tests cover saved-only metadata, stale restoration, deletion races, write failures and resize behavior. Search tests include article text and Markdown.
- The reader web preview was opened in the user's Chrome profile. Pure white and pure black layouts were visually checked at desktop size and at a 390 × 844 viewport. The viewport was restored after the check. Sample reading, saving a note in preview memory, a body-only search match, empty search state, copy feedback and theme changes were observed.
- Scrolling a saved sample to 66% and reopening it through the sidebar's native click restored 66% in the same preview page. This verifies the preview interaction, not persistence across browser restarts.
- Final monochrome web preview screenshots are included as `docs/reader.png`, `docs/reader-dark.png` and `docs/welcome.png`. The preview explicitly states that its notes are page-local and disappear on refresh.
- Export and backup-button feedback was observed. Actual browser-download file contents and print/PDF output were not confirmed through the browser; automated tests verify the generated backup payload and print content preparation.

## Not yet confirmed

Chrome's extension-management page was blocked by the browser automation URL policy. No workaround was attempted. Loading the unpacked extension, real toolbar activation, extraction inside the user's daily browser profile, extension storage surviving restart and an end-to-end installed-extension download remain manual acceptance items.

No Chrome Web Store submission has been made. No claims are made about users, installations, Stars, adoption or OpenAI program approval.

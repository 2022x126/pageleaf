# Validation — 0.1.0

Date: 2026-10-21

## Confirmed

- `npm run check`: 32 automated tests pass; Manifest V3, scoped permissions, icon dimensions, local asset references, CSP and source network checks pass.
- Capture tests exercise real Readability, Turndown and sanitizer code against controlled HTML, including Chinese text, selections, dangerous HTML, editable regions, tables, fenced code and source URL cleaning.
- Background tests use a simulated Chrome API and Web Locks to verify active-tab targeting, document binding, failure messages, concurrent-click exclusion, UTF-8 size limits and six-item / 24-hour cache cleanup.
- Reader tests execute the actual reader code against a DOM and simulated extension storage: save snapshots, concurrent windows, conflict copies, unsaved drafts, route updates, quota errors and retryable deletion.
- The reader web preview was opened in the user's visible Chrome browser. Sample reading, adding/saving a note in preview memory, searching by note text, empty search state, copy feedback and theme changes were observed.
- A final web preview screenshot is included as `docs/reader.png`. The preview explicitly states that its notes are page-local and disappear on refresh.
- Export-button feedback was observed. The final downloaded file's filesystem location was not confirmed.

## Not yet confirmed

Chrome's extension-management page was blocked by the browser automation URL policy. No workaround was attempted. Loading the unpacked extension, real toolbar activation, extraction inside the user's daily browser profile, extension storage surviving restart and an end-to-end installed-extension download remain manual acceptance items.

No Chrome Web Store submission has been made. No claims are made about users, installations, Stars, adoption or OpenAI program approval.

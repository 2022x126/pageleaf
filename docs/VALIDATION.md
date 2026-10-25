# Validation — 0.3.1

Date: 2026-10-25

## Automated checks

`npm run check` passes 100 tests. The build/static checks pass for Manifest V3, exactly activeTab/scripting/storage, seven manifest locales, real icon sizes, local assets, CSP, inert SVGs and application network boundaries. No permissions or data handling changed.

The reader tests exercise the actual code with a DOM and simulated Chrome storage. This update checks that inline excerpts cannot cross into a different article, mark changes invalidate old excerpts, Escape returns focus, expanded state matches visibility, existing note whitespace is preserved, cancellation cannot append stale text, and unconfirmed excerpts are hidden before printing. Existing extraction, sanitizer, concurrent capture/save, annotation, pen, backup/restore, search, progress and language tests also pass.

## Visible browser verification

Chrome was not connected to the automation tool during this run. The updated local site was checked in the visible in-app browser, using only the fictional reading-meetup example.

- At 1280 px, the collection preview appears after the article as ordinary text. Computed border is 0 px, background is transparent and box shadow is none. It has no modal or backdrop. Pure white and pure black were visually checked.
- A narrower 476 px view also displayed the complete wrapping excerpt list and text actions. There was no nested preview scrollbar or summary box.
- Adding excerpts kept an existing Chinese personal note and appended the new text. Saving updated the page-local preview library. Escape closed the inline section and returned focus to the toolbar control.
- Home was opened through the reader navigation: the sample has no surrounding frame or decorative quote border. The note editor has a simple bottom rule instead of a surrounding box.
- Updated screenshots are home.png, organize.png and organize-dark.png. Other screenshots record the earlier 0.3.0 preview and are not new installed-extension acceptance evidence.

## Acceptance boundaries

Earlier 0.3.0 checks in the visible Chrome profile included multilingual navigation, real pen input, Arabic RTL at 390 × 844, draft preservation and public-site navigation. This run does not repeat or extend those installed-browser claims.

Installed toolbar capture, extraction inside the daily profile, restart persistence, end-to-end installed downloads and actual print/PDF pagination still need manual acceptance. Previously the extension-management page was blocked by the browser automation policy; no workaround was attempted. Payload generation and print preparation are covered by tests. Pen positions use proportional coordinates and can shift after font/window changes.

No Chrome Web Store submission or activity application was made in this update. No user, installation, Star, adoption or program-approval claims are made. Web-demo notes stay in page memory and disappear on refresh.

## Deployment

The public site is https://2022x126.github.io/pageleaf/. On 2026-10-25, GitHub reported the 0.3.1 deployment as `built` at gh-pages commit `d11c9eef0316c7a69f9b580fd28c955e3d2e908e`. The public Chinese demo was then opened in the visible in-app browser: its organize control expanded an inline text list, with no dialog or surrounding frame. This is public-site verification, not installed-extension acceptance.

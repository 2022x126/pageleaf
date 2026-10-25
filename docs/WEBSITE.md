# Product website

The same product home, help center, privacy explanation and about page ship inside the extension and can run as an ordinary static website. All asset and internal-page URLs are relative, including when hosted beneath a repository path.

Run `npm run build:site` to produce `site-dist/`. This directory contains public product pages, the browser reader preview, bundled assets and license/privacy files. The extension manifest, background capture worker, development dependencies and local browser data are excluded. The web reader clearly states that notes are page-local and disappear on refresh; the website cannot invoke the extension toolbar or access its saved notes.

Deployment uses the repository's `gh-pages` branch. Only copy the contents of `site-dist/` to that branch after the source checks and browser verification pass. Preserve branch history; do not force-push over unrelated work. The live URL and deployment outcome are recorded in `VALIDATION.md`. A successful source push is not evidence of a completed site deployment.

Hosting inevitably involves the hosting provider receiving ordinary website requests. Pageleaf's website adds no analytics or tracking scripts. Local language and display preferences are separate from the reader's temporary note memory. GitHub links navigate to GitHub; users should avoid publishing private note content in public Issues.

Live site: https://2022x126.github.io/pageleaf/

On 2026-10-24 GitHub reported `built`, source `gh-pages` at `/`, with HTTPS enforced. Home and Privacy were opened in the visible Chrome profile; the public demo and its organization controls were checked after deployment. The deployed branch contains only the 18 whitelisted public assets.

On 2026-10-25, version 0.3.1 was deployed at gh-pages commit `d11c9eef0316c7a69f9b580fd28c955e3d2e908e`; GitHub reported `built`. The public Chinese demo was visibly checked in the in-app browser. Its organize control now reveals ordinary article-end text without a dialog, backdrop or surrounding box. The deployment still contains only the 18 whitelisted public assets. Chrome was not connected during this run.

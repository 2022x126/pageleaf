# Pageleaf maintenance

Maintenance runs in the current Codex chat; the active automation in Codex is the source of truth for its schedule. Start by reading this chat's latest user feedback, the Git state, current code, releases and Issues. Preserve uncommitted user work and avoid repeating completed fixes.

## Priorities

1. Address evidenced content loss, text/pen annotation persistence, excerpt collection, extraction/export failures, backup restoration, full-text search, reading positions, compatibility and accessibility problems before adding features. Do not manufacture usage figures, Stars, testimonials or maintenance history.
2. Review dependency compatibility and published security advisories where relevant. Update when a change fixes an actual issue; read release notes and retain the lockfile. Avoid unnecessary migrations.
3. Apply the `chrome-extensions` skill when changing the extension. Run `npm run check`; changes to extraction, storage, escaping or concurrency need a targeted regression case that reproduces the issue.
4. Check Home, searchable Help, Privacy, About, the reader, library, errors, empty search and confirmations in a real visible browser. Inspect white/black, desktop/narrow layouts, keyboard focus, text contrast and horizontal overflow. Respect browser security restrictions; do not bypass a blocked action through another tool.
5. Exercise automatic/manual language selection, English fallback and all seven locales (`en`, `zh-CN`, `es`, `fr`, `de`, `ja`, `ar`). Check long German/French labels, Chinese/Japanese text and Arabic RTL, mixed-direction source URLs, keyboard order, numbers and dates. Switching UI language must preserve original article text, personal notes and unsaved edits. Treat translation review as ongoing; do not claim native-language verification without evidence.
6. Record automated checks, website previews and installed-extension acceptance separately in `docs/VALIDATION.md`. Build success cannot substitute for actual toolbar capture, new-install routing, browser-restart persistence, downloaded files or print acceptance.
7. Update affected docs, Privacy copy, `CHROMEWEBSTORE.md`, version metadata and screenshots. Rebuild installation and source ZIPs, inspect archive contents and verify actual release results before claiming publication.

## Product and design boundaries

- Honor the latest user preference: plain white or plain black, with clear typography, spacing, alignment and contrast. New features must solve a concrete reading, note, discovery, support or data-control problem.
- Do not add illustrations, forests, mountains, decorative leaves, paper textures, gradients, light effects, ornamental panels or remote fonts. The small Leaf-P brand mark is an identity asset, not a decorative background; follow `docs/BRAND.md`.
- Keep **Pageleaf** as the international brand, with the Chinese name 叶笺 in Chinese contexts. Do not assume all users are in China, use Chinese, share a locale, or understand developer terminology.
- Preserve the product structure: Home explains and starts the product; Help answers real tasks and failures; Privacy describes current data handling; About gives honest project status and contribution/license information. Keep navigation available from the reader.
- Localize accessible names, placeholders, errors, confirmations and dynamic statuses alongside visible labels. Use locale-aware dates/numbers and logical CSS layout properties. Articles and user-authored notes must never be translated implicitly.
- Bundle essential assets and guides with the extension. Maintain visible focus and readable dark/light appearances; respect reduced-motion preferences.

## Data and permission boundaries

Processing remains local and user-initiated. Unsaved captures use session storage; only explicitly saved notes enter the persistent library. Never put private captures, notes, backups, browsing records, personal emails or credentials into public source, screenshots, routine logs or test fixtures.

Language, white/black appearance and reader font size are local extension preferences. A normal website preview may retain only language and white/black appearance in site `localStorage`; preview content stays in page memory and disappears on refresh. Backup files exclude progress and language/display preferences.

Any new permission, remote processing, cloud sync or changed retention requires a stated need and the corresponding authorization, plus updates to the privacy and store materials. Unknown publisher or contact information stays blank. Do not claim legal/privacy certification, independent auditing or compatibility with every site/language.

## Standalone product site

Use `npm run build:site` for the separate static product site in `site-dist`; do not deploy the extension's `dist` directory as a website. Review `docs/WEBSITE.md` before deploying. Keep Home, Help, Privacy, About and the reader demo in sync with the extension and current release links.

A hosted site's normal page/resource requests to its hosting provider are separate from the installed extension's local pages. Keep that distinction in public privacy copy; “no telemetry” does not mean a hosted website makes no network requests. Do not claim a live URL, successful deployment, HTTPS, store publication or a working download until it has been checked. Do not deploy private sample data or accidentally ship background/manifest files in the product-site output.

## Reporting

Notify the user only for a meaningful verified improvement/release, a material failure or required action. Keep unchanged or non-actionable checks quiet. State what changed, what was checked and any practical limit that remains. Maintenance does not mean the OpenAI application was approved, and must not resubmit that application.

## 中文维护要点

始终面向不同语言和地区的用户，保留纯白／纯黑与实用功能优先的方向。主页、帮助、隐私、关于、扩展和独立静态站需要同步更新；七种界面语言及阿拉伯语 RTL 都应检查，原文和用户笔记不得因切换界面而改变。浏览器预览、自动化测试、已安装扩展验收与线上站点验收分别记录，未验证的结果不写成已完成。权限和本机处理边界不扩大；没有有意义变化时保持安静。

## Copy and example acceptance

The user explicitly rejected abstract or translated-sounding copy. Use short, ordinary sentences that say what the button does. In Chinese prefer familiar actions such as 保存网页、划重点、下划线、波浪线、画笔 and 整理重点; avoid motivational slogans or unexplained terminology. Review other languages for the same clarity and welcome native-language corrections. Never claim a human wrote generated text or that all translations have native-speaker approval. Keep the demo concrete and interactive. Excerpt collection must remain clearly described as marked quotations or section-opening sentences, with preview and append, never as an AI judgment of importance.

The user removed boxed summaries: keep collected excerpts inline at the article end, without a modal, backdrop, border, panel background or shadow. Use ordinary type and spacing; actions remain text links/buttons with accessible focus. Do not restore decorative frames around the Home sample or note editor. Clear pending excerpts when articles, marks or UI language change; never append a stale preview to another article. Keep unconfirmed previews out of printing.

# Pageleaf Privacy Policy

Applies to version **0.3.0** · Last updated: **24 October 2026**

[中文说明](#中文说明)

## What Pageleaf processes

When you invoke Pageleaf through its toolbar action or shortcut, it reads the current page's already available article text or your selection, plus page-provided metadata such as title, author, language, publication time and source address. It uses that content for reading, personal notes, local search and export. Form fields and editable regions are excluded from capture.

Pageleaf also handles your text highlights, underline/wavy-line anchors and normalized pen coordinates, the personal notes you type, articles you explicitly save, saved-note reading positions and your language/display preferences. Selecting a Pageleaf JSON backup allows Pageleaf to read that file locally, validate it and re-sanitize its contents before restoration. It does not scan other files, browser history, cookies, password stores or other tabs for content.

## What is stored and for how long

| Data | Storage and retention |
| --- | --- |
| Unsaved captures | Chrome session memory (`chrome.storage.session`), at most six records. Captures older than 24 hours are pruned when another capture is made; browser exit clears session captures. An open reader can hold its own in-memory copy until the page closes. |
| Explicitly saved notes | Local extension storage (`chrome.storage.local`), up to 100 notes and 1 MB per saved/restored note, until deletion or uninstall. Includes article content, personal notes, text marks, pen strokes, source and timestamps. |
| Reading positions | For saved notes only, a local reading ratio and update time under `progress:<note ID>`. Scroll writes are throttled to 750 ms. Deleting a note also deletes its progress. This is not a browsing-history log. |
| Language and display preferences | Interface language choice, white/black appearance and reader text size stay in the local Chrome profile. Automatic language selection uses browser language preferences locally. There is no language-detection server. |
| Exported backups | A user-initiated JSON file contains saved notes, excluding reading positions and language/display preferences. The file limit is 20 MB. Restore validates all limits, re-sanitizes content and adds new notes without overwriting existing ones. |

Local records and exported files are **not additionally encrypted by Pageleaf**. Anyone or any software with access to the browser profile or file location may be able to read them. Device security, system backups and any file-sync service are controlled by your device and service settings.

## Home, Help, Privacy, About and the web preview

The product pages, interface translations and logo are bundled locally, with system fonts; opening them inside the installed extension does not fetch a remote help or translation service. A fresh installation opens Home. The extension's options opens the same Home page.

In a normal website preview without extension storage, articles, personal notes, library contents and reading positions are kept in page memory only. Refreshing or closing that page discards them. The preview can keep **only the language and white/black appearance preference** in that site's `localStorage` so those choices remain when moving between product pages. Clearing site data removes those preferences. This does not create a persistent website note library or access another tab's article.

When the standalone product site is hosted on GitHub Pages, visiting it makes normal browser requests to GitHub for pages and assets. The hosting service receives the request data needed to serve the site under its own policy. This differs from opening bundled pages inside the extension, and does not mean Pageleaf sends it article content, notes, backups or reading positions. No analytics script is added to the product site. See [WEBSITE.md](docs/WEBSITE.md) for the deployment boundary.

Changing the interface language does not translate article content or personal notes. The interface supports seven languages, including Arabic right-to-left layout; the content you choose to keep stays in its original language.

## Network and external links

Pageleaf has no backend, service account, telemetry, advertising, crash reporting or cloud sync. It does not transmit articles, notes, reading positions, preferences or backup files to the developer or to a third party. Runtime code, translations and fonts are not remotely loaded. The reader removes original article images, embeds and automatically loaded resources.

Credentials, query parameters and fragments are removed from source/article URLs. This can make some query-dependent links require manual correction. If you choose to open a source, article link, GitHub release or GitHub support link, the browser visits that external website and its own policy applies. The browser/OS may also perform its own normal services under its settings; this policy describes what Pageleaf itself does.

## Copying, export, printing and deletion

Clipboard writes, Markdown downloads and JSON backup downloads are actions you initiate. Printing opens the browser's print dialog. You choose a printer or Save as PDF, the destination and the resulting browser/system service. Pageleaf does not operate an external print service.

Deleting a note removes its local record and saved reading position. Uninstalling removes the extension's storage from that Chrome profile. Neither action removes previously copied content, exported Markdown/JSON/PDF files, printouts or system backups. Delete those separately if needed. Back up important notes before uninstalling, switching Chrome profiles or changing devices.

## Permissions and their purposes

| Permission | Purpose |
| --- | --- |
| `activeTab` | Temporary access to the page you invoke Pageleaf on, to capture the article or selected text. |
| `scripting` | Run the bundled extractor on that temporarily authorized page. |
| `storage` | Keep session captures, explicitly saved notes, reading positions and language/display preferences, including user-controlled backup/restore. |

There is no persistent host access, all-tabs/history/cookie/identity permission or background network monitoring. User-initiated downloads, file selection and printing do not require an additional general filesystem or downloads permission.

## Questions and changes

Data is not sold or used for advertising, lending or unrelated purposes. Bundled third-party article-extraction and Markdown libraries run locally; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Material changes to data handling will be reflected here and in the release notes.

Public support: [GitHub Issues](https://github.com/2022x126/pageleaf/issues). Share reproducible steps without posting private articles, note backups, credentials or personal information. No separate support email is currently published.

This policy describes the current development release. It does not claim legal certification, independent privacy auditing or worldwide legal compliance.

Contact email:

## 中文说明

本说明适用于 Pageleaf（叶笺）0.3.0，最后更新于 2026 年 10 月 24 日。

你点击工具栏图标或快捷键后，Pageleaf 读取当前页面已可访问的正文或选中文字、标题、作者、语言、发布时间及来源，用于阅读、笔记、搜索和导出。表单和可编辑区域不会被采集。它不扫描其他标签、历史、Cookies、密码库或其他文件；只有你选择 JSON 备份文件时才读取该文件。

未保存摘录使用 Chrome 会话内存，最多六份；新提取时清理超过 24 小时的记录，退出浏览器时清空。明确保存后，文章、个人笔记、时间、阅读位置和语言／显示偏好保存在当前 Chrome 配置中；笔记库最多 100 篇、单篇最多 1 MB。阅读位置仅针对已保存笔记，删除笔记时一并删除。JSON 备份最多 20 MB，只包含笔记，不包含阅读位置、语言或显示偏好；恢复前校验并重新清理内容，跳过重复笔记，不覆盖已有记录。

主页、帮助中心、隐私说明、关于、界面翻译和 Logo 均随扩展本地提供，不调用远程翻译或帮助服务。语言自动选择只使用浏览器偏好；切换界面不会翻译文章和个人笔记。普通网页预览只将文章与笔记保存在当前页面内存中，刷新／关闭即清空；仅语言和纯白／纯黑外观偏好可写入该站点的 `localStorage`，可通过清除站点数据移除。

扩展没有服务器、账号、遥测、广告、崩溃上报或云同步，不向开发者或第三方传送文章、笔记、阅读进度、偏好或备份。阅读器移除原文图片、嵌入内容和自动加载资源；来源与正文链接删除凭据、查询参数及片段，部分链接可能需要手动补全。主动打开原文、正文链接或 GitHub 时，由浏览器访问目标网站，适用其政策。若独立产品站托管于 GitHub Pages，访问该站会向 GitHub 请求页面和静态资源，由其按照自己的政策处理普通托管请求数据；这与扩展内部页面不同，不代表向 GitHub 上传你的文章和笔记。产品站不添加分析统计脚本。

复制、Markdown／JSON 下载、选择备份和打印均由你发起。打印按钮打开浏览器打印窗口，由你选择打印机或保存 PDF。删除笔记或卸载扩展不会删除导出文件、剪贴板、打印件或系统备份。本机记录与文件不由 Pageleaf 额外加密，请自行管理设备和文件访问权限；卸载、换配置或换设备前请备份。

权限仍只有 `activeTab`（按需临时访问当前页）、`scripting`（运行本地提取程序）、`storage`（保存会话摘录、本机笔记、阅读位置与偏好），没有增加常驻站点、历史、Cookies、所有标签、身份验证、下载或通用文件系统权限。

公开支持：[GitHub Issues](https://github.com/2022x126/pageleaf/issues)。请勿发布私密文章、笔记备份、密码或个人资料。目前没有另行公布的支持邮箱。本说明如实描述当前开发版本，不宣称隐私认证或全球法律合规认证。

## Marking and collecting excerpts

Text marks store a text offset and exact quotation, plus a fixed marking style. Pen strokes store bounded coordinates; no arbitrary HTML or styling is accepted. Marks and strokes become persistent only when you save the note and are included in JSON backups. Markdown includes marked text quotations, but not pen strokes. The print view includes visible marks; review long pages and pen placement in your browser’s print preview. Pen drawings scale with the page layout, so check their position after changing the text size or window width.

Collecting key points uses your marked original text, or the first sentence under each section heading when there are no text marks. It runs locally, does not send content to a model or server, and creates a preview before you choose to append it to your personal note. Existing writing is preserved.

中文：划线和手绘要点击“保存”才会保留。JSON 备份包含所有标记；Markdown 只带走标记的文字，不包含手绘。整理功能收集你标记的原句；没有标记时，摘录各小节首句。结果先给你预览，不会覆盖已有笔记，也不会把内容发给 AI。

# Chrome Web Store Listing — Pageleaf

> Last Updated: 2026-10-21
> Version: 0.2.0
> Chrome Web Store status: Draft; not submitted or published. GitHub development releases are separate from store publication.

## Store Listing

**Extension Name**: Pageleaf · 叶笺

**Short Description**: 将当前网页或选中文本整理成可阅读、可批注、可导出的 Markdown 笔记。内容只在本机处理。

**Detailed Description**:

Pageleaf 把当前网页文章或选中文字整理成自己的笔记，提供纯白与纯黑两种简洁阅读界面。

查看文章目录、调节字号、写下想法，保存后可继续上次阅读的位置。通过全文搜索查找标题、来源、个人笔记和文章正文。

复制或下载 Markdown，备份整个笔记库为 JSON，或从备份恢复笔记。恢复会检查文件与内容，跳过重复笔记并保留已有记录。也可以打开浏览器打印窗口，自行打印或保存 PDF。

无需账号、API Key 或订阅。内容在本机处理，不上传文章、笔记或阅读进度，没有广告、分析统计、云同步或远程字体。原文图片及嵌入内容不会自动加载。

打开普通网页文章后点击扩展图标；只需要片段时可先选中文字。PDF、浏览器内部页、图片/视频文章和部分复杂网页无法提取，提取效果取决于网页结构。

支持：https://github.com/2022x126/pageleaf/issues

**Category**: Productivity

**Single Purpose**: 将用户主动选择的当前网页正文整理为可本机阅读、保存、检索和导出的个人笔记。

**Primary Language**: Chinese (Simplified)

## Graphics & Assets

| Asset              | Dimensions                         | Status                                   | Filename                  |
| ------------------ | ---------------------------------- | ---------------------------------------- | ------------------------- |
| Store icon         | 128×128 PNG                        | 按构建产物核验                           | `dist/icons/icon-128.png` |
| White reader       | Store requires 1280×800 or 640×400 | 网页预览；上架前需核验尺寸与实际扩展表现 | `docs/reader.png`         |
| Black reader       | Store requires 1280×800 or 640×400 | 网页预览；上架前需核验尺寸与实际扩展表现 | `docs/reader-dark.png`    |
| Welcome page       | Store requires 1280×800 or 640×400 | 网页预览；上架前需核验尺寸与实际扩展表现 | `docs/welcome.png`        |
| Small promo tile   | 440×280                            | 未创建，可选                             |                           |
| Marquee promo tile | 1400×560                           | 未创建，可选                             |                           |

截图仅展示可公开的示例内容。网页预览不能冒充已安装扩展的实机截图。v0.2.0 无插画、渐变、纹理或远程字体。

## Permissions Justification

| Permission  | Type        | Justification                                                                                                                                                       |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeTab` | permissions | Temporarily reads the current page only when the user invokes Pageleaf, so an article or selected text can become a note.                                           |
| `scripting` | permissions | Runs the bundled extractor in that temporarily authorized page; no persistent content script or remote code is installed.                                           |
| `storage`   | permissions | Keeps session captures, explicitly saved notes, saved-note reading positions and display preferences locally; supplies the user's local backup and restore actions. |

**host_permissions**: none. **optional_host_permissions**: none. No `tabs`, `history`, `cookies`, `identity`, `downloads`, remote-font or general file-system permission. Download, file selection, clipboard and print actions use user-triggered browser behavior.

## Privacy & Data Use

**Handles user data?** Yes, locally. **Developer receives it?** No. Dashboard disclosures must distinguish local handling from transmission and match `PRIVACY.md`.

| Data Type                                                                   | Local handling                                                                | Off-device transmission by extension | Purpose                                        |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Website content                                                             | Invoked article/selection, metadata, personal notes and selected JSON backup  | No                                   | Reading, search, notes, export and restoration |
| User activity                                                               | Saved-note reading ratio/update time and display preferences; no browsing log | No                                   | Continue reading and remember display settings |
| Web history                                                                 | No history access; notes retain their individual source URLs                  | No                                   | Source attribution                             |
| Personal, health, financial or location information; private communications | May occur within user-selected content; not separately requested              | No                                   | The same user-requested note features          |
| Authentication information                                                  | No credential/cookie access; URL credentials, queries and fragments removed   | No                                   | Not collected as account data                  |

Temporary captures use session memory, at most six records; records older than 24 hours are pruned on the next capture, and browser exit clears them. An open reader may retain an in-memory copy until closed. Saved notes use local storage, at most 100 notes and 1 MB per note, until deletion or uninstall. Reading progress is saved only for explicitly saved notes, under `progress:<id>` with ratio and update time; scroll writes are throttled to 750 ms, and progress is removed with its note. Preferences are local.

JSON backups contain notes only, excluding progress and preferences. Backup/restore is limited to 20 MB; restoration validates all limits before writing and re-sanitizes content. Existing IDs and matching source/extraction-mode/article-text combinations are skipped. Existing notes are not overwritten.

Local records and exported files are not additionally encrypted. Clipboard writes, Markdown/JSON downloads and browser printing/PDF saving are user-controlled. Deletion does not remove exported files or printed copies. Clicking a source/article link navigates to that website. No telemetry, server, advertising, cloud sync, remote code/fonts, or passive article-image/embedded-resource requests.

### Data Use Certification

- [x] Data is NOT sold to third parties.
- [x] Data is NOT used for purposes unrelated to the extension's core functionality.
- [x] Data is NOT used for creditworthiness or lending purposes.

## Privacy Policy

**Source**: `PRIVACY.md`, included in source and install packages.

**Privacy Policy URL** [REQUIRED before submission]:

Host the policy publicly and verify the live URL before store submission.

## Distribution

**Visibility**:

**Regions**:

## Developer Info

**Publisher Name** [REQUIRED]:

**Contact Email** [REQUIRED]:

**Support URL / Email**: https://github.com/2022x126/pageleaf/issues

**Homepage URL**: https://github.com/2022x126/pageleaf

**Chrome Web Store extension ID / listing URL**:

## Version History

| Version | Date       | Changes                                                                                                                                      | Chrome Web Store Status |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 0.2.0   | 2026-10-21 | Pure white/black interface; full-text search; validated JSON backup/restore; browser printing/PDF saving; local saved-note reading progress. | Draft                   |
| 0.1.0   | 2026-10-21 | Initial article/selection extraction, reader, local notes and Markdown export.                                                               | Draft                   |

## Review Notes

### Known limits

Extraction depends on website structure. No PDF/image/video extraction, login/paywall bypass, iframe crawling or pagination retrieval. Images are omitted; complex tables/formulas and query-dependent links may need manual correction. Browser print/PDF output depends on the user's print settings.

### Publication readiness

- [ ] Listing, permissions and icons checked against the final build.
- [ ] Installed Chrome end-to-end acceptance recorded in `docs/VALIDATION.md`.
- [ ] Store screenshots captured at a required size using public sample content.
- [ ] Live privacy URL, publisher, contact email, visibility and regions completed.
- [ ] Install ZIP checked; data disclosures matched to actual runtime code.
- [ ] Publisher submitted the version and recorded the review result.

### Rejection history

None. No Chrome Web Store submission has been made.

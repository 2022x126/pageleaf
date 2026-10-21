# Chrome Web Store Listing — Pageleaf

> Last Updated: 2026-10-21
> Status: Draft; not submitted or published. Confirm all copy against the final build before submission.

## Store Listing

**Extension Name**: Pageleaf · 叶笺

**Short Description**: 将当前网页或选中文本整理成可阅读、可批注、可导出的 Markdown 笔记。内容只在本机处理。

**Detailed Description**:

Pageleaf 把你正在阅读的网页文章或选中文字，整理成可携带的 Markdown 笔记。

点击扩展图标即可提取当前文章，在清爽的阅读器中查看目录、调节文字大小和切换浅色或深色外观。

添加自己的笔记，复制全文或下载 Markdown 文件。需要长期保留时，主动保存到本机笔记库，再通过搜索找到它。

无需注册、API Key 或订阅。内容在你的设备上处理，扩展不上传文章或笔记，也没有广告和分析统计。为避免额外图片请求，阅读器不显示原文图片。

请先打开一篇普通网页文章，再点击 Pageleaf 图标。如只需要一段内容，可先选中文字。浏览器内部页、PDF、图片文章和部分复杂网页不支持。提取结果取决于网页结构。

公共支持网址：［由维护者填写］

**Category**: Productivity

**Single Purpose**: 将用户主动选择的当前网页正文转换为可本地保存和导出的 Markdown 笔记。

**Primary Language**: Chinese (Simplified)

## Graphics & Assets

| Asset              | Dimensions          | Status       | Filename                  |
| ------------------ | ------------------- | ------------ | ------------------------- |
| Store Icon         | 128×128 PNG         | 构建后核验   | `dist/icons/icon-128.png` |
| Screenshot 1       | 1280×800 or 640×400 | 待实际截图   |                           |
| Screenshot 2       | 1280×800 or 640×400 | 待实际截图   |                           |
| Small Promo Tile   | 440×280             | 未创建，可选 |                           |
| Marquee Promo Tile | 1400×560            | 未创建，可选 |                           |

截图应使用有权展示的测试文章，分别展示阅读器、Markdown 导出和本机笔记库，避免真实私人网页和笔记。不能把 UI 预览图冒充 Chrome 实机截图。

## Permissions Justification

| Permission  | Type        | Justification                                                                                                                      |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `activeTab` | permissions | Gives temporary access to the current page only when the user invokes Pageleaf, so its article or selected text can become a note. |
| `scripting` | permissions | Runs the bundled article extractor in that temporarily authorized page; no persistent content script or remote code is installed.  |
| `storage`   | permissions | Holds temporary captures in browser-session memory and explicitly saved notes and reader preferences on the user's device.         |

**host_permissions**: none. **optional_host_permissions**: none. No `tabs`, `history`, `cookies`, `identity`, or `downloads` permission. Normal browser file-download behavior is used only after an explicit export click.

## Privacy & Data Use

### Data Collection

**Does the extension handle user data?** Yes, locally. It reads the page the user explicitly chooses and stores temporary or explicitly saved notes. **Does the developer collect or receive this data?** No. Store dashboard declarations must distinguish local handling from collection/transmission and match the current policy wording.

| Data Type                    | Handled locally?                                                      | Transmitted Off-Device? | Purpose                                  | Shared with Third Parties? |
| ---------------------------- | --------------------------------------------------------------------- | ----------------------- | ---------------------------------------- | -------------------------- |
| Personally identifiable info | May be present in user-selected content; not separately requested     | No                      | User-requested extraction/notes          | No                         |
| Health info                  | May be present in selected content; not separately requested          | No                      | Same                                     | No                         |
| Financial info               | May be present in selected content; not separately requested          | No                      | Same                                     | No                         |
| Authentication info          | Not requested; URL credentials/query strings/fragments removed        | No                      | N/A                                      | No                         |
| Personal communications      | May be present in selected content; not separately requested          | No                      | User-requested extraction/notes          | No                         |
| Location                     | May be present in selected content; not separately requested          | No                      | Same                                     | No                         |
| Web history                  | No history access; saved notes retain individual source URLs          | No                      | Source attribution                       | No                         |
| User activity                | Reader preferences and explicit save/delete actions only; no tracking | No                      | Reader and library operation             | No                         |
| Website content              | Yes: selected page/selection, metadata, personal notes                | No                      | Reading, conversion, local saving/export | No                         |

Temporary captures: `chrome.storage.session`, at most six records; records older than 24 hours are removed when a new capture is created; browser exit clears session storage. An open reader can retain its in-memory copy until closed. Saved notes: `chrome.storage.local`, up to 100 records until user deletion or uninstall. Preferences: local. No additional encryption. User-triggered clipboard/export files and external link navigation have their ordinary browser/OS behavior. Remote images and embeds are excluded to avoid passive network requests. No analytics, cloud sync, cookies, account, API keys, backend, or remote executable code.

### Data Use Certification

- [x] Data is NOT sold to third parties.
- [x] Data is NOT used for purposes unrelated to the extension's core functionality.
- [x] Data is NOT used for creditworthiness or lending purposes.

## Privacy Policy

**Source**: `PRIVACY.md` (included in source and installation package).

**Privacy Policy URL** [REQUIRED before submission]:

Publicly host the policy, fill in an actual contact method, and verify the URL before submitting. Do not claim an unpublished local file is a live policy URL.

## Distribution

**Visibility**:

**Regions**:

These choices belong to the publisher; no store publication has been performed.

## Developer Info

**Publisher Name** [REQUIRED]:

**Contact Email** [REQUIRED]:

**Support URL / Email**: https://github.com/2022x126/pageleaf/issues

**Homepage URL**: https://github.com/2022x126/pageleaf

**Chrome Web Store extension ID / listing URL**:

## Version History

| Version | Date       | Changes                                                                                   | Status |
| ------- | ---------- | ----------------------------------------------------------------------------------------- | ------ |
| 0.1.0   | 2026-10-21 | Initial article/selection extraction, reading view, local notes/library, Markdown export. | Draft  |

## Review Notes

### Known Issues / Limitations

Extraction accuracy varies by website. No PDF/image/video extraction, paywall/login bypass, iframe crawling, or pagination retrieval. Remote images are removed. Complex tables/math may require manual repair. Source URLs lose queries/fragments, so query-based source links may need correction. Captures have a size cap. Local storage is unencrypted and is not a secure vault.

### Publication readiness

- [ ] Manifest names/descriptions/icons checked against this listing.
- [ ] Real Chrome end-to-end acceptance completed and recorded.
- [ ] At least one actual screenshot at a required store size.
- [ ] Privacy policy publicly hosted and reachable; contact method filled in.
- [ ] Publisher, regions, visibility, support details supplied by user.
- [ ] Installation ZIP contains only runtime files and licenses; no source secrets or build dependencies.
- [ ] Data declarations checked against final runtime code.
- [ ] Version submitted by publisher; review outcome recorded.

### Rejection History

None. No submission has been made.

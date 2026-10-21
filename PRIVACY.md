# Pageleaf 隐私说明 / Privacy Policy

最后更新 / Last updated: 2026-10-21

## 我们处理什么

在你点击 Pageleaf 扩展图标或快捷键后，扩展读取当前网页已经加载的正文或选中文字，以及标题、作者、语言、发布时间和来源链接（网站提供时）。这些内容只用于生成阅读视图和 Markdown 笔记。扩展还处理你输入的个人笔记、明确保存的文章和阅读偏好。

扩展不会主动读取其他标签、浏览历史、密码库、Cookies、表单输入框或账户资料。但所选文章本身可能包含个人信息；请只提取你有权处理的内容。

## 本机存储和保留时间

- **临时提取结果**：保存在 `chrome.storage.session` 浏览器会话内存中，浏览器退出时清空；最多保留 6 份，新建提取时清理超过 24 小时的记录。24 小时不是后台定时删除承诺；打开的阅读器也可能持有本页的内存副本，关闭它即可释放。
- **明确保存的笔记**：保存在 `chrome.storage.local`，最多 100 篇，保留至你从笔记库删除或卸载扩展。单次提取的数据大小有限制。
- **阅读偏好**：在本机保存主题、字体大小等设置。
- **导出文件和剪贴板**：只有你主动点击复制或下载才会写入。导出的文件由你和系统管理，删除扩展内的笔记不会删除这些副本。

本机存储没有额外加密，不是密码管理器或保密存储。能够访问你的 Chrome 配置、设备或系统备份的人/软件可能访问这些内容。浏览器或操作系统的备份行为由其各自设置决定。

## 数据是否离开设备

扩展没有服务器、登录、分析统计、广告、崩溃上报或云同步，不将提取内容、个人笔记或使用数据发送给开发者或第三方，也不使用远程字体或远程脚本。阅读器移除图片、嵌入内容及自动加载资源；来源 URL 会删除账号密码、查询参数与片段。文中链接也会进行安全处理。

如果你主动打开原文或点击文中链接，浏览器会访问对应网站，该网站的隐私政策适用。复制到剪贴板、下载文件后再分享，属于你主动选择的后续行为，接收方和其他应用可能读取这些副本。

## 权限

| 权限        | 用途                                                   |
| ----------- | ------------------------------------------------------ |
| `activeTab` | 你主动调用扩展时，临时访问当前页面，提取其可阅读内容。 |
| `scripting` | 在已获临时访问权的页面运行随扩展打包的正文提取程序。   |
| `storage`   | 存储会话内临时结果、本机笔记与阅读偏好。               |

没有持久站点访问权限，不要求浏览历史、所有标签页、Cookies、身份验证或后台网络监听权限。

## 控制和删除

你可以不保存临时提取结果，随时导出个人笔记，或在笔记库选择删除并确认。卸载扩展会移除其浏览器存储；已经复制/下载的内容、系统备份不在扩展控制范围内。扩展不会出售数据，不用数据投放广告，也不将其用于信用、保险或贷款决策。

## 第三方代码

正文识别和 Markdown 转换使用随安装包提供的开源库。代码在本机运行，不调用这些库作者的服务。许可见 `THIRD_PARTY_NOTICES.md`。

## 变更与联系

如数据处理方式改变，本文件和版本记录会更新。公共发布前，维护者应在此补充可用的支持网址或联系邮箱；当前未填写，不能作为完整商店发布资料。

公共支持网址 / Public support URL: https://github.com/2022x126/pageleaf/issues

联系邮箱 / Contact email:

---

## English summary

Pageleaf processes only the current page when you invoke it, including the article or selected text, available metadata, your personal notes, and reader preferences. It has no backend, account system, analytics, ads, remote scripts, or cloud synchronization, and sends none of this data to its developer or third parties.

Unsaved captures are held in browser session memory, cleared on browser exit, limited to six records, and pruned after 24 hours when a new capture is created. Open readers may retain an in-memory copy until closed. Explicitly saved notes are stored locally, up to 100 records, until deleted in the library or the extension is removed. Preferences are also local. Storage is not additionally encrypted. Device access, browser/OS backups, and exported copies may expose the data independently of this extension.

Remote images and embedded resources are removed from the reading view. URL credentials, query strings, and fragments are stripped from the source URL. Clicking a source or article link performs a normal browser navigation under that site's privacy policy. Copying and downloading are explicit actions; deleting a saved note does not erase clipboard data, exported files, or backups.

The permissions are `activeTab` (invoked-page access), `scripting` (bundled extraction), and `storage` (session captures and local notes/preferences). No persistent host access, history, cookies, authentication, or all-tabs permissions are requested. Third-party libraries run locally; their licenses accompany the release.

Privacy questions should use the maintainer's support URL or email above, which must be supplied before public store publication. Changes to data handling will be documented here and in release notes.

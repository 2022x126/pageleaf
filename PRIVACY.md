# Pageleaf 隐私说明 / Privacy Policy

版本 / Version: 0.2.0 · 最后更新 / Last updated: 2026-10-21

## 处理的内容

你点击扩展图标或快捷键后，Pageleaf 读取当前页已加载的正文或选中文字，以及网站提供的标题、作者、语言、发布时间与来源链接，用于阅读和笔记。扩展也处理你输入的个人笔记、明确保存的文章、显示偏好及已保存笔记的阅读位置。

恢复备份时，扩展读取你主动选择的 Pageleaf JSON 文件，在本机校验并重新清理内容。它不读取其他文件、其他标签、浏览历史、密码库、Cookies 或账户资料；提取时会剔除表单与可编辑区域。

## 本机存储

| 数据           | 存储与保留                                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 未保存摘录     | 浏览器会话内存 `chrome.storage.session`，最多 6 份；新建摘录时清理超过 24 小时的记录，浏览器退出时清空。打开的阅读页可以持有内存副本，直至页面关闭。 |
| 明确保存的笔记 | `chrome.storage.local`，最多 100 篇、单篇最多 1 MB，保留至删除或卸载。                                                                               |
| 阅读位置       | 仅对已保存笔记记录阅读比例和更新时间，使用本机 `progress:<笔记ID>` 记录；滚动写入按 750 毫秒节流，删除笔记时一并删除。不是浏览历史或访问日志。       |
| 显示偏好       | 主题、字号等设置保存在本机。                                                                                                                         |
| 备份           | 主动导出的 JSON 包含笔记，不包含阅读进度或显示偏好；文件上限 20 MB。恢复前校验大小、篇数与内容，已有笔记不被覆盖。                                   |

本机记录与导出文件均未额外加密。设备访问和系统备份由你的设备与系统设置控制。

## 网络、导出与打印

扩展没有服务器、账号、遥测、广告、崩溃上报或云同步，不向开发者或第三方发送文章、笔记、阅读进度或备份。代码与字体不从远程加载，阅读器移除原文图片、嵌入内容及自动加载资源。来源和正文链接会删除凭据、查询参数与片段。

主动打开原文或链接时，浏览器会访问对应网站。复制、下载 Markdown、导出 JSON，以及选择备份文件，均由你操作。打印按钮仅打开浏览器打印窗口；你选择打印机或“另存为 PDF”，打印服务与文件保存由浏览器和系统处理。

删除笔记不会删除已复制内容、导出文件、打印件或系统备份。卸载扩展会移除其浏览器存储。

## 权限

| 权限        | 用途                                                                  |
| ----------- | --------------------------------------------------------------------- |
| `activeTab` | 用户调用时临时读取当前页面，提取正文或选中内容。                      |
| `scripting` | 在该页面运行随扩展打包的提取程序。                                    |
| `storage`   | 保存临时摘录、明确保存的笔记、阅读进度与偏好，并供本机备份/恢复使用。 |

没有常驻站点、所有标签、浏览历史、Cookies、身份验证或后台网络监听权限。文件操作使用用户触发的浏览器下载、选择文件和打印界面，不要求额外文件系统权限。

## 联系与变更

数据不出售、不用于广告或与笔记功能无关的用途。第三方正文识别与 Markdown 转换库随安装包提供，在本机运行；许可见 `THIRD_PARTY_NOTICES.md`。处理方式有变化时，本文件与版本说明会同步更新。

公共支持网址 / Public support URL: https://github.com/2022x126/pageleaf/issues

联系邮箱 / Contact email:

## English summary

Pageleaf processes the page you explicitly invoke it on, article metadata, your personal notes, and display preferences. It strips forms/editable regions and does not access other tabs, browsing history, cookies, password stores or account details. A backup file is read only when you select it for restoration.

Unsaved captures use browser session memory: at most six records, pruned after 24 hours when a new capture is created, and cleared on browser exit. Saved notes use local extension storage, up to 100 notes and 1 MB per note, until deleted or uninstalled. For saved notes only, Pageleaf locally records a reading ratio and update time, throttling scroll writes to 750 ms; deleting a note deletes this progress too. Display preferences are also local. JSON backups contain notes, not progress or preferences, and have a 20 MB limit. Restoration validates limits and re-sanitizes content before adding notes without overwriting existing records.

No articles, notes, progress, preferences or backup files are transmitted to the developer or third parties. There is no backend, telemetry, cloud sync, advertising, remote code or remote fonts. Embedded resources and article images are removed, and URL credentials/query strings/fragments are stripped. Clicking a link is a normal browser navigation governed by that site's policy.

Clipboard, Markdown/JSON downloads and printing are user-controlled. Print opens the browser dialog; PDF saving or printing requires your action. Local data and exported files have no additional encryption. Deleting a note does not erase exported files, printed copies, clipboard contents or system backups. Browser/OS storage, backup and print services are controlled by their own settings. Permissions remain `activeTab`, `scripting` and `storage`; no persistent host access is requested.

# Pageleaf · 叶笺

把网页整理成可阅读、可批注、可带走的笔记。

Pageleaf 是一个在本机运行的 Chrome 扩展。点击扩展图标，提取当前文章或选中文字，写下自己的想法，再保存、检索或导出。**v0.2.0** 使用纯白与纯黑两种简洁界面，无需账号、API Key 或付费服务。

[English](README.en.md) · [隐私说明](PRIVACY.md) · [贡献指南](CONTRIBUTING.md) · [版本下载](https://github.com/2022x126/pageleaf/releases)

![Pageleaf 纯白阅读器网页预览](docs/reader.png)

## 功能

- **按需提取**：识别当前网页正文；选中文字时只整理选中内容。
- **阅读与笔记**：文章目录、字号调整、纯白/纯黑外观和个人笔记。
- **全文搜索**：搜索标题、来源、个人笔记、正文及 Markdown。
- **本机笔记库**：明确点击保存后持久保留，支持打开和确认删除；仅为已保存笔记记录阅读位置，重新打开时继续阅读。
- **Markdown**：复制或下载当前文章与个人笔记，保留来源、标题、列表、代码和简单表格。
- **整库备份与恢复**：导出 JSON；恢复前显示预览并重新清理内容，跳过重复笔记，不覆盖已有笔记。
- **打印 / 保存 PDF**：打开浏览器打印窗口，由你选择打印机或“另存为 PDF”。

界面不使用插画、渐变、纹理或远程字体。深色网页预览见 [reader-dark.png](docs/reader-dark.png)，欢迎页预览见 [welcome.png](docs/welcome.png)；这些图片不代表已安装扩展的实机验收。

## 安装开发版

从版本页面下载安装 ZIP，解压后，在 `chrome://extensions` 开启「开发者模式」，点击「加载已解压的扩展程序」，选择包含 `manifest.json` 的目录。将 Pageleaf 固定到工具栏，打开普通 HTTP/HTTPS 文章后点击图标；也可使用 `Alt/⌥ + Shift + L`。

从源码构建需要 Node.js 22+ 和桌面版 Chrome：

```sh
npm ci
npm run check
```

随后加载生成的 **`dist` 文件夹**，不要直接选择源码根目录或 ZIP 文件。

## 备份与数据

JSON 备份文件上限为 **20 MB**，笔记库最多 **100 篇**，单篇保存或恢复的笔记最多 **1 MB**。恢复会先校验格式、大小和总篇数，再清理正文与链接、重建 Markdown；已有相同 ID，或相同来源、提取方式与正文的笔记会跳过。备份仅包含笔记，不包含阅读进度和显示偏好。大于备份上限时，可先逐篇导出 Markdown 并缩减笔记库。

内容只在本机处理。未保存摘录暂存于浏览器会话内存，最多 6 份，新提取时清理超过 24 小时的记录；浏览器退出时清空。明确保存的笔记、阅读位置与偏好保存在当前 Chrome 配置中，未额外加密。删除笔记同时删除其阅读位置，不会删除已导出的 Markdown、JSON 或 PDF 文件。

权限仅为 `activeTab`、`scripting`、`storage`，没有常驻站点权限、遥测或云同步。阅读器不自动加载原文图片和嵌入资源；主动打开来源或文中链接时，浏览器才访问对应网站。来源和文中链接会移除凭据、查询参数及片段，部分依赖查询参数的链接可能需要手动补充。详情见 [PRIVACY.md](PRIVACY.md)。

## 开发与验证

```sh
npm test         # 针对提取、安全、存储与阅读器行为的测试
npm run build    # 构建 dist，运行时不需要 node_modules
npm run check    # 测试、构建、权限、资源与 CSP 检查
npm run package  # 在项目上级目录生成安装包和源码包
```

依赖版本由锁文件固定，运行时代码全部随扩展打包。许可见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。维护约定见 [MAINTENANCE.md](docs/MAINTENANCE.md)。

已完成的检查与剩余验收见 [VALIDATION.md](docs/VALIDATION.md)。网页预览和自动化测试不能代替真实扩展的加载、工具栏提取、重启持久化和文件下载验证。

## 边界与开源

v0.2.0 是开发版本，尚未上架 Chrome 网上应用店。提取取决于网页结构；PDF、图片/视频文章、浏览器内部页面和部分复杂网页不支持。不会绕过登录、付费墙或访问控制，也不获取未加载的分页或 iframe 内容。图片会被移除，复杂表格和公式可能需要手工调整。

原创代码使用 [MIT License](LICENSE)，网页内容仍属于原作者。问题反馈：[GitHub Issues](https://github.com/2022x126/pageleaf/issues)。

## 本地网页预览

构建后，在项目根目录运行 `python3 -m http.server 8765 --bind 127.0.0.1`，打开 `http://127.0.0.1:8765/dist/reader.html?demo`。预览中的笔记只保留在当前页面，刷新会清空；需要保留时请导出。

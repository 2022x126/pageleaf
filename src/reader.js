import { sanitizeArticle, safeHttpURL } from "./content.js";
import { buildMarkdown, noteFilename, searchNotes } from "./notes.js";
import {
  createBackup,
  parseBackup,
  planImport,
  MAX_BACKUP_BYTES,
} from "./backup.js";
import { createReadingProgress } from "./progress.js";

const $ = (id) => document.getElementById(id);
// A browser preview is useful for contributors; it never uses a remote service.
const previewMemory = {};
const previewStorage = {
  async get(keys) {
    return keys === null
      ? { ...previewMemory }
      : Object.fromEntries(
          (Array.isArray(keys) ? keys : [keys])
            .filter((key) => key in previewMemory)
            .map((key) => [key, previewMemory[key]]),
        );
  },
  async set(values) {
    Object.assign(previewMemory, values);
  },
  async remove(keys) {
    for (const key of Array.isArray(keys) ? keys : [keys])
      delete previewMemory[key];
  },
};
const isPreview = !globalThis.chrome?.storage;
const storage = globalThis.chrome?.storage || {
  local: previewStorage,
  session: previewStorage,
};
let article = null;
let notes = [];
let dirty = false;
let saving = false;
let savedVersion = "";
let pendingDelete = "";
let settings = { dark: false, fontSize: 18 };
let toastTimer;
let intersection;
let pendingImport = null;
const readingProgress = createReadingProgress({
  storage: storage.local,
  locks: navigator.locks,
  window,
  document,
  onChange: (ratio) => {
    const percent = Math.round(ratio * 100);
    $("reading-progress").hidden = !article;
    $("reading-progress").setAttribute("aria-valuenow", String(percent));
    document.documentElement.style.setProperty(
      "--reading-progress",
      String(ratio),
    );
    $("progress-label").textContent = `${percent}%`;
  },
  onError: () => toast("阅读位置暂时无法保存，正文和笔记不受影响。"),
});

function toast(message) {
  clearTimeout(toastTimer);
  $("toast").textContent = message;
  $("toast").hidden = false;
  toastTimer = setTimeout(() => {
    $("toast").hidden = true;
  }, 4000);
}
function show(view) {
  for (const id of ["welcome", "reader", "error-view"])
    $(id).hidden = id !== view;
}
function reportError(message) {
  $("error-message").textContent = message;
  show("error-view");
}
function canLeave() {
  if (saving) {
    toast("正在保存，请稍候。");
    return false;
  }
  return (
    !dirty ||
    window.confirm("你修改的笔记尚未保存。离开后这些修改会丢失，仍要继续吗？")
  );
}
function updateSaveState() {
  $("save-state").textContent = dirty
    ? "有未保存的修改"
    : savedVersion
      ? isPreview
        ? "仅当前预览已保存"
        : "已保存到本机"
      : "尚未保存";
  $("save").textContent = savedVersion ? "保存修改" : "保存笔记";
}
function makeText(tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}
function updateSettings() {
  document.body.classList.toggle("dark", settings.dark);
  document.documentElement.style.setProperty(
    "--font-size",
    `${settings.fontSize}px`,
  );
  $("theme").setAttribute(
    "aria-label",
    settings.dark ? "切换浅色模式" : "切换深色模式",
  );
  $("theme").setAttribute(
    "title",
    settings.dark ? "切换浅色模式" : "切换深色模式",
  );
  $("font-down").disabled = settings.fontSize <= 15;
  $("font-up").disabled = settings.fontSize >= 26;
}
async function saveSettings() {
  updateSettings();
  try {
    await storage.local.set({ settings });
  } catch {
    toast("显示设置暂时无法保存。");
  }
}

async function loadLibrary() {
  const data = await storage.local.get(null);
  notes = Object.entries(data)
    .filter(
      ([key, value]) =>
        key.startsWith("note:") &&
        value &&
        typeof value.id === "string" &&
        typeof value.title === "string" &&
        typeof value.updatedAt === "string",
    )
    .map(([, value]) => value);
  renderLibrary();
}
function renderLibrary() {
  $("note-list").replaceChildren();
  $("note-count").textContent = String(notes.length);
  const found = searchNotes(notes, $("search").value);
  $("library-empty").hidden = found.length > 0;
  $("library-empty").textContent = notes.length
    ? "没有找到匹配的笔记。换个关键词试试。"
    : "保存的文章会在这里。\n先打开一篇文章，点击浏览器工具栏里的叶笺。";
  for (const item of found) {
    const card = makeText("div", "", "note-card");
    card.classList.toggle("active", item.id === article?.id);
    const open = makeText("button", "", "note-open");
    open.type = "button";
    open.setAttribute("aria-label", `打开笔记：${item.title}`);
    open.append(
      makeText("strong", item.title),
      makeText(
        "span",
        `${new Date(item.updatedAt).toLocaleDateString("zh-CN")} · ${item.minutes || 1} 分钟`,
      ),
    );
    open.addEventListener("click", () => {
      if (canLeave()) {
        renderArticle(item);
        history.replaceState(null, "", `#note=${item.id}`);
      }
    });
    const remove = makeText("button", "×", "delete-note");
    remove.type = "button";
    remove.setAttribute("aria-label", `删除笔记：${item.title}`);
    remove.addEventListener("click", () => {
      if (saving) {
        toast("正在保存，请稍候。");
        return;
      }
      pendingDelete = item.id;
      $("delete-title").textContent = item.title;
      $("delete-dialog").showModal();
    });
    card.append(open, remove);
    $("note-list").append(card);
  }
}
function renderArticle(value) {
  try {
    const clean = sanitizeArticle(
      value.content,
      safeHttpURL(value.url) || "https://example.invalid",
      document,
    );
    article = { ...value, content: clean, url: safeHttpURL(value.url) };
    dirty = false;
    savedVersion = value.updatedAt || "";
    $("article-title").textContent = article.title;
    $("article-site").textContent = article.siteName || "FROM THE WEB";
    const meta = [
      article.author,
      `${article.wordCount || 0} 字 / 词`,
      `约 ${article.minutes || 1} 分钟`,
    ];
    if (article.publishedTime)
      meta.push(new Date(article.publishedTime).toLocaleDateString("zh-CN"));
    $("article-meta").textContent = meta.filter(Boolean).join("  ·  ");
    $("capture-type").textContent =
      article.mode === "demo"
        ? "示例文章"
        : article.mode === "selection"
          ? "选中文字"
          : "网页正文";
    $("source").hidden = !article.url;
    if (article.url) $("source").href = article.url;
    else $("source").removeAttribute("href");
    $("article-warning").textContent = (article.warnings || []).join(" ");
    $("article-warning").hidden = !article.warnings?.length;
    $("personal-note").value = article.note || "";
    $("article-body").innerHTML = clean;
    for (const a of $("article-body").querySelectorAll("a[href]")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    buildToc();
    show("reader");
    updateSaveState();
    renderLibrary();
    document.title = `${article.title} — 叶笺 Pageleaf`;
    window.scrollTo(0, 0);
    void readingProgress.open(article.id, Boolean(savedVersion));
  } catch {
    reportError("这篇笔记的内容无法读取，请重新从原网页整理。");
  }
}
function buildToc() {
  intersection?.disconnect();
  $("toc-links").replaceChildren();
  const headings = [...$("article-body").querySelectorAll("h1,h2,h3")];
  const links = new Map();
  for (const [index, heading] of headings.entries()) {
    heading.id = `section-${index}`;
    const link = makeText(
      "a",
      heading.textContent,
      heading.tagName === "H3" ? "sub" : "",
    );
    link.href = `#${heading.id}`;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      heading.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    });
    $("toc-links").append(link);
    links.set(heading, link);
  }
  if (!headings.length)
    $("toc-links").append(
      makeText("span", "这篇文章没有小标题。", "empty-hint"),
    );
  intersection = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          for (const link of links.values()) link.classList.remove("current");
          links.get(entry.target)?.classList.add("current");
        }
      }
    },
    { rootMargin: "-160px 0px -55% 0px", threshold: 0 },
  );
  for (const heading of headings) intersection.observe(heading);
}
async function saveNote() {
  if (!article || saving) return;
  const requestedArticle = { ...article };
  const requestedNote = $("personal-note").value;
  const requestedVersion = savedVersion;
  saving = true;
  $("save").disabled = true;
  $("personal-note").disabled = true;
  try {
    const result = await navigator.locks.request(
      "pageleaf-notes-write",
      async () => {
        const existing = (
          await storage.local.get(`note:${requestedArticle.id}`)
        )[`note:${requestedArticle.id}`];
        const copied = Boolean(
          existing?.updatedAt && existing.updatedAt !== requestedVersion,
        );
        const id = copied ? crypto.randomUUID() : requestedArticle.id;
        const data = await storage.local.get(null);
        if (
          !data[`note:${id}`] &&
          Object.keys(data).filter((key) => key.startsWith("note:")).length >=
            100
        )
          throw new Error(
            "本机最多保存 100 篇笔记。请先导出并删除不再需要的笔记。",
          );
        const next = {
          ...requestedArticle,
          id,
          note: requestedNote,
          updatedAt: new Date().toISOString(),
        };
        if (new TextEncoder().encode(JSON.stringify(next)).length > 1_000_000)
          throw new Error(
            "这篇文章太大，无法保存。请改为采集部分段落，或直接导出 Markdown。",
          );
        await storage.local.set({ [`note:${id}`]: next });
        return { next, copied };
      },
    );
    if (article?.id === requestedArticle.id) {
      article = result.next;
      savedVersion = result.next.updatedAt;
      readingProgress.markSaved(article.id);
      dirty = false;
      updateSaveState();
      history.replaceState(null, "", `#note=${article.id}`);
    }
    await loadLibrary();
    toast(
      result.copied
        ? "另一个窗口修改了原笔记，已将你的内容另存为新笔记。"
        : isPreview
          ? "已保留在当前预览页面；刷新会清空，请导出备份。"
          : "已保存到当前浏览器的本机笔记库。",
    );
  } catch (error) {
    toast(
      error.message?.includes("100") || error.message?.includes("太大")
        ? error.message
        : "本机存储空间不足或不可用。请先导出 Markdown 备份。",
    );
  } finally {
    saving = false;
    $("save").disabled = false;
    $("personal-note").disabled = false;
  }
}
async function deleteNote() {
  if (!pendingDelete) return;
  const id = pendingDelete;
  $("confirm-delete").disabled = true;
  try {
    await navigator.locks.request("pageleaf-notes-write", async () => {
      await storage.local.remove([`note:${id}`, `progress:${id}`]);
    });
    pendingDelete = "";
    $("delete-dialog").close();
    if (article?.id === id) {
      article = null;
      void readingProgress.open(null, false);
      dirty = false;
      savedVersion = "";
      show("welcome");
      document.title = "叶笺 Pageleaf — 让阅读留下来";
      history.replaceState(null, "", "reader.html");
    }
    await loadLibrary();
    toast("笔记已从本机删除。");
  } catch {
    toast("删除失败，请稍后重试。");
  } finally {
    $("confirm-delete").disabled = false;
  }
}
async function copyMarkdown() {
  if (!article) return;
  try {
    await navigator.clipboard.writeText(
      buildMarkdown(article, $("personal-note").value),
    );
    toast("已复制 Markdown，包含来源和你的笔记。");
  } catch {
    toast("无法访问剪贴板，请使用“导出 .md”保存。");
  }
}
function downloadText(text, type, filename) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 15_000);
}
function exportMarkdown() {
  if (!article) return;
  try {
    downloadText(
      buildMarkdown(article, $("personal-note").value),
      "text/markdown;charset=utf-8",
      noteFilename(article.title),
    );
    toast("已发起 Markdown 下载，请在浏览器下载列表中查看。");
  } catch {
    toast("导出失败，请尝试复制 Markdown。");
  }
}
function recordsFromStorage(data) {
  return Object.entries(data)
    .filter(
      ([key, value]) =>
        key.startsWith("note:") && value && typeof value.id === "string",
    )
    .map(([, value]) => value);
}
async function backupLibrary() {
  $("backup-library").disabled = true;
  try {
    const records = await navigator.locks.request(
      "pageleaf-notes-write",
      async () => recordsFromStorage(await storage.local.get(null)),
    );
    if (!records.length) {
      toast("笔记库为空，请先保存一篇笔记。");
      return;
    }
    const json = createBackup(records);
    downloadText(
      json,
      "application/json;charset=utf-8",
      `pageleaf-backup-${new Date().toISOString().slice(0, 10)}.json`,
    );
    toast(`已发起 ${records.length} 篇笔记的备份下载。`);
  } catch (error) {
    toast(error.message || "备份失败，请重试。");
  } finally {
    $("backup-library").disabled = false;
  }
}
async function previewImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  $("import-library").disabled = true;
  try {
    if (file.size > MAX_BACKUP_BYTES)
      throw new Error("备份文件超过 20 MB 上限。");
    const parsed = parseBackup(await file.text(), document);
    const plan = planImport(
      recordsFromStorage(await storage.local.get(null)),
      parsed.notes,
    );
    pendingImport = parsed.notes;
    $("import-summary").textContent =
      `将恢复 ${plan.notesToAdd.length} 篇笔记，跳过 ${plan.skipped} 篇重复笔记。${parsed.warnings.length ? "已清理不安全的网页内容和链接。" : ""}`;
    $("import-dialog").showModal();
  } catch (error) {
    pendingImport = null;
    toast(error.message || "备份无法读取，请选择叶笺导出的 JSON 文件。");
  } finally {
    $("import-file").value = "";
    $("import-library").disabled = false;
  }
}
async function confirmImport() {
  if (!pendingImport) return;
  const incoming = pendingImport;
  $("confirm-import").disabled = true;
  try {
    const plan = await navigator.locks.request(
      "pageleaf-notes-write",
      async () => {
        const latest = recordsFromStorage(await storage.local.get(null));
        const result = planImport(latest, incoming);
        if (result.notesToAdd.length)
          await storage.local.set(
            Object.fromEntries(
              result.notesToAdd.map((note) => [`note:${note.id}`, note]),
            ),
          );
        return result;
      },
    );
    pendingImport = null;
    $("import-dialog").close();
    await loadLibrary();
    toast(
      `已恢复 ${plan.notesToAdd.length} 篇笔记，跳过 ${plan.skipped} 篇重复笔记。`,
    );
  } catch (error) {
    toast(
      error.message?.includes("100")
        ? error.message
        : "恢复失败，可能是本机空间不足。已有笔记不会被覆盖。",
    );
  } finally {
    $("confirm-import").disabled = false;
  }
}
function preparePrint() {
  $("print-note").textContent = $("personal-note").value.trim();
  $("print-note").classList.toggle("empty", !$("print-note").textContent);
}
function printArticle() {
  if (!article) return;
  preparePrint();
  window.print();
}
function demoArticle() {
  return {
    id: crypto.randomUUID(),
    title: "把阅读变成自己的东西",
    url: "",
    siteName: "PAGELEAF JOURNAL · 示例文章",
    author: "叶笺",
    lang: "zh-CN",
    wordCount: 735,
    minutes: 3,
    capturedAt: new Date().toISOString(),
    mode: "demo",
    warnings: ["这是内置示例，可自由试读、写笔记和导出。"],
    content:
      "<p>收藏一篇文章只需要一秒，真正理解它，却需要留一点时间。我们总能找到值得读的文字，但未必能记住当时为什么被它打动。</p><p>好的笔记不是文章的替身。它更像一枚书签，替你保存阅读发生的那个瞬间：一个疑问，一句不同意的话，或者一个准备付诸行动的想法。</p><h2>01 · 先留住一个问题</h2><p>下次读到让你停顿的段落，不必急着摘抄全文。试着先问自己：这段话回答了什么？它还留下了什么？</p><blockquote><p>阅读的价值，不只在于你读了多少，也在于哪些东西让你的思考向前走了一步。</p></blockquote><p>用自己的语言记下一两句话。它们也许不够完整，却是理解真正开始的地方。</p><h2>02 · 让笔记可以带走</h2><p>把文字保存在一种简单、通用的格式里，就能在不同工具之间自由整理。Markdown 保留标题、列表和代码，也让内容保持可读。</p><h3>一个小小的阅读习惯</h3><ul><li>保存来源，给作者应有的署名。</li><li>写下一句自己的理解。</li><li>列出一个可以继续探索的问题。</li></ul><table><thead><tr><th>读到什么</th><th>留些什么</th></tr></thead><tbody><tr><td>一个好观点</td><td>我为什么认同它</td></tr><tr><td>一段教程</td><td>我打算如何尝试</td></tr><tr><td>一个疑问</td><td>下一步去哪里寻找答案</td></tr></tbody></table><h2>03 · 给思考留一点空白</h2><p>不需要把每篇文章都变成一份作业。有时，只保留一段与你有关的文字，已经足够。</p><p>在上方的“我的笔记”里写下一句话，然后保存或导出。这一页，就有了属于你的部分。</p>",
    markdown:
      "收藏一篇文章只需要一秒，真正理解它，却需要留一点时间。我们总能找到值得读的文字，但未必能记住当时为什么被它打动。\n\n好的笔记不是文章的替身。它更像一枚书签，替你保存阅读发生的那个瞬间：一个疑问，一句不同意的话，或者一个准备付诸行动的想法。\n\n## 01 · 先留住一个问题\n\n下次读到让你停顿的段落，不必急着摘抄全文。试着先问自己：这段话回答了什么？它还留下了什么？\n\n> 阅读的价值，不只在于你读了多少，也在于哪些东西让你的思考向前走了一步。\n\n用自己的语言记下一两句话。它们也许不够完整，却是理解真正开始的地方。\n\n## 02 · 让笔记可以带走\n\n把文字保存在一种简单、通用的格式里，就能在不同工具之间自由整理。Markdown 保留标题、列表和代码，也让内容保持可读。\n\n### 一个小小的阅读习惯\n\n- 保存来源，给作者应有的署名。\n- 写下一句自己的理解。\n- 列出一个可以继续探索的问题。\n\n| 读到什么 | 留些什么 |\n| --- | --- |\n| 一个好观点 | 我为什么认同它 |\n| 一段教程 | 我打算如何尝试 |\n| 一个疑问 | 下一步去哪里寻找答案 |\n\n## 03 · 给思考留一点空白\n\n不需要把每篇文章都变成一份作业。有时，只保留一段与你有关的文字，已经足够。\n\n在上方的“我的笔记”里写下一句话，然后保存或导出。这一页，就有了属于你的部分。",
  };
}
$("demo").addEventListener("click", () => {
  if (canLeave()) renderArticle(demoArticle());
});
$("error-demo").addEventListener("click", () => renderArticle(demoArticle()));
$("personal-note").addEventListener("input", () => {
  dirty = true;
  updateSaveState();
});
$("search").addEventListener("input", renderLibrary);
$("save").addEventListener("click", saveNote);
$("copy").addEventListener("click", copyMarkdown);
$("export").addEventListener("click", exportMarkdown);
$("backup-library").addEventListener("click", backupLibrary);
$("import-library").addEventListener("click", () => $("import-file").click());
$("import-file").addEventListener("change", previewImport);
$("confirm-import").addEventListener("click", confirmImport);
$("cancel-import").addEventListener("click", () => $("import-dialog").close());
$("import-dialog").addEventListener("close", () => {
  pendingImport = null;
});
$("print").addEventListener("click", printArticle);
window.addEventListener("beforeprint", preparePrint);
$("help").addEventListener("click", () => $("help-dialog").showModal());
$("theme").addEventListener("click", async () => {
  settings.dark = !settings.dark;
  await saveSettings();
});
$("font-down").addEventListener("click", async () => {
  settings.fontSize = Math.max(15, settings.fontSize - 1);
  await saveSettings();
});
$("font-up").addEventListener("click", async () => {
  settings.fontSize = Math.min(26, settings.fontSize + 1);
  await saveSettings();
});
$("cancel-delete").addEventListener("click", () => $("delete-dialog").close());
$("confirm-delete").addEventListener("click", deleteNote);
document.querySelector(".brand").addEventListener("click", (event) => {
  if (!canLeave()) event.preventDefault();
});
window.addEventListener("beforeunload", (event) => {
  if (dirty) {
    event.preventDefault();
    event.returnValue = "";
  }
});
globalThis.chrome?.storage?.onChanged?.addListener?.(async (changes, area) => {
  if (
    area === "local" &&
    Object.keys(changes).some((key) => key.startsWith("note:"))
  ) {
    try {
      await loadLibrary();
    } catch {
      toast("笔记库刷新失败。");
    }
  }
});

async function init() {
  try {
    $("preview-notice").hidden = !isPreview;
    if (isPreview) $("privacy-status").lastChild.textContent = "网页预览";
    const saved = (await storage.local.get("settings")).settings;
    if (saved)
      settings = {
        dark: saved.dark === true,
        fontSize: Math.min(26, Math.max(15, Number(saved.fontSize) || 18)),
      };
    updateSettings();
    await loadLibrary();
    const params = new URLSearchParams(location.hash.slice(1));
    if (params.has("error")) {
      reportError(params.get("error"));
      return;
    }
    const captureId = params.get("capture");
    const noteId = params.get("note");
    if (captureId) {
      const value = (await storage.session.get(`capture:${captureId}`))[
        `capture:${captureId}`
      ];
      if (value) renderArticle(value);
      else
        reportError(
          "这份临时文章已经过期。请回到原网页，重新点击叶笺整理；保存到本机的笔记可以从左侧打开。",
        );
    } else if (noteId) {
      const value = (await storage.local.get(`note:${noteId}`))[
        `note:${noteId}`
      ];
      if (value) renderArticle(value);
      else reportError("这篇笔记已被删除，或不在当前浏览器的本机笔记库中。");
    } else if (new URLSearchParams(location.search).has("demo"))
      renderArticle(demoArticle());
  } catch {
    reportError(
      "暂时无法读取本机笔记库，请重新打开叶笺，或检查浏览器的扩展存储设置。",
    );
  }
}
await init();

import { sanitizeArticle, safeHttpURL } from "./content.js";
import { buildMarkdown, noteFilename, searchNotes } from "./notes.js";
import {
  createBackup,
  parseBackup,
  planImport,
  MAX_BACKUP_BYTES,
} from "./backup.js";
import { createReadingProgress } from "./progress.js";
import { getSelectionAnnotation, renderAnnotations, validateAnnotations, ANNOTATION_LIMITS } from "./markup.js";
import { demoArticle as makeDemoArticle } from "./demo.js";
import { organizeArticle } from "./organize.js";
import { resolveLanguage, t, formatNumber, formatDate, formatMinutes, translateDocument, localizeMessage } from "./i18n.js";

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
let settings = { dark: false, fontSize: 18, language: "en" };
const tr = (key, params) => t(settings.language, key, params);
let importSummary = null;
let currentError = "";
let progressRatio = 0;
let toastTimer;
let intersection;
let pendingImport = null;
let penActive = false;
let activeStroke = null;
let organizedDraft = null;
const readingProgress = createReadingProgress({
  storage: storage.local,
  locks: navigator.locks,
  window,
  document,
  onChange: (ratio) => {
    progressRatio = ratio;
    const percent = Math.round(ratio * 100);
    $("reading-progress").hidden = !article;
    $("reading-progress").setAttribute("aria-valuenow", String(percent));
    document.documentElement.style.setProperty(
      "--reading-progress",
      String(ratio),
    );
    $("progress-label").textContent = new Intl.NumberFormat(settings.language, { style: "percent" }).format(ratio);
  },
  onError: () => toast(tr("progressError")),
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
  currentError = message;
  $("error-message").textContent = localizeMessage(settings.language, message);
  show("error-view");
}
function canLeave() {
  if (saving) {
    toast(tr("saving"));
    return false;
  }
  return (
    !dirty ||
    window.confirm(tr("leave"))
  );
}
function updateSaveState() {
  $("save-state").textContent = dirty
    ? tr("unsavedChanges")
    : savedVersion
      ? isPreview
        ? tr("savedPreview")
        : tr("savedLocal")
      : tr("notSaved");
  $("save").textContent = savedVersion ? tr("saveChanges") : tr("saveNote");
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
    settings.dark ? tr("light") : tr("dark"),
  );
  $("theme").setAttribute(
    "title",
    settings.dark ? tr("light") : tr("dark"),
  );
  $("font-down").disabled = settings.fontSize <= 15;
  $("font-up").disabled = settings.fontSize >= 26;
  if ($("annotation-hint")) $("annotation-hint").textContent = tr(penActive ? "penHint" : "selectionHint");
}
async function saveSettings() {
  updateSettings();
  try {
    await storage.local.set({ settings });
    if (isPreview) {
      try {
        window.localStorage.setItem("pageleaf-language", settings.language);
        window.localStorage.setItem("pageleaf-dark", String(settings.dark));
      } catch { /* Preferences are optional in the web preview. */ }
    }
  } catch {
    toast(tr("settingsError"));
  }
}

function updateArticleLabels() {
  if (!article) return;
  $("article-title").textContent = article.title;
  $("article-site").textContent = article.siteName || tr("web");
  const meta = [article.author, tr("aboutMinutes", {time: formatMinutes(settings.language, article.minutes)})];
  if (article.publishedTime) meta.push(formatDate(settings.language, article.publishedTime));
  $("article-meta").textContent = meta.filter(Boolean).join(" · ");
  $("capture-type").textContent = tr(article.mode === "demo" ? "captureDemo" : article.mode === "selection" ? "captureSelection" : "captureArticle");
  $("source").hidden = !article.url;
  if (article.url) $("source").href = article.url;
  else $("source").removeAttribute("href");
  $("article-warning").textContent = article.mode === "demo"
    ? tr("demoWarning", {language: new Intl.DisplayNames([settings.language], {type: "language"}).of(article.lang || "en")})
    : (article.warnings || []).map(message => localizeMessage(settings.language, message)).join(" ");
  $("article-warning").hidden = !article.warnings?.length || (article.mode === "demo" && resolveLanguage(article.lang) === settings.language);
}
function updateImportSummary() {
  if (!importSummary) return;
  $("import-summary").textContent = tr("importPreview", {add: formatNumber(settings.language, importSummary.add), skip: formatNumber(settings.language, importSummary.skip)}) + (importSummary.sanitized ? ` ${tr("sanitized")}` : "");
}
function applyLanguage() {
  translateDocument(document, settings.language);
  if ($("language")) $("language").value = settings.language;
  const badge = $("privacy-status");
  if (badge) badge.textContent = tr(isPreview ? "preview" : "local");
  updateSettings();
  updateSaveState();
  renderLibrary();
  updateArticleLabels();
  updateImportSummary();
  if (currentError) $("error-message").textContent = localizeMessage(settings.language, currentError);
  $("progress-label").textContent = new Intl.NumberFormat(settings.language, {style: "percent"}).format(progressRatio);
  // Updating labels must never recreate the editor or discard an unsaved draft.
  if (article) {
    document.title = `${article.title} — Pageleaf`;
    if (!$("article-body").querySelector("h1,h2,h3")) {
      const empty = $("toc-links").querySelector(".empty-hint");
      if (empty) empty.textContent = tr("noHeadings");
    }
  } else document.title = tr("title");
  for (const link of document.querySelectorAll("[data-reader-exit], .brand, .reader-nav a")) {
    const url = new URL(link.getAttribute("href"), location.href);
    url.searchParams.set("lang", settings.language);
    link.setAttribute("href", `${url.pathname.split("/").pop()}${url.search}${url.hash}`);
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
  $("note-count").textContent = formatNumber(settings.language, notes.length);
  const found = searchNotes(notes, $("search").value);
  $("library-empty").hidden = found.length > 0;
  $("library-empty").textContent = notes.length
    ? tr("noMatches")
    : tr("emptyLibrary");
  for (const item of found) {
    const card = makeText("div", "", "note-card");
    card.classList.toggle("active", item.id === article?.id);
    const open = makeText("button", "", "note-open");
    open.type = "button";
    open.setAttribute("aria-label", tr("openNote", {title: item.title}));
    open.append(
      Object.assign(makeText("strong", item.title), {dir: "auto"}),
      makeText(
        "span",
        `${formatDate(settings.language, item.updatedAt)} · ${formatMinutes(settings.language, item.minutes)}`,
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
    remove.setAttribute("aria-label", tr("deleteNote", {title: item.title}));
    remove.addEventListener("click", () => {
      if (saving) {
        toast(tr("saving"));
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
    updateArticleLabels();
    $("personal-note").value = article.note || "";
    $("article-body").innerHTML = clean;
    article.annotations = validateAnnotations(value.annotations, $("article-body"));
    setPenMode(false);
    renderMarkup();
    $("article-body").dir = "auto";
    $("article-body").lang = /^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/.test(article.lang || "") ? article.lang : "";
    $("article-title").dir = "auto";
    $("article-title").lang = $("article-body").lang;
    $("personal-note").dir = "auto";
    for (const a of $("article-body").querySelectorAll("a[href]")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    buildToc();
    show("reader");
    updateSaveState();
    renderLibrary();
    document.title = `${article.title} — Pageleaf`;
    window.scrollTo(0, 0);
    void readingProgress.open(article.id, Boolean(savedVersion));
  } catch {
    reportError("noteError");
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
      makeText("span", tr("noHeadings"), "empty-hint"),
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
  setPenMode(false);
  for (const button of document.querySelectorAll(".annotation-toolbar button")) button.disabled = true;
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
            "limitNotes",
          );
        const next = {
          ...requestedArticle,
          id,
          note: requestedNote,
          updatedAt: new Date().toISOString(),
        };
        if (new TextEncoder().encode(JSON.stringify(next)).length > 1_000_000)
          throw new Error(
            "largeNote",
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
        ? tr("conflictSaved")
        : isPreview
          ? tr("previewSaved")
          : tr("saved"),
    );
  } catch (error) {
    toast(
      ["limitNotes", "largeNote"].includes(error.message) ? tr(error.message) : tr("storageError"),
    );
  } finally {
    saving = false;
    $("save").disabled = false;
    $("personal-note").disabled = false;
    for (const button of document.querySelectorAll(".annotation-toolbar button")) button.disabled = false;
    updateMarkupButtons();
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
      document.title = tr("title");
      history.replaceState(null, "", `reader.html?lang=${settings.language}`);
    }
    await loadLibrary();
    toast(tr("deleted"));
  } catch {
    toast(tr("deleteError"));
  } finally {
    $("confirm-delete").disabled = false;
  }
}
async function copyMarkdown() {
  if (!article) return;
  try {
    await navigator.clipboard.writeText(
      buildMarkdown(article, $("personal-note").value, { locale: settings.language }),
    );
    toast(tr("copied"));
  } catch {
    toast(tr("clipboardError"));
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
      buildMarkdown(article, $("personal-note").value, { locale: settings.language }),
      "text/markdown;charset=utf-8",
      noteFilename(article.title),
    );
    toast(tr("exported"));
  } catch {
    toast(tr("exportError"));
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
      toast(tr("backupEmpty"));
      return;
    }
    const json = createBackup(records);
    downloadText(
      json,
      "application/json;charset=utf-8",
      `pageleaf-backup-${new Date().toISOString().slice(0, 10)}.json`,
    );
    toast(tr("backedUp", {count: formatNumber(settings.language, records.length)}));
  } catch (error) {
    toast(localizeMessage(settings.language, error.message, "backupError"));
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
      throw new Error("backupLarge");
    const parsed = parseBackup(await file.text(), document);
    const plan = planImport(
      recordsFromStorage(await storage.local.get(null)),
      parsed.notes,
    );
    pendingImport = parsed.notes;
    importSummary = { add: plan.notesToAdd.length, skip: plan.skipped, sanitized: parsed.warnings.length > 0 };
    updateImportSummary();
    $("import-dialog").showModal();
  } catch (error) {
    pendingImport = null;
    toast(localizeMessage(settings.language, error.message, "backupInvalid"));
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
      tr("imported", {add: formatNumber(settings.language, plan.notesToAdd.length), skip: formatNumber(settings.language, plan.skipped)}),
    );
  } catch (error) {
    toast(
      error.message?.includes("100") ? tr("limitNotes") : tr("importError"),
    );
  } finally {
    $("confirm-import").disabled = false;
  }
}
function updateMarkupButtons() {
  const count = article?.annotations?.length || 0;
  $("undo-mark").disabled = saving || !count;
  $("clear-marks").disabled = saving || !count;
}
function setPenMode(enabled) {
  penActive = Boolean(enabled && article && !saving);
  activeStroke = null;
  $("pen").setAttribute("aria-pressed", String(penActive));
  $("article-surface").classList.toggle("drawing", penActive);
  $("annotation-hint").textContent = tr(penActive ? "penHint" : "selectionHint");
}
function drawStrokes(extra = null) {
  const layer = $("pen-layer");
  layer.replaceChildren();
  for (const stroke of [...(article?.annotations || []), ...(extra ? [extra] : [])]) {
    if (stroke.type !== "pen") continue;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", stroke.points.map(([x, y], index) => `${index ? "L" : "M"}${(x * 1000).toFixed(2)},${(y * 1000).toFixed(2)}`).join(" "));
    path.setAttribute("vector-effect", "non-scaling-stroke");
    layer.appendChild(path);
  }
}
function renderMarkup() {
  if (!article) return;
  renderAnnotations($("article-body"), article.annotations || [], document);
  drawStrokes();
  updateMarkupButtons();
}
function changedMarkup() {
  dirty = true;
  renderMarkup();
  updateSaveState();
}
function addTextMark(style) {
  if (!article || saving) return;
  setPenMode(false);
  const mark = getSelectionAnnotation($("article-body"), window.getSelection(), style);
  if (!mark) return toast(tr("selectionHint"));
  const marks = article.annotations || [];
  if (marks.filter(item => item.type === "text").length >= ANNOTATION_LIMITS.text)
    return toast(tr("annotationLimit"));
  if (marks.some(item => item.type === "text" && item.start === mark.start && item.end === mark.end && item.style === mark.style)) return;
  article.annotations = [...marks, mark];
  window.getSelection()?.removeAllRanges();
  changedMarkup();
  toast(tr("markAdded"));
}
function penPoint(event) {
  const rect = $("pen-layer").getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  return [Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)), Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))];
}
function startPen(event) {
  if (!penActive || !article || saving || (event.button !== undefined && event.button !== 0)) return;
  if ((article.annotations || []).filter(item => item.type === "pen").length >= ANNOTATION_LIMITS.pen)
    return toast(tr("annotationLimit"));
  const point = penPoint(event);
  if (!point) return;
  event.preventDefault();
  activeStroke = { type: "pen", points: [point] };
  $("pen-layer").setPointerCapture?.(event.pointerId);
}
function movePen(event) {
  if (!activeStroke || saving) return;
  const point = penPoint(event);
  if (!point || activeStroke.points.length >= ANNOTATION_LIMITS.points) return;
  const last = activeStroke.points.at(-1);
  if (Math.hypot(point[0] - last[0], point[1] - last[1]) < 0.0005) return;
  activeStroke.points.push(point);
  drawStrokes(activeStroke);
}
function finishPen(event) {
  if (!activeStroke) return;
  movePen(event);
  const stroke = activeStroke;
  activeStroke = null;
  if (stroke.points.length < 2) return drawStrokes();
  article.annotations = validateAnnotations([...(article.annotations || []), stroke], $("article-body"));
  changedMarkup();
}
function previewOrganization() {
  if (!article || saving) return;
  setPenMode(false);
  organizedDraft = organizeArticle({content: article.content, annotations: article.annotations || [], document, locale: settings.language});
  if (!organizedDraft.items.length) return toast(tr("marksEmpty"));
  const list = document.createElement("ol");
  for (const item of organizedDraft.items) {
    const entry = document.createElement("li");
    if (item.heading) {
      const heading = document.createElement("strong");
      heading.textContent = item.heading;
      entry.append(heading);
    }
    const text = document.createElement("p");
    text.textContent = item.text;
    entry.append(text);
    list.append(entry);
  }
  $("organize-preview").replaceChildren(list);
  $("organize-hint").textContent = tr(organizedDraft.source === "marks" ? "organizeMarksHint" : "organizeSectionsHint");
  $("organize-dialog").showModal();
}
function appendOrganization() {
  if (!organizedDraft || saving) return;
  const editor = $("personal-note");
  const excerpts = [tr("organizeTitle"), ...organizedDraft.items.map(item => `• ${item.heading ? `${item.heading}: ` : ""}${item.text}`)].join("\n");
  const next = [editor.value, excerpts].filter(Boolean).join("\n\n");
  if (next.length > editor.maxLength) return toast(tr("largeNote"));
  editor.value = next;
  dirty = true;
  updateSaveState();
  $("organize-dialog").close();
  editor.focus();
}
function markOrganization() {
  if (!organizedDraft || !article || saving) return;
  const raw = $("article-body").textContent;
  let normalized = "";
  const offsets = [];
  for (let index = 0; index < raw.length; index++) {
    const character = /\s/u.test(raw[index]) ? " " : raw[index];
    if (character === " " && normalized.endsWith(" ")) continue;
    normalized += character;
    offsets.push(index);
  }
  const marks = [...(article.annotations || [])];
  for (const item of organizedDraft.items) {
    if (marks.filter(mark => mark.type === "text").length >= ANNOTATION_LIMITS.text) break;
    const needle = item.text.replace(/…$/, "").replace(/\s+/gu, " ").trim();
    const headingIndex = item.heading ? normalized.indexOf(item.heading.replace(/\s+/gu, " ").trim()) : -1;
    const index = normalized.indexOf(needle, Math.max(0, headingIndex));
    if (!needle || index < 0) continue;
    const start = offsets[index];
    const end = offsets[index + needle.length - 1] + 1;
    if (marks.some(mark => mark.type === "text" && mark.start === start && mark.end === end && mark.style === "highlight")) continue;
    marks.push({type: "text", style: "highlight", start, end, exact: raw.slice(start, end)});
  }
  article.annotations = validateAnnotations(marks, $("article-body"));
  changedMarkup();
  $("organize-dialog").close();
  toast(tr("markAdded"));
}
for (const button of document.querySelectorAll("[data-mark]")) {
  button.addEventListener("pointerdown", event => event.preventDefault());
  button.addEventListener("click", () => addTextMark(button.dataset.mark));
}
$("pen").addEventListener("click", () => { setPenMode(!penActive); if (penActive) toast(tr("penHint")); });
$("undo-mark").addEventListener("click", () => {
  if (!article || saving || !article.annotations?.length) return;
  article.annotations = article.annotations.slice(0, -1);
  changedMarkup();
  toast(tr("undoDone"));
});
$("clear-marks").addEventListener("click", () => {
  if (!article || saving || !article.annotations?.length || !window.confirm(tr("clearMarksConfirm"))) return;
  article.annotations = [];
  changedMarkup();
  toast(tr("marksCleared"));
});
$("jump-note").addEventListener("click", () => { $("personal-note").scrollIntoView({block: "center"}); $("personal-note").focus({preventScroll: true}); });
$("organize").addEventListener("click", previewOrganization);
$("append-organize").addEventListener("click", appendOrganization);
$("mark-organized").addEventListener("click", markOrganization);
$("cancel-organize").addEventListener("click", () => $("organize-dialog").close());
$("organize-dialog").addEventListener("close", () => { organizedDraft = null; });
$("pen-layer").addEventListener("pointerdown", startPen);
$("pen-layer").addEventListener("pointermove", movePen);
$("pen-layer").addEventListener("pointerup", finishPen);
$("pen-layer").addEventListener("pointercancel", () => { activeStroke = null; drawStrokes(); });
window.addEventListener("keydown", event => { if (event.key === "Escape" && penActive) setPenMode(false); });
if (typeof ResizeObserver === "function") {
  const toolbarObserver = new ResizeObserver(entries => {
    for (const entry of entries) document.documentElement.style.setProperty(entry.target.classList.contains("annotation-toolbar") ? "--annotation-toolbar-height" : "--reader-toolbar-height", `${entry.target.getBoundingClientRect().height}px`);
  });
  toolbarObserver.observe(document.querySelector(".reader-toolbar"));
  toolbarObserver.observe(document.querySelector(".annotation-toolbar"));
}

function preparePrint() {
  setPenMode(false);
  $("print-note").textContent = $("personal-note").value.trim();
  $("print-note").classList.toggle("empty", !$("print-note").textContent);
}
function printArticle() {
  if (!article) return;
  preparePrint();
  window.print();
}
function demoArticle() { return makeDemoArticle(settings.language); }
function openDemo() {
  if (!canLeave()) return;
  const url = new URL(location.href);
  url.hash = "";
  url.searchParams.set("demo", "");
  url.searchParams.set("lang", settings.language);
  history.replaceState(null, "", `${url.pathname}${url.search}`);
  renderArticle(demoArticle());
}
$("demo").addEventListener("click", openDemo);
$("error-demo").addEventListener("click", openDemo);
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
$("help")?.addEventListener("click", () => $("help-dialog").showModal());
$("language")?.addEventListener("change", async (event) => {
  settings.language = resolveLanguage(event.target.value);
  const url = new URL(location.href);
  url.searchParams.set("lang", settings.language);
  history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  applyLanguage();
  await saveSettings();
});
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
for (const link of document.querySelectorAll("[data-reader-exit], .brand, .reader-nav a")) {
  link.addEventListener("click", (event) => {
    if (!canLeave()) event.preventDefault();
  });
}
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
      toast(tr("libraryError"));
    }
  }
});

async function init() {
  settings.language = resolveLanguage(new URLSearchParams(location.search).get("lang") || navigator.languages || navigator.language);
  applyLanguage();
  try {
    $("preview-notice").hidden = !isPreview;
    const saved = (await storage.local.get("settings")).settings;
    if (saved)
      settings = {
        dark: saved.dark === true,
        fontSize: Math.min(26, Math.max(15, Number(saved.fontSize) || 18)),
        language: resolveLanguage(saved.language || navigator.languages || navigator.language),
      };
    let previewLanguage = "";
    try {
      if (isPreview) {
        previewLanguage = window.localStorage.getItem("pageleaf-language") || "";
        settings.dark = window.localStorage.getItem("pageleaf-dark") === "true";
      }
    } catch { /* Browser privacy settings may disable preview preferences. */ }
    settings.language = resolveLanguage(new URLSearchParams(location.search).get("lang") || (isPreview ? previewLanguage : saved?.language) || navigator.languages || navigator.language);
    applyLanguage();
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
          "expired",
        );
    } else if (noteId) {
      const value = (await storage.local.get(`note:${noteId}`))[
        `note:${noteId}`
      ];
      if (value) renderArticle(value);
      else reportError("missing");
    } else if (new URLSearchParams(location.search).has("demo"))
      renderArticle(demoArticle());
  } catch {
    reportError(
      "initError",
    );
  }
}
await init();

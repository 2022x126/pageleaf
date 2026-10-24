const CAPTURE_PREFIX = "capture:";
const DAY = 24 * 60 * 60 * 1000;

async function capture(tab) {
  if (!Number.isInteger(tab.id)) return;
  try {
    await chrome.action.setBadgeBackgroundColor({
      color: "#111111",
      tabId: tab.id,
    });
    await chrome.action.setBadgeText({ text: "…", tabId: tab.id });
    const injected = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["capture.js"],
    });
    const documentId = injected[0]?.documentId;
    const result = await chrome.scripting.executeScript({
      target: documentId
        ? { tabId: tab.id, documentIds: [documentId] }
        : { tabId: tab.id },
      func: () => {
        try {
          return { ok: true, article: PageleafCapture.capturePage(document) };
        } catch (error) {
          return { ok: false, error: error.message };
        }
      },
    });
    if (!result[0]?.result?.ok)
      throw new Error(result[0]?.result?.error || "没有找到可以整理的正文。");
    const article = result[0].result.article;
    const id = crypto.randomUUID();
    const value = { ...article, id };
    if (new TextEncoder().encode(JSON.stringify(value)).length > 1_000_000) {
      throw new Error("正文内容太大，请先选中需要保存的段落，再重新采集。");
    }
    await navigator.locks.request("pageleaf-capture-cache", async () => {
      const data = await chrome.storage.session.get(null);
      const captures = Object.entries(data)
        .filter(([key]) => key.startsWith(CAPTURE_PREFIX))
        .sort(
          (a, b) => Date.parse(b[1].capturedAt) - Date.parse(a[1].capturedAt),
        );
      const fresh = captures.filter(
        ([, item]) =>
          Number.isFinite(Date.parse(item.capturedAt)) &&
          Date.now() - Date.parse(item.capturedAt) <= DAY,
      );
      const keep = new Set(fresh.slice(0, 5).map(([key]) => key));
      const stale = captures
        .filter(([key]) => !keep.has(key))
        .map(([key]) => key);
      if (stale.length) await chrome.storage.session.remove(stale);
      try {
        await chrome.storage.session.set({ [`${CAPTURE_PREFIX}${id}`]: value });
      } catch {
        throw new Error(
          "临时存储空间不足。请关闭不再使用的叶笺阅读页面，或先保存重要笔记并重新启动浏览器。",
        );
      }
    });
    await chrome.tabs.create({
      url: chrome.runtime.getURL(`reader.html#capture=${id}`),
    });
  } catch (error) {
    const message = /无法|正文|过大|过长|选中|支持|内容|页面|存储/.test(
      error.message,
    )
      ? error.message
      : "这个页面暂时无法提取。请在普通文章网页上点击叶笺；浏览器设置、扩展商店、PDF 和部分受保护页面不支持。";
    await chrome.tabs.create({
      url: chrome.runtime.getURL(
        `reader.html#error=${encodeURIComponent(message.slice(0, 300))}`,
      ),
    });
  } finally {
    try {
      await chrome.action.setBadgeText({ text: "", tabId: tab.id });
    } catch {
      /* A closed source tab has no badge to clear. */
    }
  }
}
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // A browser-managed lock deduplicates in-flight requests atomically. No business
    // state lives in the worker; locks release automatically if it terminates.
    await navigator.locks.request(
      `pageleaf-capture:${tab.id}`,
      { ifAvailable: true },
      async (lock) => {
        if (lock) await capture(tab);
      },
    );
  } catch {
    /* The user can retry from the action if the source tab closed. */
  }
});
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    try {
      await chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
    } catch {
      /* The action remains available if the welcome page cannot open. */
    }
  }
});

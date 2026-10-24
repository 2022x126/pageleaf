import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { SUPPORTED_LANGUAGES, TRANSLATIONS, resolveLanguage, t, formatNumber, formatDate, formatMinutes, translateDocument, localizeMessage } from "../src/i18n.js";

test("matches regional browser preferences and falls back to English", () => {
  assert.equal(resolveLanguage(["it-IT", "fr-CA", "en"]), "fr");
  assert.equal(resolveLanguage("ES_mx"), "es");
  assert.equal(resolveLanguage("zh-Hant-TW"), "zh-CN");
  assert.equal(resolveLanguage(["ko", "pt-BR"]), "en");
  assert.equal(resolveLanguage(null), "en");
});

test("all supported languages have complete nonempty reader translations", () => {
  const keys = Object.keys(TRANSLATIONS.en).sort();
  for (const locale of SUPPORTED_LANGUAGES) {
    assert.deepEqual(Object.keys(TRANSLATIONS[locale]).sort(), keys);
    for (const value of Object.values(TRANSLATIONS[locale])) assert.ok(typeof value === "string" && value.trim());
    assert.ok(!/[\u3400-\u9fff]/u.test(t(locale, "captureError")) || ["zh-CN", "ja"].includes(locale));
  }
});

test("formats numbers, dates and reading duration using the UI locale", () => {
  assert.equal(formatNumber("de", 12345), "12.345");
  assert.equal(formatNumber("en", 12345), "12,345");
  assert.match(formatMinutes("fr", 3), /3/);
  assert.notEqual(formatDate("en", "2026-10-21T12:00:00Z"), formatDate("de", "2026-10-21T12:00:00Z"));
  assert.equal(formatDate("en", "invalid"), "");
});

test("translates visible and accessible labels without parsing inserted text as markup", () => {
  const dom = new JSDOM('<html><body><button data-i18n="saveNote"></button><input data-i18n-placeholder="notePlaceholder" data-i18n-label="myNotes"><article dir="auto" lang="ja">原文</article></body></html>');
  translateDocument(dom.window.document, "ar");
  assert.equal(dom.window.document.documentElement.dir, "rtl");
  assert.equal(dom.window.document.documentElement.lang, "ar");
  assert.equal(dom.window.document.querySelector("button").textContent, t("ar", "saveNote"));
  assert.equal(dom.window.document.querySelector("input").getAttribute("aria-label"), t("ar", "myNotes"));
  assert.equal(dom.window.document.querySelector("article").textContent, "原文");
  assert.equal(dom.window.document.querySelector("article").lang, "ja");
  assert.equal(t("en", "openNote", {title: "<img src=x>"}), "Open note: <img src=x>");
  dom.window.close();
});

test("localizes capture errors and warnings saved by older Chinese-only releases", () => {
  assert.equal(localizeMessage("es", "仅保存文字和安全链接，图片、音视频及交互内容不会保存。"), t("es", "textOnly"));
  assert.equal(localizeMessage("ar", "正文过长，请先选中需要保存的段落，再重新采集。"), t("ar", "captureLarge"));
  assert.equal(localizeMessage("de", "备份中的 title 字段无效或过长。", "backupInvalid"), t("de", "backupInvalid"));
  assert.equal(localizeMessage("en", "未知错误", "backupInvalid"), t("en", "backupInvalid"));
});

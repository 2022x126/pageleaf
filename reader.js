// src/content.js
var CONTENT_LIMITS = Object.freeze({
  inputHTML: 6e5,
  outputHTML: 3e5,
  text: 18e4,
  nodes: 25e3,
  depth: 120
});
var ALLOWED = /* @__PURE__ */ new Set([
  "article",
  "section",
  "div",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "a",
  "strong",
  "b",
  "em",
  "i",
  "s",
  "del",
  "u",
  "sub",
  "sup",
  "br",
  "hr",
  "table",
  "caption",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "dl",
  "dt",
  "dd",
  "figure",
  "figcaption",
  "small",
  "mark",
  "kbd",
  "samp",
  "var",
  "span"
]);
var DROP = /* @__PURE__ */ new Set([
  "script",
  "style",
  "iframe",
  "frame",
  "frameset",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "option",
  "datalist",
  "output",
  "object",
  "embed",
  "applet",
  "svg",
  "math",
  "canvas",
  "img",
  "picture",
  "source",
  "audio",
  "video",
  "track",
  "link",
  "meta",
  "base",
  "template",
  "noscript",
  "nav",
  "aside",
  "footer"
]);
function safeHttpURL(value, baseURL) {
  if (typeof value !== "string" || !value.trim() || value.length > 4096)
    return "";
  try {
    const url = new URL(value, baseURL);
    if (!["http:", "https:"].includes(url.protocol)) return "";
    url.username = "";
    url.password = "";
    url.search = "";
    url.hash = "";
    return url.href;
  } catch {
    return "";
  }
}
function sanitizeArticle(html2, baseURL, document2) {
  if (!document2?.createElement || typeof html2 !== "string") {
    throw new Error("\u65E0\u6CD5\u5904\u7406\u8FD9\u6BB5\u7F51\u9875\u5185\u5BB9\u3002\u8BF7\u91CD\u65B0\u6253\u5F00\u9875\u9762\u540E\u518D\u8BD5\u3002");
  }
  if (html2.length > CONTENT_LIMITS.inputHTML) {
    throw new Error("\u6B63\u6587\u8FC7\u957F\uFF0C\u8BF7\u5148\u9009\u4E2D\u9700\u8981\u4FDD\u5B58\u7684\u6BB5\u843D\uFF0C\u518D\u91CD\u65B0\u91C7\u96C6\u3002");
  }
  const input = document2.createElement("template");
  input.innerHTML = html2;
  const output = document2.createElement("template");
  let visited = 0;
  let textLength = 0;
  function copy(node, parent, depth) {
    visited += 1;
    if (visited > CONTENT_LIMITS.nodes || depth > CONTENT_LIMITS.depth) {
      throw new Error("\u8FD9\u6BB5\u7F51\u9875\u7ED3\u6784\u8FC7\u4E8E\u590D\u6742\uFF0C\u8BF7\u9009\u4E2D\u9700\u8981\u4FDD\u5B58\u7684\u6BB5\u843D\u540E\u91CD\u8BD5\u3002");
    }
    if (node.nodeType === 3) {
      textLength += node.data.length;
      if (textLength > CONTENT_LIMITS.text) {
        throw new Error("\u6B63\u6587\u8FC7\u957F\uFF0C\u8BF7\u9009\u4E2D\u9700\u8981\u4FDD\u5B58\u7684\u6BB5\u843D\u540E\u91CD\u8BD5\u3002");
      }
      parent.appendChild(document2.createTextNode(node.data));
      return;
    }
    if (node.nodeType !== 1) return;
    const tag = node.localName.toLowerCase();
    if (DROP.has(tag) || node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true")
      return;
    if (node.hasAttribute("contenteditable") && node.getAttribute("contenteditable") !== "false")
      return;
    if (!ALLOWED.has(tag)) {
      for (const child of node.childNodes) copy(child, parent, depth + 1);
      return;
    }
    const element = document2.createElement(tag);
    if (tag === "a") {
      const href = safeHttpURL(node.getAttribute("href"), baseURL);
      if (href) {
        element.setAttribute("href", href);
        element.setAttribute("rel", "noopener noreferrer");
      }
    }
    if (tag === "code") {
      const language = (node.getAttribute("class") || "").match(
        /(?:^|\s)language-([a-z0-9_+-]{1,32})(?:\s|$)/i
      );
      if (language) element.setAttribute("class", `language-${language[1]}`);
    }
    if (tag === "ol" && /^\d{1,6}$/.test(node.getAttribute("start") || "")) {
      element.setAttribute("start", node.getAttribute("start"));
    }
    if (tag === "th" || tag === "td") {
      const align = node.getAttribute("align");
      if (["left", "center", "right"].includes(align))
        element.setAttribute("align", align);
      for (const name of ["colspan", "rowspan"]) {
        const value = node.getAttribute(name);
        if (/^[1-9]\d?$/.test(value || "")) element.setAttribute(name, value);
      }
    }
    for (const child of node.childNodes) copy(child, element, depth + 1);
    parent.appendChild(element);
  }
  for (const child of input.content.childNodes) copy(child, output.content, 0);
  const cleaned = output.innerHTML;
  if (cleaned.length > CONTENT_LIMITS.outputHTML) {
    throw new Error("\u6B63\u6587\u8FC7\u957F\uFF0C\u8BF7\u5148\u9009\u4E2D\u9700\u8981\u4FDD\u5B58\u7684\u6BB5\u843D\uFF0C\u518D\u91CD\u65B0\u91C7\u96C6\u3002");
  }
  return cleaned;
}

// src/i18n.js
var SUPPORTED_LANGUAGES = Object.freeze(["en", "zh-CN", "es", "fr", "de", "ja", "ar"]);
var rows = {
  "reader-nav-about": ["About", "\u5173\u4E8E", "Acerca de", "\xC0 propos", "\xDCber Pageleaf", "\u3053\u306E\u30A2\u30D7\u30EA\u306B\u3064\u3044\u3066", "\u062D\u0648\u0644"],
  "helpShortcut": ["Click Pageleaf in the Chrome toolbar, or press Alt/Option + Shift + L (if available).", "\u6253\u5F00\u6587\u7AE0\u540E\uFF0C\u70B9 Chrome \u5DE5\u5177\u680F\u91CC\u7684 Pageleaf\u3002\u4E5F\u53EF\u4EE5\u6309 Alt / Option + Shift + L\u3002", "Pulsa Pageleaf en la barra de Chrome o Alt/Option + May\xFAs + L, si est\xE1 disponible.", "Cliquez sur Pageleaf dans Chrome ou appuyez sur Alt/Option + Maj + L, si disponible.", "Pageleaf in der Chrome-Symbolleiste anklicken oder Alt/Option + Umschalt + L dr\xFCcken, falls verf\xFCgbar.", "\u30C4\u30FC\u30EB\u30D0\u30FC\u306E Pageleaf \u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u304B\u3001\u5229\u7528\u53EF\u80FD\u306A\u3089 Alt/Option + Shift + L \u3092\u62BC\u3057\u307E\u3059\u3002", "\u0627\u0636\u063A\u0637 Pageleaf \u0641\u064A \u0634\u0631\u064A\u0637 Chrome \u0623\u0648 Alt/Option + Shift + L \u0625\u0646 \u0643\u0627\u0646 \u0645\u062A\u0627\u062D\u064B\u0627."],
  "helpUnsupported": ["Pin Pageleaf from Chrome\u2019s extensions menu. PDFs, internal browser pages, extension stores and some app pages cannot be captured.", "\u5148\u5728 Chrome \u6269\u5C55\u83DC\u5355\u91CC\u56FA\u5B9A Pageleaf\u3002PDF\u3001\u6D4F\u89C8\u5668\u8BBE\u7F6E\u9875\u548C\u90E8\u5206\u7F51\u9875\u4E0D\u80FD\u4FDD\u5B58\u3002", "Fija Pageleaf desde el men\xFA de extensiones. No se capturan PDF, p\xE1ginas internas, tiendas de extensiones ni ciertas aplicaciones.", "\xC9pinglez Pageleaf depuis le menu des extensions. Les PDF, pages internes, boutiques d\u2019extensions et certaines applications ne peuvent pas \xEAtre captur\xE9s.", "Pageleaf im Erweiterungsmen\xFC anheften. PDFs, interne Browserseiten, Erweiterungs-Stores und manche Anwendungen lassen sich nicht erfassen.", "Chrome \u306E\u62E1\u5F35\u6A5F\u80FD\u30E1\u30CB\u30E5\u30FC\u304B\u3089 Pageleaf \u3092\u56FA\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002PDF\u3001\u30D6\u30E9\u30A6\u30B6\u30FC\u5185\u90E8\u30DA\u30FC\u30B8\u3001\u62E1\u5F35\u6A5F\u80FD\u30B9\u30C8\u30A2\u3001\u4E00\u90E8\u306E\u30A2\u30D7\u30EA\u306B\u306F\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093\u3002", "\u062B\u0628\u0651\u062A Pageleaf \u0641\u064A \u0627\u0644\u0634\u0631\u064A\u0637 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062A. \u0644\u0627 \u062A\u064F\u0644\u062A\u0642\u0637 \u0645\u0644\u0641\u0627\u062A PDF \u0648\u0635\u0641\u062D\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629 \u0648\u0645\u062A\u0627\u062C\u0631 \u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062A \u0648\u0628\u0639\u0636 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A."],
  "helpStorage": ["Unsaved captures are temporary and disappear when the browser closes. Saved notes stay in this Chrome profile, unencrypted. Images are not loaded and article content is not uploaded.", "\u6CA1\u70B9\u201C\u4FDD\u5B58\u7B14\u8BB0\u201D\u7684\u6587\u7AE0\u53EA\u662F\u4E34\u65F6\u4FDD\u7559\uFF0C\u5173\u95ED\u6D4F\u89C8\u5668\u540E\u4F1A\u6E05\u7A7A\u3002\u4FDD\u5B58\u7684\u7B14\u8BB0\u653E\u5728\u8FD9\u53F0\u7535\u8111\u91CC\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\uFF0C\u4E5F\u6CA1\u6709\u989D\u5916\u52A0\u5BC6\u3002", "Las capturas sin guardar son temporales y desaparecen al cerrar el navegador. Las notas quedan en este perfil de Chrome, sin cifrar. No se cargan im\xE1genes ni se suben art\xEDculos.", "Les captures non enregistr\xE9es disparaissent \xE0 la fermeture du navigateur. Les notes restent dans ce profil Chrome, sans chiffrement. Les images ne sont pas charg\xE9es et les articles ne sont pas envoy\xE9s.", "Ungespeicherte Erfassungen sind tempor\xE4r und verschwinden beim Schlie\xDFen des Browsers. Gespeicherte Notizen bleiben unverschl\xFCsselt in diesem Chrome-Profil. Bilder werden nicht geladen und Artikel nicht hochgeladen.", "\u672A\u4FDD\u5B58\u306E\u8A18\u4E8B\u306F\u4E00\u6642\u30C7\u30FC\u30BF\u3067\u3001\u30D6\u30E9\u30A6\u30B6\u30FC\u3092\u9589\u3058\u308B\u3068\u6D88\u3048\u307E\u3059\u3002\u4FDD\u5B58\u6E08\u307F\u30E1\u30E2\u306F\u3053\u306E Chrome \u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u306B\u6697\u53F7\u5316\u305B\u305A\u4FDD\u5B58\u3057\u307E\u3059\u3002\u753B\u50CF\u306F\u8AAD\u307F\u8FBC\u307E\u305A\u3001\u672C\u6587\u306F\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u307E\u305B\u3093\u3002", "\u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u0624\u0642\u062A\u0629 \u0648\u062A\u062E\u062A\u0641\u064A \u0639\u0646\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0635\u0641\u062D. \u062A\u0628\u0642\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0641\u064A \u0645\u0644\u0641 Chrome \u0647\u0630\u0627 \u062F\u0648\u0646 \u062A\u0634\u0641\u064A\u0631. \u0644\u0627 \u062A\u064F\u062D\u0645\u0651\u0644 \u0627\u0644\u0635\u0648\u0631 \u0648\u0644\u0627 \u064A\u064F\u0631\u0641\u0639 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A."],
  "helpBackup": ["Search covers titles, article text, sources and personal notes. Back up downloads a JSON copy of saved notes. Restore adds new notes and skips duplicates. Keep backup files private.", "\u53EF\u4EE5\u641C\u7D22\u6587\u7AE0\u548C\u81EA\u5DF1\u5199\u7684\u7B14\u8BB0\u3002\u70B9\u201C\u5907\u4EFD\u201D\u4E0B\u8F7D\u6574\u4E2A\u7B14\u8BB0\u5E93\uFF1B\u70B9\u201C\u6062\u590D\u5907\u4EFD\u201D\u5BFC\u5165\u6587\u4EF6\uFF0C\u91CD\u590D\u7684\u7B14\u8BB0\u4F1A\u8DF3\u8FC7\u3002\u5907\u4EFD\u91CC\u6709\u4F60\u7684\u5185\u5BB9\uFF0C\u8BF7\u59A5\u5584\u4FDD\u7BA1\u3002", "La b\xFAsqueda cubre t\xEDtulos, texto, fuentes y notas. La copia descarga un JSON de notas guardadas. Restaurar a\xF1ade notas nuevas y omite duplicadas. Protege tus copias.", "La recherche couvre titres, texte, sources et notes. La sauvegarde t\xE9l\xE9charge les notes en JSON. La restauration ajoute les nouvelles notes et ignore les doublons. Prot\xE9gez vos sauvegardes.", "Die Suche umfasst Titel, Artikel, Quellen und Notizen. Sichern l\xE4dt gespeicherte Notizen als JSON herunter. Wiederherstellen erg\xE4nzt neue Notizen und \xFCberspringt Duplikate. Sicherungen vertraulich aufbewahren.", "\u691C\u7D22\u306F\u30BF\u30A4\u30C8\u30EB\u3001\u672C\u6587\u3001\u51FA\u5178\u3001\u30E1\u30E2\u304C\u5BFE\u8C61\u3067\u3059\u3002\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3067\u4FDD\u5B58\u6E08\u307F\u30E1\u30E2\u3092 JSON \u306B\u66F8\u304D\u51FA\u3057\u307E\u3059\u3002\u5FA9\u5143\u3067\u306F\u91CD\u8907\u3092\u30B9\u30AD\u30C3\u30D7\u3057\u3066\u65B0\u898F\u30E1\u30E2\u3092\u8FFD\u52A0\u3057\u307E\u3059\u3002\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u306F\u5927\u5207\u306B\u4FDD\u7BA1\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u064A\u0634\u0645\u0644 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646 \u0648\u0627\u0644\u0646\u0635\u0648\u0635 \u0648\u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A. \u064A\u0646\u0632\u0651\u0644 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A \u0645\u0644\u0641 JSON \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629. \u062A\u0636\u064A\u0641 \u0627\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u062C\u062F\u064A\u062F \u0648\u062A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0645\u0643\u0631\u0631. \u0627\u062D\u062A\u0641\u0638 \u0628\u0627\u0644\u0646\u0633\u062E \u0641\u064A \u0645\u0643\u0627\u0646 \u062E\u0627\u0635."],
  "helpPrint": ["Saved notes remember your reading position. Print / PDF opens the browser print dialog, where you can save a PDF. Unsaved personal notes are included.", "\u4FDD\u5B58\u6587\u7AE0\u540E\uFF0C\u4E0B\u6B21\u6253\u5F00\u4F1A\u56DE\u5230\u4E0A\u6B21\u8BFB\u5230\u7684\u4F4D\u7F6E\u3002\u70B9\u201C\u6253\u5370 / PDF\u201D\uFF0C\u53EF\u4EE5\u6253\u5370\u6216\u53E6\u5B58\u4E3A PDF\uFF0C\u4E5F\u4F1A\u5E26\u4E0A\u4F60\u521A\u5199\u7684\u7B14\u8BB0\u3002", "Las notas guardadas recuerdan la posici\xF3n. Imprimir / PDF abre el di\xE1logo para guardar un PDF. Se incluyen las notas personales sin guardar.", "Les notes enregistr\xE9es m\xE9morisent votre position. Imprimer / PDF ouvre le dialogue d\u2019impression pour enregistrer un PDF. Les notes personnelles non enregistr\xE9es sont incluses.", "Gespeicherte Notizen merken sich die Leseposition. Drucken / PDF \xF6ffnet den Druckdialog zum Speichern als PDF, einschlie\xDFlich ungespeicherter Notizen.", "\u4FDD\u5B58\u6E08\u307F\u30E1\u30E2\u3067\u306F\u8AAD\u66F8\u4F4D\u7F6E\u3092\u8A18\u61B6\u3057\u307E\u3059\u3002\u300C\u5370\u5237 / PDF\u300D\u3067\u30D6\u30E9\u30A6\u30B6\u30FC\u306E\u5370\u5237\u753B\u9762\u3092\u958B\u304D\u3001PDF \u3068\u3057\u3066\u4FDD\u5B58\u3067\u304D\u307E\u3059\u3002\u672A\u4FDD\u5B58\u306E\u30E1\u30E2\u3082\u542B\u307E\u308C\u307E\u3059\u3002", "\u062A\u062A\u0630\u0643\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u0648\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629. \u062A\u0641\u062A\u062D \u0637\u0628\u0627\u0639\u0629 / PDF \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0644\u062D\u0641\u0638 PDF. \u062A\u064F\u0636\u0645\u0651\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u063A\u064A\u0631 \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0623\u064A\u0636\u064B\u0627."],
  "helpUninstall": ["Uninstalling the extension deletes its local notes. Back up regularly.", "\u5378\u8F7D\u6269\u5C55\u4F1A\u5220\u9664\u91CC\u9762\u7684\u7B14\u8BB0\uFF0C\u8BF7\u5148\u5907\u4EFD\u3002", "Desinstalar la extensi\xF3n elimina sus notas locales. Haz copias con frecuencia.", "D\xE9sinstaller l\u2019extension supprime ses notes locales. Sauvegardez r\xE9guli\xE8rement.", "Deinstallieren l\xF6scht die lokalen Notizen. Regelm\xE4\xDFig sichern.", "\u62E1\u5F35\u6A5F\u80FD\u3092\u524A\u9664\u3059\u308B\u3068\u7AEF\u672B\u306E\u30E1\u30E2\u3082\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u5B9A\u671F\u7684\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u064A\u0624\u062F\u064A \u0625\u0644\u063A\u0627\u0621 \u062A\u062B\u0628\u064A\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u062D\u0630\u0641 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0647\u0627 \u0627\u0644\u0645\u062D\u0644\u064A\u0629. \u0623\u0646\u0634\u0626 \u0646\u0633\u062E\u064B\u0627 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0645."],
  "reader-nav-home": ["Home", "\u4E3B\u9875", "Inicio", "Accueil", "Startseite", "\u30DB\u30FC\u30E0", "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629"],
  "reader-nav-help": ["Help", "\u5E2E\u52A9\u4E2D\u5FC3", "Ayuda", "Aide", "Hilfe", "\u30D8\u30EB\u30D7", "\u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629"],
  "reader-nav-privacy": ["Privacy", "\u9690\u79C1\u653F\u7B56", "Privacidad", "Confidentialit\xE9", "Datenschutz", "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC", "\u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629"],
  "navigation": ["Main navigation", "\u7F51\u7AD9\u5BFC\u822A", "Navegaci\xF3n principal", "Navigation principale", "Hauptnavigation", "\u30E1\u30A4\u30F3\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3", "\u0627\u0644\u062A\u0646\u0642\u0644 \u0627\u0644\u0631\u0626\u064A\u0633\u064A"],
  "language": ["Language", "\u8BED\u8A00", "Idioma", "Langue", "Sprache", "\u8A00\u8A9E", "\u0627\u0644\u0644\u063A\u0629"],
  "skip": ["Skip to content", "\u8DF3\u81F3\u6B63\u6587", "Ir al contenido", "Aller au contenu", "Zum Inhalt springen", "\u672C\u6587\u3078\u79FB\u52D5", "\u062A\u062E\u0637\u0651\u064E \u0625\u0644\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649"],
  "homeLabel": ["Pageleaf home", "Pageleaf \u4E3B\u9875", "Inicio de Pageleaf", "Accueil Pageleaf", "Pageleaf-Startseite", "Pageleaf \u30DB\u30FC\u30E0", "\u0635\u0641\u062D\u0629 Pageleaf \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629"],
  "local": ["On this device", "\u4FDD\u5B58\u5728\u8FD9\u53F0\u7535\u8111", "En este dispositivo", "Sur cet appareil", "Auf diesem Ger\xE4t", "\u3053\u306E\u7AEF\u672B\u306E\u307F", "\u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632"],
  "preview": ["Browser preview", "\u5728\u7EBF\u8BD5\u7528", "Vista previa", "Aper\xE7u web", "Webvorschau", "\u30D6\u30E9\u30A6\u30B6\u30FC\u3067\u306E\u30D7\u30EC\u30D3\u30E5\u30FC", "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0645\u062A\u0635\u0641\u062D"],
  "previewNotice": ["This is a web demo. Refreshing clears your notes. Export them first, or install the extension to keep them.", "\u8FD9\u662F\u5728\u7EBF\u8BD5\u7528\uFF0C\u5237\u65B0\u540E\u7B14\u8BB0\u4F1A\u6E05\u7A7A\u3002\u60F3\u4FDD\u7559\u5185\u5BB9\uFF0C\u8BF7\u5148\u5BFC\u51FA\uFF0C\u6216\u5B89\u88C5\u6269\u5C55\u540E\u4FDD\u5B58\u3002", "Esta es una prueba web. Al actualizar se borran las notas. Exp\xF3rtalas antes o instala la extensi\xF3n para guardarlas.", "Ceci est une d\xE9mo web. Actualiser efface les notes. Exportez-les d\u2019abord ou installez l\u2019extension pour les conserver.", "Dies ist eine Web-Demo. Beim Neuladen werden Notizen gel\xF6scht. Vorher exportieren oder die Erweiterung installieren.", "\u3053\u308C\u306F\u30A6\u30A7\u30D6\u7248\u306E\u4F53\u9A13\u30DA\u30FC\u30B8\u3067\u3059\u3002\u518D\u8AAD\u307F\u8FBC\u307F\u3059\u308B\u3068\u30E1\u30E2\u306F\u6D88\u3048\u307E\u3059\u3002\u5148\u306B\u66F8\u304D\u51FA\u3059\u304B\u3001\u62E1\u5F35\u6A5F\u80FD\u3092\u5165\u308C\u3066\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0647\u0630\u0647 \u0646\u0633\u062E\u0629 \u0644\u0644\u062A\u062C\u0631\u0628\u0629. \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u064A\u0645\u062D\u0648 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A. \u0635\u062F\u0651\u0631\u0647\u0627 \u0623\u0648\u0644\u064B\u0627 \u0623\u0648 \u062B\u0628\u0651\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u062D\u0641\u0638\u0647\u0627."],
  "light": ["Switch to light mode", "\u4F7F\u7528\u767D\u8272\u80CC\u666F", "Cambiar a modo claro", "Passer au mode clair", "Zum hellen Modus wechseln", "\u30E9\u30A4\u30C8\u30E2\u30FC\u30C9\u306B\u5207\u308A\u66FF\u3048", "\u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0638\u0647\u0631 \u0627\u0644\u0641\u0627\u062A\u062D"],
  "dark": ["Switch to dark mode", "\u4F7F\u7528\u9ED1\u8272\u80CC\u666F", "Cambiar a modo oscuro", "Passer au mode sombre", "Zum dunklen Modus wechseln", "\u30C0\u30FC\u30AF\u30E2\u30FC\u30C9\u306B\u5207\u308A\u66FF\u3048", "\u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0638\u0647\u0631 \u0627\u0644\u062F\u0627\u0643\u0646"],
  "help": ["Quick help", "\u4F7F\u7528\u5E2E\u52A9", "Ayuda r\xE1pida", "Aide rapide", "Kurzhilfe", "\u4F7F\u3044\u65B9", "\u0645\u0633\u0627\u0639\u062F\u0629 \u0633\u0631\u064A\u0639\u0629"],
  "library": ["Local library", "\u5DF2\u4FDD\u5B58\u7684\u7B14\u8BB0", "Biblioteca local", "Biblioth\xE8que locale", "Lokale Bibliothek", "\u30ED\u30FC\u30AB\u30EB\u30E9\u30A4\u30D6\u30E9\u30EA", "\u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629"],
  "myNotes": ["My notes", "\u6211\u7684\u7B14\u8BB0", "Mis notas", "Mes notes", "Meine Notizen", "\u81EA\u5206\u306E\u30E1\u30E2", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u064A"],
  "searchPlaceholder": ["Search all note content", "\u641C\u7D22\u6587\u7AE0\u548C\u7B14\u8BB0", "Buscar en todas las notas", "Rechercher dans les notes", "Alle Notizen durchsuchen", "\u30E1\u30E2\u306E\u5168\u6587\u3092\u691C\u7D22", "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],
  "searchLabel": ["Search notes", "\u641C\u7D22\u7B14\u8BB0", "Buscar notas", "Rechercher des notes", "Notizen suchen", "\u30E1\u30E2\u3092\u691C\u7D22", "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],
  "backup": ["Back up", "\u5907\u4EFD", "Crear copia", "Sauvegarder", "Sichern", "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7", "\u0646\u0633\u062E \u0627\u062D\u062A\u064A\u0627\u0637\u064A"],
  "restore": ["Restore backup", "\u6062\u590D\u5907\u4EFD", "Restaurar copia", "Restaurer", "Sicherung laden", "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u5FA9\u5143", "\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0646\u0633\u062E\u0629"],
  "noMatches": ["No matching notes. Try another search.", "\u6CA1\u627E\u5230\uFF0C\u6362\u4E2A\u8BCD\u8BD5\u8BD5\u3002", "No hay notas coincidentes. Prueba otra b\xFAsqueda.", "Aucune note trouv\xE9e. Essayez une autre recherche.", "Keine passenden Notizen. Andere Suche versuchen.", "\u4E00\u81F4\u3059\u308B\u30E1\u30E2\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u5225\u306E\u8A00\u8449\u3067\u691C\u7D22\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629. \u062C\u0631\u0651\u0628 \u0628\u062D\u062B\u064B\u0627 \u0622\u062E\u0631."],
  "emptyLibrary": ["Saved articles appear here. Open an article, click Pageleaf in the toolbar, then click Save note.", "\u8FD8\u6CA1\u6709\u4FDD\u5B58\u7684\u7B14\u8BB0\u3002\u6253\u5F00\u6587\u7AE0\uFF0C\u70B9\u5DE5\u5177\u680F\u91CC\u7684 Pageleaf\uFF0C\u518D\u70B9\u201C\u4FDD\u5B58\u7B14\u8BB0\u201D\u3002", "Aqu\xED aparecer\xE1n tus art\xEDculos. Abre uno, pulsa Pageleaf en la barra y luego Guardar nota.", "Vos articles appara\xEEtront ici. Ouvrez un article, cliquez sur Pageleaf, puis sur Enregistrer la note.", "Hier erscheinen gespeicherte Artikel. Artikel \xF6ffnen, Pageleaf in der Symbolleiste anklicken und dann Notiz speichern w\xE4hlen.", "\u8A18\u4E8B\u3092\u958B\u304D\u3001\u30C4\u30FC\u30EB\u30D0\u30FC\u306E Pageleaf \u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304B\u3089\u300C\u30E1\u30E2\u3092\u4FDD\u5B58\u300D\u3092\u62BC\u3059\u3068\u3001\u3053\u3053\u306B\u8868\u793A\u3055\u308C\u307E\u3059\u3002", "\u062A\u0638\u0647\u0631 \u0645\u0642\u0627\u0644\u0627\u062A\u0643 \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0647\u0646\u0627. \u0627\u0641\u062A\u062D \u0645\u0642\u0627\u0644\u064B\u0627 \u0648\u0627\u0636\u063A\u0637 Pageleaf \u0641\u064A \u0627\u0644\u0634\u0631\u064A\u0637\u060C \u062B\u0645 \u0627\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629."],
  "openNote": ["Open note: {title}", "\u6253\u5F00\u7B14\u8BB0\uFF1A{title}", "Abrir nota: {title}", "Ouvrir la note : {title}", "Notiz \xF6ffnen: {title}", "\u30E1\u30E2\u3092\u958B\u304F\uFF1A{title}", "\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: {title}"],
  "deleteNote": ["Delete note: {title}", "\u5220\u9664\u7B14\u8BB0\uFF1A{title}", "Eliminar nota: {title}", "Supprimer la note : {title}", "Notiz l\xF6schen: {title}", "\u30E1\u30E2\u3092\u524A\u9664\uFF1A{title}", "\u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: {title}"],
  "welcomeTitle": ["Save a page. Mark what matters.", "\u4FDD\u5B58\u7F51\u9875\uFF0C\u5212\u91CD\u70B9\uFF0C\u5199\u7B14\u8BB0\u3002", "Guarda una p\xE1gina. Marca lo importante.", "Gardez une page. Soulignez l\u2019essentiel.", "Seite speichern. Wichtiges markieren.", "\u8A18\u4E8B\u3092\u4FDD\u5B58\u3057\u3066\u3001\u5927\u4E8B\u306A\u3068\u3053\u308D\u306B\u5370\u3092\u3002", "\u0627\u062D\u0641\u0638 \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u062F\u0651\u062F \u0645\u0627 \u064A\u0647\u0645\u0643."],
  "welcomeCopy": ["Save an article, mark useful passages and add a note. Export it whenever you need it.", "\u628A\u6587\u7AE0\u4FDD\u5B58\u4E0B\u6765\uFF0C\u5212\u51FA\u8981\u70B9\uFF0C\u518D\u5199\u51E0\u53E5\u81EA\u5DF1\u7684\u60F3\u6CD5\u3002\u9700\u8981\u65F6\u53EF\u4EE5\u5BFC\u51FA\uFF0C\u6362\u4E2A\u5DE5\u5177\u4E5F\u80FD\u7EE7\u7EED\u7528\u3002", "Guarda el art\xEDculo, marca los pasajes \xFAtiles y a\xF1ade una nota. Puedes exportarlo cuando quieras.", "Enregistrez un article, marquez les passages utiles et ajoutez vos notes. Exportez le tout quand vous voulez.", "Artikel speichern, wichtige Stellen markieren und eigene Notizen erg\xE4nzen. Bei Bedarf alles exportieren.", "\u8A18\u4E8B\u306E\u5927\u4E8B\u306A\u90E8\u5206\u306B\u5370\u3092\u4ED8\u3051\u3066\u3001\u81EA\u5206\u306E\u30E1\u30E2\u3092\u6B8B\u305B\u307E\u3059\u3002\u5FC5\u8981\u306A\u3068\u304D\u306B\u66F8\u304D\u51FA\u305B\u307E\u3059\u3002", "\u0627\u062D\u0641\u0638 \u0627\u0644\u0645\u0642\u0627\u0644 \u0648\u062D\u062F\u0651\u062F \u0627\u0644\u0641\u0642\u0631\u0627\u062A \u0627\u0644\u0645\u0641\u064A\u062F\u0629 \u0648\u0623\u0636\u0641 \u0645\u0644\u0627\u062D\u0638\u062A\u0643. \u064A\u0645\u0643\u0646\u0643 \u062A\u0635\u062F\u064A\u0631\u0647 \u0645\u062A\u0649 \u0627\u062D\u062A\u062C\u062A."],
  "demo": ["Open sample", "\u8BD5\u8BD5\u793A\u4F8B", "Abrir ejemplo", "Ouvrir un exemple", "Beispiel \xF6ffnen", "\u30B5\u30F3\u30D7\u30EB\u3092\u958B\u304F", "\u0641\u062A\u062D \u0645\u062B\u0627\u0644"],
  "getStarted": ["Get started", "\u600E\u4E48\u7528", "Primeros pasos", "Premiers pas", "Erste Schritte", "\u306F\u3058\u3081\u306B", "\u0627\u0644\u0628\u062F\u0621"],
  "step1": ["Open a web article, or select the text you want to keep.", "\u6253\u5F00\u4E00\u7BC7\u6587\u7AE0\uFF0C\u4E5F\u53EF\u4EE5\u5148\u9009\u4E2D\u60F3\u4FDD\u5B58\u7684\u51E0\u6BB5\u8BDD\u3002", "Abre un art\xEDculo web o selecciona el texto que quieras guardar.", "Ouvrez un article ou s\xE9lectionnez le texte \xE0 conserver.", "Einen Webartikel \xF6ffnen oder gew\xFCnschten Text ausw\xE4hlen.", "\u30A6\u30A7\u30D6\u8A18\u4E8B\u3092\u958B\u304F\u304B\u3001\u4FDD\u5B58\u3057\u305F\u3044\u6587\u7AE0\u3092\u9078\u629E\u3057\u307E\u3059\u3002", "\u0627\u0641\u062A\u062D \u0645\u0642\u0627\u0644\u064B\u0627 \u0639\u0644\u0649 \u0627\u0644\u0648\u064A\u0628 \u0623\u0648 \u062D\u062F\u0651\u062F \u0627\u0644\u0646\u0635 \u0627\u0644\u0630\u064A \u062A\u0631\u064A\u062F \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0647."],
  "step2": ["Click the Pageleaf icon in the Chrome toolbar.", "\u70B9 Chrome \u5DE5\u5177\u680F\u91CC\u7684 Pageleaf\u3002", "Pulsa el icono de Pageleaf en la barra de Chrome.", "Cliquez sur l\u2019ic\xF4ne Pageleaf dans la barre de Chrome.", "Auf das Pageleaf-Symbol in der Chrome-Symbolleiste klicken.", "Chrome \u30C4\u30FC\u30EB\u30D0\u30FC\u306E Pageleaf \u30A2\u30A4\u30B3\u30F3\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3059\u3002", "\u0627\u0636\u063A\u0637 \u0623\u064A\u0642\u0648\u0646\u0629 Pageleaf \u0641\u064A \u0634\u0631\u064A\u0637 \u0623\u062F\u0648\u0627\u062A Chrome."],
  "step3": ["Add a note, save locally, or export a file.", "\u5212\u91CD\u70B9\u3001\u5199\u7B14\u8BB0\uFF0C\u518D\u70B9\u4FDD\u5B58\u6216\u5BFC\u51FA\u3002", "A\xF1ade una nota, guarda en el dispositivo o exporta un archivo.", "Ajoutez une note, enregistrez localement ou exportez un fichier.", "Notiz hinzuf\xFCgen, lokal speichern oder Datei exportieren.", "\u30E1\u30E2\u3092\u8FFD\u52A0\u3057\u3001\u7AEF\u672B\u306B\u4FDD\u5B58\u3059\u308B\u304B\u30D5\u30A1\u30A4\u30EB\u306B\u66F8\u304D\u51FA\u3057\u307E\u3059\u3002", "\u0623\u0636\u0641 \u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0627\u062D\u0641\u0638\u0647\u0627 \u0645\u062D\u0644\u064A\u064B\u0627 \u0623\u0648 \u0635\u062F\u0651\u0631 \u0645\u0644\u0641\u064B\u0627."],
  "errorTitle": ["This page could not be read", "\u8FD9\u9875\u6CA1\u80FD\u6253\u5F00", "No se pudo leer esta p\xE1gina", "Cette page n\u2019a pas pu \xEAtre lue", "Diese Seite konnte nicht gelesen werden", "\u3053\u306E\u30DA\u30FC\u30B8\u3092\u8AAD\u307F\u53D6\u308C\u307E\u305B\u3093\u3067\u3057\u305F", "\u062A\u0639\u0630\u0651\u0631\u062A \u0642\u0631\u0627\u0621\u0629 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629"],
  "errorHint": ["Try selecting a few paragraphs, then click Pageleaf in the toolbar again.", "\u8BD5\u7740\u9009\u4E2D\u8981\u4FDD\u5B58\u7684\u51E0\u6BB5\u8BDD\uFF0C\u518D\u70B9\u4E00\u6B21\u5DE5\u5177\u680F\u91CC\u7684 Pageleaf\u3002", "Prueba a seleccionar unos p\xE1rrafos y vuelve a pulsar Pageleaf.", "S\xE9lectionnez quelques paragraphes, puis cliquez \xE0 nouveau sur Pageleaf.", "Einige Abs\xE4tze ausw\xE4hlen und Pageleaf erneut anklicken.", "\u5FC5\u8981\u306A\u6BB5\u843D\u3092\u9078\u629E\u3057\u3066\u3001\u30C4\u30FC\u30EB\u30D0\u30FC\u306E Pageleaf \u3092\u3082\u3046\u4E00\u5EA6\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062F \u0628\u0639\u0636 \u0627\u0644\u0641\u0642\u0631\u0627\u062A \u062B\u0645 \u0627\u0636\u063A\u0637 Pageleaf \u0645\u062C\u062F\u062F\u064B\u0627."],
  "unsavedChanges": ["Unsaved changes", "\u8FD8\u6CA1\u4FDD\u5B58\u4FEE\u6539", "Cambios sin guardar", "Modifications non enregistr\xE9es", "Ungespeicherte \xC4nderungen", "\u672A\u4FDD\u5B58\u306E\u5909\u66F4", "\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629"],
  "savedPreview": ["Saved in this preview only", "\u5DF2\u6682\u5B58\uFF0C\u5237\u65B0\u540E\u4F1A\u6E05\u7A7A", "Guardado solo en esta vista previa", "Enregistr\xE9 dans cet aper\xE7u uniquement", "Nur in dieser Vorschau gespeichert", "\u3053\u306E\u30D7\u30EC\u30D3\u30E5\u30FC\u306E\u307F\u4FDD\u5B58\u6E08\u307F", "\u0645\u062D\u0641\u0648\u0638 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0641\u0642\u0637"],
  "savedLocal": ["Saved on this device", "\u5DF2\u4FDD\u5B58\u5728\u8FD9\u53F0\u7535\u8111", "Guardado en este dispositivo", "Enregistr\xE9 sur cet appareil", "Auf diesem Ger\xE4t gespeichert", "\u3053\u306E\u7AEF\u672B\u306B\u4FDD\u5B58\u6E08\u307F", "\u0645\u062D\u0641\u0648\u0638 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632"],
  "notSaved": ["Not saved", "\u8FD8\u6CA1\u4FDD\u5B58", "Sin guardar", "Non enregistr\xE9", "Nicht gespeichert", "\u672A\u4FDD\u5B58", "\u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638"],
  "saveChanges": ["Save changes", "\u4FDD\u5B58\u4FEE\u6539", "Guardar cambios", "Enregistrer", "\xC4nderungen speichern", "\u5909\u66F4\u3092\u4FDD\u5B58", "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A"],
  "saveNote": ["Save note", "\u4FDD\u5B58\u7B14\u8BB0", "Guardar nota", "Enregistrer la note", "Notiz speichern", "\u30E1\u30E2\u3092\u4FDD\u5B58", "\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"],
  "progressHint": ["Saved notes remember your reading position", "\u4FDD\u5B58\u540E\uFF0C\u4E0B\u6B21\u53EF\u4EE5\u63A5\u7740\u8BFB", "Las notas guardadas recuerdan d\xF3nde estabas leyendo", "Les notes enregistr\xE9es m\xE9morisent votre position", "Gespeicherte Notizen merken sich die Leseposition", "\u4FDD\u5B58\u6E08\u307F\u30E1\u30E2\u3067\u306F\u8AAD\u3093\u3067\u3044\u305F\u4F4D\u7F6E\u3092\u8A18\u61B6\u3057\u307E\u3059", "\u062A\u062A\u0630\u0643\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u0648\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629"],
  "progress": ["Reading progress", "\u9605\u8BFB\u8FDB\u5EA6", "Progreso de lectura", "Progression de lecture", "Lesefortschritt", "\u8AAD\u66F8\u306E\u9032\u6357", "\u062A\u0642\u062F\u0651\u0645 \u0627\u0644\u0642\u0631\u0627\u0621\u0629"],
  "fontDown": ["Decrease article font size", "\u5B57\u5C0F\u4E00\u70B9", "Reducir tama\xF1o del texto", "R\xE9duire le texte", "Text verkleinern", "\u672C\u6587\u306E\u6587\u5B57\u3092\u5C0F\u3055\u304F", "\u062A\u0635\u063A\u064A\u0631 \u062E\u0637 \u0627\u0644\u0645\u0642\u0627\u0644"],
  "fontUp": ["Increase article font size", "\u5B57\u5927\u4E00\u70B9", "Aumentar tama\xF1o del texto", "Agrandir le texte", "Text vergr\xF6\xDFern", "\u672C\u6587\u306E\u6587\u5B57\u3092\u5927\u304D\u304F", "\u062A\u0643\u0628\u064A\u0631 \u062E\u0637 \u0627\u0644\u0645\u0642\u0627\u0644"],
  "copy": ["Copy Markdown", "\u590D\u5236 Markdown", "Copiar Markdown", "Copier le Markdown", "Markdown kopieren", "Markdown \u3092\u30B3\u30D4\u30FC", "\u0646\u0633\u062E Markdown"],
  "export": ["Export .md", "\u5BFC\u51FA .md", "Exportar .md", "Exporter .md", ".md exportieren", ".md \u306B\u66F8\u304D\u51FA\u3057", "\u062A\u0635\u062F\u064A\u0631 \u200E.md"],
  "print": ["Print / PDF", "\u6253\u5370 / PDF", "Imprimir / PDF", "Imprimer / PDF", "Drucken / PDF", "\u5370\u5237 / PDF", "\u0637\u0628\u0627\u0639\u0629 / PDF"],
  "source": ["View original \u2197", "\u67E5\u770B\u539F\u6587 \u2197", "Ver original \u2197", "Voir l\u2019original \u2197", "Original anzeigen \u2197", "\u539F\u6587\u3092\u898B\u308B \u2197", "\u0639\u0631\u0636 \u0627\u0644\u0623\u0635\u0644 \u2197"],
  "notePlaceholder": ["Write a thought, a question, or something to do next.", "\u5199\u4E0B\u4F60\u7684\u60F3\u6CD5\uFF0C\u6216\u8005\u63A5\u4E0B\u6765\u8981\u505A\u7684\u4E8B\u3002", "Escribe una idea, una pregunta o algo que quieras hacer.", "Notez une id\xE9e, une question ou quelque chose \xE0 faire.", "Einen Gedanken, eine Frage oder einen n\xE4chsten Schritt notieren.", "\u6C17\u3065\u3044\u305F\u3053\u3068\u3084\u7591\u554F\u3001\u6B21\u306B\u3084\u308B\u3053\u3068\u3092\u66F8\u304D\u307E\u3057\u3087\u3046\u3002", "\u0627\u0643\u062A\u0628 \u0641\u0643\u0631\u0629 \u0623\u0648 \u0633\u0624\u0627\u0644\u064B\u0627 \u0623\u0648 \u0634\u064A\u0626\u064B\u0627 \u062A\u0631\u064A\u062F \u0641\u0639\u0644\u0647."],
  "noteTip": ["Saved and exported with the article", "\u4FDD\u5B58\u548C\u5BFC\u51FA\u65F6\u4F1A\u5E26\u4E0A\u8FD9\u4E9B\u7B14\u8BB0", "Se guarda y exporta con el art\xEDculo", "Enregistr\xE9 et export\xE9 avec l\u2019article", "Wird mit dem Artikel gespeichert und exportiert", "\u8A18\u4E8B\u3068\u4E00\u7DD2\u306B\u4FDD\u5B58\u30FB\u66F8\u304D\u51FA\u3057", "\u062A\u064F\u062D\u0641\u0638 \u0648\u062A\u064F\u0635\u062F\u0651\u0631 \u0645\u0639 \u0627\u0644\u0645\u0642\u0627\u0644"],
  "footer": ["Processed on this device \xB7 Keep the original credit and source", "\u5185\u5BB9\u4FDD\u5B58\u5728\u8FD9\u53F0\u7535\u8111 \xB7 \u8F6C\u8F7D\u65F6\u8BF7\u6CE8\u660E\u4F5C\u8005\u548C\u6765\u6E90", "Procesado en este dispositivo \xB7 Conserva autor\xEDa y fuente", "Trait\xE9 sur cet appareil \xB7 Conservez les cr\xE9dits et la source", "Auf diesem Ger\xE4t verarbeitet \xB7 Urheber und Quelle beibehalten", "\u3053\u306E\u7AEF\u672B\u3067\u51E6\u7406 \xB7 \u539F\u6587\u306E\u8457\u8005\u3068\u51FA\u5178\u3092\u6B8B\u3057\u3066\u304F\u3060\u3055\u3044", "\u062A\u064F\u0639\u0627\u0644\u062C \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \xB7 \u0627\u062D\u062A\u0641\u0638 \u0628\u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0644\u0641 \u0648\u0627\u0644\u0645\u0635\u062F\u0631"],
  "contents": ["On this page", "\u6587\u7AE0\u76EE\u5F55", "En esta p\xE1gina", "Sur cette page", "Auf dieser Seite", "\u3053\u306E\u30DA\u30FC\u30B8\u306E\u76EE\u6B21", "\u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629"],
  "noHeadings": ["This article has no section headings.", "\u8FD9\u7BC7\u6587\u7AE0\u6CA1\u6709\u5C0F\u6807\u9898", "Este art\xEDculo no tiene subt\xEDtulos.", "Cet article n\u2019a pas de sous-titres.", "Dieser Artikel hat keine Zwischen\xFCberschriften.", "\u3053\u306E\u8A18\u4E8B\u306B\u306F\u898B\u51FA\u3057\u304C\u3042\u308A\u307E\u305B\u3093\u3002", "\u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0644 \u0639\u0644\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0641\u0631\u0639\u064A\u0629."],
  "closeHelp": ["Close help", "\u5173\u95ED\u5E2E\u52A9", "Cerrar ayuda", "Fermer l\u2019aide", "Hilfe schlie\xDFen", "\u30D8\u30EB\u30D7\u3092\u9589\u3058\u308B", "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629"],
  "restoreTitle": ["Restore note backup", "\u6062\u590D\u5907\u4EFD", "Restaurar copia de notas", "Restaurer les notes", "Notizen wiederherstellen", "\u30E1\u30E2\u306E\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u5FA9\u5143", "\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0646\u0633\u062E\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],
  "restoreHint": ["Only new notes are added. Existing notes are never overwritten.", "\u53EA\u6DFB\u52A0\u65B0\u7B14\u8BB0\uFF0C\u4E0D\u8986\u76D6\u5DF2\u6709\u5185\u5BB9\u3002", "Solo se a\xF1aden notas nuevas. Las existentes nunca se sobrescriben.", "Seules les nouvelles notes sont ajout\xE9es. Les notes existantes ne sont jamais \xE9cras\xE9es.", "Nur neue Notizen werden hinzugef\xFCgt. Bestehende bleiben unver\xE4ndert.", "\u91CD\u8907\u3057\u306A\u3044\u30E1\u30E2\u3060\u3051\u3092\u8FFD\u52A0\u3057\u307E\u3059\u3002\u65E2\u5B58\u306E\u30E1\u30E2\u306F\u4E0A\u66F8\u304D\u3057\u307E\u305B\u3093\u3002", "\u062A\u064F\u0636\u0627\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0641\u0642\u0637. \u0644\u0627 \u062A\u064F\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629."],
  "cancel": ["Cancel", "\u53D6\u6D88", "Cancelar", "Annuler", "Abbrechen", "\u30AD\u30E3\u30F3\u30BB\u30EB", "\u0625\u0644\u063A\u0627\u0621"],
  "confirmRestore": ["Restore notes", "\u786E\u8BA4\u6062\u590D", "Restaurar notas", "Restaurer les notes", "Notizen wiederherstellen", "\u30E1\u30E2\u3092\u5FA9\u5143", "\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],
  "deleteTitle": ["Delete this note?", "\u5220\u9664\u8FD9\u7BC7\u7B14\u8BB0\uFF1F", "\xBFEliminar esta nota?", "Supprimer cette note ?", "Diese Notiz l\xF6schen?", "\u3053\u306E\u30E1\u30E2\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F", "\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u061F"],
  "deleteHint": ["Deletion cannot be undone. Export a Markdown copy first if you need it.", "\u5220\u9664\u540E\u627E\u4E0D\u56DE\u6765\u3002\u9700\u8981\u7684\u8BDD\uFF0C\u5148\u5BFC\u51FA\u4E00\u4EFD\u3002", "No se puede deshacer. Exporta una copia Markdown si la necesitas.", "Cette suppression est d\xE9finitive. Exportez d\u2019abord une copie Markdown si n\xE9cessaire.", "L\xF6schen l\xE4sst sich nicht r\xFCckg\xE4ngig machen. Bei Bedarf zuerst eine Markdown-Kopie exportieren.", "\u524A\u9664\u306F\u53D6\u308A\u6D88\u305B\u307E\u305B\u3093\u3002\u5FC5\u8981\u3067\u3042\u308C\u3070\u5148\u306B Markdown \u3092\u66F8\u304D\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0627\u0644\u062D\u0630\u0641. \u0635\u062F\u0651\u0631 \u0646\u0633\u062E\u0629 Markdown \u0623\u0648\u0644\u064B\u0627 \u0625\u0630\u0627 \u0627\u062D\u062A\u062C\u062A \u0625\u0644\u064A\u0647\u0627."],
  "keepNote": ["Keep note", "\u4FDD\u7559\u7B14\u8BB0", "Conservar nota", "Conserver la note", "Notiz behalten", "\u30E1\u30E2\u3092\u6B8B\u3059", "\u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"],
  "confirmDelete": ["Delete note", "\u786E\u8BA4\u5220\u9664", "Eliminar nota", "Supprimer", "Notiz l\xF6schen", "\u30E1\u30E2\u3092\u524A\u9664", "\u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"],
  "cancelDelete": ["Cancel deletion", "\u53D6\u6D88\u5220\u9664", "Cancelar eliminaci\xF3n", "Annuler la suppression", "L\xF6schen abbrechen", "\u524A\u9664\u3092\u30AD\u30E3\u30F3\u30BB\u30EB", "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062D\u0630\u0641"],
  "title": ["Pageleaf \u2014 Read, note, keep", "Pageleaf \u2014 \u4FDD\u5B58\u7F51\u9875\uFF0C\u5212\u91CD\u70B9\uFF0C\u5199\u7B14\u8BB0", "Pageleaf \u2014 Lee, anota, conserva", "Pageleaf \u2014 Lire, noter, conserver", "Pageleaf \u2014 Lesen, notieren, behalten", "Pageleaf \u2014 \u8AAD\u3093\u3067\u3001\u66F8\u3044\u3066\u3001\u6B8B\u3059", "Pageleaf \u2014 \u0627\u0642\u0631\u0623 \u0648\u062F\u0648\u0651\u0646 \u0648\u0627\u062D\u062A\u0641\u0638"],
  "web": ["FROM THE WEB", "\u6765\u81EA\u7F51\u9875", "DE LA WEB", "DU WEB", "AUS DEM WEB", "\u30A6\u30A7\u30D6\u304B\u3089", "\u0645\u0646 \u0627\u0644\u0648\u064A\u0628"],
  "words": ["{count} words / characters", "{count} \u5B57 / \u8BCD", "{count} palabras / caracteres", "{count} mots / caract\xE8res", "{count} W\xF6rter / Zeichen", "{count} \u6587\u5B57 / \u8A9E", "{count} \u0643\u0644\u0645\u0629 / \u062D\u0631\u0641"],
  "aboutMinutes": ["About {time}", "\u7EA6{time}\u8BFB\u5B8C", "Aproximadamente {time}", "Environ {time}", "Etwa {time}", "\u7D04 {time}", "\u062D\u0648\u0627\u0644\u064A {time}"],
  "captureDemo": ["Sample article", "\u793A\u4F8B\u6587\u7AE0", "Art\xEDculo de ejemplo", "Article d\u2019exemple", "Beispielartikel", "\u30B5\u30F3\u30D7\u30EB\u8A18\u4E8B", "\u0645\u0642\u0627\u0644 \u062A\u062C\u0631\u064A\u0628\u064A"],
  "captureSelection": ["Selected text", "\u9009\u4E2D\u6587\u5B57", "Texto seleccionado", "Texte s\xE9lectionn\xE9", "Ausgew\xE4hlter Text", "\u9078\u629E\u3057\u305F\u6587\u7AE0", "\u0627\u0644\u0646\u0635 \u0627\u0644\u0645\u062D\u062F\u0651\u062F"],
  "captureArticle": ["Web article", "\u7F51\u9875\u6B63\u6587", "Art\xEDculo web", "Article web", "Webartikel", "\u30A6\u30A7\u30D6\u8A18\u4E8B", "\u0645\u0642\u0627\u0644 \u0645\u0646 \u0627\u0644\u0648\u064A\u0628"],
  "progressError": ["Reading position could not be saved. Your article and notes are unchanged.", "\u6CA1\u80FD\u8BB0\u4F4F\u9605\u8BFB\u4F4D\u7F6E\uFF0C\u6587\u7AE0\u548C\u7B14\u8BB0\u8FD8\u5728\u3002", "No se pudo guardar la posici\xF3n. El art\xEDculo y las notas no cambian.", "La position n\u2019a pas pu \xEAtre enregistr\xE9e. L\u2019article et les notes sont inchang\xE9s.", "Die Leseposition konnte nicht gespeichert werden. Artikel und Notizen bleiben erhalten.", "\u8AAD\u66F8\u4F4D\u7F6E\u3092\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u8A18\u4E8B\u3068\u30E1\u30E2\u306B\u306F\u5F71\u97FF\u3057\u307E\u305B\u3093\u3002", "\u062A\u0639\u0630\u0651\u0631 \u062D\u0641\u0638 \u0645\u0648\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629. \u0644\u0645 \u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0644 \u0623\u0648 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A."],
  "saving": ["Saving. Please wait.", "\u6B63\u5728\u4FDD\u5B58\u2026\u2026", "Guardando. Espera un momento.", "Enregistrement en cours. Veuillez patienter.", "Wird gespeichert. Bitte warten.", "\u4FDD\u5B58\u4E2D\u3067\u3059\u3002\u304A\u5F85\u3061\u304F\u3060\u3055\u3044\u3002", "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631."],
  "leave": ["You have unsaved notes. Leaving will discard these changes. Continue?", "\u4FEE\u6539\u8FD8\u6CA1\u4FDD\u5B58\u3002\u786E\u5B9A\u79BB\u5F00\u5417\uFF1F", "Tienes notas sin guardar. Si sales perder\xE1s los cambios. \xBFContinuar?", "Vos notes ne sont pas enregistr\xE9es. Quitter effacera ces changements. Continuer ?", "Es gibt ungespeicherte Notizen. Beim Verlassen gehen \xC4nderungen verloren. Fortfahren?", "\u672A\u4FDD\u5B58\u306E\u30E1\u30E2\u304C\u3042\u308A\u307E\u3059\u3002\u79FB\u52D5\u3059\u308B\u3068\u5909\u66F4\u304C\u5931\u308F\u308C\u307E\u3059\u3002\u7D9A\u3051\u307E\u3059\u304B\uFF1F", "\u0644\u062F\u064A\u0643 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629. \u0633\u062A\u0641\u0642\u062F \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0625\u0630\u0627 \u063A\u0627\u062F\u0631\u062A. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F"],
  "settingsError": ["Display settings could not be saved.", "\u8BBE\u7F6E\u6CA1\u80FD\u4FDD\u5B58\uFF0C\u7A0D\u540E\u518D\u8BD5\u3002", "No se pudo guardar la configuraci\xF3n.", "Les r\xE9glages d\u2019affichage n\u2019ont pas pu \xEAtre enregistr\xE9s.", "Anzeigeeinstellungen konnten nicht gespeichert werden.", "\u8868\u793A\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002", "\u062A\u0639\u0630\u0651\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0639\u0631\u0636."],
  "noteError": ["This note could not be read. Capture it again from the original page.", "\u8FD9\u7BC7\u7B14\u8BB0\u6CA1\u80FD\u6253\u5F00\uFF0C\u8BF7\u56DE\u5230\u539F\u7F51\u9875\u91CD\u65B0\u4FDD\u5B58\u3002", "No se pudo leer la nota. Vuelve a capturarla de la p\xE1gina original.", "Cette note n\u2019a pas pu \xEAtre lue. Capturez \xE0 nouveau la page d\u2019origine.", "Die Notiz konnte nicht gelesen werden. Originalseite erneut erfassen.", "\u3053\u306E\u30E1\u30E2\u3092\u8AAD\u307F\u53D6\u308C\u307E\u305B\u3093\u3002\u5143\u306E\u30DA\u30FC\u30B8\u304B\u3089\u3082\u3046\u4E00\u5EA6\u53D6\u308A\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002", "\u062A\u0639\u0630\u0651\u0631\u062A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629. \u0627\u0644\u062A\u0642\u0637\u0647\u0627 \u0645\u062C\u062F\u062F\u064B\u0627 \u0645\u0646 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629."],
  "limitNotes": ["The library holds up to 100 notes. Export and delete notes you no longer need first.", "\u6700\u591A\u80FD\u4FDD\u5B58 100 \u7BC7\u7B14\u8BB0\u3002\u8BF7\u5148\u5907\u4EFD\uFF0C\u518D\u5220\u6389\u4E0D\u9700\u8981\u7684\u7B14\u8BB0\u3002", "La biblioteca admite 100 notas. Exporta y elimina las que ya no necesites.", "La biblioth\xE8que est limit\xE9e \xE0 100 notes. Exportez et supprimez d\u2019abord les notes inutiles.", "Die Bibliothek fasst bis zu 100 Notizen. Zuerst nicht mehr ben\xF6tigte Notizen exportieren und l\xF6schen.", "\u30E1\u30E2\u306F\u6700\u5927 100 \u4EF6\u3067\u3059\u3002\u4E0D\u8981\u306A\u30E1\u30E2\u3092\u66F8\u304D\u51FA\u3057\u3066\u524A\u9664\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u062A\u062A\u0633\u0639 \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0644\u0640 100 \u0645\u0644\u0627\u062D\u0638\u0629. \u0635\u062F\u0651\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0636\u0631\u0648\u0631\u064A\u0629 \u0648\u0627\u062D\u0630\u0641\u0647\u0627 \u0623\u0648\u0644\u064B\u0627."],
  "largeNote": ["This article is too large to save. Capture fewer paragraphs or export Markdown.", "\u8FD9\u7BC7\u6587\u7AE0\u592A\u5927\uFF0C\u4FDD\u5B58\u4E0D\u4E86\u3002\u53EF\u4EE5\u53EA\u9009\u51E0\u6BB5\u91CD\u65B0\u4FDD\u5B58\uFF0C\u6216\u76F4\u63A5\u5BFC\u51FA\u3002", "El art\xEDculo es demasiado grande. Captura menos p\xE1rrafos o exporta Markdown.", "Cet article est trop volumineux. Capturez moins de paragraphes ou exportez le Markdown.", "Dieser Artikel ist zu gro\xDF. Weniger Abs\xE4tze erfassen oder Markdown exportieren.", "\u8A18\u4E8B\u304C\u5927\u304D\u3059\u304E\u3066\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3002\u4E00\u90E8\u306E\u6BB5\u843D\u3092\u53D6\u308A\u8FBC\u3080\u304B Markdown \u306B\u66F8\u304D\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u0645\u0642\u0627\u0644 \u0623\u0643\u0628\u0631 \u0645\u0646 \u062D\u062F \u0627\u0644\u062D\u0641\u0638. \u0627\u0644\u062A\u0642\u0637 \u0641\u0642\u0631\u0627\u062A \u0623\u0642\u0644 \u0623\u0648 \u0635\u062F\u0651\u0631 Markdown."],
  "conflictSaved": ["Another window changed the original. Your edits were saved as a new note.", "\u53E6\u4E00\u4E2A\u7A97\u53E3\u4E5F\u6539\u4E86\u8FD9\u7BC7\u7B14\u8BB0\u3002\u4E3A\u907F\u514D\u4E22\u5931\uFF0C\u5DF2\u628A\u4F60\u7684\u5185\u5BB9\u53E6\u5B58\u4E86\u4E00\u4EFD\u3002", "Otra ventana cambi\xF3 el original. Tus cambios se guardaron como una nota nueva.", "Une autre fen\xEAtre a modifi\xE9 l\u2019original. Vos changements ont \xE9t\xE9 enregistr\xE9s dans une nouvelle note.", "Ein anderes Fenster hat das Original ge\xE4ndert. Deine \xC4nderungen wurden als neue Notiz gespeichert.", "\u5225\u306E\u30A6\u30A3\u30F3\u30C9\u30A6\u3067\u5143\u306E\u30E1\u30E2\u304C\u5909\u66F4\u3055\u308C\u307E\u3057\u305F\u3002\u5909\u66F4\u306F\u65B0\u3057\u3044\u30E1\u30E2\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002", "\u063A\u064A\u0651\u0631\u062A \u0646\u0627\u0641\u0630\u0629 \u0623\u062E\u0631\u0649 \u0627\u0644\u0623\u0635\u0644. \u062D\u064F\u0641\u0638\u062A \u062A\u0639\u062F\u064A\u0644\u0627\u062A\u0643 \u0643\u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u062F\u064A\u062F\u0629."],
  "previewSaved": ["Kept in this preview only. Refreshing clears it; export a backup to keep it.", "\u5DF2\u6682\u5B58\u5728\u8FD9\u4E2A\u9875\u9762\uFF0C\u5237\u65B0\u540E\u4F1A\u6E05\u7A7A\u3002\u9700\u8981\u4FDD\u7559\u7684\u8BDD\uFF0C\u8BF7\u5148\u5BFC\u51FA\u3002", "Solo se conserva en esta vista previa. Se borra al recargar; exporta una copia.", "Conserv\xE9 dans cet aper\xE7u uniquement. L\u2019actualisation l\u2019efface ; exportez une sauvegarde.", "Nur in dieser Vorschau gespeichert. Neuladen l\xF6scht sie; bitte eine Sicherung exportieren.", "\u3053\u306E\u30D7\u30EC\u30D3\u30E5\u30FC\u5185\u3060\u3051\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002\u518D\u8AAD\u307F\u8FBC\u307F\u3067\u6D88\u3048\u308B\u305F\u3081\u3001\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u66F8\u304D\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0645\u062D\u0641\u0648\u0638 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0641\u0642\u0637. \u062A\u064F\u0645\u0633\u062D \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0639\u0646\u062F \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u061B \u0635\u062F\u0651\u0631 \u0646\u0633\u062E\u0629 \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0647\u0627."],
  "saved": ["Saved to this browser\u2019s local library.", "\u7B14\u8BB0\u5DF2\u4FDD\u5B58\u3002", "Guardado en la biblioteca local de este navegador.", "Enregistr\xE9 dans la biblioth\xE8que locale de ce navigateur.", "In der lokalen Bibliothek dieses Browsers gespeichert.", "\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30FC\u306E\u30ED\u30FC\u30AB\u30EB\u30E9\u30A4\u30D6\u30E9\u30EA\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002", "\u062D\u064F\u0641\u0638\u062A \u0641\u064A \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D."],
  "storageError": ["Local storage is full or unavailable. Export Markdown to keep a copy.", "\u4FDD\u5B58\u5931\u8D25\uFF0C\u7535\u8111\u53EF\u80FD\u6CA1\u6709\u8DB3\u591F\u7A7A\u95F4\u3002\u8BF7\u5148\u5BFC\u51FA\u7B14\u8BB0\u3002", "El almacenamiento local est\xE1 lleno o no est\xE1 disponible. Exporta Markdown.", "Le stockage local est plein ou indisponible. Exportez le Markdown pour garder une copie.", "Lokaler Speicher ist voll oder nicht verf\xFCgbar. Markdown als Kopie exportieren.", "\u7AEF\u672B\u306E\u7A7A\u304D\u5BB9\u91CF\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u308B\u304B\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002Markdown \u306B\u66F8\u304D\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u062D\u0644\u064A \u0645\u0645\u062A\u0644\u0626 \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D. \u0635\u062F\u0651\u0631 Markdown \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0646\u0633\u062E\u0629."],
  "deleted": ["Note deleted from this device.", "\u7B14\u8BB0\u5DF2\u5220\u9664\u3002", "Nota eliminada de este dispositivo.", "Note supprim\xE9e de cet appareil.", "Notiz von diesem Ger\xE4t gel\xF6scht.", "\u3053\u306E\u7AEF\u672B\u304B\u3089\u30E1\u30E2\u3092\u524A\u9664\u3057\u307E\u3057\u305F\u3002", "\u062D\u064F\u0630\u0641\u062A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632."],
  "deleteError": ["Deletion failed. Please try again.", "\u6CA1\u80FD\u5220\u9664\uFF0C\u8BF7\u518D\u8BD5\u4E00\u6B21\u3002", "No se pudo eliminar. Int\xE9ntalo de nuevo.", "La suppression a \xE9chou\xE9. R\xE9essayez.", "L\xF6schen fehlgeschlagen. Bitte erneut versuchen.", "\u524A\u9664\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002", "\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062D\u0630\u0641. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u062C\u062F\u062F\u064B\u0627."],
  "copied": ["Markdown copied, including the source and your notes.", "\u5DF2\u590D\u5236\uFF0C\u5305\u542B\u539F\u6587\u3001\u6765\u6E90\u548C\u4F60\u7684\u7B14\u8BB0\u3002", "Markdown copiado con la fuente y tus notas.", "Markdown copi\xE9 avec la source et vos notes.", "Markdown mit Quelle und deinen Notizen kopiert.", "\u51FA\u5178\u3068\u30E1\u30E2\u3092\u542B\u3080 Markdown \u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\u3002", "\u0646\u064F\u0633\u062E Markdown \u0645\u0639 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643."],
  "clipboardError": ["Clipboard unavailable. Use Export .md instead.", "\u6CA1\u80FD\u590D\u5236\uFF0C\u8BF7\u8BD5\u8BD5\u201C\u5BFC\u51FA .md\u201D\u3002", "Portapapeles no disponible. Usa Exportar .md.", "Presse-papiers indisponible. Utilisez Exporter .md.", "Zwischenablage nicht verf\xFCgbar. Bitte .md exportieren.", "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u3092\u4F7F\u3048\u307E\u305B\u3093\u3002\u300C.md \u306B\u66F8\u304D\u51FA\u3057\u300D\u3092\u4F7F\u3063\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u062D\u0627\u0641\u0638\u0629 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u062A\u0635\u062F\u064A\u0631 \u200E.md."],
  "exported": ["Markdown download started. Check your browser\u2019s downloads.", "\u5DF2\u5F00\u59CB\u4E0B\u8F7D\uFF0C\u8BF7\u67E5\u770B\u6D4F\u89C8\u5668\u7684\u4E0B\u8F7D\u5217\u8868\u3002", "Descarga de Markdown iniciada. Revisa las descargas del navegador.", "T\xE9l\xE9chargement Markdown lanc\xE9. Consultez les t\xE9l\xE9chargements du navigateur.", "Markdown-Download gestartet. Browser-Downloads pr\xFCfen.", "Markdown \u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3092\u958B\u59CB\u3057\u307E\u3057\u305F\u3002\u30D6\u30E9\u30A6\u30B6\u30FC\u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u4E00\u89A7\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0628\u062F\u0623 \u062A\u0646\u0632\u064A\u0644 Markdown. \u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u062A\u0646\u0632\u064A\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D."],
  "exportError": ["Export failed. Try copying Markdown.", "\u6CA1\u80FD\u5BFC\u51FA\uFF0C\u8BF7\u8BD5\u8BD5\u201C\u590D\u5236 Markdown\u201D\u3002", "La exportaci\xF3n fall\xF3. Prueba a copiar Markdown.", "L\u2019exportation a \xE9chou\xE9. Essayez de copier le Markdown.", "Export fehlgeschlagen. Markdown kopieren versuchen.", "\u66F8\u304D\u51FA\u305B\u307E\u305B\u3093\u3067\u3057\u305F\u3002Markdown \u306E\u30B3\u30D4\u30FC\u3092\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002", "\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631. \u062C\u0631\u0651\u0628 \u0646\u0633\u062E Markdown."],
  "backupEmpty": ["The library is empty. Save a note first.", "\u8FD8\u6CA1\u6709\u7B14\u8BB0\uFF0C\u5148\u4FDD\u5B58\u4E00\u7BC7\u518D\u5907\u4EFD\u3002", "La biblioteca est\xE1 vac\xEDa. Guarda una nota primero.", "La biblioth\xE8que est vide. Enregistrez d\u2019abord une note.", "Die Bibliothek ist leer. Zuerst eine Notiz speichern.", "\u30E9\u30A4\u30D6\u30E9\u30EA\u304C\u7A7A\u3067\u3059\u3002\u5148\u306B\u30E1\u30E2\u3092\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0641\u0627\u0631\u063A\u0629. \u0627\u062D\u0641\u0638 \u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u0648\u0644\u064B\u0627."],
  "backedUp": ["Backup download started. Notes: {count}.", "\u5DF2\u5F00\u59CB\u4E0B\u8F7D\u5907\u4EFD\uFF0C\u5171 {count} \u7BC7\u7B14\u8BB0\u3002", "Descarga de copia iniciada. Notas: {count}.", "T\xE9l\xE9chargement de sauvegarde lanc\xE9. Notes : {count}.", "Sicherungsdownload gestartet. Notizen: {count}.", "{count} \u4EF6\u306E\u30E1\u30E2\u306E\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u958B\u59CB\u3057\u307E\u3057\u305F\u3002", "\u0628\u062F\u0623 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0646\u0633\u062E\u0629. \u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: {count}."],
  "backupError": ["Backup failed. Please try again.", "\u5907\u4EFD\u5931\u8D25\uFF0C\u8BF7\u518D\u8BD5\u4E00\u6B21\u3002", "La copia fall\xF3. Int\xE9ntalo de nuevo.", "La sauvegarde a \xE9chou\xE9. R\xE9essayez.", "Sicherung fehlgeschlagen. Bitte erneut versuchen.", "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A. \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u064B\u0627."],
  "backupLarge": ["The backup exceeds the 20 MB limit. Export Markdown and reduce the library first.", "\u5907\u4EFD\u4E0D\u80FD\u8D85\u8FC7 20 MB\u3002\u53EF\u4EE5\u5148\u9010\u7BC7\u5BFC\u51FA\uFF0C\u518D\u5220\u6389\u4E0D\u9700\u8981\u7684\u7B14\u8BB0\u3002", "La copia supera 20 MB. Exporta Markdown y reduce la biblioteca.", "La sauvegarde d\xE9passe 20 Mo. Exportez le Markdown et r\xE9duisez la biblioth\xE8que.", "Die Sicherung \xFCberschreitet 20 MB. Markdown exportieren und Bibliothek verkleinern.", "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u304C 20 MB \u3092\u8D85\u3048\u3066\u3044\u307E\u3059\u3002Markdown \u3092\u66F8\u304D\u51FA\u3057\u3066\u30E9\u30A4\u30D6\u30E9\u30EA\u3092\u6574\u7406\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u062A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0646\u0633\u062E\u0629 \u062D\u062F 20 \u0645\u064A\u063A\u0627\u0628\u0627\u064A\u062A. \u0635\u062F\u0651\u0631 Markdown \u0648\u0642\u0644\u0651\u0644 \u062D\u062C\u0645 \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0623\u0648\u0644\u064B\u0627."],
  "importPreview": ["Notes to restore: {add}. Duplicates to skip: {skip}.", "\u4F1A\u6DFB\u52A0 {add} \u7BC7\u7B14\u8BB0\uFF0C\u8DF3\u8FC7 {skip} \u7BC7\u91CD\u590D\u5185\u5BB9\u3002", "Notas para restaurar: {add}. Duplicadas para omitir: {skip}.", "Notes \xE0 restaurer : {add}. Doublons \xE0 ignorer : {skip}.", "Wiederherzustellende Notizen: {add}. Zu \xFCberspringende Duplikate: {skip}.", "{add} \u4EF6\u3092\u5FA9\u5143\u3057\u3001\u91CD\u8907\u3059\u308B {skip} \u4EF6\u3092\u30B9\u30AD\u30C3\u30D7\u3057\u307E\u3059\u3002", "\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0644\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629: {add}. \u0627\u0644\u0645\u0643\u0631\u0631\u0629 \u0644\u0644\u062A\u062C\u0627\u0648\u0632: {skip}."],
  "sanitized": ["Unsafe web content and links were removed.", "\u5DF2\u53BB\u6389\u4E0D\u5B89\u5168\u7684\u5185\u5BB9\u548C\u94FE\u63A5\u3002", "Se elimin\xF3 el contenido y los enlaces no seguros.", "Le contenu et les liens dangereux ont \xE9t\xE9 supprim\xE9s.", "Unsichere Webinhalte und Links wurden entfernt.", "\u5B89\u5168\u3067\u306A\u3044\u5185\u5BB9\u3068\u30EA\u30F3\u30AF\u3092\u524A\u9664\u3057\u307E\u3057\u305F\u3002", "\u0623\u064F\u0632\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0648\u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646\u0629."],
  "backupInvalid": ["The backup is invalid or unsupported. Choose an unmodified Pageleaf JSON backup.", "\u8FD9\u4E2A\u6587\u4EF6\u4E0D\u80FD\u5BFC\u5165\u3002\u8BF7\u9009\u62E9 Pageleaf \u5BFC\u51FA\u7684 JSON \u5907\u4EFD\u3002", "La copia no es v\xE1lida o no es compatible. Elige un JSON de Pageleaf sin modificar.", "Sauvegarde invalide ou non prise en charge. Choisissez une sauvegarde JSON Pageleaf non modifi\xE9e.", "Die Sicherung ist ung\xFCltig oder nicht unterst\xFCtzt. Eine unver\xE4nderte Pageleaf-JSON-Sicherung ausw\xE4hlen.", "\u7121\u52B9\u307E\u305F\u306F\u672A\u5BFE\u5FDC\u306E\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3067\u3059\u3002\u5909\u66F4\u3057\u3066\u3044\u306A\u3044 Pageleaf \u306E JSON \u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u0646\u0633\u062E\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645\u0629. \u0627\u062E\u062A\u0631 \u0646\u0633\u062E\u0629 JSON \u0623\u0635\u0644\u064A\u0629 \u0645\u0646 Pageleaf."],
  "imported": ["Notes restored: {add}. Duplicates skipped: {skip}.", "\u5DF2\u6DFB\u52A0 {add} \u7BC7\u7B14\u8BB0\uFF0C\u8DF3\u8FC7 {skip} \u7BC7\u91CD\u590D\u5185\u5BB9\u3002", "Notas restauradas: {add}. Duplicadas omitidas: {skip}.", "Notes restaur\xE9es : {add}. Doublons ignor\xE9s : {skip}.", "Wiederhergestellte Notizen: {add}. \xDCbersprungene Duplikate: {skip}.", "{add} \u4EF6\u3092\u5FA9\u5143\u3057\u3001\u91CD\u8907\u3059\u308B {skip} \u4EF6\u3092\u30B9\u30AD\u30C3\u30D7\u3057\u307E\u3057\u305F\u3002", "\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0639\u0627\u062F\u0629: {add}. \u0627\u0644\u0645\u0643\u0631\u0631\u0629 \u0627\u0644\u062A\u064A \u062A\u064F\u062C\u0627\u0648\u0632\u062A: {skip}."],
  "importError": ["Restore failed, possibly because storage is full. Existing notes are never overwritten.", "\u6CA1\u80FD\u6062\u590D\u5907\u4EFD\uFF0C\u8BF7\u68C0\u67E5\u7535\u8111\u7A7A\u95F4\u3002\u5DF2\u6709\u7B14\u8BB0\u6CA1\u6709\u88AB\u8986\u76D6\u3002", "La restauraci\xF3n fall\xF3, quiz\xE1 por falta de espacio. Las notas existentes no se sobrescriben.", "La restauration a \xE9chou\xE9, peut-\xEAtre faute d\u2019espace. Les notes existantes ne sont jamais \xE9cras\xE9es.", "Wiederherstellung fehlgeschlagen, m\xF6glicherweise ist der Speicher voll. Bestehende Notizen bleiben erhalten.", "\u5FA9\u5143\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u7A7A\u304D\u5BB9\u91CF\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u308B\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002\u65E2\u5B58\u306E\u30E1\u30E2\u306F\u4E0A\u66F8\u304D\u3057\u307E\u305B\u3093\u3002", "\u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629\u060C \u0631\u0628\u0645\u0627 \u0644\u0627\u0645\u062A\u0644\u0627\u0621 \u0627\u0644\u062A\u062E\u0632\u064A\u0646. \u0644\u0627 \u062A\u064F\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629."],
  "libraryError": ["The note library could not be refreshed.", "\u6CA1\u80FD\u5237\u65B0\u7B14\u8BB0\u5217\u8868\u3002", "No se pudo actualizar la biblioteca.", "La biblioth\xE8que n\u2019a pas pu \xEAtre actualis\xE9e.", "Bibliothek konnte nicht aktualisiert werden.", "\u30E9\u30A4\u30D6\u30E9\u30EA\u3092\u66F4\u65B0\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002", "\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A."],
  "expired": ["This temporary article has expired. Capture it again from its page. Saved notes are available in the library.", "\u8FD9\u4EFD\u4E34\u65F6\u6587\u7AE0\u5DF2\u7ECF\u6E05\u7A7A\u3002\u8BF7\u56DE\u5230\u539F\u7F51\u9875\uFF0C\u518D\u70B9\u4E00\u6B21 Pageleaf\u3002\u4FDD\u5B58\u8FC7\u7684\u7B14\u8BB0\u8FD8\u5728\u7B14\u8BB0\u5217\u8868\u91CC\u3002", "El art\xEDculo temporal ha caducado. Capt\xFAralo de nuevo. Las notas guardadas siguen en la biblioteca.", "Cet article temporaire a expir\xE9. Capturez-le \xE0 nouveau. Les notes enregistr\xE9es restent dans la biblioth\xE8que.", "Dieser tempor\xE4re Artikel ist abgelaufen. Erneut erfassen. Gespeicherte Notizen sind in der Bibliothek verf\xFCgbar.", "\u4E00\u6642\u4FDD\u5B58\u306E\u8A18\u4E8B\u306F\u671F\u9650\u5207\u308C\u3067\u3059\u3002\u5143\u306E\u30DA\u30FC\u30B8\u304B\u3089\u518D\u5EA6\u53D6\u308A\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002\u4FDD\u5B58\u6E08\u307F\u306E\u30E1\u30E2\u306F\u30E9\u30A4\u30D6\u30E9\u30EA\u306B\u3042\u308A\u307E\u3059\u3002", "\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0645\u0642\u0627\u0644 \u0627\u0644\u0645\u0624\u0642\u062A. \u0627\u0644\u062A\u0642\u0637\u0647 \u0645\u062C\u062F\u062F\u064B\u0627 \u0645\u0646 \u0635\u0641\u062D\u062A\u0647. \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0645\u0643\u062A\u0628\u0629."],
  "missing": ["This note was deleted or is not in this browser\u2019s local library.", "\u627E\u4E0D\u5230\u8FD9\u7BC7\u7B14\u8BB0\uFF0C\u53EF\u80FD\u5DF2\u5220\u9664\uFF0C\u6216\u4FDD\u5B58\u5728\u53E6\u4E00\u4E2A\u6D4F\u89C8\u5668\u91CC\u3002", "Esta nota se elimin\xF3 o no est\xE1 en la biblioteca de este navegador.", "Cette note a \xE9t\xE9 supprim\xE9e ou n\u2019est pas dans la biblioth\xE8que de ce navigateur.", "Diese Notiz wurde gel\xF6scht oder ist nicht in der Bibliothek dieses Browsers.", "\u3053\u306E\u30E1\u30E2\u306F\u524A\u9664\u3055\u308C\u305F\u304B\u3001\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30FC\u306E\u30E9\u30A4\u30D6\u30E9\u30EA\u306B\u306F\u3042\u308A\u307E\u305B\u3093\u3002", "\u062D\u064F\u0630\u0641\u062A \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u0648 \u0644\u064A\u0633\u062A \u0641\u064A \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D."],
  "initError": ["The local library could not be opened. Reopen Pageleaf or check your browser\u2019s extension storage settings.", "\u6CA1\u80FD\u6253\u5F00\u7B14\u8BB0\u5217\u8868\u3002\u8BF7\u91CD\u65B0\u6253\u5F00 Pageleaf\uFF0C\u6216\u68C0\u67E5 Chrome \u7684\u6269\u5C55\u5B58\u50A8\u8BBE\u7F6E\u3002", "No se pudo abrir la biblioteca. Reabre Pageleaf o revisa el almacenamiento de extensiones.", "La biblioth\xE8que n\u2019a pas pu \xEAtre ouverte. Rouvrez Pageleaf ou v\xE9rifiez le stockage des extensions.", "Die lokale Bibliothek konnte nicht ge\xF6ffnet werden. Pageleaf erneut \xF6ffnen oder Erweiterungsspeicher pr\xFCfen.", "\u30ED\u30FC\u30AB\u30EB\u30E9\u30A4\u30D6\u30E9\u30EA\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F\u3002Pageleaf \u3092\u958B\u304D\u76F4\u3059\u304B\u3001\u62E1\u5F35\u6A5F\u80FD\u306E\u4FDD\u5B58\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u062A\u0639\u0630\u0651\u0631 \u0641\u062A\u062D \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629. \u0623\u0639\u062F \u0641\u062A\u062D Pageleaf \u0623\u0648 \u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062A."],
  "captureError": ["This page cannot be extracted. Try an ordinary web article. Browser settings, extension stores, PDFs and some protected pages are unsupported.", "\u8FD9\u9875\u6682\u65F6\u4E0D\u80FD\u4FDD\u5B58\u3002\u8BF7\u6362\u4E00\u7BC7\u666E\u901A\u7F51\u9875\u6587\u7AE0\u8BD5\u8BD5\uFF0C\u6216\u5148\u9009\u4E2D\u9700\u8981\u7684\u6587\u5B57\u3002PDF\u3001\u6D4F\u89C8\u5668\u8BBE\u7F6E\u9875\u548C\u90E8\u5206\u53D7\u4FDD\u62A4\u7F51\u9875\u4E0D\u652F\u6301\u3002", "No se puede extraer esta p\xE1gina. Prueba un art\xEDculo web normal. No se admiten ajustes, tiendas de extensiones, PDF ni ciertas p\xE1ginas protegidas.", "Cette page ne peut pas \xEAtre extraite. Essayez un article web. Les r\xE9glages, boutiques d\u2019extensions, PDF et certaines pages prot\xE9g\xE9es ne sont pas pris en charge.", "Diese Seite l\xE4sst sich nicht extrahieren. Einen normalen Webartikel versuchen. Einstellungen, Erweiterungs-Stores, PDFs und manche gesch\xFCtzte Seiten werden nicht unterst\xFCtzt.", "\u3053\u306E\u30DA\u30FC\u30B8\u306F\u53D6\u308A\u8FBC\u3081\u307E\u305B\u3093\u3002\u901A\u5E38\u306E\u30A6\u30A7\u30D6\u8A18\u4E8B\u3067\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002\u8A2D\u5B9A\u753B\u9762\u3001\u62E1\u5F35\u6A5F\u80FD\u30B9\u30C8\u30A2\u3001PDF\u3001\u4E00\u90E8\u306E\u4FDD\u8B77\u3055\u308C\u305F\u30DA\u30FC\u30B8\u306B\u306F\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093\u3002", "\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629. \u062C\u0631\u0651\u0628 \u0645\u0642\u0627\u0644 \u0648\u064A\u0628 \u0639\u0627\u062F\u064A\u064B\u0627. \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0648\u0645\u062A\u0627\u062C\u0631 \u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062A \u0648\u0645\u0644\u0641\u0627\u062A PDF \u0648\u0628\u0639\u0636 \u0627\u0644\u0635\u0641\u062D\u0627\u062A \u0627\u0644\u0645\u062D\u0645\u064A\u0629 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645\u0629."],
  "captureLarge": ["The page is too large or complex. Select fewer paragraphs and try again.", "\u8FD9\u9875\u5185\u5BB9\u592A\u591A\u3002\u5148\u9009\u4E2D\u9700\u8981\u7684\u51E0\u6BB5\u8BDD\uFF0C\u518D\u8BD5\u4E00\u6B21\u3002", "La p\xE1gina es demasiado grande o compleja. Selecciona menos p\xE1rrafos.", "La page est trop volumineuse ou complexe. S\xE9lectionnez moins de paragraphes.", "Die Seite ist zu gro\xDF oder komplex. Weniger Abs\xE4tze ausw\xE4hlen und erneut versuchen.", "\u30DA\u30FC\u30B8\u304C\u5927\u304D\u3059\u304E\u308B\u304B\u8907\u96D1\u3067\u3059\u3002\u5FC5\u8981\u306A\u6BB5\u843D\u3092\u9078\u629E\u3057\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u0635\u0641\u062D\u0629 \u0643\u0628\u064A\u0631\u0629 \u0623\u0648 \u0645\u0639\u0642\u0651\u062F\u0629 \u062C\u062F\u064B\u0627. \u062D\u062F\u0651\u062F \u0641\u0642\u0631\u0627\u062A \u0623\u0642\u0644 \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u064B\u0627."],
  "captureEditable": ["Forms and editable fields are not captured. Select published article text instead.", "\u4E0D\u80FD\u4FDD\u5B58\u8F93\u5165\u6846\u91CC\u7684\u5185\u5BB9\uFF0C\u8BF7\u9009\u4E2D\u7F51\u9875\u4E0A\u5DF2\u7ECF\u53D1\u5E03\u7684\u6587\u5B57\u3002", "No se capturan formularios ni campos editables. Selecciona texto publicado.", "Les formulaires et champs modifiables ne sont pas captur\xE9s. S\xE9lectionnez du texte publi\xE9.", "Formulare und bearbeitbare Felder werden nicht erfasst. Ver\xF6ffentlichten Artikeltext ausw\xE4hlen.", "\u30D5\u30A9\u30FC\u30E0\u3084\u7DE8\u96C6\u53EF\u80FD\u306A\u9818\u57DF\u306F\u53D6\u308A\u8FBC\u3081\u307E\u305B\u3093\u3002\u516C\u958B\u6E08\u307F\u306E\u672C\u6587\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0644\u0627 \u062A\u064F\u0644\u062A\u0642\u0637 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0648\u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u062D\u0631\u064A\u0631. \u062D\u062F\u0651\u062F \u0646\u0635 \u0645\u0642\u0627\u0644 \u0645\u0646\u0634\u0648\u0631."],
  "captureEmpty": ["No readable article was found. Wait for the page to load, or select the text you need.", "\u6CA1\u627E\u5230\u6B63\u6587\u3002\u7B49\u9875\u9762\u52A0\u8F7D\u5B8C\uFF0C\u6216\u5148\u9009\u4E2D\u60F3\u4FDD\u5B58\u7684\u6587\u5B57\u3002", "No se encontr\xF3 un art\xEDculo legible. Espera a que cargue la p\xE1gina o selecciona texto.", "Aucun article lisible trouv\xE9. Attendez le chargement ou s\xE9lectionnez le texte voulu.", "Kein lesbarer Artikel gefunden. Seite laden lassen oder gew\xFCnschten Text ausw\xE4hlen.", "\u8AAD\u307F\u53D6\u308C\u308B\u672C\u6587\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u8AAD\u307F\u8FBC\u307F\u3092\u5F85\u3064\u304B\u3001\u5FC5\u8981\u306A\u6587\u7AE0\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0644\u0645 \u064A\u064F\u0639\u062B\u0631 \u0639\u0644\u0649 \u0645\u0642\u0627\u0644 \u0642\u0627\u0628\u0644 \u0644\u0644\u0642\u0631\u0627\u0621\u0629. \u0627\u0646\u062A\u0638\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u062D\u062F\u0651\u062F \u0627\u0644\u0646\u0635 \u0627\u0644\u0645\u0637\u0644\u0648\u0628."],
  "captureShort": ["The selection is too short. Select at least 8 characters.", "\u9009\u4E2D\u7684\u6587\u5B57\u592A\u5C11\uFF0C\u8BF7\u81F3\u5C11\u9009 8 \u4E2A\u5B57\u6216\u5B57\u7B26\u3002", "La selecci\xF3n es demasiado corta. Selecciona al menos 8 caracteres.", "La s\xE9lection est trop courte. S\xE9lectionnez au moins 8 caract\xE8res.", "Die Auswahl ist zu kurz. Mindestens 8 Zeichen ausw\xE4hlen.", "\u9078\u629E\u3057\u305F\u6587\u7AE0\u304C\u77ED\u3059\u304E\u307E\u3059\u30028 \u6587\u5B57\u4EE5\u4E0A\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u0646\u0635 \u0627\u0644\u0645\u062D\u062F\u0651\u062F \u0642\u0635\u064A\u0631 \u062C\u062F\u064B\u0627. \u062D\u062F\u0651\u062F 8 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644."],
  "captureStorage": ["Temporary storage is full. Save important notes, close unused readers and restart the browser if needed.", "\u4E34\u65F6\u7A7A\u95F4\u6EE1\u4E86\u3002\u8BF7\u5148\u4FDD\u5B58\u91CD\u8981\u7B14\u8BB0\uFF0C\u5173\u95ED\u4E0D\u7528\u7684\u9605\u8BFB\u9875\u9762\uFF0C\u5FC5\u8981\u65F6\u91CD\u542F\u6D4F\u89C8\u5668\u3002", "El almacenamiento temporal est\xE1 lleno. Guarda tus notas, cierra lectores sin usar y reinicia si hace falta.", "Le stockage temporaire est plein. Enregistrez vos notes, fermez les lecteurs inutilis\xE9s et red\xE9marrez si n\xE9cessaire.", "Tempor\xE4rer Speicher ist voll. Wichtige Notizen speichern, ungenutzte Leseseiten schlie\xDFen und bei Bedarf Browser neu starten.", "\u4E00\u6642\u4FDD\u5B58\u306E\u5BB9\u91CF\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u307E\u3059\u3002\u91CD\u8981\u306A\u30E1\u30E2\u3092\u4FDD\u5B58\u3057\u3001\u4F7F\u308F\u306A\u3044\u95B2\u89A7\u30DA\u30FC\u30B8\u3092\u9589\u3058\u3001\u5FC5\u8981\u306A\u3089\u30D6\u30E9\u30A6\u30B6\u30FC\u3092\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0624\u0642\u062A \u0645\u0645\u062A\u0644\u0626. \u0627\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0647\u0645\u0629 \u0648\u0623\u063A\u0644\u0642 \u0635\u0641\u062D\u0627\u062A \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u063A\u064A\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0648\u0623\u0639\u062F \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629."],
  "textOnly": ["Only text and safe links are kept. Images, audio, video and interactive content are not saved.", "\u8FD9\u91CC\u53EA\u4FDD\u5B58\u6587\u5B57\u548C\u94FE\u63A5\uFF0C\u4E0D\u4FDD\u5B58\u56FE\u7247\u3001\u97F3\u89C6\u9891\u6216\u7F51\u9875\u91CC\u7684\u4E92\u52A8\u5185\u5BB9\u3002", "Solo se guardan texto y enlaces seguros. No se guardan im\xE1genes, audio, v\xEDdeo ni contenido interactivo.", "Seuls le texte et les liens s\xFBrs sont conserv\xE9s. Images, audio, vid\xE9o et contenus interactifs ne sont pas enregistr\xE9s.", "Nur Text und sichere Links werden gespeichert. Bilder, Audio, Video und interaktive Inhalte werden nicht gespeichert.", "\u6587\u7AE0\u3068\u5B89\u5168\u306A\u30EA\u30F3\u30AF\u3060\u3051\u3092\u4FDD\u5B58\u3057\u307E\u3059\u3002\u753B\u50CF\u3001\u97F3\u58F0\u3001\u52D5\u753B\u3001\u64CD\u4F5C\u304C\u5FC5\u8981\u306A\u5185\u5BB9\u306F\u4FDD\u5B58\u3057\u307E\u305B\u3093\u3002", "\u064A\u064F\u062D\u0641\u0638 \u0627\u0644\u0646\u0635 \u0648\u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u0622\u0645\u0646\u0629 \u0641\u0642\u0637. \u0644\u0627 \u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631 \u0623\u0648 \u0627\u0644\u0635\u0648\u062A \u0623\u0648 \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u0623\u0648 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A."],
  "sourceCleaned": ["Query parameters, fragments and login credentials were removed from the source URL.", "\u5DF2\u53BB\u6389\u94FE\u63A5\u91CC\u53EF\u80FD\u5E26\u6709\u767B\u5F55\u6216\u8DDF\u8E2A\u4FE1\u606F\u7684\u90E8\u5206\uFF0C\u6709\u4E9B\u94FE\u63A5\u53EF\u80FD\u9700\u8981\u624B\u52A8\u4FEE\u6B63\u3002", "Se eliminaron los par\xE1metros, fragmentos y credenciales de la URL original.", "Les param\xE8tres, fragments et identifiants ont \xE9t\xE9 retir\xE9s de l\u2019URL source.", "Abfrageparameter, Fragmente und Zugangsdaten wurden aus der Quell-URL entfernt.", "\u51FA\u5178 URL \u304B\u3089\u30AF\u30A8\u30EA\u3001\u30D5\u30E9\u30B0\u30E1\u30F3\u30C8\u3001\u8A8D\u8A3C\u60C5\u5831\u3092\u524A\u9664\u3057\u307E\u3057\u305F\u3002", "\u0623\u064F\u0632\u064A\u0644\u062A \u0645\u0639\u0644\u0645\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0648\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0631\u0627\u0628\u0637 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0646 \u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0635\u062F\u0631."],
  "demoWarning": ["This is a made-up example ({language}). Select a sentence to try marking it or making notes.", "\u8FD9\u662F\u865A\u6784\u7684\u793A\u4F8B\uFF08{language}\uFF09\u3002\u9009\u4E2D\u4E00\u53E5\u8BDD\uFF0C\u8BD5\u8BD5\u5212\u91CD\u70B9\u3001\u6CE2\u6D6A\u7EBF\u6216\u6574\u7406\u7B14\u8BB0\u3002", "Este ejemplo es ficticio ({language}). Selecciona una frase para probar las marcas o crear notas.", "Cet exemple est fictif ({language}). S\xE9lectionnez une phrase pour la marquer ou pr\xE9parer vos notes.", "Dieses Beispiel ist erfunden ({language}). Einen Satz ausw\xE4hlen und Markierungen oder Notizen ausprobieren.", "\u3053\u308C\u306F\u67B6\u7A7A\u306E\u4F8B\u3067\u3059\uFF08{language}\uFF09\u3002\u6587\u7AE0\u3092\u9078\u3093\u3067\u3001\u30DE\u30FC\u30AB\u30FC\u3084\u30E1\u30E2\u306E\u6574\u7406\u3092\u8A66\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0647\u0630\u0627 \u0645\u062B\u0627\u0644 \u062E\u064A\u0627\u0644\u064A ({language}). \u062D\u062F\u0651\u062F \u062C\u0645\u0644\u0629 \u0644\u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u062A\u0645\u064A\u064A\u0632 \u0623\u0648 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A."],
  "mdUntitled": ["Untitled article", "\u672A\u547D\u540D\u6587\u7AE0", "Art\xEDculo sin t\xEDtulo", "Article sans titre", "Unbenannter Artikel", "\u7121\u984C\u306E\u8A18\u4E8B", "\u0645\u0642\u0627\u0644 \u0628\u0644\u0627 \u0639\u0646\u0648\u0627\u0646"],
  "mdSource": ["Source", "\u6765\u6E90", "Fuente", "Source", "Quelle", "\u51FA\u5178", "\u0627\u0644\u0645\u0635\u062F\u0631"],
  "mdAuthor": ["Author", "\u4F5C\u8005", "Autor", "Auteur", "Autor", "\u8457\u8005", "\u0627\u0644\u0645\u0624\u0644\u0641"],
  "mdCaptured": ["Captured", "\u6458\u5F55\u65F6\u95F4", "Capturado", "Captur\xE9 le", "Erfasst", "\u53D6\u308A\u8FBC\u307F\u65E5\u6642", "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637"],
  "mdNotes": ["My notes", "\u6211\u7684\u7B14\u8BB0", "Mis notas", "Mes notes", "Meine Notizen", "\u81EA\u5206\u306E\u30E1\u30E2", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u064A"],
  "mdArticle": ["Article excerpt", "\u539F\u6587\u6458\u5F55", "Extracto del art\xEDculo", "Extrait de l\u2019article", "Artikelauszug", "\u8A18\u4E8B\u306E\u629C\u7C8B", "\u0645\u0642\u062A\u0637\u0641 \u0627\u0644\u0645\u0642\u0627\u0644"],
  "markHighlight": ["Highlight", "\u6807\u91CD\u70B9", "Resaltar", "Surligner", "Markieren", "\u30DE\u30FC\u30AB\u30FC", "\u062A\u0645\u064A\u064A\u0632"],
  "markUnderline": ["Underline", "\u4E0B\u5212\u7EBF", "Subrayar", "Souligner", "Unterstreichen", "\u4E0B\u7DDA", "\u062A\u0633\u0637\u064A\u0631"],
  "markWavy": ["Wavy underline", "\u6CE2\u6D6A\u7EBF", "L\xEDnea ondulada", "Ligne ondul\xE9e", "Wellenlinie", "\u6CE2\u7DDA", "\u062E\u0637 \u0645\u062A\u0645\u0648\u0651\u062C"],
  "pen": ["Pen", "\u753B\u7B14", "L\xE1piz", "Stylo", "Stift", "\u30DA\u30F3", "\u0642\u0644\u0645"],
  "undoLast": ["Undo last mark", "\u64A4\u9500\u4E0A\u4E00\u6B21\u6807\u8BB0", "Deshacer \xFAltima marca", "Annuler la derni\xE8re marque", "Letzte Markierung zur\xFCcknehmen", "\u6700\u5F8C\u306E\u5370\u3092\u53D6\u308A\u6D88\u3059", "\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0622\u062E\u0631 \u0639\u0644\u0627\u0645\u0629"],
  "clearMarks": ["Clear all marks", "\u6E05\u9664\u5168\u90E8\u6807\u8BB0", "Borrar marcas", "Effacer les marques", "Markierungen l\xF6schen", "\u5370\u3092\u3059\u3079\u3066\u6D88\u3059", "\u0645\u0633\u062D \u0643\u0644 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A"],
  "organize": ["Make notes", "\u6574\u7406\u91CD\u70B9", "Crear notas", "Pr\xE9parer les notes", "Notizen erstellen", "\u8981\u70B9\u3092\u307E\u3068\u3081\u308B", "\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],
  "organizeTitle": ["Notes from this article", "\u8FD9\u7BC7\u6587\u7AE0\u7684\u91CD\u70B9", "Notas de este art\xEDculo", "Notes tir\xE9es de cet article", "Notizen aus diesem Artikel", "\u3053\u306E\u8A18\u4E8B\u306E\u8981\u70B9", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0644"],
  "organizeHint": ["Review the excerpts before adding them to your note.", "\u5148\u770B\u770B\u8FD9\u4E9B\u6458\u5F55\uFF0C\u518D\u51B3\u5B9A\u8981\u4E0D\u8981\u52A0\u5165\u7B14\u8BB0\u3002", "Revisa los extractos antes de a\xF1adirlos a tu nota.", "Relisez les extraits avant de les ajouter \xE0 vos notes.", "Ausz\xFCge pr\xFCfen, bevor sie zur Notiz hinzugef\xFCgt werden.", "\u629C\u7C8B\u3092\u78BA\u8A8D\u3057\u3066\u304B\u3089\u3001\u30E1\u30E2\u306B\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0642\u062A\u0637\u0641\u0627\u062A \u0642\u0628\u0644 \u0625\u0636\u0627\u0641\u062A\u0647\u0627 \u0625\u0644\u0649 \u0645\u0644\u0627\u062D\u0638\u062A\u0643."],
  "organizeMarksHint": ["These are the passages you marked. Check them against the article.", "\u6309\u4F60\u5212\u51FA\u7684\u5185\u5BB9\u6574\u7406\uFF0C\u8BF7\u5BF9\u7167\u539F\u6587\u786E\u8BA4\u3002", "Son los pasajes que marcaste. Comp\xE1ralos con el art\xEDculo.", "Voici les passages que vous avez marqu\xE9s. V\xE9rifiez-les dans l\u2019article.", "Dies sind die markierten Stellen. Mit dem Artikel abgleichen.", "\u5370\u3092\u4ED8\u3051\u305F\u6587\u7AE0\u3092\u96C6\u3081\u307E\u3057\u305F\u3002\u539F\u6587\u3068\u7167\u3089\u3057\u3066\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0647\u0630\u0647 \u0627\u0644\u0641\u0642\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062D\u062F\u0651\u062F\u062A\u0647\u0627. \u0631\u0627\u062C\u0639\u0647\u0627 \u0641\u064A \u0627\u0644\u0645\u0642\u0627\u0644."],
  "organizeSectionsHint": ["No text is marked yet. These are the opening sentences of each section, not an AI summary.", "\u4F60\u8FD8\u6CA1\u5212\u91CD\u70B9\uFF0C\u5148\u6458\u4E86\u5404\u8282\u7684\u5F00\u5934\u53E5\u3002\u8FD9\u4E0D\u662F AI \u603B\u7ED3\u3002", "A\xFAn no has marcado texto. Son las primeras frases de cada secci\xF3n, no un resumen de IA.", "Aucun passage marqu\xE9 : voici les premi\xE8res phrases de chaque section, pas un r\xE9sum\xE9 IA.", "Noch nichts markiert: Hier stehen die ersten S\xE4tze der Abschnitte, keine KI-Zusammenfassung.", "\u307E\u3060\u5370\u304C\u306A\u3044\u305F\u3081\u3001\u5404\u7BC0\u306E\u6700\u521D\u306E\u6587\u3092\u629C\u304D\u51FA\u3057\u307E\u3057\u305F\u3002AI\u306B\u3088\u308B\u8981\u7D04\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002", "\u0644\u0645 \u062A\u062D\u062F\u0651\u062F \u0646\u0635\u064B\u0627 \u0628\u0639\u062F. \u0647\u0630\u0647 \u0627\u0644\u062C\u0645\u0644 \u0627\u0644\u0623\u0648\u0644\u0649 \u0645\u0646 \u0643\u0644 \u0642\u0633\u0645\u060C \u0648\u0644\u064A\u0633\u062A \u0645\u0644\u062E\u0635\u064B\u0627 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A."],
  "appendToNote": ["Add to my note", "\u52A0\u5165\u6211\u7684\u7B14\u8BB0", "A\xF1adir a mi nota", "Ajouter \xE0 mes notes", "Zur Notiz hinzuf\xFCgen", "\u30E1\u30E2\u306B\u8FFD\u52A0", "\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0645\u0644\u0627\u062D\u0638\u062A\u064A"],
  "selectionHint": ["Select text in the article, then choose a mark.", "\u5148\u9009\u4E2D\u6B63\u6587\u91CC\u7684\u6587\u5B57\uFF0C\u518D\u70B9\u4E00\u79CD\u6807\u8BB0\u3002", "Selecciona texto del art\xEDculo y elige una marca.", "S\xE9lectionnez du texte dans l\u2019article, puis un type de marque.", "Text im Artikel ausw\xE4hlen, dann eine Markierung w\xE4hlen.", "\u672C\u6587\u3092\u9078\u629E\u3057\u3066\u304B\u3089\u3001\u5370\u306E\u7A2E\u985E\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002", "\u062D\u062F\u0651\u062F \u0646\u0635\u064B\u0627 \u0645\u0646 \u0627\u0644\u0645\u0642\u0627\u0644 \u062B\u0645 \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0639\u0644\u0627\u0645\u0629."],
  "marksCleared": ["All marks cleared. Save the note to keep this change.", "\u6807\u8BB0\u5DF2\u6E05\u9664\uFF0C\u4FDD\u5B58\u540E\u751F\u6548\u3002", "Marcas borradas. Guarda la nota para conservar el cambio.", "Marques effac\xE9es. Enregistrez la note pour garder ce changement.", "Markierungen gel\xF6scht. Die \xC4nderung durch Speichern \xFCbernehmen.", "\u5370\u3092\u6D88\u3057\u307E\u3057\u305F\u3002\u5909\u66F4\u3092\u6B8B\u3059\u306B\u306F\u30E1\u30E2\u3092\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0645\u064F\u0633\u062D\u062A \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A. \u0627\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0647\u0630\u0627 \u0627\u0644\u062A\u063A\u064A\u064A\u0631."],
  "marksEmpty": ["There are no marks to remove.", "\u8FD8\u6CA1\u6709\u6807\u8BB0\u3002", "No hay marcas que borrar.", "Il n\u2019y a aucune marque \xE0 effacer.", "Keine Markierungen vorhanden.", "\u6D88\u3059\u5370\u306F\u3042\u308A\u307E\u305B\u3093\u3002", "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0644\u0627\u0645\u0627\u062A \u0644\u0645\u0633\u062D\u0647\u0627."],
  "annotationLimit": ["Too many marks. Remove a few before adding more.", "\u6807\u8BB0\u592A\u591A\u4E86\uFF0C\u5148\u6E05\u6389\u4E00\u4E9B\u518D\u7EE7\u7EED\u3002", "Hay demasiadas marcas. Borra algunas antes de seguir.", "Il y a trop de marques. Effacez-en quelques-unes pour continuer.", "Zu viele Markierungen. Zuerst einige entfernen.", "\u5370\u304C\u591A\u3059\u304E\u307E\u3059\u3002\u3044\u304F\u3064\u304B\u6D88\u3057\u3066\u304B\u3089\u7D9A\u3051\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0643\u062B\u064A\u0631\u0629. \u0627\u0645\u0633\u062D \u0628\u0639\u0636\u0647\u0627 \u0642\u0628\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0632\u064A\u062F."],
  "penHint": ["Draw on the article. Choose Pen again to stop drawing.", "\u76F4\u63A5\u5728\u6B63\u6587\u4E0A\u753B\u3002\u518D\u70B9\u4E00\u6B21\u201C\u753B\u7B14\u201D\u5C31\u80FD\u9000\u51FA\u3002", "Dibuja sobre el art\xEDculo. Pulsa L\xE1piz otra vez para salir.", "Dessinez sur l\u2019article. Cliquez \xE0 nouveau sur Stylo pour arr\xEAter.", "Direkt auf dem Artikel zeichnen. Zum Beenden erneut Stift w\xE4hlen.", "\u672C\u6587\u306E\u4E0A\u306B\u63CF\u3051\u307E\u3059\u3002\u3082\u3046\u4E00\u5EA6\u300C\u30DA\u30F3\u300D\u3092\u62BC\u3059\u3068\u7D42\u4E86\u3057\u307E\u3059\u3002", "\u0627\u0631\u0633\u0645 \u0641\u0648\u0642 \u0627\u0644\u0645\u0642\u0627\u0644. \u0627\u0636\u063A\u0637 \u0627\u0644\u0642\u0644\u0645 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0644\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0631\u0633\u0645."],
  "markAdded": ["Mark added. Save the note to keep it.", "\u5DF2\u52A0\u4E0A\u6807\u8BB0\uFF0C\u8BB0\u5F97\u4FDD\u5B58\u3002", "Marca a\xF1adida. Guarda la nota para conservarla.", "Marque ajout\xE9e. Enregistrez la note pour la garder.", "Markierung hinzugef\xFCgt. Zum Behalten die Notiz speichern.", "\u5370\u3092\u4ED8\u3051\u307E\u3057\u305F\u3002\u6B8B\u3059\u306B\u306F\u30E1\u30E2\u3092\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0623\u064F\u0636\u064A\u0641\u062A \u0627\u0644\u0639\u0644\u0627\u0645\u0629. \u0627\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0647\u0627."],
  "undoDone": ["Last mark removed.", "\u5DF2\u64A4\u9500\u4E0A\u4E00\u6B21\u6807\u8BB0\u3002", "\xDAltima marca deshecha.", "Derni\xE8re marque annul\xE9e.", "Letzte Markierung entfernt.", "\u6700\u5F8C\u306E\u5370\u3092\u53D6\u308A\u6D88\u3057\u307E\u3057\u305F\u3002", "\u062D\u064F\u0630\u0641\u062A \u0622\u062E\u0631 \u0639\u0644\u0627\u0645\u0629."],
  "clearMarksConfirm": ["Remove all marks from this article? You can keep the change by saving afterward.", "\u6E05\u9664\u8FD9\u7BC7\u6587\u7AE0\u7684\u5168\u90E8\u6807\u8BB0\uFF1F\u4FDD\u5B58\u540E\u4F1A\u66FF\u6362\u539F\u6765\u7684\u6807\u8BB0\u3002", "\xBFBorrar todas las marcas de este art\xEDculo? Guarda despu\xE9s para conservar el cambio.", "Effacer toutes les marques de cet article ? Enregistrez ensuite pour garder ce changement.", "Alle Markierungen dieses Artikels entfernen? Danach speichern, um die \xC4nderung zu behalten.", "\u3053\u306E\u8A18\u4E8B\u306E\u5370\u3092\u3059\u3079\u3066\u6D88\u3057\u307E\u3059\u304B\uFF1F\u305D\u306E\u5F8C\u306B\u4FDD\u5B58\u3059\u308B\u3068\u5909\u66F4\u304C\u6B8B\u308A\u307E\u3059\u3002", "\u0647\u0644 \u062A\u0631\u064A\u062F \u0645\u0633\u062D \u0643\u0644 \u0639\u0644\u0627\u0645\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0644\u061F \u0627\u062D\u0641\u0638 \u0628\u0639\u062F \u0630\u0644\u0643 \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631."],
  "organizeEmpty": ["There is no text to turn into notes.", "\u6CA1\u6709\u53EF\u6574\u7406\u7684\u6B63\u6587\u3002", "No hay texto para crear notas.", "Aucun texte \xE0 utiliser pour les notes.", "Kein Text f\xFCr Notizen vorhanden.", "\u30E1\u30E2\u306B\u3067\u304D\u308B\u672C\u6587\u304C\u3042\u308A\u307E\u305B\u3093\u3002", "\u0644\u0627 \u064A\u0648\u062C\u062F \u0646\u0635 \u0644\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A."],
  "notesAppended": ["Excerpts added below your existing notes. Save when you are ready.", "\u5DF2\u52A0\u5728\u539F\u6709\u7B14\u8BB0\u540E\u9762\uFF0C\u8BB0\u5F97\u4FDD\u5B58\u3002", "Extractos a\xF1adidos al final de tus notas. Guarda cuando termines.", "Extraits ajout\xE9s \xE0 la suite de vos notes. Enregistrez quand vous avez termin\xE9.", "Ausz\xFCge an die vorhandenen Notizen angeh\xE4ngt. Bei Bedarf speichern.", "\u4ECA\u306E\u30E1\u30E2\u306E\u672B\u5C3E\u306B\u8FFD\u52A0\u3057\u307E\u3057\u305F\u3002\u7D42\u308F\u3063\u305F\u3089\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0623\u064F\u0636\u064A\u0641\u062A \u0627\u0644\u0645\u0642\u062A\u0637\u0641\u0627\u062A \u0628\u0639\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u0627\u062D\u0641\u0638 \u0639\u0646\u062F \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621."],
  "notesTooLong": ["There is not enough room in this note. Remove some text before adding these excerpts.", "\u7B14\u8BB0\u5FEB\u5199\u6EE1\u4E86\uFF0C\u8BF7\u5148\u5220\u6389\u4E00\u4E9B\u5185\u5BB9\u518D\u52A0\u5165\u6458\u5F55\u3002", "No queda espacio en la nota. Borra algo de texto antes de a\xF1adir los extractos.", "Cette note est trop longue. Retirez du texte avant d\u2019ajouter les extraits.", "Die Notiz ist zu lang. Vor dem Hinzuf\xFCgen etwas Text entfernen.", "\u30E1\u30E2\u304C\u9577\u3059\u304E\u307E\u3059\u3002\u5C11\u3057\u524A\u3063\u3066\u304B\u3089\u629C\u7C8B\u3092\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0637\u0648\u064A\u0644\u0629 \u062C\u062F\u064B\u0627. \u0627\u062D\u0630\u0641 \u0628\u0639\u0636 \u0627\u0644\u0646\u0635 \u0642\u0628\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0642\u062A\u0637\u0641\u0627\u062A."],
  "markTools": ["Mark up this article", "\u5728\u6587\u7AE0\u4E0A\u505A\u6807\u8BB0", "Marcar este art\xEDculo", "Marquer cet article", "Artikel markieren", "\u8A18\u4E8B\u306B\u5370\u3092\u4ED8\u3051\u308B", "\u0648\u0636\u0639 \u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0644"],
  "mdMarks": ["Marked passages", "\u5212\u51FA\u7684\u91CD\u70B9", "Pasajes marcados", "Passages marqu\xE9s", "Markierte Stellen", "\u5370\u3092\u4ED8\u3051\u305F\u6587\u7AE0", "\u0627\u0644\u0641\u0642\u0631\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629"],
  "markInArticle": ["Mark these in the article", "\u5728\u539F\u6587\u6807\u8BB0", "Marcar en el art\xEDculo", "Marquer dans l\u2019article", "Im Artikel markieren", "\u672C\u6587\u306B\u5370\u3092\u4ED8\u3051\u308B", "\u062A\u0645\u064A\u064A\u0632\u0647\u0627 \u0641\u064A \u0627\u0644\u0645\u0642\u0627\u0644"],
  "autoMarked": ["Marked {count} passages. Save the note to keep them.", "\u5DF2\u6807\u51FA {count} \u5904\uFF0C\u8BB0\u5F97\u4FDD\u5B58\u3002", "Se marcaron {count} pasajes. Guarda la nota para conservarlos.", "{count} passages marqu\xE9s. Enregistrez la note pour les garder.", "{count} Stellen markiert. Zum Behalten die Notiz speichern.", "{count} \u304B\u6240\u306B\u5370\u3092\u4ED8\u3051\u307E\u3057\u305F\u3002\u6B8B\u3059\u306B\u306F\u30E1\u30E2\u3092\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002", "\u062D\u064F\u062F\u0651\u062F\u062A {count} \u0641\u0642\u0631\u0627\u062A. \u0627\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0647\u0627."]
};
var TRANSLATIONS = Object.freeze(Object.fromEntries(SUPPORTED_LANGUAGES.map((locale, index) => [locale, Object.freeze(Object.fromEntries(Object.entries(rows).map(([key, values]) => [key, values[index]])))])));
function resolveLanguage(preferences) {
  const list = Array.isArray(preferences) ? preferences : [preferences];
  for (const value of list) {
    if (typeof value !== "string") continue;
    const code = value.trim().replace(/_/g, "-").toLowerCase();
    if (code === "zh" || code.startsWith("zh-")) return "zh-CN";
    const match = SUPPORTED_LANGUAGES.find((locale) => locale.toLowerCase() === code || locale === code.split("-")[0]);
    if (match) return match;
  }
  return "en";
}
function t(locale, key, params = {}) {
  const resolved = resolveLanguage(locale);
  const text = TRANSLATIONS[resolved][key] ?? TRANSLATIONS.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
}
function formatNumber(locale, number) {
  return new Intl.NumberFormat(resolveLanguage(locale)).format(Number.isFinite(Number(number)) ? Number(number) : 0);
}
function formatDate(locale, value) {
  const date = new Date(value);
  return Number.isFinite(date.valueOf()) ? new Intl.DateTimeFormat(resolveLanguage(locale), { dateStyle: "medium" }).format(date) : "";
}
function formatMinutes(locale, value) {
  const minutes = Math.max(1, Math.round(Number(value) || 1));
  return new Intl.NumberFormat(resolveLanguage(locale), { style: "unit", unit: "minute", unitDisplay: "short" }).format(minutes);
}
function translateDocument(document2, locale) {
  document2.documentElement.lang = resolveLanguage(locale);
  document2.documentElement.dir = resolveLanguage(locale) === "ar" ? "rtl" : "ltr";
  for (const [attribute, target] of [["data-i18n", "textContent"], ["data-i18n-placeholder", "placeholder"], ["data-i18n-label", "aria-label"], ["data-i18n-title", "title"]]) {
    for (const element of document2.querySelectorAll(`[${attribute}]`)) {
      const value = t(locale, element.getAttribute(attribute));
      if (target === "textContent") element.textContent = value;
      else element.setAttribute(target, value);
    }
  }
}
function localizeMessage(locale, message, fallback = "captureError") {
  const text = String(message || "");
  const known = Object.entries(TRANSLATIONS).flatMap(([, entries]) => Object.entries(entries)).find(([, value]) => value === text);
  if (known) return t(locale, known[0]);
  if (Object.hasOwn(TRANSLATIONS.en, text)) return t(locale, text);
  if (/仅保存文字和安全链接/.test(text)) return t(locale, "textOnly");
  if (/查询参数、片段与登录凭据/.test(text)) return t(locale, "sourceCleaned");
  if (/这是内置示例/.test(text)) return t(locale, "demoWarning");
  if (/20 MB/.test(text)) return t(locale, "backupLarge");
  if (/100/.test(text)) return t(locale, "limitNotes");
  if (fallback.startsWith("backup") && /[\u3400-\u9fff]/.test(text)) return t(locale, fallback);
  if (/表单或可编辑/.test(text)) return t(locale, "captureEditable");
  if (/至少选中 8/.test(text)) return t(locale, "captureShort");
  if (/太大|过大|过长|太多|复杂/.test(text)) return t(locale, "captureLarge");
  if (/临时存储空间不足/.test(text)) return t(locale, "captureStorage");
  if (/没有找到|没有可读取|未能识别|没有识别|正文太短/.test(text)) return t(locale, "captureEmpty");
  if (/[\u3400-\u9fff]/.test(text)) return t(locale, fallback);
  return text || t(locale, fallback);
}

// src/markup.js
var ANNOTATION_LIMITS = Object.freeze({
  text: 100,
  pen: 50,
  points: 500,
  exact: 1e4,
  total: 150,
  documentText: 18e4,
  documentNodes: 25e3
});
var ANNOTATION_STYLES = Object.freeze(["highlight", "underline", "wavy"]);
var STYLES = new Set(ANNOTATION_STYLES);
var OWN_ATTRIBUTE = "data-pageleaf-annotation";
var PROTECTED_TAGS = /* @__PURE__ */ new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEXTAREA",
  "INPUT",
  "SELECT",
  "OPTION",
  "BUTTON",
  "FORM",
  "NAV",
  "ASIDE",
  "IFRAME",
  "OBJECT",
  "EMBED",
  "SVG",
  "MATH",
  "CANVAS"
]);
var PROTECTED_ROLES = /* @__PURE__ */ new Set(["button", "textbox", "combobox", "listbox", "menu", "slider", "spinbutton"]);
var isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var isRoot = (root2) => root2?.nodeType === 1 && root2.ownerDocument?.createTreeWalker;
function protectedText(node, root2) {
  for (let parent = node.parentElement; parent; parent = parent.parentElement) {
    if (PROTECTED_TAGS.has(parent.tagName) || PROTECTED_ROLES.has(parent.getAttribute("role"))) return true;
    const editable = parent.getAttribute("contenteditable");
    if (editable !== null && editable.toLowerCase() !== "false") return true;
    if (parent.hidden || parent.getAttribute("aria-hidden") === "true") return true;
    if (parent === root2) break;
  }
  for (let parent = root2.parentElement; parent; parent = parent.parentElement) {
    const editable = parent.getAttribute("contenteditable");
    if (editable !== null && editable.toLowerCase() !== "false") return true;
  }
  return false;
}
function sourceInfo(source) {
  if (source === void 0) return { text: null, nodes: null };
  if (typeof source === "string") return source.length <= ANNOTATION_LIMITS.documentText ? { text: source, nodes: null } : null;
  if (!isRoot(source)) return null;
  const text = source.textContent || "";
  if (text.length > ANNOTATION_LIMITS.documentText) return null;
  const walker = source.ownerDocument.createTreeWalker(
    source,
    4
    /* SHOW_TEXT */
  );
  const nodes = [];
  let offset = 0;
  let node;
  while (node = walker.nextNode()) {
    if (nodes.length >= ANNOTATION_LIMITS.documentNodes) return null;
    const end = offset + node.data.length;
    nodes.push({ node, start: offset, end, protected: protectedText(node, source) });
    offset = end;
  }
  return { text, nodes };
}
function splitsSurrogate(text, offset) {
  if (offset <= 0 || offset >= text.length) return false;
  const before = text.charCodeAt(offset - 1), after = text.charCodeAt(offset);
  return before >= 55296 && before <= 56319 && after >= 56320 && after <= 57343;
}
function normalizeText(value, info) {
  if (!info || !STYLES.has(value.style) || !Number.isSafeInteger(value.start) || !Number.isSafeInteger(value.end)) return null;
  const { start, end, exact, style } = value;
  if (start < 0 || end <= start || end > ANNOTATION_LIMITS.documentText || end - start > ANNOTATION_LIMITS.exact) return null;
  if (typeof exact !== "string" || exact.length !== end - start || !/\S/u.test(exact)) return null;
  if (info.text !== null && (end > info.text.length || info.text.slice(start, end) !== exact || splitsSurrogate(info.text, start) || splitsSurrogate(info.text, end))) return null;
  if (info.nodes?.some((item) => item.protected && item.start < end && item.end > start)) return null;
  return { type: "text", style, start, end, exact };
}
function normalizePen(value) {
  if (!Array.isArray(value.points) || value.points.length < 2 || value.points.length > ANNOTATION_LIMITS.points) return null;
  const points = [];
  for (const pair of value.points) {
    if (!Array.isArray(pair) || pair.length !== 2 || pair.some((number) => typeof number !== "number" || !Number.isFinite(number) || number < 0 || number > 1)) return null;
    points.push([pair[0], pair[1]]);
  }
  return { type: "pen", points };
}
function normalizeAnnotations(value, source) {
  if (!Array.isArray(value)) return [];
  const info = sourceInfo(source);
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  let textCount = 0, penCount = 0;
  for (const entry of value.slice(0, ANNOTATION_LIMITS.total)) {
    if (!isRecord(entry)) continue;
    let clean;
    if (entry.type === "text" && textCount < ANNOTATION_LIMITS.text) clean = normalizeText(entry, info);
    else if (entry.type === "pen" && penCount < ANNOTATION_LIMITS.pen) clean = normalizePen(entry);
    if (!clean) continue;
    const key = JSON.stringify(clean);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(clean);
    if (clean.type === "text") textCount += 1;
    else penCount += 1;
  }
  return result;
}
var validateAnnotations = normalizeAnnotations;
function containsPoint(root2, node) {
  return node === root2 || root2.contains(node);
}
function offsetAt(root2, container, offset) {
  const prefix = root2.ownerDocument.createRange();
  prefix.selectNodeContents(root2);
  prefix.setEnd(container, offset);
  return prefix.toString().length;
}
function getSelectionAnnotation(root2, selection, style) {
  if (!isRoot(root2) || !STYLES.has(style) || !selection || selection.rangeCount !== 1 || selection.isCollapsed) return null;
  try {
    const range = selection.getRangeAt(0);
    if (range.collapsed || !containsPoint(root2, range.startContainer) || !containsPoint(root2, range.endContainer)) return null;
    const info = sourceInfo(root2);
    if (!info) return null;
    const start = offsetAt(root2, range.startContainer, range.startOffset);
    const end = offsetAt(root2, range.endContainer, range.endOffset);
    return normalizeText({ type: "text", style, start, end, exact: info.text.slice(start, end) }, info);
  } catch {
    return null;
  }
}
function unwrap(root2) {
  for (const element of [...root2.querySelectorAll(`[${OWN_ATTRIBUTE}]`)].reverse()) {
    const fragment = root2.ownerDocument.createDocumentFragment();
    while (element.firstChild) fragment.appendChild(element.firstChild);
    element.replaceWith(fragment);
  }
  root2.normalize();
}
function renderAnnotations(root2, annotations, document2 = root2?.ownerDocument) {
  if (!isRoot(root2) || document2 !== root2.ownerDocument || !document2?.createElement) return 0;
  unwrap(root2);
  const info = sourceInfo(root2);
  if (!info) return 0;
  const textAnnotations = normalizeAnnotations(annotations, root2).filter((entry) => entry.type === "text");
  for (const item of info.nodes) {
    if (item.protected || item.start === item.end) continue;
    const matching = textAnnotations.filter((entry) => entry.start < item.end && entry.end > item.start);
    if (!matching.length) continue;
    const cuts = [.../* @__PURE__ */ new Set([item.start, item.end, ...matching.flatMap((entry) => [Math.max(item.start, entry.start), Math.min(item.end, entry.end)])])].sort((a, b) => a - b);
    const fragment = document2.createDocumentFragment();
    for (let index = 0; index < cuts.length - 1; index += 1) {
      const start = cuts[index], end = cuts[index + 1];
      let segment = document2.createTextNode(item.node.data.slice(start - item.start, end - item.start));
      const styles = new Set(matching.filter((entry) => entry.start <= start && entry.end >= end).map((entry) => entry.style));
      for (const style of ANNOTATION_STYLES) {
        if (!styles.has(style)) continue;
        const wrapper = document2.createElement(style === "highlight" ? "mark" : "span");
        wrapper.setAttribute(OWN_ATTRIBUTE, style);
        wrapper.className = `annotation-${style}`;
        wrapper.appendChild(segment);
        segment = wrapper;
      }
      fragment.appendChild(segment);
    }
    item.node.replaceWith(fragment);
  }
  return textAnnotations.length;
}

// src/notes.js
function escapeMetadata(value) {
  return String(value || "").replace(/\s+/g, " ").trim().replace(/[\\`*_{}[\]#!|]/g, "\\$&").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function buildMarkdown(article2, note = "", { locale = "en" } = {}) {
  article2 = article2 && typeof article2 === "object" ? article2 : {};
  const title = escapeMetadata(article2.title || t(locale, "mdUntitled"));
  const parts = [`# ${title}`];
  const source = safeHttpURL(article2.url);
  if (source) parts.push(`${t(locale, "mdSource")}: <${source}>`);
  if (article2.author) parts.push(`${t(locale, "mdAuthor")}: ${escapeMetadata(article2.author)}`);
  const time = new Date(article2.capturedAt);
  if (!Number.isNaN(time.valueOf()))
    parts.push(`${t(locale, "mdCaptured")}: ${time.toISOString()}`);
  const personalNote = typeof note === "string" ? note.trim() : "";
  if (personalNote) parts.push(`## ${t(locale, "mdNotes")}

${personalNote}`);
  const marked = [...new Set(validateAnnotations(article2.annotations).filter((item) => item.type === "text").map((item) => item.exact))];
  if (marked.length) parts.push(`## ${t(locale, "mdMarks")}

${marked.map((text) => `> ${escapeMetadata(text)}`).join("\n\n")}`);
  const markdown = typeof article2.markdown === "string" ? article2.markdown.trim() : "";
  parts.push(`## ${t(locale, "mdArticle")}

${markdown}`);
  return `${parts.join("\n\n")}
`;
}
function noteFilename(title) {
  return `${String(title || "pageleaf-note").normalize("NFKC").replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, "-").replace(/[. ]+$/g, "").slice(0, 90) || "pageleaf-note"}.md`;
}
function searchNotes(notes2, query) {
  const needle = query.trim().toLocaleLowerCase();
  return notes2.filter(
    (note) => !needle || [note.title, note.url, note.note, note.textContent, note.markdown].some(
      (x) => String(x || "").toLocaleLowerCase().includes(needle)
    )
  ).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

// node_modules/turndown/lib/turndown.browser.es.js
function extend(destination) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) destination[key] = source[key];
    }
  }
  return destination;
}
function repeat(character, count) {
  return Array(count + 1).join(character);
}
function trimLeadingNewlines(string) {
  return string.replace(/^\n*/, "");
}
function trimTrailingNewlines(string) {
  var indexEnd = string.length;
  while (indexEnd > 0 && string[indexEnd - 1] === "\n") indexEnd--;
  return string.substring(0, indexEnd);
}
function trimNewlines(string) {
  return trimTrailingNewlines(trimLeadingNewlines(string));
}
var blockElements = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
function isBlock(node) {
  return is(node, blockElements);
}
var voidElements = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
function isVoid(node) {
  return is(node, voidElements);
}
function hasVoid(node) {
  return has(node, voidElements);
}
var meaningfulWhenBlankElements = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
function isMeaningfulWhenBlank(node) {
  return is(node, meaningfulWhenBlankElements);
}
function hasMeaningfulWhenBlank(node) {
  return has(node, meaningfulWhenBlankElements);
}
function is(node, tagNames) {
  return tagNames.indexOf(node.nodeName) >= 0;
}
function has(node, tagNames) {
  return node.getElementsByTagName && tagNames.some(function(tagName) {
    return node.getElementsByTagName(tagName).length;
  });
}
var markdownEscapes = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
function escapeMarkdown(string) {
  return markdownEscapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], escape[1]);
  }, string);
}
var rules = {};
rules.paragraph = {
  filter: "p",
  replacement: function(content) {
    return "\n\n" + content + "\n\n";
  }
};
rules.lineBreak = {
  filter: "br",
  replacement: function(content, node, options) {
    return options.br + "\n";
  }
};
rules.heading = {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: function(content, node, options) {
    var hLevel = Number(node.nodeName.charAt(1));
    if (options.headingStyle === "setext" && hLevel < 3) {
      var underline = repeat(hLevel === 1 ? "=" : "-", content.length);
      return "\n\n" + content + "\n" + underline + "\n\n";
    } else {
      return "\n\n" + repeat("#", hLevel) + " " + content + "\n\n";
    }
  }
};
rules.blockquote = {
  filter: "blockquote",
  replacement: function(content) {
    content = trimNewlines(content).replace(/^/gm, "> ");
    return "\n\n" + content + "\n\n";
  }
};
rules.list = {
  filter: ["ul", "ol"],
  replacement: function(content, node) {
    var parent = node.parentNode;
    if (parent.nodeName === "LI" && parent.lastElementChild === node) {
      return "\n" + content;
    } else {
      return "\n\n" + content + "\n\n";
    }
  }
};
rules.listItem = {
  filter: "li",
  replacement: function(content, node, options) {
    var prefix = options.bulletListMarker + "   ";
    var parent = node.parentNode;
    if (parent.nodeName === "OL") {
      var start = parent.getAttribute("start");
      var index = Array.prototype.indexOf.call(parent.children, node);
      prefix = (start ? Number(start) + index : index + 1) + ".  ";
    }
    var isParagraph = /\n$/.test(content);
    content = trimNewlines(content) + (isParagraph ? "\n" : "");
    content = content.replace(/\n/gm, "\n" + " ".repeat(prefix.length));
    return prefix + content + (node.nextSibling ? "\n" : "");
  }
};
rules.indentedCodeBlock = {
  filter: function(node, options) {
    return options.codeBlockStyle === "indented" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
  },
  replacement: function(content, node, options) {
    return "\n\n    " + node.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n";
  }
};
rules.fencedCodeBlock = {
  filter: function(node, options) {
    return options.codeBlockStyle === "fenced" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
  },
  replacement: function(content, node, options) {
    var className = node.firstChild.getAttribute("class") || "";
    var language = (className.match(/language-(\S+)/) || [null, ""])[1];
    var code = node.firstChild.textContent;
    var fenceChar = options.fence.charAt(0);
    var fenceSize = 3;
    var fenceInCodeRegex = new RegExp("^" + fenceChar + "{3,}", "gm");
    var match;
    while (match = fenceInCodeRegex.exec(code)) {
      if (match[0].length >= fenceSize) {
        fenceSize = match[0].length + 1;
      }
    }
    var fence = repeat(fenceChar, fenceSize);
    return "\n\n" + fence + language + "\n" + code.replace(/\n$/, "") + "\n" + fence + "\n\n";
  }
};
rules.horizontalRule = {
  filter: "hr",
  replacement: function(content, node, options) {
    return "\n\n" + options.hr + "\n\n";
  }
};
rules.inlineLink = {
  filter: function(node, options) {
    return options.linkStyle === "inlined" && node.nodeName === "A" && node.getAttribute("href");
  },
  replacement: function(content, node) {
    var href = escapeLinkDestination(node.getAttribute("href"));
    var title = escapeLinkTitle(cleanAttribute(node.getAttribute("title")));
    var titlePart = title ? ' "' + title + '"' : "";
    return "[" + content + "](" + href + titlePart + ")";
  }
};
rules.referenceLink = {
  filter: function(node, options) {
    return options.linkStyle === "referenced" && node.nodeName === "A" && node.getAttribute("href");
  },
  replacement: function(content, node, options) {
    var href = escapeLinkDestination(node.getAttribute("href"));
    var title = cleanAttribute(node.getAttribute("title"));
    if (title) title = ' "' + escapeLinkTitle(title) + '"';
    var replacement;
    var reference;
    switch (options.linkReferenceStyle) {
      case "collapsed":
        replacement = "[" + content + "][]";
        reference = "[" + content + "]: " + href + title;
        break;
      case "shortcut":
        replacement = "[" + content + "]";
        reference = "[" + content + "]: " + href + title;
        break;
      default:
        var id = this.references.length + 1;
        replacement = "[" + content + "][" + id + "]";
        reference = "[" + id + "]: " + href + title;
    }
    this.references.push(reference);
    return replacement;
  },
  references: [],
  append: function(options) {
    var references = "";
    if (this.references.length) {
      references = "\n\n" + this.references.join("\n") + "\n\n";
      this.references = [];
    }
    return references;
  }
};
rules.emphasis = {
  filter: ["em", "i"],
  replacement: function(content, node, options) {
    if (!content.trim()) return "";
    return options.emDelimiter + content + options.emDelimiter;
  }
};
rules.strong = {
  filter: ["strong", "b"],
  replacement: function(content, node, options) {
    if (!content.trim()) return "";
    return options.strongDelimiter + content + options.strongDelimiter;
  }
};
rules.code = {
  filter: function(node) {
    var hasSiblings = node.previousSibling || node.nextSibling;
    var isCodeBlock = node.parentNode.nodeName === "PRE" && !hasSiblings;
    return node.nodeName === "CODE" && !isCodeBlock;
  },
  replacement: function(content) {
    if (!content) return "";
    content = content.replace(/\r?\n|\r/g, " ");
    var extraSpace = /^`|^ .*?[^ ].* $|`$/.test(content) ? " " : "";
    var delimiter = "`";
    var matches = content.match(/`+/gm) || [];
    while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + "`";
    return delimiter + extraSpace + content + extraSpace + delimiter;
  }
};
rules.image = {
  filter: "img",
  replacement: function(content, node) {
    var alt = escapeMarkdown(cleanAttribute(node.getAttribute("alt")));
    var src = escapeLinkDestination(node.getAttribute("src") || "");
    var title = cleanAttribute(node.getAttribute("title"));
    var titlePart = title ? ' "' + escapeLinkTitle(title) + '"' : "";
    return src ? "![" + alt + "](" + src + titlePart + ")" : "";
  }
};
function cleanAttribute(attribute) {
  return attribute ? attribute.replace(/(\n+\s*)+/g, "\n") : "";
}
function escapeLinkDestination(destination) {
  var escaped = destination.replace(/([<>()])/g, "\\$1");
  return escaped.indexOf(" ") >= 0 ? "<" + escaped + ">" : escaped;
}
function escapeLinkTitle(title) {
  return title.replace(/"/g, '\\"');
}
function Rules(options) {
  this.options = options;
  this._keep = [];
  this._remove = [];
  this.blankRule = {
    replacement: options.blankReplacement
  };
  this.keepReplacement = options.keepReplacement;
  this.defaultRule = {
    replacement: options.defaultReplacement
  };
  this.array = [];
  for (var key in options.rules) this.array.push(options.rules[key]);
}
Rules.prototype = {
  add: function(key, rule) {
    this.array.unshift(rule);
  },
  keep: function(filter) {
    this._keep.unshift({
      filter,
      replacement: this.keepReplacement
    });
  },
  remove: function(filter) {
    this._remove.unshift({
      filter,
      replacement: function() {
        return "";
      }
    });
  },
  forNode: function(node) {
    if (node.isBlank) return this.blankRule;
    var rule;
    if (rule = findRule(this.array, node, this.options)) return rule;
    if (rule = findRule(this._keep, node, this.options)) return rule;
    if (rule = findRule(this._remove, node, this.options)) return rule;
    return this.defaultRule;
  },
  forEach: function(fn) {
    for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
  }
};
function findRule(rules3, node, options) {
  for (var i = 0; i < rules3.length; i++) {
    var rule = rules3[i];
    if (filterValue(rule, node, options)) return rule;
  }
  return void 0;
}
function filterValue(rule, node, options) {
  var filter = rule.filter;
  if (typeof filter === "string") {
    if (filter === node.nodeName.toLowerCase()) return true;
  } else if (Array.isArray(filter)) {
    if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true;
  } else if (typeof filter === "function") {
    if (filter.call(rule, node, options)) return true;
  } else {
    throw new TypeError("`filter` needs to be a string, array, or function");
  }
}
function collapseWhitespace(options) {
  var element = options.element;
  var isBlock2 = options.isBlock;
  var isVoid2 = options.isVoid;
  var isPre = options.isPre || function(node2) {
    return node2.nodeName === "PRE";
  };
  if (!element.firstChild || isPre(element)) return;
  var prevText = null;
  var keepLeadingWs = false;
  var prev = null;
  var node = next(prev, element, isPre);
  while (node !== element) {
    if (node.nodeType === 3 || node.nodeType === 4) {
      var text = node.data.replace(/[ \r\n\t]+/g, " ");
      if ((!prevText || / $/.test(prevText.data)) && !keepLeadingWs && text[0] === " ") {
        text = text.substr(1);
      }
      if (!text) {
        node = remove(node);
        continue;
      }
      node.data = text;
      prevText = node;
    } else if (node.nodeType === 1) {
      if (isBlock2(node) || node.nodeName === "BR") {
        if (prevText) {
          prevText.data = prevText.data.replace(/ $/, "");
        }
        prevText = null;
        keepLeadingWs = false;
      } else if (isVoid2(node) || isPre(node)) {
        prevText = null;
        keepLeadingWs = true;
      } else if (prevText) {
        keepLeadingWs = false;
      }
    } else {
      node = remove(node);
      continue;
    }
    var nextNode = next(prev, node, isPre);
    prev = node;
    node = nextNode;
  }
  if (prevText) {
    prevText.data = prevText.data.replace(/ $/, "");
    if (!prevText.data) {
      remove(prevText);
    }
  }
}
function remove(node) {
  var next2 = node.nextSibling || node.parentNode;
  node.parentNode.removeChild(node);
  return next2;
}
function next(prev, current, isPre) {
  if (prev && prev.parentNode === current || isPre(current)) {
    return current.nextSibling || current.parentNode;
  }
  return current.firstChild || current.nextSibling || current.parentNode;
}
var root = typeof window !== "undefined" ? window : {};
function canParseHTMLNatively() {
  var Parser = root.DOMParser;
  var canParse = false;
  try {
    if (new Parser().parseFromString("", "text/html")) {
      canParse = true;
    }
  } catch (e) {
  }
  return canParse;
}
function createHTMLParser() {
  var Parser = function() {
  };
  {
    if (shouldUseActiveX()) {
      Parser.prototype.parseFromString = function(string) {
        var doc = new window.ActiveXObject("htmlfile");
        doc.designMode = "on";
        doc.open();
        doc.write(string);
        doc.close();
        return doc;
      };
    } else {
      Parser.prototype.parseFromString = function(string) {
        var doc = document.implementation.createHTMLDocument("");
        doc.open();
        doc.write(string);
        doc.close();
        return doc;
      };
    }
  }
  return Parser;
}
function shouldUseActiveX() {
  var useActiveX = false;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch (e) {
    if (root.ActiveXObject) useActiveX = true;
  }
  return useActiveX;
}
var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();
function RootNode(input, options) {
  var root2;
  if (typeof input === "string") {
    var doc = htmlParser().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + input + "</x-turndown>",
      "text/html"
    );
    root2 = doc.getElementById("turndown-root");
  } else {
    root2 = input.cloneNode(true);
  }
  collapseWhitespace({
    element: root2,
    isBlock,
    isVoid,
    isPre: options.preformattedCode ? isPreOrCode : null
  });
  return root2;
}
var _htmlParser;
function htmlParser() {
  _htmlParser = _htmlParser || new HTMLParser();
  return _htmlParser;
}
function isPreOrCode(node) {
  return node.nodeName === "PRE" || node.nodeName === "CODE";
}
function Node(node, options) {
  node.isBlock = isBlock(node);
  node.isCode = node.nodeName === "CODE" || node.parentNode.isCode;
  node.isBlank = isBlank(node);
  node.flankingWhitespace = flankingWhitespace(node, options);
  return node;
}
function isBlank(node) {
  return !isVoid(node) && !isMeaningfulWhenBlank(node) && /^\s*$/i.test(node.textContent) && !hasVoid(node) && !hasMeaningfulWhenBlank(node);
}
function flankingWhitespace(node, options) {
  if (node.isBlock || options.preformattedCode && node.isCode) {
    return {
      leading: "",
      trailing: ""
    };
  }
  var edges = edgeWhitespace(node.textContent);
  if (edges.leadingAscii && isFlankedByWhitespace("left", node, options)) {
    edges.leading = edges.leadingNonAscii;
  }
  if (edges.trailingAscii && isFlankedByWhitespace("right", node, options)) {
    edges.trailing = edges.trailingNonAscii;
  }
  return {
    leading: edges.leading,
    trailing: edges.trailing
  };
}
function edgeWhitespace(string) {
  var m = string.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return {
    leading: m[1],
    // whole string for whitespace-only strings
    leadingAscii: m[2],
    leadingNonAscii: m[3],
    trailing: m[4],
    // empty for whitespace-only strings
    trailingNonAscii: m[5],
    trailingAscii: m[6]
  };
}
function isFlankedByWhitespace(side, node, options) {
  var sibling;
  var regExp;
  var isFlanked;
  if (side === "left") {
    sibling = node.previousSibling;
    regExp = / $/;
  } else {
    sibling = node.nextSibling;
    regExp = /^ /;
  }
  if (sibling) {
    if (sibling.nodeType === 3) {
      isFlanked = regExp.test(sibling.nodeValue);
    } else if (options.preformattedCode && sibling.nodeName === "CODE") {
      isFlanked = false;
    } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
      isFlanked = regExp.test(sibling.textContent);
    }
  }
  return isFlanked;
}
var reduce = Array.prototype.reduce;
function TurndownService(options) {
  if (!(this instanceof TurndownService)) return new TurndownService(options);
  var defaults = {
    rules,
    headingStyle: "setext",
    hr: "* * *",
    bulletListMarker: "*",
    codeBlockStyle: "indented",
    fence: "```",
    emDelimiter: "_",
    strongDelimiter: "**",
    linkStyle: "inlined",
    linkReferenceStyle: "full",
    br: "  ",
    preformattedCode: false,
    blankReplacement: function(content, node) {
      return node.isBlock ? "\n\n" : "";
    },
    keepReplacement: function(content, node) {
      return node.isBlock ? "\n\n" + node.outerHTML + "\n\n" : node.outerHTML;
    },
    defaultReplacement: function(content, node) {
      return node.isBlock ? "\n\n" + content + "\n\n" : content;
    }
  };
  this.options = extend({}, defaults, options);
  this.rules = new Rules(this.options);
}
TurndownService.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */
  turndown: function(input) {
    if (!canConvert(input)) {
      throw new TypeError(input + " is not a string, or an element/document/fragment node.");
    }
    if (input === "") return "";
    var output = process.call(this, new RootNode(input, this.options));
    return postProcess.call(this, output);
  },
  /**
   * Add one or more plugins
   * @public
   * @param {Function|Array} plugin The plugin or array of plugins to add
   * @returns The Turndown instance for chaining
   * @type Object
   */
  use: function(plugin) {
    if (Array.isArray(plugin)) {
      for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
    } else if (typeof plugin === "function") {
      plugin(this);
    } else {
      throw new TypeError("plugin must be a Function or an Array of Functions");
    }
    return this;
  },
  /**
   * Adds a rule
   * @public
   * @param {String} key The unique key of the rule
   * @param {Object} rule The rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  addRule: function(key, rule) {
    this.rules.add(key, rule);
    return this;
  },
  /**
   * Keep a node (as HTML) that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  keep: function(filter) {
    this.rules.keep(filter);
    return this;
  },
  /**
   * Remove a node that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  remove: function(filter) {
    this.rules.remove(filter);
    return this;
  },
  /**
   * Escapes Markdown syntax
   * @public
   * @param {String} string The string to escape
   * @returns A string with Markdown syntax escaped
   * @type String
   */
  escape: function(string) {
    return escapeMarkdown(string);
  }
};
function process(parentNode) {
  var self = this;
  return reduce.call(parentNode.childNodes, function(output, node) {
    node = new Node(node, self.options);
    var replacement = "";
    if (node.nodeType === 3) {
      replacement = node.isCode ? node.nodeValue : self.escape(node.nodeValue);
    } else if (node.nodeType === 1) {
      replacement = replacementForNode.call(self, node);
    }
    return join(output, replacement);
  }, "");
}
function postProcess(output) {
  var self = this;
  this.rules.forEach(function(rule) {
    if (typeof rule.append === "function") {
      output = join(output, rule.append(self.options));
    }
  });
  return output.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function replacementForNode(node) {
  var rule = this.rules.forNode(node);
  var content = process.call(this, node);
  var whitespace = node.flankingWhitespace;
  if (whitespace.leading || whitespace.trailing) content = content.trim();
  return whitespace.leading + rule.replacement(content, node, this.options) + whitespace.trailing;
}
function join(output, replacement) {
  var s1 = trimTrailingNewlines(output);
  var s2 = trimLeadingNewlines(replacement);
  var nls = Math.max(output.length - s1.length, replacement.length - s2.length);
  var separator = "\n\n".substring(0, nls);
  return s1 + separator + s2;
}
function canConvert(input) {
  return input != null && (typeof input === "string" || input.nodeType && (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11));
}

// node_modules/turndown-plugin-gfm/lib/turndown-plugin-gfm.es.js
var highlightRegExp = /highlight-(?:text|source)-([a-z0-9]+)/;
function highlightedCodeBlock(turndownService) {
  turndownService.addRule("highlightedCodeBlock", {
    filter: function(node) {
      var firstChild = node.firstChild;
      return node.nodeName === "DIV" && highlightRegExp.test(node.className) && firstChild && firstChild.nodeName === "PRE";
    },
    replacement: function(content, node, options) {
      var className = node.className || "";
      var language = (className.match(highlightRegExp) || [null, ""])[1];
      return "\n\n" + options.fence + language + "\n" + node.firstChild.textContent + "\n" + options.fence + "\n\n";
    }
  });
}
function strikethrough(turndownService) {
  turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: function(content) {
      return "~" + content + "~";
    }
  });
}
var indexOf = Array.prototype.indexOf;
var every = Array.prototype.every;
var rules2 = {};
rules2.tableCell = {
  filter: ["th", "td"],
  replacement: function(content, node) {
    return cell(content, node);
  }
};
rules2.tableRow = {
  filter: "tr",
  replacement: function(content, node) {
    var borderCells = "";
    var alignMap = { left: ":--", right: "--:", center: ":-:" };
    if (isHeadingRow(node)) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var border = "---";
        var align = (node.childNodes[i].getAttribute("align") || "").toLowerCase();
        if (align) border = alignMap[align] || border;
        borderCells += cell(border, node.childNodes[i]);
      }
    }
    return "\n" + content + (borderCells ? "\n" + borderCells : "");
  }
};
rules2.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function(node) {
    return node.nodeName === "TABLE" && isHeadingRow(node.rows[0]);
  },
  replacement: function(content) {
    content = content.replace("\n\n", "\n");
    return "\n\n" + content + "\n\n";
  }
};
rules2.tableSection = {
  filter: ["thead", "tbody", "tfoot"],
  replacement: function(content) {
    return content;
  }
};
function isHeadingRow(tr2) {
  var parentNode = tr2.parentNode;
  return parentNode.nodeName === "THEAD" || parentNode.firstChild === tr2 && (parentNode.nodeName === "TABLE" || isFirstTbody(parentNode)) && every.call(tr2.childNodes, function(n) {
    return n.nodeName === "TH";
  });
}
function isFirstTbody(element) {
  var previousSibling = element.previousSibling;
  return element.nodeName === "TBODY" && (!previousSibling || previousSibling.nodeName === "THEAD" && /^\s*$/i.test(previousSibling.textContent));
}
function cell(content, node) {
  var index = indexOf.call(node.parentNode.childNodes, node);
  var prefix = " ";
  if (index === 0) prefix = "| ";
  return prefix + content + " |";
}
function tables(turndownService) {
  turndownService.keep(function(node) {
    return node.nodeName === "TABLE" && !isHeadingRow(node.rows[0]);
  });
  for (var key in rules2) turndownService.addRule(key, rules2[key]);
}
function taskListItems(turndownService) {
  turndownService.addRule("taskListItems", {
    filter: function(node) {
      return node.type === "checkbox" && node.parentNode.nodeName === "LI";
    },
    replacement: function(content, node) {
      return (node.checked ? "[x]" : "[ ]") + " ";
    }
  });
}
function gfm(turndownService) {
  turndownService.use([
    highlightedCodeBlock,
    strikethrough,
    tables,
    taskListItems
  ]);
}

// src/backup.js
var MAX_BACKUP_BYTES = 2e7;
var BACKUP_LIMITS = Object.freeze({
  bytes: MAX_BACKUP_BYTES,
  records: 100,
  noteBytes: 1e6
});
var MARKDOWN_LIMIT = 25e4;
var MODES = /* @__PURE__ */ new Set(["article", "selection", "demo"]);
var ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
var utf8Size = (value) => new TextEncoder().encode(value).byteLength;
var isRecord2 = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
function textField(record, key, limit, { required = false } = {}) {
  const value = Object.hasOwn(record, key) ? record[key] : "";
  if (typeof value !== "string" || value.length > limit)
    throw new Error(`\u5907\u4EFD\u4E2D\u7684 ${key} \u5B57\u6BB5\u65E0\u6548\u6216\u8FC7\u957F\u3002`);
  if (required && !value.trim())
    throw new Error(`\u5907\u4EFD\u7F3A\u5C11\u6709\u6548\u7684 ${key} \u5B57\u6BB5\u3002`);
  return value;
}
function metadata(value) {
  return value.replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g, " ").replace(/\s+/g, " ").trim();
}
function isoDate(record, key, required = true) {
  const value = textField(record, key, 40, { required });
  if (!value && !required) return "";
  const parts = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/
  );
  const date = new Date(value);
  if (!parts || !Number.isFinite(date.valueOf()))
    throw new Error(`\u5907\u4EFD\u4E2D\u7684 ${key} \u65E5\u671F\u65E0\u6548\u3002`);
  const [, year, month, day, hour, minute, second] = parts.map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month < 1 || month > 12 || day < 1 || day > days[month - 1] || hour > 23 || minute > 59 || second > 59)
    throw new Error(`\u5907\u4EFD\u4E2D\u7684 ${key} \u65E5\u671F\u65E0\u6548\u3002`);
  return date.toISOString();
}
function noteFields(record) {
  if (!isRecord2(record)) throw new Error("\u5907\u4EFD\u4E2D\u7684\u7B14\u8BB0\u683C\u5F0F\u65E0\u6548\u3002");
  const id = textField(record, "id", 128, { required: true });
  if (!ID_PATTERN.test(id)) throw new Error("\u5907\u4EFD\u4E2D\u7684\u7B14\u8BB0 ID \u65E0\u6548\u3002");
  const title = metadata(textField(record, "title", 200, { required: true }));
  if (!title) throw new Error("\u5907\u4EFD\u4E2D\u7684\u7B14\u8BB0\u6807\u9898\u65E0\u6548\u3002");
  const mode = textField(record, "mode", 16, { required: true });
  if (!MODES.has(mode)) throw new Error("\u5907\u4EFD\u4E2D\u7684\u7B14\u8BB0\u7C7B\u578B\u65E0\u6548\u3002");
  const fields = {
    id,
    title,
    url: textField(record, "url", 4096),
    siteName: metadata(textField(record, "siteName", 120)),
    author: metadata(textField(record, "author", 120)),
    excerpt: metadata(textField(record, "excerpt", 280)),
    lang: metadata(textField(record, "lang", 32)),
    publishedTime: isoDate(record, "publishedTime", false),
    content: textField(record, "content", CONTENT_LIMITS.inputHTML, {
      required: true
    }),
    markdown: textField(record, "markdown", MARKDOWN_LIMIT),
    textContent: textField(record, "textContent", CONTENT_LIMITS.text),
    note: textField(record, "note", 2e4),
    annotations: validateAnnotations(record.annotations),
    wordCount: 0,
    minutes: 1,
    capturedAt: isoDate(record, "capturedAt"),
    updatedAt: isoDate(record, "updatedAt"),
    mode,
    warnings: []
  };
  for (const key of ["wordCount", "minutes"]) {
    if (Object.hasOwn(record, key)) {
      if (!Number.isSafeInteger(record[key]) || record[key] < 0 || record[key] > CONTENT_LIMITS.text)
        throw new Error(`\u5907\u4EFD\u4E2D\u7684 ${key} \u5B57\u6BB5\u65E0\u6548\u3002`);
      fields[key] = record[key];
    }
  }
  if (Object.hasOwn(record, "warnings")) {
    if (!Array.isArray(record.warnings) || record.warnings.length > 12 || record.warnings.some(
      (value) => typeof value !== "string" || value.length > 500
    ))
      throw new Error("\u5907\u4EFD\u4E2D\u7684\u63D0\u793A\u4FE1\u606F\u65E0\u6548\u3002");
    fields.warnings = record.warnings.map(metadata);
  }
  if (utf8Size(JSON.stringify(fields)) > BACKUP_LIMITS.noteBytes)
    throw new Error("\u5907\u4EFD\u4E2D\u6709\u7B14\u8BB0\u8D85\u8FC7\u5355\u7BC7 1 MB \u4E0A\u9650\uFF0C\u8BF7\u5148\u7F29\u51CF\u5185\u5BB9\u3002");
  return fields;
}
function checkNotes(notes2) {
  if (!Array.isArray(notes2) || notes2.length > BACKUP_LIMITS.records)
    throw new Error("\u5907\u4EFD\u5FC5\u987B\u5305\u542B\u7B14\u8BB0\u5217\u8868\uFF0C\u4E14\u6700\u591A\u4E3A 100 \u7BC7\u3002");
  const ids = /* @__PURE__ */ new Set();
  return notes2.map((note) => {
    const fields = noteFields(note);
    if (ids.has(fields.id))
      throw new Error("\u5907\u4EFD\u4E2D\u5B58\u5728\u91CD\u590D\u7B14\u8BB0 ID\uFF0C\u8BF7\u91CD\u65B0\u5BFC\u51FA\u5907\u4EFD\u3002");
    ids.add(fields.id);
    return fields;
  });
}
function createBackup(notes2) {
  const result = JSON.stringify(
    {
      format: "pageleaf-backup",
      version: 1,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      notes: checkNotes(notes2)
    },
    null,
    2
  );
  if (utf8Size(result) > MAX_BACKUP_BYTES)
    throw new Error(
      "\u7B14\u8BB0\u5E93\u5907\u4EFD\u8D85\u8FC7 20 MB \u4E0A\u9650\uFF0C\u8BF7\u5206\u6279\u5BFC\u51FA Markdown \u540E\u518D\u7F29\u51CF\u7B14\u8BB0\u5E93\u3002"
    );
  return result;
}
function toMarkdown(content, document2) {
  const service = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**"
  });
  service.use(gfm);
  const escape = service.escape.bind(service);
  service.escape = (value) => escape(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const input = document2.createElement("template");
  input.innerHTML = content;
  const container = document2.createElement("div");
  container.appendChild(input.content.cloneNode(true));
  return service.turndown(container).trim();
}
function countWords(text) {
  const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;
  return (text.match(cjk) || []).length + (text.replace(cjk, " ").match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;
}
function parseBackup(json, document2) {
  if (typeof json !== "string") throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684 JSON \u5907\u4EFD\u6587\u4EF6\u3002");
  if (utf8Size(json) > MAX_BACKUP_BYTES)
    throw new Error("\u5907\u4EFD\u6587\u4EF6\u8D85\u8FC7 20 MB \u4E0A\u9650\u3002");
  let envelope;
  try {
    envelope = JSON.parse(json);
  } catch {
    throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u8FD9\u4E2A JSON \u6587\u4EF6\uFF0C\u8BF7\u9009\u62E9\u53F6\u7B3A\u5BFC\u51FA\u7684\u5907\u4EFD\u3002");
  }
  if (!isRecord2(envelope) || envelope.format !== "pageleaf-backup" || envelope.version !== 1)
    throw new Error("\u5907\u4EFD\u683C\u5F0F\u6216\u7248\u672C\u4E0D\u53D7\u652F\u6301\uFF0C\u8BF7\u9009\u62E9\u53F6\u7B3A\u5BFC\u51FA\u7684\u5907\u4EFD\u3002");
  isoDate(envelope, "exportedAt");
  if (!document2?.createElement)
    throw new Error("\u5F53\u524D\u9875\u9762\u65E0\u6CD5\u5904\u7406\u5907\u4EFD\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u53F6\u7B3A\u3002");
  const warnings = [];
  const notes2 = checkNotes(envelope.notes).map((fields) => {
    const url = safeHttpURL(fields.url);
    const content = sanitizeArticle(fields.content, url || void 0, document2);
    const fragment = document2.createElement("template");
    fragment.innerHTML = content;
    const textContent = fragment.content.textContent.replace(/\s+/g, " ").trim();
    if (!textContent)
      throw new Error("\u5907\u4EFD\u4E2D\u6709\u7B14\u8BB0\u6CA1\u6709\u53EF\u6062\u590D\u7684\u6B63\u6587\uFF0C\u5BFC\u5165\u5DF2\u53D6\u6D88\u3002");
    const markdown = toMarkdown(content, document2);
    if (markdown.length > MARKDOWN_LIMIT)
      throw new Error("\u5907\u4EFD\u4E2D\u6709\u7B14\u8BB0\u6B63\u6587\u8FC7\u957F\uFF0C\u5BFC\u5165\u5DF2\u53D6\u6D88\u3002");
    const wordCount = countWords(textContent);
    const note = {
      ...fields,
      annotations: validateAnnotations(fields.annotations, fragment.content.textContent),
      url,
      content,
      textContent,
      markdown,
      wordCount,
      minutes: Math.max(1, Math.ceil(wordCount / 350))
    };
    if (utf8Size(JSON.stringify(note)) > BACKUP_LIMITS.noteBytes)
      throw new Error("\u6062\u590D\u540E\u7684\u7B14\u8BB0\u8D85\u8FC7\u5355\u7BC7 1 MB \u4E0A\u9650\uFF0C\u5BFC\u5165\u5DF2\u53D6\u6D88\u3002");
    if (url !== fields.url || content !== fields.content)
      warnings.push(`\u201C${fields.title}\u201D\u7684\u6B63\u6587\u6216\u94FE\u63A5\u5DF2\u91CD\u65B0\u6E05\u7406\u3002`);
    return note;
  });
  return { notes: notes2, warnings };
}
function contentKey(note) {
  const url = safeHttpURL(note?.url);
  return url ? JSON.stringify([url, note.mode, note.textContent]) : "";
}
function planImport(existing, incoming) {
  if (!Array.isArray(existing) || !Array.isArray(incoming) || existing.length > BACKUP_LIMITS.records || incoming.length > BACKUP_LIMITS.records)
    throw new Error("\u7B14\u8BB0\u5E93\u6216\u5BFC\u5165\u5217\u8868\u65E0\u6548\uFF0C\u6700\u591A\u652F\u6301 100 \u7BC7\u7B14\u8BB0\u3002");
  const ids = new Set(
    existing.map((note) => note?.id).filter((id) => typeof id === "string")
  );
  const content = new Set(existing.map(contentKey).filter(Boolean));
  const notesToAdd = [];
  let skipped = 0;
  for (const note of incoming) {
    if (!isRecord2(note) || typeof note.id !== "string" || !ID_PATTERN.test(note.id))
      throw new Error("\u5BFC\u5165\u7B14\u8BB0\u7F3A\u5C11\u6709\u6548 ID\u3002");
    const key = contentKey(note);
    if (ids.has(note.id) || key && content.has(key)) {
      skipped += 1;
      continue;
    }
    ids.add(note.id);
    if (key) content.add(key);
    notesToAdd.push(note);
  }
  if (existing.length + notesToAdd.length > BACKUP_LIMITS.records)
    throw new Error(
      "\u5BFC\u5165\u540E\u4F1A\u8D85\u8FC7 100 \u7BC7\u4E0A\u9650\u3002\u8BF7\u5148\u5BFC\u51FA\u5E76\u5220\u9664\u4E0D\u518D\u9700\u8981\u7684\u7B14\u8BB0\uFF0C\u518D\u91CD\u8BD5\uFF1B\u5F53\u524D\u7B14\u8BB0\u5E93\u672A\u6539\u53D8\u3002"
    );
  return { notesToAdd, skipped };
}

// src/progress.js
var WRITE_LOCK = "pageleaf-notes-write";
var WRITE_INTERVAL = 750;
function clamp(value) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
}
function validId(id) {
  return typeof id === "string" && id.length > 0 && id.length <= 200;
}
function createReadingProgress({
  storage: storage2,
  locks,
  window: window2,
  document: document2,
  onChange = () => {
  },
  onError = () => {
  }
}) {
  let current = null;
  let generation = 0;
  let timer = null;
  let disposed = false;
  function maxScroll() {
    const element = document2.scrollingElement || document2.documentElement;
    return Math.max(
      0,
      (element?.scrollHeight || 0) - (window2.innerHeight || element?.clientHeight || 0)
    );
  }
  function readRatio() {
    const maximum = maxScroll();
    return maximum ? clamp((Number(window2.scrollY) || 0) / maximum) : 0;
  }
  function emit(ratio) {
    if (!disposed) onChange(clamp(ratio));
  }
  function cancelTimer() {
    if (timer !== null) window2.clearTimeout(timer);
    timer = null;
  }
  function snapshot(value = current) {
    return value && value.saved && !value.restoring ? { id: value.id, ratio: clamp(value.ratio) } : null;
  }
  async function persist(value) {
    if (!value) return;
    try {
      await locks.request(WRITE_LOCK, async () => {
        const noteKey = `note:${value.id}`;
        const data = await storage2.get(noteKey);
        if (!data[noteKey] || data[noteKey].id !== value.id) return;
        await storage2.set({
          [`progress:${value.id}`]: {
            ratio: value.ratio,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
      });
    } catch (error) {
      if (!disposed) onError(error);
    }
  }
  function scheduleWrite() {
    if (timer !== null || !snapshot()) return;
    timer = window2.setTimeout(() => {
      timer = null;
      void persist(snapshot());
    }, WRITE_INTERVAL);
  }
  function onScroll() {
    if (disposed || !current || current.restoring) return;
    current.ratio = readRatio();
    emit(current.ratio);
    scheduleWrite();
  }
  function onResize() {
    if (disposed || !current || current.restoring) return;
    window2.scrollTo(0, maxScroll() * current.ratio);
    onScroll();
  }
  function frame() {
    return new Promise((resolve) => {
      if (typeof window2.requestAnimationFrame === "function")
        window2.requestAnimationFrame(() => resolve());
      else window2.setTimeout(resolve, 0);
    });
  }
  async function flush() {
    cancelTimer();
    if (disposed || !current || current.restoring) return;
    current.ratio = readRatio();
    emit(current.ratio);
    await persist(snapshot());
  }
  async function open(id, isSaved, { restore = true } = {}) {
    if (disposed) return;
    const previous = snapshot();
    cancelTimer();
    const token = ++generation;
    current = validId(id) ? {
      id,
      saved: isSaved === true,
      ratio: readRatio(),
      restoring: isSaved === true && restore
    } : null;
    emit(current?.ratio || 0);
    await persist(previous);
    if (disposed || generation !== token || !current) return;
    if (!current.saved || !restore) {
      current.restoring = false;
      return;
    }
    try {
      const noteKey = `note:${id}`;
      const progressKey = `progress:${id}`;
      const data = await storage2.get([noteKey, progressKey]);
      if (disposed || generation !== token) return;
      const ratio = data[noteKey]?.id === id ? clamp(data[progressKey]?.ratio) : 0;
      await frame();
      if (disposed || generation !== token) return;
      window2.scrollTo(0, maxScroll() * ratio);
      await frame();
      if (disposed || generation !== token) return;
      current.restoring = false;
      current.ratio = readRatio();
      emit(current.ratio);
    } catch (error) {
      if (disposed || generation !== token) return;
      current.restoring = false;
      current.ratio = readRatio();
      emit(current.ratio);
      onError(error);
    }
  }
  function markSaved(id) {
    if (disposed || !validId(id)) return;
    generation += 1;
    current = { id, saved: true, ratio: readRatio(), restoring: false };
    emit(current.ratio);
    scheduleWrite();
  }
  function onVisibility() {
    if (document2.visibilityState === "hidden") void flush();
  }
  function onPageHide() {
    void flush();
  }
  function dispose() {
    if (disposed) return;
    const pending = flush();
    disposed = true;
    generation += 1;
    cancelTimer();
    window2.removeEventListener("scroll", onScroll);
    window2.removeEventListener("resize", onResize);
    window2.removeEventListener("pagehide", onPageHide);
    document2.removeEventListener("visibilitychange", onVisibility);
    return pending;
  }
  window2.addEventListener("scroll", onScroll, { passive: true });
  window2.addEventListener("resize", onResize);
  window2.addEventListener("pagehide", onPageHide);
  document2.addEventListener("visibilitychange", onVisibility);
  return { open, markSaved, flush, dispose };
}

// src/demo.js
var examples = {
  en: {
    title: "Getting ready for a Saturday book meetup",
    intro: "This is a made-up plan. Select a sentence and try Highlight or Wavy underline. You can also use the pen to circle something you need to do.",
    sections: [
      ["Confirm the time and place", "Confirm the room for Saturday afternoon by Friday, then send everyone the meeting point and start time."],
      ["Prepare what you need", "Each person brings one book they want to share. The host prepares pens, paper and a timer."],
      ["Share the jobs", "Alex checks the room, Sam keeps the sign-up list, and Noor prepares the welcome table. After the meetup, send the group a list of the books people recommended."]
    ],
    checklist: ["Confirm the room by Friday.", "Tell everyone where and when to meet.", "Send the book list after the meetup."],
    checklistTitle: "Three things to remember"
  },
  "zh-CN": {
    title: "\u5468\u672B\u8BFB\u4E66\u4F1A\uFF0C\u63D0\u524D\u51C6\u5907\u4EC0\u4E48\uFF1F",
    intro: "\u8FD9\u662F\u4E00\u4E2A\u865A\u6784\u7684\u6D3B\u52A8\u5B89\u6392\u3002\u9009\u4E2D\u4E0B\u9762\u7684\u4E00\u53E5\u8BDD\uFF0C\u8BD5\u8BD5\u201C\u6807\u91CD\u70B9\u201D\u6216\u201C\u6CE2\u6D6A\u7EBF\u201D\u3002\u4E5F\u53EF\u4EE5\u6253\u5F00\u753B\u7B14\uFF0C\u5708\u51FA\u4F60\u8981\u505A\u7684\u4E8B\u3002",
    sections: [
      ["\u5148\u5B9A\u65F6\u95F4\u548C\u5730\u70B9", "\u5468\u4E94\u524D\u786E\u8BA4\u5468\u516D\u4E0B\u5348\u8BFB\u4E66\u4F1A\u7684\u573A\u5730\uFF0C\u518D\u628A\u96C6\u5408\u5730\u70B9\u548C\u5F00\u59CB\u65F6\u95F4\u53D1\u7ED9\u5927\u5BB6\u3002"],
      ["\u8981\u5E26\u4E9B\u4EC0\u4E48", "\u6BCF\u4EBA\u5E26\u4E00\u672C\u60F3\u5206\u4EAB\u7684\u4E66\u3002\u4E3B\u6301\u4EBA\u51C6\u5907\u7EB8\u3001\u7B14\u548C\u8BA1\u65F6\u5668\u3002"],
      ["\u628A\u4E8B\u60C5\u5206\u7ED9\u5177\u4F53\u7684\u4EBA", "Alex \u8D1F\u8D23\u786E\u8BA4\u573A\u5730\uFF0CSam \u6574\u7406\u62A5\u540D\u540D\u5355\uFF0CNoor \u51C6\u5907\u7B7E\u5230\u8868\u3002\u6D3B\u52A8\u7ED3\u675F\u540E\uFF0C\u628A\u5927\u5BB6\u63A8\u8350\u7684\u4E66\u5355\u53D1\u5230\u7FA4\u91CC\u3002"]
    ],
    checklist: ["\u5468\u4E94\u524D\u786E\u8BA4\u573A\u5730\u3002", "\u628A\u65F6\u95F4\u548C\u5730\u70B9\u544A\u8BC9\u53C2\u52A0\u7684\u4EBA\u3002", "\u7ED3\u675F\u540E\u628A\u63A8\u8350\u4E66\u5355\u53D1\u7ED9\u5927\u5BB6\u3002"],
    checklistTitle: "\u8BB0\u4F4F\u8FD9\u4E09\u4EF6\u4E8B"
  },
  es: {
    title: "Qu\xE9 preparar para un encuentro de lectura",
    intro: "Este plan es ficticio. Selecciona una frase y prueba Resaltar o L\xEDnea ondulada. Tambi\xE9n puedes usar el l\xE1piz para rodear una tarea.",
    sections: [
      ["Confirmar la hora y el lugar", "Confirma antes del viernes la sala para el s\xE1bado por la tarde y env\xEDa a todos el punto de encuentro y la hora."],
      ["Preparar lo necesario", "Cada persona trae un libro que quiera compartir. Quien organiza prepara papel, bol\xEDgrafos y un temporizador."],
      ["Repartir las tareas", "Alex confirma la sala, Sam lleva la lista de participantes y Noor prepara la mesa de bienvenida. Despu\xE9s del encuentro, env\xEDa al grupo la lista de libros recomendados."]
    ],
    checklist: ["Confirmar la sala antes del viernes.", "Comunicar la hora y el lugar.", "Enviar la lista de libros al terminar."],
    checklistTitle: "Tres cosas que recordar"
  },
  fr: {
    title: "Pr\xE9parer une rencontre autour des livres",
    intro: "Ce programme est fictif. S\xE9lectionnez une phrase pour essayer Surligner ou Ligne ondul\xE9e. Le stylo permet aussi d\u2019entourer une t\xE2che.",
    sections: [
      ["Confirmer l\u2019heure et le lieu", "Confirmez avant vendredi la salle pour samedi apr\xE8s-midi, puis envoyez le lieu et l\u2019heure \xE0 tout le monde."],
      ["Pr\xE9parer le mat\xE9riel", "Chaque personne apporte un livre \xE0 pr\xE9senter. La personne qui organise pr\xE9pare du papier, des stylos et un minuteur."],
      ["R\xE9partir les t\xE2ches", "Alex confirme la salle, Sam tient la liste des participants et Noor pr\xE9pare l\u2019accueil. Apr\xE8s la rencontre, envoyez au groupe la liste des livres recommand\xE9s."]
    ],
    checklist: ["Confirmer la salle avant vendredi.", "Envoyer l\u2019heure et le lieu aux participants.", "Partager la liste des livres apr\xE8s la rencontre."],
    checklistTitle: "Trois choses \xE0 retenir"
  },
  de: {
    title: "Ein B\xFCchertreffen am Samstag vorbereiten",
    intro: "Dieser Plan ist erfunden. Einen Satz ausw\xE4hlen und Markieren oder Wellenlinie ausprobieren. Mit dem Stift lassen sich Aufgaben einkreisen.",
    sections: [
      ["Zeit und Ort kl\xE4ren", "Den Raum f\xFCr Samstagnachmittag bis Freitag best\xE4tigen lassen und allen den Treffpunkt und die Uhrzeit schicken."],
      ["Material vorbereiten", "Alle bringen ein Buch mit, das sie vorstellen m\xF6chten. Die Person, die das Treffen leitet, bereitet Papier, Stifte und einen Timer vor."],
      ["Aufgaben verteilen", "Alex kl\xE4rt den Raum, Sam f\xFChrt die Anmeldeliste und Noor bereitet den Empfang vor. Nach dem Treffen erh\xE4lt die Gruppe eine Liste der empfohlenen B\xFCcher."]
    ],
    checklist: ["Den Raum bis Freitag best\xE4tigen lassen.", "Zeit und Treffpunkt mitteilen.", "Danach die B\xFCcherliste verschicken."],
    checklistTitle: "Drei Dinge, an die man denken sollte"
  },
  ja: {
    title: "\u9031\u672B\u306E\u8AAD\u66F8\u4F1A\u3001\u4F55\u3092\u6E96\u5099\u3059\u308B\uFF1F",
    intro: "\u3053\u308C\u306F\u67B6\u7A7A\u306E\u4E88\u5B9A\u3067\u3059\u3002\u6587\u7AE0\u3092\u9078\u3093\u3067\u300C\u30DE\u30FC\u30AB\u30FC\u300D\u3084\u300C\u6CE2\u7DDA\u300D\u3092\u8A66\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u30DA\u30F3\u3067\u3001\u3084\u308B\u3053\u3068\u3092\u4E38\u3067\u56F2\u3080\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002",
    sections: [
      ["\u65E5\u6642\u3068\u5834\u6240\u3092\u6C7A\u3081\u308B", "\u91D1\u66DC\u307E\u3067\u306B\u571F\u66DC\u306E\u5348\u5F8C\u306B\u4F7F\u3046\u4F1A\u5834\u3092\u78BA\u8A8D\u3057\u3001\u96C6\u5408\u5834\u6240\u3068\u958B\u59CB\u6642\u523B\u3092\u53C2\u52A0\u8005\u306B\u4F1D\u3048\u307E\u3059\u3002"],
      ["\u6301\u3061\u7269\u3092\u7528\u610F\u3059\u308B", "\u53C2\u52A0\u8005\u306F\u7D39\u4ECB\u3057\u305F\u3044\u672C\u3092\u4E00\u518A\u6301\u3063\u3066\u304D\u307E\u3059\u3002\u9032\u884C\u5F79\u306F\u7D19\u3001\u30DA\u30F3\u3001\u30BF\u30A4\u30DE\u30FC\u3092\u7528\u610F\u3057\u307E\u3059\u3002"],
      ["\u62C5\u5F53\u3092\u6C7A\u3081\u308B", "Alex \u306F\u4F1A\u5834\u306E\u78BA\u8A8D\u3001Sam \u306F\u53C2\u52A0\u8005\u540D\u7C3F\u3001Noor \u306F\u53D7\u4ED8\u3092\u62C5\u5F53\u3057\u307E\u3059\u3002\u7D42\u4E86\u5F8C\u3001\u7D39\u4ECB\u3055\u308C\u305F\u672C\u306E\u4E00\u89A7\u3092\u307F\u3093\u306A\u306B\u9001\u308A\u307E\u3059\u3002"]
    ],
    checklist: ["\u91D1\u66DC\u307E\u3067\u306B\u4F1A\u5834\u3092\u78BA\u8A8D\u3059\u308B\u3002", "\u65E5\u6642\u3068\u96C6\u5408\u5834\u6240\u3092\u4F1D\u3048\u308B\u3002", "\u7D42\u4E86\u5F8C\u306B\u672C\u306E\u4E00\u89A7\u3092\u9001\u308B\u3002"],
    checklistTitle: "\u5FD8\u308C\u305A\u306B\u3084\u308B\u4E09\u3064\u306E\u3053\u3068"
  },
  ar: {
    title: "\u0627\u0644\u0627\u0633\u062A\u0639\u062F\u0627\u062F \u0644\u0644\u0642\u0627\u0621 \u0642\u0631\u0627\u0621\u0629 \u064A\u0648\u0645 \u0627\u0644\u0633\u0628\u062A",
    intro: "\u0647\u0630\u0647 \u062E\u0637\u0629 \u062E\u064A\u0627\u0644\u064A\u0629. \u062D\u062F\u0651\u062F \u062C\u0645\u0644\u0629 \u0648\u062C\u0631\u0651\u0628 \u0627\u0644\u062A\u0645\u064A\u064A\u0632 \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0645\u062A\u0645\u0648\u0651\u062C. \u0648\u064A\u0645\u0643\u0646\u0643 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u0644\u0645 \u0644\u0648\u0636\u0639 \u062F\u0627\u0626\u0631\u0629 \u062D\u0648\u0644 \u0645\u0647\u0645\u0629 \u062A\u0631\u064A\u062F \u0625\u0646\u062C\u0627\u0632\u0647\u0627.",
    sections: [
      ["\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0645\u0648\u0639\u062F \u0648\u0627\u0644\u0645\u0643\u0627\u0646", "\u0623\u0643\u0651\u062F \u0642\u0628\u0644 \u0627\u0644\u062C\u0645\u0639\u0629 \u062D\u062C\u0632 \u0627\u0644\u0642\u0627\u0639\u0629 \u0644\u0639\u0635\u0631 \u0627\u0644\u0633\u0628\u062A\u060C \u062B\u0645 \u0623\u0631\u0633\u0644 \u0644\u0644\u062C\u0645\u064A\u0639 \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062C\u0645\u0639 \u0648\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621."],
      ["\u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0645\u0637\u0644\u0648\u0628", "\u064A\u062D\u0636\u0631 \u0643\u0644 \u0634\u062E\u0635 \u0643\u062A\u0627\u0628\u064B\u0627 \u064A\u0631\u064A\u062F \u0645\u0634\u0627\u0631\u0643\u062A\u0647. \u0648\u064A\u062C\u0647\u0651\u0632 \u0627\u0644\u0645\u0646\u0638\u0651\u0645 \u0627\u0644\u0648\u0631\u0642 \u0648\u0627\u0644\u0623\u0642\u0644\u0627\u0645 \u0648\u0645\u0624\u0642\u0651\u062A\u064B\u0627."],
      ["\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0647\u0627\u0645", "\u064A\u062A\u0623\u0643\u062F Alex \u0645\u0646 \u0627\u0644\u0642\u0627\u0639\u0629\u060C \u0648\u064A\u0639\u062F\u0651 Sam \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646\u060C \u0648\u064A\u062C\u0647\u0651\u0632 Noor \u0637\u0627\u0648\u0644\u0629 \u0627\u0644\u0627\u0633\u062A\u0642\u0628\u0627\u0644. \u0628\u0639\u062F \u0627\u0644\u0644\u0642\u0627\u0621\u060C \u0623\u0631\u0633\u0644 \u0644\u0644\u0645\u062C\u0645\u0648\u0639\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0643\u062A\u0628 \u0627\u0644\u062A\u064A \u0623\u0648\u0635\u0649 \u0628\u0647\u0627 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646."]
    ],
    checklist: ["\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0642\u0627\u0639\u0629 \u0642\u0628\u0644 \u0627\u0644\u062C\u0645\u0639\u0629.", "\u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0628\u0627\u0644\u0648\u0642\u062A \u0648\u0627\u0644\u0645\u0643\u0627\u0646.", "\u0625\u0631\u0633\u0627\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0643\u062A\u0628 \u0628\u0639\u062F \u0627\u0644\u0644\u0642\u0627\u0621."],
    checklistTitle: "\u062B\u0644\u0627\u062B \u0645\u0647\u0627\u0645 \u0644\u0627 \u062A\u0646\u0633\u0647\u0627"
  }
};
var html = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function demoArticle(locale = "en") {
  const lang = resolveLanguage(locale);
  const example = examples[lang];
  const content = `<p>${html(example.intro)}</p>
${example.sections.map(([heading, text]) => `<h2>${html(heading)}</h2>
<p>${html(text)}</p>`).join("\n")}
<h2>${html(example.checklistTitle)}</h2>
<ul>${example.checklist.map((text) => `<li>${html(text)}</li>`).join("")}</ul>`;
  const rawText = [example.intro, ...example.sections.flat(), example.checklistTitle, example.checklist.join("")].join("\n");
  const annotations = ["highlight", "wavy"].map((style, index) => {
    const exact = example.sections[index][1];
    const start = rawText.indexOf(exact);
    return { type: "text", style, start, end: start + exact.length, exact };
  });
  const textContent = [example.intro, ...example.sections.flat(), example.checklistTitle, ...example.checklist].join(" ");
  const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;
  const wordCount = (textContent.match(cjk) || []).length + (textContent.replace(cjk, " ").match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;
  return {
    id: crypto.randomUUID(),
    title: example.title,
    url: "",
    siteName: "Pageleaf",
    author: "Pageleaf",
    lang,
    excerpt: "",
    publishedTime: "",
    wordCount,
    minutes: Math.max(1, Math.ceil(wordCount / 350)),
    capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
    mode: "demo",
    warnings: ["demoWarning"],
    textContent,
    content,
    annotations,
    markdown: `${example.intro}

${example.sections.map(([heading, text]) => `## ${heading}

${text}`).join("\n\n")}

## ${example.checklistTitle}

${example.checklist.map((text) => `- ${text}`).join("\n")}
`
  };
}

// src/organize.js
var MAX_ITEMS = 6;
var MAX_CHARACTERS = 300;
var cleanText = (value) => String(value || "").replace(/\s+/gu, " ").trim();
var escapeMarkdown2 = (value) => cleanText(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\\`*_{}[\]#!|]/g, "\\$&");
function shorten(value) {
  const characters = Array.from(cleanText(value));
  return characters.length > MAX_CHARACTERS ? characters.slice(0, MAX_CHARACTERS - 1).join("") + "\u2026" : characters.join("");
}
function firstSentence(value, locale) {
  const text = cleanText(value);
  if (!text) return "";
  if (typeof Intl.Segmenter === "function") {
    const segments = new Intl.Segmenter(locale, { granularity: "sentence" }).segment(text);
    const first = segments[Symbol.iterator]().next().value;
    return shorten(first?.segment || text);
  }
  return shorten(text.match(/^.*?[.!?。！？](?:\s|$)/u)?.[0] || text);
}
function organizeArticle({ content = "", annotations = [], document: document2, locale = "en" } = {}) {
  if (!document2?.createElement) throw new Error("A document is required to collect excerpts.");
  const language = resolveLanguage(locale);
  const template = document2.createElement("template");
  template.innerHTML = sanitizeArticle(content, void 0, document2);
  const sourceText = cleanText(template.content.textContent);
  const seen = /* @__PURE__ */ new Set();
  const markedItems = [];
  const marks = Array.isArray(annotations) ? annotations.slice(0, 100) : [];
  const orderedMarks = marks.map((mark, index) => ({ mark, index })).filter(({ mark }) => mark && typeof mark === "object" && mark.type !== "pen" && typeof mark.exact === "string").sort((a, b) => (Number.isInteger(a.mark.start) ? a.mark.start : a.index) - (Number.isInteger(b.mark.start) ? b.mark.start : b.index));
  for (const { mark } of orderedMarks) {
    const exact = cleanText(mark.exact);
    if (!exact || !sourceText.includes(exact) || seen.has(exact)) continue;
    seen.add(exact);
    markedItems.push({ text: shorten(exact), heading: "" });
    if (markedItems.length === MAX_ITEMS) break;
  }
  const items = markedItems;
  const source = items.length ? "marks" : "sections";
  if (!items.length) {
    let heading = "";
    let sectionIndex = 0;
    const hasHeadings = Boolean(template.content.querySelector("h1,h2,h3,h4,h5,h6"));
    const sectionUsed = /* @__PURE__ */ new Set();
    for (const element of template.content.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li")) {
      if (/^H[1-6]$/.test(element.tagName)) {
        heading = cleanText(element.textContent);
        sectionIndex += 1;
        continue;
      }
      if (hasHeadings && !sectionIndex) continue;
      if (element.closest("pre") || element.tagName === "P" && element.closest("li")) continue;
      const text = firstSentence(element.textContent, language);
      if (!text || seen.has(text) || hasHeadings && sectionUsed.has(sectionIndex)) continue;
      seen.add(text);
      sectionUsed.add(sectionIndex);
      items.push({ text, heading: shorten(heading) });
      if (items.length === MAX_ITEMS) break;
    }
  }
  if (!items.length) return { items, markdown: "", source };
  const hint = t(language, source === "marks" ? "organizeMarksHint" : "organizeSectionsHint");
  const quotes = items.map(({ text, heading }) => `${heading ? `### ${escapeMarkdown2(heading)}

` : ""}> ${escapeMarkdown2(text)}`);
  return { items, source, markdown: `## ${t(language, "organizeTitle")}

${hint}

${quotes.join("\n\n")}
` };
}

// src/reader.js
var $ = (id) => document.getElementById(id);
var previewMemory = {};
var previewStorage = {
  async get(keys) {
    return keys === null ? { ...previewMemory } : Object.fromEntries(
      (Array.isArray(keys) ? keys : [keys]).filter((key) => key in previewMemory).map((key) => [key, previewMemory[key]])
    );
  },
  async set(values) {
    Object.assign(previewMemory, values);
  },
  async remove(keys) {
    for (const key of Array.isArray(keys) ? keys : [keys])
      delete previewMemory[key];
  }
};
var isPreview = !globalThis.chrome?.storage;
var storage = globalThis.chrome?.storage || {
  local: previewStorage,
  session: previewStorage
};
var article = null;
var notes = [];
var dirty = false;
var saving = false;
var savedVersion = "";
var pendingDelete = "";
var settings = { dark: false, fontSize: 18, language: "en" };
var tr = (key, params) => t(settings.language, key, params);
var importSummary = null;
var currentError = "";
var progressRatio = 0;
var toastTimer;
var intersection;
var pendingImport = null;
var penActive = false;
var activeStroke = null;
var organizedDraft = null;
var readingProgress = createReadingProgress({
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
      String(ratio)
    );
    $("progress-label").textContent = new Intl.NumberFormat(settings.language, { style: "percent" }).format(ratio);
  },
  onError: () => toast(tr("progressError"))
});
function toast(message) {
  clearTimeout(toastTimer);
  $("toast").textContent = message;
  $("toast").hidden = false;
  toastTimer = setTimeout(() => {
    $("toast").hidden = true;
  }, 4e3);
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
  return !dirty || window.confirm(tr("leave"));
}
function updateSaveState() {
  $("save-state").textContent = dirty ? tr("unsavedChanges") : savedVersion ? isPreview ? tr("savedPreview") : tr("savedLocal") : tr("notSaved");
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
    `${settings.fontSize}px`
  );
  $("theme").setAttribute(
    "aria-label",
    settings.dark ? tr("light") : tr("dark")
  );
  $("theme").setAttribute(
    "title",
    settings.dark ? tr("light") : tr("dark")
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
      } catch {
      }
    }
  } catch {
    toast(tr("settingsError"));
  }
}
function updateArticleLabels() {
  if (!article) return;
  $("article-title").textContent = article.title;
  $("article-site").textContent = article.siteName || tr("web");
  const meta = [article.author, tr("aboutMinutes", { time: formatMinutes(settings.language, article.minutes) })];
  if (article.publishedTime) meta.push(formatDate(settings.language, article.publishedTime));
  $("article-meta").textContent = meta.filter(Boolean).join(" \xB7 ");
  $("capture-type").textContent = tr(article.mode === "demo" ? "captureDemo" : article.mode === "selection" ? "captureSelection" : "captureArticle");
  $("source").hidden = !article.url;
  if (article.url) $("source").href = article.url;
  else $("source").removeAttribute("href");
  $("article-warning").textContent = article.mode === "demo" ? tr("demoWarning", { language: new Intl.DisplayNames([settings.language], { type: "language" }).of(article.lang || "en") }) : (article.warnings || []).map((message) => localizeMessage(settings.language, message)).join(" ");
  $("article-warning").hidden = !article.warnings?.length || article.mode === "demo" && resolveLanguage(article.lang) === settings.language;
}
function updateImportSummary() {
  if (!importSummary) return;
  $("import-summary").textContent = tr("importPreview", { add: formatNumber(settings.language, importSummary.add), skip: formatNumber(settings.language, importSummary.skip) }) + (importSummary.sanitized ? ` ${tr("sanitized")}` : "");
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
  $("progress-label").textContent = new Intl.NumberFormat(settings.language, { style: "percent" }).format(progressRatio);
  if (article) {
    document.title = `${article.title} \u2014 Pageleaf`;
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
  notes = Object.entries(data).filter(
    ([key, value]) => key.startsWith("note:") && value && typeof value.id === "string" && typeof value.title === "string" && typeof value.updatedAt === "string"
  ).map(([, value]) => value);
  renderLibrary();
}
function renderLibrary() {
  $("note-list").replaceChildren();
  $("note-count").textContent = formatNumber(settings.language, notes.length);
  const found = searchNotes(notes, $("search").value);
  $("library-empty").hidden = found.length > 0;
  $("library-empty").textContent = notes.length ? tr("noMatches") : tr("emptyLibrary");
  for (const item of found) {
    const card = makeText("div", "", "note-card");
    card.classList.toggle("active", item.id === article?.id);
    const open = makeText("button", "", "note-open");
    open.type = "button";
    open.setAttribute("aria-label", tr("openNote", { title: item.title }));
    open.append(
      Object.assign(makeText("strong", item.title), { dir: "auto" }),
      makeText(
        "span",
        `${formatDate(settings.language, item.updatedAt)} \xB7 ${formatMinutes(settings.language, item.minutes)}`
      )
    );
    open.addEventListener("click", () => {
      if (canLeave()) {
        renderArticle(item);
        history.replaceState(null, "", `#note=${item.id}`);
      }
    });
    const remove2 = makeText("button", "\xD7", "delete-note");
    remove2.type = "button";
    remove2.setAttribute("aria-label", tr("deleteNote", { title: item.title }));
    remove2.addEventListener("click", () => {
      if (saving) {
        toast(tr("saving"));
        return;
      }
      pendingDelete = item.id;
      $("delete-title").textContent = item.title;
      $("delete-dialog").showModal();
    });
    card.append(open, remove2);
    $("note-list").append(card);
  }
}
function renderArticle(value) {
  try {
    const clean = sanitizeArticle(
      value.content,
      safeHttpURL(value.url) || "https://example.invalid",
      document
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
    document.title = `${article.title} \u2014 Pageleaf`;
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
  const links = /* @__PURE__ */ new Map();
  for (const [index, heading] of headings.entries()) {
    heading.id = `section-${index}`;
    const link = makeText(
      "a",
      heading.textContent,
      heading.tagName === "H3" ? "sub" : ""
    );
    link.href = `#${heading.id}`;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      heading.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start"
      });
    });
    $("toc-links").append(link);
    links.set(heading, link);
  }
  if (!headings.length)
    $("toc-links").append(
      makeText("span", tr("noHeadings"), "empty-hint")
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
    { rootMargin: "-160px 0px -55% 0px", threshold: 0 }
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
        const existing = (await storage.local.get(`note:${requestedArticle.id}`))[`note:${requestedArticle.id}`];
        const copied = Boolean(
          existing?.updatedAt && existing.updatedAt !== requestedVersion
        );
        const id = copied ? crypto.randomUUID() : requestedArticle.id;
        const data = await storage.local.get(null);
        if (!data[`note:${id}`] && Object.keys(data).filter((key) => key.startsWith("note:")).length >= 100)
          throw new Error(
            "limitNotes"
          );
        const next2 = {
          ...requestedArticle,
          id,
          note: requestedNote,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        if (new TextEncoder().encode(JSON.stringify(next2)).length > 1e6)
          throw new Error(
            "largeNote"
          );
        await storage.local.set({ [`note:${id}`]: next2 });
        return { next: next2, copied };
      }
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
      result.copied ? tr("conflictSaved") : isPreview ? tr("previewSaved") : tr("saved")
    );
  } catch (error) {
    toast(
      ["limitNotes", "largeNote"].includes(error.message) ? tr(error.message) : tr("storageError")
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
      buildMarkdown(article, $("personal-note").value, { locale: settings.language })
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
  setTimeout(() => URL.revokeObjectURL(url), 15e3);
}
function exportMarkdown() {
  if (!article) return;
  try {
    downloadText(
      buildMarkdown(article, $("personal-note").value, { locale: settings.language }),
      "text/markdown;charset=utf-8",
      noteFilename(article.title)
    );
    toast(tr("exported"));
  } catch {
    toast(tr("exportError"));
  }
}
function recordsFromStorage(data) {
  return Object.entries(data).filter(
    ([key, value]) => key.startsWith("note:") && value && typeof value.id === "string"
  ).map(([, value]) => value);
}
async function backupLibrary() {
  $("backup-library").disabled = true;
  try {
    const records = await navigator.locks.request(
      "pageleaf-notes-write",
      async () => recordsFromStorage(await storage.local.get(null))
    );
    if (!records.length) {
      toast(tr("backupEmpty"));
      return;
    }
    const json = createBackup(records);
    downloadText(
      json,
      "application/json;charset=utf-8",
      `pageleaf-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`
    );
    toast(tr("backedUp", { count: formatNumber(settings.language, records.length) }));
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
      parsed.notes
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
              result.notesToAdd.map((note) => [`note:${note.id}`, note])
            )
          );
        return result;
      }
    );
    pendingImport = null;
    $("import-dialog").close();
    await loadLibrary();
    toast(
      tr("imported", { add: formatNumber(settings.language, plan.notesToAdd.length), skip: formatNumber(settings.language, plan.skipped) })
    );
  } catch (error) {
    toast(
      error.message?.includes("100") ? tr("limitNotes") : tr("importError")
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
  for (const stroke of [...article?.annotations || [], ...extra ? [extra] : []]) {
    if (stroke.type !== "pen") continue;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", stroke.points.map(([x, y], index) => `${index ? "L" : "M"}${(x * 1e3).toFixed(2)},${(y * 1e3).toFixed(2)}`).join(" "));
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
  if (marks.filter((item) => item.type === "text").length >= ANNOTATION_LIMITS.text)
    return toast(tr("annotationLimit"));
  if (marks.some((item) => item.type === "text" && item.start === mark.start && item.end === mark.end && item.style === mark.style)) return;
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
  if (!penActive || !article || saving || event.button !== void 0 && event.button !== 0) return;
  if ((article.annotations || []).filter((item) => item.type === "pen").length >= ANNOTATION_LIMITS.pen)
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
  if (Math.hypot(point[0] - last[0], point[1] - last[1]) < 5e-4) return;
  activeStroke.points.push(point);
  drawStrokes(activeStroke);
}
function finishPen(event) {
  if (!activeStroke) return;
  movePen(event);
  const stroke = activeStroke;
  activeStroke = null;
  if (stroke.points.length < 2) return drawStrokes();
  article.annotations = validateAnnotations([...article.annotations || [], stroke], $("article-body"));
  changedMarkup();
}
function previewOrganization() {
  if (!article || saving) return;
  setPenMode(false);
  organizedDraft = organizeArticle({ content: article.content, annotations: article.annotations || [], document, locale: settings.language });
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
  const excerpts = [tr("organizeTitle"), ...organizedDraft.items.map((item) => `\u2022 ${item.heading ? `${item.heading}: ` : ""}${item.text}`)].join("\n");
  const next2 = [editor.value, excerpts].filter(Boolean).join("\n\n");
  if (next2.length > editor.maxLength) return toast(tr("largeNote"));
  editor.value = next2;
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
  const marks = [...article.annotations || []];
  for (const item of organizedDraft.items) {
    if (marks.filter((mark) => mark.type === "text").length >= ANNOTATION_LIMITS.text) break;
    const needle = item.text.replace(/…$/, "").replace(/\s+/gu, " ").trim();
    const headingIndex = item.heading ? normalized.indexOf(item.heading.replace(/\s+/gu, " ").trim()) : -1;
    const index = normalized.indexOf(needle, Math.max(0, headingIndex));
    if (!needle || index < 0) continue;
    const start = offsets[index];
    const end = offsets[index + needle.length - 1] + 1;
    if (marks.some((mark) => mark.type === "text" && mark.start === start && mark.end === end && mark.style === "highlight")) continue;
    marks.push({ type: "text", style: "highlight", start, end, exact: raw.slice(start, end) });
  }
  article.annotations = validateAnnotations(marks, $("article-body"));
  changedMarkup();
  $("organize-dialog").close();
  toast(tr("markAdded"));
}
for (const button of document.querySelectorAll("[data-mark]")) {
  button.addEventListener("pointerdown", (event) => event.preventDefault());
  button.addEventListener("click", () => addTextMark(button.dataset.mark));
}
$("pen").addEventListener("click", () => {
  setPenMode(!penActive);
  if (penActive) toast(tr("penHint"));
});
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
$("jump-note").addEventListener("click", () => {
  $("personal-note").scrollIntoView({ block: "center" });
  $("personal-note").focus({ preventScroll: true });
});
$("organize").addEventListener("click", previewOrganization);
$("append-organize").addEventListener("click", appendOrganization);
$("mark-organized").addEventListener("click", markOrganization);
$("cancel-organize").addEventListener("click", () => $("organize-dialog").close());
$("organize-dialog").addEventListener("close", () => {
  organizedDraft = null;
});
$("pen-layer").addEventListener("pointerdown", startPen);
$("pen-layer").addEventListener("pointermove", movePen);
$("pen-layer").addEventListener("pointerup", finishPen);
$("pen-layer").addEventListener("pointercancel", () => {
  activeStroke = null;
  drawStrokes();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && penActive) setPenMode(false);
});
if (typeof ResizeObserver === "function") {
  const toolbarObserver = new ResizeObserver((entries) => {
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
function demoArticle2() {
  return demoArticle(settings.language);
}
function openDemo() {
  if (!canLeave()) return;
  const url = new URL(location.href);
  url.hash = "";
  url.searchParams.set("demo", "");
  url.searchParams.set("lang", settings.language);
  history.replaceState(null, "", `${url.pathname}${url.search}`);
  renderArticle(demoArticle2());
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
  if (area === "local" && Object.keys(changes).some((key) => key.startsWith("note:"))) {
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
        language: resolveLanguage(saved.language || navigator.languages || navigator.language)
      };
    let previewLanguage = "";
    try {
      if (isPreview) {
        previewLanguage = window.localStorage.getItem("pageleaf-language") || "";
        settings.dark = window.localStorage.getItem("pageleaf-dark") === "true";
      }
    } catch {
    }
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
      const value = (await storage.session.get(`capture:${captureId}`))[`capture:${captureId}`];
      if (value) renderArticle(value);
      else
        reportError(
          "expired"
        );
    } else if (noteId) {
      const value = (await storage.local.get(`note:${noteId}`))[`note:${noteId}`];
      if (value) renderArticle(value);
      else reportError("missing");
    } else if (new URLSearchParams(location.search).has("demo"))
      renderArticle(demoArticle2());
  } catch {
    reportError(
      "initError"
    );
  }
}
await init();

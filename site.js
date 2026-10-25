// src/site-content.js
var SITE_LANGUAGES = Object.freeze({
  "en": "English",
  "zh-CN": "\u7B80\u4F53\u4E2D\u6587",
  "es": "Espa\xF1ol",
  "fr": "Fran\xE7ais",
  "de": "Deutsch",
  "ja": "\u65E5\u672C\u8A9E",
  "ar": "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
});
var WEBSITE_PRIVACY = {
  "en": [
    "This website",
    "The website stores only your language and appearance preferences in this browser\u2019s local storage. It does not store reader-demo notes permanently. When hosted on GitHub Pages, ordinary page and asset requests reach GitHub; the host may process connection information under its own privacy policy. Reader-demo articles, your notes and imported backups are not sent to the host. Pages bundled inside the extension load their files from the extension package; they do not make these hosting requests."
  ],
  "zh-CN": [
    "\u672C\u7F51\u7AD9",
    "\u7F51\u7AD9\u4EC5\u5728\u6B64\u6D4F\u89C8\u5668\u7684\u672C\u5730\u5B58\u50A8\u4E2D\u8BB0\u5F55\u8BED\u8A00\u4E0E\u5916\u89C2\u504F\u597D\uFF0C\u4E0D\u6301\u4E45\u4FDD\u5B58\u9605\u8BFB\u5668\u6F14\u793A\u4E2D\u7684\u7B14\u8BB0\u3002\u901A\u8FC7 GitHub Pages \u8BBF\u95EE\u65F6\uFF0C\u666E\u901A\u9875\u9762\u4E0E\u8D44\u6E90\u8BF7\u6C42\u4F1A\u53D1\u9001\u7ED9 GitHub\uFF0C\u6258\u7BA1\u65B9\u53EF\u4F9D\u636E\u81EA\u8EAB\u9690\u79C1\u653F\u7B56\u5904\u7406\u8FDE\u63A5\u4FE1\u606F\u3002\u6F14\u793A\u6587\u7AE0\u3001\u4E2A\u4EBA\u7B14\u8BB0\u548C\u5BFC\u5165\u5907\u4EFD\u4E0D\u4F1A\u53D1\u9001\u7ED9\u6258\u7BA1\u65B9\u3002 \u6269\u5C55\u5185\u90E8\u9875\u9762\u8BFB\u53D6\u5B89\u88C5\u5305\u4E2D\u7684\u6587\u4EF6\uFF0C\u4E0D\u4F1A\u5411 GitHub Pages \u8BF7\u6C42\u8FD9\u4E9B\u8D44\u6E90\u3002"
  ],
  "es": [
    "Este sitio web",
    "El sitio guarda solo el idioma y la apariencia en el almacenamiento local del navegador. No conserva las notas de la demostraci\xF3n. En GitHub Pages, las solicitudes normales de p\xE1ginas y recursos llegan a GitHub, que puede tratar datos de conexi\xF3n seg\xFAn su pol\xEDtica. Los art\xEDculos de la demo, tus notas y las copias importadas no se env\xEDan al proveedor. Las p\xE1ginas incluidas en la extensi\xF3n cargan sus archivos del paquete y no hacen estas solicitudes al proveedor."
  ],
  "fr": [
    "Ce site web",
    "Le site conserve uniquement la langue et l\u2019apparence dans le stockage local du navigateur. Les notes de d\xE9mo ne sont pas persistantes. Sur GitHub Pages, les requ\xEAtes ordinaires de pages et ressources atteignent GitHub, qui peut traiter les informations de connexion selon sa politique. Articles de d\xE9mo, notes et sauvegardes import\xE9es ne sont pas envoy\xE9s \xE0 l\u2019h\xE9bergeur. Les pages incluses dans l\u2019extension chargent leurs fichiers depuis le paquet, sans ces requ\xEAtes \xE0 l\u2019h\xE9bergeur."
  ],
  "de": [
    "Diese Website",
    "Die Website speichert nur Sprache und Darstellung im lokalen Browserspeicher, keine dauerhaften Demo-Notizen. Bei GitHub Pages erreichen normale Seiten- und Ressourcenanfragen GitHub. Der Hoster kann Verbindungsdaten nach seiner Richtlinie verarbeiten. Demo-Artikel, Notizen und importierte Sicherungen werden nicht an den Hoster gesendet. Die eingebauten Erweiterungsseiten laden Dateien aus dem Erweiterungspaket und stellen diese Hostinganfragen nicht."
  ],
  "ja": [
    "\u3053\u306E\u30A6\u30A7\u30D6\u30B5\u30A4\u30C8",
    "\u8A00\u8A9E\u3068\u5916\u89B3\u306E\u307F\u30D6\u30E9\u30A6\u30B6\u306E\u30ED\u30FC\u30AB\u30EB\u30B9\u30C8\u30EC\u30FC\u30B8\u306B\u4FDD\u5B58\u3057\u3001\u30C7\u30E2\u306E\u30CE\u30FC\u30C8\u306F\u6C38\u7D9A\u4FDD\u5B58\u3057\u307E\u305B\u3093\u3002GitHub Pages \u3067\u306F\u901A\u5E38\u306E\u30DA\u30FC\u30B8\u3084\u30EA\u30BD\u30FC\u30B9\u3078\u306E\u30EA\u30AF\u30A8\u30B9\u30C8\u304C GitHub \u306B\u5C4A\u304D\u3001\u63A5\u7D9A\u60C5\u5831\u304C\u540C\u793E\u306E\u65B9\u91DD\u306B\u5F93\u3063\u3066\u51E6\u7406\u3055\u308C\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002\u30C7\u30E2\u8A18\u4E8B\u3001\u500B\u4EBA\u30E1\u30E2\u3001\u8AAD\u307F\u8FBC\u3093\u3060\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u306F\u9001\u4FE1\u3057\u307E\u305B\u3093\u3002 \u62E1\u5F35\u6A5F\u80FD\u5185\u306E\u30DA\u30FC\u30B8\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u305F\u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u307F\u3001\u3053\u308C\u3089\u306E\u30DB\u30B9\u30C6\u30A3\u30F3\u30B0\u5148\u3078\u306E\u30EA\u30AF\u30A8\u30B9\u30C8\u306F\u884C\u3044\u307E\u305B\u3093\u3002"
  ],
  "ar": [
    "\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639",
    "\u064A\u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0644\u063A\u0629 \u0648\u0627\u0644\u0645\u0638\u0647\u0631 \u0641\u0642\u0637 \u0641\u064A \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u062D\u0644\u064A \u0644\u0644\u0645\u062A\u0635\u0641\u062D \u0648\u0644\u0627 \u064A\u062D\u062A\u0641\u0638 \u0628\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A \u0628\u0634\u0643\u0644 \u062F\u0627\u0626\u0645. \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0636\u0627\u0641\u0629 \u0639\u0644\u0649 GitHub Pages \u062A\u0635\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0635\u0641\u062D\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0645\u0639\u062A\u0627\u062F\u0629 \u0625\u0644\u0649 GitHub\u060C \u0648\u0642\u062F \u064A\u0639\u0627\u0644\u062C \u0627\u0644\u0645\u0636\u064A\u0641 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0641\u0642 \u0633\u064A\u0627\u0633\u062A\u0647. \u0644\u0627 \u062A\u064F\u0631\u0633\u0644 \u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0639\u0631\u0636 \u0623\u0648 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0623\u0648 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0645\u0633\u062A\u0648\u0631\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0636\u064A\u0641. \u0635\u0641\u062D\u0627\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0636\u0645\u0651\u0646\u0629 \u062A\u062D\u0645\u0651\u0644 \u0645\u0644\u0641\u0627\u062A\u0647\u0627 \u0645\u0646 \u062D\u0632\u0645\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0648\u0644\u0627 \u062A\u0631\u0633\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0636\u0627\u0641\u0629 \u0647\u0630\u0647."
  ]
};
var SITE_CONTENT = {
  "en": {
    "nav": [
      "Home",
      "Help center",
      "Privacy",
      "About"
    ],
    "language": "Language",
    "skip": "Skip to content",
    "theme": [
      "Use dark appearance",
      "Use light appearance"
    ],
    "footer": "Open source. On your device.",
    "version": "Development release",
    "home": {
      "eyebrow": "Pageleaf for Chrome",
      "title": "Save a page.\nMark it up. Take notes.",
      "lead": "Keep an article, underline the parts you need, and write your own notes. Save everything on this device or export a copy.",
      "try": "Try an example",
      "install": "Install the extension",
      "hint": "Free. No account needed.",
      "example": "TRY IT WITH THIS ARTICLE",
      "exampleTitle": "Plan next week\u2019s event",
      "exampleSource": "Example article \xB7 Event planning",
      "exampleNote": "My note",
      "exampleThought": "Ask Sam to confirm the room by Friday.",
      "exampleBody": "Before sending invitations:",
      "featuresTitle": "Read, mark, and keep what you need.",
      "features": [
        [
          "Save a web article",
          "Capture the whole article or just the text you select."
        ],
        [
          "Mark important text",
          "Select words and highlight them, add a straight underline, or use a wavy underline."
        ],
        [
          "Draw on the article",
          "Use the pen for circles, arrows and handwritten marks. Save them with the note."
        ],
        [
          "Collect the marked parts",
          "Preview a list made from your text marks, then choose whether to add it to your notes."
        ],
        [
          "Find your notes again",
          "Search saved articles and personal notes. Reopen an article at your saved reading position."
        ],
        [
          "Export or back up",
          "Download Markdown, print a PDF, or back up the library as JSON."
        ]
      ],
      "stepsTitle": "How to use it",
      "steps": [
        [
          "Open an article",
          "Open a web article in desktop Chrome. Click the Pageleaf toolbar icon."
        ],
        [
          "Mark and write",
          "Highlight or underline text, draw with the pen, and write in My notes."
        ],
        [
          "Save your changes",
          "Click Save to keep your notes and marks. Export a file when you need a separate copy."
        ]
      ],
      "localTitle": "Where your notes are saved",
      "localBody": "Your notes stay in the current Chrome profile. Pageleaf does not upload articles or notes. Back up before uninstalling or changing devices.",
      "privacyLink": "Read the privacy details",
      "helpLink": "Open the help center",
      "compatibility": "Requires desktop Chrome 116 or later. This development version is not in the Chrome Web Store yet. PDFs, images and some web apps cannot be captured.",
      "examplePoints": [
        "Confirm the room and the date.",
        "List the materials to prepare.",
        "Assign a person to each task."
      ],
      "exampleMarked": "Confirm the room and the date."
    },
    "help": {
      "title": "Help center",
      "lead": "Installation, marking articles, saving notes and fixing common problems.",
      "search": "Search help",
      "placeholder": "Search for a feature or problem",
      "empty": "No results. Try another word.",
      "results": "Results: {count}",
      "installTitle": "Install the development release",
      "installIntro": "Pageleaf is not yet available in the Chrome Web Store. Install the unpacked release only if you are comfortable using Chrome developer mode.",
      "installSteps": [
        "Download the installation ZIP from GitHub Releases and extract it.",
        "Open chrome://extensions in desktop Chrome and enable Developer mode.",
        "Choose \u201CLoad unpacked\u201D and select the extracted folder containing manifest.json. If building from source, select dist.",
        "Pin Pageleaf from Chrome\u2019s extensions menu. Open an HTTP or HTTPS article and click its icon."
      ],
      "releases": "Get the latest release",
      "questions": [
        [
          "capture",
          "How do I capture an article or a selection?",
          "Open an ordinary article and click the Pageleaf toolbar icon. Select text before clicking to capture only that passage. Pageleaf reads content already available in the current page; it does not bypass logins, paywalls or access controls."
        ],
        [
          "save",
          "When is a note actually saved?",
          "Choose Save note in the reader to keep it in your current Chrome profile. Unsaved captures are temporary: at most six are held in browser session memory, captures older than 24 hours are cleared on a later capture, and closing Chrome clears them. In the website demo, notes are kept only in the current page and disappear on refresh."
        ],
        [
          "mark",
          "How do I highlight text?",
          "Select text in the article, then choose Highlight. The mark belongs to this copy of the article. Click Save to keep changes. In the website demo, refreshing the page clears notes and marks."
        ],
        [
          "underline",
          "How do straight and wavy underlines work?",
          "Select text, then choose Underline or Wavy underline. Both are ways for you to mark a passage. Pageleaf does not decide whether a sentence is important or incorrect. Marks do not translate or change the original text."
        ],
        [
          "pen",
          "What can I do with the pen?",
          "Choose Pen and draw over the article to circle a paragraph or add an arrow. Click Save to keep the drawing. Drawing positions scale with the page, so check them after changing the window or text size. Pen strokes are not interpreted as text."
        ],
        [
          "organize",
          "What does Make notes do?",
          "It prepares a preview from the text you marked. With no text marks, it takes the first sentence of each section. You decide whether to add the preview to My notes. This is a rule-based excerpt list, not an AI summary. It cannot judge the article, check facts or read pen strokes."
        ],
        [
          "search",
          "What does library search include?",
          "Search checks titles, sources, your personal notes, article text and Markdown. It searches your saved library on this device. It does not search the web."
        ],
        [
          "export",
          "How do Markdown and PDF export work?",
          "Copy Markdown or export a .md file from the reader. The output includes the article, its source and your current personal note. Print / PDF opens Chrome\u2019s print window; choose a printer or Save as PDF. Check the destination and print preview before saving."
        ],
        [
          "backup",
          "How do I back up and restore my library?",
          "Use Backup in the library to download a JSON file. Use Restore backup to select it, review the count, and confirm. Restore adds new notes and skips notes with the same ID, or the same source, capture type and article text. It never replaces an existing note. Reading positions and appearance preferences are not included."
        ],
        [
          "limits",
          "What are the storage and backup limits?",
          "A library can contain up to 100 notes, with each saved or restored note limited to 1 MB. A JSON backup file must be no larger than 20 MB. A full library may exceed the backup file limit: export individual notes as Markdown, then reduce the library before making a JSON backup."
        ],
        [
          "progress",
          "How does reading position work?",
          "Only saved notes remember their position. Reopen a saved note to continue on this device. Deleting the note also deletes its reading position. Reading positions are not copied into backups."
        ],
        [
          "shortcuts",
          "Which keyboard shortcuts can I use?",
          "Capture the current article with Alt / Option + Shift + L. Chrome may reserve or change shortcuts; review chrome://extensions/shortcuts if it does not work. Use Tab and Shift + Tab to move between controls and Enter or Space to activate them. Use your browser\u2019s print shortcut for printing."
        ],
        [
          "troubleshooting",
          "Why is a page missing or incomplete?",
          "PDFs, browser settings pages, the Chrome Web Store, images and video do not work as articles. Some applications or complex layouts cannot be extracted reliably. Try selecting the paragraph first. Pageleaf does not load hidden pagination or iframe content. Images are removed; complex tables and formulas may need manual editing."
        ],
        [
          "links",
          "Why did a source link change?",
          "For privacy, Pageleaf removes credentials, query parameters and fragments from source and article links. A website that needs query parameters may require you to restore the original address manually. Opening any link visits that website under its own privacy policy."
        ],
        [
          "delete",
          "How do I delete data or move to another computer?",
          "Back up your notes before uninstalling or changing profiles. Delete a note from the library to remove its local copy and reading position. Uninstalling the extension removes its local data. Files you already exported remain wherever you saved them; delete those files separately. Restore a JSON backup in the other profile to transfer notes."
        ],
        [
          "feedback",
          "How do I report a problem safely?",
          "Use GitHub Issues to describe the steps, your Chrome version and what you expected. Share a public sample URL only when appropriate. Do not upload private articles, note backups, passwords or personal information. GitHub is an external service with its own policies."
        ]
      ],
      "feedback": "Report an issue on GitHub"
    },
    "privacy": {
      "title": "Privacy",
      "lead": "What Pageleaf reads, what it saves and how to delete it.",
      "updated": "Pageleaf 0.3.1 \xB7 25 October 2026",
      "sections": [
        [
          "Local processing",
          "Pageleaf extracts text and prepares notes on your device. It does not upload article content or personal notes to a server. It has no analytics, advertising trackers, account system or cloud sync."
        ],
        [
          "What is stored",
          "When you capture a page, its title, cleaned source address, extracted text, cleaned article markup and Markdown are held temporarily in Chrome session memory. At most six captures are retained; captures older than 24 hours are removed when a new capture is made. Closing Chrome clears session captures."
        ],
        [
          "Saved notes and preferences",
          "Clicking Save keeps the article, your notes, text marks, pen drawings and dates in your current Chrome profile. Saved articles can also keep a reading position. Language, appearance and text size are local preferences. These data are not additionally encrypted by Pageleaf. Someone with access to your browser profile may be able to read them."
        ],
        [
          "Permissions, with a purpose",
          "activeTab allows temporary access to the page you explicitly choose through the toolbar or shortcut. scripting extracts readable content from that page. storage keeps session captures, saved notes, reading positions and preferences. Pageleaf requests no permanent website access, browsing history or extra download permission."
        ],
        [
          "Images, links and external sites",
          "The reader does not automatically load original images, embeds or other external resources. Credentials, query parameters and fragments are removed from source and article links. If you choose to open a link, including GitHub, Chrome visits that destination and its own privacy policy applies."
        ],
        [
          "Backups and exported files",
          "You choose when and where to export. Markdown includes the article, your notes and a list of marked text; it does not preserve pen drawings. JSON backups preserve notes, text marks and drawings, but not reading positions or display preferences. Print / PDF uses the visible browser layout, including marks and drawings. Review it before saving. Other software or sync services may access your chosen folder."
        ],
        [
          "Delete or move your data",
          "Deleting a note removes its local copy and reading position. Uninstalling Pageleaf removes extension data from that Chrome profile. Exported files are not deleted automatically. Back up before uninstalling, changing profiles or moving devices. The website reader demo stores notes only for the current page; refreshing clears them."
        ],
        [
          "Scope and questions",
          "This is a factual description of the current development release, not a claim of certification. Pageleaf\u2019s original code is open source under the MIT License. For product or privacy questions, use the public GitHub issue tracker without posting sensitive information. No separate support email is published."
        ]
      ],
      "link": "Ask a question on GitHub"
    },
    "about": {
      "title": "About Pageleaf",
      "lead": "Pageleaf saves web articles so you can mark them, add notes and find them later.",
      "sections": [
        [
          "What it does",
          "Open an article from Chrome, mark the text, draw on the page and write notes. Save the result locally or export a file. This website includes an example you can try before installing."
        ],
        [
          "Languages",
          "The interface and help are available in English, Simplified Chinese, Spanish, French, German, Japanese and Arabic. The interface follows your browser language unless you choose another one. Other languages use English. Your article is not translated."
        ],
        [
          "Development status",
          "Version 0.3.1 is a development release, not yet published in the Chrome Web Store. Some pages cannot be captured correctly. Check important passages against the original article and review exported files."
        ],
        [
          "Source code and licenses",
          "The original code is available on GitHub under the MIT License. Bundled software keeps its own licenses. Captured articles belong to their authors; keep the source and attribution when sharing."
        ],
        [
          "Report a problem",
          "Open a GitHub issue with the steps that caused the problem and your Chrome version. You can also suggest a translation fix. Do not include private notes, backups, passwords or personal information."
        ]
      ],
      "code": "Explore the source",
      "releases": "Release history",
      "license": "Read the MIT License",
      "contribute": "Contribution guide"
    }
  },
  "zh-CN": {
    "nav": [
      "\u4E3B\u9875",
      "\u5E2E\u52A9\u4E2D\u5FC3",
      "\u9690\u79C1\u8BF4\u660E",
      "\u5173\u4E8E"
    ],
    "language": "\u8BED\u8A00",
    "skip": "\u8DF3\u81F3\u6B63\u6587",
    "theme": [
      "\u5207\u6362\u7EAF\u9ED1\u5916\u89C2",
      "\u5207\u6362\u7EAF\u767D\u5916\u89C2"
    ],
    "footer": "\u514D\u8D39\u5F00\u6E90\uFF0C\u7B14\u8BB0\u4FDD\u5B58\u5728\u672C\u673A\u3002",
    "version": "\u5F00\u53D1\u7248\u672C",
    "home": {
      "eyebrow": "Pageleaf \u7F51\u9875\u7B14\u8BB0\u6269\u5C55",
      "title": "\u4FDD\u5B58\u7F51\u9875\uFF0C\n\u5212\u91CD\u70B9\uFF0C\u5199\u7B14\u8BB0\u3002",
      "lead": "\u628A\u7F51\u9875\u6587\u7AE0\u5B58\u4E0B\u6765\uFF0C\u7ED9\u91CD\u8981\u7684\u5730\u65B9\u5212\u7EBF\uFF0C\u5199\u4E0B\u81EA\u5DF1\u7684\u7B14\u8BB0\u3002\u4FDD\u5B58\u5728\u8FD9\u53F0\u7535\u8111\u4E0A\uFF0C\u4E5F\u80FD\u5BFC\u51FA\u6587\u4EF6\u3002",
      "try": "\u6253\u5F00\u793A\u4F8B\u8BD5\u8BD5",
      "install": "\u5B89\u88C5\u6269\u5C55",
      "hint": "\u514D\u8D39\u4F7F\u7528\uFF0C\u4E0D\u7528\u6CE8\u518C\u3002",
      "example": "\u7528\u8FD9\u7BC7\u6587\u7AE0\u8BD5\u4E00\u8BD5",
      "exampleTitle": "\u4E0B\u5468\u6D3B\u52A8\u600E\u4E48\u51C6\u5907",
      "exampleSource": "\u793A\u4F8B\u6587\u7AE0 \xB7 \u6D3B\u52A8\u51C6\u5907",
      "exampleNote": "\u6211\u7684\u7B14\u8BB0",
      "exampleThought": "\u5468\u4E94\u524D\u627E\u5C0F\u6797\u786E\u8BA4\u573A\u5730\u3002",
      "exampleBody": "\u53D1\u9080\u8BF7\u524D\uFF0C\u5148\u505A\u597D\u8FD9\u51E0\u4EF6\u4E8B\uFF1A",
      "featuresTitle": "\u770B\u6587\u7AE0\u65F6\uFF0C\u76F4\u63A5\u52A8\u624B\u8BB0\u3002",
      "features": [
        [
          "\u4FDD\u5B58\u7F51\u9875\u6587\u7AE0",
          "\u63D0\u53D6\u6574\u7BC7\u6587\u7AE0\uFF0C\u4E5F\u53EF\u4EE5\u5148\u9009\u4E2D\u4E00\u6BB5\uFF0C\u53EA\u4FDD\u5B58\u9700\u8981\u7684\u90E8\u5206\u3002"
        ],
        [
          "\u7ED9\u6587\u5B57\u5212\u91CD\u70B9",
          "\u9009\u4E2D\u6587\u5B57\u540E\uFF0C\u53EF\u4EE5\u7A81\u51FA\u663E\u793A\u3001\u52A0\u76F4\u7EBF\u6216\u6CE2\u6D6A\u7EBF\u3002"
        ],
        [
          "\u7528\u753B\u7B14\u505A\u6807\u8BB0",
          "\u5708\u51FA\u4E00\u6BB5\u8BDD\u3001\u753B\u4E2A\u7BAD\u5934\uFF0C\u90FD\u80FD\u548C\u7B14\u8BB0\u4E00\u8D77\u4FDD\u5B58\u3002"
        ],
        [
          "\u628A\u5212\u7EBF\u5185\u5BB9\u6574\u7406\u51FA\u6765",
          "\u5148\u770B\u6574\u7406\u7ED3\u679C\uFF0C\u518D\u51B3\u5B9A\u8981\u4E0D\u8981\u52A0\u5230\u201C\u6211\u7684\u7B14\u8BB0\u201D\u3002"
        ],
        [
          "\u627E\u5230\u4E4B\u524D\u7684\u7B14\u8BB0",
          "\u641C\u7D22\u6587\u7AE0\u548C\u81EA\u5DF1\u7684\u7B14\u8BB0\uFF0C\u6253\u5F00\u5DF2\u4FDD\u5B58\u6587\u7AE0\u65F6\u63A5\u7740\u4E0A\u6B21\u8BFB\u3002"
        ],
        [
          "\u5BFC\u51FA\u548C\u5907\u4EFD",
          "\u5BFC\u51FA Markdown\u3001\u6253\u5370\u6210 PDF\uFF0C\u6216\u628A\u7B14\u8BB0\u5E93\u5907\u4EFD\u4E3A JSON\u3002"
        ]
      ],
      "stepsTitle": "\u600E\u4E48\u7528",
      "steps": [
        [
          "\u6253\u5F00\u6587\u7AE0",
          "\u5728\u7535\u8111\u7248 Chrome \u6253\u5F00\u6587\u7AE0\uFF0C\u70B9\u51FB\u5DE5\u5177\u680F\u91CC\u7684 Pageleaf\u3002"
        ],
        [
          "\u5212\u91CD\u70B9\uFF0C\u5199\u7B14\u8BB0",
          "\u9009\u4E2D\u6587\u5B57\u5212\u7EBF\uFF0C\u7528\u753B\u7B14\u5708\u753B\uFF0C\u5728\u201C\u6211\u7684\u7B14\u8BB0\u201D\u91CC\u8BB0\u5F55\u3002"
        ],
        [
          "\u70B9\u51FB\u4FDD\u5B58",
          "\u70B9\u201C\u4FDD\u5B58\u201D\u624D\u4F1A\u7559\u4E0B\u7B14\u8BB0\u548C\u6807\u8BB0\u3002\u9700\u8981\u5355\u72EC\u7559\u4E00\u4EFD\u65F6\uFF0C\u518D\u5BFC\u51FA\u6587\u4EF6\u3002"
        ]
      ],
      "localTitle": "\u7B14\u8BB0\u5B58\u5728\u54EA\u91CC\uFF1F",
      "localBody": "\u5B58\u653E\u5728\u5F53\u524D Chrome \u914D\u7F6E\u91CC\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\u6587\u7AE0\u548C\u7B14\u8BB0\u3002\u5378\u8F7D\u6269\u5C55\u6216\u6362\u7535\u8111\u524D\uFF0C\u8BB0\u5F97\u5148\u5907\u4EFD\u3002",
      "privacyLink": "\u67E5\u770B\u9690\u79C1\u8BF4\u660E",
      "helpLink": "\u6253\u5F00\u5E2E\u52A9\u4E2D\u5FC3",
      "compatibility": "\u9700\u8981\u7535\u8111\u7248 Chrome 116 \u6216\u66F4\u65B0\u7248\u672C\u3002\u76EE\u524D\u662F\u5F00\u53D1\u7248\uFF0C\u8FD8\u6CA1\u4E0A\u67B6 Chrome \u5E94\u7528\u5546\u5E97\u3002PDF\u3001\u56FE\u7247\u548C\u90E8\u5206\u7F51\u9875\u5E94\u7528\u4E0D\u80FD\u63D0\u53D6\u3002",
      "examplePoints": [
        "\u786E\u8BA4\u573A\u5730\u548C\u65E5\u671F\u3002",
        "\u5217\u51FA\u8981\u51C6\u5907\u7684\u7269\u6599\u3002",
        "\u7ED9\u6BCF\u4EF6\u4E8B\u5B89\u6392\u8D1F\u8D23\u4EBA\u3002"
      ],
      "exampleMarked": "\u786E\u8BA4\u573A\u5730\u548C\u65E5\u671F\u3002"
    },
    "help": {
      "title": "\u5E2E\u52A9\u4E2D\u5FC3",
      "lead": "\u5B89\u88C5\u6269\u5C55\u3001\u5212\u91CD\u70B9\u3001\u4FDD\u5B58\u7B14\u8BB0\uFF0C\u4EE5\u53CA\u5E38\u89C1\u95EE\u9898\u3002",
      "search": "\u641C\u7D22\u5E2E\u52A9",
      "placeholder": "\u8F93\u5165\u529F\u80FD\u540D\u79F0\u6216\u9047\u5230\u7684\u95EE\u9898",
      "empty": "\u6CA1\u627E\u5230\u76F8\u5173\u5185\u5BB9\uFF0C\u6362\u4E2A\u5173\u952E\u8BCD\u8BD5\u8BD5\u3002",
      "results": "\u627E\u5230 {count} \u6761",
      "installTitle": "\u5B89\u88C5\u5F00\u53D1\u7248\u672C",
      "installIntro": "Pageleaf \u5C1A\u672A\u4E0A\u67B6 Chrome \u7F51\u4E0A\u5E94\u7528\u5E97\u3002\u4E86\u89E3\u5E76\u63A5\u53D7 Chrome \u5F00\u53D1\u8005\u6A21\u5F0F\u540E\uFF0C\u518D\u5B89\u88C5\u5DF2\u89E3\u538B\u7684\u5F00\u53D1\u7248\u3002",
      "installSteps": [
        "\u4ECE GitHub Releases \u4E0B\u8F7D\u5B89\u88C5 ZIP \u5E76\u89E3\u538B\u3002",
        "\u5728\u684C\u9762 Chrome \u6253\u5F00 chrome://extensions\uFF0C\u5F00\u542F\u201C\u5F00\u53D1\u8005\u6A21\u5F0F\u201D\u3002",
        "\u70B9\u51FB\u201C\u52A0\u8F7D\u5DF2\u89E3\u538B\u7684\u6269\u5C55\u7A0B\u5E8F\u201D\uFF0C\u9009\u62E9\u5305\u542B manifest.json \u7684\u89E3\u538B\u6587\u4EF6\u5939\uFF1B\u4ECE\u6E90\u7801\u6784\u5EFA\u65F6\u9009\u62E9 dist\u3002",
        "\u5728 Chrome \u6269\u5C55\u83DC\u5355\u4E2D\u56FA\u5B9A Pageleaf\uFF0C\u6253\u5F00 HTTP \u6216 HTTPS \u6587\u7AE0\uFF0C\u70B9\u51FB\u56FE\u6807\u3002"
      ],
      "releases": "\u4E0B\u8F7D\u6700\u65B0\u7248\u672C",
      "questions": [
        [
          "capture",
          "\u5982\u4F55\u63D0\u53D6\u6587\u7AE0\u6216\u9009\u4E2D\u6587\u5B57\uFF1F",
          "\u6253\u5F00\u666E\u901A\u6587\u7AE0\u7F51\u9875\uFF0C\u70B9\u51FB Pageleaf \u5DE5\u5177\u680F\u56FE\u6807\u3002\u5148\u9009\u4E2D\u6587\u5B57\uFF0C\u5C31\u53EA\u63D0\u53D6\u9009\u4E2D\u6BB5\u843D\u3002\u6269\u5C55\u53EA\u8BFB\u53D6\u5F53\u524D\u9875\u9762\u5DF2\u7ECF\u53EF\u8BBF\u95EE\u7684\u5185\u5BB9\uFF0C\u4E0D\u4F1A\u7ED5\u8FC7\u767B\u5F55\u3001\u4ED8\u8D39\u5899\u6216\u8BBF\u95EE\u63A7\u5236\u3002"
        ],
        [
          "save",
          "\u4EC0\u4E48\u65F6\u5019\u624D\u7B97\u771F\u6B63\u4FDD\u5B58\uFF1F",
          "\u70B9\u51FB\u9605\u8BFB\u5668\u7684\u201C\u4FDD\u5B58\u7B14\u8BB0\u201D\uFF0C\u624D\u4F1A\u4FDD\u5B58\u5230\u5F53\u524D Chrome \u914D\u7F6E\u3002\u672A\u4FDD\u5B58\u6458\u5F55\u4EC5\u6682\u5B58\u5728\u6D4F\u89C8\u5668\u4F1A\u8BDD\u5185\u5B58\u4E2D\uFF0C\u6700\u591A\u516D\u4EFD\uFF1B\u65B0\u63D0\u53D6\u65F6\u6E05\u7406\u8D85\u8FC7 24 \u5C0F\u65F6\u7684\u8BB0\u5F55\uFF0C\u9000\u51FA Chrome \u65F6\u6E05\u7A7A\u3002\u7F51\u7AD9\u6F14\u793A\u4E2D\u7684\u7B14\u8BB0\u53EA\u5728\u5F53\u524D\u9875\u9762\u4FDD\u7559\uFF0C\u5237\u65B0\u540E\u6E05\u7A7A\u3002"
        ],
        [
          "mark",
          "\u600E\u4E48\u7A81\u51FA\u663E\u793A\u4E00\u6BB5\u6587\u5B57\uFF1F",
          "\u5728\u6587\u7AE0\u91CC\u9009\u4E2D\u6587\u5B57\uFF0C\u518D\u70B9\u201C\u6807\u91CD\u70B9\u201D\u3002\u6807\u8BB0\u53EA\u52A0\u5728\u8FD9\u4EFD\u6587\u7AE0\u526F\u672C\u4E0A\u3002\u4FEE\u6539\u540E\u8981\u70B9\u201C\u4FDD\u5B58\u201D\u3002\u7F51\u7AD9\u793A\u4F8B\u91CC\u7684\u7B14\u8BB0\u548C\u6807\u8BB0\u4F1A\u5728\u5237\u65B0\u9875\u9762\u540E\u6E05\u7A7A\u3002"
        ],
        [
          "underline",
          "\u76F4\u7EBF\u548C\u6CE2\u6D6A\u7EBF\u600E\u4E48\u7528\uFF1F",
          "\u5148\u9009\u4E2D\u6587\u5B57\uFF0C\u518D\u70B9\u201C\u4E0B\u5212\u7EBF\u201D\u6216\u201C\u6CE2\u6D6A\u7EBF\u201D\u3002\u5B83\u4EEC\u90FD\u662F\u4F60\u81EA\u5DF1\u505A\u7684\u6807\u8BB0\uFF0C\u8F6F\u4EF6\u4E0D\u4F1A\u5224\u65AD\u8FD9\u53E5\u8BDD\u662F\u91CD\u70B9\u8FD8\u662F\u9519\u8BEF\uFF0C\u4E5F\u4E0D\u4F1A\u6539\u52A8\u6216\u7FFB\u8BD1\u539F\u6587\u3002"
        ],
        [
          "pen",
          "\u753B\u7B14\u53EF\u4EE5\u505A\u4EC0\u4E48\uFF1F",
          "\u70B9\u201C\u753B\u7B14\u201D\u540E\uFF0C\u53EF\u4EE5\u5728\u6587\u7AE0\u4E0A\u5708\u4E00\u6BB5\u8BDD\u3001\u753B\u7BAD\u5934\u6216\u505A\u624B\u5199\u6807\u8BB0\uFF0C\u5B8C\u6210\u540E\u70B9\u201C\u4FDD\u5B58\u201D\u3002\u753B\u7B14\u4F4D\u7F6E\u4F1A\u6309\u9875\u9762\u6BD4\u4F8B\u7F29\u653E\uFF0C\u6539\u4E86\u5B57\u53F7\u6216\u7A97\u53E3\u5927\u5C0F\u540E\u8BF7\u68C0\u67E5\u4F4D\u7F6E\u3002\u8F6F\u4EF6\u4E0D\u4F1A\u8BC6\u522B\u4F60\u753B\u7684\u5185\u5BB9\u3002"
        ],
        [
          "organize",
          "\u201C\u6574\u7406\u91CD\u70B9\u201D\u662F\u600E\u4E48\u6574\u7406\u7684\uFF1F",
          "\u6709\u6587\u5B57\u6807\u8BB0\u65F6\uFF0C\u5148\u628A\u4F60\u6807\u8BB0\u7684\u5185\u5BB9\u5217\u51FA\u6765\uFF1B\u6CA1\u6709\u6587\u5B57\u6807\u8BB0\u65F6\uFF0C\u6458\u53D6\u6BCF\u4E2A\u7AE0\u8282\u7684\u9996\u53E5\u3002\u4F60\u770B\u8FC7\u9884\u89C8\u540E\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u52A0\u5165\u201C\u6211\u7684\u7B14\u8BB0\u201D\u3002\u8FD9\u53EA\u662F\u6309\u89C4\u5219\u6458\u5F55\uFF0C\u4E0D\u662F AI \u603B\u7ED3\uFF0C\u4E0D\u4F1A\u5224\u65AD\u91CD\u70B9\u3001\u6838\u5B9E\u4E8B\u5B9E\uFF0C\u4E5F\u4E0D\u4F1A\u8BC6\u522B\u753B\u7B14\u3002"
        ],
        [
          "search",
          "\u5168\u6587\u641C\u7D22\u5305\u62EC\u4EC0\u4E48\uFF1F",
          "\u641C\u7D22\u6807\u9898\u3001\u6765\u6E90\u3001\u4E2A\u4EBA\u7B14\u8BB0\u3001\u6587\u7AE0\u6B63\u6587\u548C Markdown\u3002\u4EC5\u68C0\u7D22\u8FD9\u53F0\u8BBE\u5907\u4E0A\u5DF2\u4FDD\u5B58\u7684\u7B14\u8BB0\uFF0C\u4E0D\u641C\u7D22\u4E92\u8054\u7F51\u3002"
        ],
        [
          "export",
          "\u5982\u4F55\u5BFC\u51FA Markdown \u6216 PDF\uFF1F",
          "\u5728\u9605\u8BFB\u5668\u4E2D\u590D\u5236 Markdown \u6216\u5BFC\u51FA .md \u6587\u4EF6\uFF0C\u5185\u5BB9\u5305\u62EC\u6587\u7AE0\u3001\u6765\u6E90\u548C\u5F53\u524D\u4E2A\u4EBA\u7B14\u8BB0\u3002\u201C\u6253\u5370 / PDF\u201D\u6253\u5F00 Chrome \u6253\u5370\u7A97\u53E3\uFF0C\u7531\u4F60\u9009\u62E9\u6253\u5370\u673A\u6216\u53E6\u5B58\u4E3A PDF\u3002\u4FDD\u5B58\u524D\u8BF7\u68C0\u67E5\u76EE\u7684\u4F4D\u7F6E\u4E0E\u6253\u5370\u9884\u89C8\u3002"
        ],
        [
          "backup",
          "\u5982\u4F55\u5907\u4EFD\u548C\u6062\u590D\u7B14\u8BB0\u5E93\uFF1F",
          "\u70B9\u51FB\u7B14\u8BB0\u5E93\u7684\u201C\u5907\u4EFD\u201D\u4E0B\u8F7D JSON \u6587\u4EF6\uFF1B\u7528\u201C\u6062\u590D\u5907\u4EFD\u201D\u9009\u62E9\u6587\u4EF6\uFF0C\u6838\u5BF9\u9884\u89C8\u540E\u786E\u8BA4\u3002\u76F8\u540C ID\uFF0C\u6216\u76F8\u540C\u6765\u6E90\u3001\u63D0\u53D6\u65B9\u5F0F\u4E0E\u6B63\u6587\u7684\u7B14\u8BB0\u4F1A\u8DF3\u8FC7\uFF0C\u4E0D\u8986\u76D6\u5DF2\u6709\u5185\u5BB9\u3002\u9605\u8BFB\u4F4D\u7F6E\u548C\u5916\u89C2\u504F\u597D\u4E0D\u5305\u542B\u5728\u5907\u4EFD\u4E2D\u3002"
        ],
        [
          "limits",
          "\u5B58\u50A8\u548C\u5907\u4EFD\u6709\u4EC0\u4E48\u9650\u5236\uFF1F",
          "\u7B14\u8BB0\u5E93\u6700\u591A 100 \u7BC7\uFF0C\u5355\u7BC7\u4FDD\u5B58\u6216\u6062\u590D\u7684\u7B14\u8BB0\u6700\u591A 1 MB\uFF0CJSON \u5907\u4EFD\u6587\u4EF6\u6700\u591A 20 MB\u3002\u6574\u5E93\u53EF\u80FD\u8D85\u8FC7\u5907\u4EFD\u6587\u4EF6\u4E0A\u9650\uFF1B\u53EF\u5148\u9010\u7BC7\u5BFC\u51FA Markdown\uFF0C\u518D\u7F29\u51CF\u7B14\u8BB0\u5E93\u540E\u5907\u4EFD\u3002"
        ],
        [
          "progress",
          "\u9605\u8BFB\u4F4D\u7F6E\u5982\u4F55\u8BB0\u5F55\uFF1F",
          "\u53EA\u4E3A\u5DF2\u4FDD\u5B58\u7B14\u8BB0\u8BB0\u5F55\u9605\u8BFB\u4F4D\u7F6E\u3002\u5728\u8FD9\u53F0\u8BBE\u5907\u4E0A\u91CD\u65B0\u6253\u5F00\u7B14\u8BB0\u5373\u53EF\u7EE7\u7EED\u3002\u5220\u9664\u7B14\u8BB0\u65F6\u540C\u65F6\u5220\u9664\u9605\u8BFB\u4F4D\u7F6E\uFF0C\u5907\u4EFD\u4E0D\u5305\u542B\u9605\u8BFB\u4F4D\u7F6E\u3002"
        ],
        [
          "shortcuts",
          "\u6709\u54EA\u4E9B\u952E\u76D8\u64CD\u4F5C\uFF1F",
          "Alt / Option + Shift + L \u63D0\u53D6\u5F53\u524D\u6587\u7AE0\u3002\u82E5\u65E0\u54CD\u5E94\uFF0C\u53EF\u5728 chrome://extensions/shortcuts \u68C0\u67E5 Chrome \u5FEB\u6377\u952E\u662F\u5426\u51B2\u7A81\u3002\u7528 Tab \u548C Shift + Tab \u79FB\u52A8\u7126\u70B9\uFF0CEnter \u6216\u7A7A\u683C\u6FC0\u6D3B\u6309\u94AE\uFF1B\u4E5F\u53EF\u4F7F\u7528\u6D4F\u89C8\u5668\u6253\u5370\u5FEB\u6377\u952E\u3002"
        ],
        [
          "troubleshooting",
          "\u4E3A\u4EC0\u4E48\u9875\u9762\u65E0\u6CD5\u63D0\u53D6\u6216\u5185\u5BB9\u4E0D\u5B8C\u6574\uFF1F",
          "\u4E0D\u652F\u6301 PDF\u3001\u6D4F\u89C8\u5668\u5185\u90E8\u9875\u9762\u3001Chrome \u6269\u5C55\u5546\u5E97\u3001\u56FE\u7247\u548C\u89C6\u9891\u3002\u90E8\u5206\u5E94\u7528\u6216\u590D\u6742\u6392\u7248\u65E0\u6CD5\u53EF\u9760\u63D0\u53D6\uFF0C\u53EF\u5148\u9009\u4E2D\u9700\u8981\u7684\u6BB5\u843D\u3002\u4E0D\u4F1A\u52A0\u8F7D\u9690\u85CF\u5206\u9875\u6216 iframe \u5185\u5BB9\u3002\u56FE\u7247\u88AB\u79FB\u9664\uFF0C\u590D\u6742\u8868\u683C\u548C\u516C\u5F0F\u53EF\u80FD\u9700\u8981\u624B\u5DE5\u4FEE\u6539\u3002"
        ],
        [
          "links",
          "\u4E3A\u4EC0\u4E48\u539F\u6587\u94FE\u63A5\u53D1\u751F\u53D8\u5316\uFF1F",
          "\u4E3A\u51CF\u5C11\u9690\u79C1\u6CC4\u9732\uFF0C\u6765\u6E90\u548C\u6587\u4E2D\u94FE\u63A5\u4F1A\u79FB\u9664\u51ED\u636E\u3001\u67E5\u8BE2\u53C2\u6570\u4E0E\u7247\u6BB5\u3002\u4F9D\u8D56\u67E5\u8BE2\u53C2\u6570\u7684\u7F51\u7AD9\u53EF\u80FD\u9700\u8981\u624B\u52A8\u8865\u56DE\u539F\u59CB\u5730\u5740\u3002\u4E3B\u52A8\u6253\u5F00\u94FE\u63A5\u540E\uFF0C\u9002\u7528\u8BE5\u7F51\u7AD9\u81EA\u5DF1\u7684\u9690\u79C1\u653F\u7B56\u3002"
        ],
        [
          "delete",
          "\u5982\u4F55\u5220\u9664\u6570\u636E\u6216\u6362\u7535\u8111\uFF1F",
          "\u5378\u8F7D\u6216\u66F4\u6362\u914D\u7F6E\u524D\u5148\u5907\u4EFD\u3002\u5220\u9664\u7B14\u8BB0\u4F1A\u79FB\u9664\u672C\u673A\u526F\u672C\u4E0E\u9605\u8BFB\u4F4D\u7F6E\uFF1B\u5378\u8F7D\u6269\u5C55\u4F1A\u5220\u9664\u5176\u672C\u673A\u6570\u636E\u3002\u5DF2\u7ECF\u5BFC\u51FA\u7684\u6587\u4EF6\u4ECD\u4FDD\u7559\u5728\u4FDD\u5B58\u4F4D\u7F6E\uFF0C\u9700\u53E6\u884C\u5220\u9664\u3002\u53EF\u5728\u53E6\u4E00\u4E2A\u914D\u7F6E\u4E2D\u6062\u590D JSON \u5907\u4EFD\u4EE5\u8F6C\u79FB\u7B14\u8BB0\u3002"
        ],
        [
          "feedback",
          "\u5982\u4F55\u5B89\u5168\u5730\u53CD\u9988\u95EE\u9898\uFF1F",
          "\u901A\u8FC7 GitHub Issues \u63CF\u8FF0\u590D\u73B0\u6B65\u9AA4\u3001Chrome \u7248\u672C\u548C\u9884\u671F\u884C\u4E3A\uFF0C\u9002\u5F53\u65F6\u63D0\u4F9B\u516C\u5F00\u793A\u4F8B\u94FE\u63A5\u3002\u4E0D\u8981\u4E0A\u4F20\u79C1\u4EBA\u6587\u7AE0\u3001\u7B14\u8BB0\u5907\u4EFD\u3001\u5BC6\u7801\u6216\u4E2A\u4EBA\u8D44\u6599\u3002GitHub \u662F\u5916\u90E8\u670D\u52A1\uFF0C\u9002\u7528\u5176\u81EA\u8EAB\u653F\u7B56\u3002"
        ]
      ],
      "feedback": "\u5230 GitHub \u53CD\u9988\u95EE\u9898"
    },
    "privacy": {
      "title": "\u9690\u79C1\u8BF4\u660E",
      "lead": "\u6269\u5C55\u4F1A\u8BFB\u53D6\u4EC0\u4E48\u3001\u4FDD\u5B58\u4EC0\u4E48\uFF0C\u4EE5\u53CA\u600E\u4E48\u5220\u9664\u3002",
      "updated": "Pageleaf 0.3.1 \xB7 2026 \u5E74 10 \u6708 25 \u65E5",
      "sections": [
        [
          "\u672C\u673A\u5904\u7406",
          "Pageleaf \u5728\u4F60\u7684\u8BBE\u5907\u4E0A\u63D0\u53D6\u6587\u5B57\u5E76\u6574\u7406\u7B14\u8BB0\uFF0C\u4E0D\u5411\u670D\u52A1\u5668\u4E0A\u4F20\u6587\u7AE0\u5185\u5BB9\u6216\u4E2A\u4EBA\u7B14\u8BB0\u3002\u6CA1\u6709\u5206\u6790\u7EDF\u8BA1\u3001\u5E7F\u544A\u8FFD\u8E2A\u5668\u3001\u8D26\u53F7\u7CFB\u7EDF\u6216\u4E91\u540C\u6B65\u3002"
        ],
        [
          "\u6682\u5B58\u54EA\u4E9B\u6570\u636E",
          "\u63D0\u53D6\u7F51\u9875\u540E\uFF0C\u6807\u9898\u3001\u6E05\u7406\u540E\u7684\u6765\u6E90\u5730\u5740\u3001\u6B63\u6587\u3001\u6E05\u7406\u540E\u7684\u6587\u7AE0\u7ED3\u6784\u4E0E Markdown \u6682\u5B58\u4E8E Chrome \u4F1A\u8BDD\u5185\u5B58\uFF0C\u6700\u591A\u4FDD\u7559\u516D\u4EFD\u3002\u65B0\u63D0\u53D6\u65F6\u4F1A\u79FB\u9664\u8D85\u8FC7 24 \u5C0F\u65F6\u7684\u6458\u5F55\uFF0C\u9000\u51FA Chrome \u65F6\u6E05\u7A7A\u3002"
        ],
        [
          "\u5DF2\u4FDD\u5B58\u7B14\u8BB0\u4E0E\u504F\u597D",
          "\u70B9\u51FB\u201C\u4FDD\u5B58\u201D\u540E\uFF0C\u6587\u7AE0\u3001\u6211\u7684\u7B14\u8BB0\u3001\u6587\u5B57\u6807\u8BB0\u3001\u753B\u7B14\u548C\u65F6\u95F4\u8BB0\u5F55\u4F1A\u4FDD\u5B58\u5728\u5F53\u524D Chrome \u914D\u7F6E\u91CC\u3002\u5DF2\u4FDD\u5B58\u6587\u7AE0\u8FD8\u4F1A\u8BB0\u5F55\u9605\u8BFB\u4F4D\u7F6E\u3002\u8BED\u8A00\u3001\u5916\u89C2\u548C\u5B57\u53F7\u4E5F\u4FDD\u5B58\u5728\u672C\u673A\u3002\u8FD9\u4E9B\u5185\u5BB9\u6CA1\u6709\u7ECF\u8FC7 Pageleaf \u989D\u5916\u52A0\u5BC6\uFF1B\u80FD\u8BBF\u95EE\u6D4F\u89C8\u5668\u914D\u7F6E\u7684\u4EBA\u53EF\u80FD\u8BFB\u5230\u5B83\u4EEC\u3002"
        ],
        [
          "\u6BCF\u9879\u6743\u9650\u7684\u7528\u9014",
          "activeTab \u5728\u4F60\u70B9\u51FB\u5DE5\u5177\u680F\u6216\u4F7F\u7528\u5FEB\u6377\u952E\u65F6\uFF0C\u4E34\u65F6\u8BBF\u95EE\u4E3B\u52A8\u9009\u62E9\u7684\u7F51\u9875\uFF1Bscripting \u4ECE\u8BE5\u9875\u63D0\u53D6\u6B63\u6587\uFF1Bstorage \u4FDD\u5B58\u4F1A\u8BDD\u6458\u5F55\u3001\u672C\u673A\u7B14\u8BB0\u3001\u9605\u8BFB\u4F4D\u7F6E\u4E0E\u504F\u597D\u3002\u4E0D\u7533\u8BF7\u5E38\u9A7B\u7AD9\u70B9\u8BBF\u95EE\u3001\u6D4F\u89C8\u5386\u53F2\u6216\u989D\u5916\u4E0B\u8F7D\u6743\u9650\u3002"
        ],
        [
          "\u56FE\u7247\u3001\u94FE\u63A5\u4E0E\u5916\u90E8\u7F51\u7AD9",
          "\u9605\u8BFB\u5668\u4E0D\u4F1A\u81EA\u52A8\u52A0\u8F7D\u539F\u56FE\u3001\u5D4C\u5165\u5185\u5BB9\u6216\u5176\u4ED6\u5916\u90E8\u8D44\u6E90\u3002\u6765\u6E90\u4E0E\u6B63\u6587\u94FE\u63A5\u4F1A\u79FB\u9664\u51ED\u636E\u3001\u67E5\u8BE2\u53C2\u6570\u548C\u7247\u6BB5\u3002\u4E3B\u52A8\u6253\u5F00\u94FE\u63A5\uFF08\u5305\u62EC GitHub\uFF09\u65F6\uFF0C\u7531 Chrome \u8BBF\u95EE\u76EE\u6807\u7F51\u7AD9\uFF0C\u9002\u7528\u8BE5\u7F51\u7AD9\u7684\u9690\u79C1\u653F\u7B56\u3002"
        ],
        [
          "\u5907\u4EFD\u548C\u5BFC\u51FA\u6587\u4EF6",
          "\u5BFC\u51FA\u65F6\u95F4\u548C\u4FDD\u5B58\u4F4D\u7F6E\u7531\u4F60\u51B3\u5B9A\u3002Markdown \u5305\u542B\u6587\u7AE0\u3001\u7B14\u8BB0\u548C\u6807\u8BB0\u6587\u5B57\u6E05\u5355\uFF0C\u4E0D\u4FDD\u7559\u753B\u7B14\u3002JSON \u5907\u4EFD\u5305\u542B\u7B14\u8BB0\u3001\u6587\u5B57\u6807\u8BB0\u548C\u753B\u7B14\uFF0C\u4E0D\u5305\u542B\u9605\u8BFB\u4F4D\u7F6E\u548C\u663E\u793A\u504F\u597D\u3002\u6253\u5370\u6216 PDF \u4F7F\u7528\u6D4F\u89C8\u5668\u91CC\u80FD\u770B\u5230\u7684\u6392\u7248\uFF0C\u5305\u62EC\u6807\u8BB0\u548C\u753B\u7B14\uFF0C\u4FDD\u5B58\u524D\u8BF7\u68C0\u67E5\u3002\u5176\u4ED6\u8F6F\u4EF6\u6216\u540C\u6B65\u670D\u52A1\u53EF\u80FD\u8BBF\u95EE\u4F60\u9009\u62E9\u7684\u6587\u4EF6\u5939\u3002"
        ],
        [
          "\u5220\u9664\u548C\u8F6C\u79FB\u6570\u636E",
          "\u5220\u9664\u7B14\u8BB0\u540C\u65F6\u5220\u9664\u672C\u673A\u526F\u672C\u548C\u9605\u8BFB\u4F4D\u7F6E\uFF1B\u5378\u8F7D\u6269\u5C55\u4F1A\u5220\u9664\u5F53\u524D Chrome \u914D\u7F6E\u4E2D\u7684\u6269\u5C55\u6570\u636E\uFF0C\u5DF2\u5BFC\u51FA\u6587\u4EF6\u4E0D\u4F1A\u81EA\u52A8\u5220\u9664\u3002\u5378\u8F7D\u3001\u66F4\u6362\u914D\u7F6E\u6216\u8BBE\u5907\u524D\u8BF7\u5907\u4EFD\u3002\u7F51\u7AD9\u9605\u8BFB\u5668\u6F14\u793A\u53EA\u5728\u5F53\u524D\u9875\u9762\u4FDD\u7559\u7B14\u8BB0\uFF0C\u5237\u65B0\u5373\u6E05\u7A7A\u3002"
        ],
        [
          "\u8BF4\u660E\u8303\u56F4\u4E0E\u7591\u95EE",
          "\u672C\u6587\u5982\u5B9E\u8BF4\u660E\u5F53\u524D\u5F00\u53D1\u7248\u672C\uFF0C\u4E0D\u4EE3\u8868\u4EFB\u4F55\u8BA4\u8BC1\u3002Pageleaf \u539F\u521B\u4EE3\u7801\u6309 MIT \u8BB8\u53EF\u5F00\u6E90\u3002\u4EA7\u54C1\u6216\u9690\u79C1\u7591\u95EE\u53EF\u901A\u8FC7\u516C\u5F00 GitHub Issues \u63D0\u51FA\uFF0C\u4E0D\u8981\u53D1\u5E03\u654F\u611F\u8D44\u6599\u3002\u76EE\u524D\u6CA1\u6709\u53E6\u884C\u516C\u5E03\u7684\u652F\u6301\u90AE\u7BB1\u3002"
        ]
      ],
      "link": "\u901A\u8FC7 GitHub \u63D0\u95EE"
    },
    "about": {
      "title": "\u5173\u4E8E Pageleaf",
      "lead": "\u7528\u6765\u4FDD\u5B58\u7F51\u9875\u6587\u7AE0\u3001\u5212\u91CD\u70B9\u548C\u5199\u7B14\u8BB0\u7684\u5C0F\u5DE5\u5177\u3002",
      "sections": [
        [
          "\u80FD\u505A\u4EC0\u4E48",
          "\u4ECE Chrome \u6253\u5F00\u6587\u7AE0\uFF0C\u7ED9\u6587\u5B57\u5212\u7EBF\uFF0C\u7528\u753B\u7B14\u5708\u753B\uFF0C\u518D\u5199\u4E0B\u7B14\u8BB0\u3002\u53EF\u4EE5\u5B58\u5728\u672C\u673A\uFF0C\u4E5F\u53EF\u4EE5\u5BFC\u51FA\u6587\u4EF6\u3002\u5B89\u88C5\u524D\u53EF\u4EE5\u5148\u7528\u672C\u7AD9\u7684\u793A\u4F8B\u8BD5\u4E00\u8BD5\u3002"
        ],
        [
          "\u652F\u6301\u54EA\u4E9B\u8BED\u8A00",
          "\u754C\u9762\u548C\u5E2E\u52A9\u63D0\u4F9B\u82F1\u8BED\u3001\u7B80\u4F53\u4E2D\u6587\u3001\u897F\u73ED\u7259\u8BED\u3001\u6CD5\u8BED\u3001\u5FB7\u8BED\u3001\u65E5\u8BED\u548C\u963F\u62C9\u4F2F\u8BED\u3002\u9ED8\u8BA4\u8DDF\u968F\u6D4F\u89C8\u5668\u8BED\u8A00\uFF0C\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u5207\u6362\u3002\u4E0D\u652F\u6301\u7684\u8BED\u8A00\u4F7F\u7528\u82F1\u8BED\u3002\u4E0D\u4F1A\u7FFB\u8BD1\u6587\u7AE0\u539F\u6587\u3002"
        ],
        [
          "\u76EE\u524D\u7684\u7248\u672C",
          "0.3.1 \u662F\u5F00\u53D1\u7248\uFF0C\u8FD8\u6CA1\u4E0A\u67B6 Chrome \u5E94\u7528\u5546\u5E97\u3002\u6709\u4E9B\u7F51\u9875\u4E0D\u80FD\u6B63\u786E\u63D0\u53D6\uFF0C\u91CD\u8981\u5185\u5BB9\u8BF7\u5BF9\u7167\u539F\u6587\uFF0C\u5BFC\u51FA\u540E\u4E5F\u68C0\u67E5\u4E00\u4E0B\u3002"
        ],
        [
          "\u6E90\u7801\u548C\u8BB8\u53EF",
          "\u6E90\u7801\u653E\u5728 GitHub\uFF0C\u539F\u521B\u4EE3\u7801\u4F7F\u7528 MIT \u8BB8\u53EF\u3002\u968F\u9644\u8F6F\u4EF6\u4FDD\u7559\u5404\u81EA\u7684\u8BB8\u53EF\u3002\u7F51\u9875\u6587\u7AE0\u5C5E\u4E8E\u539F\u4F5C\u8005\uFF0C\u5206\u4EAB\u65F6\u8BF7\u4FDD\u7559\u6765\u6E90\u548C\u7F72\u540D\u3002"
        ],
        [
          "\u53CD\u9988\u95EE\u9898",
          "\u5728 GitHub Issues \u5199\u4E0B\u64CD\u4F5C\u6B65\u9AA4\u548C Chrome \u7248\u672C\uFF0C\u4E5F\u53EF\u4EE5\u53CD\u9988\u7FFB\u8BD1\u95EE\u9898\u3002\u4E0D\u8981\u9644\u4E0A\u79C1\u4EBA\u7B14\u8BB0\u3001\u5907\u4EFD\u3001\u5BC6\u7801\u6216\u4E2A\u4EBA\u8D44\u6599\u3002"
        ]
      ],
      "code": "\u6D4F\u89C8\u6E90\u7801",
      "releases": "\u7248\u672C\u8BB0\u5F55",
      "license": "\u67E5\u770B MIT \u8BB8\u53EF",
      "contribute": "\u8D21\u732E\u6307\u5357"
    }
  },
  "es": {
    "nav": [
      "Inicio",
      "Ayuda",
      "Privacidad",
      "Acerca de"
    ],
    "language": "Idioma",
    "skip": "Saltar al contenido",
    "theme": [
      "Usar fondo negro",
      "Usar fondo blanco"
    ],
    "footer": "C\xF3digo abierto. En tu dispositivo.",
    "version": "Versi\xF3n de desarrollo",
    "home": {
      "eyebrow": "Pageleaf para Chrome",
      "title": "Guarda una p\xE1gina.\nSubraya y toma notas.",
      "lead": "Guarda un art\xEDculo, marca los pasajes que necesitas y a\xF1ade tus notas. Cons\xE9rvalo en este dispositivo o exporta una copia.",
      "try": "Probar un ejemplo",
      "install": "Instalar la extensi\xF3n",
      "hint": "Gratis. Sin crear una cuenta.",
      "example": "PRUEBA CON ESTE ART\xCDCULO",
      "exampleTitle": "Preparar el evento de la pr\xF3xima semana",
      "exampleSource": "Art\xEDculo de ejemplo \xB7 Organizaci\xF3n",
      "exampleNote": "Mi nota",
      "exampleThought": "Pedir a Ana que confirme la sala antes del viernes.",
      "exampleBody": "Antes de enviar las invitaciones:",
      "featuresTitle": "Lee, marca y guarda lo que necesitas.",
      "features": [
        [
          "Guarda un art\xEDculo",
          "Captura el art\xEDculo completo o solo el texto seleccionado."
        ],
        [
          "Marca el texto",
          "Selecciona palabras y res\xE1ltalas o a\xF1ade un subrayado recto u ondulado."
        ],
        [
          "Dibuja en el art\xEDculo",
          "Usa el l\xE1piz para c\xEDrculos, flechas o marcas a mano. Se guardan con la nota."
        ],
        [
          "Re\xFAne lo marcado",
          "Revisa la lista de pasajes marcados y decide si la a\xF1ades a tus notas."
        ],
        [
          "Encuentra tus notas",
          "Busca en art\xEDculos y notas guardadas. Retoma la lectura donde la dejaste."
        ],
        [
          "Exporta o haz una copia",
          "Descarga Markdown, imprime PDF o guarda la biblioteca como JSON."
        ]
      ],
      "stepsTitle": "C\xF3mo se usa",
      "steps": [
        [
          "Abre un art\xEDculo",
          "En Chrome de escritorio, abre un art\xEDculo y pulsa el icono de Pageleaf."
        ],
        [
          "Marca y escribe",
          "Resalta o subraya el texto, dibuja con el l\xE1piz y escribe en Mis notas."
        ],
        [
          "Guarda los cambios",
          "Pulsa Guardar para conservar notas y marcas. Exporta si quieres otra copia."
        ]
      ],
      "localTitle": "D\xF3nde se guardan tus notas",
      "localBody": "Se guardan en el perfil de Chrome actual. Pageleaf no sube art\xEDculos ni notas. Haz una copia antes de desinstalar o cambiar de dispositivo.",
      "privacyLink": "Leer la privacidad",
      "helpLink": "Abrir la ayuda",
      "compatibility": "Requiere Chrome de escritorio 116 o posterior. Este desarrollo a\xFAn no est\xE1 en Chrome Web Store. No captura PDF, im\xE1genes ni algunas aplicaciones web.",
      "examplePoints": [
        "Confirma la sala y la fecha.",
        "Haz la lista de materiales.",
        "Asigna una persona a cada tarea."
      ],
      "exampleMarked": "Confirma la sala y la fecha."
    },
    "help": {
      "title": "Ayuda",
      "lead": "Instalaci\xF3n, marcas, notas y soluciones a problemas frecuentes.",
      "search": "Buscar en la ayuda",
      "placeholder": "Busca una funci\xF3n o un problema",
      "empty": "Sin resultados. Prueba otra palabra.",
      "results": "Resultados: {count}",
      "installTitle": "Instalar la versi\xF3n de desarrollo",
      "installIntro": "Pageleaf a\xFAn no est\xE1 en Chrome Web Store. Inst\xE1lalo solo si te sientes c\xF3modo usando el modo de desarrollador.",
      "installSteps": [
        "Descarga el ZIP de instalaci\xF3n de GitHub Releases y extr\xE1elo.",
        "Abre chrome://extensions en Chrome de escritorio y activa el modo de desarrollador.",
        "Pulsa \u201CCargar descomprimida\u201D y selecciona la carpeta con manifest.json. Si compilas el c\xF3digo, selecciona dist.",
        "Fija Pageleaf en el men\xFA de extensiones. Abre un art\xEDculo HTTP o HTTPS y pulsa su icono."
      ],
      "releases": "Descargar la \xFAltima versi\xF3n",
      "questions": [
        [
          "capture",
          "\xBFC\xF3mo capturo un art\xEDculo o una selecci\xF3n?",
          "Abre un art\xEDculo y pulsa el icono de Pageleaf. Selecciona texto antes para capturar solo ese pasaje. Solo lee contenido ya disponible en la p\xE1gina: no evita inicios de sesi\xF3n, muros de pago ni controles de acceso."
        ],
        [
          "save",
          "\xBFCu\xE1ndo se guarda realmente una nota?",
          "Pulsa Guardar nota para conservarla en el perfil de Chrome actual. Las capturas sin guardar son temporales: hasta seis en la memoria de sesi\xF3n, eliminaci\xF3n de las de m\xE1s de 24 horas al capturar de nuevo y borrado al cerrar Chrome. En la demostraci\xF3n web, actualizar la p\xE1gina borra las notas."
        ],
        [
          "mark",
          "\xBFC\xF3mo resalto texto?",
          "Selecciona texto en el art\xEDculo y pulsa Resaltar. La marca se aplica a esta copia. Pulsa Guardar para conservarla. En la demostraci\xF3n web, actualizar borra notas y marcas."
        ],
        [
          "underline",
          "\xBFC\xF3mo funcionan los subrayados rectos y ondulados?",
          "Selecciona texto y elige Subrayar o Subrayado ondulado. T\xFA decides qu\xE9 marcar. Pageleaf no decide si una frase es importante o incorrecta. Las marcas no cambian ni traducen el texto."
        ],
        [
          "pen",
          "\xBFPara qu\xE9 sirve el l\xE1piz?",
          "Elige L\xE1piz para rodear un p\xE1rrafo o dibujar una flecha. Pulsa Guardar despu\xE9s. Los dibujos se ajustan a las proporciones de la p\xE1gina; comprueba la posici\xF3n si cambias la ventana o el tama\xF1o de letra. No se reconocen como texto."
        ],
        [
          "organize",
          "\xBFQu\xE9 hace Crear notas?",
          "Prepara una lista de los textos que marcaste. Si no hay marcas de texto, toma la primera frase de cada secci\xF3n. Revisa la vista previa y decide si la a\xF1ades a Mis notas. Es una lista de extractos por reglas, no un resumen de IA: no juzga, verifica hechos ni interpreta dibujos."
        ],
        [
          "search",
          "\xBFQu\xE9 incluye la b\xFAsqueda?",
          "T\xEDtulos, fuentes, notas personales, texto del art\xEDculo y Markdown de la biblioteca guardada en este dispositivo. No busca en Internet."
        ],
        [
          "export",
          "\xBFC\xF3mo exporto Markdown o PDF?",
          "Copia Markdown o exporta un archivo .md con el art\xEDculo, su fuente y tu nota actual. Imprimir / PDF abre la ventana de impresi\xF3n de Chrome para elegir impresora o Guardar como PDF. Revisa el destino y la vista previa."
        ],
        [
          "backup",
          "\xBFC\xF3mo hago y restauro una copia de seguridad?",
          "Pulsa Copia de seguridad para descargar JSON. Elige Restaurar copia, selecciona el archivo, revisa el resumen y confirma. Se omiten notas con el mismo ID o la misma fuente, tipo de captura y texto. No se reemplazan notas existentes. No se incluyen posiciones ni preferencias."
        ],
        [
          "limits",
          "\xBFCu\xE1les son los l\xEDmites?",
          "Hasta 100 notas, con 1 MB por nota guardada o restaurada y 20 MB por archivo JSON. Una biblioteca completa puede superar el l\xEDmite del archivo: exporta notas individuales como Markdown y reduce la biblioteca antes de crear la copia JSON."
        ],
        [
          "progress",
          "\xBFC\xF3mo se recuerda la posici\xF3n?",
          "Solo las notas guardadas recuerdan d\xF3nde le\xEDas. Vuelve a abrirlas en este dispositivo para continuar. Al borrar una nota se borra su posici\xF3n; las copias no incluyen posiciones."
        ],
        [
          "shortcuts",
          "\xBFQu\xE9 atajos puedo usar?",
          "Alt / Option + Shift + L captura el art\xEDculo. Si no funciona, revisa los conflictos en chrome://extensions/shortcuts. Tab y Shift + Tab mueven el foco; Intro o Espacio activan los controles. Tambi\xE9n funciona el atajo de impresi\xF3n del navegador."
        ],
        [
          "troubleshooting",
          "\xBFPor qu\xE9 falta una p\xE1gina o parte del texto?",
          "No admite PDF, p\xE1ginas internas del navegador, Chrome Web Store, im\xE1genes ni v\xEDdeos. Algunas aplicaciones o dise\xF1os complejos fallan: prueba a seleccionar el p\xE1rrafo. No carga paginaci\xF3n oculta ni iframes. Elimina im\xE1genes; las tablas complejas y f\xF3rmulas pueden necesitar edici\xF3n."
        ],
        [
          "links",
          "\xBFPor qu\xE9 cambi\xF3 un enlace?",
          "Se eliminan credenciales, par\xE1metros de consulta y fragmentos de los enlaces para proteger la privacidad. Algunos sitios necesitan esos par\xE1metros: restaura la direcci\xF3n original manualmente. Al abrir un enlace se aplica la pol\xEDtica de ese sitio."
        ],
        [
          "delete",
          "\xBFC\xF3mo borro o traslado mis datos?",
          "Haz una copia antes de desinstalar o cambiar de perfil. Borrar una nota elimina su copia local y su posici\xF3n. Desinstalar elimina los datos locales de la extensi\xF3n, pero no los archivos exportados: b\xF3rralos aparte. Restaura JSON en otro perfil para trasladar las notas."
        ],
        [
          "feedback",
          "\xBFC\xF3mo informo de un problema?",
          "Describe los pasos, la versi\xF3n de Chrome y el resultado esperado en GitHub Issues. Comparte una URL p\xFAblica solo si corresponde. No subas art\xEDculos privados, copias de notas, contrase\xF1as ni datos personales. GitHub tiene sus propias pol\xEDticas."
        ]
      ],
      "feedback": "Informar en GitHub"
    },
    "privacy": {
      "title": "Privacidad",
      "lead": "Qu\xE9 lee Pageleaf, qu\xE9 guarda y c\xF3mo borrarlo.",
      "updated": "Pageleaf 0.3.1 \xB7 25 de octubre de 2026",
      "sections": [
        [
          "Procesamiento local",
          "Pageleaf extrae texto en tu dispositivo. No sube art\xEDculos ni notas a un servidor. No tiene anal\xEDtica, rastreadores publicitarios, cuentas ni sincronizaci\xF3n en la nube."
        ],
        [
          "Capturas temporales",
          "El t\xEDtulo, la URL depurada, el texto, el HTML depurado y el Markdown permanecen en la memoria de sesi\xF3n de Chrome. Se guardan hasta seis capturas; las de m\xE1s de 24 horas se eliminan al capturar de nuevo. Cerrar Chrome las borra."
        ],
        [
          "Notas y preferencias",
          "Guardar conserva el art\xEDculo, tus notas, marcas de texto, dibujos y fechas en el perfil Chrome actual. Tambi\xE9n puede guardar la posici\xF3n de lectura. Idioma, apariencia y tama\xF1o de letra son preferencias locales. Pageleaf no a\xF1ade cifrado; quien acceda al perfil podr\xEDa leer los datos."
        ],
        [
          "Permisos justificados",
          "activeTab da acceso temporal a la p\xE1gina elegida mediante el icono o atajo. scripting extrae el contenido. storage conserva capturas, notas, posiciones y preferencias. No se solicita acceso permanente a sitios, historial ni permiso adicional de descargas."
        ],
        [
          "Im\xE1genes y sitios externos",
          "El lector no carga autom\xE1ticamente im\xE1genes, elementos incrustados ni otros recursos externos. Elimina credenciales, par\xE1metros y fragmentos de los enlaces. Si abres un enlace, incluido GitHub, Chrome visita el destino y se aplica su pol\xEDtica de privacidad."
        ],
        [
          "Archivos exportados",
          "T\xFA eliges cu\xE1ndo y d\xF3nde exportar. Markdown incluye art\xEDculo, notas y lista de textos marcados, pero no dibujos. JSON conserva notas, marcas y dibujos, sin posiciones de lectura ni preferencias. Imprimir / PDF usa la vista del navegador, con marcas y dibujos: rev\xEDsala antes de guardar. Otras aplicaciones o servicios de sincronizaci\xF3n podr\xEDan acceder a la carpeta."
        ],
        [
          "Borrar o trasladar",
          "Borrar una nota elimina su copia local y posici\xF3n. Desinstalar elimina los datos de la extensi\xF3n en ese perfil. Los archivos exportados no se borran autom\xE1ticamente. Haz una copia antes de cambiar de perfil o dispositivo. La demostraci\xF3n web pierde las notas al actualizar."
        ],
        [
          "Alcance y preguntas",
          "Esta descripci\xF3n corresponde al desarrollo actual; no afirma ninguna certificaci\xF3n. El c\xF3digo original usa la licencia MIT. Puedes preguntar en GitHub Issues sin publicar informaci\xF3n sensible. No se ha publicado un correo de soporte separado."
        ]
      ],
      "link": "Preguntar en GitHub"
    },
    "about": {
      "title": "Acerca de Pageleaf",
      "lead": "Guarda art\xEDculos web para marcarlos, escribir notas y encontrarlos despu\xE9s.",
      "sections": [
        [
          "Qu\xE9 hace",
          "Abre art\xEDculos desde Chrome, subraya, dibuja y escribe notas. Gu\xE1rdalos localmente o exporta un archivo. Puedes probar un ejemplo en este sitio antes de instalar."
        ],
        [
          "Idiomas",
          "Interfaz y ayuda en ingl\xE9s, chino simplificado, espa\xF1ol, franc\xE9s, alem\xE1n, japon\xE9s y \xE1rabe. Sigue el idioma del navegador hasta que elijas otro. Los idiomas no admitidos usan ingl\xE9s. El art\xEDculo no se traduce."
        ],
        [
          "Estado del desarrollo",
          "0.3.1 es una versi\xF3n de desarrollo a\xFAn no publicada en Chrome Web Store. Algunas p\xE1ginas no se capturan bien. Contrasta los pasajes importantes con el original y revisa tus exportaciones."
        ],
        [
          "C\xF3digo y licencias",
          "C\xF3digo original en GitHub bajo MIT. El software incluido conserva sus licencias. Los art\xEDculos pertenecen a sus autores; conserva fuente y atribuci\xF3n al compartirlos."
        ],
        [
          "Informar de un problema",
          "Describe los pasos y tu versi\xF3n de Chrome en GitHub Issues. Tambi\xE9n puedes corregir una traducci\xF3n. No adjuntes notas privadas, copias, contrase\xF1as ni datos personales."
        ]
      ],
      "code": "Explorar el c\xF3digo",
      "releases": "Historial de versiones",
      "license": "Licencia MIT",
      "contribute": "Gu\xEDa para contribuir"
    }
  },
  "fr": {
    "nav": [
      "Accueil",
      "Centre d\u2019aide",
      "Confidentialit\xE9",
      "\xC0 propos"
    ],
    "language": "Langue",
    "skip": "Aller au contenu",
    "theme": [
      "Utiliser le fond noir",
      "Utiliser le fond blanc"
    ],
    "footer": "Code ouvert. Sur votre appareil.",
    "version": "Version de d\xE9veloppement",
    "home": {
      "eyebrow": "Pageleaf pour Chrome",
      "title": "Gardez une page.\nSoulignez. Prenez des notes.",
      "lead": "Enregistrez un article, marquez les passages utiles et ajoutez vos notes. Gardez le tout sur cet appareil ou exportez une copie.",
      "try": "Essayer un exemple",
      "install": "Installer l\u2019extension",
      "hint": "Gratuit. Sans cr\xE9er de compte.",
      "example": "ESSAYEZ AVEC CET ARTICLE",
      "exampleTitle": "Pr\xE9parer l\u2019\xE9v\xE9nement de la semaine prochaine",
      "exampleSource": "Article d\u2019exemple \xB7 Organisation",
      "exampleNote": "Ma note",
      "exampleThought": "Demander \xE0 L\xE9a de confirmer la salle avant vendredi.",
      "exampleBody": "Avant d\u2019envoyer les invitations :",
      "featuresTitle": "Lisez, marquez et gardez ce qui vous sert.",
      "features": [
        [
          "Enregistrer un article",
          "Capturez tout l\u2019article ou seulement le texte s\xE9lectionn\xE9."
        ],
        [
          "Marquer le texte",
          "Surlignez une s\xE9lection ou ajoutez un soulignement droit ou ondul\xE9."
        ],
        [
          "Dessiner sur l\u2019article",
          "Utilisez le stylo pour des cercles, fl\xE8ches et marques manuscrites."
        ],
        [
          "Rassembler les passages",
          "V\xE9rifiez la liste des textes marqu\xE9s avant de l\u2019ajouter \xE0 vos notes."
        ],
        [
          "Retrouver vos notes",
          "Recherchez dans vos articles et notes. Reprenez \xE0 la position enregistr\xE9e."
        ],
        [
          "Exporter ou sauvegarder",
          "T\xE9l\xE9chargez du Markdown, imprimez un PDF ou sauvegardez la biblioth\xE8que en JSON."
        ]
      ],
      "stepsTitle": "Comment l\u2019utiliser",
      "steps": [
        [
          "Ouvrir un article",
          "Ouvrez un article dans Chrome sur ordinateur et cliquez sur Pageleaf."
        ],
        [
          "Marquer et \xE9crire",
          "Surlignez, soulignez, dessinez avec le stylo et \xE9crivez dans Mes notes."
        ],
        [
          "Enregistrer",
          "Cliquez sur Enregistrer pour garder notes et marques. Exportez pour en avoir une autre copie."
        ]
      ],
      "localTitle": "O\xF9 sont vos notes ?",
      "localBody": "Dans votre profil Chrome actuel. Pageleaf n\u2019envoie ni articles ni notes \xE0 un serveur. Sauvegardez avant de d\xE9sinstaller ou de changer d\u2019appareil.",
      "privacyLink": "Lire les d\xE9tails de confidentialit\xE9",
      "helpLink": "Ouvrir l\u2019aide",
      "compatibility": "Chrome sur ordinateur 116 ou ult\xE9rieur. Cette version de d\xE9veloppement n\u2019est pas encore sur le Chrome Web Store. PDF, images et certaines applications web ne peuvent pas \xEAtre captur\xE9s.",
      "examplePoints": [
        "Confirmer la salle et la date.",
        "Lister le mat\xE9riel n\xE9cessaire.",
        "Attribuer chaque t\xE2che \xE0 une personne."
      ],
      "exampleMarked": "Confirmer la salle et la date."
    },
    "help": {
      "title": "Centre d\u2019aide",
      "lead": "Installation, marques sur les articles, enregistrement et probl\xE8mes courants.",
      "search": "Rechercher dans l\u2019aide",
      "placeholder": "Une fonction ou un probl\xE8me",
      "empty": "Aucun r\xE9sultat. Essayez un autre mot.",
      "results": "R\xE9sultats : {count}",
      "installTitle": "Installer la version de d\xE9veloppement",
      "installIntro": "Pageleaf n\u2019est pas encore sur le Chrome Web Store. Installez-le uniquement si vous \xEAtes \xE0 l\u2019aise avec le mode d\xE9veloppeur.",
      "installSteps": [
        "T\xE9l\xE9chargez le ZIP d\u2019installation depuis GitHub Releases et d\xE9compressez-le.",
        "Ouvrez chrome://extensions dans Chrome sur ordinateur et activez le mode d\xE9veloppeur.",
        "Choisissez \xAB Charger l\u2019extension non empaquet\xE9e \xBB, puis le dossier contenant manifest.json. Apr\xE8s compilation, choisissez dist.",
        "\xC9pinglez Pageleaf dans le menu des extensions. Ouvrez un article HTTP ou HTTPS et cliquez sur l\u2019ic\xF4ne."
      ],
      "releases": "T\xE9l\xE9charger la derni\xE8re version",
      "questions": [
        [
          "capture",
          "Comment capturer un article ou une s\xE9lection ?",
          "Ouvrez un article et cliquez sur Pageleaf. S\xE9lectionnez du texte avant de cliquer pour ne garder que ce passage. L\u2019extension lit uniquement le contenu disponible : elle ne contourne ni connexion, ni acc\xE8s payant, ni contr\xF4le d\u2019acc\xE8s."
        ],
        [
          "save",
          "Quand une note est-elle enregistr\xE9e ?",
          "Cliquez sur Enregistrer la note pour la garder dans le profil Chrome actuel. Les captures temporaires restent en m\xE9moire de session : six au maximum ; celles de plus de 24 heures sont supprim\xE9es \xE0 la prochaine capture. Fermer Chrome les efface. Dans la d\xE9mo web, actualiser efface les notes."
        ],
        [
          "mark",
          "Comment surligner du texte ?",
          "S\xE9lectionnez du texte puis choisissez Surligner. La marque appartient \xE0 cette copie de l\u2019article. Cliquez sur Enregistrer pour la garder. Actualiser la d\xE9mo web efface notes et marques."
        ],
        [
          "underline",
          "Comment souligner avec un trait droit ou ondul\xE9 ?",
          "S\xE9lectionnez du texte et choisissez Souligner ou Soulignement ondul\xE9. Vous d\xE9cidez quoi marquer. Pageleaf ne juge pas si une phrase est importante ou incorrecte. Les marques ne modifient ni ne traduisent le texte."
        ],
        [
          "pen",
          "\xC0 quoi sert le stylo ?",
          "Choisissez Stylo pour entourer un passage ou dessiner une fl\xE8che, puis enregistrez. Les dessins suivent les proportions de la page : v\xE9rifiez leur place apr\xE8s un changement de fen\xEAtre ou de taille du texte. Ils ne sont pas reconnus comme du texte."
        ],
        [
          "organize",
          "Que fait Pr\xE9parer les notes ?",
          "Une liste reprend les textes marqu\xE9s. Sans marque de texte, elle prend la premi\xE8re phrase de chaque section. V\xE9rifiez l\u2019aper\xE7u, puis d\xE9cidez de l\u2019ajouter \xE0 Mes notes. Ce sont des extraits choisis par r\xE8gles, pas un r\xE9sum\xE9 par IA : aucun jugement, v\xE9rification des faits ou lecture des dessins."
        ],
        [
          "search",
          "Que recherche la biblioth\xE8que ?",
          "Les titres, sources, notes personnelles, texte des articles et Markdown enregistr\xE9s sur cet appareil. Elle ne recherche pas sur le web."
        ],
        [
          "export",
          "Comment exporter en Markdown ou PDF ?",
          "Copiez le Markdown ou exportez un fichier .md avec l\u2019article, la source et votre note actuelle. Imprimer / PDF ouvre la fen\xEAtre d\u2019impression de Chrome : choisissez une imprimante ou Enregistrer au format PDF. V\xE9rifiez la destination et l\u2019aper\xE7u."
        ],
        [
          "backup",
          "Comment sauvegarder et restaurer ?",
          "Sauvegarde t\xE9l\xE9charge un fichier JSON. Restaurer permet de le choisir, v\xE9rifier le r\xE9sum\xE9 et confirmer. Les notes de m\xEAme ID, ou de m\xEAmes source, type de capture et texte, sont ignor\xE9es. Aucune note existante n\u2019est remplac\xE9e. Positions et pr\xE9f\xE9rences sont exclues."
        ],
        [
          "limits",
          "Quelles sont les limites ?",
          "100 notes au maximum, 1 Mo par note enregistr\xE9e ou restaur\xE9e et 20 Mo par fichier JSON. Une biblioth\xE8que peut d\xE9passer la limite JSON : exportez des notes individuelles en Markdown et r\xE9duisez la biblioth\xE8que avant la sauvegarde."
        ],
        [
          "progress",
          "Comment fonctionne la position de lecture ?",
          "Seules les notes enregistr\xE9es m\xE9morisent une position. Rouvrez-les sur cet appareil pour reprendre. Supprimer une note supprime aussi sa position, absente des sauvegardes."
        ],
        [
          "shortcuts",
          "Quels raccourcis utiliser ?",
          "Alt / Option + Maj + L capture l\u2019article. En cas de conflit, consultez chrome://extensions/shortcuts. Tab et Maj + Tab d\xE9placent le focus ; Entr\xE9e ou Espace activent les contr\xF4les. Le raccourci d\u2019impression du navigateur fonctionne aussi."
        ],
        [
          "troubleshooting",
          "Pourquoi une page est-elle incompl\xE8te ?",
          "PDF, pages internes, Chrome Web Store, images et vid\xE9os ne sont pas pris en charge. Certaines applications et mises en page \xE9chouent : essayez de s\xE9lectionner le paragraphe. La pagination masqu\xE9e et les iframes ne sont pas charg\xE9s. Les images sont retir\xE9es ; tableaux complexes et formules peuvent n\xE9cessiter une retouche."
        ],
        [
          "links",
          "Pourquoi un lien a-t-il chang\xE9 ?",
          "Les identifiants, param\xE8tres de requ\xEAte et fragments sont retir\xE9s des liens pour limiter les fuites. Certains sites n\xE9cessitent ces param\xE8tres : r\xE9tablissez alors l\u2019adresse originale. Un lien ouvert rel\xE8ve de la politique du site visit\xE9."
        ],
        [
          "delete",
          "Comment supprimer ou d\xE9placer mes donn\xE9es ?",
          "Sauvegardez avant de d\xE9sinstaller ou changer de profil. Supprimer une note retire sa copie locale et sa position. D\xE9sinstaller efface les donn\xE9es de l\u2019extension, pas les fichiers export\xE9s : supprimez-les s\xE9par\xE9ment. Restaurez le JSON dans un autre profil pour transf\xE9rer les notes."
        ],
        [
          "feedback",
          "Comment signaler un probl\xE8me ?",
          "D\xE9crivez les \xE9tapes, la version de Chrome et le r\xE9sultat attendu sur GitHub Issues. Ne partagez qu\u2019une URL publique appropri\xE9e. N\u2019envoyez pas d\u2019article priv\xE9, de sauvegarde, de mot de passe ni de donn\xE9es personnelles. GitHub applique ses propres r\xE8gles."
        ]
      ],
      "feedback": "Signaler sur GitHub"
    },
    "privacy": {
      "title": "Confidentialit\xE9",
      "lead": "Ce que Pageleaf lit, conserve et permet de supprimer.",
      "updated": "Pageleaf 0.3.1 \xB7 25 octobre 2026",
      "sections": [
        [
          "Traitement local",
          "Pageleaf extrait le texte sur votre appareil, sans envoyer articles ou notes \xE0 un serveur. Aucun outil d\u2019analyse, traceur publicitaire, compte ni synchronisation cloud."
        ],
        [
          "Captures temporaires",
          "Titre, adresse nettoy\xE9e, texte, structure nettoy\xE9e et Markdown restent dans la m\xE9moire de session Chrome. Six captures au maximum ; celles de plus de 24 heures sont retir\xE9es lors d\u2019une nouvelle capture. Fermer Chrome les efface."
        ],
        [
          "Notes et pr\xE9f\xE9rences",
          "Enregistrer conserve article, notes, marques de texte, dessins et dates dans le profil Chrome actuel. Une position de lecture peut aussi \xEAtre gard\xE9e. Langue, apparence et taille du texte sont locales. Pageleaf n\u2019ajoute pas de chiffrement ; une personne ayant acc\xE8s au profil pourrait lire ces donn\xE9es."
        ],
        [
          "Des permissions utiles",
          "activeTab donne un acc\xE8s temporaire \xE0 la page choisie via l\u2019ic\xF4ne ou le raccourci. scripting en extrait le texte. storage conserve captures, notes, positions et pr\xE9f\xE9rences. Aucun acc\xE8s permanent aux sites, \xE0 l\u2019historique ou permission de t\xE9l\xE9chargement suppl\xE9mentaire."
        ],
        [
          "Images et sites externes",
          "Le lecteur ne charge automatiquement ni images originales ni contenus int\xE9gr\xE9s ou autres ressources externes. Identifiants, param\xE8tres et fragments sont retir\xE9s des liens. Si vous ouvrez un lien, y compris GitHub, Chrome visite ce site selon sa propre politique."
        ],
        [
          "Fichiers export\xE9s",
          "Vous choisissez quand et o\xF9 exporter. Markdown contient article, notes et liste des textes marqu\xE9s, mais pas les dessins. JSON conserve notes, marques et dessins, sans positions ni pr\xE9f\xE9rences. Imprimer / PDF utilise l\u2019affichage du navigateur avec les marques et dessins : v\xE9rifiez-le avant de sauvegarder. D\u2019autres logiciels ou services de synchronisation peuvent acc\xE9der au dossier choisi."
        ],
        [
          "Supprimer ou d\xE9placer",
          "Supprimer une note retire sa copie locale et sa position. D\xE9sinstaller efface les donn\xE9es de l\u2019extension du profil, pas les exports. Sauvegardez avant de changer de profil ou d\u2019appareil. La d\xE9mo web efface ses notes \xE0 l\u2019actualisation."
        ],
        [
          "Port\xE9e et questions",
          "Cette description concerne la version de d\xE9veloppement actuelle et ne revendique aucune certification. Le code original est sous licence MIT. Posez vos questions sur GitHub Issues sans information sensible. Aucune adresse de support distincte n\u2019est publi\xE9e."
        ]
      ],
      "link": "Poser une question sur GitHub"
    },
    "about": {
      "title": "\xC0 propos de Pageleaf",
      "lead": "Enregistrez des articles web pour les annoter, prendre des notes et les retrouver.",
      "sections": [
        [
          "Les fonctions",
          "Ouvrez un article depuis Chrome, soulignez, dessinez et prenez des notes. Enregistrez localement ou exportez un fichier. Un exemple sur ce site permet d\u2019essayer avant l\u2019installation."
        ],
        [
          "Les langues",
          "Interface et aide en anglais, chinois simplifi\xE9, espagnol, fran\xE7ais, allemand, japonais et arabe. La langue suit le navigateur jusqu\u2019\xE0 votre choix. Les langues non prises en charge utilisent l\u2019anglais. Les articles ne sont pas traduits."
        ],
        [
          "\xC9tat du d\xE9veloppement",
          "0.3.1 est une version de d\xE9veloppement non publi\xE9e sur le Chrome Web Store. Certaines pages sont mal captur\xE9es. Comparez les passages importants \xE0 l\u2019original et v\xE9rifiez vos exports."
        ],
        [
          "Code et licences",
          "Code original sur GitHub sous MIT. Les logiciels inclus conservent leurs licences. Les articles appartiennent \xE0 leurs auteurs : gardez source et attribution lors du partage."
        ],
        [
          "Signaler un probl\xE8me",
          "D\xE9crivez les \xE9tapes et la version de Chrome sur GitHub Issues. Les corrections de traduction sont aussi bienvenues. Ne joignez ni notes priv\xE9es, ni sauvegardes, ni mots de passe ou donn\xE9es personnelles."
        ]
      ],
      "code": "Explorer le code",
      "releases": "Historique des versions",
      "license": "Licence MIT",
      "contribute": "Guide de contribution"
    }
  },
  "de": {
    "nav": [
      "Start",
      "Hilfe",
      "Datenschutz",
      "\xDCber Pageleaf"
    ],
    "language": "Sprache",
    "skip": "Zum Inhalt springen",
    "theme": [
      "Schwarzen Hintergrund verwenden",
      "Wei\xDFen Hintergrund verwenden"
    ],
    "footer": "Offener Quellcode. Auf deinem Ger\xE4t.",
    "version": "Entwicklungsversion",
    "home": {
      "eyebrow": "Pageleaf f\xFCr Chrome",
      "title": "Seite speichern.\nMarkieren. Notizen machen.",
      "lead": "Speichere einen Artikel, unterstreiche wichtige Stellen und schreibe eigene Notizen. Behalte alles auf diesem Ger\xE4t oder exportiere eine Kopie.",
      "try": "Beispiel ausprobieren",
      "install": "Erweiterung installieren",
      "hint": "Kostenlos. Ohne Anmeldung.",
      "example": "MIT DIESEM ARTIKEL AUSPROBIEREN",
      "exampleTitle": "Die Veranstaltung n\xE4chste Woche planen",
      "exampleSource": "Beispielartikel \xB7 Veranstaltungsplanung",
      "exampleNote": "Meine Notiz",
      "exampleThought": "Lea bis Freitag um die Raumbest\xE4tigung bitten.",
      "exampleBody": "Vor dem Versand der Einladungen:",
      "featuresTitle": "Lesen, markieren und wiederfinden.",
      "features": [
        [
          "Artikel speichern",
          "Erfasse den ganzen Artikel oder nur den ausgew\xE4hlten Text."
        ],
        [
          "Text markieren",
          "Hebe W\xF6rter hervor oder unterstreiche sie gerade oder wellenf\xF6rmig."
        ],
        [
          "Im Artikel zeichnen",
          "Zeichne Kreise, Pfeile oder eigene Zeichen mit dem Stift."
        ],
        [
          "Markierte Stellen sammeln",
          "Pr\xFCfe die Liste deiner Textmarkierungen und \xFCbernimm sie bei Bedarf in die Notizen."
        ],
        [
          "Notizen finden",
          "Durchsuche gespeicherte Artikel und Notizen. Lies an der gespeicherten Position weiter."
        ],
        [
          "Exportieren und sichern",
          "Lade Markdown herunter, drucke als PDF oder sichere die Bibliothek als JSON."
        ]
      ],
      "stepsTitle": "So funktioniert es",
      "steps": [
        [
          "Artikel \xF6ffnen",
          "\xD6ffne einen Webartikel in Chrome am Computer und klicke auf Pageleaf."
        ],
        [
          "Markieren und schreiben",
          "Markiere Text, zeichne mit dem Stift und schreibe unter Meine Notizen."
        ],
        [
          "\xC4nderungen speichern",
          "Klicke auf Speichern, um Notizen und Markierungen zu behalten. Exportiere bei Bedarf eine weitere Kopie."
        ]
      ],
      "localTitle": "Wo deine Notizen liegen",
      "localBody": "Im aktuellen Chrome-Profil. Pageleaf l\xE4dt keine Artikel oder Notizen hoch. Sichere sie vor Deinstallation oder Ger\xE4tewechsel.",
      "privacyLink": "Datenschutzhinweise lesen",
      "helpLink": "Hilfe \xF6ffnen",
      "compatibility": "F\xFCr Chrome am Computer ab Version 116. Diese Entwicklungsversion ist noch nicht im Chrome Web Store. PDFs, Bilder und manche Webanwendungen k\xF6nnen nicht erfasst werden.",
      "examplePoints": [
        "Raum und Datum best\xE4tigen.",
        "Ben\xF6tigte Materialien auflisten.",
        "Jeder Aufgabe eine Person zuordnen."
      ],
      "exampleMarked": "Raum und Datum best\xE4tigen."
    },
    "help": {
      "title": "Hilfe",
      "lead": "Installation, Markierungen, Notizen und h\xE4ufige Probleme.",
      "search": "Hilfe durchsuchen",
      "placeholder": "Nach Funktion oder Problem suchen",
      "empty": "Keine Treffer. Versuche ein anderes Wort.",
      "results": "Ergebnisse: {count}",
      "installTitle": "Entwicklungsversion installieren",
      "installIntro": "Pageleaf ist noch nicht im Chrome Web Store. Installiere die entpackte Version nur, wenn du mit dem Entwicklermodus vertraut bist.",
      "installSteps": [
        "Lade das Installations-ZIP von GitHub Releases herunter und entpacke es.",
        "\xD6ffne chrome://extensions in Chrome am Computer und aktiviere den Entwicklermodus.",
        "W\xE4hle \u201EEntpackte Erweiterung laden\u201C und den Ordner mit manifest.json. Nach einem Quellcode-Build w\xE4hle dist.",
        "Hefte Pageleaf im Erweiterungsmen\xFC an. \xD6ffne einen HTTP- oder HTTPS-Artikel und klicke auf das Symbol."
      ],
      "releases": "Neueste Version herunterladen",
      "questions": [
        [
          "capture",
          "Wie erfasse ich Artikel oder markierten Text?",
          "\xD6ffne einen Artikel und klicke auf Pageleaf. Markiere vorher Text, um nur diesen Abschnitt zu erfassen. Es wird nur bereits zug\xE4nglicher Inhalt gelesen. Anmeldungen, Bezahlschranken und Zugangskontrollen werden nicht umgangen."
        ],
        [
          "save",
          "Wann wird eine Notiz gespeichert?",
          "Klicke auf Notiz speichern, um sie im aktuellen Chrome-Profil zu behalten. Ungespeicherte Erfassungen bleiben vor\xFCbergehend im Sitzungsspeicher: maximal sechs; \xFCber 24 Stunden alte werden bei einer neuen Erfassung entfernt. Beim Beenden von Chrome werden sie gel\xF6scht. In der Webdemo gehen Notizen beim Neuladen verloren."
        ],
        [
          "mark",
          "Wie hebe ich Text hervor?",
          "W\xE4hle Text im Artikel aus und klicke auf Hervorheben. Die Markierung geh\xF6rt zu dieser Artikelkopie. Klicke zum Behalten auf Speichern. In der Webdemo l\xF6scht Neuladen alle Notizen und Markierungen."
        ],
        [
          "underline",
          "Wie funktionieren gerade und wellenf\xF6rmige Unterstreichungen?",
          "W\xE4hle Text aus, dann Unterstreichen oder Wellenlinie. Du entscheidest, was markiert wird. Pageleaf bewertet nicht, ob ein Satz wichtig oder falsch ist. Der Originaltext bleibt unver\xE4ndert und wird nicht \xFCbersetzt."
        ],
        [
          "pen",
          "Was kann ich mit dem Stift machen?",
          "W\xE4hle Stift, um einen Absatz einzukreisen oder einen Pfeil zu zeichnen. Danach speichern. Zeichnungen folgen den Seitenproportionen; pr\xFCfe ihre Position nach \xC4nderungen an Fenster oder Schriftgr\xF6\xDFe. Die Striche werden nicht als Text erkannt."
        ],
        [
          "organize",
          "Was macht Notizen erstellen?",
          "Eine Vorschau listet deine Textmarkierungen auf. Ohne Textmarkierungen nimmt sie den ersten Satz jedes Abschnitts. Du entscheidest, ob sie in Meine Notizen \xFCbernommen wird. Das sind regelbasierte Ausz\xFCge, keine KI-Zusammenfassung. Fakten, Wichtigkeit und Stiftzeichnungen werden nicht ausgewertet."
        ],
        [
          "search",
          "Was durchsucht die Suche?",
          "Titel, Quellen, pers\xF6nliche Notizen, Artikeltext und Markdown in der gespeicherten Bibliothek dieses Ger\xE4ts. Keine Internetsuche."
        ],
        [
          "export",
          "Wie exportiere ich Markdown oder PDF?",
          "Kopiere Markdown oder exportiere eine .md-Datei mit Artikel, Quelle und aktueller Notiz. Drucken / PDF \xF6ffnet Chromes Druckdialog. W\xE4hle einen Drucker oder Als PDF speichern und pr\xFCfe Ziel und Vorschau."
        ],
        [
          "backup",
          "Wie sichere ich die Bibliothek?",
          "Sicherung l\xE4dt eine JSON-Datei herunter. W\xE4hle beim Wiederherstellen die Datei, pr\xFCfe die Zusammenfassung und best\xE4tige. Gleiche ID oder gleiche Quelle, Erfassungsart und Artikeltext werden \xFCbersprungen. Vorhandene Notizen bleiben erhalten. Lesepositionen und Einstellungen sind nicht enthalten."
        ],
        [
          "limits",
          "Welche Grenzen gelten?",
          "Bis zu 100 Notizen, jeweils h\xF6chstens 1 MB beim Speichern oder Wiederherstellen. Eine JSON-Sicherung darf maximal 20 MB gro\xDF sein. Eine Bibliothek kann diese Dateigrenze \xFCberschreiten: Exportiere einzelne Markdown-Dateien und verkleinere die Bibliothek vor der Sicherung."
        ],
        [
          "progress",
          "Wie funktioniert die Leseposition?",
          "Nur gespeicherte Notizen merken sich die Position. \xD6ffne sie auf diesem Ger\xE4t erneut, um weiterzulesen. L\xF6schen entfernt auch die Position. Sicherungen enthalten keine Lesepositionen."
        ],
        [
          "shortcuts",
          "Welche Tastaturk\xFCrzel gibt es?",
          "Alt / Option + Umschalt + L erfasst den Artikel. Bei Problemen pr\xFCfe chrome://extensions/shortcuts auf Konflikte. Tab und Umschalt + Tab wechseln den Fokus, Eingabe oder Leertaste aktivieren Bedienelemente. Auch das Druckk\xFCrzel des Browsers funktioniert."
        ],
        [
          "troubleshooting",
          "Warum fehlt Inhalt oder eine ganze Seite?",
          "PDFs, interne Browserseiten, der Chrome Web Store, Bilder und Videos sind nicht unterst\xFCtzt. Manche Anwendungen oder komplexe Layouts lassen sich nicht zuverl\xE4ssig erfassen. Markiere zun\xE4chst einen Absatz. Versteckte Folgeseiten und iframes werden nicht geladen. Bilder werden entfernt; komplexe Tabellen und Formeln brauchen eventuell Nacharbeit."
        ],
        [
          "links",
          "Warum wurde ein Link ver\xE4ndert?",
          "Zugangsdaten, Abfrageparameter und Fragmente werden zum Datenschutz aus Links entfernt. Manche Seiten ben\xF6tigen Parameter: Erg\xE4nze die Originaladresse bei Bedarf selbst. Beim \xD6ffnen gilt die Datenschutzrichtlinie der Zielseite."
        ],
        [
          "delete",
          "Wie l\xF6sche oder \xFCbertrage ich Daten?",
          "Sichere vor Deinstallation oder Profilwechsel. Eine gel\xF6schte Notiz verliert auch ihre Leseposition. Die Deinstallation entfernt lokale Erweiterungsdaten, aber keine exportierten Dateien: L\xF6sche diese separat. Stelle JSON im anderen Profil wieder her, um Notizen zu \xFCbertragen."
        ],
        [
          "feedback",
          "Wie melde ich sicher ein Problem?",
          "Beschreibe Schritte, Chrome-Version und erwartetes Verhalten in GitHub Issues. Teile nur passende \xF6ffentliche Beispieladressen. Keine privaten Artikel, Sicherungen, Passw\xF6rter oder pers\xF6nlichen Daten hochladen. F\xFCr GitHub gelten eigene Richtlinien."
        ]
      ],
      "feedback": "Problem auf GitHub melden"
    },
    "privacy": {
      "title": "Datenschutz",
      "lead": "Was Pageleaf liest, speichert und wie du es l\xF6schst.",
      "updated": "Pageleaf 0.3.1 \xB7 25. Oktober 2026",
      "sections": [
        [
          "Lokale Verarbeitung",
          "Pageleaf extrahiert Text auf deinem Ger\xE4t. Artikel und Notizen werden nicht an einen Server gesendet. Keine Analyse, Werbetracker, Konten oder Cloud-Synchronisation."
        ],
        [
          "Tempor\xE4re Erfassungen",
          "Titel, bereinigte Quelladresse, Text, bereinigte Artikelstruktur und Markdown liegen im Chrome-Sitzungsspeicher. H\xF6chstens sechs Erfassungen; \xFCber 24 Stunden alte werden bei neuer Erfassung entfernt. Beenden von Chrome leert sie."
        ],
        [
          "Notizen und Einstellungen",
          "Speichern beh\xE4lt Artikel, eigene Notizen, Textmarkierungen, Zeichnungen und Zeitangaben im aktuellen Chrome-Profil. Auch die Leseposition kann gespeichert werden. Sprache, Darstellung und Schriftgr\xF6\xDFe sind lokal. Pageleaf verschl\xFCsselt diese Daten nicht zus\xE4tzlich. Personen mit Zugriff auf das Profil k\xF6nnen sie m\xF6glicherweise lesen."
        ],
        [
          "Berechtigungen mit Zweck",
          "activeTab erlaubt zeitlich begrenzten Zugriff auf die \xFCber Symbol oder K\xFCrzel gew\xE4hlte Seite. scripting extrahiert den Text. storage h\xE4lt Erfassungen, Notizen, Positionen und Einstellungen. Kein dauerhafter Websitezugriff, kein Browserverlauf und keine zus\xE4tzliche Downloadberechtigung."
        ],
        [
          "Bilder und externe Seiten",
          "Der Reader l\xE4dt keine Originalbilder, Einbettungen oder externen Ressourcen automatisch. Zugangsdaten, Abfrageparameter und Fragmente werden aus Links entfernt. Beim \xD6ffnen eines Links, auch GitHub, besucht Chrome das Ziel unter dessen Datenschutzrichtlinie."
        ],
        [
          "Exportierte Dateien",
          "Du entscheidest, wann und wohin du exportierst. Markdown enth\xE4lt Artikel, Notizen und eine Liste der markierten Texte, keine Stiftzeichnungen. JSON bewahrt Notizen, Markierungen und Zeichnungen, keine Lesepositionen oder Einstellungen. Drucken / PDF \xFCbernimmt das sichtbare Browserlayout mit Markierungen und Zeichnungen: vor dem Speichern pr\xFCfen. Andere Programme oder Synchronisationsdienste k\xF6nnten auf den gew\xE4hlten Ordner zugreifen."
        ],
        [
          "L\xF6schen und \xDCbertragen",
          "L\xF6schen entfernt die lokale Notiz und Position. Deinstallation entfernt Erweiterungsdaten im Profil, keine Exporte. Sichere vor Deinstallation, Profil- oder Ger\xE4tewechsel. Die Webdemo verliert Notizen beim Neuladen."
        ],
        [
          "Umfang und Fragen",
          "Diese Beschreibung gilt f\xFCr die aktuelle Entwicklungsversion und behauptet keine Zertifizierung. Der Originalcode steht unter MIT. Fragen sind auf GitHub Issues ohne sensible Daten m\xF6glich. Eine separate Support-E-Mail ist nicht ver\xF6ffentlicht."
        ]
      ],
      "link": "Auf GitHub fragen"
    },
    "about": {
      "title": "\xDCber Pageleaf",
      "lead": "Speichere Webartikel, markiere Stellen, schreibe Notizen und finde sie sp\xE4ter wieder.",
      "sections": [
        [
          "Die Funktionen",
          "Artikel aus Chrome \xF6ffnen, unterstreichen, zeichnen und Notizen schreiben. Lokal speichern oder als Datei exportieren. Auf dieser Website gibt es ein Beispiel zum Ausprobieren."
        ],
        [
          "Sprachen",
          "Oberfl\xE4che und Hilfe auf Englisch, vereinfachtem Chinesisch, Spanisch, Franz\xF6sisch, Deutsch, Japanisch und Arabisch. Die Browsersprache gilt, bis du eine andere w\xE4hlst. Andere Sprachen verwenden Englisch. Artikel werden nicht \xFCbersetzt."
        ],
        [
          "Entwicklungsstand",
          "0.3.1 ist eine Entwicklungsversion, noch nicht im Chrome Web Store. Manche Seiten werden nicht korrekt erfasst. Vergleiche wichtige Stellen mit dem Original und pr\xFCfe exportierte Dateien."
        ],
        [
          "Quellcode und Lizenzen",
          "Originalcode auf GitHub unter MIT. Enthaltene Software beh\xE4lt ihre Lizenzen. Artikel geh\xF6ren ihren Urhebern. Erhalte Quelle und Namensnennung beim Teilen."
        ],
        [
          "Probleme melden",
          "Beschreibe Schritte und Chrome-Version in GitHub Issues. Auch \xDCbersetzungskorrekturen sind willkommen. Keine privaten Notizen, Sicherungen, Passw\xF6rter oder pers\xF6nlichen Daten anh\xE4ngen."
        ]
      ],
      "code": "Quellcode ansehen",
      "releases": "Versionsverlauf",
      "license": "MIT-Lizenz",
      "contribute": "Beitragsleitfaden"
    }
  },
  "ja": {
    "nav": [
      "\u30DB\u30FC\u30E0",
      "\u30D8\u30EB\u30D7",
      "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC",
      "Pageleaf \u306B\u3064\u3044\u3066"
    ],
    "language": "\u8A00\u8A9E",
    "skip": "\u672C\u6587\u3078\u79FB\u52D5",
    "theme": [
      "\u9ED2\u3044\u80CC\u666F\u306B\u5207\u308A\u66FF\u3048\u308B",
      "\u767D\u3044\u80CC\u666F\u306B\u5207\u308A\u66FF\u3048\u308B"
    ],
    "footer": "\u30AA\u30FC\u30D7\u30F3\u30BD\u30FC\u30B9\u3002\u3042\u306A\u305F\u306E\u7AEF\u672B\u3067\u3002",
    "version": "\u958B\u767A\u7248",
    "home": {
      "eyebrow": "Chrome \u62E1\u5F35\u6A5F\u80FD Pageleaf",
      "title": "\u30A6\u30A7\u30D6\u3092\u4FDD\u5B58\u3002\n\u7DDA\u3092\u5F15\u3044\u3066\u3001\u30E1\u30E2\u3092\u66F8\u304F\u3002",
      "lead": "\u8A18\u4E8B\u3092\u4FDD\u5B58\u3057\u3001\u5FC5\u8981\u306A\u7B87\u6240\u306B\u7DDA\u3092\u5F15\u304D\u3001\u81EA\u5206\u306E\u30E1\u30E2\u3092\u52A0\u3048\u307E\u3059\u3002\u3053\u306E\u7AEF\u672B\u306B\u4FDD\u5B58\u3059\u308B\u3053\u3068\u3082\u3001\u30D5\u30A1\u30A4\u30EB\u306B\u66F8\u304D\u51FA\u3059\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002",
      "try": "\u30B5\u30F3\u30D7\u30EB\u3092\u8A66\u3059",
      "install": "\u62E1\u5F35\u6A5F\u80FD\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
      "hint": "\u7121\u6599\u3002\u30A2\u30AB\u30A6\u30F3\u30C8\u767B\u9332\u306F\u4E0D\u8981\u3067\u3059\u3002",
      "example": "\u3053\u306E\u8A18\u4E8B\u3067\u8A66\u305B\u307E\u3059",
      "exampleTitle": "\u6765\u9031\u306E\u30A4\u30D9\u30F3\u30C8\u306E\u6E96\u5099",
      "exampleSource": "\u30B5\u30F3\u30D7\u30EB\u8A18\u4E8B \xB7 \u30A4\u30D9\u30F3\u30C8\u6E96\u5099",
      "exampleNote": "\u81EA\u5206\u306E\u30E1\u30E2",
      "exampleThought": "\u91D1\u66DC\u65E5\u307E\u3067\u306B\u4F50\u85E4\u3055\u3093\u306B\u4F1A\u5834\u3092\u78BA\u8A8D\u3059\u308B\u3002",
      "exampleBody": "\u62DB\u5F85\u3092\u9001\u308B\u524D\u306B\u78BA\u8A8D\u3059\u308B\u3053\u3068\uFF1A",
      "featuresTitle": "\u8AAD\u307F\u306A\u304C\u3089\u3001\u5370\u3092\u3064\u3051\u3066\u30E1\u30E2\u3059\u308B\u3002",
      "features": [
        [
          "\u8A18\u4E8B\u3092\u4FDD\u5B58",
          "\u8A18\u4E8B\u5168\u4F53\u3084\u3001\u9078\u629E\u3057\u305F\u90E8\u5206\u3060\u3051\u3092\u53D6\u308A\u8FBC\u307F\u307E\u3059\u3002"
        ],
        [
          "\u6587\u5B57\u306B\u5370\u3092\u3064\u3051\u308B",
          "\u9078\u629E\u3057\u305F\u6587\u5B57\u3092\u5F37\u8ABF\u3057\u305F\u308A\u3001\u76F4\u7DDA\u3084\u6CE2\u7DDA\u3092\u5F15\u3044\u305F\u308A\u3067\u304D\u307E\u3059\u3002"
        ],
        [
          "\u30DA\u30F3\u3067\u66F8\u304D\u8FBC\u3080",
          "\u6BB5\u843D\u3092\u56F2\u3080\u3001\u77E2\u5370\u3092\u63CF\u304F\u306A\u3069\u306E\u66F8\u304D\u8FBC\u307F\u3092\u4FDD\u5B58\u3067\u304D\u307E\u3059\u3002"
        ],
        [
          "\u5370\u3092\u3064\u3051\u305F\u6587\u3092\u96C6\u3081\u308B",
          "\u6587\u5B57\u306E\u30DE\u30FC\u30AF\u304B\u3089\u629C\u304D\u51FA\u3057\u305F\u4E00\u89A7\u3092\u78BA\u8A8D\u3057\u3001\u30E1\u30E2\u306B\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002"
        ],
        [
          "\u524D\u306E\u30E1\u30E2\u3092\u63A2\u3059",
          "\u8A18\u4E8B\u3068\u30E1\u30E2\u3092\u691C\u7D22\u3057\u3001\u4FDD\u5B58\u3057\u305F\u4F4D\u7F6E\u304B\u3089\u8AAD\u307F\u7D9A\u3051\u3089\u308C\u307E\u3059\u3002"
        ],
        [
          "\u66F8\u304D\u51FA\u3057\u3068\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7",
          "Markdown\u3001\u5370\u5237\u7528 PDF\u3001\u30E9\u30A4\u30D6\u30E9\u30EA\u5168\u4F53\u306E JSON \u306B\u5BFE\u5FDC\u3057\u307E\u3059\u3002"
        ]
      ],
      "stepsTitle": "\u4F7F\u3044\u65B9",
      "steps": [
        [
          "\u8A18\u4E8B\u3092\u958B\u304F",
          "\u30D1\u30BD\u30B3\u30F3\u306E Chrome \u3067\u8A18\u4E8B\u3092\u958B\u304D\u3001Pageleaf \u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3059\u3002"
        ],
        [
          "\u5370\u3092\u3064\u3051\u3066\u30E1\u30E2\u3092\u66F8\u304F",
          "\u6587\u5B57\u306B\u7DDA\u3092\u5F15\u304D\u3001\u30DA\u30F3\u3067\u56F2\u307F\u3001\u300C\u81EA\u5206\u306E\u30E1\u30E2\u300D\u306B\u66F8\u304D\u307E\u3059\u3002"
        ],
        [
          "\u4FDD\u5B58\u3092\u62BC\u3059",
          "\u30E1\u30E2\u3068\u5370\u3092\u6B8B\u3059\u306B\u306F\u4FDD\u5B58\u304C\u5FC5\u8981\u3067\u3059\u3002\u5225\u306E\u30B3\u30D4\u30FC\u304C\u5FC5\u8981\u306A\u3089\u66F8\u304D\u51FA\u3057\u307E\u3059\u3002"
        ]
      ],
      "localTitle": "\u30E1\u30E2\u306F\u3069\u3053\u306B\u4FDD\u5B58\u3055\u308C\u308B\uFF1F",
      "localBody": "\u73FE\u5728\u306E Chrome \u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u5185\u3067\u3059\u3002\u8A18\u4E8B\u3084\u30E1\u30E2\u3092\u30B5\u30FC\u30D0\u30FC\u306B\u9001\u308A\u307E\u305B\u3093\u3002\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3084\u7AEF\u672B\u5909\u66F4\u306E\u524D\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      "privacyLink": "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u306E\u8A73\u7D30",
      "helpLink": "\u30D8\u30EB\u30D7\u3092\u958B\u304F",
      "compatibility": "\u30D1\u30BD\u30B3\u30F3\u7248 Chrome 116 \u4EE5\u964D\u304C\u5FC5\u8981\u3067\u3059\u3002\u958B\u767A\u7248\u3067\u3001Chrome \u30A6\u30A7\u30D6\u30B9\u30C8\u30A2\u3067\u306F\u672A\u516C\u958B\u3067\u3059\u3002PDF\u3001\u753B\u50CF\u3001\u4E00\u90E8\u306E\u30A6\u30A7\u30D6\u30A2\u30D7\u30EA\u306F\u53D6\u308A\u8FBC\u3081\u307E\u305B\u3093\u3002",
      "examplePoints": [
        "\u4F1A\u5834\u3068\u65E5\u4ED8\u3092\u78BA\u5B9A\u3059\u308B\u3002",
        "\u5FC5\u8981\u306A\u5099\u54C1\u3092\u30EA\u30B9\u30C8\u306B\u3059\u308B\u3002",
        "\u4F5C\u696D\u3054\u3068\u306B\u62C5\u5F53\u8005\u3092\u6C7A\u3081\u308B\u3002"
      ],
      "exampleMarked": "\u4F1A\u5834\u3068\u65E5\u4ED8\u3092\u78BA\u5B9A\u3059\u308B\u3002"
    },
    "help": {
      "title": "\u30D8\u30EB\u30D7",
      "lead": "\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3001\u8A18\u4E8B\u3078\u306E\u66F8\u304D\u8FBC\u307F\u3001\u4FDD\u5B58\u3001\u3088\u304F\u3042\u308B\u554F\u984C\u3002",
      "search": "\u30D8\u30EB\u30D7\u3092\u691C\u7D22",
      "placeholder": "\u6A5F\u80FD\u540D\u3084\u56F0\u3063\u3066\u3044\u308B\u3053\u3068\u3092\u5165\u529B",
      "empty": "\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u5225\u306E\u8A00\u8449\u3067\u691C\u7D22\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      "results": "\u691C\u7D22\u7D50\u679C\uFF1A{count} \u4EF6",
      "installTitle": "\u958B\u767A\u7248\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
      "installIntro": "Chrome \u30A6\u30A7\u30D6\u30B9\u30C8\u30A2\u3067\u306F\u672A\u516C\u958B\u3067\u3059\u3002Chrome \u306E\u30C7\u30D9\u30ED\u30C3\u30D1\u30FC\u30E2\u30FC\u30C9\u306E\u4F7F\u7528\u306B\u554F\u984C\u304C\u306A\u3044\u5834\u5408\u306E\u307F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      "installSteps": [
        "GitHub Releases \u304B\u3089\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u7528 ZIP \u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u3066\u5C55\u958B\u3057\u307E\u3059\u3002",
        "\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u7248 Chrome \u3067 chrome://extensions \u3092\u958B\u304D\u3001\u30C7\u30D9\u30ED\u30C3\u30D1\u30FC\u30E2\u30FC\u30C9\u3092\u6709\u52B9\u306B\u3057\u307E\u3059\u3002",
        "\u300C\u30D1\u30C3\u30B1\u30FC\u30B8\u5316\u3055\u308C\u3066\u3044\u306A\u3044\u62E1\u5F35\u6A5F\u80FD\u3092\u8AAD\u307F\u8FBC\u3080\u300D\u3067 manifest.json \u3092\u542B\u3080\u30D5\u30A9\u30EB\u30C0\u3092\u9078\u629E\u3057\u307E\u3059\u3002\u30BD\u30FC\u30B9\u304B\u3089\u30D3\u30EB\u30C9\u3057\u305F\u5834\u5408\u306F dist \u3092\u9078\u3073\u307E\u3059\u3002",
        "\u62E1\u5F35\u6A5F\u80FD\u30E1\u30CB\u30E5\u30FC\u3067 Pageleaf \u3092\u56FA\u5B9A\u3057\u3001HTTP \u307E\u305F\u306F HTTPS \u306E\u8A18\u4E8B\u3067\u30A2\u30A4\u30B3\u30F3\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3059\u3002"
      ],
      "releases": "\u6700\u65B0\u7248\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9",
      "questions": [
        [
          "capture",
          "\u8A18\u4E8B\u3084\u9078\u629E\u7BC4\u56F2\u3092\u53D6\u308A\u8FBC\u3080\u306B\u306F\uFF1F",
          "\u901A\u5E38\u306E\u8A18\u4E8B\u3092\u958B\u304D\u3001\u30C4\u30FC\u30EB\u30D0\u30FC\u306E Pageleaf \u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3059\u3002\u5148\u306B\u6587\u5B57\u3092\u9078\u629E\u3059\u308B\u3068\u3001\u305D\u306E\u7BC4\u56F2\u3060\u3051\u53D6\u308A\u8FBC\u307F\u307E\u3059\u3002\u73FE\u5728\u306E\u30DA\u30FC\u30B8\u3067\u5229\u7528\u3067\u304D\u308B\u5185\u5BB9\u306E\u307F\u3092\u8AAD\u307F\u3001\u30ED\u30B0\u30A4\u30F3\u3084\u6709\u6599\u5236\u9650\u3001\u30A2\u30AF\u30BB\u30B9\u5236\u5FA1\u306F\u56DE\u907F\u3057\u307E\u305B\u3093\u3002"
        ],
        [
          "save",
          "\u3044\u3064\u30CE\u30FC\u30C8\u304C\u4FDD\u5B58\u3055\u308C\u307E\u3059\u304B\uFF1F",
          "\u300C\u30CE\u30FC\u30C8\u3092\u4FDD\u5B58\u300D\u3092\u62BC\u3059\u3068\u73FE\u5728\u306E Chrome \u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u306B\u6B8B\u308A\u307E\u3059\u3002\u672A\u4FDD\u5B58\u306E\u62BD\u51FA\u7D50\u679C\u306F\u30BB\u30C3\u30B7\u30E7\u30F3\u30E1\u30E2\u30EA\u306B\u6700\u5927 6 \u4EF6\u306E\u307F\u4FDD\u6301\u3055\u308C\u3001\u65B0\u3057\u3044\u62BD\u51FA\u6642\u306B 24 \u6642\u9593\u4EE5\u4E0A\u524D\u306E\u3082\u306E\u3092\u524A\u9664\u3057\u307E\u3059\u3002Chrome \u7D42\u4E86\u6642\u306B\u3082\u6D88\u3048\u307E\u3059\u3002\u30A6\u30A7\u30D6\u30C7\u30E2\u306F\u518D\u8AAD\u307F\u8FBC\u307F\u3067\u30CE\u30FC\u30C8\u304C\u6D88\u3048\u307E\u3059\u3002"
        ],
        [
          "mark",
          "\u6587\u5B57\u3092\u5F37\u8ABF\u3059\u308B\u306B\u306F\uFF1F",
          "\u8A18\u4E8B\u306E\u6587\u5B57\u3092\u9078\u629E\u3057\u3066\u300C\u5F37\u8ABF\u300D\u3092\u62BC\u3057\u307E\u3059\u3002\u3053\u306E\u8A18\u4E8B\u306E\u30B3\u30D4\u30FC\u306B\u5370\u304C\u3064\u304D\u307E\u3059\u3002\u6B8B\u3059\u306B\u306F\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u30A6\u30A7\u30D6\u30C7\u30E2\u3067\u306F\u518D\u8AAD\u307F\u8FBC\u307F\u3067\u30E1\u30E2\u3068\u5370\u304C\u6D88\u3048\u307E\u3059\u3002"
        ],
        [
          "underline",
          "\u76F4\u7DDA\u3068\u6CE2\u7DDA\u306F\u3069\u3046\u4F7F\u3046\uFF1F",
          "\u6587\u5B57\u3092\u9078\u629E\u3057\u3001\u300C\u4E0B\u7DDA\u300D\u307E\u305F\u306F\u300C\u6CE2\u7DDA\u300D\u3092\u62BC\u3057\u307E\u3059\u3002\u4F55\u306B\u7DDA\u3092\u5F15\u304F\u304B\u306F\u81EA\u5206\u3067\u6C7A\u3081\u307E\u3059\u3002Pageleaf \u306F\u91CD\u8981\u306A\u6587\u3084\u9593\u9055\u3044\u3092\u5224\u5B9A\u305B\u305A\u3001\u539F\u6587\u306E\u5909\u66F4\u3084\u7FFB\u8A33\u3082\u3057\u307E\u305B\u3093\u3002"
        ],
        [
          "pen",
          "\u30DA\u30F3\u3067\u4F55\u304C\u3067\u304D\u308B\uFF1F",
          "\u300C\u30DA\u30F3\u300D\u3092\u9078\u3073\u3001\u6BB5\u843D\u3092\u56F2\u3093\u3060\u308A\u77E2\u5370\u3092\u63CF\u3044\u305F\u308A\u3067\u304D\u307E\u3059\u3002\u7D42\u308F\u3063\u305F\u3089\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u66F8\u304D\u8FBC\u307F\u306F\u30DA\u30FC\u30B8\u306E\u6BD4\u7387\u306B\u5408\u308F\u305B\u3066\u4F38\u7E2E\u3059\u308B\u305F\u3081\u3001\u30A6\u30A3\u30F3\u30C9\u30A6\u3084\u6587\u5B57\u30B5\u30A4\u30BA\u3092\u5909\u3048\u305F\u3089\u4F4D\u7F6E\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u624B\u66F8\u304D\u306E\u6587\u5B57\u8A8D\u8B58\u306F\u3057\u307E\u305B\u3093\u3002"
        ],
        [
          "organize",
          "\u300C\u30E1\u30E2\u3092\u307E\u3068\u3081\u308B\u300D\u306F\u4F55\u3092\u3059\u308B\uFF1F",
          "\u6587\u5B57\u306B\u5370\u304C\u3042\u308C\u3070\u3001\u305D\u306E\u90E8\u5206\u3092\u4E00\u89A7\u306B\u3057\u307E\u3059\u3002\u306A\u3051\u308C\u3070\u5404\u7BC0\u306E\u6700\u521D\u306E\u4E00\u6587\u3092\u629C\u304D\u51FA\u3057\u307E\u3059\u3002\u30D7\u30EC\u30D3\u30E5\u30FC\u3092\u898B\u3066\u300C\u81EA\u5206\u306E\u30E1\u30E2\u300D\u306B\u52A0\u3048\u308B\u304B\u3092\u6C7A\u3081\u3089\u308C\u307E\u3059\u3002\u30EB\u30FC\u30EB\u306B\u6CBF\u3063\u305F\u629C\u304D\u51FA\u3057\u3067\u3001AI \u8981\u7D04\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u91CD\u8981\u5EA6\u3084\u4E8B\u5B9F\u3092\u5224\u65AD\u305B\u305A\u3001\u30DA\u30F3\u306E\u5185\u5BB9\u3082\u8AAD\u307F\u53D6\u308A\u307E\u305B\u3093\u3002"
        ],
        [
          "search",
          "\u5168\u6587\u691C\u7D22\u306E\u5BFE\u8C61\u306F\uFF1F",
          "\u3053\u306E\u7AEF\u672B\u3067\u4FDD\u5B58\u3057\u305F\u30CE\u30FC\u30C8\u306E\u30BF\u30A4\u30C8\u30EB\u3001\u51FA\u5178\u3001\u500B\u4EBA\u30E1\u30E2\u3001\u672C\u6587\u3001Markdown \u3092\u691C\u7D22\u3057\u307E\u3059\u3002\u30A6\u30A7\u30D6\u5168\u4F53\u306F\u691C\u7D22\u3057\u307E\u305B\u3093\u3002"
        ],
        [
          "export",
          "Markdown \u3084 PDF \u306B\u66F8\u304D\u51FA\u3059\u306B\u306F\uFF1F",
          "Markdown \u3092\u30B3\u30D4\u30FC\u3059\u308B\u304B .md \u30D5\u30A1\u30A4\u30EB\u3092\u66F8\u304D\u51FA\u3057\u307E\u3059\u3002\u8A18\u4E8B\u3001\u51FA\u5178\u3001\u73FE\u5728\u306E\u30E1\u30E2\u304C\u542B\u307E\u308C\u307E\u3059\u3002\u300C\u5370\u5237 / PDF\u300D\u306F Chrome \u306E\u5370\u5237\u753B\u9762\u3092\u958B\u304D\u307E\u3059\u3002\u30D7\u30EA\u30F3\u30BF\u30FC\u307E\u305F\u306F PDF \u4FDD\u5B58\u3092\u9078\u3073\u3001\u4FDD\u5B58\u5148\u3068\u30D7\u30EC\u30D3\u30E5\u30FC\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
        ],
        [
          "backup",
          "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3068\u5FA9\u5143\u306E\u65B9\u6CD5\u306F\uFF1F",
          "\u30E9\u30A4\u30D6\u30E9\u30EA\u306E\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3067 JSON \u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3059\u3002\u5FA9\u5143\u3067\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u3073\u3001\u4EF6\u6570\u3092\u78BA\u8A8D\u3057\u3066\u5B9F\u884C\u3057\u307E\u3059\u3002\u540C\u3058 ID\u3001\u307E\u305F\u306F\u51FA\u5178\u30FB\u62BD\u51FA\u65B9\u6CD5\u30FB\u672C\u6587\u304C\u540C\u3058\u30CE\u30FC\u30C8\u306F\u30B9\u30AD\u30C3\u30D7\u3057\u3001\u65E2\u5B58\u30CE\u30FC\u30C8\u306F\u4E0A\u66F8\u304D\u3057\u307E\u305B\u3093\u3002\u8AAD\u66F8\u4F4D\u7F6E\u3068\u8868\u793A\u8A2D\u5B9A\u306F\u542B\u307E\u308C\u307E\u305B\u3093\u3002"
        ],
        [
          "limits",
          "\u4FDD\u5B58\u5BB9\u91CF\u306E\u4E0A\u9650\u306F\uFF1F",
          "\u6700\u5927 100 \u4EF6\u3001\u4FDD\u5B58\u30FB\u5FA9\u5143\u3059\u308B\u30CE\u30FC\u30C8\u306F 1 \u4EF6 1 MB \u307E\u3067\u3001JSON \u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u306F 20 MB \u307E\u3067\u3067\u3059\u3002\u30E9\u30A4\u30D6\u30E9\u30EA\u5168\u4F53\u304C\u30D5\u30A1\u30A4\u30EB\u4E0A\u9650\u3092\u8D85\u3048\u308B\u5834\u5408\u3001\u500B\u5225\u306B Markdown \u3092\u66F8\u304D\u51FA\u3057\u3001\u4EF6\u6570\u3092\u6E1B\u3089\u3057\u3066\u304B\u3089\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
        ],
        [
          "progress",
          "\u8AAD\u66F8\u4F4D\u7F6E\u306F\u3069\u3046\u8A18\u9332\u3055\u308C\u307E\u3059\u304B\uFF1F",
          "\u4FDD\u5B58\u6E08\u307F\u30CE\u30FC\u30C8\u306E\u307F\u4F4D\u7F6E\u3092\u8A18\u9332\u3057\u307E\u3059\u3002\u540C\u3058\u7AEF\u672B\u3067\u958B\u304D\u76F4\u3059\u3068\u7D9A\u304D\u304B\u3089\u8AAD\u3081\u307E\u3059\u3002\u30CE\u30FC\u30C8\u3092\u524A\u9664\u3059\u308B\u3068\u4F4D\u7F6E\u3082\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u306B\u306F\u542B\u307E\u308C\u307E\u305B\u3093\u3002"
        ],
        [
          "shortcuts",
          "\u30AD\u30FC\u30DC\u30FC\u30C9\u3067\u64CD\u4F5C\u3067\u304D\u307E\u3059\u304B\uFF1F",
          "Alt / Option + Shift + L \u3067\u8A18\u4E8B\u3092\u53D6\u308A\u8FBC\u307F\u307E\u3059\u3002\u52D5\u304B\u306A\u3044\u5834\u5408\u306F chrome://extensions/shortcuts \u3067\u7AF6\u5408\u3092\u78BA\u8A8D\u3057\u307E\u3059\u3002Tab \u3068 Shift + Tab \u3067\u79FB\u52D5\u3057\u3001Enter \u3084\u30B9\u30DA\u30FC\u30B9\u3067\u64CD\u4F5C\u3067\u304D\u307E\u3059\u3002\u30D6\u30E9\u30A6\u30B6\u306E\u5370\u5237\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u3082\u4F7F\u7528\u3067\u304D\u307E\u3059\u3002"
        ],
        [
          "troubleshooting",
          "\u53D6\u308A\u8FBC\u3081\u306A\u3044\u3001\u307E\u305F\u306F\u5185\u5BB9\u304C\u6B20\u3051\u308B\u306E\u306F\uFF1F",
          "PDF\u3001\u30D6\u30E9\u30A6\u30B6\u5185\u90E8\u753B\u9762\u3001Chrome \u30A6\u30A7\u30D6\u30B9\u30C8\u30A2\u3001\u753B\u50CF\u3001\u52D5\u753B\u306F\u975E\u5BFE\u5FDC\u3067\u3059\u3002\u8907\u96D1\u306A\u30DA\u30FC\u30B8\u3084\u30A2\u30D7\u30EA\u3067\u306F\u3001\u5148\u306B\u5FC5\u8981\u306A\u6BB5\u843D\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u975E\u8868\u793A\u306E\u6B21\u30DA\u30FC\u30B8\u3084 iframe \u306F\u8AAD\u307F\u8FBC\u307F\u307E\u305B\u3093\u3002\u753B\u50CF\u306F\u9664\u53BB\u3057\u3001\u8907\u96D1\u306A\u8868\u3084\u6570\u5F0F\u306F\u624B\u76F4\u3057\u304C\u5FC5\u8981\u306A\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002"
        ],
        [
          "links",
          "\u30EA\u30F3\u30AF\u306E\u30A2\u30C9\u30EC\u30B9\u304C\u5909\u308F\u3063\u305F\u306E\u306F\uFF1F",
          "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u4FDD\u8B77\u306E\u305F\u3081\u3001\u51FA\u5178\u3068\u672C\u6587\u30EA\u30F3\u30AF\u304B\u3089\u8A8D\u8A3C\u60C5\u5831\u3001\u30AF\u30A8\u30EA\u30D1\u30E9\u30E1\u30FC\u30BF\u30FC\u3001\u30D5\u30E9\u30B0\u30E1\u30F3\u30C8\u3092\u9664\u53BB\u3057\u307E\u3059\u3002\u5FC5\u8981\u306A\u30B5\u30A4\u30C8\u3067\u306F\u5143\u306E\u30A2\u30C9\u30EC\u30B9\u3092\u624B\u52D5\u3067\u88DC\u3063\u3066\u304F\u3060\u3055\u3044\u3002\u30EA\u30F3\u30AF\u5148\u306B\u306F\u305D\u306E\u30B5\u30A4\u30C8\u306E\u65B9\u91DD\u304C\u9069\u7528\u3055\u308C\u307E\u3059\u3002"
        ],
        [
          "delete",
          "\u524A\u9664\u3084\u5225\u306E\u7AEF\u672B\u3078\u306E\u79FB\u884C\u306F\uFF1F",
          "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3084\u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u5909\u66F4\u524D\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u30CE\u30FC\u30C8\u524A\u9664\u3067\u7AEF\u672B\u306E\u30B3\u30D4\u30FC\u3068\u8AAD\u66F8\u4F4D\u7F6E\u3092\u524A\u9664\u3057\u307E\u3059\u3002\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u306F\u62E1\u5F35\u6A5F\u80FD\u30C7\u30FC\u30BF\u3092\u6D88\u3057\u307E\u3059\u304C\u3001\u66F8\u304D\u51FA\u3057\u305F\u30D5\u30A1\u30A4\u30EB\u306F\u5225\u9014\u524A\u9664\u304C\u5FC5\u8981\u3067\u3059\u3002\u5225\u306E\u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u3067 JSON \u3092\u5FA9\u5143\u3059\u308B\u3068\u79FB\u884C\u3067\u304D\u307E\u3059\u3002"
        ],
        [
          "feedback",
          "\u5B89\u5168\u306B\u4E0D\u5177\u5408\u3092\u5831\u544A\u3059\u308B\u306B\u306F\uFF1F",
          "GitHub Issues \u306B\u624B\u9806\u3001Chrome \u30D0\u30FC\u30B8\u30E7\u30F3\u3001\u671F\u5F85\u3057\u305F\u52D5\u4F5C\u3092\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002\u9069\u5207\u306A\u5834\u5408\u306E\u307F\u516C\u958B URL \u3092\u6DFB\u3048\u3066\u304F\u3060\u3055\u3044\u3002\u79C1\u7684\u306A\u8A18\u4E8B\u3001\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3001\u500B\u4EBA\u60C5\u5831\u306F\u9001\u3089\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002GitHub \u72EC\u81EA\u306E\u65B9\u91DD\u304C\u9069\u7528\u3055\u308C\u307E\u3059\u3002"
        ]
      ],
      "feedback": "GitHub \u3067\u5831\u544A\u3059\u308B"
    },
    "privacy": {
      "title": "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC",
      "lead": "\u8AAD\u307F\u53D6\u308B\u60C5\u5831\u3001\u4FDD\u5B58\u3059\u308B\u60C5\u5831\u3001\u524A\u9664\u3059\u308B\u65B9\u6CD5\u3002",
      "updated": "Pageleaf 0.3.1 \xB7 2026 \u5E74 10 \u6708 25 \u65E5",
      "sections": [
        [
          "\u7AEF\u672B\u5185\u306E\u51E6\u7406",
          "\u7AEF\u672B\u3067\u6587\u5B57\u3092\u62BD\u51FA\u3057\u3001\u8A18\u4E8B\u3084\u30E1\u30E2\u3092\u30B5\u30FC\u30D0\u30FC\u3078\u9001\u4FE1\u3057\u307E\u305B\u3093\u3002\u5206\u6790\u30C4\u30FC\u30EB\u3001\u5E83\u544A\u30C8\u30E9\u30C3\u30AB\u30FC\u3001\u30A2\u30AB\u30A6\u30F3\u30C8\u3001\u30AF\u30E9\u30A6\u30C9\u540C\u671F\u306F\u3042\u308A\u307E\u305B\u3093\u3002"
        ],
        [
          "\u4E00\u6642\u7684\u306A\u62BD\u51FA\u7D50\u679C",
          "\u30BF\u30A4\u30C8\u30EB\u3001\u6574\u7406\u3057\u305F\u51FA\u5178 URL\u3001\u672C\u6587\u3001\u6574\u7406\u3057\u305F\u8A18\u4E8B\u69CB\u9020\u3068 Markdown \u306F Chrome \u30BB\u30C3\u30B7\u30E7\u30F3\u30E1\u30E2\u30EA\u306B\u6700\u5927 6 \u4EF6\u4FDD\u6301\u3057\u307E\u3059\u3002\u65B0\u305F\u306A\u62BD\u51FA\u6642\u306B 24 \u6642\u9593\u4EE5\u4E0A\u524D\u306E\u3082\u306E\u3092\u524A\u9664\u3057\u3001Chrome \u7D42\u4E86\u6642\u306B\u6D88\u53BB\u3057\u307E\u3059\u3002"
        ],
        [
          "\u30CE\u30FC\u30C8\u3068\u8A2D\u5B9A",
          "\u4FDD\u5B58\u3059\u308B\u3068\u3001\u8A18\u4E8B\u3001\u81EA\u5206\u306E\u30E1\u30E2\u3001\u6587\u5B57\u306E\u30DE\u30FC\u30AF\u3001\u30DA\u30F3\u306E\u66F8\u304D\u8FBC\u307F\u3001\u65E5\u6642\u304C\u73FE\u5728\u306E Chrome \u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u306B\u6B8B\u308A\u307E\u3059\u3002\u8AAD\u66F8\u4F4D\u7F6E\u3082\u8A18\u9332\u3067\u304D\u307E\u3059\u3002\u8A00\u8A9E\u3001\u5916\u89B3\u3001\u6587\u5B57\u30B5\u30A4\u30BA\u3082\u7AEF\u672B\u5185\u306E\u8A2D\u5B9A\u3067\u3059\u3002Pageleaf \u306F\u8FFD\u52A0\u306E\u6697\u53F7\u5316\u3092\u3057\u306A\u3044\u305F\u3081\u3001\u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u306B\u30A2\u30AF\u30BB\u30B9\u3067\u304D\u308B\u4EBA\u306F\u8AAD\u3081\u308B\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002"
        ],
        [
          "\u6A29\u9650\u306E\u76EE\u7684",
          "activeTab \u306F\u30A2\u30A4\u30B3\u30F3\u3084\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u3067\u9078\u3093\u3060\u30DA\u30FC\u30B8\u3078\u4E00\u6642\u7684\u306B\u30A2\u30AF\u30BB\u30B9\u3057\u307E\u3059\u3002scripting \u306F\u672C\u6587\u3092\u62BD\u51FA\u3057\u3001storage \u306F\u62BD\u51FA\u7D50\u679C\u3001\u30CE\u30FC\u30C8\u3001\u4F4D\u7F6E\u3068\u8A2D\u5B9A\u3092\u4FDD\u6301\u3057\u307E\u3059\u3002\u6052\u5E38\u7684\u306A\u30B5\u30A4\u30C8\u30A2\u30AF\u30BB\u30B9\u3001\u5C65\u6B74\u3001\u8FFD\u52A0\u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u6A29\u9650\u306F\u8981\u6C42\u3057\u307E\u305B\u3093\u3002"
        ],
        [
          "\u753B\u50CF\u3068\u5916\u90E8\u30B5\u30A4\u30C8",
          "\u5143\u306E\u753B\u50CF\u3001\u57CB\u3081\u8FBC\u307F\u3001\u5916\u90E8\u30EA\u30BD\u30FC\u30B9\u3092\u81EA\u52D5\u8AAD\u307F\u8FBC\u307F\u3057\u307E\u305B\u3093\u3002\u30EA\u30F3\u30AF\u304B\u3089\u8A8D\u8A3C\u60C5\u5831\u3001\u30AF\u30A8\u30EA\u3001\u30D5\u30E9\u30B0\u30E1\u30F3\u30C8\u3092\u9664\u53BB\u3057\u307E\u3059\u3002GitHub \u3092\u542B\u3080\u30EA\u30F3\u30AF\u3092\u958B\u304F\u3068 Chrome \u304C\u8A2A\u554F\u3057\u3001\u30EA\u30F3\u30AF\u5148\u306E\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC\u304C\u9069\u7528\u3055\u308C\u307E\u3059\u3002"
        ],
        [
          "\u66F8\u304D\u51FA\u3057\u305F\u30D5\u30A1\u30A4\u30EB",
          "\u3044\u3064\u3001\u3069\u3053\u306B\u66F8\u304D\u51FA\u3059\u304B\u306F\u30E6\u30FC\u30B6\u30FC\u304C\u9078\u3073\u307E\u3059\u3002Markdown \u306F\u8A18\u4E8B\u3001\u30E1\u30E2\u3001\u5370\u3092\u3064\u3051\u305F\u6587\u5B57\u306E\u4E00\u89A7\u3092\u542B\u307F\u3001\u30DA\u30F3\u306E\u66F8\u304D\u8FBC\u307F\u306F\u542B\u307F\u307E\u305B\u3093\u3002JSON \u306F\u30E1\u30E2\u3068\u6587\u5B57\u30FB\u30DA\u30F3\u306E\u30DE\u30FC\u30AF\u3092\u4FDD\u5B58\u3057\u3001\u8AAD\u66F8\u4F4D\u7F6E\u3084\u8868\u793A\u8A2D\u5B9A\u306F\u542B\u307F\u307E\u305B\u3093\u3002\u5370\u5237 / PDF \u306F\u30DE\u30FC\u30AF\u3084\u66F8\u304D\u8FBC\u307F\u3092\u542B\u3080\u753B\u9762\u306E\u914D\u7F6E\u3092\u4F7F\u3044\u307E\u3059\u3002\u4FDD\u5B58\u524D\u306B\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4ED6\u306E\u30BD\u30D5\u30C8\u3084\u540C\u671F\u30B5\u30FC\u30D3\u30B9\u304C\u4FDD\u5B58\u5148\u306B\u30A2\u30AF\u30BB\u30B9\u3059\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002"
        ],
        [
          "\u524A\u9664\u3068\u79FB\u884C",
          "\u30CE\u30FC\u30C8\u524A\u9664\u306F\u7AEF\u672B\u306E\u30B3\u30D4\u30FC\u3068\u4F4D\u7F6E\u3092\u524A\u9664\u3057\u307E\u3059\u3002\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u306F\u305D\u306E\u30D7\u30ED\u30D5\u30A1\u30A4\u30EB\u306E\u62E1\u5F35\u6A5F\u80FD\u30C7\u30FC\u30BF\u3092\u6D88\u3057\u3001\u66F8\u304D\u51FA\u3057\u305F\u30D5\u30A1\u30A4\u30EB\u306F\u6B8B\u3057\u307E\u3059\u3002\u524A\u9664\u3084\u7AEF\u672B\u5909\u66F4\u524D\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u30A6\u30A7\u30D6\u30C7\u30E2\u306F\u518D\u8AAD\u307F\u8FBC\u307F\u3067\u6D88\u53BB\u3057\u307E\u3059\u3002"
        ],
        [
          "\u8AAC\u660E\u306E\u7BC4\u56F2\u3068\u8CEA\u554F",
          "\u73FE\u5728\u306E\u958B\u767A\u7248\u306E\u5B9F\u969B\u306E\u52D5\u4F5C\u306E\u8AAC\u660E\u3067\u3042\u308A\u3001\u8A8D\u8A3C\u53D6\u5F97\u306E\u4E3B\u5F35\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u72EC\u81EA\u30B3\u30FC\u30C9\u306F MIT \u30E9\u30A4\u30BB\u30F3\u30B9\u3067\u3059\u3002\u6A5F\u5BC6\u60C5\u5831\u3092\u542B\u3081\u305A GitHub Issues \u3067\u8CEA\u554F\u3067\u304D\u307E\u3059\u3002\u5225\u9014\u516C\u958B\u3055\u308C\u305F\u30B5\u30DD\u30FC\u30C8\u30E1\u30FC\u30EB\u306F\u3042\u308A\u307E\u305B\u3093\u3002"
        ]
      ],
      "link": "GitHub \u3067\u8CEA\u554F\u3059\u308B"
    },
    "about": {
      "title": "Pageleaf \u306B\u3064\u3044\u3066",
      "lead": "\u30A6\u30A7\u30D6\u8A18\u4E8B\u3092\u4FDD\u5B58\u3057\u3001\u5370\u3092\u3064\u3051\u3001\u30E1\u30E2\u3092\u66F8\u304D\u3001\u5F8C\u3067\u63A2\u3059\u305F\u3081\u306E\u30C4\u30FC\u30EB\u3067\u3059\u3002",
      "sections": [
        [
          "\u3067\u304D\u308B\u3053\u3068",
          "Chrome \u304B\u3089\u8A18\u4E8B\u3092\u958B\u304D\u3001\u4E0B\u7DDA\u3084\u30DA\u30F3\u306E\u66F8\u304D\u8FBC\u307F\u3001\u30E1\u30E2\u3092\u52A0\u3048\u307E\u3059\u3002\u7AEF\u672B\u5185\u306B\u4FDD\u5B58\u3059\u308B\u304B\u3001\u30D5\u30A1\u30A4\u30EB\u306B\u66F8\u304D\u51FA\u305B\u307E\u3059\u3002\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u524D\u306B\u3053\u306E\u30B5\u30A4\u30C8\u306E\u30B5\u30F3\u30D7\u30EB\u3092\u8A66\u305B\u307E\u3059\u3002"
        ],
        [
          "\u5BFE\u5FDC\u8A00\u8A9E",
          "\u753B\u9762\u3068\u30D8\u30EB\u30D7\u306F\u82F1\u8A9E\u3001\u7C21\u4F53\u5B57\u4E2D\u56FD\u8A9E\u3001\u30B9\u30DA\u30A4\u30F3\u8A9E\u3001\u30D5\u30E9\u30F3\u30B9\u8A9E\u3001\u30C9\u30A4\u30C4\u8A9E\u3001\u65E5\u672C\u8A9E\u3001\u30A2\u30E9\u30D3\u30A2\u8A9E\u306B\u5BFE\u5FDC\u3057\u307E\u3059\u3002\u9078\u629E\u3059\u308B\u307E\u3067\u306F\u30D6\u30E9\u30A6\u30B6\u306E\u8A00\u8A9E\u3092\u4F7F\u3044\u307E\u3059\u3002\u975E\u5BFE\u5FDC\u306E\u5834\u5408\u306F\u82F1\u8A9E\u3067\u3059\u3002\u8A18\u4E8B\u306F\u7FFB\u8A33\u3057\u307E\u305B\u3093\u3002"
        ],
        [
          "\u958B\u767A\u72B6\u6CC1",
          "0.3.1 \u306F\u958B\u767A\u7248\u3067\u3001Chrome \u30A6\u30A7\u30D6\u30B9\u30C8\u30A2\u3067\u306F\u672A\u516C\u958B\u3067\u3059\u3002\u6B63\u3057\u304F\u53D6\u308A\u8FBC\u3081\u306A\u3044\u30DA\u30FC\u30B8\u3082\u3042\u308A\u307E\u3059\u3002\u5927\u5207\u306A\u7B87\u6240\u306F\u539F\u6587\u3068\u6BD4\u3079\u3001\u66F8\u304D\u51FA\u3057\u305F\u30D5\u30A1\u30A4\u30EB\u3082\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
        ],
        [
          "\u30BD\u30FC\u30B9\u3068\u30E9\u30A4\u30BB\u30F3\u30B9",
          "\u72EC\u81EA\u30B3\u30FC\u30C9\u306F GitHub \u3067 MIT \u30E9\u30A4\u30BB\u30F3\u30B9\u3068\u3057\u3066\u516C\u958B\u3057\u3066\u3044\u307E\u3059\u3002\u540C\u68B1\u30BD\u30D5\u30C8\u306F\u305D\u308C\u305E\u308C\u306E\u30E9\u30A4\u30BB\u30F3\u30B9\u3067\u3059\u3002\u8A18\u4E8B\u306F\u539F\u8457\u8005\u306E\u3082\u306E\u306A\u306E\u3067\u3001\u5171\u6709\u6642\u306F\u51FA\u5178\u3068\u8457\u8005\u540D\u3092\u6B8B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
        ],
        [
          "\u4E0D\u5177\u5408\u306E\u5831\u544A",
          "\u64CD\u4F5C\u624B\u9806\u3068 Chrome \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u3092 GitHub Issues \u306B\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002\u7FFB\u8A33\u306E\u4FEE\u6B63\u3082\u6B53\u8FCE\u3057\u307E\u3059\u3002\u79C1\u7684\u306A\u30E1\u30E2\u3001\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3001\u500B\u4EBA\u60C5\u5831\u306F\u6DFB\u4ED8\u3057\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002"
        ]
      ],
      "code": "\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9",
      "releases": "\u30EA\u30EA\u30FC\u30B9\u5C65\u6B74",
      "license": "MIT \u30E9\u30A4\u30BB\u30F3\u30B9",
      "contribute": "\u8CA2\u732E\u30AC\u30A4\u30C9"
    }
  },
  "ar": {
    "nav": [
      "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
      "\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629",
      "\u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
      "\u0639\u0646 Pageleaf"
    ],
    "language": "\u0627\u0644\u0644\u063A\u0629",
    "skip": "\u0627\u0646\u062A\u0642\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649",
    "theme": [
      "\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062E\u0644\u0641\u064A\u0629 \u0633\u0648\u062F\u0627\u0621",
      "\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062E\u0644\u0641\u064A\u0629 \u0628\u064A\u0636\u0627\u0621"
    ],
    "footer": "\u0645\u0641\u062A\u0648\u062D \u0627\u0644\u0645\u0635\u062F\u0631. \u0639\u0644\u0649 \u062C\u0647\u0627\u0632\u0643.",
    "version": "\u0625\u0635\u062F\u0627\u0631 \u062A\u062C\u0631\u064A\u0628\u064A \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631",
    "home": {
      "eyebrow": "Pageleaf \u0644\u0645\u062A\u0635\u0641\u062D Chrome",
      "title": "\u0627\u062D\u0641\u0638 \u0627\u0644\u0635\u0641\u062D\u0629.\n\u0636\u0639 \u0639\u0644\u0627\u0645\u0627\u062A\u0643 \u0648\u0627\u0643\u062A\u0628 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643.",
      "lead": "\u0627\u062D\u062A\u0641\u0638 \u0628\u0627\u0644\u0645\u0642\u0627\u0644\u060C \u0648\u0636\u0639 \u062E\u0637\u064B\u0627 \u062A\u062D\u062A \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647\u060C \u0648\u0623\u0636\u0641 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643. \u0627\u062D\u0641\u0638\u0647 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \u0623\u0648 \u0635\u062F\u0651\u0631 \u0646\u0633\u062E\u0629 \u0625\u0644\u0649 \u0645\u0644\u0641.",
      "try": "\u062C\u0631\u0651\u0628 \u0627\u0644\u0645\u062B\u0627\u0644",
      "install": "\u062A\u062B\u0628\u064A\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629",
      "hint": "\u0645\u062C\u0627\u0646\u064A. \u0644\u0627 \u064A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062D\u0633\u0627\u0628.",
      "example": "\u062C\u0631\u0651\u0628 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0644",
      "exampleTitle": "\u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u0641\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639 \u0627\u0644\u0642\u0627\u062F\u0645",
      "exampleSource": "\u0645\u0642\u0627\u0644 \u062A\u062C\u0631\u064A\u0628\u064A \xB7 \u062A\u0646\u0638\u064A\u0645 \u0641\u0639\u0627\u0644\u064A\u0629",
      "exampleNote": "\u0645\u0644\u0627\u062D\u0638\u062A\u064A",
      "exampleThought": "\u0623\u0637\u0644\u0628 \u0645\u0646 \u0633\u0627\u0631\u0629 \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0642\u0627\u0639\u0629 \u0642\u0628\u0644 \u0627\u0644\u062C\u0645\u0639\u0629.",
      "exampleBody": "\u0642\u0628\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062F\u0639\u0648\u0627\u062A:",
      "featuresTitle": "\u0627\u0642\u0631\u0623 \u0648\u0636\u0639 \u0639\u0644\u0627\u0645\u0627\u062A\u0643 \u0648\u0627\u062D\u0641\u0638 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647.",
      "features": [
        [
          "\u062D\u0641\u0638 \u0645\u0642\u0627\u0644",
          "\u0627\u0644\u062A\u0642\u0637 \u0627\u0644\u0645\u0642\u0627\u0644 \u0643\u0627\u0645\u0644\u064B\u0627 \u0623\u0648 \u0627\u0644\u0646\u0635 \u0627\u0644\u0630\u064A \u062A\u062D\u062F\u062F\u0647 \u0641\u0642\u0637."
        ],
        [
          "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0646\u0635 \u0627\u0644\u0645\u0647\u0645",
          "\u0638\u0644\u0651\u0644 \u0627\u0644\u0643\u0644\u0645\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0623\u0648 \u0636\u0639 \u062A\u062D\u062A\u0647\u0627 \u062E\u0637\u064B\u0627 \u0645\u0633\u062A\u0642\u064A\u0645\u064B\u0627 \u0623\u0648 \u0645\u062A\u0645\u0648\u062C\u064B\u0627."
        ],
        [
          "\u0627\u0644\u0631\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0644",
          "\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0642\u0644\u0645 \u0644\u0644\u062F\u0648\u0627\u0626\u0631 \u0648\u0627\u0644\u0623\u0633\u0647\u0645 \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u064A\u062F\u0648\u064A\u0629\u060C \u062B\u0645 \u0627\u062D\u0641\u0638\u0647\u0627."
        ],
        [
          "\u062C\u0645\u0639 \u0627\u0644\u0646\u0635\u0648\u0635 \u0627\u0644\u0645\u062D\u062F\u062F\u0629",
          "\u0631\u0627\u062C\u0639 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0646\u0635\u0648\u0635 \u0627\u0644\u062A\u064A \u0648\u0636\u0639\u062A \u0639\u0644\u064A\u0647\u0627 \u0639\u0644\u0627\u0645\u0627\u062A\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0625\u0636\u0627\u0641\u062A\u0647\u0627 \u0625\u0644\u0649 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643."
        ],
        [
          "\u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643",
          "\u0627\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0648\u062A\u0627\u0628\u0639 \u0645\u0646 \u0645\u0648\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0633\u0627\u0628\u0642."
        ],
        [
          "\u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A",
          "\u0646\u0632\u0651\u0644 Markdown \u0623\u0648 \u0627\u0637\u0628\u0639 PDF \u0623\u0648 \u0627\u062D\u0641\u0638 \u0646\u0633\u062E\u0629 \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0628\u0635\u064A\u063A\u0629 JSON."
        ]
      ],
      "stepsTitle": "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645",
      "steps": [
        [
          "\u0627\u0641\u062A\u062D \u0645\u0642\u0627\u0644\u064B\u0627",
          "\u0627\u0641\u062A\u062D \u0645\u0642\u0627\u0644 \u0648\u064A\u0628 \u0641\u064A Chrome \u0639\u0644\u0649 \u0627\u0644\u0643\u0645\u0628\u064A\u0648\u062A\u0631 \u0648\u0627\u0636\u063A\u0637 \u0623\u064A\u0642\u0648\u0646\u0629 Pageleaf."
        ],
        [
          "\u0636\u0639 \u0639\u0644\u0627\u0645\u0627\u062A\u0643 \u0648\u0627\u0643\u062A\u0628",
          "\u0638\u0644\u0651\u0644 \u0627\u0644\u0646\u0635 \u0623\u0648 \u0636\u0639 \u062E\u0637\u064B\u0627 \u062A\u062D\u062A\u0647 \u0648\u0627\u0631\u0633\u0645 \u0628\u0627\u0644\u0642\u0644\u0645 \u0648\u0627\u0643\u062A\u0628 \u0641\u064A \xAB\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u064A\xBB."
        ],
        [
          "\u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A",
          "\u0627\u0636\u063A\u0637 \u062D\u0641\u0638 \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A. \u0635\u062F\u0651\u0631 \u0645\u0644\u0641\u064B\u0627 \u0625\u0630\u0627 \u0623\u0631\u062F\u062A \u0646\u0633\u062E\u0629 \u0623\u062E\u0631\u0649."
        ]
      ],
      "localTitle": "\u0623\u064A\u0646 \u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u061F",
      "localBody": "\u0641\u064A \u0645\u0644\u0641 Chrome \u0627\u0644\u062D\u0627\u0644\u064A \u0639\u0644\u0649 \u062C\u0647\u0627\u0632\u0643. \u0644\u0627 \u064A\u0631\u0641\u0639 Pageleaf \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0623\u0648 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A. \u0623\u0646\u0634\u0626 \u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0642\u0628\u0644 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062C\u0647\u0627\u0632.",
      "privacyLink": "\u0642\u0631\u0627\u0621\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
      "helpLink": "\u0641\u062A\u062D \u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629",
      "compatibility": "\u064A\u062A\u0637\u0644\u0628 Chrome \u0639\u0644\u0649 \u0627\u0644\u0643\u0645\u0628\u064A\u0648\u062A\u0631 \u0628\u0627\u0644\u0625\u0635\u062F\u0627\u0631 116 \u0623\u0648 \u0623\u062D\u062F\u062B. \u0625\u0635\u062F\u0627\u0631 \u062A\u0637\u0648\u064A\u0631 \u0644\u0645 \u064A\u064F\u0646\u0634\u0631 \u0641\u064A Chrome Web Store \u0628\u0639\u062F. \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0642\u0627\u0637 PDF \u0648\u0627\u0644\u0635\u0648\u0631 \u0648\u0628\u0639\u0636 \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0648\u064A\u0628.",
      "examplePoints": [
        "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0642\u0627\u0639\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E.",
        "\u0643\u062A\u0627\u0628\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A.",
        "\u062A\u062D\u062F\u064A\u062F \u0645\u0633\u0624\u0648\u0644 \u0644\u0643\u0644 \u0645\u0647\u0645\u0629."
      ],
      "exampleMarked": "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0642\u0627\u0639\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E."
    },
    "help": {
      "title": "\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629",
      "lead": "\u0627\u0644\u062A\u062B\u0628\u064A\u062A \u0648\u0648\u0636\u0639 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0648\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u062D\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A \u0627\u0644\u0634\u0627\u0626\u0639\u0629.",
      "search": "\u0627\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629",
      "placeholder": "\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0645\u064A\u0632\u0629 \u0623\u0648 \u0627\u0644\u0645\u0634\u0643\u0644\u0629",
      "empty": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C. \u062C\u0631\u0651\u0628 \u0643\u0644\u0645\u0629 \u0623\u062E\u0631\u0649.",
      "results": "\u0627\u0644\u0646\u062A\u0627\u0626\u062C: {count}",
      "installTitle": "\u062A\u062B\u0628\u064A\u062A \u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062A\u0637\u0648\u064A\u0631",
      "installIntro": "\u0644\u0645 \u064A\u064F\u0646\u0634\u0631 Pageleaf \u0641\u064A Chrome Web Store \u0628\u0639\u062F. \u062B\u0628\u0651\u062A \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u063A\u064A\u0631 \u0627\u0644\u0645\u0636\u063A\u0648\u0637 \u0641\u0642\u0637 \u0625\u0630\u0627 \u0643\u0646\u062A \u0645\u0631\u062A\u0627\u062D\u064B\u0627 \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0648\u0636\u0639 \u0627\u0644\u0645\u0637\u0648\u0631.",
      "installSteps": [
        "\u0646\u0632\u0651\u0644 \u0645\u0644\u0641 ZIP \u0627\u0644\u062E\u0627\u0635 \u0628\u0627\u0644\u062A\u062B\u0628\u064A\u062A \u0645\u0646 GitHub Releases \u0648\u0641\u0643 \u0636\u063A\u0637\u0647.",
        "\u0627\u0641\u062A\u062D chrome://extensions \u0641\u064A Chrome \u0639\u0644\u0649 \u0627\u0644\u0643\u0645\u0628\u064A\u0648\u062A\u0631 \u0648\u0641\u0639\u0651\u0644 \u0648\u0636\u0639 \u0627\u0644\u0645\u0637\u0648\u0631.",
        "\u0627\u062E\u062A\u0631 \xAB\u062A\u062D\u0645\u064A\u0644 \u0625\u0636\u0627\u0641\u0629 \u063A\u064A\u0631 \u0645\u0636\u063A\u0648\u0637\u0629\xBB \u0648\u062D\u062F\u062F \u0627\u0644\u0645\u062C\u0644\u062F \u0627\u0644\u0630\u064A \u064A\u062D\u062A\u0648\u064A manifest.json. \u0639\u0646\u062F \u0627\u0644\u0628\u0646\u0627\u0621 \u0645\u0646 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u062E\u062A\u0631 dist.",
        "\u062B\u0628\u0651\u062A \u0623\u064A\u0642\u0648\u0646\u0629 Pageleaf \u0641\u064A \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062A\u060C \u062B\u0645 \u0627\u0641\u062A\u062D \u0645\u0642\u0627\u0644 HTTP \u0623\u0648 HTTPS \u0648\u0627\u0636\u063A\u0637 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629."
      ],
      "releases": "\u062A\u0646\u0632\u064A\u0644 \u0623\u062D\u062F\u062B \u0625\u0635\u062F\u0627\u0631",
      "questions": [
        [
          "capture",
          "\u0643\u064A\u0641 \u0623\u0644\u062A\u0642\u0637 \u0645\u0642\u0627\u0644\u064B\u0627 \u0623\u0648 \u0646\u0635\u064B\u0627 \u0645\u062D\u062F\u062F\u064B\u0627\u061F",
          "\u0627\u0641\u062A\u062D \u0645\u0642\u0627\u0644\u064B\u0627 \u0639\u0627\u062F\u064A\u064B\u0627 \u0648\u0627\u0636\u063A\u0637 \u0623\u064A\u0642\u0648\u0646\u0629 Pageleaf. \u0644\u062A\u0644\u062A\u0642\u0637 \u0641\u0642\u0631\u0629 \u0641\u0642\u0637\u060C \u062D\u062F\u062F \u0627\u0644\u0646\u0635 \u0642\u0628\u0644 \u0627\u0644\u0636\u063A\u0637. \u062A\u0642\u0631\u0623 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u062A\u0627\u062D \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629 \u0641\u0642\u0637\u060C \u0648\u0644\u0627 \u062A\u062A\u062C\u0627\u0648\u0632 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0623\u0648 \u062C\u062F\u0631\u0627\u0646 \u0627\u0644\u062F\u0641\u0639 \u0623\u0648 \u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u0648\u0635\u0648\u0644."
        ],
        [
          "save",
          "\u0645\u062A\u0649 \u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0641\u0639\u0644\u064B\u0627\u061F",
          "\u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\xBB \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0647\u0627 \u0641\u064A \u0645\u0644\u0641 Chrome \u0627\u0644\u062D\u0627\u0644\u064A. \u062A\u0628\u0642\u0649 \u0627\u0644\u0644\u0642\u0637\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u0624\u0642\u062A\u064B\u0627 \u0641\u064A \u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062C\u0644\u0633\u0629: \u0633\u062A \u0644\u0642\u0637\u0627\u062A \u0643\u062D\u062F \u0623\u0642\u0635\u0649\u060C \u0648\u062A\u064F\u062D\u0630\u0641 \u0627\u0644\u0644\u0642\u0637\u0627\u062A \u0627\u0644\u0623\u0642\u062F\u0645 \u0645\u0646 24 \u0633\u0627\u0639\u0629 \u0639\u0646\u062F \u0627\u0644\u062A\u0642\u0627\u0637 \u0645\u062D\u062A\u0648\u0649 \u062C\u062F\u064A\u062F. \u0625\u063A\u0644\u0627\u0642 Chrome \u064A\u0645\u062D\u0648\u0647\u0627. \u0641\u064A \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A \u0639\u0644\u0649 \u0627\u0644\u0648\u064A\u0628 \u062A\u064F\u0645\u062D\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0646\u062F \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629."
        ],
        [
          "mark",
          "\u0643\u064A\u0641 \u0623\u0638\u0644\u0651\u0644 \u0627\u0644\u0646\u0635\u061F",
          "\u062D\u062F\u062F \u0646\u0635\u064B\u0627 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0642\u0627\u0644 \u0648\u0627\u062E\u062A\u0631 \xAB\u062A\u0638\u0644\u064A\u0644\xBB. \u062A\u064F\u0636\u0627\u0641 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0646\u0633\u062E\u0629 \u0645\u0646 \u0627\u0644\u0645\u0642\u0627\u0644. \u0627\u0636\u063A\u0637 \u062D\u0641\u0638 \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A. \u0641\u064A \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A \u0639\u0644\u0649 \u0627\u0644\u0648\u064A\u0628\u060C \u064A\u0624\u062F\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0625\u0644\u0649 \u0645\u0633\u062D \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A."
        ],
        [
          "underline",
          "\u0643\u064A\u0641 \u0623\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062E\u0637 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0645 \u0623\u0648 \u0627\u0644\u0645\u062A\u0645\u0648\u062C\u061F",
          "\u062D\u062F\u062F \u0627\u0644\u0646\u0635 \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0633\u0637\u064A\u0631 \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0645\u062A\u0645\u0648\u062C. \u0623\u0646\u062A \u0645\u0646 \u064A\u0642\u0631\u0631 \u0645\u0627 \u064A\u0631\u064A\u062F \u062A\u062D\u062F\u064A\u062F\u0647. \u0644\u0627 \u064A\u062D\u0643\u0645 Pageleaf \u0639\u0644\u0649 \u0623\u0647\u0645\u064A\u0629 \u0627\u0644\u062C\u0645\u0644\u0629 \u0623\u0648 \u0635\u062D\u062A\u0647\u0627. \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0644\u0627 \u062A\u063A\u064A\u0651\u0631 \u0627\u0644\u0646\u0635 \u0627\u0644\u0623\u0635\u0644\u064A \u0648\u0644\u0627 \u062A\u062A\u0631\u062C\u0645\u0647."
        ],
        [
          "pen",
          "\u0645\u0627 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u0644\u0645\u061F",
          "\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0644\u0645 \u0648\u0627\u0631\u0633\u0645 \u062F\u0627\u0626\u0631\u0629 \u062D\u0648\u0644 \u0641\u0642\u0631\u0629 \u0623\u0648 \u0633\u0647\u0645\u064B\u0627\u060C \u062B\u0645 \u0627\u062D\u0641\u0638. \u062A\u062A\u063A\u064A\u0631 \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u0631\u0633\u0648\u0645 \u0628\u0646\u0633\u0628\u0629 \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u0635\u0641\u062D\u0629\u060C \u0644\u0630\u0644\u0643 \u0627\u0641\u062D\u0635 \u0645\u0643\u0627\u0646\u0647\u0627 \u0628\u0639\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0646\u0627\u0641\u0630\u0629 \u0623\u0648 \u062D\u062C\u0645 \u0627\u0644\u062E\u0637. \u0644\u0627 \u062A\u064F\u0642\u0631\u0623 \u0627\u0644\u0631\u0633\u0648\u0645 \u0643\u0646\u0635\u0648\u0635."
        ],
        [
          "organize",
          "\u0645\u0627\u0630\u0627 \u064A\u0641\u0639\u0644 \xAB\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A\xBB\u061F",
          "\u064A\u0639\u0631\u0636 \u0642\u0627\u0626\u0645\u0629 \u0628\u0627\u0644\u0646\u0635\u0648\u0635 \u0627\u0644\u062A\u064A \u0648\u0636\u0639\u062A \u0639\u0644\u064A\u0647\u0627 \u0639\u0644\u0627\u0645\u0627\u062A. \u062F\u0648\u0646 \u0639\u0644\u0627\u0645\u0627\u062A \u0646\u0635\u064A\u0629\u060C \u064A\u0623\u062E\u0630 \u0623\u0648\u0644 \u062C\u0645\u0644\u0629 \u0645\u0646 \u0643\u0644 \u0642\u0633\u0645. \u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u062B\u0645 \u0627\u062E\u062A\u0631 \u0625\u0636\u0627\u0641\u062A\u0647\u0627 \u0625\u0644\u0649 \xAB\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u064A\xBB. \u0647\u0630\u0627 \u0627\u0642\u062A\u0628\u0627\u0633 \u0628\u0642\u0648\u0627\u0639\u062F \u062B\u0627\u0628\u062A\u0629 \u0648\u0644\u064A\u0633 \u062A\u0644\u062E\u064A\u0635\u064B\u0627 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A. \u0644\u0627 \u064A\u0642\u064A\u0651\u0645 \u0627\u0644\u0623\u0647\u0645\u064A\u0629 \u0623\u0648 \u064A\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062D\u0642\u0627\u0626\u0642 \u0623\u0648 \u064A\u0642\u0631\u0623 \u0631\u0633\u0648\u0645 \u0627\u0644\u0642\u0644\u0645."
        ],
        [
          "search",
          "\u0645\u0627 \u0627\u0644\u0630\u064A \u064A\u0634\u0645\u0644\u0647 \u0627\u0644\u0628\u062D\u062B\u061F",
          "\u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646 \u0648\u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0648\u0646\u0635 \u0627\u0644\u0645\u0642\u0627\u0644 \u0648Markdown \u0641\u064A \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632. \u0644\u0627 \u064A\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A."
        ],
        [
          "export",
          "\u0643\u064A\u0641 \u0623\u0635\u062F\u0651\u0631 Markdown \u0623\u0648 PDF\u061F",
          "\u0627\u0646\u0633\u062E Markdown \u0623\u0648 \u0635\u062F\u0651\u0631 \u0645\u0644\u0641 .md \u064A\u062A\u0636\u0645\u0646 \u0627\u0644\u0645\u0642\u0627\u0644 \u0648\u0645\u0635\u062F\u0631\u0647 \u0648\u0645\u0644\u0627\u062D\u0638\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u064A\u0641\u062A\u062D \xAB\u0637\u0628\u0627\u0639\u0629 / PDF\xBB \u0646\u0627\u0641\u0630\u0629 \u0637\u0628\u0627\u0639\u0629 Chrome\u061B \u0627\u062E\u062A\u0631 \u0627\u0644\u0637\u0627\u0628\u0639\u0629 \u0623\u0648 \u0627\u0644\u062D\u0641\u0638 \u0628\u062A\u0646\u0633\u064A\u0642 PDF. \u0631\u0627\u062C\u0639 \u0627\u0644\u0648\u062C\u0647\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638."
        ],
        [
          "backup",
          "\u0643\u064A\u0641 \u0623\u0646\u0633\u062E \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u064B\u0627 \u0648\u0623\u0633\u062A\u0639\u064A\u062F\u0647\u0627\u061F",
          "\u0627\u0636\u063A\u0637 \xAB\u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629\xBB \u0644\u062A\u0646\u0632\u064A\u0644 JSON. \u0627\u062E\u062A\u0631 \xAB\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0646\u0633\u062E\u0629\xBB \u0648\u062D\u062F\u062F \u0627\u0644\u0645\u0644\u0641 \u0648\u0631\u0627\u062C\u0639 \u0627\u0644\u0639\u062F\u062F \u062B\u0645 \u0623\u0643\u0651\u062F. \u062A\u064F\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0630\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0651\u0641 \u0646\u0641\u0633\u0647\u060C \u0623\u0648 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0646\u0648\u0639 \u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637 \u0648\u0627\u0644\u0646\u0635 \u0646\u0641\u0633\u0647\u0627. \u0644\u0627 \u062A\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0648\u062C\u0648\u062F\u0629. \u0644\u0627 \u062A\u0634\u0645\u0644 \u0645\u0648\u0627\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0623\u0648 \u062A\u0641\u0636\u064A\u0644\u0627\u062A \u0627\u0644\u0639\u0631\u0636."
        ],
        [
          "limits",
          "\u0645\u0627 \u062D\u062F\u0648\u062F \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0648\u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u061F",
          "\u062D\u062A\u0649 100 \u0645\u0644\u0627\u062D\u0638\u0629\u060C \u0628\u062D\u062F 1 \u0645\u064A\u063A\u0627\u0628\u0627\u064A\u062A \u0644\u0643\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u062D\u0641\u0648\u0638\u0629 \u0623\u0648 \u0645\u0633\u062A\u0639\u0627\u062F\u0629\u060C \u064820 \u0645\u064A\u063A\u0627\u0628\u0627\u064A\u062A \u0644\u0645\u0644\u0641 JSON. \u0642\u062F \u062A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u062D\u062F \u0627\u0644\u0645\u0644\u0641\u061B \u0635\u062F\u0651\u0631 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0646\u0641\u0631\u062F\u0629 \u0628\u0635\u064A\u063A\u0629 Markdown \u0648\u0642\u0644\u0651\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0642\u0628\u0644 \u0625\u0646\u0634\u0627\u0621 \u0646\u0633\u062E\u0629 JSON."
        ],
        [
          "progress",
          "\u0643\u064A\u0641 \u064A\u064F\u062D\u0641\u0638 \u0645\u0648\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629\u061F",
          "\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0641\u0642\u0637 \u062A\u062A\u0630\u0643\u0631 \u0645\u0648\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629. \u0627\u0641\u062A\u062D\u0647\u0627 \u0645\u062C\u062F\u062F\u064B\u0627 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629. \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u062D\u0630\u0641 \u0645\u0648\u0636\u0639\u0647\u0627 \u0623\u064A\u0636\u064B\u0627. \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0644\u0627 \u062A\u062D\u062A\u0648\u064A \u0645\u0648\u0627\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629."
        ],
        [
          "shortcuts",
          "\u0645\u0627 \u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D\u061F",
          "\u064A\u0644\u062A\u0642\u0637 Alt / Option + Shift + L \u0627\u0644\u0645\u0642\u0627\u0644 \u0627\u0644\u062D\u0627\u0644\u064A. \u0625\u0646 \u0644\u0645 \u064A\u0639\u0645\u0644\u060C \u0631\u0627\u062C\u0639 \u0627\u0644\u062A\u0639\u0627\u0631\u0636\u0627\u062A \u0641\u064A chrome://extensions/shortcuts. \u0627\u0633\u062A\u062E\u062F\u0645 Tab \u0648Shift + Tab \u0644\u0644\u062A\u0646\u0642\u0644 \u0648Enter \u0623\u0648 \u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0623\u0632\u0631\u0627\u0631. \u064A\u0645\u0643\u0646\u0643 \u0623\u064A\u0636\u064B\u0627 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u062E\u062A\u0635\u0627\u0631 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0641\u064A \u0627\u0644\u0645\u062A\u0635\u0641\u062D."
        ],
        [
          "troubleshooting",
          "\u0644\u0645\u0627\u0630\u0627 \u064A\u0641\u0634\u0644 \u0627\u0644\u0627\u0644\u062A\u0642\u0627\u0637 \u0623\u0648 \u064A\u0646\u0642\u0635 \u0627\u0644\u0646\u0635\u061F",
          "\u0644\u0627 \u062A\u062F\u0639\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0645\u0644\u0641\u0627\u062A PDF \u0623\u0648 \u0635\u0641\u062D\u0627\u062A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0623\u0648 Chrome Web Store \u0623\u0648 \u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0641\u064A\u062F\u064A\u0648. \u0642\u062F \u0644\u0627 \u062A\u064F\u0633\u062A\u062E\u0631\u062C \u0628\u0639\u0636 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0648\u0627\u0644\u062A\u0635\u0627\u0645\u064A\u0645 \u0627\u0644\u0645\u0639\u0642\u062F\u0629 \u0628\u062F\u0642\u0629\u061B \u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0641\u0642\u0631\u0629 \u0623\u0648\u0644\u064B\u0627. \u0644\u0627 \u062A\u064F\u062D\u0645\u0651\u0644 \u0627\u0644\u0635\u0641\u062D\u0627\u062A \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0627\u0644\u0645\u062E\u0641\u064A\u0629 \u0623\u0648 \u0645\u062D\u062A\u0648\u0649 iframe. \u062A\u064F\u0632\u0627\u0644 \u0627\u0644\u0635\u0648\u0631 \u0648\u0642\u062F \u062A\u062D\u062A\u0627\u062C \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u0639\u0642\u062F\u0629 \u0648\u0627\u0644\u0635\u064A\u063A \u0625\u0644\u0649 \u062A\u0639\u062F\u064A\u0644 \u064A\u062F\u0648\u064A."
        ],
        [
          "links",
          "\u0644\u0645\u0627\u0630\u0627 \u062A\u063A\u064A\u0631 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0627\u0628\u0637\u061F",
          "\u0644\u0644\u062E\u0635\u0648\u0635\u064A\u0629\u060C \u062A\u064F\u0632\u0627\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0645\u0639\u0644\u0645\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0648\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646 \u0645\u0646 \u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0644. \u062A\u062D\u062A\u0627\u062C \u0628\u0639\u0636 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0625\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0645\u0627\u062A\u060C \u0648\u0642\u062F \u064A\u0644\u0632\u0645 \u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0623\u0635\u0644\u064A \u064A\u062F\u0648\u064A\u064B\u0627. \u0639\u0646\u062F \u0641\u062A\u062D \u0627\u0644\u0631\u0627\u0628\u0637 \u062A\u0633\u0631\u064A \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0642\u0635\u0648\u062F."
        ],
        [
          "delete",
          "\u0643\u064A\u0641 \u0623\u062D\u0630\u0641 \u0628\u064A\u0627\u0646\u0627\u062A\u064A \u0623\u0648 \u0623\u0646\u0642\u0644\u0647\u0627 \u0644\u062C\u0647\u0627\u0632 \u0622\u062E\u0631\u061F",
          "\u0623\u0646\u0634\u0626 \u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0642\u0628\u0644 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A. \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0645\u062D\u0648 \u0646\u0633\u062E\u062A\u0647\u0627 \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0648\u0645\u0648\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629. \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u0630\u0641 \u0628\u064A\u0627\u0646\u0627\u062A\u0647\u0627 \u0627\u0644\u0645\u062D\u0644\u064A\u0629\u060C \u0644\u0643\u0646 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u062A\u064A \u0635\u062F\u0651\u0631\u062A\u0647\u0627 \u062A\u0628\u0642\u0649 \u0648\u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062D\u0630\u0641 \u0645\u0646\u0641\u0635\u0644. \u0644\u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0627\u0633\u062A\u0639\u062F JSON \u0641\u064A \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0622\u062E\u0631."
        ],
        [
          "feedback",
          "\u0643\u064A\u0641 \u0623\u0628\u0644\u063A \u0639\u0646 \u0645\u0634\u0643\u0644\u0629 \u0628\u0623\u0645\u0627\u0646\u061F",
          "\u0635\u0641 \u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0648\u0625\u0635\u062F\u0627\u0631 Chrome \u0648\u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u0629 \u0641\u064A GitHub Issues. \u0634\u0627\u0631\u0643 \u0631\u0627\u0628\u0637\u064B\u0627 \u0639\u0627\u0645\u064B\u0627 \u0645\u0646\u0627\u0633\u0628\u064B\u0627 \u0641\u0642\u0637. \u0644\u0627 \u062A\u0631\u0641\u0639 \u0645\u0642\u0627\u0644\u0627\u062A \u062E\u0627\u0635\u0629 \u0623\u0648 \u0646\u0633\u062E \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0623\u0648 \u0643\u0644\u0645\u0627\u062A \u0645\u0631\u0648\u0631 \u0623\u0648 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0634\u062E\u0635\u064A\u0629. GitHub \u062E\u062F\u0645\u0629 \u062E\u0627\u0631\u062C\u064A\u0629 \u0644\u0647\u0627 \u0633\u064A\u0627\u0633\u0627\u062A\u0647\u0627 \u0627\u0644\u062E\u0627\u0635\u0629."
        ]
      ],
      "feedback": "\u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0645\u0634\u0643\u0644\u0629 \u0639\u0644\u0649 GitHub"
    },
    "privacy": {
      "title": "\u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
      "lead": "\u0645\u0627 \u064A\u0642\u0631\u0623\u0647 Pageleaf \u0648\u0645\u0627 \u064A\u062D\u0641\u0638\u0647 \u0648\u0643\u064A\u0641 \u062A\u062D\u0630\u0641\u0647.",
      "updated": "Pageleaf 0.3.1 \xB7 25 \u0623\u0643\u062A\u0648\u0628\u0631 2026",
      "sections": [
        [
          "\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629",
          "\u064A\u0633\u062A\u062E\u0631\u062C Pageleaf \u0627\u0644\u0646\u0635 \u0648\u064A\u0646\u0638\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0644\u0649 \u062C\u0647\u0627\u0632\u0643. \u0644\u0627 \u064A\u0631\u0641\u0639 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0623\u0648 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0625\u0644\u0649 \u062E\u0627\u062F\u0645. \u0644\u0627 \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0648\u0644\u0627 \u062A\u062A\u0628\u0639 \u0625\u0639\u0644\u0627\u0646\u064A \u0648\u0644\u0627 \u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0644\u0627 \u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062D\u0627\u0628\u064A\u0629."
        ],
        [
          "\u0627\u0644\u0644\u0642\u0637\u0627\u062A \u0627\u0644\u0645\u0624\u0642\u062A\u0629",
          "\u064A\u0628\u0642\u0649 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0648\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0645\u0646\u0638\u0641 \u0648\u0627\u0644\u0646\u0635 \u0648\u0628\u0646\u064A\u0629 \u0627\u0644\u0645\u0642\u0627\u0644 \u0627\u0644\u0645\u0646\u0638\u0641\u0629 \u0648Markdown \u0641\u064A \u0630\u0627\u0643\u0631\u0629 \u062C\u0644\u0633\u0629 Chrome. \u062A\u064F\u062D\u062A\u0641\u0638 \u0628\u0633\u062A \u0644\u0642\u0637\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0623\u0643\u062B\u0631\u060C \u0648\u062A\u064F\u0632\u0627\u0644 \u0627\u0644\u0623\u0642\u062F\u0645 \u0645\u0646 24 \u0633\u0627\u0639\u0629 \u0639\u0646\u062F \u0627\u0644\u062A\u0642\u0627\u0637 \u0645\u062D\u062A\u0648\u0649 \u062C\u062F\u064A\u062F. \u0625\u063A\u0644\u0627\u0642 Chrome \u064A\u0645\u062D\u0648\u0647\u0627."
        ],
        [
          "\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u062A\u0641\u0636\u064A\u0644\u0627\u062A",
          "\u064A\u062D\u0641\u0638 \u0632\u0631 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0645\u0642\u0627\u0644 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u0646\u0635\u064A\u0629 \u0648\u0631\u0633\u0648\u0645 \u0627\u0644\u0642\u0644\u0645 \u0648\u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E \u0641\u064A \u0645\u0644\u0641 Chrome \u0627\u0644\u062D\u0627\u0644\u064A. \u064A\u0645\u0643\u0646 \u062D\u0641\u0638 \u0645\u0648\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0623\u064A\u0636\u064B\u0627. \u0627\u0644\u0644\u063A\u0629 \u0648\u0627\u0644\u0645\u0638\u0647\u0631 \u0648\u062D\u062C\u0645 \u0627\u0644\u062E\u0637 \u062A\u0641\u0636\u064A\u0644\u0627\u062A \u0645\u062D\u0644\u064A\u0629. \u0644\u0627 \u064A\u0636\u064A\u0641 Pageleaf \u062A\u0634\u0641\u064A\u0631\u064B\u0627 \u0625\u0636\u0627\u0641\u064A\u064B\u0627\u060C \u0648\u0642\u062F \u064A\u0642\u0631\u0623 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u064A\u0633\u062A\u0637\u064A\u0639 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0645\u0644\u0641 \u0627\u0644\u0645\u062A\u0635\u0641\u062D."
        ],
        [
          "\u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A",
          "\u064A\u062A\u064A\u062D activeTab \u0648\u0635\u0648\u0644\u064B\u0627 \u0645\u0624\u0642\u062A\u064B\u0627 \u0644\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u064A \u062A\u062E\u062A\u0627\u0631\u0647\u0627 \u0639\u0628\u0631 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 \u0623\u0648 \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631. \u064A\u0633\u062A\u062E\u0631\u062C scripting \u0627\u0644\u0646\u0635\u060C \u0648\u064A\u062D\u0641\u0638 storage \u0627\u0644\u0644\u0642\u0637\u0627\u062A \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0627\u0636\u0639 \u0648\u0627\u0644\u062A\u0641\u0636\u064A\u0644\u0627\u062A. \u0644\u0627 \u062A\u0637\u0644\u0628 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0648\u0635\u0648\u0644\u064B\u0627 \u062F\u0627\u0626\u0645\u064B\u0627 \u0644\u0644\u0645\u0648\u0627\u0642\u0639 \u0623\u0648 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0641\u062D \u0623\u0648 \u0625\u0630\u0646 \u062A\u0646\u0632\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u064B\u0627."
        ],
        [
          "\u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",
          "\u0644\u0627 \u064A\u064F\u062D\u0645\u0651\u0644 \u0627\u0644\u0642\u0627\u0631\u0626 \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0623\u0648 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0645\u0636\u0645\u0646\u0629 \u0623\u0648 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627. \u062A\u064F\u062D\u0630\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0645\u0639\u0644\u0645\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0648\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646 \u0645\u0646 \u0627\u0644\u0631\u0648\u0627\u0628\u0637. \u0639\u0646\u062F \u0641\u062A\u062D \u0631\u0627\u0628\u0637\u060C \u0628\u0645\u0627 \u0641\u064A\u0647 GitHub\u060C \u064A\u0632\u0648\u0631 Chrome \u0627\u0644\u0648\u062C\u0647\u0629 \u0648\u062A\u0633\u0631\u064A \u0633\u064A\u0627\u0633\u0629 \u062E\u0635\u0648\u0635\u064A\u062A\u0647\u0627."
        ],
        [
          "\u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0651\u0631\u0629",
          "\u062A\u062E\u062A\u0627\u0631 \u0648\u0642\u062A \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0645\u0643\u0627\u0646\u0647. \u064A\u062A\u0636\u0645\u0646 Markdown \u0627\u0644\u0645\u0642\u0627\u0644 \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0646\u0635\u0648\u0635 \u0627\u0644\u0645\u062D\u062F\u062F\u0629\u060C \u062F\u0648\u0646 \u0631\u0633\u0648\u0645 \u0627\u0644\u0642\u0644\u0645. \u064A\u062D\u0641\u0638 JSON \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0648\u0627\u0644\u0631\u0633\u0648\u0645\u060C \u062F\u0648\u0646 \u0645\u0648\u0627\u0636\u0639 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0623\u0648 \u062A\u0641\u0636\u064A\u0644\u0627\u062A \u0627\u0644\u0639\u0631\u0636. \u062A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0648PDF \u062A\u062E\u0637\u064A\u0637 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0627\u0644\u0645\u0631\u0626\u064A \u0645\u0639 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0648\u0627\u0644\u0631\u0633\u0648\u0645\u061B \u0631\u0627\u062C\u0639\u0647 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638. \u0642\u062F \u062A\u0635\u0644 \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0623\u062E\u0631\u0649 \u0623\u0648 \u062E\u062F\u0645\u0627\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u062C\u0644\u062F \u0627\u0644\u0630\u064A \u062A\u062E\u062A\u0627\u0631\u0647."
        ],
        [
          "\u0627\u0644\u062D\u0630\u0641 \u0648\u0627\u0644\u0646\u0642\u0644",
          "\u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0645\u062D\u0648 \u0646\u0633\u062E\u062A\u0647\u0627 \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0648\u0645\u0648\u0636\u0639\u0647\u0627. \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u062A\u0645\u062D\u0648 \u0628\u064A\u0627\u0646\u0627\u062A\u0647\u0627 \u0645\u0646 \u0645\u0644\u0641 Chrome\u060C \u0648\u0644\u0627 \u062A\u0645\u062D\u0648 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0651\u0631\u0629. \u0627\u0646\u0633\u062E \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u064B\u0627 \u0642\u0628\u0644 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0644\u0641 \u0623\u0648 \u0627\u0644\u062C\u0647\u0627\u0632. \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A \u0639\u0644\u0649 \u0627\u0644\u0648\u064A\u0628 \u064A\u0645\u062D\u0648 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0647 \u0639\u0646\u062F \u0627\u0644\u062A\u062D\u062F\u064A\u062B."
        ],
        [
          "\u0646\u0637\u0627\u0642 \u0627\u0644\u0628\u064A\u0627\u0646 \u0648\u0627\u0644\u0623\u0633\u0626\u0644\u0629",
          "\u0647\u0630\u0627 \u0648\u0635\u0641 \u0648\u0627\u0642\u0639\u064A \u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u060C \u0648\u0644\u064A\u0633 \u0627\u062F\u0639\u0627\u0621\u064B \u0628\u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0639\u062A\u0645\u0627\u062F. \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0623\u0635\u0644\u064A \u0645\u0641\u062A\u0648\u062D \u0628\u062A\u0631\u062E\u064A\u0635 MIT. \u0644\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0633\u062A\u062E\u062F\u0645 GitHub Issues \u062F\u0648\u0646 \u0646\u0634\u0631 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062D\u0633\u0627\u0633\u0629. \u0644\u0645 \u064A\u064F\u0646\u0634\u0631 \u0628\u0631\u064A\u062F \u062F\u0639\u0645 \u0645\u0646\u0641\u0635\u0644."
        ]
      ],
      "link": "\u0627\u0637\u0631\u062D \u0633\u0624\u0627\u0644\u064B\u0627 \u0639\u0644\u0649 GitHub"
    },
    "about": {
      "title": "\u0639\u0646 Pageleaf",
      "lead": "\u0644\u062D\u0641\u0638 \u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0648\u064A\u0628 \u0648\u0648\u0636\u0639 \u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0644\u064A\u0647\u0627 \u0648\u0643\u062A\u0627\u0628\u0629 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u0631\u062C\u0648\u0639 \u0625\u0644\u064A\u0647\u0627 \u0644\u0627\u062D\u0642\u064B\u0627.",
      "sections": [
        [
          "\u0627\u0644\u0648\u0638\u0627\u0626\u0641",
          "\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0642\u0627\u0644 \u0645\u0646 Chrome \u0648\u0636\u0639 \u062E\u0637\u0648\u0637\u064B\u0627 \u0648\u0627\u0631\u0633\u0645 \u0648\u0627\u0643\u062A\u0628 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643. \u0627\u062D\u0641\u0638\u0647 \u0645\u062D\u0644\u064A\u064B\u0627 \u0623\u0648 \u0635\u062F\u0651\u0631 \u0645\u0644\u0641\u064B\u0627. \u064A\u0645\u0643\u0646\u0643 \u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0645\u062B\u0627\u0644 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639 \u0642\u0628\u0644 \u0627\u0644\u062A\u062B\u0628\u064A\u062A."
        ],
        [
          "\u0627\u0644\u0644\u063A\u0627\u062A",
          "\u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0648\u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0628\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 \u0648\u0627\u0644\u0635\u064A\u0646\u064A\u0629 \u0627\u0644\u0645\u0628\u0633\u0637\u0629 \u0648\u0627\u0644\u0625\u0633\u0628\u0627\u0646\u064A\u0629 \u0648\u0627\u0644\u0641\u0631\u0646\u0633\u064A\u0629 \u0648\u0627\u0644\u0623\u0644\u0645\u0627\u0646\u064A\u0629 \u0648\u0627\u0644\u064A\u0627\u0628\u0627\u0646\u064A\u0629 \u0648\u0627\u0644\u0639\u0631\u0628\u064A\u0629. \u062A\u062A\u0628\u0639 \u0644\u063A\u0629 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u062D\u062A\u0649 \u062A\u062E\u062A\u0627\u0631 \u063A\u064A\u0631\u0647\u0627. \u0627\u0644\u0644\u063A\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649 \u062A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629. \u0644\u0627 \u064A\u064F\u062A\u0631\u062C\u0645 \u0646\u0635 \u0627\u0644\u0645\u0642\u0627\u0644."
        ],
        [
          "\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0637\u0648\u064A\u0631",
          "0.3.1 \u0625\u0635\u062F\u0627\u0631 \u062A\u0637\u0648\u064A\u0631 \u0644\u0645 \u064A\u064F\u0646\u0634\u0631 \u0641\u064A Chrome Web Store \u0628\u0639\u062F. \u0642\u062F \u0644\u0627 \u062A\u064F\u0644\u062A\u0642\u0637 \u0628\u0639\u0636 \u0627\u0644\u0635\u0641\u062D\u0627\u062A \u062C\u064A\u062F\u064B\u0627. \u0642\u0627\u0631\u0646 \u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0645\u0647\u0645\u0629 \u0628\u0627\u0644\u0623\u0635\u0644 \u0648\u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0651\u0631\u0629."
        ],
        [
          "\u0627\u0644\u0643\u0648\u062F \u0648\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635",
          "\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0623\u0635\u0644\u064A \u0645\u062A\u0627\u062D \u0639\u0644\u0649 GitHub \u0628\u062A\u0631\u062E\u064A\u0635 MIT. \u062A\u062D\u062A\u0641\u0638 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0636\u0645\u0646\u0629 \u0628\u062A\u0631\u0627\u062E\u064A\u0635\u0647\u0627. \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0644\u0645\u0624\u0644\u0641\u064A\u0647\u0627\u061B \u0627\u062D\u062A\u0641\u0638 \u0628\u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0644\u0641 \u0639\u0646\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0629."
        ],
        [
          "\u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0645\u0634\u0643\u0644\u0629",
          "\u0627\u0643\u062A\u0628 \u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0648\u0625\u0635\u062F\u0627\u0631 Chrome \u0641\u064A GitHub Issues. \u064A\u0645\u0643\u0646\u0643 \u0623\u064A\u0636\u064B\u0627 \u0627\u0642\u062A\u0631\u0627\u062D \u062A\u0635\u062D\u064A\u062D \u0644\u0644\u062A\u0631\u062C\u0645\u0629. \u0644\u0627 \u062A\u0631\u0641\u0642 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062E\u0627\u0635\u0629 \u0623\u0648 \u0646\u0633\u062E\u064B\u0627 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0623\u0648 \u0643\u0644\u0645\u0627\u062A \u0645\u0631\u0648\u0631 \u0623\u0648 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0634\u062E\u0635\u064A\u0629."
        ]
      ],
      "code": "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0645\u0635\u062F\u0631",
      "releases": "\u0633\u062C\u0644 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A",
      "license": "\u0627\u0642\u0631\u0623 \u062A\u0631\u062E\u064A\u0635 MIT",
      "contribute": "\u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0629"
    }
  }
};

// src/i18n.js
var SUPPORTED_LANGUAGES = Object.freeze(["en", "zh-CN", "es", "fr", "de", "ja", "ar"]);
var rows = {
  "hidePreview": ["Hide preview", "\u6536\u8D77", "Ocultar vista previa", "Masquer l\u2019aper\xE7u", "Vorschau schlie\xDFen", "\u30D7\u30EC\u30D3\u30E5\u30FC\u3092\u9589\u3058\u308B", "\u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u0645\u0639\u0627\u064A\u0646\u0629"],
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

// src/site.js
var PAGES = ["index.html", "help.html", "privacy.html", "about.html"];
var REPO = "https://github.com/2022x126/pageleaf";
var escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
var lines = (value) => escape(value).replace(/\n/g, "<br>");
var external = (path, label) => `<a href="${REPO}${path}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">\u2197</span></a>`;
var number = (locale, value) => new Intl.NumberFormat(locale).format(value);
function siteMarkup(page = "home", locale = "en") {
  const c = SITE_CONTENT[locale] ?? SITE_CONTENT.en;
  const h = c.home;
  if (page === "home") return `
    <section class="hero" aria-labelledby="page-title">
      <div class="hero-copy"><p class="eyebrow">${escape(h.eyebrow)}</p><h1 id="page-title">${lines(h.title)}</h1><p class="lead">${escape(h.lead)}</p>
        <div class="actions"><a class="button primary" href="reader.html?demo">${escape(h.try)} <span aria-hidden="true">\u2197</span></a><a class="button" href="help.html#install">${escape(h.install)}</a></div><p class="fineprint">${escape(h.hint)}</p></div>
      <aside class="sample" aria-label="${escape(h.example)}"><p class="sample-label">${escape(h.example)}</p><div class="sample-heading"><img src="assets/logo.svg" width="24" height="24" alt=""><span>Pageleaf</span></div><p class="sample-source">${escape(h.exampleSource)}</p><h2>${escape(h.exampleTitle)}</h2><div class="sample-note"><span>${escape(h.exampleNote)}</span><p>${escape(h.exampleThought)}</p></div><div class="sample-body"><p>${escape(h.exampleBody)}</p><ul>${h.examplePoints.map((point) => `<li>${point === h.exampleMarked ? `<u>${escape(point)}</u>` : escape(point)}</li>`).join("")}</ul></div><span class="sample-format" aria-hidden="true">.md</span></aside>
    </section>
    <section class="features section" aria-labelledby="features-title"><h2 id="features-title">${escape(h.featuresTitle)}</h2><div class="feature-grid">${h.features.map(([title, body], i) => `<article><span class="section-number" aria-hidden="true">${number(locale, i + 1).padStart(2, "0")}</span><h3>${escape(title)}</h3><p>${escape(body)}</p></article>`).join("")}</div></section>
    <section class="steps section" aria-labelledby="steps-title"><h2 id="steps-title">${escape(h.stepsTitle)}</h2><ol>${h.steps.map(([title, body]) => `<li><h3>${escape(title)}</h3><p>${escape(body)}</p></li>`).join("")}</ol><a class="text-link" href="help.html">${escape(h.helpLink)} <span aria-hidden="true">\u2197</span></a></section>
    <section class="local section"><div><h2>${escape(h.localTitle)}</h2><p>${escape(h.localBody)}</p><a class="text-link" href="privacy.html">${escape(h.privacyLink)} <span aria-hidden="true">\u2197</span></a></div><p class="compatibility">${escape(h.compatibility)}</p></section>`;
  const info = c[page] ?? c.about;
  const heading = `<header class="page-heading"><h1 id="page-title">${lines(info.title)}</h1><p class="lead">${escape(info.lead)}</p></header>`;
  if (page === "help") return `${heading}
    <section id="install" class="install document-section"><div><span class="section-number" aria-hidden="true">01</span><h2>${escape(info.installTitle)}</h2><p>${escape(info.installIntro)}</p>${external("/releases", info.releases)}</div><ol>${info.installSteps.map((step) => `<li>${escape(step)}</li>`).join("")}</ol></section>
    <section class="help-articles section" aria-label="${escape(c.nav[1])}"><div class="help-search"><label for="help-search">${escape(info.search)}</label><input type="search" id="help-search" placeholder="${escape(info.placeholder)}" autocomplete="off" spellcheck="false"><p id="help-count" class="fineprint" role="status" aria-live="polite">${escape(info.results.replace("{count}", number(locale, info.questions.length)))}</p></div><div id="faq-list">${info.questions.map(([id, question, answer]) => `<details id="${id}" class="faq"><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join("")}</div><p id="help-empty" class="empty" hidden>${escape(info.empty)}</p><p class="support-link">${external("/issues", info.feedback)}</p></section>`;
  const sections = page === "privacy" ? [...info.sections, WEBSITE_PRIVACY[locale] ?? WEBSITE_PRIVACY.en] : info.sections;
  return `${heading}<div class="document"><p class="fineprint">${escape(info.updated ?? `${c.version} \xB7 v0.3.1`)}</p>${sections.map(([title, body], i) => `<section class="document-section"><span class="section-number" aria-hidden="true">${number(locale, i + 1).padStart(2, "0")}</span><div><h2>${escape(title)}</h2><p>${escape(body)}</p></div></section>`).join("")}
    <div class="document-links">${page === "privacy" ? external("/issues", info.link) : [external("", info.code), external("/releases", info.releases), external("/blob/main/LICENSE", info.license), external("/blob/main/CONTRIBUTING.md", info.contribute)].join("")}</div></div>`;
}
function filterHelp(document, locale, query = "") {
  const c = SITE_CONTENT[locale] ?? SITE_CONTENT.en;
  const tokens = query.trim().normalize("NFKC").toLocaleLowerCase(locale).split(/\s+/u).filter(Boolean);
  let count = 0;
  for (const entry of document.querySelectorAll(".faq")) {
    const text = entry.textContent.normalize("NFKC").toLocaleLowerCase(locale);
    const show = tokens.every((token) => text.includes(token));
    entry.hidden = !show;
    if (tokens.length) entry.open = show;
    else entry.open = false;
    if (show) count++;
  }
  const result = document.getElementById("help-count");
  if (result) result.textContent = c.help.results.replace("{count}", number(locale, count));
  const empty = document.getElementById("help-empty");
  if (empty) empty.hidden = count > 0;
  return count;
}
function renderSite(document, page, locale, dark = false) {
  locale = resolveLanguage(locale);
  const c = SITE_CONTENT[locale];
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("dark", dark);
  document.title = `${page === "home" ? "Pageleaf" : c.nav[["help", "privacy", "about"].indexOf(page) + 1] + " \xB7 Pageleaf"}`;
  document.querySelector(".skip").textContent = c.skip;
  const nav = document.querySelector(".site-nav");
  nav.setAttribute("aria-label", c.nav[0]);
  nav.innerHTML = c.nav.map((name, i) => `<a href="${PAGES[i]}"${i === ["home", "help", "privacy", "about"].indexOf(page) ? ' aria-current="page"' : ""}>${escape(name)}</a>`).join("");
  const label = document.getElementById("language-label");
  label.textContent = c.language;
  const select = document.getElementById("language");
  select.innerHTML = Object.entries(SITE_LANGUAGES).map(([code, name]) => `<option value="${code}" lang="${code}"${code === locale ? " selected" : ""}>${name}</option>`).join("");
  const theme = document.getElementById("theme");
  theme.setAttribute("aria-label", c.theme[dark ? 1 : 0]);
  theme.title = c.theme[dark ? 1 : 0];
  theme.setAttribute("aria-pressed", String(dark));
  theme.textContent = dark ? "\u2600" : "\u25D0";
  document.getElementById("main").innerHTML = siteMarkup(page, locale);
  document.getElementById("footer-message").textContent = c.footer;
  document.getElementById("footer-version").textContent = `${c.version} \xB7 0.3.1`;
  document.getElementById("footer-privacy").textContent = c.nav[2];
  document.getElementById("footer-license").textContent = c.about.license + " \u2197";
  for (const link of document.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (!/^(?:index|help|privacy|about|reader)\.html(?:[?#]|$)/.test(href)) continue;
    const [path, hash = ""] = href.split("#");
    const [file, search = ""] = path.split("?");
    const params = new URLSearchParams(search);
    params.set("lang", locale);
    link.setAttribute("href", `${file}?${params}${hash ? "#" + hash : ""}`);
  }
  if (page === "help") {
    filterHelp(document, locale);
    document.getElementById("help-search").addEventListener("input", (event) => filterHelp(document, locale, event.target.value));
    const target = document.defaultView?.location.hash.slice(1);
    const details = document.getElementById(target);
    if (details?.tagName === "DETAILS") details.open = true;
  }
}
async function initSite(window2) {
  const { document } = window2;
  const page = document.body.dataset.page ?? "home";
  const extensionStorage = window2.chrome?.storage?.local;
  let settings = {};
  let savedLanguage;
  let savedDark;
  try {
    if (extensionStorage) settings = (await extensionStorage.get("settings")).settings ?? {};
    else {
      savedLanguage = window2.localStorage.getItem("pageleaf-language");
      const value = window2.localStorage.getItem("pageleaf-dark");
      if (value !== null) savedDark = value === "true";
    }
  } catch {
  }
  const param = new URLSearchParams(window2.location.search).get("lang");
  let locale = resolveLanguage(param || settings.language || savedLanguage || window2.navigator.languages);
  let dark = typeof settings.dark === "boolean" ? settings.dark : savedDark ?? window2.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  const render = () => renderSite(document, page, locale, dark);
  const persist = async (patch) => {
    try {
      if (extensionStorage) {
        const write = async () => {
          const previous = (await extensionStorage.get("settings")).settings ?? {};
          await extensionStorage.set({ settings: { ...previous, ...patch } });
        };
        if (window2.navigator.locks) await window2.navigator.locks.request("pageleaf-settings-write", write);
        else await write();
      } else {
        if ("language" in patch) window2.localStorage.setItem("pageleaf-language", patch.language);
        if ("dark" in patch) window2.localStorage.setItem("pageleaf-dark", String(patch.dark));
      }
    } catch {
    }
  };
  render();
  document.getElementById("language").addEventListener("change", async (event) => {
    locale = resolveLanguage(event.target.value);
    const url = new URL(window2.location.href);
    url.searchParams.set("lang", locale);
    window2.history.replaceState(null, "", url);
    render();
    await persist({ language: locale });
  });
  document.getElementById("theme").addEventListener("click", async () => {
    dark = !dark;
    document.body.classList.toggle("dark", dark);
    const button = document.getElementById("theme");
    button.setAttribute("aria-label", SITE_CONTENT[locale].theme[dark ? 1 : 0]);
    button.title = button.getAttribute("aria-label");
    button.setAttribute("aria-pressed", String(dark));
    button.textContent = dark ? "\u2600" : "\u25D0";
    await persist({ dark });
  });
}
if (typeof window !== "undefined" && window.document.body?.dataset.page) void initSite(window);
export {
  filterHelp,
  initSite,
  renderSite,
  siteMarkup
};

import { cp, mkdir, rm, writeFile } from "node:fs/promises";

// Publish only public product assets. No background worker, manifest, local
// browser data, source maps or workspace files belong in the web preview.
await rm("site-dist", { recursive: true, force: true });
await mkdir("site-dist");
for (const name of [
  "index.html", "help.html", "privacy.html", "about.html", "reader.html",
  "site.css", "reader.css", "site.js", "reader.js", "assets", "icons",
  "LICENSE", "PRIVACY.md", "THIRD_PARTY_NOTICES.md",
]) await cp(`dist/${name}`, `site-dist/${name}`, { recursive: true });
await writeFile("site-dist/.nojekyll", "");
console.log("Built public product site → site-dist/");

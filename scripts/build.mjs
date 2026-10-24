import { build } from "esbuild";
import { rm, mkdir, cp, readFile, writeFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { renderSite } from "../src/site.js";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
// Render current English copy into the static fallback without running scripts.
for (const [filename, page] of [["index.html", "home"], ["help.html", "help"], ["privacy.html", "privacy"], ["about.html", "about"]]) {
  const dom = new JSDOM(await readFile(`dist/${filename}`, "utf8"), { url: `https://pageleaf.invalid/${filename}` });
  renderSite(dom.window.document, page, "en");
  await writeFile(`dist/${filename}`, dom.serialize());
  dom.window.close();
}
for (const name of ["LICENSE", "PRIVACY.md", "THIRD_PARTY_NOTICES.md"])
  await cp(name, `dist/${name}`);
await build({
  entryPoints: ["src/background.js", "src/reader.js", "src/site.js"],
  outdir: "dist",
  bundle: true,
  format: "esm",
  target: "chrome116",
  legalComments: "eof",
  minify: false,
});
await build({
  entryPoints: ["src/inject.js"],
  outfile: "dist/capture.js",
  bundle: true,
  format: "iife",
  globalName: "PageleafCapture",
  target: "chrome116",
  legalComments: "eof",
});
console.log("Built Pageleaf → dist/");

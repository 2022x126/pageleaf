import { build } from "esbuild";
import { rm, mkdir, cp } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
for (const name of ["LICENSE", "PRIVACY.md", "THIRD_PARTY_NOTICES.md"])
  await cp(name, `dist/${name}`);
await build({
  entryPoints: ["src/background.js", "src/reader.js"],
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

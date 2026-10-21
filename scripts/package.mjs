import {
  access,
  cp,
  mkdir,
  readdir,
  rm,
  mkdtemp,
  readFile,
} from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";

const root = fileURLToPath(new URL("../", import.meta.url));
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
if (!/^\d+\.\d+\.\d+$/.test(pkg.version))
  throw new Error("Unsafe package version");
const parent = path.dirname(root);
const installZip = path.join(parent, `pageleaf-${pkg.version}.zip`);
const sourceZip = path.join(parent, `pageleaf-source-${pkg.version}.zip`);
const runtime = path.join(root, "dist");
await access(path.join(runtime, "manifest.json"));
const staging = await mkdtemp(path.join(os.tmpdir(), "pageleaf-package-"));
async function collect(directory, prefix = "") {
  const result = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (item.isSymbolicLink())
      throw new Error(`Symlink is not allowed in a package: ${item.name}`);
    const rel = path.join(prefix, item.name);
    if (item.isDirectory())
      result.push(...(await collect(path.join(directory, item.name), rel)));
    else if (item.isFile()) result.push(rel);
  }
  return result;
}
function archive(directory, target, names) {
  if (!names.length) throw new Error("Refusing empty archive");
  execFileSync("zip", ["-q", "-X", target, "-@"], {
    cwd: directory,
    input: names.sort().join("\n") + "\n",
  });
}
try {
  const runtimeNames = await collect(runtime);
  if (
    runtimeNames.some((p) =>
      /(?:^|[/\\])(?:node_modules|\.git|\.env)(?:[/\\.]|$)/.test(p),
    )
  )
    throw new Error("Unexpected private files in runtime");
  await rm(installZip, { force: true });
  archive(runtime, installZip, runtimeNames);
  const sourceRoot = path.join(staging, "pageleaf");
  await mkdir(sourceRoot);
  const whitelist = [
    "src",
    "public",
    "scripts",
    "test",
    ".github",
    "docs",
    "package.json",
    "package-lock.json",
    ".gitignore",
    "README.md",
    "README.en.md",
    "PRIVACY.md",
    "CHROMEWEBSTORE.md",
    "LICENSE",
    "CONTRIBUTING.md",
    "THIRD_PARTY_NOTICES.md",
  ];
  for (const entry of whitelist) {
    try {
      await access(path.join(root, entry));
    } catch {
      continue;
    }
    await cp(path.join(root, entry), path.join(sourceRoot, entry), {
      recursive: true,
      dereference: false,
    });
  }
  const sourceNames = await collect(staging);
  if (
    sourceNames.some(
      (p) =>
        /(?:^|[/\\])(?:node_modules|\.git|\.env|dist)(?:[/\\.]|$)/.test(p) ||
        /\.(?:pem|key)$/i.test(p),
    )
  )
    throw new Error("Unexpected private/build files in source package");
  await rm(sourceZip, { force: true });
  archive(staging, sourceZip, sourceNames);
  console.log(`Installation package: ${installZip}`);
  console.log(`Source package: ${sourceZip}`);
} finally {
  await rm(staging, { recursive: true, force: true });
}

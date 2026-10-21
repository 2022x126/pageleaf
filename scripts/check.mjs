import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(root, "dist");
const manifest = JSON.parse(
  await readFile(path.join(dist, "manifest.json"), "utf8"),
);
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
assert.equal(manifest.manifest_version, 3, "Manifest V3 is required");
assert.equal(
  manifest.version,
  pkg.version,
  "Version differs between package and manifest",
);
assert.ok(
  manifest.name && manifest.name.length <= 75,
  "Invalid extension name",
);
assert.ok(
  manifest.description && manifest.description.length <= 132,
  "Invalid short description",
);
assert.deepEqual(
  [...manifest.permissions].sort(),
  ["activeTab", "scripting", "storage"].sort(),
  "Unexpected permission",
);
for (const field of [
  "host_permissions",
  "optional_host_permissions",
  "optional_permissions",
  "content_scripts",
  "externally_connectable",
]) {
  assert.ok(
    !manifest[field] ||
      (Array.isArray(manifest[field]) && manifest[field].length === 0),
    `Unexpected ${field}`,
  );
}
assert.ok(manifest.action, "Toolbar action missing");
assert.ok(
  !manifest.action.default_popup,
  "Capture must start from action click",
);
assert.ok(manifest.background?.service_worker, "Service worker missing");
const csp = manifest.content_security_policy?.extension_pages;
assert.equal(typeof csp, "string", "Explicit extension CSP required");
assert.ok(csp.includes("script-src 'self'"), "Restrict scripts to package");
assert.ok(
  !/unsafe-eval|unsafe-inline|https?:|\*/.test(csp),
  "CSP permits remote or inline execution",
);

async function files(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const p = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await files(p)));
    else if (entry.isFile()) found.push(p);
    else throw new Error(`Nonregular artifact: ${p}`);
  }
  return found;
}
function localAsset(reference) {
  assert.ok(
    typeof reference === "string" &&
      !reference.includes("..") &&
      !path.isAbsolute(reference) &&
      !/^[a-z]+:/i.test(reference),
    `Unsafe asset path ${reference}`,
  );
  return path.join(dist, reference);
}
await access(localAsset(manifest.background.service_worker));
for (const [size, filename] of Object.entries(manifest.icons ?? {})) {
  const bytes = await readFile(localAsset(filename));
  assert.equal(
    bytes.subarray(0, 8).toString("hex"),
    "89504e470d0a1a0a",
    `Invalid PNG ${filename}`,
  );
  assert.equal(
    bytes.readUInt32BE(16),
    Number(size),
    `Wrong icon width ${filename}`,
  );
  assert.equal(
    bytes.readUInt32BE(20),
    Number(size),
    `Wrong icon height ${filename}`,
  );
}
for (const filename of Object.values(manifest.action.default_icon ?? {}))
  await access(localAsset(filename));
for (const name of ["LICENSE", "PRIVACY.md", "THIRD_PARTY_NOTICES.md"])
  await access(path.join(dist, name));
const runtime = await files(dist);
assert.ok(
  !runtime.some((p) =>
    /(?:^|[/\\])(?:\.git|node_modules|\.env)(?:[/\\.]|$)/.test(p),
  ),
  "Private/build files leaked into runtime",
);
for (const filename of runtime.filter((p) => p.endsWith(".html"))) {
  const text = await readFile(filename, "utf8");
  assert.ok(
    !/<script\b(?![^>]*\bsrc\s*=)[^>]*>[\s\S]*?\S[\s\S]*?<\/script>/i.test(
      text,
    ),
    `Inline script in ${filename}`,
  );
  assert.ok(
    !/\son[a-z]+\s*=/i.test(text),
    `Inline event handler in ${filename}`,
  );
  assert.ok(
    !/<(?:script|iframe|img)\b[^>]*(?:src|srcset)\s*=\s*["']https?:/i.test(
      text,
    ),
    `Remote asset in ${filename}`,
  );
  for (const match of text.matchAll(
    /<(?:script|link)\b[^>]*(?:src|href)\s*=\s*["']([^"']+)["']/gi,
  )) {
    await access(localAsset(match[1].split(/[?#]/)[0]));
  }
}
for (const filename of (await files(path.join(root, "src"))).filter((p) =>
  p.endsWith(".js"),
)) {
  const text = await readFile(filename, "utf8");
  assert.ok(
    !/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(|\bsendBeacon\s*\(|\bimportScripts\s*\(/.test(
      text,
    ),
    `Network or remote-code API in ${filename}`,
  );
  assert.ok(
    !/\beval\s*\(|\bnew\s+Function\s*\(/.test(text),
    `Dynamic executable code in ${filename}`,
  );
  execFileSync(process.execPath, ["--check", filename], { stdio: "pipe" });
}
console.log(
  `Static checks passed: Manifest V3; 3 scoped permissions; ${runtime.length} runtime files; icon sizes, CSP, local assets and source network checks.`,
);

import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { JSDOM } from "jsdom";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(root, "dist");
const manifest = JSON.parse(
  await readFile(path.join(dist, "manifest.json"), "utf8"),
);
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
assert.equal(manifest.default_locale, "en", "English is the manifest fallback");
for (const locale of ["en", "zh_CN", "es", "fr", "de", "ja", "ar"]) {
  const messages = JSON.parse(await readFile(path.join(dist, "_locales", locale, "messages.json"), "utf8"));
  for (const key of ["extensionName", "extensionDescription", "actionTitle", "commandDescription"])
    assert.ok(messages[key]?.message?.trim(), `Missing ${locale} manifest message: ${key}`);
  assert.ok(messages.extensionName.message.length <= 75, `Long ${locale} name`);
  assert.ok(messages.extensionDescription.message.length <= 132, `Long ${locale} description`);
}
assert.equal(manifest.options_ui?.page, "index.html", "Product home must be accessible from extension options");
assert.equal(manifest.options_ui?.open_in_tab, true);
for (const page of ["index.html", "help.html", "privacy.html", "about.html", "reader.html"])
  await access(path.join(dist, page));
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
// Backgrounds must reference bundled files; CSS escapes are decoded before
// inspecting URLs so an escaped protocol cannot disguise an external resource.
function cssText(value) {
  return value
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(
      /\\([0-9a-f]{1,6})(?:\r\n|[ \t\r\n\f])?|\\([^\r\n\f])/gi,
      (_, hex, character) =>
        hex
          ? String.fromCodePoint(
              Math.min(parseInt(hex, 16) || 0xfffd, 0x10ffff),
            )
          : character,
    );
}
function cssURLs(value) {
  return [
    ...cssText(value).matchAll(
      /\burl\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi,
    ),
  ].map((match) => (match[1] ?? match[2] ?? match[3]).trim());
}
function isFragment(reference) {
  return /^#[^\s"'()]+$/.test(reference);
}
for (const filename of runtime.filter((p) => p.endsWith(".css"))) {
  const text = await readFile(filename, "utf8");
  assert.ok(!/@import\b/i.test(cssText(text)), `CSS import in ${filename}`);
  for (const reference of cssURLs(text)) {
    if (isFragment(reference)) continue;
    assert.ok(
      reference &&
        !/^(?:[a-z][a-z\d+.-]*:|\/\/|\\)/i.test(reference) &&
        !path.isAbsolute(reference),
      `Nonlocal CSS resource ${reference} in ${filename}`,
    );
    const pathname = decodeURIComponent(reference.split(/[?#]/)[0]);
    const target = path.resolve(path.dirname(filename), pathname);
    const relative = path.relative(dist, target);
    assert.ok(
      relative &&
        relative !== ".." &&
        !relative.startsWith(`..${path.sep}`) &&
        !path.isAbsolute(relative) &&
        runtime.includes(target),
      `Missing or unsafe CSS resource ${reference} in ${filename}`,
    );
    await access(target);
  }
}
for (const filename of runtime.filter(
  (p) =>
    p.endsWith(".svg") &&
    path.relative(dist, p).startsWith(`assets${path.sep}`),
)) {
  const text = await readFile(filename, "utf8");
  assert.ok(
    !/<!DOCTYPE|<!ENTITY/i.test(text),
    `SVG entity declaration in ${filename}`,
  );
  const parsed = new JSDOM(text, { contentType: "image/svg+xml" });
  try {
    const document = parsed.window.document;
    assert.equal(
      document.documentElement.localName,
      "svg",
      `Invalid SVG root in ${filename}`,
    );
    const elements = [...document.querySelectorAll("*")];
    const ids = new Set(
      elements.map((element) => element.getAttribute("id")).filter(Boolean),
    );
    function localSVGReference(reference) {
      assert.ok(
        isFragment(reference) && ids.has(reference.slice(1)),
        `External or missing SVG resource ${reference} in ${filename}`,
      );
    }
    for (const element of elements) {
      assert.ok(
        !["script", "foreignobject"].includes(element.localName.toLowerCase()),
        `Active SVG content in ${filename}`,
      );
      for (const attribute of element.attributes) {
        assert.ok(
          !/^on/i.test(attribute.localName),
          `SVG event handler in ${filename}`,
        );
        if (
          attribute.localName.toLowerCase() === "href" &&
          attribute.value.trim()
        ) {
          localSVGReference(attribute.value.trim());
        }
        for (const reference of cssURLs(attribute.value))
          localSVGReference(reference);
      }
      if (element.localName.toLowerCase() === "style") {
        const style = cssText(element.textContent);
        assert.ok(
          !/@import\b/i.test(style),
          `SVG stylesheet import in ${filename}`,
        );
        for (const reference of cssURLs(style)) localSVGReference(reference);
      }
    }
  } finally {
    parsed.window.close();
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
  `Static checks passed: Manifest V3; 3 scoped permissions; ${runtime.length} runtime files; icon sizes, CSP, local CSS assets, inert SVGs and source network checks.`,
);

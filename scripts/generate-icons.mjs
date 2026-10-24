/**
 * Rebuild Pageleaf's Leaf-P master SVG and real-size Chrome PNGs.
 * No graphics/runtime dependency: vector contours are flattened, scan-converted
 * at 8× resolution, and encoded with Node's built-in zlib.
 * Run: node scripts/generate-icons.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { deflateSync } from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const size = 64;
// One outer silhouette and one leaf-shaped counter. Kept as data so that SVG
// and all PNG sizes come from precisely the same geometry.
const contours = [
  [
    ['M', 12, 56], ['L', 12, 12], ['Q', 12, 8, 16, 8],
    ['L', 52, 8], ['L', 52, 18], ['C', 52, 35.5, 41.5, 46, 24, 46],
    ['L', 24, 56], ['L', 18, 52], ['Z'],
  ],
  [
    ['M', 24, 34], ['C', 24, 25, 29.5, 20, 40, 20],
    ['C', 40, 29, 34.5, 34, 24, 34], ['Z'],
  ],
];
const d = contours.flatMap((contour) => contour.map(([cmd, ...values]) => `${cmd}${values.join(' ')}`)).join(' ');
const master = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">\n  <path fill="currentColor" fill-rule="evenodd" d="${d}"/>\n</svg>\n`;

function flatten(contour) {
  const points = [];
  let x = 0, y = 0;
  for (const [command, ...v] of contour) {
    const x0 = x, y0 = y;
    if (command === 'M' || command === 'L') {
      [x, y] = v;
      points.push([x, y]);
    } else if (command === 'Q') {
      for (let step = 1; step <= 32; step++) {
        const t = step / 32, u = 1 - t;
        points.push([u * u * x0 + 2 * u * t * v[0] + t * t * v[2], u * u * y0 + 2 * u * t * v[1] + t * t * v[3]]);
      }
      [x, y] = v.slice(2);
    } else if (command === 'C') {
      for (let step = 1; step <= 64; step++) {
        const t = step / 64, u = 1 - t;
        points.push([u ** 3 * x0 + 3 * u * u * t * v[0] + 3 * u * t * t * v[2] + t ** 3 * v[4], u ** 3 * y0 + 3 * u * u * t * v[1] + 3 * u * t * t * v[3] + t ** 3 * v[5]]);
      }
      [x, y] = v.slice(4);
    }
  }
  return points;
}
const polygons = contours.map(flatten);

function roundedRect(x, y, left, top, width, height, radius) {
  const dx = Math.abs(x - (left + width / 2)) - (width / 2 - radius);
  const dy = Math.abs(y - (top + height / 2)) - (height / 2 - radius);
  return Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) + Math.min(Math.max(dx, dy), 0) <= radius;
}

function rasterize(targetSize) {
  const samples = 8;
  const hiSize = targetSize * samples;
  const scale = hiSize / size;
  const coverage = new Uint8Array(hiSize * hiSize);
  // Even-odd scanlines preserve the leaf counter without depending on winding.
  for (let row = 0; row < hiSize; row++) {
    const y = (row + 0.5) / scale;
    const intersections = [];
    for (const polygon of polygons) {
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const a = polygon[j], b = polygon[i];
        if ((a[1] > y) === (b[1] > y)) continue;
        intersections.push(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]));
      }
    }
    intersections.sort((a, b) => a - b);
    for (let i = 0; i + 1 < intersections.length; i += 2) {
      const left = Math.max(0, Math.ceil(intersections[i] * scale - 0.5));
      const right = Math.min(hiSize, Math.ceil(intersections[i + 1] * scale - 0.5));
      coverage.fill(1, row * hiSize + left, row * hiSize + right);
    }
  }
  const rgba = Buffer.alloc(targetSize * targetSize * 4);
  for (let py = 0; py < targetSize; py++) {
    for (let px = 0; px < targetSize; px++) {
      let opacity = 0, luminance = 0;
      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const hx = px * samples + sx, hy = py * samples + sy;
          const x = (hx + 0.5) / scale, y = (hy + 0.5) / scale;
          // White carrier with a black keyline makes one asset legible on both
          // light and dark browser toolbars. Beyond the carrier is transparent.
          if (!roundedRect(x, y, 1, 1, 62, 62, 14)) continue;
          opacity++;
          const insideCarrier = roundedRect(x, y, 3, 3, 58, 58, 12);
          const black = !insideCarrier || coverage[hy * hiSize + hx];
          if (!black) luminance += 255;
        }
      }
      const offset = (py * targetSize + px) * 4;
      const channel = opacity ? Math.round(luminance / opacity) : 0;
      rgba[offset] = rgba[offset + 1] = rgba[offset + 2] = channel;
      rgba[offset + 3] = Math.round(opacity * 255 / (samples * samples));
    }
  }
  return rgba;
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, bytes) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4); length.writeUInt32BE(bytes.length);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([name, bytes])));
  return Buffer.concat([length, name, bytes, crc]);
}
function png(width, pixels) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0); header.writeUInt32BE(width, 4);
  header[8] = 8; header[9] = 6;
  const raw = Buffer.alloc(width * (width * 4 + 1));
  for (let row = 0; row < width; row++) pixels.copy(raw, row * (width * 4 + 1) + 1, row * width * 4, (row + 1) * width * 4);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

await mkdir(path.join(root, 'public/assets'), { recursive: true });
await mkdir(path.join(root, 'public/icons'), { recursive: true });
await writeFile(path.join(root, 'public/assets/logo.svg'), master);
for (const targetSize of [16, 32, 48, 128]) {
  await writeFile(path.join(root, `public/icons/icon-${targetSize}.png`), png(targetSize, rasterize(targetSize)));
  console.log(`icons/icon-${targetSize}.png: ${targetSize}×${targetSize}`);
}
console.log('Master: public/assets/logo.svg (64×64, currentColor)');

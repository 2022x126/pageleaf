# Pageleaf identity

The Pageleaf mark is **Leaf-P**: a bookmark spine supporting an opening page, with a leaf-shaped space cut from the upper form. It remains recognizable without a wordmark or any particular writing system. The small notch at the foot connects the mark to saving a reading position.

## Assets

| File | Use |
| --- | --- |
| `public/assets/logo.svg` | Transparent, single-color master. `viewBox="0 0 64 64"`; `fill="currentColor"`. |
| `public/icons/icon-16.png` | 16×16 browser toolbar icon. |
| `public/icons/icon-32.png` | 32×32 high-density toolbar icon. |
| `public/icons/icon-48.png` | 48×48 extension-management icon. |
| `public/icons/icon-128.png` | 128×128 extension icon. |
| `scripts/generate-icons.mjs` | Reproducible SVG/PNG generator using only Node built-ins. |

Run `node scripts/generate-icons.mjs` from the project root to regenerate the assets. PNGs use the same contours as the master and are rasterized with 8× sampling at each actual output size. No font, remote asset, graphics package, or build-time network request is involved.

## Use

- Use black on white or white on black. Do not add gradients, colors, textures, outlines to the standalone mark, or visual effects.
- The master includes its clear space. Use the complete 64×64 view box without cropping; do not stretch or rotate it. Minimum display size: 16×16 CSS pixels. Prefer 28–32 pixels in product navigation.
- Inline the master SVG when it should inherit the surrounding text color. A standalone SVG loaded through `<img>` does not inherit page `currentColor`; use a CSS mask with the SVG, an explicit black/white treatment, or the supplied PNG where appropriate.
- PNGs deliberately include a white rounded carrier and black keyline. The black mark stays visible on a light toolbar, and its white carrier remains visible on a dark toolbar. Do not put a second frame around those icons.
- Use **Pageleaf** as the shared international wordmark. “叶笺” may appear as the Chinese name in a Chinese interface. The symbol itself contains no text or language-specific characters.
- When a visible wordmark accompanies the symbol, make the symbol decorative (`aria-hidden="true"` or empty `alt`). An icon-only home link needs the translated accessible name “Pageleaf home” or its equivalent.

## 中文说明

新标志将字母 P、展开的书页和书签主干合为一个粗轮廓；斜向叶形留白呼应 Pageleaf。它不依靠中文或细线来识别。界面继续采用纯白、纯黑，不添加装饰性背景。浏览器图标带白色承托面和黑色边界，以兼顾深浅工具栏。

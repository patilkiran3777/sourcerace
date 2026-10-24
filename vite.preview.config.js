// Builds dist-preview/index.html: one self-contained file (JS, CSS, fonts, images inlined)
// that opens with a double-click, no server needed. Run: npm run build:preview
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'node:fs';
import path from 'node:path';

function inlinePublicAssets() {
  const pub = path.resolve('public');
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  return {
    name: 'inline-public-assets',
    transformIndexHtml(html) {
      const map = {};
      for (const f of walk(pub)) {
        const ext = path.extname(f).slice(1);
        const mime = { webp: 'image/webp', svg: 'image/svg+xml' }[ext];
        if (!mime) continue;
        map['/' + path.relative(pub, f).split(path.sep).join('/')] = `data:${mime};base64,${fs.readFileSync(f).toString('base64')}`;
      }
      return html
        .replace(/<link rel="(preload|icon)"[^>]*>\s*/g, '')
        .replace('<head>', `<head><script>window.__ST_ASSETS=${JSON.stringify(map)}</script>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), viteSingleFile(), inlinePublicAssets()],
  publicDir: false,
  build: { outDir: 'dist-preview', assetsInlineLimit: 100000000, cssCodeSplit: false },
});

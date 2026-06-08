#!/usr/bin/env node
/**
 * Converte leads/*.md → leads/*.html (fonte: Markdown · leitura: HTML)
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const leadsDir = join(root, 'leads');

marked.setOptions({
  gfm: true,
  breaks: false,
});

function extractTitle(md, filename) {
  const match = md.match(/^#\s+(.+)$/m);
  if (match) return match[1].replace(/\s*—.*$/, '').trim();
  return basename(filename, '.md').replace(/-/g, ' ');
}

function isLeadsLocalPath(path) {
  if (!path || path.startsWith('http') || path.startsWith('//') || path.includes('..')) {
    return false;
  }
  return true;
}

function fixInternalLinks(html) {
  let out = html.replace(/href="([^"]+)\.md(#[^"]*)?"/g, (match, path, hash = '') => {
    if (!isLeadsLocalPath(path)) return match;
    const clean = path.replace(/^\.\//, '');
    return `href="${clean}.html${hash}"`;
  });
  out = out.replace(/<code>([a-z0-9_.-]+\.md)<\/code>/gi, (match, file) => {
    const href = file.replace(/\.md$/i, '.html');
    return `<a href="${href}"><code>${href}</code></a>`;
  });
  return out;
}

/** Slug estilo GitHub para âncoras internas (#seção). */
function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\u00C0-\u024F\u1E00-\u1EFF]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** marked não gera id nos headings — necessário para índices com links #âncora. */
function addHeadingIds(html) {
  const used = new Map();
  return html.replace(/<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (match, level, attrs = '', inner) => {
    if (attrs && /\bid\s*=/.test(attrs)) return match;
    const text = inner.replace(/<[^>]*>/g, '').trim();
    if (!text) return match;
    let id = slugifyHeading(text);
    const count = used.get(id) || 0;
    used.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

function wrapPage(title, bodyHtml) {
  const safeTitle = title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${safeTitle} — TechDrone360 Comercial</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="comercial.css" />
</head>
<body class="doc-page">
  <nav class="doc-bar" aria-label="Navegação do documento">
    <div class="doc-bar__inner">
      <a class="doc-bar__back" href="index.html">← Índice comercial</a>
      <a class="doc-bar__site" href="https://techdrone360.com.br/" target="_blank" rel="noopener noreferrer">Site</a>
    </div>
  </nav>
  <article class="wrap doc-prose">
${bodyHtml}
  </article>
</body>
</html>
`;
}

const files = readdirSync(leadsDir).filter((f) => f.endsWith('.md'));
let count = 0;

for (const file of files) {
  const mdPath = join(leadsDir, file);
  const md = readFileSync(mdPath, 'utf8');
  const title = extractTitle(md, file);
  let body = marked.parse(md);
  body = addHeadingIds(body);
  body = fixInternalLinks(body);
  const html = wrapPage(title, body);
  const outPath = join(leadsDir, file.replace(/\.md$/, '.html'));
  writeFileSync(outPath, html, 'utf8');
  count += 1;
  console.log(`  ${file} → ${basename(outPath)}`);
}

console.log(`\n${count} arquivo(s) em leads/`);

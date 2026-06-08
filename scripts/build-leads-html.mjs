#!/usr/bin/env node
/**
 * Converte leads/*.md → leads/*.html
 * Gera leads-todos.md/html — lista consolidada de todos os leads
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const leadsDir = join(root, 'leads');
const CONSOLIDATED_MD = 'leads-todos.md';

marked.setOptions({
  gfm: true,
  breaks: false,
});

function readLead(name) {
  return readFileSync(join(leadsDir, name), 'utf8');
}

function stripFromHeading(md, headingPrefix) {
  const idx = md.search(new RegExp(`^## ${headingPrefix}`, 'm'));
  if (idx === -1) return md.trim();
  return md.slice(0, idx).trim();
}

function stripFrontMatter(md) {
  return md
    .replace(/^#\s+.+\n+/, '')
    .replace(/^(?:>[^\n]*\n)+/, '')
    .trim();
}

function demoteHeadings(md, by = 1) {
  return md.replace(/^(#{1,6})\s/gm, (_, hashes) => {
    const n = Math.min(6, hashes.length + by);
    return `${'#'.repeat(n)} `;
  });
}

function sliceBetween(md, startMarker, endMarker) {
  const start = md.indexOf(startMarker);
  if (start === -1) return '';
  const from = start;
  const end = endMarker ? md.indexOf(endMarker, from + startMarker.length) : -1;
  return (end === -1 ? md.slice(from) : md.slice(from, end)).trim();
}

function buildConsolidatedMarkdown() {
  const whatsapp = stripFromHeading(readLead('leads-whatsapp-poa.md'), 'Templates curtos');
  const whatsappBody = stripFrontMatter(whatsapp);

  const raio = readLead('leads-raio-150km-poa.md');
  const raioZones = sliceBetween(raio, '| Zona |', '---\n\n## Índice');
  const raioResumo = sliceBetween(raio, '## Resumo — novos leads', '---\n\n## Gramado');
  const raioPlanning = sliceBetween(raio, '## Ordem sugerida de prospecção', '## Manutenção');

  const raioExtras = `### Leads extras (catálogo 150 km — conferir no site)

| Empresa | Cidade | Observação | Fonte |
|---------|--------|------------|--------|
| Gramado Prime Imóveis | Gramado | WhatsApp no site | [gramadoprimeimoveis.com.br/contato](https://www.gramadoprimeimoveis.com.br/contato) |
| H Turismo Gramado | Gramado | WhatsApp no site | [hturismogramado.com.br](https://www.hturismogramado.com.br/) |
| Gramado Concept Turismo | Gramado | Formulário / WhatsApp | [gramadoconcept.com.br](https://www.gramadoconcept.com.br/) |
| Grande Hotel Torres | Torres | ghotelt@terra.com.br · fixo (51) 3626-1903 | [grandehoteltorres.com.br](https://www.grandehoteltorres.com.br/) |
| Lucas Imóveis | Santa Cruz do Sul | Só telefone (51) 3713-1766 | [lucasimoveis.com.br](https://www.lucasimoveis.com.br/) |`;

  const poa = demoteHeadings(stripFrontMatter(readLead('leads-porto-alegre.md')), 2);
  const expansao = demoteHeadings(
    stripFrontMatter(stripFromHeading(readLead('leads-expansao-poa-regiao.md'), 'Próximo passo')),
    2
  );

  return `# Leads — lista completa

> Gerado por \`npm run build:leads\`. Edite \`leads-whatsapp-poa.md\` (principal) e os anexos de e-mail; rode o build de novo.

**Trabalho do dia:** Prioridade **Alta** + Status **Pendente** → site/Instagram → gancho → script no [cheat-sheet](cheat-sheet-vendas.md) → enviar → marcar **Contatado**.

Scripts: [cheat-sheet-vendas.md](cheat-sheet-vendas.md) · FAQ do cliente: [faq-vendas.md](faq-vendas.md)

---

## Lista principal — WhatsApp (POA, RM e 150 km)

${whatsappBody}

---

## Planejamento — raio 150 km

### Zonas de deslocamento

${raioZones}

${raioResumo}

${raioExtras}

${demoteHeadings(raioPlanning, 1)}

### Cidades ainda sem leads mapeados

${sliceBetween(raio, '## Cidades no raio', '---\n\n## Boas práticas').replace('## Cidades no raio — ainda sem leads mapeados', '')}

### Boas práticas (150 km)

${sliceBetween(raio, '## Boas práticas (150 km)', '---\n\n## Manutenção').replace('## Boas práticas (150 km)', '').trim()}

---

## Anexo — referência só e-mail

Quando não houver WhatsApp ou o canal oficial for e-mail. Modelos: [template-email-por-nicho.md](template-email-por-nicho.md).

### Porto Alegre — núcleo inicial

${poa}

### Expansão POA e região

${expansao}
`;
}

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

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\u00C0-\u024F\u1E00-\u1EFF]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

function buildToc(html) {
  const items = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/gi)];
  if (items.length < 2) return '';
  const links = items
    .map(([, id, text]) => {
      const label = text.replace(/<[^>]*>/g, '').trim();
      return `      <li><a href="#${id}">${label}</a></li>`;
    })
    .join('\n');
  return `<nav class="doc-toc" aria-label="Índice da página">
    <p class="doc-toc__title">Nesta página</p>
    <ul class="doc-toc__list">
${links}
    </ul>
  </nav>
`;
}

function wrapPage(title, bodyHtml, { withToc = false } = {}) {
  const safeTitle = title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tocHtml = withToc ? buildToc(bodyHtml) : '';
  const proseClass = withToc ? 'wrap doc-prose doc-prose--with-toc' : 'wrap doc-prose';

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
      <a class="doc-bar__site" href="cheat-sheet-vendas.html">Cheat sheet</a>
    </div>
  </nav>
  <article class="${proseClass}">
${tocHtml}${bodyHtml}
  </article>
</body>
</html>
`;
}

// —— Lista consolidada ——
const consolidatedMd = buildConsolidatedMarkdown();
writeFileSync(join(leadsDir, CONSOLIDATED_MD), consolidatedMd, 'utf8');
console.log(`  (gerado) ${CONSOLIDATED_MD}`);

// —— Todos os .md → .html ——
const files = readdirSync(leadsDir).filter((f) => f.endsWith('.md'));
let count = 0;

for (const file of files) {
  const mdPath = join(leadsDir, file);
  const md = readFileSync(mdPath, 'utf8');
  const title = extractTitle(md, file);
  let body = marked.parse(md);
  body = addHeadingIds(body);
  body = fixInternalLinks(body);
  const isConsolidated = file === CONSOLIDATED_MD;
  const html = wrapPage(title, body, { withToc: isConsolidated });
  const outPath = join(leadsDir, file.replace(/\.md$/, '.html'));
  writeFileSync(outPath, html, 'utf8');
  count += 1;
  console.log(`  ${file} → ${basename(outPath)}`);
}

console.log(`\n${count} arquivo(s) em leads/`);

#!/usr/bin/env node
/**
 * Gera FAQ estático + JSON-LD no index.html a partir de assets/js/config.js.
 * Também atualiza lastmod do sitemap e cria og-social.jpg (1200×630).
 */
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadConfig() {
  const code = readFileSync(join(root, 'assets/js/config.js'), 'utf8');
  const fn = new Function(`${code}\nreturn TechDroneConfig;`);
  return fn();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildFaqHtml(items) {
  return items
    .map(
      (item) => `      <details class="faq-item" data-faq-item>
        <summary>${escapeHtml(item.pergunta || '')}</summary>
        <p class="faq-item__answer">${escapeHtml(item.resposta || '')}</p>
      </details>`
    )
    .join('\n');
}

function buildFaqSchema(items, siteUrl) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.pergunta,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.resposta,
        },
      })),
    },
    null,
    2
  );
}

function replaceBetweenMarkers(content, startMarker, endMarker, replacement, keepMarkers = true) {
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Marcadores não encontrados: ${startMarker}`);
  }
  const afterEnd = end + endMarker.length;
  if (!keepMarkers) {
    return content.slice(0, start) + replacement + content.slice(afterEnd);
  }
  return (
    content.slice(0, start + startMarker.length) +
    '\n' +
    replacement +
    '\n      ' +
    content.slice(end)
  );
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function updateSitemapLastmod() {
  const path = join(root, 'sitemap.xml');
  let xml = readFileSync(path, 'utf8');
  const date = todayIso();
  if (xml.includes('<lastmod>')) {
    xml = xml.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${date}</lastmod>`);
  } else {
    xml = xml.replace(
      '<loc>https://techdrone360.com.br/</loc>',
      `<loc>https://techdrone360.com.br/</loc>\n    <lastmod>${date}</lastmod>`
    );
  }
  writeFileSync(path, xml);
}

function buildOgSocial(config) {
  const src = join(root, config.heroPoster || 'assets/images/hero-poster.jpg');
  const dest = join(root, 'assets/images/og-social.jpg');
  if (!existsSync(src)) {
    console.warn('build-seo: hero-poster ausente, og-social.jpg não gerado');
    return;
  }
  try {
    execSync(
      `sips -z 630 1200 "${src}" --out "${dest}" 2>/dev/null || sips -Z 630 "${src}" --out "${dest}"`,
      { stdio: 'pipe', shell: true }
    );
    const info = execSync(`sips -g pixelWidth -g pixelHeight "${dest}"`, { encoding: 'utf8' });
    if (!/pixelWidth: 1200/.test(info) || !/pixelHeight: 630/.test(info)) {
      execSync(
        `sips "${dest}" --cropToHeightWidth 630 1200 --out "${dest}"`,
        { stdio: 'pipe' }
      );
    }
    console.log('build-seo: og-social.jpg (1200×630)');
  } catch (e) {
    console.warn('build-seo: não foi possível gerar og-social.jpg (instale sips no macOS)');
  }
}

const config = loadConfig();
const items = config.faq || [];
const indexPath = join(root, 'index.html');
let html = readFileSync(indexPath, 'utf8');

const faqHtml = buildFaqHtml(items);
const faqSchema = buildFaqSchema(items, config.siteUrl);

if (html.includes('<!-- build:faq-html -->')) {
  html = replaceBetweenMarkers(html, '<!-- build:faq-html -->', '<!-- /build:faq-html -->', faqHtml);
} else {
  html = html.replace(
    /(<div id="faq-list"[^>]*>)([\s\S]*?)(\s*<\/div>\s*\n\s*<div class="mt-10 text-center reveal">)/,
    `$1\n          <!-- build:faq-html -->\n${faqHtml}\n          <!-- /build:faq-html -->$3`
  );
}

if (html.includes('<!-- build:faq-schema -->')) {
  html = replaceBetweenMarkers(
    html,
    '<!-- build:faq-schema -->',
    '<!-- /build:faq-schema -->',
    faqSchema,
    false
  );
} else {
  html = html.replace(
    /(<script type="application\/ld\+json" id="schema-faq"[^>]*>)([\s\S]*?)(<\/script>)/,
    `$1\n${faqSchema}\n  $3`
  );
}

writeFileSync(indexPath, html);
updateSitemapLastmod();
buildOgSocial(config);

console.log(`build-seo: ${items.length} perguntas FAQ em index.html + sitemap lastmod ${todayIso()}`);

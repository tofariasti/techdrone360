#!/usr/bin/env node
/**
 * Build-time i18n: generates PT (root), /en/index.html and /es/index.html
 * with locale meta, nav, hero copy, hreflang and language switcher.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://techdrone360.com.br';
const LOCALE_IDS = ['pt', 'en', 'es'];

function loadLocale(id) {
  return JSON.parse(readFileSync(join(root, 'locales', `${id}.json`), 'utf8'));
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceMeta(html, locale) {
  const { meta, lang, pathPrefix } = locale;
  const canonical = `${SITE}${pathPrefix || '/'}`;
  const canonicalUrl = canonical.endsWith('/') ? canonical : `${canonical}/`;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${meta.description}" />`,
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${meta.ogTitle}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${meta.ogDescription}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );
  html = html.replace(
    /<meta property="og:locale" content="[^"]*" \/>/,
    `<meta property="og:locale" content="${lang === 'pt-BR' ? 'pt_BR' : lang === 'es' ? 'es_ES' : 'en_US'}" />`,
  );
  html = html.replace(
    /<meta property="og:image:alt" content="[^"]*" \/>/,
    `<meta property="og:image:alt" content="${meta.ogImageAlt}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${meta.twitterTitle}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${meta.twitterDescription}" />`,
  );
  html = html.replace(
    /alt="Captação aérea profissional com drone DJI — TechDrone360 em Porto Alegre"/g,
    `alt="${meta.heroImageAlt}"`,
  );

  return html;
}

function injectHreflang(html, locales) {
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" data-i18n="true"\/?>\n?/g, '');
  const links = locales.flatMap((loc) => {
    const url = `${SITE}${loc.pathPrefix || '/'}`;
    const href = url.endsWith('/') ? url : `${url}/`;
    return [`    <link rel="alternate" hreflang="${loc.hreflang}" href="${href}" data-i18n="true" />`];
  });
  links.push(`    <link rel="alternate" hreflang="x-default" href="${SITE}/" data-i18n="true" />`);
  return html.replace('</head>', `${links.join('\n')}\n</head>`);
}

function buildLangSwitcher(activeId, locales) {
  const active = locales.find((l) => l.id === activeId);
  const links = locales
    .map((loc) => {
      const href = `${loc.pathPrefix || '/'}`;
      const normalized = href === '/' ? '/' : `${href}/`;
      const cls = loc.id === activeId ? ' lang-switch__link--active' : '';
      return `<a href="${normalized}" hreflang="${loc.hreflang}" class="lang-switch__link${cls}"${loc.id === activeId ? ' aria-current="page"' : ''}>${loc.id.toUpperCase()}</a>`;
    })
    .join('\n            ');
  return `<div class="lang-switch" role="group" aria-label="${active.nav.langGroup}">
            ${links}
          </div>`;
}

function injectLangSwitcher(html, activeId, locales) {
  const switcher = buildLangSwitcher(activeId, locales);
  if (html.includes('<!-- build:lang-switch -->')) {
    return html.replace(/<!-- build:lang-switch -->[\s\S]*?<!-- \/build:lang-switch -->/, `<!-- build:lang-switch -->\n          ${switcher}\n          <!-- /build:lang-switch -->`);
  }
  return html.replace(
    '<div class="site-nav__social" aria-label="Redes sociais">',
    `${switcher}\n          <div class="site-nav__social" aria-label="Redes sociais">`,
  );
}

function applyNavAndHero(html, pt, locale) {
  const pairs = [
    ['aria-label="Menu principal"', `aria-label="${locale.nav.ariaMain}"`],
    ['aria-label="TechDrone360 — Início"', `aria-label="${locale.nav.ariaHome}"`],
    ['aria-label="Abrir menu"', `aria-label="${locale.nav.abrirMenu}"`],
    ['>Início<', `>${locale.nav.inicio}<`],
    ['>Serviços<', `>${locale.nav.servicos}<`],
    ['>Portfólio<', `>${locale.nav.portfolio}<`],
    ['>Vídeos<', `>${locale.nav.videos}<`],
    ['>Equipamento<', `>${locale.nav.equipamento}<`],
    ['>Onde voar<', `>${locale.nav.ondeVoar}<`],
    ['>Sobre<', `>${locale.nav.sobre}<`],
    ['>Clientes<', `>${locale.nav.clientes}<`],
    ['>FAQ<', `>${locale.nav.faq}<`],
    ['>Orçamento<', `>${locale.nav.orcamento}<`],
    ['>Solicitar orçamento<', `>${locale.nav.solicitarOrcamento}<`],
    ['>Redes sociais<', `>${locale.nav.redesSociais}<`],
    ['>Como funciona<', `>${locale.nav.comoFunciona}<`],
    ['<span>Drone profissional</span>', `<span>${locale.hero.eyebrow}</span>`],
    ['Veja o resultado antes de decidir.', locale.hero.tagline],
  ];

  let out = html;
  for (const [from, to] of pairs) {
    out = out.split(from).join(to);
  }

  out = out.replace(
    /<span class="hero-title__line hero-title__line--main">[\s\S]*?<\/span>/,
    `<span class="hero-title__line hero-title__line--main">\n            ${locale.hero.titleMain}\n          </span>`,
  );
  out = out.replace(
    /<span class="hero-title__line hero-title__line--accent">[\s\S]*?<\/span>/,
    `<span class="hero-title__line hero-title__line--accent">${locale.hero.titleAccent}</span>`,
  );
  out = out.replace(
    /<p class="hero-lead animate-in delay-2">[\s\S]*?<\/p>/,
    `<p class="hero-lead animate-in delay-2">\n          ${locale.hero.lead}\n        </p>`,
  );

  return out;
}

function absolutizeAssetPaths(html) {
  return html
    .replace(/href="assets\//g, 'href="/assets/')
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/poster="assets\//g, 'poster="/assets/');
}

function buildSitemap(locales, date) {
  const urls = locales.map((loc) => {
    const locUrl = `${SITE}${loc.pathPrefix || '/'}`;
    const href = locUrl.endsWith('/') ? locUrl : `${locUrl}/`;
    const alternates = locales
      .map((alt) => {
        const altUrl = `${SITE}${alt.pathPrefix || '/'}`;
        const altHref = altUrl.endsWith('/') ? altUrl : `${altUrl}/`;
        return `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${altHref}"/>`;
      })
      .join('\n');
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>`;
    return `  <url>
    <loc>${href}</loc>
${alternates}
${xDefault}
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${loc.id === 'pt' ? '1.0' : '0.9'}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

const ptStrings = loadLocale('pt');
const locales = LOCALE_IDS.map((id) => ({ id, ...loadLocale(id) }));
const sourcePath = join(root, 'index.html');
let baseHtml = readFileSync(sourcePath, 'utf8');

for (const locale of locales) {
  let html = baseHtml;
  html = applyNavAndHero(html, ptStrings, locale);
  html = replaceMeta(html, locale);
  html = injectHreflang(html, locales);
  html = injectLangSwitcher(html, locale.id, locales);
  html = html.replace(/\s*<meta property="og:locale:alternate" content="[^"]*" \/>/g, '');
  for (const alt of locales.filter((l) => l.id !== locale.id)) {
    const ogAlt = alt.lang === 'pt-BR' ? 'pt_BR' : alt.lang === 'es' ? 'es_ES' : 'en_US';
    html = html.replace(
      '</head>',
      `    <meta property="og:locale:alternate" content="${ogAlt}" />\n</head>`,
    );
  }
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${locale.lang}" data-i18n-built="true">`);

  if (locale.pathPrefix) {
    html = absolutizeAssetPaths(html);
    const outDir = join(root, locale.pathPrefix.slice(1));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`build-i18n: wrote ${locale.pathPrefix}/index.html`);
  } else {
    writeFileSync(sourcePath, html);
    console.log('build-i18n: updated index.html (PT)');
  }
}

const date = new Date().toISOString().slice(0, 10);
writeFileSync(join(root, 'sitemap.xml'), buildSitemap(locales, date));
console.log(`build-i18n: sitemap.xml (${locales.length} locales, lastmod ${date})`);

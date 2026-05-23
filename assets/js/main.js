(function () {
  'use strict';

  const config = window.TechDroneConfig || {};
  let fotosPortfolio = [];
  let videosPortfolio = [];

  function getWhatsAppUrl(source) {
    const numero = config.whatsappNumero || '';
    let msg = config.whatsappMensagem || '';
    if (source && config.whatsappRastrearOrigem !== false) {
      msg += `\n\n(Origem: ${source})`;
    }
    return `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
  }

  function absoluteUrl(path) {
    const base = (config.siteUrl || '').replace(/\/$/, '');
    if (!path) return base;
    if (/^https?:\/\//i.test(path)) return path;
    return `${base}/${path.replace(/^\//, '')}`;
  }

  function applyConfig() {
    const cidade = config.cidadeRegiao || '';
    const modelo = config.modeloDji || '';
    const instagram = config.instagram || '';
    const instagramUrl = config.instagramUrl || '#';
    const youtube = config.youtube || '';
    const youtubeUrl = config.youtubeUrl || '#';

    const cidadeHero = config.cidadeHero || cidade.replace(/ e toda a região metropolitana$/i, ' e região');

    document.querySelectorAll('[data-cidade]').forEach((el) => {
      el.textContent = cidade;
    });

    document.querySelectorAll('[data-cidade-hero]').forEach((el) => {
      el.textContent = cidadeHero;
    });

    document.querySelectorAll('[data-modelo-dji]').forEach((el) => {
      el.textContent = modelo;
    });

    document.querySelectorAll('[data-instagram]').forEach((el) => {
      if (el.hasAttribute('data-instagram-label')) {
        el.textContent = instagram;
      }
      if (el.tagName === 'A') el.href = instagramUrl;
    });

    document.querySelectorAll('[data-youtube]').forEach((el) => {
      if (el.hasAttribute('data-youtube-label')) {
        el.textContent = youtube;
      }
      if (el.tagName === 'A') el.href = youtubeUrl;
    });

    applyNotaFiscal();
    applySeoMeta(cidade);
    applyEmailLink();
    renderSobre();
    renderDestaqueStreetView();
    renderRestricoesVoo();
    renderComoFunciona();
    renderEquipamento();
    renderFaq();
    applyFaqSchema();

    document.querySelectorAll('[data-whatsapp]').forEach((el) => {
      const source = el.getAttribute('data-whatsapp-source') || 'site';
      el.href = getWhatsAppUrl(source);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });

    const titleEl = document.querySelector('title');
    if (titleEl && cidade) {
      titleEl.textContent = `TechDrone360 | Fotos e vídeos aéreos com drone em ${cidade}`;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && cidade) {
      metaDesc.setAttribute(
        'content',
        `Captação aérea profissional com drone DJI para imóveis, obras, eventos e empresas em ${cidade}. Solicite orçamento pelo WhatsApp.`
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `TechDrone360 | Fotos e vídeos aéreos em ${cidade}`);
    }

    const schemaEl = document.getElementById('schema-local-business');
    if (schemaEl && config.siteUrl) {
      try {
        const schema = JSON.parse(schemaEl.textContent);
        schema.areaServed = cidade;
        schema.description = metaDesc?.getAttribute('content') || schema.description;
        if (config.whatsappNumero) {
          schema.telephone = `+${config.whatsappNumero}`;
        }
        const sameAs = [];
        if (config.instagramUrl) sameAs.push(config.instagramUrl);
        if (config.youtubeUrl) sameAs.push(config.youtubeUrl);
        if (sameAs.length) schema.sameAs = sameAs;
        const ogImg = config.ogImage || config.heroPoster;
        if (ogImg) schema.image = absoluteUrl(ogImg);
        schemaEl.textContent = JSON.stringify(schema);
      } catch (_) {
        /* ignore */
      }
    }

    applyHeroMedia();
    renderPortfolioPhotos();
    renderDronePhotos();
    renderInstagramEmbeds();
    renderYoutubeVideos();
  }

  function applySeoMeta(cidade) {
    const site = (config.siteUrl || '').replace(/\/$/, '');
    const ogImage = absoluteUrl(config.ogImage || config.heroPoster || 'assets/images/hero-poster.jpg');

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && site) canonical.href = `${site}/`;

    document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((el) => {
      el.setAttribute('content', ogImage);
    });

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && cidade) {
      ogDesc.setAttribute(
        'content',
        `Captação aérea profissional com drone DJI para imóveis, obras, eventos e empresas em ${cidade}.`
      );
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && cidade) {
      twitterTitle.setAttribute('content', `TechDrone360 | Drone em ${cidade}`);
    }
  }

  function applyEmailLink() {
    const email = config.email || '';
    document.querySelectorAll('[data-email-wrap]').forEach((el) => {
      el.classList.toggle('hidden', !email);
    });
    document.querySelectorAll('[data-email]').forEach((el) => {
      if (!email) return;
      if (el.tagName === 'A') {
        el.href = `mailto:${email}`;
      } else {
        el.textContent = email;
      }
    });
  }

  function renderSobre() {
    const container = document.getElementById('sobre-content');
    const sobre = config.sobre;
    if (!container || !sobre) return;

    const foto = sobre.foto
      ? `<img src="${escapeHtml(sobre.foto)}" alt="${escapeHtml(sobre.nome || 'TechDrone360')}" class="sobre-photo" loading="lazy" width="320" height="400" />`
      : `<div class="sobre-photo-placeholder" aria-hidden="true"><img src="assets/images/logo-icon.svg" alt="" class="h-24 w-24 opacity-80" width="96" height="96" /></div>`;

    const destaques = (sobre.destaques || [])
      .map((d) => `<li>${escapeHtml(d)}</li>`)
      .join('');

    const portfolio = sobre.portfolio;
    const portfolioHtml =
      portfolio?.url
        ? `
        <div class="sobre-portfolio reveal">
          <p class="sobre-portfolio__text">${escapeHtml(portfolio.texto || '')}</p>
          <a href="${escapeHtml(portfolio.url)}" class="sobre-portfolio__link" target="_blank" rel="noopener noreferrer">
            <span class="sobre-portfolio__label">${escapeHtml(portfolio.linkTexto || portfolio.url)}</span>
            <span class="sobre-portfolio__arrow" aria-hidden="true">→</span>
          </a>
        </div>`
        : '';

    container.innerHTML = `
      <div class="text-center lg:text-left">
        <p class="section-eyebrow">${escapeHtml(sobre.titulo || 'Sobre')}</p>
        <h2 class="section-title mt-2">${escapeHtml(sobre.nome || 'TechDrone360')}</h2>
        <p class="mt-2 text-lg font-medium text-brand-600">${escapeHtml(sobre.subtitulo || '')}</p>
        <p class="section-subtitle mt-4">${escapeHtml(sobre.texto || '')}</p>
        ${destaques ? `<ul class="sobre-destaques">${destaques}</ul>` : ''}
        ${portfolioHtml}
        <a href="#orcamento" data-whatsapp data-whatsapp-source="sobre" class="btn-primary mt-8">Conversar sobre meu projeto</a>
      </div>
      <div class="mt-10 lg:mt-0 flex justify-center">${foto}</div>
    `;
  }

  function renderDestaqueStreetView() {
    const container = document.getElementById('destaque-drone-content');
    const data = config.destaqueStreetView;
    const section = document.getElementById('destaque-drone');
    if (!container || !data) return;

    const renderCol = (col, mod) => {
      if (!col?.itens?.length) return '';
      return `
        <div class="destaque-drone__col destaque-drone__col--${mod}">
          <h3 class="destaque-drone__col-title">${escapeHtml(col.titulo || '')}</h3>
          <ul class="destaque-drone__list">
            ${col.itens.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>`;
    };

    const segmentos = data.segmentos || [];
    const segmentosHtml =
      segmentos.length
        ? `
        <div class="destaque-drone__segmentos">
          ${data.segmentosTitulo ? `<h3 class="destaque-drone__segmentos-title">${escapeHtml(data.segmentosTitulo)}</h3>` : ''}
          ${data.segmentosIntro ? `<p class="destaque-drone__segmentos-intro">${escapeHtml(data.segmentosIntro)}</p>` : ''}
          <div class="destaque-drone__segmentos-grid">
            ${segmentos
              .map(
                (seg) => `
              <article class="destaque-drone__segmento">
                <h4 class="destaque-drone__segmento-title">${escapeHtml(seg.titulo || '')}</h4>
                <p class="destaque-drone__segmento-text">${escapeHtml(seg.texto || '')}</p>
              </article>`
              )
              .join('')}
          </div>
        </div>`
        : '';

    const ctaSource = data.ctaSource || 'destaque_street_view';
    container.innerHTML = `
      <div class="destaque-drone__inner reveal">
        <p class="destaque-drone__eyebrow">${escapeHtml(data.eyebrow || 'Dúvida frequente')}</p>
        <h2 id="destaque-drone-title" class="destaque-drone__title">${escapeHtml(data.titulo || '')}</h2>
        <p class="destaque-drone__intro">${escapeHtml(data.intro || '')}</p>
        ${segmentosHtml}
        <div class="destaque-drone__compare">
          ${renderCol(data.streetView, 'map')}
          ${renderCol(data.drone, 'drone')}
        </div>
        <p class="destaque-drone__conclusao">${escapeHtml(data.conclusao || '')}</p>
        <div class="destaque-drone__cta">
          <a href="#orcamento" data-whatsapp data-whatsapp-source="${escapeHtml(ctaSource)}" class="btn-primary btn-glow">${escapeHtml(data.ctaTexto || 'Solicitar orçamento')}</a>
        </div>
      </div>
    `;

    if (section) section.classList.remove('hidden');
  }

  function renderFaq() {
    const list = document.getElementById('faq-list');
    const items = config.faq || [];
    if (!list) return;

    if (!items.length) {
      document.getElementById('faq')?.classList.add('hidden');
      return;
    }

    list.innerHTML = items
      .map(
        (item, i) => `
      <details class="faq-item" data-faq-item>
        <summary>${escapeHtml(item.pergunta || '')}</summary>
        <p class="faq-item__answer">${escapeHtml(item.resposta || '')}</p>
      </details>`
      )
      .join('');
  }

  function getComoPassoIcon(tipo) {
    const icons = {
      contato:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>',
      alinhamento:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>',
      decea:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
      captura:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>',
      edicao:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>',
      entrega:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>',
    };
    const path = icons[tipo] || icons.alinhamento;
    return `<svg class="como-passo__icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  }

  function renderComoFunciona() {
    const container = document.getElementById('como-funciona-content');
    const data = config.comoFunciona;
    if (!container || !data) return;

    const passos = data.passos || [];
    if (!passos.length) return;

    const steps = passos
      .map((passo, index) => {
        const n = index + 1;
        const link = passo.link
          ? `<a href="${escapeHtml(passo.link.url)}" target="_blank" rel="noopener noreferrer" class="como-passo__link">${escapeHtml(passo.link.label)}</a>`
          : '';
        const destaque = passo.destaque ? ' como-passo--destaque' : '';
        const isLast = index === passos.length - 1;

        return `
      <li class="como-passo reveal${destaque}${isLast ? ' como-passo--last' : ''}">
        <div class="como-passo__rail" aria-hidden="true">
          <span class="como-passo__node">
            <span class="como-passo__num">${n}</span>
            <span class="como-passo__icon">${getComoPassoIcon(passo.tipo)}</span>
          </span>
        </div>
        <div class="como-passo__card">
          <h3 class="como-passo__title">${escapeHtml(passo.titulo || '')}</h3>
          <p class="como-passo__text">${escapeHtml(passo.texto || '')}</p>
          ${link}
        </div>
      </li>`;
      })
      .join('');

    container.innerHTML = `
      <div class="section-header reveal">
        <p class="section-eyebrow">Do pedido à entrega</p>
        <h2 class="section-title mt-2">${escapeHtml(data.titulo || 'Como funciona')}</h2>
        <p class="section-hook mx-auto">${escapeHtml(data.subtitulo || '')}</p>
      </div>
      <div class="como-process reveal">
        <ol class="como-passos">${steps}</ol>
      </div>
    `;
  }

  function getRestricaoIcon(tipo) {
    const icons = {
      aeroporto:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>',
      militar:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
      pessoas:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>',
      noite:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>',
      altura:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>',
      urbano:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>',
      privacidade:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>',
      natureza:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
      autorizacao:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
    };
    const path = icons[tipo] || icons.autorizacao;
    return `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  }

  function renderRestricoesVoo() {
    const container = document.getElementById('restricoes-voo-content');
    const data = config.restricoesVoo;
    if (!container || !data) return;

    const itens = data.itens || [];
    if (!itens.length) {
      document.getElementById('restricoes-voo')?.classList.add('hidden');
      return;
    }

    const cards = itens
      .map(
        (item) => `
      <article class="restricao-card reveal">
        <span class="restricao-card__icon" aria-hidden="true">
          ${getRestricaoIcon(item.tipo)}
        </span>
        <h3 class="restricao-card__title">${escapeHtml(item.titulo || '')}</h3>
        <p class="restricao-card__text">${escapeHtml(item.texto || '')}</p>
      </article>`
      )
      .join('');

    const links = (data.links || [])
      .map(
        (link) =>
          `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="restricao-links__item">${escapeHtml(link.label)} →</a>`
      )
      .join('');

    const destaque = data.destaqueCorresponsabilidade;
    const destaqueHtml =
      destaque?.texto
        ? `
      <aside class="restricao-destaque reveal" role="note">
        <span class="restricao-destaque__icon" aria-hidden="true">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </span>
        <div>
          ${destaque.titulo ? `<p class="restricao-destaque__title">${escapeHtml(destaque.titulo)}</p>` : ''}
          <p class="restricao-destaque__text">${escapeHtml(destaque.texto)}</p>
        </div>
      </aside>`
        : '';

    const avisoLeg = data.avisoLegislacao;
    const avisoLegHtml =
      avisoLeg?.texto
        ? `
      <aside class="restricao-legislacao reveal" role="note">
        <span class="restricao-legislacao__icon" aria-hidden="true">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </span>
        <div>
          ${avisoLeg.titulo ? `<p class="restricao-legislacao__title">${escapeHtml(avisoLeg.titulo)}</p>` : ''}
          <p class="restricao-legislacao__text">${escapeHtml(avisoLeg.texto)}</p>
        </div>
      </aside>`
        : '';

    const checklist = data.checklistCliente;
    const checklistHtml =
      checklist?.itens?.length
        ? `
      <div class="restricao-checklist reveal">
        <h3 class="restricao-checklist__title">${escapeHtml(checklist.titulo || '')}</h3>
        <ul class="restricao-checklist__list">
          ${checklist.itens
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join('')}
        </ul>
      </div>`
        : '';

    const consequencias = data.consequencias;
    const consequenciasHtml =
      consequencias?.itens?.length
        ? `
      <div class="restricao-consequencias reveal">
        <h3 class="restricao-consequencias__title">${escapeHtml(consequencias.titulo || '')}</h3>
        <div class="restricao-consequencias__grid">
          ${consequencias.itens
            .map(
              (item) => `
            <article class="restricao-consequencias__item">
              <h4 class="restricao-consequencias__item-title">${escapeHtml(item.titulo || '')}</h4>
              <p class="restricao-consequencias__item-text">${escapeHtml(item.texto || '')}</p>
            </article>`
            )
            .join('')}
        </div>
      </div>`
        : '';

    container.innerHTML = `
      <div class="section-header reveal">
        <p class="section-eyebrow">${escapeHtml(data.eyebrow || 'Legislação')}</p>
        <h2 class="section-title mt-2">${escapeHtml(data.titulo || '')}</h2>
        <p class="section-hook mx-auto">${escapeHtml(data.intro || '')}</p>
      </div>
      ${avisoLegHtml}
      ${destaqueHtml}
      <div class="restricao-aviso reveal">
        <span class="restricao-aviso__icon" aria-hidden="true">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </span>
        <p>${escapeHtml(data.aviso || '')}</p>
      </div>
      ${checklistHtml}
      <div class="restricao-grid mt-10">${cards}</div>
      ${consequenciasHtml}
      ${
        data.notaLegal
          ? `<p class="restricao-nota reveal">${escapeHtml(data.notaLegal)}</p>`
          : ''
      }
      ${links ? `<div class="restricao-links reveal">${links}</div>` : ''}
      <div class="mt-10 text-center reveal">
        <p class="text-gray-600 mb-4">Envie o endereço da captação e eu verifico se o local permite voo.</p>
        <a href="#orcamento" data-whatsapp data-whatsapp-source="restricoes_voo" class="btn-primary btn-glow">Consultar meu endereço</a>
      </div>
    `;
  }

  function applyFaqSchema() {
    const schemaEl = document.getElementById('schema-faq');
    const items = config.faq || [];
    if (!schemaEl || !items.length) return;

    schemaEl.textContent = JSON.stringify({
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
    });
  }

  function initAnalytics() {
    const id = config.googleAnalyticsId || '';
    if (!id || window.__tdGaLoaded) return;
    window.__tdGaLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id);

    document.addEventListener(
      'click',
      (e) => {
        const link = e.target.closest('[data-whatsapp]');
        if (!link || typeof gtag !== 'function') return;
        const source = link.getAttribute('data-whatsapp-source') || 'site';
        gtag('event', 'click_whatsapp', {
          event_category: 'lead',
          event_label: source,
        });
      },
      true
    );
  }

  function applyNotaFiscal() {
    const ativo = config.emiteNotaFiscal !== false;
    const titulo = config.notaFiscalTitulo || 'Emissão de nota fiscal';
    const detalhe =
      config.notaFiscalDetalhe ||
      'Atendimento formal para empresas, imobiliárias e clientes que precisam de documentação fiscal.';

    document.querySelectorAll('[data-nota-fiscal-wrap]').forEach((el) => {
      el.classList.toggle('hidden', !ativo);
    });

    if (!ativo) return;

    document.querySelectorAll('[data-nota-fiscal]').forEach((el) => {
      el.textContent = titulo;
    });
    document.querySelectorAll('[data-nota-fiscal-detalhe]').forEach((el) => {
      el.textContent = detalhe;
    });

    const curto = config.notaFiscalCurto || 'Emissão de NF';
    document.querySelectorAll('[data-nota-fiscal-curto]').forEach((el) => {
      el.textContent = curto;
    });
  }

  function applyHeroMedia() {
    const video = document.getElementById('hero-video');
    const fallback = document.getElementById('hero-fallback');
    const fallbackImg = fallback?.querySelector('img');
    const src = config.heroVideo || 'assets/video/hero.mp4';
    const poster = config.heroPoster || 'assets/images/hero-poster.jpg';

    if (video) {
      const source = video.querySelector('source');
      if (source) source.src = src;
      if (poster) video.poster = poster;
      video.load();
    }

    if (fallbackImg && poster) {
      fallbackImg.src = poster;
    }
  }

  async function loadFotosPortfolio() {
    fotosPortfolio = Array.isArray(config.fotosPortfolio) ? [...config.fotosPortfolio] : [];

    if (fotosPortfolio.length || !config.fotosPortfolioJson) return;

    try {
      const res = await fetch(config.fotosPortfolioJson);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) fotosPortfolio = data;
      }
    } catch (_) {
      /* fetch falha em file:// — use servidor local */
    }
  }

  async function loadVideosPortfolio() {
    videosPortfolio = Array.isArray(config.videosPortfolio) ? [...config.videosPortfolio] : [];

    if (videosPortfolio.length || !config.youtubeVideosJson) return;

    try {
      const res = await fetch(config.youtubeVideosJson);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) videosPortfolio = data;
      }
    } catch (_) {
      /* fetch falha em file:// — use servidor local */
    }
  }

  function renderPortfolioPhotos() {
    const gallery = document.getElementById('portfolio-gallery');
    if (!gallery) return;

    gallery.querySelectorAll('[data-portfolio-photo], [data-portfolio-empty]').forEach((el) => el.remove());

    const fotos = fotosPortfolio;
    const instagramUrl = config.instagramUrl || 'https://www.instagram.com/techdrone360';

    if (fotos.length === 0) {
      gallery.insertAdjacentHTML(
        'afterbegin',
        `<div data-portfolio-empty class="col-span-full rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
          <p class="text-gray-700 font-medium">Fotos do Instagram</p>
          <p class="mt-2 text-sm text-gray-600">Importe as fotos do perfil <a href="${escapeHtml(instagramUrl)}" target="_blank" rel="noopener noreferrer" class="font-semibold text-brand-600 hover:text-brand-500">@${escapeHtml((config.instagram || '@techdrone360').replace('@', ''))}</a> executando no terminal:</p>
          <code class="mt-4 block rounded-lg bg-gray-100 px-4 py-3 text-left text-xs text-gray-800">Salve fotos em assets/images/instagram/<br>python3 scripts/sync-instagram.py --from-folder</code>
          <p class="mt-2 text-xs text-gray-500">Sync automático: python3 -m instaloader --login techdrone360</p>
          <p class="mt-3 text-xs text-gray-500">Requer servidor local: <code class="bg-gray-100 px-1 rounded">python3 -m http.server 8888</code></p>
        </div>`
      );
      return;
    }

    const markup = fotos
      .map((f) => {
        const src = f.imagem || f.src;
        const full = f.imagemFull || f.full || src;
        const alt = escapeHtml(f.alt || f.titulo || 'Foto aérea TechDrone360');
        const ig = f.instagramUrl || '';
        if (!src) return '';

        const igLink = ig
          ? `<a href="${escapeHtml(ig)}" target="_blank" rel="noopener noreferrer" class="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-brand-500" aria-label="Ver no Instagram">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>`
          : '';

        const cat = f.categoria || 'imoveis';
        return `
      <a href="${escapeHtml(full)}" data-lightbox data-portfolio-photo data-portfolio-item data-category="${escapeHtml(cat)}" class="group relative block overflow-hidden rounded-xl aspect-[4/3]">
        <img src="${escapeHtml(src)}" alt="${alt}" class="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" width="600" height="450" />
        ${igLink}
      </a>`;
      })
      .join('');

    gallery.insertAdjacentHTML('afterbegin', markup);
  }

  function renderEquipamento() {
    const introEl = document.getElementById('equipamento-intro');
    const specsEl = document.getElementById('equipamento-specs');
    const data = config.equipamento;
    if (!data || (!introEl && !specsEl)) return;

    const modelo = config.modeloDji || 'DJI Mini 4 Pro';
    if (introEl) {
      const intro = (data.intro || '').replace(/\{\{modelo\}\}/g, modelo);
      introEl.innerHTML = intro
        ? escapeHtml(intro).replace(
            escapeHtml(modelo),
            `<span data-modelo-dji>${escapeHtml(modelo)}</span>`
          )
        : '';
    }

    const specs = data.caracteristicas || [];
    if (specsEl && specs.length) {
      specsEl.innerHTML = `
        <div class="equipamento-specs__grid">
          ${specs
            .map(
              (item) => `
            <article class="equipamento-spec reveal">
              <h3 class="equipamento-spec__title">${escapeHtml(item.titulo || '')}</h3>
              ${item.spec ? `<p class="equipamento-spec__tech">${escapeHtml(item.spec)}</p>` : ''}
              <p class="equipamento-spec__benefit">${escapeHtml(item.beneficio || '')}</p>
            </article>`
            )
            .join('')}
        </div>
        ${data.nota ? `<p class="equipamento-specs__nota">${escapeHtml(data.nota)}</p>` : ''}`;
    }

  }

  function renderDronePhotos() {
    const gallery = document.getElementById('drone-gallery');
    if (!gallery) return;

    const fotos = Array.isArray(config.fotosDrone) ? config.fotosDrone : [];
    gallery.innerHTML = '';

    if (!fotos.length) {
      gallery.innerHTML = `
        <p class="col-span-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-600">
          Adicione fotos do drone em <code class="rounded bg-gray-100 px-1">assets/images/drone/</code> e configure <code class="rounded bg-gray-100 px-1">fotosDrone</code> em config.js
        </p>`;
      return;
    }

    const markup = fotos
      .map((f) => {
        const src = f.imagem || f.src;
        const full = f.imagemFull || f.full || src;
        const alt = escapeHtml(f.alt || f.titulo || 'DJI Mini 4 Pro');
        if (!src) return '';

        return `
      <a href="${escapeHtml(full)}" data-lightbox data-drone-photo class="group relative block overflow-hidden rounded-xl aspect-square">
        <img src="${escapeHtml(src)}" alt="${alt}" class="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" width="400" height="400" />
      </a>`;
      })
      .join('');

    gallery.innerHTML = markup;
  }

  function renderInstagramEmbeds() {
    const container = document.getElementById('portfolio-instagram-embeds');
    if (!container) return;

    const posts = config.instagramPosts || [];
    if (!posts.length) {
      container.classList.add('hidden');
      return;
    }

    container.classList.remove('hidden');
    container.innerHTML = posts
      .map((post) => {
        const url = post.permalink || (post.shortcode ? `https://www.instagram.com/p/${post.shortcode}/` : '');
        if (!url) return '';
        return `
      <blockquote
        class="instagram-media instagram-embed-card"
        data-instgrm-permalink="${escapeHtml(url)}?utm_source=ig_embed&amp;utm_campaign=loading"
        data-instgrm-version="14"
        style="min-width:280px;width:100%;"
      ></blockquote>`;
      })
      .join('');

    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function canEmbedYoutube() {
    return window.location.protocol !== 'file:';
  }

  function getEmbedOrigin() {
    if (!canEmbedYoutube()) return null;
    const origin = window.location.origin;
    if (origin && origin !== 'null') return origin;
    const site = config.siteUrl || '';
    try {
      return site ? new URL(site).origin : null;
    } catch (_) {
      return null;
    }
  }

  function getVideoEmbedUrl(video, autoplay) {
    if (video.url) return video.url;
    if (!video.videoId) return '';

    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
    });
    if (autoplay) params.set('autoplay', '1');

    const origin = getEmbedOrigin();
    if (origin) params.set('origin', origin);

    return `https://www.youtube.com/embed/${video.videoId}?${params.toString()}`;
  }

  const IFRAME_ALLOW =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  const IFRAME_REFERRER = 'strict-origin-when-cross-origin';

  function getVideoWatchUrl(video) {
    if (video.videoId) return `https://www.youtube.com/watch?v=${video.videoId}`;
    return video.url || '#';
  }

  function getVideoThumb(video) {
    if (video.videoId) {
      return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
    }
    return '';
  }

  function getCategoryLabel(cat) {
    const labels = {
      imoveis: 'Imóveis',
      obras: 'Obras',
      eventos: 'Eventos',
      empresas: 'Empresas',
      natureza: 'Natureza',
    };
    return labels[cat] || 'Vídeo';
  }

  function renderPortfolioGalleryVideos() {
    const gallery = document.getElementById('portfolio-gallery');
    if (!gallery) return;

    gallery.querySelectorAll('[data-portfolio-video]').forEach((el) => el.remove());

    const videos = config.videosPortfolio || [];
    const markup = videos
      .map((v) => {
        const thumb = getVideoThumb(v);
        const watch = getVideoWatchUrl(v);
        const titulo = escapeHtml(v.titulo || 'Vídeo TechDrone360');
        const cat = v.categoria || 'imoveis';
        const label = getCategoryLabel(cat);
        if (!v.videoId || !thumb) return '';

        return `
      <button
        type="button"
        data-portfolio-video
        data-portfolio-item
        data-video-lightbox
        data-video-id="${escapeHtml(v.videoId)}"
        data-video-watch="${escapeHtml(watch)}"
        data-category="${escapeHtml(cat)}"
        class="group relative block w-full overflow-hidden rounded-xl aspect-[4/3] text-left"
        aria-label="Assistir: ${titulo}"
      >
        <img src="${thumb}" alt="${titulo}" class="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" width="600" height="450" />
        <span class="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
          <span class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg">
            <svg class="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          </span>
        </span>
        <span class="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">${label}</span>
        <span class="absolute top-2 right-2 rounded bg-brand-500/90 px-2 py-0.5 text-xs font-medium text-white">Vídeo</span>
      </button>
    `;
      })
      .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
  }

  function renderYoutubeVideos() {
    const container = document.getElementById('youtube-videos');
    if (!container) return;

    const videos = videosPortfolio;
    const youtubeUrl = config.youtubeUrl || 'https://www.youtube.com/@techdrone360';
    const youtubeLabel = config.youtube || '@techdrone360';

    container.querySelectorAll('#youtube-videos-hint').forEach((el) => el.remove());

    if (videos.length === 0) {
      container.innerHTML = `
        <div class="col-span-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <p class="text-gray-700 font-medium">Vídeos do YouTube</p>
          <p class="mt-2 text-sm text-gray-600">Sincronize o canal <a href="${escapeHtml(youtubeUrl)}" target="_blank" rel="noopener noreferrer" class="font-semibold text-brand-600 hover:text-brand-500">${escapeHtml(youtubeLabel)}</a>:</p>
          <code class="mt-4 block rounded-lg bg-gray-100 px-4 py-3 text-left text-xs text-gray-800">python3 scripts/sync-youtube.py</code>
        </div>
      `;
      return;
    }

    const useEmbed = canEmbedYoutube();

    container.innerHTML = videos
      .map((v) => {
        const titulo = escapeHtml(v.titulo || 'Vídeo TechDrone360');
        const watch = getVideoWatchUrl(v);
        const thumb = getVideoThumb(v);
        if (!v.videoId) return '';

        if (useEmbed) {
          const embed = getVideoEmbedUrl(v);
          return `
      <div class="overflow-hidden rounded-xl bg-gray-900 shadow-lg">
        <div class="aspect-video">
          <iframe
            class="h-full w-full"
            src="${escapeHtml(embed)}"
            title="${titulo}"
            loading="lazy"
            referrerpolicy="${IFRAME_REFERRER}"
            allow="${IFRAME_ALLOW}"
            allowfullscreen
          ></iframe>
        </div>
        <div class="flex items-center justify-between gap-2 px-4 py-3">
          <p class="text-sm text-white">${titulo}</p>
          <a href="${escapeHtml(watch)}" target="_blank" rel="noopener noreferrer" class="shrink-0 text-xs font-medium text-brand-400 hover:text-brand-300">YouTube</a>
        </div>
      </div>
    `;
        }

        return `
      <a href="${escapeHtml(watch)}" target="_blank" rel="noopener noreferrer" class="group block overflow-hidden rounded-xl bg-gray-900 shadow-lg">
        <div class="relative aspect-video">
          <img src="${escapeHtml(thumb)}" alt="${titulo}" class="h-full w-full object-cover opacity-90 transition group-hover:opacity-100" loading="lazy" />
          <span class="absolute inset-0 flex items-center justify-center bg-black/35">
            <span class="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white">Assistir no YouTube</span>
          </span>
        </div>
        <p class="px-4 py-3 text-sm text-white">${titulo}</p>
      </a>
    `;
      })
      .join('');

    if (!useEmbed && videos.length > 0) {
      const section = document.getElementById('videos');
      const hint = section?.querySelector('[data-youtube-videos-hint]');
      hint?.classList.remove('hidden');
    }
  }

  function setMobileMenuOpen(open) {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('icon-menu-open');
    const iconClose = document.getElementById('icon-menu-close');
    if (!btn || !menu) return;

    menu.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    iconOpen?.classList.toggle('hidden', open);
    iconClose?.classList.toggle('hidden', !open);
    document.body.classList.toggle('menu-open', open);
  }

  function initMobileMenu() {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isOpen = menu.classList.contains('hidden');
      setMobileMenuOpen(isOpen);
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMobileMenuOpen(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        setMobileMenuOpen(false);
      }
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const logoOnDark = header.querySelectorAll('.logo-on-dark');
    const logoOnLight = header.querySelectorAll('.logo-on-light');

    const onScroll = () => {
      const scrolled = window.scrollY > 48;
      header.classList.toggle('header--scrolled', scrolled);
      logoOnDark.forEach((el) => el.classList.toggle('hidden', scrolled));
      logoOnLight.forEach((el) => el.classList.toggle('hidden', !scrolled));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideoWrap = document.getElementById('lightbox-video-wrap');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!lightbox || !lightboxImg) return;

    const openImage = (src, alt) => {
      lightboxVideoWrap?.classList.add('hidden');
      if (lightboxVideo) lightboxVideo.src = '';
      lightboxImg.classList.remove('hidden');
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    const openVideo = (videoId) => {
      const embedUrl = getVideoEmbedUrl({ videoId }, true);
      lightboxImg.classList.add('hidden');
      lightboxImg.src = '';
      lightboxVideoWrap?.classList.remove('hidden');
      if (lightboxVideo) {
        lightboxVideo.referrerPolicy = IFRAME_REFERRER;
        lightboxVideo.allow = IFRAME_ALLOW;
        lightboxVideo.src = embedUrl;
      }
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const src = trigger.getAttribute('href') || trigger.querySelector('img')?.src;
        const alt = trigger.querySelector('img')?.alt || '';
        if (!src) return;
        openImage(src, alt);
      });
    });

    const onVideoLightboxClick = (e) => {
      const btn = e.target.closest('[data-video-lightbox]');
      if (!btn) return;
      const videoId = btn.getAttribute('data-video-id');
      const watch = btn.getAttribute('data-video-watch');
      if (!videoId) return;

      if (!canEmbedYoutube()) {
        if (watch) window.open(watch, '_blank', 'noopener,noreferrer');
        return;
      }

      openVideo(videoId);
    };

    document.getElementById('portfolio-gallery')?.addEventListener('click', onVideoLightboxClick);
    document.getElementById('youtube-videos')?.addEventListener('click', onVideoLightboxClick);

    const close = () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      lightboxImg.src = '';
      lightboxImg.classList.remove('hidden');
      if (lightboxVideo) lightboxVideo.src = '';
      lightboxVideoWrap?.classList.add('hidden');
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) close();
    });
  }

  function initHeroVideoFallback() {
    const video = document.getElementById('hero-video');
    const fallback = document.getElementById('hero-fallback');
    if (!video || !fallback) return;

    const showFallback = () => {
      video.classList.add('hidden');
      fallback?.classList.remove('hidden');
    };

    const hideFallback = () => {
      if (video.classList.contains('hidden')) return;
      fallback?.classList.add('hidden');
    };

    video.addEventListener('error', showFallback);
    video.addEventListener('playing', hideFallback);
    video.addEventListener('canplay', hideFallback);

    if (video.readyState >= 2) hideFallback();

    video.play().catch(showFallback);
  }

  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', async () => {
    initAnalytics();
    await loadFotosPortfolio();
    await loadVideosPortfolio();
    applyConfig();
    initMobileMenu();
    initHeaderScroll();
    initLightbox();
    initHeroVideoFallback();
    initScrollReveal();
  });
})();

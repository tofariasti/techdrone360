# Google Search Console + Perfil da Empresa (Google Business)

Guia operacional para a **TechDrone360** — use após publicar o site com as últimas alterações de SEO (`.htaccess`, `sitemap.xml`, `og-social.jpg`, FAQ estático).

---

## Parte 1 — Google Search Console

### Pré-requisitos

- [ ] Site no ar: https://techdrone360.com.br/
- [ ] `robots.txt` acessível: https://techdrone360.com.br/robots.txt
- [ ] `sitemap.xml` acessível: https://techdrone360.com.br/sitemap.xml
- [ ] Redirecionamento `www` → sem `www` funcionando (teste no navegador)

### Passo a passo

1. Acesse [Google Search Console](https://search.google.com/search-console) com a conta Google que você usa para o negócio.

2. **Adicionar propriedade**
   - Clique em **Adicionar propriedade**
   - Escolha **Prefixo do URL**
   - URL: `https://techdrone360.com.br/`
   - (Opcional depois: adicionar também propriedade tipo **Domínio** `techdrone360.com.br` se quiser cobrir todos os subdomínios)

3. **Verificar propriedade** (escolha um método)

   | Método | Quando usar |
   |--------|-------------|
   | **Registro DNS (TXT)** | Recomendado se o domínio está na Hostinger — registro persiste sozinho |
   | **Arquivo HTML** | Rápido: sobe um arquivo na raiz de `public_html` |
   | **Tag HTML** | Adiciona meta no `<head>` do `index.html` (precisa novo deploy) |
   | **Google Analytics** | Já tem GA4 `G-P5H2B88DE0` — pode verificar se a mesma conta for proprietária da propriedade GA |

   **DNS (Hostinger):**
   - hPanel → **Domínios** → `techdrone360.com.br` → **DNS / Zona DNS**
   - Adicionar registro **TXT** com o valor que o Search Console mostrar
   - Aguardar alguns minutos (até 48 h em casos raros) e clicar em **Verificar**

4. **Enviar sitemap**
   - Menu **Sitemaps**
   - Novo sitemap: `sitemap.xml`
   - Enviar
   - Status esperado: **Êxito** (pode levar horas)

5. **Solicitar indexação da página principal**
   - Menu **Inspeção de URL**
   - Cole: `https://techdrone360.com.br/`
   - Se aparecer “URL não está no Google”, clique em **Solicitar indexação**
   - Repita após grandes mudanças no site

6. **Conferir cobertura (primeiros dias)**
   - **Páginas** → ver se a URL principal foi descoberta
   - **Experiência** → Core Web Vitals (mobile)
   - **Melhorias** → ver se **FAQ** aparece como rich result elegível (pode levar semanas)

### Checklist pós-configuração

- [ ] Propriedade verificada
- [ ] Sitemap enviado sem erro
- [ ] Indexação solicitada para a home
- [ ] Mesma conta Google no GA4 e no Search Console (facilita relatórios)
- [ ] (Opcional) Vincular Search Console em **GA4** → Admin → links de produtos

### Bing (opcional, ~10 min)

1. [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Importar do Google Search Console **ou** adicionar site manualmente
3. Enviar sitemap: `https://techdrone360.com.br/sitemap.xml`

---

## Parte 2 — Perfil da Empresa no Google (Google Business Profile)

Link: [business.google.com](https://business.google.com)

### Tipo de negócio

- **Categoria principal:** `Serviço de fotografia aérea` ou `Fotógrafo aéreo`
- **Categorias secundárias (se couber):** `Serviço de vídeo`, `Empresa de fotografia`, `Produtora de vídeo`

### Dados básicos

| Campo | Sugestão |
|-------|----------|
| **Nome** | TechDrone360 |
| **Site** | https://techdrone360.com.br |
| **Telefone** | +55 51 98903-0405 (mesmo do WhatsApp) |
| **WhatsApp** | Ativar e usar o mesmo número |
| **Área de atendimento** | Porto Alegre + região metropolitana (não só um CEP se você atende em toda a RMS) |
| **Endereço** | Se **não** tem loja física: marque **Atendo clientes no local deles** / área de serviço. Se tem endereço comercial fixo, use o endereço real (não invente). |

### Descrição do negócio (máx. 750 caracteres)

Copie e ajuste se quiser:

```
TechDrone360 — fotos e vídeos aéreos profissionais com drone DJI em Porto Alegre e região metropolitana.

Atendo imobiliárias, construtoras, Airbnb, hotéis, parques, eventos e empresas que precisam mostrar um lugar de verdade: entorno, escala, acesso e diferenciais que fotos no chão não comunicam.

• Fotos e vídeo em alta resolução (DJI Mini 4 Pro)
• Planejamento de voo conforme local e legislação (ANAC / DECEA quando aplicável)
• Material para portais, redes sociais e campanhas
• Orçamento rápido pelo WhatsApp
• Emissão de nota fiscal

Veja portfólio e solicite orçamento no site: techdrone360.com.br
Instagram e YouTube: @techdrone360
```

### Serviços (adicione cada um no painel)

1. Fotos aéreas para imóveis e loteamentos  
2. Vídeos aéreos para imóveis e empreendimentos  
3. Captação para Airbnb e hospedagem  
4. Filmagem aérea para obras e construtoras  
5. Vídeo e foto aérea para eventos  
6. Imagens aéreas para empresas e institucional  
7. Conteúdo para parques, resorts e destinos turísticos  

### Atributos / diferenciais

Marque o que for verdadeiro:

- [ ] Orçamento online / contato por mensagem  
- [ ] Emissão de nota fiscal (se aplicável ao seu CNPJ)  
- [ ] Identidade: empreendedor individual ou empresa (conforme seu caso)

### Fotos e vídeos (importante para conversão)

Suba pelo menos:

| Tipo | Quantidade mínima | Origem sugerida |
|------|-------------------|-----------------|
| Logo | 1 | `assets/images/logo-icon.svg` exportado em PNG quadrado |
| Capa | 1 | `assets/images/og-social.jpg` ou melhor foto aérea horizontal |
| Interior / equipamento | 2–4 | Fotos do drone em `assets/images/drone/` |
| Trabalhos realizados | 10+ | Portfólio / Instagram / frames dos vídeos YouTube |
| Vídeo curto | 1 | Trecho de 30 s de um vídeo do canal |

### Posts no perfil (primeiras 3 ideias)

**Post 1 — Apresentação**  
*Título:* Fotos e vídeos com drone em POA e região  
*Texto:* Imóveis, obras, Airbnb e eventos com captação profissional. Orçamento pelo WhatsApp ou site.  
*Botão:* Saiba mais → https://techdrone360.com.br  

**Post 2 — Diferencial**  
*Título:* Por que não basta o Google Street View?  
*Texto:* O mapa mostra a rua; o drone mostra por que alguém escolhe o seu imóvel ou destino.  
*Botão:* Ver site  

**Post 3 — Portfólio**  
*Título:* Empreendimentos na região  
*Texto:* Condomínios e obras filmados na RMS — veja vídeos no YouTube @techdrone360.  
*Botão:* Ver portfólio  

### Perguntas e respostas (pré-cadastrar)

| Pergunta | Resposta sugerida |
|----------|-------------------|
| Atendem fora de Porto Alegre? | Sim, com foco na região metropolitana (Canoas, Gravataí, Viamão, NH, etc.). Outras cidades do RS sob consulta. |
| Como pedir orçamento? | Pelo WhatsApp (51) 98903-0405 ou pelo formulário no site techdrone360.com.br. |
| Emitem nota fiscal? | Sim, para empresas e clientes que precisam de documentação fiscal. |
| Quanto tempo para entregar? | Fotos em poucos dias úteis; vídeo editado conforme combinado no orçamento (geralmente 3 a 10 dias úteis). |
| O voo é legal? | Sim, quando planejado conforme ANAC e DECEA. Informe o endereço da captação para validarmos o local antes do agendamento. |

### Links sociais no perfil

- Instagram: https://www.instagram.com/techdrone360  
- YouTube: https://www.youtube.com/@techdrone360  

### Verificação do perfil

O Google pode enviar cartão postal, telefone ou e-mail. Use endereço/telefone reais do responsável pelo negócio.

---

## Parte 3 — Depois de configurar (30 dias)

| Semana | Ação |
|--------|------|
| 1 | Search Console: confirmar sitemap processado; corrigir erros se houver |
| 2 | GBP: publicar 1 post; responder avaliações (quando aparecerem) |
| 3 | Pedir 2–3 avaliações de clientes reais (WhatsApp após entrega) |
| 4 | Search Console: ver consultas em **Desempenho**; ajustar título/descrição se CTR baixo |

### Consultas que você pode começar a ranquear

- drone porto alegre  
- filmagem com drone porto alegre  
- fotos aéreas imóveis porto alegre  
- vídeo drone empreendimento  
- captação aérea região metropolitana  

O site já menciona esses temas; o Perfil da Empresa reforça o **local**.

---

## Referência rápida — URLs

| Recurso | URL |
|---------|-----|
| Site | https://techdrone360.com.br/ |
| Sitemap | https://techdrone360.com.br/sitemap.xml |
| Rich Results Test | https://search.google.com/test/rich-results |
| Sharing Debugger (OG) | https://developers.facebook.com/tools/debug/ |

---

*Última atualização alinhada ao deploy SEO do projeto (FAQ estático, schema local, og-social 1200×630).*

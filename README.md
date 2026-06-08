# TechDrone360 — Landing Page

Landing page estática para promoção de serviços de fotos e vídeos aéreos com drone DJI.

## Identidade visual

A paleta do site segue a logo do YouTube (preto + laranja):

| Arquivo | Uso |
|---------|-----|
| `assets/images/logo-light.svg` | Header e footer (fundo escuro) |
| `assets/images/logo-dark.svg` | Header após rolar a página (fundo branco) |
| `assets/images/logo-icon.svg` | Favicon e seção Qualidade |
| `assets/images/logo-youtube.png` | Logo original do canal (referência / Open Graph) |

## Estrutura

```
techdrone360/
├── index.html
├── assets/
│   ├── css/input.css      # fonte Tailwind (edição)
│   ├── css/output.css     # CSS compilado (usado pelo site)
│   ├── js/config.js       # WhatsApp, Instagram, cidade, modelo DJI
│   ├── js/main.js         # menu, filtros, lightbox, WhatsApp
│   ├── images/portfolio/  # suas fotos do portfólio
│   └── video/hero.mp4     # vídeo do hero (loop)
├── package.json
└── tailwind.config.js
```

## Configuração rápida

Edite **[`assets/js/config.js`](assets/js/config.js)** antes de publicar:

| Campo | Descrição |
|-------|-----------|
| `whatsappNumero` | Número com DDI, só dígitos (ex: `5511999887766`) |
| `whatsappMensagem` | Texto pré-preenchido no WhatsApp |
| `whatsappRastrearOrigem` | Inclui origem do clique na mensagem (`hero`, `nav`, etc.) |
| `googleAnalyticsId` | ID GA4 (ex: `G-XXXXXXXX`) — vazio = desativado |
| `cidadeRegiao` | Cidade/região de atendimento |
| `ogImage` | Imagem para redes sociais (recomendado 1200×630) |
| `sobre` / `depoimentos` / `faq` / `restricoesVoo` | Conteúdo das seções de confiança, legislação e SEO |
| `instagram` / `instagramUrl` | @ e link do perfil |
| `youtube` / `youtubeUrl` | Canal YouTube (ex: `https://www.youtube.com/@techdrone360`) |
| `modeloDji` | Modelo do drone (ex: DJI Mini 4 Pro) |
| `videosPortfolio` | Array com `{ videoId, titulo, categoria }` — vídeos do YouTube na galeria |

## Mídia

### Vídeo do hero
Coloque seu vídeo em `assets/video/hero.mp4` (recomendado: MP4, H.264, até ~5 MB, sem áudio).

Se o arquivo não existir, o site exibe automaticamente uma imagem de fundo (fallback).

### Portfólio — fotos do Instagram

Importação automática do perfil [instagram.com/techdrone360](https://www.instagram.com/techdrone360):

```bash
pip3 install instaloader

# Obrigatório: login na sua conta Instagram (uma vez)
python3 -m instaloader --login SEU_USUARIO_INSTAGRAM

# Importar fotos do @techdrone360
python3 scripts/sync-instagram.py
```

Se aparecer `403 Forbidden` ou `Perfil não encontrado`, o login não foi feito ou expirou — execute `python3 -m instaloader --login` de novo com a conta que administra [@techdrone360](https://www.instagram.com/techdrone360).

Se aparecer `command not found: instaloader`, use sempre `python3 -m instaloader` (o pip instala o pacote, mas o comando pode não estar no PATH).

### Instagram bloqueou / "wait a few minutes"

O Instagram limita após várias tentativas. **Não faça login repetidas vezes** — aguarde 30–60 minutos e rode só:

```bash
python3 scripts/sync-instagram.py
```

**Importação manual (funciona sempre):**

1. Salve fotos do app Instagram no Mac
2. Copie para `assets/images/instagram/` (ex: `DJ8abc123.jpg` — use o código do post se souber)
3. Execute:

```bash
python3 scripts/sync-instagram.py --from-folder
```

O script baixa até 12 fotos para `assets/images/instagram/` e gera `assets/data/fotos-portfolio.json`.

**Manual** — em `config.js`, propriedade `fotosPortfolio`:

```javascript
fotosPortfolio: [
  {
    imagem: 'assets/images/instagram/minha-foto.jpg',
    imagemFull: 'assets/images/instagram/minha-foto.jpg',
    alt: 'Descrição da foto',
    categoria: 'imoveis',
    instagramUrl: 'https://www.instagram.com/p/CODIGO_DO_POST/',
  },
],
```

Categorias do filtro: `imoveis`, `obras`, `eventos`, `empresas`, `natureza`.

**Posts embed** (opcional) — cole o link do post em `instagramPosts`:

```javascript
instagramPosts: [
  { permalink: 'https://www.instagram.com/p/CODIGO/', categoria: 'imoveis' },
],
```

### Vídeos do portfólio
Em `config.js`:

```javascript
videosPortfolio: [
  {
    videoId: 'VIDEO_ID',
    titulo: 'Nome do projeto — Cidade/UF',
    categoria: 'imoveis', // imoveis | obras | eventos | empresas | natureza
  },
],
```

## Testar o site localmente

Abrir `index.html` direto no navegador (`file://`) faz os vídeos do YouTube falharem (erro 153). Use um servidor local:

```bash
cd techdrone360
python3 -m http.server 8888
```

Acesse: http://localhost:8888 (ou outra porta livre, ex: `python3 -m http.server 5500`)

Se aparecer `Address already in use`, a porta está ocupada (no Mac, 8080 costuma ser o Docker). Use outra porta: `python3 -m http.server 8888`

## Desenvolvimento (CSS)

Se tiver Node.js e npm instalados:

```bash
npm install
npm run watch:css   # desenvolvimento
npm run build:css   # produção (minificado)
npm run build:seo   # FAQ estático + JSON-LD + og-social.jpg (após editar faq em config.js)
npm run build       # CSS + SEO
```

O site usa `assets/css/output.css` — já incluído para funcionar sem build.

## Publicar

### Hostinger (recomendado para este projeto)

Plano **Single** ou **Premium** — guia completo: **[DEPLOY-HOSTINGER.md](DEPLOY-HOSTINGER.md)** (hPanel, SSL, FTP, `public_html`, testes e Search Console).

### Outras opções

- **Netlify** — arraste a pasta ou conecte o Git
- **Vercel** — idem
- **GitHub Pages** — publique a raiz do repositório

Após publicar, teste os botões de WhatsApp no celular.

A pasta **`leads/`** é a **área comercial interna** (prospecção, guias, listas). Em produção fica em `/leads/` com **senha HTTP** — configure com [leads/SETUP-AUTH.md](leads/SETUP-AUTH.md). O `robots.txt` impede indexação; `scripts/` continua bloqueado (403).

## Checklist antes do ar

- [ ] Número e mensagem do WhatsApp em `config.js`
- [ ] Cidade/região correta
- [ ] Instagram e modelo DJI
- [ ] Vídeo hero e fotos reais no portfólio
- [ ] Links de vídeo YouTube/Vimeo
- [ ] Atualizar `canonical` e `siteUrl` em `index.html` / `config.js` com seu domínio
- [ ] (Opcional) Preencher `googleAnalyticsId` em `config.js`
- [ ] Personalizar `sobre`, `depoimentos` e `faq` em `config.js`
- [ ] `npm run build:seo` após alterar FAQ em `config.js` (gera HTML + `og-social.jpg`)
- [ ] Imagem `assets/images/hero-poster.jpg` (hero) e `og-social.jpg` (compartilhamento 1200×630)
- [ ] Pasta `leads/` em `public_html` com senha HTTP configurada ([SETUP-AUTH.md](leads/SETUP-AUTH.md))
- [ ] Teste: `/leads/` pede login; `/scripts/` retorna 403

## Licença

Uso exclusivo TechDrone360.

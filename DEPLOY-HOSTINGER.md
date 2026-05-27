# Deploy TechDrone360 na Hostinger

Guia passo a passo para publicar a landing estática no plano **Single** ou **Premium** (hospedagem compartilhada).

---

## 1. Antes de comprar / configurar

| Item | Status |
|------|--------|
| Domínio desejado: `techdrone360.com.br` | ☐ |
| Plano **Single** ou **Premium** (não precisa VPS) | ☐ |
| WhatsApp, cidade e links em `assets/js/config.js` revisados | ☐ |
| `siteUrl` em `config.js` = `https://techdrone360.com.br` | ☐ |
| Vídeo `assets/video/hero.mp4` otimizado (ideal &lt; 5 MB) | ☐ |
| Imagem `assets/images/hero-poster.jpg` (1200×630) para hero e redes | ☐ |
| Fotos reais no portfólio (`assets/images/instagram/` ou JSON) | ☐ |

Opcional: preencher `googleAnalyticsId` em `config.js` depois de criar a propriedade no GA4.

---

## 2. Conta e domínio no hPanel

1. Acesse [hpanel.hostinger.com](https://hpanel.hostinger.com) e faça login.
2. **Websites** → **Add website** (se ainda não criou o site).
3. Escolha **Empty PHP/HTML website** ou site em branco (não precisa instalar WordPress).
4. **Domínio:**
   - Se comprou o domínio na Hostinger: ele já deve aparecer vinculado.
   - Se o domínio está em outro registrador: em **Domains** → seu domínio → **DNS / Nameservers**, aponte para a Hostinger:
     - **Opção A (recomendada):** nameservers da Hostinger (`ns1.dns-parking.com` etc. — use os que o hPanel mostrar).
     - **Opção B:** mantenha o registrador e crie registro **A** para `@` e `www` com o IP que o hPanel indicar em **Websites** → seu site → **DNS**.

Aguarde propagação DNS (minutos a 48 h). Enquanto isso, você pode subir os arquivos.

---

## 3. SSL (HTTPS)

1. **Websites** → seu site → **SSL**.
2. Ative o certificado **gratuito** (Let’s Encrypt) para `techdrone360.com.br` e `www`.
3. Ative **Force HTTPS** (redirecionar HTTP → HTTPS).

Sem HTTPS, o navegador pode bloquear recursos e o WhatsApp/SEO ficam prejudicados.

---

## 4. O que enviar para o servidor

Envie **apenas o que o site precisa** para `public_html` (raiz do domínio).

### Incluir

```
index.html
.htaccess               (bloqueia /leads/ e /scripts/ se forem parar no servidor)
robots.txt
sitemap.xml
assets/          (css, js, images, video, data)
```

### Não enviar (não são necessários em produção)

```
.git/
node_modules/
package.json
tailwind.config.js
assets/css/input.css    (só desenvolvimento; o site usa output.css)
scripts/                (sync Instagram/YouTube — rodar no Mac, depois subir assets atualizados)
leads/                  (prospecção interna — e-mails e contatos; NUNCA publicar)
README.md
DEPLOY-HOSTINGER.md
```

**Importante:** a pasta `leads/` contém dados comerciais sensíveis. O ideal é **não enviá-la** ao servidor. Se usar deploy Git para `public_html` (clone do repositório inteiro), envie pelo menos o `.htaccess` da raiz — ele retorna **403** para `/leads/` e `/scripts/`.

O site já usa `assets/css/output.css` compilado — **não precisa** rodar `npm` na Hostinger.

### Estrutura final em `public_html`

```
public_html/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    ├── js/
    ├── images/
    ├── video/
    └── data/
```

`index.html` deve ficar **diretamente** em `public_html`, não dentro de uma subpasta `techdrone360/`.

---

## 5. Enviar arquivos (escolha um método)

### Método A — Gerenciador de arquivos (hPanel)

1. **Websites** → **Manage** → **File Manager**.
2. Abra `public_html`.
3. Apague arquivos padrão da Hostinger (`default.php`, etc.) se existirem e não forem usados.
4. **Upload** → selecione pasta/arquivos do projeto (ou envie um `.zip` e extraia no servidor).

### Método B — FTP (FileZilla, Cyberduck)

1. hPanel → **FTP Accounts** → crie ou use a conta FTP.
2. Host: domínio ou IP do FTP | Porta: **21** (ou SFTP **65002** se disponível).
3. Usuário/senha do FTP → conecte → pasta remota: `public_html`.
4. Arraste `index.html`, `robots.txt`, `sitemap.xml` e a pasta `assets/`.

### Método C — Git (se o plano tiver Git no hPanel)

1. hPanel → **Git** → repositório: `https://github.com/tofariasti/techdrone360.git`.
2. Branch: `main`.
3. Diretório de deploy: `public_html`.
4. Após o pull, confira se `index.html` está na raiz de `public_html` (ajuste se o clone criou subpasta).

---

## 6. Domínio principal e www

No hPanel, defina o domínio principal (`techdrone360.com.br` ou `www`).

Recomendação: **principal sem www** (`https://techdrone360.com.br/`) e redirecionar `www` → sem www (ou o contrário, desde que seja **um só** — já está assim no `canonical` do `index.html`).

---

## 7. Testes após publicar

Abra no celular e no desktop:

| Teste | URL / ação | OK? |
|-------|------------|-----|
| Página inicial | `https://techdrone360.com.br/` | ☐ |
| HTTPS sem aviso | cadeado no navegador | ☐ |
| Vídeo do hero | carrega ou mostra poster | ☐ |
| Galeria / lightbox | fotos abrem | ☐ |
| Vídeos YouTube | embeds na seção portfólio | ☐ |
| Botão WhatsApp (hero, flutuante, footer) | abre app com mensagem correta | ☐ |
| Menu mobile | abre, fecha, links âncora | ☐ |
| `robots.txt` | `https://techdrone360.com.br/robots.txt` | ☐ |
| `sitemap.xml` | `https://techdrone360.com.br/sitemap.xml` | ☐ |
| `/leads/` bloqueado | `https://techdrone360.com.br/leads/` → **403** (ou 404) | ☐ |

### Compartilhamento (Open Graph)

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — cole a URL e clique em **Scrape Again** se a imagem antiga aparecer.
- Envie o link no WhatsApp e confira título + imagem.

### SEO

1. [Google Search Console](https://search.google.com/search-console) → adicionar propriedade `https://techdrone360.com.br`.
2. Verificar domínio (DNS TXT ou arquivo HTML).
3. Enviar sitemap: `https://techdrone360.com.br/sitemap.xml`.

---

## 8. Atualizações futuras

1. Edite no Mac (`config.js`, fotos, CSS com `npm run build:css` se mudar Tailwind).
2. Rode scripts locais se precisar (`scripts/sync-instagram.py`, etc.).
3. Suba **só os arquivos alterados** via FTP ou File Manager (ou novo deploy Git).

---

## 9. E-mail profissional (opcional)

No plano Single/Premium você pode criar `contato@techdrone360.com.br`:

1. hPanel → **Emails** → criar caixa.
2. Configure no celular (IMAP/SMTP) ou use webmail da Hostinger.

Não é obrigatório para o site funcionar.

---

## 10. Problemas comuns

| Problema | Solução |
|----------|---------|
| Página “Index of /” ou 403 | Falta `index.html` na raiz de `public_html` |
| CSS/JS quebrados | Caminhos errados — confira que existe `assets/css/output.css` no servidor |
| Site abre só com `www` | Ajuste domínio principal e redirecionamento no hPanel |
| Mixed content (HTTP) | Force HTTPS; não use URLs `http://` no HTML |
| YouTube não carrega | Normal em `file://`; em produção com HTTPS deve funcionar |
| OG com imagem errada | Confirme `hero-poster.jpg` no servidor; use Sharing Debugger |
| Domínio não abre | Aguarde DNS; confira nameservers ou registro A |
| `/leads/` abre no navegador | Apague a pasta do servidor; suba `.htaccess` da raiz; confira se `mod_rewrite` está ativo |

---

## Referência rápida — arquivos de URL/SEO

| Arquivo | Conteúdo |
|---------|----------|
| `assets/js/config.js` | `siteUrl`, WhatsApp, GA4, textos |
| `index.html` | `canonical`, meta OG/Twitter |
| `sitemap.xml` | URL principal |
| `robots.txt` | Aponta para o sitemap |

Domínio já configurado no projeto: **https://techdrone360.com.br**

---

## Suporte Hostinger

Chat 24/7 no hPanel — peça ajuda para: apontar DNS, ativar SSL, caminho `public_html` ou conta FTP.

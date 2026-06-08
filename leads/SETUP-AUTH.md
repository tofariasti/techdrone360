# Configurar senha HTTP — pasta `leads/`

A área comercial fica em `https://techdrone360.com.br/leads/` e exige **usuário + senha** (HTTP Basic Auth).

Execute estes passos **uma vez** após subir a pasta `leads/` para o servidor.

---

## Opção A — hPanel (mais simples na Hostinger)

1. **Websites** → **Manage** → **File Manager** → confirme que existe `public_html/leads/`.
2. No hPanel, procure **Password Protect Directories** / **Proteger diretório** (às vezes em **Advanced** ou **Segurança**).
3. Selecione a pasta `leads` (ou `public_html/leads`).
4. Crie um usuário e senha para a equipe comercial.
5. O hPanel gera o `.htaccess` e o `.htpasswd` automaticamente.

Se o hPanel **substituir** o `.htaccess` da pasta `leads/`, abra o arquivo no File Manager e confira que existem estas linhas (senão `/leads/` não abre o hub):

```apache
DirectoryIndex index.html
Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /leads/
  RewriteRule ^$ index.html [L]
</IfModule>
```

Cole **abaixo** do bloco de autenticação que o hPanel criou (`AuthType`, `AuthUserFile`, etc.).

---

## Opção B — Manual (`.htpasswd` + editar `.htaccess`)

### 1. Gerar o arquivo de senhas (no Mac)

```bash
./scripts/generate-leads-htpasswd.sh comercial
```

O script pede a senha e grava em `.htpasswd-techdrone360-leads` na raiz do projeto (arquivo ignorado pelo Git).

### 2. Enviar `.htpasswd` para **fora** de `public_html`

No File Manager ou FTP:

- Caminho recomendado: `/home/SEU_USUARIO/.htpasswd-techdrone360-leads`
- **Não** deixe o arquivo acessível por URL pública.

Para descobrir `SEU_USUARIO`: no File Manager, o caminho costuma aparecer como `/home/u123456789/domains/techdrone360.com.br/public_html` — o usuário é o `u123456789`.

### 3. Editar `leads/.htaccess` no servidor

Substitua a linha `AuthUserFile` pelo caminho **absoluto** real:

```apache
AuthUserFile "/home/u123456789/.htpasswd-techdrone360-leads"
```

### 4. Testar

| URL | Resultado esperado |
|-----|-------------------|
| `https://techdrone360.com.br/leads/` sem login | Janela de usuário/senha (401) |
| Com credenciais corretas | Abre o hub `index.html` |
| `https://techdrone360.com.br/scripts/` | **403** (continua bloqueado) |

---

## Adicionar ou trocar usuário

```bash
# Novo usuário (cria arquivo)
./scripts/generate-leads-htpasswd.sh nome_usuario

# Segundo usuário (append — use htpasswd -b no servidor ou rode o script com APPEND=1)
htpasswd -b /caminho/.htpasswd-techdrone360-leads outro_usuario 'senha_forte'
```

Envie o `.htpasswd` atualizado para o servidor.

---

## Segurança

- Use senha forte (12+ caracteres).
- Compartilhe credenciais só com quem precisa (equipe comercial).
- Troque a senha se alguém sair da equipe.
- O `robots.txt` já bloqueia `/leads/` para buscadores; a senha é camada extra.

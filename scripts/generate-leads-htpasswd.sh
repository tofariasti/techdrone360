#!/usr/bin/env bash
# Gera .htpasswd para a área comercial /leads/
# Uso: ./scripts/generate-leads-htpasswd.sh USUARIO

set -euo pipefail

USER_NAME="${1:-}"
OUTPUT_FILE="${HTPASSWD_OUTPUT:-.htpasswd-techdrone360-leads}"
APPEND="${APPEND:-0}"

if [[ -z "$USER_NAME" ]]; then
  echo "Uso: $0 USUARIO"
  echo "Ex.: $0 comercial"
  exit 1
fi

if ! command -v openssl >/dev/null 2>&1; then
  echo "Erro: openssl não encontrado."
  exit 1
fi

echo "Senha para o usuário «${USER_NAME}»:"
read -rs PASSWORD
echo
echo "Confirme a senha:"
read -rs PASSWORD_CONFIRM
echo

if [[ "$PASSWORD" != "$PASSWORD_CONFIRM" ]]; then
  echo "Erro: senhas não conferem."
  exit 1
fi

if [[ -z "$PASSWORD" ]]; then
  echo "Erro: senha vazia."
  exit 1
fi

HASH="$(openssl passwd -apr1 "$PASSWORD")"
LINE="${USER_NAME}:${HASH}"

if [[ "$APPEND" == "1" ]] && [[ -f "$OUTPUT_FILE" ]]; then
  if grep -q "^${USER_NAME}:" "$OUTPUT_FILE" 2>/dev/null; then
    echo "Erro: usuário «${USER_NAME}» já existe em ${OUTPUT_FILE}"
    exit 1
  fi
  echo "$LINE" >>"$OUTPUT_FILE"
  echo "Usuário adicionado em ${OUTPUT_FILE}"
else
  echo "$LINE" >"$OUTPUT_FILE"
  echo "Arquivo criado: ${OUTPUT_FILE}"
fi

cat <<EOF

Próximos passos:
  1. Envie ${OUTPUT_FILE} para o servidor FORA de public_html
     (ex.: /home/SEU_USUARIO/.htpasswd-techdrone360-leads)
  2. Edite leads/.htaccess no servidor — linha AuthUserFile com o caminho absoluto
  3. Teste: https://techdrone360.com.br/leads/

Ver também: leads/SETUP-AUTH.md
EOF

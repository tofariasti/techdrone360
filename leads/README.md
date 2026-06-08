# Leads — área comercial interna

Material de prospecção para a equipe comercial. **Não indexado** no site público.

**Em produção:** `https://techdrone360.com.br/leads/` (senha HTTP) · **Hub:** [index.html](index.html)

---

## Para a vendedora — por onde começar

| Ordem | Arquivo | Função |
|-------|---------|--------|
| **1** | [COMECE-AQUI.md](COMECE-AQUI.md) | Mapa: o que fazer, ordem de leitura, fluxo do dia |
| **2** | [cheat-sheet-vendas.md](cheat-sheet-vendas.md) | Uso **diário** no celular |
| **3** | [leads-whatsapp-poa.md](leads-whatsapp-poa.md) | Lista de trabalho (~86 leads, POA + 150 km) |
| Expansão | [leads-raio-150km-poa.md](leads-raio-150km-poa.md) | Catálogo por cidade/zona (Serra, litoral, interior) |
| Consulta | [faq-vendas.md](faq-vendas.md) | Perguntas do cliente + respostas |
| Consulta | [guia-vendas-comercial.md](guia-vendas-comercial.md) | Manual completo (4 partes) |
| 1x/semana | [concorrentes-captacao-poa.md](concorrentes-captacao-poa.md) | Pesquisa de mercado |
| **Só Tiago** | [precificacao-servicos.md](precificacao-servicos.md) | Como precificar: custos, RETA, mercado, piso |
| E-mail | [template-email-por-nicho.md](template-email-por-nicho.md) + `emails-personalizados-*.md` | Quando não houver WhatsApp |

---

## Estrutura dos documentos

```
index.html ..................... Hub visual (abrir no navegador)
COMECE-AQUI.md ................. Porta de entrada (ler 1º)
cheat-sheet-vendas.md .......... Cola do dia a dia
faq-vendas.md .................. FAQ — perguntas do cliente
guia-vendas-comercial.md ....... Manual (Partes I–IV + referência)
concorrentes-captacao-poa.md ... Mercado e concorrentes
precificacao-servicos.md ....... Precificação interna (Tiago)
leads-whatsapp-poa.md .......... Lista principal de prospecção (~86)
leads-raio-150km-poa.md ........ Catálogo 150 km (zonas + novos leads)
leads-porto-alegre.md .......... Leads e-mail (17)
leads-expansao-poa-regiao.md ... Leads e-mail expansão (~30)
template-email-por-nicho.md .... Modelos de e-mail
emails-personalizados-*.md ..... Exemplos prontos
SETUP-AUTH.md .................. Senha do servidor (só Tiago)
```

---

## Manutenção (Tiago)

| Ação | Comando |
|------|---------|
| Regenerar HTML após editar `.md` | `npm run build:leads` |
| Deploy | Ver [DEPLOY-HOSTINGER.md](../DEPLOY-HOSTINGER.md) |
| Senha da área | [SETUP-AUTH.md](SETUP-AUTH.md) |

| `.md` | `.html` |
|-------|---------|
| `COMECE-AQUI.md` | `COMECE-AQUI.html` |
| `cheat-sheet-vendas.md` | `cheat-sheet-vendas.html` |
| `guia-vendas-comercial.md` | `guia-vendas-comercial.html` |
| `concorrentes-captacao-poa.md` | `concorrentes-captacao-poa.html` |
| `precificacao-servicos.md` | `precificacao-servicos.html` |
| `leads-*.md` | `leads-*.html` |
| `template-email-por-nicho.md` | `template-email-por-nicho.html` |
| `emails-personalizados-*.md` | `.html` correspondente |

A pasta `scripts/` do projeto **não** vai para o servidor (403).

# 🔧 Configuração do Workflow n8n - Arquitetura Unificada

**Versão:** 2.0
**Data:** 2025-11-03

---

## 📋 Resumo das Mudanças

### ✅ ARQUIVOS NOVOS (Usar no Workflow)

| Arquivo | Tipo | Descrição | Usa no Nó |
|---------|------|-----------|-----------|
| **`index.html.js`** | Template Central | HTML geral para TODAS as páginas | **"Index Geral"** (Code) |
| **`painel/painel.page.js`** | Página Específica | Conteúdo do painel | **"Página: Painel"** (Code) |
| **`animais-lista/list.page.js`** | Página Específica | Conteúdo da listagem | **"Página: Lista"** (Code) |
| **`animal-detalhes/details.page.js`** | Página Específica | Conteúdo de detalhes do animal | **"Página: Detalhes"** (Code) |
| **`historico/historico.page.js`** | Página Específica | Conteúdo do histórico | **"Página: Histórico"** (Code) |

### ⚠️ ARQUIVOS ANTIGOS (Remover do Workflow)

| Arquivo | Status | Ação |
|---------|--------|------|
| ~~`painel/index.painel.html.js`~~ | ❌ OBSOLETO | Remover do workflow |
| ~~`animais-lista/list.html.js`~~ | ❌ OBSOLETO | Remover do workflow |
| ~~`animal-detalhes/details.html.js`~~ | ❌ OBSOLETO | Substituído por `details.page.js` |
| ~~`historico/index.historico.refactored.html.js`~~ | ❌ OBSOLETO | Substituído por `historico.page.js` |

### 🔄 ARQUIVOS AUXILIARES (Manter no Workflow)

Estes continuam sendo usados (compartilhados por todas as páginas):

- ✅ `css-global/01-variables.css.js` → Nó **"CSS Variables"**
- ✅ `css-global/02-fonts-and-base.css.js` → Nó **"CSS Fonts Base"**
- ✅ `css-global/03-layout.css.js` → Nó **"CSS Layout"**
- ✅ `css-global/04-components.css.js` → Nó **"CSS Components"**
- ✅ `css-global/05-sidebar.css.js` → Nó **"CSS Sidebar"**
- ✅ `css-global/06-utilities.css.js` → Nó **"CSS Utilities"**
- ✅ `sidebar/sidebar.html.js` → Nó **"Sidebar Html"**
- ✅ `sidebar/sidebar.script.js` → Nó **"Sidebar Script"**
- ✅ `painel/painel.html.js` → Nó **"Painel Html"**
- ✅ `painel/painel.css.js` → Nó **"Painel Css"**
- ✅ `animais-lista/list.css.js` → Nó **"List Style"**

---

## 🏗️ Estrutura do Workflow

### Exemplo: Workflow do Painel

```
┌─────────────────────┐
│ 1. Webhook          │ ← Recebe requisição
│    /painel          │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ 2. Get Data         │ ← Busca dados do painel
│    (Query DB)       │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ 3. Página: Painel   │ ← Code: painel/painel.page.js
│    (Code)           │   Retorna: {page_title, navbar_html,
│                     │             page_html, page_css, page_script}
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ 4. Index Geral      │ ← Code: index.html.js
│    (Code)           │   Recebe dados via $input
│                     │   Retorna: HTML final completo
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ 5. Respond to       │ ← Retorna HTML ao navegador
│    Webhook          │
└─────────────────────┘
```

### Exemplo: Workflow da Listagem

```
┌─────────────────────┐
│ 1. Webhook          │ ← Recebe requisição
│    /animais         │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ 2. Get Animals      │ ← Busca lista de animais
│    (Query DB)       │   + status filter
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ 3. Página: Lista    │ ← Code: animais-lista/list.page.js
│    (Code)           │   Retorna: {page_title, navbar_html,
│                     │             page_html, page_css, page_script}
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ 4. Index Geral      │ ← Code: index.html.js
│    (Code)           │   Recebe dados via $input
│                     │   Retorna: HTML final completo
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ 5. Respond to       │ ← Retorna HTML ao navegador
│    Webhook          │
└─────────────────────┘
```

---

## 📝 Passo a Passo: Configurar Workflow do Painel

### 1. Criar Nó "Página: Painel" (Code JavaScript)

**Nome do Nó:** `Página: Painel`
**Tipo:** Code
**Código:** Copiar conteúdo de `/painel/painel.page.js`

**Conexões do Nó:**
- **Input:** Conectar ao nó anterior (Get Data)
- **Dependencies:** Conectar aos nós:
  - `Painel Css` (conteúdo de `/painel/painel.css.js`)
  - `Painel Html` (conteúdo de `/painel/painel.html.js`)

**Saída esperada:** Objeto JSON com 5 propriedades:
```json
{
  "page_title": "Kaniu :: Painel",
  "navbar_html": "<div class=\"tab-nav\">...</div>",
  "page_html": "<section>...</section>",
  "page_css": "<style>...</style>",
  "page_script": "<script>...</script>"
}
```

### 2. Criar Nó "Index Geral" (Code JavaScript)

**Nome do Nó:** `Index Geral`
**Tipo:** Code
**Código:** Copiar conteúdo de `/index.html.js`

**Conexões do Nó:**
- **Input:** Conectar ao nó `Página: Painel`
- **Dependencies:** Conectar aos nós:
  - `CSS Variables`
  - `CSS Fonts Base`
  - `CSS Layout`
  - `CSS Components`
  - `CSS Sidebar`
  - `CSS Utilities`
  - `Sidebar Html`
  - `Sidebar Script`
  - `Constants`

**Saída esperada:** Objeto JSON com HTML completo:
```json
{
  "html": "<!DOCTYPE html><html>...</html>"
}
```

### 3. Conectar ao Respond to Webhook

**Nome do Nó:** `Respond to Webhook`
**Tipo:** Respond to Webhook

**Configuração:**
- **Respond With:** Text
- **Response Body:** `{{ $json.html }}`
- **Response Code:** 200
- **Response Headers:**
  - `Content-Type`: `text/html; charset=utf-8`

**Conexão:**
- **Input:** Conectar ao nó `Index Geral`

---

## 📝 Passo a Passo: Configurar Workflow da Listagem

### 1. Criar Nó "Página: Lista" (Code JavaScript)

**Nome do Nó:** `Página: Lista`
**Tipo:** Code
**Código:** Copiar conteúdo de `/animais-lista/list.page.js`

**Conexões do Nó:**
- **Input:** Conectar ao nó anterior (Get Animals)
- **Dependencies:** Conectar aos nós:
  - `List Style` (conteúdo de `/animais-lista/list.css.js`)
  - `Constants`
  - `Vars`

### 2. Criar Nó "Index Geral" (Code JavaScript)

**IMPORTANTE:** O mesmo nó `Index Geral` pode ser usado para TODAS as páginas!

Se já criou o nó para o painel, **reutilize-o** para a listagem também.

### 3. Conectar ao Respond to Webhook

Mesmo processo do painel.

---

## 🗑️ O Que Remover do Workflow

### Nós a Remover (se existirem):

1. ❌ **"Painel Index Html"** - Nó que usava `painel/index.painel.html.js`
2. ❌ **"List Html Full"** - Nó que usava `animais-lista/list.html.js`
3. ❌ Qualquer nó que monte HTML completo (exceto o novo `Index Geral`)

### Como Identificar Nós Obsoletos:

Procure nós Code que:
- Retornam `{ html: "<!DOCTYPE html>..." }` diretamente
- Não usam `$input` para receber dados de outras páginas
- Têm imports CSS duplicados no início

---

## ✅ Checklist de Migração

### Painel
- [x] Criar nó `Página: Painel` com código de `/painel/painel.page.js`
- [x] Criar nó `Index Geral` com código de `/index.html.js`
- [ ] Conectar: Get Data → Página: Painel → Index Geral → Respond
- [ ] Remover nó antigo `index.painel.html.js` (se existir)
- [ ] Testar no navegador

### Listagem
- [x] Criar nó `Página: Lista` com código de `/animais-lista/list.page.js`
- [x] Reutilizar nó `Index Geral` (mesmo do painel)
- [ ] Conectar: Get Animals → Página: Lista → Index Geral → Respond
- [ ] Remover nó antigo `list.html.js` (se existir)
- [ ] Testar no navegador

### Detalhes do Animal
- [x] Criar nó `Página: Detalhes` com código de `/animal-detalhes/details.page.js`
- [x] Reutilizar nó `Index Geral` (mesmo do painel)
- [ ] Conectar: Get Animal → Página: Detalhes → Index Geral → Respond
- [ ] Remover nó antigo `details.html.js` (se existir)
- [ ] Testar no navegador

### Histórico
- [x] Criar nó `Página: Histórico` com código de `/historico/historico.page.js`
- [x] Reutilizar nó `Index Geral` (mesmo do painel)
- [ ] Conectar: Get Events → Página: Histórico → Index Geral → Respond
- [ ] Remover nó antigo `index.historico.refactored.html.js` (se existir)
- [ ] Testar no navegador

---

## 🎨 Layout Final

```
┌─────────────────────────────────────────────┐
│  Sidebar (240px)   │  Main Content          │
│                    │                         │
│  ┌──────────┐      │  ┌───────────────────┐ │
│  │  Logo    │      │  │ Navbar (sticky)   │ │
│  │  32px    │      │  │ Altura: 57px      │ │
│  └──────────┘      │  │ [Filtros/Tabs]    │ │
│                    │  └───────────────────┘ │
│  Menu Items        │                         │
│  - Painel          │  Conteúdo da Página    │
│  - Animais         │  [Scroll aqui]         │
│  - Histórico       │                         │
│                    │                         │
└─────────────────────────────────────────────┘
```

**Navbar:**
- ✅ Sticky (gruda no topo ao fazer scroll)
- ✅ Dentro da área de conteúdo (não ocupa sidebar)
- ✅ Altura de 57px (mesma do header da sidebar)
- ✅ Serve como área de filtros/sub-funções da página

---

## 📞 Suporte

**Dúvidas?** Consulte:
- `ARQUITETURA-UNIFICADA.md` - Documentação completa da arquitetura
- Commits: `7f39ea5` (criação) e próximo (ajustes navbar)

**Próximos arquivos a criar:**
~~1. `/animal-detalhes/details.page.js`~~ ✅ **CRIADO**
~~2. `/historico/historico.page.js`~~ ✅ **CRIADO**

**Status:** ✅ Todos os arquivos da arquitetura unificada foram criados!

Agora basta configurar os workflows no n8n! 🎉

# 🏗️ Arquitetura Unificada - Sistema Kaniu

**Data:** 2025-11-03
**Versão:** 2.0
**Status:** ✅ Em implementação

---

## 📋 Visão Geral

Sistema unificado onde **todas as páginas** seguem o mesmo padrão arquitetural:

```
┌─────────────────────────────────────────────────────┐
│                  index.html.js (GERAL)              │
│  ┌───────────────────────────────────────────────┐  │
│  │  Navbar Fixa (57px altura)                    │  │
│  │  [Conteúdo de cada página: filtros, ações]   │  │
│  ├───────────┬───────────────────────────────────┤  │
│  │ Sidebar   │  Conteúdo Principal da Página     │  │
│  │ (240px)   │  [HTML específico]                │  │
│  │           │                                    │  │
│  │  Logo     │  Painel / Lista / Detalhes / etc  │  │
│  │  Menu     │                                    │  │
│  │  Ações    │                                    │  │
│  └───────────┴───────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Conceito

### Antes (❌ Duplicado)

Cada página tinha sua própria estrutura HTML completa:
- `painel/index.painel.html.js` - HTML completo
- `animais-lista/list.html.js` - HTML completo
- `animal-detalhes/details.html.js` - HTML completo
- `historico/index.historico.html.js` - HTML completo

**Problemas:**
- Código duplicado (sidebar, header, imports CSS)
- Difícil manter consistência visual
- Mudanças estruturais exigem editar todos os arquivos

### Agora (✅ Unificado)

**Um único** `index.html.js` geral que recebe conteúdo de páginas específicas:

```javascript
// Páginas específicas geram apenas seu conteúdo:
painel.page.js      → { navbar_html, page_html, page_css, page_script }
list.page.js        → { navbar_html, page_html, page_css, page_script }
details.page.js     → { navbar_html, page_html, page_css, page_script }
historico.page.js   → { navbar_html, page_html, page_css, page_script }
                       ↓
// Index geral monta tudo:
index.html.js       → HTML final completo
```

---

## 📁 Estrutura de Arquivos

### Arquivo Central

```
/index.html.js                      # Template HTML geral (único para todas as páginas)
```

### Páginas Específicas

```
/painel/painel.page.js              # Conteúdo do painel
/animais-lista/list.page.js         # Conteúdo da listagem
/animal-detalhes/details.page.js    # Conteúdo de detalhes
/historico/historico.page.js        # Conteúdo do histórico
```

### CSS e Scripts das Páginas

```
/painel/painel.css.js               # Estilos específicos do painel
/painel/painel.html.js              # HTML dos cards do painel
/animais-lista/list.css.js          # Estilos específicos da listagem
/animal-detalhes/details.css.js     # Estilos específicos de detalhes
/historico/historico.css.js         # Estilos específicos do histórico
```

---

## 🔧 Como Funciona

### 1. Página Específica (`*.page.js`)

Cada página gera um objeto JSON com 5 propriedades:

```javascript
return [{
  json: {
    page_title: 'Título da Página',           // <title> do HTML
    navbar_html: '<div>...</div>',            // Conteúdo da navbar fixa
    page_html: '<section>...</section>',      // Conteúdo principal
    page_css: '<style>...</style>',           // CSS específico
    page_script: '<script>...</script>'       // JavaScript específico
  }
}];
```

**Exemplo - `painel/painel.page.js`:**

```javascript
const navbar_html = `
<div class="tab-nav">
    <button class="tab-btn active" data-tab="pendencias">
        <i class="fa-solid fa-clock"></i> Pendências
    </button>
    <button class="tab-btn" data-tab="peso">
        <i class="fa-solid fa-weight-scale"></i> Peso
    </button>
</div>
`;

const page_html = `
<section class="dashboard-grid">
  <div class="dashboard-card">...</div>
  <div class="dashboard-card">...</div>
</section>
`;

const page_css = $('Painel Css').first().json.css;
const page_script = `<script>/* código JS */</script>`;

return [{
  json: {
    page_title: 'Kaniu :: Painel',
    navbar_html: navbar_html,
    page_html: page_html,
    page_css: page_css,
    page_script: page_script
  }
}];
```

### 2. Index Geral (`index.html.js`)

Recebe os dados da página específica via `$input` e monta o HTML final:

```javascript
// Recebe dados da página
const page_data = $input.first().json;
const page_title = page_data.page_title;
const navbar_html = page_data.navbar_html;
const page_html = page_data.page_html;
const page_css = page_data.page_css;
const page_script = page_data.page_script;

// Importa CSS global e sidebar
const cssVariables = $('CSS Variables').first().json.css;
// ... outros módulos CSS
const sidebar_html = $('Sidebar Html').first().json.html;

// Monta HTML final
const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${page_title}</title>
  ${cssVariables}
  ${page_css}  <!-- CSS da página -->
</head>
<body>
  <div class="app-shell">
    ${sidebar_html}

    <div class="main-with-sidebar">
      <!-- Navbar fixa -->
      <div class="top-navbar">
        ${navbar_html}  <!-- Conteúdo da navbar -->
      </div>

      <!-- Conteúdo -->
      <main>
        ${page_html}  <!-- Conteúdo da página -->
      </main>
    </div>
  </div>

  ${page_script}  <!-- JavaScript da página -->
</body>
</html>
`;

return { html };
```

---

## 🎨 Navbar Fixa

### Características

- **Altura:** 57px (mesma altura do header da sidebar com logo)
- **Posição:** Fixa no topo, não rola com o conteúdo
- **Localização:** Do lado direito da sidebar
- **Conteúdo:** Vem de cada página específica (filtros, ações, tabs)

### CSS da Navbar

```css
.top-navbar {
    position: fixed;
    top: 0;
    left: 240px;        /* Largura da sidebar */
    right: 0;
    height: 57px;       /* Altura do header da sidebar */
    background: var(--card-background);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    z-index: 100;
}

/* Quando sidebar está colapsada */
.sidebar.collapsed ~ .main-with-sidebar .top-navbar {
    left: 72px;
}
```

### Conteúdo da Navbar por Página

| Página | Conteúdo da Navbar |
|--------|-------------------|
| **Painel** | Tabs: Pendências / Peso / Saúde |
| **Listagem** | Tabs: Abrigado / Adotado / Internado / Desaparecido / Falecido |
| **Detalhes** | Nome do animal / Botões de ação |
| **Histórico** | Tabs: Realizados / Programados / Atrasados |

---

## 🔌 Configuração no n8n

### Workflow Geral

```
┌─────────────────┐
│ Webhook/Trigger │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Get Data        │  ← Busca dados (animais, eventos, etc)
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Página Específica│  ← Nó Code: painel.page.js / list.page.js / etc
│ (*.page.js)      │  → Retorna: { page_title, navbar_html, page_html, page_css, page_script }
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Index Geral      │  ← Nó Code: index.html.js
│ (index.html.js)  │  → Recebe dados da página via $input
└────────┬────────┘  → Retorna: HTML final completo
         │
         v
┌─────────────────┐
│ Respond to       │
│ Webhook          │
└─────────────────┘
```

### Nós Necessários

1. **Nó "Página Específica"** (Code JavaScript)
   - Código: `/painel/painel.page.js` (ou list.page.js, etc)
   - Entrada: Dados da aplicação (animais, eventos, etc)
   - Saída: Objeto com `{ page_title, navbar_html, page_html, page_css, page_script }`

2. **Nó "Index Geral"** (Code JavaScript)
   - Código: `/index.html.js`
   - Entrada: Saída do nó anterior (via `$input`)
   - Saída: HTML final completo

3. **Nós de Suporte** (compartilhados):
   - `CSS Variables`
   - `CSS Fonts Base`
   - `CSS Layout`
   - `CSS Components`
   - `CSS Sidebar`
   - `CSS Utilities`
   - `Sidebar Html`
   - `Sidebar Script`
   - `Constants`

---

## ✅ Benefícios

### 1. **Código Centralizado**
- ✅ Estrutura HTML em um único lugar
- ✅ Mudanças estruturais = editar 1 arquivo
- ✅ Consistência visual garantida

### 2. **Navbar Unificada**
- ✅ Área fixa para filtros e ações
- ✅ Mesma altura do logo da sidebar
- ✅ Não rola com o conteúdo

### 3. **Manutenção Simplificada**
- ✅ Adicionar nova página = criar 1 arquivo `.page.js`
- ✅ Mudar layout geral = editar apenas `index.html.js`
- ✅ CSS global aplicado automaticamente

### 4. **Flexibilidade**
- ✅ Cada página controla seu próprio conteúdo
- ✅ Navbar personalizada por página
- ✅ CSS e JS específicos isolados

---

## 📝 Exemplo Completo: Criar Nova Página

### Passo 1: Criar `minha-pagina/minha-pagina.page.js`

```javascript
const navbar_html = `
<div class="tab-nav">
  <button class="tab-btn active">Opção 1</button>
  <button class="tab-btn">Opção 2</button>
</div>
`;

const page_html = `
<section>
  <h1>Minha Nova Página</h1>
  <p>Conteúdo aqui...</p>
</section>
`;

const page_css = `
<style>
  /* Estilos específicos */
  section { padding: 2rem; }
</style>
`;

const page_script = `
<script>
  console.log('Página carregada!');
</script>
`;

return [{
  json: {
    page_title: 'Kaniu :: Minha Página',
    navbar_html: navbar_html,
    page_html: page_html,
    page_css: page_css,
    page_script: page_script
  }
}];
```

### Passo 2: Criar Workflow no n8n

1. **Webhook** → captura requisição
2. **Get Data** → busca dados necessários
3. **Code: Minha Página** → executa `minha-pagina.page.js`
4. **Code: Index Geral** → executa `index.html.js`
5. **Respond to Webhook** → retorna HTML

Pronto! Sua página está funcionando com navbar fixa, sidebar e estrutura unificada! 🎉

---

## 🔄 Migração das Páginas Existentes

### Status da Migração

- ✅ **Criado:** `index.html.js` (arquivo central)
- ✅ **Criado:** `painel/painel.page.js`
- ✅ **Criado:** `animais-lista/list.page.js`
- ⏳ **Pendente:** `animal-detalhes/details.page.js`
- ⏳ **Pendente:** `historico/historico.page.js`

### Próximos Passos

1. Criar `animal-detalhes/details.page.js`
2. Criar `historico/historico.page.js`
3. Atualizar workflows no n8n
4. Testar todas as páginas
5. Remover arquivos antigos (`.html.js` diretos)

---

**Arquitetura projetada para facilitar manutenção e garantir consistência visual em todas as páginas do sistema Kaniu.** 🚀

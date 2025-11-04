# GUIA DE ATUALIZAÇÃO DO WORKFLOW N8N

## 📥 NÓS PARA ADICIONAR (novos)

### 1. **Index HTML Template** (Code)
**Nome sugerido:** `Index HTML Template`
**Tipo:** Code (JavaScript)
**Arquivo:** `index.html.js`
**Conexões:**
- **Entrada:** Recebe de todas as páginas (Painel Page, List Page, Details Page, Historico Page)
- **Saída:** Conecta ao nó "Respond"

---

### 2. **CSS Variables** (Code)
**Nome sugerido:** `CSS Variables`
**Tipo:** Code (JavaScript)
**Arquivo:** `css-global/01-variables.css.js`
**Conexões:**
- **Entrada:** Nenhuma (standalone)
- **Saída:** Usado por "Index HTML Template"

---

### 3. **CSS Fonts Base** (Code)
**Nome sugerido:** `CSS Fonts Base`
**Tipo:** Code (JavaScript)
**Arquivo:** `css-global/02-fonts-and-base.css.js`
**Conexões:**
- **Entrada:** Nenhuma (standalone)
- **Saída:** Usado por "Index HTML Template"

---

### 4. **CSS Layout** (Code)
**Nome sugerido:** `CSS Layout`
**Tipo:** Code (JavaScript)
**Arquivo:** `css-global/03-layout.css.js`
**Conexões:**
- **Entrada:** Nenhuma (standalone)
- **Saída:** Usado por "Index HTML Template"

---

### 5. **CSS Components** (Code)
**Nome sugerido:** `CSS Components`
**Tipo:** Code (JavaScript)
**Arquivo:** `css-global/04-components.css.js`
**Conexões:**
- **Entrada:** Nenhuma (standalone)
- **Saída:** Usado por "Index HTML Template"

---

### 6. **CSS Sidebar** (Code)
**Nome sugerido:** `CSS Sidebar`
**Tipo:** Code (JavaScript)
**Arquivo:** `css-global/05-sidebar.css.js`
**Conexões:**
- **Entrada:** Nenhuma (standalone)
- **Saída:** Usado por "Index HTML Template"

---

### 7. **CSS Utilities** (Code)
**Nome sugerido:** `CSS Utilities`
**Tipo:** Code (JavaScript)
**Arquivo:** `css-global/06-utilities.css.js`
**Conexões:**
- **Entrada:** Nenhuma (standalone)
- **Saída:** Usado por "Index HTML Template"

---

## 🔄 NÓS PARA ATUALIZAR (substituir código)

### 1. **Constants** ✏️
**Tipo:** Set
**Ação:** Substituir por Code apontando para `constants.js`
**OU manter Set e atualizar valores:**
```javascript
{
  img_logo: "https://viralatinhaz.uzd6db.easypanel.host/assets/kaniu-logo-blue.png",
  fav_icon: "https://viralatinhaz.uzd6db.easypanel.host/assets/kaniu-fav-icon-blue.png",
  dog_font: "https://viralatinhaz.uzd6db.easypanel.host/assets/fonts/GoodDog.ttf"
}
```

---

### 2. **Icons** ✏️
**Tipo:** Set (JSON Raw)
**Ação:** Atualizar para apontar para `icons.js` OU manter o JSON atual
**Conteúdo está correto, não precisa alterar**

---

### 3. **Painel Page** ✏️
**Tipo:** Code (JavaScript)
**Ação:** Substituir código por `painel/painel.page.js`
**Mudança principal:**
- Agora retorna objeto com `{page_title, navbar_html, page_html, page_css, page_script}`
- `page_script` está VAZIO (script já está no painel.html.js)

---

### 4. **List Page** ✏️
**Tipo:** Code (JavaScript)
**Ação:** Substituir código por `animais-lista/list.page.js`
**Mudança principal:**
- Agora retorna objeto com `{page_title, navbar_html, page_html, page_css, page_script}`
- Inclui mensagem de debug se não houver animais
- Mudança: recebe `{animals: [...]}` do nó anterior

---

### 5. **Details Page** ✏️
**Tipo:** Code (JavaScript)
**Ação:** Substituir código por `animal-detalhes/details.page.js`
**Mudança principal:**
- Agora retorna objeto com `{page_title, navbar_html, page_html, page_css, page_script}`
- Navbar com 7 tabs

---

### 6. **Historico Page** ✏️
**Tipo:** Code (JavaScript)
**Ação:** Substituir código por `historico/historico.page.js`
**Mudança principal:**
- Agora retorna objeto com `{page_title, navbar_html, page_html, page_css, page_script}`
- Importa módulos JS (API, DOM Helpers, State Manager)

---

### 7. **Painel Html** ✏️
**Tipo:** Code (JavaScript)
**Ação:** Substituir código por `painel/painel.html.js`
**Mudança principal:**
- **REMOVIDO navbar duplicado** (linhas 10-23)
- Navbar agora vem do painel.page.js

---

## ⚠️ NÓS PARA REMOVER (obsoletos)

Nenhum nó precisa ser removido por enquanto. Apenas não serão mais usados pelos novos nós.

---

## 🔗 NOVA ESTRUTURA DE CONEXÕES

### Fluxo Principal:

```
Webhook (Viralatinhaz/ProjetoMeg/Canil14)
    ↓
Vars (extrai parâmetros)
    ↓
Page (Switch) - Roteia baseado em vars.pagina
    ├─→ [painel] → Painel Page → Index HTML Template → Respond
    ├─→ [animais] → Get List → List Page → Index HTML Template → Respond
    ├─→ [animal] → Get Details → Details Page → Index HTML Template → Respond
    └─→ [historico] → Historico Page → Index HTML Template → Respond
```

### Dependências do Index HTML Template:

O nó "Index HTML Template" deve chamar:
```javascript
// No código do index.html.js:
const cssVariables = $('CSS Variables').first().json.css;
const cssFontsBase = $('CSS Fonts Base').first().json.css;
const cssLayout = $('CSS Layout').first().json.css;
const cssComponents = $('CSS Components').first().json.css;
const cssSidebar = $('CSS Sidebar').first().json.css;
const cssUtilities = $('CSS Utilities').first().json.css;
const sidebar_html = $('Sidebar Html').first().json.html;
const sidebar_script = $('Sidebar Script').first().json.script;
const page_data = $input.first().json; // Vem da página específica
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Adicionar CSS Global (7 nós)
- [ ] Criar nó "CSS Variables" → `css-global/01-variables.css.js`
- [ ] Criar nó "CSS Fonts Base" → `css-global/02-fonts-and-base.css.js`
- [ ] Criar nó "CSS Layout" → `css-global/03-layout.css.js`
- [ ] Criar nó "CSS Components" → `css-global/04-components.css.js`
- [ ] Criar nó "CSS Sidebar" → `css-global/05-sidebar.css.js`
- [ ] Criar nó "CSS Utilities" → `css-global/06-utilities.css.js`

### Fase 2: Criar Template Central
- [ ] Criar nó "Index HTML Template" → `index.html.js`
- [ ] Conectar aos 6 nós CSS criados acima
- [ ] Conectar aos nós existentes: Sidebar Html, Sidebar Script, Constants

### Fase 3: Atualizar Páginas
- [ ] Atualizar "Painel Page" → `painel/painel.page.js`
- [ ] Atualizar "Painel Html" → `painel/painel.html.js` (remover navbar)
- [ ] Atualizar "List Page" → `animais-lista/list.page.js`
- [ ] Atualizar "Details Page" → `animal-detalhes/details.page.js`
- [ ] Atualizar "Historico Page" → `historico/historico.page.js`

### Fase 4: Reconectar Fluxo
- [ ] Conectar todas as páginas → "Index HTML Template" (ao invés de "Respond")
- [ ] Conectar "Index HTML Template" → "Respond"
- [ ] Verificar que Page Switch está roteando corretamente

### Fase 5: Testar
- [ ] Testar rota: `?pagina=painel`
- [ ] Testar rota: `?status=Abrigado` (lista)
- [ ] Testar rota: `?animal_id=123` (detalhes)
- [ ] Testar rota: `?pagina=historico`
- [ ] Verificar navbar fixa em todas as páginas
- [ ] Verificar altura navbar = altura área logo sidebar

---

## 📊 RESUMO VISUAL

### Estrutura Antiga (workflow atual):
```
Page Switch → Painel Page → Respond
           → List Page → Respond
           → Details Page → Respond
           → Historico Page → Respond
```

### Estrutura Nova (após atualização):
```
Page Switch → Painel Page ────┐
           → List Page ────────┤
           → Details Page ─────┤→ Index HTML Template → Respond
           → Historico Page ───┘
                                ↑
                                ├── CSS Variables
                                ├── CSS Fonts Base
                                ├── CSS Layout
                                ├── CSS Components
                                ├── CSS Sidebar
                                ├── CSS Utilities
                                ├── Sidebar Html
                                ├── Sidebar Script
                                └── Constants
```

---

## ⚡ ATALHO: Importar Workflow Atualizado

Se preferir não fazer manualmente, pode:

1. Exportar o workflow atual como backup
2. Criar um novo workflow
3. Importar os nós gradualmente
4. Testar cada fase antes de continuar

---

## 🆘 TROUBLESHOOTING

### Problema: "Cannot read property 'json' of undefined"
**Solução:** Verificar se os nós CSS estão conectados corretamente ao Index HTML Template

### Problema: "Navbar não aparece"
**Solução:** Verificar se page.navbar_html está sendo passado corretamente

### Problema: "CSS não está aplicado"
**Solução:** Verificar se todos os 6 nós CSS estão sendo importados pelo Index HTML Template

### Problema: "Página em branco"
**Solução:** Verificar se page.page_html está sendo retornado pelo nó da página

---

## 📞 SUPORTE

Se tiver dúvidas sobre algum nó específico, pergunte referenciando o nome do nó e o problema encontrado.

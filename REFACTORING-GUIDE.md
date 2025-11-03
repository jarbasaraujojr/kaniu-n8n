# 🔧 Guia de Refatoração - Kaniu n8n

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Arquivos](#estrutura-de-arquivos)
3. [Módulos CSS](#módulos-css)
4. [Módulos JavaScript](#módulos-javascript)
5. [Como Usar](#como-usar)
6. [Exemplo Completo](#exemplo-completo)
7. [Migração de Páginas Antigas](#migração-de-páginas-antigas)
8. [Boas Práticas](#boas-práticas)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Este guia documenta a refatoração do projeto Kaniu para uma arquitetura modular, separando CSS, JavaScript e HTML em componentes reutilizáveis.

### **Antes vs. Depois**

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Linhas por arquivo** | 2000+ | 100-300 |
| **Manutenibilidade** | ❌ Difícil | ✅ Fácil |
| **Reutilização** | ❌ Código duplicado | ✅ Módulos compartilhados |
| **Performance** | ⚠️ Sem cache | ✅ Cache inteligente |
| **Debugging** | ❌ Complexo | ✅ Isolado por módulo |

---

## 📂 Estrutura de Arquivos

```
kaniu-n8n/
│
├── css-global/                    # CSS usado em TODAS as páginas
│   ├── 01-variables.css.js       # ← Variáveis CSS (cores, tamanhos)
│   ├── 02-fonts-and-base.css.js  # ← Fontes e reset
│   ├── 03-layout.css.js          # ← Estrutura (grid, flex)
│   ├── 04-components.css.js      # ← Componentes reutilizáveis
│   ├── 05-sidebar.css.js         # ← Sidebar/menu lateral
│   └── 06-utilities.css.js       # ← Classes utilitárias
│
├── js-modules/                    # JavaScript reutilizável
│   ├── api.js                    # ← Comunicação com backend
│   ├── dom-helpers.js            # ← Manipulação de DOM
│   └── state-manager.js          # ← Gerenciamento de estado
│
├── historico/                     # Exemplo de página refatorada
│   ├── historico.css.js          # CSS específico
│   ├── historico.refactored.script.js    # JS específico
│   └── index.historico.refactored.html.js # HTML limpo
│
└── REFACTORING-GUIDE.md          # Esta documentação
```

---

## 🎨 Módulos CSS

### **1. Variables (`01-variables.css.js`)**

Define todas as variáveis CSS do design system.

```javascript
// No nó n8n:
const css = `
<style id="kaniu-variables">
:root {
    --primary-color: #5A5D7F;
    --background-light: #EEF2F9;
    /* ... mais variáveis */
}
</style>
`;
return { css };
```

**Uso:**
```css
/* Em qualquer arquivo CSS */
.meu-botao {
    background: var(--primary-color);
    border-radius: var(--radius-md);
}
```

---

### **2. Fonts and Base (`02-fonts-and-base.css.js`)**

Importa fontes e define estilos base.

**Contém:**
- Importação do Google Fonts (Inter)
- Fonte customizada (GoodDog)
- Reset CSS básico
- Scrollbar customizada

---

### **3. Layout (`03-layout.css.js`)**

Estruturas de layout principais.

**Contém:**
- `.app-shell` - Container principal
- `.main-with-sidebar` - Layout com sidebar
- `.content-grid` - Grid de conteúdo
- `.app-header` - Cabeçalho
- `.overlay` - Overlay para modals

---

### **4. Components (`04-components.css.js`)**

Componentes reutilizáveis mais importantes.

**Componentes inclusos:**
- ✅ Botões (`.btn`, `.btn-primary`, `.btn-action`)
- ✅ Cards (`.card`)
- ✅ Chips/Tags (`.chip`)
- ✅ Tabelas (`.table`, `.table-wrapper`)
- ✅ Tabs (`.tab-nav`, `.tab-btn`)
- ✅ Pop-ups (`.pop-up-menu`)
- ✅ Forms (inputs, selects, textareas)
- ✅ Mensagens (`.empty-message`, `.toast`)

**Exemplo de uso:**
```html
<!-- Botão primário -->
<button class="btn btn-primary">
    <i class="fa-solid fa-plus"></i>
    Adicionar
</button>

<!-- Card -->
<div class="card">
    <header>
        <h2>Título</h2>
    </header>
    <p>Conteúdo do card...</p>
</div>

<!-- Chip -->
<span class="chip">Abrigado</span>
```

---

### **5. Sidebar (`05-sidebar.css.js`)**

Estilos do menu lateral de navegação.

**Classes:**
- `.sidebar` - Container da sidebar
- `.sidebar-item` - Item de menu
- `.sidebar-toggle` - Botão de colapsar

---

### **6. Utilities (`06-utilities.css.js`)**

Classes helper para uso rápido.

**Categorias:**
- **Espaçamento:** `.m-0`, `.mt-1`, `.p-2`
- **Display:** `.d-flex`, `.d-none`, `.d-grid`
- **Flexbox:** `.justify-center`, `.align-center`, `.gap-2`
- **Texto:** `.text-center`, `.font-bold`, `.text-primary`
- **Cores de fundo:** `.bg-primary`, `.bg-light`
- **Bordas:** `.rounded-md`, `.border`
- **Sombras:** `.shadow-md`, `.shadow-lg`

**Exemplo:**
```html
<div class="d-flex justify-between align-center gap-2 p-2">
    <span class="text-primary font-bold">Título</span>
    <button class="btn rounded-md shadow-sm">Ação</button>
</div>
```

---

## 🧩 Módulos JavaScript

### **1. API Module (`api.js`)**

Centraliza toda comunicação com backend.

#### **Configuração:**
```javascript
KaniuAPI.setCanilId(14);  // Define ID do canil
KaniuAPI.setBaseURL('https://...'); // Define URL base
```

#### **Métodos disponíveis:**

##### `getEventos(filters)`
Busca eventos do canil.
```javascript
const eventos = await KaniuAPI.getEventos();
// ou com filtro
const eventos = await KaniuAPI.getEventos({ status: 'concluido' });
```

##### `getPainelData()`
Busca dados do painel/dashboard.
```javascript
const painelData = await KaniuAPI.getPainelData();
```

##### `getAnimais(status)`
Busca lista de animais.
```javascript
const animais = await KaniuAPI.getAnimais('Abrigado');
```

##### `getAnimalDetails(animalId)`
Busca detalhes de um animal.
```javascript
const animal = await KaniuAPI.getAnimalDetails('uuid-do-animal');
```

---

### **2. DOM Helpers (`dom-helpers.js`)**

Funções utilitárias para manipular DOM.

#### **Métodos disponíveis:**

##### Renderização de Tabelas
```javascript
// Loading
KaniuDOM.renderLoading(tbody, 7);

// Vazia
KaniuDOM.renderEmptyTable(tbody, 7, 'Nenhum dado');

// Erro
KaniuDOM.renderError(tbody, 7, error);
```

##### Formatação
```javascript
// Data
const data = KaniuDOM.formatDate('2025-01-15');  // → 15/01/2025

// Data e hora
const dataHora = KaniuDOM.formatDateTime('2025-01-15T14:30:00');  // → 15/01/2025 14:30

// Número
const num = KaniuDOM.formatNumber(1234.56, 2);  // → 1.234,56

// Diferença de dias
const dias = KaniuDOM.daysDifference('2025-01-01');  // → 14 (exemplo)
```

##### UI
```javascript
// Toast/Alerta
KaniuDOM.showToast('Salvo com sucesso!', 'success');
KaniuDOM.showToast('Erro ao salvar', 'error');

// Overlay
KaniuDOM.toggleOverlay(true);  // Mostra
KaniuDOM.toggleOverlay(false); // Oculta

// Popup
KaniuDOM.togglePopup('meu-popup', true);

// Scroll suave
KaniuDOM.scrollTo('.meu-elemento');
```

##### Utilitários
```javascript
// Debounce (aguarda pausa antes de executar)
const buscarDebounced = KaniuDOM.debounce(buscar, 500);

// Throttle (limita frequência de execução)
const scrollThrottled = KaniuDOM.throttle(handleScroll, 200);

// Sanitiza HTML (previne XSS)
const safe = KaniuDOM.sanitizeHTML('<script>alert("xss")</script>');

// Copia para clipboard
await KaniuDOM.copyToClipboard('Texto copiado');
```

---

### **3. State Manager (`state-manager.js`)**

Sistema de gerenciamento de estado global.

#### **Uso básico:**

##### Get/Set
```javascript
// Salvar
KaniuState.set('user', { nome: 'João', id: 123 });

// Buscar
const user = KaniuState.get('user');
// { nome: 'João', id: 123 }

// Buscar aninhado
KaniuState.set('config.tema', 'dark');
const tema = KaniuState.get('config.tema');
// 'dark'
```

##### Múltiplas atualizações
```javascript
KaniuState.update({
    'user.nome': 'Maria',
    'config.idioma': 'pt-BR',
    'loading': false
});
```

##### Subscribe (observar mudanças)
```javascript
// Observa mudanças no user
const unsubscribe = KaniuState.subscribe('user', (newValue, oldValue) => {
    console.log('User mudou:', newValue);
});

// Para de observar
unsubscribe();
```

#### **Cache:**
```javascript
// Salvar no cache (5 minutos padrão)
KaniuState.setCache('eventos', dadosEventos, 300000);

// Buscar do cache
const cached = KaniuState.getCache('eventos');
if (cached) {
    // Usa dados do cache
} else {
    // Busca da API
}

// Limpar cache
KaniuState.clearCache('eventos');      // Específico
KaniuState.clearCache();               // Todos
```

#### **Filtros:**
```javascript
// Definir filtro
KaniuState.setFilter('historico_status', 'realizados');
KaniuState.setFilter('historico_page', 1);

// Buscar filtro
const status = KaniuState.getFilter('historico_status');

// Todos os filtros
const allFilters = KaniuState.getAllFilters();

// Limpar filtros
KaniuState.clearFilters();
```

#### **Persistência:**
```javascript
// Salva no localStorage automaticamente
KaniuState.saveToLocalStorage();

// Carrega do localStorage (feito automaticamente ao iniciar)
KaniuState.loadFromLocalStorage();
```

---

## 🚀 Como Usar

### **Passo 1: Criar Nós no n8n**

#### **CSS Global:**
1. Crie nó chamado `CSS Variables`
2. Cole o conteúdo de `css-global/01-variables.css.js`
3. Repita para todos os arquivos CSS

#### **JavaScript:**
1. Crie nó chamado `JS API Module`
2. Cole o conteúdo de `js-modules/api.js`
3. Repita para os outros módulos JS

---

### **Passo 2: Integrar em uma Página**

Exemplo de como refatorar uma página existente:

```javascript
// No início do arquivo HTML da página:

// ===== IMPORTA CSS GLOBAL =====
const cssVariables = $('CSS Variables').first().json.css;
const cssFontsBase = $('CSS Fonts Base').first().json.css;
const cssLayout = $('CSS Layout').first().json.css;
const cssComponents = $('CSS Components').first().json.css;
const cssSidebar = $('CSS Sidebar').first().json.css;
const cssUtilities = $('CSS Utilities').first().json.css;

// ===== CSS DA PÁGINA (se houver) =====
const cssMinhaPage = $('Minha Page CSS').first().json.css;

// ===== IMPORTA JS =====
const jsAPI = $('JS API Module').first().json.script;
const jsDOMHelpers = $('JS DOM Helpers').first().json.script;
const jsStateManager = $('JS State Manager').first().json.script;

// ===== SCRIPT DA PÁGINA =====
const jsMinhaPage = $('Minha Page Script').first().json.script;

// ===== HTML =====
const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Minha Página</title>

    <!-- CSS -->
    ${cssVariables}
    ${cssFontsBase}
    ${cssLayout}
    ${cssComponents}
    ${cssSidebar}
    ${cssUtilities}
    ${cssMinhaPage}
</head>
<body>
    <!-- Seu HTML aqui -->

    <!-- JavaScript -->
    ${jsAPI}
    ${jsDOMHelpers}
    ${jsStateManager}
    ${jsMinhaPage}
</body>
</html>
`;

return { html };
```

---

### **Passo 3: Criar Script da Página**

Crie um arquivo separado para a lógica da página:

```javascript
// arquivo: minha-page.script.js

const script = `
<script>
const MinhaPage = {
    async init() {
        // Usa os módulos
        const dados = await KaniuAPI.getPainelData();

        // Renderiza
        this.render(dados);
    },

    render(dados) {
        const tbody = document.getElementById('minha-tabela');
        KaniuDOM.renderLoading(tbody, 5);

        // ... lógica de renderização
    }
};

// Inicializa
document.addEventListener('DOMContentLoaded', () => {
    MinhaPage.init();
});
</script>
`;

return { script };
```

---

## 📝 Exemplo Completo

Veja a página de **Histórico** refatorada:

- **HTML:** `historico/index.historico.refactored.html.js`
- **Script:** `historico/historico.refactored.script.js`
- **CSS:** `historico/historico.css.js`

Esta página demonstra:
- ✅ Uso de todos os módulos CSS
- ✅ Uso de todos os módulos JS
- ✅ Separação clara de responsabilidades
- ✅ Cache inteligente
- ✅ Gerenciamento de estado
- ✅ Código limpo e organizado

---

## 🔄 Migração de Páginas Antigas

### **Checklist para Migrar:**

- [ ] **1. Extrair CSS inline**
  - Identifique estilos únicos da página
  - Crie arquivo `minha-pagina.css.js`
  - Use classes dos módulos globais quando possível

- [ ] **2. Extrair JavaScript inline**
  - Crie arquivo `minha-pagina.script.js`
  - Use `KaniuAPI` para chamadas HTTP
  - Use `KaniuDOM` para manipulação de DOM
  - Use `KaniuState` para estado compartilhado

- [ ] **3. Limpar HTML**
  - Remove `<style>` inline
  - Remove `<script>` inline
  - Importa módulos CSS/JS
  - Mantém apenas estrutura HTML

- [ ] **4. Testar**
  - Verifica funcionalidades
  - Testa responsividade
  - Valida performance

---

## 💡 Boas Práticas

### **1. Nomenclatura**

```javascript
// ✅ BOM
const MinhaPage = { ... };
const handleClick = () => { ... };

// ❌ RUIM
const pagina1 = { ... };
const func2 = () => { ... };
```

### **2. Comentários**

```javascript
// ✅ BOM - Comenta O QUE e POR QUÊ
// Agrupa eventos por data para otimizar renderização
const grouped = groupByDate(events);

// ❌ RUIM - Comenta o óbvio
// Cria variável eventos
const eventos = [];
```

### **3. Estrutura de Página**

```javascript
const MinhaPage = {
    // ===== CONFIGURAÇÃO =====
    config: { ... },

    // ===== DADOS =====
    data: { ... },

    // ===== INICIALIZAÇÃO =====
    init() { ... },

    // ===== EVENT LISTENERS =====
    setupEventListeners() { ... },

    // ===== CARREGAMENTO DE DADOS =====
    async carregarDados() { ... },

    // ===== RENDERIZAÇÃO =====
    render() { ... },

    // ===== AÇÕES DO USUÁRIO =====
    handleAction() { ... }
};
```

### **4. Tratamento de Erros**

```javascript
// ✅ BOM
try {
    const dados = await KaniuAPI.getEventos();
    this.render(dados);
} catch (error) {
    console.error('Erro ao carregar eventos:', error);
    KaniuDOM.renderError(tbody, 7, error);
    KaniuDOM.showToast('Erro ao carregar dados', 'error');
}

// ❌ RUIM
const dados = await KaniuAPI.getEventos();
this.render(dados);
```

---

## 🐛 Troubleshooting

### **Erro: "KaniuAPI is not defined"**

**Problema:** Módulo JS não foi carregado.

**Solução:**
```javascript
// Certifique-se de importar o módulo:
const jsAPI = $('JS API Module').first().json.script;

// E incluir no HTML:
${jsAPI}
```

---

### **Erro: "Cannot read property 'css' of undefined"**

**Problema:** Nó não encontrado no n8n.

**Solução:**
```javascript
// Verifique o nome exato do nó:
const css = $('CSS Variables').first().json.css;
//             ^^^^^^^^^^^^^^ deve corresponder ao nome no n8n
```

---

### **Estilos não aparecem**

**Problema:** Ordem de importação incorreta.

**Solução:**
```javascript
// CSS deve ser importado nesta ordem:
${cssVariables}    // 1. Variáveis primeiro
${cssFontsBase}    // 2. Fontes e base
${cssLayout}       // 3. Layout
${cssComponents}   // 4. Componentes
${cssSidebar}      // 5. Sidebar
${cssUtilities}    // 6. Utilitários
${cssMinhaPage}    // 7. CSS específico da página por último
```

---

### **Cache não funciona**

**Problema:** Cache expirado ou não foi salvo.

**Solução:**
```javascript
// Verificar se está salvando:
KaniuState.setCache('chave', dados, 300000); // 5 min

// Verificar se está buscando:
const cached = KaniuState.getCache('chave');
if (cached) {
    console.log('✅ Usando cache');
} else {
    console.log('❌ Cache vazio ou expirado');
}

// Limpar cache se necessário:
KaniuState.clearCache('chave');
```

---

## 🎉 Conclusão

Com esta refatoração, você tem:

- ✅ **Código organizado** em módulos reutilizáveis
- ✅ **Fácil manutenção** com arquivos pequenos e focados
- ✅ **Performance melhorada** com cache inteligente
- ✅ **Desenvolvimento ágil** com componentes prontos
- ✅ **Escalabilidade** para adicionar novas páginas facilmente

---

## 📚 Recursos Adicionais

- **Exemplo completo:** Veja a página de Histórico refatorada
- **Design System:** Consulte `01-variables.css.js` para cores e tamanhos
- **Componentes:** Veja `04-components.css.js` para todos os componentes disponíveis

---

**Criado por:** Claude Code
**Data:** 2025-01-15
**Versão:** 1.0

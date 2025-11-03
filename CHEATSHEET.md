# 🚀 Kaniu - Cheatsheet Rápido

## 📦 Importação de Módulos

```javascript
// ===== CSS =====
const cssVariables = $('CSS Variables').first().json.css;
const cssFontsBase = $('CSS Fonts Base').first().json.css;
const cssLayout = $('CSS Layout').first().json.css;
const cssComponents = $('CSS Components').first().json.css;
const cssSidebar = $('CSS Sidebar').first().json.css;
const cssUtilities = $('CSS Utilities').first().json.css;

// ===== JAVASCRIPT =====
const jsAPI = $('JS API Module').first().json.script;
const jsDOMHelpers = $('JS DOM Helpers').first().json.script;
const jsStateManager = $('JS State Manager').first().json.script;
```

---

## 🎨 CSS - Classes Mais Usadas

### Botões
```html
<button class="btn btn-primary">Primário</button>
<button class="btn detail-button">Secundário</button>
<button class="btn-action"><i class="fa-solid fa-eye"></i></button>
```

### Cards
```html
<div class="card">
    <header><h2>Título</h2></header>
    <p>Conteúdo</p>
</div>
```

### Chips/Tags
```html
<span class="chip">Status</span>
<span class="chip is-action">Clicável</span>
```

### Tabelas
```html
<div class="table-card">
    <div class="table-header">
        <div class="table-title">Título</div>
    </div>
    <div class="table-wrapper">
        <table class="table"><!-- ... --></table>
    </div>
</div>
```

### Layout
```html
<div class="d-flex justify-between align-center gap-2">
    <span>Esquerda</span>
    <button>Direita</button>
</div>
```

### Utilitários
```html
<div class="p-2 mt-3 rounded-md shadow-md bg-light">
    <p class="text-center text-primary font-bold">Texto</p>
</div>
```

---

## 🧩 JavaScript - API

### Eventos
```javascript
// Buscar todos
const eventos = await KaniuAPI.getEventos();

// Com filtro
const eventos = await KaniuAPI.getEventos({ status: 'concluido' });
```

### Animais
```javascript
// Lista
const animais = await KaniuAPI.getAnimais('Abrigado');

// Detalhes
const animal = await KaniuAPI.getAnimalDetails('uuid');
```

### Painel
```javascript
const painelData = await KaniuAPI.getPainelData();
```

### Configuração
```javascript
KaniuAPI.setCanilId(14);
KaniuAPI.setBaseURL('https://...');
```

---

## 🛠️ JavaScript - DOM Helpers

### Renderização
```javascript
// Loading
KaniuDOM.renderLoading(tbody, colspan);

// Vazio
KaniuDOM.renderEmptyTable(tbody, colspan, 'Mensagem');

// Erro
KaniuDOM.renderError(tbody, colspan, error);
```

### Formatação
```javascript
// Data
KaniuDOM.formatDate('2025-01-15');  // → 15/01/2025

// Número
KaniuDOM.formatNumber(1234.56, 2);  // → 1.234,56

// Dias de diferença
KaniuDOM.daysDifference('2025-01-01');  // → dias desde data
```

### UI
```javascript
// Toast
KaniuDOM.showToast('Mensagem', 'success');
KaniuDOM.showToast('Erro', 'error');

// Popup
KaniuDOM.togglePopup('id-popup', true);
KaniuDOM.toggleOverlay(true);

// Scroll
KaniuDOM.scrollTo('.elemento');
```

### Utilitários
```javascript
// Debounce
const fn = KaniuDOM.debounce(minhaFuncao, 500);

// Copiar
await KaniuDOM.copyToClipboard('texto');

// Sanitizar
const safe = KaniuDOM.sanitizeHTML(htmlUnsafe);
```

---

## 💾 JavaScript - State Manager

### Get/Set
```javascript
// Salvar
KaniuState.set('chave', valor);

// Buscar
const valor = KaniuState.get('chave');

// Múltiplos
KaniuState.update({
    'user.nome': 'João',
    'config.tema': 'dark'
});
```

### Cache
```javascript
// Salvar (5 min padrão)
KaniuState.setCache('chave', dados, 300000);

// Buscar
const cached = KaniuState.getCache('chave');
if (cached) {
    // Usa cache
} else {
    // Busca API
}

// Limpar
KaniuState.clearCache('chave');
```

### Filtros
```javascript
// Definir
KaniuState.setFilter('pagina_filtro', 'valor');

// Buscar
const filtro = KaniuState.getFilter('pagina_filtro');

// Todos
const allFilters = KaniuState.getAllFilters();

// Limpar
KaniuState.clearFilters();
```

### Subscribe (Observar)
```javascript
const unsubscribe = KaniuState.subscribe('user', (newVal, oldVal) => {
    console.log('Mudou:', newVal);
});

// Para de observar
unsubscribe();
```

### Persistência
```javascript
// Salvar no localStorage
KaniuState.saveToLocalStorage();

// Carregar (automático ao iniciar)
KaniuState.loadFromLocalStorage();
```

---

## 📄 Template de Página

### HTML Principal
```javascript
const cssVariables = $('CSS Variables').first().json.css;
const cssFontsBase = $('CSS Fonts Base').first().json.css;
const cssLayout = $('CSS Layout').first().json.css;
const cssComponents = $('CSS Components').first().json.css;
const cssSidebar = $('CSS Sidebar').first().json.css;
const cssUtilities = $('CSS Utilities').first().json.css;
const cssMinhaPage = $('Minha Page CSS').first().json.css;

const jsAPI = $('JS API Module').first().json.script;
const jsDOMHelpers = $('JS DOM Helpers').first().json.script;
const jsStateManager = $('JS State Manager').first().json.script;
const jsMinhaPage = $('Minha Page Script').first().json.script;

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha Página</title>
    ${cssVariables}
    ${cssFontsBase}
    ${cssLayout}
    ${cssComponents}
    ${cssSidebar}
    ${cssUtilities}
    ${cssMinhaPage}
</head>
<body>
    <!-- HTML aqui -->
    ${jsAPI}
    ${jsDOMHelpers}
    ${jsStateManager}
    ${jsMinhaPage}
</body>
</html>
`;
return { html };
```

### Script da Página
```javascript
const script = `
<script>
const MinhaPage = {
    config: {
        itemsPerPage: 50
    },

    data: {
        items: []
    },

    async init() {
        this.setupEventListeners();
        await this.loadData();
    },

    setupEventListeners() {
        // Event listeners aqui
    },

    async loadData() {
        try {
            const tbody = document.getElementById('tbody');
            KaniuDOM.renderLoading(tbody, 5);

            // Cache
            const cached = KaniuState.getCache('minha_chave');
            if (cached) {
                this.data.items = cached;
            } else {
                this.data.items = await KaniuAPI.getEventos();
                KaniuState.setCache('minha_chave', this.data.items);
            }

            this.render();
        } catch (error) {
            KaniuDOM.renderError(tbody, 5, error);
        }
    },

    render() {
        // Renderização aqui
    }
};

document.addEventListener('DOMContentLoaded', () => MinhaPage.init());
</script>
`;
return { script };
```

---

## 🎯 Padrão Try-Catch

```javascript
async carregarDados() {
    const tbody = document.getElementById('tbody');
    KaniuDOM.renderLoading(tbody, 5);

    try {
        const dados = await KaniuAPI.getEventos();
        this.render(dados);
    } catch (error) {
        console.error('Erro:', error);
        KaniuDOM.renderError(tbody, 5, error);
        KaniuDOM.showToast('Erro ao carregar', 'error');
    }
}
```

---

## 🔍 Debug Rápido

```javascript
// Ver estado atual
KaniuState.debug();

// Ver cache
console.log(KaniuState.get('cache'));

// Ver filtros
console.log(KaniuState.getAllFilters());

// Limpar tudo
KaniuState.reset();
KaniuState.clearCache();
```

---

## 🚨 Erros Comuns

### "KaniuAPI is not defined"
→ Esqueceu de importar: `${jsAPI}`

### "Cannot read property 'css' of undefined"
→ Nome do nó errado no n8n

### Estilos não aparecem
→ Ordem de importação CSS incorreta

### Cache não funciona
→ Verificar TTL e chave correta

---

## 📋 Checklist de Nova Página

- [ ] Criar CSS específico (se necessário)
- [ ] Criar Script separado
- [ ] Importar todos os módulos CSS globais
- [ ] Importar todos os módulos JS
- [ ] Usar `KaniuAPI` para chamadas HTTP
- [ ] Usar `KaniuDOM` para manipular DOM
- [ ] Usar `KaniuState` para estado/cache
- [ ] Implementar try-catch
- [ ] Testar loading/erro/vazio

---

**✨ Pronto para usar!**

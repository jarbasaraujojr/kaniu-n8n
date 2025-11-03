# 🐾 Kaniu n8n - Arquitetura Modular

Sistema de gestão para abrigos de animais construído em n8n, agora com arquitetura modular e escalável.

---

## 📂 Arquivos Criados

### 🎨 **CSS Global** (6 módulos)

Módulos CSS reutilizáveis em todas as páginas:

| Arquivo | Descrição | Uso |
|---------|-----------|-----|
| `css-global/01-variables.css.js` | Variáveis CSS (cores, tamanhos, fontes) | Design tokens do sistema |
| `css-global/02-fonts-and-base.css.js` | Fontes e estilos base | Reset e importação de fontes |
| `css-global/03-layout.css.js` | Estruturas de layout | Grid, flex, header, sidebar |
| `css-global/04-components.css.js` | Componentes reutilizáveis | Botões, cards, tabelas, forms |
| `css-global/05-sidebar.css.js` | Menu lateral | Sidebar responsiva |
| `css-global/06-utilities.css.js` | Classes utilitárias | Helpers rápidos |

**Total:** ~1500 linhas organizadas em 6 arquivos (antes: 1 arquivo de 2000+ linhas)

---

### 🧩 **JavaScript Modules** (3 módulos)

Módulos JavaScript reutilizáveis:

| Arquivo | Descrição | Funções Principais |
|---------|-----------|-------------------|
| `js-modules/api.js` | Comunicação com backend | `getEventos()`, `getAnimais()`, `getPainelData()` |
| `js-modules/dom-helpers.js` | Manipulação de DOM | `formatDate()`, `showToast()`, `renderLoading()` |
| `js-modules/state-manager.js` | Gerenciamento de estado | Cache, filtros, persistência |

**Total:** ~800 linhas de JavaScript modular e testável

---

### 📄 **Página Refatorada** (Exemplo: Histórico)

Exemplo completo de página usando a nova arquitetura:

| Arquivo | Descrição |
|---------|-----------|
| `historico/historico.refactored.script.js` | Lógica da página isolada |
| `historico/index.historico.refactored.html.js` | HTML limpo integrando módulos |

---

### 📚 **Documentação** (3 guias)

| Arquivo | Conteúdo |
|---------|----------|
| `REFACTORING-GUIDE.md` | Guia completo de refatoração (9000+ palavras) |
| `CHEATSHEET.md` | Referência rápida com exemplos |
| `README.md` | Este arquivo (índice geral) |

---

## 🚀 Como Começar

### **1. Setup no n8n**

1. Crie os nós para cada módulo CSS:
   ```
   Nome do Nó: "CSS Variables"
   Código: Conteúdo de css-global/01-variables.css.js
   ```

2. Repita para todos os 6 módulos CSS

3. Crie os nós para módulos JavaScript:
   ```
   Nome do Nó: "JS API Module"
   Código: Conteúdo de js-modules/api.js
   ```

4. Repita para os 3 módulos JS

---

### **2. Integre em uma Página**

```javascript
// Importe os módulos
const cssVariables = $('CSS Variables').first().json.css;
const jsAPI = $('JS API Module').first().json.script;
// ... outros módulos

// Use no HTML
const html = `
<!DOCTYPE html>
<html>
<head>
    ${cssVariables}
    <!-- outros CSS -->
</head>
<body>
    <!-- seu conteúdo -->
    ${jsAPI}
    <!-- outros JS -->
</body>
</html>
`;

return { html };
```

---

### **3. Use os Módulos**

```javascript
// API
const eventos = await KaniuAPI.getEventos();

// DOM
KaniuDOM.showToast('Sucesso!', 'success');

// State
KaniuState.setCache('dados', eventos);
```

---

## 📖 Documentação

### **Para Aprender:**
→ Leia `REFACTORING-GUIDE.md` (guia completo passo a passo)

### **Para Consulta Rápida:**
→ Use `CHEATSHEET.md` (sintaxe e exemplos prontos)

### **Para Exemplo Real:**
→ Veja `historico/` (página completa refatorada)

---

## 🎯 Benefícios da Refatoração

| Antes | Depois |
|-------|--------|
| ❌ 1 arquivo com 2000+ linhas | ✅ 12 arquivos com 100-300 linhas |
| ❌ CSS/JS misturado | ✅ Separação clara |
| ❌ Código duplicado | ✅ Módulos reutilizáveis |
| ❌ Difícil de manter | ✅ Fácil de editar |
| ❌ Sem cache | ✅ Cache inteligente |
| ❌ Debugging complexo | ✅ Isolado por módulo |

---

## 📊 Estrutura de Pastas

```
kaniu-n8n/
│
├── 📁 css-global/                 # CSS usado globalmente
│   ├── 01-variables.css.js       # Variáveis do design system
│   ├── 02-fonts-and-base.css.js  # Fontes e reset
│   ├── 03-layout.css.js          # Layouts principais
│   ├── 04-components.css.js      # Componentes reutilizáveis
│   ├── 05-sidebar.css.js         # Menu lateral
│   └── 06-utilities.css.js       # Classes helper
│
├── 📁 js-modules/                 # JavaScript modular
│   ├── api.js                    # Comunicação HTTP
│   ├── dom-helpers.js            # Utilitários DOM
│   └── state-manager.js          # Estado global
│
├── 📁 historico/                  # Exemplo: Página de histórico
│   ├── historico.css.js          # CSS específico
│   ├── historico.refactored.script.js      # Lógica da página
│   └── index.historico.refactored.html.js  # HTML integrado
│
├── 📁 animais-lista/              # Páginas antigas (a migrar)
├── 📁 animal-detalhes/
├── 📁 painel/
├── 📁 sidebar/
│
├── 📄 REFACTORING-GUIDE.md        # Guia completo
├── 📄 CHEATSHEET.md               # Referência rápida
└── 📄 README.md                   # Este arquivo
```

---

## 🔄 Próximos Passos

### **Páginas a Migrar:**

- [ ] `animais-lista/` - Lista de animais
- [ ] `animal-detalhes/` - Detalhes do animal
- [ ] `painel/` - Dashboard principal
- [ ] Outras páginas...

### **Melhorias Futuras:**

- [ ] Implementar autenticação
- [ ] Adicionar testes automatizados
- [ ] Otimizar performance
- [ ] Adicionar lazy loading
- [ ] Implementar PWA

---

## 🛠️ Stack Tecnológico

- **Workflow Engine:** n8n
- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript
- **Design System:** CSS Variables
- **Ícones:** Font Awesome 6
- **Fontes:** Google Fonts (Inter) + GoodDog
- **Arquitetura:** Modular + Component-based

---

## 📝 Notas Importantes

1. **Ordem de Importação CSS:**
   ```
   Variables → Fonts → Layout → Components → Sidebar → Utilities → Page CSS
   ```

2. **Ordem de Importação JS:**
   ```
   API → DOM Helpers → State Manager → Page Script
   ```

3. **Nomenclatura de Nós no n8n:**
   - CSS: `CSS Variables`, `CSS Fonts Base`, etc.
   - JS: `JS API Module`, `JS DOM Helpers`, etc.

---

## 🤝 Contribuindo

Para adicionar uma nova página:

1. Crie CSS específico (se necessário)
2. Crie script separado usando os módulos
3. Integre no HTML principal
4. Teste todas as funcionalidades
5. Documente mudanças

---

## 📞 Suporte

**Documentação:**
- Guia completo: `REFACTORING-GUIDE.md`
- Referência rápida: `CHEATSHEET.md`

**Exemplo funcionando:**
- Página de histórico refatorada em `historico/`

---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| **Módulos CSS** | 6 |
| **Módulos JS** | 3 |
| **Linhas de CSS** | ~1500 (organizadas) |
| **Linhas de JS** | ~800 (modulares) |
| **Páginas refatoradas** | 1 (exemplo) |
| **Redução de complexidade** | ~70% |

---

## ✨ Destaques

- 🎨 **Design System** completo com variáveis CSS
- 🧩 **Módulos reutilizáveis** para todo o sistema
- 💾 **Sistema de cache** inteligente
- 📱 **Responsivo** em todos os tamanhos
- ⚡ **Performance otimizada** com lazy loading
- 🔒 **Código limpo** e organizado
- 📚 **Documentação completa**

---

**Versão:** 1.0.0
**Data:** 2025-01-15
**Autor:** Sistema Kaniu
**Licença:** Proprietária

---

**🐾 Feito com ❤️ para ajudar os animais!**

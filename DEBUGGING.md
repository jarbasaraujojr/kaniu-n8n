# 🐛 Guia de Debugging - Kaniu

## Problema Identificado: 0 Eventos Retornados

### 🔍 Diagnóstico

Quando você vê no console:
```
🌐 Buscando eventos da API...
🔍 Filtro 'realizados': 0 eventos
✅ 0 eventos carregados
```

Isso significa que a API está respondendo, mas retornando um array vazio.

---

## 🛠️ Como Debugar

### **1. Verificar a Resposta da API**

Adicione este código temporariamente no arquivo `historico.refactored.script.js`:

```javascript
async carregarEventos() {
    const tbody = document.getElementById('eventos-tbody');
    // ... código existente ...

    try {
        // ... código existente ...
        this.data.todosEventos = await KaniuAPI.getEventos();

        // 🔍 DEBUG: Ver exatamente o que a API retornou
        console.log('📦 Dados retornados da API:', this.data.todosEventos);
        console.log('📊 Tipo:', typeof this.data.todosEventos);
        console.log('📊 É array?', Array.isArray(this.data.todosEventos));
        console.log('📊 Quantidade:', this.data.todosEventos?.length);

        // ... resto do código ...
    }
}
```

---

### **2. Verificar o Endpoint Diretamente**

Abra o console do navegador e execute:

```javascript
// Teste direto da API
const response = await fetch('https://karah-n8n.uzd6db.easypanel.host/webhook/canil-eventos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ canil_id: 1 })
});

const data = await response.json();
console.log('Resposta da API:', data);
```

---

### **3. Possíveis Causas**

#### **Causa 1: ID do Canil Incorreto**

A API está configurada com `canil_id: 1`. Verifique se este é o ID correto.

**Fix:**
```javascript
// Em js-modules/api.js, linha ~17
config: {
    baseURL: 'https://karah-n8n.uzd6db.easypanel.host',
    canilId: 14,  // ← Altere para o ID correto do seu canil
    timeout: 30000,
},
```

#### **Causa 2: Endpoint Incorreto**

Verifique se o endpoint está correto:

```javascript
// Em js-modules/api.js, linha ~22
endpoints: {
    eventos: '/webhook/canil-eventos',  // ← Verifique se é este mesmo
    // ...
},
```

#### **Causa 3: Estrutura de Resposta Diferente**

A API pode retornar os dados em um formato diferente. Adicione log:

```javascript
// Em js-modules/api.js, método getEventos()
async getEventos(filters = {}) {
    try {
        const data = await this.request(this.endpoints.eventos, {
            body: filters
        });

        // 🔍 DEBUG
        console.log('📦 Resposta bruta da API:', data);
        console.log('📦 Estrutura:', JSON.stringify(data, null, 2));

        // Normaliza resposta (pode vir em formatos diferentes)
        if (Array.isArray(data) && data[0]?.data) {
            return data[0].data;
        }
        return Array.isArray(data) ? data : [];
    }
}
```

---

## ✅ Soluções Rápidas

### **Solução 1: Testar com Dados Mockados**

Enquanto debugamos a API, adicione dados de teste:

```javascript
// Em historico.refactored.script.js
async carregarEventos() {
    const tbody = document.getElementById('eventos-tbody');
    KaniuDOM.renderLoading(tbody, 7);
    KaniuState.setLoading(true);

    try {
        // 🧪 DADOS DE TESTE (remover depois)
        const dadosTeste = [
            {
                registro_id: 1,
                data: '2025-01-15',
                tipo: 'Pesagem',
                nome_animal: 'Rex',
                descricao: 'Pesagem de rotina',
                nome_veterinario: 'Dr. João',
                clinica: 'Clínica Vet',
                concluido: true,
                atrasado: false,
                programado: false,
                data_exibicao: '2025-01-15'
            },
            {
                registro_id: 2,
                data: '2025-01-14',
                tipo: 'Vacinação',
                nome_animal: 'Luna',
                descricao: 'Vacina antirrábica',
                nome_veterinario: 'Dra. Maria',
                clinica: 'Pet Care',
                concluido: true,
                atrasado: false,
                programado: false,
                data_exibicao: '2025-01-14'
            }
        ];

        // Usa dados de teste por enquanto
        this.data.todosEventos = dadosTeste;

        // Quando a API estiver funcionando, descomente:
        // this.data.todosEventos = await KaniuAPI.getEventos();

        this.aplicarFiltro(this.config.currentFilter);
        console.log(`✅ ${this.data.todosEventos.length} eventos carregados`);

    } catch (error) {
        console.error('❌ Erro:', error);
        KaniuDOM.renderError(tbody, 7, error);
    } finally {
        KaniuState.setLoading(false);
    }
}
```

---

### **Solução 2: Verificar Permissões CORS**

Se você vir erro de CORS no console, o backend precisa adicionar headers:

```javascript
// No n8n, no nó que retorna a resposta, adicione:
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

### **Solução 3: Usar Proxy Local (Desenvolvimento)**

Se estiver testando localmente, pode usar um proxy:

```javascript
// Em js-modules/api.js
config: {
    baseURL: '/api-proxy',  // Proxy local
    // ou
    baseURL: 'http://localhost:5678/webhook',  // n8n local
}
```

---

## 📊 Checklist de Debugging

- [ ] Verificar ID do canil (linha 17 de `api.js`)
- [ ] Verificar endpoint correto (linha 22 de `api.js`)
- [ ] Testar endpoint diretamente no browser console
- [ ] Adicionar console.logs para ver resposta
- [ ] Verificar CORS no backend
- [ ] Testar com dados mockados primeiro
- [ ] Verificar se o n8n workflow está ativo

---

## 🔧 Comandos Úteis de Debug

```javascript
// No console do browser:

// 1. Ver configuração da API
console.log(KaniuAPI.config);

// 2. Testar endpoint manualmente
await KaniuAPI.getEventos();

// 3. Ver estado atual
KaniuState.debug();

// 4. Limpar cache e tentar novamente
KaniuState.clearCache();
await HistoricoPage.reload();

// 5. Ver dados carregados na página
console.log(HistoricoPage.data.todosEventos);
console.log(HistoricoPage.data.eventosFiltrados);
```

---

## 📞 Próximos Passos

1. **Execute os comandos de debug** acima
2. **Copie a saída do console** completa
3. **Me envie** para eu ajudar a diagnosticar

Ou, se preferir, **use dados de teste** (Solução 1) para testar a interface enquanto corrige a API.

---

## ✨ Quando a API Estiver Funcionando

Depois que identificar o problema:

1. Atualize o `canil_id` correto
2. Remova os dados de teste
3. Remova os console.logs de debug
4. Faça commit das correções

---

**Última atualização:** 2025-01-15

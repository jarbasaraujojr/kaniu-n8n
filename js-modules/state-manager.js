/**********************************************
/* Kaniu - Módulo JavaScript
/* State Manager - Gerenciamento de Estado
/*
/* Sistema simples de gerenciamento de estado
/* similar a Redux mas mais leve
/**********************************************/

const script = `
<script id="kaniu-state-manager">
/**
 * Gerenciador de estado global da aplicação
 * Permite compartilhar dados entre componentes
 */
const KaniuState = {
    // ===== ESTADO INICIAL =====
    state: {
        user: null,
        canil: null,
        currentPage: null,
        filters: {},
        cache: {},
        loading: false
    },

    // ===== LISTENERS =====
    listeners: {},

    /**
     * Obtém valor do estado
     * @param {string} key - Chave do estado
     * @returns {any}
     */
    get(key) {
        return key.split('.').reduce((obj, k) => obj?.[k], this.state);
    },

    /**
     * Define valor no estado
     * @param {string} key - Chave do estado
     * @param {any} value - Valor a definir
     * @param {boolean} notify - Notificar listeners
     */
    set(key, value, notify = true) {
        const keys = key.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, k) => {
            if (!obj[k]) obj[k] = {};
            return obj[k];
        }, this.state);

        const oldValue = target[lastKey];
        target[lastKey] = value;

        // Notifica listeners se mudou
        if (notify && oldValue !== value) {
            this.notify(key, value, oldValue);
        }
    },

    /**
     * Atualiza múltiplos valores
     * @param {object} updates - Objeto com updates
     */
    update(updates) {
        Object.entries(updates).forEach(([key, value]) => {
            this.set(key, value, false);
        });

        // Notifica todos de uma vez
        this.notifyAll();
    },

    /**
     * Reseta estado para valores iniciais
     */
    reset() {
        this.state = {
            user: null,
            canil: null,
            currentPage: null,
            filters: {},
            cache: {},
            loading: false
        };
        this.notifyAll();
    },

    /**
     * Registra listener para mudanças
     * @param {string} key - Chave a observar
     * @param {Function} callback - Função callback
     * @returns {Function} Função para remover listener
     */
    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }

        this.listeners[key].push(callback);

        // Retorna função para unsubscribe
        return () => {
            this.listeners[key] = this.listeners[key].filter(
                cb => cb !== callback
            );
        };
    },

    /**
     * Notifica listeners de uma chave específica
     * @param {string} key - Chave alterada
     * @param {any} newValue - Novo valor
     * @param {any} oldValue - Valor anterior
     */
    notify(key, newValue, oldValue) {
        const callbacks = this.listeners[key] || [];
        callbacks.forEach(callback => {
            try {
                callback(newValue, oldValue);
            } catch (error) {
                console.error(\`Erro no listener de '\${key}':\`, error);
            }
        });
    },

    /**
     * Notifica todos os listeners
     */
    notifyAll() {
        Object.entries(this.listeners).forEach(([key, callbacks]) => {
            const value = this.get(key);
            callbacks.forEach(callback => {
                try {
                    callback(value);
                } catch (error) {
                    console.error(\`Erro no listener de '\${key}':\`, error);
                }
            });
        });
    },

    // ===== CACHE =====

    /**
     * Salva no cache
     * @param {string} key - Chave
     * @param {any} data - Dados
     * @param {number} ttl - Tempo de vida em ms
     */
    setCache(key, data, ttl = 300000) { // 5 minutos padrão
        this.state.cache[key] = {
            data,
            timestamp: Date.now(),
            ttl
        };
    },

    /**
     * Busca do cache
     * @param {string} key - Chave
     * @returns {any|null}
     */
    getCache(key) {
        const cached = this.state.cache[key];

        if (!cached) return null;

        const age = Date.now() - cached.timestamp;

        // Cache expirado
        if (age > cached.ttl) {
            delete this.state.cache[key];
            return null;
        }

        return cached.data;
    },

    /**
     * Limpa cache
     * @param {string} key - Chave específica ou undefined para limpar tudo
     */
    clearCache(key) {
        if (key) {
            delete this.state.cache[key];
        } else {
            this.state.cache = {};
        }
    },

    // ===== LOADING =====

    /**
     * Define estado de loading
     * @param {boolean} loading - Estado
     */
    setLoading(loading) {
        this.set('loading', loading);
    },

    /**
     * Verifica se está loading
     * @returns {boolean}
     */
    isLoading() {
        return this.get('loading');
    },

    // ===== FILTROS =====

    /**
     * Define filtro
     * @param {string} key - Chave do filtro
     * @param {any} value - Valor
     */
    setFilter(key, value) {
        this.set(\`filters.\${key}\`, value);
    },

    /**
     * Obtém filtro
     * @param {string} key - Chave do filtro
     * @returns {any}
     */
    getFilter(key) {
        return this.get(\`filters.\${key}\`);
    },

    /**
     * Obtém todos os filtros
     * @returns {object}
     */
    getAllFilters() {
        return this.get('filters') || {};
    },

    /**
     * Limpa filtros
     */
    clearFilters() {
        this.set('filters', {});
    },

    // ===== PERSISTÊNCIA =====

    /**
     * Salva estado no localStorage
     * @param {string} key - Chave de armazenamento
     */
    saveToLocalStorage(key = 'kaniu_state') {
        try {
            const stateToSave = {
                user: this.state.user,
                canil: this.state.canil,
                filters: this.state.filters
            };

            localStorage.setItem(key, JSON.stringify(stateToSave));
        } catch (error) {
            console.error('Erro ao salvar estado:', error);
        }
    },

    /**
     * Carrega estado do localStorage
     * @param {string} key - Chave de armazenamento
     */
    loadFromLocalStorage(key = 'kaniu_state') {
        try {
            const saved = localStorage.getItem(key);

            if (saved) {
                const parsed = JSON.parse(saved);
                this.update(parsed);
            }
        } catch (error) {
            console.error('Erro ao carregar estado:', error);
        }
    },

    /**
     * Debug - Imprime estado atual
     */
    debug() {
        console.group('🐾 Kaniu State');
        console.log('Estado:', this.state);
        console.log('Listeners:', Object.keys(this.listeners));
        console.groupEnd();
    }
};

// Expõe globalmente
window.KaniuState = KaniuState;

// Auto-carrega estado salvo
KaniuState.loadFromLocalStorage();

console.log('✅ Kaniu State Manager carregado');
</script>
`;

return { script };

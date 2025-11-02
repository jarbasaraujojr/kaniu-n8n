/**********************************************
/* Kaniu - Módulo JavaScript
/* API - Comunicação com Backend
/*
/* Funções centralizadas para requisições HTTP
/**********************************************/

const script = `
<script id="kaniu-api-module">
/**
 * Módulo de comunicação com API do Kaniu
 * Centraliza todas as requisições HTTP
 */
const KaniuAPI = {
    // ===== CONFIGURAÇÃO =====
    config: {
        baseURL: 'https://karah-n8n.uzd6db.easypanel.host',
        canilId: 1,
        timeout: 30000, // 30 segundos
    },

    // ===== ENDPOINTS =====
    endpoints: {
        eventos: '/webhook/canil-eventos',
        painel: '/webhook/kaniu-pack-panel',
        animais: '/webhook/kaniu-animais',
        animalData: '/webhook/kaniu-animal-data-tables',
    },

    /**
     * Requisição HTTP genérica
     * @param {string} endpoint - URL do endpoint
     * @param {object} options - Opções da requisição
     * @returns {Promise<any>}
     */
    async request(endpoint, options = {}) {
        const url = this.config.baseURL + endpoint;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const config = {
            method: options.method || 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...options.headers
            },
            signal: controller.signal,
            credentials: options.credentials || 'same-origin',
            ...options
        };

        // Adiciona body para POST/PUT
        if (['POST', 'PUT'].includes(config.method) && options.body) {
            config.body = JSON.stringify({
                canil_id: this.config.canilId,
                ...options.body
            });
        }

        try {
            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('Requisição excedeu o tempo limite');
            }

            console.error('API Error:', error);
            throw error;
        }
    },

    /**
     * Busca eventos do canil
     * @param {object} filters - Filtros opcionais
     * @returns {Promise<Array>}
     */
    async getEventos(filters = {}) {
        try {
            const data = await this.request(this.endpoints.eventos, {
                body: filters
            });

            // Normaliza resposta (pode vir em formatos diferentes)
            if (Array.isArray(data) && data[0]?.data) {
                return data[0].data;
            }
            return Array.isArray(data) ? data : [];

        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            throw error;
        }
    },

    /**
     * Busca dados do painel/dashboard
     * @returns {Promise<object>}
     */
    async getPainelData() {
        try {
            const data = await this.request(this.endpoints.painel);

            // Normaliza resposta
            return Array.isArray(data) ? data[0] || {} : data;

        } catch (error) {
            console.error('Erro ao buscar dados do painel:', error);
            throw error;
        }
    },

    /**
     * Busca lista de animais
     * @param {string} status - Status dos animais (Abrigado, Adotado, etc)
     * @returns {Promise<Array>}
     */
    async getAnimais(status = 'Abrigado') {
        try {
            const data = await this.request(this.endpoints.animais, {
                body: { status }
            });

            // Normaliza resposta
            if (data?.animals) return data.animals;
            if (Array.isArray(data)) return data;
            return [];

        } catch (error) {
            console.error('Erro ao buscar animais:', error);
            throw error;
        }
    },

    /**
     * Busca detalhes de um animal específico
     * @param {string} animalId - ID do animal
     * @returns {Promise<object>}
     */
    async getAnimalDetails(animalId) {
        try {
            const data = await this.request(this.endpoints.animais, {
                body: { animal_id: animalId }
            });

            return data;

        } catch (error) {
            console.error('Erro ao buscar detalhes do animal:', error);
            throw error;
        }
    },

    /**
     * Busca opções de data tables (raças, cores, etc)
     * @param {string} table - Nome da tabela
     * @returns {Promise<Array>}
     */
    async getDataTableOptions(table) {
        try {
            const data = await this.request(this.endpoints.animalData, {
                body: { table }
            });

            return Array.isArray(data) ? data : [];

        } catch (error) {
            console.error('Erro ao buscar opções da tabela:', error);
            throw error;
        }
    },

    /**
     * Define o ID do canil
     * @param {number} canilId
     */
    setCanilId(canilId) {
        this.config.canilId = canilId;
    },

    /**
     * Define a URL base
     * @param {string} baseURL
     */
    setBaseURL(baseURL) {
        this.config.baseURL = baseURL;
    }
};

// Expõe globalmente para uso fácil
window.KaniuAPI = KaniuAPI;

console.log('✅ Kaniu API Module carregado');
</script>
`;

return { script };

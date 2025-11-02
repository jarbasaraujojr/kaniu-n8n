/**********************************************
/* Kaniu - Página de Histórico
/* Script Refatorado e Modular
/*
/* Usa os módulos KaniuAPI, KaniuDOM e KaniuState
/**********************************************/

const script = `
<script id="historico-page-script">
/**
 * Página de Histórico - Lógica isolada e modular
 * Depende de: KaniuAPI, KaniuDOM, KaniuState
 */
const HistoricoPage = {
    // ===== CONFIGURAÇÃO =====
    config: {
        itemsPerPage: 50,
        currentPage: 1,
        currentFilter: 'realizados'
    },

    // ===== DADOS =====
    data: {
        todosEventos: [],
        eventosFiltrados: []
    },

    // ===== ÍCONES POR TIPO =====
    tipoIcons: {
        'Pesagem': 'fa-weight-scale',
        'Internação': 'fa-hospital',
        'Vermifugação': 'fa-pills',
        'Observação': 'fa-eye',
        'Vacinação': 'fa-syringe',
        'Consulta': 'fa-stethoscope',
        'Cirurgia': 'fa-user-doctor',
        'Exame': 'fa-flask',
        'Banho': 'fa-shower',
        'Tosa': 'fa-scissors',
        'Castração': 'fa-scissors',
        'Adoção': 'fa-heart'
    },

    // ===== TÍTULOS DAS ABAS =====
    tabTitles: {
        'realizados': 'Eventos Realizados',
        'programados': 'Eventos Programados',
        'atrasados': 'Eventos Atrasados'
    },

    /**
     * Inicializa a página
     */
    async init() {
        console.log('🔄 Inicializando página de histórico...');

        this.setupEventListeners();
        this.loadFromState();
        await this.carregarEventos();

        console.log('✅ Página de histórico inicializada');
    },

    /**
     * Carrega estado salvo (filtro, página)
     */
    loadFromState() {
        const savedFilter = KaniuState.getFilter('historico_filter');
        const savedPage = KaniuState.getFilter('historico_page');

        if (savedFilter) {
            this.config.currentFilter = savedFilter;
        }

        if (savedPage) {
            this.config.currentPage = savedPage;
        }
    },

    /**
     * Salva estado atual
     */
    saveToState() {
        KaniuState.setFilter('historico_filter', this.config.currentFilter);
        KaniuState.setFilter('historico_page', this.config.currentPage);
    },

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Tabs de filtro
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.aplicarFiltro(tab);
            });
        });

        // Paginação
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevPage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
    },

    /**
     * Carrega eventos da API
     */
    async carregarEventos() {
        const tbody = document.getElementById('eventos-tbody');

        if (!tbody) {
            console.error('Elemento tbody não encontrado');
            return;
        }

        // Mostra loading
        KaniuDOM.renderLoading(tbody, 7);
        KaniuState.setLoading(true);

        try {
            // Tenta buscar do cache primeiro
            const cacheKey = 'historico_eventos';
            const cached = KaniuState.getCache(cacheKey);

            if (cached) {
                console.log('📦 Usando dados do cache');
                this.data.todosEventos = cached;
            } else {
                console.log('🌐 Buscando eventos da API...');
                this.data.todosEventos = await KaniuAPI.getEventos();

                // Salva no cache (5 minutos)
                KaniuState.setCache(cacheKey, this.data.todosEventos, 300000);
            }

            // Aplica filtro e renderiza
            this.aplicarFiltro(this.config.currentFilter);

            console.log(\`✅ \${this.data.todosEventos.length} eventos carregados\`);

        } catch (error) {
            console.error('❌ Erro ao carregar eventos:', error);
            KaniuDOM.renderError(tbody, 7, error);
        } finally {
            KaniuState.setLoading(false);
        }
    },

    /**
     * Aplica filtro baseado na aba
     * @param {string} tipo - Tipo de filtro (realizados, programados, atrasados)
     */
    aplicarFiltro(tipo) {
        this.config.currentFilter = tipo;
        this.config.currentPage = 1;

        // Atualiza botões ativos
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tipo) {
                btn.classList.add('active');
            }
        });

        // Atualiza título
        const titleEl = document.getElementById('table-title');
        if (titleEl) {
            titleEl.textContent = this.tabTitles[tipo] || 'Eventos';
        }

        // Filtra dados
        this.data.eventosFiltrados = this.data.todosEventos.filter(evento => {
            if (tipo === 'realizados') {
                return evento.concluido && !evento.atrasado;
            } else if (tipo === 'programados') {
                return evento.programado || (!evento.concluido && !evento.atrasado);
            } else if (tipo === 'atrasados') {
                return evento.atrasado;
            }
            return false;
        });

        // Ordena por data (mais recente primeiro)
        this.data.eventosFiltrados.sort((a, b) => {
            const dataA = new Date(a.data_exibicao || a.data);
            const dataB = new Date(b.data_exibicao || b.data);
            return dataB - dataA;
        });

        console.log(\`🔍 Filtro '\${tipo}': \${this.data.eventosFiltrados.length} eventos\`);

        // Salva estado e renderiza
        this.saveToState();
        this.renderizarTabela();
    },

    /**
     * Renderiza tabela com paginação
     */
    renderizarTabela() {
        const tbody = document.getElementById('eventos-tbody');

        if (!tbody) return;

        const totalPages = Math.ceil(
            this.data.eventosFiltrados.length / this.config.itemsPerPage
        );

        // Atualiza informações
        this.atualizarInfo(totalPages);

        // Se não há eventos
        if (this.data.eventosFiltrados.length === 0) {
            KaniuDOM.renderEmptyTable(tbody, 7, 'Nenhum evento encontrado nesta categoria');
            return;
        }

        // Calcula items da página atual
        const startIdx = (this.config.currentPage - 1) * this.config.itemsPerPage;
        const endIdx = startIdx + this.config.itemsPerPage;
        const pageItems = this.data.eventosFiltrados.slice(startIdx, endIdx);

        // Renderiza linhas
        tbody.innerHTML = pageItems.map(evento => this.renderEventoRow(evento)).join('');
    },

    /**
     * Renderiza linha da tabela para um evento
     * @param {object} evento - Dados do evento
     * @returns {string} HTML da linha
     */
    renderEventoRow(evento) {
        const data = evento.data_exibicao || evento.data;
        const dataFormatada = KaniuDOM.formatDate(data);
        const icon = this.tipoIcons[evento.tipo] || 'fa-circle';
        const statusClass = evento.atrasado ? 'status-atrasado' :
                           evento.concluido ? 'status-concluido' :
                           'status-programado';

        return \`
            <tr class="\${statusClass}">
                <td class="date-col">\${dataFormatada}</td>
                <td class="animal-col">\${evento.nome_animal || '-'}</td>
                <td class="tipo-col">
                    <i class="fa-solid \${icon}"></i>
                    \${evento.tipo || '-'}
                </td>
                <td class="desc-col" title="\${evento.descricao || '-'}">
                    \${evento.descricao || '-'}
                </td>
                <td>\${evento.nome_veterinario || '-'}</td>
                <td>\${evento.clinica || '-'}</td>
                <td class="actions-col">
                    <button
                        class="btn-action"
                        title="Ver detalhes"
                        onclick="HistoricoPage.verDetalhes(\${evento.registro_id})">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </td>
            </tr>
        \`;
    },

    /**
     * Atualiza informações da tabela (contadores, paginação)
     * @param {number} totalPages - Total de páginas
     */
    atualizarInfo(totalPages) {
        // Contador de registros
        const countEl = document.getElementById('records-count');
        if (countEl) {
            const count = this.data.eventosFiltrados.length;
            countEl.textContent = \`\${count} registro\${count !== 1 ? 's' : ''}\`;
        }

        // Paginação
        const currentPageEl = document.getElementById('current-page');
        const totalPagesEl = document.getElementById('total-pages');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');

        if (currentPageEl) currentPageEl.textContent = this.config.currentPage;
        if (totalPagesEl) totalPagesEl.textContent = totalPages || 1;
        if (prevBtn) prevBtn.disabled = this.config.currentPage <= 1;
        if (nextBtn) nextBtn.disabled = this.config.currentPage >= totalPages;
    },

    /**
     * Vai para página anterior
     */
    prevPage() {
        if (this.config.currentPage > 1) {
            this.config.currentPage--;
            this.saveToState();
            this.renderizarTabela();
            KaniuDOM.scrollTo('.table-card');
        }
    },

    /**
     * Vai para próxima página
     */
    nextPage() {
        const totalPages = Math.ceil(
            this.data.eventosFiltrados.length / this.config.itemsPerPage
        );

        if (this.config.currentPage < totalPages) {
            this.config.currentPage++;
            this.saveToState();
            this.renderizarTabela();
            KaniuDOM.scrollTo('.table-card');
        }
    },

    /**
     * Mostra detalhes de um evento
     * @param {number} registroId - ID do registro
     */
    verDetalhes(registroId) {
        console.log('Ver detalhes do evento:', registroId);

        // TODO: Implementar modal de detalhes
        KaniuDOM.showToast(\`Detalhes do evento #\${registroId}\`, 'info');
    },

    /**
     * Recarrega eventos (força busca da API)
     */
    async reload() {
        // Limpa cache
        KaniuState.clearCache('historico_eventos');

        // Recarrega
        await this.carregarEventos();

        KaniuDOM.showToast('Dados atualizados', 'success');
    }
};

// Expõe globalmente para uso em onclick
window.HistoricoPage = HistoricoPage;

// Inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HistoricoPage.init());
} else {
    HistoricoPage.init();
}

console.log('✅ Script da página de histórico carregado');
</script>
`;

return { script };

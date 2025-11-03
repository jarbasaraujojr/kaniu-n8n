/**********************************************
/* Kaniu - Módulo JavaScript
/* DOM Helpers - Manipulação de DOM
/*
/* Funções utilitárias para manipular o DOM
/**********************************************/

const script = `
<script id="kaniu-dom-helpers">
/**
 * Módulo de helpers para manipulação de DOM
 * Funções reutilizáveis para operações comuns
 */
const KaniuDOM = {
    /**
     * Renderiza tabela vazia
     * @param {HTMLElement} tbody - Elemento tbody
     * @param {number} colspan - Número de colunas
     * @param {string} message - Mensagem a exibir
     */
    renderEmptyTable(tbody, colspan, message = 'Nenhum dado encontrado') {
        if (!tbody) return;

        tbody.innerHTML = \`
            <tr>
                <td colspan="\${colspan}" class="empty-message">
                    <i class="fa-solid fa-inbox"></i>
                    \${message}
                </td>
            </tr>
        \`;
    },

    /**
     * Renderiza estado de loading
     * @param {HTMLElement} tbody - Elemento tbody
     * @param {number} colspan - Número de colunas
     */
    renderLoading(tbody, colspan) {
        if (!tbody) return;

        tbody.innerHTML = \`
            <tr>
                <td colspan="\${colspan}" class="empty-message">
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Carregando...
                </td>
            </tr>
        \`;
    },

    /**
     * Renderiza mensagem de erro
     * @param {HTMLElement} tbody - Elemento tbody
     * @param {number} colspan - Número de colunas
     * @param {Error|string} error - Erro ou mensagem
     */
    renderError(tbody, colspan, error) {
        if (!tbody) return;

        const message = typeof error === 'string'
            ? error
            : (error?.message || 'Erro ao carregar dados');

        tbody.innerHTML = \`
            <tr>
                <td colspan="\${colspan}" class="empty-message error-message">
                    <i class="fa-solid fa-exclamation-circle"></i>
                    \${message}
                </td>
            </tr>
        \`;
    },

    /**
     * Formata data para padrão brasileiro
     * @param {string|Date} dateString - Data a formatar
     * @returns {string}
     */
    formatDate(dateString) {
        if (!dateString) return '-';

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';

            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return '-';
        }
    },

    /**
     * Formata data e hora
     * @param {string|Date} dateString - Data a formatar
     * @returns {string}
     */
    formatDateTime(dateString) {
        if (!dateString) return '-';

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';

            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Erro ao formatar data/hora:', error);
            return '-';
        }
    },

    /**
     * Calcula diferença em dias entre duas datas
     * @param {string|Date} date1 - Data inicial
     * @param {string|Date} date2 - Data final (padrão: hoje)
     * @returns {number}
     */
    daysDifference(date1, date2 = new Date()) {
        try {
            const d1 = new Date(date1);
            const d2 = new Date(date2);

            const diffTime = Math.abs(d2 - d1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays;
        } catch (error) {
            console.error('Erro ao calcular diferença de dias:', error);
            return 0;
        }
    },

    /**
     * Mostra toast/alerta
     * @param {string} message - Mensagem
     * @param {string} type - Tipo (success, error, info)
     * @param {number} duration - Duração em ms
     */
    showToast(message, type = 'success', duration = 3000) {
        // Remove toasts existentes
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        // Cria novo toast
        const toast = document.createElement('div');
        toast.className = \`toast toast-\${type}\`;

        const icon = type === 'success' ? 'check-circle' :
                     type === 'error' ? 'exclamation-circle' :
                     'info-circle';

        toast.innerHTML = \`
            <i class="fa-solid fa-\${icon}"></i>
            <span>\${message}</span>
        \`;

        document.body.appendChild(toast);

        // Anima entrada
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove após duração
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Mostra/oculta overlay
     * @param {boolean} show - Mostrar ou ocultar
     */
    toggleOverlay(show = true) {
        const overlay = document.getElementById('overlay') ||
                       document.querySelector('.overlay');

        if (overlay) {
            overlay.style.display = show ? 'block' : 'none';
        }
    },

    /**
     * Mostra/oculta popup
     * @param {string} popupId - ID do popup
     * @param {boolean} show - Mostrar ou ocultar
     */
    togglePopup(popupId, show = true) {
        const popup = document.getElementById(popupId);

        if (popup) {
            popup.style.display = show ? 'flex' : 'none';
            this.toggleOverlay(show);
        }
    },

    /**
     * Debounce - Limita frequência de execução de função
     * @param {Function} func - Função a executar
     * @param {number} wait - Tempo de espera em ms
     * @returns {Function}
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle - Garante execução em intervalos
     * @param {Function} func - Função a executar
     * @param {number} limit - Intervalo em ms
     * @returns {Function}
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Sanitiza HTML para prevenir XSS
     * @param {string} str - String a sanitizar
     * @returns {string}
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Formata número com separadores
     * @param {number} num - Número
     * @param {number} decimals - Casas decimais
     * @returns {string}
     */
    formatNumber(num, decimals = 0) {
        if (num == null) return '-';

        return Number(num).toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Copia texto para clipboard
     * @param {string} text - Texto a copiar
     * @returns {Promise<boolean>}
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Copiado para área de transferência', 'success');
            return true;
        } catch (error) {
            console.error('Erro ao copiar:', error);
            this.showToast('Erro ao copiar', 'error');
            return false;
        }
    },

    /**
     * Rola até elemento
     * @param {string|HTMLElement} element - Seletor ou elemento
     * @param {object} options - Opções de scroll
     */
    scrollTo(element, options = {}) {
        const el = typeof element === 'string'
            ? document.querySelector(element)
            : element;

        if (el) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                ...options
            });
        }
    }
};

// Expõe globalmente
window.KaniuDOM = KaniuDOM;

console.log('✅ Kaniu DOM Helpers carregado');
</script>
`;

return { script };

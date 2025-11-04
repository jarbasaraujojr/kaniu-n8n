/**********************************************
/* Kaniu - CSS Global
/* 04 - Componentes Reutilizáveis
/*
/* Botões, cards, chips, tabelas e outros
/* componentes usados em todo o sistema
/**********************************************/

const css = `
<style id="kaniu-components">
/* ==========================================================================
   BOTÕES
   ========================================================================== */
.btn,
.detail-button,
.quick-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--button-padding);
    border-radius: var(--button-border-radius);
    font-weight: 600;
    font-size: var(--button-font-size);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
    gap: 0.5rem;
}

.btn-primary,
.quick-action {
    background: var(--primary-color);
    color: var(--card-background);
}

.btn-primary:hover,
.quick-action:hover {
    background: color-mix(in srgb, var(--primary-color) 85%, black 15%);
    transform: translateY(-1px);
}

.detail-button {
    background-color: var(--background-soft);
    border: 1px solid transparent;
    color: var(--text-dark);
}

.detail-button:hover {
    background-color: var(--primary-color);
    color: var(--card-background);
    border-color: var(--primary-color);
    transform: translateY(-1px);
}

.btn-action,
.icon-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--text-dark);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
}

.btn-action:hover,
.icon-button:not(.delete-button):hover {
    color: var(--primary-color);
    background: var(--background-soft);
}

.icon-button.delete-button i {
    color: #bbb !important;
}

.icon-button.delete-button:hover i {
    color: var(--warning-color) !important;
}

/* ==========================================================================
   CARDS
   ========================================================================== */
.card {
    background: var(--card-background);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-lg);
    padding: 1.5rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
}

.card header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
}

.card header h2 {
    margin: 0;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
    color: var(--text-dark);
}

/* ==========================================================================
   CHIPS / TAGS
   ========================================================================== */
.chip,
.tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-soft);
    color: var(--primary-color);
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    padding: 0.6rem 0.7rem;
    line-height: 1;
    cursor: default;
    transition: all var(--transition-normal);
    white-space: nowrap;
}

.chip.is-empty {
    background: var(--primary-soft);
    color: var(--text-light);
}

.chip.is-action {
    background: var(--primary-soft);
    color: var(--primary-color);
    cursor: pointer;
    border: 1px solid var(--primary-color);
}

.chip.is-action:hover {
    background: var(--primary-color);
    color: #FFF;
    transform: translateY(-1px);
}

/* ==========================================================================
   TABELAS
   ========================================================================== */
.table-card {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 0;
    background: var(--card-background);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
}

.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: var(--background-soft);
    border-bottom: 1px solid var(--border-color);
}

.table-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    color: var(--text-dark);
}

.table-title i {
    color: var(--primary-color);
}

.table-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
    min-height: 0;
}

table,
.table {
    border-collapse: collapse;
    width: 100%;
    min-width: 520px;
}

th,
td {
    text-align: left;
    padding: 0.85rem 1rem;
    font-size: 0.875rem;
    color: var(--text-dark);
}

th {
    position: sticky;
    top: 0;
    background: var(--background-soft);
    z-index: 2;
    text-transform: uppercase;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--text-light);
    font-weight: 600;
    border-bottom: 2px solid var(--border-color);
}

td {
    border-bottom: 1px solid var(--border-color);
}

tbody tr {
    transition: background var(--transition-fast);
}

tbody tr:hover {
    background: var(--background-light);
}

.table-col-long {
    min-width: 220px;
}

/* ==========================================================================
   TABS
   ========================================================================== */
.tab-nav {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding: 0 1.75rem 0;
    margin: 0;
}

.tab-btn {
    border: none;
    background: transparent;
    padding: 0.6rem 0.9rem;
    border-radius: var(--radius-md);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: var(--text-light);
    cursor: pointer;
    transition: color var(--transition-fast),
                background var(--transition-fast),
                transform var(--transition-fast);
}

.tab-btn:hover {
    color: var(--primary-color);
    background: var(--card-background);
    transform: translateY(-1px);
}

.tab-btn.active {
    background: var(--primary-color);
    color: #ffffff;
    box-shadow: var(--shadow-md);
}

.tab-btn.active:hover i {
    color: #ffffff;
}

/* ==========================================================================
   NAVBAR FIXA (TOP)
   ========================================================================== */
/* Navbar fixa no topo - ocupa toda largura exceto sidebar */
.top-navbar {
    position: fixed;
    top: 0;
    left: 240px; /* Largura da sidebar */
    right: 0;
    height: 57px; /* Altura do header da sidebar: 12px + 32px + 12px + 1px */
    background: var(--card-background);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    z-index: 100;
}

/* Conteúdo da navbar */
.top-navbar-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Ajustar main para ter espaçamento no topo (compensar navbar fixa) */
.main-with-sidebar main {
    padding-top: 57px; /* Mesma altura da navbar */
}

/* Ajustar content-grid para ter espaçamento correto */
.content-grid {
    padding-top: 0;
}

/* ==========================================================================
   POP-UPS / MODALS
   ========================================================================== */
.pop-up-menu,
.pop-up-animais {
    width: min(90vw, 450px);
    max-height: 80vh;
    height: auto;
    display: none;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--card-background);
    border-radius: var(--radius-lg);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25);
    z-index: var(--z-modal);
}

.pop-up-menu h2 {
    margin: 20px 0 10px 0;
    font-size: 1rem;
    color: var(--primary-color);
    text-align: center;
}

.pop-up-close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-faded);
    transition: color var(--transition-fast);
}

.pop-up-close:hover {
    color: var(--text-dark);
}

.pop-up-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
    flex-wrap: wrap;
}

.pop-up-actions .confirm-button,
.pop-up-actions .cancel-button,
.pop-up-actions .action-button {
    padding: var(--button-padding);
    font-size: var(--button-font-size);
    border-radius: var(--button-border-radius);
    border: none;
    cursor: pointer;
    flex: 1;
    max-width: 120px;
    font-weight: 600;
    transition: all var(--transition-normal);
}

.pop-up-actions .confirm-button,
.pop-up-actions .action-button {
    background-color: var(--primary-color);
    color: var(--card-background);
}

.pop-up-actions .confirm-button:hover,
.pop-up-actions .action-button:hover {
    background-color: var(--primary-strong);
    transform: translateY(-1px);
}

.pop-up-actions .cancel-button {
    background-color: var(--background-light);
    color: var(--primary-color);
}

.pop-up-actions .cancel-button:hover {
    background-color: var(--primary-color);
    color: var(--card-background);
}

/* ==========================================================================
   FORM INPUTS
   ========================================================================== */
.pop-up-menu label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-light);
    margin-bottom: 4px;
}

.pop-up-menu input,
.pop-up-menu select,
.pop-up-menu textarea,
.date-input {
    background-color: var(--background-soft);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: var(--text-dark);
    font-size: 0.9rem;
    padding: 10px 15px;
    box-sizing: border-box;
    width: 100%;
    transition: border-color var(--transition-normal),
                box-shadow var(--transition-normal);
}

.pop-up-menu input:focus,
.pop-up-menu select:focus,
.pop-up-menu textarea:focus,
.date-input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-soft);
    outline: none;
}

/* ==========================================================================
   MENSAGENS
   ========================================================================== */
.empty-message,
.no-results {
    text-align: center;
    color: var(--text-faded);
    font-size: 0.9rem;
    margin: 2rem 0;
    padding: 2rem 1rem;
}

.empty-message i {
    display: block;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    opacity: 0.5;
}

.error-message {
    color: var(--warning-color) !important;
}

/* ==========================================================================
   TOAST / ALERTAS
   ========================================================================== */
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card-background);
    color: var(--text-dark);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-xl);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    opacity: 0;
    transform: translateY(-20px);
    transition: all var(--transition-normal);
    z-index: var(--z-tooltip);
}

.toast.show {
    opacity: 1;
    transform: translateY(0);
}

.toast-success {
    border-left: 4px solid var(--success-color);
}

.toast-error {
    border-left: 4px solid var(--warning-color);
}

.toast i {
    font-size: 1.25rem;
}

.toast-success i {
    color: var(--success-color);
}

.toast-error i {
    color: var(--warning-color);
}

/* ==========================================================================
   RESPONSIVIDADE
   ========================================================================== */
@media (max-width: 768px) {
    .chip {
        font-size: 0.72rem;
        padding: 0.4rem 0.8rem;
    }

    .tab-btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
    }

    th, td {
        padding: 0.65rem 0.75rem;
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .pop-up-menu {
        width: 95vw;
    }

    .tab-btn {
        padding: 0.45rem 0.65rem;
        font-size: 0.75rem;
    }
}
</style>
`;

return { css };

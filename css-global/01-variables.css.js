/**********************************************
/* Kaniu - CSS Global
/* 01 - Variáveis CSS (Design Tokens)
/*
/* Este arquivo contém todas as variáveis CSS
/* usadas em todo o sistema.
/**********************************************/

const css = `
<style id="kaniu-variables">
/* ==========================================================================
   VARIÁVEIS CSS (ROOT) - Design System
   ========================================================================== */
:root {
    /* ===== CORES PRINCIPAIS ===== */
    --primary-color: #5A5D7F;
    --primary-background: #5A5D7FA0;
    --primary-soft: #5A5D7F10;
    --primary-strong: #5A5D7FAA;

    /* ===== CORES DE FUNDO ===== */
    --background-light: #EEF2F9;
    --background-soft: #F5F6FB;
    --card-background: #FFFFFF;

    /* ===== CORES DE TEXTO ===== */
    --text-dark: #372D1F;
    --text-light: #6B7280;
    --text-faded: #A0A6B5;

    /* ===== CORES DE ALERTA ===== */
    --warning-color: #C62828;
    --success-color: #10B981;
    --info-color: #3B82F6;

    /* ===== BORDAS ===== */
    --border-color: #E5E7F2;

    /* ===== RAIOS DE BORDA ===== */
    --radius-lg: 18px;
    --radius-md: 12px;
    --radius-sm: 6px;

    /* ===== ESPAÇAMENTOS ===== */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;

    /* ===== FONTES ===== */
    --font-family-base: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-family-display: 'GoodDog', 'Inter', sans-serif;

    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 2rem;

    /* ===== PESOS DE FONTE ===== */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    /* ===== TRANSIÇÕES ===== */
    --transition-fast: 120ms ease;
    --transition-normal: 200ms ease;
    --transition-slow: 300ms ease;

    /* ===== SOMBRAS ===== */
    --shadow-sm: 0 2px 5px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 8px 18px rgba(90, 93, 127, 0.18);
    --shadow-lg: 0 15px 45px rgba(15, 23, 42, 0.05);
    --shadow-xl: 0 20px 60px rgba(15, 23, 42, 0.12);

    /* ===== Z-INDEX ===== */
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-overlay: 300;
    --z-modal: 400;
    --z-tooltip: 500;

    /* ===== BOTÕES ===== */
    --button-padding: 6px 12px;
    --button-font-size: 0.85rem;
    --button-border-radius: 6px;

    /* ===== TABS/TOOLBAR ===== */
    --tab-toolbar-h: 44px;
    --tab-content-pt: 20px;
    --tab-header-offset: var(--tab-content-pt);
}

/* Ajuste de Altura da Toolbar para Telas Menores */
@media (max-width: 768px) {
    :root {
        --tab-toolbar-h: 52px;
    }
}

/* ===== MODO ESCURO (DESABILITADO - forçar modo claro) ===== */
/*
@media (prefers-color-scheme: dark) {
    :root {
        --background-light: #0F172A;
        --background-soft: #1E293B;
        --card-background: #1E293B;
        --text-dark: #E2E8F0;
        --text-light: #94A3B8;
        --text-faded: #64748B;
        --border-color: #334155;
    }
}
*/
</style>
`;

return { css };

/**********************************************
/* Kaniu - CSS Global
/* 06 - Classes Utilitárias
/*
/* Classes helper para uso rápido
/**********************************************/

const css = `
<style id="kaniu-utilities">
/* ==========================================================================
   ESPAÇAMENTOS
   ========================================================================== */
.m-0 { margin: 0; }
.mt-1 { margin-top: var(--spacing-sm); }
.mt-2 { margin-top: var(--spacing-md); }
.mt-3 { margin-top: var(--spacing-lg); }

.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.mb-3 { margin-bottom: var(--spacing-lg); }

.p-0 { padding: 0; }
.p-1 { padding: var(--spacing-sm); }
.p-2 { padding: var(--spacing-md); }
.p-3 { padding: var(--spacing-lg); }

/* ==========================================================================
   DISPLAY
   ========================================================================== */
.d-none { display: none !important; }
.d-block { display: block !important; }
.d-flex { display: flex !important; }
.d-inline-flex { display: inline-flex !important; }
.d-grid { display: grid !important; }

/* ==========================================================================
   FLEXBOX
   ========================================================================== */
.flex-column { flex-direction: column; }
.flex-row { flex-direction: row; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.align-center { align-items: center; }
.align-start { align-items: flex-start; }
.align-end { align-items: flex-end; }
.flex-wrap { flex-wrap: wrap; }
.gap-1 { gap: var(--spacing-sm); }
.gap-2 { gap: var(--spacing-md); }
.gap-3 { gap: var(--spacing-lg); }

/* ==========================================================================
   TEXTO
   ========================================================================== */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }

.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

.text-primary { color: var(--primary-color); }
.text-dark { color: var(--text-dark); }
.text-light { color: var(--text-light); }
.text-faded { color: var(--text-faded); }
.text-warning { color: var(--warning-color); }
.text-success { color: var(--success-color); }

/* ==========================================================================
   CORES DE FUNDO
   ========================================================================== */
.bg-primary { background-color: var(--primary-color); }
.bg-light { background-color: var(--background-light); }
.bg-soft { background-color: var(--background-soft); }
.bg-white { background-color: var(--card-background); }

/* ==========================================================================
   BORDAS
   ========================================================================== */
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-full { border-radius: 9999px; }

.border { border: 1px solid var(--border-color); }
.border-0 { border: none; }

/* ==========================================================================
   SOMBRAS
   ========================================================================== */
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }
.shadow-none { box-shadow: none; }

/* ==========================================================================
   LARGURA E ALTURA
   ========================================================================== */
.w-full { width: 100%; }
.h-full { height: 100%; }
.min-h-0 { min-height: 0; }

/* ==========================================================================
   OVERFLOW
   ========================================================================== */
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.overflow-y-auto { overflow-y: auto; }
.overflow-x-auto { overflow-x: auto; }

/* ==========================================================================
   POSITION
   ========================================================================== */
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }

/* ==========================================================================
   CURSOR
   ========================================================================== */
.cursor-pointer { cursor: pointer; }
.cursor-default { cursor: default; }
.cursor-not-allowed { cursor: not-allowed; }

/* ==========================================================================
   VISIBILIDADE
   ========================================================================== */
.invisible { visibility: hidden; }
.visible { visibility: visible; }
.opacity-0 { opacity: 0; }
.opacity-50 { opacity: 0.5; }
.opacity-100 { opacity: 1; }

/* ==========================================================================
   TRANSIÇÕES
   ========================================================================== */
.transition-fast { transition: all var(--transition-fast); }
.transition-normal { transition: all var(--transition-normal); }
.transition-slow { transition: all var(--transition-slow); }

/* ==========================================================================
   ESTADOS DE STATUS (para tabelas e listas)
   ========================================================================== */
.status-concluido {
    background: rgba(16, 185, 129, 0.03);
}

.status-programado {
    background: rgba(59, 130, 246, 0.03);
}

.status-atrasado {
    background: rgba(239, 68, 68, 0.05);
}

.status-atrasado .date-col {
    color: var(--warning-color);
    font-weight: 600;
}

.highlight-loss {
    color: var(--warning-color) !important;
    font-weight: 600;
}

.days-red {
    color: var(--warning-color) !important;
    font-weight: 600;
}
</style>
`;

return { css };

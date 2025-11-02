/**********************************************
/* Kaniu - CSS Global
/* 03 - Layout e Estrutura
/*
/* Estruturas de layout principais do sistema
/**********************************************/

const css = `
<style id="kaniu-layout">
/* ==========================================================================
   ESTRUTURA PRINCIPAL
   ========================================================================== */
.app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* ==========================================================================
   MAIN COM SIDEBAR
   ========================================================================== */
.main-with-sidebar {
    margin-left: 240px;
    transition: margin-left 0.25s ease;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-with-sidebar.expanded {
    margin-left: 72px;
}

/* ==========================================================================
   MAIN CONTENT
   ========================================================================== */
main {
    flex: 1;
    width: 100%;
    max-width: calc(100% - 3rem);
    margin: 2rem auto 3rem;
    padding: 0 1.75rem 3rem;
}

.main-container {
    width: 100%;
    max-width: 100%;
}

/* ==========================================================================
   CONTENT GRID
   ========================================================================== */
.content-grid {
    flex: 1;
    overflow: hidden;
    min-height: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1.25rem;
}

/* ==========================================================================
   HEADER
   ========================================================================== */
.app-header {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    width: 100%;
    box-sizing: border-box;
    position: static;
    margin: 0;
    padding: 0;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 1.75rem;
    box-sizing: border-box;
    width: 100%;
}

.header-inner {
    width: 100%;
    padding: 1.25rem 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: flex-end;
}

/* ==========================================================================
   ANIMAL HEADER (página de detalhes)
   ========================================================================== */
.animal-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    box-sizing: border-box;
}

.animal-photo-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.animal-photo {
    width: 96px;
    height: 96px;
    border-radius: 16px;
    object-fit: cover;
    border: 4px solid var(--background-soft);
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
    cursor: pointer;
    transition: transform var(--transition-fast);
}

.animal-photo:hover {
    transform: translateY(-1px);
}

.animal-title {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.animal-title h1 {
    font-family: var(--font-family-display);
    font-size: 2.8rem;
    font-weight: bold;
    letter-spacing: 0.02em;
    color: var(--primary-color);
    margin: 0;
    line-height: 1.1;
}

.animal-subline {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

/* ==========================================================================
   OVERLAY
   ========================================================================== */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    display: none;
    z-index: var(--z-overlay);
}

/* ==========================================================================
   RESPONSIVIDADE
   ========================================================================== */
@media (max-width: 768px) {
    main {
        max-width: 100%;
        padding: 0 1rem 2rem;
        margin: 1rem auto 2rem;
    }

    .header-content {
        padding: 1rem;
    }

    .animal-title h1 {
        font-size: 1.9rem;
    }
}

@media (max-width: 480px) {
    .main-with-sidebar {
        margin-left: 0;
    }
}
</style>
`;

return { css };

/**********************************************
/* Kaniu - CSS Global
/* 05 - Sidebar / Menu Lateral
/*
/* Estilos do menu lateral de navegação
/**********************************************/

const css = `
<style id="kaniu-sidebar">
/* ==========================================================================
   SIDEBAR LAYOUT
   ========================================================================== */
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 240px;
    background-color: var(--card-background);
    border-right: 1px solid var(--border-color);
    box-shadow: 4px 0 12px rgba(15, 23, 42, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: var(--z-dropdown);
    transition: width 0.25s ease;
}

.sidebar.collapsed {
    width: 72px;
}

/* ==========================================================================
   SIDEBAR HEADER
   ========================================================================== */
.sidebar-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
}

.sidebar-logo {
    height: 32px;
    transition: opacity 0.25s ease;
}

.sidebar.collapsed .sidebar-logo {
    opacity: 0;
    visibility: hidden;
}

.sidebar-toggle {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    transition: all var(--transition-normal);
}

.sidebar-toggle:hover {
    background: var(--primary-soft);
    color: var(--primary-strong);
}

/* ==========================================================================
   SIDEBAR MENU
   ========================================================================== */
.sidebar-menu,
.sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 12px;
}

.sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: transparent;
    border: none;
    color: var(--text-light);
    font-size: 0.95rem;
    font-weight: 500;
    padding: 10px 14px;
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
    transition: background var(--transition-normal),
                color var(--transition-normal),
                transform var(--transition-fast);
}

.sidebar-item i {
    font-size: 1.1rem;
    min-width: 20px;
    text-align: center;
}

.sidebar-item:hover {
    background: var(--primary-soft);
    color: var(--primary-color);
    transform: translateX(2px);
}

.sidebar-item.active {
    background: var(--primary-color);
    color: #fff;
    box-shadow: var(--shadow-md);
}

.sidebar-item.active:hover {
    transform: translateX(0);
}

.sidebar.collapsed .sidebar-item {
    justify-content: center;
}

.sidebar.collapsed .sidebar-item span {
    display: none;
}

/* ==========================================================================
   SIDEBAR FOOTER
   ========================================================================== */
.sidebar-footer {
    border-top: 1px solid var(--border-color);
    padding-top: 8px;
    margin-top: auto;
}

/* ==========================================================================
   RESPONSIVIDADE
   ========================================================================== */
@media (max-width: 768px) {
    .sidebar {
        width: 240px;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .main-with-sidebar {
        margin-left: 0;
    }
}

@media (max-width: 480px) {
    .sidebar {
        width: 100%;
    }
}
</style>
`;

return { css };

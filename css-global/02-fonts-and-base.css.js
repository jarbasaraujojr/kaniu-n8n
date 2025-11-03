/**********************************************
/* Kaniu - CSS Global
/* 02 - Fontes e Estilos Base
/*
/* Importação de fontes e reset/estilos base
/**********************************************/

const css = `
<style id="kaniu-fonts-base">
/* ==========================================================================
   IMPORTAÇÕES E FONTES
   ========================================================================== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@font-face {
    font-family: 'GoodDog';
    src: url('https://viralatinhaz.uzd6db.easypanel.host/assets/fonts/GoodDog.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* ==========================================================================
   ESTILOS BASE
   ========================================================================== */
* {
    box-sizing: border-box;
}

html {
    height: 100%;
}

body {
    font-family: var(--font-family-base);
    margin: 0;
    padding: 0;
    background: var(--background-light);
    color: var(--text-dark);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    line-height: 1.6;
}

/* ===== LINKS ===== */
a {
    color: inherit;
    text-decoration: none;
    transition: color var(--transition-fast);
}

a:hover {
    color: var(--primary-color);
}

/* ===== INPUTS E FORMS ===== */
button,
input,
select,
textarea {
    font-family: var(--font-family-base);
    font-size: inherit;
}

button {
    cursor: pointer;
}

button:focus,
input:focus,
select:focus,
textarea:focus {
    outline: none;
}

/* ===== ÍCONES ===== */
i {
    color: inherit;
}

/* ===== HEADINGS ===== */
h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.2;
}

/* ===== SCROLLBAR CUSTOMIZADA (WEBKIT) ===== */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--background-light);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 4px;
    border: 2px solid var(--background-light);
}

::-webkit-scrollbar-thumb:hover {
    background-color: var(--primary-color);
}

/* ===== SCROLLBAR (FIREFOX) ===== */
* {
    scrollbar-width: thin;
    scrollbar-color: var(--border-color) var(--background-light);
}
</style>
`;

return { css };

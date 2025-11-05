/**********************************************
/* Kaniu - Index HTML Geral
/* Template Unificado para Todas as Páginas
/*
/* Este arquivo monta a estrutura HTML final:
/* - Navbar fixa no topo (altura do logo da sidebar)
/* - Sidebar lateral
/* - Conteúdo específico de cada página
/*
/* Cada página deve fornecer:
/* - page_title: Título da página
/* - navbar_html: Conteúdo da navbar (filtros/ações)
/* - page_html: Conteúdo principal da página
/* - page_css: CSS específico da página
/* - page_script: JavaScript específico da página
/**********************************************/

// ===== IMPORTA MÓDULOS CSS GLOBAIS =====
const cssVariables = $('CSS Variables').first().json.css;
const cssFontsBase = $('CSS Fonts Base').first().json.css;
const cssLayout = $('CSS Layout').first().json.css;
const cssComponents = $('CSS Components').first().json.css;
const cssSidebar = $('CSS Sidebar').first().json.css;
const cssUtilities = $('CSS Utilities').first().json.css;

// ===== IMPORTA COMPONENTES =====
const sidebar_html = $('Sidebar Html').first().json.html;
const sidebar_script = $('Sidebar Script').first().json.script;

// ===== RECEBE CONTEÚDO DA PÁGINA ESPECÍFICA =====
// A página específica deve estar conectada a este nó e fornecer:
const page_data = $input.first().json;
const page_title = page_data.page_title || 'Kaniu';
const navbar_html = page_data.navbar_html || '';
const page_html = page_data.page_html || '';
const page_css = page_data.page_css || '';
const page_script = page_data.page_script || '';

// ===== CONSTANTES =====
const constants = $('Constants').first().json;
const fav_icon = constants.fav_icon || '';

const html = `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page_title}</title>

    <!-- ===== FAVICON ===== -->
    <link rel="icon" type="image/png" href="${fav_icon}" />

    <!-- ===== FONT AWESOME ===== -->
    <link href="https://viralatinhaz.uzd6db.easypanel.host/assets/fontawesome/css/fontawesome.css" rel="stylesheet" />
    <link href="https://viralatinhaz.uzd6db.easypanel.host/assets/fontawesome/css/solid.css" rel="stylesheet" />

    <!-- ===== CSS GLOBAL (MODULAR) ===== -->
    ${cssVariables}
    ${cssFontsBase}
    ${cssLayout}
    ${cssComponents}
    ${cssSidebar}
    ${cssUtilities}

    <!-- ===== CSS DA PÁGINA ===== -->
    ${page_css}
</head>

<body>
  <div class="app-shell">

    <!-- ===== SIDEBAR ===== -->
    ${sidebar_html}

    <!-- ===== CONTEÚDO PRINCIPAL ===== -->
    <div class="main-with-sidebar">
        <main>
            <!-- ===== NAVBAR NO TOPO DA ÁREA DE CONTEÚDO ===== -->
            <div class="top-navbar">
                <div class="top-navbar-content">
                    ${navbar_html}
                </div>
            </div>

            <!-- ===== CONTEÚDO DA PÁGINA ===== -->
            <div class="content-grid">
                ${page_html}
            </div>
        </main>
    </div>
  </div>

  <!-- ===== OVERLAY (para modals) ===== -->
  <div id="overlay" class="overlay"></div>

  <!-- ===== JAVASCRIPT DA PÁGINA ===== -->
  ${page_script}

  <!-- ===== SCRIPT DA SIDEBAR ===== -->
  ${sidebar_script}
</body>

</html>
`;

return { html };

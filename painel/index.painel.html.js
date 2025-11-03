// Gera o html principal da página

// ===== IMPORTA MÓDULOS CSS GLOBAIS =====
const cssVariables = $('CSS Variables').first().json.css;
const cssFontsBase = $('CSS Fonts Base').first().json.css;
const cssLayout = $('CSS Layout').first().json.css;
const cssComponents = $('CSS Components').first().json.css;
const cssSidebar = $('CSS Sidebar').first().json.css;
const cssUtilities = $('CSS Utilities').first().json.css;

// ===== IMPORTA CSS DA PÁGINA =====
const painel_css = $('Painel Css').first().json.css;

// ===== IMPORTA COMPONENTES =====
const sidebar_html = $('Sidebar Html').first().json.html;
const sidebar_script = $('Sidebar Script').first().json.script;
const painel_html = $('Painel Html').first().json.html;

const html = `
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kaniu :: NOME_CANIL</title>
    
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
    ${painel_css}
</head>

<body>
  <div class="app-shell">
  
    <!------------------------------------- Carregar sidebar  ------------------------------------->
    ${sidebar_html}

    <!------------------------------------- Conteúdo principal da página ------------------------------------->
    <div class="main-with-sidebar">
        <main>
            <div class="content-grid">
              ${painel_html}
            </div>
        </main>
    </div>
    
    <!------------------------------------- Script da sidebar ------------------------------------->
    ${sidebar_script}
  </div>
</body>
</html>
`;

return {html};
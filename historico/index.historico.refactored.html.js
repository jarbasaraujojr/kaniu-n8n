/**********************************************
/* Kaniu - Página de Histórico
/* HTML Refatorado e Modular
/*
/* Este arquivo agora é LIMPO, apenas integrando
/* os módulos CSS e JS criados separadamente
/**********************************************/

// ===== IMPORTA MÓDULOS CSS GLOBAIS =====
const cssVariables = $('CSS Variables').first().json.css;
const cssFontsBase = $('CSS Fonts Base').first().json.css;
const cssLayout = $('CSS Layout').first().json.css;
const cssComponents = $('CSS Components').first().json.css;
const cssSidebar = $('CSS Sidebar').first().json.css;
const cssUtilities = $('CSS Utilities').first().json.css;

// ===== IMPORTA CSS DA PÁGINA =====
const cssHistorico = $('Historico Css').first().json.css;

// ===== IMPORTA MÓDULOS JAVASCRIPT =====
const jsAPI = $('JS API Module').first().json.script;
const jsDOMHelpers = $('JS DOM Helpers').first().json.script;
const jsStateManager = $('JS State Manager').first().json.script;

// ===== IMPORTA SCRIPT DA PÁGINA =====
const jsHistorico = $('Historico Script Refactored').first().json.script;

// ===== IMPORTA COMPONENTES =====
const sidebar_html = $('Sidebar Html').first().json.html;
const sidebar_script = $('Sidebar Script').first().json.script;

const html = `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kaniu :: Histórico de Eventos</title>

    <!-- ===== FAVICON ===== -->
    <link rel="icon" type="image/png" href="${$('Constants').first().json.fav_icon || ''}" />

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
    ${cssHistorico}
</head>

<body>
  <div class="app-shell">

    <!-- ===== SIDEBAR ===== -->
    ${sidebar_html}

    <!-- ===== CONTEÚDO PRINCIPAL ===== -->
    <div class="main-with-sidebar">
        <main>
            <div class="content-grid">

              <!-- ===== TABS DE FILTRO ===== -->
              <div class="main-container">
                <div class="tab-nav">
                    <button class="tab-btn active" data-tab="realizados">
                        <i class="fa-solid fa-check-circle"></i>
                        Realizados
                    </button>
                    <button class="tab-btn" data-tab="programados">
                        <i class="fa-solid fa-calendar-days"></i>
                        Programados
                    </button>
                    <button class="tab-btn" data-tab="atrasados">
                        <i class="fa-solid fa-exclamation-triangle"></i>
                        Atrasados
                    </button>
                </div>
              </div>

              <!-- ===== TABELA DE EVENTOS ===== -->
              <section class="historico-content">
                <div class="table-card">

                  <!-- Header da Tabela -->
                  <div class="table-header">
                    <div class="table-title">
                      <i class="fa-solid fa-list"></i>
                      <span id="table-title">Eventos Realizados</span>
                    </div>
                    <div class="table-info">
                      <span id="records-count">0 registros</span>
                    </div>
                  </div>

                  <!-- Tabela -->
                  <div class="table-wrapper">
                    <table class="eventos-table">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Animal</th>
                          <th>Tipo</th>
                          <th>Descrição</th>
                          <th>Veterinário</th>
                          <th>Clínica</th>
                          <th class="actions-col">Ações</th>
                        </tr>
                      </thead>
                      <tbody id="eventos-tbody">
                        <tr>
                          <td colspan="7" class="empty-message">
                            <i class="fa-solid fa-spinner fa-spin"></i>
                            Carregando eventos...
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Paginação -->
                  <div class="table-pagination">
                    <button class="btn-page" id="prev-page" disabled>
                      <i class="fa-solid fa-chevron-left"></i>
                      Anterior
                    </button>
                    <span class="page-info">
                      Página <span id="current-page">1</span> de <span id="total-pages">1</span>
                    </span>
                    <button class="btn-page" id="next-page" disabled>
                      Próxima
                      <i class="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>

                </div>
              </section>

            </div>
        </main>
    </div>
  </div>

  <!-- ===== OVERLAY (para modals futuros) ===== -->
  <div id="overlay" class="overlay"></div>

  <!-- ===== JAVASCRIPT MODULAR ===== -->
  ${jsAPI}
  ${jsDOMHelpers}
  ${jsStateManager}

  <!-- ===== SCRIPT DA PÁGINA ===== -->
  ${jsHistorico}

  <!-- ===== SCRIPT DA SIDEBAR ===== -->
  ${sidebar_script}
</body>

</html>
`;

return { html };

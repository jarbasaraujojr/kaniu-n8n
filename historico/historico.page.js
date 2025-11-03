/**********************************************
/* Kaniu - Página de Histórico de Eventos
/* Conteúdo Específico (sem estrutura HTML completa)
/*
/* Este arquivo gera apenas o conteúdo específico:
/* - navbar_html: Tabs de filtro (Realizados, Programados, Atrasados)
/* - page_html: Tabela de eventos com paginação
/* - page_css: Estilos do histórico
/* - page_script: JavaScript do histórico
/**********************************************/

// ===== IMPORTA CSS DA PÁGINA =====
const historico_css = $('Historico Css').first().json.css;

// ===== IMPORTA MÓDULOS JAVASCRIPT =====
const jsAPI = $('JS API Module').first().json.script;
const jsDOMHelpers = $('JS DOM Helpers').first().json.script;
const jsStateManager = $('JS State Manager').first().json.script;
const jsHistorico = $('Historico Script Refactored').first().json.script;

// ===== NAVBAR (TABS DE FILTRO) =====
const navbar_html = `
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
`;

// ===== CONTEÚDO DA PÁGINA =====
const page_html = `
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
`;

// ===== CSS DA PÁGINA =====
const page_css = historico_css;

// ===== JAVASCRIPT DA PÁGINA =====
const page_script = `
<!-- ===== JAVASCRIPT MODULAR ===== -->
${jsAPI}
${jsDOMHelpers}
${jsStateManager}

<!-- ===== SCRIPT DA PÁGINA ===== -->
${jsHistorico}
`;

// ===== RETORNA DADOS PARA O INDEX GERAL =====
return [{
  json: {
    page_title: 'Kaniu :: Histórico de Eventos',
    navbar_html: navbar_html,
    page_html: page_html,
    page_css: page_css,
    page_script: page_script
  }
}];

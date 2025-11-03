/**********************************************
/* Kaniu - Página do Painel
/* Conteúdo Específico (sem estrutura HTML completa)
/*
/* Este arquivo gera apenas o conteúdo específico:
/* - navbar_html: Tabs de filtro (pendências, peso, saúde)
/* - page_html: Dashboard com cards  
/* - page_css: Estilos do painel
/* - page_script: JavaScript do painel (vazio, pois já está no HTML)
/**********************************************/

// ===== IMPORTA HTML E CSS DA PÁGINA =====
const painel_html = $('Painel Html').first().json.html;
const painel_css = $('Painel Css').first().json.css;

// ===== NAVBAR (TABS DE FILTRO) =====
const navbar_html = `
<div class="tab-nav">
    <button class="tab-btn active" data-tab="pendencias">
        <i class="fa-solid fa-clock"></i>
        Pendências
    </button>
    <button class="tab-btn" data-tab="peso">
        <i class="fa-solid fa-weight-scale"></i>
        Peso
    </button>
    <button class="tab-btn" data-tab="saude">
        <i class="fa-solid fa-stethoscope"></i>
        Saúde
    </button>
</div>
`;

// ===== CONTEÚDO DA PÁGINA =====
// NOTA: O painel_html já contém o JavaScript embutido
const page_html = painel_html;

// ===== CSS DA PÁGINA =====
const page_css = painel_css;

// ===== JAVASCRIPT DA PÁGINA =====
// NOTA: O script já está incluído no painel_html, então deixamos vazio
const page_script = ``;

// ===== RETORNA DADOS PARA O INDEX GERAL =====
return [{
  json: {
    page_title: 'Kaniu :: Painel',
    navbar_html: navbar_html,
    page_html: page_html,
    page_css: page_css,
    page_script: page_script
  }
}];

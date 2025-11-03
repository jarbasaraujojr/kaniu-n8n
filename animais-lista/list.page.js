/**********************************************
/* Kaniu - Página de Listagem de Animais
/* Conteúdo Específico (sem estrutura HTML completa)
/*
/* Este arquivo gera apenas o conteúdo específico:
/* - navbar_html: Tabs de status (Abrigado, Adotado, etc)
/* - page_html: Lista de animais
/* - page_css: Estilos da listagem
/* - page_script: JavaScript da listagem
/**********************************************/

// ===== RECEBE DADOS DE ENTRADA =====
const animals = $input.first().json.animals;
const constants = $('Constants').item.json;
const vars = $('Vars').first().json;

// ===== IMPORTA CSS DA PÁGINA =====
const list_css = $('List Style').first().json.style;

// ===== VARIÁVEIS =====
const webhook_url = vars.url;
const APPLIED_STATUS = vars.query?.status || 'Abrigado';

// ===== FUNÇÕES AUXILIARES =====
const normalizeAccents = (str = '') =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const animalPhoto = (especie = 'Vazio') => ({
  'Cachorro': 'https://i.ibb.co/Z6dPncCH/pic-dog.png',
  'Gato': 'https://i.ibb.co/9dWLkZs/pic-cat.png',
  'Vazio': 'https://i.ibb.co/KpVTx4vK/pic-none.png',
}[especie] || 'https://i.ibb.co/KpVTx4vK/pic-none.png');

const formatValue = (value) => value === null || value === 0 || value === undefined ? '' : value;

// ===== NAVBAR (TABS DE STATUS) =====
const navbar_html = `
<div class="tab-nav">
    ${['Abrigado', 'Adotado', 'Internado', 'Desaparecido', 'Falecido']
    .map(status => `
    <button class="tab-btn ${APPLIED_STATUS === status ? 'active' : ''}" data-status="${status}">
      ${status + 's'}
    </button>
    `).join('')}
</div>
`;

// ===== RENDERIZAÇÃO DE CARDS =====
let cardsHtml = '';

if (Array.isArray(animals) && animals.length > 0) {
  cardsHtml = animals.map(animal => {
    const nome = normalizeAccents(animal.nome);
    const foto = animal.foto || animalPhoto(animal.especie);

    return `
      <a href="${webhook_url}?animal_id=${animal.animal_id}" class="animal-list-link">
        <header class="app-header">
          <div class="header-content">
            <div class="animal-header">
              <div class="animal-photo-wrapper">
                <img class="animal-photo" id="animal-photo"
                     src="${foto}"
                     alt="Foto de ${animal.nome}" />
              </div>

              <div class="animal-title">
                <h1>${animal.nome || ''}</h1>
                <div class="animal-subline">
                  <button class="chip">${animal.especie || 'Espécie'}</button>
                  <button class="chip">${animal.sexo || 'Sexo'}</button>
                  <button class="chip">${animal.porte || 'Porte'}</button>
                  <button class="chip">${animal['raça'] || 'Raça'}</button>
                  <button class="chip">Pelo ${animal.pelagem || 'Pelagem'}</button>
                  <button class="chip">${animal.cor || 'Cor'}</button>
                  ${animal.faixa_etaria ? `<button class="chip">${animal.faixa_etaria}</button>` : ''}
                  ${formatValue(animal.peso) ? `<button class="chip">${formatValue(animal.peso)} kg</button>` : ''}
                </div>
              </div>
            </div>
          </div>
        </header>
      </a>
    `;
  }).join('');
} else {
  cardsHtml = `<p class="no-results">Nenhum item encontrado.</p>`;
}

// ===== CONTEÚDO DA PÁGINA =====
const page_html = `
<div class="list-container">
  ${cardsHtml}
</div>
`;

// ===== CSS DA PÁGINA =====
const page_css = list_css;

// ===== JAVASCRIPT DA PÁGINA =====
const page_script = `
<script>
(function () {
  const ENDPOINT_URL = ${JSON.stringify(webhook_url)};
  const DEFAULT_STATUS = 'Abrigado';
  let currentStatus = ${JSON.stringify(APPLIED_STATUS)};

  const listContainer = document.querySelector('.list-container');
  const statusButtons = document.querySelectorAll('.tab-btn');

  // ---------- ATUALIZA BOTÕES ATIVOS ----------
  const updateButtonStatus = () => {
    statusButtons.forEach(btn => {
      const isActive = btn.dataset.status === currentStatus;
      btn.classList.toggle('active', isActive);
    });
  };
  updateButtonStatus();

  // ---------- HISTÓRICO ----------
  if (!window.history.state || window.history.state.status !== currentStatus) {
    window.history.replaceState({ status: currentStatus }, '', window.location.href);
  }

  // ---------- FUNÇÕES DE URL ----------
  const buildUrlForStatus = (statusValue) => {
    try {
      const url = new URL(ENDPOINT_URL, window.location.origin);
      url.searchParams.set('status', statusValue);
      return url.toString();
    } catch {
      const sep = ENDPOINT_URL.includes('?') ? '&' : '?';
      return ENDPOINT_URL + sep + 'status=' + encodeURIComponent(statusValue);
    }
  };

  const updateUrl = (statusValue) => {
    const url = new URL(window.location.href);
    url.searchParams.set('status', statusValue);
    window.history.pushState({ status: statusValue }, '', url.toString());
  };

  // ---------- RECARREGAR LISTA VIA FETCH ----------
  const fetchAndRenderList = async (statusValue, { updateHistory = true } = {}) => {
    const newUrl = buildUrlForStatus(statusValue);

    if (!listContainer) {
      window.location.href = newUrl;
      return;
    }

    try {
      const response = await fetch(newUrl, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin'
      });

      if (!response.ok) throw new Error('Erro ao carregar a lista.');

      const htmlText = await response.text();
      const doc = new DOMParser().parseFromString(htmlText, 'text/html');
      const updatedList = doc.querySelector('.list-container');

      if (!updatedList) throw new Error('Estrutura da lista não encontrada.');

      listContainer.innerHTML = updatedList.innerHTML;
      currentStatus = statusValue;
      updateButtonStatus();

      if (updateHistory) updateUrl(statusValue);
    } catch (err) {
      console.error(err);
      window.location.href = newUrl;
    }
  };

  window.refreshAnimalList = (statusValue, extraOptions = {}) => {
    const statusToUse = statusValue || currentStatus;
    const options = { updateHistory: false, ...extraOptions };
    return fetchAndRenderList(statusToUse, options);
  };

  // ---------- EVENTOS DOS BOTÕES ----------
  statusButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const statusToFilter = button.dataset.status;
      const nextStatus = (statusToFilter === currentStatus) ? DEFAULT_STATUS : statusToFilter;
      fetchAndRenderList(nextStatus);
    });
  });

  // ---------- POPSTATE ----------
  window.addEventListener('popstate', event => {
    const status = event.state?.status;
    if (status) fetchAndRenderList(status, { updateHistory: false });
    else window.location.reload();
  });
})();
</script>
`;

// ===== RETORNA DADOS PARA O INDEX GERAL =====
return [{
  json: {
    page_title: 'Kaniu :: Animais para Adoção',
    navbar_html: navbar_html,
    page_html: page_html,
    page_css: page_css,
    page_script: page_script
  }
}];

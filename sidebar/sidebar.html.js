const base_url = $('Vars').first().json.url;
const current_page = $('Vars').first().json.menu;

const html = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <button id="sidebar-toggle" class="sidebar-toggle">
          <i class="fa-solid fa-bars"></i>
        </button>
        <img src="${$('Constants').first().json.img_logo}" alt="Kaniu" class="sidebar-logo" />
      </div>

      <nav class="sidebar-menu">
        <button class="sidebar-item" data-target="painel">
          <i class="fa-solid fa-chart-pie"></i><span>Painel</span>
        </button>
        <button class="sidebar-item" data-target="animais">
          <i class="fa-solid fa-paw"></i><span>Animais</span>
        </button>
        <button class="sidebar-item" data-target="historico">
          <i class="fa-solid fa-clock-rotate-left"></i><span>Histórico</span>
        </button>
        <button class="sidebar-item" data-target="avaliacoes">
          <i class="fa-solid fa-stethoscope"></i><span>Avaliações</span>
        </button>
        <button class="sidebar-item" data-target="tratamentos">
          <i class="fa-solid fa-prescription-bottle-medical"></i><span>Tratamentos</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="sidebar-item" id="toggle-theme">
          <i class="fa-solid fa-circle-half-stroke"></i><span>Tema</span>
        </button>
        <button class="sidebar-item">
          <i class="fa-solid fa-warehouse"></i><span>Canil</span>
        </button>
        <button class="sidebar-item">
          <i class="fa-solid fa-user"></i><span>Perfil</span>
        </button>
      </div>
    </aside>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.sidebar-item[data-target]');
        const currentPage = '${current_page}';
        console.log('currentPage :: ',currentPage);
  
        // Aplica destaque ao botão da página atual
        buttons.forEach(btn => {
          const target = btn.getAttribute('data-target');
            btn.classList.remove('active');
          if (target === currentPage) {
            btn.classList.add('active');
          }
  
          // Redireciona diretamente ao clicar
          btn.addEventListener('click', () => {
            end_url = "${base_url}?pagina="+target;
            console.log('target-->',target);
            window.location.href = end_url;
          });
        });
      });
  </script>
`;

return {html};
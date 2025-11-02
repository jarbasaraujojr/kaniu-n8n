/**********************************************
/* Kaniu
/* Sistema de gestão de abrigos de animais
/* Página do histórico - CSS
/**********************************************/

const css = `
<style>
/* ===== CONTAINER DO CONTEÚDO ===== */
.content-grid {
  flex: 1;
  overflow: hidden;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}

/* ===== CONTEÚDO DO HISTÓRICO ===== */
.historico-content {
  flex: 1;
  overflow: hidden;
  min-height: 0;
  margin-top: 1rem;
}

.table-card {
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 15px 45px rgba(15, 23, 42, 0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--background-soft);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.table-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-dark);
}

.table-title i {
  color: var(--primary-color);
}

.table-info {
  color: var(--text-light);
  font-size: 0.875rem;
}

/* ===== TABELA ===== */
.table-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  min-height: 0;
}

.eventos-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.eventos-table thead {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--background-soft);
}

/* Arredonda os cantos superiores da tabela */
.eventos-table thead th:first-child {
  border-top-left-radius: var(--radius-md);
}

.eventos-table thead th:last-child {
  border-top-right-radius: var(--radius-md);
}

.eventos-table th {
  padding: 0.85rem 1rem;
  text-align: left;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--primary-color);
  border-bottom: 2px solid var(--border-color);
  white-space: nowrap;
  background: var(--background-soft);
  overflow: hidden;
}

.eventos-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
  color: var(--text-dark);
}

.eventos-table tbody tr {
  transition: background 120ms ease;
}

.eventos-table tbody tr:hover {
  background: rgba(255, 102, 0, 0.05);
}

/* Colunas específicas */
.date-col {
  font-weight: 500;
  white-space: nowrap;
}

.animal-col {
  font-weight: 600;
  color: var(--primary-color);
}

.tipo-col {
  white-space: nowrap;
}

.tipo-col i {
  color: var(--primary-color);
  margin-right: 0.5rem;
}

.desc-col {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actions-col {
  text-align: center;
  width: 80px;
}

/* Status das linhas */
.status-concluido {
  background: rgba(16, 185, 129, 0.03);
}

.status-programado {
  background: rgba(59, 130, 246, 0.03);
}

.status-atrasado {
  background: rgba(239, 68, 68, 0.05);
}

.status-atrasado .date-col {
  color: #DC2626;
  font-weight: 600;
}

/* ===== AÇÕES ===== */
.btn-action {
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-action:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-1px);
}

/* ===== MENSAGENS VAZIAS ===== */
.empty-message {
  text-align: center !important;
  padding: 3rem 1rem !important;
  color: var(--text-faded) !important;
  font-style: italic;
}

.empty-message i {
  display: block;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.error-message {
  color: #DC2626 !important;
}

/* ===== PAGINAÇÃO ===== */
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--background-soft);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.btn-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-page:hover:not(:disabled) {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-1px);
}

.btn-page:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  color: var(--text-light);
  font-size: 0.875rem;
}

.page-info span {
  font-weight: 600;
  color: var(--text-dark);
}

/* ===== SCROLLBAR ===== */
.table-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: var(--background-light);
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: var(--text-faded);
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary-color);
}

/* Scrollbar Firefox */
.table-wrapper {
  scrollbar-width: thin;
  scrollbar-color: var(--text-faded) var(--background-light);
}

/* ===== RESPONSIVO ===== */
@media (max-width: 768px) {
  .tab-nav {
    gap: 0.25rem;
    overflow-x: auto;
    padding-bottom: 0.75rem;
  }
  
  .tab-btn {
    padding: 0.65rem 1rem;
    font-size: 0.875rem;
    white-space: nowrap;
  }
  
  .table-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .eventos-table th,
  .eventos-table td {
    padding: 0.65rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .desc-col {
    max-width: 200px;
  }
  
  .table-pagination {
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .page-info {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .tab-nav {
    gap: 0.25rem;
  }
  
  .tab-btn {
    padding: 0.6rem 0.85rem;
    font-size: 0.8rem;
  }
  
  .tab-btn i {
    font-size: 0.9rem;
  }
  
  .eventos-table {
    min-width: 700px;
  }
  
  .desc-col {
    max-width: 150px;
  }
}

/* ===== MODO ESCURO ===== */
@media (prefers-color-scheme: dark) {
  .table-card,
  .filters-bar {
    background: var(--card-background, #1E293B);
    border-color: var(--border-color, #334155);
  }
  
  .table-header {
    background: var(--background-soft, #0F172A);
    border-bottom-color: var(--border-color, #334155);
  }
  
  .eventos-table thead {
    background: var(--background-soft, #0F172A);
  }
  
  .eventos-table th {
    color: var(--text-light, #94A3B8);
    border-bottom-color: var(--border-color, #334155);
  }
  
  .eventos-table td {
    border-bottom-color: var(--border-color, #334155);
    color: var(--text-dark, #CBD5E1);
  }
  
  .eventos-table tbody tr:hover {
    background: var(--background-light, #334155);
  }
}
</style>
`;

return {css};
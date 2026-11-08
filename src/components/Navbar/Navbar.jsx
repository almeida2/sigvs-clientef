import './Navbar.css';

export const Navbar = ({ operacaoAtiva, onMudarOperacao }) => {
  const tabs = [
    { id: 'tabListar', name: 'tabListar', key: 'Listar', label: 'Listar Clientes' },
    { id: 'tabCadastrar', name: 'tabCadastrar', key: 'Cadastrar', label: 'Cadastrar' },
    { id: 'tabConsultar', name: 'tabConsultar', key: 'Consultar', label: 'Consultar' },
    { id: 'tabAtualizar', name: 'tabAtualizar', key: 'Atualizar', label: 'Atualizar' },
    { id: 'tabExcluir', name: 'tabExcluir', key: 'Excluir', label: 'Excluir' },
  ];

  return (
    <nav id="navOperacoes" name="navOperacoes" className="app-navbar" aria-label="Navegação de operações">
      <div className="nav-container">
        {tabs.map((tab) => {
          const isActive = operacaoAtiva === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              id={tab.id}
              name={tab.name}
              className={`nav-tab-btn ${isActive ? 'nav-tab-btn-active' : ''}`}
              onClick={() => onMudarOperacao(tab.key)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};


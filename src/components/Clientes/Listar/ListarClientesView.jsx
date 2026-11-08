import { FeedbackMessage } from '../../Common/FeedbackMessage';
import './ListarClientesStyles.css';

export const ListarClientesView = ({
  clientes,
  filtro,
  carregando,
  feedback,
  onFiltroChange,
  onRecarregar,
  onNovoCliente,
  onConsultar,
  onEditar,
  onExcluir,
  onCloseFeedback,
}) => {
  return (
    <div className="listar-container">
      <div className="listar-card">
        <h3 id="tituloOperacao" name="tituloOperacao" className="listar-titulo">
          LISTAR
        </h3>

        <div className="listar-toolbar">
          <div className="filtro-group">
            <label htmlFor="filtro" className="filtro-label">
              Filtrar por nome, CPF ou e-mail:
            </label>
            <input
              type="text"
              id="filtro"
              name="filtro"
              className="filtro-input"
              placeholder="Digite para filtrar a lista..."
              value={filtro}
              onChange={(e) => onFiltroChange(e.target.value)}
            />
          </div>

          <div className="listar-acoes">
            <button
              type="button"
              id="btnAtualizarLista"
              name="btnAtualizarLista"
              className="btn-atualizar-lista"
              onClick={onRecarregar}
            >
              ↻ Atualizar Lista
            </button>

            <button
              type="button"
              id="btnNovoCliente"
              name="btnNovoCliente"
              className="btn-cadastrar-novo"
              onClick={onNovoCliente}
            >
              + Cadastrar Novo Cliente
            </button>
          </div>
        </div>

        {carregando ? (
          <div className="mensagem-carregando">Carregando lista de clientes...</div>
        ) : clientes.length === 0 ? (
          <div className="mensagem-vazia">
            {filtro.trim()
              ? `Nenhum cliente encontrado com o filtro "${filtro}".`
              : 'Nenhum cliente cadastrado no momento.'}
          </div>
        ) : (
          <div className="tabela-wrapper">
            <table id="tabelaClientes" name="tabelaClientes" className="tabela-clientes">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Cidade / UF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>
                      <strong>{cliente.nome}</strong>
                    </td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td>
                      {cliente.cidade ? `${cliente.cidade} / ${cliente.uf || ''}` : '-'}
                    </td>
                    <td>
                      <div className="tabela-acoes">
                        <button
                          type="button"
                          id={`btnConsultar_${cliente.id}`}
                          name={`btnConsultar_${cliente.id}`}
                          className="btn-tabela-view"
                          onClick={() => onConsultar(cliente.id)}
                        >
                          Ver
                        </button>
                        <button
                          type="button"
                          id={`btnEditar_${cliente.id}`}
                          name={`btnEditar_${cliente.id}`}
                          className="btn-tabela-edit"
                          onClick={() => onEditar(cliente.id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          id={`btnExcluir_${cliente.id}`}
                          name={`btnExcluir_${cliente.id}`}
                          className="btn-tabela-delete"
                          onClick={() => onExcluir(cliente.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FeedbackMessage feedback={feedback} onClose={onCloseFeedback} />
    </div>
  );
};


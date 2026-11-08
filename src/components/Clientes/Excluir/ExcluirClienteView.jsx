import { FeedbackMessage } from '../../Common/FeedbackMessage';
import './ExcluirClienteStyles.css';

export const ExcluirClienteView = ({
  buscaId,
  buscaCpf,
  cliente,
  buscando,
  excluindo,
  feedback,
  onBuscaIdChange,
  onBuscaCpfChange,
  onBuscarPorId,
  onBuscarPorCpf,
  onConfirmar,
  onCancelar,
  onCloseFeedback,
}) => {
  return (
    <div className="excluir-container">
      <div className="excluir-card">
        <h3 id="tituloOperacao" name="tituloOperacao" className="excluir-titulo">
          EXCLUIR
        </h3>

        <div className="excluir-busca-box">
          <div className="excluir-busca-grid">
            {/* Busca por ID */}
            <form
              id="formBuscarExcluirPorId"
              name="formBuscarExcluirPorId"
              className="excluir-busca-col"
              onSubmit={onBuscarPorId}
            >
              <label htmlFor="buscaId" className="form-label">
                Localizar por ID para Exclusão
              </label>
              <div className="busca-input-inline">
                <input
                  type="number"
                  id="buscaId"
                  name="buscaId"
                  className="form-input"
                  placeholder="Ex: 1"
                  min={1}
                  value={buscaId}
                  onChange={(e) => onBuscaIdChange(e.target.value)}
                />
                <button
                  type="submit"
                  id="btnBuscarId"
                  name="btnBuscarId"
                  className="btn-buscar-acao"
                  disabled={buscando || !buscaId}
                >
                  {buscando ? 'Buscando...' : 'Buscar ID'}
                </button>
              </div>
            </form>

            {/* Busca por CPF */}
            <form
              id="formBuscarExcluirPorCpf"
              name="formBuscarExcluirPorCpf"
              className="excluir-busca-col"
              onSubmit={onBuscarPorCpf}
            >
              <label htmlFor="buscaCpf" className="form-label">
                Localizar por CPF para Exclusão
              </label>
              <div className="busca-input-inline">
                <input
                  type="text"
                  id="buscaCpf"
                  name="buscaCpf"
                  className="form-input"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={buscaCpf}
                  onChange={(e) => onBuscaCpfChange(e.target.value)}
                />
                <button
                  type="submit"
                  id="btnBuscarCpf"
                  name="btnBuscarCpf"
                  className="btn-buscar-acao"
                  disabled={buscando || !buscaCpf}
                >
                  {buscando ? 'Buscando...' : 'Buscar CPF'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {cliente && (
          <div className="exclusao-confirmacao-box">
            <div className="exclusao-alerta">
              <span>⚠️</span>
              <span>Atenção: A exclusão deste cliente é permanente e removerá todos os seus registros do sistema.</span>
            </div>

            <div className="exclusao-dados">
              <div className="exclusao-linha">
                <span className="exclusao-label">ID:</span>
                <span className="exclusao-valor">{cliente.id}</span>
              </div>
              <div className="exclusao-linha">
                <span className="exclusao-label">Nome Completo:</span>
                <span className="exclusao-valor">
                  <strong>{cliente.nome}</strong>
                </span>
              </div>
              <div className="exclusao-linha">
                <span className="exclusao-label">CPF:</span>
                <span className="exclusao-valor">{cliente.cpf}</span>
              </div>
              <div className="exclusao-linha">
                <span className="exclusao-label">E-mail:</span>
                <span className="exclusao-valor">{cliente.email}</span>
              </div>
              <div className="exclusao-linha">
                <span className="exclusao-label">Telefone:</span>
                <span className="exclusao-valor">{cliente.telefone}</span>
              </div>
              <div className="exclusao-linha">
                <span className="exclusao-label">Cidade / UF:</span>
                <span className="exclusao-valor">
                  {cliente.cidade ? `${cliente.cidade} / ${cliente.uf || ''}` : '-'}
                </span>
              </div>
            </div>

            <div className="exclusao-acoes">
              <button
                type="button"
                id="btnCancelarExcluir"
                name="btnCancelarExcluir"
                className="btn-secondary"
                onClick={onCancelar}
                disabled={excluindo}
              >
                Cancelar
              </button>
              <button
                type="button"
                id="btnConfirmarExclusao"
                name="btnConfirmarExclusao"
                className="btn-danger"
                onClick={onConfirmar}
                disabled={excluindo}
              >
                {excluindo ? 'Excluindo...' : 'Confirmar Exclusão'}
              </button>
            </div>
          </div>
        )}
      </div>

      <FeedbackMessage feedback={feedback} onClose={onCloseFeedback} />
    </div>
  );
};


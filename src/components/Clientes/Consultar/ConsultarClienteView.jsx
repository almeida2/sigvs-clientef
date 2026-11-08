import { FeedbackMessage } from '../../Common/FeedbackMessage';
import { formatarDataHora } from '../../../utils/formatters';
import './ConsultarClienteStyles.css';

export const ConsultarClienteView = ({
  buscaId,
  buscaCpf,
  cliente,
  buscando,
  feedback,
  onBuscaIdChange,
  onBuscaCpfChange,
  onBuscarPorId,
  onBuscarPorCpf,
  onLimpar,
  onEditar,
  onExcluir,
  onCloseFeedback,
}) => {
  return (
    <div className="consultar-container">
      <div className="consultar-card">
        <h3 id="tituloOperacao" name="tituloOperacao" className="consultar-titulo">
          CONSULTAR
        </h3>

        <div className="consultar-busca-box">
          <div className="consultar-busca-grid">
            {/* Busca por ID */}
            <form
              id="formBuscarPorId"
              name="formBuscarPorId"
              className="consultar-busca-col"
              onSubmit={onBuscarPorId}
            >
              <label htmlFor="buscaId" className="form-label">
                Consultar por ID
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
              id="formBuscarPorCpf"
              name="formBuscarPorCpf"
              className="consultar-busca-col"
              onSubmit={onBuscarPorCpf}
            >
              <label htmlFor="buscaCpf" className="form-label">
                Consultar por CPF
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

          <div className="consultar-limpar-bar">
            <button
              type="button"
              id="btnLimparConsulta"
              name="btnLimparConsulta"
              className="btn-secondary"
              onClick={onLimpar}
              disabled={buscando}
            >
              Limpar Consulta
            </button>
          </div>
        </div>

        {cliente && (
          <div className="detalhes-bloco">
            <h4 className="detalhes-titulo">Dados do Cliente Localizado</h4>

            <div className="detalhes-grid">
              <div className="detalhes-row">
                <div className="detalhes-col detalhes-col-small">
                  <label htmlFor="id" className="detalhes-label">
                    ID
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    className="detalhes-input"
                    value={cliente.id || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col">
                  <label htmlFor="nome" className="detalhes-label">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="detalhes-input"
                    value={cliente.nome || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col">
                  <label htmlFor="dataDeCadastro" className="detalhes-label">
                    Data de Cadastro
                  </label>
                  <input
                    type="text"
                    id="dataDeCadastro"
                    name="dataDeCadastro"
                    className="detalhes-input"
                    value={formatarDataHora(cliente.dataDeCadastro)}
                    disabled
                    readOnly
                  />
                </div>
              </div>

              <div className="detalhes-row">
                <div className="detalhes-col">
                  <label htmlFor="email" className="detalhes-label">
                    E-mail
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="detalhes-input"
                    value={cliente.email || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col">
                  <label htmlFor="cpf" className="detalhes-label">
                    CPF
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    className="detalhes-input"
                    value={cliente.cpf || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col">
                  <label htmlFor="telefone" className="detalhes-label">
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    className="detalhes-input"
                    value={cliente.telefone || ''}
                    disabled
                    readOnly
                  />
                </div>
              </div>

              <div className="detalhes-row">
                <div className="detalhes-col detalhes-col-small">
                  <label htmlFor="cep" className="detalhes-label">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    className="detalhes-input"
                    value={cliente.cep || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col">
                  <label htmlFor="endereco" className="detalhes-label">
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    className="detalhes-input"
                    value={cliente.endereco || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col">
                  <label htmlFor="bairro" className="detalhes-label">
                    Bairro
                  </label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    className="detalhes-input"
                    value={cliente.bairro || ''}
                    disabled
                    readOnly
                  />
                </div>
              </div>

              <div className="detalhes-row">
                <div className="detalhes-col">
                  <label htmlFor="cidade" className="detalhes-label">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    className="detalhes-input"
                    value={cliente.cidade || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col detalhes-col-small">
                  <label htmlFor="uf" className="detalhes-label">
                    UF
                  </label>
                  <input
                    type="text"
                    id="uf"
                    name="uf"
                    className="detalhes-input"
                    value={cliente.uf || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col">
                  <label htmlFor="complemento" className="detalhes-label">
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    className="detalhes-input"
                    value={cliente.complemento || ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="detalhes-col">
                  <label htmlFor="pontoDeReferencia" className="detalhes-label">
                    Ponto de Referência
                  </label>
                  <input
                    type="text"
                    id="pontoDeReferencia"
                    name="pontoDeReferencia"
                    className="detalhes-input"
                    value={cliente.pontoDeReferencia || ''}
                    disabled
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="detalhes-acoes">
              <button
                type="button"
                id="btnEditarConsultado"
                name="btnEditarConsultado"
                className="btn-secondary"
                onClick={() => onEditar(cliente.id)}
              >
                Editar este Cliente
              </button>
              <button
                type="button"
                id="btnExcluirConsultado"
                name="btnExcluirConsultado"
                className="btn-danger"
                onClick={() => onExcluir(cliente.id)}
              >
                Excluir este Cliente
              </button>
            </div>
          </div>
        )}
      </div>

      <FeedbackMessage feedback={feedback} onClose={onCloseFeedback} />
    </div>
  );
};


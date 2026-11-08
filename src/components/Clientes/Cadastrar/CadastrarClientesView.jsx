import { FeedbackMessage } from '../../Common/FeedbackMessage';
import './CadastrarClientesStyles.css';

export const CadastrarClientesView = ({
  formData,
  erros,
  salvando,
  buscandoCep,
  feedback,
  onChange,
  onCepBlur,
  onSubmit,
  onLimpar,
  onCloseFeedback,
}) => {
  return (
    <div className="cadastrar-container">
      <div className="cadastrar-card">
        <h3 id="tituloOperacao" name="tituloOperacao" className="cadastrar-titulo">
          CADASTRAR
        </h3>

        <form id="formCadastrar" name="formCadastrar" className="cadastrar-form" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <div className="form-group form-group-full">
              <label htmlFor="nome" className="form-label">
                Nome Completo <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className={`form-input ${erros.nome ? 'form-input-error' : ''}`}
                placeholder="Ex: João da Silva"
                maxLength={100}
                value={formData.nome}
                onChange={onChange}
                required
              />
              {erros.nome ? (
                <span className="form-error-text">{erros.nome}</span>
              ) : (
                <span className="form-help-text">Entre 3 e 100 caracteres.</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                E-mail <span className="form-label-required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${erros.email ? 'form-input-error' : ''}`}
                placeholder="usuario@dominio.com"
                value={formData.email}
                onChange={onChange}
                required
              />
              {erros.email ? (
                <span className="form-error-text">{erros.email}</span>
              ) : (
                <span className="form-help-text">Formato válido e único no sistema.</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cpf" className="form-label">
                CPF <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                className={`form-input ${erros.cpf ? 'form-input-error' : ''}`}
                placeholder="000.000.000-00"
                maxLength={14}
                value={formData.cpf}
                onChange={onChange}
                required
              />
              {erros.cpf ? (
                <span className="form-error-text">{erros.cpf}</span>
              ) : (
                <span className="form-help-text">11 dígitos com validação e único.</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="telefone" className="form-label">
                Telefone <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                className={`form-input ${erros.telefone ? 'form-input-error' : ''}`}
                placeholder="(00) 00000-0000"
                maxLength={15}
                value={formData.telefone}
                onChange={onChange}
                required
              />
              {erros.telefone ? (
                <span className="form-error-text">{erros.telefone}</span>
              ) : (
                <span className="form-help-text">DDD + 8 ou 9 dígitos.</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group form-group-small">
              <label htmlFor="cep" className="form-label">
                CEP <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                className={`form-input ${erros.cep ? 'form-input-error' : ''}`}
                placeholder="00000-000"
                maxLength={9}
                value={formData.cep}
                onChange={onChange}
                onBlur={onCepBlur}
                required
              />
              {buscandoCep ? (
                <span className="form-help-text">Buscando CEP...</span>
              ) : erros.cep ? (
                <span className="form-error-text">{erros.cep}</span>
              ) : (
                <span className="form-help-text">Preenchimento automático.</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="endereco" className="form-label">
                Endereço <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                className={`form-input form-input-readonly ${erros.endereco ? 'form-input-error' : ''}`}
                placeholder="Preenchido via CEP"
                value={formData.endereco}
                readOnly
              />
              {erros.endereco && <span className="form-error-text">{erros.endereco}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="bairro" className="form-label">
                Bairro <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                className={`form-input form-input-readonly ${erros.bairro ? 'form-input-error' : ''}`}
                placeholder="Preenchido via CEP"
                value={formData.bairro}
                readOnly
              />
              {erros.bairro && <span className="form-error-text">{erros.bairro}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cidade" className="form-label">
                Cidade <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                className={`form-input form-input-readonly ${erros.cidade ? 'form-input-error' : ''}`}
                placeholder="Preenchido via CEP"
                value={formData.cidade}
                readOnly
              />
              {erros.cidade && <span className="form-error-text">{erros.cidade}</span>}
            </div>

            <div className="form-group form-group-small">
              <label htmlFor="uf" className="form-label">
                UF <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="uf"
                name="uf"
                className={`form-input form-input-readonly ${erros.uf ? 'form-input-error' : ''}`}
                placeholder="UF"
                maxLength={2}
                value={formData.uf}
                readOnly
              />
              {erros.uf && <span className="form-error-text">{erros.uf}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="complemento" className="form-label">
                Complemento
              </label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                className={`form-input ${erros.complemento ? 'form-input-error' : ''}`}
                placeholder="Apto, Bloco..."
                maxLength={10}
                value={formData.complemento}
                onChange={onChange}
              />
              {erros.complemento ? (
                <span className="form-error-text">{erros.complemento}</span>
              ) : (
                <span className="form-help-text">Máximo 10 caracteres.</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="pontoDeReferencia" className="form-label">
                Ponto de Referência
              </label>
              <input
                type="text"
                id="pontoDeReferencia"
                name="pontoDeReferencia"
                className={`form-input ${erros.pontoDeReferencia ? 'form-input-error' : ''}`}
                placeholder="Ex: Próximo à estação"
                maxLength={30}
                value={formData.pontoDeReferencia}
                onChange={onChange}
              />
              {erros.pontoDeReferencia ? (
                <span className="form-error-text">{erros.pontoDeReferencia}</span>
              ) : (
                <span className="form-help-text">Máximo 30 caracteres.</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              id="btnLimpar"
              name="btnLimpar"
              className="btn-secondary"
              onClick={onLimpar}
              disabled={salvando}
            >
              Limpar
            </button>
            <button
              type="submit"
              id="btnSalvar"
              name="btnSalvar"
              className="btn-primary"
              disabled={salvando || buscandoCep}
            >
              {salvando ? 'Cadastrando...' : 'Cadastrar Cliente'}
            </button>
          </div>
        </form>
      </div>

      <FeedbackMessage feedback={feedback} onClose={onCloseFeedback} />
    </div>
  );
};


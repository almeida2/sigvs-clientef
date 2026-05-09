import React from "react";
import "./shared.css";

const ClienteConsultaCpfView = ({
  cpf,
  setCpf,
  cliente,
  mensagem,
  onConsultar,
  onVoltar,
}) => {
  return (
    <div className="cliente-consulta-cpf-view">
      <h2 className="title">Consultar Cliente</h2>

      <div className="form-grid">
        {!cliente ? (
          <>
            <div className="form-row full">
              <label className="form-label">CPF</label>
              <input
                className="form-input"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Digite o CPF"
                required
              />
            </div>
            <div className="button-group">
              <button className="button secondary" onClick={onVoltar}>
                Voltar
              </button>
              <button className="button primary" onClick={onConsultar}>
                Consultar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="form-row">
              <label className="form-label">CPF</label>
              <input className="form-input" value={cliente.cpf} readOnly />
            </div>

            <div className="form-row">
              <label className="form-label">Nome Completo</label>
              <input className="form-input" value={cliente.nome} readOnly />
            </div>

            <div className="form-row">
              <label className="form-label">CEP</label>
              <input className="form-input" value={cliente.cep} readOnly />
            </div>

            <div className="form-row">
              <label className="form-label">Email</label>
              <input className="form-input" value={cliente.email} readOnly />
            </div>

            <div className="address-row">
              <div className="form-row">
                <label className="form-label">Logradouro</label>
                <input className="form-input" value={cliente.endereco} readOnly />
              </div>

              <div className="form-row">
                <label className="form-label">Complemento</label>
                <input
                  className="form-input"
                  value={cliente.complemento || ""}
                  readOnly
                />
              </div>

              <div className="form-row">
                <label className="form-label">Data Cadastro</label>
                <input
                  className="form-input"
                  value={cliente.dataCadastro}
                  readOnly
                />
              </div>
            </div>

            <div className="button-group">
              <button className="button secondary" onClick={onVoltar}>
                Voltar
              </button>
            </div>
          </>
        )}
      </div>

      {mensagem && (
        <div className={`mensagem ${mensagem.includes("não encontrado") ? "error" : "success"}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default ClienteConsultaCpfView;

// components/ClienteConsulta.jsx
import React, { useState } from "react";
import "./styles.css";

function ClienteConsultarView({ clientes, loading, error, onVoltar }) {
  const [currentPage, setCurrentPage] = useState(1);
  const registrosPorPagina = 20;

  if (loading) {
    return <div className="loading-message">Carregando dados...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!clientes || clientes.length === 0) {
    return <div className="no-data-message">Nenhum cliente encontrado.</div>;
  }

  // Lógica para paginação
  const indexUltimoRegistro = currentPage * registrosPorPagina;
  const indexPrimeiroRegistro = indexUltimoRegistro - registrosPorPagina;
  const registrosAtuais = clientes.slice(indexPrimeiroRegistro, indexUltimoRegistro);
  const totalPaginas = Math.ceil(clientes.length / registrosPorPagina);

  // Funções para navegação entre páginas
  const proximaPagina = () => {
    if (currentPage < totalPaginas) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginaAnterior = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (

    <div className="cliente-consultar-view">
      <h2 className="title">Consulta de Clientes</h2>
      <table className="cliente-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>CEP</th>
            <th>Endereço</th>
            <th>Complemento</th>
            <th>Email</th>
            <th>Data de Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {registrosAtuais.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cep}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.complemento}</td>
              <td>{cliente.email}</td>
              <td>{cliente.dataCadastro}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginacao-container">
        <button
          onClick={paginaAnterior}
          disabled={currentPage === 1}
          className="button secondary paginacao-button"
        >
          Anterior
        </button>
        <span className="paginacao-info">
          Página {currentPage} de {totalPaginas}
        </span>
        <button
          onClick={proximaPagina}
          disabled={currentPage === totalPaginas}
          className="button secondary paginacao-button"
        >
          Próxima
        </button>
      </div>

      <div className="button-group">
        <button id="voltar" onClick={onVoltar} className="button secondary">
          Voltar
        </button>
      </div>
    </div>
  );
}

export default ClienteConsultarView;
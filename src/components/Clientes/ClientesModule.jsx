import { useState } from 'react';
import { Header } from '../Header/Header';
import { Navbar } from '../Navbar/Navbar';
import { ListarClientesContainer } from './Listar';
import { CadastrarClientesContainer } from './Cadastrar';
import { ConsultarClienteContainer } from './Consultar';
import { EditarClienteContainer } from './Editar';
import { ExcluirClienteContainer } from './Excluir';
import './ClientesModule.css';

export const ClientesModule = () => {
  const [operacaoAtiva, setOperacaoAtiva] = useState('Listar');
  const [clienteIdSelecionado, setClienteIdSelecionado] = useState(null);

  const handleNavegar = (novaOperacao, clienteId = null) => {
    setOperacaoAtiva(novaOperacao);
    setClienteIdSelecionado(clienteId);
  };

  return (
    <div id="moduloClientes" name="moduloClientes" className="clientes-layout">
      <Header titulo="Gestão de Clientes" />
      <Navbar
        operacaoAtiva={operacaoAtiva}
        onMudarOperacao={(op) => handleNavegar(op, null)}
      />

      <main id="conteudoPrincipal" name="conteudoPrincipal" className="clientes-content">
        {operacaoAtiva === 'Listar' && (
          <ListarClientesContainer
            onNavegar={handleNavegar}
            onSelecionarCliente={setClienteIdSelecionado}
          />
        )}

        {operacaoAtiva === 'Cadastrar' && (
          <CadastrarClientesContainer onNavegar={handleNavegar} />
        )}

        {operacaoAtiva === 'Consultar' && (
          <ConsultarClienteContainer
            clienteIdInicial={clienteIdSelecionado}
            onNavegar={handleNavegar}
          />
        )}

        {operacaoAtiva === 'Atualizar' && (
          <EditarClienteContainer
            clienteIdInicial={clienteIdSelecionado}
            onNavegar={handleNavegar}
          />
        )}

        {operacaoAtiva === 'Excluir' && (
          <ExcluirClienteContainer
            clienteIdInicial={clienteIdSelecionado}
            onNavegar={handleNavegar}
          />
        )}
      </main>
    </div>
  );
};


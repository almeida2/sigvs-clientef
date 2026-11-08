import { useState, useEffect, useCallback } from 'react';
import { clienteService } from '../../../services/clienteService';
import { ListarClientesView } from './ListarClientesView';

export const ListarClientesContainer = ({ onNavegar, onSelecionarCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const buscarClientes = useCallback(async () => {
    try {
      const data = await clienteService.listarClientes();
      const lista = Array.isArray(data) ? data : data?.content || [];
      setClientes(lista);
    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'error',
      });
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    let ativo = true;

    clienteService
      .listarClientes()
      .then((data) => {
        if (!ativo) return;
        const lista = Array.isArray(data) ? data : data?.content || [];
        setClientes(lista);
      })
      .catch((error) => {
        if (!ativo) return;
        setFeedback({
          message: error.message,
          type: 'error',
        });
      })
      .finally(() => {
        if (ativo) {
          setCarregando(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  const handleRecarregar = async () => {
    setCarregando(true);
    await buscarClientes();
  };

  const clientesFiltrados = clientes.filter((c) => {
    const termo = filtro.trim().toLowerCase();
    if (!termo) return true;
    const nome = (c.nome || '').toLowerCase();
    const email = (c.email || '').toLowerCase();
    const cpf = (c.cpf || '').toLowerCase();
    return nome.includes(termo) || email.includes(termo) || cpf.includes(termo);
  });

  const handleConsultar = (id) => {
    if (onSelecionarCliente) onSelecionarCliente(id);
    if (onNavegar) onNavegar('Consultar', id);
  };

  const handleEditar = (id) => {
    if (onSelecionarCliente) onSelecionarCliente(id);
    if (onNavegar) onNavegar('Atualizar', id);
  };

  const handleExcluir = (id) => {
    if (onSelecionarCliente) onSelecionarCliente(id);
    if (onNavegar) onNavegar('Excluir', id);
  };

  const handleNovoCliente = () => {
    if (onNavegar) onNavegar('Cadastrar', null);
  };

  const handleCloseFeedback = () => {
    setFeedback({ message: '', type: '' });
  };

  return (
    <ListarClientesView
      clientes={clientesFiltrados}
      filtro={filtro}
      carregando={carregando}
      feedback={feedback}
      onFiltroChange={setFiltro}
      onRecarregar={handleRecarregar}
      onNovoCliente={handleNovoCliente}
      onConsultar={handleConsultar}
      onEditar={handleEditar}
      onExcluir={handleExcluir}
      onCloseFeedback={handleCloseFeedback}
    />
  );
};

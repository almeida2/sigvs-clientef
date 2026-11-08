import { useState, useEffect, useCallback } from 'react';
import { clienteService } from '../../../services/clienteService';
import { formatarCPF } from '../../../utils/formatters';
import { ConsultarClienteView } from './ConsultarClienteView';

export const ConsultarClienteContainer = ({ clienteIdInicial = null, onNavegar }) => {
  const [buscaId, setBuscaId] = useState(clienteIdInicial ? String(clienteIdInicial) : '');
  const [buscaCpf, setBuscaCpf] = useState('');
  const [cliente, setCliente] = useState(null);
  const [buscando, setBuscando] = useState(Boolean(clienteIdInicial));
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const executarBuscaPorId = useCallback(async (idParaBuscar) => {
    if (!idParaBuscar) return;
    setBuscando(true);
    setCliente(null);
    try {
      const data = await clienteService.buscarClientePorId(idParaBuscar);
      setCliente(data);
      setFeedback({
        message: `Cliente "${data.nome}" localizado com sucesso.`,
        type: 'success',
      });
    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'error',
      });
    } finally {
      setBuscando(false);
    }
  }, []);

  useEffect(() => {
    if (!clienteIdInicial) return;

    let ativo = true;

    clienteService
      .buscarClientePorId(clienteIdInicial)
      .then((data) => {
        if (!ativo) return;
        setCliente(data);
        setFeedback({
          message: `Cliente "${data.nome}" localizado com sucesso.`,
          type: 'success',
        });
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
          setBuscando(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, [clienteIdInicial]);

  const handleBuscarPorId = (e) => {
    if (e) e.preventDefault();
    executarBuscaPorId(buscaId.trim());
  };

  const handleBuscarPorCpf = async (e) => {
    if (e) e.preventDefault();
    if (!buscaCpf.trim()) return;

    setBuscando(true);
    setCliente(null);
    try {
      const data = await clienteService.buscarClientePorCpf(buscaCpf.trim());
      setCliente(data);
      setFeedback({
        message: `Cliente "${data.nome}" localizado com sucesso.`,
        type: 'success',
      });
    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'error',
      });
    } finally {
      setBuscando(false);
    }
  };

  const handleBuscaCpfChange = (valor) => {
    setBuscaCpf(formatarCPF(valor));
  };

  const handleLimpar = () => {
    setBuscaId('');
    setBuscaCpf('');
    setCliente(null);
    setFeedback({ message: '', type: '' });
  };

  const handleEditar = (id) => {
    if (onNavegar) onNavegar('Atualizar', id);
  };

  const handleExcluir = (id) => {
    if (onNavegar) onNavegar('Excluir', id);
  };

  const handleCloseFeedback = () => {
    setFeedback({ message: '', type: '' });
  };

  return (
    <ConsultarClienteView
      buscaId={buscaId}
      buscaCpf={buscaCpf}
      cliente={cliente}
      buscando={buscando}
      feedback={feedback}
      onBuscaIdChange={setBuscaId}
      onBuscaCpfChange={handleBuscaCpfChange}
      onBuscarPorId={handleBuscarPorId}
      onBuscarPorCpf={handleBuscarPorCpf}
      onLimpar={handleLimpar}
      onEditar={handleEditar}
      onExcluir={handleExcluir}
      onCloseFeedback={handleCloseFeedback}
    />
  );
};

import { useState, useEffect, useCallback } from 'react';
import { clienteService } from '../../../services/clienteService';
import { formatarCPF } from '../../../utils/formatters';
import { ExcluirClienteView } from './ExcluirClienteView';

export const ExcluirClienteContainer = ({ clienteIdInicial = null, onNavegar }) => {
  const [buscaId, setBuscaId] = useState(clienteIdInicial ? String(clienteIdInicial) : '');
  const [buscaCpf, setBuscaCpf] = useState('');
  const [cliente, setCliente] = useState(null);
  const [buscando, setBuscando] = useState(Boolean(clienteIdInicial));
  const [excluindo, setExcluindo] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const carregarPorId = useCallback(async (idParaBuscar) => {
    if (!idParaBuscar) return;
    setBuscando(true);
    setCliente(null);
    try {
      const data = await clienteService.buscarClientePorId(idParaBuscar);
      setCliente(data);
      setFeedback({
        message: `Cliente "${data.nome}" localizado. Revise os dados abaixo antes de confirmar a exclusão.`,
        type: 'info',
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
          message: `Cliente "${data.nome}" localizado. Revise os dados abaixo antes de confirmar a exclusão.`,
          type: 'info',
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
    carregarPorId(buscaId.trim());
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
        message: `Cliente "${data.nome}" localizado. Revise os dados abaixo antes de confirmar a exclusão.`,
        type: 'info',
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

  const handleConfirmarExclusao = async () => {
    if (!cliente) return;
    const chaveExclusao = cliente.cpf || cliente.id;
    if (!chaveExclusao) return;

    setExcluindo(true);
    try {
      await clienteService.excluirCliente(chaveExclusao);
      const nomeRemovido = cliente.nome;
      setFeedback({
        message: `Cliente "${nomeRemovido}" excluído com sucesso.`,
        type: 'success',
      });
      setCliente(null);
      setBuscaId('');
      setBuscaCpf('');
    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'error',
      });
    } finally {
      setExcluindo(false);
    }
  };

  const handleCancelar = () => {
    setCliente(null);
    setBuscaId('');
    setBuscaCpf('');
    setFeedback({ message: '', type: '' });
    if (onNavegar) onNavegar('Listar', null);
  };

  const handleCloseFeedback = () => {
    setFeedback({ message: '', type: '' });
  };

  return (
    <ExcluirClienteView
      buscaId={buscaId}
      buscaCpf={buscaCpf}
      cliente={cliente}
      buscando={buscando}
      excluindo={excluindo}
      feedback={feedback}
      onBuscaIdChange={setBuscaId}
      onBuscaCpfChange={(val) => setBuscaCpf(formatarCPF(val))}
      onBuscarPorId={handleBuscarPorId}
      onBuscarPorCpf={handleBuscarPorCpf}
      onConfirmar={handleConfirmarExclusao}
      onCancelar={handleCancelar}
      onCloseFeedback={handleCloseFeedback}
    />
  );
};

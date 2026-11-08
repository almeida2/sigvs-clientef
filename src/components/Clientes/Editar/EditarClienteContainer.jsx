import { useState, useEffect, useCallback, useRef } from 'react';
import { clienteService } from '../../../services/clienteService';
import { validarCliente } from '../../../utils/validators';
import {
  formatarCPF,
  formatarTelefone,
  formatarCEP,
  desformatar,
} from '../../../utils/formatters';
import { EditarClienteView } from './EditarClienteView';

const ESTADO_INICIAL = {
  id: '',
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  cep: '',
  endereco: '',
  bairro: '',
  cidade: '',
  uf: '',
  complemento: '',
  pontoDeReferencia: '',
  dataDeCadastro: '',
};

export const EditarClienteContainer = ({ clienteIdInicial = null, onNavegar }) => {
  const [buscaId, setBuscaId] = useState(clienteIdInicial ? String(clienteIdInicial) : '');
  const [buscaCpf, setBuscaCpf] = useState('');
  const [formData, setFormData] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(Boolean(clienteIdInicial));
  const [salvando, setSalvando] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [clienteCarregado, setClienteCarregado] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const ultimoCepConsultadoRef = useRef('');

  const preencherFormularioComDados = useCallback((dados) => {
    setFormData({
      id: dados.id ?? '',
      nome: dados.nome ?? '',
      email: dados.email ?? '',
      cpf: formatarCPF(dados.cpf ?? ''),
      telefone: formatarTelefone(dados.telefone ?? ''),
      cep: formatarCEP(dados.cep ?? ''),
      endereco: dados.endereco ?? '',
      bairro: dados.bairro ?? '',
      cidade: dados.cidade ?? '',
      uf: dados.uf ?? '',
      complemento: dados.complemento ?? '',
      pontoDeReferencia: dados.pontoDeReferencia ?? '',
      dataDeCadastro: dados.dataDeCadastro ?? '',
    });
    setClienteCarregado(true);
    ultimoCepConsultadoRef.current = desformatar(dados.cep ?? '');
    setErros({});
  }, []);

  const carregarPorId = useCallback(async (idParaBuscar) => {
    if (!idParaBuscar) return;
    setCarregando(true);
    setClienteCarregado(false);
    try {
      const data = await clienteService.buscarClientePorId(idParaBuscar);
      preencherFormularioComDados(data);
      setFeedback({
        message: `Cliente "${data.nome}" carregado para edição.`,
        type: 'info',
      });
    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'error',
      });
    } finally {
      setCarregando(false);
    }
  }, [preencherFormularioComDados]);

  useEffect(() => {
    if (!clienteIdInicial) return;

    let ativo = true;

    clienteService
      .buscarClientePorId(clienteIdInicial)
      .then((data) => {
        if (!ativo) return;
        preencherFormularioComDados(data);
        setFeedback({
          message: `Cliente "${data.nome}" carregado para edição.`,
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
          setCarregando(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, [clienteIdInicial, preencherFormularioComDados]);

  const handleBuscarPorId = (e) => {
    if (e) e.preventDefault();
    carregarPorId(buscaId.trim());
  };

  const handleBuscarPorCpf = async (e) => {
    if (e) e.preventDefault();
    if (!buscaCpf.trim()) return;

    setCarregando(true);
    setClienteCarregado(false);
    try {
      const data = await clienteService.buscarClientePorCpf(buscaCpf.trim());
      preencherFormularioComDados(data);
      setFeedback({
        message: `Cliente "${data.nome}" carregado para edição.`,
        type: 'info',
      });
    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'error',
      });
    } finally {
      setCarregando(false);
    }
  };

  const buscarEnderecoPorCep = async (cepValue) => {
    const cepLimpo = desformatar(cepValue);
    if (cepLimpo.length !== 8 || ultimoCepConsultadoRef.current === cepLimpo) {
      return;
    }

    ultimoCepConsultadoRef.current = cepLimpo;
    setBuscandoCep(true);
    try {
      const dadosEndereco = await clienteService.consultarCep(cepLimpo);
      setFormData((prev) => ({
        ...prev,
        endereco: dadosEndereco.endereco,
        bairro: dadosEndereco.bairro,
        cidade: dadosEndereco.cidade,
        uf: dadosEndereco.uf,
      }));
      setErros((prev) => {
        const novosErros = { ...prev };
        delete novosErros.cep;
        delete novosErros.endereco;
        delete novosErros.bairro;
        delete novosErros.cidade;
        delete novosErros.uf;
        return novosErros;
      });
    } catch (error) {
      setFeedback({
        message: error.message || 'CEP não encontrado.',
        type: 'error',
      });
    } finally {
      setBuscandoCep(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let novoValor = value;

    if (name === 'cpf') {
      novoValor = formatarCPF(value);
    } else if (name === 'telefone') {
      novoValor = formatarTelefone(value);
    } else if (name === 'cep') {
      novoValor = formatarCEP(value);
      if (desformatar(novoValor).length === 8) {
        buscarEnderecoPorCep(novoValor);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: novoValor,
    }));

    if (erros[name]) {
      setErros((prev) => {
        const novosErros = { ...prev };
        delete novosErros[name];
        return novosErros;
      });
    }
  };

  const handleCepBlur = () => {
    if (formData.cep && desformatar(formData.cep).length === 8) {
      buscarEnderecoPorCep(formData.cep);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validacao = validarCliente(formData);
    if (!validacao.valido) {
      setErros(validacao.erros);
      setFeedback({
        message: 'Por favor, corrija os erros apontados no formulário antes de salvar.',
        type: 'error',
      });
      return;
    }

    setSalvando(true);
    try {
      const clienteAtualizado = await clienteService.atualizarCliente(formData.id, formData);
      setFeedback({
        message: 'Cliente atualizado com sucesso.',
        type: 'success',
      });
      if (clienteAtualizado) {
        preencherFormularioComDados(clienteAtualizado);
      }
    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'error',
      });
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    setFormData(ESTADO_INICIAL);
    setClienteCarregado(false);
    setErros({});
    setFeedback({ message: '', type: '' });
    if (onNavegar) onNavegar('Listar', null);
  };

  const handleCloseFeedback = () => {
    setFeedback({ message: '', type: '' });
  };

  return (
    <EditarClienteView
      buscaId={buscaId}
      buscaCpf={buscaCpf}
      formData={formData}
      erros={erros}
      carregando={carregando}
      salvando={salvando}
      buscandoCep={buscandoCep}
      clienteCarregado={clienteCarregado}
      feedback={feedback}
      onBuscaIdChange={setBuscaId}
      onBuscaCpfChange={(val) => setBuscaCpf(formatarCPF(val))}
      onBuscarPorId={handleBuscarPorId}
      onBuscarPorCpf={handleBuscarPorCpf}
      onChange={handleChange}
      onCepBlur={handleCepBlur}
      onSubmit={handleSubmit}
      onCancelar={handleCancelar}
      onCloseFeedback={handleCloseFeedback}
    />
  );
};

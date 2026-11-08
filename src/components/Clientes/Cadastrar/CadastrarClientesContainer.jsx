import { useState, useRef } from 'react';
import { clienteService } from '../../../services/clienteService';
import { validarCliente } from '../../../utils/validators';
import {
  formatarCPF,
  formatarTelefone,
  formatarCEP,
  desformatar,
} from '../../../utils/formatters';
import { CadastrarClientesView } from './CadastrarClientesView';

const ESTADO_INICIAL = {
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
};

export const CadastrarClientesContainer = () => {
  const [formData, setFormData] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const ultimoCepConsultadoRef = useRef('');

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
      setFormData((prev) => ({
        ...prev,
        endereco: '',
        bairro: '',
        cidade: '',
        uf: '',
      }));
      setErros((prev) => ({
        ...prev,
        cep: error.message || 'CEP não encontrado.',
      }));
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
        message: 'Por favor, corrija os erros apontados no formulário antes de continuar.',
        type: 'error',
      });
      return;
    }

    setSalvando(true);
    try {
      await clienteService.cadastrarCliente(formData);
      setFeedback({
        message: 'Cadastro realizado com sucesso.',
        type: 'success',
      });
      setFormData(ESTADO_INICIAL);
      setErros({});
      ultimoCepConsultadoRef.current = '';
    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'error',
      });
    } finally {
      setSalvando(false);
    }
  };

  const handleLimpar = () => {
    setFormData(ESTADO_INICIAL);
    setErros({});
    setFeedback({ message: '', type: '' });
    ultimoCepConsultadoRef.current = '';
  };

  const handleCloseFeedback = () => {
    setFeedback({ message: '', type: '' });
  };

  return (
    <CadastrarClientesView
      formData={formData}
      erros={erros}
      salvando={salvando}
      buscandoCep={buscandoCep}
      feedback={feedback}
      onChange={handleChange}
      onCepBlur={handleCepBlur}
      onSubmit={handleSubmit}
      onLimpar={handleLimpar}
      onCloseFeedback={handleCloseFeedback}
    />
  );
};


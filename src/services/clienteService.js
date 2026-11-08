import { API_BASE_URL } from '../config/apiConfig';
import { desformatar } from '../utils/formatters';

const criarErroConexao = (operacao) => {
  const destino = API_BASE_URL || 'http://localhost:8080 (via proxy)';
  return new Error(
    `Não foi possível conectar ao servidor backend em "${destino}" para ${operacao}. Verifique se o serviço REST está em execução.`
  );
};

const extrairMensagemErro = async (response, mensagemPadrao) => {
  try {
    const data = await response.json();
    if (data && data.message) return data.message;
    if (data && data.erro) return data.erro;
    if (typeof data === 'string') return data;
  } catch {
    // Falha silenciosa ao ler JSON, usa a mensagem padrão
  }
  return mensagemPadrao;
};

const desempacotarResposta = (json) => {
  if (json && typeof json === 'object' && 'data' in json && json.data !== null && json.data !== undefined) {
    return json.data;
  }
  return json;
};

export const clienteService = {
  async listarClientes(page = 0, size = 10) {
    try {
      // 1. Tenta primeiramente o endpoint /all (padrão do ClienteController)
      let response = await fetch(`${API_BASE_URL}/api/v1/clientes/all`);

      // 2. Se o /all não existir (404), tenta o endpoint paginado /api/v1/clientes
      if (response.status === 404) {
        response = await fetch(`${API_BASE_URL}/api/v1/clientes?page=${page}&size=${size}`);
      }

      if (!response.ok) {
        const msg = await extrairMensagemErro(response, `Erro ao listar clientes (${response.status})`);
        throw new Error(msg);
      }

      const rawJson = await response.json();
      const resultado = desempacotarResposta(rawJson);

      // Suporta Array direto, Page Spring Data (content: [...]) ou ResponseApi (data: [...])
      if (Array.isArray(resultado)) {
        return resultado;
      }
      if (resultado && Array.isArray(resultado.content)) {
        return resultado.content;
      }
      if (resultado && Array.isArray(resultado.data)) {
        return resultado.data;
      }
      return [];
    } catch (error) {
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        throw criarErroConexao('listar clientes');
      }
      throw error;
    }
  },

  async buscarClientePorId(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/clientes/${id}`);
      if (response.status === 404) {
        throw new Error(`Cliente com ID ${id} não foi encontrado.`);
      }
      if (!response.ok) {
        const msg = await extrairMensagemErro(response, `Erro ao buscar cliente por ID (${response.status})`);
        throw new Error(msg);
      }
      const raw = await response.json();
      return desempacotarResposta(raw);
    } catch (error) {
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        throw criarErroConexao('buscar cliente por ID');
      }
      throw error;
    }
  },

  async buscarClientePorCpf(cpf) {
    try {
      const cpfDigitos = desformatar(cpf) || cpf.trim();
      const response = await fetch(`${API_BASE_URL}/api/v1/clientes/${encodeURIComponent(cpfDigitos)}`);
      if (response.status === 404) {
        throw new Error(`Cliente com CPF ${cpf} não foi encontrado.`);
      }
      if (!response.ok) {
        const msg = await extrairMensagemErro(response, `Erro ao buscar cliente por CPF (${response.status})`);
        throw new Error(msg);
      }
      const raw = await response.json();
      return desempacotarResposta(raw);
    } catch (error) {
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        throw criarErroConexao('buscar cliente por CPF');
      }
      throw error;
    }
  },

  async consultarCep(cep) {
    const cepLimpo = desformatar(cep);
    if (!cepLimpo || cepLimpo.length !== 8) {
      throw new Error('O CEP informado deve conter exatamente 8 dígitos.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/clientes/cep/${cepLimpo}`);
      if (response.status === 404) {
        throw new Error(`CEP ${cep} não encontrado.`);
      }
      if (!response.ok) {
        const msg = await extrairMensagemErro(response, `Erro ao consultar CEP (${response.status})`);
        throw new Error(msg);
      }
      const raw = await response.json();
      const data = desempacotarResposta(raw);

      if (data.erro === true || data.erro === 'true') {
        throw new Error(`CEP ${cep} não encontrado.`);
      }

      return {
        cep: data.cep || cep,
        endereco: data.logradouro || data.endereco || '',
        bairro: data.bairro || '',
        cidade: data.localidade || data.cidade || '',
        uf: data.uf || '',
      };
    } catch (error) {
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        throw criarErroConexao('consultar CEP');
      }
      throw error;
    }
  },

  async cadastrarCliente(dados) {
    // Formata campos de acordo com ClienteDTO do backend (11 dígitos para CPF, 8 para CEP)
    const payload = {
      nome: (dados.nome || '').trim(),
      email: (dados.email || '').trim(),
      cpf: desformatar(dados.cpf) || (dados.cpf || '').trim(),
      telefone: (dados.telefone || '').trim(),
      cep: desformatar(dados.cep) || (dados.cep || '').trim(),
      endereco: (dados.endereco || '').trim(),
      bairro: (dados.bairro || '').trim(),
      cidade: (dados.cidade || '').trim(),
      uf: (dados.uf || '').trim().toUpperCase(),
      complemento: (dados.complemento || '').trim(),
      pontoDeReferencia: (dados.pontoDeReferencia || '').trim(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/clientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        const msg = await extrairMensagemErro(
          response,
          'E-mail ou CPF já cadastrado no sistema. Por favor, verifique os dados.'
        );
        throw new Error(msg);
      }

      if (!response.ok) {
        const msg = await extrairMensagemErro(response, `Falha ao cadastrar cliente (${response.status})`);
        throw new Error(msg);
      }

      const raw = await response.json();
      return desempacotarResposta(raw);
    } catch (error) {
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        throw criarErroConexao('cadastrar o cliente');
      }
      throw error;
    }
  },

  async atualizarCliente(id, dados) {
    const payload = {
      nome: (dados.nome || '').trim(),
      email: (dados.email || '').trim(),
      cpf: desformatar(dados.cpf) || (dados.cpf || '').trim(),
      telefone: (dados.telefone || '').trim(),
      cep: desformatar(dados.cep) || (dados.cep || '').trim(),
      endereco: (dados.endereco || '').trim(),
      bairro: (dados.bairro || '').trim(),
      cidade: (dados.cidade || '').trim(),
      uf: (dados.uf || '').trim().toUpperCase(),
      complemento: (dados.complemento || '').trim(),
      pontoDeReferencia: (dados.pontoDeReferencia || '').trim(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        throw new Error(`Cliente com ID ${id} não foi encontrado para atualização.`);
      }

      if (response.status === 409) {
        const msg = await extrairMensagemErro(
          response,
          'E-mail ou CPF já cadastrado para outro cliente.'
        );
        throw new Error(msg);
      }

      if (!response.ok) {
        const msg = await extrairMensagemErro(response, `Falha ao atualizar cliente (${response.status})`);
        throw new Error(msg);
      }

      const raw = await response.json();
      return desempacotarResposta(raw);
    } catch (error) {
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        throw criarErroConexao('atualizar o cliente');
      }
      throw error;
    }
  },

  async excluirCliente(identificador) {
    try {
      // Pode ser ID ou CPF
      const chave = desformatar(String(identificador)) || identificador;
      const response = await fetch(`${API_BASE_URL}/api/v1/clientes/${chave}`, {
        method: 'DELETE',
      });

      if (response.status === 404) {
        throw new Error(`Cliente com identificador "${identificador}" não foi encontrado para exclusão.`);
      }

      if (!response.ok) {
        const msg = await extrairMensagemErro(response, `Falha ao excluir cliente (${response.status})`);
        throw new Error(msg);
      }

      return true;
    } catch (error) {
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        throw criarErroConexao('excluir o cliente');
      }
      throw error;
    }
  },
};

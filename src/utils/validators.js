import { desformatar } from './formatters';

export const validarCPF = (cpf) => {
  const digitos = desformatar(cpf);
  if (!digitos || digitos.length !== 11) return false;

  // Rejeita sequências de dígitos iguais
  if (/^(\d)\1{10}$/.test(digitos)) return false;

  // Validação do 1º dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(digitos.charAt(i), 10) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(digitos.charAt(9), 10)) return false;

  // Validação do 2º dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(digitos.charAt(i), 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(digitos.charAt(10), 10)) return false;

  return true;
};

export const validarEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

export const validarCliente = (dados) => {
  const erros = {};

  // Nome
  const nome = (dados.nome || '').trim();
  if (!nome) {
    erros.nome = 'O nome é obrigatório.';
  } else if (nome.length < 3 || nome.length > 100) {
    erros.nome = 'O nome deve ter entre 3 e 100 caracteres.';
  }

  // E-mail
  const email = (dados.email || '').trim();
  if (!email) {
    erros.email = 'O e-mail é obrigatório.';
  } else if (!validarEmail(email)) {
    erros.email = 'Formato de e-mail inválido (exemplo: usuario@dominio.com).';
  }

  // CPF
  const cpf = (dados.cpf || '').trim();
  if (!cpf) {
    erros.cpf = 'O CPF é obrigatório.';
  } else if (!validarCPF(cpf)) {
    erros.cpf = 'CPF inválido. Verifique os dígitos digitados.';
  }

  // Telefone
  const telDigitos = desformatar(dados.telefone);
  if (!telDigitos) {
    erros.telefone = 'O telefone é obrigatório.';
  } else if (telDigitos.length < 10 || telDigitos.length > 11) {
    erros.telefone = 'Telefone inválido. Digite DDD + número (10 ou 11 dígitos).';
  }

  // CEP
  const cepDigitos = desformatar(dados.cep);
  if (!cepDigitos) {
    erros.cep = 'O CEP é obrigatório.';
  } else if (cepDigitos.length !== 8) {
    erros.cep = 'O CEP deve conter 8 dígitos.';
  }

  // Endereço
  if (!(dados.endereco || '').trim()) {
    erros.endereco = 'O endereço é obrigatório (preenchido via CEP).';
  }

  // Bairro
  if (!(dados.bairro || '').trim()) {
    erros.bairro = 'O bairro é obrigatório (preenchido via CEP).';
  }

  // Cidade
  if (!(dados.cidade || '').trim()) {
    erros.cidade = 'A cidade é obrigatória (preenchida via CEP).';
  }

  // UF
  const uf = (dados.uf || '').trim();
  if (!uf) {
    erros.uf = 'A UF é obrigatória (preenchida via CEP).';
  } else if (uf.length !== 2) {
    erros.uf = 'UF inválida (deve conter 2 letras).';
  }

  // Complemento
  if (dados.complemento && dados.complemento.trim().length > 10) {
    erros.complemento = 'O complemento deve ter no máximo 10 caracteres.';
  }

  // Ponto de Referência
  if (dados.pontoDeReferencia && dados.pontoDeReferencia.trim().length > 30) {
    erros.pontoDeReferencia = 'O ponto de referência deve ter no máximo 30 caracteres.';
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  };
};


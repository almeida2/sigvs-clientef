export const desformatar = (valor) => {
  if (!valor) return '';
  return String(valor).replace(/\D/g, '');
};

export const formatarCPF = (valor) => {
  const digitos = desformatar(valor).slice(0, 11);
  if (!digitos) return '';
  if (digitos.length <= 3) return digitos;
  if (digitos.length <= 6) return `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
  if (digitos.length <= 9) return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9, 11)}`;
};

export const formatarTelefone = (valor) => {
  const digitos = desformatar(valor).slice(0, 11);
  if (!digitos) return '';
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7, 11)}`;
};

export const formatarCEP = (valor) => {
  const digitos = desformatar(valor).slice(0, 8);
  if (!digitos) return '';
  if (digitos.length <= 5) return digitos;
  return `${digitos.slice(0, 5)}-${digitos.slice(5, 8)}`;
};

export const formatarData = (data = new Date()) => {
  const d = data instanceof Date ? data : new Date(data);
  if (isNaN(d.getTime())) return '';
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

export const formatarHora = (data = new Date()) => {
  const d = data instanceof Date ? data : new Date(data);
  if (isNaN(d.getTime())) return '';
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export const formatarDataHora = (data = new Date()) => {
  const d = data instanceof Date ? data : new Date(data);
  if (isNaN(d.getTime())) return '';
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano} ${h}:${m}`;
};


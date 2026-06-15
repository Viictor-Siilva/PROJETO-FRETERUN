// ─── VALIDAÇÕES ───────────────────────────────────────────

export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarTelefone = (telefone) => {
  const regex = /^(\d{10,11})$/;
  const apenasNumeros = telefone.replace(/\D/g, '');
  return regex.test(apenasNumeros);
};

export const validarSenha = (senha) => {
  // Mínimo 6 caracteres, pelo menos 1 número e 1 letra
  return senha.length >= 6 && /[0-9]/.test(senha) && /[a-zA-Z]/.test(senha);
};

export const validarNome = (nome) => {
  return nome.trim().length >= 3;
};

export const validarPlaca = (placa) => {
  // Formato: ABC-1234 ou ABC1234
  const regex = /^[A-Z]{3}-?\d{4}$/i;
  return regex.test(placa.toUpperCase());
};

export const validarCPF = (cpf) => {
  const apenasNumeros = cpf.replace(/\D/g, '');
  if (apenasNumeros.length !== 11) return false;
  
  // Validação simples de CPF
  if (/^(\d)\1{10}$/.test(apenasNumeros)) return false;
  
  return true;
};

export const formatarTelefone = (telefone) => {
  const apenasNumeros = telefone.replace(/\D/g, '');
  if (apenasNumeros.length === 10) {
    return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return telefone;
};

export const formatarPlaca = (placa) => {
  const apenasLetrasNumeros = placa.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  if (apenasLetrasNumeros.length === 7) {
    return apenasLetrasNumeros.slice(0, 3) + '-' + apenasLetrasNumeros.slice(3);
  }
  return placa;
};

export const formatarCPF = (cpf) => {
  const apenasNumeros = cpf.replace(/\D/g, '');
  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return cpf;
};

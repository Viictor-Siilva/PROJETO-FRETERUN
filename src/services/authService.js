import AsyncStorage from '@react-native-async-storage/async-storage';
import { USUARIOS_TESTE } from '../utils/constants';

const USUARIOS_KEY = '@freterun_usuarios';
const USUARIO_LOGADO_KEY = '@freterun_usuario_logado';

// Inicializar usuários de teste
export const inicializarUsuarios = async () => {
  try {
    const usuariosExistentes = await AsyncStorage.getItem(USUARIOS_KEY);
    if (!usuariosExistentes) {
      await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(USUARIOS_TESTE));
    }
  } catch (error) {
    console.error('Erro ao inicializar usuários:', error);
  }
};

// Buscar usuário por email e senha
export const buscarUsuario = async (email, senha, perfil) => {
  try {
    const usuariosJSON = await AsyncStorage.getItem(USUARIOS_KEY);
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    
    return usuarios.find(
      u => u.email.toLowerCase() === email.toLowerCase()
        && u.senha === senha
        && u.perfil === perfil
    ) || null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
};

// Registrar novo usuário
export const registrarUsuario = async (usuario) => {
  try {
    const usuariosJSON = await AsyncStorage.getItem(USUARIOS_KEY);
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    
    // Verificar se email já existe
    if (usuarios.find(u => u.email.toLowerCase() === usuario.email.toLowerCase())) {
      throw new Error('E-mail já cadastrado');
    }
    
    const novoUsuario = {
      id: String(usuarios.length + 1),
      ...usuario,
    };
    
    usuarios.push(novoUsuario);
    await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
    
    return novoUsuario;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

// Fazer login
export const fazerLogin = async (email, senha, perfil) => {
  try {
    const usuario = await buscarUsuario(email, senha, perfil);
    
    if (!usuario) {
      throw new Error('E-mail, senha ou perfil incorretos');
    }
    
    // Salvar usuário logado
    await AsyncStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(usuario));
    
    return usuario;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Obter usuário logado
export const obterUsuarioLogado = async () => {
  try {
    const usuarioJSON = await AsyncStorage.getItem(USUARIO_LOGADO_KEY);
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
  } catch (error) {
    console.error('Erro ao obter usuário logado:', error);
    return null;
  }
};

// Fazer logout
export const fazerLogout = async () => {
  try {
    await AsyncStorage.removeItem(USUARIO_LOGADO_KEY);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

// Atualizar perfil do usuário
export const atualizarPerfil = async (usuarioId, dadosAtualizacao) => {
  try {
    const usuariosJSON = await AsyncStorage.getItem(USUARIOS_KEY);
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    
    const indice = usuarios.findIndex(u => u.id === usuarioId);
    if (indice === -1) {
      throw new Error('Usuário não encontrado');
    }
    
    usuarios[indice] = { ...usuarios[indice], ...dadosAtualizacao };
    await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
    
    // Atualizar usuário logado se for o mesmo
    const usuarioLogado = await obterUsuarioLogado();
    if (usuarioLogado && usuarioLogado.id === usuarioId) {
      await AsyncStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(usuarios[indice]));
    }
    
    return usuarios[indice];
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    throw error;
  }
};

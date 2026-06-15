import AsyncStorage from '@react-native-async-storage/async-storage';

const FRETES_KEY = '@freterun_fretes';
const CONTADOR_FRETES_KEY = '@freterun_contador_fretes';

// Obter todos os fretes
export const obterFretes = async () => {
  try {
    const fretesJSON = await AsyncStorage.getItem(FRETES_KEY);
    return fretesJSON ? JSON.parse(fretesJSON) : [];
  } catch (error) {
    console.error('Erro ao obter fretes:', error);
    return [];
  }
};

// Obter fretes de um cliente
export const obterFretesCliente = async (clienteId) => {
  try {
    const fretes = await obterFretes();
    return fretes.filter(f => f.clienteId === clienteId);
  } catch (error) {
    console.error('Erro ao obter fretes do cliente:', error);
    return [];
  }
};

// Obter fretes aceitos por um motorista
export const obterFretesMotorista = async (motoristaId) => {
  try {
    const fretes = await obterFretes();
    return fretes.filter(f => f.motoristaId === motoristaId);
  } catch (error) {
    console.error('Erro ao obter fretes do motorista:', error);
    return [];
  }
};

// Criar novo frete
export const criarFrete = async (frete) => {
  try {
    const fretes = await obterFretes();
    let contador = await AsyncStorage.getItem(CONTADOR_FRETES_KEY);
    contador = contador ? parseInt(contador) + 1 : 1;
    
    const novoFrete = {
      id: String(contador),
      dataHora: new Date().toISOString(),
      status: 'pendente', // pendente, aceito, em_rota, entregue, cancelado
      etapa: 0,
      ...frete,
    };
    
    fretes.push(novoFrete);
    await AsyncStorage.setItem(FRETES_KEY, JSON.stringify(fretes));
    await AsyncStorage.setItem(CONTADOR_FRETES_KEY, String(contador));
    
    return novoFrete;
  } catch (error) {
    console.error('Erro ao criar frete:', error);
    throw error;
  }
};

// Aceitar frete (motorista)
export const aceitarFrete = async (freteId, motoristaId) => {
  try {
    const fretes = await obterFretes();
    const indice = fretes.findIndex(f => f.id === freteId);
    
    if (indice === -1) {
      throw new Error('Frete não encontrado');
    }
    
    fretes[indice].motoristaId = motoristaId;
    fretes[indice].status = 'aceito';
    fretes[indice].dataAceite = new Date().toISOString();
    
    await AsyncStorage.setItem(FRETES_KEY, JSON.stringify(fretes));
    
    return fretes[indice];
  } catch (error) {
    console.error('Erro ao aceitar frete:', error);
    throw error;
  }
};

// Atualizar etapa do frete
export const atualizarEtapaFrete = async (freteId, etapa) => {
  try {
    const fretes = await obterFretes();
    const indice = fretes.findIndex(f => f.id === freteId);
    
    if (indice === -1) {
      throw new Error('Frete não encontrado');
    }
    
    fretes[indice].etapa = etapa;
    
    if (etapa === 5) { // Última etapa
      fretes[indice].status = 'entregue';
      fretes[indice].dataEntrega = new Date().toISOString();
    } else {
      fretes[indice].status = 'em_rota';
    }
    
    await AsyncStorage.setItem(FRETES_KEY, JSON.stringify(fretes));
    
    return fretes[indice];
  } catch (error) {
    console.error('Erro ao atualizar etapa:', error);
    throw error;
  }
};

// Cancelar frete
export const cancelarFrete = async (freteId) => {
  try {
    const fretes = await obterFretes();
    const indice = fretes.findIndex(f => f.id === freteId);
    
    if (indice === -1) {
      throw new Error('Frete não encontrado');
    }
    
    fretes[indice].status = 'cancelado';
    fretes[indice].dataCancelamento = new Date().toISOString();
    
    await AsyncStorage.setItem(FRETES_KEY, JSON.stringify(fretes));
    
    return fretes[indice];
  } catch (error) {
    console.error('Erro ao cancelar frete:', error);
    throw error;
  }
};

// Avaliar frete
export const avaliarFrete = async (freteId, avaliacao) => {
  try {
    const fretes = await obterFretes();
    const indice = fretes.findIndex(f => f.id === freteId);
    
    if (indice === -1) {
      throw new Error('Frete não encontrado');
    }
    
    fretes[indice].avaliacao = avaliacao;
    fretes[indice].dataAvaliacao = new Date().toISOString();
    
    await AsyncStorage.setItem(FRETES_KEY, JSON.stringify(fretes));
    
    return fretes[indice];
  } catch (error) {
    console.error('Erro ao avaliar frete:', error);
    throw error;
  }
};

// Obter frete por ID
export const obterFretePorId = async (freteId) => {
  try {
    const fretes = await obterFretes();
    return fretes.find(f => f.id === freteId) || null;
  } catch (error) {
    console.error('Erro ao obter frete:', error);
    return null;
  }
};

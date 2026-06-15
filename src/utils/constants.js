// ─── CORES ───────────────────────────────────────────────
export const COLORS = {
  bg:       '#0A0F1E',
  card:     '#111827',
  border:   '#1F2937',
  green:    '#16A34A',
  white:    '#FFFFFF',
  muted:    '#9CA3AF',
  dim:      '#6B7280',
  input:    '#1F2937',
  emerald:  '#10B981',
  blue:     '#3B82F6',
  red:      '#EF4444',
  yellow:   '#FBBF24',
};

// ─── TIPOS DE FRETE ───────────────────────────────────────
export const TIPOS_FRETE = [
  { id:'mudanca', icon:'home-outline',  label:'Mudança',  preco:280 },
  { id:'carga',   icon:'cube-outline',  label:'Carga',    preco:190 },
  { id:'pequeno', icon:'bag-outline',   label:'Pequenos', preco:85  },
  { id:'especial',icon:'star-outline',  label:'Especial', preco:350 },
];

// ─── USUÁRIOS DE TESTE ───────────────────────────────────
export const USUARIOS_TESTE = [
  { id:'1', nome:'João Silva',     email:'joao@email.com',   senha:'123456', perfil:'cliente'   },
  { id:'2', nome:'Maria Oliveira', email:'maria@email.com',  senha:'123456', perfil:'cliente'   },
  { id:'3', nome:'Ana Costa',      email:'ana@email.com',    senha:'123456', perfil:'cliente'   },
  { id:'4', nome:'Carlos Santos',  email:'carlos@email.com', senha:'123456', perfil:'motorista' },
  { id:'5', nome:'Pedro Alves',    email:'pedro@email.com',  senha:'123456', perfil:'motorista' },
];

// ─── ETAPAS DE RASTREIO ───────────────────────────────────
export const ETAPAS_RASTREIO = [
  { icon:'search',           txt:'Buscando motorista...',        cor:'#3B82F6'    },
  { icon:'person-add',       txt:'Motorista encontrado!',        cor:'#16A34A'   },
  { icon:'car',              txt:'Motorista a caminho',          cor:'#16A34A'   },
  { icon:'cube',             txt:'Carga coletada — em rota',     cor:'#FBBF24'  },
  { icon:'navigate',         txt:'Chegando ao destino...',       cor:'#FBBF24'  },
  { icon:'checkmark-circle', txt:'Frete concluído! ✅',          cor:'#10B981' },
];

// ─── CORRIDAS DISPONÍVEIS ─────────────────────────────────
export const CORRIDAS_DISPONIVEIS = [
  { id:'1', cliente:'Mariana Costa', tipo:'Mudança',  origem:'Rua Augusta, 850 - SP',    destino:'Av. Rebouças, 1200 - SP',  dist:'3.2 km', tempo:'~12 min', valor:'R$ 320,00', peso:'~200 kg', av:'4.8' },
  { id:'2', cliente:'Roberto Alves', tipo:'Carga',    origem:'CEAGESP - Leopoldina',      destino:'Mercado Bom Preço',         dist:'7.5 km', tempo:'~22 min', valor:'R$ 190,00', peso:'~500 kg', av:'4.6' },
  { id:'3', cliente:'Fernanda Lima', tipo:'Pequenos', origem:'Shopping Ibirapuera',        destino:'R. Domingos de Morais, 500',dist:'1.8 km', tempo:'~8 min',  valor:'R$ 85,00',  peso:'~20 kg',  av:'5.0' },
];

// ─── GANHOS DO DIA ────────────────────────────────────────
export const GANHOS_DIA = [
  { id:'1', cliente:'Ana Costa',    tipo:'Mudança',  valor:'R$ 280,00', hora:'09:30' },
  { id:'2', cliente:'Paulo Lima',   tipo:'Carga',    valor:'R$ 190,00', hora:'12:15' },
  { id:'3', cliente:'Sofia Mendes', tipo:'Pequenos', valor:'R$ 85,00',  hora:'15:45' },
  { id:'4', cliente:'Lucas Rocha',  tipo:'Especial', valor:'R$ 350,00', hora:'18:20' },
];

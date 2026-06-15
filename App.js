import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, KeyboardAvoidingView,
  Platform, Alert, Switch, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatModal } from './src/components/ChatModal';
import { AvaliacaoModal } from './src/components/AvaliacaoModal';
import { Toast } from './src/components/Toast';
import { COLORS, TIPOS_FRETE, USUARIOS_TESTE, CORRIDAS_DISPONIVEIS, GANHOS_DIA, ETAPAS_RASTREIO } from './src/utils/constants';
import { inicializarUsuarios, buscarUsuario, registrarUsuario, fazerLogin, fazerLogout, obterUsuarioLogado } from './src/services/authService';
import { criarFrete, obterFretesCliente, aceitarFrete, atualizarEtapaFrete, cancelarFrete, avaliarFrete } from './src/services/freteService';
import { validarEmail, validarTelefone, validarSenha, validarNome, formatarTelefone } from './src/utils/validations';
import { commonStyles } from './src/utils/styles';

// ─── LANDING PAGE ─────────────────────────────────────────
function Landing({ ir }) {
  return (
    <SafeAreaView style={commonStyles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Navbar */}
        <View style={commonStyles.nav}>
          <View style={commonStyles.navLogo}>
            <Ionicons name="car-sport" size={18} color={COLORS.green} />
            <Text style={commonStyles.navLogoTxt}>FRETERUN</Text>
          </View>
          <TouchableOpacity style={commonStyles.navBtn} onPress={() => ir('login')}>
            <Text style={commonStyles.navBtnTxt}>Entrar</Text>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={commonStyles.hero}>
          <View style={commonStyles.badge}>
            <View style={commonStyles.badgeDot} />
            <Text style={commonStyles.badgeTxt}>Disponível na sua cidade</Text>
          </View>
          <Text style={commonStyles.heroTitulo}>
            Seu frete{' '}
            <Text style={{ color:COLORS.green }}>{'sob\ndemanda'}</Text>
            {'\nem minutos.'}
          </Text>
          <Text style={commonStyles.heroSub}>
            Conectamos você a motoristas verificados para fretes urbanos e pequenas mudanças. Rápido, seguro e com preço justo.
          </Text>
          <View style={commonStyles.heroBtns}>
            <TouchableOpacity style={commonStyles.btnVerde} onPress={() => ir('cadastro', {}, { perfil:'cliente' })} activeOpacity={0.85}>
              <Text style={commonStyles.btnVerdeTxt}>Solicitar agora</Text>
              <Ionicons name="arrow-forward" size={15} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.btnBorda} onPress={() => ir('cadastro', {}, { perfil:'motorista' })} activeOpacity={0.85}>
              <Text style={commonStyles.btnBordaTxt}>Quero ser motorista</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Como funciona */}
        <View style={commonStyles.secao}>
          <Text style={commonStyles.secaoLabel}>COMO FUNCIONA</Text>
          <Text style={commonStyles.secaoTitulo}>Simples, rápido e seguro</Text>
          {[
            { num:'01', icon:'location-outline', titulo:'Informe o endereço', desc:'Digite a origem e destino do seu frete.' },
            { num:'02', icon:'car-outline', titulo:'Motorista aceita', desc:'Um motorista verificado aceita em minutos.' },
            { num:'03', icon:'navigate-outline', titulo:'Acompanhe em tempo real', desc:'Rastreie do início ao fim com segurança.' },
          ].map(item => (
            <View key={item.num} style={s.passo}>
              <View style={s.passoNum}><Text style={s.passoNumTxt}>{item.num}</Text></View>
              <View style={s.passoIcon}><Ionicons name={item.icon} size={22} color={COLORS.green} /></View>
              <View style={{ flex:1 }}>
                <Text style={s.passoTitulo}>{item.titulo}</Text>
                <Text style={s.passoDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Vantagens */}
        <View style={commonStyles.secao}>
          <Text style={commonStyles.secaoLabel}>VANTAGENS</Text>
          <Text style={commonStyles.secaoTitulo}>Por que escolher a FreteRun?</Text>
          <View style={s.grid}>
            {[
              { icon:'shield-checkmark-outline', titulo:'Motoristas verificados', desc:'Checagem completa de documentos' },
              { icon:'flash-outline', titulo:'Rápido e eficiente', desc:'Motoristas disponíveis em minutos' },
              { icon:'cash-outline', titulo:'Preço justo', desc:'Tarifas transparentes' },
              { icon:'navigate-outline', titulo:'Rastreamento', desc:'Acompanhe em tempo real' },
            ].map(v => (
              <View key={v.titulo} style={s.vantagem}>
                <View style={s.vantagemIcon}><Ionicons name={v.icon} size={20} color={COLORS.green} /></View>
                <Text style={s.vantagemTitulo}>{v.titulo}</Text>
                <Text style={s.vantagemDesc}>{v.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View style={s.cta}>
          <Text style={s.ctaTitulo}>Pronto para começar?</Text>
          <Text style={s.ctaSub}>Junte-se a milhares de clientes e motoristas</Text>
          <TouchableOpacity style={commonStyles.btnVerde} onPress={() => ir('cadastro', {}, { perfil:'cliente' })} activeOpacity={0.85}>
            <Text style={commonStyles.btnVerdeTxt}>Criar conta grátis</Text>
            <Ionicons name="arrow-forward" size={15} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={commonStyles.footer}>
          <Text style={commonStyles.footerTxt}>© 2026 FreteRun. Todos os direitos reservados.</Text>
          <TouchableOpacity onPress={() => ir('login')}>
            <Text style={{ color:COLORS.green, fontSize:12, marginTop:8 }}>Já tenho conta → Entrar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── CADASTRO ─────────────────────────────────────────────
function Cadastro({ extra, ir }) {
  const [perfil, setPerfil] = useState(extra?.perfil || 'cliente');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [placa, setPlaca] = useState('');
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false });

  const validarFormulario = () => {
    const novosErros = {};

    if (!validarNome(nome)) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }
    if (!validarTelefone(telefone)) {
      novosErros.telefone = 'Telefone inválido (10 ou 11 dígitos)';
    }
    if (!validarEmail(email)) {
      novosErros.email = 'E-mail inválido';
    }
    if (!validarSenha(senha)) {
      novosErros.senha = 'Senha deve ter 6+ caracteres, número e letra';
    }

    if (perfil === 'motorista') {
      if (!veiculo.trim()) {
        novosErros.veiculo = 'Tipo de veículo é obrigatório';
      }
      if (!placa.trim()) {
        novosErros.placa = 'Placa do veículo é obrigatória';
      }
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastro = async () => {
    if (!validarFormulario()) {
      setToast({ visible: true, type: 'error', message: 'Preencha todos os campos corretamente' });
      return;
    }

    setLoading(true);
    try {
      const novoUsuario = await registrarUsuario({
        nome,
        telefone: formatarTelefone(telefone),
        email,
        senha,
        perfil,
        ...(perfil === 'motorista' && { veiculo, placa }),
      });

      setToast({ visible: true, type: 'success', message: 'Conta criada com sucesso!' });
      setTimeout(() => {
        ir('login');
      }, 1500);
    } catch (error) {
      setToast({ visible: true, type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safe}>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={commonStyles.scroll} keyboardShouldPersistTaps="handled">

          <TouchableOpacity style={s.voltar} onPress={() => ir('landing')}>
            <Ionicons name="arrow-back" size={14} color={COLORS.muted} />
            <Text style={s.voltarTxt}>Voltar</Text>
          </TouchableOpacity>

          <View style={s.logoRow}>
            <Ionicons name="car-sport" size={16} color={COLORS.green} />
            <Text style={s.logoTxt}>FRETERUN</Text>
          </View>

          <Text style={s.formTitulo}>Criar sua conta</Text>
          <Text style={s.formSub}>Cadastre-se para começar a usar a FRETERUN.</Text>

          <View style={s.toggle}>
            {['cliente','motorista'].map(p => (
              <TouchableOpacity
                key={p}
                style={[s.toggleBtn, perfil === p && s.toggleBtnAtivo]}
                onPress={() => setPerfil(p)}
              >
                <Text style={[s.toggleTxt, perfil === p && s.toggleTxtAtivo]}>
                  {p === 'cliente' ? 'Sou cliente' : 'Sou motorista'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {[
            { icon:'person-outline', ph:'Nome completo', val:nome, set:setNome, key:'nome', cap:'words' },
            { icon:'call-outline', ph:'Telefone', val:telefone, set:setTelefone, key:'telefone', kb:'phone-pad' },
            { icon:'mail-outline', ph:'E-mail', val:email, set:setEmail, key:'email', kb:'email-address' },
            { icon:'lock-closed-outline', ph:'Senha', val:senha, set:setSenha, key:'senha', sec:true },
          ].map(f => (
            <View key={f.key}>
              <View style={[commonStyles.campo, erros[f.key] && { borderColor:COLORS.red }]}>
                <Ionicons name={f.icon} size={15} color={COLORS.dim} />
                <TextInput
                  style={commonStyles.campoInput}
                  placeholder={f.ph}
                  placeholderTextColor={COLORS.dim}
                  value={f.val}
                  onChangeText={f.set}
                  keyboardType={f.kb || 'default'}
                  secureTextEntry={f.sec || false}
                  autoCapitalize={f.cap || 'none'}
                />
              </View>
              {erros[f.key] && <Text style={s.erroTxt}>{erros[f.key]}</Text>}
            </View>
          ))}

          {perfil === 'motorista' && (
            <>
              {[
                { icon:'car-outline', ph:'Tipo de veículo (ex: Van, Caminhão)', val:veiculo, set:setVeiculo, key:'veiculo' },
                { icon:'documents-outline', ph:'Placa do veículo', val:placa, set:setPlaca, key:'placa', cap:'characters' },
              ].map(f => (
                <View key={f.key}>
                  <View style={[commonStyles.campo, erros[f.key] && { borderColor:COLORS.red }]}>
                    <Ionicons name={f.icon} size={15} color={COLORS.dim} />
                    <TextInput
                      style={commonStyles.campoInput}
                      placeholder={f.ph}
                      placeholderTextColor={COLORS.dim}
                      value={f.val}
                      onChangeText={f.set}
                      autoCapitalize={f.cap || 'none'}
                    />
                  </View>
                  {erros[f.key] && <Text style={s.erroTxt}>{erros[f.key]}</Text>}
                </View>
              ))}
            </>
          )}

          <TouchableOpacity
            style={[commonStyles.btnVerde, { marginTop:14, opacity: loading ? 0.6 : 1 }]}
            onPress={handleCadastro}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={commonStyles.btnVerdeTxt}>{loading ? 'Criando conta...' : 'Criar conta'}</Text>
            {!loading && <Ionicons name="arrow-forward" size={15} color="#fff" />}
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems:'center', marginTop:20 }} onPress={() => ir('login')}>
            <Text style={{ fontSize:14, color:COLORS.muted }}>
              Já tem conta? <Text style={{ color:COLORS.green, fontWeight:'600' }}>Entrar</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
      <Toast {...toast} onDismiss={() => setToast({ visible: false })} />
    </SafeAreaView>
  );
}

// ─── LOGIN ────────────────────────────────────────────────
function Login({ ir }) {
  const [perfil, setPerfil] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [vis, setVis] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false });

  const entrar = async () => {
    setErro('');
    if (!perfil) return setErro('Selecione seu perfil.');
    if (!email || !senha) return setErro('Preencha e-mail e senha.');

    setLoading(true);
    try {
      const usuario = await fazerLogin(email, senha, perfil);
      setToast({ visible: true, type: 'success', message: 'Login realizado!' });
      setTimeout(() => {
        ir(usuario.perfil, usuario);
      }, 1000);
    } catch (error) {
      setErro(error.message);
      setToast({ visible: true, type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safe}>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={commonStyles.scroll} keyboardShouldPersistTaps="handled">

          <TouchableOpacity style={s.voltar} onPress={() => ir('landing')}>
            <Ionicons name="arrow-back" size={14} color={COLORS.muted} />
            <Text style={s.voltarTxt}>Voltar</Text>
          </TouchableOpacity>

          <View style={{ alignItems:'center', marginBottom:28 }}>
            <View style={s.logoBox}>
              <Ionicons name="car-sport" size={36} color={COLORS.green} />
            </View>
            <Text style={s.logoGrande}>
              Frete<Text style={{ color:COLORS.green }}>Run</Text>
            </Text>
            <Text style={{ fontSize:13, color:COLORS.muted, marginTop:4 }}>Fretes e mudanças na palma da mão</Text>
          </View>

          <View style={s.dicaCard}>
            <Ionicons name="information-circle-outline" size={14} color={COLORS.green} />
            <Text style={s.dicaTxt}>Toque em um usuário para preencher automaticamente</Text>
          </View>

          <View style={s.chips}>
            {USUARIOS_TESTE.map(u => (
              <TouchableOpacity
                key={u.id}
                style={s.chip}
                onPress={() => { setEmail(u.email); setSenha('123456'); setPerfil(u.perfil); setErro(''); }}
              >
                <Ionicons
                  name={u.perfil === 'cliente' ? 'person-outline' : 'car-outline'}
                  size={11}
                  color={u.perfil === 'cliente' ? COLORS.blue : COLORS.green}
                />
                <Text style={s.chipTxt}>{u.nome.split(' ')[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={s.secLabel}>ENTRAR COMO</Text>
          <View style={s.toggle}>
            {['cliente','motorista'].map(p => (
              <TouchableOpacity
                key={p}
                style={[s.toggleBtn, perfil === p && s.toggleBtnAtivo]}
                onPress={() => { setPerfil(p); setErro(''); }}
              >
                <Text style={[s.toggleTxt, perfil === p && s.toggleTxtAtivo]}>
                  {p === 'cliente' ? 'Cliente' : 'Motorista'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[commonStyles.campo, erro && { borderColor:COLORS.red }]}>
            <Ionicons name="mail-outline" size={15} color={COLORS.dim} />
            <TextInput
              style={commonStyles.campoInput}
              placeholder="E-mail"
              placeholderTextColor={COLORS.dim}
              value={email}
              onChangeText={t => { setEmail(t); setErro(''); }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={[commonStyles.campo, erro && { borderColor:COLORS.red }]}>
            <Ionicons name="lock-closed-outline" size={15} color={COLORS.dim} />
            <TextInput
              style={[commonStyles.campoInput, { flex:1 }]}
              placeholder="Senha"
              placeholderTextColor={COLORS.dim}
              value={senha}
              onChangeText={t => { setSenha(t); setErro(''); }}
              secureTextEntry={!vis}
            />
            <TouchableOpacity onPress={() => setVis(!vis)}>
              <Ionicons name={vis ? 'eye-off-outline' : 'eye-outline'} size={15} color={COLORS.dim} />
            </TouchableOpacity>
          </View>

          {erro ? (
            <View style={{ flexDirection:'row', alignItems:'center', gap:6, marginBottom:10 }}>
              <Ionicons name="alert-circle-outline" size={13} color={COLORS.red} />
              <Text style={{ fontSize:12, color:COLORS.red }}>{erro}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[commonStyles.btnVerde, { opacity: loading ? 0.6 : 1 }]}
            onPress={entrar}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={commonStyles.btnVerdeTxt}>{loading ? 'Entrando...' : 'Entrar'}</Text>
            {!loading && <Ionicons name="arrow-forward" size={16} color="#fff" />}
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems:'center', marginTop:20 }} onPress={() => ir('cadastro')}>
            <Text style={{ fontSize:14, color:COLORS.muted }}>
              Não tem conta? <Text style={{ color:COLORS.green, fontWeight:'600' }}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
      <Toast {...toast} onDismiss={() => setToast({ visible: false })} />
    </SafeAreaView>
  );
}

// ─── CLIENTE DASHBOARD ────────────────────────────────────
function ClienteDash({ usuario, ir }) {
  const nome = usuario?.nome || 'Cliente';
  const [tipo, setTipo] = useState(null);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [chat, setChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false });
  const preco = tipo ? TIPOS_FRETE.find(t => t.id === tipo)?.preco : null;

  const solicitarFrete = async () => {
    if (!tipo || !origem || !destino) {
      setToast({ visible: true, type: 'error', message: 'Preencha todos os campos' });
      return;
    }

    setLoading(true);
    try {
      const frete = await criarFrete({
        clienteId: usuario.id,
        tipo: TIPOS_FRETE.find(t => t.id === tipo)?.label,
        origem,
        destino,
        preco,
      });

      setToast({ visible: true, type: 'success', message: 'Frete solicitado!' });
      setTimeout(() => {
        ir('rastreio', usuario, frete);
      }, 1000);
    } catch (error) {
      setToast({ visible: true, type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safe}>
      <ScrollView contentContainerStyle={{ padding:20, paddingBottom:40 }} showsVerticalScrollIndicator={false}>

        <View style={commonStyles.card}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
            <View>
              <Text style={commonStyles.greeting}>Olá, {nome.split(' ')[0]} 👋</Text>
              <Text style={commonStyles.greetingSub}>Para onde vai o seu frete?</Text>
            </View>
            <View style={{ flexDirection:'row', gap:10, alignItems:'center' }}>
              <TouchableOpacity style={s.iconBtn} onPress={() => setChat(true)}>
                <Ionicons name="chatbubble-ellipses" size={19} color={COLORS.green} />
              </TouchableOpacity>
              <View style={commonStyles.avatar}><Text style={commonStyles.avatarTxt}>{nome[0]}</Text></View>
            </View>
          </View>
        </View>

        <View style={commonStyles.card}>
          <View style={{ flexDirection:'row', alignItems:'center', gap:6, marginBottom:14 }}>
            <Ionicons name="flash" size={15} color={COLORS.green} />
            <Text style={commonStyles.cardTitulo}>Novo frete</Text>
          </View>

          <Text style={commonStyles.label}>TIPO DE FRETE</Text>
          <View style={{ flexDirection:'row', gap:8, marginBottom:12 }}>
            {TIPOS_FRETE.map(t => (
              <TouchableOpacity
                key={t.id}
                style={[s.tipoBtn, tipo === t.id && s.tipoBtnAtivo]}
                onPress={() => setTipo(t.id)}
              >
                <Ionicons name={t.icon} size={17} color={tipo === t.id ? COLORS.green : COLORS.dim} />
                <Text style={[s.tipoTxt, tipo === t.id && { color:COLORS.green }]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {preco && (
            <View style={s.estimativa}>
              <Ionicons name="cash-outline" size={14} color={COLORS.green} />
              <Text style={s.estimativaTxt}>
                Valor estimado: <Text style={{ color:COLORS.white, fontWeight:'700' }}>R$ {preco},00</Text>
              </Text>
            </View>
          )}

          <Text style={commonStyles.label}>ORIGEM</Text>
          <View style={commonStyles.campo}>
            <View style={s.dotVerde} />
            <TextInput style={commonStyles.campoInput} placeholder="Endereço de coleta" placeholderTextColor={COLORS.dim} value={origem} onChangeText={setOrigem} />
            <Ionicons name="locate-outline" size={15} color={COLORS.green} />
          </View>

          <View style={{ width:1.5, height:8, backgroundColor:COLORS.border, marginLeft:13 }} />

          <Text style={commonStyles.label}>DESTINO</Text>
          <View style={commonStyles.campo}>
            <View style={[s.dotVerde, { backgroundColor:COLORS.emerald }]} />
            <TextInput style={commonStyles.campoInput} placeholder="Endereço de entrega" placeholderTextColor={COLORS.dim} value={destino} onChangeText={setDestino} />
            <Ionicons name="search-outline" size={15} color={COLORS.dim} />
          </View>

          <TouchableOpacity
            style={[commonStyles.btnVerde, { marginTop:14, opacity: loading ? 0.6 : 1 }]}
            onPress={solicitarFrete}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Ionicons name="car-sport" size={15} color="#fff" />
            <Text style={commonStyles.btnVerdeTxt}>{loading ? 'Solicitando...' : 'Solicitar motorista'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection:'row', gap:10, marginBottom:22 }}>
          {[['12','Fretes'],['4.9 ⭐','Avaliação'],['R$1.4k','Total']].map(([v,l]) => (
            <View key={l} style={s.statCard}>
              <Text style={s.statVal}>{v}</Text>
              <Text style={s.statLabel}>{l}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={s.sair} onPress={() => { fazerLogout(); ir('landing'); }}>
          <Ionicons name="log-out-outline" size={14} color={COLORS.dim} />
          <Text style={s.sairTxt}>Sair da conta</Text>
        </TouchableOpacity>

      </ScrollView>
      <ChatModal visivel={chat} fechar={() => setChat(false)} nomeOutro="Carlos Santos" usuarioId={usuario.id} />
      <Toast {...toast} onDismiss={() => setToast({ visible: false })} />
    </SafeAreaView>
  );
}

// ─── RASTREIO ─────────────────────────────────────────────
function Rastreio({ frete, usuario, ir }) {
  const [etapa, setEtapa] = useState(0);
  const [chat, setChat] = useState(false);
  const [avaliacao, setAvaliacao] = useState(false);

  const moto = { nome:'Carlos Santos', veiculo:'Fiat Fiorino', placa:'ABC-1234', avaliacao:'4.9' };

  useEffect(() => {
    if (etapa >= ETAPAS_RASTREIO.length - 1) return;
    const t = setTimeout(() => setEtapa(e => e + 1), 3000);
    return () => clearTimeout(t);
  }, [etapa]);

  const pct = (etapa / (ETAPAS_RASTREIO.length - 1)) * 100;
  const concluido = etapa === ETAPAS_RASTREIO.length - 1;

  return (
    <SafeAreaView style={commonStyles.safe}>
      <ScrollView contentContainerStyle={{ padding:20, paddingBottom:40 }} showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <TouchableOpacity style={s.backBtn} onPress={() => ir('cliente', usuario)}>
            <Ionicons name="arrow-back" size={18} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={{ fontSize:15, fontWeight:'700', color:COLORS.white }}>Acompanhar frete</Text>
          <View style={{ width:34 }} />
        </View>

        <View style={[commonStyles.card, { alignItems:'center' }]}>
          <View style={[s.statusIcon, { backgroundColor:ETAPAS_RASTREIO[etapa].cor + '22' }]}>
            <Ionicons name={ETAPAS_RASTREIO[etapa].icon} size={30} color={ETAPAS_RASTREIO[etapa].cor} />
          </View>
          <Text style={{ fontSize:15, fontWeight:'700', color:COLORS.white, marginBottom:14, textAlign:'center' }}>
            {ETAPAS_RASTREIO[etapa].txt}
          </Text>
          <View style={s.barraContainer}>
            <View style={[s.barra, { width:`${pct}%`, backgroundColor:ETAPAS_RASTREIO[etapa].cor }]} />
          </View>
          <Text style={{ fontSize:11, color:COLORS.muted, marginTop:6 }}>Etapa {etapa + 1} de {ETAPAS_RASTREIO.length}</Text>
        </View>

        {etapa >= 1 && (
          <View style={[commonStyles.card, { flexDirection:'row', alignItems:'center', gap:12 }]}>
            <View style={s.motoAvatar}><Text style={s.motoAvatarTxt}>{moto.nome[0]}</Text></View>
            <View style={{ flex:1 }}>
              <Text style={{ fontSize:14, fontWeight:'700', color:COLORS.white }}>{moto.nome}</Text>
              <Text style={{ fontSize:11, color:COLORS.dim, marginTop:2 }}>{moto.veiculo} · {moto.placa}</Text>
            </View>
            <TouchableOpacity style={s.iconBtn} onPress={() => setChat(true)}>
              <Ionicons name="chatbubble-ellipses" size={18} color={COLORS.green} />
            </TouchableOpacity>
          </View>
        )}

        <View style={commonStyles.card}>
          <Text style={{ fontSize:13, fontWeight:'700', color:COLORS.white, marginBottom:12 }}>Detalhes do frete</Text>
          {[
            { icon:'cube-outline',  label:'Tipo',   valor:frete?.tipo || 'Mudança' },
            { icon:'cash-outline',  label:'Valor',  valor:`R$ ${frete?.preco || 280},00` },
          ].map(item => (
            <View key={item.label} style={{ flexDirection:'row', alignItems:'center', gap:8, paddingVertical:8, borderBottomWidth:1, borderBottomColor:COLORS.border }}>
              <Ionicons name={item.icon} size={14} color={COLORS.green} />
              <Text style={{ fontSize:12, color:COLORS.muted, flex:1 }}>{item.label}</Text>
              <Text style={{ fontSize:12, color:COLORS.white, fontWeight:'600' }}>{item.valor}</Text>
            </View>
          ))}
        </View>

        {!concluido ? (
          <TouchableOpacity
            style={commonStyles.btnCancelar}
            onPress={() => Alert.alert('Cancelar frete?', '', [
              { text:'Não', style:'cancel' },
              { text:'Sim', style:'destructive', onPress:() => ir('cliente', usuario) },
            ])}
          >
            <Ionicons name="close-circle-outline" size={15} color={COLORS.red} />
            <Text style={{ color:COLORS.red, fontWeight:'600', fontSize:14 }}>Cancelar frete</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={commonStyles.btnVerde} onPress={() => setAvaliacao(true)}>
            <Ionicons name="star" size={15} color="#fff" />
            <Text style={commonStyles.btnVerdeTxt}>Avaliar motorista</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
      <ChatModal visivel={chat} fechar={() => setChat(false)} nomeOutro={moto.nome} usuarioId={usuario.id} />
      <AvaliacaoModal visivel={avaliacao} fechar={() => { setAvaliacao(false); ir('cliente', usuario); }} nomeMotorista={moto.nome} onAvaliar={(av) => console.log('Avaliação:', av)} />
    </SafeAreaView>
  );
}

// ─── MOTORISTA DASHBOARD ──────────────────────────────────
function MotoristaDash({ usuario, ir }) {
  const nome = usuario?.nome || 'Motorista';
  const [online, setOnline] = useState(true);
  const [aba, setAba] = useState('corridas');
  const [chat, setChat] = useState(false);
  const [chatNome, setChatNome] = useState('');

  return (
    <SafeAreaView style={commonStyles.safe}>
      <ScrollView contentContainerStyle={{ padding:20, paddingBottom:40 }} showsVerticalScrollIndicator={false}>

        <View style={commonStyles.card}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
            <View>
              <Text style={commonStyles.greeting}>Olá, {nome.split(' ')[0]} 🚛</Text>
              <View style={{ flexDirection:'row', alignItems:'center', gap:5, marginTop:3 }}>
                <View style={[s.dot, { backgroundColor:online ? COLORS.emerald : COLORS.red }]} />
                <Text style={[{ fontSize:12, fontWeight:'600' }, { color:online ? COLORS.emerald : COLORS.red }]}>
                  {online ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection:'row', alignItems:'center', gap:10 }}>
              <Switch
                value={online}
                onValueChange={setOnline}
                trackColor={{ false:'#374151', true:'#16A34A40' }}
                thumbColor={online ? COLORS.green : COLORS.dim}
                ios_backgroundColor="#374151"
              />
              <View style={commonStyles.avatar}><Text style={commonStyles.avatarTxt}>{nome[0]}</Text></View>
            </View>
          </View>
        </View>

        <View style={commonStyles.card}>
          <Text style={{ fontSize:11, color:COLORS.muted, marginBottom:12, fontWeight:'500' }}>Resumo de hoje</Text>
          <View style={{ flexDirection:'row', alignItems:'center' }}>
            {[
              { icon:'checkmark-circle', cor:COLORS.emerald, val:'4',    label:'Corridas' },
              { icon:'cash',             cor:COLORS.green,   val:'R$905', label:'Ganhos'   },
              { icon:'star',             cor:COLORS.yellow,  val:'4.9',   label:'Avaliação'},
              { icon:'navigate',         cor:COLORS.blue,    val:'38km',  label:'Rodados'  },
            ].map((item, i, arr) => (
              <React.Fragment key={item.label}>
                <View style={{ flex:1, alignItems:'center', gap:3 }}>
                  <Ionicons name={item.icon} size={16} color={item.cor} />
                  <Text style={{ fontSize:13, fontWeight:'800', color:COLORS.white }}>{item.val}</Text>
                  <Text style={{ fontSize:9, color:COLORS.dim }}>{item.label}</Text>
                </View>
                {i < arr.length - 1 && <View style={{ width:1, height:30, backgroundColor:COLORS.border }} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={s.abas}>
          {[['corridas','Fretes disponíveis'],['ganhos','Ganhos do dia']].map(([id, label]) => (
            <TouchableOpacity key={id} style={[s.aba, aba === id && s.abaAtiva]} onPress={() => setAba(id)}>
              <Text style={[s.abaTxt, aba === id && s.abaTxtAtiva]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {aba === 'corridas' && (online ? CORRIDAS_DISPONIVEIS.map(c => (
          <View key={c.id} style={commonStyles.card}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
              <View style={{ flexDirection:'row', alignItems:'center', gap:10 }}>
                <View style={s.clienteAv}><Text style={s.clienteAvTxt}>{c.cliente[0]}</Text></View>
                <View>
                  <Text style={{ fontSize:13, fontWeight:'700', color:COLORS.white }}>{c.cliente}</Text>
                  <View style={{ flexDirection:'row', alignItems:'center', gap:3 }}>
                    <Ionicons name="star" size={10} color={COLORS.yellow} />
                    <Text style={{ fontSize:10, color:COLORS.muted }}>{c.av}</Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems:'flex-end' }}>
                <Text style={{ fontSize:15, fontWeight:'800', color:COLORS.green }}>{c.valor}</Text>
                <View style={s.tag}><Text style={s.tagTxt}>{c.tipo}</Text></View>
              </View>
            </View>
            <View style={{ flexDirection:'row', gap:14, marginBottom:12 }}>
              {[{ icon:'navigate-outline', v:c.dist }, { icon:'time-outline', v:c.tempo }, { icon:'scale-outline', v:c.peso }].map(m => (
                <View key={m.v} style={{ flexDirection:'row', alignItems:'center', gap:4 }}>
                  <Ionicons name={m.icon} size={11} color={COLORS.dim} />
                  <Text style={{ fontSize:11, color:COLORS.dim }}>{m.v}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection:'row', gap:8 }}>
              <TouchableOpacity
                style={s.btnChat}
                onPress={() => { setChatNome(c.cliente); setChat(true); }}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={14} color={COLORS.blue} />
                <Text style={{ color:COLORS.blue, fontWeight:'600', fontSize:12 }}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[commonStyles.btnVerde, { flex:2 }]}
                onPress={() => Alert.alert('✅ Aceito!', `Dirija até:\n${c.origem}`, [{ text:'OK' }])}
              >
                <Ionicons name="checkmark" size={14} color="#fff" />
                <Text style={commonStyles.btnVerdeTxt}>Aceitar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )) : (
          <View style={{ alignItems:'center', paddingVertical:48, gap:8 }}>
            <Ionicons name="moon-outline" size={34} color={COLORS.dim} />
            <Text style={{ fontSize:16, fontWeight:'700', color:COLORS.muted }}>Você está offline</Text>
            <Text style={{ fontSize:12, color:COLORS.dim }}>Ative o modo online para receber fretes</Text>
          </View>
        ))}

        {aba === 'ganhos' && (
          <View>
            <View style={commonStyles.card}>
              <Text style={{ fontSize:12, color:COLORS.muted, marginBottom:4 }}>Total hoje</Text>
              <Text style={{ fontSize:28, fontWeight:'800', color:COLORS.green, marginBottom:6 }}>R$ 905,00</Text>
              <Text style={{ fontSize:11, color:COLORS.muted, marginBottom:8 }}>Meta: R$ 1.000,00 — falta R$ 95,00</Text>
              <View style={{ height:5, backgroundColor:COLORS.border, borderRadius:3, overflow:'hidden' }}>
                <View style={{ height:5, width:'90%', backgroundColor:COLORS.green, borderRadius:3 }} />
              </View>
            </View>
            {GANHOS_DIA.map(g => (
              <View key={g.id} style={[commonStyles.card, { flexDirection:'row', justifyContent:'space-between', alignItems:'center' }]}>
                <View style={{ flexDirection:'row', alignItems:'center', gap:10 }}>
                  <View style={s.ganhoIcon}><Ionicons name="cube-outline" size={14} color={COLORS.green} /></View>
                  <View>
                    <Text style={{ fontSize:13, fontWeight:'700', color:COLORS.white }}>{g.cliente}</Text>
                    <Text style={{ fontSize:11, color:COLORS.muted, marginTop:2 }}>{g.tipo} · {g.hora}</Text>
                  </View>
                </View>
                <Text style={{ fontSize:14, fontWeight:'800', color:COLORS.green }}>{g.valor}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={s.sair} onPress={() => { fazerLogout(); ir('landing'); }}>
          <Ionicons name="log-out-outline" size={14} color={COLORS.dim} />
          <Text style={s.sairTxt}>Sair da conta</Text>
        </TouchableOpacity>

      </ScrollView>
      <ChatModal visivel={chat} fechar={() => setChat(false)} nomeOutro={chatNome} usuarioId={usuario.id} />
    </SafeAreaView>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────
export default function App() {
  const [tela, setTela] = useState('landing');
  const [usuario, setUsuario] = useState({});
  const [frete, setFrete] = useState({});
  const [extra, setExtra] = useState({});

  useEffect(() => {
    inicializarUsuarios();
  }, []);

  const ir = (destino, dados = {}, fx = {}) => {
    setUsuario(dados);
    setFrete(fx);
    setExtra(fx);
    setTela(destino);
  };

  return (
    <View style={{ flex:1, backgroundColor:COLORS.bg }}>
      {tela === 'landing'   && <Landing   ir={ir} />}
      {tela === 'cadastro'  && <Cadastro  extra={extra} ir={ir} />}
      {tela === 'login'     && <Login     ir={ir} />}
      {tela === 'cliente'   && <ClienteDash  usuario={usuario} ir={ir} />}
      {tela === 'motorista' && <MotoristaDash usuario={usuario} ir={ir} />}
      {tela === 'rastreio'  && <Rastreio  frete={frete} usuario={usuario} ir={ir} />}
    </View>
  );
}

// ─── ESTILOS ──────────────────────────────────────────────
const s = StyleSheet.create({
  passo:       { flexDirection:'row', alignItems:'center', gap:12, backgroundColor:COLORS.card, borderRadius:14, borderWidth:1, borderColor:COLORS.border, padding:14, marginBottom:10 },
  passoNum:    { width:30, height:30, borderRadius:15, backgroundColor:COLORS.green, alignItems:'center', justifyContent:'center' },
  passoNumTxt: { color:'#fff', fontWeight:'800', fontSize:12 },
  passoIcon:   { width:44, height:44, borderRadius:22, backgroundColor:'#16A34A15', alignItems:'center', justifyContent:'center' },
  passoTitulo: { fontSize:13, fontWeight:'700', color:COLORS.white, marginBottom:3 },
  passoDesc:   { fontSize:11, color:COLORS.muted, lineHeight:16 },
  grid:        { flexDirection:'row', flexWrap:'wrap', gap:10 },
  vantagem:    { width:'47%', backgroundColor:COLORS.card, borderRadius:14, borderWidth:1, borderColor:COLORS.border, padding:14 },
  vantagemIcon:{ width:40, height:40, borderRadius:20, backgroundColor:'#16A34A15', alignItems:'center', justifyContent:'center', marginBottom:10 },
  vantagemTitulo:{ fontSize:13, fontWeight:'700', color:COLORS.white, marginBottom:4 },
  vantagemDesc:{ fontSize:11, color:COLORS.muted, lineHeight:16 },
  cta:         { margin:24, backgroundColor:'#0d1f0d', borderRadius:20, borderWidth:1, borderColor:'#16A34A30', padding:24, alignItems:'center', gap:10 },
  ctaTitulo:   { fontSize:20, fontWeight:'800', color:COLORS.white },
  ctaSub:      { fontSize:13, color:COLORS.muted, marginBottom:8 },
  voltar:      { flexDirection:'row', alignItems:'center', gap:6, marginBottom:24 },
  voltarTxt:   { fontSize:13, color:COLORS.muted },
  logoRow:     { flexDirection:'row', alignItems:'center', gap:8, marginBottom:20 },
  logoTxt:     { fontSize:13, fontWeight:'800', color:COLORS.white, letterSpacing:1.5 },
  logoBox:     { width:72, height:72, borderRadius:20, backgroundColor:'#16A34A18', borderWidth:1, borderColor:'#16A34A30', alignItems:'center', justifyContent:'center', marginBottom:12 },
  logoGrande:  { fontSize:30, fontWeight:'800', color:COLORS.white, letterSpacing:-0.5 },
  formTitulo:  { fontSize:24, fontWeight:'800', color:COLORS.white, marginBottom:6 },
  formSub:     { fontSize:13, color:COLORS.muted, marginBottom:24 },
  toggle:      { flexDirection:'row', backgroundColor:COLORS.card, borderRadius:10, borderWidth:1, borderColor:COLORS.border, padding:4, marginBottom:20 },
  toggleBtn:   { flex:1, paddingVertical:10, alignItems:'center', borderRadius:7 },
  toggleBtnAtivo:{ backgroundColor:COLORS.green },
  toggleTxt:   { fontSize:13, color:COLORS.muted, fontWeight:'600' },
  toggleTxtAtivo:{ color:'#fff' },
  erroTxt:     { fontSize:11, color:COLORS.red, marginBottom:8, marginLeft:14 },
  dicaCard:    { flexDirection:'row', alignItems:'center', gap:8, backgroundColor:'#16A34A10', borderRadius:8, borderWidth:1, borderColor:'#16A34A25', padding:10, marginBottom:14 },
  dicaTxt:     { fontSize:12, color:COLORS.muted, flex:1 },
  chips:       { flexDirection:'row', flexWrap:'wrap', gap:8, marginBottom:18 },
  chip:        { flexDirection:'row', alignItems:'center', gap:5, backgroundColor:COLORS.card, borderRadius:20, borderWidth:1, borderColor:COLORS.border, paddingHorizontal:11, paddingVertical:6 },
  chipTxt:     { fontSize:11, color:COLORS.muted },
  secLabel:    { fontSize:11, color:COLORS.muted, fontWeight:'600', textTransform:'uppercase', letterSpacing:1, marginBottom:10 },
  iconBtn:     { width:38, height:38, borderRadius:19, backgroundColor:'#16A34A15', alignItems:'center', justifyContent:'center' },
  tipoBtn:     { flex:1, backgroundColor:COLORS.input, borderRadius:8, borderWidth:1, borderColor:COLORS.border, alignItems:'center', paddingVertical:9, gap:4 },
  tipoBtnAtivo:{ borderColor:COLORS.green, backgroundColor:'#16A34A10' },
  tipoTxt:     { fontSize:9, color:COLORS.dim, fontWeight:'500' },
  estimativa:  { flexDirection:'row', alignItems:'center', gap:8, backgroundColor:'#16A34A10', borderRadius:8, padding:10, marginBottom:12 },
  estimativaTxt:{ fontSize:13, color:COLORS.muted },
  dotVerde:    { width:8, height:8, borderRadius:4, backgroundColor:COLORS.green },
  statCard:    { flex:1, backgroundColor:COLORS.card, borderRadius:12, borderWidth:1, borderColor:COLORS.border, padding:12, alignItems:'center' },
  statVal:     { fontSize:14, fontWeight:'800', color:COLORS.white, marginBottom:3 },
  statLabel:   { fontSize:9, color:COLORS.dim },
  sair:        { flexDirection:'row', alignItems:'center', justifyContent:'center', gap:6, marginTop:8, paddingVertical:12 },
  sairTxt:     { fontSize:13, color:COLORS.dim },
  statusIcon:  { width:68, height:68, borderRadius:34, alignItems:'center', justifyContent:'center', marginBottom:12 },
  barraContainer:{ width:'100%', height:5, backgroundColor:COLORS.input, borderRadius:3, overflow:'hidden' },
  barra:       { height:5, borderRadius:3 },
  backBtn:     { width:34, height:34, borderRadius:17, backgroundColor:COLORS.card, alignItems:'center', justifyContent:'center' },
  motoAvatar:  { width:44, height:44, borderRadius:22, backgroundColor:COLORS.green, alignItems:'center', justifyContent:'center' },
  motoAvatarTxt:{ color:'#fff', fontWeight:'800', fontSize:18 },
  dot:         { width:6, height:6, borderRadius:3 },
  abas:        { flexDirection:'row', backgroundColor:COLORS.card, borderRadius:10, borderWidth:1, borderColor:COLORS.border, padding:4, marginBottom:14 },
  aba:         { flex:1, paddingVertical:8, alignItems:'center', borderRadius:7 },
  abaAtiva:    { backgroundColor:COLORS.green },
  abaTxt:      { fontSize:11, color:COLORS.dim, fontWeight:'600' },
  abaTxtAtiva: { color:'#fff' },
  clienteAv:   { width:34, height:34, borderRadius:17, backgroundColor:'#3B82F615', alignItems:'center', justifyContent:'center' },
  clienteAvTxt:{ color:COLORS.blue, fontWeight:'700', fontSize:13 },
  tag:         { backgroundColor:'#16A34A12', borderRadius:5, paddingHorizontal:7, paddingVertical:2, marginTop:3 },
  tagTxt:      { fontSize:9, color:COLORS.green, fontWeight:'600' },
  btnChat:     { flex:1, borderWidth:1, borderColor:'#3B82F630', borderRadius:8, height:40, flexDirection:'row', alignItems:'center', justifyContent:'center', gap:4, backgroundColor:'#3B82F610' },
  ganhoIcon:   { width:34, height:34, borderRadius:17, backgroundColor:'#16A34A15', alignItems:'center', justifyContent:'center' },
});

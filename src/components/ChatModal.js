import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Modal, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

export const ChatModal = ({ visivel, fechar, nomeOutro, usuarioId }) => {
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([
    { id:'1', texto:'Olá! Estou a caminho.', meu:false, hora:'21:01' },
    { id:'2', texto:'Ok! Te aguardo na entrada.', meu:true, hora:'21:02' },
  ]);

  const enviar = () => {
    if (!msg.trim()) return;
    const hora = new Date().toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
    setMsgs(p => [...p, { id:String(Date.now()), texto:msg.trim(), meu:true, hora }]);
    setMsg('');
    setTimeout(() => {
      setMsgs(p => [...p, { id:String(Date.now()+1), texto:'Entendido! Já estou chegando.', meu:false, hora }]);
    }, 1200);
  };

  return (
    <Modal visible={visivel} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.chatBox}>
          <View style={styles.chatHeader}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarTxt}>{nomeOutro[0]}</Text>
            </View>
            <View>
              <Text style={styles.chatNome}>{nomeOutro}</Text>
              <Text style={styles.chatOnline}>● Online</Text>
            </View>
            <TouchableOpacity onPress={fechar} style={{ marginLeft:'auto' }}>
              <Ionicons name="close" size={22} color={COLORS.muted} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex:1 }} contentContainerStyle={{ padding:16, gap:10 }}>
            {msgs.map(m => (
              <View key={m.id} style={[styles.bubble, m.meu ? styles.bubbleMeu : styles.bubbleDele]}>
                <Text style={[styles.bubbleTxt, m.meu && { color:'#fff' }]}>{m.texto}</Text>
                <Text style={[styles.bubbleHora, m.meu && { color:'#ffffff88' }]}>{m.hora}</Text>
              </View>
            ))}
          </ScrollView>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.chatInput}>
              <TextInput
                style={styles.chatInputTxt}
                placeholder="Digite uma mensagem..."
                placeholderTextColor={COLORS.dim}
                value={msg}
                onChangeText={setMsg}
              />
              <TouchableOpacity style={styles.chatSend} onPress={enviar}>
                <Ionicons name="send" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'flex-end',
  },
  chatBox: {
    flex: 0.85,
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  chatAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatAvatarTxt: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  chatNome: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  chatOnline: {
    fontSize: 11,
    color: COLORS.emerald,
    marginTop: 2,
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 12,
  },
  bubbleMeu: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.green,
  },
  bubbleDele: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.input,
  },
  bubbleTxt: {
    fontSize: 13,
    color: COLORS.white,
  },
  bubbleHora: {
    fontSize: 10,
    color: '#ffffff66',
    marginTop: 4,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: COLORS.input,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chatInputTxt: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.white,
    fontSize: 13,
  },
  chatSend: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

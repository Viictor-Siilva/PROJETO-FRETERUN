import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Modal, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

export const AvaliacaoModal = ({ visivel, fechar, nomeMotorista, onAvaliar }) => {
  const [estrelas, setEstrelas] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleEnviar = () => {
    if (estrelas === 0) {
      Alert.alert('Atenção', 'Selecione uma avaliação');
      return;
    }
    
    onAvaliar?.({
      estrelas,
      comentario,
    });
    
    Alert.alert('Obrigado!', 'Avaliação enviada com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          setEstrelas(0);
          setComentario('');
          fechar();
        },
      },
    ]);
  };

  return (
    <Modal visible={visivel} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.avBox}>
          <Text style={styles.avTitulo}>Avaliar motorista</Text>
          <View style={styles.avAvatar}>
            <Text style={styles.avAvatarTxt}>{nomeMotorista[0]}</Text>
          </View>
          <Text style={styles.avNome}>{nomeMotorista}</Text>
          <Text style={styles.avSub}>Como foi sua experiência?</Text>
          
          <View style={styles.avEstrelas}>
            {[1, 2, 3, 4, 5].map(i => (
              <TouchableOpacity key={i} onPress={() => setEstrelas(i)}>
                <Ionicons
                  name={i <= estrelas ? 'star' : 'star-outline'}
                  size={36}
                  color={COLORS.yellow}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          <TextInput
            style={styles.avInput}
            placeholder="Deixe um comentário (opcional)"
            placeholderTextColor={COLORS.dim}
            value={comentario}
            onChangeText={setComentario}
            multiline
            numberOfLines={4}
          />
          
          <TouchableOpacity style={styles.avBtn} onPress={handleEnviar}>
            <Text style={styles.avBtnTxt}>Enviar avaliação</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={fechar} style={{ paddingVertical:12 }}>
            <Text style={{ color:COLORS.dim, textAlign:'center' }}>Cancelar</Text>
          </TouchableOpacity>
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
  avBox: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  avTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 16,
  },
  avAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avAvatarTxt: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 24,
  },
  avNome: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  avSub: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 16,
  },
  avEstrelas: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  avInput: {
    width: '100%',
    backgroundColor: COLORS.input,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    color: COLORS.white,
    fontSize: 13,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  avBtn: {
    width: '100%',
    backgroundColor: COLORS.green,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  avBtnTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

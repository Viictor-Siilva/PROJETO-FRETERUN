import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

export const Toast = ({ message, type = 'info', duration = 3000, visible, onDismiss }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss?.();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const getColors = () => {
    switch (type) {
      case 'success':
        return { bg: '#10B98120', border: '#10B98140', icon: '#10B981', text: '#10B981' };
      case 'error':
        return { bg: '#EF444420', border: '#EF444440', icon: '#EF4444', text: '#EF4444' };
      case 'warning':
        return { bg: '#FBBF2420', border: '#FBBF2440', icon: '#FBBF24', text: '#FBBF24' };
      default:
        return { bg: '#3B82F620', border: '#3B82F640', icon: '#3B82F6', text: '#3B82F6' };
    }
  };

  const colors = getColors();
  const iconName = type === 'success' ? 'checkmark-circle' : 
                   type === 'error' ? 'alert-circle' : 
                   type === 'warning' ? 'warning' : 'information-circle';

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={[styles.toast, { backgroundColor: colors.bg, borderColor: colors.border }]}>
        <Ionicons name={iconName} size={18} color={colors.icon} />
        <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#3B82F620',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3B82F640',
    padding: 12,
  },
  message: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#3B82F6',
  },
});

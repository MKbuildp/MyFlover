import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NaseptavacPolozkaProps } from './types';
import { Ionicons } from '@expo/vector-icons';

export const NaseptavacPolozka: React.FC<NaseptavacPolozkaProps> = ({
  recept,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="search" size={16} color="#64748b" style={styles.icon} />
      <Text style={styles.text} numberOfLines={1}>
        {recept.nazev}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: '#0f172a',
    flex: 1,
  },
});

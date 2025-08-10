import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';

interface FotografieSekceProps {
  fotografie?: string;
  onVyberFoto: () => void;
  onVyfotit: () => void;
}

export const FotografieSekce: React.FC<FotografieSekceProps> = ({
  fotografie,
  onVyberFoto,
  onVyfotit,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.nadpis}>{t.recipe.addPhoto}</Text>
      
      <View style={styles.fotoButtons}>
        <TouchableOpacity
          style={[styles.fotoButton, styles.fotoButtonPrimary]}
          onPress={onVyberFoto}
        >
          <Text style={styles.fotoButtonText}>{t.recipe.choosePhoto}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fotoButton, styles.fotoButtonSecondary]}
          onPress={onVyfotit}
        >
          <Text style={[styles.fotoButtonText, styles.fotoButtonTextSecondary]}>
            {t.recipe.takePhoto}
          </Text>
        </TouchableOpacity>
      </View>
      
      {fotografie && (
        <View style={styles.fotoPreview}>
          <Image source={{ uri: fotografie }} style={styles.foto} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  nadpis: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  fotoButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  fotoButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  fotoButtonPrimary: {
    backgroundColor: '#2563eb',
  },
  fotoButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  fotoButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  fotoButtonTextSecondary: {
    color: '#2563eb',
  },
  fotoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  foto: {
    width: '100%',
    height: '100%',
  },
});

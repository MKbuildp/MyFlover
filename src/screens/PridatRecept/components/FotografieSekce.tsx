import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

interface FotografieSekceProps {
  fotografie: string[];
  onVyberFoto: () => void;
  onVyfotit: () => void;
  onSmazatFotku: (index: number) => void;
}

export const FotografieSekce: React.FC<FotografieSekceProps> = ({
  fotografie,
  onVyberFoto,
  onVyfotit,
  onSmazatFotku,
}) => {
  const { t } = useLanguage();

  const handleSmazatFotku = (index: number) => {
    Alert.alert(
      'Smazat fotku',
      'Opravdu chcete smazat tuto fotku?',
      [
        { text: 'Zrušit', style: 'cancel' },
        { text: 'Smazat', onPress: () => onSmazatFotku(index) }
      ]
    );
  };

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

      {fotografie.length > 0 && (
        <View style={styles.fotkyContainer}>
          <Text style={styles.fotkyNadpis}>
            Nahrané fotky ({fotografie.length}/10)
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fotkyScroll}
          >
            {fotografie.map((fotka, index) => (
              <View key={index} style={styles.fotkaKontejner}>
                <Image source={{ uri: fotka }} style={styles.fotka} />
                <TouchableOpacity
                  style={styles.smazatButton}
                  onPress={() => handleSmazatFotku(index)}
                >
                  <Ionicons name="close-circle" size={24} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
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
  fotkyContainer: {
    marginTop: 15,
    paddingBottom: 10,
  },
  fotkyNadpis: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  fotkyScroll: {
    paddingHorizontal: 5,
  },
  fotkaKontejner: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  fotka: {
    width: '100%',
    height: '100%',
  },
  smazatButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 5,
  },
});

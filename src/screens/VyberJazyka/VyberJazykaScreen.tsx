import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../translations';

export const VyberJazykaScreen = () => {
  const { t, setLanguage, setIsFirstTime } = useLanguage();

  const handleLanguageSelect = async (language: Language) => {
    await setLanguage(language);
    await setIsFirstTime(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.languageSelection.title}</Text>
        <Text style={styles.subtitle}>{t.languageSelection.subtitle}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLanguageSelect('cs')}
        >
          <Text style={styles.buttonText}>{t.languageSelection.czech}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLanguageSelect('en')}
        >
          <Text style={styles.buttonText}>{t.languageSelection.english}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 
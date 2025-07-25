import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

export const VyhledavaniScreen = () => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.search.placeholder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 
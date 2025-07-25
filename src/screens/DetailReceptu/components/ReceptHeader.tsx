import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../../context/LanguageContext';
import { Recept } from '../../../types/recept';

interface ReceptHeaderProps {
  recept: Recept;
}

export const ReceptHeader: React.FC<ReceptHeaderProps> = ({
  recept,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.nazev}>{recept.nazev}</Text>

      {recept.popis && (
        <Text style={styles.popis}>{recept.popis}</Text>
      )}

      <View style={styles.metadata}>
        {recept.dobaPrivavy > 0 && (
          <View style={styles.metadataPolozka}>
            <Ionicons name="time-outline" size={20} color="#64748b" />
            <Text style={styles.metadataText}>
              {t.recipe.prepTime}: {recept.dobaPrivavy} min
            </Text>
          </View>
        )}

        {recept.dobaVareni > 0 && (
          <View style={styles.metadataPolozka}>
            <Ionicons name="flame-outline" size={20} color="#64748b" />
            <Text style={styles.metadataText}>
              {t.recipe.cookTime}: {recept.dobaVareni} min
            </Text>
          </View>
        )}

        <View style={styles.metadataPolozka}>
          <Ionicons name="people-outline" size={20} color="#64748b" />
          <Text style={styles.metadataText}>
            {recept.pocetPorci} {
              recept.pocetPorci === 1 ? 'porce' :
              recept.pocetPorci >= 2 && recept.pocetPorci <= 4 ? 'porce' : 'porcí'
            }
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  nazev: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  popis: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 16,
    lineHeight: 24,
  },
  metadata: {
    gap: 8,
  },
  metadataPolozka: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metadataText: {
    fontSize: 16,
    color: '#64748b',
  },
}); 
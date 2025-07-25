import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { KrokPostupu } from '../../../types/recept';
import { Ionicons } from '@expo/vector-icons';

interface SeznamKrokuProps {
  kroky: KrokPostupu[];
}

export const SeznamKroku: React.FC<SeznamKrokuProps> = ({
  kroky,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.nadpis}>{t.recipe.steps}</Text>

      <View style={styles.seznam}>
        {kroky.map((krok) => (
          <View key={krok.id} style={styles.krok}>
            <View style={styles.krokHeader}>
              <Text style={styles.krokCisloText}>
                {krok.cislo}.
              </Text>
            </View>

            <Text style={styles.krokText}>
              {krok.text}
            </Text>

            {krok.casovac && (
              <View style={styles.casovac}>
                <Ionicons name="timer-outline" size={20} color="#2563eb" />
                <Text style={styles.casovacText}>
                  {krok.casovac} min
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  nadpis: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  seznam: {
    gap: 16,
  },
  krok: {
    gap: 12,
  },
  krokHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  krokCisloText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  krokText: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
  },
  casovac: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#2563eb',
    marginTop: 8,
  },
  casovacText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
}); 
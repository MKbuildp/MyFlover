import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../../context/LanguageContext';
import { NovyKrokPostupu } from '../../../types/recept';

interface SeznamKrokuProps {
  kroky: NovyKrokPostupu[];
  onPridatKrok: (krok: NovyKrokPostupu) => void;
  onSmazatKrok: (index: number) => void;
  onPresunoutKrok: (fromIndex: number, toIndex: number) => void;
}

export const SeznamKroku: React.FC<SeznamKrokuProps> = ({
  kroky,
  onPridatKrok,
  onSmazatKrok,
  onPresunoutKrok,
}) => {
  const { t } = useLanguage();
  const [novyKrokText, setNovyKrokText] = useState('');
  const [novyKrokCasovac, setNovyKrokCasovac] = useState('');

  const handlePridatKrok = () => {
    if (!novyKrokText.trim()) return;

    onPridatKrok({
      cislo: kroky.length + 1,
      text: novyKrokText.trim(),
      casovac: novyKrokCasovac ? parseInt(novyKrokCasovac) : undefined,
    });

    setNovyKrokText('');
    setNovyKrokCasovac('');
  };

  const renderKrok = ({ item, index }: { item: NovyKrokPostupu; index: number }) => (
    <View style={styles.krokPolozka}>
      <View style={styles.krokHeader}>
        <Text style={styles.krokCislo}>{item.cislo}.</Text>
        <View style={styles.krokAkce}>
          {index > 0 && (
            <TouchableOpacity
              style={styles.krokTlacitko}
              onPress={() => onPresunoutKrok(index, index - 1)}
            >
              <Ionicons name="arrow-up" size={20} color="#666" />
            </TouchableOpacity>
          )}
          {index < kroky.length - 1 && (
            <TouchableOpacity
              style={styles.krokTlacitko}
              onPress={() => onPresunoutKrok(index, index + 1)}
            >
              <Ionicons name="arrow-down" size={20} color="#666" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.krokTlacitko, styles.smazatTlacitko]}
            onPress={() => onSmazatKrok(index)}
          >
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.krokText}>{item.text}</Text>
      {item.casovac && (
        <View style={styles.casovacBadge}>
          <Ionicons name="timer-outline" size={16} color="#2563eb" />
          <Text style={styles.casovacText}>{item.casovac} min</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.nadpis}>{t.steps.step}</Text>
      <View style={styles.formular}>
        {/* První řádek - text kroku */}
        <TextInput
          style={[styles.input, styles.textInput]}
          value={novyKrokText}
          onChangeText={setNovyKrokText}
          placeholder={t.steps.addNew}
          placeholderTextColor="#666"
          multiline
        />
        
        {/* Druhý řádek - časovač a tlačítko přidat */}
        <View style={styles.casovacRow}>
          <TextInput
            style={[styles.input, styles.casovacInput]}
            value={novyKrokCasovac}
            onChangeText={setNovyKrokCasovac}
            placeholder="⏱️ min"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[
              styles.pridatTlacitko,
              !novyKrokText.trim() && styles.pridatTlacitkoDisabled
            ]}
            onPress={handlePridatKrok}
            disabled={!novyKrokText.trim()}
          >
            <Text style={styles.pridatTlacitkoText}>Přidat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={kroky}
        renderItem={renderKrok}
        keyExtractor={(_, index) => index.toString()}
        style={styles.seznam}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  nadpis: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  formular: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  textInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  casovacRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  casovacInput: {
    width: '30%',
    textAlign: 'center',
  },
  pridatTlacitko: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 12,
    width: '33%',
    alignItems: 'center',
  },
  pridatTlacitkoDisabled: {
    backgroundColor: '#94a3b8',
  },
  pridatTlacitkoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  seznam: {
    marginTop: 16,
  },
  krokPolozka: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  krokHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  krokCislo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  krokAkce: {
    flexDirection: 'row',
    gap: 8,
  },
  krokTlacitko: {
    padding: 4,
  },
  smazatTlacitko: {
    marginLeft: 4,
  },
  krokText: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
  },
  casovacBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    gap: 4,
  },
  casovacText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
}); 
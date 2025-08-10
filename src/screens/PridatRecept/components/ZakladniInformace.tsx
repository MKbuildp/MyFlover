import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { useRecepty } from '../../../context/ReceptContext';

interface ZakladniInformaceProps {
  nazev: string;
  setNazev: (value: string) => void;
  popis: string;
  setPopis: (value: string) => void;
  dobaPrivavy: string;
  setDobaPrivavy: (value: string) => void;
  dobaVareni: string;
  setDobaVareni: (value: string) => void;
  pocetPorci: string;
  setPocetPorci: (value: string) => void;
  vybraneKategorie: string[];
  setVybraneKategorie: (kategorie: string[]) => void;
}

export const ZakladniInformace: React.FC<ZakladniInformaceProps> = ({
  nazev,
  setNazev,
  popis,
  setPopis,
  dobaPrivavy,
  setDobaPrivavy,
  dobaVareni,
  setDobaVareni,
  pocetPorci,
  setPocetPorci,
  vybraneKategorie,
  setVybraneKategorie,
}) => {
  const { t } = useLanguage();
  const { kategorie } = useRecepty();

  const handleKategoriePress = (kategorieId: string) => {
    setVybraneKategorie(
      vybraneKategorie.includes(kategorieId)
        ? vybraneKategorie.filter(id => id !== kategorieId)
        : [...vybraneKategorie, kategorieId]
    );
  };

  return (
    <View style={styles.container}>
      {/* Název receptu */}
      <View style={styles.sekce}>
        <Text style={styles.nadpis}>{t.recipe.name}</Text>
        <TextInput
          style={styles.input}
          value={nazev}
          onChangeText={setNazev}
          placeholder={t.recipe.namePlaceholder}
          placeholderTextColor="#666"
        />
      </View>

      {/* Popis */}
      <View style={styles.sekce}>
        <Text style={styles.nadpis}>{t.recipe.description}</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={popis}
          onChangeText={setPopis}
          placeholder={t.recipe.descriptionPlaceholder}
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Časy přípravy a počet porcí */}
      <View style={styles.sekce}>
        <View style={styles.row}>
          <View style={styles.thirdInput}>
            <Text style={styles.label}>{t.recipe.prepTime}</Text>
            <TextInput
              style={[styles.input, styles.smallInput]}
              value={dobaPrivavy}
              onChangeText={setDobaPrivavy}
              keyboardType="numeric"
              placeholder="30"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.thirdInput}>
            <Text style={styles.label}>{t.recipe.cookTime}</Text>
            <TextInput
              style={[styles.input, styles.smallInput]}
              value={dobaVareni}
              onChangeText={setDobaVareni}
              keyboardType="numeric"
              placeholder="60"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.thirdInput}>
            <Text style={styles.label}>{t.recipe.servings}</Text>
            <TextInput
              style={[styles.input, styles.smallInput]}
              value={pocetPorci}
              onChangeText={setPocetPorci}
              keyboardType="numeric"
              placeholder="4"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      </View>

      {/* Kategorie */}
      <View style={styles.sekce}>
        <Text style={styles.nadpis}>{t.categories.select}</Text>
        {kategorie.length === 0 ? (
          <Text style={styles.warningText}>{t.categories.createFirst}</Text>
        ) : (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.kategorieContainer}
            contentContainerStyle={styles.kategorieContent}
          >
            {kategorie.map((kat) => (
              <TouchableOpacity
                key={kat.id}
                style={[
                  styles.kategorieButton,
                  vybraneKategorie.includes(kat.id) && styles.kategorieButtonSelected
                ]}
                onPress={() => handleKategoriePress(kat.id)}
              >
                <Text style={[
                  styles.kategorieButtonText,
                  vybraneKategorie.includes(kat.id) && styles.kategorieButtonTextSelected
                ]}>
                  {kat.nazev}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  sekce: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 12,
    padding: 15,
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  smallInput: {
    width: '60%', // O 40% užší (původně 100%)
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  thirdInput: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 80,
  },
  kategorieContainer: {
    marginTop: 10,
  },
  kategorieContent: {
    paddingRight: 8,
  },
  kategorieButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  kategorieButtonSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  kategorieButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  kategorieButtonTextSelected: {
    color: 'white',
  },
  warningText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
}); 
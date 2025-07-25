import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { useRecepty } from '../../../context/ReceptContext';
import { Kategorie } from '../../../types/recept';

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
  fotografie?: string;
  onVyberFoto: () => void;
  onVyfotit: () => void;
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
  fotografie,
  onVyberFoto,
  onVyfotit,
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
      <Text style={styles.label}>{t.recipe.name}</Text>
      <TextInput
        style={styles.input}
        value={nazev}
        onChangeText={setNazev}
        placeholder={t.recipe.namePlaceholder}
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>{t.recipe.description}</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={popis}
        onChangeText={setPopis}
        placeholder={t.recipe.descriptionPlaceholder}
        placeholderTextColor="#666"
        multiline
        numberOfLines={4}
      />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>{t.recipe.prepTime}</Text>
          <TextInput
            style={styles.input}
            value={dobaPrivavy}
            onChangeText={setDobaPrivavy}
            keyboardType="numeric"
            placeholder="30"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>{t.recipe.cookTime}</Text>
          <TextInput
            style={styles.input}
            value={dobaVareni}
            onChangeText={setDobaVareni}
            keyboardType="numeric"
            placeholder="60"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      <Text style={styles.label}>{t.recipe.servings}</Text>
      <TextInput
        style={styles.input}
        value={pocetPorci}
        onChangeText={setPocetPorci}
        keyboardType="numeric"
        placeholder="4"
        placeholderTextColor="#666"
      />

      <View style={styles.fotoSection}>
        <Text style={styles.label}>{t.recipe.addPhoto}</Text>
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

      <Text style={styles.label}>{t.categories.select}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  fotoSection: {
    marginBottom: 16,
  },
  fotoButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
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
    marginTop: 10,
  },
  foto: {
    width: '100%',
    height: '100%',
  },
  kategorieContainer: {
    marginBottom: 16,
  },
  kategorieContent: {
    paddingRight: 8,
  },
  kategorieButton: {
    backgroundColor: 'white',
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
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '500',
  },
  kategorieButtonTextSelected: {
    color: 'white',
  },
  warningText: {
    color: '#dc2626',
    fontSize: 14,
    marginBottom: 16,
  },
}); 
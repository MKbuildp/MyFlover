import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLanguage } from '../../context/LanguageContext';
import { useRecepty } from '../../context/ReceptContext';
import { ZakladniInformace } from './components/ZakladniInformace';
import { SeznamIngredience } from './components/SeznamIngredience';
import { SeznamKroku } from './components/SeznamKroku';
import { FotografieSekce } from './components/FotografieSekce';
import { NovaIngredience, NovyKrokPostupu } from '../../types/recept';

export const PridatReceptScreen = () => {
  const { t } = useLanguage();
  const { pridatRecept, kategorie } = useRecepty();

  const [nazev, setNazev] = useState('');
  const [popis, setPopis] = useState('');
  const [dobaPrivavy, setDobaPrivavy] = useState('');
  const [dobaVareni, setDobaVareni] = useState('');
  const [pocetPorci, setPocetPorci] = useState('');
  const [fotografie, setFotografie] = useState<string>();
  const [ingredience, setIngredience] = useState<NovaIngredience[]>([]);
  const [kroky, setKroky] = useState<NovyKrokPostupu[]>([]);
  const [vybraneKategorie, setVybraneKategorie] = useState<string[]>([]);

  const vyberFotografii = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFotografie(result.assets[0].uri);
    }
  };

  const vyfotit = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Chyba', 'Potřebujeme přístup k fotoaparátu');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFotografie(result.assets[0].uri);
    }
  };

  const pridatIngredience = (novaIngredience: NovaIngredience) => {
    setIngredience([...ingredience, novaIngredience]);
  };

  const smazatIngredience = (index: number) => {
    setIngredience(ingredience.filter((_, i) => i !== index));
  };

  const pridatKrok = (novyKrok: NovyKrokPostupu) => {
    setKroky([...kroky, { ...novyKrok, cislo: kroky.length + 1 }]);
  };

  const smazatKrok = (index: number) => {
    const noveKroky = kroky.filter((_, i) => i !== index);
    // Přečíslujeme kroky
    noveKroky.forEach((krok, i) => {
      krok.cislo = i + 1;
    });
    setKroky(noveKroky);
  };

  const presunoutKrok = (fromIndex: number, toIndex: number) => {
    const novyKroky = [...kroky];
    const [presunuto] = novyKroky.splice(fromIndex, 1);
    novyKroky.splice(toIndex, 0, presunuto);
    
    // Přepočítáme čísla kroků
    novyKroky.forEach((krok, index) => {
      krok.cislo = index + 1;
    });
    
    setKroky(novyKroky);
  };

  const ulozitRecept = async () => {
    if (!nazev.trim()) {
      Alert.alert('Chyba', 'Vyplňte název receptu');
      return;
    }

    if (vybraneKategorie.length === 0) {
      Alert.alert('Chyba', 'Vyberte alespoň jednu kategorii');
      return;
    }

    try {
      await pridatRecept({
        nazev: nazev.trim(),
        popis: popis.trim(),
        dobaPrivavy: parseInt(dobaPrivavy) || 0,
        dobaVareni: parseInt(dobaVareni) || 0,
        pocetPorci: parseInt(pocetPorci) || 1,
        fotografie,
        kategorie: vybraneKategorie,
        ingredience,
        postup: kroky,
      });

      // Reset formuláře
      setNazev('');
      setPopis('');
      setDobaPrivavy('');
      setDobaVareni('');
      setPocetPorci('');
      setFotografie(undefined);
      setIngredience([]);
      setKroky([]);
      setVybraneKategorie([]);

      Alert.alert('Úspěch', 'Recept byl úspěšně uložen');
    } catch (error) {
      Alert.alert('Chyba', 'Nepodařilo se uložit recept');
    }
  };

  if (kategorie.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>{t.categories.noCategories}</Text>
        <Text style={styles.errorText}>{t.categories.createFirst}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ZakladniInformace
          nazev={nazev}
          setNazev={setNazev}
          popis={popis}
          setPopis={setPopis}
          dobaPrivavy={dobaPrivavy}
          setDobaPrivavy={setDobaPrivavy}
          dobaVareni={dobaVareni}
          setDobaVareni={setDobaVareni}
          pocetPorci={pocetPorci}
          setPocetPorci={setPocetPorci}
          vybraneKategorie={vybraneKategorie}
          setVybraneKategorie={setVybraneKategorie}
        />
        
        <SeznamIngredience
          ingredience={ingredience}
          onPridatIngredience={pridatIngredience}
          onSmazatIngredience={smazatIngredience}
        />
        
        <SeznamKroku
          kroky={kroky}
          onPridatKrok={pridatKrok}
          onSmazatKrok={smazatKrok}
          onPresunoutKrok={presunoutKrok}
        />

        <FotografieSekce
          fotografie={fotografie}
          onVyberFoto={vyberFotografii}
          onVyfotit={vyfotit}
        />
        
        <TouchableOpacity 
          style={styles.ulozitButton}
          onPress={ulozitRecept}
        >
          <Text style={styles.ulozitButtonText}>{t.common.save}</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  spacer: {
    height: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'white',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
  ulozitButton: {
    backgroundColor: '#059669',
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  ulozitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
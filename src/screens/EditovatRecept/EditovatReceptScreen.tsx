import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useRecepty } from '../../context/ReceptContext';
import { ZakladniInformace } from '../PridatRecept/components/ZakladniInformace';
import { SeznamIngredience } from '../PridatRecept/components/SeznamIngredience';
import { SeznamKroku } from '../PridatRecept/components/SeznamKroku';
import { FotografieSekce } from '../PridatRecept/components/FotografieSekce';
import { NovaIngredience, NovyKrokPostupu, Recept } from '../../types/recept';
import { generateId } from '../../utils/helpers';

type EditovatReceptRouteProp = RouteProp<RootStackParamList, 'EditovatRecept'>;
type EditovatReceptNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Obrazovka pro editaci existujícího receptu
 * Načte data receptu a umožní jejich úpravu
 */
export const EditovatReceptScreen = () => {
  const { t } = useLanguage();
  const { recepty, upravitRecept } = useRecepty();
  const route = useRoute<EditovatReceptRouteProp>();
  const navigation = useNavigation<EditovatReceptNavigationProp>();
  
  // Načtení existujícího receptu
  const recept = recepty.find(r => r.id === route.params.receptId);

  // Inicializace stavu s existujícími daty
  const [nazev, setNazev] = useState(recept?.nazev || '');
  const [popis, setPopis] = useState(recept?.popis || '');
  const [dobaPrivavy, setDobaPrivavy] = useState(recept?.dobaPrivavy.toString() || '');
  const [dobaVareni, setDobaVareni] = useState(recept?.dobaVareni.toString() || '');
  const [pocetPorci, setPocetPorci] = useState(recept?.pocetPorci.toString() || '');
  const [fotografie, setFotografie] = useState<string[]>(recept?.fotografie || []);
  const [ingredience, setIngredience] = useState<NovaIngredience[]>(
    recept?.ingredience.map(ing => ({
      mnozstvi: ing.mnozstvi,
      jednotka: ing.jednotka,
      nazev: ing.nazev,
      odskrtnuto: ing.odskrtnuto,
    })) || []
  );
  const [kroky, setKroky] = useState<NovyKrokPostupu[]>(
    recept?.postup.map(krok => ({
      cislo: krok.cislo,
      text: krok.text,
      odskrtnuto: krok.odskrtnuto,
      casovac: krok.casovac,
    })) || []
  );
  const [vybraneKategorie, setVybraneKategorie] = useState<string[]>(
    recept?.kategorie || []
  );

  // Kontrola, zda recept existuje
  useEffect(() => {
    if (!recept) {
      Alert.alert(t.common.error, 'Recept nebyl nalezen');
      navigation.goBack();
    }
  }, [recept, navigation, t]);

  if (!recept) {
    return null;
  }

  /**
   * Výběr fotografie z galerie
   */
  const vyberFotografii = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const noveFotky = result.assets.map(asset => asset.uri);
      setFotografie([...fotografie, ...noveFotky]);
    }
  };

  /**
   * Vyfocení nové fotografie
   */
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
      setFotografie([...fotografie, result.assets[0].uri]);
    }
  };

  /**
   * Smazání fotografie
   */
  const smazatFotku = (index: number) => {
    setFotografie(fotografie.filter((_, i) => i !== index));
  };

  /**
   * Přidání nové ingredience
   */
  const pridatIngredience = (novaIngredience: NovaIngredience) => {
    setIngredience([...ingredience, novaIngredience]);
  };

  /**
   * Smazání ingredience
   */
  const smazatIngredience = (index: number) => {
    setIngredience(ingredience.filter((_, i) => i !== index));
  };

  /**
   * Přidání nového kroku
   */
  const pridatKrok = (novyKrok: NovyKrokPostupu) => {
    setKroky([...kroky, { ...novyKrok, cislo: kroky.length + 1 }]);
  };

  /**
   * Smazání kroku
   */
  const smazatKrok = (index: number) => {
    const noveKroky = kroky.filter((_, i) => i !== index);
    // Přečíslujeme kroky
    noveKroky.forEach((krok, i) => {
      krok.cislo = i + 1;
    });
    setKroky(noveKroky);
  };

  /**
   * Přesunutí kroku
   */
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

  /**
   * Uložení upraveného receptu
   */
  const ulozitZmeny = async () => {
    if (!nazev.trim()) {
      Alert.alert(t.common.error, 'Název receptu je povinný');
      return;
    }

    if (vybraneKategorie.length === 0) {
      Alert.alert(t.common.error, 'Vyberte alespoň jednu kategorii');
      return;
    }

    try {
      const upravenyRecept: Recept = {
        ...recept,
        nazev: nazev.trim(),
        popis: popis.trim(),
        fotografie: fotografie,
        dobaPrivavy: parseInt(dobaPrivavy) || 0,
        dobaVareni: parseInt(dobaVareni) || 0,
        pocetPorci: parseInt(pocetPorci) || 1,
        kategorie: vybraneKategorie,
        ingredience: ingredience.map(ing => ({
          ...ing,
          id: generateId(), // Generujeme nové ID pro ingredience
        })),
        postup: kroky.map(krok => ({
          ...krok,
          id: generateId(), // Generujeme nové ID pro kroky
        })),
        upraveno: new Date().toISOString(),
      };

      await upravitRecept(upravenyRecept);
      Alert.alert(t.common.success, t.recipe.editSuccess, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert(t.common.error, 'Chyba při ukládání receptu');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
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
          onSmazatFotku={smazatFotku}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={ulozitZmeny}>
          <Text style={styles.saveButtonText}>{t.common.save}</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

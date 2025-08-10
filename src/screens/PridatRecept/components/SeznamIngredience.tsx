import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../../context/LanguageContext';
import { NovaIngredience, JednotkaType } from '../../../types/recept';

interface SeznamIngredienceProps {
  ingredience: NovaIngredience[];
  onPridatIngredience: (ingredience: NovaIngredience) => void;
  onSmazatIngredience: (index: number) => void;
}

const JEDNOTKY: JednotkaType[] = [
  'g',
  'kg',
  'ml',
  'l',
  'pcs',
  'tbsp',
  'tsp',
  'cup',
  'pinch',
];

const mapJednotkaToText = (jednotka: JednotkaType, t: any): string => {
  const mapping: Record<JednotkaType, string> = {
    g: 'g',
    kg: 'kg',
    ml: 'ml',
    l: 'l',
    pcs: t.units.pcs,
    tbsp: t.units.tbsp,
    tsp: t.units.tsp,
    cup: t.units.cup,
    pinch: t.units.pinch,
  };
  return mapping[jednotka];
};

export const SeznamIngredience: React.FC<SeznamIngredienceProps> = ({
  ingredience,
  onPridatIngredience,
  onSmazatIngredience,
}) => {
  const { t } = useLanguage();
  const [novaMnozstvi, setNovaMnozstvi] = useState('');
  const [novaJednotka, setNovaJednotka] = useState<JednotkaType>('g');
  const [novyNazev, setNovyNazev] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handlePridatIngredience = () => {
    if (novaMnozstvi && novyNazev) {
      onPridatIngredience({
        mnozstvi: parseFloat(novaMnozstvi),
        jednotka: novaJednotka,
        nazev: novyNazev,
      });
      setNovaMnozstvi('');
      setNovaJednotka('g');
      setNovyNazev('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formular}>
        <Text style={styles.nadpis}>{t.ingredients.amount}</Text>
        
        {/* První řádek - množství a jednotka */}
        <View style={[styles.row, styles.centeredRow]}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { width: '100%' }]}
              value={novaMnozstvi}
              onChangeText={setNovaMnozstvi}
              placeholder="100"
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.jednotkaWrapper}>
            <TouchableOpacity
              style={[styles.jednotkaButton, { width: '100%' }]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.jednotkaButtonText}>
                {mapJednotkaToText(novaJednotka, t)}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Druhý řádek - název a tlačítko přidat */}
        <View style={[styles.row, { marginTop: 10 }]}>
          <TextInput 
            style={[styles.input, { width: '65%' }]} 
            value={novyNazev} 
            onChangeText={setNovyNazev} 
            placeholder={t.ingredients.name} 
            placeholderTextColor="#666" 
          />
          <TouchableOpacity 
            style={[
              styles.pridatTlacitko, 
              { width: '33%' }, 
              !(novaMnozstvi && novyNazev) && styles.pridatTlacitkoDisabled
            ]} 
            onPress={handlePridatIngredience} 
            disabled={!novaMnozstvi || !novyNazev}
          >
            <Text style={styles.pridatTlacitkoText}>Přidat</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.seznam}>
        {ingredience.map((item, index) => (
          <View style={styles.ingrediencePolozka} key={index}>
            <Text style={styles.ingredienceText}>
              {item.mnozstvi} {item.jednotka} {item.nazev}
            </Text>
            <TouchableOpacity
              style={styles.smazatTlacitko}
              onPress={() => onSmazatIngredience(index)}
            >
              <Ionicons name="trash-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modální okno pro výběr jednotky */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Vyberte jednotku</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.jednotkyGrid}>
              {JEDNOTKY.map((jednotka) => (
                <TouchableOpacity
                  key={jednotka}
                  style={[
                    styles.jednotkaPolozka,
                    novaJednotka === jednotka && styles.jednotkaPolozkaAktivni,
                  ]}
                  onPress={() => {
                    setNovaJednotka(jednotka);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.jednotkaPolozkaText,
                    novaJednotka === jednotka && styles.jednotkaPolozkaTextAktivni,
                  ]}>
                    {mapJednotkaToText(jednotka, t)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  formular: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  centeredRow: {
    justifyContent: 'center',
    gap: 10,
  },
  inputWrapper: {
    width: '25%',
  },
  jednotkaWrapper: {
    width: '35%',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  jednotkaButton: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jednotkaButtonText: {
    fontSize: 16,
    color: '#374151',
  },
  pridatTlacitko: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pridatTlacitkoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pridatTlacitkoDisabled: {
    backgroundColor: '#93c5fd',
  },
  seznam: {
    maxHeight: 200,
  },
  ingrediencePolozka: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ingredienceText: {
    fontSize: 16,
    flex: 1,
    color: '#374151',
  },
  smazatTlacitko: {
    backgroundColor: '#dc2626',
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  // Styly pro modální okno
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalCloseButton: {
    padding: 5,
  },
  jednotkyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  jednotkaPolozka: {
    width: '30%',
    aspectRatio: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  jednotkaPolozkaAktivni: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  jednotkaPolozkaText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  jednotkaPolozkaTextAktivni: {
    color: 'white',
    fontWeight: '600',
  },
}); 
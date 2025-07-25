import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useRecepty } from '../../context/ReceptContext';
import { useLanguage } from '../../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { Recept } from '../../types/recept';

type SeznamReceptuRouteProp = RouteProp<RootStackParamList, 'SeznamReceptu'>;
type SeznamReceptuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SeznamReceptuScreen = () => {
  const { t } = useLanguage();
  const navigation = useNavigation<SeznamReceptuNavigationProp>();
  const route = useRoute<SeznamReceptuRouteProp>();
  const { recepty } = useRecepty();

  const { kategorieId, nazevKategorie } = route.params;

  // Filtrujeme recepty pro danou kategorii
  const receptyKategorie = recepty.filter(recept =>
    recept.kategorie.includes(kategorieId)
  );

  const renderReceptPolozka = ({ item: recept }: { item: Recept }) => (
    <TouchableOpacity
      style={styles.receptPolozka}
      onPress={() => navigation.navigate('DetailReceptu', { receptId: recept.id })}
    >
      <View style={styles.receptObsah}>
        {recept.fotografie ? (
          <Image source={{ uri: recept.fotografie }} style={styles.receptFoto} />
        ) : (
          <View style={styles.prazdneFoto}>
            <Ionicons name="restaurant-outline" size={32} color="#94a3b8" />
          </View>
        )}
        
        <View style={styles.receptInfo}>
          <Text style={styles.receptNazev}>{recept.nazev}</Text>
          
          <View style={styles.receptMetadata}>
            {recept.dobaPrivavy > 0 && (
              <View style={styles.metadataPolozka}>
                <Ionicons name="time-outline" size={16} color="#64748b" />
                <Text style={styles.metadataText}>
                  {t.recipe.prepTime}: {recept.dobaPrivavy} min
                </Text>
              </View>
            )}
            
            {recept.dobaVareni > 0 && (
              <View style={styles.metadataPolozka}>
                <Ionicons name="flame-outline" size={16} color="#64748b" />
                <Text style={styles.metadataText}>
                  {t.recipe.cookTime}: {recept.dobaVareni} min
                </Text>
              </View>
            )}
            
            <View style={styles.metadataPolozka}>
              <Ionicons name="people-outline" size={16} color="#64748b" />
              <Text style={styles.metadataText}>
                {recept.pocetPorci} {
                  recept.pocetPorci === 1 ? 'porce' :
                  recept.pocetPorci >= 2 && recept.pocetPorci <= 4 ? 'porce' : 'porcí'
                }
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {receptyKategorie.length > 0 ? (
        <FlatList
          data={receptyKategorie}
          renderItem={renderReceptPolozka}
          keyExtractor={(recept) => recept.id}
          contentContainerStyle={styles.seznam}
        />
      ) : (
        <View style={styles.prazdnyStav}>
          <Ionicons name="restaurant-outline" size={64} color="#94a3b8" />
          <Text style={styles.prazdnyNadpis}>Žádné recepty</Text>
          <Text style={styles.prazdnyText}>
            V této kategorii zatím nejsou žádné recepty.
          </Text>
          <TouchableOpacity
            style={styles.pridatTlacitko}
            onPress={() => navigation.navigate('HlavniNavigace', { screen: 'PridatRecept' })}
          >
            <Text style={styles.pridatTlacitkoText}>Přidat recept</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  seznam: {
    padding: 16,
  },
  receptPolozka: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  receptObsah: {
    flexDirection: 'row',
  },
  receptFoto: {
    width: 120,
    height: 120,
    backgroundColor: '#f1f5f9',
  },
  prazdneFoto: {
    width: 120,
    height: 120,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receptInfo: {
    flex: 1,
    padding: 12,
  },
  receptNazev: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  receptMetadata: {
    gap: 8,
  },
  metadataPolozka: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metadataText: {
    fontSize: 14,
    color: '#64748b',
  },
  prazdnyStav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  prazdnyNadpis: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  prazdnyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  pridatTlacitko: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  pridatTlacitkoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 
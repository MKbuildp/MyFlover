import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useRecepty } from '../../context/ReceptContext';
import { Ionicons } from '@expo/vector-icons';
import { VyhledavaciPole } from './components/VyhledavaciPole';
import { Recept } from '../../types/recept';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SeznamVysledku } from './components/SeznamVysledku';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const VyhledavaniScreen = () => {
  const { t } = useLanguage();
  const { kategorie, recepty } = useRecepty();
  const navigation = useNavigation<NavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filtrovaneRecepty = useMemo(() => {
    return recepty.filter(recept => {
      // Filtrování podle textu
      const textMatch = searchText.length === 0 || 
        recept.nazev.toLowerCase().includes(searchText.toLowerCase());

      // Filtrování podle kategorií
      const categoryMatch = selectedCategories.length === 0 ||
        selectedCategories.some(catId => recept.kategorie.includes(catId));

      // Filtrování oblíbených
      const favoriteMatch = !favoritesOnly || recept.oblibeny;

      return textMatch && categoryMatch && favoriteMatch;
    });
  }, [recepty, searchText, selectedCategories, favoritesOnly]);

  const handleSelectRecept = (recept: Recept) => {
    navigation.navigate('DetailReceptu', { receptId: recept.id });
  };

  return (
    <View style={styles.container}>
      <VyhledavaciPole
        value={searchText}
        onChangeText={setSearchText}
        onSelectRecept={handleSelectRecept}
      />

      {/* Filtr kategorií */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.search.categories}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          data={kategorie}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategories.includes(item.id) && styles.categoryChipSelected
              ]}
              onPress={() => {
                setSelectedCategories(prev =>
                  prev.includes(item.id)
                    ? prev.filter(id => id !== item.id)
                    : [...prev, item.id]
                );
              }}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategories.includes(item.id) && styles.categoryChipTextSelected
              ]}>
                {item.nazev}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Pouze oblíbené */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => setFavoritesOnly(!favoritesOnly)}
      >
        <Ionicons
          name={favoritesOnly ? "heart" : "heart-outline"}
          size={24}
          color={favoritesOnly ? "#ef4444" : "#64748b"}
        />
        <Text style={[
          styles.favoriteButtonText,
          favoritesOnly && styles.favoriteButtonTextActive
        ]}>
          {t.search.favorites}
        </Text>
      </TouchableOpacity>

      {/* Seznam výsledků */}
      <View style={styles.results}>
        <SeznamVysledku
          recepty={filtrovaneRecepty}
          onSelectRecept={handleSelectRecept}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
  },
  categoryChip: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  categoryChipSelected: {
    backgroundColor: '#2563eb',
  },
  categoryChipText: {
    color: '#64748b',
    fontSize: 14,
  },
  categoryChipTextSelected: {
    color: '#ffffff',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  favoriteButtonText: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 12,
  },
  favoriteButtonTextActive: {
    color: '#ef4444',
  },
  results: {
    flex: 1,
    padding: 16,
  },
}); 
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  FlatList,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../../../context/LanguageContext';
import { useRecepty } from '../../../../context/ReceptContext';
import { VyhledavaciPoleProps } from './types';
import { NaseptavacPolozka } from './NaseptavacPolozka';
import { Recept } from '../../../../types/recept';

export const VyhledavaciPole: React.FC<VyhledavaciPoleProps> = ({
  value,
  onChangeText,
  onSelectRecept,
}) => {
  const { t } = useLanguage();
  const { recepty } = useRecepty();
  const [naseptavacVisible, setNaseptavacVisible] = useState(false);
  const [filtrovaneRecepty, setFiltrovaneRecepty] = useState<Recept[]>([]);
  const [naseptavacHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    if (value.length >= 2) {
      const filtrovane = recepty.filter(recept =>
        recept.nazev.toLowerCase().includes(value.toLowerCase())
      );
      setFiltrovaneRecepty(filtrovane.slice(0, 5)); // Omezíme na 5 výsledků
      setNaseptavacVisible(true);
      showNaseptavac();
    } else {
      setFiltrovaneRecepty([]);
      setNaseptavacVisible(false);
      hideNaseptavac();
    }
  }, [value, recepty]);

  const showNaseptavac = () => {
    Animated.spring(naseptavacHeight, {
      toValue: Math.min(filtrovaneRecepty.length * 56, 280), // Max 5 položek
      useNativeDriver: false,
    }).start();
  };

  const hideNaseptavac = () => {
    Animated.spring(naseptavacHeight, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const handleSelectRecept = (recept: Recept) => {
    onChangeText(recept.nazev);
    setNaseptavacVisible(false);
    hideNaseptavac();
    Keyboard.dismiss();
    onSelectRecept?.(recept);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t.search.placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {value !== '' && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      {naseptavacVisible && (
        <Animated.View style={[styles.naseptavacContainer, { height: naseptavacHeight }]}>
          <FlatList
            data={filtrovaneRecepty}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NaseptavacPolozka
                recept={item}
                onPress={() => handleSelectRecept(item)}
              />
            )}
            keyboardShouldPersistTaps="handled"
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#0f172a',
  },
  clearButton: {
    padding: 4,
  },
  naseptavacContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: -12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

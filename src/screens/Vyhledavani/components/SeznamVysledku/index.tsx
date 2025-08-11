import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SeznamVysledkuProps } from './types';
import { ReceptPolozka } from './ReceptPolozka';
import { useLanguage } from '../../../../context/LanguageContext';

export const SeznamVysledku: React.FC<SeznamVysledkuProps> = ({
  recepty,
  onSelectRecept,
}) => {
  const { t } = useLanguage();

  if (recepty.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t.search.noResults}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recepty}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReceptPolozka
          recept={item}
          onPress={() => onSelectRecept(item)}
        />
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

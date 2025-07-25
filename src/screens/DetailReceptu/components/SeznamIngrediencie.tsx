import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { Ingredience } from '../../../types/recept';

interface SeznamIngrediencieProps {
  ingredience: Ingredience[];
}

export const SeznamIngrediencie: React.FC<SeznamIngrediencieProps> = ({
  ingredience,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.nadpis}>{t.recipe.ingredients}</Text>

      <View style={styles.seznam}>
        {ingredience.map((ingredience) => (
          <View key={ingredience.id} style={styles.ingredience}>
            <View style={styles.ingredienceObsah}>
              <Text style={styles.ingredienceText}>
                {ingredience.mnozstvi} {ingredience.jednotka}
              </Text>
              <Text style={styles.ingredienceText}>
                {ingredience.nazev}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  nadpis: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  seznam: {
    gap: 12,
  },
  ingredience: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ingredienceObsah: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  ingredienceText: {
    fontSize: 16,
    color: '#1f2937',
  },
}); 
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Kategorie } from '../../../types/recept';
import { RootStackParamList } from '../../../types/navigation';
import { useLanguage } from '../../../context/LanguageContext';

interface KategoriePolozkaProps {
  kategorie: Kategorie;
  onEdit: () => void;
  onDelete: () => void;
}

export const KategoriePolozka: React.FC<KategoriePolozkaProps> = ({
  kategorie,
  onEdit,
  onDelete,
}) => {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => navigation.navigate('SeznamReceptu', {
        kategorieId: kategorie.id,
        nazevKategorie: kategorie.nazev,
      })}
    >
      <View style={styles.content}>
        <Text style={styles.nazev}>{kategorie.nazev}</Text>
        <Text style={styles.pocet}>
          {kategorie.pocetReceptu} {
            kategorie.pocetReceptu === 1 ? 'recept' : 
            kategorie.pocetReceptu >= 2 && kategorie.pocetReceptu <= 4 ? 'recepty' : 'receptů'
          }
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={onEdit}
        >
          <Text style={styles.buttonText}>{t.common.edit}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>{t.common.delete}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  nazev: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  pocet: {
    fontSize: 14,
    color: '#666',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#2563eb',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
}); 
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useRecepty } from '../../context/ReceptContext';
import { KategoriePolozka } from './components/KategoriePolozka';
import { KategorieModal } from './components/KategorieModal';
import { Kategorie } from '../../types/recept';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { TabNavigatorParamList } from '../../types/navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type KategorieScreenRouteProp = RouteProp<TabNavigatorParamList, 'Kategorie'>;
type KategorieScreenNavigationProp = BottomTabNavigationProp<TabNavigatorParamList, 'Kategorie'>;

export const KategorieScreen = () => {
  const { t } = useLanguage();
  const { kategorie, pridatKategorii, upravitKategorii, smazatKategorii } = useRecepty();
  const [modalVisible, setModalVisible] = useState(false);
  const [editovanaKategorie, setEditovanaKategorie] = useState<Kategorie | undefined>();
  const route = useRoute<KategorieScreenRouteProp>();
  const navigation = useNavigation<KategorieScreenNavigationProp>();

  useEffect(() => {
    if (route.params?.showKategorieModal) {
      setModalVisible(true);
      navigation.setParams({ showKategorieModal: false });
    }
  }, [route.params?.showKategorieModal]);

  const handlePridatKategorii = (nazev: string) => {
    pridatKategorii(nazev);
  };

  const handleUpravitKategorii = (nazev: string) => {
    if (editovanaKategorie) {
      upravitKategorii({ ...editovanaKategorie, nazev });
      setEditovanaKategorie(undefined);
    }
  };

  const handleSmazatKategorii = (kategorie: Kategorie) => {
    Alert.alert(
      t.common.delete,
      `Opravdu chcete smazat kategorii "${kategorie.nazev}"?`,
      [
        {
          text: t.common.cancel,
          style: 'cancel',
        },
        {
          text: t.common.delete,
          style: 'destructive',
          onPress: () => smazatKategorii(kategorie.id),
        },
      ]
    );
  };

  const otevritModalProEditaci = (kategorie: Kategorie) => {
    setEditovanaKategorie(kategorie);
    setModalVisible(true);
  };

  const zavritModal = () => {
    setModalVisible(false);
    setEditovanaKategorie(undefined);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={kategorie}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <KategoriePolozka
            kategorie={item}
            onEdit={() => otevritModalProEditaci(item)}
            onDelete={() => handleSmazatKategorii(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <KategorieModal
        visible={modalVisible}
        onClose={zavritModal}
        onSave={editovanaKategorie ? handleUpravitKategorii : handlePridatKategorii}
        existujiciKategorie={editovanaKategorie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    paddingVertical: 10,
  },
}); 
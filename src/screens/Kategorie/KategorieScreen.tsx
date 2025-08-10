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
  const { kategorie, pridatKategorii, smazatKategorii } = useRecepty();
  const [modalVisible, setModalVisible] = useState(false);
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

  const zavritModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={kategorie}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <KategoriePolozka
            kategorie={item}
            onDelete={() => handleSmazatKategorii(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <KategorieModal
        visible={modalVisible}
        onClose={zavritModal}
        onSave={handlePridatKategorii}
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
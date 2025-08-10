import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../../context/LanguageContext';
import { useRecepty } from '../../../context/ReceptContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';

type DetailReceptuHeaderRightProps = {
  receptId: string;
};

type DetailReceptuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Komponenta pro pravé tlačítko v hlavičce detailu receptu
 * Zobrazuje ikonu nastavení s menu pro editaci a mazání receptu
 */
export const DetailReceptuHeaderRight: React.FC<DetailReceptuHeaderRightProps> = ({ 
  receptId 
}) => {
  const { t } = useLanguage();
  const { smazatRecept } = useRecepty();
  const navigation = useNavigation<DetailReceptuNavigationProp>();

  /**
   * Zobrazí menu s možnostmi editace a mazání
   */
  const zobrazitMenu = () => {
    Alert.alert(
      t.recipe.edit,
      'Vyberte akci',
      [
        {
          text: t.common.edit,
          onPress: () => {
            navigation.navigate('EditovatRecept', { receptId });
          },
        },
        {
          text: t.common.delete,
          style: 'destructive',
          onPress: handleDelete,
        },
        {
          text: t.common.cancel,
          style: 'cancel',
        },
      ]
    );
  };

  /**
   * Zobrazí potvrzovací dialog pro mazání receptu
   */
  const handleDelete = () => {
    Alert.alert(
      t.common.delete,
      t.recipe.deleteConfirmation,
      [
        {
          text: t.common.cancel,
          style: 'cancel',
        },
        {
          text: t.common.delete,
          style: 'destructive',
          onPress: async () => {
            try {
              await smazatRecept(receptId);
              navigation.goBack();
            } catch (error) {
              Alert.alert(t.common.error, t.recipe.deleteError);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={zobrazitMenu}
        accessibilityLabel={t.common.edit}
        accessibilityHint="Otevře menu s možnostmi editace a mazání receptu"
      >
        <Ionicons name="settings" size={24} color="#1f2937" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8, // Zmenšeno z 16 na 8 pro posunutí více doprava
  },
  menuButton: {
    padding: 8,
    borderRadius: 4,
  },
});

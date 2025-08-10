import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  VyberJazyka: undefined;
  HlavniNavigace: { screen?: string } | undefined;
  SeznamReceptu: {
    kategorieId: string;
    nazevKategorie: string;
  };
  DetailReceptu: {
    receptId: string;
  };
  EditovatRecept: {
    receptId: string;
  };
};

export type TabNavigatorParamList = {
  Kategorie: {
    showKategorieModal?: boolean;
  };
  Vyhledavani: undefined;
  PridatRecept: undefined;
};

// Toto zajistí, že useNavigation bude znát naše typy
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 
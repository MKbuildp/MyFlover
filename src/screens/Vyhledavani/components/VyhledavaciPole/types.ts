import { Recept } from '../../../../types/recept';

export interface VyhledavaciPoleProps {
  value: string;
  onChangeText: (text: string) => void;
  onSelectRecept?: (recept: Recept) => void;
}

export interface NaseptavacPolozkaProps {
  recept: Recept;
  onPress: () => void;
}

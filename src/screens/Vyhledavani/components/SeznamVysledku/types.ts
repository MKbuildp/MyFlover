import { Recept } from '../../../../types/recept';

export interface SeznamVysledkuProps {
  recepty: Recept[];
  onSelectRecept: (recept: Recept) => void;
}

export interface ReceptPolozkaProps {
  recept: Recept;
  onPress: () => void;
}

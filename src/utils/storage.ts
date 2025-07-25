import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recept, Kategorie } from '../types/recept';

const STORAGE_KEYS = {
  RECEPTY: '@MyFlavor_recepty',
  KATEGORIE: '@MyFlavor_kategorie',
} as const;

export const storage = {
  // Recepty
  async ulozitRecept(recept: Recept): Promise<void> {
    try {
      const recepty = await this.nacistRecepty();
      const existujiciIndex = recepty.findIndex(r => r.id === recept.id);
      
      if (existujiciIndex >= 0) {
        recepty[existujiciIndex] = recept;
      } else {
        recepty.push(recept);
      }

      await AsyncStorage.setItem(STORAGE_KEYS.RECEPTY, JSON.stringify(recepty));
    } catch (error) {
      console.error('Chyba při ukládání receptu:', error);
      throw error;
    }
  },

  async nacistRecepty(): Promise<Recept[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.RECEPTY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Chyba při načítání receptů:', error);
      return [];
    }
  },

  async smazatRecept(id: string): Promise<void> {
    try {
      const recepty = await this.nacistRecepty();
      const filtrovaneRecepty = recepty.filter(recept => recept.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.RECEPTY, JSON.stringify(filtrovaneRecepty));
    } catch (error) {
      console.error('Chyba při mazání receptu:', error);
      throw error;
    }
  },

  // Kategorie
  async ulozitKategorii(kategorie: Kategorie): Promise<void> {
    try {
      const kategorie_list = await this.nacistKategorie();
      const existujiciIndex = kategorie_list.findIndex(k => k.id === kategorie.id);
      
      if (existujiciIndex >= 0) {
        kategorie_list[existujiciIndex] = kategorie;
      } else {
        kategorie_list.push(kategorie);
      }

      await AsyncStorage.setItem(STORAGE_KEYS.KATEGORIE, JSON.stringify(kategorie_list));
    } catch (error) {
      console.error('Chyba při ukládání kategorie:', error);
      throw error;
    }
  },

  async nacistKategorie(): Promise<Kategorie[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.KATEGORIE);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Chyba při načítání kategorií:', error);
      return [];
    }
  },

  async smazatKategorii(id: string): Promise<void> {
    try {
      const kategorie = await this.nacistKategorie();
      const filtrovaneKategorie = kategorie.filter(kat => kat.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.KATEGORIE, JSON.stringify(filtrovaneKategorie));
    } catch (error) {
      console.error('Chyba při mazání kategorie:', error);
      throw error;
    }
  },

  // Pomocné funkce
  async vymazatVsechnaData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.RECEPTY, STORAGE_KEYS.KATEGORIE]);
    } catch (error) {
      console.error('Chyba při mazání všech dat:', error);
      throw error;
    }
  },
}; 
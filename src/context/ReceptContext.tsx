import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Recept, Kategorie, NovyRecept, NovaIngredience, NovyKrokPostupu } from '../types/recept';
import { storage } from '../utils/storage';
import { generateId } from '../utils/helpers';

const VYCHOZI_KATEGORIE: Omit<Kategorie, 'id'>[] = [
  { nazev: 'Polévky', pocetReceptu: 0 },
  { nazev: 'Hlavní jídla', pocetReceptu: 0 },
  { nazev: 'Sladké', pocetReceptu: 0 },
  { nazev: 'Svačiny', pocetReceptu: 0 },
];

interface ReceptState {
  recepty: Recept[];
  kategorie: Kategorie[];
  loading: boolean;
  error: string | null;
}

interface ReceptContextType extends ReceptState {
  pridatRecept: (novyRecept: NovyRecept) => Promise<void>;
  upravitRecept: (recept: Recept) => Promise<void>;
  smazatRecept: (id: string) => Promise<void>;
  pridatKategorii: (nazev: string) => Promise<void>;
  smazatKategorii: (id: string) => Promise<void>;
}

type ReceptAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DATA'; payload: { recepty: Recept[]; kategorie: Kategorie[] } }
  | { type: 'PRIDAT_RECEPT'; payload: Recept }
  | { type: 'UPRAVIT_RECEPT'; payload: Recept }
  | { type: 'SMAZAT_RECEPT'; payload: string }
  | { type: 'PRIDAT_KATEGORII'; payload: Kategorie }
  | { type: 'SMAZAT_KATEGORII'; payload: string };

function receptReducer(state: ReceptState, action: ReceptAction): ReceptState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DATA':
      return {
        ...state,
        recepty: action.payload.recepty,
        kategorie: action.payload.kategorie,
        loading: false,
        error: null,
      };
    case 'PRIDAT_RECEPT':
      return {
        ...state,
        recepty: [...state.recepty, action.payload],
        kategorie: state.kategorie.map(kat => ({
          ...kat,
          pocetReceptu: action.payload.kategorie.includes(kat.id)
            ? kat.pocetReceptu + 1
            : kat.pocetReceptu,
        })),
      };
    case 'UPRAVIT_RECEPT': {
      const staryRecept = state.recepty.find(r => r.id === action.payload.id);
      return {
        ...state,
        recepty: state.recepty.map(recept =>
          recept.id === action.payload.id ? action.payload : recept
        ),
        kategorie: state.kategorie.map(kat => ({
          ...kat,
          pocetReceptu:
            staryRecept?.kategorie.includes(kat.id) && !action.payload.kategorie.includes(kat.id)
              ? kat.pocetReceptu - 1
              : !staryRecept?.kategorie.includes(kat.id) && action.payload.kategorie.includes(kat.id)
              ? kat.pocetReceptu + 1
              : kat.pocetReceptu,
        })),
      };
    }
    case 'SMAZAT_RECEPT': {
      const mazanyRecept = state.recepty.find(r => r.id === action.payload);
      return {
        ...state,
        recepty: state.recepty.filter(recept => recept.id !== action.payload),
        kategorie: state.kategorie.map(kat => ({
          ...kat,
          pocetReceptu: mazanyRecept?.kategorie.includes(kat.id)
            ? kat.pocetReceptu - 1
            : kat.pocetReceptu,
        })),
      };
    }
    case 'PRIDAT_KATEGORII':
      return {
        ...state,
        kategorie: [...state.kategorie, action.payload],
      };
    case 'SMAZAT_KATEGORII':
      return {
        ...state,
        kategorie: state.kategorie.filter(kat => kat.id !== action.payload),
        recepty: state.recepty.map(recept => ({
          ...recept,
          kategorie: recept.kategorie.filter(id => id !== action.payload),
        })),
      };
    default:
      return state;
  }
}

const ReceptContext = createContext<ReceptContextType | undefined>(undefined);

export const ReceptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(receptReducer, {
    recepty: [],
    kategorie: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const initData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Načtení kategorií
        let kategorie = await storage.nacistKategorie();
        
        // Pokud nejsou žádné kategorie, vytvoříme výchozí
        if (kategorie.length === 0) {
          kategorie = await Promise.all(
            VYCHOZI_KATEGORIE.map(async (kat) => {
              const novaKategorie = { ...kat, id: generateId() };
              await storage.ulozitKategorii(novaKategorie);
              return novaKategorie;
            })
          );
        }
        
        const recepty = await storage.nacistRecepty();

        // Přepočítáme počet receptů pro každou kategorii
        const kategorieSpoctem = kategorie.map(kat => ({
          ...kat,
          pocetReceptu: recepty.filter(recept => recept.kategorie.includes(kat.id)).length
        }));

        // Uložíme aktualizované počty
        await Promise.all(
          kategorieSpoctem.map(kat => storage.ulozitKategorii(kat))
        );
        
        dispatch({ type: 'SET_DATA', payload: { recepty, kategorie: kategorieSpoctem } });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Chyba při načítání dat' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initData();
  }, []);

  const pridatRecept = async (novyRecept: NovyRecept) => {
    try {
      const recept: Recept = {
        ...novyRecept,
        id: generateId(),
        vytvoreno: new Date().toISOString(),
        upraveno: new Date().toISOString(),
        ingredience: novyRecept.ingredience.map(ing => ({ ...ing, id: generateId() })),
        postup: novyRecept.postup.map(krok => ({ ...krok, id: generateId() })),
      };

      await storage.ulozitRecept(recept);
      dispatch({ type: 'PRIDAT_RECEPT', payload: recept });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Chyba při ukládání receptu' });
      throw error;
    }
  };

  const upravitRecept = async (recept: Recept) => {
    try {
      const upravenyRecept: Recept = {
        ...recept,
        upraveno: new Date().toISOString(),
      };

      await storage.ulozitRecept(upravenyRecept);
      dispatch({ type: 'UPRAVIT_RECEPT', payload: upravenyRecept });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Chyba při úpravě receptu' });
      throw error;
    }
  };

  const smazatRecept = async (id: string) => {
    try {
      await storage.smazatRecept(id);
      dispatch({ type: 'SMAZAT_RECEPT', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Chyba při mazání receptu' });
      throw error;
    }
  };

  const pridatKategorii = async (nazev: string) => {
    try {
      const novaKategorie: Kategorie = {
        id: generateId(),
        nazev,
        pocetReceptu: 0,
      };

      await storage.ulozitKategorii(novaKategorie);
      dispatch({ type: 'PRIDAT_KATEGORII', payload: novaKategorie });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Chyba při vytváření kategorie' });
      throw error;
    }
  };

  const smazatKategorii = async (id: string) => {
    try {
      await storage.smazatKategorii(id);
      dispatch({ type: 'SMAZAT_KATEGORII', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Chyba při mazání kategorie' });
      throw error;
    }
  };

  const value = {
    ...state,
    pridatRecept,
    upravitRecept,
    smazatRecept,
    pridatKategorii,
    smazatKategorii,
  };

  return (
    <ReceptContext.Provider value={value}>
      {children}
    </ReceptContext.Provider>
  );
};

export const useRecepty = () => {
  const context = useContext(ReceptContext);
  if (context === undefined) {
    throw new Error('useRecepty musí být použito uvnitř ReceptProvider');
  }
  return context;
}; 
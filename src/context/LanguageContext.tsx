import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language } from '../translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.cs;
  isFirstTime: boolean;
  setIsFirstTime: (value: boolean) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('cs');
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          setLanguageState(storedLanguage as Language);
        }

        const firstTimeCheck = await AsyncStorage.getItem('isFirstTime');
        if (firstTimeCheck !== null) {
          setIsFirstTime(false);
        }
      } catch (error) {
        console.error('Chyba při načítání jazyka:', error);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (newLanguage: Language) => {
    try {
      await AsyncStorage.setItem('language', newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error('Chyba při ukládání jazyka:', error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        isFirstTime,
        setIsFirstTime,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage musí být použit uvnitř LanguageProvider');
  }
  return context;
}; 
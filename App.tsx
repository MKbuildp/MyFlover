import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from './src/context/LanguageContext';
import { ReceptProvider } from './src/context/ReceptContext';
import { RootNavigator } from './src/navigation/RootNavigator';

// Povolíme native screens pro lepší výkon
enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <ReceptProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </ReceptProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

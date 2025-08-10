import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { VyberJazykaScreen } from '../screens/VyberJazyka/VyberJazykaScreen';
import { SeznamReceptuScreen } from '../screens/SeznamReceptu/SeznamReceptuScreen';
import { DetailReceptuScreen } from '../screens/DetailReceptu/DetailReceptuScreen';
import { EditovatReceptScreen } from '../screens/EditovatRecept';
import { TabNavigator } from './TabNavigator';
import { useLanguage } from '../context/LanguageContext';
import { DetailReceptuHeaderRight } from '../screens/DetailReceptu/components/DetailReceptuHeaderRight';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isFirstTime } = useLanguage();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime ? (
          <Stack.Screen name="VyberJazyka" component={VyberJazykaScreen} />
        ) : (
          <>
            <Stack.Screen name="HlavniNavigace" component={TabNavigator} />
            <Stack.Screen 
              name="SeznamReceptu" 
              component={SeznamReceptuScreen}
              options={({ route }) => ({
                headerShown: true,
                title: route.params.nazevKategorie,
              })}
            />
            <Stack.Screen
              name="DetailReceptu"
              component={DetailReceptuScreen}
              options={({ route }) => ({
                headerShown: true,
                title: 'Detail receptu',
                headerTitleAlign: 'center', // Vycentrování textu na střed
                headerRight: () => (
                  <DetailReceptuHeaderRight receptId={route.params.receptId} />
                ),
              })}
            />
            <Stack.Screen
              name="EditovatRecept"
              component={EditovatReceptScreen}
              options={{
                headerShown: true,
                title: 'Upravit recept',
                headerTitleAlign: 'center', // Vycentrování textu na střed
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 
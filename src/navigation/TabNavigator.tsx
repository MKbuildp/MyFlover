import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigatorParamList } from '../types/navigation';
import { KategorieScreen } from '../screens/Kategorie/KategorieScreen';
import { VyhledavaniScreen } from '../screens/Vyhledavani/VyhledavaniScreen';
import { PridatReceptScreen } from '../screens/PridatRecept/PridatReceptScreen';
import { useLanguage } from '../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export const TabNavigator = () => {
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tab.Screen
        name="Kategorie"
        component={KategorieScreen}
        options={({ navigation }) => ({
          title: t.categories.title,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.setParams({ showKategorieModal: true })}
              style={{ marginRight: 16, padding: 8 }}
            >
              <Ionicons name="add" size={24} color="#2563eb" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Vyhledavani"
        component={VyhledavaniScreen}
        options={{
          title: t.search.placeholder,
        }}
      />
      <Tab.Screen
        name="PridatRecept"
        component={PridatReceptScreen}
        options={{
          title: t.recipe.new,
        }}
      />
    </Tab.Navigator>
  );
}; 
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
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          textAlign: 'center',
          width: '100%',
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Kategorie"
        component={KategorieScreen}
        options={({ navigation }) => ({
          title: t.categories.title,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "grid" : "grid-outline"} 
              size={size} 
              color={color} 
            />
          ),
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
          title: t.search.title,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "search" : "search-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="PridatRecept"
        component={PridatReceptScreen}
        options={{
          title: t.recipe.new,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "add-circle" : "add-circle-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 
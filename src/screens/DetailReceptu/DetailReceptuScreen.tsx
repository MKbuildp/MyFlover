import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useRecepty } from '../../context/ReceptContext';
import { useLanguage } from '../../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { ReceptHeader } from './components/ReceptHeader';
import { SeznamIngrediencie } from './components/SeznamIngrediencie';
import { SeznamKroku } from './components/SeznamKroku';

type DetailReceptuRouteProp = RouteProp<RootStackParamList, 'DetailReceptu'>;
type DetailReceptuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DetailReceptuScreen = () => {
  const { t } = useLanguage();
  const route = useRoute<DetailReceptuRouteProp>();
  const navigation = useNavigation<DetailReceptuNavigationProp>();
  const { recepty } = useRecepty();
  
  // State pro aktivní fotku (index)
  const [aktivniFotoIndex, setAktivniFotoIndex] = React.useState(0);

  const recept = recepty.find(r => r.id === route.params.receptId);

  // Funkce pro změnu aktivní fotky
  const zmenitAktivniFoto = (index: number) => {
    setAktivniFotoIndex(index);
  };

  if (!recept) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text style={styles.errorTitle}>Recept nenalezen</Text>
        <Text style={styles.errorText}>Tento recept již neexistuje.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Zpět</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {recept.fotografie && recept.fotografie.length > 0 ? (
          <View>
            {/* Hlavní velká fotka */}
            <Image source={{ uri: recept.fotografie[aktivniFotoIndex] }} style={styles.hlavniFoto} />
            
            {/* Pás s menšími náhledy - pouze pokud jsou další fotky */}
            {recept.fotografie.length > 1 && (
              <View style={styles.nahledyContainer}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.nahledyScroll}
                >
                  {recept.fotografie.map((fotka, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => zmenitAktivniFoto(index)}
                      style={[
                        styles.nahledFoto, 
                        index === aktivniFotoIndex && styles.aktivniNahled,
                        index === recept.fotografie.length - 1 && styles.posledniNahled
                      ]}
                    >
                      <Image 
                        source={{ uri: fotka }} 
                        style={styles.nahledFotoObrazek}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.prazdneFoto}>
            <Ionicons name="restaurant-outline" size={48} color="#94a3b8" />
          </View>
        )}

        <View style={styles.content}>
          <ReceptHeader recept={recept} />
          <SeznamIngrediencie ingredience={recept.ingredience} />
          <SeznamKroku kroky={recept.postup} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  hlavniFoto: {
    width: '100%',
    height: 250,
  },
  nahledyContainer: {
    height: 80,
    backgroundColor: '#f1f5f9',
    borderRadius: 0,
  },
  nahledyScroll: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  nahledFoto: {
    width: 100,
    height: 70,
    borderRightWidth: 1,
    borderRightColor: '#000000',
  },
  nahledFotoObrazek: {
    width: '100%',
    height: '100%',
  },
  aktivniNahled: {
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  posledniNahled: {
    borderRightWidth: 0,
  },
  prazdneFoto: {
    width: '100%',
    height: 250,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'white',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 
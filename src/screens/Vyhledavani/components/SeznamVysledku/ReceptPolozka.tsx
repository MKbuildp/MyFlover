import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { ReceptPolozkaProps } from './types';
import { Ionicons } from '@expo/vector-icons';
import { useRecepty } from '../../../../context/ReceptContext';

export const ReceptPolozka: React.FC<ReceptPolozkaProps> = ({
  recept,
  onPress,
}) => {
  const { prepnoutOblibeny } = useRecepty();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {recept.fotografie && recept.fotografie.length > 0 ? (
        <Image source={{ uri: recept.fotografie[0] }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Ionicons name="restaurant-outline" size={24} color="#94a3b8" />
        </View>
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.nazev} numberOfLines={1}>
            {recept.nazev}
          </Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              prepnoutOblibeny(recept.id);
            }}
            style={styles.oblibenyButton}
          >
            <Ionicons
              name={recept.oblibeny ? "heart" : "heart-outline"}
              size={24}
              color={recept.oblibeny ? "#ef4444" : "#64748b"}
            />
          </TouchableOpacity>
        </View>
        
        {recept.popis ? (
          <Text style={styles.popis} numberOfLines={2}>
            {recept.popis}
          </Text>
        ) : null}

        <View style={styles.info}>
          {recept.dobaPrivavy > 0 && (
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="#64748b" />
              <Text style={styles.infoText}>{recept.dobaPrivavy} min</Text>
            </View>
          )}
          
          {recept.pocetPorci > 0 && (
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={16} color="#64748b" />
              <Text style={styles.infoText}>{recept.pocetPorci} porce</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  oblibenyButton: {
    padding: 4,
    marginRight: -4,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  nazev: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  popis: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
});

// components/FoodCardList.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FoodCardListProps } from '@/types/types';

const FoodCardList: React.FC<FoodCardListProps> = ({ data }) => {

  const dataArray = Object.values(data);
  console.log('data Array',dataArray); // Log the entire data array
  
  return (
    <FlatList
      data={dataArray}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => {
        console.log(item);
        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({
              pathname: `/FoodCourtMenu/${item.name}`,
              params: { ...item, timing: JSON.stringify(item.timing) , image: encodeURI(item.image) }
            })}
          > 
            <Image 
              source={item.image ? { uri: item.image } : require('@/assets/images/foodcourt1.jpeg')} 
              style={styles.image} 
            />
            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={[styles.price, { color: '#fff', backgroundColor: '#6995FF' }]}>{item.priceRange}</Text>
              </View>
              <Text style={styles.details}><Ionicons name='location' size={10} color={'#6995FF'}/> {item.location}</Text>
              <Text style={styles.details}>Landmark: {item.landmark}</Text>
              <Text style={styles.details}>Distance from JUIT: {item.distance}</Text>
              <Text style={[styles.details, { color: '#6995FF' }]}>Famous for: {item.famousFor}</Text>

        
             
            </View>
          </TouchableOpacity>
        );
      }}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  card: {
    flexDirection: 'column',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 4, height: 1 },
    shadowRadius: 5,
    elevation: 4,
    marginHorizontal: 30
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  info: {
    marginLeft: 5,
    justifyContent: 'center',
    fontFamily: 'Rubik',
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Rubik',
    color: '#6995FF',
  },
  details: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Rubik',
  },
  price: {
    fontSize: 12,
    borderRadius: 5,
    paddingHorizontal: 4,
    fontFamily: 'Rubik',
  }
});

export default FoodCardList;

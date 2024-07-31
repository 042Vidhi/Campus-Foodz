// components/FoodCardList.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface FoodCourt {
  id:number;
  image: string;
  name: string;
  distance: string;
  location: string;
  priceRange: string;
  famousFor: string;
  landmark: string;
}

interface FoodCardListProps {
  data: FoodCourt[];
}

const FoodCardList: React.FC<FoodCardListProps> = ({ data }) => {
 
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({
            pathname: `/FoodCourtMenu/${item.id}`,
            params: { menu: JSON.stringify(item) } // Passing the item as a stringified JSON
          })}
        >
          <Image source={item.image || require('@/assets/images/foodcourt1.jpeg')} style={styles.image} />
          <View style={styles.info}>
            <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.price,{color:'white',backgroundColor:'green'}]}>{item.priceRange}</Text>
            </View>
           
            <Text style={styles.details}><Ionicons name='location' size={10} color={'red'}/> {item.location}</Text>
            <Text style={styles.details}>Landmark: {item.landmark}</Text>
            <Text style={styles.details}>Distance from JUIT: {item.distance}</Text>
            <Text style={[styles.details,{color:'#f1592a'}]}>Famous for {item.famousFor}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'space-between'
  },
  card: {
    flexDirection: 'column',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
    margin:20
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  info: {
    marginLeft: 5,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 12,
    color: '#666',
  },
  price:{
    fontSize: 12,
    borderRadius: 5,
    paddingHorizontal:4
  }
});

export default FoodCardList;

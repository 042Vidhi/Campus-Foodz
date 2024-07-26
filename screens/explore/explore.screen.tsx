// screens/ExploreScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import SearchBar from '@/components/SearchBar';
import FoodCardList from '@/components/FoodCardList';
import { foodCourt } from '@/api/dummydata/FoodCourtList';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoodCourts = foodCourt.filter((fc) =>
    fc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Explore</Text>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FoodCardList data={filteredFoodCourts} />
    </View>
  );
}

const styles = StyleSheet.create({
    heading: {
        color: '#f1592a',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft:20,
        paddingVertical: 10,
        backgroundColor: '#fff',
      
       
    },
  container: {
    flex: 1,
  },
});


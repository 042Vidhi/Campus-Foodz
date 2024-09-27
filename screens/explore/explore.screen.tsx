// screens/ExploreScreen.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View ,Text,ActivityIndicator ,Image} from 'react-native';
import SearchBar from '@/components/SearchBar';
import FoodCardList from '@/components/FoodCardList';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FoodCourt } from '@/types/types';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading,setLoading] = useState<boolean>(false);
  const [foodCourts, setFoodCourts] = useState<FoodCourt>();
  const fetchFoodCourtList = async (): Promise<void> => {
    try {
      const foodCourtsData: Record<string, FoodCourt> = {};
      setLoading(true);
      const snapshot = await getDocs(collection(db, "FoodCourtList"));
      snapshot.forEach((document) => {
        foodCourtsData[document.id] = document.data() as FoodCourt;
        
      });
      console.log(JSON.stringify(foodCourtsData))
      setFoodCourts(foodCourtsData);
      console.log(JSON.stringify(foodCourts))

    } catch (err) {
      console.log("Error in firebase Food Court List fetching", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFoodCourtList();
  }, []);

  
    // const filteredFoodCourts = foodCourts?.filter((fc) =>
    //   fc.document.id.toLowerCase().includes(searchQuery.toLowerCase())
    // );
  
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6692FD" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  // if(!foodCourts)
  //   {
  //     return(
  //     <View style={styles.loadingContainer}>
        
  //         <Image source={require("@/assets/images/oops.png")} 
  //           style={{ width: 100, height: 100 }}
  //           resizeMode="contain"
  //         />     
  //       <Text style={styles.heading3}>
  //         Data Not Found {'\n'} We'll get back to you
  //       </Text>
  //     </View>
  //     )
  //   }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore</Text>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* <FoodCardList data={filteredFoodCourts} /> */}
      {foodCourts && <FoodCardList data={foodCourts} />}

    </View>
  );
}

const styles = StyleSheet.create({
    heading: {
      fontFamily: 'Rubik',
      fontSize: 18,
      fontWeight: '500',
      color: '#484848',
      marginHorizontal:30,
      marginTop:30, 
    },
    heading3: {
      textAlign:'center',
      color: '#6995FF',
      fontSize: 13,
      fontFamily: 'Rubik',
      fontWeight: '600', // Use numeric values for fontWeight in React Native
    },
  container: {
    flex: 1,
    backgroundColor:'#FFFBF1',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6692FD',
  },
});


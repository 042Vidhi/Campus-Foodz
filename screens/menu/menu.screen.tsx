import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator} from 'react-native';
import React, { useEffect,useState } from 'react';
import { foodCourtMenu } from '@/api/dummydata/FoodCourtMenu';
import { StatusBar } from 'expo-status-bar';
import _ from 'lodash'
import { Ionicons } from '@expo/vector-icons';

export default function MenuScreen({ item }: any) {
    const [menuData, setMenuData] = useState<any>(null);
  useEffect(()=>{
    function getMenu(){
      
      const itemId = Number(item.id);
      const foodCourtData = _.cloneDeep(_.filter(foodCourtMenu, (list) => list.id === itemId));
      // console.log('foodcourtdata', JSON.stringify(foodCourtData));
      setMenuData(foodCourtData[0]?.items || null);
      
    }
    getMenu();
  },[])
 
  if (!menuData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
    
  return (
    <View style={styles.container}>
    <ScrollView 
      // showsVerticalScrollIndicator={false}
    >
      <View style={styles.row1} >
        <Image source={item.image} style={styles.image}></Image>
      </View>
      <View style={styles.info}>
            <View style={styles.row2}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.price,{color:'white',backgroundColor:'green'}]}>{item.priceRange}</Text>
            </View>
           
            <Text style={styles.details}><Ionicons name='location' size={10} color={'red'}/> {item.location}</Text>
            <Text style={styles.details}>Landmark: {item.landmark}</Text>
            <Text style={styles.details}>Distance from JUIT: {item.distance}</Text>
            <Text style={[styles.details,{color:'#f1592a'}]}>Famous for {item.famousFor}</Text>
      </View>
      <Text style={styles.heading2}>Menu</Text>
      {Object.keys(menuData).map(category => (
          <View key={category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {menuData[category].map((foodItem: any) => (
              <View key={foodItem.id} style={styles.foodItem}>
                <Image source={foodItem.image} style={styles.image2} ></Image>
                <View style={styles.row}>
                <Text style={styles.name2}>{foodItem.name}</Text>
                <Text>Rs.{foodItem.price}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}


    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    // flex:1,
  },
  heading2: {
    color: "#f1592a",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row1:{
    display:'flex',
  },
  row:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex: 1,
    marginLeft:10,
    // borderColor:'#c52604',
    // borderWidth:1,
  },
  row2:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  image:{
    width:'auto',
    height:200,
  },
  info: {
   marginHorizontal:20,
   marginTop:10,
    justifyContent: 'center',
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
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
  },
  image2:{
    width:50,
    height:50,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft:15,
  },
  foodItem: {
    display:'flex',
    flexDirection:'row',
    padding: 10,
    marginBottom:5,
    marginHorizontal:20,
    borderRadius: 10,
    backgroundColor: '#fff',
    // borderColor:'#c52604',
    // borderWidth:1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  name2:{
    color:'#2d0800',
    fontWeight:'500',
  }
});

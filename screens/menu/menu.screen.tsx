import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator} from 'react-native';
import React, { useEffect,useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomerPhotos from '@/components/PhotosList';
import { db } from '@/config/firebase';
import { collection,getDocs } from 'firebase/firestore';


export default function MenuScreen({ item }: any) {
    const [menuData, setMenuData] = useState<any>(null);
    const [photos,setPhotos] = useState<any>(null);
    const [timings,setTimings] = useState<any>(null);
    const [loading,setLoading] = useState<boolean>();
    const getMenu = async ()=> {
      try {
        let menu: Record<string, any> = {};
        setLoading(true);
        const snapshot = await getDocs(collection(db, "FoodCourtMenu"));
        snapshot.forEach((document) => {
          if(document.id === item.name) 
          {
            menu[document.id] = document.data() || {};
          }
        });
        setMenuData(menu[item.name].items)
        console.log('images url',menu[item.name].images)
        setPhotos(menu[item.name].images)
        const timestring: Record<string,string>  = JSON.parse(item.timing)
        setTimings(timestring)

      } catch (err) {
        console.log("Error in firebase Food Court Menu fetching", err);
      } finally {
        setLoading(false);
      }

    }
    useEffect(()=>{
      getMenu();
    },[])
 
  if (!item && loading) {
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
    >
      <View style={styles.imageRow}>
      <Image source={item.image ? { uri:item.image } : require('@/assets/images/foodcourt1.jpeg')} style={styles.image}/>
      </View>
      <Text style={styles.heading2}>About</Text>

      <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}><Ionicons name='location' size={10} color={'red'}/> {item.location}</Text>
            <Text style={styles.details}>Landmark: {item.landmark}</Text>
            <Text style={styles.details}>Distance from JUIT: {item.distance}</Text>
            <Text style={[styles.details,{color:'#6995FF'}]}>Famous for {item.famousFor}</Text>
            <Text style={styles.details}>Contact: {item.contact || 9167834778}</Text>
      </View>
     
      {
        timings &&
        (
          <View style={styles.info}>
                <Text style={styles.name}>Open Timing</Text>
                {Object.entries(timings).map(([day, time]) => (
                    <Text key={day} style={styles.details}>{day}: {time}</Text>
                ))}
          </View>
        )
      }
      
      {
        photos
        &&
        (
          <View>
            <Text style={styles.heading2}>Photos</Text>
            <CustomerPhotos photos={photos}/>
          </View>
        )
      }
      {
        menuData &&
        ( 

          <View >
              <Text style={styles.heading2}>Menu</Text>

              {Object.keys(menuData).map(category => (
              <View key={category} style={styles.info}>
                <Text style={styles.name}>{category}</Text>
                {menuData[category].map((foodItem: any) => (
                  <View key={foodItem.id} 
                  >
                    <View style={styles.row}>
                    <Text style={styles.name2}>{foodItem.name}</Text>
                    <Text style={styles.name2}>Rs.{foodItem.price}</Text>
                    </View>
                  </View>
                ))}
                  </View>
               ))}
          </View>
        )
      } 
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFBF1',
  },
  imageRow:{
    paddingRight:40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 3, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  heading2: {
    marginLeft:25,
    color: "#868686",
    fontFamily:'Rubik',
    fontSize: 16,
    fontWeight: "semibold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  image:{
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginHorizontal:20,
    marginVertical:10,
  },
  info: {
    marginHorizontal: 20,
    marginVertical:10,
    padding: 10,
    borderRadius: 10,
    borderColor: "#6995FF",
    borderLeftWidth:6,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 4, height: 1 },
    shadowRadius: 5,
    elevation: 4,
    justifyContent: 'center',
  },
  name: {
    fontFamily:'Rubik',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  details: {
    fontSize: 12,
    color: '#666',
  },
  foodItem: {
    display:'flex',
    flexDirection:'row',
    padding: 10,
    marginBottom:5,
    marginHorizontal:20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  name2:{
    color:'#868686',
    fontSize:14,
  }
});

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import {DayItem,MessMenu} from '@/types/types'
import DisplayMenu from "@/components/DisplayMenu";


export default function HomeScreen(): JSX.Element {
  const [messMenu, setMessMenu] = useState<Record<string, MessMenu>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error,setError] = useState<string>('');
  const today = new Date();
  const year = today.getFullYear();
  const monthnames = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
  ];
  const month = today.getMonth();
  // const lastDay = new Date(year, month + 1, 0);
  // const daysInMonth = lastDay.getDate();
  const time = ["7:30 AM - 9:30 AM", "12:00 PM - 2:00 PM", "7:30 PM - 9:00 PM"];
  const daysArray = [0,1,2,3,4,5,6];
  let todayIndex = today.getDay();
  console.log(todayIndex)
    // for (let day = 1; day <= daysInMonth; day++) {
    //     const date = new Date(year, month, day);
    //     const isToday = date.toDateString() === today.toDateString();
    //     if (isToday) todayIndex = day - 1;
    //     daysArray.push({
    //     day: date.getDate(),
    //     date: date,
    //     dayOfWeek: date.getDay(),
    //     isToday: isToday,
    //     });
    // }
  // const { daysArray, todayIndex, today, monthnames, month, year, time } = getDateArray();
  const [selectedDay, setSelectedDay] = useState<number>(todayIndex);
  const flatListRef = useRef<FlatList<number>>(null);

  useEffect(() => {
    getMessMenu();
  }, []);

  const getMenuForSelectedDay = (dayOfWeek: number): MessMenu | undefined => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return messMenu[daysOfWeek[dayOfWeek]];
  };

  const selectedMenu = getMenuForSelectedDay(daysArray[selectedDay] || 0);

  const getMessMenu = async (): Promise<void> => {
    try {
      const messdata: Record<string, MessMenu> = {};
      setLoading(true);
      const snapshot = await getDocs(collection(db, "MessMenu"));
      snapshot.forEach((document) => {
        messdata[document.id] = document.data() as MessMenu;
      });
      // console.log('messdata ',messdata)
      setMessMenu(messdata);
      console.log('todayIndex',todayIndex)
      if (flatListRef.current && todayIndex >= 0) {
        flatListRef.current?.scrollToIndex({ index:todayIndex, animated: true });
      }
    } catch (err: unknown) {  
      if (err instanceof Error) {
        setError(err.message);
        console.log("Error in firebase menu fetching", err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6692FD" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  if(!selectedMenu)
  {
    return(
    <View style={styles.loadingContainer}>
      
        <Image source={require("@/assets/images/oops.png")} 
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />     
      <Text style={styles.heading3}>
        Data Not Found {'\n'} We'll get back to you
      </Text>
      <Text>{error}</Text>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>Mess Menu</Text>
        <Text style={styles.heading2}>
          Today{"\n"}
          {today.getDate()} {monthnames[month]} {year}
        </Text>
      </View>
      {/* <View>
        <Image source={require("@/assets/images/banner.png")} style={styles.TodayImg} />
      </View> */}
      {
        selectedMenu &&
        (
          <FlatList
          ref={flatListRef}
          horizontal={true}
          data={daysArray}
          extraData={selectedDay}
          keyExtractor={(item) => item}
          renderItem={({ item, index }: { item: number; index: number }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedDay(index);
                flatListRef.current?.scrollToIndex({ index, animated: true });
              }}
              style={styles.datebox}
            >
              <View
                style={[
                  styles.dateItem,
                   selectedDay == index
                    ? { backgroundColor: "#6692FD" }
                    : null,
                ]}
              >
                {/* <Text style={{ color: "#fff" }}>{item.day}</Text> */}
                <Text style={{ color: "#fff" }}>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][item]}</Text>
              </View>
            </TouchableOpacity>
        )}
        />
        )
      }
     
      {
        selectedMenu 
        &&
        (
          <DisplayMenu selectedMenu={selectedMenu} daysArray={daysArray} time={time} selectedDay={selectedDay}/>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    flex: 1,
    backgroundColor: "#FFFBF1",
    fontFamily:'Rubik',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginHorizontal:20,
    marginTop:8,
  },
  heading: { 
    fontFamily: 'Rubik',
    fontSize: 18,
    fontWeight: '500', // Use numeric values for fontWeight in React Native
    color: '#484848',
  },
  heading2: {
    textAlign:'right',
    color: '#6995FF',
    fontSize: 13,
    fontFamily: 'Rubik',
    fontWeight: '600', // Use numeric values for fontWeight in React Native
  },
  heading3: {
    textAlign:'center',
    color: '#6995FF',
    fontSize: 13,
    fontFamily: 'Rubik',
    fontWeight: '600', // Use numeric values for fontWeight in React Native
  },
  TodayImg:{
    width:'auto',
    marginHorizontal:20,
    height:100,
    marginVertical:10,
    borderRadius:10,
  },
  datebox:{
    width:60,
    backgroundColor:'#A9ADB7',
    borderRadius: 10,
    marginVertical:10,
    marginHorizontal:15,
    overflow:'hidden',
  },
  dateItem: {
    height:60,
    padding:10,
    width:60,
    borderRadius: 10,
    flexDirection:'column',
    alignItems:'center',
    color:'#fff',
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

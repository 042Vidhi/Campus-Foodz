import React from "react"
import { ScrollView ,View ,Text, StyleSheet,} from "react-native"

interface DisplayMenuProps {
    selectedMenu : any,
    daysArray : any,
    selectedDate : any,
    time : any,
}

const DisplayMenu = ({ selectedMenu, daysArray, selectedDate, time }:DisplayMenuProps)=>{


    return(
        <ScrollView contentContainerStyle={styles.menuContainer}>
        <View style={styles.menuCard}>
          <View>
            <Text style={styles.menuHeading}>Breakfast</Text>
            <Text style={styles.wrapperTextbox}>
              <Text style={styles.menuHeading2}>
                {daysArray[selectedDate]?.dayOfWeek !== 0 ? time[0] : "8:00 AM - 10:00 AM"}
              </Text>
            </Text>
            {selectedMenu?.Breakfast?.map((item:string, index:number) => (
              <Text key={index} style={styles.menuItem}>{`\u2022 ${item}`}</Text>
            ))}
          </View>
        </View>
        <View style={styles.menuCard}>
          <View>
            <Text style={styles.menuHeading}>Lunch</Text>
            <Text style={styles.wrapperTextbox}>
              <Text style={styles.menuHeading2}>{time[1]}</Text>
            </Text>
            {selectedMenu?.Lunch?.map((item:string, index:number) => (
              <Text key={index} style={styles.menuItem}>{`\u2022 ${item}`}</Text>
            ))}
          </View>
        </View>
        <View style={styles.menuCard}>
          <View>
            <Text style={styles.menuHeading}>Dinner</Text>
            <Text style={styles.wrapperTextbox}>
              <Text style={styles.menuHeading2}>{time[2]}</Text>
            </Text>
            {selectedMenu?.Dinner?.map((item:string, index:number) => (
              <Text key={index} style={styles.menuItem}>{`\u2022 ${item}`}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    )
}
    const styles = StyleSheet.create({
        menuContainer: {
            marginTop: 20,
            paddingBottom: 20, // Ensure there's some padding at the bottom for better scroll experience
          },
          menuCard: {
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
          },
          menuHeading: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#6995FF",
            borderRadius: 10,
            paddingLeft: 10,
          },
          menuHeading2: {
            color: "#3E3E3E",
            backgroundColor:'#FDEAC1',
            opacity: 0.68,
            fontSize: 12,
            fontWeight: "600",
          },
          wrapperTextbox:{
            paddingLeft:10,
            marginVertical:10,
            
          },
          menuTime: {
            padding:3,
            fontSize: 12,
            color: "#3E3E3E",
            fontFamily:'Rubik',
          },
          menuItem: {
            fontSize: 14,
            color: "#868686",
            paddingLeft: 10,
            fontFamily:'Rubik',
          },
    })

export default DisplayMenu
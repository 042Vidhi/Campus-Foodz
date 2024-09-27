import {  Button, Image, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen"

export default function OnboardingScreen() {


  return (
    
    <View style={styles.firstContainer}>
          <Text style={styles.heading1}>Welcome To JUIT</Text>
          <Text style={[styles.heading1,{color:'#037bfc',fontWeight:'600'}]}>Campus Foodz</Text>
        <Image source={require('@/assets/images/onboard_food_2.png')} style={styles.image} />
          {/* <Text style={styles.heading2}>JUIT</Text> */}
          <Text style={styles.text1}>Explore Your Mess Menu, Find Nearby Restaurants and Dhabas, and their Offerings.</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>router.push("/(tabs)/home")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

      </View>
  )
}

const styles = StyleSheet.create({
  firstContainer:{
      alignItems:"center",
      flex:1,
      justifyContent:"center",
      backgroundColor: "#FFFBF1",
  },
  image: {
      width: wp('60%'),
      height: hp('30%'),
      resizeMode: 'contain',
      marginBottom: hp('2%'),
    },
  heading1:{
    fontFamily:'Rubik',
      fontSize:20,
      fontWeight:"100",
      textAlign:'center',
  },
  text1:{
    fontFamily:'Rubik',
    marginBottom:15,
    color:'#868686',
    textAlign:'center',
    marginHorizontal:50,
  },
  heading2:{
    fontFamily:'Rubik',
      fontSize:20,
      fontWeight: 'bold',
      color:"#1A3636"
  },
  buttonContainer: {
      backgroundColor: '#6995FF',
      borderRadius: wp('2%'),
      paddingVertical: hp('1%'),
      paddingHorizontal: wp('20%'),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 4, height: 1 },
      shadowRadius: 5,
      elevation: 4,
  },
  buttonText: {
    fontFamily:'Rubik',
  color: '#FFFFFF',
  fontSize: wp('5%'),
  },
})
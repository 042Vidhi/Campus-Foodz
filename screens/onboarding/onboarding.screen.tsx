import {  Button, Image, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/onboarding/onboard'
import { router } from 'expo-router'

export default function OnboardingScreen() {


  return (
    
      <View style={styles.firstContainer}>

          <Text style={styles.heading1}>Welcom To Campus Foodz</Text>
          <Text style={styles.heading2}>JUIT</Text>
          <Image source={require('@/assets/images/onboard_food.png')} style={styles.image} />
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>router.push("/(tabs)/home")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
      </View>
  )
}


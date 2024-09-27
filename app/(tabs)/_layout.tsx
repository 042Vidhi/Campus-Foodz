import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {Tabs}from 'expo-router'

export default function _layout() {
  return (
   
        <Tabs screenOptions={{ tabBarActiveTintColor:'#6995FF',headerShown:false }}>
            <Tabs.Screen name="home"
              options={{
               
                tabBarIcon:({color})=><Ionicons name='home' size={28} color={color}/>
              }}
            />
            <Tabs.Screen name="explore"
               options={{
                
                tabBarIcon:({color})=><Ionicons name='compass' size={28} color={color}/>
                
              }}
            />
          
        </Tabs>
    
  )
}

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {Tabs}from 'expo-router'

export default function _layout() {
  return (
   
        <Tabs screenOptions={{ tabBarActiveTintColor:'#f1592a',headerShown:false }}>
            <Tabs.Screen name="home"
              options={{
                title:"Home",
                tabBarIcon:({color})=><Ionicons name='home' size={28} color={color}/>
              }}
            />
            <Tabs.Screen name="explore"
               options={{
                title:"Explore",
                tabBarIcon:({color})=><Ionicons name='compass' size={28} color={color}/>
                
              }}
            />
            {/* <Tabs.Screen name="suggestionbox"
               options={{
                title:"Suggestion Box",
                tabBarIcon:({color})=><Ionicons name='chatbubbles' size={28} color={color}/>

              }}
            /> */}
        </Tabs>
    
  )
}

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router, Tabs, useNavigation } from 'expo-router';

export default function _layout() {
  const navigation = useNavigation(); 

  const CustomHeader = () => (
    <View style={styles.headerContainer}> 
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => router.push('notifications')}
      >
        <Ionicons name="notifications-outline" size={24} color="#6995FF" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu-outline" size={24} color="#6995FF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6995FF' }}>
      <Tabs.Screen 
        name="home"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
          headerTitle: () => <Text style={styles.headerTitle}>Home</Text>,
          headerRight: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen 
        name="explore"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="compass" size={28} color={color} />,
          headerTitle: () => <Text style={styles.headerTitle}>Explore</Text>,
          headerRight: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen 
        name="notifications"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={28} color={color} />,
          headerTitle: () => <Text style={styles.headerTitle}>Notifications</Text>, // Custom header title
          headerStyle: { backgroundColor: '#6995FF' }, // Custom header background
          headerTintColor: '#fff', // Change the color of the title and icons
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#6995FF',
    fontWeight: 'bold',
  },
});

import MenuScreen from '@/screens/menu/menu.screen';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Page() {
  const item = useLocalSearchParams();

  // Ensure menu is a string before parsing
  // const item = Array.isArray(menu) ? JSON.parse(menu[0]) : JSON.parse(menu);
  
  console.log('item',item)
  return (
    <View>
      {item ? <MenuScreen item={item} /> : <Text>Loading...</Text>}
    </View>
  );
}

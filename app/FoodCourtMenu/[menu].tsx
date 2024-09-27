import MenuScreen from '@/screens/menu/menu.screen';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Page() {
  const item = useLocalSearchParams();

  console.log('item from params ',item)
  console.log('item type ', typeof item)
  console.log('item timing type ', typeof item.timing)
  console.log('item.timing ',item.timing)
  // Ensure menu is a string before parsing
  // const item = Array.isArray(menu) ? JSON.parse(menu[0]) : JSON.parse(menu);
  const parsedItem = { 
    ...item, 
    timing: item.timing ? JSON.parse(JSON.stringify(item.timing)) : null 
  };

  console.log('parsedItem', parsedItem);

  console.log('item getting',item)
  return (
    <View>
      {item ? <MenuScreen item={item} /> : <Text>Loading...</Text>}
    </View>
  );
}

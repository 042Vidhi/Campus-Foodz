import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Page() {
  const { menu } = useLocalSearchParams();
  return (
  <View>
  <Text>Menu item: {menu}</Text>
  </View>
  );
}
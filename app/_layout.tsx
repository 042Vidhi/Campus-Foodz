import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {  useEffect } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalProvider from '@/context/GlobalProvider';
import React from 'react';
import { NotificationProvider } from '@/context/NotificationContext';
import * as Notifications from 'expo-notifications'
// Prevent the splash screen from auto-hiding before asset loading is complete.

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Rubik:require('@/assets/fonts/static/Rubik-Regular.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <NotificationProvider>
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="FoodCourtMenu/[menu]" 
        options={{ headerTitle:
          `Menu`,
          headerTitleStyle: {
            fontSize:16
          },
         }} 
         />
         

      </Stack>
  </GlobalProvider>
  </NotificationProvider>
    </View>
  );
}

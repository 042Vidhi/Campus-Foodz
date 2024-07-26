import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabsLayout from '@/app/(tabs)/_layout';
import GlobalProvider from '@/context/GlobalProvider';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    // <View style={{ flex: 1, paddingTop: insets.top }}>
    //   {isLoggedIn ? (
    //     <Stack screenOptions={{headerShown:false}}>
    //       <Stack.Screen name="(tabs)"/>
    //     </Stack>
    //   ) : (
    //     <Stack screenOptions={{ headerShown: false }}>
    //       <Stack.Screen name="(routes)/onboarding" />
    //       <Stack.Screen name="(routes)/login" />
    //       <Stack.Screen name="(routes)/signup" />
    //     </Stack>
    //   )}
    // </View>
    <View style={{ flex: 1, paddingTop: insets.top }}>
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
    </View>
  );
}

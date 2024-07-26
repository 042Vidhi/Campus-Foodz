import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
    const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <>
     <Stack>
        <Stack.Screen
          name="loginin"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  )
}

const styles = StyleSheet.create({})

import React from 'react'
import { Redirect } from 'expo-router'
import OnboardingScreen from '@/screens/onboarding/onboarding.screen'
import { useGlobalContext } from "../context/GlobalProvider";

export default function index() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <OnboardingScreen/>
  )
}

import { Text, View , TextInput , TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {styles} from "@/styles/auth/login"
import { router } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        console.log('Login button pressed');
        console.log('Email:', email);
        console.log('Password:', password);
    }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SignIn</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.textBottom}>Don't have an account? <Text style={styles.textLink} onPress={()=>router.push("/(routes)/signup")}>Signup</Text></Text>

    </View>
  )
}


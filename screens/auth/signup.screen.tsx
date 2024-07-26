import { Text, View , TextInput , TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {styles} from "@/styles/auth/signup"
import { router } from 'expo-router';

export default function SignUpScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignUp = () => {
        console.log('SignUp button pressed');
        console.log('Email:', email);
        console.log('Password:', password);
        router.push("(tabs)")
    }
  return  (
    <View style={styles.container}>
      <Text style={styles.heading2}>Welcome To Campus Foodz</Text>
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <Text style={styles.textBottom}>Already have an account? <Text style={styles.textLink} onPress={()=>router.push("/(routes)/login")}>SignIn</Text></Text>

    </View>
  )
}


    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    // import { getAnalytics,isSupported } from "firebase/analytics";
    import {getFirestore} from "firebase/firestore";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // const firebaseConfig = {
    //     apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    //     authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    //     projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    //     storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    //     messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    //     appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    //     measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
    //   };
    const firebaseConfig = {
      apiKey: "AIzaSyB7j240fVelPWdlQ5axXIhFF9-KBi-odiQ",
      authDomain: "campus-foodz.firebaseapp.com",
      projectId: "campus-foodz",
      storageBucket: "campus-foodz.appspot.com",
      messagingSenderId: "403397435299",
      appId: "1:403397435299:web:6b63ce04d6cddddf58c416",
      measurementId: "G-NF2NMTHH58"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // async function initAnalytics() {
    //   if (await isSupported()) {
    //     const analytics = getAnalytics(app);
    //   } else {
    //     console.warn("Firebase Analytics is not supported in this environment.");
    //   }
    // }
    
    // initAnalytics();
    export const db = getFirestore(app)
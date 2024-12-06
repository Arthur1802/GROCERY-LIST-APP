import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
    apiKey: "AIzaSyAjdyKbPj21beOIRKInTwafYfFi2dZmUvg",
    authDomain: "grocery-list-962c8.firebaseapp.com",
    projectId: "grocery-list-962c8",
    storageBucket: "grocery-list-962c8.firebasestorage.app",
    messagingSenderId: "1064157247970",
    appId: "1:1064157247970:web:2cb38240d202a744aa21bb",
    measurementId: "G-FCZNB8TGKH",
}

const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

export { auth, app }
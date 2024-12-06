import { useColorScheme } from "react-native"
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"
import { useLogger } from "@react-navigation/devtools"
import StackNavigator from "./navigations/stackNavigator"
import * as Font from 'expo-font'
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"
import { auth } from '../utils/authentication/config'
import { useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    signInWithCredential,
    onAuthStateChanged
} from 'firebase/auth'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import AsyncStorage from '@react-native-async-storage/async-storage'

WebBrowser.maybeCompleteAuthSession()

const getTheme = () => {
    return useColorScheme() || 'light'
}

const toastConfig = {
    warning: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'yellow', backgroundColor: getTheme() === 'dark' ? '#232323' : '#f5f5f5' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 15, color: getTheme() === 'dark' ? 'white' : 'black' }}
            text2Style={{ fontSize: 13, color: getTheme() === 'dark' ? 'white' : 'black' }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'red', backgroundColor: getTheme() === 'dark' ? '#232323' : '#f5f5f5' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 15, color: getTheme() === 'dark' ? 'white' : 'black' }}
            text2Style={{ fontSize: 13, color: getTheme() === 'dark' ? 'white' : 'black' }}
        />
    ),
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green', backgroundColor: getTheme() === 'dark' ? '#232323' : '#f5f5f5' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 15, color: getTheme() === 'dark' ? 'white' : 'black' }}
            text2Style={{ fontSize: 13, color: getTheme() === 'dark' ? 'white' : 'black' }}
        />
    )
}

const fetchFonts = () => {
    return Font.loadAsync({
        'popping-regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    })
}

export const isUserLoggedIn = async (setUserInfo) => {
    try {
        const userJSON = await AsyncStorage.getItem('@user')
        const userData = userJSON ? JSON.parse(userJSON) : null
        setUserInfo(userData)
    } catch (error) {
        console.error(error)
        Toast.show({
            type: 'error',
            text1: 'Erro ao verificar usuário logado',
            text2: error.message
        })
    }
}

export default function App() {
    const [isReady, setIsReady] = useState(false)

    const [userInfo, setUserInfo] = useState(null)

    const navigationRef = useNavigationContainerRef()

    useLogger(navigationRef)

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '1064157247970-f5iq31of6hfm7nr7f260iopj7a53n1p8.apps.googleusercontent.com',
        androidClientId: '1064157247970-78548fmhe5j5a4fhhpulh24g3afa3u9b.apps.googleusercontent.com',
    })

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential)
                .then(async (userCred) => {
                    const user = userCred.user
                    setUserInfo(user)
                    await AsyncStorage.setItem('@user', JSON.stringify(user))
                })
                .catch((error) => {
                    console.error(error)
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao fazer login com Google',
                        text2: error.message
                    })
                })
        }
    }, [response])

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserInfo(user)
                await AsyncStorage.setItem('@user', JSON.stringify(user))
            } else {
                setUserInfo(null)
            }
        })

        return () => unsub()
    }, [])

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await fetchFonts()
            } catch (e) {
                console.warn(e)
            } finally {
                setIsReady(true)
                SplashScreen.hideAsync()
            }
        };

        prepareApp()
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <>
            <NavigationContainer ref = {navigationRef}>
                <StackNavigator promptAsync = {promptAsync} initialRoute = {isUserLoggedIn ? 'main' : 'welcome'} />
            </NavigationContainer>
            <Toast config = {toastConfig} />
        </>
    )
}
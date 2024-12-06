import { useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"
import { useLogger } from "@react-navigation/devtools"
import StackNavigator from "./navigations/stackNavigator"
import * as Font from 'expo-font'
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"
import { get } from "firebase/database"

const getTheme = () => {
    return useColorScheme() || 'light'
}

const toastConfig = {
    info: (props) => (
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

export default function App() {
    const [isReady, setIsReady] = useState(false)

    const navigationRef = useNavigationContainerRef()

    useLogger(navigationRef)

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
                <StackNavigator />
            </NavigationContainer>
            <Toast config = {toastConfig} />
        </>
    )
}
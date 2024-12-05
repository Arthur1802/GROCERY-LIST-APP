import { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from "./navigations/stackNavigator"
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

const fetchFonts = () => {
    return Font.loadAsync({
        'popping-regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    })
}

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false)

    if (!fontLoaded) {
        return (
            <AppLoading 
                startAsync = {fetchFonts}
                onFinish = {() => setFontLoaded(true)}
                onError = {(error) => console.error(error)}
            />
        )
    }

    return (
        <>
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
        </>
    )
}
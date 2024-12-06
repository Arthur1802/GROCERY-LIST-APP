import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator()

// Pages
import WelcomeScreen from '../screens/auth/welcome'
import LoginScreen from '../screens/auth/login'
import SigninScreen from '../screens/auth/signin'
import Main from './tabLayout'
import Profile from '../screens/profile'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function StackNavigator() {
    const navigation = useNavigation()

    return (
        <Stack.Navigator
            screenOptions = {{
                headerTransparent: true,
                title: "",
                headerBackImage: () => (
                    <Ionicons name = "chevron-back" size = {24} color = "#03bb85" style = {{paddingLeft: 10}} onPress = {() => (
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'welcome' }],
                        })
                    )} />
                ),
                animation: 'slide_from_right'
            }}
            initialRoute = 'welcome'
        >
            <Stack.Screen
                name = "welcome"
                component = {WelcomeScreen} 
                options = {{
                    headerShown: false,
                    animation: 'slide_from_left'
                 }}
            />
            
            <Stack.Screen
                name = "login"
                component = {LoginScreen}
            />
            
            <Stack.Screen
                name = "signin"
                component = {SigninScreen}
            />
            
            <Stack.Screen
                name = "main"
                component = {Main}
                options = {{
                    headerShown: false,
                    animation: 'slide_from_bottom'
                }}
            />
            
            <Stack.Screen
                name = "profile"
                component = {Profile}
                options = {{    
                    headerShown: true,
                    headerBackImage: () => (
                        <Ionicons name = "chevron-down" size = {24} color = "#03bb85" style = {{paddingLeft: 10}} />
                    ),
                    presentation: 'modal'
                }}
            />
        </Stack.Navigator>
    )
}
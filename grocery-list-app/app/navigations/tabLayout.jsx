import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useColorScheme } from 'react-native'

const Tab = createBottomTabNavigator()

import Lists from "../screens/main/lists"
import Settings from "../screens/main/settings"

export default function TabLayout() {
    const theme = useColorScheme()

    return (
        <Tab.Navigator
            initialRouteName = "Lists"
            screenOptions = {{
                animation: 'none',
                tabBarActiveTintColor: "#03bb85",
                tabBarInactiveTintColor: "#ccc",
                headerShown: false,
                headerTransparent: true,
                tabBarStyle: {
                    backgroundColor: theme === 'light' ? "#fff" : "#272727",
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    fontFamily: "poppins-semibold",
                    fontSize: 12.5,
                },
            }}
        >
            <Tab.Screen
                name = "Lists"
                component = {Lists}
                options = {{
                    tabBarLabel: "Lists",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name = {focused ? "list" : "list-outline"}
                            size = {24}
                            color = {color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name = "Settings"
                component = {Settings}
                options = {{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name = {focused ? "cog" : "cog-outline"}
                            size = {24}
                            color = {color}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
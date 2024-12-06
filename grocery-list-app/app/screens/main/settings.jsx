import { TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import IonIcons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import styles from '../../globalStyles/globalStyles'
import Toast from 'react-native-toast-message'

export default function SettingsScreen() {
    const navigation = useNavigation()

    const handleLogOut = () => {
        Toast.show({
            type: 'info',
            text1: 'Logging out...'
        })
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'welcome' }]
            })

            Toast.show({
                type: 'success',
                text1: 'Logged out'
            })
        }, 1500)
    }
    
    return (
        <Div>
            <View style = {styles.container}>
                <Text style = {styles.title}>Settings</Text>

                <TouchableOpacity style = {[styles.button, { backgroundColor: 'grey'}]} onPress = {handleLogOut}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
import { View } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import IonIcons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import styles from '../../globalStyles/globalStyles'

export default function SettingsScreen() {
    const navigation = useNavigation()
    
    return (
        <Div>
            <View style = {styles.container}>
                <Text style = {styles.title}>Settings</Text>
            </View>
        </Div>
    )
}
import { View, TextInput, TouchableOpacity } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from '../../../hooks/useColorScheme'
import styles, { getPlaceholderTextColor } from '../../globalStyles/globalStyles'

export default function LoginScreen() {
    const theme = useColorScheme() || 'light'
    const navigation = useNavigation()

    return (
        <Div>
            <View style = {styles.container}>
                <Text style = {styles.title}>Login</Text>

                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa': 'grey'}]}
                    placeholder = 'Email'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                />
                
                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey'}]}
                    placeholder = 'Password'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry = {true}
                />

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {() => navigation.navigate('main')}>
                    <Text style = {styles.primaryBtn.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {[styles.button, styles.altBtn]} onPress = {() => navigation.navigate('signin')}>
                    <Text style = {styles.altBtn.btnText}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
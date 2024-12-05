import { TextInput, TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import { useColorScheme } from '../../../hooks/useColorScheme'
import { useNavigation } from '@react-navigation/native'
import styles, { getPlaceholderTextColor } from '../../globalStyles/globalStyles'

export default function SigninScreen() {
    const theme = useColorScheme() || 'light'
    const navigation = useNavigation()

    return (
        <Div>
            <View style = {styles.container}>
                <Text style = {styles.title}>Sign in</Text>

                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey'}]}
                    placeholder = 'Name'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                />

                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey'}]}
                    placeholder = 'Email'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                />
                
                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey'}]}
                    placeholder = 'Password'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry = {true}
                />
                
                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey'}]}
                    placeholder = 'Confirm Password'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry = {true}
                />

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]}>
                    <Text style = {styles.primaryBtn.btnText}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {[styles.button, styles.altBtn]} onPress = {() => navigation.navigate('signin')}>
                    <Text style = {styles.altBtn.btnText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
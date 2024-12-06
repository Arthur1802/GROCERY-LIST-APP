import { View, TextInput, TouchableOpacity } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import Separator from '../../../components/Separator'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from '../../../hooks/useColorScheme'
import styles, { getPlaceholderTextColor } from '../../globalStyles/globalStyles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Login, LoginWithGoogle } from '../../../utils/authentication/auth'
import { useState } from 'react'
import Toast from 'react-native-toast-message'

export default function LoginScreen() {
    const theme = useColorScheme() || 'light'
    const navigation = useNavigation()

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (field, value) => {
        setValues({
            ...values,
            [field]: value
        })
    }

    const handleSubmit = async () => {
        if (!values.email || !values.password) {
            Toast.show({
                type: 'error',
                text1: 'Preencha todos os campos'
            })
            return
        }

        try {
            const result = await Login(values)
            setTimeout(() => {
                if (result) {
                    navigation.navigate('main')
                }
            }, 1000)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer login',
                text2: `${error.code}\n${error.message}`
            })
        }
    }

    const handleLoginWithGoogle = async () => {
        try {
            const result = await LoginWithGoogle() 
            setTimeout(() => {
                if (result) {
                    navigation.navigate('main')
                }
            }, 1000)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer login com Google',
                text2: `${error.code}\n${error.message}`
            })
        }
    }

    return (
        <Div>
            <View style = {styles.container}>
                <Text style = {styles.title}>Login</Text>

                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa': 'grey'}]}
                    placeholder = 'Email'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    onChangeText = {text => handleInputChange('email', text)}
                />
                
                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey'}]}
                    placeholder = 'Password'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry = {true}
                    onChangeText = {text => handleInputChange('password', text)}
                />

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {() => navigation.navigate('main')}>
                    <Text style = {styles.primaryBtn.btnText}>Login</Text>
                </TouchableOpacity>
                
                {/* <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {handleSubmit}>
                    <Text style = {styles.primaryBtn.btnText}>Login</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {handleLoginWithGoogle}>
                    <Ionicons name = 'logo-google' size = {24} color = 'white' />
                    <Text style = {styles.primaryBtn.btnText}>Continue with Google</Text>
                </TouchableOpacity> */}

                <Separator />

                <TouchableOpacity style = {[styles.button, styles.altBtn]} onPress = {() => navigation.navigate('signin')}>
                    <Text style = {styles.altBtn.btnText}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
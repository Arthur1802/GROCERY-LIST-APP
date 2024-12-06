import { TextInput, TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import Separator from '../../../components/Separator'
import { useColorScheme } from '../../../hooks/useColorScheme'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { SignIn, SigninWithGoogle } from '../../../utils/authentication/auth'
import Ionicons from '@expo/vector-icons/Ionicons'
import styles, { getPlaceholderTextColor } from '../../globalStyles/globalStyles'

export default function SigninScreen() {
    const theme = useColorScheme() || 'light'
    const navigation = useNavigation()

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (field, value) => {
        setValues({
            ...values,
            [field]: value
        })
    }

    const handleSubmit = async () => {
        if (!values.name || !values.email || !values.password || !values.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Preencha todos os campos'
            })
            return
        }

        if (values.password !== values.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Senhas não coincidem'
            })
            return
        }

        try {
            const result = await SignIn(values)
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

    const handleSigninWithGoogle = async () => {
        try {
            const result = await SigninWithGoogle()
            setTimeout(() => {
                if (result) {
                    navigation.navigate('main')
                }
            }, 1000)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer login com o Google',
                text2: `${error.code}\n${error.message}`
            })
        }
    }

    return (
        <Div>
            <View style = {styles.container}>
                <Text style = {styles.title}>Sign in</Text>

                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey'}]}
                    placeholder = 'Name'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    onChangeText = {(text) => handleInputChange('name', text)}
                />

                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey', color: theme === 'light' ? '#000' : '#fff'}]}
                    placeholder = 'Email'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    onChangeText = {(text) => handleInputChange('email', text)}
                />
                
                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey', color: theme === 'light' ? '#000' : '#fff'}]}
                    placeholder = 'Password'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry = {true}
                    onChangeText = {(text) => handleInputChange('password', text)}
                />
                
                <TextInput
                    style = {[styles.input, {borderColor: theme === 'light' ? '#aaa' : 'grey', color: theme === 'light' ? '#000' : '#fff'}]}
                    placeholder = 'Confirm Password'
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry = {true}
                    onChangeText = {(text) => handleInputChange('confirmPassword', text)}
                />

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {handleSubmit}>
                    <Text style = {styles.primaryBtn.btnText}>Sign in</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {handleSigninWithGoogle}>
                    <Ionicons name = 'logo-google' size = {24} color = 'white' />
                    <Text style = {styles.primaryBtn.btnText}>Continue with Google</Text>
                </TouchableOpacity> */}

                <Separator />

                <TouchableOpacity style = {[styles.button, styles.altBtn]} onPress = {() => navigation.navigate('signin')}>
                    <Text style = {styles.altBtn.btnText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
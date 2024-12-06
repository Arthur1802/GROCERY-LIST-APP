import { TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import Separator from '../../../components/Separator'
import { useColorScheme } from '../../../hooks/useColorScheme'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { Signin } from '../../../utils/authentication/auth'
import Ionicons from '@expo/vector-icons/Ionicons'
import styles, { getPlaceholderTextColor } from '../../globalStyles/globalStyles'

export default function SigninScreen(promptAsync) {
    const theme = useColorScheme() || 'light'
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (loading) return
        setLoading(true)

        if (!values.name || !values.email || !values.password || !values.confirmPassword) {
            Toast.show({ type: 'error', text1: 'Preencha todos os campos.' })
            setLoading(false)
            return
        }

        if (values.password !== values.confirmPassword) {
            Toast.show({ type: 'error', text1: 'As senhas não coincidem.' })
            setLoading(false)
            return
        }

        try {
            const result = await Signin(values)
            setTimeout(() => {
                if (result) {
                    Toast.show({
                        type: 'success',
                        text1: 'Cadastro realizado com sucesso!'
                    })
                    navigation.navigate('main')
                } else {
                    throw new Error('Erro desconhecido ao fazer cadastro.')
                }
            }, 3000)
        } catch (error) {
            setTimeout(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao fazer cadastro.',
                    text2: error.message
                })
            }, 1500)
        } finally {
            setLoading(false)
        }
    }

    const handleSigninWithGoogle = async () => {
        if (loading) return
        setLoading(true)

        try {
            setTimeout(() => {
                promptAsync()
            }, 2000)
            
        } catch (error) {
            setTimeout(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao fazer cadastro com Google.',
                    text2: error.message
                })
            }, 1500)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Div>
            <View style = {styles.container}>
                <Text style = {styles.title}>Sign in</Text>

                <TextInput
                    style = {[styles.input, { borderColor: theme === 'light' ? '#aaa' : 'grey' }]}
                    placeholder = "Name"
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    onChangeText = {(text) => handleInputChange('name', text)}
                    value = {values.name}
                />

                <TextInput
                    style = {[styles.input, { borderColor: theme === 'light' ? '#aaa' : 'grey' }]}
                    placeholder = "Email"
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    onChangeText = {(text) => handleInputChange('email', text)}
                    autoCapitalize = "none"
                    value = {values.email}
                />

                <TextInput
                    style = {[styles.input, { borderColor: theme === 'light' ? '#aaa' : 'grey' }]}
                    placeholder = "Password"
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry
                    onChangeText = {(text) => handleInputChange('password', text)}
                    value = {values.password}
                />

                <TextInput
                    style = {[styles.input, { borderColor: theme === 'light' ? '#aaa' : 'grey' }]}
                    placeholder = "Confirm Password"
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry
                    onChangeText = {(text) => handleInputChange('confirmPassword', text)}
                    value = {values.confirmPassword}
                />

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {handleSubmit} disabled = {loading}>
                    {loading ? (
                        <ActivityIndicator color = {theme === 'dark' ? '#fff' : '#000'} />
                    ) : (
                        <Text style = {styles.primaryBtn.btnText}>Sign in</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {handleSigninWithGoogle} disabled = {loading}>
                    {loading ? (
                        <ActivityIndicator color = {theme === 'dark' ? '#fff' : '#000'} />
                    ) : (
                        <>
                            <Ionicons name = "logo-google" size = {24} color = "white" />
                            <Text style = {styles.primaryBtn.btnText}>Continue with Google</Text>
                        </>
                    )}
                </TouchableOpacity>

                <Separator />

                <TouchableOpacity style = {[styles.button, styles.altBtn]} onPress = {() => navigation.navigate('signin')}>
                    <Text style = {styles.altBtn.btnText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
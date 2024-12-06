import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
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

    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (loading) return
        setLoading(true)

        const { email, password } = values

        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Preencha todos os campos.'
            })
            setLoading(false)
            return
        }

        try {
            const result = await Login(values)
            setTimeout(() => {
                if (result) {
                    navigation.navigate('main')
                } else {
                    throw new Error('Erro desconhecido ao fazer login.')
                }
            }, 5000)
        } catch (error) {
            setTimeout(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao fazer login.',
                    text2: error.message
                })
            }, 15000)
        } finally {
            setLoading(false)
        }
    }

    const handleLoginWithGoogle = async () => {
        if (loading) return
        setLoading(true)

        try {
            const result = await LoginWithGoogle()
            if (result) {
                navigation.navigate('main')
            } else {
                throw new Error('Erro desconhecido com o Google.')
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer login com Google.',
                text2: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Div>
            <View style = {styles.container}>
                <Text style = {styles.title}>Login</Text>

                <TextInput
                    style = {[styles.input, { borderColor: theme === 'light' ? '#aaa' : 'grey' }]}
                    placeholder = "Email"
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    onChangeText = {(text) => handleInputChange('email', text)}
                    value = {values.email}
                    autoCapitalize = "none"
                />

                <TextInput
                    style = {[styles.input, { borderColor: theme === 'light' ? '#aaa' : 'grey' }]}
                    placeholder = "Password"
                    placeholderTextColor = {getPlaceholderTextColor(theme)}
                    secureTextEntry
                    onChangeText = {(text) => handleInputChange('password', text)}
                    value = {values.password}
                />

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {handleSubmit} disabled = {loading}>
                    {loading ? (
                        <ActivityIndicator color={theme === 'dark' ? '#fff' : '#000'} />
                    ) : (
                        <Text style = {styles.primaryBtn.btnText}>Login</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style =  {[styles.button, styles.primaryBtn]} onPress =  {handleLoginWithGoogle} disabled =  {loading}>
                    <Ionicons name = "logo-google" size = {24} color = "white" />
                    <Text style = {styles.primaryBtn.btnText}>Continue with Google</Text>
                </TouchableOpacity>

                <Separator />

                <TouchableOpacity style = {[styles.button, styles.altBtn]} onPress = {() => navigation.navigate('signin')}>
                    <Text style = {styles.altBtn.btnText}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
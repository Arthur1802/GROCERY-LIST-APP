import { auth } from './config'
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import Toast from 'react-native-toast-message'

export const Login = async (values) => {
    const { email, password } = values

    if (!ValidateEmail(email)) {
        Toast.show({
            type: 'error',
            text1: 'Email inválido'
        })
        return false
    }

    if (!ValidatePassword(password)) {
        Toast.show({
            type: 'error',
            text1: 'Senha inválida',
            text2: 'A senha deve ter no mínimo 6 caracteres'
        })
        return false
    }

    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        const user = userCred.user

        if (!user.emailVerified) {
            await sendEmailVerification(user)
            Toast.show({
                type: 'warning',
                text1: 'Por favor, verifique o seu email'
            })
        }

        return true
    } catch (error) {
        console.error(error)
        Toast.show({
            type: 'error',
            text1: 'Email ou senha inválidos',
            text2: error.message
        })
        return false
    }
}

export const Signin = async (values) => {
    const { name, email, password } = values

    if (!ValidateEmail(email)) {
        Toast.show({
            type: 'error',
            text1: 'Email inválido'
        })
        return false
    }

    if (!ValidatePassword(password)) {
        Toast.show({
            type: 'error',
            text1: 'Senha inválida',
            text2: 'A senha deve ter no mínimo 6 caracteres'
        })
        return false
    }

    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCred.user

        await sendEmailVerification(user)
        Toast.show({
            type: 'info',
            text1: 'Por favor, verifique o seu email'
        })

        return true
    } catch (error) {
        console.error(error)
        Toast.show({
            type: 'error',
            text1: 'Erro ao criar conta',
            text2: error.message
        })
        return false
    }
}

// Validation Functions
const ValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const ValidatePassword = (password) => {
    return password.length >= 6
}
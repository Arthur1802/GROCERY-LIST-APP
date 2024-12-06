import { auth } from './config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import * as Google from 'expo-auth-session/providers/google'
import { getDatabase, ref, query, get, set } from 'firebase/database'
import Toast from 'react-native-toast-message'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const getGoogleProvider = () => new GoogleAuthProvider()

const db = getDatabase()

export const Login = async (values) => {
    const email = values.email
    const password = values.password

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
                type: 'info',
                text1: 'Por favor, verifique o seu email'
            })
        }

        return true
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Email ou senha inválidos',
            text2: `${error.code}\n${error.message}`
        })

        return false
    }
}

export const LoginWithGoogle = async () => {
    try {
        const { type, idToken, accessToken } = await Google.logInAsync({
            clientId: '1064157247970-o484o6gartcim5qm3evklbla8ephul4c.apps.googleusercontent.com',
        })

        if (type === 'success') {
            const credential = GoogleAuthProvider.credential(idToken, accessToken)
            const userCred = await signInWithCredential(auth, credential)
            const user = userCred.user

            const userRef = ref(db, `users/${user.uid}`)
            const userSnapshot = await get(userRef)

            if (!userSnapshot.exists()) {
                await set(userRef, {
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL,
                })
            }

            return true
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer login com o Google',
                text2: 'Operação cancelada.',
            })
            return false
        }
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Erro ao fazer login com o Google',
            text2: `${error.code}\n${error.message}`,
        })
        return false
    }
}

export const Signin = async (values) => {
    const name = values.name
    const email = values.email
    const password = values.password

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
        Toast.show({
            type: 'error',
            text1: 'Erro ao criar conta',
            text2: `${error.code}\n${error.message}`
        })

        return false
    }
}

export const SigninWithGoogle = async () => {
    try {
        const provider = getGoogleProvider()
        const userCred = await signInWithPopup(auth, provider)
        const user = userCred.user

        const userRef = ref(db, `users/${user.uid}`)
        const userSnapshot = await get(userRef)

        if (!userSnapshot.exists()) {
            set(userRef, {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL
            })
        }

        return true
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Erro ao criar conta com o Google',
            text2: `${error.code}\n${error.message}`
        })
        return false
    }
}

const ValidateEmail = (email) => {
    return emailRegex.test(email)
}

const ValidatePassword = (password) => {
    return password.length >= 6
}
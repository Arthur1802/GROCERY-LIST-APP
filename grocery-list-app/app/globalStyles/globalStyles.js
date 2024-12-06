import { StyleSheet, useColorScheme } from 'react-native'

export const getPlaceholderTextColor = (theme) => {
    return theme === 'light' ? 'grey' : '#aaa'
}

const getTheme = () => {
    return useColorScheme() || 'light'
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 50,
        padding: 20,
    },
    title: {
        fontSize: 22.5,
        fontWeight: '600',
        fontFamily: 'poppins-semibold',
    },
    input: {
        borderWidth: 1,
        width: '80%',
        height: 50,
        borderRadius: 10,
        paddingLeft: 10,
        fontFamily: 'poppins-regular',
    },
    button: {
        width: 300,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        gap: 10,
    },
    primaryBtn: {
        backgroundColor: '#03bb85',
        primaryBtnText: {
            color: '#fff',
            fontFamily: 'poppins-regular',
        },
    },
    altBtn: {
        backgroundColor: 'grey',
        altBtnText: {
            fontWeight: 'bold',
            fontFamily: 'poppins-regular',
        },
    },
})

export default styles
import { TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import { useNavigation } from '@react-navigation/native'
import styles from '../../globalStyles/globalStyles'

export default function WelcomeScreen() {
    const navigation = useNavigation()

    return (
        <Div>
            <View style = {[styles.container, {paddingTop: '50%'}]}>
                <Text style = {[styles.title, {marginBottom: '20%'}]}>Bem-vindo(a) à Lista de Compras Mobile</Text>

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]} onPress = {() => navigation.navigate('login')}>
                    <Text style = {styles.primaryBtn.primaryBtnText}>Começar</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
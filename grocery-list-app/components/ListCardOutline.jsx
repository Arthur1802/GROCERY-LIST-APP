import { StyleSheet, View } from 'react-native'
import { ThemedText as Text } from './ThemedText'
import IonIcons from 'react-native-vector-icons/Ionicons'
import capitalize from '../utils/functions'

export default function ListCard() {
    return(
        <View style = {styles.listBox}>
            <View style = {styles.listContent}>
                <IonIcons 
                    name = "list-circle-outline" 
                    color = "#fff" 
                    size = {45} 
                />
                <Text></Text>
            </View>
            <Text style = {styles.listCount}></Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    listBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '40%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'dashed',
    },
    listContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    listCount: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
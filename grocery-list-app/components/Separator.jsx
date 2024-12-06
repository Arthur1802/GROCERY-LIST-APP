import { StyleSheet, View } from 'react-native'
import { ThemedText as Text } from './ThemedText'

export default function Separator() {
    return (
        <View style = {styles.separator}>
            <View style = {styles.line}></View>
            <Text type = "default" style = {styles.text}>OU</Text>
            <View style = {styles.line}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: -20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    text: {
        textAlign: 'center',
        marginHorizontal: 10,
    },
    line: {
        backgroundColor: 'grey',
        height: 1.5,
        flex: 1,
        borderRadius: 50,
    },
})
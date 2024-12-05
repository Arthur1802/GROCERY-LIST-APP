import { StyleSheet, View } from 'react-native'
import { ThemedText as Text } from '../../../components/ThemedText'
import { ThemedView as Div } from '../../../components/ThemedView'
import ListCard from '../../../components/ListCard'
import ListCardOutline from '../../../components/ListCardOutline'
import IonIcons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../globalStyles/globalStyles'

export default function ListsScreen() {
    const navigation = useNavigation()
    
    return (
        <Div>
            <View style = {globalStyles.container}>
                <View style = {styles.topBar}>
                    <View style = {styles.newListContainer}>
                        <IonIcons 
                            name = "add-circle" 
                            color = "#fff" 
                            size = {45} 
                            onPress = {() => navigation.navigate('addList')} 
                        />
                        <Text>New list</Text>
                    </View>
                    <IonIcons 
                        name = "person-circle" 
                        color = "#fff" 
                        size = {45} 
                        onPress = {() => navigation.navigate('profile')} 
                    />
                </View>

                <View style = {styles.listContainer}>
                    
                    <ListCardOutline />
                    <ListCard status = 'closed' count = '5' />
                
                </View>
            </View>
        </Div>
    )
}

const styles = StyleSheet.create({
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    newListContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        gap: 50,
    },
})
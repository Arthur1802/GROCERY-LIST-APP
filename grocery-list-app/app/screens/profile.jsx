import { Button, TextInput, TouchableOpacity, View } from 'react-native'
import { ThemedView as Div } from '../../components/ThemedView'
import { ThemedText as Text } from '../../components/ThemedText'
import styles from '../globalStyles/globalStyles'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function ProfileScreen() {
    return (
        <Div>
            <View style = {[styles.container]}>
                <View
                    style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: 10,
                    }}
                >
                    <Text
                        style = {{
                            fontSize: 25,
                        }}
                    >User Name</Text>
                    <View
                        style = {{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                        }}
                    >
                        <Ionicons name = "person-circle" color = "" size = {100} />
                        <Button title = "Change photo"
                            style = {{
                                alignItems: 'center',
                                justifyContent: 'center',
                        }}>
                        </Button>
                    </View>
                </View>

                <TextInput
                    style = {styles.input}
                    placeholder = "Change username"
                    
                />
                
                <TextInput
                    style = {styles.input}
                    placeholder = "Change email"

                />

                <Button
                    title = "Reset password"
                />

                <TouchableOpacity style = {[styles.button, styles.primaryBtn]}>
                    <Text lightColor = {"#fff"} darkColor = {"#232323"} style = {styles.primaryBtn.primaryBtnText}>Save</Text>
                </TouchableOpacity>
            </View>
        </Div>
    )
}
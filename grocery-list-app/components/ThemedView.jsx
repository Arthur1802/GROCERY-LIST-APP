import { useThemeColor } from '../hooks/useThemeColor'
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'

export function ThemedView({ style, lightColor, darkColor, ...otherProps }) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return (
    <SafeAreaView style = {[{ backgroundColor }, style, {height: '100%'}]} {...otherProps}>
      <ScrollView>
        {otherProps.children}
      </ScrollView> 
    </SafeAreaView>
  )
}
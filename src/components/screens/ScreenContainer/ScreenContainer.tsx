import React from 'react'
import { StyleSheet,StatusBar,
  useColorScheme } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { Styles } from '../../../shared/styles'

export interface ScreenContainerProps {
  children: any,
  edge?: Edge[]
}

export const ScreenContainer = ({ children, edge }: ScreenContainerProps) => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaView style={{ ...styles.container }} edges={edge ? edge : ['left', 'right']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.color.aquaHaze
  }
})

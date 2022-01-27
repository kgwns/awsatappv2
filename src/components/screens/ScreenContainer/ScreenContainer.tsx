import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { isDarkTheme } from '../../../shared/utils'
import { useAppCommon } from '../../../hooks/useAppCommon'
import { Styles } from '../../../shared/styles'

export interface ScreenContainerProps {
  children: any,
  edge?: Edge[]
}

export const ScreenContainer = ({ children, edge }: ScreenContainerProps) => {
  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)

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

import React from 'react'
import { StyleSheet } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'

export interface ScreenContainerProps {
  children: any,
  edge?: Edge[]
}

export const ScreenContainer = ({ children, edge }: ScreenContainerProps) => {
  return (
    <SafeAreaView style={{ ...styles.container }} edges={edge ? edge : ['left', 'right']}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

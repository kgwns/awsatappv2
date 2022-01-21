import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface ScreenContainerProps {
  children: any
}

export const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return (
    <SafeAreaView style={{ ...styles.container }}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

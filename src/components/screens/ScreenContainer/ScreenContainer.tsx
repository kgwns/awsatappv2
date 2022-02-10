import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { isDarkTheme } from '../../../shared/utils'
import { useAppCommon } from '../../../hooks/useAppCommon'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { LoadingState } from 'src/components/atoms'

export interface ScreenContainerProps {
  children: any,
  edge?: Edge[],
  isLoading?: boolean
}

export const ScreenContainer = ({ children, edge, isLoading = false }: ScreenContainerProps) => {
  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)
  const style = useThemeAwareObject(createStyles);

  return (
    <SafeAreaView style={style.container} edges={edge ? edge : ['left', 'right', 'top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLoading && <LoadingState />}
      {children}
    </SafeAreaView>
  )
}

const createStyles = (theme: CustomThemeType) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor
    }
  })
  return styles
}
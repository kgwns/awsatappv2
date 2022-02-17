import React from 'react'
import { StyleSheet, StatusBar, StatusBarStyle } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { isDarkTheme } from '../../../shared/utils'
import { useAppCommon } from '../../../hooks/useAppCommon'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { LoadingState } from 'src/components/atoms'

export interface ScreenContainerProps {
  children: any,
  edge?: Edge[],
  isLoading?: boolean;
  barStyle?: StatusBarStyle;
}

export const ScreenContainer = ({ children, edge, isLoading = false ,barStyle}: ScreenContainerProps) => {
  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)
  const style = useThemeAwareObject(createStyles);

  return (
    <SafeAreaView style={style.container} edges={edge ? edge : ['left', 'right', 'top']}>
      <StatusBar barStyle={barStyle?barStyle:(isDarkMode ? 'light-content' : 'dark-content')} />
      {children}
      {isLoading && <LoadingState />}
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
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Label } from 'src/components/atoms'
import { isAndroid, isTab, normalize, normalizeBy320, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { moleculesTestID } from 'src/constants'
import { testProps } from 'src/shared/utils'
import { fonts } from 'src/shared/styles/fonts'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useTranslation } from 'react-i18next'
import { TabBarItemProps } from '../tabWithBarItem/TabWithBarItem'

export const CustomTabBarItem: FunctionComponent<TabBarItemProps> = ({
  tabName,
  isSelected,
  index,
  onPress,
  labelFont,
}) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const color = isSelected ? theme.themeData.primaryBlack : Styles.color.doveGray
  const barColor = { backgroundColor: isSelected ? Styles.color.greenishBlue : Styles.color.doveGray }

  const renderStyle = (tabName: String) => {
    switch (tabName) {
      case t('myNewsTab.writers'):
        return customStyle.containerWriters
      case t('myNewsTab.media'):
        return customStyle.containerMedia
      case t('myNewsTab.topics'):
        return customStyle.containerTopics
      default:
        return null
    }
  }

  return (
    <View style={[customStyle.newStyle, renderStyle(tabName)]}>
      <TouchableOpacity key={index} {...testProps(moleculesTestID.tabItemBtn)}
        onPress={() => onPress(index)} >
        <View>
          <Label children={tabName} color={color} style={customStyle.labelStyle}
          />
          {isSelected && <View style={StyleSheet.flatten([customStyle.barLine, barColor])} />}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const customStyle = StyleSheet.create({
  container: {
    marginHorizontal: isTab ? normalize(0.025 * screenWidth) : isAndroid ? 0.045 * screenWidth : normalize(0.04 * screenWidth),
  },
  barLine: {
    width: '100%',
    height: isTab ? normalizeBy320(1) : normalizeBy320(2),
    marginTop: normalize(12),
    zIndex: 9999
  },
  labelStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.Effra_Arbc_Regular
  },
  newStyle: {
    width: 0.33 * screenWidth,
  },
  containerTopics: {
    alignItems: 'flex-start',
    paddingLeft: 15
  },
  containerWriters: {
    alignItems: 'center'
  },
  containerMedia: {
    alignItems: 'flex-end',
    paddingRight: 15
  }
})
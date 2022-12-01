import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Label } from 'src/components/atoms'
import { isAndroid, isTab, normalize, normalizeBy320, screenWidth, testProps } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { moleculesTestID, TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { fonts } from 'src/shared/styles/fonts'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { TabBarItemProps } from '../tabWithBarItem/TabWithBarItem'

export const CustomTabBarItem: FunctionComponent<TabBarItemProps> = ({
  tabName,
  isSelected,
  index,
  onPress,
  labelFont,
}) => {
  const theme = useTheme();
  const color = isSelected ? Styles.color.greenishBlue : Styles.color.doveGray
  const barColor = { backgroundColor: color }
  const CONST_MY_NEWS_TAB_WRITERS = TranslateConstants({key:TranslateKey.MY_NEWS_TAB_WRITERS})
  const CONST_MY_NEWS_TAB_MEDIA = TranslateConstants({key:TranslateKey.MY_NEWS_TAB_MEDIA})
  const CONST_MY_NEWs_TAB_TOPICS= TranslateConstants({key:TranslateKey.MY_NEWS_TAB_TOPICS})

  const renderStyle = (tabName: String) => {
    switch (tabName) {
      case CONST_MY_NEWS_TAB_WRITERS:
        return customStyle.containerWriters
      case CONST_MY_NEWS_TAB_MEDIA:
        return customStyle.containerMedia
      case CONST_MY_NEWs_TAB_TOPICS:
        return customStyle.containerTopics
      default:
        return null
    }
  }

  return (
    <TouchableOpacity
      key={index}
      {...testProps(moleculesTestID.tabItemBtn)}
      onPress={() => onPress(index)}>
      <View style={[customStyle.newStyle, renderStyle(tabName)]}>
        <View>
          <Label
            children={tabName}
            color={color}
            style={customStyle.labelStyle}
          />
        </View>
        {isSelected && (
          <View style={StyleSheet.flatten([customStyle.barLine, barColor])} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const customStyle = StyleSheet.create({
  container: {
    marginHorizontal: isTab ? normalize(0.025 * screenWidth) : isAndroid ? 0.045 * screenWidth : normalize(0.04 * screenWidth),
  },
  barLine: {
    width: '100%',
    height: isTab ? normalizeBy320(1) : normalizeBy320(2),
    zIndex: 9999
  },
  labelStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.Effra_Arbc_Regular,
    marginBottom: normalize(12),
  },
  newStyle: {
    width: 0.5 * screenWidth,
  },
  containerTopics: {
    alignItems: 'center',
  },
  containerWriters: {
    alignItems: 'center'
  },
  containerMedia: {
    alignItems: 'flex-end',
    paddingRight: 15
  }
})

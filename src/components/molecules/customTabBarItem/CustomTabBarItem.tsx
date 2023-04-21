import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Label } from 'src/components/atoms/label/Label'
import { isAndroid, isTab, normalize, normalizeBy320, screenHeight, screenWidth, testProps } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { moleculesTestID, TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { fonts } from 'src/shared/styles/fonts'
import { TabBarItemProps } from 'src/components/molecules/tabWithBarItem/TabWithBarItem'

export const CustomTabBarItem: FunctionComponent<TabBarItemProps> = ({
  tabName,
  isSelected,
  index,
  onPress,
  labelFont,
}) => {

  const color = isSelected ? Styles.color.greenishBlue : Styles.color.doveGray
  const barColor = { backgroundColor: color }
  const CONST_MY_NEWS_TAB_WRITERS = TranslateConstants({key:TranslateKey.MY_NEWS_TAB_WRITERS})
  const CONST_MY_NEWS_TAB_MEDIA = TranslateConstants({key:TranslateKey.MY_NEWS_TAB_MEDIA})
  const CONST_MY_NEWS_TAB_TOPICS= TranslateConstants({key:TranslateKey.MY_NEWS_TAB_TOPICS})

  const renderStyle = (tabNameProps: string) => {
    switch (tabNameProps) {
      case CONST_MY_NEWS_TAB_WRITERS:
        return customStyle.containerWriters
      case CONST_MY_NEWS_TAB_MEDIA:
        return customStyle.containerMedia
      case CONST_MY_NEWS_TAB_TOPICS:
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
      <View style={[renderStyle(tabName)]}>
        <View>
          <Label
            children={tabName}
            color={color}
            style={customStyle.labelStyle}
            testID='tabNameId'
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
  newStyleLandscape: {
    width: 0.5 * screenHeight,
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

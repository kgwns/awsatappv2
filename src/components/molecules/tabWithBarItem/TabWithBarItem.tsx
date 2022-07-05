import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Label } from 'src/components/atoms'
import { isAndroid, isTab, normalize, normalizeBy320, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { moleculesTestID } from 'src/constants'
import { testProps } from 'src/shared/utils'
import { fonts } from 'src/shared/styles/fonts'

export interface TabBarDataProps {
  tabName: string,
  isSelected: boolean,
  keyName?: string;
  sectionId?: number|null;
}

export interface TabBarItemProps extends TabBarDataProps {
  index: number,
  onPress: (index: number) => void
  labelFont?: string;
}

export const TabWithBarItem: FunctionComponent<TabBarItemProps> = ({
  tabName,
  isSelected,
  index,
  onPress,
  labelFont,
}) => {
  const color = isSelected ? Styles.color.greenishBlue : Styles.color.doveGray
  const barColor = { backgroundColor: color }
  return (
    <TouchableWithoutFeedback key={index} {...testProps(moleculesTestID.tabItemBtn)}
      onPress={() => onPress(index)}>
      <View style={tabWitBarItemStyle.container}>
        <Label children={tabName}  color={color}
          style={tabWitBarItemStyle.labelStyle}
        />
        {isSelected && <View style={StyleSheet.flatten([tabWitBarItemStyle.barLine, barColor])} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const tabWitBarItemStyle = StyleSheet.create({
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
    lineHeight:20,
    fontFamily: fonts.Effra_Arbc_Regular
  }
})
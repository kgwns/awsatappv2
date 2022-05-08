import { TouchableWithoutFeedback, View, StyleSheet, StyleProp, TextStyle } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Label, LabelTypeProp } from 'src/components/atoms'
import { isTab, normalize, normalizeBy320, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { moleculesTestID } from 'src/constants'
import { testProps } from 'src/shared/utils'

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
        <Label children={tabName} labelType={LabelTypeProp.h4} color={color}
          style={[tabWitBarItemStyle.labelStyle, {fontFamily: labelFont}]}
        />
        {isSelected && <View style={StyleSheet.flatten([tabWitBarItemStyle.barLine, barColor])} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const tabWitBarItemStyle = StyleSheet.create({
  container: {
    marginHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
  },
  barLine: {
    width: '100%',
    height: isTab ? normalizeBy320(1) : normalizeBy320(2),
    marginTop: normalize(12),
    zIndex: 9999
  },
  labelStyle: {
    lineHeight:20
  }
})
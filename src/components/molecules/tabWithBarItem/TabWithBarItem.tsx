import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Label, LabelTypeProp } from 'src/components/atoms'
import { normalize, normalizeBy320 } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { moleculesTestID } from 'src/constants'
import { testProps } from 'src/shared/utils'

export interface TabBarDataProps {
  tabName: string,
  isSelected: boolean
}

export interface TabBarItemProps extends TabBarDataProps {
  index: number,
  onPress: (index: number) => void
}

export const TabWithBarItem: FunctionComponent<TabBarItemProps> = ({
  tabName,
  isSelected,
  index,
  onPress
}) => {
  const color = isSelected ? Styles.color.greenishBlue : Styles.color.doveGray
  const barColor = { backgroundColor: color }
  return (
    <TouchableWithoutFeedback key={index} {...testProps(moleculesTestID.tabItemBtn)}
      onPress={() => onPress(index)}>
      <View style={tabWitBarItemStyle.container}>
        <Label children={tabName} labelType={LabelTypeProp.h4} color={color} />
        {isSelected && <View style={StyleSheet.flatten([tabWitBarItemStyle.barLine, barColor])} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const tabWitBarItemStyle = StyleSheet.create({
  container: {
    marginHorizontal: normalize(20)
  },
  barLine: {
    width: '100%',
    height: normalizeBy320(2),
    marginTop: normalize(14)
  }
})
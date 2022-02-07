import { ScrollView, View } from 'react-native'
import React from 'react'
import { TabWithBarItem, TabBarDataProps } from '..'
import { normalize, screenWidth } from 'src/shared/utils'

export interface TabBarWidgetProps {
  tabItem: TabBarDataProps[],
  onPressTabItem: (tabName: number) => void,
}

export const TabBarComponent = ({ tabItem, onPressTabItem }: TabBarWidgetProps) => {
  return (
    <View style={{ width: screenWidth, marginTop: normalize(10) }} >
      <ScrollView horizontal={true} bounces={false}
        showsHorizontalScrollIndicator={false}>
        {
          tabItem.map((item: TabBarDataProps, index: number) =>
            <TabWithBarItem key={index} {...item} index={index} onPress={onPressTabItem} />)
        }
      </ScrollView>
    </View>
  )
}

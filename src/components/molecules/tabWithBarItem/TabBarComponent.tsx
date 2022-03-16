import { ScrollView, StyleProp, StyleSheet, View } from 'react-native'
import React from 'react'
import { TabWithBarItem, TabBarDataProps } from '..'
import { normalize, screenWidth } from 'src/shared/utils'

export interface TabBarWidgetProps {
  tabItem: TabBarDataProps[],
  onPressTabItem: (tabName: number) => void,
  style?: StyleProp<any>
}

export const TabBarComponent = ({ tabItem, onPressTabItem, style }: TabBarWidgetProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} bounces={false} style={style}
        contentContainerStyle={styles.contentStyle}
        showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        {
          tabItem.map((item: TabBarDataProps, index: number) =>
            <TabWithBarItem key={index} {...item} index={index} onPress={onPressTabItem} />)
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    marginTop: normalize(10)
  },
  contentStyle: {
    flexGrow: 1
  }
})

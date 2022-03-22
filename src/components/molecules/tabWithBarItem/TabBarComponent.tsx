import { ScrollView, StyleProp, StyleSheet, View } from 'react-native'
import React, {useRef} from 'react'
import { TabWithBarItem, TabBarDataProps } from '..'
import { isIOS, normalize, screenWidth } from 'src/shared/utils'

export interface TabBarWidgetProps {
  tabItem: TabBarDataProps[],
  onPressTabItem: (tabName: number) => void,
  style?: StyleProp<any>
}

export const TabBarComponent = ({ tabItem, onPressTabItem, style }: TabBarWidgetProps) => {
  const scrollRef = useRef<ScrollView>(null)
  const scrollToEnd = () => {
    if(isIOS) return;
    scrollRef.current?.scrollToEnd()
  }
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} horizontal={true} bounces={false} style={style}
        contentContainerStyle={styles.contentStyle}
        showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
        onContentSizeChange={() => scrollToEnd()}
        >
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

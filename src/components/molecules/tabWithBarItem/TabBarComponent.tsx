import { ScrollView, StyleProp, StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { TabWithBarItem, TabBarDataProps } from '..'
import { isIOS, normalize } from 'src/shared/utils'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'

export interface TabBarWidgetProps {
  tabItem: TabBarDataProps[],
  onPressTabItem: (tabName: number) => void,
  style?: StyleProp<any>
}

export const TabBarComponent = ({ tabItem, onPressTabItem, style }: TabBarWidgetProps) => {
  const styles = useThemeAwareObject(customStyle)
  const scrollRef = useRef<ScrollView>(null)
  const scrollToEnd = () => {
    if (isIOS) {
      return;
    }
    scrollRef.current?.scrollToEnd()
  }

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} testID={'TabBarComponentID01'} horizontal={true} bounces={false} style={style}
        contentContainerStyle={styles.contentStyle}
        showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
        onContentSizeChange={() => scrollToEnd()}
      >
        {
          tabItem.map((item: TabBarDataProps, index: number) =>
            <TabWithBarItem key={index}
              {...item} index={index}
              onPress={onPressTabItem}
            />
          )
        }
      </ScrollView>
      <View style={styles.tabBarBottomView} />
    </View>
  )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    width: '100%',
    marginTop: normalize(10)
  },
  contentStyle: {
    flexGrow: 1
  },
  tabBarBottomView: {
    width: '100%',
    height: 1.2,
    backgroundColor: theme.dividerColor,
    position: 'absolute',
    bottom: 0
  }
})

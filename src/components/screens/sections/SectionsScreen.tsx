import React, { useState } from 'react';
import { Text } from 'react-native';
import { ScreenContainer } from '..';
import { TabBarComponent } from 'src/components/molecules';
import { sectionTabItem } from 'src/constants/SampleData';
import { horizontalEdge } from 'src/constants/SharedConstants';

export const SectionsScreen = () => {
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0)
  const onPressTabItem = (index: number) => {
    sectionTabItem[tabSelectedIndex].isSelected = false
    sectionTabItem[index].isSelected = true
    setTabSelectedIndex(index)
  }

  const renderTabBarComponent = () => <TabBarComponent tabItem={sectionTabItem}
    onPressTabItem={onPressTabItem} />

  return (
    <ScreenContainer edge={horizontalEdge}>
      {renderTabBarComponent()}
      <Text style={{ flex: 1 }}>{"Sections"}</Text>
    </ScreenContainer>
  )
}
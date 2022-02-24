import React, {useState} from 'react';
import {OpinionScreen, ScreenContainer, VideoScreen, PodcastProgram, SectionStoryScreen} from '..';
import {TabBarComponent} from 'src/components/molecules';
import {sectionTabItem} from 'src/constants/SampleData';
import {horizontalEdge} from 'src/shared/utils';
import {View} from 'react-native';
import {Label} from 'src/components/atoms';

export const SectionsScreen = () => {
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);
  const onPressTabItem = (index: number) => {
    sectionTabItem[tabSelectedIndex].isSelected = false;
    sectionTabItem[index].isSelected = true;
    setTabSelectedIndex(index);
  };

  const renderTabBarComponent = () => (
    <TabBarComponent tabItem={sectionTabItem} onPressTabItem={onPressTabItem} />
  );

  const tabContent = () => {
    switch (sectionTabItem[tabSelectedIndex].tabName) {
      case 'العالم العربي':
        return <SectionStoryScreen/>;
      case 'الرأي':
        return <OpinionScreen />;
      case 'بودكاست':
        return <PodcastProgram />;
      case 'أولى':
        return <Label>'أولى'</Label>;
      case 'فيديو':
        return <VideoScreen/>;
      case 'يوميات الشرق':
        return <Label>'يوميات الشرق'</Label>;
      case 'العالم العربي':
        return <Label>'العالم العربي'</Label>;
      default:
        return <Label>default</Label>;
    }
  };
  return (
    <ScreenContainer edge={horizontalEdge}>
      {renderTabBarComponent()}
      <View style={{flex: 1}} testID={'tabContent'}>{tabContent()}</View>
    </ScreenContainer>
  );
};

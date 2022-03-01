import React, {useState, useEffect} from 'react';
import {OpinionScreen, ScreenContainer, VideoScreen, PodcastProgram, SectionStoryScreen} from '..';
import {TabBarComponent} from 'src/components/molecules';
import {horizontalEdge} from 'src/shared/utils';
import {View} from 'react-native';
import {useTopMenu} from 'src/hooks';

export enum TabType {
  home = 'home',
  opinion = 'opinion',
  podcast = 'podcast',
  video = 'video',
  section = 'section',
}

export const SectionsScreen = () => {
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);
  const {isLoading,topMenuData,fetchTopMenuRequest} = useTopMenu();
  useEffect(() => { fetchTopMenuRequest(); }, []);
  const onPressTabItem = (index: number) => {
    topMenuData[tabSelectedIndex].isSelected = false;
    topMenuData[index].isSelected = true;
    setTabSelectedIndex(index);
  };

  const renderTabBarComponent = () => (
    <TabBarComponent tabItem={topMenuData} onPressTabItem={onPressTabItem} />
  );

  const tabContent = () => {
    if (!topMenuData.length) return null;
    switch (topMenuData[tabSelectedIndex].keyName) {
      case TabType.home:
        return <SectionStoryScreen sectionId={11}/>;
      case TabType.opinion:
        return <OpinionScreen />;
      case TabType.podcast:
        return <PodcastProgram />;
      case TabType.video:
        return <VideoScreen/>;
      default:
        return <SectionStoryScreen sectionId={topMenuData[tabSelectedIndex].sectionId} />;
    }
  };
  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isLoading}>
      {renderTabBarComponent()}
      {!isLoading&&<View style={{flex: 1}} testID={'tabContent'}>{tabContent()}</View>}
    </ScreenContainer>
  );
};

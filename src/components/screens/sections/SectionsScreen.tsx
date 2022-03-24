import React, {useState, useEffect} from 'react';
import analytics from '@react-native-firebase/analytics';
import {OpinionScreen, ScreenContainer, VideoScreen, PodcastProgram, SectionStoryScreen} from '..';
import {TabBarComponent} from 'src/components/molecules';
import {horizontalEdge, recordCurrentScreen} from 'src/shared/utils';
import {View, StyleSheet} from 'react-native';
import {useTopMenu} from 'src/hooks';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';

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
  const style = useThemeAwareObject(customStyle)
  useEffect(() => { fetchTopMenuRequest(); }, []);
  const onPressTabItem = (index: number) => {
    topMenuData[tabSelectedIndex].isSelected = false;
    topMenuData[index].isSelected = true;
    setTabSelectedIndex(index);
    recordCurrentScreen(topMenuData[tabSelectedIndex].tabName as string);
  };

  const renderTabBarComponent = () => (
    <TabBarComponent tabItem={topMenuData} onPressTabItem={onPressTabItem} style={style.tabBarStyle}/>
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
const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    tabBarStyle: {
      borderBottomColor: theme.dividerColor,
      borderBottomWidth: 1.2,
    }
  })
}
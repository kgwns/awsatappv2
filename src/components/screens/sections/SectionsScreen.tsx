import React, {useState, useEffect} from 'react';
import {TabView, TabBar } from 'react-native-tab-view';
import {
  OpinionScreen,
  ScreenContainer,
  VideoScreen,
  PodcastProgram,
  SectionStoryScreen,
} from '..';
import {horizontalEdge, isIOS, isNonEmptyArray, normalize} from 'src/shared/utils';
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useTopMenu} from 'src/hooks';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import { Styles } from 'src/shared/styles';
import { GameScreen } from '../games/GameScreen';
import { TabWithBarItem } from 'src/components/molecules';
import { MainSectionScreen } from 'src/components/screens';

export enum TabType {
  opinion = 'opinion',
  podcast = 'podcast',
  video = 'video',
  section = 'section',
  games = 'games',
  main = 'section-main-tab',
}

export const SectionsScreen = () => {
  const {isLoading, topMenuData, fetchTopMenuRequest} = useTopMenu();
  const styles = useThemeAwareObject(customStyle);

  const [index, setIndex] = React.useState(0);
  const [routes, setNewRoutes] = useState<any>([]);


  const renderScene = ({ route }: any) => {
    switch (route.key.substring(1)) {
      case TabType.opinion:
        return <OpinionScreen  />;
      case TabType.podcast:
        return <PodcastProgram  />;
      case TabType.video:
        return <VideoScreen   />;
      case TabType.games:
        return <GameScreen />
      case TabType.main:
        return <MainSectionScreen />
      default:
        return (
          <SectionStoryScreen sectionId={route.sectionId}/>
        );
    }
  }

  useEffect(() => {
    if(topMenuData.length > 0){
      let newRoutesArray = topMenuData.map((item, index) => {
        return {
          key: `${index}${item.keyName}`,
          title: item.tabName,
          sectionId: item.sectionId
        };
      })
      setNewRoutes(newRoutesArray)
    }
  }, [topMenuData])



  useEffect(() => {
    fetchTopMenuRequest();
  }, []);

  const _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        tabStyle={styles.tabBarStyle}
        labelStyle={styles.label}
        pressColor={'transparent'}
        renderIndicator={() => null}
        bounces={false}
        renderTabBarItem={(item) => {
          const number = item.key.match(/\d+/g) || '0';
          const tabIndex = isNonEmptyArray(number) ? parseInt(number[0]) : 0

          return <TabWithBarItem index={tabIndex}
            onPress={setIndex}
            tabName={item.route.title || ''}
            isSelected={tabIndex == item.navigationState.index}
          />
        }}
      />
    );
  };

  const tabsView = () => {
    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={_renderTabBar}
        initialLayout={initialLayout}
        style={styles.container}
      />
    );
  };
  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isLoading}>
      {!isLoading && (
        <View style={{flex: 1}} testID={'tabContent'}>
         {routes.length > 0 && tabsView()}
        </View>
      )}
    </ScreenContainer>
  );
};

const initialLayout = {width: Dimensions.get('window').width};
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    marginTop: isIOS ? StatusBar.currentHeight : 0,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  indicator: {
    backgroundColor: Styles.color.greenishBlue ,
    height: 3,
  },
  label: {
    fontStyle: 'normal',
    fontSize: normalize(13),
    fontWeight: 'bold',
    lineHeight: normalize(16),
    textAlign: 'left',
    color: Styles.color.doveGray,
  },
  tabBarStyle: {
    width: isIOS ? normalize(100) : normalize(80),
    borderBottomColor: theme.dividerColor,
    borderBottomWidth: 1.2,
    paddingHorizontal: 0
  },
});

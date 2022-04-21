import React, {useState, useEffect} from 'react';
import {TabView, TabBar } from 'react-native-tab-view';
import {
  OpinionScreen,
  ScreenContainer,
  VideoScreen,
  PodcastProgram,
  SectionStoryScreen,
} from '..';
import {horizontalEdge, isIOS, normalize} from 'src/shared/utils';
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

export enum TabType {
  opinion = 'opinion',
  podcast = 'podcast',
  video = 'video',
  section = 'section',
  games = 'games',
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
        onTabPress={(scene) => updateRouteInTabPress(scene, props)}
      />
    );
  };

  const updateRouteInTabPress = async (scene: any, props: any) => {
    const { route } = scene;

    if (!isIOS) {
      props.jumpTo(route.key);
    } else {
      const newIndex = routes.findIndex((item: any) => item.key == route.key)
      if (index + 3 < newIndex) {
        updateSwipeLeftPager(props, route, index + 3, newIndex)
      } else if (index - 3 > newIndex) {
        updateSwipeLeftPager(props, route, index - 3, newIndex)
      } else {
        props.jumpTo(route.key)
      }
    }
  }

  const updateSwipeLeftPager = async (props: any, route: any, inProgressIndex: number, newIndex: number) => {
    const updatedKey = routes[inProgressIndex].key
    props.jumpTo(updatedKey)
    await setTimeout(() => {
      if (inProgressIndex + 3 >= newIndex) {
        props.jumpTo(route.key)
      } else {
        const updatedKey = routes[inProgressIndex + 3].key
        props.jumpTo(updatedKey)
        updateSwipeLeftPager(props, route, inProgressIndex + 3, newIndex)
      }
    }, 500)
  }

  const updateSwipeRightPager = async (props: any, route: any, inProgressIndex: number, newIndex: number) => {
    const updatedKey = routes[inProgressIndex].key
    props.jumpTo(updatedKey)
    await setTimeout(() => {
      if (inProgressIndex - 3 <= newIndex) {
        props.jumpTo(route.key)
      } else {
        const updatedKey = routes[inProgressIndex - 3].key
        props.jumpTo(updatedKey)
        updateSwipeRightPager(props, route, inProgressIndex - 3, newIndex)
      }
    }, 500)
  }

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
    marginBottom:1
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

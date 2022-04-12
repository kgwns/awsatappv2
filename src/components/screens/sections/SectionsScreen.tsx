import React, {useState, useEffect} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {
  OpinionScreen,
  ScreenContainer,
  VideoScreen,
  PodcastProgram,
  SectionStoryScreen,
} from '..';
import {TabBarComponent} from 'src/components/molecules';
import {horizontalEdge, normalize, recordCurrentScreen} from 'src/shared/utils';
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

export enum TabType {
  opinion = 'opinion',
  podcast = 'podcast',
  video = 'video',
  section = 'section',
}

export const SectionsScreen = () => {
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);
  const {isLoading, topMenuData, fetchTopMenuRequest} = useTopMenu();
  const style = useThemeAwareObject(customStyle);

  const [index, setIndex] = React.useState(0);

  const [routes, setNewRoutes] = useState([]);


  const renderScene = ({ route }) => {
    console.log('renderScene: ', route)
    switch (route.key.substring(1)) {
      case TabType.home:
        return <SectionStoryScreen sectionId={11} />;
      case TabType.opinion:
        return <OpinionScreen  />;
      case TabType.podcast:
        return <PodcastProgram  />;
      case TabType.video:
        return <VideoScreen   />;
      default:
        return (
          <SectionStoryScreen sectionId={route.sectionId}/>
        );
    }
  }

  useEffect(() => {
    if(topMenuData.length > 0){
      console.log('topMenuData-data', JSON.stringify(topMenuData))
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
  const onPressTabItem = (index: number) => {
    setIndex(index);
    topMenuData[tabSelectedIndex].isSelected = false;
    topMenuData[index].isSelected = true;
    setTabSelectedIndex(index);
    recordCurrentScreen(topMenuData[tabSelectedIndex].tabName as string);
  };

  const _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={[styles.tab, style.tabBarStyle]}
        labelStyle={styles.label}
        pressColor={'transparent'}
        onTabPress={scene => {
          const {route} = scene;
          // topMenuData[tabSelectedIndex].isSelected = false;
          // topMenuData[index].isSelected = true;
          // setTabSelectedIndex(index);
          // recordCurrentScreen(topMenuData[tabSelectedIndex].tabName as string);
          //console.log('route.key', route.key);
          props.jumpTo(route.key);
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
const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    tabBarStyle: {
      borderBottomColor: theme.dividerColor,
      borderBottomWidth: 1.2,
    },
  });
};

const initialLayout = {width: Dimensions.get('window').width};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },

  tabbar: {
    backgroundColor: 'transparent',
  },
  tab: {
   width: normalize(120),
  },
  indicator: {
    backgroundColor: Styles.color.greenishBlue ,
    height: 3,
    marginBottom:2
  },
  label: {
    fontStyle: 'normal',
    fontSize: normalize(13),
    fontWeight: 'bold',
    lineHeight: normalize(16),
    textAlign: 'left',
    color: Styles.color.doveGray,
  },
   pagerViewStyle: {
    flex: 1,
  },
});

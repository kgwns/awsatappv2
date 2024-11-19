import React, {useState, useEffect} from 'react';
import {TabView, TabBar } from 'react-native-tab-view';
import {
  OpinionScreen,
  ScreenContainer,
  VideoScreen,
  PodcastProgram,
  SectionStoryScreen,
  PhotoGalleryScreen,
} from '..';
import { isIOS, isNonEmptyArray, isStringIncludes, isTab, normalize, screenWidth, recordCurrentScreen } from 'src/shared/utils';
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import {useTopMenu} from 'src/hooks';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { Styles } from 'src/shared/styles';
import { GameScreen } from '../games/GameScreen';
import { TabWithBarItem } from 'src/components/molecules';
import { MainSectionScreen } from 'src/components/screens';
import { fonts } from 'src/shared/styles/fonts';
import { TopMenuItemType } from 'src/redux/topMenu/types';
import { AnimatedHeader } from 'src/components/atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { HOME_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer } from 'src/components/atoms/adContainer/AdContainer';

export enum TabType {
  opinion = 'opinion',
  podcast = 'podcast',
  video = 'video',
  section = 'section',
  games = 'games',
  main = 'section-main-tab',
  photos = 'photos',
}

export const SectionsScreen = () => {
  const {isLoading, topMenuData, fetchTopMenuRequest} = useTopMenu();
  const styles = useThemeAwareObject(customStyle);
  const theme = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes, setNewRoutes] = useState<any>([]);
  const [scrollY, setScrollY] = useState<any>([]);

  const renderScene = ({ route }: any) => {
    const tabIndex = route.key.match(/\d+/g) || ['0'];

    if (Math.abs(index - routes.indexOf(route)) > 2) {
      return <View />;
    }
    
    switch (route.keyName) {
      case TabType.opinion:
        return <OpinionScreen currentIndex={index} tabIndex={parseInt(tabIndex[0])} scrollY={scrollY[index]} />;
      case TabType.podcast:
        return <PodcastProgram currentIndex={index} tabIndex={parseInt(tabIndex[0])} scrollY={scrollY[index]} />;
      case TabType.video:
        return <VideoScreen currentIndex={index} tabIndex={parseInt(tabIndex[0])} scrollY={scrollY[index]} />;
      case TabType.games:
        return <GameScreen currentIndex={index} tabIndex={parseInt(tabIndex[0])} scrollY={scrollY[index]} />
      case TabType.photos:
        return <PhotoGalleryScreen currentIndex={index} tabIndex={parseInt(tabIndex[0])} scrollY={scrollY[index]} />
      case TabType.main:
        return <MainSectionScreen currentIndex={index} tabIndex={parseInt(tabIndex[0])} scrollY={scrollY[index]} />
      default:
        return (
          <SectionStoryScreen sectionId={route.field_sections}
            currentIndex={index}
            sectionKey={route.key}
            tabIndex={parseInt(tabIndex[0])}
            childInfo={route.child}
            onUpdateChildSection={(data) => onUpdateChildSection(data, index)}
            scrollY={scrollY[index]}
          />
        );
    }
  }

  useEffect(() => {
    updatedTopMenuData();
  }, [topMenuData])

  const updatedTopMenuData = () => {
    if (isNonEmptyArray(topMenuData)) {
      const data = formateChildMenuData(topMenuData)
      if (isNonEmptyArray(data)) {
        const newRoutesArray = data.map((item, indexKey) => {
          return {
            key: `${indexKey}${item.keyName}`,
            title: item.tabName,
            sectionId: item.sectionId,
            keyName: item.keyName,
            child: item.child,
            field_sections: item.field_sections
          };
        })
        const scrollYArray = newRoutesArray.map(()=>  new Animated.Value(0) );
        setScrollY(scrollYArray);
        setNewRoutes(newRoutesArray);
      }
    }
  }

  const formateChildMenuData = (menuData: any[], parentId: null | string = null) => {
    const allMenuData = []
    let filterMenuData = []
    if (parentId == null) {
      filterMenuData = menuData.reduce((data, item) => {
        if (item.parentId == null) {
          const updatedData = item
          data.push(updatedData)
        }
        return data
      }, [])
    } else {
      filterMenuData = menuData.filter((item: TopMenuItemType) => isStringIncludes(item.parentId, parentId))
    }

    for (const item of filterMenuData) {
      const newParentId = item.uuid ?? null
      const customData: any = {
        ...item,
      }

      customData.child = newParentId ? formateChildMenuData(menuData, newParentId) : []
      allMenuData.push(customData)
    }

    return allMenuData
  }

  const onUpdateChildSection = (data: TopMenuItemType[], indexKey: number) => {
    const routeData = [...routes]
    const selectedRoute = routeData[indexKey]
    if(selectedRoute && selectedRoute.child) {
      selectedRoute.child = data
    }
    setNewRoutes(routeData)
  }

  const onPressTabItem = (selectedIndex: number) => {
    const routeData = [...routes]
    const selectedRoute = routeData[selectedIndex]
    recordCurrentScreen(selectedRoute.keyName);
    let selectedRouteChild: TopMenuItemType[] = [];

    if(selectedRoute && selectedRoute.child) {
      selectedRouteChild = selectedRoute.child.map((item: TopMenuItemType) => ({
        ...item,
        isSelected: false
      }))

      const previousData = routeData[index];
      const oldChildSection = [...previousData.child]
      const lastSelectedIndex = oldChildSection.findIndex((item) => item.isSelected === true);
      if (lastSelectedIndex > -1 && isNonEmptyArray(oldChildSection[lastSelectedIndex].child)) {
        const updatedLatestChild = oldChildSection[lastSelectedIndex]
        const updatedLatestSubChild = updatedLatestChild.child?.map((childItem: TopMenuItemType) => ({ ...childItem, isSelected: false }));
        updatedLatestChild.child = updatedLatestSubChild
        oldChildSection[lastSelectedIndex] = updatedLatestChild;
      }
    }
    selectedRoute.child = selectedRouteChild
    routeData[selectedIndex] = selectedRoute
    setNewRoutes(routeData)
    setIndex(selectedIndex)
  }


  useEffect(() => {
    fetchTopMenuRequest();
  }, []);

  const _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={[styles.tabBar, isTab && styles.tabBarLeftPadding]}
        tabStyle={styles.tabBarStyle}
        labelStyle={styles.label}
        contentContainerStyle={styles.contentContainer}
        pressColor={'transparent'}
        renderIndicator={() => null}
        bounces={false}
        renderTabBarItem={(item) => {
          const number = item.key.match(/\d+/g) || '0';
          const tabIndex = isNonEmptyArray(number) ? parseInt(number[0]) : 0

          return <TabWithBarItem index={tabIndex}
            key={tabIndex}
            onPress={onPressTabItem}
            tabName={item.route.title || ''}
            isSelected={tabIndex === item.navigationState.index}
            labelFont={fonts.Effra_Arbc_Regular}
          />
        }}
      />
    );
  };

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
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
        sceneContainerStyle={styles.sceneContainer}
      />
    );
  };

  const renderHeader = () => {
    return(
      scrollY.map((_: any, i: number) => {
        if(index === i){
          return(
            <>
              <AnimatedHeader key={i} scrollY={scrollY[index]} />
              <AdContainer unitId={HOME_UNIT_ID}/>
            </>
          )
        }else{
          return null
        }
      })
    )
  }
 
  return (
    <ScreenContainer isLoading={isLoading} backgroundColor={theme.themeData.tabBarBackground}>
      {renderHeader()}
      {!isLoading && (
        <View style={(isPortrait() && isIOS)? styles.orientationStyle : styles.scene} testID={'tabContent'}>
         {routes.length > 0 && tabsView()}
        </View>
      )}
    </ScreenContainer>
  );
};

const initialLayout = {width: Dimensions.get('window').width};
const { width : orientationWidth, height : orientationHeight } = Dimensions.get('window');
const orientationStyleWidth = Math.min(orientationHeight, orientationWidth);

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    marginTop: isIOS ? StatusBar.currentHeight : 0,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.tabBarBackground,
    paddingTop: 10
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
  orientationStyle:{
    flex: 1,
  },
  sceneContainer: {
    width: '100%', 
    height: '100%',
    flex: 1,
  },
  contentContainer: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: theme.tabBarBackground,
  },
  tabBarLeftPadding: {
    paddingLeft: 0.02 * screenWidth
  }
});

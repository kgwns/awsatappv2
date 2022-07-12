import React, { useEffect, useState } from 'react';
import { ScreenContainer } from '..'
import { horizontalEdge, isIOS, isNonEmptyArray, isTab, normalize, normalizeBy320, screenWidth } from 'src/shared/utils';
import { Label } from 'src/components/atoms';
import { Dimensions, View, StyleSheet, StatusBar } from 'react-native';
import { Styles } from 'src/shared/styles';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { TabBar, TabView } from 'react-native-tab-view';
import { TabWithBarItem } from 'src/components/molecules';
import { fonts } from 'src/shared/styles/fonts';
import { myNewsTopTabData } from 'src/constants/SampleData'

export enum MyNewsTabType {
  media = 'media',
  writers = 'writers',
  topics = 'topics',
}

export const MyNewsScreen = () => {
  const styles = useThemeAwareObject(customStyle);
  const [routes, setNewRoutes] = useState<any>([]);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    let newRoutesArray = myNewsTopTabData.map((item, index) => {
      return {
        key: `${index}${item.keyName}`,
        title: item.tabName,
        keyName: item.keyName,
      };
    })
    setNewRoutes(newRoutesArray)
  }, [])

  const renderScene = ({ route }: any) => {
    if (Math.abs(index - routes.indexOf(route)) > 2) {
      return <View />;
    }

    switch (route.keyName) {
      case MyNewsTabType.media:
        return (
          <View style={styles.childStyle}>
            <Label children={'Work in Progress - Media'} />
          </View>
        )
      case MyNewsTabType.writers:
        return (
          <View style={styles.childStyle}>
            <Label children={'Work in Progress - Writers'} />
          </View>
        )
      case MyNewsTabType.topics:
        return (
          <View style={styles.childStyle}>
            <Label children={'Work in Progress - Topics'} />
          </View>
        )
      default:
        return null
    }
  }

  const tabsView = () => {
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={_renderTabBar}
        initialLayout={initialLayout}
        style={styles.container}
      />
    );
  };

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
            key={tabIndex}
            onPress={setIndex}
            tabName={item.route.title || ''}
            isSelected={tabIndex == item.navigationState.index}
            selectionColor={true}
            labelFont={fonts.Effra_Arbc_Regular}
          />
        }}
      />
    );
  };

  return (
    <ScreenContainer edge={horizontalEdge}>
      <View style={styles.scene} testID={'tabContent'}>
        {routes.length > 0 && tabsView()}
      </View>
    </ScreenContainer>
  )
}

const initialLayout = { width: Dimensions.get('window').width };
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    marginTop: isIOS ? StatusBar.currentHeight : 0,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.backgroundColor,
    paddingTop: 10,
    width: screenWidth,
  },
  indicator: {
    backgroundColor: Styles.color.greenishBlue,
    height: 3,
  },
  label: {
    fontStyle: 'normal',
    fontSize: normalize(23),
    fontWeight: 'bold',
    lineHeight: normalize(16),
    textAlign: 'left',
    color: Styles.color.doveGray,
  },
  tabBarStyle: {
    marginHorizontal: 10,
    backgroundColor: 'orange',
    width: screenWidth * 0.33,
  },
  childStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});




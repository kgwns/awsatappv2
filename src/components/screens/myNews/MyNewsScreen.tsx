import React, { useEffect, useRef, useState } from 'react';
import { ScreenContainer } from '..'
import { horizontalEdge, isIOS, isNonEmptyArray, normalize } from 'src/shared/utils';
import { Label } from 'src/components/atoms';
import { Dimensions, View, StyleSheet, StatusBar } from 'react-native';
import { Styles } from 'src/shared/styles';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { TabBar, TabView } from 'react-native-tab-view';
import { CustomTabBarItem, SignupAlertCard } from 'src/components/molecules';
import { fonts } from 'src/shared/styles/fonts';
import { MyNewsTopics } from 'src/components/organisms/myTopics/MyNewsTopics';
import { myNewsTopTabData, TranslateConstants, TranslateKey, ScreensConstants } from 'src/constants/Constants';
import { MyNewsWriters } from 'src/components/organisms';
import { useLogin } from 'src/hooks';

import { useNavigation } from '@react-navigation/native';
import { NEWS_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer } from 'src/components/atoms/adContainer/AdContainer';

export enum MyNewsTabType {
  media = 'media',
  writers = 'writers',
  topics = 'topics',
}

export const MyNewsScreen = () => {
  const styles = useThemeAwareObject(customStyle);
  const {isLoggedIn} = useLogin();
  const navigation = useNavigation();
  const [routes, setNewRoutes] = useState<any>([]);
  const [index, setIndex] = React.useState(0);
  const showPopUp = useRef(!isLoggedIn)
  const SIGN_UP_PH_TITLE = TranslateConstants({key:TranslateKey.SIGN_UP_PH_TITLE})
  const SIGN_UP_PH_MESSAGE = TranslateConstants({key:TranslateKey.SIGN_UP_PH_MESSAGE})
  const SIGN_UP_PH_SIGNUP = TranslateConstants({key:TranslateKey.SIGN_UP_PH_SIGNUP})

  useEffect(() => {
    configData()
  }, [])

  const configData = () => {
    const newRoutesArray = myNewsTopTabData.map((item, indexValue) => {
      return {
        key: `${indexValue}${item.keyName}`,
        title: item.tabName,
        keyName: item.keyName,
      };
    })
    setNewRoutes(newRoutesArray)
  }

  const onPressSignup = () => {
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  };

  const onCloseSignUpAlert = () => {
    showPopUp.current = false;
  };

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
          <MyNewsWriters />
        )
      case MyNewsTabType.topics:
        return (
          <MyNewsTopics />
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

          return <View style={{ width: Dimensions.get('window').width/2  }}>
            <CustomTabBarItem index={tabIndex}
              key={tabIndex}
              onPress={setIndex}
              tabName={item.route.title || ''}
              isSelected={tabIndex === item.navigationState.index}
              labelFont={fonts.Effra_Arbc_Regular}
            />
            <View style={styles.tabBarBottomView} />
          </View>
        }}
      />
    );
  };

  return (
    <ScreenContainer
      edge={horizontalEdge}
      isSignUpAlertVisible={showPopUp.current}
      onCloseSignUpAlert={onCloseSignUpAlert}>
      {isLoggedIn ? (
        <View style={ styles.scene} testID={'tabContent'}>
          <AdContainer unitId={NEWS_UNIT_ID}/>
          {routes.length > 0 && tabsView()}
        </View>
      ) : (
        <SignupAlertCard
          title={SIGN_UP_PH_TITLE}
          message={SIGN_UP_PH_MESSAGE}
          buttonText={SIGN_UP_PH_SIGNUP}
          onPress={onPressSignup}
        />
      )}
    </ScreenContainer>
  );
}

const initialLayout = { width: Dimensions.get('window').width };
const { width: orientationWidth, height: orientationHeight } = Dimensions.get('window');
const orientationStyleWidth = Math.min(orientationHeight, orientationWidth);

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    marginTop: isIOS ? StatusBar.currentHeight : 0,
    width: '100%'
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.backgroundColor,
    paddingTop: 10,
    width: '100%',
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
  },
  childStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarBottomView: {
    width: '100%',
    height: 1.2,
    backgroundColor: theme.dividerColor,
    position: 'absolute',
    bottom: 0
  },
  orientationStyle: {
    flex: 1,
    width: orientationStyleWidth
  }
});

import React, { useEffect, useRef, useState } from 'react';
import { ScreenContainer } from '..'
import { horizontalEdge, isIOS, isNonEmptyArray, normalize, screenWidth } from 'src/shared/utils';
import { Label } from 'src/components/atoms';
import { Dimensions, View, StyleSheet, StatusBar } from 'react-native';
import { Styles } from 'src/shared/styles';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { TabBar, TabView } from 'react-native-tab-view';
import { CustomTabBarItem, SignupAlertCard } from 'src/components/molecules';
import { fonts } from 'src/shared/styles/fonts';
import { MyNewsTopics } from 'src/components/organisms/myTopics/MyNewsTopics';
import { myNewsTopTabData } from 'src/constants/Constants';
import { MyNewsWriters } from 'src/components/organisms';
import { useLogin } from 'src/hooks';
import { t } from 'i18next';
import { ScreensConstants } from 'src/constants/Constants';
import { useNavigation } from '@react-navigation/native';

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

  useEffect(() => {
    configData()
  }, [])

  const configData = () => {
    const newRoutesArray = myNewsTopTabData.map((item, index) => {
      return {
        key: `${index}${item.keyName}`,
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

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
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

          return <View>
            <CustomTabBarItem index={tabIndex}
              key={tabIndex}
              onPress={setIndex}
              tabName={item.route.title || ''}
              isSelected={tabIndex == item.navigationState.index}
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
        <View style={(isPortrait() && isIOS) ? styles.orientationStyle : styles.scene} testID={'tabContent'}>
          {routes.length > 0 && tabsView()}
        </View>
      ) : (
        <SignupAlertCard
          title={t('signUpPH.title')}
          message={t('signUpPH.message')}
          buttonText={t('signUpPH.signUp')}
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

import React, { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { horizontalEdge } from 'src/shared/utils';
import { TabBarComponent, TabBarDataProps, SignupAlertCard } from 'src/components/molecules';
import { ScreenContainer } from '..';
import { Archives } from 'src/components/organisms';
import {useLogin} from 'src/hooks';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export const FavoriteScreen = () => {

  const navigation = useNavigation();

  const {isLoggedIn} = useLogin();
  const FAVORITE_TAB_ITEM_ARCHIEVES = TranslateConstants({key:TranslateKey.FAVORITE_TAB_ITEM_ARCHIEVES})
  const SIGN_UP_PH_SIGNUP = TranslateConstants({key:TranslateKey.SIGN_UP_PH_SIGNUP})
  const SIGN_UP_PH_MESSAGE = TranslateConstants({key:TranslateKey.SIGN_UP_PH_MESSAGE})
  const SIGN_UP_PH_TITLE = TranslateConstants({key:TranslateKey.SIGN_UP_PH_TITLE})

  const tabItemData: TabBarDataProps[] = [
    {
      tabName: FAVORITE_TAB_ITEM_ARCHIEVES,
      isSelected: true,
    }
  ]

  const [tabItem, setTabItem] = useState<TabBarDataProps[]>(tabItemData);
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);
  const showupUp = useRef(!isLoggedIn)

  const ref = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      global.refFlatList = ref;
    }, [])
  );



  // const onPressTabItem = (index: number) => {
  //   const tabData = tabItem
  //   tabData[tabSelectedIndex].isSelected = false;
  //   tabData[index].isSelected = true;
  //   setTabItem(tabData)
  //   setTabSelectedIndex(index);
  // };

  // const renderTabBarComponent = () => (
  //   <TabBarComponent tabItem={tabItem} onPressTabItem={onPressTabItem} />
  // );

  const renderArchives = () => (
    <View style={{ flex: 1 }}>
      <Archives />
    </View>
  )

  const renderItem = () => (
    <View style={{ flex: 1 }}>
      {renderArchives()}
    </View>
  )

  const onPressSignup = () => {
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  }

  const onCloseSignUpAlert = () => {
    showupUp.current = false
  }

  return (
    <ScreenContainer edge={horizontalEdge}
      isSignUpAlertVisible={showupUp.current}
      onCloseSignUpAlert={onCloseSignUpAlert}
    >
      {isLoggedIn  ?
       renderItem() :
     <SignupAlertCard title={SIGN_UP_PH_TITLE} message={SIGN_UP_PH_MESSAGE}
     buttonText={SIGN_UP_PH_SIGNUP} onPress={onPressSignup}/> }
     
    </ScreenContainer>
  );
};

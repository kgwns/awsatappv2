import React, { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { horizontalEdge } from 'src/shared/utils';
import { TabBarComponent, TabBarDataProps, SignupAlertCard } from 'src/components/molecules';
import { ScreenContainer } from '..';
import { useTranslation } from 'react-i18next';
import { Archives } from 'src/components/organisms';
import {useLogin} from 'src/hooks';
import { ScreensConstants } from 'src/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export const FavoriteScreen = () => {
  const [t] = useTranslation()

  const navigation = useNavigation();

  const {isLoggedIn} = useLogin();

  const tabItemData: TabBarDataProps[] = [
    {
      tabName: t('favorite.tabItem.archives'),
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



  const onPressTabItem = (index: number) => {
    const tabData = tabItem
    tabData[tabSelectedIndex].isSelected = false;
    tabData[index].isSelected = true;
    setTabItem(tabData)
    setTabSelectedIndex(index);
  };

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
     <SignupAlertCard title={t('signUpPH.title')} message={t('signUpPH.message')}
     buttonText={t('signUpPH.signUp')} onPress={onPressSignup}/> }
     
    </ScreenContainer>
  );
};

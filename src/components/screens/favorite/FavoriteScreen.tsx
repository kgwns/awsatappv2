import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { horizontalEdge } from 'src/shared/utils';
import { TabBarComponent, TabBarDataProps, SignupAlertCard } from 'src/components/molecules';
import { ScreenContainer } from '..';
import { useTranslation } from 'react-i18next';
import { Archives, ContentForYou } from 'src/components/organisms';
import {useLogin} from 'src/hooks';
import { ScreensConstants } from 'src/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';


export const FavoriteScreen = () => {
  const [t] = useTranslation()

  const navigation = useNavigation();

  const {isLoggedIn} = useLogin();

  const tabItemData: TabBarDataProps[] = [
    {
      tabName: t('favorite.tabItem.content_for_you'),
      isSelected: true,
    },
    {
      tabName: t('favorite.tabItem.archives'),
      isSelected: false,
    }
  ]

  const [tabItem, setTabItem] = useState<TabBarDataProps[]>(tabItemData);
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  const ref = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      global.refFlatList = ref;
    }, [])
  );

  useEffect(() => {
    stopTrackPlayer()
  }, [tabSelectedIndex]);

  const stopTrackPlayer = async () => {
    await TrackPlayer.reset();
  }

  const onPressTabItem = (index: number) => {
    const tabData = tabItem
    tabData[tabSelectedIndex].isSelected = false;
    tabData[index].isSelected = true;
    setTabItem(tabData)
    setTabSelectedIndex(index);
  };

  const renderTabBarComponent = () => (
    <TabBarComponent tabItem={tabItem} onPressTabItem={onPressTabItem} />
  );

  const tabContent = () => {
    switch (tabSelectedIndex) {
      case 1:
        return renderArchives();
      default:
        return renderContentForYou();
    }
  };

  const renderArchives = () => (
    <View style={{ flex: 1 }}>
      <Archives />
    </View>
  )

  const renderContentForYou = () => (
    <View style={{ flex: 1 }}>
      <ContentForYou />
    </View>
  )

  const renderItem = () => (
    <View style={{ flex: 1 }}>
      {renderTabBarComponent()}
      {tabContent()}
    </View>
  )

  const onPressSignup = () => {
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  }


  return (
    <ScreenContainer edge={horizontalEdge}>
      {isLoggedIn  ?
       <FlatList
        ref={ref}
        onScrollBeginDrag={() => global.refFlatList = ref}
       keyExtractor={(_, index) => index.toString()}
       data={[{}]}
       showsVerticalScrollIndicator={false}
       renderItem={renderItem}
       style={{flex: 1}}
     /> :
     <SignupAlertCard title={t('signUpPH.title')} message={t('signUpPH.message')}
     buttonText={t('signUpPH.signUp')} onPress={onPressSignup}/> }
     
    </ScreenContainer>
  );
};

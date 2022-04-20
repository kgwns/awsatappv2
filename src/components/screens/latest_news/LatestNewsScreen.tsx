import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  ArticleSection, CarouselSlider, PodcastWidget,
  ShortArticle, StoryWidget, AuthorWidget, BannerArticleSection, SectionComboOne, StoryListProps, AlertModal
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { shortArticleWithTagProperties, storyWidgetData } from 'src/constants/SampleData';
import { horizontalEdge, isNonEmptyArray, isTab, normalize, isIOS } from 'src/shared/utils';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useBookmark, useLatestNewsTab, useLogin, useUserProfileData } from 'src/hooks';
import { LatestArticleBodyGet, LatestArticleDataType, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { ScreensConstants } from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Styles } from 'src/shared/styles';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';
import { getPodcastUrl } from 'src/shared/utils/utilities';
import { PodCastMiniPlayer } from 'src/components/molecules';
import { useFocusEffect } from '@react-navigation/native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';

const tickerAndHeroPayload: LatestArticleBodyGet = {
  items_per_page: 10,
  page: 0,
  offset: 0
}

const heroListTopListPayload: LatestArticleBodyGet = {
  items_per_page: 10,
  page: 0,
  offset: 6
}
const opinionListPayload: LatestArticleBodyGet = {
  items_per_page: 4,
  page: 0,
  offset: 0
}

const sectionComboOnePayload: RequestSectionComboBodyGet = {
  id: 726
}

const sectionComboTwoPayload: RequestSectionComboBodyGet = {
  id: 871,
  items_per_page: 10,
  page: 0
}

const sectionComboThreePayload: RequestSectionComboBodyGet = {
  id: 11,
  items_per_page: 10,
  page: 0
}

const sectionComboFourPayload: RequestSectionComboBodyGet = {
  id: 10,
  items_per_page: 10,
  page: 0
}

export const LatestNewsScreen = () => {
  const { themeData } = useTheme()
  const [t] = useTranslation()
  const navigation = useNavigation<StackNavigationProp<any>>()
  const latestNewsScreenStyle = useThemeAwareObject(customStyle)

  const {
    isLoading, ticker, hero, heroList, topList, opinionList,
    sectionComboOne, sectionComboTwo, sectionComboThree, sectionComboFour, podcastHome,
    fetchTickerAndHeroArticle, fetchHeroListTopList, fetchOpinionTopList,
    fetchSectionComboOne, fetchSectionComboTwo,
    fetchSectionComboThree, fetchSectionComboFour,
    fetchPodcastHome
  } = useLatestNewsTab()

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()

  const { isLoggedIn } = useLogin()
  const {fetchProfileDataRequest} = useUserProfileData();

  const [heroInfo, setHeroInfo] = useState(hero)
  const [sectionComboOneInfo, setSectionComboOneInfo] = useState(sectionComboOne)
  const [sectionComboTwoInfo, setSectionComboTwoInfo] = useState(sectionComboTwo)
  const [sectionComboThreeInfo, setSectionComboThreeInfo] = useState(sectionComboThree)
  const [sectionComboFourInfo, setSectionComboFourInfo] = useState(sectionComboFour)
  const [showupUp,setShowPopUp] = useState(false)


  const updateBookmark = (data: LatestArticleDataType[]) => {
    return data.map((item: LatestArticleDataType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
  }

  const updatedChangeBookmark = (data: LatestArticleDataType[], index: number) => {
    const updatedData = [...data]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus
    updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
    return updatedData
  }


  useEffect(() => {
    updateHeroData()
  }, [hero,bookmarkIdInfo])

  const updateHeroData = () => {
    if(isNonEmptyArray(hero)) {
      const heroData = updateBookmark(hero)
      setHeroInfo(heroData)
    }
  }

  const updatedHeroBookmark = (index: number) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    const updatedData = updatedChangeBookmark(heroInfo, index)
    setHeroInfo(updatedData)
  }


  useEffect(() => {
    if (isNonEmptyArray(sectionComboOne)) {
      updateSectionComboOneData()
    }
  }, [sectionComboOne,bookmarkIdInfo])

  const updateSectionComboOneData = () => {
    const data = updateBookmark(sectionComboOne)
    setSectionComboOneInfo(data)
  }

  const updatedSectionComboOneBookmark = (nid: string) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    
    const index = sectionComboOneInfo.findIndex((item) => item.nid == nid)
    const updatedData = updatedChangeBookmark(sectionComboOneInfo, index)
    setSectionComboOneInfo(updatedData)
  }

  useEffect(() => {
    if (isNonEmptyArray(sectionComboTwo)) {
      updateSectionComboTwoData()
    }
  }, [sectionComboTwo,bookmarkIdInfo])

  const updateSectionComboTwoData = () => {
    const data = updateBookmark(sectionComboTwo)
    setSectionComboTwoInfo(data)
  }

  const updatedSectionComboTwoBookmark = (article: LatestArticleDataType) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = sectionComboTwoInfo.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(sectionComboTwoInfo, index)
    setSectionComboTwoInfo(updatedData)
  }

  useEffect(() => {
    if (isNonEmptyArray(sectionComboThree)) {
      updateSectionComboThreeData()
    }
  }, [sectionComboThree,bookmarkIdInfo])

  const updateSectionComboThreeData = () => {
    const data = updateBookmark(sectionComboThree)
    setSectionComboThreeInfo(data)
  }

  const updatedSectionComboThreeBookmark = (article: LatestArticleDataType) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = sectionComboThreeInfo.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(sectionComboThreeInfo, index)
    setSectionComboThreeInfo(updatedData)
  }


  useEffect(() => {
    if (isNonEmptyArray(sectionComboFour)) {
      updateSectionComboFourData()
    }
  }, [sectionComboFour,bookmarkIdInfo])

  const updateSectionComboFourData = () => {
    const data = updateBookmark(sectionComboFour)
    setSectionComboFourInfo(data)
  }

  const updatedSectionComboFourBookmark = (article: LatestArticleDataType) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = sectionComboFour.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(sectionComboFour, index)
    setSectionComboFourInfo(updatedData)
  }


  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const heroListInfo = isTab ? heroList.slice(0, 1) : heroList
  const heroListData = heroListInfo.map((item: LatestArticleDataType) => (
    {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
      tagName: item.news_categories && item.news_categories.title,
      isBookmarked: validateBookmark(item.nid)
    }
  ))

  const topListData = topList.map((item: LatestArticleDataType) => (
    {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
      flag: item.news_categories && item.news_categories.title,
      isBookmarked: validateBookmark(item.nid)
    }
  ))

  //PodcastHome 
  const [isPlayerVisible, setPlayerVisibility] = useState(false)
  const playbackState = usePlaybackState();
  const podcastData = podcastHome && isNonEmptyArray(podcastHome) ? podcastHome[0] : {} as LatestArticleDataType;
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => { TrackPlayer.stop() };
      return () => unsubscribe();
    }, [isPlayerVisible])
  );


  useEffect(() => {
    fetchTickerAndHeroArticle(tickerAndHeroPayload)
    fetchHeroListTopList(heroListTopListPayload)
    fetchOpinionTopList(opinionListPayload)
    fetchSectionComboOne(sectionComboOnePayload)
    fetchSectionComboTwo(sectionComboTwoPayload)
    fetchSectionComboThree(sectionComboThreePayload)
    fetchSectionComboFour(sectionComboFourPayload)
    fetchProfileDataRequest();
    fetchPodcastHome();
  }, [])


  const onPressArticle = (nid: string) => {
    nid && navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    if (isLoggedIn) {
      isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const makeSignUpAlert = () => {
    setShowPopUp(true)
  }

  const onListenPodcast = async () => {
    setPlayerVisibility(true)
    if (playbackState == State.Playing) {
      return
    }
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({ stopWithApp: true });
    await TrackPlayer.add({
      id: podcastData.nid,
      url: getPodcastUrl(podcastData.field_spreaker_episode_export),
      title: podcastData.title,
      artist: podcastData.title,
    });
    await TrackPlayer.play();
  }

  const togglePlayback = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    }
    else if (playbackState === State.Paused) {
      await TrackPlayer.play();
    }
    else if ( playbackState === State.Paused || playbackState == State.None || playbackState == State.Stopped) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({ stopWithApp: true });
      await TrackPlayer.add({
        id: podcastData.nid,
        url: getPodcastUrl(podcastData.field_spreaker_episode_export),
        title: podcastData.title,
        artist: podcastData.title,
      });
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      await TrackPlayer.play();
    }
  };

  const onClose = async () => {
    await TrackPlayer.stop()
    setPlayerVisibility(false)
  }

  const renderItem = () => (
    <View>
      <Divider style={latestNewsScreenStyle.dividerTop} />
      <CarouselSlider tickerData={ticker} heroData={heroInfo}
        onUpdateHeroBookmark={updatedHeroBookmark}
      />
      {
        isTab ? <View style={latestNewsScreenStyle.tabSplitter}>
          <View style={latestNewsScreenStyle.tabWidgetContainer}>
            <ArticleSection data={heroListData} onUpdateBookmark={updateBookmarkInfo} />
            {isNonEmptyArray(podcastHome) && <PodcastWidget data={podcastHome} onPress={onListenPodcast} />}
          </View>
          <View style={latestNewsScreenStyle.verticalDivider}/>
          <View style={latestNewsScreenStyle.tabWidgetContainer}>
            <ShortArticle data={topListData} onPress={onPressArticle}
              onUpdateBookmark={updateBookmarkInfo}
              showSignUpPopUp={makeSignUpAlert}
            />
          </View>
        </View>
          :
          <>
            {isNonEmptyArray(podcastHome) ? <PodcastWidget data={podcastHome} onPress={onListenPodcast} /> : <View style={latestNewsScreenStyle.podcastDivider}/>}
            <ArticleSection data={heroListData} onUpdateBookmark={updateBookmarkInfo} showDivider={true}/>
            <ShortArticle data={topListData} onPress={onPressArticle}
              onUpdateBookmark={updateBookmarkInfo}
              showSignUpPopUp={makeSignUpAlert}
            />
          </>
      }
      {isNonEmptyArray(sectionComboOne) && <Divider style={latestNewsScreenStyle.dividerAboveTrending} /> }
      {/* <StoryWidget data={storyWidgetData}             // Will enable the Stories once required and remove the above Divider
        onPress={(item: StoryListProps, index: number) =>
          navigation.navigate(ScreensConstants.StoryScreen,
            { id: item.id, selectedIndex: index }
          )}
      /> */}
      <SectionComboOne data={sectionComboOneInfo} onPress={onPressArticle}
        sectionId={'726'}
        onUpdateBookmark={updatedSectionComboOneBookmark}
        showSignUpPopUp={makeSignUpAlert}
      />
      <BannerArticleSection data={sectionComboTwoInfo}
        title={t('latestNewsTab.sectionComboTwo.headerLeft')}
        sectionId={'871'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboTwoBookmark}
        isDivider
        dividerStyle={latestNewsScreenStyle.firstBannerDivider}
      />
      {isNonEmptyArray(opinionList) && <Divider style={latestNewsScreenStyle.sectionComboDivider} />}
      <AuthorWidget data={opinionList} />
      <BannerArticleSection
        data={sectionComboThreeInfo}
        title={t('latestNewsTab.sectionComboThree.headerLeft')}
        sectionId={'11'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboThreeBookmark}
      />
      <Divider style={{ height: normalize(20) }} />
      <BannerArticleSection
        data={sectionComboFourInfo}
        title={t('latestNewsTab.sectionComboTwo.headerLeft')}
        sectionId={'10'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboFourBookmark}
        isDivider
      />
      <Divider style={{ height: normalize(50) }} />
    </View>
  )

  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isLoading}
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert}>
      <FlatList
        style={{ flex: 1, height: '100%' }}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      {isPlayerVisible && <View style={latestNewsScreenStyle.miniPlayerContainer}>
        <PodCastMiniPlayer data={podcastData} onClose={onClose} onPlaybackPress={togglePlayback} />
      </View>}
    </ScreenContainer>
  )
}

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    tabSplitter: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: normalize(40),
      justifyContent: 'space-between',
      marginHorizontal: normalize(15),
    },
    tabWidgetContainer: {
      flex: 0.47,
      overflow: 'hidden',
    },
    dividerTop: {
      borderColor: Styles.color.gableGreen,
      borderBottomWidth: 1,
      opacity: 0.15
    },
    miniPlayerContainer: {
      width: '100%',
      height: normalize(80),
      position: 'absolute',
      bottom: 0,
    },
    firstBannerDivider: {
      marginTop: 0
    },
    podcastDivider: {
      width: '100%',
      height: normalize(20),
    },
    verticalDivider: {
      height: '100%',
      width: 1,
      backgroundColor: theme.dividerColor,
    },
    sectionComboDivider: {
      width: '100%',
      height: 1,
      marginTop: normalize(20),
      backgroundColor: theme.dividerColor,
    },
    dividerAboveTrending: {
      width: '100%',
      height: 1,
      backgroundColor: theme.dividerColor,
    },

  })
}

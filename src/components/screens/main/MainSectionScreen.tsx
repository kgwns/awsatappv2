import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import {
  ArticleSection, CarouselSlider,ShortArticle, AuthorWidget, BannerArticleSection, SectionComboOne, VideoContent, EditorsPickSection,
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { heroSectionProperties, podcastForYouSection, shortArticleWithTagProperties, topHeadLineNewsData } from 'src/constants/SampleData';
import { horizontalEdge, isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useBookmark, useLatestNewsTab, useLogin, useUserProfileData, useVideoList } from 'src/hooks';
import { LatestArticleBodyGet, LatestArticleDataType, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { ScreensConstants } from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Styles } from 'src/shared/styles';
import TrackPlayer from 'react-native-track-player';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { TopHeadLineNews } from 'src/components/molecules';
import { VideoItemType } from 'src/redux/videoList/types';
import AuthorSlider from 'src/components/organisms/AuthorsSlider';
import { Label } from 'src/components/atoms';

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

export const MainSectionScreen = () => {
  const { themeData } = useTheme()
  const [t] = useTranslation()
  const navigation = useNavigation<StackNavigationProp<any>>()
  const mainSectionStyle = useThemeAwareObject(customStyle)

  const {
    isLoading, ticker, hero, heroList, topList, opinionList,
    sectionComboOne, sectionComboTwo, sectionComboThree, sectionComboFour,
    fetchTickerAndHeroArticle, fetchHeroListTopList, fetchOpinionTopList,
    fetchSectionComboOne, fetchSectionComboTwo,
    fetchSectionComboThree, fetchSectionComboFour,
    fetchPodcastHome
  } = useLatestNewsTab()
  const {videoData,fetchVideoRequest} = useVideoList();

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()

  const { isLoggedIn } = useLogin()
  const { fetchProfileDataRequest } = useUserProfileData();

  const [refreshing, setRefreshing] = useState(false);
  const [heroInfo, setHeroInfo] = useState(hero)
  const [sectionComboOneInfo, setSectionComboOneInfo] = useState(sectionComboOne)
  const [sectionComboTwoInfo, setSectionComboTwoInfo] = useState(sectionComboTwo)
  const [sectionComboThreeInfo, setSectionComboThreeInfo] = useState(sectionComboThree)
  const [sectionComboFourInfo, setSectionComboFourInfo] = useState(sectionComboFour)
  const [showupUp, setShowPopUp] = useState(false)

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
  }, [hero, bookmarkIdInfo])

  const updateHeroData = () => {
    if (isNonEmptyArray(hero)) {
      const heroData = updateBookmark(hero)
      setHeroInfo(heroData)
    }
  }

  const updatedHeroBookmark = (index: number) => {
    if (!isLoggedIn) {
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
  }, [sectionComboOne, bookmarkIdInfo])

  const updateSectionComboOneData = () => {
    const data = updateBookmark(sectionComboOne)
    setSectionComboOneInfo(data)
  }

  const updatedSectionComboOneBookmark = (nid: string) => {
    if (!isLoggedIn) {
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
  }, [sectionComboTwo, bookmarkIdInfo])

  const updateSectionComboTwoData = () => {
    const data = updateBookmark(sectionComboTwo)
    setSectionComboTwoInfo(data)
  }

  const updatedSectionComboTwoBookmark = (article: LatestArticleDataType) => {
    if (!isLoggedIn) {
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
  }, [sectionComboThree, bookmarkIdInfo])

  const updateSectionComboThreeData = () => {
    const data = updateBookmark(sectionComboThree)
    setSectionComboThreeInfo(data)
  }

  const updatedSectionComboThreeBookmark = (article: LatestArticleDataType) => {
    if (!isLoggedIn) {
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
  }, [sectionComboFour, bookmarkIdInfo])

  const updateSectionComboFourData = () => {
    const data = updateBookmark(sectionComboFour)
    setSectionComboFourInfo(data)
  }

  const updatedSectionComboFourBookmark = (article: LatestArticleDataType) => {
    if (!isLoggedIn) {
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
  const heroListData = heroListInfo.map((item: LatestArticleDataType, index: number) => (
    {
      ...item,
      ...heroSectionProperties,
      titleColor: themeData.primaryBlack,
      tagName: item.news_categories && item.news_categories.title,
      isBookmarked: validateBookmark(item.nid),
      hideImage: index > 2,
      showDivider: heroListInfo.length > index + 1
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

  useEffect(() => {
    allDataLoad();
  }, [])

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    allDataLoad();
    TrackPlayer.stop()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const allDataLoad = () => {
    fetchTickerAndHeroArticle(tickerAndHeroPayload)
    fetchHeroListTopList(heroListTopListPayload)
    fetchOpinionTopList(opinionListPayload)
    fetchSectionComboOne(sectionComboOnePayload)
    fetchSectionComboTwo(sectionComboTwoPayload)
    fetchSectionComboThree(sectionComboThreePayload)
    fetchSectionComboFour(sectionComboFourPayload)
    fetchProfileDataRequest();
    fetchVideoRequest();
    fetchPodcastHome();
  }


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

  const onVideoItemPress = (item: VideoItemType) => {
    navigation.navigate(ScreensConstants.VideoPlayerScreen,
      { videoUrl: item.field_mp4_link_export, nid: item.nid })
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const makeSignUpAlert = () => {
    setShowPopUp(true)
  }

  const renderItem = () => (
    <View>
      <Divider style={mainSectionStyle.dividerTop} />
      <CarouselSlider tickerData={ticker} heroData={heroInfo}
        onUpdateHeroBookmark={updatedHeroBookmark}
      />
      <View style={mainSectionStyle.topNewsContainer}>
        <TopHeadLineNews data={topHeadLineNewsData} />
      </View>
      {
        isTab ? <View style={mainSectionStyle.tabSplitter}>
          <View style={mainSectionStyle.tabWidgetContainer}>
            <ArticleSection data={heroListData} onUpdateBookmark={updateBookmarkInfo} />
          </View>
          <View style={mainSectionStyle.verticalDivider} />
          <View style={mainSectionStyle.tabWidgetContainer}>
            <ShortArticle data={topListData} onPress={onPressArticle}
              onUpdateBookmark={updateBookmarkInfo}
              showSignUpPopUp={makeSignUpAlert}
            />
          </View>
        </View>
          :
          <>
            <ArticleSection data={heroListData} onUpdateBookmark={updateBookmarkInfo} />
          </>
      }
      {/* <AuthorWidget data={opinionList} /> */}
      <AuthorSlider data={[opinionList, opinionList, opinionList]} />
      <EditorsPickSection data={podcastForYouSection} />
      {isNonEmptyArray(sectionComboOne) && <Divider style={mainSectionStyle.dividerAboveTrending} />}
      <SectionComboOne data={sectionComboOneInfo} onPress={onPressArticle}
        sectionId={'726'}
        onUpdateBookmark={updatedSectionComboOneBookmark}
        showSignUpPopUp={makeSignUpAlert}
      />
      {isNonEmptyArray(videoData) && (
        <VideoContent data={videoData} onPress={onVideoItemPress} />
      )}
      <BannerArticleSection data={sectionComboTwoInfo}
        title={t('latestNewsTab.sectionComboTwo.headerLeft')}
        sectionId={'871'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboTwoBookmark}
        isDivider
        dividerStyle={mainSectionStyle.firstBannerDivider}
      />
      {isNonEmptyArray(opinionList) && <Divider style={mainSectionStyle.sectionComboDivider} />}
      <BannerArticleSection
        data={sectionComboThreeInfo}
        title={t('latestNewsTab.sectionComboThree.headerLeft')}
        sectionId={'11'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboThreeBookmark}
      />
      <ShortArticle data={topListData} onPress={onPressArticle}
        onUpdateBookmark={updateBookmarkInfo}
        showSignUpPopUp={makeSignUpAlert}
      />
      <Divider style={{ height: normalize(20) }} />
      {isNonEmptyArray(topListData) && (
        <View style={mainSectionStyle.articleContainer}>
          <View style={mainSectionStyle.articleTitleContainer}>
            <Label
              children={t('latestNewsTab.articlSection.articleTitle')}
              style={mainSectionStyle.articleTitleStyle}
            />
          </View>
          <ShortArticle
            data={topListData}
            onPress={onPressArticle}
            onUpdateBookmark={updateBookmarkInfo}
            showSignUpPopUp={makeSignUpAlert}
            isFooterOutside={true}
          />
        </View>
      )}
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
  );

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Styles.color.greenishBlue}
            colors={[Styles.color.greenishBlue]}
          />
        }
      />
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
      borderBottomWidth: 1,
      borderColor: theme.dividerColor,
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
    articleContainer: {
      backgroundColor: theme.secondaryWhite,
    },
    articleTitleContainer: {
      paddingVertical: normalize(20),
      alignItems: 'center'
    },
    articleTitleStyle: {
      fontSize: normalize(33),
      color: theme.primary,
      fontWeight: 'bold',
      lineHeight: normalize(35)
    },
    topNewsContainer: {
      marginHorizontal: 0.04 * screenWidth,
      overflow: 'hidden'
    }
  })
}
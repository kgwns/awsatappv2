import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native';
import {
  ArticleSection, CarouselSlider,
  ShortArticle, BannerArticleSection,
  EditorsPickSection, articleProps, VideoContent, PodcastWidget, ArticleGridView, ArticleImageView,
  ArchiveArticleSection,
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { heroSectionProperties, shortArticleWithTagProperties } from 'src/constants/SampleData';
import { horizontalEdge, isIOS, isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useBookmark, useLatestNewsTab, useLogin, useUserProfileData, useVideoList, useAppPlayer } from 'src/hooks';
import { EditorsChoiceDataType, LatestArticleBodyGet, LatestArticleDataType, MainSectionBlockType, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { flatListUniqueKey, ScreensConstants } from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Styles } from 'src/shared/styles';
import TrackPlayer, { usePlaybackState, } from 'react-native-track-player';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { TopHeadLineNews } from 'src/components/molecules';
import { VideoItemType } from 'src/redux/videoList/types';
import AuthorSlider from 'src/components/organisms/AuthorsSlider';
import { Label } from 'src/components/atoms';
import { getPodcastUrl, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants';
import { fonts } from 'src/shared/styles/fonts';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import InfoGraphicMapWidget from 'src/components/organisms/InfoGraphicMapWidget';
import { SECTION_COMBO_SIX } from 'src/services/apiEndPoints';


// const heroListTopListPayload: LatestArticleBodyGet = {
//   items_per_page: 10,
//   page: 0,
//   offset: 6
// }
const opinionListPayload: LatestArticleBodyGet = {
  items_per_page: 20,
  page: 0,
  offset: 0
}

const sectionComboOnePayload: RequestSectionComboBodyGet = {
  id: 10
}

const sectionComboTwoPayload: RequestSectionComboBodyGet = {
  id: 11,
  items_per_page: 10,
  page: 0
}

const sectionComboThreePayload: RequestSectionComboBodyGet = {
  id: 97120,
  items_per_page: 10,
  page: 0
}

const sectionComboFourPayload: RequestSectionComboBodyGet = {
  id: 871,
  items_per_page: 10,
  page: 0
}

const sectionComboFivePayload: RequestSectionComboBodyGet = {
  id: 18,
  items_per_page: 10,
  page: 0
}

const sectionComboSixPayload: RequestSectionComboBodyGet = {
  id: SECTION_COMBO_SIX,
  items_per_page: 10,
  page: 0
}

const sectionComboSevenPayload: RequestSectionComboBodyGet = {
  id: 36,
  items_per_page: 10,
  page: 0
}

const sectionComboEightPayload: RequestSectionComboBodyGet = {
  id: 66,
  items_per_page: 10,
  page: 0
}

export const MainSectionScreen = React.memo(({hidePlayerVisibility, tabIndex, currentIndex}:{hidePlayerVisibility?: boolean; tabIndex?:number; currentIndex?:number;}) => {
  const { themeData } = useTheme()
  const mainSectionStyle = useThemeAwareObject(customStyle)

  const [t] = useTranslation()
  const navigation = useNavigation<StackNavigationProp<any>>()

  const ref = React.useRef(null);
  useEffect(() => {
    if(tabIndex === currentIndex){
      global.refFlatList = ref;
    }
  }, [currentIndex])

  const _sectionComboOneTitle = TranslateConstants({key: TranslateKey.SECTION_COMBO_ONE})
  const _sectionComboTwoTitle = TranslateConstants({key: TranslateKey.SECTION_COMBO_TWO})
  const _sectionComboThreeTitle = TranslateConstants({key: TranslateKey.SECTION_COMBO_THREE})
  const _sectionComboFourTitle = TranslateConstants({key: TranslateKey.SECTION_COMBO_FOUR})
  const _sectionComboFiveTitle = TranslateConstants({key: TranslateKey.SECTION_COMBO_FIVE})
  const _sectionComboSixTitle = TranslateConstants({key: TranslateKey.SECTION_COMBO_SIX})
  const _sectionComboSevenTitle = TranslateConstants({key: TranslateKey.SECTION_COMBO_SEVEN})
  const _sectionComboEightTitle = TranslateConstants({key: TranslateKey.SECTION_COMBO_EIGHT})
  const CONST_EDITOR_CHOICE_HEADER_TITLE = TranslateConstants({key: TranslateKey.EDITOR_CHOICE_HEADER_TITLE})
  const EDITORS_PICK_HEADER_TITLE = TranslateConstants({key: TranslateKey.EDITORS_PICK_HEADER_TITLE})
  const _archivedArticleTitle = TranslateConstants({key: TranslateKey.ARCHIVED_ARTICLE_SECTION_TITLE})

  const { setShowMiniPlayer, setPlayerTrack, showMiniPlayer, selectedTrack: trackData } = useAppPlayer()

  const {
    isLoading,
    // topList,  // enable when toplist is required
    opinionList,podcastHome,
    sectionComboOne, sectionComboTwo, sectionComboThree, sectionComboFour, sectionComboFive, sectionComboSix, sectionComboSeven, sectionComboEight,
    coverage, featuredArticle, horizontalArticle, editorsChoice, spotlight, spotlightArticleSection, infoGraphicBlock, archivedArticleSection,
    coverageInfoLoaded, featuredArticleLoaded, horizontalArticleLoaded,
    opinionLoaded, podcastHomeLoaded, editorChoiceLoaded,
    sectionComboOneLoaded, sectionComboTwoLoaded, sectionComboThreeLoaded,
    infoGraphicBlockInfoLoaded,
    // fetchHeroListTopList, // enable when toplist is required
    fetchOpinionTopList,
    fetchSectionComboOne, fetchSectionComboTwo,
    fetchSectionComboThree, fetchSectionComboFour, fetchSectionComboFive, fetchSectionComboSix, fetchSectionComboSeven,
    fetchSectionComboEight,
    fetchPodcastHome,
    fetchCoverageBlockData, fetchFeaturedArticleData, fetchHorizontalArticleData,
    fetchEditorsChoice, fetchSpotlight, fetchInfoGraphicBlockData, fetchArchivedArticleSection,
  } = useLatestNewsTab()
  const { videoData, fetchVideoRequest } = useVideoList();

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()

  const { isLoggedIn } = useLogin()
  const { fetchProfileDataRequest } = useUserProfileData();

  const [refreshing, setRefreshing] = useState(false);
  const [coverageInfo, setCoverageInfo] = useState<MainSectionBlockType[]>(coverage)
  const [sectionComboOneInfo, setSectionComboOneInfo] = useState(sectionComboOne)
  const [sectionComboTwoInfo, setSectionComboTwoInfo] = useState(sectionComboTwo)
  const [sectionComboThreeInfo, setSectionComboThreeInfo] = useState(sectionComboThree)
  const [sectionComboFourInfo, setSectionComboFourInfo] = useState(sectionComboFour)
  const [sectionComboFiveInfo, setSectionComboFiveInfo] = useState(sectionComboFive)
  const [sectionComboSixInfo, setSectionComboSixInfo] = useState(sectionComboSix)
  const [sectionComboSevenInfo, setSectionComboSevenInfo] = useState(sectionComboSeven)
  const [sectionComboEightInfo, setSectionComboEightInfo] = useState(sectionComboEight)
  const [opinionListData, setOpinionListData] = useState([])
  const [showupUp, setShowPopUp] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);
  
  const topViewSectionData = isNonEmptyArray(featuredArticle) ? [...featuredArticle].splice(0, 2) : [];
  const gridViewSectionData = isNonEmptyArray(featuredArticle) ? [...featuredArticle].splice(2, 4) : [];
  const topViewSectionDataTwo = isNonEmptyArray(featuredArticle) ? [...featuredArticle].splice(6, 3) : [];
  const topViewSectionDataThree = isNonEmptyArray(featuredArticle) ? [...featuredArticle].splice(9, 2) : [];
  const headlineNews = isNonEmptyArray(coverageInfo) ? [...coverageInfo].splice(1, 4) : []
  const [editorsChoiceInfo, setEditorsChoiceInfo] = useState(editorsChoice)

  useFocusEffect(
    React.useCallback(() => {
      if(tabIndex === currentIndex){
        global.refFlatList = ref;
      }

    }, [])
  );


  
  const updateBookmark = (data: any[]): any => {
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

  const mainBlockUpdatedBookMark = (data: MainSectionBlockType[], index: number) => {
    const updatedData = [...data]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus
    updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
    return updatedData
  }

  useEffect(() => {
    updateCoverageData()
  }, [coverage, bookmarkIdInfo])

  const updateCoverageData = () => {
    if (isNonEmptyArray(coverage)) {
      const coverageData = updateBookmark(coverage)
      setCoverageInfo(coverageData)
    }
  }

  const updateCoverageBookMark = (index: number) => {
    if (!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    const updatedData = mainBlockUpdatedBookMark(coverageInfo, index)
    setCoverageInfo(updatedData)
  }


  useEffect(() => {
    if (isNonEmptyArray(sectionComboOne)) {
      updateSectionComboOneData()
    }
  }, [sectionComboOne, bookmarkIdInfo])

  useEffect(() => {
    const listPartition = (list: any, value: any):any => {
      return list.length ? [list.splice(0, value)].concat(listPartition(list, value)) : [];
    }
    const newData = [...opinionList]
    const data = listPartition(newData, 4)
    setOpinionListData(data)
  }, [opinionList])

  useEffect(() => {
    if (isNonEmptyArray(sectionComboFive)) {
      updateSectionComboFiveData()
    }
  }, [sectionComboFive, bookmarkIdInfo])

  useEffect(() => {
    if (isNonEmptyArray(sectionComboSix)) {
      updateSectionComboSixData()
    }
  }, [sectionComboSix, bookmarkIdInfo])

  useEffect(() => {
    if (isNonEmptyArray(sectionComboSeven)) {
      updateSectionComboSevenData()
    }
  }, [sectionComboSeven, bookmarkIdInfo])

  useEffect(() => {
    if (isNonEmptyArray(sectionComboEight)) {
      updateSectionComboEightData()
    }
  }, [sectionComboEight, bookmarkIdInfo])

  const updateSectionComboOneData = () => {
    const data = updateBookmark(sectionComboOne)
    setSectionComboOneInfo(data)
  }

  const updateSectionComboFiveData = () => {
    const data = updateBookmark(sectionComboFive)
    setSectionComboFiveInfo(data)
  }

  const updateSectionComboSixData = () => {
    const data = updateBookmark(sectionComboSix)
    setSectionComboSixInfo(data)
  }

  const updateSectionComboSevenData = () => {
    const data = updateBookmark(sectionComboSeven)
    setSectionComboSevenInfo(data)
  }

  const updateSectionComboEightData = () => {
    const data = updateBookmark(sectionComboEight)
    setSectionComboEightInfo(data)
  }

  const updatedSectionComboOneBookmark = (article: LatestArticleDataType) => {
    if (!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = sectionComboOneInfo.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(sectionComboOneInfo, index)
    setSectionComboOneInfo(updatedData)
  }

  const updatedSectionComboFiveBookmark = (article: LatestArticleDataType) => {
    if (!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = sectionComboFiveInfo.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(sectionComboFiveInfo, index)
    setSectionComboFiveInfo(updatedData)
  }

  const updatedSectionComboSixBookmark = (article: LatestArticleDataType) => {
    if (!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = sectionComboSixInfo.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(sectionComboSixInfo, index)
    setSectionComboSixInfo(updatedData)
  }

  const updatedSectionComboSevenBookmark = (article: LatestArticleDataType) => {
    if (!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = sectionComboSevenInfo.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(sectionComboSevenInfo, index)
    setSectionComboSevenInfo(updatedData)
  }

  const updatedSectionComboEightBookmark = (article: LatestArticleDataType) => {
    if (!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = sectionComboEightInfo.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(sectionComboSevenInfo, index)
    setSectionComboEightInfo(updatedData)
  }

  useEffect(() => {
    if (isNonEmptyArray(editorsChoice)) {
      updateEditorsChoiceData()
    }
  }, [editorsChoice, bookmarkIdInfo])

  const updateEditorsChoiceData = () => {
    const data = updateBookmark(editorsChoice)
    setEditorsChoiceInfo(data)
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

  const updatedEditorsChoiceBookmark = (article: EditorsChoiceDataType) => {
    if (!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const index = editorsChoiceInfo.findIndex((item) => item.nid == article.nid)
    const updatedData = updatedChangeBookmark(editorsChoiceInfo, index)
    setEditorsChoiceInfo(updatedData)
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

  const featuredArticleInfo: articleProps[] = topViewSectionData.map((item: MainSectionBlockType, index: number) => (
    {
      ...item,
      ...heroSectionProperties,
      titleColor: themeData.primaryBlack,
      tagName: item.news_categories && item.news_categories.title || '',
      isBookmarked: validateBookmark(item.nid),
      hideImage: false,
      showDivider: false,
      bodyLineCount: index <= 2 ? 2 : 3,
      author: '',
    }
  ))

  const heroListInfoOne = [...featuredArticleInfo].splice(0, 2)
  const heroListInfoTwo = [...featuredArticleInfo].splice(2, 5)
  // ENABLE WHEN TOP LIST IS REQUIRED
  // const topListData = topList.map((item: LatestArticleDataType) => (
  //   {
  //     ...item,
  //     ...shortArticleWithTagProperties,
  //     titleColor: themeData.primaryBlack,
  //     flag: item.news_categories && item.news_categories.title || '',
  //     isBookmarked: validateBookmark(item.nid)
  //   }
  // ))

  const spotlightArticleSectionData = spotlightArticleSection.map((item: LatestArticleDataType) => (
    {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
      flag: item.news_categories && item.news_categories.title || '',
      isBookmarked: validateBookmark(item.nid),
      style: mainSectionStyle.labelStyle
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
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const allDataLoad = () => {
    loadTopWidgetAPI()
  }

  const loadTopWidgetAPI = () => {
    fetchCoverageBlockData();
    fetchFeaturedArticleData();
    fetchHorizontalArticleData();
    fetchProfileDataRequest();
    fetchInfoGraphicBlockData();
  }

  const loadMiddleWidgetAPI = () => {
    fetchOpinionTopList(opinionListPayload)
    isTab && fetchVideoRequest();
    fetchPodcastHome();
    fetchEditorsChoice();
  }

  const loadBottomWidgetAPI = () => {
    fetchSectionComboOne(sectionComboOnePayload)
    fetchSectionComboTwo(sectionComboTwoPayload)
    fetchSectionComboThree(sectionComboThreePayload)
    fetchSectionComboFour(sectionComboFourPayload)
    fetchArchivedArticleSection();
    fetchSectionComboFive(sectionComboFivePayload)
    fetchSectionComboSix(sectionComboSixPayload)
    fetchSectionComboSeven(sectionComboSevenPayload)
    fetchSectionComboEight(sectionComboEightPayload)
    fetchSpotlight();
  }

  useEffect(() => {
    if (coverageInfoLoaded && featuredArticleLoaded && horizontalArticleLoaded && infoGraphicBlockInfoLoaded) {
      loadMiddleWidgetAPI()
    }
  }, [coverageInfoLoaded, featuredArticleLoaded, horizontalArticleLoaded, infoGraphicBlockInfoLoaded])

  useEffect(() => {
    if (opinionLoaded && podcastHomeLoaded && editorChoiceLoaded) {
      loadBottomWidgetAPI()
    }
  }, [opinionLoaded, podcastHomeLoaded, editorChoiceLoaded])


  const onPressArticle = (nid: string) => {
    nid && navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    if (isLoggedIn) {
      isBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.ARTICLE }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onVideoItemPress = (item: VideoItemType) => {
    navigation.navigate(ScreensConstants.VideoPlayerScreen,
      { mediaID: item.mediaId, nid: item.nid })
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const makeSignUpAlert = () => {
    setShowPopUp(true)
  }


  const onListenPodcast = (podcastData: any) => {
    if(isObjectNonEmpty(podcastData)){
      const trackPlayerData = {
        id: podcastData.nid,
        url: getPodcastUrl(podcastData.field_spreaker_episode_export),
        title: podcastData.title,
        duration: podcastData.duration,
        artist: podcastData.title,
        artwork: podcastData?.field_podcast_sect_export?.image
      }
      if((trackData && trackData.id != trackPlayerData.id) || trackData == null ) {
        setPlayerTrack(trackPlayerData);
      }
      !showMiniPlayer && setShowMiniPlayer(true);
    }

    setSelectedTrack(podcastData.nid);
    setSelectedType('PODCAST');
  }

  const goToPodcast = () => {
    const params = { sectionId: "", title: "بودكاست", keyName: "podcast" }
    navigation.navigate(ScreensConstants.SectionArticlesParentScreen, params)
  }

  const onClose = async () => {
    await TrackPlayer.reset();
  }

  const getSelectedTrack = (id: any, type: 'OPINION' | 'PODCAST') => {
    if(selectedTrack != id){
      setSelectedTrack(id);
      setSelectedType(type);
    }
  }

  const renderMobile = () => (
    <View style={mainSectionStyle.mainContainer}>
      <Divider style={mainSectionStyle.dividerTop} />
      <View style={mainSectionStyle.heroContainer}>
        <CarouselSlider coverageInfo={coverageInfo}
          onUpdateHeroBookmark={updateCoverageBookMark}
        />
      </View>
      <View style={mainSectionStyle.topNewsContainer}>
        <TopHeadLineNews data={headlineNews} />
      </View>
      {isNonEmptyArray(featuredArticleInfo) && <ArticleSection data={featuredArticleInfo} onUpdateBookmark={updateBookmarkInfo} />}
      {isNonEmptyArray(gridViewSectionData) && <ArticleGridView data={gridViewSectionData} />}
      {isNonEmptyArray(topViewSectionDataTwo) && <ArticleImageView data={topViewSectionDataTwo} />}
      {isNonEmptyArray(topViewSectionDataThree) && <ArticleImageView showImage={false} showHighlightTitle={false} data={topViewSectionDataThree} />}
      {isNonEmptyArray(infoGraphicBlock) && <InfoGraphicMapWidget 
        title={infoGraphicBlock[0].info}
        htmlContent={infoGraphicBlock[0].body}
      />}
      {isNonEmptyArray(infoGraphicBlock) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      <EditorsPickSection headerRight={CONST_EDITOR_CHOICE_HEADER_TITLE} data={editorsChoiceInfo} showHighlightTitle={false}/>
      {isNonEmptyArray(opinionListData) && <AuthorSlider data={opinionListData} selectedType={selectedType} getSelectedTrack={(id, type) => getSelectedTrack(id, type)} onClose={onClose} />}
      {isNonEmptyArray(podcastHome) &&
        <View>
          <PodcastWidget data={podcastHome} onPress={onListenPodcast} onMorePress={goToPodcast}/>
        </View>}
      
      {/* <BannerArticleSection data={editorsChoiceInfo} // Commented in the update of AMAR-1018 
        title={CONST_EDITOR_CHOICE_HEADER_TITLE}
        onPress={onPressArticle}
        onUpdateBookmark={updatedEditorsChoiceBookmark}
        isDivider
        dividerStyle={mainSectionStyle.firstBannerDivider}
        hideMore={true}
        containerStyle={mainSectionStyle.editorChoiceContainer}
      /> */}
      {/* Removed by- AMAR-928
      {isNonEmptyArray(videoData) && (
        <VideoContent data={videoData} onPress={onVideoItemPress} />
      )} */}
      <BannerArticleSection
        data={sectionComboOneInfo}
        title={_sectionComboOneTitle}
        sectionId={'10'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboOneBookmark}
      />
      {isNonEmptyArray(sectionComboOneInfo) && <Divider style={{ height: normalize(20) }} />}
      {isNonEmptyArray(sectionComboOneInfo) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      <BannerArticleSection
        data={sectionComboTwoInfo}
        title={_sectionComboTwoTitle}
        sectionId={'11'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboTwoBookmark}
      />
      {isNonEmptyArray(sectionComboTwoInfo) && <Divider style={{ height: normalize(20) }} />}
      {isNonEmptyArray(sectionComboTwoInfo) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      <BannerArticleSection
        data={sectionComboThreeInfo}
        title={_sectionComboThreeTitle}
        sectionId={'97120'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboThreeBookmark}
      />
      {isNonEmptyArray(sectionComboThreeInfo) && <Divider style={{ height: normalize(20) }} />}
      {isNonEmptyArray(sectionComboThreeInfo) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      <BannerArticleSection
        data={sectionComboFourInfo}
        title={_sectionComboFourTitle}
        sectionId={'871'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboFourBookmark}
      />
      {isNonEmptyArray(sectionComboFourInfo) && <Divider style={{ height: normalize(20) }} />}
      {isNonEmptyArray(sectionComboFourInfo) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      {isNonEmptyArray(archivedArticleSection) && <ArchiveArticleSection 
        data={archivedArticleSection}
        title={_archivedArticleTitle}
        onPress={onPressArticle}
        isDivider
        />}
      {/* Enable below code when top list required */}
      {/* {isNonEmptyArray(topListData) && (
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
      )} */}
      {isNonEmptyArray(archivedArticleSection) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      <BannerArticleSection
        data={sectionComboFiveInfo}
        title={_sectionComboFiveTitle}
        sectionId={'18'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboFiveBookmark}
        isDivider
      />
      {isNonEmptyArray(spotlight) && isNonEmptyArray(spotlightArticleSection) && (
        <View style={mainSectionStyle.articleContainer}>
          <View style={mainSectionStyle.articleTitleContainer}>
            <Label
              children={spotlight[0].title}
              style={mainSectionStyle.articleTitleStyle}
            />
          </View>
          <ShortArticle
            data={spotlightArticleSectionData}
            onPress={onPressArticle}
            onUpdateBookmark={updateBookmarkInfo}
            showSignUpPopUp={makeSignUpAlert}
            isFooterOutside={true}
          />
        </View>
      )}
      <BannerArticleSection
        data={sectionComboSixInfo}
        title={_sectionComboSixTitle}
        sectionId={'29'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboSixBookmark}
        isDivider
      />
      {isNonEmptyArray(sectionComboSixInfo) && <Divider style={{ height: normalize(20) }} />}
      {isNonEmptyArray(sectionComboSixInfo) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      <BannerArticleSection
        data={sectionComboSevenInfo}
        title={_sectionComboSevenTitle}
        sectionId={'36'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboSevenBookmark}
        isDivider
      />
      {isNonEmptyArray(sectionComboSevenInfo) && <Divider style={{ height: normalize(20) }} />}
      {isNonEmptyArray(sectionComboSevenInfo) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      <BannerArticleSection
        data={sectionComboEightInfo}
        title={_sectionComboEightTitle}
        sectionId={'66'}
        onPress={onPressArticle}
        onUpdateBookmark={updatedSectionComboEightBookmark}
        isDivider
      />
      {isNonEmptyArray(sectionComboEightInfo) && <Divider style={{ height: normalize(20) }} />}
      {isNonEmptyArray(sectionComboEightInfo) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      {showBottomSpinner()}
    </View>
  )

  const renderTabItem = () => (
    <View style={mainSectionStyle.mainContainer}>
      <Divider style={mainSectionStyle.dividerTop} />
      <View style={mainSectionStyle.heroContainer}>
        <CarouselSlider coverageInfo={coverageInfo}
          onUpdateHeroBookmark={updateCoverageBookMark}
        />
      </View>
      <View style={mainSectionStyle.topNewsContainer}>
        <TopHeadLineNews data={headlineNews} />
      </View>
      <View style={mainSectionStyle.tabSplitter}>
        <View style={mainSectionStyle.sectionWidgetContainer}>
          <ArticleSection data={heroListInfoOne}
            numColumns={2}
            showDivider={false}
            onUpdateBookmark={updateBookmarkInfo}
            listKey={flatListUniqueKey.TAB_ARTICLE_SECTION_ONE}
          />
        </View>
        {/* For future Reference */}
        {/* <View style={mainSectionStyle.verticalDivider} />
        <View style={mainSectionStyle.tabWidgetContainer}>
          <ArticleSection data={heroListInfoTwo}
            onUpdateBookmark={updateBookmarkInfo}
            listKey={flatListUniqueKey.TAB_ARTICLE_SECTION_TWO}
          />
        </View> */}
      </View>
      {isNonEmptyArray(gridViewSectionData) && <ArticleGridView data={gridViewSectionData} />}
      {isNonEmptyArray(topViewSectionDataTwo) && <ArticleImageView data={topViewSectionDataTwo} />}
      {isNonEmptyArray(topViewSectionDataThree) && <ArticleImageView showImage={false} showHighlightTitle={false} data={topViewSectionDataThree} />}
      {isNonEmptyArray(infoGraphicBlock) && <InfoGraphicMapWidget
        title={infoGraphicBlock[0].info}
        htmlContent={infoGraphicBlock[0].body}
      />}
      <EditorsPickSection headerRight={CONST_EDITOR_CHOICE_HEADER_TITLE} data={editorsChoiceInfo} showHighlightTitle={false} />
      {isNonEmptyArray(opinionListData) && <AuthorSlider data={opinionListData} selectedType={selectedType} getSelectedTrack={(id, type) => getSelectedTrack(id, type)} onClose={onClose} />}
      {isNonEmptyArray(podcastHome) &&
        <PodcastWidget data={podcastHome} onPress={onListenPodcast} onMorePress={goToPodcast} />
      }
      <View style={mainSectionStyle.tabSplitter}>
        {/* <View style={[mainSectionStyle.tabWidgetContainer,{paddingBottom:30}]}>
          <BannerArticleSection data={editorsChoiceInfo}
            title={CONST_EDITOR_CHOICE_HEADER_TITLE}
            onPress={onPressArticle}
            onUpdateBookmark={updatedEditorsChoiceBookmark}
            hideMore={true}
          />
        </View> */}
        <View style={[mainSectionStyle.tabWidgetContainer, { alignItems: 'center', backgroundColor: themeData.secondaryWhite }]}>
          {isNonEmptyArray(videoData) && (
            <VideoContent data={[...videoData].splice(0, 3)}
              onPress={onVideoItemPress}
              isTabDesign={true}
            />
          )}
        </View>
        <View style={mainSectionStyle.tabWidgetContainer}>
          <BannerArticleSection
            data={sectionComboOneInfo}
            title={_sectionComboOneTitle}
            sectionId={'10'}
            onPress={onPressArticle}
            onUpdateBookmark={updatedSectionComboOneBookmark}
          />
        </View>
      </View>
      <View style={mainSectionStyle.tabSplitter}>
        <View style={mainSectionStyle.tabWidgetContainer}>
          <BannerArticleSection
            data={sectionComboTwoInfo}
            title={_sectionComboTwoTitle}
            sectionId={'11'}
            onPress={onPressArticle}
            onUpdateBookmark={updatedSectionComboTwoBookmark}
          />
        </View>
        <View style={mainSectionStyle.tabWidgetContainer}>
          <BannerArticleSection
            data={sectionComboThreeInfo}
            title={_sectionComboThreeTitle}
            sectionId={'97120'}
            onPress={onPressArticle}
            onUpdateBookmark={updatedSectionComboThreeBookmark}
            containerStyle={{ paddingTop: 0 }}
          />
        </View>
      </View>
      {isNonEmptyArray(archivedArticleSection) && <ArchiveArticleSection
        data={archivedArticleSection}
        title={_archivedArticleTitle}
        onPress={onPressArticle}
        isDivider
      />}
      <View style={mainSectionStyle.tabSplitter}>
        <View style={mainSectionStyle.tabWidgetContainer}>
          <BannerArticleSection
            data={sectionComboFourInfo}
            title={_sectionComboFourTitle}
            sectionId={'871'}
            onPress={onPressArticle}
            onUpdateBookmark={updatedSectionComboFourBookmark}
          />
        </View>
        <View style={mainSectionStyle.tabWidgetContainer}>
          <BannerArticleSection
            data={sectionComboFive}
            title={_sectionComboFiveTitle}
            sectionId={'18'}
            onPress={onPressArticle}
            onUpdateBookmark={updatedSectionComboFourBookmark}
          />
        </View>

      </View>
      <View style={mainSectionStyle.tabSplitter}>
        <View style={mainSectionStyle.tabWidgetContainer}>
          {/* Enable below code when top list required */}
          {/* {isNonEmptyArray(topListData) && (
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
                listStyle={{marginHorizontal: normalize(20)}}
              />
            </View>
          )} */}
          {isNonEmptyArray(spotlight) && isNonEmptyArray(spotlightArticleSection) && (
            <View style={mainSectionStyle.articleContainer}>
              <View style={mainSectionStyle.articleTitleContainer}>
                <Label
                  children={spotlight[0].title}
                  style={mainSectionStyle.articleTitleStyle}
                />
              </View>
              <View style={mainSectionStyle.spotlightSectionContainer}>
                <ShortArticle
                  data={spotlightArticleSectionData}
                  onPress={onPressArticle}
                  onUpdateBookmark={updateBookmarkInfo}
                  showSignUpPopUp={makeSignUpAlert}
                  isFooterOutside={true}
                />
              </View>
            </View>
          )}
        </View>
        <View style={mainSectionStyle.tabWidgetContainer}>
          <BannerArticleSection
            data={sectionComboSixInfo}
            title={_sectionComboSixTitle}
            sectionId={'29'}
            onPress={onPressArticle}
            onUpdateBookmark={updatedSectionComboSixBookmark}
            isDivider
          />
        </View>
      </View>
      <View style={mainSectionStyle.tabSplitter}>
        <View style={mainSectionStyle.tabWidgetContainer}>
          <BannerArticleSection
            data={sectionComboSevenInfo}
            title={_sectionComboSevenTitle}
            sectionId={'36'}
            onPress={onPressArticle}
            onUpdateBookmark={updatedSectionComboSevenBookmark}
            isDivider
          />
        </View>
        <View style={mainSectionStyle.tabWidgetContainer}>
          <BannerArticleSection
            data={sectionComboEightInfo}
            title={_sectionComboEightTitle}
            sectionId={'66'}
            onPress={onPressArticle}
            onUpdateBookmark={updatedSectionComboEightBookmark}
            isDivider
          />
        </View>
      </View>
      {showBottomSpinner()}
    </View>
  )

  const renderItem = () => {
    return isTab ? renderTabItem() : renderMobile()
  }

  const showBottomSpinner = () => {
    const isMainShowing = isLoading || !coverageInfoLoaded || !featuredArticleLoaded || !horizontalArticleLoaded
    const middleWidgetLoaded = opinionLoaded && podcastHomeLoaded && editorChoiceLoaded
    const isSectionComboLoaded = sectionComboOneLoaded && sectionComboTwoLoaded && sectionComboThreeLoaded
    
    if (isMainShowing || (middleWidgetLoaded && isSectionComboLoaded)) {
      return null
    }

    return (
      <View style={{ margin: normalize(28) }}>
        <ActivityIndicator size={'large'} color={themeData.primary} />
      </View>
    )
  }

  const showSpinner = isLoading || !coverageInfoLoaded || !featuredArticleLoaded || !horizontalArticleLoaded
  return (
    <ScreenContainer edge={horizontalEdge} isLoading={showSpinner}
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert}>
      <FlatList
        ref={ref}
        onScrollBeginDrag={() => global.refFlatList = ref}
        style={mainSectionStyle.flatList}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={showMiniPlayer && mainSectionStyle.contentContainer}
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
})

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.mainBackground
    },
    tabSplitter: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: normalize(30),
      justifyContent: 'space-between',
      marginHorizontal: isTab ? 0.04 * screenWidth : 0,
    },
    sectionWidgetContainer: {
      flex: 1,
      overflow: 'hidden',
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
      height: 'auto',
      width: 1,
      backgroundColor: theme.dividerColor,
      marginVertical: normalize(30),
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
      fontSize: 33,
      color: theme.primary,
      lineHeight: 50,
      fontFamily: fonts.AwsatDigital_Bold,
    },
    topNewsContainer: {
      marginHorizontal: 0.04 * screenWidth,
      overflow: 'hidden'
    },
    heroContainer: {
      marginHorizontal: isTab ? 0.04 * screenWidth : 0,
      overflow: 'hidden'
    },
    flatList: {
      flex: 1,
      height: '100%',
    },
    editorChoiceContainer: {
      marginBottom: normalize(25),
    },
    spotlightSectionContainer: {
      marginHorizontal: 20
    },
    labelStyle: {
      lineHeight: isIOS ? 30 : 33,
      fontSize: 17,
      fontFamily: fonts.AwsatDigital_Bold
    },
    contentContainer: {
      paddingBottom: normalize(80)
    }
  })
}
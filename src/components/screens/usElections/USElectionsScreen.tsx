import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, RefreshControl, ActivityIndicator, Animated } from 'react-native';
import {
  ArticleSection, CarouselSlider,
  ArticleGridView, ArticleImageView,
  VideoContent,
  BannerArticleSection,
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import {
  ScreensConstants,
  shortArticleWithTagProperties,
  TranslateConstants,
  TranslateKey,
} from 'src/constants/Constants';
import { horizontalEdge, isIOS, isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useLatestNewsTab, useVideoList, useAppPlayer } from 'src/hooks';
import { LatestArticleDataType, MainSectionBlockType, SpotlightArticleSectionBodyGet } from 'src/redux/latestNews/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ImagesName, Styles } from 'src/shared/styles';
import TrackPlayer, { } from 'react-native-track-player';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { TopHeadLineNews } from 'src/components/molecules';
import AuthorSlider from 'src/components/organisms/AuthorSlider';
import { Label, LabelTypeProp, Overlay, WidgetHeader } from 'src/components/atoms';
import { fonts } from 'src/shared/styles/fonts';
import InfoGraphicMapWidget from 'src/components/organisms/InfoGraphicMapWidget';
import { Image } from 'src/components/atoms/image/Image'
import { ImageResize } from 'src/shared/styles/text-styles';
import { VideoItemType } from 'src/redux/videoList/types';
import { useOpinions } from 'src/hooks/useOpinions';
import { WriterOpinionsBodyGet } from 'src/redux/opinions/types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const USElectionsScreen = React.memo((
  {tabIndex, currentIndex, scrollY }:
  {tabIndex?:number; currentIndex?:number; scrollY?: any; }) => {
  const { themeData } = useTheme()
  const screenStyle = useThemeAwareObject(customStyle);
  const scrollYValue = scrollY ? scrollY : new Animated.Value(0);
  const navigation = useNavigation<StackNavigationProp<any>>()

  const ref = React.useRef(null);
  useEffect(() => {
    if(tabIndex === currentIndex){
      global.refFlatList = ref;
    }
  }, [currentIndex])


  const { showMiniPlayer } = useAppPlayer()
  const {
    isLoading,
    infoGraphicBlock, usElectionsSection, contestantsSection, spotlightArticleSection,
    usElectionsSectionLoaded,
    fetchSpotlightArticleSection, fetchUsElectionsSection, fetchContestantsSection  } = useLatestNewsTab()
  const { fetchVideoById, videoByIdData } = useVideoList();
  const {writerOpinionsData, fetchWriterOpinionsRequest} = useOpinions();

  const [refreshing, setRefreshing] = useState(false);
  const [usElections, setUsElections] = useState<MainSectionBlockType[]>(usElectionsSection)
  const [contestants, setContestants] = useState<MainSectionBlockType[]>(contestantsSection)
  const [videoData, setVideoData] = useState<VideoItemType[]>(videoByIdData)
  const [opinionListData, setOpinionListData] = useState([])
  const [showupUp, setShowPopUp] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);
  
  const headlinesCount = 4;
  const topViewCount = isTab ? 3: 2;
  const gridViewCount = isTab ? 3 : 4;
  const topViewTwoCount = 3;
  const topViewThreeCount = 2;
  const topViewStartIndex = headlinesCount + 1;
  const gridStartIndex = topViewStartIndex + topViewCount;
  const topViewTwoStartIndex = gridStartIndex + gridViewCount;
  const topViewThreeStartIndex = topViewTwoStartIndex + topViewTwoCount;

  const headlineNews = isNonEmptyArray(usElections) ? [...usElections].splice(1, headlinesCount) : []
  const topViewSectionData = isNonEmptyArray(usElections) ? [...usElections].splice(topViewStartIndex, topViewCount) : [];
  const gridViewSectionData = isNonEmptyArray(usElections) ? [...usElections].splice(gridStartIndex, gridViewCount) : [];
  const topViewSectionDataTwo = isNonEmptyArray(usElections) ? [...usElections].splice(topViewTwoStartIndex, topViewTwoCount) : [];
  const topViewSectionDataThree = isNonEmptyArray(usElections) ? [...usElections].splice(topViewThreeStartIndex, topViewThreeCount) : [];

  useFocusEffect(
    React.useCallback(() => {
      if(tabIndex === currentIndex){
        global.refFlatList = ref;
      }

    }, [])
  );

  useEffect(() => {
    if (isNonEmptyArray(usElectionsSection)) {
      setUsElections(usElectionsSection)
    }
  }, [usElectionsSection])

  useEffect(() => {
    if (isNonEmptyArray(contestantsSection)) {
      setContestants(contestantsSection)
    }
  }, [contestantsSection])

  useEffect(() => {
    if(isNonEmptyArray(videoByIdData)){
      setVideoData(videoByIdData)
    }
  }, [videoByIdData])

  useEffect(() => {
    const listPartition = (list: any, value: any):any => {
      return list.length ? [list.splice(0, value)].concat(listPartition(list, value)) : [];
    }
    const newData = [...writerOpinionsData]
    const data = listPartition(newData,4)
    setOpinionListData(data)
  }, [writerOpinionsData])

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
    fetchUsElectionsSection();
  }

  useEffect(() => {
    if (usElectionsSectionLoaded) {
      loadBottomWidgetAPI()
    }
  }, [usElectionsSectionLoaded])

  const OPINIONS_ID = '157431';
  const opinionListPayload: WriterOpinionsBodyGet = {
    tid: OPINIONS_ID,
    page: 0
  } 

  const spotlightPayload: SpotlightArticleSectionBodyGet = {
    id: 157431,
    page: 0,
    items_per_page: 20
  } 
  const loadBottomWidgetAPI = () => {
    console.warn("opinionListPayload")
    fetchWriterOpinionsRequest(opinionListPayload)
    fetchVideoById('157431');
    fetchContestantsSection();
    fetchSpotlightArticleSection(spotlightPayload);
  }

  const spotlightArticleSectionData = spotlightArticleSection.map((item: LatestArticleDataType) => (
    {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
      flag: item.news_categories && item.news_categories.title || '',
      isBookmarked: false,
      style: screenStyle.labelStyle
    }
  ))

  const onVideoItemPress = (item: VideoItemType) => {
    navigation.navigate(ScreensConstants.VideoPlayerScreen,
      { mediaID: item.mediaId, nid: item.nid, title: item.title })
  }

  const onPressArticle = (nid: string, isAlbum = false) => {
    const screenName = isAlbum ? ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN : ScreensConstants.ARTICLE_DETAIL_SCREEN;
    nid && navigation.navigate(screenName, { nid })
  }
  
  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const onClose = async () => {
    await TrackPlayer.reset();
  }

  const getSelectedTrack = (id: any, type: 'OPINION' | 'PODCAST') => {
    if(selectedTrack !== id){
      setSelectedTrack(id);
      setSelectedType(type);
    }
  }

  const renderContestantItem = ({ item }: { item: MainSectionBlockType, index: number }) => {
    return <View style={screenStyle.sliderItemContainer}>
              <Image url={item.image} style={screenStyle.image}
                    resizeMode={ImageResize.COVER}
              />
              <Overlay />
              <View style={screenStyle.slideContent}>
                  <Label labelType={LabelTypeProp.h1} children={item.title} color={Styles.color.white} />
              </View>
          </View>
  }
  const CONTESTANTS = TranslateConstants({key:TranslateKey.CONTESTANTS})
  const ELECTIONS_NEWS = TranslateConstants({key:TranslateKey.ELECTIONS_NEWS})

  const renderMobile = () => (
    <View style={screenStyle.mainContainer}>
      <Divider style={screenStyle.dividerTop} />
      <Image
          name={ImagesName.usElectionsBanner}
          style={screenStyle.bannerImage}
          resizeMode={ImageResize.CONTAIN}
      />
      <View style={screenStyle.heroContainer}>
        <CarouselSlider info={usElections}
          hideBookmark={true}
          titleOnTop={true}
          onUpdateHeroBookmark={() => true}
        />
      </View>
      <View style={screenStyle.topNewsContainer}>
        <TopHeadLineNews data={headlineNews} />
      </View>
      {isNonEmptyArray(topViewSectionData) && <ArticleSection data={topViewSectionData} hideBookmark={true} onUpdateBookmark={() => true} />}
      {isNonEmptyArray(gridViewSectionData) && <ArticleGridView showHighlightTitle={false} data={gridViewSectionData} />}
      {isNonEmptyArray(topViewSectionDataTwo) && <ArticleImageView showHighlightTitle={false} data={topViewSectionDataTwo} />}
      {isNonEmptyArray(topViewSectionDataThree) && <ArticleImageView showImage={false} showHighlightTitle={false} data={topViewSectionDataThree} />}
      {isNonEmptyArray(infoGraphicBlock) && <InfoGraphicMapWidget 
        headerTitle={infoGraphicBlock[0].info}
        htmlContent={infoGraphicBlock[0].body}
      />}
      {isNonEmptyArray(infoGraphicBlock) && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
      {isNonEmptyArray(videoData) && (
        <VideoContent data={videoData} onPress={onVideoItemPress} />
      )}     
      {isNonEmptyArray(opinionListData) && 
      <AuthorSlider data={opinionListData} 
        selectedType={selectedType} 
        getSelectedTrack={(id, type) => getSelectedTrack(id, type)} 
        onClose={onClose} tid={OPINIONS_ID} />
      }
      {isNonEmptyArray(contestants) && 
        <View style={screenStyle.contestantsContainer}>
          <WidgetHeader {...{headerLeft: {
            title: CONTESTANTS,
            color: themeData.primaryBlack,
            labelType: LabelTypeProp.title3,
            textStyle: isTab ? screenStyle.tabHeaderTextStyle : { fontFamily: fonts.AwsatDigital_Black, margin: normalize(16) }
          }}} />
          <FlatList data={contestants} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={renderContestantItem}/>
        </View>
      }
      {isNonEmptyArray(spotlightArticleSectionData) && (
        <View style={screenStyle.articleContainer}>
          <BannerArticleSection
            data={spotlightArticleSectionData}
            title={ELECTIONS_NEWS}
            sectionId={'157431'}
            onPress={onPressArticle}
            onUpdateBookmark={() => true}
          />
        </View>
      )}
      {showBottomSpinner()}
    </View>
  )

  // const renderTabItem = () => (
    // <View style={screenStyle.tabletMainContainer}>
    //   {/* <Divider style={mainSectionStyle.dividerTop} /> */}
    //   <View style = {screenStyle.topContainerSplit}>
    //     <View style = {screenStyle.topContainerWidget}>
    //       <View style={screenStyle.tabletHeroContainer}>
    //         <CarouselSlider info={coverageInfo}
    //           onUpdateHeroBookmark={updateCoverageBookMark}
    //         />
    //       </View>
    //       <View style={screenStyle.tabletTopNewsContainer}>
    //         <TopHeadLineNews data={headlineNews} tabContainerStyle={screenStyle.tabTopNewsContainerStyle} />
    //       </View>
    //      <Divider style={screenStyle.tabDividerTop} />
    //      <AdContainer unitId={HOME_UNIT_ID} size={AdContainerSize.MEDIUM}/>


    //        {/* <View>
    //         {isNonEmptyArray(videoData) && (
    //           <VideoContent data={[...videoData].splice(0, 3)}
    //             onPress={onVideoItemPress}
    //             isTabDesign={true}
    //             isVideoList = {true}
    //           />
    //         )}
    //        </View> */}
    //     </View>
    //     {/* <View style = {mainSectionStyle.articleSectionWidget}>
    //       <View style={mainSectionStyle.sectionWidgetContainer}>
    //         <ArticleSection data={heroListInfoOne}
    //           showDivider={true}
    //           onUpdateBookmark={updateBookmarkInfo}
    //           listKey={flatListUniqueKey.TAB_ARTICLE_SECTION_ONE}
    //         />
    //       </View>
    //         {isNonEmptyArray(gridViewSectionData) && 
    //           <ArticleGridView showHighlightTitle={false} data={gridViewSectionData} />
    //         }
    //     </View> */}
    //   </View>
    //   {/* For future Reference */}
    //   {/* <View style={mainSectionStyle.verticalDivider} />
    //     <View style={mainSectionStyle.tabWidgetContainer}>
    //       <ArticleSection data={heroListInfoTwo}
    //         onUpdateBookmark={updateBookmarkInfo}
    //         listKey={flatListUniqueKey.TAB_ARTICLE_SECTION_TWO}
    //       />
    //     </View> */}
    //   {/* AMAR-1097 - Hide Infographic for iPad and Tablet */}
    //   {/* {isNonEmptyArray(infoGraphicBlock) && <InfoGraphicMapWidget
    //     headerTitle={infoGraphicBlock[0].info}
    //     htmlContent={infoGraphicBlock[0].body}
    //   />} */}

    //   {/* <View> */}
    //       <View style={screenStyle.horizontalStyle}> 
    //         <ArticleSection data={heroListInfoOne}
    //           showDivider={false}
    //           onUpdateBookmark={updateBookmarkInfo}
    //           listKey={flatListUniqueKey.TAB_ARTICLE_SECTION_ONE}
    //           numColumns={3}
    //           addStyle={{marginTop: 30}}
    //         />
    //       </View> 
    //         {isNonEmptyArray(gridViewSectionData) && 
    //           <View style={screenStyle.horizontalStyle}> 
    //             <ArticleGridView showHighlightTitle={false} data={gridViewSectionData} />
    //           </View>
    //         }
    //     {/* </View> */}

    //   {isNonEmptyArray(topViewSectionDataTwo) && <View style={screenStyle.horizontalStyle}> 
    //     <ArticleImageView showHighlightTitle={false} data={topViewSectionDataTwo} />
    //     </View>}
    //   {isNonEmptyArray(topViewSectionDataThree) && <View style={screenStyle.horizontalStyle}> 
    //     <ArticleImageView showImage={false} showHighlightTitle={false} data={topViewSectionDataThree} />
    //   </View>}
    //   <EditorsPickSection headerRight={CONST_EDITOR_CHOICE_HEADER_TITLE} data={editorsChoiceInfo} showHighlightTitle={false} tabTitleStyle={screenStyle.tabTitleStyle} tabContainerStyle={screenStyle.tabContainerStyle} tabImageStyle={screenStyle.tabImageStyle} />
    //   <AdContainer unitId={HOME_UNIT_ID} size={AdContainerSize.MEDIUM}/>

    //   {isNonEmptyArray(podcastHome) && isNonEmptyArray(infoGraphicBlock) ?
    //     <View style={screenStyle.tabSplitterContainer}>
    //       <View style={[screenStyle.tabPodcastInfoWidget, isDarkMode && {paddingRight:10}]}>
    //         {isNonEmptyArray(infoGraphicBlock) && <InfoGraphicMapWidget
    //           headerTitle={infoGraphicBlock[0].info}
    //           htmlContent={infoGraphicBlock[0].body}
    //         />}
    //       </View>
    //       <View style={screenStyle.tabPodcastInfoWidget}>
    //         {isNonEmptyArray(podcastHome) &&
    //           <PodcastWidget data={podcastHome} onPress={onListenPodcast} onMorePress={goToPodcast} />
    //         }
    //       </View>
    //     </View> :
    //     <View style = {screenStyle.tabPodcastContainer}>
    //       <View>
    //         {isNonEmptyArray(podcastHome) &&
    //           <PodcastWidget data={podcastHome} onPress={onListenPodcast} onMorePress={goToPodcast} />
    //         }
    //       </View>
    //     </View>
    //   }
    //   <AdContainer unitId={HOME_UNIT_ID} size={AdContainerSize.MEDIUM}/>
    //   {/* <View style={[mainSectionStyle.tabWidgetContainer,{paddingBottom:30}]}>
    //       <BannerArticleSection data={editorsChoiceInfo}
    //         title={CONST_EDITOR_CHOICE_HEADER_TITLE}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedEditorsChoiceBookmark}
    //         hideMore={true}
    //       />
    //     </View> */}
    //   {/* Enable below code when top list required */}
    //   {/* {isNonEmptyArray(topListData) && (
    //         <View style={mainSectionStyle.articleContainer}>
    //           <View style={mainSectionStyle.articleTitleContainer}>
    //             <Label
    //               children={t('latestNewsTab.articlSection.articleTitle')}
    //               style={mainSectionStyle.articleTitleStyle}
    //             />
    //           </View>
    //           <ShortArticle
    //             data={topListData}
    //             onPress={onPressArticle}
    //             onUpdateBookmark={updateBookmarkInfo}
    //             showSignUpPopUp={makeSignUpAlert}
    //             isFooterOutside={true}
    //             listStyle={{marginHorizontal: normalize(20)}}
    //           />
    //         </View>
    //       )} */}
      
    //   <View style = {screenStyle.opinionContainer}>
    //   {isNonEmptyArray(opinionList) && 
    //   <AuthorSlider data={[...opinionList].splice(0,9)} 
    //   selectedType={selectedType} 
    //   getSelectedTrack={(id, type) => getSelectedTrack(id, type)} 
    //   onClose={onClose} 
    //   />}
    //   </View>
    //   <View style = {screenStyle.tabSplitterContainer}>
    //     <View style = {screenStyle.tabWidgetContainer}>
    //       <BannerArticleSection
    //         data={sectionComboOneInfo}
    //         title={_sectionComboOneTitle}
    //         sectionId={'10'}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedSectionComboOneBookmark}
    //         containerStyle={screenStyle.containerStyle}
    //       />
    //     </View>

    //     <View style={screenStyle.tabWidgetContainer}>
    //       <BannerArticleSection
    //         data={sectionComboTwoInfo}
    //         title={_sectionComboTwoTitle}
    //         sectionId={'11'}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedSectionComboTwoBookmark}
    //         containerStyle={screenStyle.containerStyle}
    //       />
    //     </View>
    //   </View>

    //   <View style = {screenStyle.tabSplitterContainer}>
    //     <View style={screenStyle.tabWidgetContainer}>
    //       <BannerArticleSection
    //         data={sectionComboThreeInfo}
    //         title={_sectionComboThreeTitle}
    //         sectionId={'97120'}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedSectionComboThreeBookmark}
    //         containerStyle={screenStyle.containerStyle}
    //       />
    //     </View>
    //     <View style={screenStyle.tabWidgetContainer}>
    //       <BannerArticleSection
    //         data={sectionComboFourInfo}
    //         title={_sectionComboFourTitle}
    //         sectionId={'871'}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedSectionComboFourBookmark}
    //         containerStyle={screenStyle.containerStyle}
    //       />
    //     </View>
    //   </View>

    //   {isNonEmptyArray(archivedArticleSection) &&
    //   <View style = {[screenStyle.articleContainerStyle, screenStyle.horizontalStyle]}>
    //    <ArchiveArticleSection
    //     data={archivedArticleSection}
    //     title={_archivedArticleTitle}
    //     onPress={onPressArticle}
    //     isDivider
    //   />
    //   </View>
    //   }

    //   {isNonEmptyArray(spotlight) && isNonEmptyArray(spotlightArticleSection) && (
    //     <View style={[screenStyle.articleContainer,screenStyle.mainShortArticleContainer]}>
    //       <View style={screenStyle.articleTitleContainer}>
    //         <Label
    //           children={spotlight[0].title}
    //           style={screenStyle.tabArticleTitleStyle}
    //           color = {themeData.primaryBlack}
    //         />
    //       </View>
    //       <View>
    //         <MainSectionShortArticle
    //           data={spotlightArticleSectionData}
    //           onPress={onPressArticle}
    //           onUpdateBookmark={updateBookmarkInfo}
    //           showSignUpPopUp={makeSignUpAlert}
    //           isFooterOutside={true}
    //           showLeftTitle={false}
    //           containerStyle={screenStyle.shortArticleContainerStyle}
    //         />
    //       </View>
    //     </View>
    //   )}
  
    //   <View style = {screenStyle.tabSplitterContainer}>
    //     <View style={screenStyle.tabWidgetContainer}>
    //       <BannerArticleSection
    //         data={sectionComboFiveInfo}
    //         title={_sectionComboFiveTitle}
    //         sectionId={'18'}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedSectionComboFiveBookmark}
    //         containerStyle={screenStyle.containerStyle}
    //       />
    //     </View>
    //     <View style={screenStyle.tabWidgetContainer}>
    //       <BannerArticleSection
    //         data={sectionComboSixInfo}
    //         title={_sectionComboSixTitle}
    //         sectionId={'29'}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedSectionComboSixBookmark}
    //         containerStyle={screenStyle.containerStyle}
    //         isDivider
    //       />
    //     </View>
    //   </View>

    //   <View style = {screenStyle.tabSplitterContainer}>
    //     <View style={screenStyle.tabWidgetContainer}>
    //       <BannerArticleSection
    //         data={sectionComboSevenInfo}
    //         title={_sectionComboSevenTitle}
    //         sectionId={'36'}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedSectionComboSevenBookmark}
    //         containerStyle={screenStyle.containerStyle}
    //         isDivider
    //       />
    //     </View>
    //     <View style={screenStyle.tabWidgetContainer}>
    //       <BannerArticleSection
    //         data={sectionComboEightInfo}
    //         title={_sectionComboEightTitle}
    //         sectionId={'66'}
    //         onPress={onPressArticle}
    //         onUpdateBookmark={updatedSectionComboEightBookmark}
    //         containerStyle={screenStyle.containerStyle}
    //         isDivider
    //       />
    //     </View>
    //   </View>
     
      
    //   {showBottomSpinner()}
    // </View>
  // )

  const renderItem = () => {
    return isTab ? renderMobile() : renderMobile()
  }

  const showBottomSpinner = () => {
    if (!isLoading || usElectionsSectionLoaded) {
      return null
    }

    return (
      <View style={screenStyle.loaderSyle}>
        <ActivityIndicator size={'large'} color={themeData.primary} />
      </View>
    )
  }

  const showSpinner = isLoading || !usElectionsSectionLoaded
  return (
    <ScreenContainer edge={horizontalEdge} isLoading={refreshing ? false : showSpinner}
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert}>
      <AnimatedFlatList
        ref={ref}
        onScrollBeginDrag={() => global.refFlatList = ref}
        onScroll={Animated.event(
          [{nativeEvent: { contentOffset: {y: scrollYValue}}}],
          {useNativeDriver: false}
        )}
        scrollEventThrottle={1}
        style={screenStyle.flatList}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={showMiniPlayer && screenStyle.contentContainer}
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
    bannerImage: {
        width: '100%',
        height: 'auto',
        aspectRatio: '5.2459',
    },image: {
      width: '100%',
      height: '100%'
  },
  tabHeaderTextStyle: { 
    fontFamily: fonts.AwsatDigital_Black, 
    fontSize: 25, 
    lineHeight: 36,
    margin: normalize(20)
  },
  slideContent: {
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: normalize(8),
      alignSelf: 'center',
      paddingVertical: normalize(15)
  },
    tabletMainContainer: {
      backgroundColor: theme.mainBackground,
      marginVertical: 40
    },
    sectionWidgetContainer: {
      overflow: 'hidden',
    },
    tabWidgetContainer: {
      width: '50%',
      overflow: 'hidden',
      padding: normalize(10)
    },
    dividerTop: {
      borderBottomWidth: 1,
      borderColor: theme.dividerColor,
    },
    tabDividerTop: {
      height: 1,
      backgroundColor: Styles.color.lightAlterGray,
      marginTop:10
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
    mainShortArticleContainer: {
      paddingHorizontal: 40, 
      marginBottom:20
    },
    articleTitleContainer: {
      paddingVertical: normalize(20),
    },
    articleTitleStyle: {
      fontSize: 33,
      color: theme.primary,
      lineHeight: 50,
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
    },
    topNewsContainer: {
      marginHorizontal: 0.04 * screenWidth,
      overflow: 'hidden'
    },
    tabletTopNewsContainer: {
      overflow: 'hidden',
      alignItems:'center'
    },
    tabTopNewsContainerStyle: {
      width: '75%'
    },
    heroContainer: {
      marginHorizontal: isTab ? 0.04 * screenWidth : 0,
      overflow: 'hidden'
    },
    contestantsContainer: {
      backgroundColor: theme.secondaryWhite,
    },
    tabletHeroContainer: {
      overflow: 'hidden',
    },
    flatList: {
      flex: 1,
      height: '100%',
    },
    editorChoiceContainer: {
      marginBottom: normalize(25),
    },
    labelStyle: {
      lineHeight: isIOS ? 30 : 33,
      fontSize: 17,
      fontFamily: fonts.AwsatDigital_Bold
    },
    contentContainer: {
      paddingBottom: normalize(80)
    },
    shortArticleContainer: {
      paddingBottom: 8
    },
    dividerStyle: {
      height: normalize(20)
    },
    containerStyle: {
      paddingTop: 0 
    },
    loaderSyle: {
      margin: normalize(28) 
    },
    articleContainerStyle: {
      alignItems: 'center',
    },
    imageContainer: {
      width: isTab ? '30%': 144,
    },
    leftContainerStyle: {
      width: '70%',
    },
    topContainerSplit: {
      flexDirection:'row',
      marginHorizontal: 40,
    },
    topContainerWidget: {
      flex:1,
      overflow: 'hidden',
    },
    articleSectionWidget: {
      flex:0.47,
    },
    articleSectionWidgetList: {
      flex:0.47
    },
    tabSplitterContainer:{
      flexDirection:'row',
      marginVertical:20,
      marginHorizontal: 40,
    },
    tabPodcastInfoWidget: { 
      width: '50%' ,
    },
    tabPodcastContainer: {
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:100,
      marginTop: 30,
      marginBottom: 50,
    },
    tabArticleTitleStyle: {
      fontSize: 25,
      lineHeight: 36,
      fontFamily: fonts.AwsatDigital_Black,
      textAlign: 'center',
      paddingTop: 22
    },
    shortArticleContainerStyle: {
      marginBottom: 20
    },
    opinionContainer: {
      marginBottom: 20,
      marginHorizontal: 40,
    },
    horizontalStyle: {
      marginHorizontal: 40,
    },
    tabImageStyle: {
      width: 335 ,
      height: 252,
      aspectRatio: 4/3,
    },
    tabContainerStyle: {
      width: 335 ,
    },
    tabTitleStyle: {
      color: theme.primaryBlack,
      fontSize: 25,
      lineHeight: 36,
      fontFamily: fonts.AwsatDigital_Black,
      paddingTop: 15,
    }, sliderItemContainer: {
      width: screenWidth,
      height: 1.05 * screenWidth
  }
  })
}


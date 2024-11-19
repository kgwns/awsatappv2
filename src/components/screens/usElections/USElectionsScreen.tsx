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
import { LatestArticleDataType, MainSectionBlockType } from 'src/redux/latestNews/types';
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
import FixedTouchable from '~/shared/utils/FixedTouchable';

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
  const {opinionByIdData, fetchOpinionsRequest} = useOpinions();

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

  const listPartition = (list: any, value: any):any => {
    return list.length ? [list.splice(0, value)].concat(listPartition(list, value)) : [];
  }
  useEffect(() => {
    if (opinionByIdData.length) {
      const opinions = [...opinionByIdData];
      const maxLength = Math.min(opinions.length, 16);
      const data = listPartition(opinions.splice(0, maxLength), 4)
      setOpinionListData(data)
    }
  }, [opinionByIdData]);

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
    fetchOpinionsRequest({
      nid: ELECTION_ID,
      page: 0,
      itemsPerPage: 50,
      byIdOpinions: true
    });
  }

  useEffect(() => {
    if (usElectionsSectionLoaded) {
      loadBottomWidgetAPI()
    }
  }, [usElectionsSectionLoaded])

  const ELECTION_ID = '157431';

  const loadBottomWidgetAPI = () => {
    fetchVideoById({
      id: ELECTION_ID,
      page: 0,
      items_per_page: 10
    });

    fetchSpotlightArticleSection({
      id: 157431,
      page: 0,
      items_per_page: 20
    });

    fetchContestantsSection();
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

  const onVideoPressMore = () => {
    navigation.navigate(ScreensConstants.VideoScreen,
      { sectionId: ELECTION_ID })
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
    return <FixedTouchable style={screenStyle.sliderItemContainer} onPress={() => onPressArticle(item.nid)}>
              <Image url={item.image} style={screenStyle.image}
                    resizeMode={ImageResize.COVER}
              />
              <Overlay />
              <View style={screenStyle.slideContent}>
                  <Label labelType={LabelTypeProp.h1} children={item.title} color={Styles.color.white} />
              </View>
          </FixedTouchable>
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
        <VideoContent data={videoData} onPress={onVideoItemPress} showMore onPressMore={onVideoPressMore}/>
      )}     
      {isNonEmptyArray(opinionListData) && 
        <AuthorSlider data={opinionListData} 
          selectedType={selectedType} 
          getSelectedTrack={(id, type) => getSelectedTrack(id, type)} 
          onClose={onClose} tid={ELECTION_ID}/>
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

  const showSpinner = !usElectionsSectionLoaded
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
      width: screenWidth * .8,
      height: 1.05 * screenWidth,
      margin: normalize(14)
  }
  })
}


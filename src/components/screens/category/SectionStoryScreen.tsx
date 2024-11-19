import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, ViewStyle, Animated,StyleProp} from 'react-native';
import { ShortArticle, NewsFeed, VideoContent } from '../../organisms';
import {articleEventParameter, isTab, normalize, recordLogEvent, screenHeight, screenWidth} from '../../../shared/utils';
import {SectionArticleItem, ImageArticle, FilterComponent, FilterDataType} from 'src/components/molecules';
import {FlatList} from 'react-native-gesture-handler';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {NewsViewBodyGet, NewsViewListItemType} from 'src/redux/newsView/types';
import {
  decodeHTMLTags,
  isNonEmptyArray,
  isObjectNonEmpty,
  isNotEmpty,
  dateTimeAgo,
  TimeIcon,
  getArticleImage,
  isDarkTheme,
} from 'src/shared/utils/utilities';
import {ScreensConstants} from 'src/constants/Constants';
import { useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Divider, LabelTypeProp, LoadingState} from 'src/components/atoms';
import { useAppCommon, useBookmark, useLogin } from 'src/hooks';
import { LatestArticleDataType } from 'src/redux/latestNews/types';
import { fetchNewsViewApi, fetchSubArticleSectionApi } from 'src/services/newsViewService';
import { AxiosError } from 'axios';
import { formatTopListToLatestArticleType } from 'src/redux/newsView/sagas';
import PopUp, { PopUpType } from 'src/components/organisms/popUp/PopUp';
import { decode } from 'html-entities';
import { fonts } from 'src/shared/styles/fonts';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { TopMenuItemType } from 'src/redux/topMenu/types';
import { VideoItemType } from 'src/redux/videoList/types';
import { fetchVideoListApi } from 'src/services/videoListService';
import { formatVideoData } from 'src/redux/videoList/sagas';
import { Styles } from 'src/shared/styles';
import { AnalyticsEvents, EventParameterProps } from 'src/shared/utils/analytics';
import { getCategoryUnitIdBySectionKey } from 'src/hooks/useAds';
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export type SectionStoryScreenProps = {
  sectionId: any;
  sectionKey?: string;
  tabIndex?: number;
  currentIndex?: number;
  childInfo: TopMenuItemType[];
  onUpdateChildSection?: (data: TopMenuItemType[]) => void;
  scrollY?: any;
}

export const SectionStoryScreen = React.memo(({
  sectionId,
  sectionKey,
  tabIndex,
  currentIndex,
  childInfo,
  onUpdateChildSection,
  scrollY
}: SectionStoryScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const scrollYValue = scrollY ? scrollY : new Animated.Value(0);

  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  
  const [page, setPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [heroData, setHeroData] = useState<any>([])
  const [topData, setTopData] = useState<any>([])
  const [bottomData, setBottomData] = useState<any>([])
  const [currentSectionId, setCurrentSectionId] = useState(sectionId)
  const [childSection, setChildSection] = useState(childInfo)

  const ref = React.useRef(null);
    useEffect(() => {
        if(tabIndex === currentIndex){
        global.refFlatList = ref;
        }
    }, [currentIndex])


  const heroListPayload: NewsViewBodyGet = {
    items_per_page: isTab ? 2 : 1,
    page: 0,
    offset: 0,
    sectionId: currentSectionId,
  };

  const topListPayload: NewsViewBodyGet = {
    items_per_page: 4,
    page: 0,
    offset: isTab ? 2 : 1,
    sectionId: currentSectionId,
  };

  const bottomListPayload: NewsViewBodyGet = {
    items_per_page: 10,
    page: page,
    offset: isTab ? 6 : 5,
    sectionId: currentSectionId,
  };

  const { sendBookmarkInfo, removeBookmarkedInfo,bookmarkIdInfo, validateBookmark } = useBookmark()
  const { isLoggedIn } = useLogin()

  const [heroListDataInfo,setHeroListDataInfo] = useState<NewsViewListItemType[]>([])
  const [bottomListDataInfo,setBottomListDataInfo] = useState<NewsViewListItemType[]>([])
  const [topListDataInfo,setTopListDataInfo] = useState<any[]>([])
  const [videoListData,setVideoListData] = useState<VideoItemType[]>([])
  const [showupUp,setShowPopUp] = useState(false)
  const [isBottomListLoading, setIsBottomListLoading] = useState<boolean>(false)
  const { theme } = useAppCommon();
  const isDarkMode = isDarkTheme(theme);
  const isParentSection = useMemo(() => {
    return sectionId === currentSectionId
  }, [sectionId, currentSectionId])

  useEffect(() => {
    getSectionDetail()
  }, [currentSectionId]);

  useEffect(() => {
     setCurrentSectionId(sectionId)
  }, [sectionId])

  useEffect(() => {
    getCurrentSectionId()
  }, [childInfo])

  const getCurrentSectionId = () => {
    const selectedIndex = childInfo.findIndex((item) => item.isSelected === true)
    let activeSectionId = sectionId
    if(selectedIndex > -1) {
      activeSectionId = childInfo[selectedIndex].sectionId
      const selectedItem = childInfo[selectedIndex]
      if (isNonEmptyArray(selectedItem.child)) {
        const child = selectedItem.child as TopMenuItemType[];
        const selectedSubIndex = child.findIndex((item) => item.isSelected === true)
        if (selectedSubIndex > -1) {
          activeSectionId = selectedItem.child && selectedItem.child[selectedSubIndex]?.sectionId
        }
      }
    }
    setCurrentSectionId(activeSectionId)
    setChildSection(childInfo)
    if(activeSectionId !== currentSectionId) {
      clearData()
    }
  }

  const getSectionDetail = () => {
    setInitialLoading(true);

    getHeroListData();
    getTopListData();
    getVideoListData(); 
  }

  const getHeroListData = async() => {
    try {
      const heroDataInfo = isParentSection ? await fetchNewsViewApi(heroListPayload)
        : await fetchSubArticleSectionApi(heroListPayload)
      const heroDataInfoRows = heroDataInfo.rows ?? []
      setHeroData(heroDataInfoRows)
    } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      if (errorResponse.response) {
        const errorMessage: { message: string } = errorResponse.response.data;
        console.log("🚀 getHeroListData ~ errorMessage", errorMessage)
      }
    }
  }

  const getTopListData = async() => {
    try {
      const topListInfo = isParentSection ? await fetchNewsViewApi(topListPayload)
      : await fetchSubArticleSectionApi(topListPayload) 
      const topListRows = formatTopListToLatestArticleType(topListInfo)
      setTopData(topListRows)
    } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      if (errorResponse.response) {
        const errorMessage: { message: string } = errorResponse.response.data;
        console.log("🚀 getTopListData ~ errorMessage", errorMessage)
      }
    }
  }

  const getBottomListData = async() => {
    setIsBottomListLoading(true)
    try {
      const bottomListInfo = isParentSection ? await fetchNewsViewApi(bottomListPayload)
        : await fetchSubArticleSectionApi(bottomListPayload) 
      const bottomListRows = bottomListInfo.rows ?? []
      const updatedBottomData = isNonEmptyArray(bottomListDataInfo) ? bottomListDataInfo.concat(bottomListRows) :  bottomListRows
      setBottomData(updatedBottomData)
    } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      if (errorResponse.response) {
        const errorMessage: { message: string } = errorResponse.response.data;
        setIsBottomListLoading(false)
        console.log("🚀 getBottomListData ~ errorMessage", errorMessage)
      }
    }
  }

  const getVideoListData = async() => {
    try {
      const videoListInfo = await fetchVideoListApi()
      const videoList = formatVideoData(videoListInfo)
      setVideoListData(videoList)
    } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      if (errorResponse.response) {
        const errorMessage: { message: string } = errorResponse.response.data;
        console.log("🚀 getVideoListData ~ errorMessage", errorMessage)
      }
    }
  }

  const formatFilterChildData = (childItem: TopMenuItemType[] | undefined): FilterDataType[] => {
    let childInfoData: FilterDataType[] = [];
    if (isNonEmptyArray(childItem)) {
      childInfoData = childItem!.map((item) => {
        return {
          name: item.tabName,
          isSelected: item.isSelected,
        }
      })
    }
    return childInfoData
  }

  const childFilterData: FilterDataType[] = React.useMemo(() => childSection.map((item) => {
    return {
      name: item.tabName,
      isSelected: item.isSelected,
      child: formatFilterChildData(item.child)
    }
  }), [childSection]) 

  useEffect(() => {
    getBottomListData();
  }, [currentSectionId,page]);

  const gotoNextPage = () => {
    if (!isBottomListLoading) {
      setPage(page + 1);
    }
  };

  const onPressArticle = (nid: string) => {
    nid &&
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid});
  };

  useEffect(() => {
    updateHeroListData()
  }, [heroData, bookmarkIdInfo])

  useEffect(() => {
    updateBottomListData()
  }, [bottomData,bookmarkIdInfo])

  useEffect(() => {
    updateTopListData()
  }, [topData,bookmarkIdInfo])

  const updateHeroListData = () => {
    if(isNonEmptyArray(heroData)) {
      const heroUpdatedInfo = updateBookmark(heroData)
      setHeroListDataInfo(heroUpdatedInfo)
    }
    checkLoad()
  }

  const checkLoad = () => {
    if (heroListDataInfo.length || bottomListDataInfo.length || topListDataInfo.length) {
      setInitialLoading(false)
    }
  }

  const updateBottomListData = () => {
    if(isNonEmptyArray(bottomData)) {
      const updatedBottomDataInfo = updateBookmark(bottomData)
      setBottomListDataInfo(updatedBottomDataInfo)
      setIsBottomListLoading(false)
    }
    checkLoad()
  }

  const updateTopListData = () => {
    if(isNonEmptyArray(topData)) {
      const updatedTopData: any = updateTopListBookmark(topData)
      setTopListDataInfo(updatedTopData)
    }
    checkLoad()
  }

  const updateTopListBookmark = (data: LatestArticleDataType[]) => {
    return data.map((item: LatestArticleDataType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid),
        displayType: item.displayType,
        author: '' //Need to hide author name in UI
      }
    ))
  }

  const updateBookmark = (data: NewsViewListItemType[]) => {
    return data.map((item: NewsViewListItemType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid),
        field_display_export: item.field_display_export,
        author_resource: '' //Need to hide author name in UI
      }
    ))
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean,eventParameter: EventParameterProps) => {
    if (isLoggedIn) {
      if (isBookmarked) {
        recordLogEvent(AnalyticsEvents.ARTICLE_SAVE, eventParameter)
        sendBookmarkInfo({ nid, bundle: PopulateWidgetType.ARTICLE })
      } else {
        recordLogEvent(AnalyticsEvents.ARTICLE_UNSAVE, eventParameter)
        removeBookmarkedInfo({ nid })
      }
    } else {
      makeSignUpAlert()
    }
  }

  const onPressSignUp = () => {
    setShowPopUp(false)
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  }

  const onClosePopUp = () => {
    setShowPopUp(false)
  }

  const makeSignUpAlert = () => {
    setShowPopUp(true)
  }

  const updatedHeroBookmark = (index: number) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const updatedData: any = updatedChangeBookmark(heroListDataInfo, index)
    setHeroListDataInfo(updatedData)
  }

  const updatedChangeBookmark = (data: NewsViewListItemType[], index: number) => { 
    const updatedData = [...data]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus;
    const {title,body,field_publication_date_export} = updatedData[index];
    const decodeBody = decodeHTMLTags(body);
    const eventParameter = {
      ...articleEventParameter,
      article_name: title,
      article_length: decodeBody.split(' ').length,
      article_publish_date: field_publication_date_export
    }
    updateBookmarkInfo(updatedData[index].nid, bookmarkStatus,eventParameter)
    return updatedData
  }

  const updatedNewsFeedBookmark = (index: number) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    
    const updatedData: any = updatedChangeBookmark(bottomListDataInfo, index)
    setBottomListDataInfo(updatedData)
  }

  const onVideoItemPress = (item: VideoItemType) => {
    navigation.navigate(ScreensConstants.VideoPlayerScreen,
      { mediaID: item.mediaId, nid: item.nid, title: item.title })
  }


  const onClickChildSection = (clickItemIndex: number) => {
    const oldChildSection = [...childSection]
    const lastSelectedIndex = oldChildSection.findIndex((item) => item.isSelected === true);
    if (lastSelectedIndex > -1 && isNonEmptyArray(oldChildSection[lastSelectedIndex].child)) {
      const updatedLatestChild = oldChildSection[lastSelectedIndex]
      const updatedLatestSubChild = updatedLatestChild.child?.map((childItem) => ({ ...childItem, isSelected: false }));
      updatedLatestChild.child = updatedLatestSubChild
      oldChildSection[lastSelectedIndex] = updatedLatestChild;
    }
    
    const updatedChildSection = oldChildSection.map((item,index) => {
      return {
        ...item,
        isSelected: clickItemIndex !== index ? false : !oldChildSection[index].isSelected
      }
    })

    clearData()
    onUpdateChildSection && onUpdateChildSection(updatedChildSection)
  }

  const onPressSubChild = (childIndex: number, subChildIndex: number) => {
    const spreadChildSection = [...childSection]
    const currentChild = spreadChildSection[childIndex];

    const updatedChildSection = [...spreadChildSection];
    let updatedSubChildSection: TopMenuItemType[] = [];

    if(isNonEmptyArray(currentChild.child)) {
      updatedSubChildSection = currentChild.child!.map((item,index) => {
        return {
          ...item,
          isSelected: subChildIndex !== index ? false : item.isSelected && item.isSelected === true ? false : true
        }
      })
    }
    updatedChildSection[childIndex].child = updatedSubChildSection;

    clearData()
    onUpdateChildSection && onUpdateChildSection(updatedChildSection)
  }

  const clearData = () => {
    setHeroListDataInfo([])
    setTopListDataInfo([])
    setBottomListDataInfo([])
    setVideoListData([])
  }

  const renderFilterComponent = () => {
    if(!isNonEmptyArray(childFilterData)) {
      return null
    }

    return (
      <View style={style.filterContainer}>
        <FilterComponent data={childFilterData} onPress={onClickChildSection} onPressSubChild={onPressSubChild}/>
      </View>
    ) 
  }

  const renderBannerArticle = () => {
    const bannerData = isNonEmptyArray(heroListDataInfo) ? heroListDataInfo[0] : {} as NewsViewListItemType
    return (
      <>
        {isObjectNonEmpty(bannerData) && (
          <ImageArticle
            image={getArticleImage(bannerData.field_image, bannerData.field_new_photo)}
            title={isNotEmpty(bannerData.title) ? decode(bannerData.title) : ''}
            body={bannerData.body}
            author={''} //No need to author name
            nid={bannerData.nid}
            created={bannerData.changed.toString()}
            isBookmarked={bannerData.isBookmarked}
            onPressBookmark={() => updatedHeroBookmark(0)}
            hasTabletLayout={isTab ? true : false}
            containerStyle={style.imageArticleContainerStyle}
            // rightContainerStyle={style.footerRightStyle}  enable to align footer center
            textStyles={style.textStyle}
            contentStyle={style.imageArticleContentStyle}
            titleStyle={style.titleStyle}
            displayType={bannerData.field_display_export}
          />
        )}
      </>
    )
  }

  const renderArticleStory = () => {
    const articleData = isNonEmptyArray(heroListDataInfo) && heroListDataInfo.length > 1 ? heroListDataInfo[1] : {} as NewsViewListItemType

    if (!isObjectNonEmpty(articleData)) {
      return null
    }
    const timeFormat = dateTimeAgo(articleData.created_export)
    return (
      <View style={style.sectionStoryContainer}>
        <SectionArticleItem
          headerTitle={decodeHTMLTags(articleData.title)}
          body={decodeHTMLTags(articleData.body)}
          image={getArticleImage(articleData.field_image, articleData.field_new_photo)}
          imageStyle={style.storyImageStyle}
          nid={articleData.nid}
          isBookmarked={articleData.isBookmarked}
          onPressBookmark={() => updatedHeroBookmark(1)}
          showDivider={true}
          leftTitle={''} //Need to hide author name in UI
          rightTitle={timeFormat.time}
          leftTitleColor={themeData.primary}
          rightIcon={() => TimeIcon(timeFormat.icon)}
          rightTitleColor={ themeData.footerTextColor}
          displayType={articleData.field_display_export}
          articleTextStyle = {isTab ? style.articleTextStyle : {}}
        />
      </View>
    )
  }

  const renderTopArticle = () => {
    return (
      <>
        {isNonEmptyArray(topListDataInfo) && (
          <View>
            {!isTab && <View style={style.dividerView}>
              <Divider style={style.divider} />
            </View>}
          <ShortArticle
            data={topListDataInfo}
            onPress={onPressArticle}
            labelType={LabelTypeProp.title4}
            onUpdateBookmark={updateBookmarkInfo}
            showSignUpPopUp={makeSignUpAlert}
            hideImage={true}
            containerStyle={style.shortContainer}
            leftContainerStyle={isTab && style.leftContainerStyle}
            titleColor = {isTab && themeData.primaryBlack}
            rightTitleColor = {isTab && isDarkMode ? themeData.summaryColor : Styles.color.black900}
            articleTextStyle = {isTab && style.articleTextStyle}
            rightTitleStyle={isTab && style.rightTitleStyle}
            showTabStyle={!isTab}
          />
          </View>
        )}
      </>
    )
  }

  const renderSectionWidget = () => (
    <>
      { !isTab && renderBannerArticle()}
      {isTab ? <> 
        <View style={[style.storyAndTopArticle, !isTab && { flex: 1 }]}>
        <View style={[style.tabWidgetContainer]}>
          {renderBannerArticle()}
        </View>
        {/* <View style={style.verticalDivider} /> */}
        <View style={[style.tabWidgetContainer,{width:'40%'}]}>
          {renderArticleStory()}
          {renderTopArticle()}
        </View>
      </View> 
        {isNonEmptyArray(videoListData) && <View style={style.videoContainer}>
          <VideoContent data={videoListData} onPress={onVideoItemPress} />
        </View>}
      </>:
        <>
          {renderTopArticle()}
        </>
      }
      <AdContainer unitId={getCategoryUnitIdBySectionKey(sectionId)} size={AdContainerSize.MEDIUM}/>
      {!isTab && <Divider style={style.divider} />}
      <View style={style.newsFeedContainer}>
        <NewsFeed
          data={bottomListDataInfo}
          onScroll={() => gotoNextPage()}
          isLoading={isBottomListLoading}
          onUpdateNewsFeedBookmark={updatedNewsFeedBookmark}
          labelContainerStyle = { style.labelContainerStyle}
          categoryUnitId={getCategoryUnitIdBySectionKey(sectionId)}
        />
      </View>
    </>
  )

  const renderItem = () => {
    return (
      <View style={{ backgroundColor: themeData.backgroundColor}}>
          {renderFilterComponent()}
          {initialLoading ? loadingView({ height: 0.60 * screenHeight }) : renderSectionWidget()}
      </View>
    );
  }

  const loadingView = (moreStyle?: StyleProp<ViewStyle>) => (
    <View style={[style.loaderContainer, moreStyle]}>
      <LoadingState />
    </View>
  )

  return (
    <View style={style.contentContainer}>
      {(initialLoading && sectionId === currentSectionId)  ? loadingView() :
       <AnimatedFlatList
       ref={ref}
       onScrollBeginDrag={() => global.refFlatList = ref}
       onScroll={Animated.event(
        [{nativeEvent: { contentOffset: {y: scrollYValue}}}],
        {useNativeDriver: false}
      )}
      scrollEventThrottle={16}
      data={[{}]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      />
      }
       <PopUp type={PopUpType.rbSheet}
        onPressButton={onPressSignUp}
        showPopUp={showupUp}
        onClosePopUp={onClosePopUp} />
    </View>
  );
});

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
    loaderContainer : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      flex: 1
    },
    tabWidgetContainer: {
      width: '60%',
      overflow: 'hidden',
    },
    storyImageStyle: {
      height: isTab ? normalize(189) : 0.52 * screenWidth,
      paddingHorizontal: normalize(10),
      width: 'auto',
      aspectRatio: 1.78,
    },
    storyAndTopArticle: {
      flexDirection: 'row',
      paddingTop: isTab ? 0 : normalize(15),
      justifyContent: 'space-between',
      marginHorizontal: isTab ? 30 : 0,
    },
    sectionStoryContainer: {
      paddingTop: isTab ? 0 : normalize(15), 
      paddingHorizontal: isTab ? 0 : 0.04 * screenWidth,
    },
    verticalDivider: {
      height: '100%',
      width: 1,
      backgroundColor: theme.dividerColor,
    },
    footerRightStyle: {
      flex: 0
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    },
    dividerView: {
      marginBottom: 10,
      paddingHorizontal: 0.04 * screenWidth,
    },
    shortContainer: {
      paddingBottom: 0
    },
    imageArticleContainerStyle: {
      width: '100%',
      height: 'auto',
      aspectRatio: 1.34,
      paddingRight: isTab ? normalize(15) : 0,
    },
    imageArticleContentStyle: {
      paddingRight: isTab ? normalize(20) : 0
    },
    videoContainer: {
      paddingLeft: isTab ? 30 : 0,
      backgroundColor: isTab ? theme.sectionStoryVideo : theme.secondaryWhite
    },
    newsFeedContainer: {
      paddingHorizontal: isTab ? normalize(10) : 0
    },
    titleStyle:{
      textAlign:'center',
      fontSize: isTab ? 32 : 24,
      lineHeight: isTab ? 47 : 40,
      fontFamily: fonts.AwsatDigital_Black,
    },
    textStyle:{
        textAlign:'left',
        writingDirection: 'rtl',
        fontSize: isTab ? 18 : 16,
        lineHeight: isTab ? 29 : 28,
        fontFamily: isTab ? fonts.Effra_Arbc_Regular : fonts.IBMPlexSansArabic_Regular,
        color: theme.summaryColor,
    },
    filterContainer: {
      paddingHorizontal: isTab ? 30 : 0.02 * screenWidth,
      paddingVertical: 10,
      backgroundColor: theme.backgroundColor,
    },
    leftContainerStyle: {
      width: (screenWidth * 0.5 - 40) -  144,
    },
    articleTextStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontWeight: '700',
      fontSize: 18,
      lineHeight: 29,
    },
    rightTitleStyle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      fontWeight: '400',
      fontSize: 13,
      lineHeight: 16
    },
    labelContainerStyle: {
      marginBottom: isTab ? 10 : 0
    }
  });
};

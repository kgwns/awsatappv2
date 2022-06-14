import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ShortArticle, NewsFeed, VideoContent} from '../../organisms';
import {isTab, normalize, screenWidth} from '../../../shared/utils';
import {SectionArticleItem, ImageArticle} from 'src/components/molecules';
import {FlatList} from 'react-native-gesture-handler';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {NewsViewBodyGet, NewsViewListItemType} from 'src/redux/newsView/types';
import {
  getImageUrl,
  decodeHTMLTags,
  isNonEmptyArray,
  isObjectNonEmpty,
  isNotEmpty,
  dateTimeAgo,
  TimeIcon,
  getArticleImage,
} from 'src/shared/utils/utilities';
import {ScreensConstants} from 'src/constants';
import { useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Divider, LabelTypeProp, LoadingState} from 'src/components/atoms';
import { useBookmark, useLogin } from 'src/hooks';
import { LatestArticleDataType } from 'src/redux/latestNews/types';
import { VideoItemType } from 'src/redux/videoList/types';
import { fetchNewsViewApi } from 'src/services/newsViewService';
import { AxiosError } from 'axios';
import { formatTopListToLatestArticleType } from 'src/redux/newsView/sagas';
import { fetchVideoListApi } from 'src/services/videoListService';
import { formatVideoData } from 'src/redux/videoList/sagas';
import PopUp, { PopUpType } from 'src/components/organisms/popUp/PopUp';
import { decode } from 'html-entities';
import { fonts } from 'src/shared/styles/fonts';

export const SectionStoryScreen = React.memo(({sectionId, tabIndex, currentIndex}: {sectionId: any; tabIndex?: number; currentIndex?:number }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  
  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  
  const [page, setPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [heroData, setHeroData] = useState<any>([])
  const [topData, setTopData] = useState<any>([])
  const [bottomData, setBottomData] = useState<any>([])

  const ref = React.useRef(null);
    useEffect(() => {
        if(tabIndex === currentIndex){
        global.refFlatList = ref;
        }
    }, [currentIndex])


  const heroListPayload: NewsViewBodyGet = {
    items_per_page: 2,
    page: 0,
    offset: 0,
    sectionId: sectionId,
  };

  const topListPayload: NewsViewBodyGet = {
    items_per_page: 4,
    page: 0,
    offset: 2,
    sectionId: sectionId,
  };

  const bottomListPayload: NewsViewBodyGet = {
    items_per_page: 10,
    page: page,
    offset: 6,
    sectionId: sectionId,
  };

  const { sendBookmarkInfo, removeBookmarkedInfo,bookmarkIdInfo } = useBookmark()
  const { isLoggedIn } = useLogin()

  const [heroListDataInfo,setHeroListDataInfo] = useState<NewsViewListItemType[]>([])
  const [bottomListDataInfo,setBottomListDataInfo] = useState<NewsViewListItemType[]>([])
  const [topListDataInfo,setTopListDataInfo] = useState<any[]>([])
  const [videoListData,setVideoListData] = useState<VideoItemType[]>([])
  const [showupUp,setShowPopUp] = useState(false)
  const [isBottomListLoading, setIsBottomListLoading] = useState<boolean>(false)

  useEffect(() => {
    // makeInitialDataEmpty();
    setInitialLoading(true);

    getHeroListData();
    getTopListData();
    getVideoListData();
  }, [sectionId]);

  const getHeroListData = async() => {
    try {
      const heroDataInfo = await fetchNewsViewApi(heroListPayload)
      const heroData = heroDataInfo.rows ?? []
      setHeroData(heroData)
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
      const topListInfo = await fetchNewsViewApi(topListPayload)
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
      const bottomListInfo = await fetchNewsViewApi(bottomListPayload)
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

  useEffect(() => {
    getBottomListData();
  }, [sectionId,page]);

  const gotoNextPage = () => {
    setPage(page + 1);
  };

  const onPressArticle = (nid: string) => {
    nid &&
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: nid});
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
        author: '' //Need to hide author name in UI
      }
    ))
  }

  const updateBookmark = (data: NewsViewListItemType[]) => {
    return data.map((item: NewsViewListItemType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid),
        author_resource: '' //Need to hide author name in UI
      }
    ))
  }

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    if (isLoggedIn) {
      isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
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
    updatedData[index].isBookmarked = bookmarkStatus
    updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
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
      { mediaID: item.mediaId, nid: item.nid })
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
            created={bannerData.created_export.toString()}
            isBookmarked={bannerData.isBookmarked}
            onPressBookmark={() => updatedHeroBookmark(0)}
            hasTabletLayout={isTab ? true : false}
            containerStyle={style.imageArticleContainerStyle}
            // rightContainerStyle={style.footerRightStyle}  enable to align footer center
            textStyles={style.textStyle}
            contentStyle={style.imageArticleContentStyle}
            titleStyle={style.titleStyle}
          />
        )}
      </>
    )
  }

  const renderArticleStory = () => {
    const articleData = isNonEmptyArray(heroListDataInfo) && heroListDataInfo.length > 1 ? heroListDataInfo[1] : {} as NewsViewListItemType

    if (!isObjectNonEmpty(articleData)) return null
    const timeFormat = dateTimeAgo(articleData.created_export)
    return (
      <View style={style.sectionStoryContainer}>
        <SectionArticleItem
          headerTitle={articleData.title}
          body={decodeHTMLTags(articleData.body)}
          image={getImageUrl(articleData.field_image)}
          imageStyle={style.storyImageStyle}
          nid={articleData.nid}
          isBookmarked={articleData.isBookmarked}
          onPressBookmark={() => updatedHeroBookmark(1)}
          showDivider={isTab ? false : true}
          leftTitle={''} //Need to hide author name in UI
          rightTitle={timeFormat.time}
          leftTitleColor={themeData.primary}
          rightIcon={() => TimeIcon(timeFormat.icon)}
          rightTitleColor={colors.silverChalice}
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
            hideImage={!isTab}
            containerStyle={style.shortContainer}
          />
          </View>
        )}
      </>
    )
  }

  const renderItem = () => {
    return (
      <View style={{ backgroundColor: themeData.backgroundColor }}>
        {renderBannerArticle()}
        {
          isTab ? <View style={style.storyAndTopArticle}>
            <View style={[style.tabWidgetContainer]}>
              {renderArticleStory()}
            </View>
            <View style={style.verticalDivider} />
            <View style={style.tabWidgetContainer}>
              {renderTopArticle()}
            </View>
          </View> :
            <>
              {renderTopArticle()}
            </>
        }
        <View style={style.videoContainer}>
          <VideoContent data={videoListData} onPress={onVideoItemPress} />
        </View>
        <View style={style.newsFeedContainer}>
          <NewsFeed
            data={bottomListDataInfo}
            onScroll={() => gotoNextPage()}
            isLoading={isBottomListLoading}
            onUpdateNewsFeedBookmark={updatedNewsFeedBookmark}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={style.contentContainer}>
      {!initialLoading  ? <FlatList
       ref={ref}
       onScrollBeginDrag={() => global.refFlatList = ref}
      data={[{}]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      /> :
      <View style={style.loaderContainer}>
        <LoadingState />
      </View>
      }
       <PopUp type={PopUpType.rbSheet}
        onPressButton={onPressSignUp}
        showPopUp={showupUp}
        onClosePopUp={onClosePopUp} />
    </View>
  );
});

const customStyle = (theme: CustomThemeType) => {
  const sectionStoryStyle = StyleSheet.create({
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
      flex: 0.47,
      overflow: 'hidden',
    },
    storyImageStyle: {
      height: isTab ? normalize(189) : 0.52 * screenWidth,
      paddingHorizontal: normalize(10),
      width: 'auto',
      aspectRatio: 1.78,
    },
    storyAndTopArticle: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: normalize(15),
      justifyContent: 'space-between',
      marginHorizontal: isTab ? 0.04 * screenWidth : 0,
    },
    sectionStoryContainer: {
      paddingTop: isTab ? 0 : normalize(15), 
      paddingHorizontal: isTab ? 5 : 0.04 * screenWidth,
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
      paddingBottom: isTab ? 20 : 0
    },
    imageArticleContainerStyle: {
      width: '100%',
      height: 'auto',
      aspectRatio: 1.62,
      paddingHorizontal: isTab ? 0.04 * screenWidth : 0,
    },
    imageArticleContentStyle: {
      paddingHorizontal: isTab ? 0.04 * screenWidth : 0
    },
    videoContainer: {
      paddingLeft: isTab ? 0.02 * screenWidth : 0,
      backgroundColor:theme.secondaryWhite
    },
    newsFeedContainer: {
      paddingHorizontal: isTab ? 0.02 * screenWidth : 0
    },
    titleStyle:{
      textAlign:'center',
      fontSize: 24,
      lineHeight: 36,
      fontFamily: fonts.AwsatDigitalBetav10_Black,
    },
    textStyle:{
        textAlign:'justify',
        writingDirection: 'rtl',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: fonts.IBMPlexSansArabic_Regular,
    }
  });
  return sectionStoryStyle;
};

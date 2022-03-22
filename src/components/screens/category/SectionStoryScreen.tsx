import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ShortArticle, NewsFeed, AlertModal, VideoContent} from '../../organisms';
import {isTab, normalize, screenWidth} from '../../../shared/utils';
import {SectionArticleItem, ImageArticle} from 'src/components/molecules';
import {FlatList} from 'react-native-gesture-handler';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useNewsView} from 'src/hooks/useNewsview';
import {NewsViewBodyGet, NewsViewListItemType} from 'src/redux/newsView/types';
import {
  getImageUrl,
  decodeHTMLTags,
  isNonEmptyArray,
} from 'src/shared/utils/utilities';
import {ScreensConstants} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LabelTypeProp, LoadingState} from 'src/components/atoms';
import { useBookmark, useLogin, useVideoList } from 'src/hooks';
import { LatestArticleDataType } from 'src/redux/latestNews/types';
import { useTranslation } from 'react-i18next';
import { videoTabData } from 'src/constants/SampleData';
import { VideoItemType } from 'src/redux/videoList/types';

export const SectionStoryScreen = ({sectionId}: {sectionId: any;}) => {
  const [t] = useTranslation()
  
  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [page, setPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

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

  const {
    isLoading,
    heroListData,
    topListData,
    bottomListData,
    fetchHeroListRequest,
    fetchTopListRequest,
    fetchBottomListRequest,
    emptyAllListData,
  } = useNewsView();

  const { sendBookmarkInfo, removeBookmarkedInfo,bookmarkIdInfo } = useBookmark()
  const { isLoggedIn } = useLogin()

  useEffect(() => {
    emptyAllListData();
    makeInitialDataEmpty();
    setInitialLoading(true);
    fetchHeroListRequest(heroListPayload);
    fetchTopListRequest(topListPayload);
  }, [sectionId]);

  const makeInitialDataEmpty = () => {
    setHeroListDataInfo([]);
    setBottomListDataInfo([]);
    setTopListDataInfo([]);
    setVideolistData([]);
  }

  const {videoData,fetchVideoRequest} = useVideoList();

  useEffect(() => {
    return () => emptyAllListData()
  }, []);

  useEffect(() => {
    fetchBottomListRequest(bottomListPayload);
  }, [sectionId,page]);

  useEffect(() => {
    fetchVideoRequest();
  }, [sectionId]);

  const gotoNextPage = () => {
    setPage(page + 1);
  };

  const onPressArticle = (nid: string) => {
    nid &&
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: nid});
  };

  const [heroListDataInfo,setHeroListDataInfo] = useState(heroListData)
  const [bottomListDataInfo,setBottomListDataInfo] = useState(bottomListData)
  const [topListDataInfo,setTopListDataInfo] = useState(topListData)
  const [videolistData,setVideolistData] = useState<VideoItemType[]>([])
  const [showupUp,setShowPopUp] = useState(false)


  useEffect(() => {
    updateHeroListData()
  }, [heroListData,bookmarkIdInfo])

  useEffect(() => {
    updateBottomListData()
  }, [bottomListData,bookmarkIdInfo])

  useEffect(() => {
    updateTopListData()
  }, [topListData,bookmarkIdInfo])

  useEffect(() => {
    setVideolistData(videoData)
  }, [videoData])

  const updateHeroListData = () => {
    if(isNonEmptyArray(heroListData)) {
      const heroData = updateBookmark(heroListData)
      setHeroListDataInfo(heroData)
    }
    checkLoad()
  }

  const checkLoad = () => {
    if(heroListDataInfo.length || bottomListDataInfo.length || topListDataInfo.length ){
      setInitialLoading(false)
    }
  }

  const updateBottomListData = () => {
    if(isNonEmptyArray(bottomListData)) {
      const bottomData = updateBookmark(bottomListData)
      setBottomListDataInfo(bottomData)
    }
    checkLoad()
  }

  const updateTopListData = () => {
    if(isNonEmptyArray(topListData)) {
      const topData = updateTopListBookmark(topListData)
      setTopListDataInfo(topData)
    }
    checkLoad()
  }

  const updateTopListBookmark = (data: LatestArticleDataType[]) => {
    return data.map((item: LatestArticleDataType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
  }

  const updateBookmark = (data: NewsViewListItemType[]) => {
    return data.map((item: NewsViewListItemType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
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

  const onCloseSignUpAlert = () => {
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

    const updatedData = updatedChangeBookmark(heroListDataInfo, index)
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
    
    const updatedData = updatedChangeBookmark(bottomListDataInfo, index)
    setBottomListDataInfo(updatedData)
  }

  const onVideoItemPress = (item: VideoItemType) => {
    navigation.navigate(ScreensConstants.VideoPlayerScreen,
      { videoUrl: item.field_mp4_link_export, nid: item.nid })
  }

  const renderItem = () => (
    <View style={{backgroundColor: themeData.backgroundColor}}>
      {isNonEmptyArray(heroListDataInfo) && heroListDataInfo[0] && (
        <ImageArticle
          image={getImageUrl(heroListDataInfo[0].field_image)}
          title={heroListDataInfo[0].title}
          containerStyle={isTab ? style.tabletImageStyle : style.imageStyle}
          author={heroListDataInfo[0].author_resource}
          nid={heroListDataInfo[0].nid}
          created={heroListDataInfo[0].created_export.toString()} 
          isBookmarked={heroListDataInfo[0].isBookmarked} 
          onPressBookmark={()=>updatedHeroBookmark(0)}/>
      )}
      {isNonEmptyArray(heroListDataInfo) && heroListDataInfo[1] && (
        <View
          style={{paddingTop: normalize(15), paddingHorizontal: normalize(15)}}>
          <SectionArticleItem
            headerTitle={heroListDataInfo[1].title}
            body={decodeHTMLTags(heroListDataInfo[1].body)}
            image={getImageUrl(heroListDataInfo[1].field_image)}
            imageStyle={{
              height: normalize(0.52 * screenWidth),
              paddingHorizontal: normalize(10),
            }}
            hideFooter={true}
            nid={heroListDataInfo[1].nid}
            isBookmarked={heroListDataInfo[1].isBookmarked}
            onPressBookmark={()=>updatedHeroBookmark(1)}
          />
        </View>
      )}
      {isNonEmptyArray(topListDataInfo) && (
        <ShortArticle
          data={topListDataInfo}
          onPress={onPressArticle}
          labelType={LabelTypeProp.h3}
          onUpdateBookmark={updateBookmarkInfo}
          showSignUpPopUp={makeSignUpAlert}
        />
      )}
      <VideoContent data={videolistData} onPress={onVideoItemPress} />
      <NewsFeed
        data={bottomListDataInfo}
        onScroll={() => gotoNextPage()}
        isLoading={isLoading}
        onUpdateNewsFeedBookmark={updatedNewsFeedBookmark}
      />
    </View>
  );
  return (
    <View style={style.contentContainer}>
      {showupUp && <AlertModal
        title={t('signUpAlert.subscribe')}
        message={t('signUpAlert.description')}
        buttonText={t('signUpAlert.signUp')}
        isVisible={showupUp}
        onPressSuccess={onPressSignUp}
        onClose={onCloseSignUpAlert}
      />
      }
      {!initialLoading  ? <FlatList
      data={[{}]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      /> :
      <View style={style.loaderContainer}>
        <LoadingState />
      </View>
      }
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const sectionStoryStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
    imageStyle: {
      height: 1.05 * screenWidth,
    },
    tabletImageStyle: {
      height: 0.5 * screenWidth,
    },
    loaderContainer : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      flex: 1
    }
  });
  return sectionStoryStyle;
};

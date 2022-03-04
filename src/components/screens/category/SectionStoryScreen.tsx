import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ShortArticle, NewsFeed} from '../../organisms';
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
import {LabelTypeProp} from 'src/components/atoms';
import { useBookmark } from 'src/hooks';
import { LatestArticleDataType } from 'src/redux/latestNews/types';

export const SectionStoryScreen = ({sectionId}: {sectionId: any;}) => {
  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [page, setPage] = useState(0);

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

  useEffect(() => {
    emptyAllListData();
    fetchHeroListRequest(heroListPayload);
    fetchTopListRequest(topListPayload);
  }, [sectionId]);

  useEffect(() => {
    emptyAllListData();
    fetchHeroListRequest(heroListPayload);
    fetchTopListRequest(topListPayload);
  }, [sectionId]);

  useEffect(() => {
    fetchBottomListRequest(bottomListPayload);
  }, [sectionId,page]);

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


  useEffect(() => {
    updateHeroListData()
  }, [heroListData,bookmarkIdInfo])

  useEffect(() => {
    updateBottomListData()
  }, [bottomListData,bookmarkIdInfo])

  useEffect(() => {
    updateTopListData()
  }, [topListData,bookmarkIdInfo])

  const updateHeroListData = () => {
    if(isNonEmptyArray(heroListData)) {
      const heroData = updateBookmark(heroListData)
      setHeroListDataInfo(heroData)
    }
  }

  const updateBottomListData = () => {
    if(isNonEmptyArray(bottomListData)) {
      const bottomData = updateBookmark(bottomListData)
      setBottomListDataInfo(bottomData)
    }
  }

  const updateTopListData = () => {
    if(isNonEmptyArray(topListData)) {
      const topData = updateTopListBookmark(topListData)
      setTopListDataInfo(topData)
    }
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
    isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
  }


  const updatedHeroBookmark = (index: number) => {
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
    const updatedData = updatedChangeBookmark(bottomListDataInfo, index)
    setBottomListDataInfo(updatedData)
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
        />
      )}
      {/* <VideoContent data={videoTabData} /> */}
      <NewsFeed
        data={bottomListDataInfo}
        onScroll={() => gotoNextPage()}
        isLoading={isLoading}
        onUpdateNewsFeedBookmark={updatedNewsFeedBookmark}
      />
    </View>
  );
  return (
    <View>
      <FlatList
      data={[{}]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      />
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
  });
  return sectionStoryStyle;
};

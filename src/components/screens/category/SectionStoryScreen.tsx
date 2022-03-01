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

  useEffect(() => {
    formatTopicListData(topListData);
  }, [topListData]);

  interface TopList {
    title: string;
    body: string;
    nid: string;
    image: string;
    news_categories: NewsCategoriesType;
    author: string;
    created: Date;
  }

  interface NewsCategoriesType {
    id?: string;
    title?: string;
    url?: string;
    bundle?: string;
    name?: string;
  }

  const [topList] = useState<TopList[]>([]);
  //formatted key of topList data for short article
  const formatTopicListData = (topListData: NewsViewListItemType[]) => {
    for (let i = 0; i < topListData.length; i++) {
      topList.splice(0, 1);
    }
    for (let i = 0; i < topListData.length; i++) {
      topList?.push({
        title: topListData[i].title,
        body: topListData[i].body,
        nid: topListData[i].nid,
        image: topListData[i].field_image,
        news_categories: topListData[i].field_news_categories_export,
        author: topListData[i].author_resource,
        created: topListData[i].created_export,
      });
    }
  };

  const renderItem = () => (
    <View style={{backgroundColor: themeData.backgroundColor}}>
      {isNonEmptyArray(heroListData) && heroListData[0] && (
        <ImageArticle
          image={getImageUrl(heroListData[0].field_image)}
          title={heroListData[0].title}
          containerStyle={isTab ? style.tabletImageStyle : style.imageStyle}
          author={heroListData[0].author_resource}
          nid={heroListData[0].nid}
          created={heroListData[0].created_export.toString()}
        />
      )}
      {isNonEmptyArray(heroListData) && heroListData[1] && (
        <View
          style={{paddingTop: normalize(15), paddingHorizontal: normalize(15)}}>
          <SectionArticleItem
            headerTitle={heroListData[1].title}
            body={decodeHTMLTags(heroListData[1].body)}
            image={getImageUrl(heroListData[1].field_image)}
            imageStyle={{
              height: normalize(0.52 * screenWidth),
              paddingHorizontal: normalize(10),
            }}
            hideFooter={true}
            nid={heroListData[1].nid}
          />
        </View>
      )}
      {isNonEmptyArray(topList) && (
        <ShortArticle
          data={topList}
          onPress={onPressArticle}
          labelType={LabelTypeProp.h3}
        />
      )}
      {/* <VideoContent data={videoTabData} /> */}
      <NewsFeed
        data={bottomListData}
        onScroll={() => gotoNextPage()}
        isLoading={isLoading}
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

import { View, StyleSheet, FlatList, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import {Image} from '../atoms/image/Image';
import { isTab, normalize, screenWidth} from '../../shared/utils';
import { Divider, Label, LabelTypeProp } from '../atoms';
import {ImageResize} from '../../shared/styles/text-styles';
import {flatListUniqueKey, ScreensConstants} from '../../constants/Constants';
import {SectionVideoFooter} from '../molecules';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {NewsViewListItemType} from 'src/redux/newsView/types';
import {
  decodeHTMLTags,
  isNotEmpty,
  dateTimeAgo,
  TimeIcon,
  getArticleImage,
  isDarkTheme,
} from 'src/shared/utils/utilities';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { fonts } from 'src/shared/styles/fonts';
import { decode } from 'html-entities';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { useAppCommon, useAppPlayer } from 'src/hooks';
import { ArticleLabel } from '../molecules/articleLabel/ArticleLabel';
import { Styles } from 'src/shared/styles';

export interface NewsFeedProps {
  title: string;
  imageUrl: string;
  videoLabel: string;
  des: string;
  month: string;
  date: string;
  titleColor: string;
  barColor: string;
  labelType: LabelTypeProp;
}

interface NewsFeedWidgetProps {
  data: NewsViewListItemType[];
  onScroll: () => void;
  isLoading: boolean;
  onUpdateNewsFeedBookmark: (index: number) => void,
  labelContainerStyle?: StyleProp<ViewStyle>
}

const NewsFeed = ({data, onScroll, isLoading,onUpdateNewsFeedBookmark,labelContainerStyle}: NewsFeedWidgetProps) => {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const style = useThemeAwareObject(customStyle)
  const { showMiniPlayer } = useAppPlayer()
  const themeData = useAppCommon();
  const isDarkMode = isDarkTheme(themeData.theme);
  const onPress = (nid: string) => {
    if (nid) {
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: nid});
    }
  };

  const renderArticleFooter = (item: NewsViewListItemType, index: number) => {
    const timeFormat = dateTimeAgo(item.changed)

    return (
      <View>
        <SectionVideoFooter
          leftTitle={isNotEmpty(item.author_resource) ? decode(item.author_resource) : ''}
          leftTitleColor={theme.themeData.primary}
          rightIcon={() => TimeIcon(timeFormat.icon)}
          rightDate={timeFormat.time}
          rightDateColor={ isTab ? isDarkMode ? style.footerTitleColor.color : Styles.color.black900 : style.footerTitleColor.color}
          rightTitleColor={style.footerTitleColor.color}
          addBookMark={true}
          isBookmarked={item.isBookmarked}
          onPressBookmark={() => { onUpdateNewsFeedBookmark(index) }}
        />
      </View>
    )
  }

  const renderArticleFooterMobile = (item: NewsViewListItemType, index: number) => {
    const timeFormat = dateTimeAgo(item.changed)

    return (
      <View style={style.videoFooterContainer}>
        <SectionVideoFooter  
          // rightTitle={isAndroid ?  ',' + calculateYear(item.created_export) : calculateYear(item.created_export) + ','} for older reference
          leftTitleColor={style.footerTitleColor.color}
          rightIcon={() => TimeIcon(timeFormat.icon)}
          rightDate={timeFormat.time}
          rightDateColor={style.footerTitleColor.color}
          rightTitleColor={style.footerTitleColor.color}
          addBookMark={true}
          isBookmarked={item.isBookmarked}
          onPressBookmark={() => { onUpdateNewsFeedBookmark(index) }}
          leftTitle={isNotEmpty(item.author_resource) ? decode(item.author_resource) : ''}
        />
      </View>
    )
  }

  const renderArticleImage = (item: NewsViewListItemType) => (
    <View style={isTab ? style.tabImageContainer : style.imageContainer}>
      <Image
        url={getArticleImage(item.field_image, item.field_new_photo)}
        fallback
        style={style.image}
        resizeMode={ImageResize.COVER}
      />
    </View>
  )

  const renderTitle = (title: string) => (
    <View style={isTab ? style.titleContainer : style.titleStyle}>
      <Label
        style={style.title}
        color={theme.themeData.primaryBlack}
        children={decodeHTMLTags(title)}
      />
    </View>
  )
  // Enable Description in Tab when required
  // const renderDescription = (body: string) => (
  //   <Label
  //     style={style.descriptionStyle}
  //     children={decodeHTMLTags(decode(body))}
  //     numberOfLines={isTab ? 2 : 3}
  //   />
  // )

  const renderItem = (item: NewsViewListItemType, index: number) => {
    return (
      <View key={flatListUniqueKey.NEWS_FEED + index}>
        <FixedTouchable activeOpacity={0.8} onPress={() => onPress(item.nid)}>
          {
            isTab ?
              <View style = {style.tabNewsFeedContainer}>
                <View style={style.tabSplitter}>
                <View style={style.tabLeftContainer}>
                  <ArticleLabel displayType={item.field_display_export} enableTopMargin labelContainer = {labelContainerStyle} />
                  {renderTitle(item.title)}
                  {/* {renderDescription(item.body)}    Enable Description when required  */}
                </View>
                {renderArticleImage(item)}
              </View>
              <View style = {style.tabFooterContainer}>
               {renderArticleFooter(item, index)}
               </View>
              </View>
              :
              <>
                <View style={style.blogContainer}>
                  <View style={style.titleContainer}>
                    <ArticleLabel displayType={item.field_display_export} enableTopMargin />
                    {renderTitle(item.title)}
                  </View>
                  <View>
                    {renderArticleImage(item)}
                  </View>
                </View>
                {renderArticleFooterMobile(item, index)}
              </>
          }
        </FixedTouchable>
        <Divider style={style.divider}/>
        {isLoading && data.length - 1 === index && (
          <View style={style.loaderStyle}>
            <ActivityIndicator size={'small'} color={theme.themeData.primary} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        style={style.listContainer}
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.NEWS_FEED + new Date().getTime().toString()}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={onScroll}
        onEndReachedThreshold={0.5}
      />
      {showMiniPlayer && <View
        style={style.miniPlayerContainer}></View>}
    </View>
  );
};

export default NewsFeed;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    paddingTop: normalize(25),
  },
  listContainer: {},
  footerContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  descriptionStyle: {
    fontSize: normalize(14),
    color: theme.newsFeed,
    textAlign: 'left',
    paddingBottom: normalize(20),
    paddingTop: normalize(5),
    lineHeight: normalize(18),
  },
  divider: {
    height: 1.07,
    backgroundColor: theme.dividerColor
  },
  imageContainer: {
    width: 144,
    height: 'auto',
    aspectRatio: 4/3,
    marginTop:20
  },
  tabImageContainer: {
    width: 268,
    height: 'auto',
    aspectRatio: 4/3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flex: 1,
    marginRight: normalize(10),
    top: isTab ? 0 : normalize(10),
  },
  tabSplitter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: normalize(15),
  },
  tabLeftContainer: {
    flex: 1,
    paddingRight: normalize(30),
  },
  title: {
    textAlign: 'left',
    fontFamily: fonts.AwsatDigital_Bold,
    fontSize: isTab ? 20 : normalize(18),
    lineHeight: isTab ? 28 : normalize(29),
    marginBottom: 10,
  },
  titleStyle: {
    marginRight: normalize(10),
    top: normalize(10),
  },
  footerTitleColor: {
    color: theme.footerTextColor
  },
  videoFooterContainer: {
    marginTop: 10
  },
  blogContainer: {
    flexDirection: 'row' 
  },
  loaderStyle: {
    margin: normalize(28)
  },
  miniPlayerContainer: {
    height: normalize(60),
    paddingHorizontal: normalize(20),
  },
  tabNewsFeedContainer: {
    flex: 1, 
    flexDirection: 'column'
  },
  tabFooterContainer: {
    marginTop: 10
  }
});

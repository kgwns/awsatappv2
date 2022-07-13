import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import {Image} from '../atoms/image/Image';
import { isTab, normalize, screenWidth} from '../../shared/utils';
import { Styles} from '../../shared/styles';
import {TextWithFlag, Divider, Label, LabelTypeProp} from '../atoms';
import {ImageResize} from '../../shared/styles/text-styles';
import {flatListUniqueKey, ScreensConstants} from '../../constants';
import {SectionVideoFooter} from '../molecules';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {NewsViewListItemType} from 'src/redux/newsView/types';
import {
  decodeHTMLTags,
  isNotEmpty,
  dateTimeAgo,
  TimeIcon,
  getArticleImage,
} from 'src/shared/utils/utilities';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { fonts } from 'src/shared/styles/fonts';
import { decode } from 'html-entities';
import FixedTouchable from 'src/shared/utils/FixedTouchable';

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
  onUpdateNewsFeedBookmark: (index: number) => void
}

const NewsFeed = ({data, onScroll, isLoading,onUpdateNewsFeedBookmark}: NewsFeedWidgetProps) => {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const style = useThemeAwareObject(customStyle)
  const onPress = (nid: string) => {
    if (nid) {
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: nid});
    }
  };

  const renderArticleFooter = (item: NewsViewListItemType, index: number) => {
    const timeFormat = dateTimeAgo(item.created_export)

    return (
      <View>
        <SectionVideoFooter
          leftTitle={isNotEmpty(item.author_resource) ? decode(item.author_resource) : ''}
          leftTitleColor={theme.themeData.primary}
          rightIcon={() => TimeIcon(timeFormat.icon)}
          rightDate={timeFormat.time}
          rightDateColor={Styles.color.smokeyGrey}
          rightTitleColor={Styles.color.smokeyGrey}
          addBookMark={true}
          isBookmarked={item.isBookmarked}
          onPressBookmark={() => { onUpdateNewsFeedBookmark(index) }}
        />
      </View>
    )
  }

  const renderArticleFooterMobile = (item: NewsViewListItemType, index: number) => {
    const timeFormat = dateTimeAgo(item.created_export)

    return (
      <View style={{marginTop: 10}}>
        <SectionVideoFooter  
          // rightTitle={isAndroid ?  ',' + calculateYear(item.created_export) : calculateYear(item.created_export) + ','} for older reference
          leftTitleColor={colors.spanishGray}
          rightIcon={() => TimeIcon(timeFormat.icon)}
          rightDate={timeFormat.time}
          rightDateColor={colors.spanishGray}
          rightTitleColor={colors.spanishGray}
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
    <View style={style.titleContainer}>
      <Label style={style.title} color={theme.themeData.primaryBlack}>{decodeHTMLTags(title)}</Label>
    </View>
  )

  const renderDescription = (body: string) => (
    <Label
      style={style.descriptionStyle}
      children={decodeHTMLTags(decode(body))}
      numberOfLines={isTab ? 2 : 3}
    />
  )

  const renderItem = (item: NewsViewListItemType, index: number) => {
    return (
      <View key={flatListUniqueKey.NEWS_FEED + index}>
        <FixedTouchable activeOpacity={0.8} onPress={() => onPress(item.nid)}>
          {
            isTab ?
              <View style={style.tabSplitter}>
                <View style={style.tabLeftContainer}>
                  {renderTitle(item.title)}
                  {renderDescription(item.body)}
                  {renderArticleFooter(item, index)}
                </View>
                {renderArticleImage(item)}
              </View>
              :
              <>
                <View style={{ flexDirection: 'row' }}>
                  <View style={style.titleContainer}>
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
        {isLoading && data.length - 1 == index && (
          <View style={{margin: normalize(28)}}>
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
      <View
        style={{
          height: normalize(100),
          paddingHorizontal: normalize(20),
          top: normalize(20),
        }}></View>
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
    color: Styles.color.smokeyGrey,
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
    width: 93,
    height: 73,
    marginTop:20
  },
  tabImageContainer: {
    width: 153,
    height: 125
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flex: 1,
    marginRight: normalize(10),
    top: normalize(10),
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
    fontFamily: fonts.AwsatDigitalBetav10_Bold,
    fontSize: normalize(18),
    lineHeight: normalize(29),
    marginBottom: 10,
  }
});

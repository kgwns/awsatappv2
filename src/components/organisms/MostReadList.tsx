import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import {flatListUniqueKey, ScreensConstants, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import {ArticleItem, ArticleWithOutImageProps, MostReadTabItem} from 'src/components/molecules';
import {ImageLabelProps} from 'src/components/atoms/imageWithLabel/ImageWithLabel';
import {isTab, screenWidth, normalize, recordLogEvent} from 'src/shared/utils';
import {Label, LabelTypeProp} from 'src/components/atoms';
import { Styles } from 'src/shared/styles';
import {dateTimeAgo, decodeHTMLTags, getArticleImage, isNonEmptyArray, TimeIcon} from 'src/shared/utils/utilities';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { useAppPlayer, useBookmark, useLogin } from 'src/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PopUp, { PopUpType } from './popUp/PopUp';
import { fonts } from 'src/shared/styles/fonts';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { PopulateWidgetType } from '../molecules/populateWidget/PopulateWidget';
import { AnalyticsEvents, EventParameterProps } from 'src/shared/utils/analytics';
import { MOST_READ_FIRST_INDEX, MOST_READ_UNIT_ID } from 'src/hooks/useAds';
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer';

export interface ArticleProps
  extends ImageLabelProps,
    ArticleWithOutImageProps {
  image?: string;
  body: string;
}

export interface ArticleSectionProps {
  data: any;
  onScroll?: () => void;
  isLoading?: boolean;
  enableTag?:boolean;
  flag?:boolean;
  isEntityQueueList?: boolean
}

const MostReadList = ({
  data,
  onScroll,
  isLoading = false,
  enableTag = false,
  flag = true,
  isEntityQueueList = false
}: ArticleSectionProps) => {
  const MOST_READ_TITLE = TranslateConstants({key:TranslateKey.MOST_READ_TITLE})
  const navigation = useNavigation();

  const theme = useTheme();
  const { isLoggedIn } = useLogin()

  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo, validateBookmark } = useBookmark()

  const [articleData,setArticleData] = useState(data)
  const [showupUp,setShowPopUp] = useState(false)
  const style = useThemeAwareObject(mostReadListStyle)
  const { showMiniPlayer } = useAppPlayer()
  const ref = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      global.refFlatList = ref;
    }, [])
  );

  useEffect(() => {
    if (isNonEmptyArray(data.rows)) {
      updateArticleDataBookmark(data.rows)
    } else {
      updateArticleDataBookmark([])
    }
  },[data.rows,bookmarkIdInfo])

  useEffect(() => {
    if (isEntityQueueList && isNonEmptyArray(data)) {
      updateEntityDataBookmark()
    } 
  },[data,bookmarkIdInfo])

  const updateArticleDataBookmark = (rows: any[]) => {
    const entityListInfo = rows.map((item: any) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
    setArticleData([...entityListInfo, {nid: 'ad'}])
  }

  const updateEntityDataBookmark = () => {
    const articleInfo = data.map((item: any) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
    setArticleData(articleInfo)
  }

  const onPressBookmark = (index: number) => {
    const articleDetailData = [...articleData]
    const isBookmarked = !articleDetailData[index].isBookmarked ?? true
    articleDetailData[index].isBookmarked = isBookmarked;
    const { title, author,field_publication_date_export,tagTopicsList,body,type} = articleDetailData[index];
    const decodeBody = decodeHTMLTags(body);
    const eventParameter = {
      content_type: type,
      article_name: title,
      article_category: type,
      article_author: author,
      article_publish_date: field_publication_date_export,
      tags: tagTopicsList,
      article_length: decodeBody.split(' ').length
    }
    updateBookmarkInfo(articleDetailData[index].nid, isBookmarked,eventParameter)
    setArticleData(articleDetailData)
  }

  const checkAndUpdateBookmark = (index: number) => {
    isLoggedIn ? onPressBookmark(index) : setShowPopUp(true);
  }

  const onPressSignUp = () => {
    setShowPopUp(false)
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean,eventParameter: EventParameterProps) => {
    if(isBookmarked) {
      recordLogEvent(AnalyticsEvents.ARTICLE_SAVE, eventParameter);
      sendBookmarkInfo({ nid, bundle: PopulateWidgetType.ARTICLE });
    } else {
      recordLogEvent(AnalyticsEvents.ARTICLE_UNSAVE, eventParameter);
      removeBookmarkedInfo({ nid });
    }
  }

  const onClosePopUp = () => {
    setShowPopUp(false)
  }

  const renderItem = (item: any, index: number) => {
    if (item.nid == 'ad') {
      return (
        <AdContainer style={{marginBottom: 20}} unitId={MOST_READ_UNIT_ID} size={AdContainerSize.MEDIUM}/>
      );
    }

    const timeFormat = dateTimeAgo(item.changed)

    const footerData = {
      leftTitle: item.author_resource,
      leftTitleColor: Styles.color.greenishBlue,
      rightTitle: timeFormat.time,
      rightTitleStyle: {fontFamily: fonts.Effra_Arbc_Regular, lineHeight: 40, fontSize: 12},
      rightIcon: () => TimeIcon(timeFormat.icon),
      rightTitleColor: style.footerTitleColor.color,
      leftTitleStyle: style.leftFooterStyle,
    };

    enableTag && (item.tagName = (index + 1).toString())
    item.tagStyle = {marginLeft: normalize(20)};
    item.tagLabelType = LabelTypeProp.p3;
    item.image = item.image ? item.image : getArticleImage(item.field_image, item.field_new_photo);
    if(flag) {
      item.flag = isNonEmptyArray(item.field_news_categories_export) ? item.field_news_categories_export[0]?.title : '';
    }
    item.flagColor = Styles.color.greenishBlue;
    item.barColor = Styles.color.greenishBlue;

    if (isTab) {
      return (
        <View>
          <MostReadTabItem
            articleData={item}
            index={index}
            onPressBookmark={() => checkAndUpdateBookmark(index)}
            visibleNoTag={enableTag}/>
          {isLoading && (data.length - 1 === index) && (
            <View style={style.loaderStyle}>
              <ActivityIndicator size={'small'} color={theme.themeData.primary} />
            </View>
          )}
        </View>
      )
    } else {
      return (
        <View>
          <ArticleItem
            {...item}
            bodyStyle={style.bodyStyle}
            showDivider={false}
            index={index}
            contentStyle={style.contentStyle}
            footerInfo={footerData}
            onPressBookmark={() => checkAndUpdateBookmark(index)}
            titleStyle={style.titleStyle}
            titleContainerStyle={style.titleContainerStyle}
            articleItemStyle={style.articleItemStyle}
          />
          {(index == (MOST_READ_FIRST_INDEX - 1)) && 
            <AdContainer style={{marginBottom: 20}} unitId={MOST_READ_UNIT_ID} size={AdContainerSize.MEDIUM}/>
          }
          {isLoading && (data.length - 1 === index) && (
            <View style={style.loaderStyle}>
              <ActivityIndicator size={'small'} color={theme.themeData.primary} />
            </View>
          )}
        </View>
      );
    }
  };

  const listHeader = () => (
    <View style={{paddingLeft: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth), paddingVertical: normalize(5)}}>
      <Label
        children={MOST_READ_TITLE}
        labelType={LabelTypeProp.h2}
        color={Styles.color.greenishBlue}
      />
    </View>
  );


  return (
    <View style={style.container}>
      <FlatList
        ref={ref}
         onScrollBeginDrag={() => global.refFlatList = ref}
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.MOST_READ_LIST}
        ListHeaderComponent={enableTag ? listHeader : <View style={style.noTitleStyle}/>}
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={onScroll ? onScroll : () => ({})}
        onEndReachedThreshold={0.3}
        contentContainerStyle={showMiniPlayer && style.contentContainer}
      />
      <PopUp type={PopUpType.rbSheet}
        onPressButton={onPressSignUp}
        showPopUp={showupUp}
        onClosePopUp={onClosePopUp} />
    </View>
  );
};

export default MostReadList;

const mostReadListStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    flex: 1,
  },
  contentStyle: {
    paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
  },
  leftFooterStyle: {
    fontFamily: fonts.IBMPlexSansArabic_Bold,
    fontSize:12,
    lineHeight:14
  },
  titleStyle: {
    fontFamily: fonts.AwsatDigital_Bold,
    fontSize: isTab ? 20 : 16,
    lineHeight: isTab ? 30 : 28,
    textAlign: 'left',
    paddingVertical: normalize(8),
    color: theme.primaryBlack
  },
  bodyStyle: {
    fontFamily: fonts.IBMPlexSansArabic_Regular,
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'left',
    writingDirection: 'rtl'
  },
  titleContainerStyle: {
    marginTop: 10
  },
  contentContainer: {
    paddingBottom: normalize(80)
  },
  footerTitleColor: {
    color: theme.footerTextColor
  },
  articleItemStyle: {
    paddingBottom: 0
  },
  loaderStyle: {
    margin: normalize(28)
  },
  noTitleStyle: {
    marginTop: 40
  },
});

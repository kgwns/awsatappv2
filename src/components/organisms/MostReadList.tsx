import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import {flatListUniqueKey, ScreensConstants} from 'src/constants';
import {ArticleItem, ArticleWithOutImageProps} from 'src/components/molecules';
import {ImageLabelProps} from 'src/components/atoms/imageWithLabel/ImageWithLabel';
import {isTab, screenWidth, normalize} from 'src/shared/utils';
import {Label, LabelTypeProp} from 'src/components/atoms';
import {MOST_READ} from 'src/constants/SharedConstants';
import { Styles } from 'src/shared/styles';
import {dateTimeAgo, getArticleImage, isNonEmptyArray, TimeIcon} from 'src/shared/utils/utilities';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { useAppPlayer, useBookmark, useLogin } from 'src/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PopUp, { PopUpType } from './popUp/PopUp';
import { fonts } from 'src/shared/styles/fonts';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { PopulateWidgetType } from '../molecules/populateWidget/PopulateWidget';

export interface articleProps
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
}

const MostReadList = ({
  data,
  onScroll,
  isLoading = false,
  enableTag = false,
  flag = true,
}: ArticleSectionProps) => {
  const [t] = useTranslation();
  const navigation = useNavigation();

  const theme = useTheme();
  const { isLoggedIn } = useLogin()

  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()

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
      updateArticleDataBookmark()
    }
  },[data.rows,bookmarkIdInfo])

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const updateArticleDataBookmark = () => {
    const articleInfo = data.rows.map((item: any) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
    setArticleData(articleInfo)
  }

  const onPressBookmark = (index: number) => {
    const data = [...articleData]
    const isBookmarked = !data[index].isBookmarked ?? true
    data[index].isBookmarked = isBookmarked
    updateBookmarkInfo(data[index].nid, isBookmarked)
    setArticleData(data)
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

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    isBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.ARTICLE }) : removeBookmarkedInfo({ nid })
  }

  const onClosePopUp = () => {
    setShowPopUp(false)
  }

  const renderItem = (item: any, index: number) => {
    const timeFormat = dateTimeAgo(item.created_export)

    const footerData = {
      leftTitle: item.author_resource,
      leftTitleColor: Styles.color.greenishBlue,
      rightTitle: timeFormat.time,
      rightTitleStyle: {fontFamily: fonts.Effra_Arbc_Regular, lineHeight: 40, fontSize: 12},
      rightIcon: () => TimeIcon(timeFormat.icon),
      rightTitleColor: style.footerTitleColor,
      leftTitleStyle: style.leftFooterStyle,
    };

    enableTag && (item.tagName = (index + 1).toString())
    item.tagStyle = {marginLeft: normalize(20)};
    item.tagLabelType = LabelTypeProp.p3;
    item.image = item.image ? item.image : getArticleImage(item.field_image, item.field_new_photo);
    if(flag) item.flag = isNonEmptyArray(item.field_news_categories_export) ? item.field_news_categories_export[0]?.title : '';
    item.flagColor = Styles.color.greenishBlue;
    item.barColor = Styles.color.greenishBlue;
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
          articleItemStyle={{paddingBottom: 0}}
        />
        {isLoading && (data.length - 1 == index) && (
          <View style={{margin: normalize(28)}}>
            <ActivityIndicator size={'small'} color={theme.themeData.primary} />
          </View>
        )}
      </View>
    );
  };

  const listHeader = () => (
    <View style={{paddingLeft: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth), paddingVertical: normalize(5)}}>
      <Label
        children={MOST_READ}
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
        ListHeaderComponent={enableTag ? listHeader : <View/>}
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={onScroll ? onScroll : () => {}}
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
    fontSize: 16,
    lineHeight: 28,
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
  }
});

import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import {flatListUniqueKey} from 'src/constants';
import {ArticleItem, ArticleWithOutImageProps} from 'src/components/molecules';
import {ImageLabelProps} from 'src/components/atoms/imageWithLabel/ImageWithLabel';
import {screenWidth} from 'src/shared/utils';
import {Label, LabelTypeProp} from 'src/components/atoms';
import {MOST_READ} from 'src/constants/SharedConstants';
import {Styles, ImagesName} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import {getImageUrl, isNonEmptyArray} from 'src/shared/utils/utilities';
import {timeAgo} from 'src/shared/utils/utilities';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { useBookmark, useLogin } from 'src/hooks';
import { AlertModal } from 'src/components/organisms';
import { ScreensConstants } from 'src/constants';
import { useNavigation } from '@react-navigation/native';

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
}

const MostReadList = ({
  data,
  onScroll,
  isLoading = false,
  enableTag = false
}: ArticleSectionProps) => {
  const [t] = useTranslation();
  const navigation = useNavigation();

  const theme = useTheme();
  const { isLoggedIn } = useLogin()

  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()

  const [articleData,setArticleData] = useState(data)
  const [showupUp,setShowPopUp] = useState(false)

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
    isLoggedIn ? onPressBookmark(index) : setShowPopUp(true)
  }

  const onPressSignUp = () => {
    setShowPopUp(false)
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const renderItem = (item: any, index: number) => {
    const footerData = {
      leftTitle: item.author_resource,
      leftTitleColor: Styles.color.greenishBlue,
      rightTitle: t(timeAgo(item.created_export)),
      rightIcon: () => {
        return getSvgImages({
        name: ImagesName.clock,
        size: normalize(12),
        style: { marginRight: normalize(5) }
    })},
      rightTitleColor: Styles.color.silverChalice,
      leftTitleStyle: mostReadListStyle.leftFooterStyle
    };
    enableTag && (item.tagName = (index + 1).toString())
    item.tagStyle = {marginLeft: normalize(20)};
    item.tagLabelType = LabelTypeProp.p3;
    item.image = item.image ? item.image : getImageUrl(item.field_image);
    item.flag = isNonEmptyArray(item.field_news_categories_export) ? item.field_news_categories_export[0]?.title : ''
    item.flagColor = Styles.color.greenishBlue;
    item.barColor = Styles.color.greenishBlue;
    return (
      <View>
        <ArticleItem
          {...item}
          showDivider={false}
          index={index}
          contentStyle={mostReadListStyle.contentStyle}
          footerInfo={footerData}
          onPressBookmark={() => checkAndUpdateBookmark(index)}
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
    <View style={{paddingLeft: normalize(0.04 * screenWidth), paddingVertical: normalize(5)}}>
      <Label
        children={MOST_READ}
        labelType={LabelTypeProp.h2}
        color={Styles.color.greenishBlue}
      />
    </View>
  );

  return (
    <View style={mostReadListStyle.container}>
      {showupUp && <AlertModal
        title={t('signUpAlert.notSubscribed')}
        message={t('signUpAlert.description')}
        buttonText={t('signUpAlert.signUp')}
        isVisible={showupUp}
        onPressSuccess={onPressSignUp}
        onClose={onCloseSignUpAlert}
      />
      }
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.MOST_READ_LIST}
        ListHeaderComponent={enableTag ? listHeader : <View/>}
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={onScroll ? onScroll : () => {}}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

export default MostReadList;

const mostReadListStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentStyle: {
    paddingHorizontal: normalize(0.04 * screenWidth),
  },
  leftFooterStyle: {
    fontWeight: 'bold'
  }
});

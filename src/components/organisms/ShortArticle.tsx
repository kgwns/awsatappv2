import {
  View,
  StyleSheet,
  FlatList,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { TextWithFlag, TextWithFlagProps, Image, WidgetHeader, HeaderElementProps, LabelTypeProp, Divider, Label, RenderPhotoIcon } from '../atoms'
import { ArticleFooter, ArticleFooterProps } from 'src/components/molecules'
import { ImageResize } from 'src/shared/styles/text-styles';
import { flatListUniqueKey } from 'src/constants/Constants';
import { dateTimeAgo, decodeHTMLTags, getImageUrl, isNonEmptyArray, isNotEmpty, isTypeAlbum, TimeIcon } from 'src/shared/utils/utilities';
import { useLogin, useOrientation } from 'src/hooks';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { fonts } from 'src/shared/styles/fonts';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { HomePageArticleType } from 'src/redux/latestNews/types';
import { ArticleLabel } from '../molecules/articleLabel/ArticleLabel';

export interface ShortArticleProps extends TextWithFlagProps {
  image: string,
  nid: string,
  author: string,
  created: string,
  isBookmarked: boolean;
  body: string
  type: HomePageArticleType;
  displayType?: string;
}

export interface ArticleSectionProps {
  data: ShortArticleProps[];
  headerLeft?: HeaderElementProps;
  onPress: (nid: string, isAlbum?: boolean) => void;
  labelType?: LabelTypeProp;
  onUpdateBookmark: (nid: string, bookmarkStatus: boolean,eventParameter: any) => void,
  showSignUpPopUp: () => void,
  listKey?: string,
  numColumns?: number,
  addStyle?: StyleProp<ViewStyle>;
  showBody?: boolean;
  leftContainerStyle?: StyleProp<ViewStyle>
  imageStyleProp?: StyleProp<ViewStyle>
  orientation?: string,
  isFooterOutside?: boolean
  listStyle?: StyleProp<ViewStyle>
  hideImage?: boolean;
  showLeftTitle?: boolean;
  containerStyle?: StyleProp<ViewStyle>,
  titleColor?: string,
  articleTextStyle?: StyleProp<TextStyle>,
  rightTitleColor?: string;
  showTabStyle?: boolean;
}

export const shortArticleFooter: ArticleFooterProps = {
  leftTitleColor: Styles.color.silverChalice,
  rightTitleColor: Styles.color.silverChalice,
  leftTitleStyle: { fontSize: 13, lineHeight: 18, fontFamily: fonts.IBMPlexSansArabic_Regular },
  rightTitleStyle: isTab ? {} : { fontSize: 13, lineHeight: 18, fontFamily: fonts.IBMPlexSansArabic_Regular },
};

const ShortArticle = ({ data, headerLeft, onPress,
  labelType = LabelTypeProp.h3,
  onUpdateBookmark,
  showSignUpPopUp,
  listKey,
  numColumns = 1,
  addStyle,
  showBody = false,
  leftContainerStyle,
  imageStyleProp,
  orientation,
  isFooterOutside = false,
  listStyle,
  hideImage = false,
  showLeftTitle = true,
  containerStyle,
  titleColor,
  articleTextStyle,
  rightTitleColor,
  showTabStyle = true
}: ArticleSectionProps) => {
  const { isLoggedIn } = useLogin()
  const style = useThemeAwareObject(customStyle);
  const [articleData, setArticleData] = useState(data)

  useEffect(() => {
    updateData()
  }, [data])

  const updateData = () => {
    isNonEmptyArray(data) && setArticleData(data)
  }

  const onPressBookmark = (index: number) => {
    const updatedData = [...articleData]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus
    setArticleData(updatedData);
    const {title,body,author,type,} = updatedData[index];
    const decodeBody = decodeHTMLTags(body);
    const eventParameter = {
      content_type: type,
      article_name: title,
      article_category: 'article',
      article_author: author,
      article_length: decodeBody.split(' ').length,

    }
    onUpdateBookmark(updatedData[index].nid, bookmarkStatus,eventParameter)
  }
  const { isPortrait } = useOrientation();

  const checkAndUpdateBookmark = (index: number) => {
    isLoggedIn ? onPressBookmark(index) : showSignUpPopUp()
  }

  const renderItem = (item: ShortArticleProps, index: number) => {
    const timeFormat = dateTimeAgo(item.created)

    shortArticleFooter.rightTitle = timeFormat.time
    shortArticleFooter.rightTitleColor = style.footerTitleColor.color
    shortArticleFooter.rightIcon = () => TimeIcon(timeFormat.icon)
    shortArticleFooter.leftTitle = showLeftTitle ? item.author : ''
    shortArticleFooter.leftTitleColor = style.footerTitleColor.color
    const cardStyle = (numColumns > 1 && index % 2 === 0) ? {marginRight: normalize(20)} : {}
    const showDivider = (numColumns === 1 && index < data.length - 1 || (isTab && numColumns > 1 && index < data.length - 2))
    const imageStyle = (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT' || 'FACE-UP') ? style.imageLandscape : style.image
    const imageContainerStyle = (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT' || 'FACE-UP') ? style.imageContainerLandscape : style.imageContainer
    const isAlbum = isTypeAlbum(item.type);
    const labelContainerStyle = isPortrait ? style.footerStyle : style.footerLandscapeStyle;

    return <FixedTouchable style={(showTabStyle && isTab) && {flex:1}} onPress={() => onPress(item.nid, isAlbum)}>
      <View key={flatListUniqueKey.SHORT_ARTICLE + index}
        style={StyleSheet.flatten([!hideImage && isTab ? style.cardContainer : style.cardContainerStyle, cardStyle, containerStyle])}>
        <View style={style.containerStyle}>
          <View style={[ labelContainerStyle, leftContainerStyle, hideImage && style.hideImage]}>
            <ArticleLabel displayType={item.displayType} enableBottomMargin />
            <View style={hideImage ? style.titleViewHideImage : style.titleViewWithImage}>
              <TextWithFlag {...item} numberOfLines={0} labelType={labelType} titleColor = {titleColor} style = {articleTextStyle} />
            </View>
            
            {isNotEmpty(item.body) && showBody &&
              <Label labelType={LabelTypeProp.p3}
                children={decodeHTMLTags(item.body)}
                color={Styles.color.davyGrey}
                numberOfLines={2}
              />
            }
            {!isFooterOutside && <View style={[style.footerContainer]}>
              <ArticleFooter {...shortArticleFooter} style={style.articleFooterStyle}
                onPress={() => checkAndUpdateBookmark(index)}
                isBookmarked={item.isBookmarked} rightTitleColor = {rightTitleColor}
              />
            </View>}
          </View>
        {!hideImage &&  <View style={[imageContainerStyle, imageStyleProp]}>
            <Image fallback url={getImageUrl(item.image)} style={imageStyle} resizeMode={ImageResize.COVER} />
            {isAlbum && <RenderPhotoIcon />}
          </View>}
        </View>
        {isFooterOutside && <View style={style.outsideFooterContainer}>
              <ArticleFooter {...shortArticleFooter} style={style.articleFooterStyle}
                onPress={() => checkAndUpdateBookmark(index)}
                isBookmarked={item.isBookmarked}
              />
            </View>}
            {showDivider &&  !hideImage && <Divider style={style.divider}/>}
      </View>
      {showDivider && hideImage && <Divider style={style.divider}/>}
    </FixedTouchable>
  };
  return (
    <View style={[style.container, addStyle]}>
      <WidgetHeader headerLeft={headerLeft} widgetHeaderStyle={{}} />
      <FlatList
        style={listStyle}
        keyExtractor={(_, index) => index.toString()}
        listKey={
          listKey ? listKey : flatListUniqueKey.SHORT_ARTICLE + new Date().getTime().toString()
        }
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => renderItem(item, index)}
        numColumns={numColumns}
      />
    </View>
  );
};

export default ShortArticle;

const imageContainerWidth = 144;
const footerWidth = (isTab ? (screenWidth * 0.435 - 40) : screenWidth) - (2 * ((isTab ? 0 : 0.04) * screenWidth) + imageContainerWidth);

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    paddingHorizontal: (isTab ? 0 : 0.04) * screenWidth,
    paddingBottom: normalize(20)
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 4/3
  },
  imageLandscape: {
    width: '100%',
    height: 'auto',
    aspectRatio: 4/3
  },
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  outsideFooterContainer: {
    marginTop: normalize(10),
    width: '100%'
  },
  footerStyle: {
    width: footerWidth,
    paddingRight: normalize(12),
  },
  footerLandscapeStyle: {
    width: '70%',
    paddingRight: normalize(12),
  },
  cardContainer: {
    paddingBottom: normalize(20),
    flex: 1,
  },
  imageContainer: {
    width: imageContainerWidth,
    height: isTab ? normalize(80) : normalize(65),
  },
  imageContainerLandscape: {
    width: '30%',
  },
  hideImage: {
    flex: 1,
    paddingRight: 0,
    marginTop: 10,
  },
  titleViewHideImage: {
    marginBottom: 30,
  },
  titleViewWithImage: {
    paddingBottom: 20,
  },
  cardContainerStyle: {
    paddingBottom: normalize(20),
  },
  footerTitleColor: {
    color: theme.footerTextColor
  },
  containerStyle: {
    flexDirection: 'row' ,
    justifyContent:'space-between',
  },
  articleFooterStyle: {
    flex: 1 
  }
})


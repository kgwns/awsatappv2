import {
  View,
  StyleSheet,
} from 'react-native';
/*
** Horizontal scroll is not working properly By Importing Flatlist using 'react-native' in Android.
** So, We have fixed this by Importing Flatlist from 'react-native-gesture-handler'
*/
import { FlatList } from 'react-native-gesture-handler';  
import React, { useEffect, useState } from 'react';
import { articleEventParameter, normalize, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { Image, WidgetHeader, LabelTypeProp, Label, RenderPhotoIcon } from '../atoms'
import { ArticleFooter, ArticleFooterProps } from 'src/components/molecules'
import { ImageResize } from 'src/shared/styles/text-styles';
import { flatListUniqueKey } from 'src/constants/Constants';
import { dateTimeAgo, decodeHTMLTags, getImageUrl, isNonEmptyArray, isNotEmpty, isTypeAlbum, TimeIcon } from 'src/shared/utils/utilities';
import { useLogin, useOrientation } from 'src/hooks';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { fonts } from 'src/shared/styles/fonts';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { ArticleLabel } from '../molecules/articleLabel/ArticleLabel';
import { ArticleSectionProps, ShortArticleProps } from './ShortArticle';

export let shortArticleFooter: ArticleFooterProps = {
  leftTitleColor: Styles.color.silverChalice,
  rightTitleColor: Styles.color.silverChalice,
  leftTitleStyle: { fontSize: 13, lineHeight: 18, fontFamily: fonts.IBMPlexSansArabic_Regular },
  rightTitleStyle: { fontSize: 13, lineHeight: 16, fontWeight: '400', fontFamily: fonts.Effra_Arbc_Regular },
};

const MainSectionShortArticle = ({ data, headerLeft, onPress,
  onUpdateBookmark,
  showSignUpPopUp,
  showBody = false,
  leftContainerStyle,
  isFooterOutside = false,
  hideImage = false,
  showLeftTitle = true,
  containerStyle,
}: ArticleSectionProps) => {
  const { isLoggedIn } = useLogin()
  const style = useThemeAwareObject(customStyle);
  const [articleData, setArticleData] = useState(data);

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
    setArticleData(updatedData)
    const { title, body, author, type } = updatedData[index];
    const decodeBody = decodeHTMLTags(body);
    const eventParameter = {
      ...articleEventParameter,
      content_type: type,
      article_name: title,
      article_author: author,
      article_length: decodeBody.split(' ').length,
    }
    onUpdateBookmark(updatedData[index].nid, bookmarkStatus, eventParameter);
  }
  const { isPortrait } = useOrientation();

  const checkAndUpdateBookmark = (index: number) => {
    isLoggedIn ? onPressBookmark(index) : showSignUpPopUp()
  }

  const renderItem = (item: ShortArticleProps, index: number) => {
    const timeFormat = dateTimeAgo(item.created)
    shortArticleFooter = {
      ...shortArticleFooter,
      rightTitle: timeFormat.time,
      rightTitleColor: style.footerTitleColor.color,
      rightIcon: () => TimeIcon(timeFormat.icon),
      leftTitle: showLeftTitle ? item.author : '',
      leftTitleColor: style.footerTitleColor.color,
    };

    const isAlbum = isTypeAlbum(item.type);
    const labelContainerStyle = isPortrait ? style.footerStyle : style.footerLandscapeStyle;

    return <FixedTouchable key={flatListUniqueKey.SHORT_ARTICLE + index} onPress={() => onPress(item.nid, isAlbum)} >
      <View key={flatListUniqueKey.SHORT_ARTICLE + index} style={StyleSheet.flatten([style.container, containerStyle])}>
        <View style={[labelContainerStyle, leftContainerStyle, hideImage && style.hideImage]}>
          <View style={style.imageContainer}>
            {!hideImage && <View style={style.tabImage} testID='imageId'>
              <Image fallback url={getImageUrl(item.image)} style={style.imageStyle} resizeMode={ImageResize.COVER} />
              {isAlbum && <RenderPhotoIcon />}
            </View>}
            <View style={style.tabArticleLabel}>
              <ArticleLabel displayType={item.displayType} enableBottomMargin />
            </View>

            <View>
              {isNotEmpty(item.title) &&
                <Label children={isNotEmpty(item.title) ? decodeHTMLTags(item.title) : ''}
                  style={style.title}
                />
              }
            </View>


            <View>
              {isNotEmpty(item.body) && showBody &&
                <Label labelType={LabelTypeProp.p3}
                  children={decodeHTMLTags(item.body)}
                  color={Styles.color.davyGrey}
                  numberOfLines={2}
                />
              }
            </View>
          </View>
          {!isFooterOutside && <View style={[style.outsideFooterContainer]}>
            <ArticleFooter {...shortArticleFooter} style={style.articleFooterStyle}
              onPress={() => checkAndUpdateBookmark(index)}
              isBookmarked={item.isBookmarked}
            />
          </View>}

          {isFooterOutside && <View style={style.outsideFooterContainer}>
            <ArticleFooter {...shortArticleFooter} style={style.articleFooterStyle}
              onPress={() => checkAndUpdateBookmark(index)}
              isBookmarked={item.isBookmarked}
            />
          </View>}
        </View>
      </View>
    </FixedTouchable>
  };
  return (
    <View style={style.container}>
      <WidgetHeader headerLeft={headerLeft} widgetHeaderStyle={{}} />
      <FlatList
        horizontal
        style={style.listStyle}
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.SHORT_ARTICLE +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
        contentContainerStyle={style.contentContainer}
      />
    </View>
  );
};

export default MainSectionShortArticle;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor,
  },
  listStyle: {
    paddingHorizontal: 0.04 * screenWidth,
    paddingBottom: 10,
  },
  contentContainer: {
    paddingRight: 0.04 * screenWidth,
  },
  header: {
    paddingHorizontal: 0.04 * screenWidth
  },
  container: {
    paddingTop: 10,
  },
  dividerContainer: {
    paddingHorizontal: 0.04 * screenWidth
  },
  tabImage: {
    width: 335 ,
    height: 252,
    aspectRatio: 4 / 3,
  },
  imageStyle: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    marginTop: normalize(8),
    color: theme.primaryBlack,
    textAlign: 'left',
    fontFamily: fonts.AwsatDigital_Bold,
    fontWeight: '700'
  },
  outsideFooterContainer: {
    marginTop: normalize(10),
    width: 335   
  },
  articleFooterStyle: {
    flex: 1
  },
  footerStyle: {
    width: '100%',
    paddingRight: normalize(12),
  },
  footerLandscapeStyle: {
    width: '100%',
    paddingRight: normalize(12),
  },
  hideImage: {
    flex: 1,
    paddingRight: 0,
    marginTop: 10,
  },
  imageContainer: {
    width: 338, 
    marginRight: 20,
    position: 'relative'
  },
  footerTitleColor: {
    color: theme.footerTextColor
  },
  tabArticleLabel:{ 
    position: 'absolute' 
  }
});

import React, { useState } from 'react'
import { View, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import  ArticleFooter,{ ArticleFooterProps, BookMarkColorType }  from 'src/components/molecules/articleFooter/ArticleFooter'
import { BannerImageWithOverlay, BannerImageWithOverlayProps } from 'src/components/atoms/bannerImageWithOverlay/BannerImageWithOverlay'
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { Divider } from 'src/components/atoms/divider/Divider'
import { isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScreensConstants } from 'src/constants/Constants'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { dateTimeAgo, decodeHTMLTags, TimeIcon } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import { DARK_THEME_ID } from '../../shared/styles/colors'

const carouselFooterSample: ArticleFooterProps = {
  leftTitleColor: Styles.color.white,
  rightIcon: () => {
    return getSvgImages({
      name: ImagesName.clock,
      size: normalize(12),
      style: { marginRight: normalize(7) }
    })
  },
  rightTitleColor: Styles.color.silverChalice,
  bookMarkColorType: BookMarkColorType.WHITE,
  leftTitleStyle: { fontWeight: 'bold' },
  rightTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular, fontSize: 12, lineHeight:20,},
  hideBookmark: false
}

export interface ImageArticleProps extends BannerImageWithOverlayProps {
  title: string,
  titleOnTop?: boolean,
  containerStyle?: ViewStyle,
  nid?: string,
  author: string,
  created: string,
  isBookmarked: boolean
  onPressBookmark: () => void,
  isTabFooterInside?: boolean;
  body?: string;
  hasTabletLayout?: boolean
  rightContainerStyle?: StyleProp<ViewStyle>
  textStyles?:  StyleProp<TextStyle>
  titleStyle?:  StyleProp<TextStyle>,
  showBody?: boolean,
  leftTitleColor?: string;
  showDivider?: boolean,
  contentStyle?: StyleProp<TextStyle>;
  displayType?: string,
  tabTitleContainer?: StyleProp<ViewStyle>;
  hideBookmark?: boolean,
  carouselContainerStyle?: StyleProp<ViewStyle>;
}

const ImageArticle = ({
  image,
  title,
  titleOnTop = false,
  containerStyle,
  nid,
  author,
  created,
  isBookmarked,
  onPressBookmark,
  body,
  rightContainerStyle,
  textStyles,
  titleStyle,
  showBody= true,
  leftTitleColor,
  showDivider= false,
  contentStyle,
  displayType,
  isAlbum,
  tabTitleContainer,
  hideBookmark,
  carouselContainerStyle
}: ImageArticleProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const [isImageLoaded, setImageLoaded] = useState(false)
  const { themeData } = useTheme();
  const isDark = themeData?.id === DARK_THEME_ID

  const onImageLoadEnd = (isSuccess: boolean) => {
    setImageLoaded(isSuccess)
  }

  const onPress = () => {
    if (nid) {
      const screenName = isAlbum ? ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN : ScreensConstants.ARTICLE_DETAIL_SCREEN
      navigation.navigate(screenName, { nid })
    }
  }
  const timeFormat = dateTimeAgo(created);
  carouselFooterSample.hideBookmark = hideBookmark;

  return (
    <FixedTouchable onPress={onPress}>
      <View style = {[carouselContainerStyle]}> 
        {titleOnTop && isNotEmpty(title) &&
          <View style={[imageArticleStyle.titleContainer,tabTitleContainer, {marginTop: normalize(26)}]}>
            <Label labelType={LabelTypeProp.title1}
              children={decodeHTMLTags(title)}
              style={titleStyle}
            />
          </View>
        }
        <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer, containerStyle])}>          
          <BannerImageWithOverlay image={image}
            onImageLoadEnd={onImageLoadEnd}
            displayType={displayType}
            isImageLoaded={isImageLoaded}
            isAlbum={isAlbum}
          />
        </View>
        <View style={isTab ? [imageArticleStyle.tabArticleContent, contentStyle ] : imageArticleStyle.articleContent}>
          {!titleOnTop && isNotEmpty(title) &&
            <View style={[imageArticleStyle.titleContainer,tabTitleContainer]}>
              <Label labelType={LabelTypeProp.title1}
                children={decodeHTMLTags(title)}
                style={titleStyle}
              />
            </View>
          }
          {isNotEmpty(body) && showBody &&
            <Label children={decodeHTMLTags(body)}
            numberOfLines={3} ellipsizeMode={'clip'} style={[imageArticleStyle.labelStyle, textStyles]}/>
          }
          <View style={imageArticleStyle.tabFooterContainer}>
            <ArticleFooter {...carouselFooterSample}
              leftTitle={author} rightTitle={timeFormat.time}
              isBookmarked={isBookmarked}
              onPress={onPressBookmark}
              leftTitleColor={leftTitleColor || Styles.color.greenishBlue}
              rightTitleColor={isDark ? Styles.color.silverChalice : isTab ? Styles.color.black900 : Styles.color.black}
              bookMarkColorType={BookMarkColorType.BLACK}
              rightContainerStyle={rightContainerStyle}
              rightIcon={() => TimeIcon(timeFormat.icon)}
            />
          </View>
          {showDivider && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
        </View>
      </View>
    </FixedTouchable>
  )
}

export default ImageArticle;

const imageArticleStyle = StyleSheet.create({
  sliderItemContainer: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1.34,
   
  },
  slideContent: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 0.04 * screenWidth,
    paddingVertical: normalize(15),
  },
  tabletFooterStyle: {
    width: 0.40 * screenWidth,
    paddingRight: normalize(20)
  },
  footerContent: {
    width: '100%',
    flex: 1,
    paddingVertical: normalize(15),
  },
  headNewsContainer: {
    paddingHorizontal: 0.04 * screenWidth,
    paddingVertical: normalize(10),
  },
  footerContainer: {
    paddingTop: normalize(20)
  },
  tabArticleContent: {
    marginHorizontal: isTab ? 0 : 0.04 * screenWidth,
    marginTop: normalize(10),
    marginBottom: isTab ? 10 : normalize(25),
  },
  articleContent:{
     marginHorizontal: 0.04 * screenWidth,
     marginTop: normalize(10),
  },
  titleContainer: {
    paddingBottom: normalize(10),
  },
  tabFooterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(15),
  },
  labelStyle: {
    color: Styles.color.davyGrey
  }
});

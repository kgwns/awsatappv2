import React, { useState } from 'react'
import { View, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArticleFooter } from '../molecules'
import { BannerImageWithOverlay, Divider, Label, LabelTypeProp, BannerImageWithOverlayProps } from '../atoms'
import { articleFooterProps, BookMarkColorType } from '../molecules/articleFooter/ArticleFooter'
import { isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScreensConstants } from 'src/constants'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { dateTimeAgo, decodeHTMLTags, TimeIcon } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import { DARK_THEME_ID } from '../../shared/styles/colors'

const carouselFooterSample: articleFooterProps = {
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
  rightTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular, fontSize: 12, lineHeight:20,}
}

export interface ImageArticleProps extends BannerImageWithOverlayProps {
  title: string,
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
  contentStyle?: StyleProp<TextStyle>
}

const ImageArticle = ({
  image,
  title,
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
  contentStyle
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
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
    }
  }

  const timeFormat = dateTimeAgo(created)
  return (
    <FixedTouchable onPress={onPress}>
      <View>
        <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer, containerStyle])}>
          <BannerImageWithOverlay image={image} onImageLoadEnd={onImageLoadEnd} isImageLoaded={isImageLoaded} />
        </View>
        <View style={isTab ? [imageArticleStyle.tabArticleContent, contentStyle ] : imageArticleStyle.articleContent}>
          {isNotEmpty(title) &&
            <View style={imageArticleStyle.titleContainer}>
              <Label labelType={LabelTypeProp.title1}
                children={decodeHTMLTags(title)}
                style={titleStyle}
              />
            </View>
          }
          {isNotEmpty(body) && showBody &&
            <Label children={decodeHTMLTags(body)}
            color={Styles.color.davyGrey} numberOfLines={3} style={textStyles}/>
          }
          <View style={imageArticleStyle.tabFooterContainer}>
            <ArticleFooter {...carouselFooterSample}
              leftTitle={author} rightTitle={timeFormat.time}
              isBookmarked={isBookmarked}
              onPress={onPressBookmark}
              leftTitleColor={leftTitleColor || Styles.color.greenishBlue}
              rightTitleColor={isDark ? Styles.color.silverChalice : Styles.color.black}
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
    width: screenWidth,
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
  }
});

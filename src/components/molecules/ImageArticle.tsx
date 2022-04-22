import React, { useState } from 'react'
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback, StyleProp } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArticleFooter } from '../molecules'
import { BannerImageWithOverlay, Label, LabelTypeProp } from '../atoms'
import { articleFooterProps, BookMarkColorType } from '../molecules/articleFooter/ArticleFooter'
import { isNotEmpty, normalize, screenWidth, timeAgo } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from '../atoms'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScreensConstants } from 'src/constants'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { decodeHTMLTags } from 'src/shared/utils/utilities'

const carouselFooterSample: articleFooterProps = {
    leftTitleColor: Styles.color.white,
    rightIcon: () => {return getSvgImages({
        name: ImagesName.clock,
        size: normalize(12),
        style: { marginRight: normalize(5) }
    })},
    rightTitleColor: Styles.color.silverChalice,
    bookMarkColorType: BookMarkColorType.WHITE,
    leftTitleStyle: { fontWeight: 'bold' }
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
    hasTabletLayout: boolean
    rightContainerStyle?: StyleProp<ViewStyle>
}

const  ImageArticle = ({
    image,
    title,
    containerStyle,
    nid,
    author,
    created,
    isBookmarked,
    onPressBookmark,
    isTabFooterInside = true,
    body,
    hasTabletLayout = false,
    rightContainerStyle
}: ImageArticleProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()

    const { themeData } = useTheme()

    const [isImageLoaded , setImageLoaded] = useState(false)

    const onImageLoadEnd = (isSuccess: boolean) => {
        setImageLoaded(isSuccess)
    }

    const onPress = () => {
        if (nid) {
            navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View>
                <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer, containerStyle])}>
                    <BannerImageWithOverlay image={image} onImageLoadEnd={onImageLoadEnd} isImageLoaded={isImageLoaded} />
                    {!hasTabletLayout && <View style={imageArticleStyle.slideContent}>
                        <Label labelType={LabelTypeProp.h1} children={title} color={Styles.color.white} />
                        {isTabFooterInside && isImageLoaded &&
                            <View style={imageArticleStyle.footerContainer}>
                                <ArticleFooter {...carouselFooterSample} leftTitle={author} rightTitle={timeAgo(created)}
                                    isBookmarked={isBookmarked}
                                    onPress={onPressBookmark}
                                />
                            </View>
                        }
                    </View>
                    }
                </View>
                {!hasTabletLayout && !isTabFooterInside &&
                    <View style={imageArticleStyle.tabletFooterStyle}>
                        <View style={imageArticleStyle.footerContent}>
                            <ArticleFooter {...carouselFooterSample} leftTitle={author}
                                rightTitle={timeAgo(created)}
                                isBookmarked={isBookmarked}
                                onPress={onPressBookmark}
                                leftTitleColor={Styles.color.greenishBlue}
                                bookMarkColorType={BookMarkColorType.BLACK}
                            />
                        </View>
                    </View>
                }
                {hasTabletLayout && <View style={imageArticleStyle.tabArticleContent}>
                    <View style={imageArticleStyle.tabTitleContainer}>
                        <Label labelType={LabelTypeProp.h1} children={title} color={themeData.primaryBlack} />
                    </View>
                    {isNotEmpty(body) &&
                        <Label labelType={LabelTypeProp.p3} children={decodeHTMLTags(body)}
                            color={Styles.color.davyGrey} numberOfLines={2} />
                    }
                    <View style={imageArticleStyle.tabFooterContainer}>
                        <ArticleFooter {...carouselFooterSample}
                            leftTitle={author} rightTitle={timeAgo(created)}
                            isBookmarked={isBookmarked}
                            onPress={onPressBookmark}
                            leftTitleColor={Styles.color.greenishBlue}
                            rightTitleColor={Styles.color.silverChalice}
                            bookMarkColorType={BookMarkColorType.BLACK}
                            rightContainerStyle={rightContainerStyle}
                        />
                    </View>
                </View>}
            </View>
        </TouchableWithoutFeedback>

    )
}

export default ImageArticle;

const imageArticleStyle = StyleSheet.create({
  sliderItemContainer: {
    width: screenWidth,
    height: 0.85 * screenWidth,
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
    paddingVertical: normalize(20),
    marginHorizontal: 0.02 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitleContainer: {
    paddingBottom: normalize(10)
  },
  tabFooterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    paddingTop: normalize(10),
  }
});

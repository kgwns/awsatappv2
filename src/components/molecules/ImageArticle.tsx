import React from 'react'
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArticleFooter } from '../molecules'
import { BannerImageWithOverlay, Label, LabelTypeProp } from '../atoms'
import { articleFooterProps, BookMarkColorType } from '../molecules/articleFooter/ArticleFooter'
import { normalize, screenWidth, timeAgo } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from '../atoms'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScreensConstants } from 'src/constants'
import { useTranslation } from 'react-i18next'
import { getSvgImages } from 'src/shared/styles/svgImages'

const carouselFooterSample: articleFooterProps = {
    leftTitleColor: Styles.color.white,
    rightIcon: () => {return getSvgImages({
        name: ImagesName.clock,
        size: normalize(12),
        style: { marginRight: normalize(5) }
    })},
    rightTitleColor: Styles.color.silverChalice,
    bookMarkColorType: BookMarkColorType.WHITE
}

export interface ImageArticleProps extends BannerImageWithOverlayProps {
    title: string,
    containerStyle?: ViewStyle,
    nid?: string,
    author: string,
    created: string
}

const ImageArticle = ({
    image, title, containerStyle, nid, author, created
}: ImageArticleProps) => {
    const [t] = useTranslation();
    const rightTitle = t(timeAgo(created))
    const navigation = useNavigation<StackNavigationProp<any>>()
    const onPress = () => {
        if (nid) {
            navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer, containerStyle])}>
                <BannerImageWithOverlay image={image} />
                <View style={imageArticleStyle.slideContent}>
                    <Label labelType={LabelTypeProp.h1} children={title} color={Styles.color.white} />
                    <ArticleFooter {...carouselFooterSample} leftTitle={author} rightTitle={timeAgo(created)}/>
                </View>
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
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(15),
  },
  headNewsContainer: {
    paddingHorizontal: 0.04 * screenWidth,
    paddingVertical: normalize(10),
  },
});

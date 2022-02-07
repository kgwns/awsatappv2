import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArticleFooter } from '../molecules'
import { BannerImageWithOverlay, Label, LabelTypeProp } from '../atoms'
import { articleFooterProps, BookMarkColorType } from '../molecules/articleFooter/ArticleFooter'
import { normalize, screenWidth } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from '../atoms'

const carouselFooterSample: articleFooterProps = {
    leftTitle: 'وتمجيد',
    leftTitleColor: Styles.color.white,
    rightTitle: 'يتحمل',
    rightIcon: ImagesName.clock,
    rightTitleColor: Styles.color.smokeyGrey,
    bookMarkColorType: BookMarkColorType.WHITE
}

export interface ImageArticleProps extends BannerImageWithOverlayProps {
    title: string,
    containerStyle?: ViewStyle
}

const ImageArticle = ({
    image, title, containerStyle
}: ImageArticleProps) => {
    return (
        <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer, containerStyle])}>
            <BannerImageWithOverlay image={image} />
            <View style={imageArticleStyle.slideContent}>
                <Label labelType={LabelTypeProp.h1} children={title} color={Styles.color.white} />
                <ArticleFooter {...carouselFooterSample} />
            </View>
        </View>
    )
}

export default ImageArticle

const imageArticleStyle = StyleSheet.create({
    sliderItemContainer: {
        width: screenWidth,
        height: 0.85 * screenWidth
    },
    slideContent: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: normalize(8),
        alignSelf: 'center',
        paddingVertical: normalize(15)
    },
    headNewsContainer: {
        paddingHorizontal: 0.04 * screenWidth,
        paddingVertical: normalize(10)
    }
})

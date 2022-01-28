import React from 'react'
import { View,StyleSheet} from 'react-native'
import { ImagesName, Styles } from '../../shared/styles'
import { ArticleFooter } from '../molecules'
import { BannerImageWithOverlay, Label, LabelTypeProp } from '../atoms'
import { articleFooterProps, BookMarkColorType } from '../molecules/articleFooter/ArticleFooter'
import { normalize, screenWidth } from '../../shared/utils'

const carouselFooterSample: articleFooterProps = {
    leftTitle: 'وتمجيد',
    leftTitleColor: Styles.color.white,
    rightTitle: 'يتحمل',
    rightIcon: ImagesName.clock,
    rightTitleColor: Styles.color.smokeyGrey,
    bookMarkColorType: BookMarkColorType.WHITE
}

export interface ImageArticleProps {
   image?: string,
   title: string
}

const ImageArticle = ({
   image,title
}: ImageArticleProps) => {
    return (
        <View style={imageArticleStyle.sliderItemContainer}>
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
        height: 1.05 * screenWidth
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

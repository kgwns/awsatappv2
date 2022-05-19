import React, { useState } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { Styles } from 'src/shared/styles'
import { BannerImageWithOverlay, Label, LabelTypeProp } from 'src/components/atoms'
import { isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from 'src/components/atoms'
import { ArticleOverlayContent } from '../articleOverlayContent/ArticleOverlayContent'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'

export interface ImageArticleProps extends BannerImageWithOverlayProps {
    category?: string,
    title?: string,
    containerStyle?: ViewStyle,
    author: string,
    created: string,
    isRelatedArticle: boolean,
    caption?: string
    isFirstItem?: boolean;
    subtitle?: string 
}
const ArticleDetailImage = ({
    image,
    isRelatedArticle,
    caption,
    isFirstItem,
    ...props
}: ImageArticleProps) => {

    const imageArticleStyle = useThemeAwareObject(customStyle)

    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    const onImageLoaded = () => {
        setImageLoaded(true)
    }

    const renderCaption = () => {
        if (!isNotEmpty(caption)) return null

        return (
            <View style={imageArticleStyle.captionView}>
                <Label children={caption} labelType={LabelTypeProp.p5}
                    color={Styles.color.lightGray}
                    style={{
                        paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
                        fontFamily: fonts.AwsatDigitalBetav10_Regular
                    }}
                />
            </View>
        )
    }

    return (
        <View>
            <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer])}>
                <BannerImageWithOverlay image={image}
                    onImageLoadEnd={onImageLoaded} isImageLoaded={imageLoaded}
                    showOverlay={isFirstItem}
                />
            </View>
            {renderCaption()}
            <View style={imageArticleStyle.tabSlideContent}>
                <ArticleOverlayContent {...props} />
            </View>
        </View>
    )
}

export default ArticleDetailImage

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    sliderItemContainer: {
        flex: 1,
        width: '100%',
        height: 'auto',
        aspectRatio: 1.62,
    },
    slideContent: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
        paddingVertical: normalize(15),
        width: '100%'
    },
    headNewsContainer: {
        paddingHorizontal: 0.04 * screenWidth,
        paddingVertical: normalize(10)
    },
    tabSlideContent: {
        width: '100%',
        paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
        paddingVertical: normalize(15),
    },
    captionView: {
        backgroundColor: theme.captionBackground, 
        paddingVertical: 4
    }
})

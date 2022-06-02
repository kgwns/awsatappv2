import React, { useState } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { Styles } from 'src/shared/styles'
import { BannerImageWithOverlay, Label, LabelTypeProp } from 'src/components/atoms'
import { isIOS, isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from 'src/components/atoms'
import { ArticleOverlayContent } from '../articleOverlayContent/ArticleOverlayContent'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'
import ArticleDetailVideo from 'src/components/molecules/articleDetailVideo/ArticleDetailVideo'

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
    jwplayerId?: string ,
    currentTime?: any,
    paused: boolean,
    playerVisible?: boolean,
    setPlayerDetails?: ( time:any, paused: any) => void; 
}
const ArticleDetailImage = ({
    image,
    isRelatedArticle,
    caption,
    isFirstItem,
    category,
    jwplayerId,
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
                        fontFamily: fonts.Almaria_Regular,
                        fontSize: 12,
                        lineHeight: 20,
                    }}
                />
            </View>
        )
    }

    const renderTagName = () => {
        if (!isNotEmpty(category)) return null

        return (
            <View style={imageArticleStyle.tagNameViewStyle}>
                <Label labelType={LabelTypeProp.h3} children={category}
                    color={Styles.color.white} style={imageArticleStyle.tagNameStyle}
                />
            </View>
        )
    }

    return (
        <View>
            
            <View>
                <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer])}>
                { isNotEmpty(jwplayerId) ? <ArticleDetailVideo mediaId={jwplayerId} {...props}  /> : 
                    <BannerImageWithOverlay image={image}
                        onImageLoadEnd={onImageLoaded} isImageLoaded={imageLoaded}
                        showOverlay={false}
                    />
                }
                    {!isNotEmpty(jwplayerId) && renderTagName()}
                </View>
                {renderCaption()}
                <View style={imageArticleStyle.tabSlideContent}>
                    <ArticleOverlayContent {...props} />
                </View>
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
    },
    tagNameViewStyle: {
        flexWrap: 'wrap',
        position: 'absolute',
        left: normalize(15),
        top: 11,
        backgroundColor: Styles.color.greenishBlue,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1
    },
    tagNameStyle: {
        paddingHorizontal: normalize(10),  
        fontFamily: fonts.Almaria_Regular,
        lineHeight: isIOS ? 28 : 25
    },
})

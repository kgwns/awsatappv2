import React, { useState } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { Styles } from 'src/shared/styles'
import { BannerImageWithOverlay, Label, LabelTypeProp, BannerImageWithOverlayProps } from 'src/components/atoms'
import { isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { ArticleOverlayContent } from '../articleOverlayContent/ArticleOverlayContent'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'
import ArticleDetailVideo from 'src/components/molecules/articleDetailVideo/ArticleDetailVideo'
import { decode } from 'html-entities'

export interface ImageArticleProps extends BannerImageWithOverlayProps {
    category?: string,
    title?: string,
    containerStyle?: ViewStyle,
    author: string,
    created: string,
    isRelatedArticle: boolean,
    caption?: string
    isFirstItem?: boolean;
    isFullScreen?: boolean,
    subtitle?: string 
    jwplayerId?: string ,
    currentTime?: any,
    paused: boolean,
    playerVisible?: boolean,
    setPlayerDetails?: ( time:any, paused: any) => void;
    setMiniPlayerVisible?: (visible: boolean) => void;
    onChangeFullScreen?: (isFullScreen: boolean) => void;
    videoRefs?: any;
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
        if (!isNotEmpty(caption)) {
            return null
        }

        return (
            <View style={imageArticleStyle.captionView}>
                <Label children={decode(caption)} labelType={LabelTypeProp.p5}
                    color={Styles.color.lightGray}
                    style={{
                        paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
                        fontFamily: fonts.AwsatDigital_Regular,
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
                <Label labelType={LabelTypeProp.h3} children={decode(category)}
                    color={Styles.color.white} style={imageArticleStyle.tagNameStyle}
                />
            </View>
        )
    }

    return (
        <View>
            
            <View>
                <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer])}>
                { isNotEmpty(jwplayerId) && isFirstItem ? <ArticleDetailVideo mediaId={jwplayerId} {...props}  /> : 
                    <BannerImageWithOverlay image={image}
                        onImageLoadEnd={onImageLoaded} isImageLoaded={imageLoaded}
                        showOverlay={false}
                    />
                }
                {!isNotEmpty(jwplayerId) && renderTagName()}
                </View>
                {!isNotEmpty(jwplayerId) && renderCaption()}
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
        aspectRatio: 1.34,
       
    },
    tabSlideContent: {
        width: '100%',
        paddingHorizontal: 0.04 * screenWidth,
        paddingTop: normalize(5),
    },
    captionView: {
        backgroundColor: theme.captionBackground, 
        paddingVertical: 4
    },
    tagNameViewStyle: {
        flexWrap: 'wrap',
        position: 'absolute',
        left: isTab ? normalize(30) : normalize(15),
        top: 0,
        backgroundColor: Styles.color.greenishBlue,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1
    },
    tagNameStyle: {
        paddingHorizontal: normalize(10),
        fontSize:  isTab ? 16 : 12, 
        fontFamily: fonts.AwsatDigital_Regular,
        lineHeight: isTab ? 25 : 18
    },
})

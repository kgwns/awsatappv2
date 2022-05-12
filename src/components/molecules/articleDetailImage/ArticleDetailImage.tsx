import React, { useState } from 'react'
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { BannerImageWithOverlay, Label, LabelTypeProp } from 'src/components/atoms'
import { isIOS, isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import Orientation from 'react-native-orientation-locker'
import { ArticleOverlayContent } from '../articleOverlayContent/ArticleOverlayContent'
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants'
import { getSvgImages } from 'src/shared/styles/svgImages'
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
}
const ArticleDetailImage = ({
    image,
    isRelatedArticle,
    caption,
    isFirstItem,
    ...props
}: ImageArticleProps) => {
    const navigation = useNavigation()
    const CONST_RETURN = TranslateConstants({key: TranslateKey.RETURN})

    const imageArticleStyle = useThemeAwareObject(customStyle)

    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    const onPressBack = () => {
        if (!isRelatedArticle) {
            Orientation.unlockAllOrientations()
            Orientation.lockToPortrait()
        }
        navigation.goBack()
    }

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
                        fontFamily: fonts.Almaria_Regular
                    }}
                />
            </View>
        )
    }

    const renderBackIcon = () => {
        if (!isFirstItem) return null
        return (
            <TouchableOpacity testID={'onPressbackTestID'}
                style={imageArticleStyle.returnStyle}
                onPress={onPressBack}>
                {
                    getSvgImages({
                        name: imageLoaded ? ImagesName.returnWhiteIcon : ImagesName.returnBlackSvg,
                        width: normalize(12),
                        height: normalize(8.8),
                        style: imageArticleStyle.prevIconStyle
                    })
                }
                <Label style={[imageArticleStyle.prevTitleStyle,
                { color: imageLoaded ? Styles.color.white : Styles.color.black }]}
                    children={CONST_RETURN}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer])}>
                <BannerImageWithOverlay image={image}
                    onImageLoadEnd={onImageLoaded} isImageLoaded={imageLoaded}
                    showOverlay={isFirstItem}
                />
                {renderBackIcon()}
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
    prevIconStyle: {
        width: normalize(12),
        height: normalize(8.8),
        marginEnd: normalize(5),
        paddingTop: isIOS ? 10 : 9,
        alignItems: 'center',
        paddingHorizontal: normalize(10)
    },
    prevTitleStyle: {
        fontSize: normalize(14),
        lineHeight: normalize(32),
        color: Styles.color.white,
        fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    returnStyle: {
        flexDirection: 'row',
        position: 'absolute',
        left: normalize(15),
        alignContent: 'center',
        top: isIOS ? normalize(50) : normalize(20),
        flexWrap: 'wrap',
        alignItems: 'center',
        color: Styles.color.white
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

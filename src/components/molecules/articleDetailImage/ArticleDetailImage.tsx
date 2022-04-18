import React from 'react'
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import { Styles } from 'src/shared/styles'
import { BannerImageWithOverlay, Label } from 'src/components/atoms'
import { isIOS, isTab, normalize, screenWidth } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from 'src/components/atoms'
import ReturnArrow from 'src/assets/images/icons/returnArrow.svg'
import { useNavigation } from '@react-navigation/native'
import Orientation from 'react-native-orientation-locker'
import { ArticleOverlayContent } from '../articleOverlayContent/ArticleOverlayContent'
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants'

export interface ImageArticleProps extends BannerImageWithOverlayProps {
    category?: string,
    title?: string,
    containerStyle?: ViewStyle,
    author: string,
    created: string,
    isRelatedArticle: boolean,
}
const ArticleDetailImage = ({
    image,
    isRelatedArticle,
    ...props
}: ImageArticleProps) => {
    const navigation = useNavigation()

    const CONST_RETURN = TranslateConstants({key: TranslateKey.RETURN})

    const onPressBack = () => {
        if (!isRelatedArticle) {
            Orientation.unlockAllOrientations()
            Orientation.lockToPortrait()
        }
        navigation.goBack()
    }

    return (
        <View>
            <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer])}>
                <BannerImageWithOverlay image={image} />
                <TouchableOpacity testID={'onPressbackTestID'}
                    style={imageArticleStyle.returnStyle}
                    onPress={onPressBack}>
                    <ReturnArrow style={imageArticleStyle.prevIconStyle} />
                    <Label style={imageArticleStyle.prevTitleStyle} children={CONST_RETURN} />
                </TouchableOpacity>
                {!isTab && <View style={imageArticleStyle.slideContent}>
                    <ArticleOverlayContent {...props} />
                </View>}
            </View>
            {isTab && <View style={imageArticleStyle.tabSlideContent}>
                <ArticleOverlayContent {...props} />
            </View>}
        </View>
    )
}

export default ArticleDetailImage

const containerHeight = isTab ? 0.5 * screenWidth : 1.05 * screenWidth
const imageArticleStyle = StyleSheet.create({
    sliderItemContainer: {
        flex: 1,
        width: '100%',
        height: containerHeight
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
        alignItems: 'center',
        color: Styles.color.white,
        paddingHorizontal: normalize(10)
    },
    prevTitleStyle: {
        fontSize: normalize(13),
        lineHeight: normalize(16),
        color: Styles.color.white
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
    }
})

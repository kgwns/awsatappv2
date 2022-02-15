import React from 'react'
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArticleFooter } from 'src/components/molecules'
import { BannerImageWithOverlay, Label, LabelTypeProp } from 'src/components/atoms'
import { articleFooterProps } from 'src/components/molecules/articleFooter/ArticleFooter'
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from 'src/components/atoms'
import ReturnArrow from 'src/assets/images/icons/returnArrow.svg'
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'

const articleDetailFooterData: articleFooterProps = {
    leftTitle: 'وتمجيد',
    leftTitleColor: Styles.color.white,
    leftIcon: ImagesName.clock,
    rightTitleColor: Styles.color.white,
    hideBookmark: true
}

export interface ImageArticleProps extends BannerImageWithOverlayProps {
    category?: string,
    title?: string,
    containerStyle?: ViewStyle,
    author: string
}
const ArticleDetailImage = ({
    image, category, title, author
}: ImageArticleProps) => {
    const [t] = useTranslation();
    const navigation = useNavigation()

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer])}>
            <BannerImageWithOverlay image={image} />
            <TouchableOpacity style={imageArticleStyle.returnStyle} onPress={onPressBack}>
                <ReturnArrow style={imageArticleStyle.prevIconStyle} />
                <Label style={imageArticleStyle.prevTitleStyle}>
                    {t('onBoard.common.return')}
                </Label>
            </TouchableOpacity>
            <View style={imageArticleStyle.slideContent}>
                <View style={imageArticleStyle.tagNameViewStyle}>
                    <Label labelType={LabelTypeProp.h3} children={category} color={Styles.color.white} style={imageArticleStyle.tagNameStyle} />
                </View>
                <Label labelType={LabelTypeProp.h1}
                    children={title}
                    color={Styles.color.white}
                    style={{ paddingBottom: normalize(5), paddingTop: normalize(15) }} />
                <ArticleFooter {...articleDetailFooterData} rightTitle={author}/>
            </View>
        </View>
    )
}

export default ArticleDetailImage

const containerHeight = isTab ? 0.5 * screenWidth : 1.05 * screenWidth
const imageArticleStyle = StyleSheet.create({
    sliderItemContainer: {
        width: screenWidth,
        height: containerHeight
    },
    slideContent: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(15)
    },
    headNewsContainer: {
        paddingHorizontal: 0.04 * screenWidth,
        paddingVertical: normalize(10)
    },
    tagNameViewStyle: {
        opacity: 0.7,
        flexWrap: 'wrap'
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
        left: normalize(30),
        alignContent: 'center',
        top: normalize(50),
        flexWrap: 'wrap',
        alignItems: 'center',
        color: Styles.color.white
    },
    tagNameStyle: {
        paddingHorizontal: normalize(10),
        backgroundColor: Styles.color.darkGreenishBlue,
        flexWrap: 'wrap'
    }
})

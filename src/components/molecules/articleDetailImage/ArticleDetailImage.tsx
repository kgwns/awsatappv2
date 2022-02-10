import React from 'react'
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArticleFooter } from 'src/components/molecules'
import { BannerImageWithOverlay, Label, LabelTypeProp } from 'src/components/atoms'
import { articleFooterProps } from 'src/components/molecules/articleFooter/ArticleFooter'
import { normalize, screenWidth } from 'src/shared/utils'
import { BannerImageWithOverlayProps } from 'src/components/atoms'
import ReturnArrow from 'src/assets/images/icons/returnArrow.svg'
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'

const imageArticleSample: articleFooterProps = {
    leftTitle: 'وتمجيد',
    leftTitleColor: Styles.color.white,
    rightTitle: 'يتحمل',
    leftIcon: ImagesName.clock,
    rightTitleColor: Styles.color.white,
    hideBookmark: true
}

export interface ImageArticleProps extends BannerImageWithOverlayProps {
    title: string,
    description?: string,
    containerStyle?: ViewStyle
}
const ArticleDetailImage = ({
    image, title, description, containerStyle
}: ImageArticleProps) => {
    const [t] = useTranslation();
    const navigation = useNavigation()

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={StyleSheet.flatten([imageArticleStyle.sliderItemContainer, containerStyle])}>
            <BannerImageWithOverlay image={image} />
            <TouchableOpacity style={imageArticleStyle.returnStyle} onPress={onPressBack}>
                <ReturnArrow style={imageArticleStyle.prevIconStyle} />
                <Label style={imageArticleStyle.prevTitleStyle}>
                    {t('onBoard.common.return')}
                </Label>
            </TouchableOpacity>
            <View style={imageArticleStyle.slideContent}>
                <View style={imageArticleStyle.titleViewStyle}>
                    <Label labelType={LabelTypeProp.h2} children={title} color={Styles.color.white} style={imageArticleStyle.titleStyle} />
                </View>
                <Label labelType={LabelTypeProp.h1}
                    children={description}
                    color={Styles.color.white}
                    style={{ paddingBottom: normalize(20), paddingTop: normalize(15) }} />
                <ArticleFooter {...imageArticleSample} />
            </View>
        </View>
    )
}

export default ArticleDetailImage

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
    },
    titleViewStyle: {
        opacity: 0.7,
        flexWrap: 'wrap',
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
    titleStyle: {
        paddingHorizontal: normalize(10),
        backgroundColor: Styles.color.darkGreenishBlue,
        flexWrap: 'wrap'
    }
})

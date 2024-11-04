import React from 'react'
import { View, StyleSheet } from 'react-native'
import { isNonEmptyArray, isTab, isTypeAlbum, normalize } from 'src/shared/utils'
import { ImageArticle } from '../molecules'
import { MainSectionBlockType } from 'src/redux/latestNews/types'
import { fonts } from 'src/shared/styles/fonts'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'

type CarouselSliderProps = {
    info: MainSectionBlockType[],
    hideBookmark?: boolean,
    titleOnTop?: boolean,
    onUpdateHeroBookmark: (index: number) => void
}

const CarouselSlider = ({
    info, hideBookmark, titleOnTop, onUpdateHeroBookmark
}: CarouselSliderProps) => {
    const carouselSliderStyle = useThemeAwareObject(customStyle);

    return (
        <View style={carouselSliderStyle.view}>
            {isNonEmptyArray(info) &&
                <ImageArticle key={0} {...info[0]} author={''}
                    onPressBookmark={() => onUpdateHeroBookmark(0)}
                    // rightContainerStyle={{ flex: 0 }} //enable to center align
                    titleStyle={carouselSliderStyle.titleStyle}
                    titleOnTop={titleOnTop}
                    textStyles={carouselSliderStyle.textStyle}
                    isAlbum={isTypeAlbum(info[0].type)}
                    contentStyle = {isTab && carouselSliderStyle.tabContentStyle}
                    tabTitleContainer = {isTab && carouselSliderStyle.tabTitleContainer}
                    hideBookmark = {hideBookmark || isTab}
                    carouselContainerStyle = {isTab && carouselSliderStyle.carouselContainerStyle}
                />
            }
        </View>
    )
}

export default CarouselSlider

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    view: {
        marginBottom: normalize(20),
    },
    titleStyle:{
        textAlign:'center',
        fontSize: isTab ? 39 : 24,
        lineHeight: isTab ? 60 : 40,
        fontFamily: fonts.AwsatDigital_Black,
    },
    textStyle:{
        textAlign: 'left',
        writingDirection: 'rtl',
        fontSize: isTab ? 18 : normalize(16),
        lineHeight: isTab ? 30 : normalize(26),
        fontFamily: fonts.IBMPlexSansArabic_Regular,
        color: isTab ? theme.tabMostReadBodyColor : theme.summaryColor,
    },
    tabContentStyle: {
        width: '75%',
    },
    tabTitleContainer:{
        paddingBottom: normalize(10),
        width: '100%',
    },
    carouselContainerStyle: {
        alignItems:'center'
    }
})

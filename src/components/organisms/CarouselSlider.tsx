import React from 'react'
import { View, StyleSheet } from 'react-native'
import { isNonEmptyArray, isTab, isTypeAlbum, normalize } from 'src/shared/utils'
import { ImageArticle } from '../molecules'
import { MainSectionBlockType } from 'src/redux/latestNews/types'
import { fonts } from 'src/shared/styles/fonts'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'

type CarouselSliderProps = {
    coverageInfo: MainSectionBlockType[],
    onUpdateHeroBookmark: (index: number) => void
}

const CarouselSlider = ({
    coverageInfo, onUpdateHeroBookmark
}: CarouselSliderProps) => {
    const carouselSliderStyle = useThemeAwareObject(customStyle);

    return (
        <View style={!isTab && carouselSliderStyle.view}>
            {isNonEmptyArray(coverageInfo) &&
                <ImageArticle key={0} {...coverageInfo[0]} author={''}
                    onPressBookmark={() => onUpdateHeroBookmark(0)}
                    // rightContainerStyle={{ flex: 0 }} //enable to center align
                    titleStyle={carouselSliderStyle.titleStyle}
                    textStyles={carouselSliderStyle.textStyle}
                    isAlbum={isTypeAlbum(coverageInfo[0].type)}
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
        fontSize: isTab ? 33 : 24,
        lineHeight: isTab ? 50 : 40,
        fontFamily: fonts.AwsatDigital_Black,
    },
    textStyle:{
        textAlign: 'left',
        writingDirection: 'rtl',
        fontSize: normalize(16),
        lineHeight: normalize(26),
        fontFamily: fonts.IBMPlexSansArabic_Regular,
        color: theme.summaryColor,
    }
})

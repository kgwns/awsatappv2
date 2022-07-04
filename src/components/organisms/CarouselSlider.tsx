import React from 'react'
import { View, StyleSheet } from 'react-native'
import { isIOS, isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { ImageArticle } from '../molecules'
import { MainSectionBlockType } from 'src/redux/latestNews/types'
import { fonts } from 'src/shared/styles/fonts'

type CarouselSliderProps = {
    coverageInfo: MainSectionBlockType[],
    onUpdateHeroBookmark: (index: number) => void
}

const CarouselSlider = ({
    coverageInfo, onUpdateHeroBookmark
}: CarouselSliderProps) => {

    return (
        <View style={!isTab && carouselSliderStyle.view}>
            {isNonEmptyArray(coverageInfo) &&
                <ImageArticle key={0} {...coverageInfo[0]} author={''}
                    onPressBookmark={() => onUpdateHeroBookmark(0)}
                    // rightContainerStyle={{ flex: 0 }} //enable to center align
                    titleStyle={carouselSliderStyle.titleStyle}
                    textStyles={carouselSliderStyle.textStyle}
                />
            }
        </View>
    )
}

export default CarouselSlider

const carouselSliderStyle = StyleSheet.create({
    view: {
        marginBottom: normalize(20),
    },
    titleStyle:{
        textAlign:'center',
        fontSize: 24,
        lineHeight: 36,
        fontFamily: fonts.AwsatDigitalBetav10_Black,
    },
    textStyle:{
        textAlign:'justify',
        writingDirection: 'rtl',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: fonts.IBMPlexSansArabic_Regular,
    }
})

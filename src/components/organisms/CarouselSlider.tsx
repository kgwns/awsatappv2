import React from 'react'
import { View, StyleSheet } from 'react-native'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { ImageArticle } from '../molecules'
import { LatestArticleDataType } from 'src/redux/latestNews/types'

type CarouselSliderProps = {
    tickerData: LatestArticleDataType[],
    heroData: LatestArticleDataType[],
    onUpdateHeroBookmark: (index: number) => void
}

const CarouselSlider = ({
    heroData, onUpdateHeroBookmark
}: CarouselSliderProps) => {

    return (
        <View>
            {isNonEmptyArray(heroData) &&
                <ImageArticle key={0} {...heroData[0]}
                    onPressBookmark={() => onUpdateHeroBookmark(0)}
                    containerStyle={isTab ? carouselSliderStyle.tabletImageStyle : carouselSliderStyle.imageStyle}
                    rightContainerStyle={{ flex: 0.8 }}
                />
            }
        </View>
    )
}

export default CarouselSlider

const carouselSliderStyle = StyleSheet.create({
    headNewsContainer: {
        paddingHorizontal: 0.04 * screenWidth,
        paddingVertical: normalize(10)
    },
    imageStyle: {
        height: 0.66 * screenWidth
    },
    tabletImageStyle: {
        height: 0.5 * screenWidth
    }
})

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { isNonEmptyArray, screenWidth } from 'src/shared/utils'
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
                    containerStyle={carouselSliderStyle.imageStyle}
                    rightContainerStyle={{ flex: 0.8 }}
                    textStyles={{textAlign:'center'}}
                />
            }
        </View>
    )
}

export default CarouselSlider

const carouselSliderStyle = StyleSheet.create({
    imageStyle: {
        height: 0.66 * screenWidth
    },
})

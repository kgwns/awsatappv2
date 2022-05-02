import React from 'react'
import { View, StyleSheet } from 'react-native'
import { isNonEmptyArray, screenWidth } from 'src/shared/utils'
import { ImageArticle } from '../molecules'
import { MainSectionBlockType } from 'src/redux/latestNews/types'

type CarouselSliderProps = {
    coverageInfo: MainSectionBlockType[],
    onUpdateHeroBookmark: (index: number) => void
}

const CarouselSlider = ({
    coverageInfo, onUpdateHeroBookmark
}: CarouselSliderProps) => {

    return (
        <View>
            {isNonEmptyArray(coverageInfo) &&
                <ImageArticle key={0} {...coverageInfo[0]}
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

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
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
        <View style={!isTab && carouselSliderStyle.view}>
            {isNonEmptyArray(coverageInfo) &&
                <ImageArticle key={0} {...coverageInfo[0]} author={''}
                    onPressBookmark={() => onUpdateHeroBookmark(0)}
                    containerStyle={carouselSliderStyle.imageStyle}
                    rightContainerStyle={{ flex: 0 }}
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
    view: {
        marginBottom: normalize(20),
    }
})

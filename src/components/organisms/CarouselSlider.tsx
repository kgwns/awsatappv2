import React, { useRef, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { ImageArticle } from '../molecules'
import { articleProps } from './ArticleSection'
import { flatListUniqueKey } from '../../constants'
import { HeadlinesSection } from 'src/components/organisms';
import { LatestArticleDataType } from '~/redux/latestNews/types'

type CarouselSliderProps = {
    tickerData: LatestArticleDataType[],
    heroData: LatestArticleDataType[],
    onUpdateHeroBookmark: (index: number) => void
}

const CarouselSlider = ({
    tickerData, heroData, onUpdateHeroBookmark
}: CarouselSliderProps) => {
    const sliderRef = useRef<FlatList<articleProps>>(null)

    const renderItem = ({ item, index }: { item: articleProps, index: number }) => {
        return <ImageArticle key={index} {...item}
            onPressBookmark={() => onUpdateHeroBookmark(index)}
            containerStyle={isTab ? carouselSliderStyle.tabletImageStyle : carouselSliderStyle.imageStyle} />
    }
    return (
        <View>
            <View style={carouselSliderStyle.headNewsContainer}>
                {isNonEmptyArray(tickerData) ?
                    <HeadlinesSection
                        duration={10000}
                        loop
                        tickerData={tickerData} headlineTitle={''} headlineDescription={''}
                    /> : null
                } 
            </View>
            <FlatList
                ref={sliderRef}
                data={heroData}
                keyExtractor={(_, index) => index.toString()}
                listKey={flatListUniqueKey.CAROUSEL_WIDGET}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                bounces={false}
            />
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
        height: 1.05 * screenWidth
    },
    tabletImageStyle: {
        height: 0.5 * screenWidth
    }
})

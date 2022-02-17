import React, { useRef } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { ImageArticle } from '../molecules'
import { articleProps } from './ArticleSection'
import { flatListUniqueKey } from '../../constants'
import { HeadlinesSection } from 'src/components/organisms';
import { LatestArticleDataType } from '~/redux/latestNews/types'

type CarouselSliderProps = {
    tickerData: LatestArticleDataType[],
    heroData: LatestArticleDataType[]
}

const CarouselSlider = ({
    tickerData, heroData
}: CarouselSliderProps) => {
    let tickerCount = 0
    const sliderRef = useRef<FlatList<articleProps>>(null)
    const renderItem = ({ item, index }: { item: articleProps, index: number }) => {
        return <ImageArticle key={index} {...item}
            containerStyle={isTab ? carouselSliderStyle.tabletImageStyle : carouselSliderStyle.imageStyle} />
    }
    const renderData = ({ }: { item: articleProps, index: number }) => {
        tickerCount = tickerData.length
        return (
            <View style={carouselSliderStyle.headNewsContainer}>
                {tickerCount &&
                    <HeadlinesSection
                        duration={10000}
                        loop
                        tickerData={tickerData} headlineTitle={''} headlineDescription={''}
                    />
                }
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={tickerData}
                keyExtractor={(_, index) => index.toString()}
                listKey={flatListUniqueKey.CAROUSEL_WIDGET}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                renderItem={renderData}
                bounces={false}
            />
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

import React, { useRef } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { normalize, screenWidth } from '../../shared/utils'
import { ImageArticle } from '../molecules'
import { articleProps } from './ArticleSection'
import { TextWithFlag } from '../atoms'
import { flatListUniqueKey } from '../../constants'
import { sampleTextWithFlag } from '../../constants/SampleData'

const sampleCarouselData: articleProps[] = [
    {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }
]



const CarouselSlider = () => {
    const sliderRef = useRef<FlatList<articleProps>>(null)
    const renderItem = ({ item, index }: { item: articleProps, index: number }) => {
        return <ImageArticle image={item.image} title={item.title}/>
    }

    return (
        <View>
            <View style={carouselSliderStyle.headNewsContainer}>
                <TextWithFlag title={sampleTextWithFlag.title}
                    titleColor={sampleTextWithFlag.titleColor}
                    flag={sampleTextWithFlag.flag}
                    flagColor={sampleTextWithFlag.flagColor} 
                    barColor={sampleTextWithFlag.barColor}
                    labelType={sampleTextWithFlag.labelType}
                    numberOfLines={2} />
            </View>
            <FlatList
                ref={sliderRef}
                data={sampleCarouselData}
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
    }
})

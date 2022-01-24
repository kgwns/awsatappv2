import React, { useRef } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { ImageResize } from '../../shared/styles/text-styles'
import { Styles, ImagesName } from '../../shared/styles'
import { normalize, screenWidth } from '../../shared/utils'
import { Image, Label, LabelTypeProp } from '../atoms'
import { ArticleFooter } from '../molecules'
import { articleFooterProps, BookMarkColorType } from '../molecules/articleFooter/ArticleFooter'
import { articleProps } from './ArticleSection'
import { Overlay } from '../atoms'

const sampleCarouselData: articleProps[] = [
    {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }
]

const carouselFooterSample: articleFooterProps = {
    leftTitle: 'وتمجيد',
    leftTitleColor: Styles.color.white,
    rightTitle: 'يتحمل',
    rightIcon: ImagesName.clock,
    rightTitleColor: Styles.color.smokeyGrey,
    bookMarkColorType: BookMarkColorType.WHITE
}

const CarouselSlider = () => {
    const sliderRef = useRef<FlatList<articleProps>>(null)
    const renderItem = ({ item, index }: { item: articleProps, index: number }) => {
        return <View style={carouselSliderStyle.sliderItemContainer}>
            <Image url={item.image} style={carouselSliderStyle.image}
                   resizeMode={ImageResize.COVER}
            />
            <Overlay />
            <View style={carouselSliderStyle.slideContent}>
                <Label labelType={LabelTypeProp.h1} children={item.title} color={Styles.color.white} />
                <ArticleFooter {...carouselFooterSample} />
            </View>
        </View>
    }

    return (
        <View>
            <FlatList
                ref={sliderRef}
                data={sampleCarouselData}
                keyExtractor={(_, index) => index.toString()}
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
    sliderItemContainer: {
        width: screenWidth,
        height: 1.05 * screenWidth
    },
    image: {
        width: '100%',
        height: '100%'
    },
    slideContent: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: normalize(8),
        alignSelf: 'center',
        paddingVertical: normalize(15)
    }
})

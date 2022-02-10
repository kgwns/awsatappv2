import React, { useRef } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { ImageArticle } from '../molecules'
import { articleProps } from './ArticleSection'
import { flatListUniqueKey } from '../../constants'
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { HeadlinesSection } from 'src/components/organisms';
import { HeadlinesSectionProps } from './headlinesSection/HeadlinesSection';

const sampleCarouselData: articleProps[] = [
    {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }
]

const CarouselSlider = () => {
    const { themeData } = useTheme()
    const sampleHeadlinesSectionData: HeadlinesSectionProps = {
        headlineTitle: "آخر الأخبار",
        headlineTitleColor: themeData.secondaryDavyGrey,
        barColor: themeData.primary,
        headlineDescription: "فيما دخلت المساعي الرامية للتهدئة بين إسرائيل والفلسطينيين مراحلة متقدمة أمس، استمر التصعيد الميداني، في سباق الساعات الأخيرة قبل حسم مسار",
        headlineDescriptionColor: themeData.secondaryDarkSlate,
    }

    const sliderRef = useRef<FlatList<articleProps>>(null)
    const renderItem = ({ item, index }: { item: articleProps, index: number }) => {
        return <ImageArticle key={index} image={item.image} title={item.title}
            containerStyle={isTab ? carouselSliderStyle.tabletImageStyle : carouselSliderStyle.imageStyle} />
    }

    return (
        <View>
            <View style={carouselSliderStyle.headNewsContainer}>
                <HeadlinesSection
                    duration={10000}
                    loop
                    {...sampleHeadlinesSectionData}
                />
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
    },
    imageStyle: {
        height: 1.05 * screenWidth
    },
    tabletImageStyle: {
        height: 0.5 * screenWidth
    }
})

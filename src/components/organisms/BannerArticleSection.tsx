import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { WidgetHeader } from '../atoms'
import { authorHeaderData } from '../../constants/SampleData'
import { normalize, screenWidth } from '../../shared/utils'
import { Styles } from '../../shared/styles'
import { ArticleWithOutImage, ImageArticle } from '../molecules'
import { articleProps } from './ArticleSection'
import { shortArticleFooterSample } from './ShortArticle'

const sampleBannerArticleData: articleProps[] = [
    {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }
]

const sampleVerticalArticleData: articleProps[] = [
    {
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    },
    {
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    },
    {
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }
]

const BannerArticleSection = () => {
    const bannerItem = (item: articleProps, index: number) => {
        return (<ImageArticle {...item} />)
    }

    const articleNewsItem = (item: articleProps, index: number) => {
        return <ArticleWithOutImage {...item} footerInfo={shortArticleFooterSample} />
    }

    return (
        <View style={bannerArticleSectionStyle.container}>
            <View style={bannerArticleSectionStyle.headerContainer}>
                <WidgetHeader {...authorHeaderData} />
            </View>
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={sampleBannerArticleData}
                horizontal={true}
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => bannerItem(item, index)}
            />
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={sampleVerticalArticleData}
                style={bannerArticleSectionStyle.verticalList}
                horizontal={false}
                initialNumToRender={1} //Need to check for Tablet in later
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => articleNewsItem(item, index)}
            />
        </View>
    )
}

export default BannerArticleSection

const bannerArticleSectionStyle = StyleSheet.create({
    container: {
        paddingTop: normalize(5)
    },
    headerContainer: {
        paddingHorizontal: 0.04 * screenWidth
    },
    verticalList: {
        paddingHorizontal: 0.04 * screenWidth
    }
})

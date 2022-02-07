import React from 'react'
import { FlatList, View, StyleSheet, ScrollView } from 'react-native'
import { WidgetHeader } from '../atoms'
import { authorHeaderData } from 'src/constants/SampleData'
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { ArticleWithOutImage, ImageArticle } from 'src/components/molecules'
import { articleProps } from './ArticleSection'
import { shortArticleFooterSample } from './ShortArticle'
import { flatListUniqueKey } from 'src/constants'

const sampleBannerArticleData: articleProps[] = [
    {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    },
    {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    },
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
    const articleNewsItem = (item: articleProps, index: number) => {
        return <ArticleWithOutImage key={index} {...item}
            showDivider={index < sampleVerticalArticleData.length - 1} footerInfo={shortArticleFooterSample}
        />
    }

    const listHeaderSection = () => (
        <ScrollView horizontal={true} bounces={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {sampleBannerArticleData.map((item: articleProps, index: number) => {
                    if (isTab || index == 0) return <ImageArticle key={index} {...item}
                        containerStyle={isTab ? bannerArticleSectionStyle.tabletImageStyle : {}} />
                    return null
                })}
            </View>
        </ScrollView>
    )

    return (
        <View style={[bannerArticleSectionStyle.container, isTab && bannerArticleSectionStyle.tabContainer]}>
            <View style={!isTab && bannerArticleSectionStyle.headerContainer}>
                <WidgetHeader {...authorHeaderData} />
            </View>
            {listHeaderSection()}
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={sampleVerticalArticleData}
                listKey={flatListUniqueKey.BANNER_ARTICLE_LIST + new Date().getTime().toString()}
                style={!isTab && bannerArticleSectionStyle.verticalList}
                horizontal={false}
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
    tabContainer: {
        paddingHorizontal: 0.04 * screenWidth
    },
    headerContainer: {
        paddingHorizontal: 0.04 * screenWidth
    },
    verticalList: {
        paddingHorizontal: 0.04 * screenWidth
    },
    tabletImageStyle: {
        width: 0.40 * screenWidth,
        height: 0.42 * screenWidth,
        paddingRight: normalize(20)
    }
})

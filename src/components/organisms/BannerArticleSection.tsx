import React from 'react'
import { FlatList, View, StyleSheet, ScrollView } from 'react-native'
import { WidgetHeader } from '../atoms'
import { authorHeaderData } from 'src/constants/SampleData'
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { ArticleWithOutImage, ImageArticle } from 'src/components/molecules'
import { articleProps } from './ArticleSection'
import { shortArticleFooterSample } from './ShortArticle'
import { flatListUniqueKey } from 'src/constants'
import { LatestArticleDataType } from '~/redux/latestNews/types'

const BannerArticleSection = (props: { data: LatestArticleDataType[] }) => {
    const { data } = props
    const bannerData = [...data]
    const verticalArticleData = [...data].splice(1,3)
    const articleNewsItem = (item: articleProps, index: number) => {
        return <ArticleWithOutImage key={index} {...item}
            showDivider={index < verticalArticleData.length - 1} footerInfo={shortArticleFooterSample}
        />
    }

    const listHeaderSection = () => (
        <ScrollView horizontal={true} bounces={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {bannerData.map((item: articleProps, index: number) => {
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
                data={verticalArticleData}
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

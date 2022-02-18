import React from 'react'
import { FlatList, View, StyleSheet, ScrollView } from 'react-native'
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { articleFooterProps, ArticleWithOutImage, ImageArticle } from 'src/components/molecules'
import { articleProps } from './ArticleSection'
import { flatListUniqueKey } from 'src/constants'
import { LatestArticleDataType } from '~/redux/latestNews/types'
import { ImagesName,Styles } from 'src/shared/styles'
import { useTranslation } from 'react-i18next';
import { LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider'

export const sectionComboArticleFooter: articleFooterProps = {
    leftTitle: 'يتحمل',
    leftIcon: ImagesName.clock,
    leftTitleColor: Styles.color.silverChalice,
    rightTitleColor: Styles.color.silverChalice
}

const BannerArticleSection = (props: { data: LatestArticleDataType[], title: string }) => {
    const { data } = props
    const [t] = useTranslation()
    const { themeData } = useTheme()
    const bannerData = [...data].splice(0, 4)
    const verticalArticleData = isTab ?  [...data].splice(4, 2) : [...data].splice(1, 3)
    const articleNewsItem = (item: articleProps, index: number) => {
        sectionComboArticleFooter.rightTitle = item.author
        return <ArticleWithOutImage key={index} {...item}
            showDivider={index < verticalArticleData.length - 1}
            footerInfo={sectionComboArticleFooter}
        />
    }
    const widgetHeaderData: WidgetHeaderProps = {
        headerLeft: {
            title: props.title,
            color: themeData.primary,
            labelType: LabelTypeProp.h2,
        },
        headerRight: {
            title: t('latestNewsTab.sectionComboOne.headerRight'),
            icon: ImagesName.arrowLeftFaced,
            color: Styles.color.smokeyGrey,
            labelType: LabelTypeProp.h3,
            clickable: true,
        },
    };

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
            {props.data.length ? <View style={!isTab && bannerArticleSectionStyle.headerContainer}>
                <WidgetHeader {...widgetHeaderData} />
            </View> : null}
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

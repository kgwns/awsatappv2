import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, ScrollView } from 'react-native'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { articleFooterProps, ArticleWithOutImage, ImageArticle } from 'src/components/molecules'
import { articleProps } from './ArticleSection'
import { flatListUniqueKey, ScreensConstants } from 'src/constants'
import { LatestArticleDataType } from 'src/redux/latestNews/types'
import { ImagesName, Styles } from 'src/shared/styles'
import { useTranslation } from 'react-i18next';
import { Divider, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getSvgImages } from 'src/shared/styles/svgImages'

export const sectionComboArticleFooter: articleFooterProps = {
    leftTitle: 'يتحمل',
    leftIcon: () => {
        return getSvgImages({
            name: ImagesName.clock,
            size: normalize(12),
            style: { marginRight: normalize(5) }
        })
    },
    leftTitleColor: Styles.color.silverChalice,
    rightTitleColor: Styles.color.silverChalice,
}

interface BannerArticleSectionProps {
    data: LatestArticleDataType[],
    title: string,
    sectionId: string,
    onPress: (nid: string) => void,
    onUpdateBookmark: (item: any) => void,
    isDivider?: boolean 
}

const BannerArticleSection = (props: BannerArticleSectionProps) => {
    const { data, sectionId, onPress, onUpdateBookmark, isDivider } = props
    const [t] = useTranslation()
    const { themeData } = useTheme()
    const bannerData = [...data].splice(0, 4)
    const verticalArticleData = isTab ? [...data].splice(4, 2) : [...data].splice(1, 3)

    const articleNewsItem = (item: articleProps, index: number) => {
        sectionComboArticleFooter.rightTitle = item.author
        return <ArticleWithOutImage key={index} {...item}
            showDivider={index < verticalArticleData.length - 1}
            footerInfo={sectionComboArticleFooter}
            onPress={() => onPress(item.nid)}
            onPressBookmark={() => onUpdateBookmark(item)}
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
            icon: () => {
                return getSvgImages({
                    name: ImagesName.arrowLeftFaced,
                    size: normalize(12),
                    style: { marginLeft: normalize(10) }
                })
            },
            color: Styles.color.smokeyGrey,
            labelType: LabelTypeProp.h3,
            clickable: true,
        },
    };

    const navigation = useNavigation<StackNavigationProp<any>>();

    const listHeaderSection = () => (
        <ScrollView horizontal={true} bounces={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {bannerData.map((item: articleProps, index: number) => {
                    if (isTab || index == 0) return <ImageArticle key={index} {...item}
                        onPressBookmark={() => onUpdateBookmark(item)}
                        containerStyle={isTab ? bannerArticleSectionStyle.tabletImageStyle : {}}
                        isTabFooterInside={isTab?false:true} />
                    return null
                })}
            </View>
        </ScrollView>
    )


    const onPressMore = () => {
        navigation.navigate(ScreensConstants.SectionArticlesScreen, { sectionId: sectionId, title: props.title });
    }

    if (!isNonEmptyArray(data)) return null

    return (
        <View style={[bannerArticleSectionStyle.container, isTab && bannerArticleSectionStyle.tabContainer]}>
            {isDivider  && <Divider/>}
            <View style={!isTab && bannerArticleSectionStyle.headerContainer}>
                <WidgetHeader {...widgetHeaderData} onPress={onPressMore} />
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
        paddingHorizontal: 0.04 * screenWidth,
        paddingVertical: normalize(10)
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

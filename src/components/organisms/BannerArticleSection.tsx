import React from 'react'
import { FlatList, View, StyleSheet, StyleProp, ViewStyle, ListRenderItem } from 'react-native'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { ArticleFooterProps, ArticleWithOutImage, ImageArticle } from 'src/components/molecules'
import { flatListUniqueKey, ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { LatestArticleDataType } from 'src/redux/latestNews/types'
import { ImagesName, Styles } from 'src/shared/styles'
import { LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'
import { dateTimeAgo, isTypeAlbum, TimeIcon } from 'src/shared/utils/utilities'

export const sectionComboArticleFooter: ArticleFooterProps = {
    leftTitleColor: isTab ? Styles.color.black900 : Styles.color.silverChalice,
    rightTitleColor: Styles.color.silverChalice,
    leftTitleStyle: isTab ? {
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize: 13,
        lineHeight: 16,
        fontWeight: '400'
    } : {
        fontFamily: fonts.IBMPlexSansArabic_Regular,
        fontSize: 12,
        lineHeight: 20
    }
}

interface BannerArticleSectionProps {
    data: LatestArticleDataType[],
    title: string,
    sectionId?: string,
    onPress: (nid: string) => void,
    onUpdateBookmark: (item: any) => void,
    isDivider?: boolean;
    dividerStyle?: StyleProp<ViewStyle>
    containerStyle?: StyleProp<ViewStyle>
    hideMore?: boolean;
}

const BannerArticleSection = (props: BannerArticleSectionProps) => {
    const { data, sectionId, onPress, onUpdateBookmark } = props
    const { themeData } = useTheme()
    const bannerData = [...data].splice(0, 1)
    const verticalArticleData = isTab ? [...data].splice(1, 4) : [...data].splice(1, 5)
    const style = useThemeAwareObject(createStyles);
    const SECTION_COMBO_ONE_HEADER_RIGHT = TranslateConstants({key:TranslateKey.SECTION_COMBO_ONE_HEADER_RIGHT})
    
    const articleNewsItem: ListRenderItem<LatestArticleDataType> = ({ item, index }) => {
        const timeFormat = dateTimeAgo(item.created)

        sectionComboArticleFooter.leftTitle = timeFormat.time
        sectionComboArticleFooter.leftIcon = () => TimeIcon(timeFormat.icon) 
        sectionComboArticleFooter.leftTitleColor = style.footerTitleColor.color
        sectionComboArticleFooter.rightTitleColor = style.footerTitleColor.color

        return <ArticleWithOutImage key={index} {...item}
            showDivider={index < verticalArticleData.length - 1}
            footerInfo={sectionComboArticleFooter}
            onPress={() => onPress(item.nid)}
            onPressBookmark={() => onUpdateBookmark(item)}
            contentStyle={[style.spacingStyle, index === 0 && style.contentStyleFirst]}
            showBody={false}
            labelType={LabelTypeProp.title4}
            titleStyle={style.articleTitleStyle}
            bodyStyle={style.bodyStyle}
        />
    }
    const widgetHeaderData: WidgetHeaderProps = {
        headerLeft: {
            title: props.title,
            color: isTab ? themeData.primaryBlack : themeData.primary,
            labelType: LabelTypeProp.title3,
            textStyle: isTab ? style.tabTextStyle : { fontFamily: fonts.AwsatDigital_Bold }
        },
        headerRight: props.hideMore ? {} : {
            title: SECTION_COMBO_ONE_HEADER_RIGHT,
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
            textStyle: { fontFamily: fonts.Effra_Arbc_Regular }
        },
    };

    const navigation = useNavigation<StackNavigationProp<any>>();

    const listHeaderSection = () => (
            <View>
                {bannerData.map((item: LatestArticleDataType, index: number) => {
                    if (index === 0) {
                        return <ImageArticle key={index} {...item}
                        onPressBookmark={() => onUpdateBookmark(item)}
                        containerStyle={isTab ? style.tabletImageStyle : {}}
                        titleStyle={style.titleStyle}
                        showBody={false}
                        leftTitleColor={Styles.color.silverChalice}
                        showDivider={true}
                        isAlbum={isTypeAlbum(item.type)}
                        />
                    }
                    return null
                })}
            </View>
    )


    const onPressMore = () => {
        navigation.navigate(ScreensConstants.SectionArticlesScreen, { sectionId, title: props.title });
    }

    if (!isNonEmptyArray(data)) {
        return null
    }

    return (
        <View style={[style.container, props.containerStyle]}>
            <View style={!isTab ? style.headerContainer : style.tabHeaderContainer}>
                <WidgetHeader {...widgetHeaderData} onPress={onPressMore} />
            </View>
            {listHeaderSection()}
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={verticalArticleData}
                listKey={flatListUniqueKey.BANNER_ARTICLE_LIST + new Date().getTime().toString()}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={articleNewsItem}
            />
        </View>
    )
}

export default BannerArticleSection

const createStyles = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingTop: normalize(5),
    },
    tabContainer: {
        paddingHorizontal: 0.02 * screenWidth
    },
    headerContainer: {
        paddingHorizontal: 0.04 * screenWidth,
        paddingBottom: normalize(10),
        paddingTop: normalize(15)
    },
    tabHeaderContainer: {
        paddingBottom:normalize(10)
    },
    tabletImageStyle: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34,
    },
    divider: {
        height: 1,
        backgroundColor: theme.dividerColor
    },
    spacingStyle: {
        paddingBottom: normalize(10),
        paddingTop: normalize(5),
        paddingHorizontal: isTab ? 0 : 0.04 * screenWidth,
    },
    contentStyleFirst: {
        marginTop: isTab ? 0 : 5,
    },
    titleStyle: { 
        fontSize: 20, 
        lineHeight: isTab ? 28 : 32, 
        fontFamily: isTab ? fonts.AwsatDigital_Bold : fonts.AwsatDigital_Black,
    },
    listArticleTitle: {
        fontSize: normalize(17), 
        lineHeight: normalize(28), 
        fontFamily: fonts.AwsatDigital_Bold,
    },
    articleTitleStyle:{
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: isTab ? 18 : 17,
        lineHeight: 28,
        textAlign: 'left', 
        paddingVertical: normalize(8),
        color: theme.primaryBlack
    },
    bodyStyle:{
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize:16,
        lineHeight:26,
        textAlign: 'left' 
    },
    footerTitleColor: {
        color: theme.footerTextColor
    },
    tabTextStyle : {
        fontFamily: fonts.AwsatDigital_Black,
        fontSize: 25,
        lineHeight: 36,
    }
})

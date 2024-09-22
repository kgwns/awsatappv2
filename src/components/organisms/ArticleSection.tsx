import { View, StyleSheet, FlatList, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { articleEventParameter, isNonEmptyArray, isTab, normalize, screenWidth } from '../../shared/utils'
import { flatListUniqueKey } from '../../constants/Constants'
import { ArticleFooterProps, ArticleItem } from '../molecules'
import { ArticleWithOutImageProps } from '../molecules/ArticleWithOutImage'
import { ImageLabelProps } from '../atoms/imageWithLabel/ImageWithLabel'
import { ImagesName, Styles } from 'src/shared/styles'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { fonts } from 'src/shared/styles/fonts'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { dateTimeAgo, decodeHTMLTags, TimeIcon } from 'src/shared/utils/utilities'
import { EventParameterProps } from 'src/shared/utils/analytics'

export interface ArticleProps extends ImageLabelProps, ArticleWithOutImageProps {
   image?: string,
   nid: string,
   author: string,
   created: string,
   hideImage?: boolean;
   isAlbum?: boolean,
   type?: string,
   link?: string,
}

export interface ArticleSectionProps {
    data: ArticleProps[],
    onUpdateBookmark?: (nid: string,isBookmarked: boolean,eventParameter: EventParameterProps) => void,
    listKey?: string,
    showDivider?: boolean,
    showFooterTitle?: boolean,
    isFromFavorites?: boolean
    numColumns?: number;
    addStyle?: StyleProp<ViewStyle>
    hideBookmark?: boolean
}

export const articleFooterDataSet: ArticleFooterProps = {
    leftTitleColor: isTab ? Styles.color.black900 : Styles.color.silverChalice,
    leftIcon: () => { 
        return getSvgImages({
        name: ImagesName.clock,
        size: normalize(12),
        style: { marginRight: normalize(7) }
        })
    },
    rightTitleColor: Styles.color.silverChalice,
    leftTitleStyle: isTab ? {
        fontFamily: fonts.Effra_Arbc_Regular,
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 16,
    } : {
        fontFamily: fonts.IBMPlexSansArabic_Regular,
        fontSize: 12,
        lineHeight:20
    }
};


const ArticleSection = ({
    data,
    onUpdateBookmark,
    listKey,
    showDivider,
    showFooterTitle,
    isFromFavorites = false,
    numColumns = 1,
    addStyle,
    hideBookmark
}: ArticleSectionProps) => {
    const [articleData,setArticleData] = useState(data)
    const style = useThemeAwareObject(articleSectionStyle)

    useEffect(() => {
        updateData()
    },[data])

    const updateData = () => {
      isNonEmptyArray(data) && setArticleData(data)
    }

    const onPressBookmark = (index: number) => {
        const updatedData = [...articleData]
        const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
        updatedData[index].isBookmarked = bookmarkStatus
        setArticleData(updatedData)
        const {title,body,author} = updatedData[index];
        const decodeBody = decodeHTMLTags(body);
        const eventParameter = {
          ...articleEventParameter,
          article_name: title,
          article_author: author,
          article_length: decodeBody.split(' ').length,
    
        }
        onUpdateBookmark && onUpdateBookmark(updatedData[index].nid, bookmarkStatus, eventParameter)
    }

    const renderItem = (item: ArticleProps, index: number) => {
        const timeFormat = dateTimeAgo(item.created)

        articleFooterDataSet.rightTitle = item.author
        articleFooterDataSet.rightTitleColor = style.footerTitleColor.color
        articleFooterDataSet.leftTitle = timeFormat.time
        articleFooterDataSet.leftTitleColor = style.footerTitleColor.color
        articleFooterDataSet.leftIcon = () => TimeIcon(timeFormat.icon) 
        articleFooterDataSet.hideBookmark = hideBookmark || isTab

        const canShowDivider = showDivider || item.showDivider || isFromFavorites && numColumns === 1 && 
        articleData.length === index + 1 || (isTab && numColumns > 1 && index < data.length - 2)
        const articleItemStyle = isTab ? {} : style.mobileArticleItem
        return <ArticleItem {...item} index={index}
            imageStyle={isTab ? style.tabImageStyle : style.mobileImageStyle}
            footerInfo={articleFooterDataSet}
            onPressBookmark={() => onPressBookmark(index)}
            showDivider={isTab ? showDivider : canShowDivider}
            showFooterTitle={showFooterTitle}
            articleItemStyle={articleItemStyle} 
            titleStyle={isTab ? style.tabTitleStyle : style.titleStyle}
            bodyStyle={isTab ? style.tabletBodyStyle : style.bodyStyle}
            isAlbum={item.isAlbum}
            mainContainerStyle = {style.mainContainerStyle}
            tabletArticleContainerStyle = { isTab ? style.tabletArticleContainer : {}}
            tabBodyLineCount={isTab ? 2 : 3}
            hideBookmark={hideBookmark || isTab}
        />
    }
    return (
        <View style={[style.container, addStyle]}>
            {numColumns == 1 ? <FlatList
                keyExtractor={(_,index) => index.toString()}
                listKey={listKey ? listKey : flatListUniqueKey.ARTICLE_SECTION}
                style={style.listContainer}
                data={articleData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
                numColumns={numColumns}
            /> : <FlatList
                keyExtractor={(_,index) => index.toString()}
                listKey={listKey ? listKey : flatListUniqueKey.ARTICLE_SECTION}
                style={style.listContainer}
                data={articleData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
                numColumns={numColumns}
                columnWrapperStyle = {style.tabWrapperStyle}
            />}
        </View>
    );
};

export default ArticleSection

const articleSectionStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingHorizontal: (isTab ? 0 : 0.04) * screenWidth
    },
    listContainer: {

    },
    mobileArticleItem: {
        paddingBottom: normalize(20),
    },
    evenStyle: {
        marginRight: normalize(20),
    },
    oddStyle: {
        marginLeft: normalize(20),
    },
    tabImageStyle: {
        width: '100%', 
        height: 'auto',
        aspectRatio: 1.34,
    },
    mobileImageStyle: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34,
    },
    titleStyle:{
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: isTab ? 20 : 16,
        lineHeight: isTab ? 32 : 26,
        textAlign: 'left', 
        paddingVertical: normalize(8),
        color: theme.primaryBlack
    },
    tabTitleStyle:{
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'left', 
        paddingVertical: 8,
        color: theme.primaryBlack,
        fontWeight: '700',
    },
    bodyStyle:{
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize: normalize(16),
        lineHeight: normalize(26),
        textAlign: 'left' ,
        color: theme.summaryColor,
    },
    tabletBodyStyle:{
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left' ,
        fontWeight:'400',
        color: theme.summaryColor
    },
    footerTitleColor: {
        color: theme.footerTextColor
    },
    mainContainerStyle: {
        flex: 0.30
    },
    tabletArticleContainer: {
        paddingBottom: 20,
        overflow: 'hidden',
        flex: 0
    },
    tabWrapperStyle:{
        justifyContent:'space-between'
    },
})

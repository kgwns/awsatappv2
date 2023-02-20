import { View, StyleSheet, FlatList, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { isNonEmptyArray, isTab, normalize, screenWidth } from '../../shared/utils'
import { flatListUniqueKey } from '../../constants/Constants'
import { ArticleFooterProps, ArticleItem } from '../molecules'
import { ArticleWithOutImageProps } from '../molecules/ArticleWithOutImage'
import { ImageLabelProps } from '../atoms/imageWithLabel/ImageWithLabel'
import { ImagesName, Styles } from 'src/shared/styles'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { fonts } from 'src/shared/styles/fonts'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { dateTimeAgo, TimeIcon } from 'src/shared/utils/utilities'

export interface ArticleProps extends ImageLabelProps, ArticleWithOutImageProps {
   image?: string,
   nid: string,
   author: string,
   created: string,
   hideImage?: boolean;
   isAlbum: boolean,
}

export interface ArticleSectionProps {
    data: ArticleProps[],
    onUpdateBookmark?: (nid: string,isBookmarked: boolean) => void,
    listKey?: string,
    showDivider?: boolean,
    showFooterTitle?: boolean,
    isFromFavorites?: boolean
    numColumns?: number;
    addStyle?: StyleProp<ViewStyle>
}

export const articleFooterDataSet: ArticleFooterProps = {
    leftTitleColor: Styles.color.silverChalice,
    leftIcon: () => { 
        return getSvgImages({
        name: ImagesName.clock,
        size: normalize(12),
        style: { marginRight: normalize(7) }
        })
    },
    rightTitleColor: Styles.color.silverChalice,
    leftTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular, fontSize: 12, lineHeight:20 }
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
        onUpdateBookmark && onUpdateBookmark(updatedData[index].nid, bookmarkStatus)
    }

    const renderItem = (item: ArticleProps, index: number) => {
        const timeFormat = dateTimeAgo(item.created)

        articleFooterDataSet.rightTitle = item.author
        articleFooterDataSet.rightTitleColor = style.footerTitleColor.color
        articleFooterDataSet.leftTitle = timeFormat.time
        articleFooterDataSet.leftTitleColor = style.footerTitleColor.color
        articleFooterDataSet.leftIcon = () => TimeIcon(timeFormat.icon) 

        const canShowDivider = showDivider || item.showDivider || isFromFavorites && numColumns === 1 && 
        articleData.length === index + 1 || (isTab && numColumns > 1 && index < data.length - 2)
        const articleItemStyle = isTab ? numColumns > 1 && articleData.length > 1 ? (index % 2 === 0) ? style.evenStyle : style.oddStyle : {} : style.mobileArticleItem
        return <ArticleItem {...item} index={index}
            imageStyle={isTab ? style.tabImageStyle : style.mobileImageStyle}
            footerInfo={articleFooterDataSet}
            onPressBookmark={() => onPressBookmark(index)}
            showDivider={canShowDivider}
            showFooterTitle={showFooterTitle}
            articleItemStyle={articleItemStyle}
            titleStyle={style.titleStyle}
            bodyStyle={style.bodyStyle}
            isAlbum={item.isAlbum}
        />
    }
    return (
        <View style={[style.container, addStyle]}>
            <FlatList
                keyExtractor={(_,index) => index.toString()}
                listKey={listKey ? listKey : flatListUniqueKey.ARTICLE_SECTION}
                style={style.listContainer}
                data={articleData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
                numColumns={numColumns}
            />
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
        width: 0.5 * screenWidth,
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
    bodyStyle:{
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize: normalize(16),
        lineHeight: normalize(26),
        textAlign: 'left' ,
        color: theme.summaryColor,
    },
    footerTitleColor: {
        color: theme.footerTextColor
    }

})

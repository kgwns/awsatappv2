import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { isNonEmptyArray, normalize, screenWidth, timeAgo } from '../../shared/utils'
import { flatListUniqueKey } from '../../constants'
import { articleFooterProps, ArticleItem } from '../molecules'
import { ArticleWithOutImageProps } from '../molecules/ArticleWithOutImage'
import { ImageLabelProps } from '../atoms/imageWithLabel/ImageWithLabel'
import { ImagesName, Styles } from 'src/shared/styles'
import { useTranslation } from 'react-i18next'
import { getSvgImages } from 'src/shared/styles/svgImages'

export interface articleProps extends ImageLabelProps,ArticleWithOutImageProps {
   image?: string,
   nid: string,
   author: string,
   created: string,
}

export interface ArticleSectionProps {
    data: articleProps[],
    onUpdateBookmark?: (nid: string,isBookmarked: boolean) => void,
    listKey?: string,
    showDivider?: boolean,
    showFooterTitle?: boolean,
}

export const articleFooterDataSet: articleFooterProps = {
    leftTitleColor: Styles.color.greenishBlue,
    rightIcon: () => {return getSvgImages({
        name: ImagesName.clock,
        size: normalize(12),
        style: { marginRight: normalize(5) }
    })},
    rightTitleColor: Styles.color.silverChalice,
};


const ArticleSection = ({
    data,
    onUpdateBookmark,
    listKey,
    showDivider,
    showFooterTitle,
}: ArticleSectionProps) => {
    const [t] = useTranslation();
    const [articleData,setArticleData] = useState(data)

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

    const renderItem = (item: articleProps, index: number) => {
        articleFooterDataSet.leftTitle = item.author
        articleFooterDataSet.rightTitle = t(timeAgo(item.created))
        return <ArticleItem {...item} index={index}
            imageStyle={{ height: normalize(189) }}
            footerInfo={articleFooterDataSet}
            onPressBookmark={() => onPressBookmark(index)}
            showDivider={showDivider}
            showFooterTitle={showFooterTitle}
        />
    }
    return (
        <View style={articleSectionStyle.container}>
            <FlatList
                keyExtractor={(_,index) => index.toString()}
                listKey={listKey ? listKey : flatListUniqueKey.ARTICLE_SECTION}
                style={articleSectionStyle.listContainer}
                data={articleData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
        </View>
    );
};

export default ArticleSection

const articleSectionStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 0.04 * screenWidth
    },
    listContainer: {

    }
})

import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { normalize, screenWidth, timeAgo } from '../../shared/utils'
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
   created: string
}

export interface ArticleSectionProps {
    data: articleProps[]
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


const ArticleSection = ({ data }: ArticleSectionProps) => {
    const [t] = useTranslation();

    const renderItem = (item: articleProps, index: number) => {
        articleFooterDataSet.leftTitle = item.author
        articleFooterDataSet.rightTitle = t(timeAgo(item.created))
        return <ArticleItem {...item} index={index}
            showDivider={index < data.length - 1}
            imageStyle={{ height: normalize(189) }}
            footerInfo={articleFooterDataSet}
        />
    }
    return (
        <View style={articleSectionStyle.container}>
            <FlatList
                keyExtractor={(_,index) => index.toString()}
                listKey={flatListUniqueKey.ARTICLE_SECTION}
                style={articleSectionStyle.listContainer}
                data={data}
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

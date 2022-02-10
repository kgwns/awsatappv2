import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { normalize, screenWidth } from '../../shared/utils'
import { flatListUniqueKey } from '../../constants'
import { ArticleItem } from '../molecules'
import { ArticleWithOutImageProps } from '../molecules/ArticleWithOutImage'
import { ImageLabelProps } from '../atoms/imageWithLabel/ImageWithLabel'

export interface articleProps extends ImageLabelProps,ArticleWithOutImageProps {
   image?: string,
}

export interface ArticleSectionProps {
    data: articleProps[]
}


const ArticleSection = ({ data }: ArticleSectionProps) => {
    const renderItem = (item: articleProps, index: number) => {
        return <ArticleItem {...item} showDivider={index < data.length - 1} index={index} imageStyle={{height: normalize(189)}}/>
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

import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { normalize, screenWidth } from '../../shared/utils'
import { flatListUniqueKey } from '../../constants'
import { articleFooterProps, ArticleItem } from '../molecules'
import { ArticleWithOutImageProps } from '../molecules/ArticleWithOutImage'
import { ImageLabelProps } from '../atoms/imageWithLabel/ImageWithLabel'
import { ImagesName, Styles } from 'src/shared/styles'
import { FROM_TWO_HOURS } from 'src/constants/SharedConstants'

export interface articleProps extends ImageLabelProps,ArticleWithOutImageProps {
   image?: string,
   nid: string,
   author: string
}

export interface ArticleSectionProps {
    data: articleProps[]
}

export const articleFooterDataSet: articleFooterProps = {
    leftTitleColor: Styles.color.greenishBlue,
    rightTitle: FROM_TWO_HOURS,
    rightIcon: ImagesName.clock,
    rightTitleColor: Styles.color.silverChalice,
  };


const ArticleSection = ({ data }: ArticleSectionProps) => {
    const renderItem = (item: articleProps, index: number) => {
        articleFooterDataSet.leftTitle = item.author
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

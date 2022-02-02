import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { flatListUniqueKey } from 'src/constants'
import { ArticleItem, ArticleWithOutImageProps } from 'src/components/molecules'
import { ImageLabelProps } from 'src/components/atoms/imageWithLabel/ImageWithLabel'
import { screenWidth } from 'src/shared/utils'

export interface articleProps extends ImageLabelProps, ArticleWithOutImageProps {
    image?: string,
    description: string
}

export interface ArticleSectionProps {
    data: articleProps[]
}


const MostReadList = ({ data }: ArticleSectionProps) => {
    const renderItem = (item: articleProps, index: number) => {
        return <ArticleItem {...item} index={index} contentStyle={mostReadListStyle.contentStyle} />
    }
    return (
        <View style={mostReadListStyle.container}>
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                listKey={flatListUniqueKey.MOST_READ_LIST}
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
        </View>
    )
}

export default MostReadList

const mostReadListStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    contentStyle: {
        paddingHorizontal: 0.04 * screenWidth
    }
})

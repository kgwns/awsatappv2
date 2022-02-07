import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { flatListUniqueKey } from 'src/constants'
import { ArticleItem, ArticleWithOutImageProps } from 'src/components/molecules'
import { ImageLabelProps } from 'src/components/atoms/imageWithLabel/ImageWithLabel'
import { screenWidth } from 'src/shared/utils'
import { Label, LabelTypeProp } from 'src/components/atoms';
import { MOST_READ } from 'src/constants/SharedConstants';
import { Styles } from 'src/shared/styles';
import { normalize } from 'src/shared/utils';

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

    const listHeader = () => (
        <View style={{ paddingLeft: normalize(20), paddingVertical: normalize(5) }}>
            <Label children={MOST_READ} labelType={LabelTypeProp.h2} color={Styles.color.greenishBlue} />
        </View>
    )

    return (
        <View style={mostReadListStyle.container}>
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                listKey={flatListUniqueKey.MOST_READ_LIST}
                ListHeaderComponent={listHeader}
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

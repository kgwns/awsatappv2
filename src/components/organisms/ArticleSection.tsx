import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { screenWidth } from '../../shared/utils'
import { flatListUniqueKey } from '../../constants'
import { ArticleItem } from '../molecules'

export interface articleProps {
   image?: string,
   title: string,
   description: string,
   tagName?: string
}

const articleSectionData: articleProps[] = [
    {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'مجما'
    },
    {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }
]


const ArticleSection = () => {
    const renderItem = (item: articleProps, index: number) => {
        return <ArticleItem {...item} index={index}/>
    }
    return (
        <View style={articleSectionStyle.container}>
            <FlatList
                keyExtractor={(_,index) => index.toString()}
                listKey={flatListUniqueKey.ARTICLE_SECTION}
                style={articleSectionStyle.listContainer}
                data={articleSectionData}
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

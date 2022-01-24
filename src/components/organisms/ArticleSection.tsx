import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { normalize, screenWidth } from '../../shared/utils'
import { Divider } from '../atoms/divider/Divider'
import { Styles } from '../../shared/styles'
import { Label, LabelTypeProp } from '../atoms'
import { ImageWithLabel } from '../atoms'
import { ArticleFooter } from '../molecules'
import { articleFooterProps } from '../molecules/articleFooter/ArticleFooter'
import { ImagesName } from '../../shared/styles/images'
import { flatListUniqueKey } from '../../constants'

export interface articleProps {
   image: string,
   title: string,
   description: string,
   tagName: string
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

const articleFooterSample: articleFooterProps = {
    leftTitle: 'وتمجيد',
    leftTitleColor: Styles.color.greenishBlue,
    rightTitle: 'يتحمل',
    rightIcon: ImagesName.clock,
    rightTitleColor: Styles.color.silverChalice,
}

const ArticleSection = () => {
    const renderItem = (item: articleProps, index: number) => {
        return <View key={flatListUniqueKey.ARTICLE_SECTION + index}>
            <ImageWithLabel url={item.image} tagName={item.tagName} />
            <Label labelType={LabelTypeProp.h2} children={item.title} numberOfLines={2}/>
            <Label labelType={LabelTypeProp.p3} children={item.description} color={Styles.color.davyGrey} />
            <View style={{ flex: 1,paddingTop: normalize(10) }}>
                <ArticleFooter {...articleFooterSample} />
            </View>
            <Divider />
        </View>
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

import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { screenWidth } from '../../shared/utils'
import { Divider } from '../atoms/divider/Divider'
import { Styles } from '../../shared/styles'
import { Label, LabelTypeProp } from '../atoms'
import { ImageWithLabel } from '../atoms'
import { ArticleFooter } from '../molecules'
import { articleFooterProps } from '../molecules/articleFooter/ArticleFooter'
import { ImagesName } from '../../shared/styles/images'

interface articleProps {
   image: string,
   title: string,
   description: string,
   tagName: string
}

const articleSectionData: articleProps[] = [
    {
        image: 'https://picsum.photos/200/300',
        title: `Punjab CM Channi says ED raids meant to frame him for PM Modi's trip fiasco`,
        description: `Punjab chief minister Charanjit Singh Channi said his nephew Bhupinder Singh ‘Honey’ was being tortured to take his name`,
        tagName: 'chennai'
    },
    {
        image: 'https://picsum.photos/200/300',
        title: `India vs South Africa LIVE: On-song Bavuma, vd Dussen take SA past 200`,
        description: `Punjab chief minister Charanjit Singh Channi said his nephew Bhupinder Singh ‘Honey’ was being tortured to take his name`,
        tagName: 'coimbatore'
    }
]

const articleFooterSample: articleFooterProps = {
    leftTitle: 'Author',
    leftTitleColor: Styles.color.forestGreen,
    rightTitle: '3hour ago',
    rightIcon: ImagesName.clock,
    rightTitleColor: Styles.color.greyDark,
}

const ArticleSection = () => {
    const renderItem = (item: articleProps, index: number) => {
        return <View >
            <ImageWithLabel url={item.image} tagName={item.tagName} />
            <Label labelType={LabelTypeProp.h2} children={item.title} />
            <Label labelType={LabelTypeProp.p3} children={item.description} />
            <View style={{ flex: 1 }}>
                <ArticleFooter {...articleFooterSample} />
            </View>
            <Divider />
        </View>
    }
    return (
        <View style={articleSectionStyle.container}>
            <FlatList
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

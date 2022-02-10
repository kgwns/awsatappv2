import React from 'react'
import { View, StyleSheet } from 'react-native'
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { Label } from 'src/components/atoms'
import { ArticleDetailImage } from 'src/components/molecules'
import { Styles } from 'src/shared/styles'

const sampleArticleDetailData = {
    image: 'https://picsum.photos/200/300',
    title: 'العالم العربي',
    description: 'مباحثات سعودية في مسقط وأبوظبي تتناول التعاون والشراكة وتفعيل العمل العربي',
    tagName: 'الحكومة',
    articleBase: 'حقوق مليكة الصوره توضع هنا'

}

const ArticleDetailWidget = () => {
    return (
        <View>
            <ArticleDetailImage image={sampleArticleDetailData.image} title={sampleArticleDetailData.title} description={sampleArticleDetailData.description}
                containerStyle={isTab ? articleDetailImageStyle.tabletImageStyle : articleDetailImageStyle.imageStyle} />
            <Label children={sampleArticleDetailData.articleBase} style={articleDetailImageStyle.articleBaseStyle} />
        </View>
    )
}

export default ArticleDetailWidget

const articleDetailImageStyle = StyleSheet.create({
    headNewsContainer: {
        paddingHorizontal: 0.04 * screenWidth,
        paddingVertical: normalize(10)
    },
    imageStyle: {
        height: 1.05 * screenWidth
    },
    tabletImageStyle: {
        height: 0.5 * screenWidth
    },
    articleBaseStyle: {
        color: Styles.color.lightGray,
        paddingHorizontal: normalize(30),
        paddingTop: normalize(5),
        paddingBottom: normalize(15),
        alignSelf: 'flex-start'
    }
})

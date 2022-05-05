import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { ArticleDetailImage } from 'src/components/molecules'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types'

interface ArticleDetailWidgetProps {
    articleData: ArticleDetailDataType,
    isRelatedArticle: boolean,
}

const ArticleDetailWidget: FunctionComponent<ArticleDetailWidgetProps> = ({
    articleData, isRelatedArticle = false
}) => {
    return (
        <View>
            <ArticleDetailImage image={articleData.image} title={articleData.title}
                category={articleData.news_categories?.title} author={articleData.author}
                created={articleData.created}
                isRelatedArticle={isRelatedArticle}
                caption={articleData.caption}
            />
        </View>
    )
}

export default ArticleDetailWidget

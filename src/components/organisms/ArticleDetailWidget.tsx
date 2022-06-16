import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { ArticleDetailImage } from 'src/components/molecules'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types'

interface ArticleDetailWidgetProps {
    articleData: ArticleDetailDataType,
    isRelatedArticle: boolean,
    isFirstItem: boolean,
    currentTime?: any,
    paused: boolean,
    playerVisible?: boolean,
    setPlayerDetails?: ( time:any, paused: any) => void;
    setMiniPlayerVisible?: (visible: boolean) => void; 
    videoRefs?: any;
}

const ArticleDetailWidget: FunctionComponent<ArticleDetailWidgetProps> = ({
    articleData, isRelatedArticle = false, isFirstItem, ...props
}) => {
    return (
        <View>
            <ArticleDetailImage image={articleData.image} title={articleData.title}
                category={articleData.news_categories?.title} author={articleData.author}
                created={articleData.created}
                isRelatedArticle={isRelatedArticle}
                caption={articleData.caption}
                isFirstItem={isFirstItem}
                subtitle={articleData.subtitle}
                jwplayerId={articleData.jwplayerId}
                {...props}
            />
        </View>
    )
}

export default ArticleDetailWidget

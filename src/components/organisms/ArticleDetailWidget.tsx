import axios from 'axios';
import moment from 'moment';
import React, { FunctionComponent, useEffect, useState } from 'react'
import { View } from 'react-native'
import { ArticleDetailImage } from 'src/components/molecules'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types'
import { SCRIBBLE_LIVE_EVENT_URL, SCRIBBLE_LIVE_JSON_PARAM, SCRIBBLE_LIVE_TOKEN_PARAM, SCRIBBLE_TOKEN } from 'src/services/apiUrls';
import { isNotEmpty, isObjectNonEmpty } from 'src/shared/utils';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';

interface ArticleDetailWidgetProps {
    articleData: ArticleDetailDataType,
    isRelatedArticle: boolean,
    isFirstItem: boolean,
    currentTime?: any,
    isFullScreen?: boolean,
    paused: boolean,
    playerVisible?: boolean,
    setPlayerDetails?: ( time:any, paused: any) => void;
    setMiniPlayerVisible?: (visible: boolean) => void; 
    onChangeFullScreen?: (isFullScreen: boolean) => void;
    setReset?: (show: boolean) => void;
    videoRefs?: any;
    showReplay?: boolean;
    displayType?: string;
}

const ArticleDetailWidget: FunctionComponent<ArticleDetailWidgetProps> = ({
    articleData, isRelatedArticle = false, isFirstItem, showReplay = false, displayType, ...props
}) => {
    const UPDATED =  TranslateConstants({key:TranslateKey.ARTICLE_DETAIL_WIDGET_UPDATED})
    const [scribbleLiveData, setScribbleLiveData] = useState<any>({})
    moment.locale('ar')
    const timeAgo = isObjectNonEmpty(scribbleLiveData) ? `${UPDATED}  ${moment(scribbleLiveData.LastModified).fromNow()}` : '';


    useEffect(() => {
        isObjectNonEmpty(articleData) && isNotEmpty(articleData.scribbleLiveId) && fetchScribbleLive(articleData.scribbleLiveId)
    }, [articleData])


    const fetchScribbleLive = async (id: string) => {
        try {
            const response = await axios.get(
                `${SCRIBBLE_LIVE_EVENT_URL}${id}${SCRIBBLE_LIVE_TOKEN_PARAM}${SCRIBBLE_TOKEN}${SCRIBBLE_LIVE_JSON_PARAM}`,
            );
            setScribbleLiveData(response.data)
        } catch (error) {
            throw error;
        }
    };

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
                showReplay={showReplay}
                displayType={articleData.displayType}
                liveTimeAgo = {timeAgo}
                {...props}
            />
        </View>
    )
}

export default ArticleDetailWidget

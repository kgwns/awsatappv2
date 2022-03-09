import React from 'react'
import { ArticleItem, VideoItem } from '..'
import { LatestArticleDataType } from 'src/redux/latestNews/types'
import OpinionWritersCardView from '../opinionWriters/OpinionWriterCardView'
import { OpinionsListItemType } from 'src/redux/opinions/types'

export enum PopulateWidgetType {
    ARTICLE = 'article',
    VIDEO = 'multimedia',
    OPINION = 'opinion'
}

export interface PopulateWidgetProps {
    type: PopulateWidgetType,
    onPressBookmark: () => void,
    props: LatestArticleDataType | OpinionsListItemType | any
}

export const PopulateWidget = ({
    type,
    onPressBookmark,
    ...props
}: PopulateWidgetProps) => {
    switch (type) {
        case PopulateWidgetType.ARTICLE:
            return <ArticleItem
                index={0}
                {...props}
                isBookmarked={true}
                onPressBookmark={onPressBookmark}
            />
        case PopulateWidgetType.OPINION:
            return <OpinionWritersCardView {...props} 
            onPressBookmark={onPressBookmark}
            />
        case PopulateWidgetType.VIDEO:
            return (
                <VideoItem {...props}
                    isFirstItem={false}
                    testID='video_screen_id'
                    onPress={() => { }}
                    onPressBookmark={onPressBookmark}
                />
            );
        default: return null
    }

}

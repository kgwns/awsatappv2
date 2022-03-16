import React from 'react'
import { ArticleItem, VideoItem } from '..'
import OpinionWritersCardView, { OpinionWritersCardViewProps } from '../opinionWriters/OpinionWriterCardView'
import { articleFooterDataSet } from 'src/components/organisms/ArticleSection'
import { t } from 'i18next'
import { timeAgo } from 'src/shared/utils'
import { ArticleItemProps } from '../ArticleItem'
import { PodcastVerticalListProps } from '../podcast/PodcastVerticalList'
import { VideoItemProps } from '../video-item/VideoItem'
import { ArticlePodCastWidget } from 'src/components/organisms'
import { useNavigation } from '@react-navigation/native'
import { ScreensConstants } from 'src/constants'
import { StackNavigationProp } from '@react-navigation/stack'

export enum PopulateWidgetType {
    ARTICLE = 'article',
    VIDEO = 'multimedia',
    OPINION = 'opinion',
    PODCAST = 'podcast'
}

interface ArticleNodeType {
    type: typeof PopulateWidgetType.ARTICLE,
    onPressBookmark: () => void,
    props: ArticleItemProps
}

interface OpinionNodeType {
    type: typeof PopulateWidgetType.OPINION,
    onPressBookmark: () => void,
    props: OpinionWritersCardViewProps
}

interface VideoNodeType {
    type: typeof PopulateWidgetType.VIDEO,
    onPressBookmark: () => void,
    props: VideoItemProps
}

interface PodcastNodeType {
    type: typeof PopulateWidgetType.PODCAST,
    onPressBookmark: () => void,
    props: PodcastVerticalListProps
}

export type PopulateWidgetProps = ArticleNodeType | OpinionNodeType | VideoNodeType | PodcastNodeType | any

export const PopulateWidget = ({
    type,
    onPressBookmark,
    ...props
}: PopulateWidgetProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    switch (type) {
        case PopulateWidgetType.ARTICLE:
            return <ArticleItem
                index={0}
                {...props}
                footerInfo = {{
                    ...articleFooterDataSet,
                    leftTitle: props.author,
                    rightTitle: t(timeAgo(props.created))
                }}
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
                    onPress={() => {
                        navigation.navigate(ScreensConstants.VideoPlayerScreen,
                            { mediaID: props.field_video_media_id_export })
                    }}
                    onPressBookmark={onPressBookmark}
                />
            );
        case PopulateWidgetType.PODCAST:
            return (
                <ArticlePodCastWidget
                    {...props}
                    onPressBookmark={onPressBookmark}
                    onPress={() => {
                        navigation.navigate(ScreensConstants.PodcastEpisode, { data: {...props},podcastListData: [] })
                    }}
                />
            )
        default: return null
    }

}

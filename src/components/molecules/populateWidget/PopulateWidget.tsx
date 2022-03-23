import React from 'react'
import { ArticleItem, VideoItem } from '..'
import OpinionWritersCardView, { OpinionWritersCardViewProps } from '../opinionWriters/OpinionWriterCardView'
import { articleFooterDataSet } from 'src/components/organisms/ArticleSection'
import { t } from 'i18next'
import { normalize, screenWidth, timeAgo } from 'src/shared/utils'
import { ArticleItemProps } from '../ArticleItem'
import { PodcastVerticalListProps } from '../podcast/PodcastVerticalList'
import { VideoItemProps } from '../video-item/VideoItem'
import { ArticlePodCastWidget } from 'src/components/organisms'
import { useNavigation } from '@react-navigation/native'
import { ScreensConstants } from 'src/constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { isNotEmpty } from 'src/shared/utils'
import { Divider } from 'src/components/atoms'
import { CustomThemeType } from '~/shared/styles/colors'
import { StyleSheet, View } from 'react-native'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

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
    const style = useThemeAwareObject(customStyle)
    switch (type) {
        case PopulateWidgetType.ARTICLE:
            return <View style={style.widgetContainer}>
                <ArticleItem
                    index={0}
                    {...props}
                    footerInfo={{
                        ...articleFooterDataSet,
                        leftTitle: props.author,
                        rightTitle: t(timeAgo(props.created))
                    }}
                    isBookmarked={true}
                    onPressBookmark={onPressBookmark}
                />
            </View>
        case PopulateWidgetType.OPINION:
            return <View style={style.widgetContainer}>
                <OpinionWritersCardView {...props} mediaVisibility={isNotEmpty(props.field_jwplayer_id_opinion_export)}
                    onPressBookmark={onPressBookmark}
                />
            </View>
        case PopulateWidgetType.VIDEO:
            return (
                <VideoItem {...props}
                    isFirstItem={false}
                    testID='video_screen_id'
                    onPress={() => {
                        navigation.navigate(ScreensConstants.VideoPlayerScreen,
                            { mediaID: props.field_video_media_id_export, nid: props.nid })
                    }}
                    onPressBookmark={onPressBookmark}
                />
            );
        case PopulateWidgetType.PODCAST:
            return (
                <View style={style.podcastContainer}>
                    <ArticlePodCastWidget
                        {...props}
                        onPressBookmark={onPressBookmark}
                        onPress={() => {
                            navigation.navigate(ScreensConstants.PodcastEpisode, { data: { ...props }, podcastListData: [] })
                        }}
                    />
                    <Divider style={style.divider} />
                </View>
            )
        default: return null
    }

}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    divider: {
        marginVertical: normalize(5),
        height: 1,
        backgroundColor: theme.dividerColor
    },
    widgetContainer: {
        paddingHorizontal: 0.04 * screenWidth
    },
    podcastContainer: {
        backgroundColor: theme.secondaryWhite
    }
})

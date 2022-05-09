import React, { useState } from 'react'
import { ArticleItem, VideoItem } from '..'
import OpinionWritersCardView, { OpinionWritersCardViewProps } from '../opinionWriters/OpinionWriterCardView'
import { articleFooterDataSet } from 'src/components/organisms/ArticleSection'
import { t } from 'i18next'
import { isObjectNonEmpty, isTab, normalize, screenWidth, timeAgo } from 'src/shared/utils'
import { ArticleItemProps } from '../ArticleItem'
import { PodcastVerticalListProps } from '../podcast/PodcastVerticalList'
import { VideoItemProps } from '../video-item/VideoItem'
import { ArticlePodCastWidget } from 'src/components/organisms'
import { useNavigation } from '@react-navigation/native'
import { ScreensConstants } from 'src/constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { isNotEmpty } from 'src/shared/utils'
import { CustomThemeType } from 'src/shared/styles/colors'
import { StyleSheet, View } from 'react-native'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { getSecondsToHms } from 'src/shared/utils/utilities'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { ImagesName, Styles } from 'src/shared/styles'

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
                    flag={isObjectNonEmpty(props.news_categories) ? props.news_categories?.title : ''}
                    flagColor={Styles.color.greenishBlue}
                    footerInfo={{
                        ...articleFooterDataSet,
                        leftIcon: null,
                        rightIcon: () => {return getSvgImages({
                            name: ImagesName.clock,
                            size: normalize(12),
                            style: { marginRight: normalize(7) }
                        })},
                        leftTitle: props.author,
                        rightTitle: t(timeAgo(props.created)),
                        favouriteIconHeight: 16,
                        favouriteIconWidth: 11,
                    }}
                    isBookmarked={true}
                    onPressBookmark={onPressBookmark}
                />
            </View>
        case PopulateWidgetType.OPINION:
            return <View>
                <OpinionWritersCardView {...props} mediaVisibility={props.field_jwplayer_id_opinion_export ? isNotEmpty(props.field_jwplayer_id_opinion_export) : isNotEmpty(props.jwplayer)}
                    jwPlayerID={isNotEmpty(props.field_jwplayer_id_opinion_export) ? props.field_jwplayer_id_opinion_export : (isNotEmpty(props.jwplayer) ? props.jwplayer : null)}
                    onPressBookmark={onPressBookmark}
                    togglePlayback={props?.togglePlayback}
                    selectedTrack={props?.selectedTrack}
                    duration = {props.jwplayer_info ? getSecondsToHms(props.jwplayer_info.split('|')[1]) : null}
                />
            </View>
        case PopulateWidgetType.VIDEO:
            return (
                <View style={style.videoContainer}>
                    <VideoItem {...props}
                        isFirstItem={false}
                        testID='video_screen_id'
                        onPress={() => {
                            navigation.navigate(ScreensConstants.VideoDetailScreen,
                                { data: props })
                        }}
                        onPressBookmark={onPressBookmark}
                    />
                </View>
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
                </View>
            )
        default: return null
    }

}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    widgetContainer: {
        paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    podcastContainer: {
        backgroundColor: theme.secondaryWhite
    },
    videoContainer: {
    }
})

import React from 'react'
import { ArticleItem, VideoItem } from '..'
import OpinionWritersCardView, { OpinionWritersCardViewProps } from '../opinionWriters/OpinionWriterCardView'
import { articleFooterDataSet } from 'src/components/organisms/ArticleSection'
import { isObjectNonEmpty, isTab, normalize, screenWidth, isNotEmpty } from 'src/shared/utils'
import { ArticleItemProps } from '../ArticleItem'
import { PodcastVerticalListProps } from '../podcast/PodcastVerticalList'
import { VideoItemProps } from '../video-item/VideoItem'
import { ArticlePodCastWidget } from 'src/components/organisms'
import { useNavigation } from '@react-navigation/native'
import { ScreensConstants } from 'src/constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { CustomThemeType } from 'src/shared/styles/colors'
import { StyleSheet, View } from 'react-native'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { dateTimeAgo, getSecondsToHms, TimeIcon } from 'src/shared/utils/utilities'
import { Styles } from 'src/shared/styles'
import { fonts } from 'src/shared/styles/fonts'

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
    const timeFormat = dateTimeAgo(props.created)

    switch (type) {
        case PopulateWidgetType.ARTICLE:
            return <View style={style.widgetContainer}>
                <ArticleItem
                    index={0}
                    {...props}
                    imageStyle={style.imageStyle}
                    flag={isObjectNonEmpty(props.news_categories) ? props.news_categories?.title : ''}
                    barColor={Styles.color.greenishBlue}
                    flagColor={Styles.color.greenishBlue}
                    footerInfo={{
                        ...articleFooterDataSet,
                        leftIcon: null,
                        rightIcon: () => TimeIcon(timeFormat.icon),
                        leftTitle: props.author,
                        rightTitle: timeFormat.time,
                        favouriteIconHeight: 16,
                        favouriteIconWidth: 11,
                    }}
                    isBookmarked={true}
                    onPressBookmark={onPressBookmark}
                    titleStyle={style.titleStyle}
                    bodyStyle={style.bodyStyle}
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
    },
    titleStyle:{
        fontFamily: fonts.AwsatDigitalBetav10_Bold,
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'left', 
        paddingVertical: normalize(8),
        color: theme.primaryBlack
    },
    bodyStyle:{
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize:16,
        lineHeight:26,
        textAlign: 'left' 
    },
    imageStyle: {
        width: '100%',
        height: isTab ? 0.65 * screenWidth : normalize(230),
        aspectRatio: 1.5
    },
})

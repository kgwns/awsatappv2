import React, { useState } from 'react'
import { ArticleItem, PhotoGalleryItem, VideoItem } from '..'
import OpinionWritersCardView, { OpinionWritersCardViewProps } from '../opinionWriters/OpinionWriterCardView'
import { articleFooterDataSet } from 'src/components/organisms/ArticleSection'
import { isObjectNonEmpty, isTab, normalize, screenWidth, isNotEmpty, screenHeight } from 'src/shared/utils'
import { ArticleItemProps } from '../ArticleItem'
import { PodcastVerticalListProps } from '../podcast/PodcastVerticalList'
import { VideoItemProps } from '../video-item/VideoItem'
import { ArticlePodCastWidget } from 'src/components/organisms'
import { useNavigation } from '@react-navigation/native'
import { ScreensConstants } from 'src/constants/Constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { CustomThemeType } from 'src/shared/styles/colors'
import { Modal, StyleSheet, View } from 'react-native'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { dateTimeAgo, getSecondsToHms, TimeIcon } from 'src/shared/utils/utilities'
import { Styles } from 'src/shared/styles'
import { fonts } from 'src/shared/styles/fonts'
import { PodcastEpisodeModal } from 'src/components/screens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useOrientation } from 'src/hooks'
import { BookMarkColorType } from '../articleFooter/ArticleFooter'
import { ARCHIVES_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer'

export enum PopulateWidgetType {
    ARTICLE = 'article',
    VIDEO = 'multimedia',
    OPINION = 'opinion',
    PODCAST = 'podcast',
    ALBUM = 'album',
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
    const insets = useSafeAreaInsets();

    const style = useThemeAwareObject(customStyle)
    const timeFormat = dateTimeAgo(props.created)

    const [showModal, setShowModal] = useState(false);
    const {isPortrait} = useOrientation();
    const videoThumbnailStyle = isTab ? isPortrait ? style.videoThumbnailPortrait : style.videoThumbnailLandscape : {}
    
    const onPressAlbum = (Nid: string) => {
        Nid &&
          navigation.navigate(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN, {
            nid: Nid,
          });
      };

    const episodeModal = () => (
        <Modal visible={true} animationType={'slide'} onRequestClose = {() => setShowModal(false)}>
            <View style={{ height: isTab ? '100%' :  screenHeight - insets.top }}>
                <PodcastEpisodeModal
                    route={{ params: { data: { ...props } } }}
                    onPressBack={() => setShowModal(false)}
                />
            </View>
        </Modal>
    )

    const containerStyle = isTab ? style.widgetContainerTab : style.widgetContainer;
    const podcastStyle = isTab ? style.podcastContainerTab : style.podcastContainer;
    switch (type) {
        case 'ad':
            return <AdContainer unitId={ARCHIVES_UNIT_ID} size={AdContainerSize.MEDIUM}/>
        case PopulateWidgetType.ARTICLE:
            return <View style={containerStyle}>
                <ArticleItem
                    index={0}
                    {...props}
                    imageStyle={isTab ? style.tabletImageStyle : style.imageStyle}
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
                        bookMarkColorType: isTab && BookMarkColorType.PRIMARY,
                        hideBookmark: false
                    }}
                    isBookmarked={true}
                    onPressBookmark={onPressBookmark}
                    titleStyle={style.titleStyle}
                    bodyStyle={style.bodyStyle}
                    showDivider={!isTab}
                />
            </View>
        case PopulateWidgetType.OPINION:
            return <View style={isTab && style.opinionContainerTab}>
                <OpinionWritersCardView {...props} 
                    mediaVisibility={props.field_jwplayer_id_opinion_export ? 
                        isNotEmpty(props.field_jwplayer_id_opinion_export) : 
                        isNotEmpty(props.jwplayer)}
                    jwPlayerID={isNotEmpty(props.field_jwplayer_id_opinion_export) ? 
                        props.field_jwplayer_id_opinion_export : (isNotEmpty(props.jwplayer) ? props.jwplayer : null)}
                    onPressBookmark={onPressBookmark}
                    togglePlayback={props?.togglePlayback}
                    selectedTrack={props?.selectedTrack}
                    duration = {props.jwplayer_info ? getSecondsToHms(props.jwplayer_info.split('|')[1]) : null}
                    showDivider={!isTab}
                    addStyle={isTab && {paddingHorizontal: 0}}
                    bookMarkColorType={isTab && BookMarkColorType.PRIMARY}
                />
            </View>
        case PopulateWidgetType.VIDEO:
            return (
                <View style={isTab && style.videoContainerTab}>
                    <VideoItem {...props}
                        isFirstItem={false}
                        testID='video_screen_id'
                        onPress={() => {
                            navigation.navigate(ScreensConstants.VideoDetailScreen,
                                { data: props })
                        }}
                        onPressBookmark={onPressBookmark}
                        videoThumbnailStyle={videoThumbnailStyle}
                        bookMarkColorType={isTab && BookMarkColorType.PRIMARY}
                    />
                </View>
            );
        case PopulateWidgetType.PODCAST:
            return (
                <View style={podcastStyle}>
                    {showModal && episodeModal()}
                    <ArticlePodCastWidget
                        {...props}
                        onPressBookmark={onPressBookmark}
                        onPress={() => setShowModal(true)}
                    />
                </View>
            )
        case PopulateWidgetType.ALBUM:           
            return (
              <View style={containerStyle}>
                <PhotoGalleryItem
                  {...props}
                  index={props.key}
                  title={props.title}
                  nid={props.nid}
                  created={props.created}
                  imageUrl={props.imageUrl}
                  onPress={onPressAlbum}
                  onUpdateBookmark={onPressBookmark}
                  isBookmarked={true}
                  showDivider={!isTab}
                  bookMarkColorType={isTab && BookMarkColorType.PRIMARY}
                  addBodyContentStyle={isTab && {paddingHorizontal: 0}}
                />
              </View>
            );
        default: return null
    }

}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    widgetContainer: {
        paddingHorizontal: normalize(0.04 * screenWidth),
    },
    widgetContainerTab: {
        flex: 0.485,
    },
    opinionContainerTab: {
        flex: 0.485,
        paddingBottom: 20,
    },
    podcastContainer: {
        backgroundColor: theme.secondaryWhite,
    },
    podcastContainerTab: {
        flex: 0.485,
        marginBottom: 40,
    },
    videoContainerTab: {
        flex: 0.485,
    },
    titleStyle:{
        fontFamily: fonts.AwsatDigital_Bold,
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
    tabletImageStyle: {
        width: '100%',
        height: 'auto'
    },
    videoThumbnailPortrait: {
        height: 350,
    },
    videoThumbnailLandscape: {
        height: 450,
    }
})

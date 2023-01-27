import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer } from 'src/components/screens/ScreenContainer/ScreenContainer';
import { PodcastProgramHeader } from 'src/components/molecules/podcast/PodcastProgramHeader';
import Share from 'react-native-share';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { normalize, isNonEmptyArray, recordLogEvent, isTab, screenWidth } from 'src/shared/utils';
import { colors } from 'src/shared/styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppPlayer, useBookmark, useLogin, usePodcast } from 'src/hooks';
import { PodcastEpisodeBodyGet, PodcastListItemType } from 'src/redux/podcast/types';
import { useIsFocused } from '@react-navigation/native';
import TrackPlayer, { State, usePlaybackState, } from 'react-native-track-player';
import { getPodcastUrl, horizontalEdge, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { Styles } from 'src/shared/styles';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { PodcastEpisodeModalInfo } from 'src/components/organisms/podcast/PodcastEpisodeModalInfo';

export interface PodcastEpisodeModalProps {
    route: any;
    onPressBack: () => void;
}

export const podcastEpisodeInitialData: PodcastListItemType = {
    nid: '',
    title: '',
    field_new_sub_title_export: '',
    field_announcer_name_export: '',
    field_spreaker_episode_export: '',
    body_export: '',
    type: '',
    view_node: '',
    field_apple_podcast_export: null,
    field_duration_export: null,
    field_episode_export: null,
    field_google_podcast_export: null,
    field_podcast_image_export: null,
    field_podcast_sect_export: {
        id: '',
        title: '',
        url: '',
        bundle: '',
        description: '',
        anghami: {
            url: '',
            text: ''
        },
        apple_podcasts: {
            url: '',
            text: ''
        },
        google_podcast: {
            url: '',
            text: ''
        },
        image: '',
        img_podcast_desktop: '',
        img_podcast_mobile: '',
        spotify: {
            url: '',
            text: ''
        },
        name: ''
    },
    field_spotify_export: null,
    field_spreaker_show_export: null,
    isBookmarked: false,
    field_total_duration_export: ''
}

export const PodcastEpisodeModal = ({ route, onPressBack }: PodcastEpisodeModalProps) => {
    const styles = useThemeAwareObject(createStyles);
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const initialRef = useRef(0);
    const playbackState = usePlaybackState();

    const nid = route.params.data.nid

    const {
        isLoading, podcastEpisodeData,
        fetchPodcastEpisodeRequest
    } = usePodcast()

    const {
        setShowMiniPlayer, setPlayerTrack,
        showMiniPlayer, selectedTrack: trackData
    } = useAppPlayer()

    const {
        sendBookmarkInfo,
        removeBookmarkedInfo,
        bookmarkIdInfo
    } = useBookmark()

    const { isLoggedIn } = useLogin()

    const [showupUp, setShowPopUp] = useState(false)
    const [podcastEpisodeDetailInfo, setPodcastEpisodeDetailInfo] = useState<PodcastListItemType[]>(podcastEpisodeData)

    const payload: PodcastEpisodeBodyGet = {
        nid: nid
    }

    useEffect(() => {
        fetchPodcastEpisodeRequest(payload)
    }, [])

    useEffect(() => {
        if (!isFocused) {
            initialRef.current = 0;
        }
    }, [isFocused])


    const validateBookmark = (nid: string): boolean => {
        return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
    }

    useEffect(() => {
        updatePodcastEpisodeData()
    }, [podcastEpisodeData, bookmarkIdInfo])

    const updatePodcastEpisodeData = () => {
        if (!isNonEmptyArray(podcastEpisodeData)) {
            return
        }
        const podcastEpisodeDetail = podcastEpisodeData.map((item: any) => {
            return {
                ...item,
                isBookmarked: validateBookmark(item.nid)
            }
        })
        setPodcastEpisodeDetailInfo(podcastEpisodeDetail)
    }

    const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
        if (isLoggedIn) {
            isBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.PODCAST }) : removeBookmarkedInfo({ nid })
        } else {
            setShowPopUp(true)
        }
    }

    const onPressSaveEpisodeDetail = () => {
        const data = [...podcastEpisodeDetailInfo]
        const index = data.findIndex((item) => item.nid === nid);
        const item = data[index]
        if (isObjectNonEmpty(item)) {
            const newBookmarked = !item.isBookmarked
            data[index].isBookmarked = newBookmarked
            setPodcastEpisodeDetailInfo(data)
            updateBookmarkInfo(item.nid, newBookmarked)
        }
    }

    const onPressEpisodeBookmark = () => {
        isLoggedIn ? onPressSaveEpisodeDetail() : makeSignUpAlert()
    }

    const onCloseSignUpAlert = () => {
        setShowPopUp(false)
    }

    const makeSignUpAlert = () => {
        setShowPopUp(true)
    }

    const episodeIndex = podcastEpisodeDetailInfo.findIndex((item: any) => item.nid === nid);
    const podcastEpisodeInfo = podcastEpisodeDetailInfo ? podcastEpisodeDetailInfo[episodeIndex] : podcastEpisodeInitialData

    const onPressShare = async () => {
        await Share.open({
            title: podcastEpisodeInfo.title,
            url: podcastEpisodeInfo.view_node,
            failOnCancel: true,
            subject: podcastEpisodeInfo.title
        }).then(response => {
            console.log('Shared successfully :::', response)
        }).catch((error) => {
            console.log('Cancelled share request :::', error)
        })
    }

    useEffect(() => {
        fetchPodcastEpisodeRequest(payload);
    }, [nid]);


    const onListenPress = async (duration: any) => {
        if (isObjectNonEmpty(podcastEpisodeInfo)) {
            const trackPlayerData = {
                id: podcastEpisodeInfo.nid,
                url: getPodcastUrl(podcastEpisodeInfo.field_spreaker_episode_export!),
                title: podcastEpisodeInfo.title,
                duration: duration,
                artist: podcastEpisodeInfo.title,
                artwork: podcastEpisodeInfo?.field_podcast_sect_export?.image
            }
            recordLogEvent('Played_Podcast', { podcastid: podcastEpisodeInfo.nid });
            if ((trackData && trackData.id !== trackPlayerData.id) || trackData == null) {
                setPlayerTrack(trackPlayerData);
            }
            !showMiniPlayer && setShowMiniPlayer(true);
            showMiniPlayer && playbackState === State.Playing ? TrackPlayer.pause() : TrackPlayer.play();
        }
    }

    const onGoBack = () => {
        onPressBack();
    }

    const renderItem = () => (
        <View style={styles.headerStyle}>
            <PodcastProgramHeader
                headerShareIconTestId={'podcast_episode_share'}
                headerBookmarkIconTestId={'podcast_episode_save'}
                headerBackIconTestId={'podcast_episode_back'}
                onPressShare={onPressShare}
                onGoBack={onGoBack}
                onPressSave={onPressEpisodeBookmark}
                showLogo={true}
                isSaved={podcastEpisodeInfo ? podcastEpisodeInfo.isBookmarked ?? false : false}
                isCloseIcon={true}
            />
            <PodcastEpisodeModalInfo data={podcastEpisodeInfo} onListenPress={onListenPress} />
        </View>
    )

    return (
        <ScreenContainer edge={horizontalEdge} barStyle={'light-content'} isLoading={isLoading}
            statusbarColor={Styles.color.codGray}
            isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert}>
            <View style={{ height: insets.top, backgroundColor: colors.black }} />
            {renderItem()}
        </ScreenContainer>
    )
}

const createStyles = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: normalize(15),
        paddingBottom: normalize(15),
        paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
        backgroundColor: theme.backgroundColor,
    },
    headerStyle: {
        backgroundColor: colors.black,
        height: '100%',
    },
})
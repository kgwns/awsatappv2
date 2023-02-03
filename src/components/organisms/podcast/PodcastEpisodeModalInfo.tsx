import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label';
import { Image } from 'src/components/atoms/image/Image'
import { ButtonOutline } from "src/components/atoms/button-outline/ButtonOutline";
import { PodcastVerticalListProps } from 'src/components/molecules/';
import { isAndroid, isTab, normalize, screenWidth } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors } from 'src/shared/styles/colors';
import ApplePodcastIcon from 'src/assets/images/icons/apple_podcast_icon.svg';
import GooglePodcastIcon from 'src/assets/images/icons/google_podcast_icon.svg';
import SpotifyIcon from 'src/assets/images/icons/spotify_episode_icon.svg';
import AnghamiPodcastIcon from 'src/assets/images/icons/anghami_icon.svg';
import PlayIcon from 'src/assets/images/icons/Play_black.svg';
import PauseIcon from 'src/assets/images/icons/pauseIconBlack.svg';
import { decodeHTMLTags, convertSecondsToHMS, isNotEmpty, isObjectNonEmpty, getDay } from 'src/shared/utils/utilities';
import { podcastEpisodeInitialData } from 'src/components/screens/podcast/PodcastEpisode';
import { fonts } from 'src/shared/styles/fonts';
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService';
import { podcastServices, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { usePlaybackState, State } from 'react-native-track-player';
import { useAppPlayer } from 'src/hooks';
import { ImageResize } from 'src/shared/styles/text-styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface PodcastEpisodeModalInfoProps {
    data: PodcastVerticalListProps;
    onListenPress?: (duration: any) => void;
}

export const PodcastEpisodeModalInfo: FunctionComponent<any> = ({
    data,
    onListenPress
}) => {
    const insets = useSafeAreaInsets();

    const styles = useThemeAwareObject(createStyles);
    const PODCAST_EPISODE_LISTEN_TO = TranslateConstants({key:TranslateKey.PODCAST_EPISODE_LISTEN_TO})
    const PODCAST_EPISODE_LISTEN_TO_EPISODE = TranslateConstants({key:TranslateKey.PODCAST_EPISODE_LISTEN_TO_EPISODE})

    const playbackState = usePlaybackState();
    const { selectedTrack } = useAppPlayer();

    const fieldData = data ? data : podcastEpisodeInitialData
    const podcastSectionData = fieldData.field_podcast_sect_export
    const hasNewSubTitle = !!fieldData.field_new_sub_title_export
    const [duration, setDuration] = useState<any>(null)
    const [prevPlayBackState, setPrevPlayBackState] = useState<State | null>(null);
    const [isBuffering, setIsBuffering] = useState<boolean>(false);

    useEffect(() => {
        setDuration(null);
        getPodcastDuration()
    }, [fieldData])

    useEffect(() => {
        if (prevPlayBackState === State.Playing && playbackState === State.Buffering) {
            setIsBuffering(true);
        } else {
            setIsBuffering(false);
        }
        setPrevPlayBackState(playbackState);
    }, [playbackState])

    const getPodcastDuration = async () => {
        if (isNotEmpty(fieldData.field_spreaker_episode_export)) {
            try {
                const response: any = await fetchSingleEpisodeSpreakerApi({ episodeId: fieldData.field_spreaker_episode_export })
                if (isObjectNonEmpty(response.response) && isObjectNonEmpty(response.response.episode)) {
                    const episode = response.response.episode
                    setDuration(Math.round(episode.duration / 1000))
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const onPodcastServicePress = (podcastService: string) => {
        switch (podcastService) {
            case podcastServices.anghami:
                Linking.openURL(podcastSectionData.anghami.url);
                return;
            case podcastServices.apple:
                Linking.openURL(podcastSectionData.apple_podcasts.url)
                return;
            case podcastServices.google:
                Linking.openURL(podcastSectionData.google_podcast.url);
                return;
            case podcastServices.spotify:
                Linking.openURL(podcastSectionData.spotify.url)
                return;
            default:
                return;
        }
    }

    const renderPodcastView = () => (
        <View style={styles.mainContainer}>
            <Label children={PODCAST_EPISODE_LISTEN_TO} style={styles.listToText} />
            <View style={styles.podcastContainer}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.spotify.url)} onPress={() => onPodcastServicePress(podcastServices.spotify)} testID = "spotifyUrl">
                    <SpotifyIcon width={25} height={25} />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.anghami.url)} onPress={() => onPodcastServicePress(podcastServices.anghami)} testID = "anghamiUrl">
                    <AnghamiPodcastIcon width={24} height={24} />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.apple_podcasts.url)} onPress={() => onPodcastServicePress(podcastServices.apple)} testID = "appleUrl">
                    <ApplePodcastIcon width={23} height={23} />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.google_podcast.url)} onPress={() => onPodcastServicePress(podcastServices.google)} testID = "googleUrl">
                    <GooglePodcastIcon width={23} height={23} />
                </TouchableOpacity>
            </View>
        </View>
    )

    const playPauseIcon = () => (
        <View style={styles.rightIconStyle}>
            {selectedTrack && selectedTrack.id === fieldData.nid && playbackState === State.Playing || isBuffering ?
                <PauseIcon fill={colors.black} width={13} height={13} /> :
                <PlayIcon fill={colors.black} />
            }
        </View>
    )

    const topView = () => (
        <View style={styles.topContainer}>
            <Label style={styles.titleTextStyle} children={fieldData.title} />
            <View style={isTab ? styles.imageTab : styles.imageStyle}>
                <Image fallback url={fieldData?.field_podcast_sect_export?.image}
                    style={styles.image}
                    resizeMode={ImageResize.COVER}
                />
            </View>
            {hasNewSubTitle &&
                <View style={styles.containerSpace} >
                    <Label style={styles.textStyle} children={fieldData.field_new_sub_title_export} />
                </View>
            }
            {!!fieldData.field_announcer_name_export &&
                <View style={[styles.bottomSpace, !hasNewSubTitle && { paddingTop: normalize(16) }]} >
                    <Label style={styles.announcerTextStyle} children={fieldData.field_announcer_name_export} />
                </View>
            }
        </View>
    )

    const bottomView = () => (
        <View style={[styles.bottomContainer, { bottom: insets.bottom }]}>
            <ButtonOutline title={PODCAST_EPISODE_LISTEN_TO_EPISODE}
                style={styles.buttonStyle}
                labelStyle={styles.buttonLabel}
                titleType={LabelTypeProp.h1}
                onPress={() => onListenPress(duration)}
                rightIcon={() => playPauseIcon()}
            />
            <View style={styles.containerSpace} />
            <View style={styles.headerLeftStyle}>
                <Label style={styles.footerTextStyle} numberOfLines={1} children={getDay(fieldData.created_export)} />
                {fieldData.created_export && duration ? <Label color={colors.spanishGray} children={"|"} style={styles.verticalLine} /> : <View />}
                <Label style={styles.footerTextStyle} numberOfLines={1} children={convertSecondsToHMS(duration)} />
            </View>
            {!!fieldData.body_export &&
                <View style={styles.containerSpace} >
                    <Label style={styles.descriptionTextStyle} children={decodeHTMLTags(fieldData.body_export)} numberOfLines={3} />
                </View>
            }
            {renderPodcastView()}
        </View>
    )

    return (
        <View style={styles.containerStyle}>
            {topView()}
            {bottomView()}
        </View>
    );
};

const createStyles = () => StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
        alignItems: 'center'
    },
    topContainer: {
        alignItems: 'center',
        paddingTop: normalize(10),
    },
    imageTab: {
        width: 0.68 * screenWidth,
        height: 0.54 * screenWidth,
        overflow: 'hidden',
    },
    imageStyle: {
        width: normalize(134),
        height: normalize(106),
        overflow: 'hidden',
    },
    textStyle: {
        fontSize: 22,
        fontFamily: fonts.AwsatDigital_Bold,
        lineHeight: 36,
        color: colors.white,
        textAlign: 'center',
    },
    announcerTextStyle: {
        fontSize: 15,
        lineHeight: 21,
        color: colors.greenishBlue,
    },
    bottomSpace: {
        paddingBottom: normalize(13),
    },
    titleTextStyle: {
        fontSize: 15,
        lineHeight: 26,
        color: colors.greyNickel,
        textAlign: 'center',
        paddingBottom: normalize(15),
        fontFamily: fonts.AwsatDigital_Regular,
    },
    descriptionTextStyle: {
        fontSize: 14,
        lineHeight: 25,
        color: colors.white,
        textAlign: 'center',
    },
    labelStyle: {
        fontSize: normalize(11),
        color: colors.white,
        paddingRight: normalize(5),
        paddingBottom: normalize(10),
    },
    containerSpace: {
        paddingVertical: normalize(8),
        paddingTop: normalize(15)
    },
    podcastContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 0.76 * screenWidth,
        paddingBottom:  isAndroid ? normalize(30) : normalize(0)
    },
    buttonStyle: {
        backgroundColor: colors.white,
        borderWidth: 0,
        width: '60%',
        marginTop: normalize(20),
    },
    rightIconStyle: {
        paddingRight: normalize(15),
    },
    headerLeftStyle: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    footerTextStyle: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.white,
        marginLeft: normalize(5),
        fontFamily: fonts.AwsatDigital_Regular,
    },
    buttonLabel: {
        color: colors.black,
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: 14,
        lineHeight: 26
    },
    listToText: {
        fontSize: 14,
        lineHeight: 30,
        color: colors.white,
        fontFamily: fonts.AwsatDigital_Bold,
        marginBottom: normalize(20),
    },
    bottomContainer: {
        alignItems: 'center',
        position: 'absolute',
    },
    verticalLine: {
        height: 10,
        marginHorizontal: 8,
    },
    image: {
        width: '100%',
        height: '100%' 
    },
    mainContainer: {
        alignItems: 'center', 
        paddingTop: normalize(20) 
    }
});

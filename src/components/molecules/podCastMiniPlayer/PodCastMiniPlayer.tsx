import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FunctionComponent } from 'react'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { Image } from 'src/components/atoms'
import { ImagesName } from 'src/shared/styles'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { isTab, normalize } from 'src/shared/utils'
import TextTicker from 'react-native-text-ticker';
import { State, usePlaybackState } from 'react-native-track-player';
import { podcastEpisodeInitialData } from 'src/components/screens/podcast/PodcastEpisode'
import { ImageResize } from 'src/shared/styles/text-styles'

export interface PodcastMiniPlayerProps {
    data: any;
    onClose: () => void;
    onPlaybackPress?: (item: any) => void;
}

export const PodCastMiniPlayer: FunctionComponent<PodcastMiniPlayerProps> = ({
    data,
    onClose,
    onPlaybackPress
}) => {
    const style = useThemeAwareObject(customStyle)
    const playbackState = usePlaybackState();
    const fieldData = data ? data : podcastEpisodeInitialData
    const isLoading = (playbackState === State.None ||  playbackState === State.Buffering || playbackState === State.Connecting || playbackState == State.Ready) && (playbackState !== State.Paused && playbackState !== State.Playing)
    
    const Pause = () => (
        <>
            {getSvgImages({ name: ImagesName.pauseIcon, width: normalize(17), height: normalize(17) })}
        </>
    )

    const Play = () => (
        <>
            {getSvgImages({ name: ImagesName.playIconSVG, width: normalize(15), height: normalize(17) })}
        </>
    )
    
    return (
        <View style={style.container}>
            <View style={style.miniPlayer}>
                <View style={style.rowStyleContainer}>
                    <View style={style.imageContainer}>
                        <Image fallback url={fieldData.field_podcast_sect_export?.img_podcast_mobile}
                            style={style.image}
                            resizeMode={ImageResize.COVER}
                        />
                    </View>
                    <View style={style.titleContainer}>
                        <TextTicker
                            disabled={playbackState === State.Playing ? false : true}
                            animationType={'scroll'}
                            shouldAnimateTreshold={50}
                            duration={8000}
                            children={fieldData.title}
                            style={style.title}
                        />
                    </View>
                    <TouchableOpacity onPress={onPlaybackPress}>
                        <View style={style.buttonContainer}>
                            {isLoading ? <ActivityIndicator /> :
                                playbackState === State.Playing ? <Pause /> : <Play />}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.closeContainer}>
                    <TouchableOpacity onPress={onClose}>
                        <View style={style.closeIcon}>
                            {getSvgImages({ name: ImagesName.playerCloseIcon, width: normalize(12), height: normalize(12) })}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: normalize(80),
            position: 'absolute',
            bottom: 0,
        },
        miniPlayer: {
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            borderTopWidth: 1,
            borderTopColor: theme.miniPlayerBorderColor,
            borderBottomWidth: 1,
            borderBottomColor: theme.miniPlayerBorderColor,
            backgroundColor: theme.miniPlayerBackgroundColor
        },
        rowStyleContainer: {
            flexDirection: 'row',
            width: '85%',
            height: '100%',
            padding: normalize(12)
        },
        imageContainer: {
            width: isTab ? normalize(120) : normalize(46),
            height: isTab ? normalize(52) : normalize(41),
            backgroundColor: 'black'
        },
        image: {
            width: '100%',
            height: '100%',
        },
        titleContainer: {
            justifyContent: 'flex-start',
            width: '70%',
            marginLeft: normalize(10)
        },
        title: {
            textAlign: 'left',
            fontSize: isTab ? 16 : 13,
            lineHeight: isTab ? 19 : 16,
            marginTop: normalize(10),
            color: theme.primaryBlack
        },
        buttonContainer: {
            alignItems: 'center',
            marginTop: normalize(10),
            marginLeft: normalize(10)
        },
        closeContainer: {
            width: '15%',
            height: '100%',
            borderLeftWidth: 1,
            borderLeftColor: theme.miniPlayerBorderColor
        },
        closeIcon: {
            alignItems: 'center',
            margin: normalize(24)
        }
    })
}
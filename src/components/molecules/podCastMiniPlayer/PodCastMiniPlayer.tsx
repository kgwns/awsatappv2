import { View, StyleSheet, TouchableOpacity, ActivityIndicator, StyleProp, ViewStyle, Dimensions } from 'react-native'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { Image, Label } from 'src/components/atoms'
import { ImagesName } from 'src/shared/styles'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { isAndroid, isIOS, isTab, normalize, screenWidth } from 'src/shared/utils'
import TextTicker from 'react-native-text-ticker';
import TrackPlayer, { State, usePlaybackState, useProgress, Event, useTrackPlayerEvents } from 'react-native-track-player';
import { ImageResize } from 'src/shared/styles/text-styles'
import { useAppPlayer } from 'src/hooks/useAppPlayer'
import RBSheet from 'react-native-raw-bottom-sheet'
import { fonts } from 'src/shared/styles/fonts'
import Slider from '@react-native-community/slider'
import { convertSecondsToHMS, DEFAULT_HIT_SLOP } from 'src/shared/utils/utilities'

export interface PodcastMiniPlayerProps {
    onClose?: () => void;
    toggleControl?: () => void;
    showUI?: boolean;
    playerPosition?: StyleProp<ViewStyle>;
}

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackQueueEnded
  ];

export const PodCastMiniPlayer: FunctionComponent<PodcastMiniPlayerProps> = ({
    onClose, playerPosition
}) => {
    const style = useThemeAwareObject(customStyle)
    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing
    const isLoading = playbackState.state !== State.Playing && playbackState.state !== State.Paused
    const isBuffering = playbackState.state === State.Buffering
    const { selectedTrack } = useAppPlayer()
    
    const refRBSheet = useRef<RBSheet>();
    const _playForwardIcon = getSvgImages({ name: ImagesName.playForwardIcon, width: normalize(25), height: normalize(25) })
    const _playBackwardIcon = getSvgImages({ name: ImagesName.playBackwardIcon, width: normalize(25), height: normalize(25) })
    const _playIcon = getSvgImages({ name: ImagesName.playIconSVG, width: normalize(18), height: normalize(18) })
    const _pauseIcon = getSvgImages({ name: ImagesName.pauseIcon, width: normalize(18), height: normalize(18) })

    const progress = useProgress();
    const [showControl, setShowControl] = useState(false)

    useEffect(()=> {
        showControl && refRBSheet.current?.open();
    },[showControl])

    // check playback error
    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            console.log('An error occured while playing the current track.');
        }
        if (event.type === Event.PlaybackQueueEnded) {
            setTrackToStart()
        }
    });

    const setTrackToStart = async() => {
        const currentTrack = await TrackPlayer.getActiveTrackIndex()
        if(currentTrack != null){
            await TrackPlayer.pause();
            await TrackPlayer.seekTo(0)
        }
    }

    const iconStyleWidth = isTab ? 20 : normalize(17);
    const iconStyleHeight = isTab ? 20 : normalize(17);
    
    const Pause = () => (
        <>
            {getSvgImages({ name: ImagesName.pauseIcon, width: iconStyleWidth, height: iconStyleHeight })}
        </>
    )

    const Play = () => (
        <>
            {getSvgImages({ name: ImagesName.playIconSVG, width: iconStyleWidth, height: iconStyleHeight })}
        </>
    )

    const onPlayPausePress = async () => {
        const state = await TrackPlayer.getPlaybackState()

        if(selectedTrack != null){
            if(state.state === State.Paused){
                await TrackPlayer.play()
            }else{
                await TrackPlayer.pause()
            }
        }
    };

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const seekForwardBackward = async(type: any) => {
        const seekValue = 10
        const position = progress.position
        const duration = progress.duration
        let seekPosition = position
        
        if(type === 'forward'){
            seekPosition = duration > (position + seekValue) ? (position + seekValue) : position
        }else{
            seekPosition = (position - seekValue) > 0 ? (position - seekValue) : position
        }
        await TrackPlayer.seekTo(seekPosition); 
    }

    const onCloseControl = () => {
        setShowControl(false)
    }

    const renderRBSheet = () => (
       
        
        <RBSheet
        ref={(ref: RBSheet) => refRBSheet.current = ref}
            animationType={'none'}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeOnDragAboveSheet={true}
            onClose={onCloseControl}
            height={isIOS ? normalize(220) : normalize(200)}
            customStyles={{
                container: StyleSheet.flatten([style.rbSheetContainer]),
                wrapper: style.popupBackground,
                draggableIcon: style.rbDraggableIcon
            }}
            openDuration={50}
        >
            <View style={style.playerContainer}>
                <Label children={selectedTrack.title} style={style.titleStyle} numberOfLines={1} />
                <View style={style.imageContainerStyle}>
                    <Image fallback url={selectedTrack.artwork}
                        style={style.imageStyle}
                        resizeMode={'cover'}
                    />
                </View>
                <View style={[style.progrsBarSection, style.sliderContainer]}>
                    <Slider
                        style={[style.sliderStyle, isIOS && { direction: 'ltr'  }]}
                        minimumValue={0}
                        testID='Slider'
                        maximumValue={progress.duration}
                        minimumTrackTintColor="#2C8A82"
                        maximumTrackTintColor="#E0E0E0"
                        thumbTintColor="#2C8A82"
                        value={progress.position}
                        tapToSeek
                        inverted={ isIOS ? true : false}
                        onSlidingComplete={ async(value) => {
                            await TrackPlayer.seekTo(value);
                        }}
                    />
                </View>
                <View style={[style.durationContainer, isAndroid && {paddingHorizontal: 15} ]} >
                    <Label 
                        children={
                            convertSecondsToHMS(progress.duration < progress.position ? progress.duration : Math.floor(progress.position || 0))
                        } 
                        style={style.durationText}
                    />
                    <Label children={convertSecondsToHMS(progress.duration || 0)} style={style.durationText}/>
                </View>
                <View style={style.controls} >
                    <TouchableOpacity hitSlop={DEFAULT_HIT_SLOP} testID='playForwardIcon' onPress={() => { seekForwardBackward('backward') }}>
                        {_playForwardIcon}
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={DEFAULT_HIT_SLOP} testID='playPause' onPress={() => onPlayPausePress()}>
                        { isPlaying || isBuffering ? _pauseIcon : _playIcon }
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={DEFAULT_HIT_SLOP} testID='playBackwardIcon' onPress={() => { seekForwardBackward('forward') }}>
                        {_playBackwardIcon}
                    </TouchableOpacity>
                </View>
            </View>

        </RBSheet>
    )
    
    return (
        <View style={style.mainContainer} >
            <View style={StyleSheet.flatten([style.container, playerPosition, (!isPortrait() && !isTab) ? style.containerLandscape : null]) }>
                <View style={style.miniPlayer}>
                    <TouchableOpacity testID={'Miniplayer'} onPress={() => { setShowControl(true);} } style={style.rowStyleContainer}>
                        <View style={style.imageContainer}>
                            <Image fallback url={selectedTrack.artwork}
                                style={style.image}
                                resizeMode={ImageResize.COVER}
                            />
                        </View>
                        <View style={style.titleContainer}>
                            <TextTicker
                                disabled={isPlaying ? false : true}
                                animationType={'scroll'}
                                shouldAnimateTreshold={0}
                                duration={8000}
                                children={selectedTrack.title}
                                style={style.title}
                            />
                        </View>
                        <View style={style.buttonBackground}>
                            <TouchableOpacity testID={'playingState'} onPress={() => onPlayPausePress()}>
                                <View style={style.buttonContainer}>
                                    {isLoading ? <ActivityIndicator /> : isPlaying ? <Pause /> : <Play />}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity testID={'closeIcon'} onPress={onClose} style={style.closeContainer}>
                        <View style={style.closeIcon}>
                            {getSvgImages({ name: ImagesName.playerCloseIcon, width: isTab ? 15 : normalize(12), height: isTab ? 15 : normalize(12) })}
                        </View>
                    </TouchableOpacity>
                </View>
                {showControl && renderRBSheet()}
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: isTab ? 100 : normalize(80),
            position: 'absolute',
            bottom: 0,
        },
        containerLandscape: {
            alignSelf: 'flex-end'
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
            width: isTab ? 70 : normalize(46),
            height: isTab ? 52 : normalize(41),
            backgroundColor: 'black'
        },
        image: {
            width: '100%',
            height: '100%',
        },
        titleContainer: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '75%',
            marginLeft: normalize(10)
        },
        title: {
            textAlign: 'left',
            fontSize: isTab ? 16 : 13,
            lineHeight: isTab ? 19 : 16,
            marginTop: isTab ? 16 : normalize(10),
            color: theme.primaryBlack
        },
        buttonBackground: {
            width: '10%',
            alignItems: 'flex-end',
            paddingRight: 15
        },
        buttonContainer: {
            alignItems: 'center',
            marginTop: isTab ? 16 : normalize(10),
        },
        buttonContainerPortrait: {
            marginLeft: isTab? normalize(60) : normalize(10)
        },
        buttonContainerLandscape: {
            marginLeft: isTab? normalize(120) : normalize(70),
        },
        closeContainer: {
            width: '15%',
            height: '100%',
            borderLeftWidth: 1,
            borderLeftColor: theme.miniPlayerBorderColor
        },
        closeIcon: {
            alignItems: 'center',
            margin: isTab ? 32 : normalize(24)
        },
        rbSheetContainer: {
            borderTopLeftRadius: normalize(20),
            borderTopRightRadius: normalize(20),
            backgroundColor: theme.secondaryWhite,
            height: isIOS ? normalize(220) : normalize(200),
        },
        rbDraggableIcon: {
            width: normalize(33),
            height: 3,
            backgroundColor: colors.lightToneGreen
        },
        popupBackground: {
            backgroundColor: theme.playerBackground,
        },
        imageStyle: {
            width: normalize(62),
            height: normalize(55)
        },
        titleStyle: {
            fontFamily: fonts.AwsatDigital_Bold,
            fontSize: normalize(16),
            lineHeight: normalize(25),
            color: theme.primaryBlack,
            marginTop: normalize(15),
            textAlign: 'center'
        },
        imageContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: normalize(10)
        },
        playerContainer: {
            flex: 1,
            paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
        },
        progrsBarSection: {
            width: '100%',
        },
        durationContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 4,
        },
        durationText: {
            fontFamily: fonts.Effra_Arbc_Regular,
            fontSize: normalize(11),
            lineHeight: normalize(25),
            color: colors.lightToneGreen,
        },
        controls: {
            width: '100%',
            paddingHorizontal: '20%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        sliderStyle: {
            width: isIOS ? '200%' : '100%',
            height: 15,
            alignSelf: 'center'
        },
        sliderContainer: {
            transform: [{ scaleX: isIOS ? 0.5:1 }, { scaleY: isIOS ? 0.5:1 }]
        },
        mainContainer: {
            width: '100%'
        }
    })
}

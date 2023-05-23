import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  ImageBackground,
  AppState,
} from 'react-native';
import {isIOS} from 'src/shared/utils';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import Video from 'react-native-video';
import {convertSecondsToHMS, DEFAULT_HIT_SLOP} from 'src/shared/utils/utilities';
import Slider from '@react-native-community/slider';
import {LoadingState} from 'src/components/atoms';
import TrackPlayer from 'react-native-track-player';
import {useAppPlayer} from 'src/hooks';
import {images, ImagesName} from 'src/shared/styles/images';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {fonts} from 'src/shared/styles/fonts';

export interface VideoPlayerControlProp {
  url: string;
  currentTime?: any;
  paused: boolean;
  playerVisible?: boolean;
  isMiniPlayer?: boolean;
  isFullScreen?: boolean;
  isFullScreenPlayer?: boolean;
  setPlayerDetails?: (time: any, paused: any) => void;
  setMiniPlayerVisible?: (visible: boolean) => void;
  onChangeFullScreen?: (isFullScreen: boolean) => void;
  setReset?: (show: boolean) => void;
  videoRefs?: any;
  showReplay?: boolean;
}
const JUSTIFY_CONTENT = 'space-between';
const VideoPlayerControl = ({
  url,
  currentTime: time,
  paused: isPaused,
  playerVisible,
  setPlayerDetails,
  isMiniPlayer = false,
  isFullScreenPlayer = false,
  isFullScreen = false,
  setMiniPlayerVisible,
  onChangeFullScreen,
  videoRefs,
  showReplay = false,
  setReset
}: VideoPlayerControlProp) => {
  const styles = useThemeAwareObject(customStyle);

  const videoPlayer = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [tapActionTimeout, setTapActionTimeout] = useState<any>(null);
  const [showControls, setShowControls] = useState(false);
  const [initialPlay, setInitialPlay] = useState(true);
  const [screenType, setScreenType] = useState('contain');
  const [showReplayBtn, setShowReplayBtn] = useState(false);
  const [play, setPlay] = useState(false);
  const initialLoadRef = useRef(true);

  const {setShowMiniPlayer, setPlayerTrack, showMiniPlayer} = useAppPlayer();

  useEffect(() => {
    if (showReplay) {
      setShowControls(false);
      setTimeout(()=>{
        videoPlayer.current?.seek(0);
        setPaused(true)
      },100)
    } else {
      setShowControls(true)
    }
    !isMiniPlayer && setShowReplayBtn(showReplay);
  }, [showReplay]);

  const onSeek = (seek: any) => {
    videoPlayer.current?.seek(seek);
  };
  // Enable when required renderPlaypause
  // const onPaused = () => {
  //   if (!isMiniPlayer && !paused) {
  //     setMiniPlayerVisible && setMiniPlayerVisible(false);
  //   }
  //   setPaused(!paused);
  // };

  const onPausedPress = () => {
    if (!isMiniPlayer && !paused) {
      setMiniPlayerVisible && setMiniPlayerVisible(false);
    }
    setPaused(!paused);
    setPlay(true);
  };


  const onProgress = (data: any) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
    !isIOS && videoPlayer.current?.seek(0.1);
    onScreenTouch();
    if (initialLoadRef.current) {
      videoPlayer.current?.seek(time);
    }
  };

  const onLoadStart = (data: any) => setIsLoading(true);

  const onEnd = () => {
    if (!isIOS) {
      videoPlayer.current?.seek(0);
      setPaused(true);
    } else {
      setPaused(true);
    }
    isMiniPlayer && closePlayer();
    setReset && setReset(true);
  };

  const toggleFullscreen = () => {
    onChangeFullScreen &&
      (isFullScreen ? onChangeFullScreen(false) : onChangeFullScreen(true));
  };

  useEffect(() => {
    if (
      (isFullScreen && !isFullScreenPlayer) ||
      (!isFullScreen && isFullScreenPlayer)
    ) {
      setPaused(true);
      setPlay(true)
      setPlayerDetails && setPlayerDetails(currentTime, paused);
    }
    if (isFullScreen && !isFullScreenPlayer) {
      setShowControls(false);
    }
  }, [isFullScreen]);

  useEffect(() => {
    if (!paused && initialPlay && showMiniPlayer) {
      stopTrackPlayer();
    }
    if (!paused && !isMiniPlayer && !isFullScreenPlayer) {
      setMiniPlayerVisible && setMiniPlayerVisible(true);
    }
  }, [paused]);

  useEffect(() => {
    if ((playerVisible && !isMiniPlayer) || (!playerVisible && isMiniPlayer)) {
      setPaused(true);
      setPlayerDetails && setPlayerDetails(isIOS ? Math.ceil(currentTime) : Math.ceil((currentTime + Number.EPSILON) * 10) / 10, paused);
    }
    if (playerVisible && !isMiniPlayer) {
      setShowControls(false);
    }
    if (playerVisible && initialLoadRef.current) {
      initialLoadRef.current = false;
    }
  }, [playerVisible]);

  useEffect(() => {
    onSeek(time);
    setPaused(isPaused);
  }, [time]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', () => {
      if (AppState.currentState.match(/inactive|background/)) {
        setPaused(true);
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const onPressReplay = () => {
    setShowReplayBtn(false);
    videoPlayer.current?.seek(0);
    setPaused(false);
    setReset && setReset(false);
  }

  const onScreenTouch = () => {
    if (playerVisible && !isMiniPlayer) {
      setShowControls(false);
    } else {
      if (tapActionTimeout) {
        clearTimeout(tapActionTimeout);
        setTapActionTimeout(null);
        if (showControls) {
          resetControlTimeout();
        }
      } else {
        setTapActionTimeout(
          setTimeout(() => {
            toggleControls();
            setTapActionTimeout(null);
          }, 130),
        );
      }
    }
  };

  const toggleControls = () => {
    if (!showControls) {
      setControlTimeout();
    } else {
      clearControlTimeout();
    }
    setShowControls(!showControls);
  };

  const resetControlTimeout = () => {
    clearControlTimeout();
    setControlTimeout();
  };

  const setControlTimeout = () => {
    setTapActionTimeout(
      setTimeout(() => {
        hideControls();
      }, 15000),
    );
  };

  const hideControls = () => {
    setShowControls(false);
  };

  const clearControlTimeout = () => {
    clearTimeout(tapActionTimeout);
  };

  const closePlayer = () => {
    if (isMiniPlayer) {
      setPaused(true);
      setMiniPlayerVisible && setMiniPlayerVisible(false);
    } else {
      toggleFullscreen();
    }
  };

  const renderVideo = () => (
    <Video
      onEnd={onEnd}
      onLoad={onLoad}
      onLoadStart={onLoadStart}
      onProgress={onProgress}
      onSeek={onProgress}
      paused={paused}
      ref={(ref: any) => {
        videoPlayer.current = ref;
        isMiniPlayer
          ? (videoRefs.current[1] = ref)
          : isFullScreenPlayer
          ? (videoRefs.current[2] = ref)
          : (videoRefs.current[0] = ref);
      }}
      resizeMode={screenType}
      onFullScreen={isFullScreenPlayer}
      source={{uri: url}}
      style={styles.backgroundVideo}
      repeat={false}
    />
  );

  const renderBottomControls = () => (
    <ImageBackground
      source={images.bottomShadowImg}
      style={[styles.column]}
      imageStyle={[styles.vignette]}>
      <View style={[isMiniPlayer ? styles.miniProgrsBarSection : styles.progrsBarSection, styles.sliderContainer]}>
        <NativeViewGestureHandler
          disallowInterruption={true}
          enabled
          shouldActivateOnStart={true}>
          <Slider
            style={[styles.sliderStyle, isIOS && styles.directionStyle]}
            minimumValue={0}
            maximumValue={Math.floor(duration)}
            minimumTrackTintColor="#FFF"
            maximumTrackTintColor="#666"
            thumbTintColor="#FFF"
            value={currentTime > duration ? duration : currentTime}
            tapToSeek
            inverted={isIOS ? false : true}
            onSlidingComplete={value => {
              onSeek(value);
            }}
          />
        </NativeViewGestureHandler>
      </View>
      <View style={styles.timeContainer}>
        {renderTimer()}
        {/* Enable when Required 
        {renderPlaypause()} 
        */}
      </View>
    </ImageBackground>
  );

  const renderTopControls = () => (
    <ImageBackground
      source={images.topShadowImg}
      style={[styles.topContainer]}
      imageStyle={[styles.vignette]}>
      <View style={styles.closeButtonContainer}>
        {(isMiniPlayer || isFullScreenPlayer) && renderCloseButton()}
      </View>
      {!isMiniPlayer && (
        <View style={styles.closeButtonContainer}>{renderFullScreen()}</View>
      )}
    </ImageBackground>
  );

  const renderFullScreen = () => {
    const source = isFullScreenPlayer ? images.shirnkIcon : images.expandIcon;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={toggleFullscreen}
        hitSlop={DEFAULT_HIT_SLOP}
        style={styles.fullScreenBtnContainer}>
        <Image source={source} />
      </TouchableHighlight>
    );
  };

  const renderTimer = () => (
    <View style={styles.control}>
      <Text style={styles.timerText}>{convertSecondsToHMS(currentTime)}</Text>
    </View>
  );

  const renderCloseButton = () => (
    <TouchableHighlight
      testID='renderCloseButtonID'
      underlayColor="transparent"
      activeOpacity={0.3}
      onPress={closePlayer}
      hitSlop={DEFAULT_HIT_SLOP}
      style={styles.control}>
      {getSvgImages({name: ImagesName.videoCloseIcon, width: 13, height: 13})}
    </TouchableHighlight>
  );

  const onVideoPress = () => {
    setPaused(!paused)
    setPlay(true);
  }
  // Enable when required renderPlaypause function
  // const renderPlaypause = () => {
  //   const source = paused === true ? images.playIconWhite : images.pauseIconWhite;
  //   return (
  //     <TouchableHighlight
  //     testID='renderPlaypauseID'
  //       underlayColor="transparent"
  //       activeOpacity={0.3}
  //       onPress={onPaused}
  //       hitSlop={DEFAULT_HIT_SLOP}
  //       style={styles.playButtoncontainer}>
  //       <Image source={source} />
  //     </TouchableHighlight>
  //   );
  // };

  const renderPlaypauseCenterIcon = () => {
    const source = paused === true ? images.playIconWhite : images.pauseIconWhite;

    return (
      <TouchableHighlight
        testID='renderPlaypauseID'
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={onPausedPress}
        hitSlop={DEFAULT_HIT_SLOP}
        style={styles.playButtoncontainer}>
        <Image source={source} style = {{width:30, height:50}} />
      </TouchableHighlight>
    );
  };

  const stopTrackPlayer = async () => {
    await TrackPlayer.reset();
    setShowMiniPlayer(false);
    setPlayerTrack(null);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback testID='VideoPlayerControlId' style={styles.containerStyle} onPress={() => showReplayBtn ? onPressReplay() : onScreenTouch()}>
        <View style={styles.containerStyle}>
          {renderVideo()}
          <View style={styles.videoControls}>
            {isLoading && <LoadingState />}
            {!isLoading && !play && (
              <TouchableWithoutFeedback testID='videoId' onPress = {() => onVideoPress()}>
                <ImageBackground
                  source={images.topShadowImg}
                  style={[styles.playcontainer]}
                  imageStyle={[styles.vignettePlayIcon]}>
                <View style = {styles.playPauseIconStyle}>{renderPlaypauseCenterIcon()}</View>
                </ImageBackground>
              </TouchableWithoutFeedback>
            )}
            {!isLoading && showControls && play && (
              <>
                <View style={styles.containerStyle}>{renderTopControls()}</View>
                <View style={styles.playPauseIconStyle}>{renderPlaypauseCenterIcon()}</View>
                <View style={styles.containerStyle}>{renderBottomControls()}</View>
              </>
            )}
          </View>
          {showReplayBtn &&
            <View style={styles.replayButton}>
              {getSvgImages({ name: ImagesName.resetIcon, fill: colors.white, width: 80, height: 80 })}
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VideoPlayerControl;

const customStyle = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundVideo: {
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    videoControls: {
      width: '100%',
      height: '100%',
    },
    timeContainer: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      justifyContent: JUSTIFY_CONTENT,
    },
    timerText: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 20,
      textAlign: 'right',
      fontFamily: fonts.AwsatDigital_Regular,
    },
    vignette: {
      resizeMode: 'stretch',
    },
    vignettePlayIcon: {
      resizeMode: 'cover',
    },
    control: {
      paddingHorizontal: isIOS ? 20 : 15,
      paddingVertical: 15,
    },
    playButtoncontainer: {
      paddingHorizontal: isIOS ? 20 : 15,
      paddingBottom: 15,
    },
    fullScreenBtnContainer: {
      paddingHorizontal: isIOS ? 20 : 15,
      paddingVertical: 15,
    },
    column: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-end',
    },
    topContainer: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      justifyContent: JUSTIFY_CONTENT,
    },
    progrsBarSection: {
      width: '100%',
      justifyContent: 'flex-end',
      paddingHorizontal: isIOS ? 15 : 0,
      paddingVertical: 10,
    },
    miniProgrsBarSection: {
      width: '100%',
      justifyContent: 'flex-end',
      paddingHorizontal: isIOS ? 15 : 0,
      paddingBottom: 0,
    },
    sliderStyle: {
      width: isIOS ? '200%' : '100%',
      height: 30,
      alignSelf: 'center'
    },
    directionStyle: {
      direction: 'ltr',
    },
    closeButtonContainer: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      justifyContent: JUSTIFY_CONTENT,
    },
    sliderContainer: {
      transform: [{ scaleX: isIOS ? 0.5:1 }, { scaleY: isIOS ? 0.5:1 }]
    },
    replayButton: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerStyle: {
      flex: 1
    },
    playPauseIconStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    playcontainer: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

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
import {isIOS, isTab, recordLogEvent} from 'src/shared/utils';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import Video from 'react-native-video';
import {
  convertSecondsToHMS,
  DEFAULT_HIT_SLOP,
} from 'src/shared/utils/utilities';
import Slider from '@react-native-community/slider';
import {LoadingState} from 'src/components/atoms';
import {images, ImagesName} from 'src/shared/styles/images';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { SPACE_BETWEEN } from 'src/shared/styles/item-alignment';
import { AnalyticsEvents } from 'src/shared/utils/analytics';
import { fonts } from 'src/shared/styles/fonts';
import { useInterstitial } from 'src/hooks/useInterstitial';

export interface VideoPlayerFullScreenProp {
  url: string;
  testID?: string;
  isPaused: boolean;
  isFullScreen?: boolean;
  onChangeFullScreen?: (isFullScreen: boolean) => void;
  onClose?: () => void;
  title?: string;
}

const VideoPlayerFullScreen = ({
  url,
  isPaused,
  isFullScreen = false,
  onChangeFullScreen,
  onClose,
  testID,
  title = ''
}: VideoPlayerFullScreenProp) => {
  const styles = useThemeAwareObject(customStyle);

  const videoPlayer = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [tapActionTimeout, setTapActionTimeout] = useState<any>(null);
  const [showControls, setShowControls] = useState(false);
  const [screenType, setScreenType] = useState('contain');
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const analyticsProgress = useRef<number>(0);
  const { showInterstitialAd } = useInterstitial(resumeAfterAd);

  const onSeek = (seek: any) => {
    videoPlayer.current?.seek(seek);
  };

  const onPaused = () => {
    setPaused(!paused);
  };

  const onProgress = (data: any) => {
    const percentageCalculation = () => {
        {
        const percentageData = Math.floor((data?.currentTime / data?.seekableDuration) * 100)
        let videoEventPreset = {
          content_title: title,
          content_duration: duration,
          content_type: 'video',
          progress_percentage: 0
        }
        if ((percentageData >= 10) && (analyticsProgress.current < 10)) {
          videoEventPreset = {
            ...videoEventPreset,
            progress_percentage: 10
          }
          recordLogEvent(AnalyticsEvents.VIDEO_PROGRESS, videoEventPreset);
          analyticsProgress.current = 10
        } else if ((percentageData >= 25) && (analyticsProgress.current < 25)) {
          videoEventPreset = {
            ...videoEventPreset,
            progress_percentage: 25
          }
          recordLogEvent(AnalyticsEvents.VIDEO_PROGRESS, videoEventPreset);
          analyticsProgress.current = 25
        } else if ((percentageData >= 50) && (analyticsProgress.current < 50)) {
          videoEventPreset = {
            ...videoEventPreset,
            progress_percentage: 50
          }
          recordLogEvent(AnalyticsEvents.VIDEO_PROGRESS, videoEventPreset);
          analyticsProgress.current = 50
          showAd();
        } else if ((percentageData >= 75) && (analyticsProgress.current < 75)) {
          videoEventPreset = {
            ...videoEventPreset,
            progress_percentage: 75
          }
          recordLogEvent(AnalyticsEvents.VIDEO_PROGRESS, videoEventPreset);
          analyticsProgress.current = 75
        } else if (percentageData < 10) {
          analyticsProgress.current = 0;
        } else if (data?.currentTime === data?.seekTime) {
          videoEventPreset = {
            ...videoEventPreset,
            progress_percentage: 100
          }
          const logEndData = {
            content_title: title,
            content_duration: duration,
            content_type: 'video',
            is_completed: '1'
          }
          recordLogEvent(AnalyticsEvents.VIDEO_PROGRESS, videoEventPreset);
          recordLogEvent(AnalyticsEvents.VIDEO_COMPLETED, logEndData);
        }
      }      
    }
    percentageCalculation()
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    showAd();
    setDuration(data.duration);
    setIsLoading(false);
    onScreenTouch();
  };

  const showAd = () => {
    showInterstitialAd();
    setPaused(true);
  };

  function resumeAfterAd() {
    setPaused(false);
  };

  const onLoadStart = (data: any) => {
    const logStartData = {
      content_title:title,
      content_duration:duration,
      content_type:'video',
    }
    recordLogEvent(AnalyticsEvents.VIDEO_START, logStartData );
    setIsLoading(true)
  };

  const onEnd = () => {
    videoPlayer.current?.seek(duration);
    setTimeout(() => {
      setPaused(true);
      videoPlayer.current?.seek(0);
    }, 500);
  };

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

  useEffect(() => {
    setPaused(isPaused);
  }, [isPaused]);

  const onScreenTouch = () => {
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
  };

  const toggleControls = () => {
    !showControls ? setControlTimeout() : clearControlTimeout();
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
    onClose && onClose();
  };

  const toggleFullscreen = () => {
    onChangeFullScreen &&
      (isFullScreen ? onChangeFullScreen(false) : onChangeFullScreen(true));
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
      }}
      testID={testID}
      resizeMode={screenType}
      onFullScreen={isFullScreen}
      source={{uri: url}}
      style={styles.backgroundVideo}
      repeat={false}
      onPlaybackStalled={() => setIsBuffering(true)}
      onPlaybackResume={() => setIsBuffering(false)}
    />
  );

  const renderBottomControls = () => (
    <ImageBackground
      source={images.bottomShadowImg}
      style={isFullScreen ? styles.fullScreenColoumn : styles.column}
      imageStyle={styles.vignette}>
      <View style={[styles.progrsBarSection, styles.sliderContainer]}>
        <NativeViewGestureHandler
          disallowInterruption={true}
          enabled
          shouldActivateOnStart={true}>
          <Slider
            style={[styles.sliderStyle, isIOS && styles.directionStyle]}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.dimGray}
            thumbTintColor={colors.white}
            value={currentTime > duration ? duration : currentTime}
            tapToSeek
            inverted={isIOS ? false : true}
            onSlidingComplete={(value: any) => {
              onSeek(value);
            }}
          />
        </NativeViewGestureHandler>
      </View>
      <View style={styles.timeContainer}>
        {renderTimer()}
        {renderPlaypause()}
      </View>
    </ImageBackground>
  );

  const renderTopControls = () => (
    <ImageBackground
      source={images.topShadowImg}
      style={isFullScreen ? styles.fullScreenStyle : styles.topContainerStyle}
      imageStyle={[styles.vignette]}>
      <View style={styles.topContainer}>
        <View style={styles.closeButtonContainer}>{renderCloseButton()}</View>
       {!isTab && <View style={styles.closeButtonContainer}>{renderFullScreen()}</View>}
      </View>
    </ImageBackground>
  );

  const renderFullScreen = () => {
    const source = isFullScreen ? images.shirnkIcon : images.expandIcon;

    return (
      <TouchableHighlight
        testID='toggleFullscreenID01'
        underlayColor={colors.transparent}
        activeOpacity={0.3}
        onPress={toggleFullscreen}
        hitSlop={DEFAULT_HIT_SLOP}
        style={styles.fullScreenBtnContainer}>
        <Image source={source} testID='fullScreenIconId' />
      </TouchableHighlight>
    );
  };

  const renderTimer = () => (
    <View style={styles.control}>
      <Text style={styles.timerText}>
        {currentTime > duration
          ? convertSecondsToHMS(duration)
          : convertSecondsToHMS(currentTime)}
      </Text>
    </View>
  );

  const renderCloseButton = () => (
    <TouchableHighlight
      testID="renderCloseButtonID"
      underlayColor={colors.transparent}
      activeOpacity={0.3}
      onPress={closePlayer}
      hitSlop={DEFAULT_HIT_SLOP}
      style={styles.control}>
      {getSvgImages({name: ImagesName.videoCloseIcon, width: 13, height: 13})}
    </TouchableHighlight>
  );

  const renderPlaypause = () => {
    const source = paused === true ? images.playIconWhite : images.pauseIconWhite;

    return (
      <TouchableHighlight
        testID="renderPlaypauseID"
        underlayColor={colors.transparent}
        activeOpacity={0.3}
        onPress={onPaused}
        hitSlop={DEFAULT_HIT_SLOP}
        style={styles.playButtoncontainer}>
        <Image source={source} testID='playPauseIconId'/>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        testID="VideoPlayerFullScreenId"
        style={styles.videoContainer}
        onPress={onScreenTouch}>
        <View style={styles.videoContainer}>
          {renderVideo()}
          <View style={styles.videoControls}>
            {(isLoading || isBuffering) && <LoadingState />}
            {showControls && (
              <>
                <View style={styles.videoContainer} testID = 'topControlId'>{renderTopControls()}</View>
                <View style={styles.videoContainer}>{renderBottomControls()}</View>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VideoPlayerFullScreen;

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
      justifyContent: SPACE_BETWEEN,
      paddingBottom: 15,
    },
    timerText: {
      backgroundColor: colors.transparent,
      color: colors.white,
      fontSize: 13,
      textAlign: 'right',
      fontFamily: fonts.AwsatDigital_Regular,
      lineHeight: 20,
    },
    vignette: {
      resizeMode: 'stretch',
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
    fullScreenColoumn: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-end',
      paddingHorizontal: isIOS ? 15 : 0,
    },
    topContainerStyle: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-start',
      paddingTop: isIOS ? 25 : 20,
    },
    fullScreenStyle: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-start',
      paddingTop: isIOS ? 25 : 20,
      paddingHorizontal: isIOS ? 15 : 0,
    },
    topContainer: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      justifyContent: SPACE_BETWEEN,
    },
    progrsBarSection: {
      width: '100%',
      justifyContent: 'flex-end',
      paddingHorizontal: isIOS ? 15 : 0,
      paddingVertical: 10,
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
      justifyContent: SPACE_BETWEEN,
      paddingTop: 0,
    },
    sliderContainer: {
      transform: [{ scaleX: isIOS ? 0.5:1 }, { scaleY: isIOS ? 0.5:1 }]
    },
    videoContainer: {
     flex: 1
    }
  });

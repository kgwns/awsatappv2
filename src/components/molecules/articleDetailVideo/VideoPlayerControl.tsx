import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  ImageBackground,
} from 'react-native';
import {isIOS} from 'src/shared/utils';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import Video from 'react-native-video';
import {convertSecondsToHMS, isNotEmpty} from 'src/shared/utils/utilities';
import Slider from '@react-native-community/slider';
import {LoadingState} from 'src/components/atoms';
import TrackPlayer from 'react-native-track-player';
import {useAppPlayer} from 'src/hooks';
import {images} from 'src/shared/styles/images';

export interface VideoPlayerControlProp {
  url: string;
  posterUrl?: string;
  currentTime?: any;
  paused: boolean;
  playerVisible?: boolean; 
  isMiniPlayer?: boolean; 
  setPlayerDetails?: ( time:any, paused: any) => void; 
}
const VideoPlayerControl = ({url, posterUrl, currentTime: time, paused: isPaused, playerVisible, setPlayerDetails, isMiniPlayer = false}: VideoPlayerControlProp) => {
  const styles = useThemeAwareObject(customStyle);

  const videoPlayer = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [tapActionTimeout, setTapActionTimeout] = useState<any>(null);
  const [showControls, setShowControls] = useState(false);
  const [initialPlay, setInitialPlay] = useState(true);
  const [screenType, setScreenType] = useState('contain');

  const {setShowMiniPlayer, setPlayerTrack, showMiniPlayer} = useAppPlayer();

  const onSeek = (seek: any) => {
    videoPlayer.current?.seek(seek);
  };

  const onPaused = () => {
    setPaused(!paused);
  };

  const onProgress = (data: any) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
    videoPlayer.current?.seek(0.1);
    onScreenTouch();
  };

  const onLoadStart = (data: any) => setIsLoading(true);

  const onEnd = () => {
    setPaused(true);
  };

  const exitFullScreen = () => {
    setIsFullScreen(false);
  };

  const onFullScreen = () => {
    setIsFullScreen(true);
  };

  useEffect(() => {
    if (!paused && initialPlay && showMiniPlayer) stopTrackPlayer();
  }, [paused]);

  useEffect(() => {
    if((playerVisible && !isMiniPlayer) || (!playerVisible && isMiniPlayer)){
      setPlayerDetails && setPlayerDetails(currentTime,paused);
      setPaused(true)
    }
  }, [playerVisible]);

  useEffect(() => {
    onSeek(time)
    setPaused(isPaused)
  }, [time]);

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

  const renderVideo = () => (
    <Video
      autoplay={false}
      onEnd={onEnd}
      onLoad={onLoad}
      onLoadStart={onLoadStart}
      onProgress={onProgress}
      onSeek={onProgress}
      paused={paused}
      ref={videoPlayer}
      resizeMode={screenType}
      onFullScreen={isFullScreen}
      source={{uri: url}}
      poster={ isNotEmpty(posterUrl) ? posterUrl : undefined}
      style={styles.backgroundVideo}
    />
  );

  const renderBottomControls = () => (
    <ImageBackground
      source={images.bottomShadowImg}
      style={[styles.column]}
      imageStyle={[styles.vignette]}>
      <View style={styles.progrsBarSection}>
        <Slider
          style={[{width: '100%', height: 15}, isIOS && {direction: 'ltr'}]}
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
      </View>
      <View style={styles.timeContainer}>
        {renderTimer()}
        {renderPlaypause()}
      </View>
    </ImageBackground>
  );

  const renderTimer = () => (
    <View style={styles.control}>
      <Text style={styles.timerText}>{convertSecondsToHMS(currentTime)}</Text>
    </View>
  );

  const renderPlaypause = () => {
    let source = paused === true ? images.playIconWhite : images.pauseIconWhite;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={() => {
          onPaused();
        }}
        style={styles.control}>
        <Image source={source} />
      </TouchableHighlight>
    );
  };

  const stopTrackPlayer = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    setShowMiniPlayer(false);
    setPlayerTrack(null);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={onScreenTouch}>
        <View style={{flex: 1}}>
          {renderVideo()}
          <View style={styles.videoControls}>
            {isLoading && <LoadingState />}
            {showControls && (
              <View style={{flex: 1}}>{renderBottomControls()}</View>
            )}
          </View>
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
      zIndex: 5,
    },
    videoControls: {
      width: '100%',
      height: '100%',
      zIndex: 10,
    },
    timeContainer: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    timerText: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 11,
      textAlign: 'right',
    },
    vignette: {
      resizeMode: 'stretch',
    },
    control: {
      paddingHorizontal: isIOS ? 20 : 15,
      paddingBottom: 15,
    },
    column: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-end',
    },
    progrsBarSection: {
      width: '100%',
      justifyContent: 'flex-end',
      paddingHorizontal: isIOS ? 15 : 0,
      paddingVertical: 20,
    },
  });

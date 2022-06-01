import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableHighlight, Image, ImageBackground } from 'react-native'
import { isIOS, isNonEmptyArray, isObjectNonEmpty } from 'src/shared/utils'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import { RequestVideoUrlSuccessResponse } from 'src/redux/videoList/types'
import { fetchVideoDetailInfo } from 'src/services/VideoServices'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import Video from 'react-native-video';
import { convertSecondsToHMS } from 'src/shared/utils/utilities'
import Slider from '@react-native-community/slider'
import { LoadingState } from 'src/components/atoms'
import TrackPlayer from 'react-native-track-player'
import { useAppPlayer } from 'src/hooks'
export interface ArticleVideoProps  {
    mediaId?: string,
}
const ArticleDetailVideo = ({
    mediaId,
}: ArticleVideoProps) => {

    const styles = useThemeAwareObject(customStyle)

    const [playerUrl, setPlayerUrl] = useState<string>()

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

    const { setShowMiniPlayer, setPlayerTrack, showMiniPlayer } = useAppPlayer()
    
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
      onScreenTouch()
    };
    
    const onLoadStart = (data: any) => setIsLoading(true);
    
    const onEnd = () => {
      setPaused(true)
    }
    
    const exitFullScreen = () => {
      setIsFullScreen(false);
    };
     
    const enterFullScreen = () => {};
     
    const onFullScreen = () => {
      setIsFullScreen(true);
    };
     
    const getVideoUrlInfo = async () => {
        if(mediaId){
            try {
                const response: RequestVideoUrlSuccessResponse = await fetchVideoDetailInfo({ mediaID: mediaId })
                if (isNonEmptyArray(response.playlist) && isNonEmptyArray(response.playlist[0].sources)) {
                  const sources = response.playlist[0].sources
                  const videoItem = sources.find((item) => item.type && item.type.includes('mp4'))
                  videoItem && isObjectNonEmpty(videoItem) && setPlayerUrl(videoItem.file)
                }
              } catch (error) {
                console.log('error',error)
              }
        }
    }

    useEffect(() => {
        getVideoUrlInfo()
    }, [])

    useEffect(() => {
        if(!paused && initialPlay && showMiniPlayer) stopTrackPlayer();
    }, [paused])
    
    const onScreenTouch = () => {   
      if (tapActionTimeout) {
        clearTimeout(tapActionTimeout);
        setTapActionTimeout(null);
        if (showControls) {
          resetControlTimeout();
        }
      } else {
        setTapActionTimeout(setTimeout(() => {
          toggleControls();
          setTapActionTimeout(null);
        }, 130))
      }
    }

    const toggleControls = () => {
      if (!showControls) {
        setControlTimeout();
      } else {
        clearControlTimeout();
      }
      setShowControls(!showControls)
    }

    const resetControlTimeout = () => {
      clearControlTimeout()
      setControlTimeout()
    }

    const setControlTimeout = () => {
      setTapActionTimeout(setTimeout(() => {
        hideControls();
      }, 15000))
    }
  
    const hideControls = () => {
      setShowControls(false)
    }

    const clearControlTimeout = () => {
      clearTimeout(tapActionTimeout);
    }

    const renderTimer = () => {
      return (
        <View style={styles.control}>
          <Text style={styles.timerText}>{convertSecondsToHMS(currentTime)}</Text>
        </View>
      );
    }

    const renderPlaypause = () => {
      let source = paused === true ? require('src/assets/images/play.png'): require('src/assets/images/pause.png');
      
      return (
        <TouchableHighlight underlayColor="transparent" activeOpacity={0.3} onPress={() => { resetControlTimeout();onPaused() }} style={styles.control}>
          <Image source={source} />
        </TouchableHighlight>
      );
    }

    const stopTrackPlayer = async () => {
      await TrackPlayer.stop();
      await TrackPlayer.reset();
      setShowMiniPlayer(false);
      setPlayerTrack(null);
    }

    
    return (
        <View style={styles.container} >
            { playerUrl &&
              <TouchableWithoutFeedback style={{flex: 1}} onPress={()=> onScreenTouch()} >
                <View style={{flex: 1}}>
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
                    source={{ uri:playerUrl }}
                    style={styles.backgroundVideo}
                  />

                  <View style={styles.videoControls}>
                    {isLoading && <LoadingState />}
                    {showControls && 
                    <View style={{ flex: 1}}>
                      <ImageBackground
                          source={require('src/assets/images/bottom-vignette.png')}
                          style={[styles.column]}
                          imageStyle={[styles.vignette]}>
                        <View style={styles.progrsBarSection}>
                          <Slider
                              style={[{ width: '100%', height: 15 }, isIOS && { direction: 'ltr'  }]}
                              minimumValue={0}
                              maximumValue={Math.floor(duration)}
                              minimumTrackTintColor="#FFF"
                              maximumTrackTintColor="#666"
                              thumbTintColor="#FFF"
                              value={currentTime > duration ? duration : currentTime}
                              tapToSeek
                              inverted={ isIOS ? false : true}
                              onSlidingComplete={ (value) => {onSeek(value)}}
                          />
                        </View>
                        <View style={styles.timeContainer}>
                            {renderTimer()}
                            {renderPlaypause()}
                        </View>
                      </ImageBackground>

                    </View>
                    }
                  </View>
                </View>
              </TouchableWithoutFeedback>
             
            }
        </View>
    )
}

export default ArticleDetailVideo

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 'auto',
        aspectRatio: 1.62,
        backgroundColor: colors.black,
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
        zIndex: 10
    },
    timeContainer: {
      flexDirection: 'row',
      alignSelf: "stretch",
      alignItems: "flex-end",
      justifyContent: "space-between",
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
      paddingBottom: 15
    },
    column: {
      flex: 1,
      alignSelf: "stretch",
      justifyContent: "flex-end",
    },
    progrsBarSection: {
      width: '100%',
      justifyContent: "flex-end",
      paddingHorizontal: isIOS ? 15 : 0,
      paddingVertical: 20
  },
})

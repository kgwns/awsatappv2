import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { VideoPlayerComponent } from 'src/components/molecules';
import { useNavigation } from '@react-navigation/native';
import { LoadingState } from 'src/components/atoms';
import { fetchVideoDetailInfo } from 'src/services/VideoServices';
import { RequestVideoUrlSuccessResponse } from 'src/redux/videoList/types';
import { isNonEmptyArray, isObjectNonEmpty, recordLogEvent, screenHeight } from 'src/shared/utils';
import TrackPlayer from 'react-native-track-player';
import { useAppPlayer } from 'src/hooks';
import { colors } from 'src/shared/styles/colors';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export interface VideoPlayerScreenProps {
  route: any
}

export const VideoPlayerScreen = ({route}: VideoPlayerScreenProps) => {

  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();
  const { setShowMiniPlayer, setPlayerTrack } = useAppPlayer()

  const { mediaID, videoUrl, nid, title } = route.params
  const [playerUrl, setPlayerUrl] = useState<string>(videoUrl)

  const goBack = () =>{
    navigation.goBack();
  }

  useEffect(() => {
    if(nid) {
      recordLogEvent(AnalyticsEvents.PLAYED_SPECIFIC_VIDEO, {videoid: nid});
    }
    getVideoUrlInfo()
    stopTrackPlayer()
  }, [])

  const stopTrackPlayer = async () => {
    await TrackPlayer.reset();
    setShowMiniPlayer(false);
    setPlayerTrack(null);
  }

  const  getDeviceResolutionVideo = (deveiceHeight: any, videoSources: any) => {    
    let selectedResolution = Math.max.apply(Math, videoSources);
    for (let val = 0; val < videoSources.length; val++) {
        if (videoSources[val] >= deveiceHeight && videoSources[val] < selectedResolution) {
          selectedResolution = videoSources[val];
        }        
    }    
    return selectedResolution;
  }

  const getVideoUrlInfo = async () => {
    if (mediaID) {
      try {
        const response: RequestVideoUrlSuccessResponse = await fetchVideoDetailInfo({ mediaID: mediaID })
        if (isNonEmptyArray(response.playlist) && isNonEmptyArray(response.playlist[0].sources)){ 
          const sources = response.playlist[0].sources
          const videoFiles = sources.filter((item)=>{
            if(item.type && item.type.includes('video/mp4')){
             return item
            }
          })
          const videoResolutions = videoFiles.map((item: any) => {
            return item.height
          })
          const selectedItem = getDeviceResolutionVideo(screenHeight, videoResolutions)
          const videoItem = sources.find((item) => item.height === selectedItem)
          videoItem && isObjectNonEmpty(videoItem) && setPlayerUrl(videoItem.file)
          return;
        }
      } catch (error) {
        goBack()
      }
    }
  }

  return (
    <View style={styles.container}>
      {playerUrl ? <VideoPlayerComponent title={title} url={playerUrl} goBack={goBack} /> : <LoadingState />}
    </View>
  )
}

const createStyles = () =>
StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
})

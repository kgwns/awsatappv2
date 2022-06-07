import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { VideoPlayerComponent } from 'src/components/molecules';
import { useNavigation } from '@react-navigation/native';
import { LoadingState } from 'src/components/atoms';
import { fetchVideoDetailInfo } from 'src/services/VideoServices';
import { RequestVideoUrlSuccessResponse } from 'src/redux/videoList/types';
import { isNonEmptyArray, isObjectNonEmpty, recordLogEvent } from 'src/shared/utils';
import TrackPlayer from 'react-native-track-player';
import { useAppPlayer } from 'src/hooks';
import { colors } from 'src/shared/styles/colors';

export interface VideoPlayerScreenProps {
  route: any
}

export const VideoPlayerScreen = ({route}: VideoPlayerScreenProps) => {

  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();
  const { setShowMiniPlayer, setPlayerTrack } = useAppPlayer()

  const { mediaID, videoUrl, nid } = route.params
  const [playerUrl, setPlayerUrl] = useState<string>(videoUrl)

  const goBack = () =>{
    navigation.goBack();
  }

  useEffect(() => {
    if(nid) recordLogEvent('Played_Specific_Video', {videoid: nid});
    getVideoUrlInfo()
    stopTrackPlayer()
  }, [])

  const stopTrackPlayer = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    setShowMiniPlayer(false);
    setPlayerTrack(null);
  }

  const getVideoUrlInfo = async () => {
    if (mediaID) {
      try {
        const response: RequestVideoUrlSuccessResponse = await fetchVideoDetailInfo({ mediaID: mediaID })
        if (isNonEmptyArray(response.playlist) && isNonEmptyArray(response.playlist[0].sources)) {
          const sources = response.playlist[0].sources
          const videoItem = sources.find((item) => item.type && item.type.includes('mp4'))
          videoItem && isObjectNonEmpty(videoItem) && setPlayerUrl(videoItem.file)
        }
      } catch (error) {
        goBack()
      }
    }
  }

  return (
    <View style={styles.container}>
      {playerUrl ? <VideoPlayerComponent url={playerUrl} goBack={goBack} /> : <LoadingState />}
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
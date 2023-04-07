import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {isNonEmptyArray, isObjectNonEmpty, isTab} from 'src/shared/utils';
import {colors} from 'src/shared/styles/colors';
import {RequestVideoUrlSuccessResponse} from 'src/redux/videoList/types';
import {fetchVideoDetailInfo} from 'src/services/VideoServices';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import VideoPlayerControl from 'src/components/molecules/articleDetailVideo/VideoPlayerControl';

export interface ArticleVideoProps {
  mediaId?: string;
  currentTime?: any;
  paused: boolean;
  playerVisible?: boolean;
  setPlayerDetails?: (time: any, paused: any) => void;
  setMiniPlayerVisible?: (visible: boolean) => void;
  isFullScreen?: boolean,
  onChangeFullScreen?: (isFullScreen: boolean) => void;
  setReset?: (show: boolean) => void;
  videoRefs?: any;
  showReplay?: boolean;
}
const ArticleDetailVideo = ({mediaId, showReplay = false, ...props}: ArticleVideoProps) => {
  const styles = useThemeAwareObject(customStyle);

  const [playerUrl, setPlayerUrl] = useState<string>();

  const getVideoUrlInfo = async () => {
    if (mediaId) {
      try {
        const response: RequestVideoUrlSuccessResponse =
          await fetchVideoDetailInfo({mediaID: mediaId});
        if (
          isNonEmptyArray(response.playlist) &&
          isNonEmptyArray(response.playlist[0].sources)
        ) {
          const sources = response.playlist[0].sources;
          const videoItem = sources.find(
            item => item.type && item.type.includes('mp4'),
          );
          videoItem &&
            isObjectNonEmpty(videoItem) &&
            setPlayerUrl(videoItem.file);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  useEffect(() => {
    getVideoUrlInfo();
  }, []);

  return (
    <View style={styles.container}>
      {playerUrl && (
        <VideoPlayerControl
          url={playerUrl}
          setPlayerDetails={props?.setPlayerDetails}
          currentTime={props?.currentTime}
          paused={props?.paused}
          playerVisible={props?.playerVisible}
          setMiniPlayerVisible={props?.setMiniPlayerVisible}
          videoRefs = {props?.videoRefs}
          onChangeFullScreen={props?.onChangeFullScreen}
          isFullScreen={props?.isFullScreen}
          showReplay={showReplay}
          setReset={props?.setReset}
        />
      )}
    </View>
  );
};

export default ArticleDetailVideo;

const customStyle = () =>
  StyleSheet.create({
    container: {
      flex:  isTab ? 0 : 1,
      width: '100%',
      height: 'auto',
      aspectRatio: 1.34,
      backgroundColor: colors.black,
    },
  });

import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {isNonEmptyArray, isObjectNonEmpty} from 'src/shared/utils';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {RequestVideoUrlSuccessResponse} from 'src/redux/videoList/types';
import {fetchVideoDetailInfo} from 'src/services/VideoServices';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import VideoPlayerControl from 'src/components/molecules/articleDetailVideo/VideoPlayerControl';
export interface ArticleVideoProps {
  mediaId?: string;
}
const ArticleDetailVideo = ({mediaId}: ArticleVideoProps) => {
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
      {playerUrl && <VideoPlayerControl url={playerUrl} />}
    </View>
  );
};

export default ArticleDetailVideo;

const customStyle = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: 'auto',
      aspectRatio: 1.62,
      backgroundColor: colors.black,
    },
  });

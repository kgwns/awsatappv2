import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonImage, Label} from 'src/components/atoms';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import { useTranslation } from 'react-i18next';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';
import { getSecondsToHms, isNonEmptyArray, isObjectNonEmpty } from 'src/shared/utils/utilities';

export const ListenToArticleCard = (data: any) => {
  const style = useThemeAwareObject(customStyle);
  const [t] = useTranslation();
  const playbackState = usePlaybackState();
  const mediaData = data.data && isObjectNonEmpty(data.data) ? data.data : {}
  const playList = isObjectNonEmpty(mediaData) && isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};
  const duration = isObjectNonEmpty(playList) ? playList.duration : 0;

  const togglePlayback = async () => {

    if (!isObjectNonEmpty(playList)) {
      return
    }

    const id = mediaData.feed_instance_id ? mediaData.feed_instance_id : '1';
    const media = playList.sources[0]?.file ? playList.sources[0]?.file : '';
    const title = mediaData.title ? mediaData.title : '';

    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    }
    else if (playbackState === State.Paused) {
      await TrackPlayer.play();
    }
    else if ( playbackState === State.Paused ||  playbackState == State.None || playbackState == State.Stopped) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({ stopWithApp: true });
      await TrackPlayer.add({
        id: id,
        url: media,
        title: title,
        artist: title,
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      await TrackPlayer.play();
    }
  }

  return (
    <View style={style.container}>
      <ButtonImage
        hitSlop={{}}
        icon={() =>
          playbackState === State.Playing ? getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
            getSvgImages({ name: ImagesName.playIconSVG, size: normalize(12), style: { marginEnd: 2 } })
        }
        onPress={() => togglePlayback()}
        style={style.icon}
      />
      <Label style={style.title}> {t('opinionArticleDetail.listenToArticle')}</Label>
      <Label style={style.duration}>{getSecondsToHms(duration)}</Label>
    </View>
  );
};
export default ListenToArticleCard;
const customStyle = (theme: CustomThemeType) => {
  const ListenToArticleCardStyle = StyleSheet.create({
    container: {
      flexWrap: 'wrap',
      alignSelf: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    title: {
      fontSize: normalize(16),
      lineHeight: normalize(36),
      color: theme.primary,
    },
    duration: {
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: normalize(14),
      lineHeight: normalize(14),
      marginStart: normalize(15),
      color: colors.spanishGray,
    },
    icon: {
      width:normalize(33),
      height:normalize(33),
      alignSelf: 'center',
      marginEnd: normalize(6),
      backgroundColor: colors.aliceBlue,
      borderRadius: normalize(33),
      justifyContent:'center',
      alignItems:'center',
    },
  });
  return ListenToArticleCardStyle;
};

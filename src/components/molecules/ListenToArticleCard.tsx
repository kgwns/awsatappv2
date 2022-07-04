import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonImage, Label} from 'src/components/atoms';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {isIOS, normalize} from 'src/shared/utils';
import { useTranslation } from 'react-i18next';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';
import { convertSecondsToHMS, isNonEmptyArray, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { fonts } from 'src/shared/styles/fonts';
import { useAppPlayer } from 'src/hooks';

export const ListenToArticleCard = (data: any) => {
  const style = useThemeAwareObject(customStyle);
  const [t] = useTranslation();
  const playbackState = usePlaybackState();
  const mediaData = data.data && isObjectNonEmpty(data.data) ? data.data : {}
  const playList = isObjectNonEmpty(mediaData) && isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};
  const duration = isObjectNonEmpty(playList) ? playList.duration : 0;

  const { setShowMiniPlayer, setPlayerTrack, selectedTrack: trackData, showMiniPlayer } = useAppPlayer()

  // Older Opinion Implementation for reference
  // const onPressPlay = () => {
  //   if (data.nid && data.data && data.togglePlayback) {
  //     data.togglePlayback(data.nid, data.data)
  //   }
  // }

  const onPlayPausePress = async (playbackState: any) => {
    const state = await TrackPlayer.getState()

    if(trackData != null){
        if(state == State.Paused){
            await TrackPlayer.play()
        }else{
            await TrackPlayer.pause()
        }
    }
};

const onPressPlay = () => {
  console.log('onPressPlay');
  if (data.nid && isObjectNonEmpty(mediaData)) {
    let playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};

    if (!isObjectNonEmpty(playList)) {
      return
    }

    let trackPlayerData = {
      id: data.nid + 'opinion',
      url: playList.sources[0]?.file ? playList.sources[0]?.file : '',
      title: data.title,
      duration: playList.duration? convertSecondsToHMS(playList.duration) : 0,
      artist: mediaData.title ? mediaData.title : '',
      artwork: data.authorImage
    }

    if((trackData && trackData.id != trackPlayerData.id) || trackData == null ){
      setPlayerTrack(trackPlayerData);
      !showMiniPlayer && setShowMiniPlayer(true);
    }else{
      showMiniPlayer ? onPlayPausePress(playbackState) : setShowMiniPlayer(true);
      
    }
    
  }
}

  return (
    <View style={style.container}>
      <TouchableOpacity testID='ListenToArticleCardTO1' onPress={onPressPlay} style={style.listenButton}>
        <ButtonImage
          hitSlop={{}}
          icon={() =>
            trackData && trackData.id == (data.nid+'opinion') && playbackState === State.Playing   ? getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
              getSvgImages({ name: ImagesName.playIconSVG, size: normalize(12), style: { marginEnd: 2 } })
          }
          testId='ListenToArticleCardBI1'
          onPress={onPressPlay}
          style={style.icon}
        />
        <Label style={style.title}> {t('opinionArticleDetail.listenToArticle')}</Label>
      </TouchableOpacity>
      <Label style={style.duration}>{convertSecondsToHMS(duration)}</Label>
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
    listenButton: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      lineHeight: 34,
      color: theme.primary,
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
    },
    duration: {
      alignSelf: 'center',
      fontSize: 14,
      lineHeight: isIOS ? 34 : 38,
      marginStart: normalize(15),
      color: colors.spanishGray,
      fontFamily: fonts.Effra_Arbc_Medium,
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

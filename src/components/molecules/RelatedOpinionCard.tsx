import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {isNonEmptyArray, isTab, normalize, isNotEmpty} from 'src/shared/utils';
import { ImagesName } from 'src/shared/styles';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ButtonImage, Image, Label} from '../atoms';
import {ImageResize} from 'src/shared/styles/text-styles';
import { getImageUrl, isObjectNonEmpty, convertSecondsToHMS } from 'src/shared/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { fonts } from 'src/shared/styles/fonts';
import TrackPlayer, { State, usePlaybackState, } from 'react-native-track-player';
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';
import { useAppPlayer } from 'src/hooks';


export const RelatedOpinionCard = ({item, onPress, mediaVisibility, togglePlayback, selectedTrack, jwPlayerID}:any) => {
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation<StackNavigationProp<any>>()
  const playbackState = usePlaybackState();
  const[mediaData, setMediaData] = useState<any>({});
  const[timeDuration, setTimeDuration] = useState<any>(null);
  const [prevPlayBackState, setPrevPlayBackState] = useState<State | null>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  const { setShowMiniPlayer, setPlayerTrack, selectedTrack: trackData, showMiniPlayer } = useAppPlayer()

  const CONST_LISTEN_TO_ARTICLE = TranslateConstants({key:TranslateKey.LISTEN_TO_ARTICLE});

  useEffect(() => {
    if (trackData && trackData.id == (item.nid + 'opinion') && prevPlayBackState === State.Playing && playbackState === State.Buffering) {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
    }
    setPrevPlayBackState(playbackState);
  }, [playbackState])

  const renderTitle = (item: any) => {
    return (
      <View >
        <Text children={item.title} style={style.contentTitle} />
      </View>
    )
  }

  useEffect(() => {
    if(jwPlayerID){
      getNarratedOpinion()
    }
  }, [])

  const getNarratedOpinion = async() => {
      try {
        const opinionData = await fetchNarratedOpinionArticleApi({jwPlayerID: jwPlayerID})
        if(isObjectNonEmpty(opinionData)){
          setMediaData(opinionData);
          const playList = isNonEmptyArray(opinionData.playlist) ? opinionData.playlist[0] : null;
            if(playList){
            const time = playList.duration? convertSecondsToHMS(playList.duration) : null;
            setTimeDuration(time)
            } 
        }
      } catch (error) {
        const errorResponse: AxiosError = error as AxiosError;
        if (errorResponse.response) {
          const errorMessage: { message: string } = errorResponse.response.data;
        }
      }
  }

  const onPressWriter = (item: any) => {
    const tid = isNonEmptyArray(item.field_opinion_writer_node_export) && item.field_opinion_writer_node_export[0].id
    if (isNotEmpty(tid)) {
      navigation.push(ScreensConstants.WRITERS_DETAIL_SCREEN, { tid })
    }
  }

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
  if (item.nid && isObjectNonEmpty(mediaData)) {
    const playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};

    if (!isObjectNonEmpty(playList)) {
      return
    }

    const trackPlayerData = {
      id: item.nid + 'opinion',
      url: playList.sources[0]?.file ? playList.sources[0]?.file : '',
      title: isNotEmpty(item.title) ? item.title : '',
      duration: playList.duration? convertSecondsToHMS(playList.duration) : 0,
      artist: mediaData.title ? mediaData.title : '',
      artwork: isNonEmptyArray(item.field_opinion_writer_node_export) ? getImageUrl(item.field_opinion_writer_node_export[0].opinion_writer_photo) : getImageUrl(item.field_opinion_writer_node_export.opinion_writer_photo)
    }

    if((trackData && trackData.id != trackPlayerData.id) || trackData == null ){
      setPlayerTrack(trackPlayerData);
      !showMiniPlayer && setShowMiniPlayer(true);
    }else{
      showMiniPlayer ? onPlayPausePress(playbackState) : setShowMiniPlayer(true);
      
    }
    
  }
}
  // Older Opinion Implementation for reference
  // const onPressPlay = () => {
  //   if (item.nid && mediaData && togglePlayback) {
  //     togglePlayback(item.nid, mediaData)
  //   }
  // }

  const imageUrl = isNonEmptyArray(item.field_opinion_writer_node_export)
    ? getImageUrl(
      item.field_opinion_writer_node_export[0].opinion_writer_photo,
    )
    : isObjectNonEmpty(item.field_opinion_writer_node_export) ? getImageUrl(
      item.field_opinion_writer_node_export.opinion_writer_photo,
  ) : ''

  return (
    <TouchableOpacity
      testID='RelatedOpinionCardTO1'
      onPress={()=>onPress()}
      style={[style.container, isTab && {paddingRight: 20}]}>
      <View style={style.contentView}>
        <Label
          children={isNonEmptyArray(item.field_opinion_writer_node_export) && item.field_opinion_writer_node_export[0].name}
          style={style.topLabel}
          numberOfLines={1}
          testID='RelatedOpinionCardLabel1'
          onPress={() => onPressWriter(item)}
          suppressHighlighting={true}
        />
        {renderTitle(item)}
        {mediaVisibility && <View style={style.footer}>
          <TouchableOpacity testID='RelatedOpinionCardTO2' onPress={onPressPlay} style={style.footer}>
            <ButtonImage
              icon={() =>
                trackData && trackData.id == (item.nid+'opinion') && playbackState === State.Playing || isBuffering ? getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                getSvgImages({name: ImagesName.playIconSVG, size: normalize(12)})
              }
              onPress={onPressPlay}
            />
            <Label
              children={CONST_LISTEN_TO_ARTICLE}
              style={style.audioLabel}
            />
          </TouchableOpacity>
          <Label children={timeDuration} style={style.durationLabel} />
        </View>}
      </View>
      <View>
        <TouchableOpacity testID='RelatedOpinionCardTO3' onPress={() => onPressWriter(item)}>
          <Image
            url={imageUrl}
            size={normalize(80)}
            resizeMode={ImageResize.COVER}
            type={'round'}
            fallback={true}
            fallbackName={ImagesName.authorDefault}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const RelatedOpinionCardStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.backgroundColor,
    },
    contentView: {
      flex: 1,
    },
    topLabel: {
      textAlign: 'left',
      fontSize: 14,
      lineHeight: 14,
      color: theme.primary,
      fontFamily: fonts.Effra_Arbc_Regular,
    },
    body: {
      textAlign: 'left',
      fontSize: normalize(14),
      lineHeight: normalize(24),
      color: theme.primaryBlack,
      fontWeight: 'bold',
      paddingVertical: normalize(10),
      paddingRight: normalize(5),
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    audioLabel: {
      paddingHorizontal: normalize(10),
      fontSize: normalize(12),
      lineHeight: normalize(36),
      color: theme.primary,
      fontFamily: fonts.AwsatDigital_Regular,
    },
    durationLabel: {
      paddingHorizontal: normalize(10),
      color: colors.spanishGray,
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      fontSize: normalize(12),
      lineHeight: normalize(36),
    },
    contentTitle: {
      textAlign: 'left',
      fontSize: isTab ? 20 : 14,
      lineHeight: isTab ? 32 : 24,
      color: theme.primaryBlack,
      fontFamily: fonts.AwsatDigital_Bold,
      paddingVertical: normalize(10),
      paddingRight: normalize(5),
    }
  });
  return RelatedOpinionCardStyle;
};

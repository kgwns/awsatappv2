import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ButtonImage, Label, Image, Divider} from 'src/components/atoms';
import {isNonEmptyArray, isObjectNonEmpty, isTab, normalize, screenWidth, isNotEmpty, isIOS} from 'src/shared/utils';
import {ImagesName, Styles} from 'src/shared/styles';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { ScreensConstants } from 'src/constants/Constants';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TrackPlayer, { State, usePlaybackState, } from 'react-native-track-player';
import { convertSecondsToHMS } from 'src/shared/utils/utilities';
import { fonts } from 'src/shared/styles/fonts';
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';
import { useAppPlayer } from 'src/hooks';
import FixedTouchable from 'src/shared/utils/FixedTouchable';


export interface OpinionWritersCardViewProps {
  imageUrl:string
  writerTitle:string
  headLine:string
  subHeadLine:string
  audioLabel:string
  duration:string
  nid:string
  isBookmarked:boolean
  mediaVisibility:boolean
  onPressBookmark:()=>void
  hideImageView?: boolean,
  jwPlayerID?: string | null
  togglePlayback?: (nid: string, mediaData: any)=> void,
  selectedTrack?: string,
  authorId:string
}

const OpinionWritersCardView = ({
  imageUrl,
  writerTitle,
  headLine,
  subHeadLine,
  audioLabel,
  duration,
  nid,
  isBookmarked,
  mediaVisibility,
  onPressBookmark,
  hideImageView = false,
  jwPlayerID = null,
  togglePlayback,
  selectedTrack,
  authorId
}: OpinionWritersCardViewProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const routes = useNavigationState(state => state.routes)
  const playbackState = usePlaybackState();
  const style = useThemeAwareObject(customStyle);

  const[mediaData, setMediaData] = useState<any>({});
  const[timeDuration, setTimeDuration] = useState<any>(null);
  const [prevPlayBackState, setPrevPlayBackState] = useState<State | null>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  const { setShowMiniPlayer, setPlayerTrack, selectedTrack: trackData, showMiniPlayer } = useAppPlayer()

  const detailRoutes = useMemo(() =>
    routes.filter((routes) => routes.name == ScreensConstants.WRITERS_DETAIL_SCREEN), [routes]);
  const noOfWriterRoutes = detailRoutes.length

  useEffect(() => {
    if(jwPlayerID){
      getNarratedOpinion()
    }
  }, [])

  useEffect(() => {
    if (trackData && trackData.id == (nid+'opinion') && prevPlayBackState === State.Playing && playbackState === State.Buffering) {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
    }
    setPrevPlayBackState(playbackState);
  }, [playbackState])

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

  const onPress = () => {
    if (nid) {
      const screenName = ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN
      const params = { nid: nid }
      noOfWriterRoutes > 0 ? navigation.push(screenName, params) : navigation.navigate(screenName, params)
    }
  }

  const onPressWriter = (tid: string) => {
    if (isNotEmpty(tid)) {
      navigation.navigate(ScreensConstants.WRITERS_DETAIL_SCREEN, { tid })
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
      
  if (nid && isObjectNonEmpty(mediaData)) {
    const playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};

    if (!isObjectNonEmpty(playList)) {
      return
    }

    const trackPlayerData = {
      id: nid + 'opinion',
      url: playList.sources[0]?.file ? playList.sources[0]?.file : '',
      title: isNotEmpty(headLine) ? headLine : '',
      duration: playList.duration? convertSecondsToHMS(playList.duration) : 0,
      artist: mediaData.title ? mediaData.title : '',
      artwork: imageUrl
    }

    if((trackData && trackData.id != trackPlayerData.id) || trackData == null ){
      setPlayerTrack(trackPlayerData);
      !showMiniPlayer && setShowMiniPlayer(true);
    }else{
      showMiniPlayer ? onPlayPausePress(playbackState) : setShowMiniPlayer(true);
      
    }
    
  }
  // Older Opinion Implementation for reference
  // if (nid && mediaData && togglePlayback) {
  //   togglePlayback(nid, mediaData)
  // }
}

  return (
    <FixedTouchable style={style.container} onPress={()=>onPress()}>
      {!hideImageView && <View style={style.topImageWithLabelContainer}>
        <TouchableOpacity onPress={() => onPressWriter(authorId)}>
          <Image
            size={normalize(43)}
            url={imageUrl}
            type="round"
            resizeMode="cover"
            fallback={true}
            fallbackName={ImagesName.authorDefault}
          />
        </TouchableOpacity>
        <Label testID='onPressWriter01' suppressHighlighting={true} style={style.writerLabel} onPress={() => onPressWriter(authorId)}>{writerTitle}</Label>
      </View>}
      <View style={style.headLineContainer}>
        <Label style={style.headLine}>
          {headLine}
        </Label>
        <Label style={style.subHeadLine} numberOfLines={3}>
          {subHeadLine}
        </Label>
      </View>
      <View style={[style.footerContainer, mediaVisibility && style.footerContainerMedia]}>
        <View style={style.listenArticleContainer}>
          {mediaVisibility && <>
            <TouchableOpacity onPress={onPressPlay} testID = "onPressPlayTestId" style={style.listenArticleContainer}>
              <ButtonImage
                icon={() =>
                  trackData && trackData.id === (nid+'opinion') && 
                  playbackState === State.Playing || isBuffering   ? 
                  getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                  getSvgImages({name: ImagesName.playIconSVG, size: normalize(12)})
                }
                style={style.playIcon}
                onPress={() => onPressPlay()}
                testId={'playIconTestId'}
              />
              <Label style={style.footerLabel}>{audioLabel}</Label> 
            </TouchableOpacity>
            {timeDuration && <Label style={style.duration}>{timeDuration}</Label>}
          </>}
        </View>
        <View>
          <ButtonImage
            testId={'bookmarkTestId'}
            icon={() => {
              return isBookmarked
                ? getSvgImages({
                    name: ImagesName.bookMarkActiveSVG,
                    width: 11,
                    height: 16
                  })
                : getSvgImages({
                    name: ImagesName.bookMarkSVG,
                    width: 11,
                    height: 16
                  });
            }}
            onPress={onPressBookmark}
          />
        </View>
      </View>
      <Divider style={[style.divider, mediaVisibility && { marginTop: normalize(10) }]} />
    </FixedTouchable>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionWritersCardViewStyle = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
      marginBottom: normalize(12),
      backgroundColor: theme.backgroundColor,
    },
    topImageWithLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    writerLabel: {
      fontSize: 14,
      color: theme.primary,
      marginStart: normalize(8),
      lineHeight: 22,
      fontFamily: fonts.IBMPlexSansArabic_Regular,
    },
    headLineContainer: {
      marginTop: normalize(10),
    },
    headLine: {
      fontSize: isTab ? 20 : 18,
      textAlign: 'left',
      lineHeight: 30,
      color: theme.primaryBlack,
      fontFamily: fonts.AwsatDigital_Bold,
    },
    subHeadLine: {
      fontSize: 16,
      textAlign: 'left',
      marginTop: normalize(8),
      lineHeight: 26,
      color: theme.secondaryDavyGrey,
      fontFamily: fonts.Effra_Arbc_Regular,
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: normalize(15),
    },
    footerContainerMedia: {
      height: normalize(38),
      marginTop: normalize(8)
    },
    listenArticleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playIcon: {
      width: normalize(13),
      height: normalize(13),
    },
    footerLabel: {
      fontSize: 12,
      lineHeight: 24,
      color: theme.primary,
      marginLeft: normalize(10),
      fontFamily: fonts.AwsatDigital_Bold,
    },
    duration: {
      fontSize: 12,
      lineHeight: 36,
      color: theme.secondaryDavyGrey,
      marginLeft: normalize(10),
      fontFamily: fonts.Effra_Arbc_Medium,
      marginBottom: isIOS ? 3 : 0
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    }
  });
  return OpinionWritersCardViewStyle;
};

export default OpinionWritersCardView;

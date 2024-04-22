import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ButtonImage, Label, Image, Divider} from 'src/components/atoms';
import {isNonEmptyArray, isObjectNonEmpty, isTab, normalize, screenWidth, isNotEmpty, isIOS} from 'src/shared/utils';
import {ImagesName} from 'src/shared/styles';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { ScreensConstants } from 'src/constants/Constants';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TrackPlayer, { State, usePlaybackState, } from 'react-native-track-player';
import { convertSecondsToHMS } from 'src/shared/utils/utilities';
import { fonts } from 'src/shared/styles/fonts';
import { useAppPlayer } from 'src/hooks';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { getNarratedOpinion } from 'src/shared/utils/getNarratedOpinion';
import { BookMarkColorType } from '../articleFooter/ArticleFooter';


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
  showDivider?: boolean;
  addStyle?: StyleProp<ViewStyle>;
  bookMarkColorType?: string;
}

const OpinionWritersCardView = ({
  imageUrl,
  writerTitle,
  headLine,
  subHeadLine,
  audioLabel,
  nid,
  isBookmarked,
  mediaVisibility,
  onPressBookmark,
  hideImageView = false,
  jwPlayerID = null,
  authorId,
  showDivider = true,
  addStyle,
  bookMarkColorType,
}: OpinionWritersCardViewProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const routes = useNavigationState(state => state.routes)
  const playbackState = usePlaybackState();
  const style = useThemeAwareObject(customStyle);

  const[mediaData, setMediaData] = useState<any>({});
  const[timeDuration, setTimeDuration] = useState<any>(null);
  const [prevPlayBackState, setPrevPlayBackState] = useState<State | undefined>(undefined);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  const { setShowMiniPlayer, setPlayerTrack, selectedTrack: trackData, showMiniPlayer } = useAppPlayer()

  const detailRoutes = useMemo(() =>
    routes.filter((filteredRoutes) => filteredRoutes.name === ScreensConstants.WRITERS_DETAIL_SCREEN), [routes]);
  const noOfWriterRoutes = detailRoutes.length

  useEffect(() => {
    if(jwPlayerID){
      getNarratedOpinion(jwPlayerID,setMediaData,setTimeDuration);
    }
  }, [])

  useEffect(() => {
    if (trackData && trackData.id === (nid+'opinion') && prevPlayBackState === State.Playing && playbackState.state === State.Buffering) {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
    }
    setPrevPlayBackState(playbackState.state);
  }, [playbackState])

  const onPress = () => {
    if (nid) {
      const screenName = ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN
      const params = { nid }
      noOfWriterRoutes > 0 ? navigation.push(screenName, params) : navigation.navigate(screenName, params)
    }
  }

  const onPressWriter = (tid: string) => {
    if (isNotEmpty(tid)) {
      navigation.navigate(ScreensConstants.WRITERS_DETAIL_SCREEN, { tid })
    }
  }

  const onPlayPausePress = async () => {
    const playback = await TrackPlayer.getPlaybackState()

    if(trackData != null){
        if(playback.state === State.Paused){
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

    if((trackData && trackData.id !== trackPlayerData.id) || trackData == null ){
      setPlayerTrack(trackPlayerData);
      !showMiniPlayer && setShowMiniPlayer(true);
    }else{
      showMiniPlayer ? onPlayPausePress() : setShowMiniPlayer(true);
      
    }
    
  }
  // Older Opinion Implementation for reference
  // if (nid && mediaData && togglePlayback) {
  //   togglePlayback(nid, mediaData)
  // }
}
  
  const renderDivider = () => {
    if(!showDivider) {
      return null
    }

    return(
      <Divider style={[style.divider, mediaVisibility && { marginTop: normalize(10) }]} />
    );
  };
  
  const playIconMobile = getSvgImages({ name: ImagesName.playIconSVG, size: normalize(12) });
  const playIconTab = getSvgImages({ name: ImagesName.playWithBg, width: 35, height: 35 });
  const playIconWidget = isTab ? playIconTab : playIconMobile;
  const bookmarkActive = bookMarkColorType === BookMarkColorType.PRIMARY ? ImagesName.favoriteActiveIcon : ImagesName.bookMarkActiveSVG;

  return (
    <FixedTouchable style={[style.container, addStyle]}
      onPress={() => onPress()}>
      {!hideImageView && <View style={style.topImageWithLabelContainer}>
        <TouchableOpacity onPress={() => onPressWriter(authorId)}>
          <Image
            size={isTab ? 53 : normalize(43)}
            url={imageUrl}
            type="round"
            resizeMode="cover"
            fallback={true}
            fallbackName={ImagesName.authorDefaultName}
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
                  playbackState.state === State.Playing || isBuffering   ? 
                  getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                  playIconWidget
                }
                onPress={() => onPressPlay()}
                testId={'playIconTestId'}
              />
              <Label style={style.footerLabel}>{audioLabel}</Label> 
            </TouchableOpacity>
            {timeDuration && <Label style={style.duration} testID='durationId'>{timeDuration}</Label>}
          </>}
        </View>
        <View>
          <ButtonImage
            testId={'bookmarkTestId'}
            icon={() => {
              return isBookmarked
                ? getSvgImages({
                    name: bookmarkActive,
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
      {renderDivider()}
    </FixedTouchable>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
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
};

export default OpinionWritersCardView;

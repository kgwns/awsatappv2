import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ButtonImage, Label, Image, Divider} from 'src/components/atoms';
import {isNonEmptyArray, isObjectNonEmpty, isTab, normalize, screenWidth, isNotEmpty} from 'src/shared/utils';
import {ImagesName, Styles} from 'src/shared/styles';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { TouchableOpacity } from 'react-native';
import { ScreensConstants } from 'src/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AuthorDefault from 'src/assets/images/icons/authorDefault.svg';
import { State, usePlaybackState, } from 'react-native-track-player';
import { getSecondsToHms } from 'src/shared/utils/utilities';
import { fonts } from 'src/shared/styles/fonts';
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';


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
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation<StackNavigationProp<any>>()
  const playbackState = usePlaybackState();
  const[mediaData, setMediaData] = useState<any>({});
  const[timeDuration, setTimeDuration] = useState<any>(null);

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
          let playList = isNonEmptyArray(opinionData.playlist) ? opinionData.playlist[0] : null;
          if(playList){
            let time = playList.duration? getSecondsToHms(playList.duration) : null;
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
      navigation.navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN, { nid: nid })
    }
  }

  const onPressWriter = (tid: string) => {
    if (isNotEmpty(tid)) {
      navigation.navigate(ScreensConstants.WRITERS_DETAIL_SCREEN, { tid })
    }
  }

const onPressPlay = () => {
  if (nid && mediaData && togglePlayback) {
    togglePlayback(nid, mediaData)
  }
}

  return (
    <TouchableOpacity style={style.container} onPress={()=>onPress()}>
      {!hideImageView && <View style={style.topImageWithLabelContainer}>
        <Image
          size={normalize(43)}
          url={imageUrl}
          type="round"
          resizeMode="cover"
          fallback={true}
          fallbackContent={<AuthorDefault
            style={{ backgroundColor: Styles.color.cyanGreen }}
            width={normalize(43)}
            height={normalize(43)} />}
          onPress={() => onPressWriter(authorId)}
        />
        <Label suppressHighlighting={true} style={style.writerLabel} onPress={() => onPressWriter(authorId)}>{writerTitle}</Label>
      </View>}
      <View style={style.headLineContainer}>
        <Label style={style.headLine} numberOfLines={2}>
          {headLine}
        </Label>
        <Label style={style.subHeadLine} numberOfLines={3}>
          {subHeadLine}
        </Label>
      </View>
      <View style={[style.footerContainer, mediaVisibility && style.footerContainerMedia]}>
        <View style={style.listenArticleContainer}>
          {mediaVisibility && <>
            <ButtonImage
              icon={() =>
                playbackState === State.Playing && selectedTrack == nid ? getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                getSvgImages({name: ImagesName.playIconSVG, size: normalize(12)})
              }
              style={style.playIcon}
              onPress={() => onPressPlay()}
              testId={'playIconTestId'}
            />
            <Label style={style.footerLabel}>{audioLabel}</Label>
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
                    width: 10,
                    height: 15
                  })
                : getSvgImages({
                    name: ImagesName.bookMarkSVG,
                    width: 10,
                    height: 15
                  });
            }}
            onPress={onPressBookmark}
          />
        </View>
      </View>
      <Divider style={[style.divider, mediaVisibility && { marginTop: normalize(10) }]} />
    </TouchableOpacity>
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
      fontSize: normalize(14),
      color: theme.primary,
      marginStart: normalize(8),
      lineHeight:normalize(22),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
    },
    headLineContainer: {
      marginTop: normalize(10),
    },
    headLine: {
      fontSize: normalize(15),
      textAlign: 'left',
      lineHeight: normalize(24),
      color: theme.primaryBlack,
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    subHeadLine: {
      fontSize: normalize(15),
      textAlign: 'left',
      marginTop: normalize(8),
      lineHeight: normalize(26),
      color: theme.secondaryDavyGrey,
      fontFamily: fonts.IBMPlexSansArabic_Regular,
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
      fontSize: normalize(12),
      lineHeight: normalize(36),
      color: theme.primary,
      marginLeft: normalize(10),
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    duration: {
      fontSize: normalize(12),
      lineHeight: normalize(14),
      color: theme.secondaryDavyGrey,
      marginLeft: normalize(10),
      fontFamily: fonts.Effra_Arbc_Medium,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    }
  });
  return OpinionWritersCardViewStyle;
};

export default OpinionWritersCardView;

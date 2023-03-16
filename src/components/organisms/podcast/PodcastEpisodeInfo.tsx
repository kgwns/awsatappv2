import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, StyleSheet, Linking } from 'react-native';
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label';
import { Image } from 'src/components/atoms/image/Image'
import { ButtonOutline } from "src/components/atoms/button-outline/ButtonOutline";
import { PodcastVerticalListProps } from 'src/components/molecules/';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { colors } from 'src/shared/styles/colors';
import ApplePodcastDarkIcon from 'src/assets/images/icons/apple_podcast_dark.svg';
import GooglePodcastDarkIcon from 'src/assets/images/icons/google_podcast_dark.svg';
import SpotifyDarkIcon from 'src/assets/images/icons/spotify_dark_icon.svg';
import AnghamiPodcastDarkIcon from 'src/assets/images/icons/anghamiPodcastDarkIcon.svg';
import PlayIcon from 'src/assets/images/icons/Play_black.svg';
import PauseIcon from 'src/assets/images/icons/pauseIconBlack.svg';
import { decodeHTMLTags, convertSecondsToHMS, isNotEmpty, isObjectNonEmpty, getDay } from 'src/shared/utils/utilities';
import { podcastEpisodeInitialData } from 'src/components/screens/podcast/PodcastEpisode';
import { fonts } from 'src/shared/styles/fonts';
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { podcastServices, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { usePlaybackState, State } from 'react-native-track-player';
import { useAppPlayer } from 'src/hooks';
import { ImageResize } from 'src/shared/styles/text-styles';

export interface PodcastEpisodeInfoProps {
  data: PodcastVerticalListProps;
  onListenPress?: (duration: any) => void;
}

export const PodcastEpisodeInfo: FunctionComponent<any> = ({
  data,
  onListenPress
}) => {
  const styles = useThemeAwareObject(createStyles);
  const PODCAST_EPISODE_LISTEN_TO_EPISODE = TranslateConstants({key:TranslateKey.PODCAST_EPISODE_LISTEN_TO_EPISODE})
  const playbackState = usePlaybackState();
  const { selectedTrack } = useAppPlayer();

  const fieldData = data ? data : podcastEpisodeInitialData
  const podcastSectionData =  fieldData.field_podcast_sect_export
  const hasNewSubTitle = !!fieldData.field_new_sub_title_export
  const [duration, setDuration] = useState<any>(null)

  useEffect(() => {
    setDuration(null);
    getPodcastDuration()
  }, [fieldData])

  const getPodcastDuration = async () => {
    if(isNotEmpty(fieldData.field_spreaker_episode_export)){
      try {
        const response: any = await fetchSingleEpisodeSpreakerApi({ episodeId: fieldData.field_spreaker_episode_export })
        if (isObjectNonEmpty(response.response) && isObjectNonEmpty(response.response.episode)) {
          const episode = response.response.episode
          setDuration(Math.floor(episode.duration / 1000))
        }
      }catch(error){
        console.log(error)
      }
    }
  }
  const onPodcastServicePress = (podcastService: string) => {
    switch (podcastService) {
      case podcastServices.anghami:
        Linking.openURL(podcastSectionData.anghami.url);
        return;
      case podcastServices.apple:
        Linking.openURL(podcastSectionData.apple_podcasts.url)
        return;
      case podcastServices.google:
        Linking.openURL(podcastSectionData.google_podcast.url);
        return;
      case podcastServices.spotify:
        Linking.openURL(podcastSectionData.spotify.url)
        return;
      default:
        return;
    }
  }

  const playPauseIcon = () => (
    <View style={styles.rightIconStyle}>
      {selectedTrack && selectedTrack.id === fieldData.nid && playbackState === State.Playing ?
        <PauseIcon fill={colors.black} width={13} height={13} />:
        <PlayIcon fill={colors.black}/>
      }
    </View>
  )

  return (
    <View>
      <View style={styles.containerStyle}>
        <View>
          <View style={styles.centerContainer}>
            <Label style={styles.titleTextStyle} children={fieldData.title} />
            <View style={styles.imageStyle}>
              <Image fallback url={fieldData?.field_podcast_sect_export?.image}
                style={styles.image}
                resizeMode={ImageResize.COVER}
              />
            </View>
            {hasNewSubTitle &&
              <View style={styles.containerSpace} >
                <Label style={styles.textStyle} children={fieldData.field_new_sub_title_export} />
              </View>
            }
            {!!fieldData.field_announcer_name_export&&
              <View style={[styles.bottomSpace, !hasNewSubTitle && {paddingTop: normalize(16)}]} >
                <Label style={styles.announcerTextStyle} children={fieldData.field_announcer_name_export} />
              </View>
            }   
            <ButtonOutline title={PODCAST_EPISODE_LISTEN_TO_EPISODE}
             style={styles.buttonStyle}
             labelStyle={styles.buttonLabel}
             titleType={LabelTypeProp.h1}
             onPress={()=>onListenPress(duration)}
             rightIcon={() => playPauseIcon()}
            />
            <View style={styles.containerSpace} />
            <View style={styles.headerLeftStyle}>
              <Label style={styles.footerRightTextStyle} numberOfLines={1} children={getDay(fieldData.created_export)} />
              { fieldData.created_export && duration ? <Label color={colors.spanishGray} children={"|"}/> : <View/>}
              <Label style={styles.footerLeftTextStyle} numberOfLines={1} children={ convertSecondsToHMS(duration)} />
            </View>
            {!!fieldData.body_export&&
              <View style={styles.containerSpace} >
                <Label style={styles.descriptionTextStyle} children={decodeHTMLTags(fieldData.body_export)} numberOfLines={3} />
              </View>
            }
          </View>

          {isTab && <>
            <View style={styles.rowContainerStyle}>
              <View style={styles.rowStyle}>
              <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.apple_podcasts.url)} onPress={() => onPodcastServicePress(podcastServices.apple)} testID = "appleUrlTab">
                <ApplePodcastDarkIcon width={normalize(110)} height={normalize(50)} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowStyle}>
              <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.google_podcast.url)} onPress={() => onPodcastServicePress(podcastServices.google)} testID = "googleUrlTab">
                <GooglePodcastDarkIcon width={normalize(110)} height={normalize(50)} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowStyle}>
              <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.spotify.url)} onPress={() => onPodcastServicePress(podcastServices.spotify)}  testID = "spotifyUrlTab">
                <SpotifyDarkIcon width={normalize(70)} height={normalize(50)} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowStyle}>
              <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.anghami.url)} onPress={() => onPodcastServicePress(podcastServices.anghami)} testID = "anghamiUrlTab">
                <AnghamiPodcastDarkIcon width={normalize(80)} height={normalize(50)} />
                </TouchableOpacity>
              </View>
            </View>
          </>}

          {!isTab && <>
            <View style={styles.topRowContainerStyle}>
              <View style={styles.rowStyle}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.apple_podcasts.url)} onPress={() => onPodcastServicePress(podcastServices.apple)} testID = "appleUrl">
                  <ApplePodcastDarkIcon width={normalize(110)} height={normalize(50)} />
                </TouchableOpacity>
                <View style={styles.tabStyle} />
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.google_podcast.url)} onPress={() => onPodcastServicePress(podcastServices.google)} testID = "googleUrl">
                  <GooglePodcastDarkIcon width={normalize(110)} height={normalize(50)} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.BottomRowContainerStyle}>
              <View style={styles.rowStyle}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.spotify.url)} onPress={() => onPodcastServicePress(podcastServices.spotify)} testID = "spotifyUrl">
                  <SpotifyDarkIcon width={normalize(70)} height={normalize(50)} />
                </TouchableOpacity>
                <View style={styles.tabContainer} />
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.anghami.url)} onPress={() => onPodcastServicePress(podcastServices.anghami)} testID = "anghamiUrl">
                  <AnghamiPodcastDarkIcon width={normalize(80)} height={normalize(50)} />
                </TouchableOpacity>
              </View>
            </View>
          </>}
        </View>
      </View>
    </View>
  );
};

const createStyles = () =>
StyleSheet.create({
  containerStyle: {
    flex : 1,
    paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    paddingVertical: normalize(15),
    backgroundColor: colors.black,
  },
  centerContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    width: normalize(150),
    height: normalize(100),
    overflow: 'hidden',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: fonts.AwsatDigital_Bold,
    lineHeight: 26,
    color: colors.white,
    paddingBottom: normalize(10),
    textAlign: 'center',
  },
  announcerTextStyle: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.greenishBlue,
  },
  bottomSpace: {
    paddingBottom: normalize(13),
  },
  titleTextStyle: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.spanishGray,
    textAlign: 'center',
    paddingBottom: normalize(15),
    fontFamily: fonts.AwsatDigital_Regular,
  },
  descriptionTextStyle: {
    fontSize: 14,
    lineHeight: 25,
    color: colors.white,
    textAlign: 'center',
  },
  labelStyle: {
    fontSize: normalize(11),
    color: colors.white,
    paddingRight: normalize(5),
    paddingBottom: normalize(10),
  },
  containerSpace: {
    paddingVertical: normalize(8),
    paddingTop: normalize(15)
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRowContainerStyle: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  BottomRowContainerStyle: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft:22,
    marginBottom:20,
  },
  buttonStyle: {
    backgroundColor:colors.white,
    borderWidth: 0,
    width: '60%',
    marginTop: normalize(20),
  },
  rightIconStyle: {
    paddingRight: normalize(15),
  },
  headerLeftStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  footerLeftTextStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    marginLeft: normalize(5),
    fontFamily: fonts.AwsatDigital_Regular,
  },
  footerRightTextStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    marginRight: normalize(5),
    fontFamily: fonts.AwsatDigital_Regular,
  },
  buttonLabel: {
    color: colors.black,
    fontFamily: fonts.AwsatDigital_Regular,
    fontSize: 14,
    lineHeight: 26
  },
  image: { 
    width: '100%', 
    height: '100%' 
  },
  tabStyle: {
     width: '10%' 
  },
  tabContainer: {
     width: '14%' 
  }
});

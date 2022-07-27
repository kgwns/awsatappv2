import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Label, Image, ButtonOutline, LabelTypeProp} from 'src/components/atoms/';
import { PodcastVerticalListProps } from 'src/components/molecules/';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { CustomThemeType, colors } from 'src/shared/styles/colors';
import ApplePodcastDarkIcon from 'src/assets/images/icons/apple_podcast_dark.svg';
import GooglePodcastDarkIcon from 'src/assets/images/icons/google_podcast_dark.svg';
import SpotifyDarkIcon from 'src/assets/images/icons/spotify_dark_icon.svg';
import PlayIcon from 'src/assets/images/icons/Play_black.svg';
import {useTranslation} from 'react-i18next';
import { decodeHTMLTags, getPodcastDate, convertSecondsToHMS, isNotEmpty, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { podcastEpisodeInitialData } from 'src/components/screens/podcast/PodcastEpisode';
import { fonts } from 'src/shared/styles/fonts';
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService';

export interface PodcastEpisodeInfoProps {
  data: PodcastVerticalListProps;
  onListenPress?: (duration: any) => void;
}

export const PodcastEpisodeInfo: FunctionComponent<any> = ({
  data,
  onListenPress
}) => {
  const styles = useThemeAwareObject(createStyles);
  const [t] = useTranslation();
  const fieldData = data ? data : podcastEpisodeInitialData
  const barVisibility = fieldData.created_export && fieldData.field_total_duration_export
  const hasNewSubTitle = !!fieldData.field_new_sub_title_export
  const [duration, setDuration] = useState<any>(null)

  useEffect(() => {
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
  
  return (
    <View>
      <View style={styles.containerStyle}>
        <View>
          <View style={styles.centerContainer}>
            <Label style={styles.titleTextStyle} children={fieldData.title} />
            <Image fallback url={fieldData?.field_podcast_sect_export?.image} style={styles.imageStyle} />
            {hasNewSubTitle &&
              <View style={[styles.containerSpace, {paddingTop: normalize(15)}]} >
                <Label style={styles.textStyle} children={fieldData.field_new_sub_title_export} />
              </View>
            }
            {!!fieldData.field_announcer_name_export&&
              <View style={[styles.bottomSpace, !hasNewSubTitle && {paddingTop: normalize(16)}]} >
                <Label style={styles.announcerTextStyle} children={fieldData.field_announcer_name_export} />
              </View>
            }   
            <ButtonOutline title={t('podcastEpisode.listenToEpisode')}
             style={styles.buttonStyle}
             labelStyle={styles.buttonLabel}
             titleType={LabelTypeProp.h1}
             onPress={()=>onListenPress(duration)}
             rightIcon={() => <View style={styles.rightIconStyle}><PlayIcon fill={colors.black}/></View>}
            />
            <View style={styles.containerSpace} />
            <View style={styles.headerLeftStyle}>
              <Label style={styles.footerRightTextStyle} numberOfLines={1} children={getPodcastDate(fieldData.created_export)} />
              { fieldData.created_export && duration ? <Label color={colors.spanishGray} children={"|"}/> : <View/>}
              <Label style={styles.footerLeftTextStyle} numberOfLines={1} children={ convertSecondsToHMS(duration)} />
            </View>
            {!!fieldData.body_export&&
              <View style={styles.containerSpace} >
                <Label style={styles.descriptionTextStyle} children={decodeHTMLTags(fieldData.body_export)} numberOfLines={3} />
              </View>
            }
          </View>

          <View style={styles.rowContainerStyle}>
            <View style={styles.rowStyle}>
              <ApplePodcastDarkIcon width={normalize(100)} height={normalize(50)} />
            </View>
            <View style={styles.rowStyle}>
              <SpotifyDarkIcon width={normalize(50)} height={normalize(50)} />
            </View>
            <View style={styles.rowStyle}>
              <GooglePodcastDarkIcon width={normalize(100)} height={normalize(50)} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
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
  },
  textStyle: {
    fontSize: 16,
    fontFamily: fonts.AwsatDigitalBetav10_Bold,
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
    fontFamily: fonts.AwsatDigitalBetav10_Regular,
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
    paddingVertical: normalize(8)
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontFamily: fonts.AwsatDigitalBetav10_Regular,
  },
  footerRightTextStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    marginRight: normalize(5),
    fontFamily: fonts.AwsatDigitalBetav10_Regular,
  },
  buttonLabel: {
    color: colors.black,
    fontFamily: fonts.AwsatDigitalBetav10_Regular,
    fontSize: 14,
    lineHeight: 26
  },
});

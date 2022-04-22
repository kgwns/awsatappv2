import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import { Label, Image, ButtonOutline, LabelTypeProp} from 'src/components/atoms/';
import { PodcastVerticalListProps } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import { colors } from 'src/shared/styles/colors';
import ApplePodcastDarkIcon from 'src/assets/images/icons/apple_podcast_dark.svg';
import GooglePodcastDarkIcon from 'src/assets/images/icons/google_podcast_dark.svg';
import SpotifyDarkIcon from 'src/assets/images/icons/spotify_dark_icon.svg';
import PlayIcon from 'src/assets/images/icons/Play_black.svg';
import {useTranslation} from 'react-i18next';
import { decodeHTMLTags, getPodcastDate, getSecondsToHms } from 'src/shared/utils/utilities';
import { podcastEpisodeInitialData } from 'src/components/screens/podcast/PodcastEpisode';

export interface PodcastEpisodeInfoProps {
  data: PodcastVerticalListProps;
  onListenPress?: (item: any) => void;
}

export const PodcastEpisodeInfo: FunctionComponent<any> = ({
  data,
  onListenPress
}) => {
  const styles = useThemeAwareObject(createStyles);
  const [t] = useTranslation();
  const fieldData = data ? data : podcastEpisodeInitialData
  const barVisibility = fieldData.created_export && fieldData.field_total_duration_export
  return (
    <View>
      <View style={styles.containerStyle}>
        <View>
          <View style={styles.centerContainer}>
            <Label style={styles.titleTextStyle} children={fieldData.title} />
            <Image fallback url={fieldData.field_podcast_sect_export?.img_podcast_mobile} style={styles.imageStyle} />
            {!!fieldData.field_new_sub_title_export &&
              <View style={styles.containerSpace} >
                <Label style={styles.textStyle} children={fieldData.field_new_sub_title_export} />
              </View>
            }
            {!!fieldData.field_announcer_name_export&&
              <View style={styles.bottomSpace} >
                <Label style={styles.announcerTextStyle} children={fieldData.field_announcer_name_export} />
              </View>
            }   
            <ButtonOutline title={t('podcastEpisode.listenToEpisode')}
             style={styles.buttonStyle}
             labelStyle={styles.buttonLabel}
             titleType={LabelTypeProp.h1}
             onPress={()=>onListenPress()}
             rightIcon={() => <View style={styles.rightIconStyle}><PlayIcon fill={colors.black}/></View>}
            />
            <View style={styles.containerSpace} />
            <View style={styles.headerLeftStyle}>
              <Label style={styles.footerRightTextStyle} numberOfLines={1} children={getPodcastDate(fieldData.created_export)} />
              {barVisibility ? <Label color={colors.spanishGray} children={"|"}/> : <View/>}
              <Label style={styles.footerLeftTextStyle} numberOfLines={1} children={getSecondsToHms(fieldData.field_total_duration_export)} />
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
    paddingHorizontal: normalize(20),
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
    fontSize: normalize(14),
    fontWeight: 'bold',
    lineHeight: normalize(26),
    color: colors.white,
    paddingBottom: normalize(10),
    textAlign: 'center',
  },
  announcerTextStyle: {
    fontSize: normalize(14),
    color: colors.greenishBlue,
  },
  bottomSpace: {
    paddingBottom: normalize(10),
  },
  titleTextStyle: {
    fontSize: normalize(13),
    lineHeight: normalize(22),
    color: colors.spanishGray,
    textAlign: 'center',
    paddingBottom: normalize(15),
  },
  descriptionTextStyle: {
    fontSize: normalize(13),
    lineHeight: normalize(22),
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
    fontSize: normalize(12),
    lineHeight: normalize(16),
    color: colors.white,
    marginLeft: normalize(5),
  },
  footerRightTextStyle: {
    fontSize: normalize(12),
    lineHeight: normalize(16),
    color: colors.white,
    marginRight: normalize(5),
  },
  buttonLabel: {
    color: colors.black,
  },
});

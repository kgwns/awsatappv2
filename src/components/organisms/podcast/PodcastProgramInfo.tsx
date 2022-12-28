import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import { Label, Image } from 'src/components/atoms/';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType,colors} from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {PodcastListItemType} from 'src/redux/podcast/types'
import { fonts } from 'src/shared/styles/fonts';
import { decodeHTMLTags, isNotEmpty } from 'src/shared/utils/utilities';
import { podcastServices } from 'src/constants/SharedConstants';
import { podcastEpisodeInitialData } from 'src/components/screens/podcast/PodcastEpisode';

interface PodcastProgramProps {
  data: PodcastListItemType;
}

export const PodcastProgramInfo: FunctionComponent<PodcastProgramProps> = ({
  data,
}) => {
  const styles = useThemeAwareObject(createStyles);
  const fieldData = data ? data : podcastEpisodeInitialData
  const podcastSectionData =  fieldData.field_podcast_sect_export

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


  return (
    <View>
      <View style={styles.containerStyle}>
        <View>
          <View style={styles.centerContainer}>
            <View style={styles.imageContainerStyle}>
              <Image fallback url={data?.field_podcast_sect_export?.image} style={styles.imageStyle} />
            </View>
            <View style={styles.containerSpace} />
            <Label style={styles.textStyle} children={data.title} />
            {data.field_podcast_sect_export?.name&&
              <View style={styles.containerSpace} >
                <Label style={styles.announcerTextStyle} children={data.field_podcast_sect_export.name} />
              </View>
            }
            {data.body_export&&
              <View style={styles.containerSpace} >
                <Label style={styles.descriptionTextStyle} children={decodeHTMLTags(data.body_export)} />
              </View>
            }
          </View>

          {isTab && <>
            <View style={styles.rowContainerStyle}>
              <View style={styles.rowStyle}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.apple_podcasts.url)} onPress={() => onPodcastServicePress(podcastServices.apple)} testID = "tabApplePodcastsUrl">
                  {getSvgImages({ name: ImagesName.applePodcast, width: normalize(110), height: normalize(50), })}
                </TouchableOpacity>
              </View>
              <View style={styles.rowStyle}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.google_podcast.url)} onPress={() => onPodcastServicePress(podcastServices.google)} testID = "tabGooglePodcastUrl">
                  {getSvgImages({ name: ImagesName.googlePodcast, width: normalize(110), height: normalize(50), })}
                </TouchableOpacity>
              </View>
              <View style={styles.rowStyle}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.spotify.url)} onPress={() => onPodcastServicePress(podcastServices.spotify)} testID = "tabSpotifyPodcastUrl">
                  {getSvgImages({ name: ImagesName.spotifyPodcast, width: normalize(70), height: normalize(50), })}
                </TouchableOpacity>
              </View>
              <View style={styles.rowStyle}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.anghami.url)} onPress={() => onPodcastServicePress(podcastServices.anghami)} testID = "tabAnghamiPodcastUrl">
                  {getSvgImages({ name: ImagesName.anghamiPodcast, width: normalize(80), height: normalize(50), })}
                </TouchableOpacity>
              </View>
            </View>
          </>}

          {!isTab && <>
            <View style={styles.topRowContainerStyle}>
              <View style={styles.rowStyle}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.apple_podcasts.url)} onPress={() => onPodcastServicePress(podcastServices.apple)} testID = "applePodcastsUrl">
                  {getSvgImages({ name: ImagesName.applePodcast, width: normalize(110), height: normalize(50), })}
                </TouchableOpacity>
                <View style={{ width: '10%' }} />
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.google_podcast.url)} onPress={() => onPodcastServicePress(podcastServices.google)} testID = "googlePodcastUrl">
                  {getSvgImages({ name: ImagesName.googlePodcast, width: normalize(110), height: normalize(50), })}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.BottomRowContainerStyle}>
              <View style={styles.rowStyle}>
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.spotify.url)} onPress={() => onPodcastServicePress(podcastServices.spotify)} testID = "spotifyPodcastUrl">
                  {getSvgImages({ name: ImagesName.spotifyPodcast, width: normalize(70), height: normalize(50), })}
                </TouchableOpacity>
                <View style={{ width: '14%' }} />
                <TouchableOpacity disabled={!isNotEmpty(podcastSectionData.anghami.url)} onPress={() => onPodcastServicePress(podcastServices.anghami)} testID = "anghamiPodcastUrl">
                  {getSvgImages({ name: ImagesName.anghamiPodcast, width: normalize(80), height: normalize(50), })}
                </TouchableOpacity>
              </View>
            </View>
          </>}
          <View style={styles.containerSpace} />
        </View>
      </View>
      {/* <PodCastMiniPlayer /> */}
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  containerStyle: {
    paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    paddingTop: normalize(25),
  },
  centerContainer: {
    alignItems: 'center',
  },
  imageContainerStyle: {
    width: normalize(204),
    height: normalize(162),
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    fontSize: 14,
    color: theme.primaryBlack,
    textAlign:'center',
    lineHeight: 20,
    fontFamily: fonts.AwsatDigital_Bold,
  },
  announcerTextStyle: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.greenishBlue,
    fontFamily: fonts.AwsatDigital_Regular,
  },
  descriptionTextStyle: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.spanishGray,
    textAlign: 'center',
    fontFamily: fonts.IBMPlexSansArabic_Regular,
  },
  labelStyle: {
    fontSize: normalize(11),
    color: theme.primaryBlack,
    paddingRight: normalize(5),
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
});
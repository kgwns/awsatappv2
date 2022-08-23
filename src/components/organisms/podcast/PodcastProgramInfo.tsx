import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import { Label, Image } from 'src/components/atoms/';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType,colors} from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {PodcastListItemType} from 'src/redux/podcast/types'
import { fonts } from 'src/shared/styles/fonts';
import { decodeHTMLTags } from 'src/shared/utils/utilities';

interface PodcastProgramProps {
  data: PodcastListItemType;
}

export const PodcastProgramInfo: FunctionComponent<PodcastProgramProps> = ({
  data,
}) => {
  const styles = useThemeAwareObject(createStyles);

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

          <View style={styles.rowContainerStyle}>
            <View style={styles.rowStyle}>
              {getSvgImages({ name: ImagesName.applePodcast, width: normalize(100), height: normalize(50), })}
            </View>
            <View style={styles.rowStyle}>
              {getSvgImages({ name: ImagesName.spotifyPodcast, width: normalize(50), height: normalize(50), })}
            </View>
            <View style={styles.rowStyle}>
              {getSvgImages({ name: ImagesName.googlePodcast, width: normalize(100), height: normalize(50), })}
            </View>
          </View>
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
  }
});
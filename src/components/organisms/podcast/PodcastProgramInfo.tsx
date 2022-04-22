import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import { Label, Image } from 'src/components/atoms/';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import { colors } from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {PodcastListItemType} from 'src/redux/podcast/types'

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
            <Image url={data.field_podcast_sect_export.img_podcast_mobile} style={styles.imageStyle} />
            <View style={styles.containerSpace} />
            <Label style={styles.textStyle} children={data.title} />
            {data.field_podcast_sect_export?.name&&
              <View style={styles.containerSpace} >
                <Label style={styles.announcerTextStyle} children={data.field_podcast_sect_export.name} />
              </View>
            }
            {data.body_export&&
              <View style={styles.containerSpace} >
                <Label style={styles.descriptionTextStyle} children={data.body_export} />
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
  imageStyle: {
    width: normalize(200),
    height: normalize(150),
  },
  textStyle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: theme.primaryBlack,
    textAlign:'center',
    lineHeight: normalize(20)
  },
  announcerTextStyle: {
    fontSize: normalize(14),
    color: colors.greenishBlue,
  },
  descriptionTextStyle: {
    fontSize: normalize(13),
    lineHeight: normalize(20),
    color: colors.spanishGray,
    textAlign: 'center',
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

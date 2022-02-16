import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import { Label, Image } from 'src/components/atoms/';
import { PodcastVerticalListProps } from 'src/components/molecules/';
import { PodcastEpisodeList } from 'src/components/organisms';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import { colors } from 'src/shared/styles/colors';
import GooglePodcastIcon from 'src/assets/images/icons/podcast_icon_final.svg';
import ApplePodcastIcon from 'src/assets/images/icons/apple_podcast_icon.svg';

export interface PodcastProgramInfoProps {
  title: string;
  announcer: string;
  description: string;
  imageUrl: string;
  data: PodcastVerticalListProps[];
}

interface PodcastProgramProps {
  data: PodcastProgramInfoProps;
}

export const PodcastProgramInfo: FunctionComponent<PodcastProgramProps> = ({
  data,
}) => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.containerStyle}>
      <View>
        <View style={styles.centerContainer}>
          <Image url={data.imageUrl} style={styles.imageStyle} />
          <View style={styles.containerSpace} />
          <Label style={styles.textStyle} children={data.title} />
          <View style={styles.containerSpace} />
          <Label style={styles.announcerTextStyle} children={data.announcer} />
          <View style={styles.containerSpace} />
          <Label style={styles.descriptionTextStyle} children={data.description} />
          <View style={styles.containerSpace} />
        </View>

        <View style={styles.rowContainerStyle}>
          <View style={styles.rowStyle}>
            <Label style={styles.labelStyle} children={'Apple Podcasts'} />
            <ApplePodcastIcon />
          </View>
          <View style={styles.rowStyle}>
            <Label style={styles.labelStyle} children={'Spotify'} />
          </View>
          <View style={styles.rowStyle}>
            <Label style={styles.labelStyle} children={'Google Podcasts'} />
            <GooglePodcastIcon />
          </View>
        </View>
      </View>
      <View style={styles.containerSpace} />

      <PodcastEpisodeList data={data.data} />
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  containerStyle: {
    flex : 1,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(25),
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
    color: theme.primaryBlack,
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

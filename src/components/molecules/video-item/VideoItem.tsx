import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {
  Image,
  Label,
} from 'src/components/atoms';
import PlayIcon from 'src/assets/images/icons/video_play.svg';
import BookmarkIcon from 'src/assets/images/icons/bookmark.svg';
import ViewIcon from 'src/assets/images/icons/view.svg';
import DateIcon from 'src/assets/images/icons/date.svg';
import {normalize} from 'src/shared/utils';
import {useTranslation} from 'react-i18next';

export interface VideoItemProps {
  imageUrl: string;
  videoLabel: string;
  time: string;
  title: string;
  des: string;
  month: string;
  date: string;
  views: string;
  isFirstItem?: boolean;
}

export const VideoItem = ({
  imageUrl,
  videoLabel,
  time,
  title,
  des,
  month,
  date,
  views,
  isFirstItem,
}: VideoItemProps) => {
  const styles = useThemeAwareObject(createStyles);
  const {themeData} = useTheme();
  const [t] = useTranslation();
  return (
    <View>
      {isFirstItem ? (
        <View style={styles.videoContainer}>
          <Image resizeMode={'cover'} url={imageUrl} style={styles.imageBig} />
        </View>
      ) : (
        <View style={styles.videoContainer}>
          <Image resizeMode={'cover'} url={imageUrl} style={styles.image} />
          <PlayIcon fill={colors.white} style={styles.playIcon} />
          <Label style={styles.time} color={colors.white}>
            {time}
          </Label>
          <Label style={styles.videoLable}>{videoLabel}</Label>
        </View>
      )}

      <Label labelType={'h2'}>{title}</Label>
      <Label labelType={'p3'} color={themeData.secondaryDavyGrey}>
        {des}
      </Label>

      <View style={styles.footerContainer}>
        <View style={styles.footerRight}>
          <ViewIcon
            fill={colors.silverChalice}
            width={normalize(18)}
            height={normalize(18)}
          />
          <Label style={styles.viewsStyle}>{views}</Label>
          <Label labelType="caption5">{t('sectionVideo.toWatch')}</Label>
          <View style={styles.dividerV} />
          <DateIcon
            fill={colors.silverChalice}
            width={normalize(14)}
            height={normalize(14)}
          />
          <Label style={styles.day} color={colors.silverChalice}>
            {date}
          </Label>
          <Label labelType="caption5">{month}</Label>
        </View>
        <BookmarkIcon fill={colors.davyGrey} />
      </View>
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: normalize(10),
      marginBottom: normalize(20),
    },
    day: {
      marginHorizontal: normalize(8),
    },
    footerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewsStyle: {
      marginHorizontal: normalize(5),
      color: theme.primary,
    },
    dividerV: {
      width: 1,
      height: normalize(15),
      backgroundColor: colors.mountainMist,
      marginHorizontal: normalize(10),
    },
    image: {
      width: '100%',
      height: normalize(200),
    },
    imageBig: {
      width: '100%',
      height: normalize(400),
    },
    imageContainer: {
      width: '100%',
    },
    videoContainer: {
      width: '100%',
    },
    time: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.greyDark20,
      padding: normalize(5),
    },
    videoLable: {
      left: 0,
      top: 0,
      position: 'absolute',
      backgroundColor: colors.greenishBlue,
      paddingHorizontal: normalize(8),
      paddingVertical: 3,
    },
    playIcon: {
      top: normalize(10),
      right: normalize(10),
      position: 'absolute',
    },
    labelContainer: {
      backgroundColor: colors.greenishBlue,
      padding: normalize(5),
      top: 0,
      right: 0,
    },
    timeContainer: {
      backgroundColor: colors.black10,
      padding: normalize(5),
      bottom: 0,
      left: 0,
    },
  });

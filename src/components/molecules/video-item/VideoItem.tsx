import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
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
  videoLabel?: string;
  time?: string;
  title: string;
  des: string|null;
  date?: string;
  views?: string;
  isFirstItem?: boolean;
  onPress?: ()=> void;
  testID?: string;
  shortDescription?: string;
  toWatchTitle?: string;
}

export const VideoItem = ({
  imageUrl,
  videoLabel,
  time,
  title,
  des,
  date,
  views,
  isFirstItem,
  onPress,
  testID,
  toWatchTitle,
}: VideoItemProps) => {
  const styles = useThemeAwareObject(createStyles);
  const {themeData} = useTheme();
  const [t] = useTranslation();
  const showSeparator = (views || toWatchTitle) && (date)
  return (
    <View>
      <TouchableOpacity testID={testID} accessibilityLabel={testID} onPress={onPress}>
        <View>
        {isFirstItem ? (
          <View style={styles.videoContainer}>
            <Image resizeMode={'cover'} url={imageUrl} style={styles.imageBig} />
          </View>
        ) : (
            <View style={styles.videoContainer}>
              <Image resizeMode={'cover'} url={imageUrl} style={styles.image} />
              {time && (<PlayIcon fill={colors.white} style={styles.playIcon} />)}
              {time && (<Label style={styles.time} color={colors.white}>
                {time}
              </Label>)}
              {videoLabel &&(<Label style={styles.videoLable}>{videoLabel}</Label>)}
            </View>
        )}
        </View>
      </TouchableOpacity>

      <Label labelType={'h2'}>{title}</Label>
      <Label labelType={'p3'} color={themeData.secondaryDavyGrey}>
        {des}
      </Label>

      <View style={styles.footerContainer}>
        <View style={styles.footerRight}>
          {(views || toWatchTitle) && (<ViewIcon
            fill={colors.silverChalice}
            width={normalize(18)}
            height={normalize(18)}
          />)}
          {views && (<Label style={styles.viewsStyle}>{views}</Label>)}
          {toWatchTitle && (<Label labelType="caption5">{toWatchTitle}</Label>)}
          {showSeparator && (<View style={styles.dividerV} />)}
          {date  && (<DateIcon
            fill={colors.silverChalice}
            width={normalize(14)}
            height={normalize(14)}
          />)}
          <Label style={styles.day} color={colors.silverChalice}>
            {date}
          </Label>
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
      color: colors.white
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

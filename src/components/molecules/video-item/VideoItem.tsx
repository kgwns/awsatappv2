import * as React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {
  ButtonImage,
  ButtonOutline,
  Image,
  Label,
  LabelTypeProp,
} from 'src/components/atoms';
import PlayIcon from 'src/assets/images/icons/video_play.svg';
import ViewIcon from 'src/assets/images/icons/view.svg';
import DateIcon from 'src/assets/images/icons/date.svg';
import {normalize} from 'src/shared/utils';
import {useTranslation} from 'react-i18next';
import {getImageUrl} from 'src/shared/utils/utilities';
import {timeAgo} from 'src/shared/utils/utilities';
import { decode } from 'html-entities';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import PlayIconSmall from 'src/assets/images/icons/Play_black.svg';
export interface VideoItemProps {
  imageUrl: string;
  videoLabel?: string;
  time?: string;
  title: string;
  des: string;
  date?: string;
  views?: string;
  isFirstItem?: boolean;
  onPress?: ()=> void;
  testID?: string;
  shortDescription?: string;
  toWatchTitle?: string;
  video?: string;
  isBookmarked:boolean;
  onPressBookmark:()=>void;
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
  isBookmarked,
  onPressBookmark
}: VideoItemProps) => {
  const styles = useThemeAwareObject(createStyles);
  const {themeData} = useTheme();
  const [t] = useTranslation();
  const showSeparator = (views || toWatchTitle) && (date)
  const imageLink = imageUrl ? getImageUrl(imageUrl) : undefined;
  const monthDate = t(timeAgo(date))
  return (
    <View>
      <TouchableOpacity testID={testID} accessibilityLabel={testID} onPress={onPress}>
        <View>
        {isFirstItem ? (
          <View style={styles.videoContainer}>
            <Image fallback resizeMode={'cover'} url={imageLink} style={styles.imageBig} />
            <View style={styles.buttonContainer}>
              <ButtonOutline title={t('videoDetail.employement')}
              style={styles.buttonStyle}
              labelStyle={styles.buttonLabel}
              titleType={LabelTypeProp.h1}
              onPress={onPress}
              rightIcon={() => <View style={styles.rightIconStyle}><PlayIconSmall fill={colors.white}/></View>}
              />
             </View>
          </View>
        ) : (
            <View style={[styles.videoContainer,styles.spaceContainer]}>
              <Image fallback resizeMode={'cover'} url={imageLink} style={styles.image} />
              <PlayIcon fill={colors.white} style={styles.playIcon} />
              {time && (<Label style={styles.time} color={colors.white}>
                {time}
              </Label>)}
              {videoLabel &&(<Label style={styles.videoLable}>{videoLabel}</Label>)}
            </View>
        )}
        </View>
      </TouchableOpacity>

      <View style={styles.spaceContainer}>
        <Label labelType={'h2'}>{decode(title)}</Label>
        {des&&<Label labelType={'p3'} color={themeData.secondaryDavyGrey}>
          {decode(des)}
        </Label>}
      </View>

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
          {monthDate  && (<DateIcon
            fill={colors.silverChalice}
            width={normalize(14)}
            height={normalize(14)}
          />)}
          <Label style={styles.day} color={colors.silverChalice}>
            {monthDate}
          </Label>
        </View>
        <ButtonImage
            testId={'bookmarkTestId'}
            icon={() => {
              return isBookmarked
                ? getSvgImages({
                    name: ImagesName.bookMarkActiveSVG,
                    size: normalize(17),
                  })
                : getSvgImages({
                    name: ImagesName.bookMarkSVG,
                    size: normalize(17),
                  });
            }}
            onPress={onPressBookmark}
          />
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
      marginHorizontal: normalize(15),
    },
    spaceContainer: {
      paddingHorizontal: normalize(15),
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
      right: normalize(20),
      position: 'absolute',
    },
    buttonContainer: {
      bottom: 0,
      right: 0,
      left: 0,
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
    buttonStyle: {
      backgroundColor:colors.black,
      borderWidth: 0,
      width: normalize(150),
      alignSelf: 'center',
    },
    rightIconStyle: {
      marginRight: normalize(15),
    },
    buttonLabel: {
      color: colors.white,
    },
  });

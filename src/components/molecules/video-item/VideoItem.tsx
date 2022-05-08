import * as React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {
  ButtonImage,
  ButtonOutline,
  HtmlRenderer,
  Image,
  Label,
  LabelTypeProp,
} from 'src/components/atoms';
import PlayIcon from 'src/assets/images/icons/video_play.svg';
import ViewIcon from 'src/assets/images/icons/view.svg';
import DateIcon from 'src/assets/images/icons/date.svg';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {useTranslation} from 'react-i18next';
import {getImageUrl, getSecondsToHms} from 'src/shared/utils/utilities';
import {timeAgo} from 'src/shared/utils/utilities';
import { decode } from 'html-entities';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import PlayIconSmall from 'src/assets/images/icons/Play_black.svg';
import { MixedStyleRecord } from 'react-native-render-html';
import { fonts } from 'src/shared/styles/fonts';

export interface VideoItemProps {
  imageUrl: string;
  videoLabel?: string;
  time?: string;
  title: string;
  des: string;
  date?: string;
  views?: string;
  isDocumentary?: boolean;
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
  isDocumentary,
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
  const duration = time ? getSecondsToHms(time.split('|')[1]) : undefined;
  const htmlTagStyle: MixedStyleRecord = {
    p: {
      color: themeData.secondaryDavyGrey,
      textAlign: 'left',
      direction: 'rtl',
      fontSize: normalize(15),
      lineHeight: normalize(25),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
    },
  };
  return (
    <View>
      <TouchableOpacity testID={testID} accessibilityLabel={testID} onPress={onPress}>
        <View>
        {isDocumentary ? (
          <View style={[styles.videoContainer,{ marginTop: 0}]}>
            <Image fallback resizeMode={'cover'} url={imageLink} style={styles.imageBig} />
            <View style={styles.titleContainer} >
              <Label style={styles.titleStyle} numberOfLines={1} >{decode(title)}</Label>
            </View>
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
            <View style={[styles.videoContainer,styles.spaceContainer, !isDocumentary && { marginTop: 0}]}>
              <Image fallback resizeMode={'cover'} url={imageLink} style={styles.image} />
              <PlayIcon fill={colors.white} style={styles.playIcon} />
              {duration && (<Label style={styles.time} color={colors.white}>
                {duration}
              </Label>)}
              {videoLabel &&(<Label style={styles.videoLable}>{videoLabel}</Label>)}
            </View>
        )}
        </View>
      </TouchableOpacity>

      <View style={styles.spaceContainer}>
        {!isDocumentary && <Label labelType={'h2'}>{decode(title)}</Label>}
        {des && <View>
          <HtmlRenderer source={des} tagsStyles={htmlTagStyle} />
       </View> }
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
                    width: 11,
                    height: 16
                  })
                : getSvgImages({
                    name: ImagesName.bookMarkSVG,
                    width: 11,
                    height: 16
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
      marginHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    spaceContainer: {
      paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    day: {
      marginHorizontal: normalize(8),
      fontFamily: fonts.Almaria_Regular,
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
      marginTop: normalize(10)
    },
    time: {
      position: 'absolute',
      right: normalize(0.04 * screenWidth),
      bottom: 0,
      opacity: 0.8,
      backgroundColor: colors.darkGreenishBlue,
      padding: normalize(5),
    },
    videoLable: {
      left: normalize(0.04 * screenWidth),
      top: 0,
      position: 'absolute',
      backgroundColor: colors.greenishBlue,
      paddingHorizontal: normalize(8),
      paddingVertical: 3,
      color: colors.white
    },
    playIcon: {
      top: normalize(10),
      right: normalize(25),
      position: 'absolute',
    },
    buttonContainer: {
      bottom: normalize(10),
      right: 0,
      left: 0,
      position: 'absolute',
    },
    titleContainer: {
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
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
      width: normalize(144),
      alignSelf: 'center',
      height: normalize(40)
    },
    rightIconStyle: {
      marginRight: normalize(15),
    },
    buttonLabel: {
      color: colors.white,
      fontFamily: fonts.Almaria_Regular,
    },
    titleStyle: {
      color: colors.darkRed,
      fontSize: normalize(35),
      lineHeight: normalize(55),
      fontFamily: fonts.Beirut,
    },
    documentaryTitle: {
      color: colors.white,
      fontSize: normalize(14)
    }
  });

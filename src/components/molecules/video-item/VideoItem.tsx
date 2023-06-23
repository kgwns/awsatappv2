import * as React from 'react';
import { View, StyleSheet, ImageStyle, Dimensions, TouchableOpacity } from 'react-native';
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
import {isTab, normalize} from 'src/shared/utils';
import {dateTimeAgo, getImageUrl, convertSecondsToHMS, TimeIcon, getShareUrl, isNotEmpty} from 'src/shared/utils/utilities';
import { decode } from 'html-entities';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import PlayIconSmall from 'src/assets/images/icons/Play_black.svg';
import { MixedStyleRecord } from 'react-native-render-html';
import { fonts } from 'src/shared/styles/fonts';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { BookMarkColorType } from '../articleFooter/ArticleFooter';
import { videoEvents } from 'src/shared/utils/analyticsEvents';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

const width = Dimensions.get('window').width;

export interface VideoItemProps {
  imageUrl: string;
  index?: number;
  videoLabel?: string;
  time?: string;
  title: string;
  subTitle?: string;
  des: string;
  date?: string;
  views?: string;
  isDocumentary?: boolean;
  isVideoContents?: boolean;
  onPress?: ()=> void;
  testID?: string;
  shortDescription?: string;
  toWatchTitle?: string;
  link_node?: string;
  video?: string;
  isBookmarked:boolean;
  showShare:boolean;
  onPressBookmark:()=>void;
  videoThumbnailStyle?: ImageStyle;
  bookMarkColorType?: string;
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
  isVideoContents=false,
  onPress,
  testID,
  toWatchTitle,
  isBookmarked,
  onPressBookmark,
  videoThumbnailStyle,
  index = 0,
  subTitle = '',
  showShare = false,
  link_node = '',
  bookMarkColorType,
}: VideoItemProps) => {
  const styles = useThemeAwareObject(createStyles);
  const {themeData} = useTheme();
  const VIDEO_DETAIL_EMPLOYMENT = TranslateConstants({key:TranslateKey.VIDEO_DETAIL_EMPLOYMENT})
  const VIDEO_SHARE = TranslateConstants({key:TranslateKey.VIDEO_SHARE})
  const timeFormat = dateTimeAgo(date)
  const showSeparator = (views || toWatchTitle) && (date)
  const imageLink = imageUrl ? getImageUrl(imageUrl) : undefined;
  const monthDate = timeFormat.time
  const duration = time ? convertSecondsToHMS(time.split('|')[1]) : undefined;
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
  const onPressShare = async () => {
    const decodeBody = isNotEmpty(des) ? des.split(' ').length : 0;
    const eventName = AnalyticsEvents.SOCIAL_SHARE;
    videoEvents(title, decodeBody, eventName);
    await Share.open({
      title,
      url: getShareUrl('', link_node!),
      failOnCancel: true,
      subject: title
    }).then(response => {
      console.log('Shared successfully :::', response)
    }).catch((error) => {
      console.log('Cancelled share request :::', error)
    })
  }
  const renderFooterContainer = () => {
    const renderTimeIcon = () => TimeIcon(timeFormat.icon);
    const listContainerStyle = isTab ? (isDocumentary ? styles.marginHorizontalStyle : styles.marginStartStyle) : styles.marginHorizontalStyle;
    const lastIndex = (index + 1) % 3 == 0;
    if (showShare && isTab && !isDocumentary) {
      return (
        <TouchableOpacity onPress={onPressShare}>
          <View style={[styles.shareContainer, styles.marginStartStyle, lastIndex && styles.marginEndStyle]}>
            {getSvgImages({
              name: ImagesName.shareIcon,
              width: 20,
              height: 20,
            })}
            <Label children={VIDEO_SHARE} style={styles.shareStyle} />
          </View>
        </TouchableOpacity>
      )
    } 

    const bookmarkActive = bookMarkColorType === BookMarkColorType.PRIMARY ? ImagesName.favoriteActiveIcon : ImagesName.bookMarkActiveSVG;
    return (
      <View style={[styles.footerContainer, listContainerStyle, (isTab && lastIndex) && styles.marginEndStyle]}>
        <View style={styles.footerRight}>
          {(views || toWatchTitle) && (<ViewIcon
            fill={colors.silverChalice}
            width={normalize(18)}
            height={normalize(18)}
          />)}
          {views && (<Label style={styles.viewsStyle}>{views}</Label>)}
          {toWatchTitle && (<Label labelType="caption5">{toWatchTitle}</Label>)}
          {showSeparator && (<View style={styles.dividerV} />)}
          {monthDate && renderTimeIcon()}
          <Label style={styles.day} color={styles.footerTitleColor.color}>
            {monthDate}
          </Label>
        </View>
        <ButtonImage
          testId={'bookmarkTestId'}
          style={styles.centerStyle}
          icon={() => {
            return isBookmarked
              ? getSvgImages({
                name: bookmarkActive,
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
    )
  }
  const renderTitleContainer = () => {
    const fillColor = isTab ? colors.black : colors.white;
    const buttonLabelStyle = isTab ? styles.buttonTabLabel : styles.buttonLabel;
    const buttonContainerStyle = isTab ? styles.buttonTabStyle : styles.buttonStyle;
    const titleLabelStyle = isTab ? styles.titleTabStyle : styles.titleStyle;
    const containerStyle = isTab ? styles.buttonTabContainer : styles.buttonContainer;
    return (
      <>
        <View style={styles.titleContainer} >
          <Label style={titleLabelStyle} numberOfLines={2}>{decode(title)}</Label>
          {isTab && <Label style={styles.subTitleLabelStyle} numberOfLines={2}>{decode(subTitle)}</Label>}
        </View>
        <View style={containerStyle}>
          <ButtonOutline title={VIDEO_DETAIL_EMPLOYMENT}
            style={buttonContainerStyle}
            labelStyle={buttonLabelStyle}
            titleType={LabelTypeProp.h1}
            onPress={onPress}
            rightIcon={() => <View style={styles.rightIconStyle}><PlayIconSmall fill={fillColor} /></View>}
          />
        </View>
      </>
    )
  }
  const renderListContainer = () => {
    const timeStyle = isTab ? styles.tabTime : styles.time;
    const listContainerStyle = isTab ? styles.paddingStartStyle : styles.paddingHorizontalStyle;
    const lastIndex = (index + 1) % 3 == 0; 
    
    return (
      <View style={[styles.videoContainer, listContainerStyle, !isDocumentary && { marginTop: 0 }, (isTab && lastIndex) && {paddingEnd: 0.02 * width}]}>
        <View>
          <Image fallback resizeMode={'cover'} url={imageLink} style={[styles.image, videoThumbnailStyle]} />
          <PlayIcon fill={colors.white} style={styles.playIcon} />
          {duration && (<Label style={timeStyle} color={colors.white}>
            {duration}
          </Label>)}
          {videoLabel && (<Label style={styles.videoLable}>{videoLabel}</Label>)}
        </View>
      </View>
    )
  }
  const renderDescription = () => {
    const spaceContainerStyle = isTab ? (isDocumentary ? styles.paddingHorizontalStyle : styles.paddingStartStyle) : styles.paddingHorizontalStyle;
    const lastIndex = (index + 1) % 3 == 0; 
    return (
      <View style={[spaceContainerStyle, (isTab && lastIndex) && styles.paddingEndStyle]}>
        {!isDocumentary && <View style={isTab && styles.titleHeight}>
            <Label numberOfLines={3} style={styles.titleLabelStyle}>{decode(title)}</Label>
          </View>}
        {(isDocumentary && des) && (<View>
          <HtmlRenderer source={des} tagsStyles={htmlTagStyle} />
        </View>)}
      </View>
    )
  }
  return (
    <View style={isVideoContents && styles.containerStyle}>
      <FixedTouchable testID={testID} accessibilityLabel={testID} onPress={onPress}>
        <View>
          {isDocumentary ? (
            <View style={[styles.videoContainer, styles.videoContainerStyle]}>
              {isTab ? <Image fallback resizeMode={'cover'} url={imageLink} style={styles.imageTabBig} >
                <LinearGradient colors={['rgba(1, 1, 1, 0)', 'rgba(1, 1, 1, 0)', 'rgba(0, 0, 0, 1)']} style={styles.linearGradient} />
              </Image> : <Image fallback resizeMode={'cover'} url={imageLink} style={styles.imageBig} />}
              {renderTitleContainer()}
            </View>
          ) : renderListContainer()}
        </View>
        {renderDescription()}
        {renderFooterContainer()}
      </FixedTouchable>
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
      fontFamily: fonts.AwsatDigital_Regular,
      lineHeight: normalize(26),
    },
    footerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewsStyle: {
      marginHorizontal: normalize(5),
      color: theme.primary,
      lineHeight: normalize(26),
    },
    dividerV: {
      width: 1,
      height: normalize(15),
      backgroundColor: colors.mountainMist,
      marginHorizontal: normalize(10),
    },
    image: {
      width: '100%',
      height: 200,
    },
    imageBig: {
      width: '100%',
      height: normalize(400),
    },
    imageTabBig: {
      width: '100%',
      height: normalize(600),
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
      right: 0,
      bottom: 0,
      opacity: 0.8,
      backgroundColor: colors.darkGreenishBlue,
      padding: normalize(5),
      paddingBottom: 3,
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: 13,
      lineHeight: 20,
    },
    tabTime: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.black55,
      padding: normalize(5),
      fontFamily: fonts.AwsatDigital_Regular,
      lineHeight: 20,
      paddingBottom: 3,
      fontSize: 13,
    },
    videoLable: {
      left: 0,
      top: 0,
      position: 'absolute',
      backgroundColor: colors.greenishBlue,
      paddingHorizontal: normalize(8),
      paddingVertical: 3,
      color: colors.white,
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: 12,
      lineHeight: 16
    },
    playIcon: {
      top: normalize(10),
      right: normalize(10),
      position: 'absolute',
    },
    buttonContainer: {
      bottom: normalize(10),
      right: 0,
      left: 0,
      position: 'absolute',
    },
    buttonTabContainer: {
      bottom: normalize(50),
      right: 0,
      left: 0,
      position: 'absolute',
      paddingHorizontal: normalize(20)
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
    buttonTabStyle: {
      backgroundColor:colors.white,
      borderWidth: 0,
      width: normalize(124),
      alignSelf: 'center',
      height: normalize(44)
    },
    buttonTabLabel: {
      color: colors.black,
      fontFamily: fonts.AwsatDigital_Regular,
      lineHeight: normalize(26)
    },
    rightIconStyle: {
      marginRight: normalize(15),
    },
    buttonLabel: {
      color: colors.white,
      fontFamily: fonts.AwsatDigital_Regular,
      lineHeight: normalize(26)
    },
    titleStyle: {
      color: colors.darkRed,
      fontSize: 40,
      lineHeight: 55,
      fontFamily: fonts.AwsatDigital_Black,
      textAlign: 'center'
    },
    titleTabStyle: {
      color: colors.darkRed,
      fontSize: 61,
      lineHeight: 66,
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center'
    },
    documentaryTitle: {
      color: colors.white,
      fontSize: normalize(14)
    },
    titleLabelStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontSize: isTab ? 20 : 16,
      lineHeight: isTab ? 32 : 28,
      textAlign: 'left',
      paddingTop: 8,
      paddingBottom: isTab ? 0 : 8,
      color: theme.primaryBlack
    },
    containerStyle: {
      width: isTab? '33.33%' : '100%'
    },
    footerTitleColor: {
      color: theme.footerTextColor
    },
    videoContainerStyle: {
      marginTop: 0
    },
    linearGradient: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    subTitleLabelStyle: {
      color: colors.white,
      fontSize: 25,
      lineHeight: 35,
      fontFamily: fonts.Effra_Arbc_Regular,
      textAlign: 'center'
    },
    marginHorizontalStyle: {
      marginHorizontal: isTab ? 0.02 * width : 0.04 * width,
    },
    marginStartStyle: {
      marginStart: 0.02 * width,
    },
    marginEndStyle: {
      marginEnd: 0.02 * width, 
    },
    paddingStartStyle: {
      paddingStart: 0.02 * width,
    },
    paddingHorizontalStyle: {
      paddingHorizontal: isTab ? 0.02 * width : 0.04 * width,
    },
    paddingEndStyle: {
      marginEnd: 0.02 * width, 
    },
    shareContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: normalize(10),
      marginBottom: normalize(20),
    },
    shareStyle: {
      color: colors.greenishBlue,
      fontSize: 16,
      lineHeight: 24,
      fontFamily: fonts.AwsatDigitalV2_Bold,
      textAlign: 'right',
      marginStart: 8,
    },
    centerStyle: {
      alignSelf: 'center'
    },
    titleHeight: {
      height: 105
    }
  });

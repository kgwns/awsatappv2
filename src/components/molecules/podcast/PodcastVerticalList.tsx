import React from 'react';
import {StyleSheet, View } from 'react-native';
import {normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ButtonImage, Label, Image} from 'src/components/atoms';
import {CustomThemeType, colors} from 'src/shared/styles/colors';
import PlayIcon from 'src/assets/images/icons/play_icon.svg';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {decodeHTMLTags, getPodcastDate, getSecondsToHms, isNotEmpty} from 'src/shared/utils/utilities';
import { fonts } from 'src/shared/styles/fonts';
import FixedTouchable from 'src/shared/utils/FixedTouchable';

export interface PodcastVerticalListProps {
  nid: string;
  imageUrl?: string;
  testID?: string;
  title?: string;
  description?: string;
  footerLeft?: number;
  footerRight?: string;
  secondaryTitle?: string;
  author?: string;
  itemOnPress?: ()=> void;
  hideDescription?: boolean;
  isBookmarked: boolean,
  onPressBookmark: () => void
}

export const PodcastVerticalList = ({
  imageUrl,
  title,
  description,
  itemOnPress,
  testID,
  footerLeft,
  footerRight,
  hideDescription=false,
  isBookmarked = false,
  onPressBookmark
}: PodcastVerticalListProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  return (
    <FixedTouchable testID={testID} accessibilityLabel={testID} onPress={itemOnPress} >
      <View style={style.cardContainer}>
        <View style={style.headerStyle}>
          <View style={style.headerLeftStyle}>
            <Image fallback resizeMode='cover' url={imageUrl} style={style.imageStyle} />
            <Label style={style.title} numberOfLines={2}>
              {title}
            </Label>
          </View>
          <View style={style.headerRightStyle}>
            <PlayIcon />
          </View>
        </View>
        {!hideDescription&&<Label style={style.description} numberOfLines={2}>
          {isNotEmpty(description) ? decodeHTMLTags(description) : ''}
        </Label>}
        <View style={[style.headerStyle,hideDescription&&style.spaceStyle]}>
          <View style={style.headerLeftStyle}>
            <Label style={style.footerRightTextStyle} numberOfLines={1}>
              {getPodcastDate(footerRight)}
            </Label>
            {footerRight && footerLeft &&<Label style={{fontSize:12}} color={colors.spanishGray}>|</Label>}
            <Label style={style.footerLeftTextStyle} numberOfLines={1}>
              {getSecondsToHms(footerLeft)}
            </Label>
          </View>
          <View style={style.headerRightStyle}>
            <ButtonImage
              testId={'bookMarkTestId_podcast_episode'}
              icon={() => {
                return getSvgImages({
                      name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookMarkSVG,
                      width: 11,
                      height: 16
                    })
              }}
              onPress={onPressBookmark}
            />
          </View>
        </View>
      </View>
    </FixedTouchable>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const PodcastCardStyle = StyleSheet.create({
    cardContainer: {
      flex:1,
      backgroundColor: theme.podcastEpisodeCardColor,
      padding: normalize(15),
    },
    headerStyle: {
      flexDirection: 'row',
    },
    headerLeftStyle: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    headerRightStyle: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    imageStyle: {
      width: normalize(36),
      height: normalize(36)
    },
    title: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
      color: theme.primaryBlack,
      marginLeft: normalize(10),
      textAlign: 'left',
    },
    footerLeftTextStyle: {
      fontSize: 12,
      lineHeight: 28,
      color: colors.spanishGray,
      marginLeft: normalize(5),
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
    },
    footerRightTextStyle: {
      fontSize: 12,
      lineHeight: 20,
      color: colors.greenishBlue,
      marginRight: normalize(5),
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
    },
    description: {
      fontSize: 13,
      lineHeight: 21,
      color: colors.spanishGray,
      paddingVertical: normalize(15),
      textAlign: 'left',
    },
    spaceStyle: {
      marginTop: normalize(20),
    }
  });
  return PodcastCardStyle;
};

export default PodcastVerticalList;



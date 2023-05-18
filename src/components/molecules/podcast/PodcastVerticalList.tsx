import React, { useCallback, useEffect, useState } from 'react';
import {StyleSheet, View } from 'react-native';
import {isTab, normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ButtonImage} from 'src/components/atoms/button-image/ButtonImage';
import {Image} from 'src/components/atoms/image/Image';
import { Label } from 'src/components/atoms/label/Label';
import {CustomThemeType, colors} from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {decodeHTMLTags, convertSecondsToHMS, isNotEmpty, isObjectNonEmpty, getDay} from 'src/shared/utils/utilities';
import { fonts } from 'src/shared/styles/fonts';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService';

export interface PodcastVerticalListProps {
  nid: string;
  imageUrl?: string;
  testID?: string;
  title?: string;
  description?: string;
  footerLeft?: number;
  footerRight?: string;
  spreakerId?: string;
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
  spreakerId,
  hideDescription=false,
  isBookmarked = false,
  onPressBookmark
}: PodcastVerticalListProps) => {
  const style = useThemeAwareObject(customStyle);
  const [duration, setDuration] = useState<any>(null)
  const [isTitleLineCount, setIsTitleLineCount] = useState(1)

  useEffect(() => {
    setDuration(null);
    getPodcastDuration()
  }, [spreakerId])

  const onTextLayout = useCallback((e) => {
    setIsTitleLineCount(e.nativeEvent.lines ? e.nativeEvent.lines.length : 1)
  }, []);

  const getPodcastDuration = async () => {
    if(isNotEmpty(spreakerId)){
      try {
        const response: any = await fetchSingleEpisodeSpreakerApi({ episodeId: spreakerId })
        if (isObjectNonEmpty(response.response) && isObjectNonEmpty(response.response.episode)) {
          const episode = response.response.episode
          setDuration(Math.round(episode.duration / 1000))
        }
      }catch(error){
        console.log(error)
      }
    }
  }
  
  return (
    <FixedTouchable testID={testID} accessibilityLabel={testID} onPress={itemOnPress} >
      <View style={style.cardContainer}>
        <View style={[style.headerStyle, isTitleLineCount > 2 && style.headerTitleStyle]}>
          <View style={[style.headerLeftStyle, isTitleLineCount > 2 && style.headerTitleStyle]}>
            <View style={isTab ? style.tabImageContainerStyle : style.imageContainerStyle}> 
              <Image fallback resizeMode='cover' url={imageUrl} style={style.imageStyle} />
            </View>
            <View style = {style.titleContainer}>
              <Label testID='PodcastVerticalList01' style={style.title} onTextLayout={onTextLayout}>
                {title}
              </Label>
            </View>
          </View>
          {/* Removed Play Icon as per AMAR-1052
          <View style={style.headerRightStyle}>
            <PlayIcon />
          </View> */}
        </View>
        {!hideDescription&&<Label style={style.description} numberOfLines={2}>
          {isNotEmpty(description) ? decodeHTMLTags(description) : ''}
        </Label>}
        <View style={[style.headerStyle,hideDescription&&style.spaceStyle]}>
          <View style={style.headerLeftStyle}>
            <Label style={style.footerRightTextStyle} numberOfLines={1}>
              {getDay(footerRight)}
            </Label>
            {footerRight && spreakerId &&<Label style={style.footerRightLabelStyle} color={colors.spanishGray}>|</Label>}
            {spreakerId && <Label style={style.footerLeftTextStyle} numberOfLines={1}>
              {convertSecondsToHMS(duration)}
            </Label>}
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
  return StyleSheet.create({
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
    imageContainerStyle: {
      width: normalize(36),
      height: normalize(36),
      alignItems: 'center',
    },
    tabImageContainerStyle: {
      width: 56,
      height: 56,
      alignItems: 'center',
    },
    imageStyle: {
      width: '100%',
      height: '100%'
    },
    title: {
      fontSize: isTab ? 20 : 14,
      lineHeight: isTab ? 32 : 18,
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.primaryBlack,
      marginLeft: normalize(10),
      textAlign: 'left',
    },
    footerLeftTextStyle: {
      fontSize: 12,
      lineHeight: 28,
      color: colors.spanishGray,
      marginLeft: normalize(5),
      fontFamily: fonts.AwsatDigital_Regular,
    },
    footerRightTextStyle: {
      fontSize: 12,
      lineHeight: 20,
      color: colors.greenishBlue,
      marginRight: normalize(5),
      fontFamily: fonts.AwsatDigital_Regular,
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
    },
    headerTitleStyle: {
      alignItems: 'flex-start'
    },
    footerRightLabelStyle: {
      fontSize:12
    },
    titleContainer: {
     flex:1
    }
  });
};

export default PodcastVerticalList;

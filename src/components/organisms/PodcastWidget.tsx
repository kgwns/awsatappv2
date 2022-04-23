import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonImage, Image, Label } from '../atoms';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { ImagesName } from 'src/shared/styles';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ALL_EPISODES, PODCAST_LISTEN_TEXT } from 'src/constants/SharedConstants'
import { decodeHTMLTags, getSecondsToHms } from 'src/shared/utils/utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface PodcastWidgetProps {
  onPress: () => void;
  data: any;
}

const PodcastWidget: FunctionComponent<PodcastWidgetProps> = ({
  data,
  onPress,
}) => {
  const {themeData} = useTheme();
  const style = useThemeAwareObject(createStyles);
  const podcastData = data[0];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={isTab ? style.tabContainer : style.container}>
        <View style={style.bodyContainer}>
          <Label
            color={themeData.primaryBlack}
            style={isTab ? style.tabPodcastTitle : style.podcastTitle}
            children={podcastData?.title}
            numberOfLines={1}
          />
          {isTab && <Label
            color={themeData.secondaryDavyGrey}
            style={style.podcastDescription}
            children={decodeHTMLTags(podcastData?.body_export)}
            numberOfLines={2}
          />}
          <View style={isTab ? style.tabDurationContainer : style.durationContainer}>
            <Label
              color={colors.greenishBlue}
              children={PODCAST_LISTEN_TEXT}
              style={style.authorTitle}
              numberOfLines={1}
            />
            <ButtonImage
              icon={() => {
                return getSvgImages({
                  name: ImagesName.playIconSVG,
                  size: normalize(13),
                });
              }}
              onPress={onPress}
              style={style.playIcon}
            />
            <Label
              color={colors.spanishGray}
              children={getSecondsToHms(podcastData?.field_total_duration_export)}
              style={style.duration}
            />
          </View>
        </View>
        <View style={isTab ? style.tabpodcastImageContainer : style.podcastImageContainer}>
          <Image
            fallback
            resizeMode="stretch"
            url={podcastData?.field_podcast_sect_export?.img_podcast_mobile}
            style={style.podcastImage}
          />
          {isTab &&
            <View style={style.allEpisodeContainer}>
              <Label
                color={themeData.primaryBlack}
                children={ALL_EPISODES}
                style={style.allEpisodeTitle}
                numberOfLines={1}
              />
              {getSvgImages({
                name: ImagesName.arrowLeftFacedBlack,
                size: normalize(7),
                style: { marginLeft: normalize(5) },
              })
              }
            </View>
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: CustomThemeType) => {
  const podcastWidgetStyle = StyleSheet.create({
    container: {
      marginHorizontal: isTab ? 0 : 0.04 * screenWidth,
      marginTop: normalize(28),
      marginBottom: normalize(25),
      backgroundColor: theme.secondaryGreen,
      flexDirection: 'row',
      height: normalize(71),
      alignContent: 'center',
    },
    tabContainer: {
      backgroundColor: theme.secondaryGreen,
      flexDirection: 'row',
      height: normalize(140),
      padding: normalize(15)
    },
    podcastImageContainer: {
      width: '25%',
    },
    tabpodcastImageContainer: {
      width: '25%',
      height: '70%',
    },
    podcastImage: {
      width: '100%',
      height: '100%',
    },
    bodyContainer: {
      overflow: 'hidden',
      width: '75%',
    },
    podcastTitle: {
      marginTop: normalize(10),
      marginBottom: normalize(8),
      alignSelf: 'flex-start',
      marginLeft: normalize(7),
      fontSize: normalize(15),
      lineHeight: normalize(25),
      fontWeight: 'bold',
    },
    tabPodcastTitle: {
      marginBottom: normalize(8),
      fontSize: normalize(15),
      lineHeight: normalize(25),
      fontWeight: 'bold',
      marginRight: 2,
    },
    podcastDescription: {
      alignSelf: 'flex-start',
      marginRight: normalize(5),
      fontSize: normalize(13),
      lineHeight: normalize(22),
    },
    durationContainer: {
      width: '75%',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginTop: normalize(5),
    },
    tabDurationContainer: {
      width: '75%',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginTop: normalize(14),
    },
    authorTitle: {
      marginLeft: isTab ? 0 : normalize(10),
      fontSize: normalize(12),
      fontWeight: 'bold',
    },
    allEpisodeContainer:{
      marginTop: normalize(14),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    allEpisodeTitle: {
      fontSize: normalize(12),
      lineHeight: normalize(15),
      fontWeight: 'bold',
    },
    playIcon: {
      width: normalize(13),
      height: normalize(13),
      marginLeft: normalize(19),
    },
    duration: {
      marginLeft: normalize(19),
      fontSize: normalize(12),
      lineHeight: normalize(14),
    },
  });
  return podcastWidgetStyle;
};

export default PodcastWidget;

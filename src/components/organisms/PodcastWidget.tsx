import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image as RNImage } from 'react-native';
import { ButtonImage, ButtonOutline, Image, Label, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { ImagesName, Styles } from 'src/shared/styles';
import { isIOS, isTab, normalize, screenWidth } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { decodeHTMLTags, convertSecondsToHMS, isNonEmptyArray, isNotEmpty, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { fonts } from 'src/shared/styles/fonts';
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService';
import PlayIcon from 'src/assets/images/icons/Play_black.svg';
import { useAppPlayer } from 'src/hooks';
import { usePlaybackState, State } from 'react-native-track-player';
import { images } from 'src/shared/styles/images';

export interface PodcastWidgetProps {
  onPress: (podcastData: any) => void;
  data: any;
  onMorePress: () => void;
}

type podCastType = {
  podcastData: any,
  index: number
}

const PodcastWidget: FunctionComponent<PodcastWidgetProps> = ({
  data,
  onPress,
  onMorePress,
}) => {
  const { selectedTrack } = useAppPlayer()
  const playbackState = usePlaybackState();
  const { themeData } = useTheme();
  const style = useThemeAwareObject(createStyles);
  const [episodeData, setEpisodeData] = useState<any>([])
  const [prevPlayBackState, setPrevPlayBackState] = useState<State | null>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const PODCAST_HOME_LISTEN_TO_PODCAST = TranslateConstants({key:TranslateKey.PODCAST_HOME_LISTEN_TO_PODCAST})
  const PODCAST_EPISODE_LISTEN_TO_EPISODE = TranslateConstants({key:TranslateKey.PODCAST_EPISODE_LISTEN_TO_EPISODE})
  const PODCAST_WIDGET_HEADER_LEFT = TranslateConstants({key:TranslateKey.PODCAST_WIDGET_HEADER_LEFT})
  const PODCAST_WIDGET_HEADER_RIGHT = TranslateConstants({key:TranslateKey.PODCAST_WIDGET_HEADER_RIGHT})

  useEffect(() => {
    getPodcastDuration()
  }, [])

  useEffect(() => {
    if (prevPlayBackState === State.Playing && playbackState === State.Buffering) {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
    }
    setPrevPlayBackState(playbackState);
  }, [playbackState])

  const getPodcastDuration = async () => {
    if (isNonEmptyArray(data)) {
      const podcastData = [...data]
      for (let i = 0; i <= data.length - 1; i++) {
        if (isNotEmpty(data[i].field_spreaker_episode_export)) {
          try {
            const response: any = await fetchSingleEpisodeSpreakerApi({ episodeId: data[i].field_spreaker_episode_export })
            if (isObjectNonEmpty(response.response) && isObjectNonEmpty(response.response.episode)) {
              const episode = response.response.episode
              data[i].duration = Math.floor(episode.duration / 1000);
            }
          } catch (error) {
            data[i].duration = null
          }
        }
      }
      setEpisodeData(podcastData)
    }
  }

  const widgetHeaderData: WidgetHeaderProps = {
    headerLeft: {
      title:PODCAST_WIDGET_HEADER_LEFT,
      color: themeData.primaryBlack,
      labelType: LabelTypeProp.title3,
      textStyle: isTab ? style.tabHeaderTextStyle : { fontFamily: fonts.AwsatDigital_Black }
    },
    headerRight: {
      title:PODCAST_WIDGET_HEADER_RIGHT,
      icon: () => {
        return getSvgImages({
          name: ImagesName.arrowLeftFaced,
          size: normalize(12),
          style: { marginLeft: normalize(10) }
        })
      },
      color: Styles.color.smokeyGrey,
      labelType: LabelTypeProp.h3,
      clickable: true,
      textStyle: { fontFamily: fonts.Effra_Arbc_Regular }
    },
  };


  const ListenToPodcast = ({ podcastData, index }: podCastType) => (
    <TouchableOpacity style={style.listenContainer}
      activeOpacity={0.8} onPress={() => onPress(podcastData)} testID = {"podcastId"}>
      <ButtonImage
        icon={() => {
          return getSvgImages({
            name: ImagesName.headPhoneIcon,
            size: 15,
          });
        }}
        onPress={() => onPress(podcastData)}
        style={style.headPhoneIconMargin}
      />
      <Label
        style={style.listenToPodcastTitle}
        color={themeData.primary}
        children={PODCAST_HOME_LISTEN_TO_PODCAST}
      />
      <Label
        color={colors.spanishGray}
        children={convertSecondsToHMS(episodeData[index]?.duration)}
        style={style.duration}
        numberOfLines={1}
      />
    </TouchableOpacity>
  )
  
  // Enable when required Podcast List data which is displayed in Tab
  /* const AllEpisodesCard = () => (
    <View style={style.allEpisodeContainer}>
      <Label
        numberOfLines={1}
        color={themeData.primaryBlack}
        style={style.allEpisodeTitle}
        children={t('podcastHome.allEpisodes')}
      />
      <View style={style.leftArrowContainer}>
        <ButtonImage
          icon={() => {
            return getSvgImages({
              name: ImagesName.arrowLeftFacedBlack,
              width: 7,
              height: 9,
            });
          }}
          onPress={onPress}
          style={style.leftArrow}
        />
      </View>
    </View>
  )*/

  const playPauseIcon = (podcastData: any) => (
    <View style={style.rightIconStyle}>
      {selectedTrack && selectedTrack.id === podcastData.nid && playbackState === State.Playing || isBuffering ?
        <RNImage source={images.pauseIconWhite} /> :
        <PlayIcon fill={colors.white} />
      }
    </View>
  )

  const onPressPodcast = () => {
    onPress(episodeData[0]);
  }

  const renderListenToArticleButton = (podcastData: any) => (
    <TouchableOpacity onPress={() => onPressPodcast()} testID='listenToArticleButtonHome'>
      <View style={style.buttonContainer}>
        <View style={style.iconContainer}>
          {playPauseIcon(podcastData)}
        </View>
        <Label color={Styles.color.white} style={[isTab ? style.tabTextStyle : style.buttonLabel]} labelType={LabelTypeProp.h1}>
          {PODCAST_EPISODE_LISTEN_TO_EPISODE}
        </Label>
      </View>
    </TouchableOpacity>
  )

  const renderMobile = (podcastData: any, index: number) => {
    if (!isObjectNonEmpty(podcastData)) {
      return null;
    }
    const bodyInfo = isNotEmpty(podcastData?.body_export) ? 
      podcastData?.body_export : 
      isNotEmpty(podcastData.field_podcast_sect_export.description) ? 
      podcastData.field_podcast_sect_export.description : ''
    const description = decodeHTMLTags(bodyInfo)
    return (
      <>
        <View style={isTab ? style.tabWidgetHeaderContainer : style.widgetHeaderContainer}>
          <WidgetHeader {...widgetHeaderData} onPress={onMorePress} />
        </View>
        <View style={style.podcastMobileContainer}>
          <View style={style.podcastAlbumContainer}>
            <Image
              fallback
              resizeMode="cover"
              url={podcastData?.field_podcast_sect_export?.image}
              style={style.image}
            />
          </View>
          <View style={style.podcastTextContainer}>
            <Label
              color={colors.white}
              style={style.mobileTitle}
              children={podcastData?.title}
            />
            <Label
              color={colors.white}
              style={style.mobileBody}
              children={description}
            />
          </View>
          {renderListenToArticleButton(podcastData)}
          
        </View>
      </>
    )
  }
  // Enable when required Podcast List data which is displayed in Tab
  // const renderPodcastItem = (podcastData: any, index: number) => {
  //   if (!isObjectNonEmpty(podcastData)) {
  //     return null;
  //   }
  //   const bodyInfo = isNotEmpty(podcastData?.body_export) ? 
  //     podcastData?.body_export : isNotEmpty(podcastData.field_podcast_sect_export.description) ? 
  //     podcastData.field_podcast_sect_export.description : ''
  //   const description = decodeHTMLTags(bodyInfo)
  //   return (
  //     <View style={style.podcastContainer}>
  //         <View style={style.podcastItemContainer}>
  //           <View style={style.podcastContentContainer}>
  //             <Label
  //               color={themeData.primary}
  //               style={style.title}
  //               children={podcastData?.title}
  //             />
  //             <Label
  //               color={themeData.secondaryDavyGrey}
  //               style={style.body}
  //               children={description}
  //               numberOfLines={2}
  //             />
  //           </View>
  //           <View style={style.podcastImageContainer}>
  //             <View style={style.imageWrapper}>
  //               <Image
  //                 fallback
  //                 resizeMode="stretch"
  //                 url={podcastData?.field_podcast_sect_export?.image}
  //                 style={style.image}
  //               />
  //             </View>
  //           </View>
  //         </View>
  //         <View style={style.podcastBottomContainer}>
  //           <View style={style.listenCardContainer}>
  //             <ListenToPodcast podcastData={podcastData} index={index} />
  //           </View>
  //           <View style={style.labelContainer}>
  //             {/* <AllEpisodesCard/> enable when list of episodes available */}
  //           </View>
  //         </View>
  //     </View>
  //   )
  // }

  // const tabletData = isNonEmptyArray(episodeData) && (episodeData.length > 2) ? episodeData.slice(0, 2) : episodeData
  // const renderTablet = () => (
  //   <View style={style.tabletContainer}>
  //     <FlatList
  //       data={tabletData}
  //       numColumns={2}
  //       style={style.flatList}
  //       listKey={flatListUniqueKey.TAB_PODCAST_HOME}
  //       keyExtractor={(_, index) => index.toString()}
  //       renderItem={({ item, index }) => renderPodcastItem(item, index)}
  //     />
  //   </View>
  // )

  const podcastMobileData = isNonEmptyArray(episodeData) ? data[0] : {};

  // Enable when required
  // return isTab ? renderTablet() : renderMobile(podcastMobileData, 0)
  return renderMobile(podcastMobileData, 0)
};

const createStyles = (theme: CustomThemeType) => {
  return StyleSheet.create({
    title: {
      textAlign: 'left',
      fontSize: 16,
      lineHeight: 24,
      fontFamily: fonts.AwsatDigital_Bold,
    },
    mobileTitle: {
      textAlign: 'center',
      fontSize: isTab ? 25 : 27,
      lineHeight: 36,
      fontFamily: isTab ? fonts.AwsatDigital_Black : fonts.AwsatDigital_Bold,
    },
    body: {
      textAlign: 'left',
      fontSize: isTab ? 14 : 13,
      lineHeight: 24,
      fontFamily: fonts.Effra_Regular,
    },
    mobileBody: {
      textAlign: 'center',
      fontSize: isTab ? 16 : 14,
      lineHeight: isTab ? 24 : isIOS ? 20 : 24,
      fontFamily: isTab ? fonts.Effra_Arbc_Regular : fonts.Effra_Regular,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    headPhoneIconMargin: {
      marginRight: 10,
    },
    listenContainer: {
      flexDirection: 'row',
      alignContent: 'center',
    },
    listenToPodcastTitle: {
      fontSize: isTab ? 14 : 13,
      lineHeight: 19,
      fontFamily: fonts.AwsatDigital_Bold,
    },
    duration: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: fonts.IBMPlexSansArabic_Medium,
      marginLeft: 5
    },
    allEpisodeContainer: {
      flexDirection: 'row',
    },
    allEpisodeTitle: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily: fonts.Effra_Arbc_Medium
    },
    leftArrowContainer: {
      marginStart: 5,
      marginTop: 2,
    },
    leftArrow: {
      marginRight: 5
    },
    podcastContainer: {
      padding: 20,
      backgroundColor: theme.secondaryGreen,
    },
    podcastItemContainer: {
      flexDirection: 'row'
    },
    podcastContentContainer: {
      width: '70%',
      paddingEnd: normalize(5)
    },
    podcastImageContainer: {
      width: '30%',
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
    },
    imageWrapper: {
      height: isTab ? normalize(70) : 73,
      width: isTab ? normalize(90) : 92
    },
    podcastBottomContainer: {
      flexDirection: 'row',
      marginTop: normalize(15),
    },
    listenCardContainer: {
      width: '70%',
      paddingEnd: normalize(10)
    },
    labelContainer: {
      width: '30%',
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
    },
    tabletContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.mainBackground,
      paddingHorizontal: 20
    },
    flatList: {
      width: '50%'
    },
    buttonLabel: {
      color: colors.white,
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: 14,
      lineHeight: 46,
      marginLeft: 3
    },
    tabTextStyle: {
      fontSize: 16,
      lineHeight: 46,
      fontFamily:fonts.AwsatDigital_Bold,
      fontWeight:'700'
    },
    rightIconStyle: {
      paddingRight: normalize(15),
    },
    widgetHeaderContainer: {
      paddingHorizontal: 0.04 * screenWidth,
      paddingBottom: normalize(10),
      paddingTop: normalize(15),
    },
    tabWidgetHeaderContainer: {
      paddingBottom: 10,
      paddingTop: 15,
    },
    podcastMobileContainer: {
      backgroundColor: colors.limeGreen,
      alignItems: 'center',
      paddingBottom: 40
    },
    podcastAlbumContainer: {
      width: 166,
      height: 158,
      marginVertical: 30,
    },
    podcastTextContainer: {
      paddingHorizontal: 0.06 * screenWidth
    },
    tabHeaderTextStyle: { 
      fontFamily: fonts.AwsatDigital_Black, 
      fontSize: 25, 
      lineHeight: 36
    },
    buttonContainer: {
      marginTop: 30,
      height: 46,
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 25,
      paddingHorizontal: 25,
      backgroundColor: colors.black,
    },
    iconContainer: {
      height: '100%',
      justifyContent: 'center'
    }
  });
};

export default PodcastWidget;

import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, } from 'react-native';
import { ScreenContainer } from '..';
import { PodcastProgramHeader } from 'src/components/molecules';
import Share from 'react-native-share';
import { PodcastEpisodeContent, PodcastEpisodeInfo } from 'src/components/organisms';
import { CustomThemeType, colors } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { normalize, horizontalAndBottomEdge, isIOS, isNonEmptyArray, recordLogEvent, isTab, screenWidth, podcastShareEvents, EventsValue } from 'src/shared/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppPlayer, useBookmark, useLogin, usePodcast } from 'src/hooks';
import { PodcastEpisodeBodyGet, PodcastListItemType } from 'src/redux/podcast/types';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TrackPlayer, { State, usePlaybackState, } from 'react-native-track-player';
import { decodeHTMLTags, getPodcastUrl, isNotEmpty, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { Styles } from 'src/shared/styles';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService';
import { AnalyticsEvents, EventParameterProps } from 'src/shared/utils/analytics';

export interface PodcastEpisodeProps {
  route: any
}

export const podcastEpisodeInitialData = {
  nid: '',
  title: '',
  field_new_sub_title_export: '',
  field_podcast_sect_export: {
    img_podcast_mobile: '',
    anghami: {
      url: '',
    },
    apple_podcasts: {
      url: '',
    },
    google_podcast: {
      url: '',
    },
    spotify: {
      url: '',
    },
  },
  field_announcer_name_export: '',
  field_total_duration_export: 0,
  field_spreaker_episode_export:'',
  body_export: '',
  created_export: '',
}

export const PodcastEpisode = ({ route }: PodcastEpisodeProps) => {

  const navigation = useNavigation();
  const styles = useThemeAwareObject(createStyles);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const flatListRef = useRef<FlatList>(null);
  const initialRef = useRef(0);
  const [nid, setEpisode] = useState(route.params.data.nid)
  const podcastListData = route.params.podcastListData
  const { isLoading, podcastEpisodeData, fetchPodcastEpisodeRequest } = usePodcast()

  const playbackState = usePlaybackState();
  const payload: PodcastEpisodeBodyGet = {
    nid: nid
  }

  const { setShowMiniPlayer, setPlayerTrack, showMiniPlayer, selectedTrack: trackData } = useAppPlayer()

  useEffect(() => {
    fetchPodcastEpisodeRequest(payload)
  }, [])

  useEffect(() => {
    if (!isFocused) {
      initialRef.current = 0;
    }
  }, [isFocused])

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo,
    validateBookmark,
  } = useBookmark()
  const { isLoggedIn } = useLogin()

  useEffect(() => {
    updatePodcastListData()
  }, [podcastListData, bookmarkIdInfo])

  const updatePodcastListData = () => {
    if (!isNonEmptyArray(podcastListData)) {
      return
    }
    const podcastListDataInfo = podcastListData.map((item: any) => {
      return {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    })
    setPodcastEpisodeListInfo(podcastListDataInfo)
  }



  useEffect(() => {
    updatePodcastEpisodeData()
  }, [podcastEpisodeData, bookmarkIdInfo])

  const updatePodcastEpisodeData = () => {
    if (!isNonEmptyArray(podcastEpisodeData)) {
      return
    }
    const podcastEpisodeDetail = podcastEpisodeData.map((item: any) => {
      return {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    })
    setPodcastEpisodeDetailInfo(podcastEpisodeDetail)
  }

  const [showupUp, setShowPopUp] = useState(false)
  const [podcastEpisodeListInfo, setPodcastEpisodeListInfo] = useState<PodcastListItemType[]>(podcastListData)
  const [podcastEpisodeDetailInfo, setPodcastEpisodeDetailInfo] = useState<PodcastListItemType[]>(podcastEpisodeData)


  const updateBookmarkInfo = (nid: string, isBookmarked: boolean, eventParameter: EventParameterProps) => {
    if (isLoggedIn) {
      if (isBookmarked) {
        recordLogEvent(AnalyticsEvents.ARTICLE_SAVE, eventParameter)
        sendBookmarkInfo({ nid, bundle: PopulateWidgetType.PODCAST })
      } else {
        recordLogEvent(AnalyticsEvents.ARTICLE_UNSAVE, eventParameter)
        removeBookmarkedInfo({ nid })
      }
    } else {
      setShowPopUp(true)
    }
  }

  const onPressSaveEpisodeDetail = () => {
    const data = [...podcastEpisodeDetailInfo]
    const index = data.findIndex((podcastData) => podcastData.nid === nid)
    const podcastItem = data[index]
    const newBookmarked = !podcastItem.isBookmarked
    data[index].isBookmarked = newBookmarked
    setPodcastEpisodeDetailInfo(data)
    const { title,body_export, type} = podcastItem;
    const decodeBody = decodeHTMLTags(body_export);
    const eventParameter = {
        content_type: type,
        article_name: title,
        article_category: type,
        article_length: decodeBody.split(' ').length
      }
    updateBookmarkInfo(podcastItem.nid, newBookmarked, eventParameter)
  }

  const onPressSaveEpisodeList = (nidProps: string) => {
    const data = [...podcastEpisodeListInfo]
    const index = data.findIndex((item)=>item.nid===nidProps)
    if (index > -1) {
      const item = data[index]
      const newBookmarked = !item.isBookmarked
      data[index].isBookmarked = newBookmarked
      setPodcastEpisodeListInfo(data);
      const { title,body_export, type} = data[index];
      const decodeBody = decodeHTMLTags(body_export);
      const eventParameter = {
          content_type: type,
          article_name: title,
          article_category: type,
          article_length: decodeBody.split(' ').length
        }
      updateBookmarkInfo(item.nid, newBookmarked,eventParameter)
    }
  }

  const onPressEpisodeListBookmark = (nidProps: string) => {
    isLoggedIn ? onPressSaveEpisodeList(nidProps) : makeSignUpAlert()
  }

  const onPressEpisodeBookmark = () => {
    isLoggedIn ? onPressSaveEpisodeDetail() : makeSignUpAlert()
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const makeSignUpAlert = () => {
    setShowPopUp(true)
  }

  const episodeIndex = podcastEpisodeDetailInfo.findIndex((item: any) => item.nid === nid);
  const podcastEpisodeInfo = podcastEpisodeDetailInfo ? podcastEpisodeDetailInfo[episodeIndex] : podcastEpisodeInitialData
  const otherPodcast = podcastEpisodeListInfo.filter((item: any) => item.nid !== nid);

  const onPressShare = async () => {
    const decodeBody = decodeHTMLTags(podcastEpisodeInfo.body_export);
    const type = EventsValue.podcast;
    const eventName = AnalyticsEvents.SOCIAL_SHARE;
    podcastShareEvents(type,podcastEpisodeInfo.title,decodeBody,eventName);
    await Share.open({
      title: podcastEpisodeInfo.title,
      url: podcastEpisodeInfo.view_node,
      failOnCancel: true,
      subject: podcastEpisodeInfo.title
    }).then(response => {
      console.log('Shared successfully :::', response)
    }).catch((error) => {
      console.log('Cancelled share request :::', error)
    })
  }

  useEffect(() => {
    fetchPodcastEpisodeRequest(payload);
  }, [nid]);

  useEffect(() => {
    if(initialRef.current < 3){
      initialRef.current = initialRef.current + 1;
    }else{
      getPodcastDuration(podcastEpisodeInfo);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [podcastEpisodeInfo]);

  const onEpisodeListItemPress = (item: any) => {
    setEpisode(item.nid);
  }

  const getPodcastDuration = async (item: any) => {
    if(isNotEmpty(item.field_spreaker_episode_export)){
      try {
        const response: any = await fetchSingleEpisodeSpreakerApi({ episodeId: item.field_spreaker_episode_export })
        if (isObjectNonEmpty(response.response) && isObjectNonEmpty(response.response.episode)) {
          const episode = response.response.episode;
          const duration = Math.floor(episode.duration / 1000);
          onListenPress(duration);
        }
      }catch(error){
        console.log(error)
        onListenPress(0);
      }
    }
  }

  const onListenPress = async (duration: any) => {
    if(isObjectNonEmpty(podcastEpisodeInfo)){
      const trackPlayerData = {
        id: podcastEpisodeInfo.nid,
        url: getPodcastUrl(podcastEpisodeInfo.field_spreaker_episode_export as string),
        title: podcastEpisodeInfo.title,
        duration: duration,
        artist: podcastEpisodeInfo.title,
        artwork: podcastEpisodeInfo?.field_podcast_sect_export?.image
      }
      recordLogEvent(AnalyticsEvents.PLAYED_PODCAST, {podcastid: podcastEpisodeInfo.nid });
      if((trackData && trackData.id !== trackPlayerData.id) || trackData == null ) {
        setPlayerTrack(trackPlayerData);
      }
      !showMiniPlayer && setShowMiniPlayer(true);
      showMiniPlayer && playbackState === State.Playing ? TrackPlayer.pause() : TrackPlayer.play();
    }
  } 

  const onGoBack = () => {
    navigation.goBack()
  }
  
  const renderItem = () => (
    <View >
      <View style={styles.headerStyle}>
        <PodcastProgramHeader
          headerShareIconTestId={'podcast_episode_share'}
          headerBookmarkIconTestId={'podcast_episode_save'}
          headerBackIconTestId={'podcast_episode_back'}
          onPressShare={onPressShare}
          onGoBack={onGoBack}
          onPressSave={onPressEpisodeBookmark}
          isSaved={podcastEpisodeInfo ? podcastEpisodeInfo.isBookmarked ?? false : false}
        />
        <PodcastEpisodeInfo data={podcastEpisodeInfo} onListenPress={onListenPress} />
      </View>
      {isNonEmptyArray(otherPodcast) && <View style={styles.container}>
        <PodcastEpisodeContent data={otherPodcast}
          onItemActionPress={onEpisodeListItemPress}
          onPressBookmark={onPressEpisodeListBookmark}
        />
      </View>}
      {/* <MostPlayedSection data={mostPlayedSectionData} /> */}
    </View>
  )
  return (
    <ScreenContainer edge={horizontalAndBottomEdge} barStyle={'light-content'} isLoading={isLoading}
      statusbarColor={Styles.color.codGray}
      isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert}>
      <View style={{ height: insets.top, backgroundColor: colors.black }} />
      <FlatList
        ref={flatListRef}
        style={[styles.episodeList, showMiniPlayer && styles.enhanceMarginForPlayer ]}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />

    </ScreenContainer>
  )
}

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: normalize(15),
      paddingBottom: normalize(15),
      paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
      backgroundColor: theme.backgroundColor,
    },
    headerStyle: {
      backgroundColor: colors.black,
    },
    episodeList: {
      flex: 1,
      height: '100%',
    },
    miniPlayerContainer: {
      width: '100%',
      height: normalize(80),
      position: 'absolute',
      bottom: isIOS ? 25 : 0
    },
    enhanceMarginForPlayer: {
      marginBottom: isIOS ? 50 : 70
    }
  })

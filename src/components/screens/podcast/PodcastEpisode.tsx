import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, BackHandler } from 'react-native';
import { ScreenContainer } from '..';
import { PodCastMiniPlayer, PodcastProgramHeader } from 'src/components/molecules';
import Share from 'react-native-share';
import { PodcastEpisodeContent, PodcastEpisodeInfo } from 'src/components/organisms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { normalize, horizontalAndBottomEdge, isIOS, isNonEmptyArray, recordLogEvent } from 'src/shared/utils';
import { colors } from 'src/shared/styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookmark, useLogin, usePodcast } from 'src/hooks';
import { PodcastEpisodeBodyGet, PodcastListItemType } from 'src/redux/podcast/types';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';
import { getPodcastUrl } from 'src/shared/utils/utilities';
import { Styles } from 'src/shared/styles';

export interface PodcastEpisodeProps {
  route: any
}

export const podcastEpisodeInitialData = {
  nid: '',
  title: '',
  field_new_sub_title_export: '',
  field_podcast_sect_export: {
    img_podcast_mobile: ''
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
  const [nid, setEpisode] = useState(route.params.data.nid)
  const podcastListData = route.params.podcastListData
  const { isLoading, podcastEpisodeData, fetchPodcastEpisodeRequest } = usePodcast()
  const [isPlayerVisible, setPlayerVisibility] = useState(false)
  const playbackState = usePlaybackState();
  const payload: PodcastEpisodeBodyGet = {
    nid: nid
  }

  useEffect(() => {
    fetchPodcastEpisodeRequest(payload)
  }, [])

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()
  const { isLoggedIn } = useLogin()


  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  useEffect(() => {
    updatePodcastListData()
  }, [podcastListData, bookmarkIdInfo])

  const updatePodcastListData = () => {
    if (!isNonEmptyArray(podcastListData)) return
    const podcastListDataInfo = podcastListData.map((item: any) => {
      return {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    })
    setPodcastEpisodeListInfo(podcastListDataInfo)
  }

  useEffect(() => {
    const backAction = () => {
      TrackPlayer.stop();
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    updatePodcastEpisodeData()
  }, [podcastEpisodeData, bookmarkIdInfo])

  const updatePodcastEpisodeData = () => {
    if (!isNonEmptyArray(podcastEpisodeData)) return
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


  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    if (isLoggedIn) {
      isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onPressSaveEpisodeDetail = () => {
    const data = [...podcastEpisodeDetailInfo]
    const index = data.findIndex((item) => item.nid == nid)
    const item = data[index]
    const newBookmarked = !item.isBookmarked
    data[index].isBookmarked = newBookmarked
    setPodcastEpisodeDetailInfo(data)
    updateBookmarkInfo(item.nid, newBookmarked)
  }

  const onPressSaveEpisodeList = (nid: string) => {
    const data = [...podcastEpisodeListInfo]
    const index = data.findIndex((item)=>item.nid===nid)
    if(index>-1){
    const item = data[index]
    const newBookmarked = !item.isBookmarked
    data[index].isBookmarked = newBookmarked
    setPodcastEpisodeListInfo(data)
    updateBookmarkInfo(item.nid, newBookmarked)}
  }

  const onPressEpisodeListBookmark = (nid: string) => {
    isLoggedIn ? onPressSaveEpisodeList(nid) : makeSignUpAlert()
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
  const otherPodcast = podcastEpisodeListInfo.filter((item: any) => item.nid != nid);

  const onPressShare = async () => {
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

  const onEpisodeListItemPress = (item: any) => {
    setEpisode(item.nid)
  }

  const onListenPress = async () => {
    setPlayerVisibility(true)
    if (playbackState == State.Playing) {
      return
    }
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({ stopWithApp: true });
    await TrackPlayer.add({
      id: podcastEpisodeInfo.nid,
      url: getPodcastUrl(podcastEpisodeInfo.field_spreaker_episode_export),
      title: podcastEpisodeInfo.title,
      artist: podcastEpisodeInfo.title,
    });
    recordLogEvent('Played_Podcast', {podcastid: podcastEpisodeInfo.nid });
    await TrackPlayer.play();
  }

  const togglePlayback = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    }
    else if (playbackState === State.Paused) {
      await TrackPlayer.play();
    }
    else if ( playbackState === State.Paused ||  playbackState == State.None || playbackState == State.Stopped) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({ stopWithApp: true });
      await TrackPlayer.add({
        id: podcastEpisodeInfo.nid,
        url: getPodcastUrl(podcastEpisodeInfo.field_spreaker_episode_export),
        title: podcastEpisodeInfo.title,
        artist: podcastEpisodeInfo.title,
      });
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      await TrackPlayer.play();
    }
  };

  const onClose = async () => {
    await TrackPlayer.stop()
    setPlayerVisibility(false)
  }

  const onGoBack = () => {
    navigation.goBack()
    TrackPlayer.stop()
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
        style={styles.episodeList}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      {isPlayerVisible && <View style={styles.miniPlayerContainer}>
        <PodCastMiniPlayer data={podcastEpisodeInfo} onClose={() => onClose()} onPlaybackPress={() => togglePlayback()} />
      </View>}
    </ScreenContainer>
  )
}

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: normalize(15),
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
    }
  })
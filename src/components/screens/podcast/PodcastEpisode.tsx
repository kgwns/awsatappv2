import React, {useState,useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import { ScreenContainer } from '..';
import {PodcastProgramHeader} from 'src/components/molecules';
import Share from 'react-native-share';
import MostPlayedSection from 'src/components/organisms/MostPlayedSection';
import {PodcastEpisodeContent, PodcastEpisodeInfo} from 'src/components/organisms';
import {mostPlayedSectionData, PodcastEpisodeData} from 'src/constants/SampleData';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { normalize, horizontalAndBottomEdge, isNonEmptyArray, isObjectNonEmpty} from 'src/shared/utils';
import { colors } from 'src/shared/styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { usePodcast } from 'src/hooks';
import {PodcastEpisodeBodyGet} from 'src/redux/podcast/types'

export interface PodcastEpisodeProps {
  route: any
}

export const PodcastEpisode = ({route}: PodcastEpisodeProps) => {

  const styles = useThemeAwareObject(createStyles);
  const [isSaved, setIsSaved] = useState(false);
  const insets = useSafeAreaInsets();
  const [nid, setEpisode] = useState(route.params.data.nid)
  const podcastListData = route.params.podcastListData
  const { isLoading, podcastEpisodeData ,fetchPodcastEpisodeRequest } = usePodcast()
  const payload: PodcastEpisodeBodyGet = {
    nid: nid
  }
  useEffect(() => {
    fetchPodcastEpisodeRequest(payload)
  }, [])
  const episodeIndex = podcastEpisodeData.findIndex((item: any) => item.nid === nid);
  const podcastEpisodeInfo = podcastEpisodeData[episodeIndex]
  const otherPodcast = podcastListData.filter((item: any) => item.nid != nid);
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

  const renderItem = () => (
    <View >
      <View style={styles.headerStyle}>
        <PodcastProgramHeader
          headerShareIconTestId={'podcast_episode_share'}
          headerBookmarkIconTestId={'podcast_episode_save'}
          headerBackIconTestId={'podcast_episode_back'}
          onPressShare={onPressShare}
          onPressSave={()=>setIsSaved(!isSaved)}
          isSaved={isSaved}
        />
       {isObjectNonEmpty(podcastEpisodeInfo) && <PodcastEpisodeInfo data={podcastEpisodeInfo}/>}
      </View>
      <View style={styles.container}>
        <PodcastEpisodeContent data={otherPodcast} onItemActionPress={onEpisodeListItemPress} />
      </View>
      {/* <MostPlayedSection data={mostPlayedSectionData} /> */}
    </View>
  )
  return (
    <ScreenContainer edge={horizontalAndBottomEdge} barStyle={'light-content'} isLoading={isLoading}>
      <View style={{height:insets.top,backgroundColor: colors.black}} />
     {isNonEmptyArray(podcastEpisodeData) && <FlatList
        style={styles.episodeList}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />}
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
    height: '100%'
  }
})
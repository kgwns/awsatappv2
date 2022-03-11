import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScreenContainer } from '..';
import { PodcastProgramInfo } from 'src/components/organisms';
import { PodcastVerticalListProps, PodCastMiniPlayer } from 'src/components/molecules';
import { PodcastProgramInfoData } from 'src/constants/SampleData';
import { horizontalEdge, isNonEmptyArray } from 'src/shared/utils';
import { useNavigation } from '@react-navigation/native';
import { ScreensConstants } from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { usePodcast } from 'src/hooks';
import { PodcastListBodyGet } from 'src/redux/podcast/types'
import { Label, LoadingState } from 'src/components/atoms';
import { PodcastEpisodeList } from 'src/components/organisms';
import ArrowUpDown from 'src/assets/images/icons/arrow_up_down.svg';
import { normalize } from 'src/shared/utils';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTranslation } from 'react-i18next';
import { colors } from 'src/shared/styles/colors';

export const PodcastProgram = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const { isLoading, podcastListData, podcastEpisodeData, fetchPodcastListRequest, fetchPodcastEpisodeRequest } = usePodcast()
  const payload: PodcastListBodyGet = {
    tid: 94842 //currently there is only one podcast program
  }
  useEffect(() => {
    fetchPodcastListRequest(payload)
  }, [])
  const styles = useThemeAwareObject(createStyles);
  const [t] = useTranslation();
  const onPressItem = (item: any) => {
    if (item.nid) {
      navigation.navigate(ScreensConstants.PodcastEpisode, { data: item, podcastListData: podcastListData })
    }
  }
  const renderPodcast = () => (
    <>
      <PodcastProgramInfo data={podcastListData[0]} />
      <PodcastEpisodeList data={podcastListData} onItemActionPress={onPressItem} />
    </>
  )
  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isLoading}>
      {isNonEmptyArray(podcastListData) &&
        <FlatList
          style={styles.containerStyle}
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderPodcast}
          showsVerticalScrollIndicator={false}
        />}
    </ScreenContainer>
  )
}

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    containerStyle: {
      flex: 1,
      height: '100%'
    }
  });
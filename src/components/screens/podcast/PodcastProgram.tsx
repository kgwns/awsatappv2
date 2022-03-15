import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScreenContainer } from '..';
import { PodcastProgramInfo } from 'src/components/organisms';
import { horizontalEdge, isNonEmptyArray } from 'src/shared/utils';
import { useNavigation } from '@react-navigation/native';
import { ScreensConstants } from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useBookmark, usePodcast } from 'src/hooks';
import { PodcastListBodyGet, PodcastListItemType } from 'src/redux/podcast/types'
import { PodcastEpisodeList } from 'src/components/organisms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useLogin } from 'src/hooks';

export const PodcastProgram = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const {
    isLoading,
    podcastListData,
    fetchPodcastListRequest
  } = usePodcast()

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
    const podcastListDataInfo = podcastListData.map((item) => {
      return {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    })
    setPodcastEpisodeListInfo(podcastListDataInfo)
  }


  const [showupUp, setShowPopUp] = useState(false)
  const [podcastEpisodeListInfo, setPodcastEpisodeListInfo] = useState<PodcastListItemType[]>(podcastListData)


  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    if (isLoggedIn) {
      isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onPressSave = (index: number) => {
    const data = [...podcastEpisodeListInfo]
    const item = data[index]
    const newBookmarked = !item.isBookmarked
    data[index].isBookmarked = newBookmarked
    setPodcastEpisodeListInfo(data)
    updateBookmarkInfo(item.nid, newBookmarked)
  }

  const checkAndUpdateBookmark = (index: number) => {
    isLoggedIn ? onPressSave(index) : makeSignUpAlert()
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const makeSignUpAlert = () => {
    setShowPopUp(true)
  }

  const payload: PodcastListBodyGet = {
    tid: 94842 //currently there is only one podcast program
  }

  useEffect(() => {
    fetchPodcastListRequest(payload)
  }, [])

  const styles = useThemeAwareObject(createStyles);
  const onPressItem = (item: any) => {
    if (item.nid) {
      navigation.navigate(ScreensConstants.PodcastEpisode, { data: item, podcastListData: podcastEpisodeListInfo })
    }
  }
  const renderPodcast = () => (
    <>
      <PodcastProgramInfo data={podcastListData[0]} />
      <PodcastEpisodeList
        data={podcastEpisodeListInfo}
        onItemActionPress={onPressItem}
        onUpdateBookmark={checkAndUpdateBookmark}
      />
    </>
  )
  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isLoading}
      isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert}>
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
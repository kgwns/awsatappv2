import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, StyleSheet, View } from 'react-native';
import { PodcastEpisodeModal, ScreenContainer } from '..';
import { PodcastProgramInfo } from 'src/components/organisms';
import { horizontalEdge, isIOS, isNonEmptyArray, isTab, screenHeight, screenWidth } from 'src/shared/utils';
import { useBookmark, usePodcast, useAppPlayer } from 'src/hooks';
import { PodcastListBodyGet, PodcastListItemType } from 'src/redux/podcast/types'
import { PodcastEpisodeList } from 'src/components/organisms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useLogin } from 'src/hooks';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';

export const PodcastProgram = React.memo(({ tabIndex, currentIndex }: { tabIndex?: number; currentIndex?: number; }) => {
  const styles = useThemeAwareObject(createStyles);

  const [isShowPlayer, setIsShowPlayer] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const selectedItem = useRef<any>();

  const {
    isLoading,
    podcastListData,
    fetchPodcastListRequest
  } = usePodcast()

  const { showMiniPlayer } = useAppPlayer()

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()
  const { isLoggedIn } = useLogin()


  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const ref = React.useRef(null);
  useEffect(() => {
    if (tabIndex === currentIndex) {
      global.refFlatList = ref;
    }
  }, [currentIndex])


  useEffect(() => {
    updatePodcastListData()
  }, [podcastListData, bookmarkIdInfo])

  useEffect(() => {
    setIsShowPlayer(true)
  }, [])

  const updatePodcastListData = () => {
    if (!isNonEmptyArray(podcastListData)) {
      return
    }
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
      isBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.PODCAST }) : removeBookmarkedInfo({ nid })
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

  const onPressItem = (item: any) => {
    selectedItem.current = item;
    setShowModal(true);
  }

  const episodeModal = () => (
    <Modal visible={true} animationType={'slide'}>
      <View style={{ height: ((isIOS && !isTab) ? 0.95 : 1) * screenHeight }}>
        <PodcastEpisodeModal
          route={{ params: { data: selectedItem.current, podcastListData: podcastEpisodeListInfo } }}
          onPressBack={() => setShowModal(false)}
        />
      </View>
    </Modal>
  )

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
      isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert} showPlayer={isShowPlayer}
      backgroundColor={styles.screenBackgroundColor.backgroundColor}>
      {showModal && episodeModal()}
      {isNonEmptyArray(podcastListData) &&
        <FlatList
          ref={ref}
          onScrollBeginDrag={() => global.refFlatList = ref}
          style={[styles.containerStyle, showMiniPlayer && styles.enhanceMarginForPlayer]}
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderPodcast}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />}
    </ScreenContainer>
  )
})

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    containerStyle: {
      flex: 1,
      height: '100%'
    },
    enhanceMarginForPlayer: {
      marginBottom: isIOS ? 100 : 80
    },
    screenBackgroundColor: {
      backgroundColor: theme.backgroundColor,
    }
  });
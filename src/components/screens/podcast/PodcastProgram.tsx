import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Modal, StyleSheet, View } from 'react-native';
import { PodcastEpisodeModal, ScreenContainer } from '..';
import { PodcastProgramInfo, PodcastEpisodeList } from 'src/components/organisms';
import { decodeHTMLTags, horizontalEdge, isIOS, isNonEmptyArray, isNotEmpty, isTab, recordLogEvent, screenHeight } from 'src/shared/utils';
import { useBookmark, usePodcast, useAppPlayer, useLogin } from 'src/hooks';
import { PodcastListBodyGet, PodcastListItemType } from 'src/redux/podcast/types'
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnalyticsEvents, EventParameterProps } from 'src/shared/utils/analytics';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const PodcastProgram = React.memo(({ tabIndex, currentIndex, scrollY }: { tabIndex?: number; currentIndex?: number; scrollY?: any }) => {
  const insets = useSafeAreaInsets();
  const scrollYValue = scrollY ? scrollY : new Animated.Value(0);

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
    bookmarkIdInfo,
    validateBookmark,
  } = useBookmark()
  const { isLoggedIn } = useLogin()

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

  const onPressSave = (index: number) => {
    const data = [...podcastEpisodeListInfo]
    const item = data[index]
    const newBookmarked = !item.isBookmarked
    data[index].isBookmarked = newBookmarked
    setPodcastEpisodeListInfo(data)
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
    <Modal visible={true} animationType={'slide'} onRequestClose = {() => setShowModal(false)}>
      <View style={[isTab ? styles.tabModalStyle : { height: screenHeight - insets.top }]}>
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
      backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
      {showModal && episodeModal()}
      {isNonEmptyArray(podcastListData) &&
        <AnimatedFlatList
          ref={ref}
          onScrollBeginDrag={() => global.refFlatList = ref}
          onScroll={Animated.event(
            [{nativeEvent: { contentOffset: {y: scrollYValue}}}],
            {useNativeDriver: false}
          )}
          scrollEventThrottle={16}
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
    },
    tabModalStyle: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    }
  });

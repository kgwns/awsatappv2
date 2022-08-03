import React, {useEffect, useState, useRef, useMemo} from 'react';
import { StyleSheet, View, FlatList, BackHandler, Animated } from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { horizontalEdge, isIOS, isNonEmptyArray, isNotchDevice, isNotEmpty, isObjectNonEmpty, normalize } from 'src/shared/utils';
import {OpinionArticleDetailFooter, DetailHeader} from 'src/components/molecules';
import {
  OpinionArticleDetailWidget,
  RelatedOpinionArticlesWidget,
} from 'src/components/organisms';
import {ScreenContainer} from '..';
import {useAllWriters, useAppCommon, useBookmark, useLogin, useOpinionArticleDetail, useWriterDetail} from 'src/hooks';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { OpinionArticleDetailItemType, OpinionsListItemType, RelatedOpinionBodyGet } from 'src/redux/opinionArticleDetail/types';
import TrackPlayer, { RepeatMode, State, usePlaybackState } from 'react-native-track-player';
import { useFocusEffect, useIsFocused, useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { sendUserEventTracking } from 'src/services'
import { TrackingEventType } from 'src/services/eventTrackService'
import { ArticleFontSize } from 'src/redux/appCommon/types';
import { Edge } from 'react-native-safe-area-context';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';
import { BackIcon } from 'src/components/atoms';
import { Styles } from 'src/shared/styles';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';

export interface OpinionArticleDetailScreenProps {
  route: any;
}

export const OpinionArticleDetail = ({
  route,
}: OpinionArticleDetailScreenProps) => {
  const style = useThemeAwareObject(customStyle);
  
  const navigation = useNavigation<StackNavigationProp<any>>()
  const routes = useNavigationState(state => state.routes)
  const isFocused = useIsFocused();

  const currentNId = route.params.nid;

  const { articleFontSize, storeArticleFontSizeInfo } = useAppCommon()

  const [fontSize,setFontSize] = useState<ArticleFontSize>(articleFontSize)
  const { isLoading, opinionArticleDetailData, fetchOpinionArticleDetail,
    fetchRelatedOpinionData, relatedOpinionListData,
    isLoadingRelatedOpinion, emptyRelatedOpinionData,emptyOpinionArticleData,fetchNarratedOpinionData } =
    useOpinionArticleDetail();
    const { writerDetailData,
      getWriterDetailData, emptyWriterDetailData
  } = useWriterDetail();

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showupUp,setShowPopUp] = useState(false)

  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()
  const { isLoggedIn } = useLogin()
  const {selectedAuthorsData, getSelectedAuthorsData,sendSelectedWriterInfo,removeAuthorRequest} = useAllWriters();

  const [page,setPage]=useState(0)
  const relatedOpinionPayload: RelatedOpinionBodyGet = {
    page: page,
  };

  const [opinionArticle,setOpinionArticle]=useState<OpinionArticleDetailItemType[]>([])
  const [writerDetailInfo, setWriterDetailInfo] = useState<WriterDetailDataType[]>([])
  const [relatedOpinionInfo,setrelatedOpinioninfo]=useState<OpinionsListItemType[]>([])

  const [isFollowed, setIsFollowed] = useState(false)
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge)
  const [scrollY, setScrollY] = useState(new Animated.Value(0))

  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const playbackState = usePlaybackState();
  const relatedOpinionRef = useRef(true);
  const pageLoadingRef = useRef(false);

  const detailRoutes = useMemo(() => routes.filter((routes) =>
    routes.name == ScreensConstants.ARTICLE_DETAIL_SCREEN ||
    routes.name == ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN ||
    routes.name == ScreensConstants.WRITERS_DETAIL_SCREEN), [routes]);
  const noOfDetailRoutes = detailRoutes.length

  const togglePlayback = async (nid: string, mediaData: any) => {
    const playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};

    if (!isObjectNonEmpty(playList) || !isObjectNonEmpty(mediaData)) {
      return
    }

    const id = nid
    const media = playList.sources[0]?.file ? playList.sources[0]?.file : '';
    const title = mediaData.title ? mediaData.title : '';


    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({ stopWithApp: true });
      await TrackPlayer.add({
        id: id,
        url: media,
        title: title,
        artist: title,
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      await TrackPlayer.play();
    }
    if(selectedTrack == nid){
      if (playbackState === State.Playing) {
        await TrackPlayer.pause();
      }
      else if (playbackState === State.Paused) {
        await TrackPlayer.play();
      }
      else if ( playbackState === State.Paused ||  playbackState == State.None || playbackState == State.Stopped) {
        setupPlayer()
      }
    }else{
        await TrackPlayer.reset();
        setupPlayer()
    }
    setSelectedTrack(nid)
  }

  const sendEventToServer = () => {
    sendUserEventTracking({
      events: [{
        contentId: currentNId,
        eventType: TrackingEventType.VIEW
      }]
    })
  }

  useEffect(() => {
    sendEventToServer()

    getSelectedAuthorsData()
    emptyRelatedOpinionData()
    Orientation.unlockAllOrientations();
    Orientation.getDeviceOrientation(updateScreenEdge);
    Orientation.addDeviceOrientationListener(updateScreenEdge);
    fetchOpinionArticleDetail({nid: route.params.nid});
    return () => {
      setOpinionArticle([]);
      setWriterDetailInfo([])
      setrelatedOpinioninfo([]);
      emptyRelatedOpinionData();
      emptyOpinionArticleData();
      if (!route.params.isRelatedArticle) {
        Orientation.lockToPortrait();
        Orientation.removeOrientationListener(updateScreenEdge);
      }
    };
  }, []);

  useEffect(() => {
    isFocused && Orientation.unlockAllOrientations();
  }, [isFocused])

  useEffect(() => {
    if (isNonEmptyArray(writerDetailData) && isFocused) {
      setWriterDetailInfo(writerDetailData)
    }
  }, [writerDetailData])

  useEffect(() => {
    pageLoadingRef.current = false;
    if (isNonEmptyArray(relatedOpinionListData) && isFocused) {
      const relatedOpinionData = relatedOpinionListData.filter((data) => { return data.nid != currentNId})
      setrelatedOpinioninfo(relatedOpinionData)
    }
  }, [relatedOpinionListData])

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    const edge = getScreenEdge(deviceOrientation)
    setEdge(edge)
  }

  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT': return ['right']
      case 'LANDSCAPE-RIGHT': return ['left']
      case 'PORTRAIT': return horizontalEdge
      default: return horizontalEdge
    }
  }

  useEffect(() => {
    if (isNonEmptyArray(opinionArticleDetailData)) {
      if(route.params && route.params.nid && isFocused){
        setOpinionArticle(opinionArticleDetailData)
        const isBookmarked = validateBookmark(opinionArticleDetailData[0].nid_export)
        setIsBookmarked(isBookmarked)
      }

      if (isNonEmptyArray(opinionArticleDetailData[0].writer) && isNotEmpty(opinionArticleDetailData[0].writer[0]?.id)) {
        getWriterDetailData({ tid: opinionArticleDetailData[0].writer[0].id })
      }
    }
  }, [opinionArticleDetailData])

  useEffect(() => {
    if (relatedOpinionRef.current) {
      relatedOpinionRef.current = false;
    } else {
      if (isNonEmptyArray(opinionArticleDetailData) && isNonEmptyArray(opinionArticle) && isFocused) {
        setTimeout(()=>{
          pageLoadingRef.current = true;
          setPage(0)
          fetchRelatedOpinionData({page: 0});
        },1000)
        }
    }
  }, [isFocused, opinionArticle])

  useEffect(() => {
      if(page != 0 && !pageLoadingRef.current){
        pageLoadingRef.current = true;
        fetchRelatedOpinionData(relatedOpinionPayload);
      }
  }, [page]);

  useEffect(() => {
    if (fontSize != articleFontSize) {
      setFontSize(articleFontSize)
    }
  }, [articleFontSize])

  useEffect(() => {
    if (isNonEmptyArray(opinionArticleDetailData) && isNonEmptyArray(opinionArticle) && isObjectNonEmpty(selectedAuthorsData) && isFocused) {
      const isFollowed = isNonEmptyArray(opinionArticle[0].writer) && validateFollow(opinionArticle[0].writer[0].id)
      // console.log('useeffect validate follow', opinionArticle[0].writer[0].id)
      setIsFollowed(isFollowed)
    }
  }, [isFocused, opinionArticle, selectedAuthorsData])



  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const validateFollow = (id: string): boolean => {
    return isObjectNonEmpty(selectedAuthorsData) ? selectedAuthorsData.data.some((value: any) => value.tid == id) : false
  }

  const onPressSave = (nid: string) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    
    const newBookmarked = !isBookmarked
    const data = [...opinionArticleDetailData]
    data[0].isBookmarked = !data[0].isBookmarked
    setIsBookmarked(newBookmarked)
    onUpdateBookMark(nid, newBookmarked)
  }


  const onPressFollow = (id: string) => {
    if (!isLoggedIn) {
      setShowPopUp(true)
      return
    }

    const newFollowed = !isFollowed
    const data = [...opinionArticle]
    data[0].isFollowed = !data[0].isFollowed
    setIsFollowed(newFollowed)
    onUpdateFollow(id, newFollowed)
  }

  const onPressWriter = () => {
    const tid = isNonEmptyArray(writerDetailInfo) && writerDetailInfo[0].tid
    tid && navigation.navigate(ScreensConstants.WRITERS_DETAIL_SCREEN, {tid})
  }

  const onUpdateBookMark = (nid: string, hasBookmarked: boolean) => {
    if (isLoggedIn) {
      hasBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.OPINION }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const onPressRelatedOpinion = (nid: string) => {
    if (nid && nid!=currentNId) {
      emptyRelatedOpinionData()
      navigation.push(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN, { nid: nid, isRelatedArticle: true })
    }
  }

  const gotoNextPage = () => {
    setPage(page + 1);
  };

  const onPressFontSizeChange = () => {
    storeArticleFontSizeInfo()
  }

  const onUpdateFollow = (id: string, hasFollowed: boolean) => {
    if (isLoggedIn) {
      hasFollowed ? sendSelectedWriterInfo({ tid: id, isList: false }) : removeAuthorRequest({ tid: id })
    } else {
      setShowPopUp(true)
    }
  }

  const onScroll = (event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y)
  }

  const onPressBack = async () => {
    if (!route.params.isRelatedArticle) {
      Orientation.unlockAllOrientations()
      Orientation.lockToPortrait()
    }
    navigation.goBack()
  }

  const onPressHome = () => {
    navigation.popToTop()
  }

  const renderItem = () => {
    const hideBackArrow = (Number.parseInt(JSON.stringify(scrollY)) > 50)

    return (
      <View style={[style.container]}>
        {isNonEmptyArray(opinionArticle) && (
          <OpinionArticleDetailWidget
            data={opinionArticle[0]} fontSize={fontSize}
            isFollowed={isFollowed} onPressFollow={() => onPressFollow(opinionArticle[0].writer[0].id)}
            onPressWriter={onPressWriter}
            isRelatedArticle={route.params.isRelatedArticle} writerData={writerDetailInfo[0]}
            togglePlayback={togglePlayback}
            selectedTrack={selectedTrack}
            hideBackArrow={hideBackArrow}
            visibleHome={noOfDetailRoutes > 1}
            onPressHome={onPressHome}
          />
        )}
        {isNonEmptyArray(relatedOpinionInfo) && (
          <RelatedOpinionArticlesWidget data={relatedOpinionInfo}
            onPress={onPressRelatedOpinion}
            onScroll={() => gotoNextPage()}
            isLoading={isLoadingRelatedOpinion}
            togglePlayback={togglePlayback}
            selectedTrack={selectedTrack}
          />
        )}
      </View>
    )
  };

  return (
    <ScreenContainer edge={edge} isLoading={isLoading} isLandscape
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert} playerPosition={{ bottom : isIOS ? normalize(70) : normalize(60) }}>
        {!isLoading && isNonEmptyArray(opinionArticle) && <View style={style.containerBase}>
          <FlatList
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          />
          <View style={style.shadowEffect}>
            <OpinionArticleDetailFooter
              opinionArticleDetailData={opinionArticle[0]}
              isBookmarked={isBookmarked}
              onPressSave={() => onPressSave(opinionArticle[0].nid_export)}
              onPressFontSizeChange={onPressFontSizeChange}
            />
          </View>
          {(Number.parseInt(JSON.stringify(scrollY)) > 50) && <DetailHeader visibleHome={noOfDetailRoutes > 1} onHomePress={onPressHome} onBackPress={onPressBack}/>}
        </View>}
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionArticleDetailStyle = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: normalize(80),
      backgroundColor: theme.backgroundColor,
    },
    containerBase: {
      flex: 1,
    },
    shadowEffect: {
      shadowColor: Styles.color.onyx,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: .5,
      shadowRadius: 4,
      elevation: 15,
    }
  });
  return OpinionArticleDetailStyle;
};

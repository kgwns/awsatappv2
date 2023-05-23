import React, {useEffect, useState, useRef, useMemo} from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { horizontalEdge, isIOS, isNonEmptyArray, isNotchDevice, isNotEmpty, isObjectNonEmpty, isTab, normalize, screenWidth } from 'src/shared/utils';
import {OpinionArticleDetailFooter, DetailHeader, DetailHeaderTablet} from 'src/components/molecules';
import {
  OpinionArticleDetailWidget,
  RelatedOpinionArticlesWidget,
} from 'src/components/organisms';
import {ScreenContainer} from '..';
import {useAllWriters, useAppCommon, useAppPlayer, useBookmark, useLogin, useOpinionArticleDetail, useWriterDetail} from 'src/hooks';
import Orientation from 'react-native-orientation-locker';
import { OpinionArticleDetailItemType, OpinionsListItemType, RelatedOpinionBodyGet } from 'src/redux/opinionArticleDetail/types';
import { useIsFocused, useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants/Constants';
import { sendUserEventTracking } from 'src/services'
import { TrackingEventType } from 'src/services/eventTrackService'
import { ArticleFontSize } from 'src/redux/appCommon/types';
import { Edge } from 'react-native-safe-area-context';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';
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
    isLoadingRelatedOpinion, emptyRelatedOpinionData,emptyOpinionArticleData } =
    useOpinionArticleDetail();
    const { writerDetailData,
      getWriterDetailData
  } = useWriterDetail();

  const { showMiniPlayer } = useAppPlayer()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showupUp,setShowPopUp] = useState(false)

  const { sendBookmarkInfo, removeBookmarkedInfo, validateBookmark } = useBookmark()
  const { isLoggedIn } = useLogin()
  const {
    selectedAuthorsData,
    getSelectedAuthorsData, sendSelectedWriterInfo,
    removeAuthorRequest, validateFollow
  } = useAllWriters();

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
  const relatedOpinionRef = useRef(true);
  const pageLoadingRef = useRef(false);

  const detailRoutes = useMemo(() => routes.filter((detailRoute) =>
    detailRoute.name === ScreensConstants.ARTICLE_DETAIL_SCREEN ||
    detailRoute.name === ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN ||
    detailRoute.name === ScreensConstants.WRITERS_DETAIL_SCREEN), [routes]);
  const noOfDetailRoutes = detailRoutes.length


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
    //Disabled for iPad orientation
    // if (isTab) {
    //   Orientation.unlockAllOrientations();
    //   Orientation.getDeviceOrientation(updateScreenEdge);
    //   Orientation.addDeviceOrientationListener(updateScreenEdge);
    // }
    fetchOpinionArticleDetail({nid: route.params.nid});
    return () => {
      setOpinionArticle([]);
      setWriterDetailInfo([])
      setrelatedOpinioninfo([]);
      emptyRelatedOpinionData();
      emptyOpinionArticleData();
      //Disabled for iPad orientation
      // if (!route.params.isRelatedArticle) {
      //   Orientation.lockToPortrait();
      //   Orientation.removeOrientationListener(updateScreenEdge);
      // }
    };
  }, []);

  useEffect(() => {
    isFocused && isTab && Orientation.unlockAllOrientations();
    setScrollY(new Animated.Value(0))
  }, [isFocused])

  useEffect(() => {
    if (isNonEmptyArray(writerDetailData) && isFocused) {
      setWriterDetailInfo(writerDetailData)
    }
  }, [writerDetailData])

  useEffect(() => {
    pageLoadingRef.current = false;
    if (isNonEmptyArray(relatedOpinionListData) && isFocused) {
      const relatedOpinionData = relatedOpinionListData.filter((data) => { 
        return data.nid !== currentNId
      })
      setrelatedOpinioninfo(relatedOpinionData)
    }
  }, [relatedOpinionListData])

  /* We will uncomment the below code when landscape orientation required for mobile
  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    const screenEdge = getScreenEdge(deviceOrientation)
    setEdge(screenEdge)
  }

  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT': return ['right']
      case 'LANDSCAPE-RIGHT': return ['left']
      case 'PORTRAIT': return horizontalEdge
      default: return horizontalEdge
    }
  } */

  useEffect(() => {
    if (isNonEmptyArray(opinionArticleDetailData)) {
      if(route.params && route.params.nid && isFocused){
        setOpinionArticle(opinionArticleDetailData)
        const isBookmark = validateBookmark(opinionArticleDetailData[0].nid_export)
        setIsBookmarked(isBookmark)
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
      if(page !== 0 && !pageLoadingRef.current){
        pageLoadingRef.current = true;
        fetchRelatedOpinionData(relatedOpinionPayload);
      }
  }, [page]);

  useEffect(() => {
    if (fontSize !== articleFontSize) {
      setFontSize(articleFontSize)
    }
  }, [articleFontSize])

  useEffect(() => {
    if (isNonEmptyArray(opinionArticleDetailData) && isNonEmptyArray(opinionArticle) && isObjectNonEmpty(selectedAuthorsData) && isFocused) {
      const isFollow = isNonEmptyArray(opinionArticle[0].writer) && validateFollow(opinionArticle[0].writer[0].id)
      setIsFollowed(isFollow)
    }
  }, [isFocused, opinionArticle, selectedAuthorsData])

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

  const onPressRelatedOpinion = (nidProps: string) => {
    if (nidProps && nidProps!==currentNId) {
      emptyRelatedOpinionData()
      navigation.push(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN, { nid: nidProps, isRelatedArticle: true })
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
    //Disabled for iPad orientation
    // if (!route.params.isRelatedArticle && isTab) {
    //   Orientation.unlockAllOrientations()
    //   Orientation.lockToPortrait()
    // }
    navigation.goBack()
  }

  const onPressHome = () => {
    navigation.popToTop()
  }

  const renderHeader = () => {
    const headerProps = {
      visibleHome: noOfDetailRoutes > 1,
      onHomePress: () => onPressHome(),
      onBackPress: () => onPressBack(),
      containerStyle: isTab && { paddingHorizontal: normalize(0.02 * screenWidth) },
    }

    return (
      <View style={style.backContainer}>
        {isTab ? <DetailHeaderTablet {...headerProps} /> : <DetailHeader {...headerProps} />}
      </View>
    );
  };

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
            selectedTrack={selectedTrack}
          />
        )}
      </View>
    )
  };

  return (
    <ScreenContainer edge={edge} isLoading={isLoading} isLandscape
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert} playerPosition={{ bottom : isTab ? 104 : isIOS ? normalize(70) : normalize(60) }}>
        {renderHeader()}
        {!isLoading && isNonEmptyArray(opinionArticle) && <View style={style.containerBase}>
          <FlatList
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          contentContainerStyle={showMiniPlayer && style.contentContainer}
          />
          <View style={style.shadowEffect}>
            <OpinionArticleDetailFooter
              opinionArticleDetailData={opinionArticle[0]}
              isBookmarked={isBookmarked}
              onPressSave={() => onPressSave(opinionArticle[0].nid_export)}
              onPressFontSizeChange={onPressFontSizeChange}
            />
          </View>
          {/* For Navigation Reference
          {(Number.parseInt(JSON.stringify(scrollY)) > 50) && <DetailHeader visibleHome={noOfDetailRoutes > 1} onHomePress={onPressHome} onBackPress={onPressBack}/>} */}
        </View>}
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
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
    },
    contentContainer: {
      paddingBottom: normalize(80)
    },
    backContainer: {
      width: '100%',
      height: isTab ? 100 : isIOS ? isNotchDevice ? normalize(98) : normalize(92) : normalize(72),
      backgroundColor: theme.secondaryWhite,
      justifyContent: 'center',
    }
  });
};

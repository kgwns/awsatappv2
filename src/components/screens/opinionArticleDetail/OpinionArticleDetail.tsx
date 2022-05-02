import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { horizontalEdge, isNonEmptyArray, isNotEmpty, isObjectNonEmpty, normalize } from 'src/shared/utils';
import {OpinionArticleDetailFooter} from 'src/components/molecules';
import {
  OpinionArticleDetailWidget,
  RelatedOpinionArticlesWidget,
} from 'src/components/organisms';
import {ScreenContainer} from '..';
import {useAllWriters, useAppCommon, useBookmark, useLogin, useOpinionArticleDetail, useWriterDetail} from 'src/hooks';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { OpinionArticleDetailItemType, OpinionsListItemType, RelatedOpinionBodyGet } from 'src/redux/opinionArticleDetail/types';
import TrackPlayer from 'react-native-track-player';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { sendUserEventTracking } from 'src/services'
import { TrackingEventType } from 'src/services/eventTrackService'
import { ArticleFontSize } from 'src/redux/appCommon/types';
import { Edge } from 'react-native-safe-area-context';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';

export interface OpinionArticleDetailScreenProps {
  route: any;
}

export const OpinionArticleDetail = ({
  route,
}: OpinionArticleDetailScreenProps) => {
  const style = useThemeAwareObject(customStyle);
  
  const navigation = useNavigation<StackNavigationProp<any>>()
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
    if (isNonEmptyArray(writerDetailData) && isFocused) {
      setWriterDetailInfo(writerDetailData)
    }
  }, [writerDetailData])

  useEffect(() => {
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
        setPage(0)
        const isBookmarked = validateBookmark(opinionArticleDetailData[0].nid_export)
        setIsBookmarked(isBookmarked)
      }
      if(isNotEmpty(opinionArticleDetailData[0].jwplayer)){
        fetchNarratedOpinionData({
          jwPlayerID:opinionArticleDetailData[0].jwplayer
        })
      }
      if (isNonEmptyArray(opinionArticleDetailData[0].writer) && isNotEmpty(opinionArticleDetailData[0].writer[0].id)) {
        getWriterDetailData({ tid: opinionArticleDetailData[0].writer[0].id })
      }
    }
  }, [opinionArticleDetailData])

  useEffect(() => {
    if (isNonEmptyArray(opinionArticleDetailData) && isNonEmptyArray(opinionArticle) && isFocused) {
        if(isNotEmpty(opinionArticle[0].jwplayer)){
         fetchNarratedOpinionData({
           jwPlayerID:opinionArticle[0].jwplayer
         })
       }
       setTimeout(()=>{
        fetchRelatedOpinionData(relatedOpinionPayload);
       },1000)
      }
  }, [isFocused,opinionArticle])

  useEffect(() => {
    fetchRelatedOpinionData(relatedOpinionPayload);
  }, [page]);

  useEffect(() => {
    if (fontSize != articleFontSize) {
      setFontSize(articleFontSize)
    }
  }, [articleFontSize])

  useEffect(() => {
    if (isNonEmptyArray(opinionArticleDetailData) && isNonEmptyArray(opinionArticle) && isObjectNonEmpty(selectedAuthorsData) && isFocused) {
      const isFollowed = validateFollow(opinionArticle[0].writer[0].id)
      // console.log('useeffect validate follow', opinionArticle[0].writer[0].id)
      setIsFollowed(isFollowed)
    }
  }, [isFocused, opinionArticle, selectedAuthorsData])

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

  const onUpdateBookMark = (nid: string, hasBookmarked: boolean) => {
    if (isLoggedIn) {
      hasBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const onPressRelatedOpinion = (nid: string) => {
    if (nid && nid!=currentNId) {
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

  const renderItem = () => (
    <View style={[style.container]}>
      {isNonEmptyArray(opinionArticle) &&  isNonEmptyArray(writerDetailInfo) &&  (
        <OpinionArticleDetailWidget
          data={opinionArticle[0]} fontSize={fontSize}
          isFollowed={isFollowed} onPressFollow={() => onPressFollow(opinionArticle[0].writer[0].id)}
          isRelatedArticle={route.params.isRelatedArticle} writerData={writerDetailInfo[0]}/>
      )}
      {isNonEmptyArray(relatedOpinionInfo) && (
        <RelatedOpinionArticlesWidget data={relatedOpinionInfo}
          onPress={onPressRelatedOpinion}
          onScroll={() => gotoNextPage()}
          isLoading={isLoadingRelatedOpinion} />
      )}
    </View>
  );

  return (
    <ScreenContainer edge={edge} isLoading={isLoading}
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert}>
        {!isLoading && isNonEmptyArray(opinionArticle) && <View style={style.containerBase}>
          <FlatList
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          />
          <View>
            <OpinionArticleDetailFooter
              opinionArticleDetailData={opinionArticle[0]}
              isBookmarked={isBookmarked}
              onPressSave={() => onPressSave(opinionArticle[0].nid_export)}
              onPressFontSizeChange={onPressFontSizeChange}
            />
          </View>
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
  });
  return OpinionArticleDetailStyle;
};

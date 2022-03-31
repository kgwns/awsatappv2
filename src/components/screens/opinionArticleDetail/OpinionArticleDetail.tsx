import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, BackHandler} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {horizontalAndTop, horizontalEdge, isNonEmptyArray, isNotEmpty, isObjectNonEmpty, normalize} from 'src/shared/utils';
import {OpinionArticleDetailFooter} from 'src/components/molecules';
import {
  OpinionArticleDetailWidget,
  RelatedOpinionArticlesWidget,
} from 'src/components/organisms';
import {ScreenContainer} from '..';
import {useAllWriters, useBookmark, useLogin, useOpinionArticleDetail} from 'src/hooks';
import {Edge} from 'react-native-safe-area-context';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import { OpinionArticleDetailItemType, RelatedOpinionBodyGet } from 'src/redux/opinionArticleDetail/types';
import TrackPlayer from 'react-native-track-player';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';

export interface OpinionArticleDetailScreenProps {
  route: any;
}

export enum ArticleFontSize {
  normal = normalize(16),
  medium = normalize(18),
  high = normalize(20)
}

export const OpinionArticleDetail = ({
  route,
}: OpinionArticleDetailScreenProps) => {
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation<StackNavigationProp<any>>()
  const isFocused = useIsFocused();
  const currentNId = route.params.nid;
  const [edge, setEdge] = useState<Edge[]>(horizontalAndTop);
  const [fontSize,setFontSize] = useState<ArticleFontSize>(ArticleFontSize.normal)
  const { isLoading, opinionArticleDetailData, fetchOpinionArticleDetail,
    fetchRelatedOpinionData, relatedOpinionListData,
    isLoadingRelatedOpinion, emptyRelatedOpinionData,emptyOpinionArticleData,fetchNarratedOpinionData,narratedOpinionData } =
    useOpinionArticleDetail();
  const relatedOpinionData = relatedOpinionListData.filter((data) => { return data.nid != currentNId})

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

  const [isFollowed, setIsFollowed] = useState(false)

  useEffect(() => {
    getSelectedAuthorsData()
    emptyRelatedOpinionData()
    Orientation.unlockAllOrientations();
    Orientation.getDeviceOrientation(updateScreenEdge);
    Orientation.addDeviceOrientationListener(updateScreenEdge);
    fetchOpinionArticleDetail({nid: route.params.nid});
    return () => {
      setOpinionArticle([]);
      emptyRelatedOpinionData();
      emptyOpinionArticleData();
      Orientation.lockToPortrait();
      Orientation.removeOrientationListener(updateScreenEdge);
    };
  }, []);

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

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    const edge = getScreenEdge(deviceOrientation);
    setEdge(edge);
  };

  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT':
        return ['right','top'];
      case 'LANDSCAPE-RIGHT':
        return ['left','top'];
      case 'PORTRAIT':
        return horizontalAndTop;
      default:
        return horizontalAndTop;
    }
  };

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
      navigation.push(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN, { nid: nid })
    }
  }

  const gotoNextPage = () => {
    setPage(page + 1);
  };

  const onPressFontSizeChange = () => {
    let newFontSize = normalize(16)
    if(fontSize === ArticleFontSize.normal) {
      newFontSize = normalize(18)
    } else if(fontSize === ArticleFontSize.medium) {
      newFontSize = normalize(20)
    }
    setFontSize(newFontSize)
  }

  const onUpdateFollow = (id: string, hasFollowed: boolean) => {
    if (isLoggedIn) {
      hasFollowed ? sendSelectedWriterInfo({ tid: id, isList: false }) : removeAuthorRequest({ tid: id })
    } else {
      setShowPopUp(true)
    }
  }

  const renderItem = () => (
    <View style={style.container}>
      {isNonEmptyArray(opinionArticle) && (
        <OpinionArticleDetailWidget
          data={opinionArticle[0]} fontSize={fontSize}
          isFollowed={isFollowed} onPressFollow={() => onPressFollow(opinionArticle[0].writer[0].id)} />
      )}
      {isNonEmptyArray(relatedOpinionData) && (
        <RelatedOpinionArticlesWidget data={relatedOpinionData}
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
      {!isLoading && isNonEmptyArray(opinionArticle) && <>
      <FlatList
        style={style.flatList}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
      { isNonEmptyArray(opinionArticle) && 
        <View style={style.footer}>
          <OpinionArticleDetailFooter
            opinionArticleDetailData={opinionArticle[0]}
            isBookmarked={isBookmarked}
            onPressSave={() => onPressSave(opinionArticle[0].nid_export)}
            onPressFontSizeChange={onPressFontSizeChange}
          />
        </View>
}
      </>}
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionArticleDetailStyle = StyleSheet.create({
    container: {
      paddingBottom: normalize(80),
      backgroundColor: theme.backgroundColor,
    },
    flatList: {
      flex: 1,
      height: '100%',
    },
    footer: {
      width: '100%',
    },
  });
  return OpinionArticleDetailStyle;
};

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {horizontalEdge, isNonEmptyArray, normalize} from 'src/shared/utils';
import {OpinionArticleDetailFooter} from 'src/components/molecules';
import {
  OpinionArticleDetailWidget,
  RelatedOpinionArticlesWidget,
} from 'src/components/organisms';
import {ScreenContainer} from '..';
import {useBookmark, useLogin, useOpinionArticleDetail} from 'src/hooks';
import {Edge} from 'react-native-safe-area-context';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import { RelatedOpinionBodyGet } from 'src/redux/opinionArticleDetail/types';

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
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge);
  const [fontSize,setFontSize] = useState<ArticleFontSize>(ArticleFontSize.normal)
  const { isLoading, opinionArticleDetailData, fetchOpinionArticleDetail,
    fetchRelatedOpinionData, relatedOpinionListData,
    isLoadingRelatedOpinion, emptyRelatedOpinionData } =
    useOpinionArticleDetail();


  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showupUp,setShowPopUp] = useState(false)

  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()
  const { isLoggedIn } = useLogin()

  const [page,setPage]=useState(0)
  const relatedOpinionPayload: RelatedOpinionBodyGet = {
    page: page,
  };

  useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.getDeviceOrientation(updateScreenEdge);
    Orientation.addDeviceOrientationListener(updateScreenEdge);
    fetchOpinionArticleDetail({nid: route.params.nid});
    return () => {
      emptyRelatedOpinionData()
      Orientation.lockToPortrait();
      Orientation.removeOrientationListener(updateScreenEdge);
    };
  }, []);

  useEffect(() => {
    if (isNonEmptyArray(opinionArticleDetailData)) {
      const isBookmarked = validateBookmark(opinionArticleDetailData[0].nid_export)
      setIsBookmarked(isBookmarked)
    }
  }, [opinionArticleDetailData])

  useEffect(() => {
    fetchRelatedOpinionData(relatedOpinionPayload);
  }, [page]);

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    const edge = getScreenEdge(deviceOrientation);
    setEdge(edge);
  };

  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT':
        return ['right'];
      case 'LANDSCAPE-RIGHT':
        return ['left'];
      case 'PORTRAIT':
        return horizontalEdge;
      default:
        return horizontalEdge;
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
    nid && getOpinionDetail(nid)
  }

  const getOpinionDetail = (id: string) => {
    fetchOpinionArticleDetail({ nid: parseInt(id) })
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

  const renderItem = () => (
    <View style={style.container}>
      {isNonEmptyArray(opinionArticleDetailData) && (
        <OpinionArticleDetailWidget data={opinionArticleDetailData[0]} fontSize={fontSize}/>
      )}
      {isNonEmptyArray(relatedOpinionListData) && (
        <RelatedOpinionArticlesWidget data={relatedOpinionListData}
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
      {!isLoading && isNonEmptyArray(opinionArticleDetailData) && <>
      <FlatList
        style={style.flatList}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
        <View style={style.footer}>
          <OpinionArticleDetailFooter
            opinionArticleDetailData={opinionArticleDetailData[0]}
            isBookmarked={isBookmarked}
            onPressSave={() => onPressSave(opinionArticleDetailData[0].nid_export)}
            onPressFontSizeChange={onPressFontSizeChange}
          />
        </View>
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

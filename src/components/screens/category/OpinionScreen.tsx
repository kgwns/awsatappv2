import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  OpinionWritersArticlesSection,
  OpinionWritersSection,
} from 'src/components/organisms';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useOpinionWriter} from 'src/hooks/useOpinionWriter';
import {useOpinions} from 'src/hooks/useOpinions';
import {WritersBodyGet} from 'src/redux/writers/types';
import {OpinionsBodyGet, OpinionsListItemType} from 'src/redux/opinions/types';
import { useBookmark, useLogin } from 'src/hooks';
import { isNonEmptyArray } from 'src/shared/utils';
import { AlertModal } from 'src/components/organisms';
import { ScreensConstants } from 'src/constants';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


export const OpinionScreen = () => {
  const [t] = useTranslation()
  const navigation = useNavigation()

  const [page, setPage] = useState(0);
  const writersPayload: WritersBodyGet = {
    items_per_page: 10,
  };

  const opinionsPayload: OpinionsBodyGet = {
    page: page,
  };

  const gotoNextPage = () => {
    setPage(page + 1);
  };

  const style = useThemeAwareObject(customStyle);

  const {opinionWriterData, fetchOpinionWriterRequest} = useOpinionWriter();
  const {opinionsData, isLoading, fetchOpinionsRequest} = useOpinions();

  useEffect(() => {
    fetchOpinionWriterRequest(writersPayload);
    fetchOpinionsRequest(opinionsPayload);
  }, [page]);

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()
  const { isLoggedIn } = useLogin()


  const [opinionsDataInfo, setOpinionsDataInfo] = useState(opinionsData)
  const [showupUp,setShowPopUp] = useState(false)

  useEffect(() => {
    updateOpinionsData()
  }, [opinionsData,bookmarkIdInfo])

  const updateOpinionsData = () => {
    if(isNonEmptyArray(opinionsData)) {
      const opinions = updateBookmark(opinionsData)
      setOpinionsDataInfo(opinions)
    }
  }

  const updateBookmark = (data: OpinionsListItemType[]) => {
    return data.map((item: OpinionsListItemType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
  }

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const updatedChangeBookmark = (data: OpinionsListItemType[], index: number) => {
    const updatedData = [...data]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus
    updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
    return updatedData
  }

  const onPressSignUp = () => {
    setShowPopUp(false)
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    if (isLoggedIn) {
      isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const updatedOpinionArticlesBookmark = (index: number) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    const updatedData = updatedChangeBookmark(opinionsDataInfo, index)
    setOpinionsDataInfo(updatedData)
  }

  const renderItem = () => (
    <View style={{width:'100%'}}>
      <OpinionWritersSection data={opinionWriterData} />    
      <OpinionWritersArticlesSection
        data={opinionsDataInfo}
        onScroll={() => gotoNextPage()}
        isLoading={isLoading}
        onUpdateOpinionArticlesBookmark={updatedOpinionArticlesBookmark}
      />
    </View>
  );

  return (
    <View style={style.container}>
      {showupUp && <AlertModal
        title={t('signUpAlert.subscribe')}
        message={t('signUpAlert.description')}
        buttonText={t('signUpAlert.signUp')}
        isVisible={showupUp}
        onPressSuccess={onPressSignUp}
        onClose={() => onCloseSignUpAlert()}
      />
      }
      <FlatList
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionScreenStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
  });
  return OpinionScreenStyle;
};

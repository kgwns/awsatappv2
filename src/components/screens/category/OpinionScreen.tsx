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
import { useBookmark } from 'src/hooks';
import { isNonEmptyArray } from 'src/shared/utils';

export const OpinionScreen = () => {
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

  const [opinionsDataInfo, setOpinionsDataInfo] = useState(opinionsData)

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

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
  }

  const updatedOpinionArticlesBookmark = (index: number) => {
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

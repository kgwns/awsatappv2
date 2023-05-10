import React, {useEffect, useMemo, useState} from 'react';
import {ScreenContainer} from 'src/components/screens';
import {
  horizontalEdge,
  isNonEmptyArray,
  isNotEmpty,
  isTab,
  screenWidth,
} from 'src/shared/utils';
import {View, StyleSheet, FlatList} from 'react-native';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {AuthorItem, AuthorsHorizontalSlider} from 'src/components/molecules';
import {useAllWriters, useContentForYou} from 'src/hooks';
import {
  Divider,
  Label,
  LabelTypeProp,
  LoadingState,
} from 'src/components/atoms';
import {FavouriteOpinionsBodyGet} from 'src/redux/contentForYou/types';
import {getImageUrl} from 'src/shared/utils/utilities';
import {
  TranslateConstants,
  TranslateKey,
} from 'src/constants/Constants';
import { useIsFocused } from '@react-navigation/native';

export const keyExtractor = (_: any, index: number) => index.toString();

export const MyNewsWriters = () => {
  const isFocused = useIsFocused();

  const noContentTitle = TranslateConstants({ key: TranslateKey.NO_CONTENT_TITLE });
  
  const styles = useThemeAwareObject(customStyle);
  const {
    isLoading,
    selectedAuthorsData,
    allSelectedWritersDetailList,
    getSelectedAuthorsData,
    requestAllSelectedWritersDetailsData,
    emptySelectedAuthorsData
  } = useAllWriters();

  const {
    isLoading: opinionLoading,
    favouriteOpinionsData,
    fetchFavouriteOpinionsRequest,
  } = useContentForYou();

  const [pageCount, setPageCount] = useState(0);
  const [selectedAuthors, setSelectedAuthors] = useState<any>(null);
  const [opinionData, setOpinionData] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [showEmpty, setShowEmpty] = useState<boolean>(false);
  const [isAuthorTidData, setIsAuthorTidData] = useState<any>([])
  const [isAuthorTid, setIsAuthorTid] = useState<any>([])
  const [selectedTid, setSelectedTid] = useState('')

  const authorsList = useMemo(() => {
    const writersList = [];
    const tidList = []
    if (
      isNonEmptyArray(selectedAuthorsData.data) &&
      isNonEmptyArray(allSelectedWritersDetailList)
    ) {
      for (let i = 0; i < allSelectedWritersDetailList.length; i++) {
        writersList.push(allSelectedWritersDetailList[i]);
        tidList.push(allSelectedWritersDetailList[i].tid)
      }
    }
    if (isAuthorTidData !== tidList) {
      setIsAuthorTidData(tidList)
    }
    return writersList;
  }, [allSelectedWritersDetailList]);

  useEffect(() => {
    if (isFocused) {
      getSelectedAuthorsData();
    }
  }, [isFocused]);

  useEffect(() => {
    fetchSelectedDataFromAllWriters();
  }, [selectedAuthorsData]);

  useEffect(() => {
    if (JSON.stringify(isAuthorTidData) !== JSON.stringify(isAuthorTid)) {
      setIsAuthorTid(isAuthorTidData)
      if (isAuthorTidData.includes(selectedTid)) {
        const indexValue = isAuthorTidData.indexOf(selectedTid)
        const authorSelected = selectedAuthorsData.data.filter((item: any) => { 
          return item.tid.toString() === selectedTid && item 
        });
        onPress(authorSelected[0], indexValue)
      } else {
        setInitialData()
      }
    }
  }, [isAuthorTidData]);

  useEffect(() => {
    if (pageCount !== 0) {
      fetchOpinionData(selectedAuthors, pageCount);
    }
  }, [pageCount]);

  useEffect(() => {
    !opinionLoading && !isNonEmptyArray(opinionData) && pageCount === 0
      ? setShowEmpty(true)
      : setShowEmpty(false);
  }, [opinionData]);

  useEffect(() => {
    if (opinionData !== favouriteOpinionsData) {
      setOpinionData((prevOpinionData: any) => [
        ...prevOpinionData,
        ...favouriteOpinionsData,
      ]);
    }
  }, [favouriteOpinionsData]);

  const fetchSelectedDataFromAllWriters = () => {
    if (isNonEmptyArray(selectedAuthorsData.data)) {
      const selectedAuthorsString = getSelectedData().join('+')
      requestAllSelectedWritersDetailsData({ tid: selectedAuthorsString, items_per_page: 100 })
    } else {
      setPageCount(0);
      setOpinionData([]);
      setShowEmpty(true);
      emptySelectedAuthorsData();
    }
  };

  const getSelectedData = () => {
    return selectedAuthorsData.data.reduce((prevValue: string[], item: any) => {
      if (item.tid) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])
  }

  const getAuthorsList = () => {
    let authorsIdList = [];
    if (isNonEmptyArray(selectedAuthorsData.data)) {
      authorsIdList = selectedAuthorsData.data.map((item: any) => {
        return item.tid.toString();
      });
    }
    return authorsIdList;
  };
  
  const setInitialData = () => {
    const authorsIdList = getAuthorsList();
    setPageCount(0);
    setOpinionData([]);
    setSelectedIndex(-1);
    setSelectedAuthors(authorsIdList);
    isNonEmptyArray(authorsIdList) && fetchOpinionData(authorsIdList, 0);
  };

  const fetchOpinionData = (authorsData: any, Page: number) => {
    const opinionBody: FavouriteOpinionsBodyGet = {
      page: Page,
      items_per_page: isTab ? 12 : 10,
      authorsList: authorsData,
    };
    fetchFavouriteOpinionsRequest(opinionBody);
  };

  const onPress = (item: any, index: number) => {
    if (index === selectedIndex) {
      return;
    }
    setSelectedTid(index === -1 ? -1 : item.tid)
    const payloadAuthorsList = index === -1 ? getAuthorsList() : [item.tid];
    if (payloadAuthorsList !== selectedAuthors) {
      setPageCount(0);
      setOpinionData([]);
      setSelectedIndex(index);
      setSelectedAuthors(payloadAuthorsList);
      fetchOpinionData(payloadAuthorsList, 0);
    }
  };

  const loadMoreData = () => {
    setPageCount(pageCount + 1);
  };

  const numberOfColumn = isTab ? 2 : 1;

  const showEmptyData = () => {
    return (
      <View style={styles.centeredStyle}>
        <Label children={noContentTitle} labelType={LabelTypeProp.h1} />
      </View>
    );
  };

  const renderFooterComponent = () => {
    if (isNonEmptyArray(opinionData)) {
      return (
        <View style={styles.loaderStyle}>
          {opinionLoading && <LoadingState />}
        </View>
      );
    }
    return null;
  };

  const itemSeparatorComponent = () => <Divider style={styles.divider} />;

  const renderOpinionItem = ({item, index}: {item: any; index: number}) => (
    <View style={isTab ? styles.itemContainerTab : styles.itemContainer}>
      <AuthorItem
        body={item.title}
        mediaVisibility={
          item.field_jwplayer_id_opinion_export
            ? isNotEmpty(item.field_jwplayer_id_opinion_export)
            : isNotEmpty(item.jwplayer)
        }
        jwPlayerID={
          isNotEmpty(item.field_jwplayer_id_opinion_export)
            ? item.field_jwplayer_id_opinion_export
            : isNotEmpty(item.jwplayer)
            ? item.jwplayer
            : null
        }
        author={
          isNonEmptyArray(item.field_opinion_writer_node_export)
            ? item.field_opinion_writer_node_export[0].name
            : item.field_opinion_writer_node_export.opinion_writer_photo
        }
        authorId={
          isNonEmptyArray(item.field_opinion_writer_node_export) &&
          item.field_opinion_writer_node_export[0].id
        }
        duration={''}
        image={
          isNonEmptyArray(item.field_opinion_writer_node_export)
            ? getImageUrl(
                item.field_opinion_writer_node_export[0].opinion_writer_photo,
              )
            : getImageUrl(
                item.field_opinion_writer_node_export.opinion_writer_photo,
              )
        }
        index={index}
        nid={item.nid}
        renderLabelsOrder={['title', 'authorName']}
        containerStyle={styles.authorItem}
      />
      {itemSeparatorComponent()}
    </View>
  );

  const renderOpinion = () => (
    <FlatList
      style={isTab ? styles.listContainerTab : styles.listContainer}
      data={opinionData}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      renderItem={renderOpinionItem}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooterComponent}
      numColumns={numberOfColumn}
      columnWrapperStyle={isTab && styles.columnWrapper}
    />
  );

  return (
    <ScreenContainer edge={horizontalEdge} backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
      <View style={styles.container}>
        <AuthorsHorizontalSlider
          authorsList={authorsList}
          onPress={onPress}
          selectedIndex={selectedIndex}
        />
        {(opinionLoading || isLoading )&& pageCount === 0 ? (
          <View style={styles.centeredStyle}>
            <LoadingState />
          </View>
        ) : showEmpty ? (
          showEmptyData()
        ) : (
          renderOpinion()
        )}
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    divider: {
      marginBottom: 20,
      height: 1,
      backgroundColor: theme.dividerColor,
    },
    loaderStyle: {
      width: '100%',
      height: 80,
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    centeredStyle: {
      flex: 0.95,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContainer: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: colors.transparent,
      paddingBottom: 0,
      marginEnd: 0.04 * screenWidth,
    },
    listContainerTab: {
      flex: 1,
      backgroundColor: colors.transparent,
      paddingVertical: 20,
      marginHorizontal: 0.05 * screenWidth,
    },
    itemContainer: {
      flex: 1,
      marginStart: 0.04 * screenWidth,
    },
    itemContainerTab: {
      flex: 0.48,
      marginStart: 0,
    },
    screenBackgroundColor: {
      backgroundColor: theme.backgroundColor,
    },
    columnWrapper: {
      flex: 1,
      justifyContent: 'space-between',
    },
    authorItem: {
      paddingRight: 0,
      width: '100%'
    },
  });

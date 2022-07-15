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
import {AllWritersBodyGet} from 'src/redux/allWriters/types';
import {FavouriteOpinionsBodyGet} from 'src/redux/contentForYou/types';
import {getImageUrl} from 'src/shared/utils/utilities';
import {
  TranslateConstants,
  TranslateKey,
} from 'src/constants/TranslateConstants';

const keyExtractor = (_: any, index: number) => index.toString();

export const MyNewsWriters = () => {
  const styles = useThemeAwareObject(customStyle);
  const {
    allWritersData,
    selectedAuthorsData,
    fetchAllWritersRequest,
    getSelectedAuthorsData,
  } = useAllWriters();
  const {
    isLoading: opinionLoading,
    favouriteOpinionsData,
    fetchFavouriteOpinionsRequest,
  } = useContentForYou();
  const noContentTitle = TranslateConstants({
    key: TranslateKey.NO_CONTENT_TITLE,
  });
  const [pageCount, setPageCount] = useState(0);
  const [selectedAuthors, setSelectedAuthors] = useState<any>(null);
  const [opinionData, setOpinionData] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [showEmpty, setShowEmpty] = useState<boolean>(false);
  const allWritersPayload: AllWritersBodyGet = {
    items_per_page: 50,
  };

  const authorsList = useMemo(() => {
    let writersList = [];
    if (
      isNonEmptyArray(allWritersData) &&
      isNonEmptyArray(selectedAuthorsData.data)
    ) {
      const authorsIdList = selectedAuthorsData.data.map((item: any) => {
        return item.tid.toString();
      });
      for (let i = 0; i < allWritersData.length; i++) {
        if (authorsIdList.includes(allWritersData[i].tid)) {
          writersList.push(allWritersData[i]);
        }
      }
    }

    return writersList;
  }, [selectedAuthorsData, allWritersData]);

  useEffect(() => {
    fetchAllWritersRequest(allWritersPayload);
    getSelectedAuthorsData();
  }, []);

  useEffect(() => {
    setInitialData();
  }, [selectedAuthorsData]);

  useEffect(() => {
    if (pageCount != 0) {
      fetchOpinionData(selectedAuthors, pageCount);
    }
  }, [pageCount]);

  useEffect(() => {
    !opinionLoading && !isNonEmptyArray(opinionData) && pageCount == 0
      ? setShowEmpty(true)
      : setShowEmpty(false);
  }, [opinionData]);

  useEffect(() => {
    if (opinionData != favouriteOpinionsData) {
      setOpinionData((opinionData: any) => [
        ...opinionData,
        ...favouriteOpinionsData,
      ]);
    }
  }, [favouriteOpinionsData]);

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

  const fetchOpinionData = (authorsData: any, page: number) => {
    let opinionBody: FavouriteOpinionsBodyGet = {
      page: page,
      items_per_page: isTab ? 12 : 10,
      authorsList: authorsData,
    };
    fetchFavouriteOpinionsRequest(opinionBody);
  };

  const onPress = (item: any, index: number) => {
    if (index == selectedIndex) return;
    const payloadAuthorsList = index == -1 ? getAuthorsList() : [item.tid];
    if (payloadAuthorsList != selectedAuthors) {
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
    <View style={styles.itemContainer}>
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
      />
      {itemSeparatorComponent()}
    </View>
  );

  const renderOpinion = () => (
    <FlatList
      style={styles.listContainer}
      data={opinionData}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      renderItem={renderOpinionItem}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooterComponent}
      numColumns={numberOfColumn}
    />
  );

  return (
    <ScreenContainer edge={horizontalEdge}>
      <View style={styles.container}>
        <AuthorsHorizontalSlider
          authorsList={authorsList}
          onPress={onPress}
          selectedIndex={selectedIndex}
        />
        {opinionLoading && pageCount == 0 ? (
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
      marginTop: -10,
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
      paddingBottom: isTab ? 20 : 0,
      marginEnd: (isTab ? 0.02 : 0.04) * screenWidth,
    },
    itemContainer: {
      flex: 1,
      marginStart: (isTab ? 0.02 : 0.04) * screenWidth,
    },
  });

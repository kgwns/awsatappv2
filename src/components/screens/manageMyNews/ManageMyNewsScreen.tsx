import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { horizontalEdge, isNonEmptyArray, normalize, screenHeight, screenWidth, } from 'src/shared/utils';
import { BorderLabel, Divider, Label } from 'src/components/atoms';
import { ScreenContainer } from '..';
import { useTranslation } from 'react-i18next';
import { FollowFavoriteAuthor } from 'src/components/molecules';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { flatListUniqueKey, ScreensConstants } from 'src/constants';
import { useAllSiteCategories, useAllWriters } from 'src/hooks';
import { AllWritersBodyGet, AllWritersItemType } from 'src/redux/allWriters/types';
import { AllSiteCategoriesBodyGet, AllSiteCategoriesItemType, } from 'src/redux/allSiteCategories/types';
import { decode } from 'html-entities';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export const ManageMyNewsScreen = () => {
  const navigation = useNavigation();
  const style = useThemeAwareObject(customStyle);
  const [t] = useTranslation();
  const [selectedAuthors, setSelectedAuthors] = useState<AllWritersItemType[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<AllSiteCategoriesItemType[]>([]);
  const isFocused = useIsFocused();

  const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
    items_per_page: 50,
  };

  const allWritersPayload: AllWritersBodyGet = {
    items_per_page: 50,
  };

  const {
    allWritersData,
    getSelectedAuthorsData,
    selectedAuthorsData,
    fetchAllWritersRequest,
    isLoading,
    emptySelectedAuthorsInfoData,
  } = useAllWriters();

  const {
    fetchAllSiteCategoriesRequest,
    allSiteCategoriesData,
    getSelectedTopicsData,
    selectedTopicsData,
    emptySelectedTopicsInfoData,
  } = useAllSiteCategories()

  useEffect(() => {
    if (isFocused) {
      emptySelectedAuthorsInfoData()
      emptySelectedTopicsInfoData()
      getSelectedAuthorsData()
      getSelectedTopicsData()
      fetchAllWritersRequest(allWritersPayload)
      fetchAllSiteCategoriesRequest(allSiteCategoriesPayload)
      fetchSelectedDataFromAllWriters()
      fetchSelectedDataFromAllTopics()
    }
  }, [isFocused]);


  useEffect(() => {
    fetchSelectedDataFromAllWriters();
  }, [selectedAuthorsData, allWritersData.length]);

  useEffect(() => {
    fetchSelectedDataFromAllTopics();
  }, [selectedTopicsData, allSiteCategoriesData.length]);

  const fetchSelectedDataFromAllWriters = () => {
    if (isNonEmptyArray(allWritersData) && isNonEmptyArray(selectedAuthorsData.data)) {
      if (selectedAuthors.length > 0) {
        setSelectedAuthors([]);
      }
      for (let i = 0; i < selectedAuthorsData.data.length; i++) {
        for (let j = 0; j < allWritersData.length; j++) {
          if (selectedAuthorsData.data[i].tid == allWritersData[j].tid) {
            selectedAuthors?.push(allWritersData[j]);
          }
        }
      }
    }
  };

  const fetchSelectedDataFromAllTopics = () => {
    if (isNonEmptyArray(allSiteCategoriesData) && isNonEmptyArray(selectedTopicsData.data)) {
      if (selectedTopics.length > 0) {
        setSelectedTopics([]);
      }
      for (let i = 0; i < selectedTopicsData.data.length; i++) {
        for (let j = 0; j < allSiteCategoriesData.length; j++) {
          if (selectedTopicsData.data[i].tid == allSiteCategoriesData[j].tid) {
            selectedTopics?.push(allSiteCategoriesData[j]);
          }
        }
      }
    }
  };

  const renderItemBooks = (item: any) => (
    <FollowFavoriteAuthor
      authorName={item.name}
      authorImage={item.field_opinion_writer_photo_export}
      isSelected={true}
      onPress={() => { }}
      clickable={false}
    />
  );

  const renderItemTopics = (item: any) => (
    <View style={style.renderItemTopics}>
      <BorderLabel label={decode(item.name)} onPress={() => { }} isSelected={true} clickable={false} />
    </View>
  );

  const ContinueLabel = ({ label, goToScreen }: { label: any, goToScreen: any }) => (
    <TouchableWithoutFeedback style={style.continueLabelView} onPress={() => {
      navigation.navigate(goToScreen)
    }
    }>
      {getSvgImages({
        name: ImagesName.plusSvg,
        size: normalize(9),
      })}
      <Label style={style.continueLabel}>{label}</Label>
    </TouchableWithoutFeedback>
  );

  const MyFavoriteBooks = (props: any) => {
    const data = props.data;
    return (
      <View style={style.favBooksView}>
        <Label style={style.titleLabel}>
          {t('manageMyNews.myFavoriteBooks')}
        </Label>
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => renderItemBooks(item)}
          showsHorizontalScrollIndicator={false}
        />
        <View style={style.booksContinue}>
          <ContinueLabel label={t('manageMyNews.continueReadingMoreBooks')} goToScreen={ScreensConstants.MANAGE_MY_FAVORITE_AUTHOR_SCREEN} />
        </View>
        <View style={style.booksDivider}>
          <Divider />
        </View>
      </View>
    );
  }

  const MyFavoriteTopics = (props: any) => {
    const data = props.data;
    return (
      <View>
        <Label style={style.titleLabel}>
          {t('manageMyNews.myFavoriteTopics')}
        </Label>
        <View style={style.favTopicsView}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={style.favTopicsScrollView}>
            <FlatList
              listKey={flatListUniqueKey.INTERESTED_TOPICS}
              keyExtractor={(_, index) => index.toString()}
              numColumns={data ? Math.ceil(data.length / 3) : 3}
              data={data}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => renderItemTopics(item)}
            />
          </ScrollView>
        </View>
        <View style={style.topicsContinue}>
          <ContinueLabel label={t('manageMyNews.followMoreTopics')} goToScreen={ScreensConstants.MANAGE_MY_FAVORITE_TOPICS_SCREEN} />
        </View>
      </View>
    );
  }

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading}>
      <View style={style.container}>
        <View style={style.favBooks}>
          {selectedAuthors && (
            <MyFavoriteBooks data={selectedAuthors} />
          )}
        </View>
        <View style={style.favTopics}>
          {isNonEmptyArray(selectedTopics) && (
            <MyFavoriteTopics data={selectedTopics} />
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const ManageMyNewsScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
    },
    favBooks: {
      flex: 0.5,
      paddingTop: 0.01 * screenHeight,
    },
    favTopics: {
      flex: 0.5,
      paddingVertical: 0.02 * screenHeight,
    },
    favBooksView: {
      paddingTop: 0.05 * screenWidth,
      alignItems: 'flex-start'
    },
    favTopicsScrollView: {
      paddingVertical: 0.04 * screenWidth,
    },
    favTopicsView: {
      width: '100%',
      alignItems: 'flex-start',
    },
    titleLabel: {
      fontSize: normalize(18),
      lineHeight: normalize(42),
      color: theme.primary,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingHorizontal: 0.04 * screenWidth,
    },
    booksContinue: {
      paddingTop: 0.02 * screenWidth,
      paddingStart: 0.04 * screenWidth,
    },
    topicsContinue: {
      paddingStart: 0.04 * screenWidth,
    },
    booksDivider: {
      paddingTop: 0.05 * screenWidth,
    },
    continueLabelView: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      borderRadius: normalize(50 / 2),
      paddingHorizontal: 0.06 * screenWidth,
    },
    continueLabel: {
      fontSize: normalize(12),
      lineHeight: normalize(42),
      fontWeight: 'bold',
      color: theme.secondaryDavyGrey,
      marginStart: normalize(10),
    },
    renderItemTopics: {
      paddingBottom: 0.03 * screenWidth,
      paddingStart: 0.02 * screenWidth,
    },
  });
  return ManageMyNewsScreenStyle;
};

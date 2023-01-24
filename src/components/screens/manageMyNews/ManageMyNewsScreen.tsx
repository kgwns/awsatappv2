import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, isNotchDevice, normalize, screenHeight, screenWidth, joinArray, isIOS } from 'src/shared/utils';
import { BorderLabel, Divider, Label } from 'src/components/atoms';
import { ScreenContainer } from '..';
import { FollowFavoriteAuthor } from 'src/components/molecules';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { flatListUniqueKey, ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useAllSiteCategories, useAllWriters } from 'src/hooks';
import { AllWritersBodyGet, AllWritersItemType } from 'src/redux/allWriters/types';
import { AllSiteCategoriesBodyGet, AllSiteCategoriesItemType, } from 'src/redux/allSiteCategories/types';
import { decode } from 'html-entities';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AlertPayloadType } from '../ScreenContainer/ScreenContainer';
import { fonts } from 'src/shared/styles/fonts';
import { FLEX_START } from 'src/shared/styles/item-alignment';

const ContinueLabel = ({ label, goToScreen, writer, onPressContinue }: { label: any, goToScreen: any, writer: boolean, onPressContinue: (writer: boolean, goToScreen: any) => void; }) => {
  const style = useThemeAwareObject(customStyle);
  return (
    <TouchableWithoutFeedback testID='continueId' onPress={() => onPressContinue(writer, goToScreen)}>
      <View style={style.continueLabelView}>
        {getSvgImages({
          name: ImagesName.plusSvg,
          size: normalize(9),
        })}
        <Label style={style.continueLabel}>{label}</Label>
      </View>
    </TouchableWithoutFeedback>
  )
};

const MyFavoriteBooks = (props: any) => {
  const style = useThemeAwareObject(customStyle);
  const data = props.data;
  const scrollRef = useRef<any>(null);
  const MANAGE_MY_NEWS_MY_FAVORITE_BOOKS = TranslateConstants({ key: TranslateKey.MANAGE_MY_NEWS_MY_FAVORITE_BOOKS })
  const MANAGE_MY_NEWS_CONTINUE_READING_MORE_BOOKS = TranslateConstants({ key: TranslateKey.MANAGE_MY_NEWS_CONTINUE_READING_MORE_BOOKS })

  const scrollToStart = () => {
    if (isIOS) {
      scrollRef.current?.scrollTo(0);
    } else {
      scrollRef.current?.scrollToEnd();
    }
  }

  return (
    <View style={style.favBooksView}>
      <Label style={style.titleLabel}>
        {MANAGE_MY_NEWS_MY_FAVORITE_BOOKS}
      </Label>
      {isNonEmptyArray(data) && <ScrollView horizontal={true} bounces={false} ref={scrollRef} showsHorizontalScrollIndicator={false} onContentSizeChange={scrollToStart} keyboardShouldPersistTaps={'always'} >
        {
          data.map((item: any, index: number) =>
            <FollowFavoriteAuthor
              testId='ManageMyNewsScreenID01'
              authorName={item.name}
              authorImage={item.field_opinion_writer_photo_export}
              isSelected={true}
              onPress={() => props.favAuthorOnPress && props.favAuthorOnPress(item)}
              key={'manageAuthor' + index}
              imageSize={85}
              containerStyle={index === 0 ? { paddingStart: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth) } : {}}
            />)
        }
      </ScrollView>}
      <View style={style.booksContinue}>
        <ContinueLabel label={MANAGE_MY_NEWS_CONTINUE_READING_MORE_BOOKS} goToScreen={ScreensConstants.MANAGE_MY_FAVORITE_AUTHOR_SCREEN} writer={true} onPressContinue={props.onPressContinue} />
      </View>
    </View>
  );
}

const MyFavoriteTopics = (props: any) => {
  const style = useThemeAwareObject(customStyle);
  const data = props.data;
  const numberOfTopics = data.length as number
  const numberOfRows = isTab ? numberOfTopics > 7 ? 3 : 1 : numberOfTopics > 3 ? 3 : 1;
  const scrollRef = useRef<any>(null);
  const MANAGE_MY_NEWS_MY_FAVORITE_TOPICS = TranslateConstants({ key: TranslateKey.MANAGE_MY_NEWS_MY_FAVORITE_TOPICS })
  const MANAGE_MY_NEWS_FOLLOW_MORE_TOPICS = TranslateConstants({ key: TranslateKey.MANAGE_MY_NEWS_FOLLOW_MORE_TOPICS })

  const scrollToStart = () => {
    if (isIOS) {
      scrollRef.current?.scrollTo(0);
    } else {
      scrollRef.current?.scrollToEnd();
    }
  }

  const renderItemTopics = (item: any, index: number) => (
    <View style={style.renderItemTopics} key={index}>
      <BorderLabel label={decode(item.name)} onPress={() => props.onPressTopicItem && props.onPressTopicItem(item)} isSelected={true} clickable={true} />
    </View>
  );

  const renderTopics = () => {
    let rows = data ? Math.ceil(data.length / numberOfRows) : 3
    return (
      <>
        <Label style={style.titleLabel}>
          {MANAGE_MY_NEWS_MY_FAVORITE_TOPICS}
        </Label>
        {isNonEmptyArray(data) && <View style={style.favTopicsView}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            ref={scrollRef}
            onContentSizeChange={scrollToStart}
            style={style.favTopicsScrollView}>
            <FlatList
              listKey={`${flatListUniqueKey.INTERESTED_TOPICS}-${rows}`}
              keyExtractor={(_, index) => index.toString()}
              numColumns={rows}
              key={`${flatListUniqueKey.INTERESTED_TOPICS}-${rows}`}
              data={data}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              bounces={false}
              renderItem={({ item, index }) => renderItemTopics(item, index)}
              style={{ marginLeft: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth), }}
            />
          </ScrollView>
        </View>}
        <View style={style.topicsContinue}>
          <ContinueLabel 
            label={MANAGE_MY_NEWS_FOLLOW_MORE_TOPICS} 
            goToScreen={ScreensConstants.MANAGE_MY_FAVORITE_TOPICS_SCREEN} 
            writer={false} 
            onPressContinue={props.onPressContinue} 
          />
        </View>
      </>
    )
  }

  return (
    <View>
      {renderTopics()}
    </View>
  );
}

export const ManageMyNewsScreen = () => {

  const navigation = useNavigation();
  const style = useThemeAwareObject(customStyle);
  const isFocused = useIsFocused();

  const MANAGE_MY_NEWS_ALERT = TranslateConstants({ key: TranslateKey.MANAGE_MY_NEWS_ALERT })
  const MANAGE_MY_NEWS_REMOVE_AUTHOR = TranslateConstants({ key: TranslateKey.MANAGE_MY_NEWS_REMOVE_AUTHOR })
  const MANAGE_MY_NEWS_REMOVE = TranslateConstants({ key: TranslateKey.MANAGE_MY_NEWS_REMOVE })
  const MANAGE_MY_NEWS_REMOVE_TOPIC = TranslateConstants({ key: TranslateKey.MANAGE_MY_NEWS_REMOVE_TOPIC })


  const {
    allWritersData,
    isLoading: authorLoading,
    getSelectedAuthorsData,
    selectedAuthorsData,
    fetchAllWritersRequest,
    emptySelectedAuthorsInfoData,
    requestAllSelectedWritersDetailsData,
    allSelectedWritersDetailList,
    selectedAuthorLoadingState,
    sendSelectedWriterInfo,
    sentAuthorInfoData,
    emptySendAuthorInfoData
  } = useAllWriters();

  const {
    isLoading,
    fetchAllSiteCategoriesRequest,
    allSiteCategoriesData,
    getSelectedTopicsData,
    selectedTopicsData,
    emptySelectedTopicsInfoData,
    sendSelectedTopicInfo,
    sentTopicsData,
    emptySendTopicsInfoData
  } = useAllSiteCategories()

  const [selectedWriters, setSelectedWriters] = useState<AllWritersItemType[]>([])
  const [selectedInterested, setSelectedInterested] = useState<AllSiteCategoriesItemType[]>([])
  const [filteredSelectedAuthor, setFilteredSelectedAuthor] = useState([]);
  const [filteredSelectedTopic, setFilteredSelectedTopic] = useState<string[]>([]);

  const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
    items_per_page: 50,
  };

  const allWritersPayload: AllWritersBodyGet = {
    items_per_page: 50,
  };

  const removeFavAuthorAlertPayload: AlertPayloadType = {
    title: MANAGE_MY_NEWS_ALERT,
    message: MANAGE_MY_NEWS_REMOVE_AUTHOR,
    buttonTitle: MANAGE_MY_NEWS_REMOVE
  }


  const removeTopicAlertPayload: AlertPayloadType = {
    title: MANAGE_MY_NEWS_ALERT,
    message: MANAGE_MY_NEWS_REMOVE_TOPIC,
    buttonTitle: MANAGE_MY_NEWS_REMOVE
  }

  const Remove_Author = 'Remove_Author';
  const Remove_Topic = 'Remove_Topic';

  const [alertPayload, setAlertPayload] = useState(removeFavAuthorAlertPayload);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [popupType, setPopupType] = useState(Remove_Author);

  useEffect(() => {
    if (isFocused) {
      fetchAllWritersRequest(allWritersPayload)
      fetchAllSiteCategoriesRequest(allSiteCategoriesPayload)
      getSelectedAuthorsData()
      getSelectedTopicsData()
      // fetchSelectedDataFromAllWriters()
      fetchSelectedDataFromAllTopics()
    }
  }, [isFocused]);

  useEffect(() => {
    return () => {
      emptySelectedAuthorsInfoData();
    }
  }, [])

  useEffect(() => {
    if (isObjectNonEmpty(selectedAuthorsData)) {
      fetchAllWritersRequest(allWritersPayload)
      getSelectedAuthorsData()
    }
  }, [sentAuthorInfoData])

  useEffect(() => {
    if (isObjectNonEmpty(sentTopicsData)) {
      fetchAllSiteCategoriesRequest(allSiteCategoriesPayload)
      getSelectedTopicsData()
    }
  }, [sentTopicsData])


  useEffect(() => {
    if (isObjectNonEmpty(selectedAuthorsData)) {
      fetchSelectedDataFromAllWriters();
    }
  }, [selectedAuthorsData]);

  useEffect(() => {
    fetchSelectedDataFromAllTopics();
  }, [selectedTopicsData, allSiteCategoriesData]);

  useEffect(() => {
    if (isFocused && allSelectedWritersDetailList) {
      let allSelectedWriters = allSelectedWritersDetailList
      let selectedWritersWithCorrectOrder = selectedAuthorsData.data;
      let tidArray: string[] = []
      selectedWritersWithCorrectOrder?.forEach((arr: any) => {
        tidArray.push(arr.tid);
      });
      const arrayAfterSort = tidArray.map((i) => allSelectedWriters.find((j) => j.tid == i)) as any;
      setSelectedWriters(arrayAfterSort)
    }
  }, [allSelectedWritersDetailList]);

  const alertOnPress = () => {
    if (popupType === Remove_Author) {
      const authorsData = selectedWriters.filter((i) => filteredSelectedAuthor.find((j) => Number(j) == Number(i.tid)));
      setSelectedWriters(authorsData)
      sendSelectedWriterInfo({ tid: joinArray(filteredSelectedAuthor), isList: true })
      setFilteredSelectedAuthor([]);
    } else if (popupType === Remove_Topic) {
      sendSelectedTopicInfo({ tid: joinArray(filteredSelectedTopic) })
      const topicsData = selectedInterested.filter((i) => filteredSelectedTopic.find((j) => Number(j) == Number(i.tid)));
      setSelectedInterested(topicsData)
    }
    setIsAlertVisible(false);
  }

  const fetchSelectedDataFromAllWriters = () => {
    if (selectedAuthorsData.data && selectedAuthorsData.data.length === 0) {
      setSelectedWriters([])
    }
    if (isNonEmptyArray(selectedAuthorsData.data)) {
      const selectedAuthorsString = getSelectedData().join('+')
      requestAllSelectedWritersDetailsData({ tid: selectedAuthorsString, items_per_page: 100 })
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

  const fetchSelectedDataFromAllTopics = () => {
    if (selectedTopicsData.data && selectedTopicsData.data.length === 0) {
      setSelectedInterested([])
    }
    if (isNonEmptyArray(allSiteCategoriesData) && isNonEmptyArray(selectedTopicsData.data)) {
      const selectedTopics = []
      for (let i = 0; i < selectedTopicsData.data.length; i++) {
        for (let j = 0; j < allSiteCategoriesData.length; j++) {
          if (selectedTopicsData.data[i].tid == allSiteCategoriesData[j].tid) {
            selectedTopics?.push(allSiteCategoriesData[j]);
          }
        }
      }
      setSelectedInterested(selectedTopics)
    }
  };

  const onPressTopicItem = (item: any) => {
    setAlertPayload(removeTopicAlertPayload)
    setPopupType(Remove_Topic);
    setFilteredSelectedTopic(getSelectedTopicIds().filter(e => Number(e) !== Number(item.tid)))
    setIsAlertVisible(true);
  }

  const getSelectedTopicIds = () => {
    return selectedInterested.reduce((prevValue: string[], item: AllSiteCategoriesItemType) => {
      return prevValue.concat(item.tid)
    }, [])
  }

  const favAuthorOnPress = (item: any) => {
    setPopupType(Remove_Author);
    setAlertPayload(removeFavAuthorAlertPayload)
    setFilteredSelectedAuthor(getSelectedData().filter((e: any) => Number(e) !== Number(item.tid)))
    setIsAlertVisible(true);
  }

  const onPressContinue = (writer: boolean, goToScreen: any) => {
    writer && setSelectedWriters([])
    emptySendAuthorInfoData()
    emptySendTopicsInfoData()
    navigation.navigate(goToScreen as never)
  }

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={selectedAuthorLoadingState}
      isAlertVisible={isAlertVisible}
      alertPayload={alertPayload} alertOnPress={alertOnPress}
      setIsAlertVisible={(isVisible: boolean) => setIsAlertVisible(isVisible)}
      backgroundColor={style.screenBackgroundColor.backgroundColor}
    >
      <View style={style.container}>
        <View style={style.favBooks}>
          <MyFavoriteBooks data={selectedWriters} favAuthorOnPress={favAuthorOnPress} onPressContinue={onPressContinue} />
        </View>
        <Divider style={style.divider} />
        <View style={style.favTopics}>
          <MyFavoriteTopics data={selectedInterested} onPressTopicItem={onPressTopicItem} onPressContinue={onPressContinue} />
        </View>
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const ManageMyNewsScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: normalize(3)
    },
    favBooks: {
      flex: isTab ? 0.55 : isIOS ? !isNotchDevice ? 0.57 : 0.47 : 0.50,
      paddingTop: 0.05 * screenHeight,
    },
    favTopics: {
      flex: 0.5,
      paddingVertical: 0.04 * screenHeight,
    },
    favBooksView: {
      paddingTop: 0.05 * screenWidth,
      alignItems: FLEX_START
    },
    favTopicsScrollView: {
      paddingVertical: 0.04 * screenWidth,
    },
    favTopicsView: {
      width: '100%',
      alignItems: FLEX_START,
    },
    titleLabel: {
      fontSize: normalize(18),
      lineHeight: normalize(42),
      color: theme.primary,
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'left',
      paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    booksContinue: {
      paddingVertical: 0.05 * screenWidth,
      paddingStart: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    topicsContinue: {
      paddingVertical: 0.05 * screenWidth,
      paddingStart: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    booksDivider: {
      paddingTop: 0.05 * screenWidth,
    },
    continueLabelView: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: FLEX_START,
      borderRadius: normalize(50 / 2),
      paddingHorizontal: 0.06 * screenWidth,
    },
    continueLabel: {
      fontSize: normalize(12),
      lineHeight: normalize(42),
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.secondaryDavyGrey,
      marginStart: normalize(10),
    },
    renderItemTopics: {
      paddingBottom: normalize(10),
      paddingRight: normalize(10),
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor,
      marginStart: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    screenBackgroundColor: {
      backgroundColor: theme.profileBackground
    }
  });
  return ManageMyNewsScreenStyle;
};
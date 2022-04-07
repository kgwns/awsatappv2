import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, normalize, screenHeight, screenWidth, joinArray} from 'src/shared/utils';
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
import { AlertPayloadType } from '../ScreenContainer/ScreenContainer';



export const ManageMyNewsScreen = () => {
  const navigation = useNavigation();
  const style = useThemeAwareObject(customStyle);
  const [t] = useTranslation();
  const isFocused = useIsFocused();
  const [selectedWriters,setSelectedWriters]=useState<AllWritersItemType[]>([])
  const [selectedInterested,setSelectedInterested]=useState<AllSiteCategoriesItemType[]>([])

  const [filteredSelectedAuthor, setFilteredSelectedAuthor] = useState([]);
  const [filteredSelectedTopic, setFilteredSelectedTopic] = useState<string[]>([]);

  

  const removeFavAuthorAlertPayload : AlertPayloadType = {
    title : t('manageMyNews.alert'),
    message: t('manageMyNews.removeAuthor'),
    buttonTitle: t('manageMyNews.remove')
  }

  const removeTopicAlertPayload : AlertPayloadType = {
    title : t('manageMyNews.alert'),
    message: t('manageMyNews.removeTopic'),
    buttonTitle: t('manageMyNews.remove')
  }

  const Remove_Author = 'Remove_Author';
  const Remove_Topic = 'Remove_Topic';

  const [alertPayload, setAlertPayload] = useState(removeFavAuthorAlertPayload);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [popupType, setPopupType] = useState(Remove_Author);

  const alertOnPress = () => {
    if(popupType === Remove_Author){
       sendSelectedWriterInfo({ tid: joinArray(filteredSelectedAuthor), isList: true })
       setIsAlertVisible(false);
       setFilteredSelectedAuthor([]);
    }else if( popupType === Remove_Topic) {
      sendSelectedTopicInfo({ tid: joinArray(filteredSelectedTopic) })
      setIsAlertVisible(false);
    }
  }

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
    requestAllSelectedWritersDetailsData,
    allSelectedWritersDetailList,
    selectedAuthorLoadingState,
    sendSelectedWriterInfo,
    sentAuthorInfoData,
    emptySendAuthorInfoData
  } = useAllWriters();

  const {
    fetchAllSiteCategoriesRequest,
    allSiteCategoriesData,
    getSelectedTopicsData,
    selectedTopicsData,
    emptySelectedTopicsInfoData,
    sendSelectedTopicInfo,
    sentTopicsData,
    emptySendTopicsInfoData
  } = useAllSiteCategories()

  useEffect(() => {
    if (isFocused) {
      setSelectedWriters([])
      emptySelectedTopicsInfoData()
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
      emptySelectedAuthorsInfoData()
    }
  }, [])

  useEffect(() => {
    if(selectedAuthorsData !== {}){
      setSelectedWriters([])
      fetchAllWritersRequest(allWritersPayload)
      getSelectedAuthorsData()
    }
  }, [sentAuthorInfoData])

   useEffect(() => {
    if(sentTopicsData !== {}){
      fetchAllSiteCategoriesRequest(allSiteCategoriesPayload)
      getSelectedTopicsData()
    }
  }, [sentTopicsData])


  useEffect(() => {
    if (isObjectNonEmpty(selectedAuthorsData)) { 
      fetchSelectedDataFromAllWriters(); }
    else { setSelectedWriters([]) }
  }, [selectedAuthorsData]);

  useEffect(() => {
    fetchSelectedDataFromAllTopics();
  }, [selectedTopicsData, allSiteCategoriesData]);

  useEffect(() => {
    if (isFocused && allSelectedWritersDetailList) {
      setSelectedWriters(allSelectedWritersDetailList)
    }
  }, [allSelectedWritersDetailList]);

  const fetchSelectedDataFromAllWriters = () => {
    setSelectedWriters([])
    if (isNonEmptyArray(selectedAuthorsData.data)) {
      const selectedAuthorsString = getSelectedData().join('+')
      requestAllSelectedWritersDetailsData({tid:selectedAuthorsString,items_per_page:100})
    }
  };

  const getSelectedData = () => {
    return selectedAuthorsData.data.reduce((prevValue: string[], item:any ) => {
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
    setIsAlertVisible(true);
    setFilteredSelectedTopic(getSelectedTopicIds.filter(e => e !== item.tid))
  }

  const getSelectedTopicIds = selectedInterested.reduce((prevValue: string[], item: AllSiteCategoriesItemType) => {
    return prevValue.concat(item.tid)
  }, [])

  const renderItemTopics = (item: any) => (
    <View style={style.renderItemTopics}>
      <BorderLabel label={decode(item.name)} onPress={() => onPressTopicItem(item)} isSelected={true} clickable={true} />
    </View>
  );

  const ContinueLabel = ({ label, goToScreen }: { label: any, goToScreen: any }) => (
    <TouchableWithoutFeedback style={style.continueLabelView} onPress={() => {
      emptySendAuthorInfoData()
      emptySendTopicsInfoData()
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

  const favAuthorOnPress = (item: any) => {
    setAlertPayload(removeFavAuthorAlertPayload)
    setIsAlertVisible(true);
    setPopupType(Remove_Author);
    setFilteredSelectedAuthor(getSelectedData().filter(e => e !== Number(item.tid)))
  }

  const MyFavoriteBooks = (props: any) => {
    const data = props.data;
    return (
      <View style={style.favBooksView}>
        <Label style={style.titleLabel}>
          {t('manageMyNews.myFavoriteBooks')}
        </Label>
        {selectedWriters && <ScrollView horizontal={true} bounces={false} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
          {
            data.map((item: any, index: number) =>
            <FollowFavoriteAuthor
            authorName={item.name}
            authorImage={item.field_opinion_writer_photo_export}
            isSelected={true}
            onPress={() => favAuthorOnPress(item)}
            clickable={true}
            key={'manageAuthor' + index}
            imageSize={85}
          />)
          }
        </ScrollView>}
        <View style={style.booksContinue}>
          <ContinueLabel label={t('manageMyNews.continueReadingMoreBooks')} goToScreen={ScreensConstants.MANAGE_MY_FAVORITE_AUTHOR_SCREEN} />
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

  const loadingState = isLoading || selectedAuthorLoadingState
  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={loadingState}
    isAlertVisible={isAlertVisible}
          alertPayload={alertPayload} alertOnPress={alertOnPress}
          setIsAlertVisible={setIsAlertVisible}
          
          >
      <View style={style.container}>
        <View style={style.favBooks}>
            <MyFavoriteBooks data={selectedWriters} />
        </View>
        <Divider style={style.divider}/>
        <View style={style.favTopics}>
            <MyFavoriteTopics data={selectedInterested} />
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
      flex: isTab ? 0.55 : 0.47,
      paddingTop: 0.05 * screenHeight,
    },
    favTopics: {
      flex: 0.5,
      paddingVertical: 0.04 * screenHeight,
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
      paddingVertical: 0.05 * screenWidth,
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
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor,
      marginStart: 0.04 * screenWidth,
  },
  });
  return ManageMyNewsScreenStyle;
};


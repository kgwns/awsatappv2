import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { BorderLabel, Label, NextButton } from 'src/components/atoms';
import { horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, recordLogEvent, screenWidth, isIOS, screenHeight, isStringEqual, } from 'src/shared/utils';
import { InterestedTopics } from 'src/components/organisms';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useAllSiteCategories, useUserProfileData } from 'src/hooks';
import { AllSiteCategoriesBodyGet, AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { ScreenContainer } from 'src/components/screens';
import { fonts } from 'src/shared/styles/fonts';
import { TranslateConstants, TranslateKey, flatListUniqueKey } from '../../../constants/Constants';
import { decode } from 'html-entities';
import { AnalyticsEvents } from 'src/shared/utils/analytics';
import { OnBoardingBottom } from 'src/components/molecules';

export const ManageMyFavoriteTopicsScreen = ({ navigation }: any) => {
  const style = useThemeAwareObject(customTopicsScreenStyle);

  const { isLoading, allSiteCategoriesData, sentTopicsData,
    sendSelectedTopicInfo, fetchAllSiteCategoriesRequest, selectedTopicsData, getSelectedTopicsData
  } = useAllSiteCategories();

  const [topicsData,setTopicsData] = useState<AllSiteCategoriesItemType[]>([])
  const [disableNext, setDisableNext] = useState<boolean>(true)
  const {userProfileData} = useUserProfileData();
  const OK = TranslateConstants({key:TranslateKey.COMMON_OK});
  const ONBOARD_COMMON_DONE = TranslateConstants({key:TranslateKey.ONBOARD_COMMON_DONE})
  const ONBOARD_SELECT_TOPICS_TITLE = TranslateConstants({key:TranslateKey.ONBOARD_SELECT_TOPICS_TITLE})
  const ONBOARD_SELECT_TOPICS_DESCRIPTION = TranslateConstants({key:TranslateKey.ONBOARD_SELECT_TOPICS_DESCRIPTION})
  const ONBOARD_SELECT_TOPICS_DESCRIPTION_TAB = TranslateConstants({key:TranslateKey.ONBOARD_SELECT_TOPICS_DESCRIPTION_TAB})

  const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
    items_per_page: 50,
  };

  useEffect(() => {
    getSelectedTopicsData();
    fetchAllSiteCategoriesRequest(allSiteCategoriesPayload);
  }, []);

  useEffect(() => {
    if (isNonEmptyArray(allSiteCategoriesData) && isNonEmptyArray(selectedTopicsData.data)) {
      setAllTopicsData();
    }else{
      setTopicsData(allSiteCategoriesData)
    }
  }, [allSiteCategoriesData]);

  const getSelectedOrNot = (tid: any) => {
    for (const item of selectedTopicsData.data) {
      if (isStringEqual(tid, item.tid)) {
        return true
      }
    }
    return false
  }

  const setAllTopicsData = () => {
    if (isNonEmptyArray(allSiteCategoriesData) && isNonEmptyArray(selectedTopicsData.data)) {
      for (let i = 0; i < allSiteCategoriesData.length; i++) {
        topicsData[i] = ({
          name: allSiteCategoriesData[i].name,
          description__value_export: allSiteCategoriesData[i].description__value_export,
          field_opinion_writer_path_export: allSiteCategoriesData[i].field_opinion_writer_path_export,
          view_taxonomy_term: allSiteCategoriesData[i].view_taxonomy_term,
          tid: allSiteCategoriesData[i].tid,
          vid_export: allSiteCategoriesData[i].vid_export,
          field_description_export: allSiteCategoriesData[i].field_description_export,
          field_opinion_writer_path_export_1: allSiteCategoriesData[i].field_opinion_writer_path_export_1,
          field_opinion_writer_photo_export: allSiteCategoriesData[i].field_opinion_writer_photo_export,
          parent_target_id_export:allSiteCategoriesData[i].parent_target_id_export,
          isSelected: getSelectedOrNot(allSiteCategoriesData[i].tid),
        })
      }
    }
    updateNextButton()
  }

  useEffect(() => {
    if (isObjectNonEmpty(sentTopicsData)) {
      if (sentTopicsData.code === 200) {
        gotoNext()
      } else {
        Alert.alert(sentTopicsData.message || '', undefined, [{ text: OK }]);
      }
    }
  }, [sentTopicsData]);

  const onTopicsChanged = (item: any) => {
    const data = [...topicsData]
    for(const topicItem of data) {
      if (item.tid === topicItem.tid) {
        topicItem.isSelected = !topicItem.isSelected;
      }
    }
    setTopicsData(data);
    updateNextButton()
  };

  const onPressNext = () => {
      recordLogEvent(AnalyticsEvents.ADD_INTERESTS_TOPICS,{userId: userProfileData.user?.id,interestsIds: joinArray(getSelectedData())});
      sendSelectedTopicInfo({ tid: joinArray(getSelectedData()) })
  }

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNextBtn = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNextBtn)
  }
  
  const getSelectedData = () => {
    return topicsData.reduce((prevValue: string[], item: AllSiteCategoriesItemType) => {
      if (item.isSelected) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])
  }

  const gotoNext = () => {
    navigation.goBack();
  }

  const renderItem = (item: any) => {
    return (
      <View style={style.tabTopicButtonContainer}>
        <BorderLabel label={decode(item.name)}
          isSelected={item.isSelected}
          onPress={() => onTopicsChanged(item)}
          unSelectedContainerStyle={style.tabTopicButtonUnselected}
          tabEnable
        />
      </View>
    )
  }

  const renderContentContainer = () => {
    return (
      <View style={style.contentContainer}>
        {isNonEmptyArray(topicsData) &&
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            listKey={`${flatListUniqueKey.INTERESTED_TOPICS}${new Date().getTime().toString()}`}
            data={topicsData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
            contentContainerStyle={style.itemContainer}
            columnWrapperStyle={style.wrapperStyle}
            numColumns={topicsData.length > 1 ? topicsData.length : 5}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
    )
  }

  const renderBottomContainer = () => (
    <OnBoardingBottom
      title={ONBOARD_COMMON_DONE}
      onPressNext={onPressNext}
      disableNext={disableNext}
    />
  );

  const renderHeaderContainer = () => {
    return(
      <View style={{marginTop: 25}}>
          <Label children={ONBOARD_SELECT_TOPICS_TITLE} style={style.tabTitleStyle} />
          <Label children={ONBOARD_SELECT_TOPICS_DESCRIPTION_TAB} style={style.tabDescStyle} />
      </View>
    )
  }

  if (isTab) {
    return (
      <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading} showPlayer={false} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
        <View style={style.tabContainer}>
          {renderHeaderContainer()}
          {renderContentContainer()}
          {renderBottomContainer()}
        </View>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading} showPlayer={false} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
        <View style={style.container}>
          <View
            style={[
              style.textContainer,
              {justifyContent: 'flex-end'},
            ]}>
            <Label style={style.titleStyle}>
              {ONBOARD_SELECT_TOPICS_TITLE}
            </Label>
            <Label style={style.descStyle}>
              {ONBOARD_SELECT_TOPICS_DESCRIPTION}
            </Label>
          </View>
          <View style={style.widgetContainer}>
            {isNonEmptyArray(topicsData) &&
              <InterestedTopics allSiteCategoriesData={topicsData} onTopicsChanged={onTopicsChanged} />
            }
          </View>
          <View style={style.nextButtonView}>
            <NextButton
              testID="nextButtonTestId"
              title={ONBOARD_COMMON_DONE}
              onPress={onPressNext}
              style={style}
              icon={false}
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }
};

const customTopicsScreenStyle = (theme: CustomThemeType) => 
   StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.onBoardBackground,
      shadowColor: colors.transparent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 0.25,
    },
    widgetContainer: {
      flex: 0.77,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingTop: normalize(10),
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: normalize(20),
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.primary,
      lineHeight: normalize(30),
      paddingBottom: 5,
      paddingHorizontal: 10
    },
    tabTitleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
      fontSize: 31,
      color: theme.primary,
      lineHeight: 48,
      marginHorizontal: 10,
    },
    descStyle: {
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(30),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      marginTop: 10,
      marginBottom: isIOS ? 20 : 10,
    },
    tabDescStyle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      textAlign: 'center',
      fontSize: 20,
      color: theme.secondaryDavyGrey,
      lineHeight:35,
      marginTop: 5,
      marginBottom: 50,
    },
    nextButtonView: {
      flex: 0.1,
      justifyContent: 'flex-end',
      width: isTab ? screenWidth - (2 * 0.02 * screenWidth) : screenWidth - (2 * 0.04 * screenWidth),
      alignSelf: 'center',
      marginBottom: 0.02 * screenHeight,
    },
    nextButtonContainer: {
      height: normalize(51),
      flexDirection: 'row-reverse',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: normalize(25),
    },
    nextButtonIconContainer: {
      position: 'absolute', 
      left: normalize(20)
    },
    nextButtonText: {
      color: theme.primary,
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      fontFamily: fonts.AwsatDigital_Bold,
      lineHeight: normalize(26),
    },
    screenBackgroundColor: {
      backgroundColor: theme.onBoardBackground
    },
    tabContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 0.02 * screenWidth,
    },
    itemContainer: {
      paddingBottom: 211,
    },
    wrapperStyle: {
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabTopicButtonContainer: {
      paddingHorizontal: 10,
      paddingBottom: 25
    },
    tabTopicButtonUnselected: {
      backgroundColor: colors.transparent
    },
});

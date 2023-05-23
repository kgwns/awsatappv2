import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { BorderLabel, Label, NextButton } from 'src/components/atoms';
import { horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, recordLogEvent, screenWidth, isIOS, screenHeight, recordUserProperty } from 'src/shared/utils';
import { InterestedTopics } from 'src/components/organisms';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { flatListUniqueKey, ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useAllSiteCategories, useUserProfileData } from 'src/hooks';
import { AllSiteCategoriesBodyGet, AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { ScreenContainer } from 'src/components/screens';
import { useIsFocused } from '@react-navigation/native';
import { fonts } from 'src/shared/styles/fonts';
import { decode } from 'html-entities';
import { OnBoardingBottom, StepLineCircle } from 'src/components/molecules';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export const SelectTopicsScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused()

  const style = useThemeAwareObject(customTopicsScreenStyle);

  const { isLoading, 
    allSiteCategoriesData, 
    sentTopicsData, 
    sendSelectedTopicInfo, 
    fetchAllSiteCategoriesRequest, 
    updateAllSiteCategoriesData, 
    emptySendTopicsInfoData } = useAllSiteCategories();
  const {userProfileData} = useUserProfileData();

  const [disableNext, setDisableNext] = useState<boolean>(true)
  const [categoriesInfo, setCategoriesInfo] = useState<AllSiteCategoriesItemType[]>([])
  const [updatedTopics, setUpdatedTopics] = useState<string[]>([])

  const OK = TranslateConstants({key:TranslateKey.COMMON_OK})
  const ONBOARD_SELECT_TOPICS_TITLE = TranslateConstants({key:TranslateKey.ONBOARD_SELECT_TOPICS_TITLE})
  const ONBOARD_SELECT_TOPICS_DESCRIPTION = TranslateConstants({key:TranslateKey.ONBOARD_SELECT_TOPICS_DESCRIPTION})
  const ONBOARD_SELECT_TOPICS_DESCRIPTION_TAB = TranslateConstants({key:TranslateKey.ONBOARD_SELECT_TOPICS_DESCRIPTION_TAB})
  const ONBOARD_COMMON_NEXT_BUTTON = TranslateConstants({key:TranslateKey.ONBOARD_COMMON_NEXT_BUTTON})


  const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
    items_per_page: 50,
  };

  useEffect(() => {
    fetchAllSiteCategoriesRequest(allSiteCategoriesPayload);
  }, []);

  useEffect(() => {
      updateAllSiteCategoriesData(updatedTopics);
  }, [isFocused, updatedTopics])

  useEffect(() => {
    setCategoriesInfo(allSiteCategoriesData)
    isNonEmptyArray(categoriesInfo) && updateNextButton();
  }, [isFocused, allSiteCategoriesData])

  useEffect(() => {
    if (isObjectNonEmpty(sentTopicsData)) {
      if (sentTopicsData.code === 200) {
        const selectedTIDData = getSelectedData()
        setUpdatedTopics(selectedTIDData);
        gotoNext()

      } else {
        Alert.alert(sentTopicsData.message || '', undefined, [{ text: OK }]);
      }
    }
  }, [sentTopicsData]);

  const onTopicsChanged = (item: any, selected: boolean) => {
    const data = [...categoriesInfo]
    for(const categoryItem of data) {
      if (item.tid === categoryItem.tid) {
        categoryItem.isSelected = selected;
      }
    }
    setCategoriesInfo(data)
    updateNextButton()
  };

  const onPressNext = () => {
    if (isNonEmptyArray(getSelectedData())) {
      const selectedId = joinArray(getSelectedData());
      recordUserProperty(AnalyticsEvents.PERSONALIZED_SECTIONS, selectedId);
      recordLogEvent(AnalyticsEvents.ADD_INTERESTS_TOPICS, {userId: userProfileData.user?.id,interestsIds: joinArray(getSelectedData())});
      sendSelectedTopicInfo({ tid: joinArray(getSelectedData()) })
    }
  }

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNextBtn = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNextBtn)
  }
  
  const getSelectedData = () => {
    return categoriesInfo.reduce((prevValue: string[], item: AllSiteCategoriesItemType) => {
      if (item.isSelected) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])
  }

  const gotoNext = () => {
    navigation.navigate(ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN)
    emptySendTopicsInfoData();
  }

  const renderItem = (item: any) => {
    return (
      <View style={style.tabTopicButtonContainer}>
        <BorderLabel label={decode(item.name)}
          isSelected={item.isSelected}
          onPress={selected => onTopicsChanged(item, selected)}
          unSelectedContainerStyle={style.tabTopicButtonUnselected}
          tabEnable
        />
      </View>
    )
  }

  const renderContentContainer = () => {
    return (
      <View style={style.contentContainer}>
        {isNonEmptyArray(categoriesInfo) &&
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            listKey={`${flatListUniqueKey.INTERESTED_TOPICS}${new Date().getTime().toString()}`}
            data={categoriesInfo}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
            contentContainerStyle={style.itemContainer}
            columnWrapperStyle={style.wrapperStyle}
            numColumns={categoriesInfo.length > 1 ? categoriesInfo.length : 5}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
    )
  }

  const renderBottomContainer = () => (
    <OnBoardingBottom
      title={ONBOARD_COMMON_NEXT_BUTTON}
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

  const renderTopContainer = () => {
    return (
      <View style={style.stepCircleContainer}>
        <StepLineCircle currentStep={1} />
      </View>
    )
  }

  if (isTab) {
    return (
      <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
        <View style={style.tabContainer}>
          {renderTopContainer()}
          {renderHeaderContainer()}
          {renderContentContainer()}
          {renderBottomContainer()}
        </View>
      </ScreenContainer>
    )
  }
  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
      <View style={style.container}>
        <View
          style={[
            style.textContainer,
            {justifyContent: isTab ? 'center' : 'flex-end'},
          ]}>
          <Label style={style.titleStyle}>
            {ONBOARD_SELECT_TOPICS_TITLE}
          </Label>
          <Label style={style.descStyle}>
            {ONBOARD_SELECT_TOPICS_DESCRIPTION}
          </Label>
        </View>
        <View style={style.widgetContainer}>
          {isNonEmptyArray(categoriesInfo) &&
            <InterestedTopics allSiteCategoriesData={categoriesInfo} onTopicsChanged={onTopicsChanged} />
          }
        </View>
        <View style={style.nextButtonView}>
        <NextButton 
            testID="nextButtonTestId"
            disabled={disableNext}
            title={ONBOARD_COMMON_NEXT_BUTTON}
            onPress={onPressNext}
            style={style}
          />
        </View>
      </View>
    </ScreenContainer>
  );
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
      paddingBottom: normalize(10)
    },
    textContainer: {
      flex: 0.25,
    },
    widgetContainer: {
      flex: 0.80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingTop: normalize(10),
    },
    titleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
      fontSize: normalize(20),
      color: theme.primary,
      lineHeight: normalize(30),
      marginHorizontal: 10,
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
      fontFamily: fonts.Effra_Arbc_Regular,
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(30),
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
      marginBottom: 0.01 * screenHeight,
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
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.primary,
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      lineHeight: normalize(40),
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
    stepCircleContainer: {
      marginHorizontal: normalize(0.06 * screenWidth), 
      height: 51, 
      marginTop: 10
    },
    tabTopicButtonContainer: {
      paddingHorizontal: 10,
      paddingBottom: 25
    },
    tabTopicButtonUnselected: {
      backgroundColor: colors.transparent
    },
});

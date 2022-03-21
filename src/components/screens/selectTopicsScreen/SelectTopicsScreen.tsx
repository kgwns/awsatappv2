import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { colors } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, recordLogEvent } from 'src/shared/utils';
import { useTranslation } from 'react-i18next';
import { InterestedTopics } from 'src/components/organisms';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { ScreensConstants } from 'src/constants';
import { useAllSiteCategories, useUserProfileData } from 'src/hooks';
import { AllSiteCategoriesBodyGet, AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { ScreenContainer } from 'src/components/screens';
import { ScreenHeight } from 'react-native-elements/dist/helpers';

export const SelectTopicsScreen = ({ navigation }: any) => {
  const style = useThemeAwareObject(customTopicsScreenStyle);
  const [t] = useTranslation();
  const {isLoading, allSiteCategoriesData, sentTopicsData, sendSelectedTopicInfo, fetchAllSiteCategoriesRequest} = useAllSiteCategories();
  const {userProfileData} = useUserProfileData();
  const [disableNext, setDisableNext] = useState<boolean>(true)

  const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
    items_per_page: 50,
  };

  useEffect(() => {
    fetchAllSiteCategoriesRequest(allSiteCategoriesPayload);
  }, []);

  useEffect(() => {
    if (isObjectNonEmpty(sentTopicsData)) {
      if (sentTopicsData.code === 200) {
        gotoNext()

      } else {
        Alert.alert(sentTopicsData.message || '');
      }
    }
  }, [sentTopicsData]);

  const onTopicsChanged = (item: any, selected: boolean) => {
    const data = allSiteCategoriesData
    for (let i = 0; i < data.length; i++) {
      if (item.tid == data[i].tid) {
        data[i].isSelected = selected;
      }
    }
    updateNextButton()
  };

  const onPressNext = () => {
    if (isNonEmptyArray(getSelectedData())) {
      recordLogEvent('Add_Interests_Topic',{userId: userProfileData.user?.id,interestsIds: joinArray(getSelectedData())});
      sendSelectedTopicInfo({ tid: joinArray(getSelectedData()) })
    }
  }

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNext = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNext)
  }
  
  const getSelectedData = () => {
    return allSiteCategoriesData.reduce((prevValue: string[], item: AllSiteCategoriesItemType) => {
      if (item.isSelected) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])
  }

  const gotoNext = () => {
    navigation.navigate(ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN)
  }

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading}>
      <View style={style.container}>
        <View
          style={[
            style.textContainer,
            {justifyContent: isTab ? 'center' : 'flex-end'},
          ]}>
          <Label style={style.titleStyle}>
            {t('onBoard.selectTopics.title')}
          </Label>
          <Label style={style.descStyle}>
            {t('onBoard.selectTopics.description')}
          </Label>
        </View>
        <View style={style.widgetContainer}>
          {isNonEmptyArray(allSiteCategoriesData) &&
            <InterestedTopics allSiteCategoriesData={allSiteCategoriesData} onTopicsChanged={onTopicsChanged} />
          }
        </View>
        <View style={style.nextButtonView}>
        {!disableNext && <NextButton 
            testID="nextButtonTestId"
            disabled={disableNext}
            title={t('onBoard.common.nextBtn')}
            onPress={onPressNext}
            style={style}
          />}
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
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: normalize(10)
    },
    textContainer: {
      flex: 0.13,
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
      fontWeight: 'bold',
      color: theme.primary,
      lineHeight: normalize(30),
    },
    descStyle: {
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(30),
    },
    nextButtonView: {
      flex: 0.1,
      justifyContent: 'flex-end',
      width: '90%',
      alignSelf: 'center',
      marginBottom: 0.02 * ScreenHeight,
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
      fontWeight: 'bold',
      lineHeight: normalize(20),
    },
});


import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { colors } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize } from 'src/shared/utils';
import { useTranslation } from 'react-i18next';
import { InterestedTopics } from 'src/components/organisms';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useAllSiteCategories } from 'src/hooks';
import { AllSiteCategoriesBodyGet, AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { ScreenContainer } from 'src/components/screens';
import { ScreenHeight } from 'react-native-elements/dist/helpers';

export const ManageMyFavoriteTopicsScreen = ({ navigation }: any) => {
  const style = useThemeAwareObject(customTopicsScreenStyle);
  const [t] = useTranslation();
  const {isLoading, allSiteCategoriesData, sentTopicsData, sendSelectedTopicInfo, fetchAllSiteCategoriesRequest,selectedTopicsData} = useAllSiteCategories();
  const [disableNext, setDisableNext] = useState<boolean>(true)
  const [topicsData,setTopicsData] = useState<AllSiteCategoriesItemType[]>([])

  const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
    items_per_page: 50,
  };

  useEffect(() => {
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
    for (let i = 0; i < selectedTopicsData.data.length; i++) {
      if (tid == selectedTopicsData.data[i].tid) {
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
        Alert.alert(sentTopicsData.message || '');
      }
    }
  }, [sentTopicsData]);

  const onTopicsChanged = (item: any, selected: boolean) => {
    const data = topicsData
    for (let i = 0; i < data.length; i++) {
      if (item.tid == data[i].tid) {
        topicsData[i].isSelected = !topicsData[i].isSelected;
      }
    }
    updateNextButton()
  };

  const onPressNext = () => {
    if (isNonEmptyArray(getSelectedData())) {
      sendSelectedTopicInfo({ tid: joinArray(getSelectedData()) })
    }
  }

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNext = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNext)
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
          {isNonEmptyArray(topicsData) &&
            <InterestedTopics allSiteCategoriesData={topicsData} onTopicsChanged={onTopicsChanged} />
          }
        </View>
        <View style={style.nextButtonView}>
          <NextButton 
            testID="nextButtonTestId"
            disabled={disableNext}
            title={t('onBoard.common.nextBtn')}
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
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
      justifyContent: 'center',
      alignItems: 'center',
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


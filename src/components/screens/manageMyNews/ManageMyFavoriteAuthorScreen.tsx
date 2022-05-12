import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, screenHeight, recordLogEvent, screenWidth, isIOS } from 'src/shared/utils';
import FollowFavoriteAuthorWidget from 'src/components/organisms/FollowFavoriteAuthorWidget';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useAllWriters, useUserProfileData } from 'src/hooks';
import { AllWritersBodyGet, AllWritersItemType } from 'src/redux/allWriters/types';
import { ScreenContainer } from '..';
import { fonts } from 'src/shared/styles/fonts';

export const ManageMyFavoriteAuthorScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);
  const [disableNext, setDisableNext] = useState<boolean>(true)
  const [authorsData,setAuthorsData] = useState<AllWritersItemType[]>([])
  const [selectedCheck,setselectedCheck] = useState<boolean>(false)
  const OK = t('common.ok');

  const allWritersPayload: AllWritersBodyGet = {
    items_per_page: 50,
  };

  const { isLoading, allWritersData, sentAuthorInfoData,
    fetchAllWritersRequest, sendSelectedWriterInfo, selectedAuthorsData,
    getSelectedAuthorsData, allSelectedWritersDetailList, emptySendAuthorInfoData
  } = useAllWriters();
  const {userProfileData} = useUserProfileData();

  useEffect(() => {
    getSelectedAuthorsData();
    fetchAllWritersRequest(allWritersPayload);

    return () => {
      emptySendAuthorInfoData()
    }
  }, []);

  useEffect(() => {
    if (isNonEmptyArray(allWritersData) && isNonEmptyArray(selectedAuthorsData.data)) {
      setAllAuthorsData();
      checkSelectedAuthorCondition();
    }
    else{
      setAuthorsData(allWritersData)
      checkSelectedAuthorCondition();
    }
  }, [allWritersData]);

  const getSelectedOrNot = (tid: any) => {
    for (let i = 0; i < selectedAuthorsData.data.length; i++) {
      if (tid == selectedAuthorsData.data[i].tid) {
        return true
      }
    }
    return false
  }

  const setAllAuthorsData = () => {
    if (isNonEmptyArray(allWritersData) && isNonEmptyArray(selectedAuthorsData.data)) {
      if (isNonEmptyArray(allSelectedWritersDetailList)) {
        allSelectedWritersDetailList.forEach(item => {
          let flag = false
          allWritersData.forEach(data => {
            if (item.tid === data.tid) {
              flag = true
            }
          })
          if (!flag) {
            authorsData.push({
              ...item,
              isSelected: true
            })
          }
        });

      }
      for (let i = 0; i < allWritersData.length; i++) {
        authorsData[i] = ({
          name: allWritersData[i].name,
          description__value_export: allWritersData[i].description__value_export,
          field_opinion_writer_path_export: allWritersData[i].field_opinion_writer_path_export,
          view_taxonomy_term: allWritersData[i].view_taxonomy_term,
          tid: allWritersData[i].tid,
          vid_export: allWritersData[i].vid_export,
          field_description_export: allWritersData[i].field_description_export,
          field_opinion_writer_path_export_1: allWritersData[i].field_opinion_writer_path_export_1,
          field_opinion_writer_photo_export: allWritersData[i].field_opinion_writer_photo_export,
          isSelected: getSelectedOrNot(allWritersData[i].tid),
        })
      }
    }
    updateNextButton()
  }

  useEffect(() => {
    if (isObjectNonEmpty(sentAuthorInfoData)) {
      if (sentAuthorInfoData.code === 200) {
        gotoNext()
      } else {
        Alert.alert(sentAuthorInfoData.message || '', undefined, [{ text: OK }]);
      }
    }
  }, [sentAuthorInfoData]);

  const changeSelectedStatus = (item: any, selected: boolean) => {
    const data = [...authorsData]
    for (let i = 0; i < data.length; i++) {
      if (item.tid == data[i].tid) {
        authorsData[i].isSelected = !authorsData[i].isSelected
      }
    }
    setAuthorsData(data);
    updateNextButton()
  };

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNext = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNext)
  }

  const onPressNext = () => {
      recordLogEvent('Add_Favorite_Authors',{userId: userProfileData.user?.id,favoriteIds: joinArray(getSelectedData())});
      sendSelectedWriterInfo({ tid: joinArray(getSelectedData()), isList: true })
  }

  const getSelectedData = () => {
    return authorsData.reduce((prevValue: string[], item: AllWritersItemType) => {
      if (item.isSelected) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])

  }

  const gotoNext = () => {
    navigation.goBack();
  }


  const checkSelectedAuthorCondition = () =>{
    if(isObjectNonEmpty(selectedAuthorsData) && isNonEmptyArray(selectedAuthorsData.data)){
       setselectedCheck(selectedAuthorsData.data.length <= authorsData.length )
    }else{
       setselectedCheck(true)
    }
  }

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading}>
      <View style={style.container}>
        <View
          style={[
            style.textContainer,
            { justifyContent: isTab ? 'center' : 'flex-end' },
          ]}>
          <Label style={style.titleStyle}>
            {t('onBoard.followFavoriteAuthor.title')}
          </Label>
          <Label style={style.descStyle}>
            {t('onBoard.followFavoriteAuthor.description')}
          </Label>
        </View>
        <View style={style.contentStyle}>
          {isNonEmptyArray(authorsData) && selectedCheck &&
          <View>
            <FollowFavoriteAuthorWidget writersData={authorsData} changeSelectedStatus={changeSelectedStatus} />
          </View>
          }
        </View>
        <View style={style.nextButtonView}>
          <NextButton
            testID="nextButtonTestId"
            title={t('onBoard.common.done')}
            onPress={onPressNext}
            style={style}
            icon={false}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const FollowFavoriteAuthorScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 0.18,
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: normalize(20),
      fontFamily: fonts.Almarai_Bold,
      color: theme.primary,
      lineHeight: normalize(30),
    },
    descStyle: {
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(30),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      marginTop: 5,
      marginBottom: isIOS ? 20 : 10,
    },
    contentStyle: {
      flex: 0.77,
      justifyContent: 'center',
    },
    nextButtonView: {
      flex: 0.1,
      justifyContent: 'flex-end',
      width: isTab ? screenWidth - (2 * 0.02 * screenWidth) : screenWidth - (2 * 0.04 * screenWidth),
      alignSelf: 'center',
      marginBottom: normalize(0.02 * screenHeight),
    },
    nextButtonContainer: {
      height: normalize(51),
      flexDirection: 'row-reverse',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: normalize(25),
    },
    nextButtonIconContainer: { position: 'absolute', left: normalize(20) },
    nextButtonText: {
      color: theme.primary,
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      fontFamily: fonts.Almarai_Bold,
      lineHeight: normalize(20),
    },
  });
  return FollowFavoriteAuthorScreenStyle;
};

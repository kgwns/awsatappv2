import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, screenHeight, recordLogEvent, screenWidth, isIOS, isStringEqual } from 'src/shared/utils';
import FollowFavoriteAuthorWidget from 'src/components/organisms/FollowFavoriteAuthorWidget';
import { useNavigation } from '@react-navigation/native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useAllWriters, useUserProfileData } from 'src/hooks';
import { AllWritersBodyGet, AllWritersItemType } from 'src/redux/allWriters/types';
import { ScreenContainer } from '..';
import { fonts } from 'src/shared/styles/fonts';
import  {TranslateConstants,TranslateKey} from '../../../constants/Constants'
import { AnalyticsEvents } from 'src/shared/utils/analytics';
import { OnBoardingBottom } from 'src/components/molecules';

export const ManageMyFavoriteAuthorScreen = () => {
  const navigation = useNavigation();
  const ONBOARD_COMMON_DONE = TranslateConstants({key:TranslateKey.ONBOARD_COMMON_DONE})
  const ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE = TranslateConstants({key:TranslateKey.ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE})
  const ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION = TranslateConstants({key:TranslateKey.ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION})

  const style = useThemeAwareObject(customStyle);
  const [disableNext, setDisableNext] = useState<boolean>(true)
  const [authorsData,setAuthorsData] = useState<AllWritersItemType[]>([])
  const [selectedCheck,setselectedCheck] = useState<boolean>(false)
  const OK = TranslateConstants({key:TranslateKey.COMMON_OK});

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
    } else if (isNonEmptyArray(allWritersData)) {
      setAuthorsData(allWritersData)
      checkSelectedAuthorCondition();
    }
  }, [allWritersData]);

  const getSelectedOrNot = (tid: any) => {
    for (const item of selectedAuthorsData.data) {
      if (isStringEqual(tid, item.tid)) {
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

  const changeSelectedStatus = (item: any) => {
    const data = [...authorsData]
    for(const authorInfo of data) {
      if (item.tid === authorInfo.tid) {
        authorInfo.isSelected = !authorInfo.isSelected
      }
    }
    setAuthorsData(data);
    updateNextButton()
  };

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNextBtn = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNextBtn)
  }

  const onPressNext = () => {
      recordLogEvent(AnalyticsEvents.ADD_FAVORITE_AUTHORS,{userId: userProfileData.user?.id,favoriteIds: joinArray(getSelectedData())});
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

  const renderTitleContainer = () => (
    <View style={style.tabletTextContainer}>
      <Label style={style.tabTitleStyle} children={ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE} />
      <Label style={style.tabDescStyle} children={ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION} />
    </View>
  )

  const renderAuthorContainer = () => (
    <View style={style.tabletContentStyle}>
      {isNonEmptyArray(authorsData) && selectedCheck &&
        <View>
          <FollowFavoriteAuthorWidget writersData={authorsData} changeSelectedStatus={changeSelectedStatus} />
        </View>
      }
    </View>
  )

  const renderBottomContainer = () => (
    <OnBoardingBottom
      title={ONBOARD_COMMON_DONE}
      onPressNext={onPressNext}
    />
  );

  if (isTab) {
    return (
      <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading} showPlayer={false} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
        <View style={style.tabContainer}>
          {renderTitleContainer()}
          {renderAuthorContainer()}
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
              { justifyContent: 'flex-end' },
            ]}>
            <Label style={style.titleStyle}>
              {ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE}
            </Label>
            <Label style={style.descStyle}>
              {ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION}
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

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.onBoardBackground,
      shadowColor: colors.transparent,
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    tabContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    textContainer: {
      flex: 0.18,
    },
    tabletTextContainer: {
      marginTop: 25,
      marginBottom: 25,
      justifyContent: 'center'
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: normalize(20),
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.primary,
      lineHeight: normalize(30),
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
      marginTop: 5,
      marginBottom: isIOS ? 20 : 10,
    },
    tabDescStyle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      textAlign: 'center',
      fontSize: 20,
      color: theme.secondaryDavyGrey,
      lineHeight:35,
      marginTop: 5,
    },
    contentStyle: {
      flex: 0.77,
      justifyContent: 'center',
    },
    tabletContentStyle: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center'
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
      fontFamily: fonts.AwsatDigital_Bold,
      lineHeight: normalize(20),
    },
    screenBackgroundColor: {
      backgroundColor: theme.onBoardBackground
    },
  });
};

import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, LoadingState, NextButton } from 'src/components/atoms';
import { CustomAlert, horizontalEdge, isIOS, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, recordLogEvent, screenHeight, screenWidth } from 'src/shared/utils';
import FollowFavoriteAuthorWidget from 'src/components/organisms/FollowFavoriteAuthorWidget';
import { useNavigation } from '@react-navigation/native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useAllWriters, useUserProfileData } from 'src/hooks';
import { AllWritersBodyGet, AllWritersItemType } from 'src/redux/allWriters/types';
import { ScreenContainer } from '..';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useIsFocused } from '@react-navigation/native';
import { fonts } from 'src/shared/styles/fonts';

export const FollowFavoriteAuthorScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE = TranslateConstants({key:TranslateKey.ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE})
  const ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION = TranslateConstants({key:TranslateKey.ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION})
  const ONBOARD_COMMON_NEXT_BUTTON = TranslateConstants({key:TranslateKey.ONBOARD_COMMON_NEXT_BUTTON})

  const style = useThemeAwareObject(customStyle);
  const [disableNext, setDisableNext] = useState<boolean>(true)

  const allWritersPayload: AllWritersBodyGet = {
    items_per_page: 50,
  };
  const { isLoading, 
    allWritersData, 
    sentAuthorInfoData, 
    fetchAllWritersRequest, 
    sendSelectedWriterInfo, 
    updateAllWritersData, 
    emptySendAuthorInfoData, 
    sendSelectedFromOnboard } = useAllWriters();
  const {userProfileData} = useUserProfileData();
  const [writersData, setWritersData] = useState<AllWritersItemType[]>([])

  useEffect(() => {
    fetchAllWritersRequest(allWritersPayload);
  }, []);

  useEffect(() => {
    if (isObjectNonEmpty(sentAuthorInfoData)) {
      if (sentAuthorInfoData.code === 200) {
        const selectedTIDData = getSelectedData()
        sendSelectedFromOnboard(selectedTIDData)
        gotoNext()
      } else {
        CustomAlert({
          title: '',
          message: sentAuthorInfoData.message || ''
        })
      }
    }
  }, [sentAuthorInfoData]);

  useEffect(() => {
    updateAllWritersData();
    isNonEmptyArray(writersData) && updateNextButton();
  }, [isFocused, allWritersData])

  useEffect(() => {
    setWritersData(allWritersData)
  }, [isFocused, allWritersData])

  const changeSelectedStatus = (item: any, selected: boolean) => {
    const data = [...writersData]
    for (let i = 0; i < data.length; i++) {
      if (item.tid == data[i].tid) {
        data[i].isSelected = selected;
      }
    }
    setWritersData(data)
    updateNextButton()
  };

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNext = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNext)
  }

  const onPressNext = () => {
    if (isNonEmptyArray(getSelectedData())) {
      recordLogEvent('Add_Favorite_Authors',{userId: userProfileData.user?.id,favoriteIds: joinArray(getSelectedData())});
      sendSelectedWriterInfo({ tid: joinArray(getSelectedData()), isList: true })
    }
  }

  const getSelectedData = () => {
    return writersData.reduce((prevValue: string[], item: AllWritersItemType) => {
      if (item.isSelected) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])
  }

  const gotoNext = () => {
    navigation.navigate(ScreensConstants.NEWS_LETTER_SCREEN)
    emptySendAuthorInfoData();
  }

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
      <View style={style.container}>
        <View
          style={[
            style.textContainer,
            { justifyContent: isTab ? 'center' : 'flex-end' },
          ]}>
          <Label style={style.titleStyle}>
            {ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE}
          </Label>
          <Label style={style.descStyle}>
            {ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION}
          </Label>
        </View>
        <View style={style.contentStyle}>
          {isNonEmptyArray(writersData) &&
          <View>
            <FollowFavoriteAuthorWidget writersData={writersData} changeSelectedStatus={changeSelectedStatus} />
          </View>
          }
        </View>
        <View style={style.nextButtonView}>
          <NextButton
            disabled={disableNext}
            testID="nextButtonTestId"
            title={ONBOARD_COMMON_NEXT_BUTTON}
            onPress={onPressNext}
            style={style}
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
      backgroundColor: theme.onBoardBackground,
      shadowColor: colors.transparent,
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingBottom: normalize(10)
    },
    textContainer: {
      flex: 0.18,
    },
    titleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
      fontSize: normalize(20),
      color: theme.primary,
      lineHeight: normalize(30),
    },
    descStyle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(30),
      marginTop: 5,
      marginBottom: isIOS ? 20 : 10,
    },
    contentStyle: {
      flex: 0.85,
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
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.primary,
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      lineHeight: normalize(30),
    },
    screenBackgroundColor: {
      backgroundColor: theme.onBoardBackground
    }
  });
  return FollowFavoriteAuthorScreenStyle;
};

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { CustomAlert, horizontalEdge, isDarkTheme, isIOS, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, recordLogEvent, screenHeight, screenWidth } from 'src/shared/utils';
import FollowFavoriteAuthorWidget from 'src/components/organisms/FollowFavoriteAuthorWidget';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useAllWriters, useAppCommon, useUserProfileData } from 'src/hooks';
import { AllWritersBodyGet, AllWritersItemType } from 'src/redux/allWriters/types';
import { ScreenContainer } from '..';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { fonts } from 'src/shared/styles/fonts';
import { StepLineCircle } from 'src/components/molecules';
import LinearGradient from 'react-native-linear-gradient';

export const FollowFavoriteAuthorScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE = TranslateConstants({key:TranslateKey.ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE})
  const ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION = TranslateConstants({key:TranslateKey.ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION})
  const ONBOARD_COMMON_NEXT_BUTTON = TranslateConstants({key:TranslateKey.ONBOARD_COMMON_NEXT_BUTTON})

  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)
  const style = useThemeAwareObject(customStyle);
  const nextButtonStyles = useThemeAwareObject(tabletNextButtonStyle);
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
      if (item.tid === data[i].tid) {
        data[i].isSelected = selected;
      }
    }
    setWritersData(data)
    updateNextButton()
  };

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNextBtn = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNextBtn)
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

  const renderTopContainer = () => (
    <View style={{ marginHorizontal: 0.06 * screenWidth, height: 51, marginTop: 10 }}>
      <StepLineCircle currentStep={2} />
    </View>
  )

  const renderTitleContainer = () => (
    <View style={style.tabletTextContainer}>
      <Label style={style.tabTitleStyle} children={ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE} />
      <Label style={style.tabDescStyle} children={ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION} />
    </View>
  )

  const renderAuthorContainer = () => (
    <View style={style.tabletContentStyle}>
      {isNonEmptyArray(writersData) &&
        <View>
          <FollowFavoriteAuthorWidget writersData={writersData} changeSelectedStatus={changeSelectedStatus} />
        </View>
      }
    </View>
  )

  const renderBottomContainer = () => {
    const gradient = isDarkMode ? [colors.blackOpacity0,colors.blackOpacity80,colors.blackOpacity100] : [colors.whiteOpacity0,colors.whiteOpacity80,colors.whiteOpacity100];
    return (
      <View style={style.bottomContainer}>
        <LinearGradient colors={gradient} style={style.linearGradient} />
        <NextButton
          testID="nextButtonTestId"
          disabled={disableNext}
          title={ONBOARD_COMMON_NEXT_BUTTON}
          onPress={onPressNext}
          style={nextButtonStyles}
          icon={false}
        />
      </View>
    )
  }

  if (isTab) {
    return (
      <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
        <View style={style.tabContainer}>
          {renderTopContainer()}
          {renderTitleContainer()}
          {renderAuthorContainer()}
          {renderBottomContainer()}
        </View>
      </ScreenContainer>
    );
  } else {
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
          <View style={isTab ? style.tabletContentStyle : style.contentStyle}>
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
      paddingBottom: normalize(10)
    },
    tabContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    textContainer: {
      flex: 0.18,
      justifyContent: 'flex-end' 
    },
    tabletTextContainer: {
      marginTop: 25,
      marginBottom: 25,
      justifyContent: 'center'
    },
    titleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
      fontSize: normalize(20),
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
      fontFamily: fonts.Effra_Arbc_Regular,
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(30),
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
      flex: 0.85,
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
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.primary,
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      lineHeight: normalize(30),
    },
    screenBackgroundColor: {
      backgroundColor: theme.onBoardBackground
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      height: 211,
      alignItems: 'center',
      justifyContent: 'center',
    },
    linearGradient: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
  });
};

const tabletNextButtonStyle = (theme: CustomThemeType) => 
   StyleSheet.create({
    nextButtonContainer: {
      height: 54,
      backgroundColor: colors.greenishBlue,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      width: 250,
      paddingHorizontal: 8
    },
    nextButtonText: {
      fontFamily: fonts.AwsatDigital_Bold,
      color: colors.white,
      textAlign: 'center',
      width: '100%',
      fontSize: 20,
      paddingTop: 5,
      lineHeight: 28,
    },
});

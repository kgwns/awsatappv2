import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { CustomAlert, horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, normalize, screenHeight, screenWidth, isStringEqual } from 'src/shared/utils';
import KeepNotifiedWidget from 'src/components/organisms/KeepNotifiedWidget';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ScreenContainer } from '..';
import { useKeepNotified } from 'src/hooks';
import { NotificationDataType } from 'src/redux/keepNotified/types';
import { useIsFocused } from '@react-navigation/native';
import { fonts } from 'src/shared/styles/fonts';
import { OnBoardingBottom } from 'src/components/molecules/onboarding-bottom/OnBoardingBottom';
import { StepLineCircle } from 'src/components/molecules';


export const KeepNotifiedScreen = ({ navigation, route }: any) => {
  const ONBOARD_KEEP_NOTIFIED_TITLE = TranslateConstants({key:TranslateKey.ONBOARD_KEEP_NOTIFIED_TITLE})
  const ONBOARD_KEEP_NOTIFIED_DESCRIPTION = TranslateConstants({key:TranslateKey.ONBOARD_KEEP_NOTIFIED_DESCRIPTION})
  const ONBOARD_COMMON_NEXT_BUTTON = TranslateConstants({key:TranslateKey.ONBOARD_COMMON_NEXT_BUTTON})

  const style = useThemeAwareObject(customStyle);

  const [notificationDate, setNotificationData] = useState<NotificationDataType[]>([])
  const [disableNext, setDisableNext] = useState<boolean>(true)
  const [canGoBack, setCanGoBack] = useState((route.params && route.params.canGoBack)?true:false)
  const isFocused = useIsFocused();

  const {
    sendSelectedInfoRequest, sendSelectedNotificationInfo,
    getSelectedInfoRequest, selectedNotificationInfo,
    removeSelectedNotificationInfo,isLoading,
    removeKeepNotificationInfo,
    getAllNotificationList, allNotificationList } = useKeepNotified()

  useEffect(() => {
    getAllNotificationList()
    if (route.params && route.params.canGoBack) {
      setCanGoBack(true)
    } else {
      setCanGoBack(false)
    }
    return () => {
      removeKeepNotificationInfo()
      removeSelectedNotificationInfo()
    }
  }, [isFocused])

  useEffect(() => {
    if (canGoBack) {
      getSelectedInfoRequest();
    } else {
      setInitialData()
    }
  }, [allNotificationList])

  useEffect(() => {
    if (canGoBack) {
      setMyNewsLettersData();
    }
  }, [selectedNotificationInfo])

  useEffect(() => {
    if (isObjectNonEmpty(sendSelectedNotificationInfo)) {
      if (sendSelectedNotificationInfo.message?.code === 200) {
        if (!canGoBack) {
          gotoNext()
        }
      } else {
        CustomAlert({
          title: '',
          message: sendSelectedNotificationInfo.message?.message || ''
        })
      }
    }
  }, [sendSelectedNotificationInfo]);

  const setInitialData = () => {
    const data = formatNotificationData()
    setNotificationData(data)
    updateNextButtonActive()
  }

  const formatNotificationData = () => {
    const data = []
    if (allNotificationList.code && allNotificationList.code === 200 && isNonEmptyArray(allNotificationList.rows)) {
      for(const item of allNotificationList.rows) {
        data.push({
          tid: item.tid,
          name: item.name,
          description: item.description,
          selected: false,
        })
      }
    }
    return data
  }

  const setMyNewsLettersData = () => {
    if (isNonEmptyArray(selectedNotificationInfo.data) && isNonEmptyArray(allNotificationList.rows)) {
      const data = []
      for(const item of allNotificationList.rows) {
        data.push({
          name: item.name,
          tid: item.tid,
          description: item.description,
          selected: getSelectedOrNot(item.tid),
        })
      }
      setNotificationData(data)
    } else {
      const newsLettersData = formatNotificationData()
      setNotificationData(newsLettersData)
    }
    setDisableNext(true)
  }

  const getSelectedOrNot = (id: any) => {
    for (const item of selectedNotificationInfo.data) {
      if (isStringEqual(id, item.tid)) {
        return true
      }
    }
    return false
  }

  const onPressNext = () => {
    const selectedData = getSelectedData()
    if (isNonEmptyArray(selectedData)) {
      const selectedDataArray = getSelectedData()
      sendSelectedInfoRequest({ tid: selectedDataArray.toString() })
    }
  }

  const gotoNext = () => {
      navigation.navigate(ScreensConstants.SUCCESS_SCREEN)
  }

  const changeSelectedStatus = (item: any) => {
    for(const notificationItem of notificationDate) {
      if (isStringEqual(item.tid, notificationItem.tid)) {
        notificationItem.selected = !notificationItem.selected;
      }
    }
    if (canGoBack) {
      const selectedList = getSelectedData();
      sendSelectedInfoRequest({ tid: selectedList.toString() })
    } else {
      updateNextButtonActive()
    }
  };

  const updateNextButtonActive = () => {
    const selectedNotificationData = getSelectedData()
    const disableNextBtn = isNonEmptyArray(selectedNotificationData) ? false : true
    setDisableNext(disableNextBtn)
  }

  const getSelectedData = () => {
    return notificationDate.reduce((prevValue: number[], item: NotificationDataType) => {
      if (item.selected) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])
  }
  const renderTabletTopContainer = () => {
    return (
      <View style={style.stepCircleContainer}>
        <StepLineCircle currentStep={4} />
      </View>
    )
  }

  const renderBottomContainer = () => (
    <OnBoardingBottom
      title={ONBOARD_COMMON_NEXT_BUTTON}
      disableNext={disableNext}
      onPressNext={onPressNext}
    />
  );

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
      <View style={style.container}>
      {isTab && !canGoBack && renderTabletTopContainer()}
      {!canGoBack && <View style={[style.textContainer, { justifyContent: isTab ? 'center' : 'flex-end' },]}>
          <Label style={style.titleStyle} children={ONBOARD_KEEP_NOTIFIED_TITLE} />
          <Label style={style.descStyle} children={ONBOARD_KEEP_NOTIFIED_DESCRIPTION} />
        </View>}
        <View style={style.contentStyle}>
          <KeepNotifiedWidget data={notificationDate} onPress={changeSelectedStatus} />
        </View>
       {!canGoBack && isTab && renderBottomContainer()}
       { !canGoBack && !isTab &&
       <View style={style.nextButtonView}>
          <NextButton
            testID="nextButtonTestId"
            title={ONBOARD_COMMON_NEXT_BUTTON}
            icon={false}
            disabled={disableNext}
            onPress={onPressNext}
            style={style}
          />
        </View>
        }
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => (
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.profileBackground,
      shadowColor: colors.transparent,
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingBottom: normalize(10)
    },
    textContainer: {
      flex: 0.13,
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
    },
    contentStyle: {
      flex: 0.77,
      paddingVertical: normalize(15),
    },
    nextButtonView: {
      flex: 0.1,
      width: isTab ? screenWidth - (2 * 0.02 * screenWidth) : screenWidth - (2 * 0.04 * screenWidth),
      alignSelf: 'center',
      justifyContent: 'flex-end',
      marginBottom: normalize(0.02 * screenHeight),
    },
    nextButtonContainer: {
      height: normalize(51),
      flexDirection: 'row-reverse',
      backgroundColor: theme.primary,
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
      color: 'white',
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      lineHeight: normalize(30),
    },
    screenBackgroundColor: {
      backgroundColor: theme.profileBackground
    },
    stepCircleContainer: {
      marginHorizontal: normalize(0.06 * screenWidth), 
      height: 51, 
      marginTop: 10
    }
  })
)

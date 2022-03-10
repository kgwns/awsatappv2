import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { CustomAlert, horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize } from 'src/shared/utils';
import KeepNotifiedWidget, { KeepNotifiedDataProps } from 'src/components/organisms/KeepNotifiedWidget';
import { useTranslation } from 'react-i18next';
import { ScreensConstants } from 'src/constants';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ScreenContainer } from '..';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { useKeepNotified } from 'src/hooks';

const data = [
  {
    nid: 1,
    label: 'أخبار عاجلة',
    selected: false
  },
  {
    nid: 2,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    nid: 3,
    label: 'أهم الأخبار',
    selected: false,
  },
  {
    nid: 4,
    label: 'أخبار فيروس كورونا',
    selected: false,
  },
  {
    nid: 5,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    nid: 6,
    label: 'أخبار عاجلة',
    selected: false,
  }
]

export const KeepNotifiedScreen = ({ navigation, route }: any) => {
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);

  const { params } = route

  const [notificationDate, setNotificationData] = useState(data)
  const [disableNext, setDisableNext] = useState<boolean>(true)

  const {
    sendSelectedInfoRequest, sendSelectedNotificationInfo,
    getSelectedInfoRequest, selectedNotificationInfo,
    isLoading
  } = useKeepNotified()

  useEffect(() => {
    getSelectedInfoRequest()
  }, [])

  useEffect(() => {
    updateNextButtonActive()
  }, [notificationDate])

  useEffect(() => {
    if (sendSelectedNotificationInfo?.message?.code === 200) {
      gotoNext()
    } else if (isObjectNonEmpty(sendSelectedNotificationInfo.message?.message)) {
      CustomAlert({
        title: '',
        message: sendSelectedNotificationInfo?.message?.message || ''
      })
    }
  }, [sendSelectedNotificationInfo.message]);

  useEffect(() => {
    populateSelectedFields()
  }, [selectedNotificationInfo.data]);

  const populateSelectedFields = () => {
    if (selectedNotificationInfo?.code == 200) {
      const selectedData = selectedNotificationInfo.data ?? []
      if (isNonEmptyArray(selectedData)) {
        let allData = [...data]
        const newData = allData.map((item: KeepNotifiedDataProps) => ({
          ...item,
          selected: selectedData.includes(item.nid)
        }))
        setNotificationData(newData)
      }
    }
  }

  const onPressNext = () => {
    const selectedData = getSelectedData()
    if (isNonEmptyArray(selectedData)) {
      const selectedData = getSelectedData()
      sendSelectedInfoRequest({ nid: joinArray(selectedData) })
    }
  }

  const gotoNext = () => {
    if (params && params.canGoBack) {
      navigation.goBack()
    } else {
      navigation.navigate(ScreensConstants.SUCCESS_SCREEN)
    }
  }

  const changeStatus = (index: number) => {
    const data = [...notificationDate]
    data[index].selected = !data[index].selected
    setNotificationData(data)
  };

  const updateNextButtonActive = () => {
    const selectedNotificationData = getSelectedData()
    const disableNext = isNonEmptyArray(selectedNotificationData) ? false : true
    setDisableNext(disableNext)
  }

  const getSelectedData = () => {
    return notificationDate.reduce((prevValue: number[], item: KeepNotifiedDataProps) => {
      if (item.selected) {
        return prevValue.concat(item.nid)
      }
      return prevValue
    }, [])
  }

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading}>
      <View style={style.container}>
        <View style={[style.textContainer, { justifyContent: isTab ? 'center' : 'flex-end' },]}>
          <Label style={style.titleStyle} children={t('onBoard.keepNotified.title')} />
          <Label style={style.descStyle} children={t('onBoard.keepNotified.description')} />
        </View>
        <View style={style.contentStyle}>
          <KeepNotifiedWidget data={notificationDate} onPress={changeStatus} />
        </View>
        <View style={style.nextButtonView}>
          <NextButton
            testID="nextButtonTestId"
            title={t('onBoard.common.completed')}
            icon={false}
            disabled={disableNext}
            onPress={onPressNext}
            style={style}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => (
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.backgroundColor,
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
    contentStyle: {
      flex: 0.77,
      paddingVertical: normalize(15),
    },
    nextButtonView: {
      flex: 0.1,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'flex-end',
      marginBottom: normalize(0.02 * ScreenHeight),
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
      color: 'white',
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      fontWeight: 'bold',
      lineHeight: normalize(20),
    },
  })
)

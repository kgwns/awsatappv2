import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, LoadingState, NextButton } from 'src/components/atoms';
import { CustomAlert, horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, recordLogEvent, screenHeight } from 'src/shared/utils';
import FollowFavoriteAuthorWidget from 'src/components/organisms/FollowFavoriteAuthorWidget';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useAllWriters } from 'src/hooks';
import { AllWritersBodyGet, AllWritersItemType } from 'src/redux/allWriters/types';
import { ScreenContainer } from '..';
import { ScreensConstants } from 'src/constants';

export const FollowFavoriteAuthorScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);
  const [disableNext, setDisableNext] = useState<boolean>(true)

  const allWritersPayload: AllWritersBodyGet = {
    items_per_page: 50,
  };
  const { isLoading, allWritersData, sentAuthorInfoData, fetchAllWritersRequest, sendSelectedWriterInfo } = useAllWriters();

  useEffect(() => {
    fetchAllWritersRequest(allWritersPayload);
  }, []);

  useEffect(() => {
    if (isObjectNonEmpty(sentAuthorInfoData)) {
      if (sentAuthorInfoData.code === 200) {
        recordLogEvent('Add_Favorite_Authors');
        gotoNext()
      } else {
        CustomAlert({
          title: '',
          message: sentAuthorInfoData.message || ''
        })
      }
    }
  }, [sentAuthorInfoData]);

  const changeSelectedStatus = (item: any, selected: boolean) => {
    const data = allWritersData
    for (let i = 0; i < data.length; i++) {
      if (item.tid == data[i].tid) {
        data[i].isSelected = selected;
      }
    }
    updateNextButton()
  };

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNext = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNext)
  }

  const onPressNext = () => {
    if (isNonEmptyArray(getSelectedData())) {
      sendSelectedWriterInfo({ tid: joinArray(getSelectedData()) })
    }
  }

  const getSelectedData = () => {
    return allWritersData.reduce((prevValue: string[], item: AllWritersItemType) => {
      if (item.isSelected) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])
  }

  const gotoNext = () => {
    navigation.navigate(ScreensConstants.NEWS_LETTER_SCREEN)
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
          {isNonEmptyArray(allWritersData) &&
          <View>
            <FollowFavoriteAuthorWidget writersData={allWritersData} changeSelectedStatus={changeSelectedStatus} />
          </View>
          }
        </View>
        <View style={style.nextButtonView}>
          <NextButton
            disabled={disableNext}
            testID="nextButtonTestId"
            title={t('onBoard.common.nextBtn')}
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
      justifyContent: 'center',
    },
    nextButtonView: {
      flex: 0.1,
      justifyContent: 'flex-end',
      width: '90%',
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
      fontWeight: 'bold',
      lineHeight: normalize(20),
    },
  });
  return FollowFavoriteAuthorScreenStyle;
};

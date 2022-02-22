import React, { useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import { colors } from '../../../shared/styles/colors';
import { Label, LoadingState, NextButton } from '../../atoms';
import { normalize } from '../../../shared/utils';
import { useTranslation } from 'react-i18next';
import { InterestSection } from '../../organisms';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import {ScreensConstants} from 'src/constants';
import { useAllSiteCategories } from 'src/hooks';
import { AllSiteCategoriesBodyGet } from 'src/redux/allSiteCategories/types';

export const SelectInterestScreen = ({ navigation }: any) => {
  const style = useThemeAwareObject(customInterestScreenStyle)
  const [t] = useTranslation();
  const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
    items_per_page: 50,
  };
  useEffect(() => {
    fetchAllSiteCategoriesRequest(allSiteCategoriesPayload);
  }, []);
  const { isLoading, allSiteCategoriesData, fetchAllSiteCategoriesRequest } = useAllSiteCategories();
  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <Label style={style.titleStyle}>
          {t('onBoard.selectInterests.title')}
        </Label>
        <Label style={style.descStyle}>
          {t('onBoard.selectInterests.description')}
        </Label>
      </View>
      <View style={style.widgetContainer}>
        {isLoading ? <LoadingState/> : <InterestSection allSiteCategoriesData={allSiteCategoriesData} />}
      </View>
      <NextButton
        title={t('onBoard.common.nextBtn')}
        onPress={() => navigation.navigate(ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN)}
        style={style}
      />
    </View>
  );
};

const customInterestScreenStyle = (theme: CustomThemeType) => {
  const selectInterestScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      top: 0,
      position: 'absolute',
      marginTop: normalize(10),
    },
    widgetContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: normalize(20),
      fontWeight: 'bold',
      color: theme.primary,
      lineHeight: normalize(30),
      marginTop: normalize(10),
    },
    descStyle: {
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(30),
    },
    nextButtonContainer: {
      width: '90%',
      height: normalize(51),
      flexDirection: 'row-reverse',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: normalize(51 / 2),
      marginTop: normalize(30),
      marginBottom: normalize(30),
      position: 'absolute',
      bottom: 0,
    },
    nextButtonIconContainer: { flex: 0.1, marginEnd: normalize(10) },
    nextButtonTextContainer: {
      flex: 1,
      left: normalize(-18),
    },
    nextButtonText: {
      color: theme.primary,
      fontSize: normalize(16),
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: normalize(20),
    },
  });
  return selectInterestScreenStyle
}
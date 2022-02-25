import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {Label, LoadingState, NextButton} from '../../atoms';
import {horizontalEdge, normalize} from '../../../shared/utils';
import {useTranslation} from 'react-i18next';
import {InterestSection} from '../../organisms';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {ScreensConstants} from 'src/constants';
import {useAllSiteCategories} from 'src/hooks';
import {AllSiteCategoriesBodyGet} from 'src/redux/allSiteCategories/types';
import {ScreenContainer} from '..';
import {ScreenHeight} from 'react-native-elements/dist/helpers';

export const SelectInterestScreen = ({navigation}: any) => {
  const style = useThemeAwareObject(customInterestScreenStyle);
  const [t] = useTranslation();
  const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
    items_per_page: 50,
  };
  useEffect(() => {
    fetchAllSiteCategoriesRequest(allSiteCategoriesPayload);
  }, []);
  const {isLoading, allSiteCategoriesData, fetchAllSiteCategoriesRequest} =
    useAllSiteCategories();
  return (
    <ScreenContainer edge={horizontalEdge}>
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
          {isLoading ? <LoadingState /> : <InterestSection allSiteCategoriesData={allSiteCategoriesData} />}
        </View>
        <View style={style.nextButtonView}>
          <NextButton
            title={t('onBoard.common.nextBtn')}
            onPress={() =>
              navigation.navigate(
                ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN,
              )
            }
            style={style}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const customInterestScreenStyle = (theme: CustomThemeType) => {
  const selectInterestScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 0.13,
      justifyContent: 'flex-end',
    },
    widgetContainer: {
      flex:0.77,
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
      marginBottom: normalize(0.02 * ScreenHeight),
    },
    nextButtonContainer: {
      height: normalize(51),
      flexDirection: 'row-reverse',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: normalize(25),
    },
    nextButtonIconContainer: {position: 'absolute', left: normalize(20)},
    nextButtonText: {
      color: theme.primary,
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      fontWeight: 'bold',
      lineHeight: normalize(20),
    },
  });
  return selectInterestScreenStyle;
};

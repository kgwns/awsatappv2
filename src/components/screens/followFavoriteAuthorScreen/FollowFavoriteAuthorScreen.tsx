import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {Label, LoadingState, NextButton} from 'src/components/atoms';
import {horizontalEdge, normalize} from 'src/shared/utils';
import FollowFavoriteAuthorWidget from 'src/components/organisms/FollowFavoriteAuthorWidget';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useAllWriters} from 'src/hooks';
import {AllWritersBodyGet} from 'src/redux/allWriters/types';
import {ScreenContainer} from '..';
import {ScreensConstants} from 'src/constants';
import {ScreenHeight} from 'react-native-elements/dist/helpers';

export const FollowFavoriteAuthorScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);

  const allWritersPayload: AllWritersBodyGet = {
    items_per_page: 50,
  };
  const {isLoading, allWritersData, fetchAllWritersRequest} = useAllWriters();

  useEffect(() => {
    fetchAllWritersRequest(allWritersPayload);
  }, []);

  return (
    <ScreenContainer edge={horizontalEdge}>
      <View style={style.container}>
        <View style={style.textContainer}>
          <Label style={style.titleStyle}>
            {t('onBoard.followFavoriteAuthor.title')}
          </Label>
          <Label style={style.descStyle}>
            {t('onBoard.followFavoriteAuthor.description')}
          </Label>
        </View>
        <View style={style.contentStyle}>
          {isLoading ? (
            <LoadingState />
          ) : (
            <View>
              <FollowFavoriteAuthorWidget writersData={allWritersData} />
            </View>
          )}
        </View>
        <View style={style.nextButtonView}>
          <NextButton
            testID="nextButtonTestId"
            title={t('onBoard.common.nextBtn')}
            onPress={() =>
              navigation.navigate(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN)
            }
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
    },
    textContainer: {
      flex: 0.13,
      justifyContent: 'flex-end',
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
      paddingVertical: normalize(15),
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
  return FollowFavoriteAuthorScreenStyle;
};

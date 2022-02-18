import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {Label, Image, LoadingState} from 'src/components/atoms';
import {normalize} from 'src/shared/utils';
import FollowFavoriteAuthorWidget from 'src/components/organisms/FollowFavoriteAuthorWidget';
import {ImagesName} from 'src/shared/styles';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {RoutesName} from 'src/navigation';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ScreensConstants} from 'src/constants';
import { useAllWriters } from 'src/hooks';
import { AllWritersBodyGet } from 'src/redux/allWriters/types';

export const FollowFavoriteAuthorScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);
  const allWritersPayload: AllWritersBodyGet = {
    items_per_page: 50,
  };
  const { isLoading, allWritersData, fetchAllWritersRequest } = useAllWriters();

  useEffect(() => {
    fetchAllWritersRequest(allWritersPayload);
  }, []);

  interface NextButttonProps{
    onPress:()=>void,
    testId?:string
  }

  const NextButton = ({onPress,testId}: NextButttonProps) => {
    return (
      <TouchableOpacity testID={testId} onPress={onPress} style={style.nextButtonContainer}>
        <View style={style.nextButtonIconContainer}>
          <Image name={ImagesName.arrowNext} />
        </View>

        <View style={style.nextButtonTextContainer}>
          <Label style={style.nextButtonText}>
            {t('onBoard.common.nextBtn')}
          </Label>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <Label style={style.titleStyle}>
          {t('onBoard.followFavoriteAuthor.title')}
        </Label>
        <Label style={style.descStyle}>
          {t('onBoard.followFavoriteAuthor.description')}
        </Label>
      </View>
      <View style={style.widgetContainer}>
        {isLoading ? <LoadingState /> : <FollowFavoriteAuthorWidget writersData={allWritersData} />}
      </View>
      <NextButton
        testId={'nextButtonTestId'}
        onPress={() => navigation.navigate(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN)}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const FollowFavoriteAuthorScreenStyle = StyleSheet.create({
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
    nextButtonIconContainer: {flex: 0.1, marginEnd: normalize(10)},
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
  return FollowFavoriteAuthorScreenStyle;
};

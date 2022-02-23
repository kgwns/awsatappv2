import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, Image } from 'src/components/atoms';
import { horizontalEdge, normalize } from 'src/shared/utils';
import { ImagesName } from 'src/shared/styles';
import KeepNotifiedWidget from 'src/components/organisms/KeepNotifiedWidget';
import { useTranslation } from 'react-i18next';
import { ScreensConstants } from 'src/constants';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ScreenContainer } from '..';

export const KeepNotifiedScreen = ({ navigation }: any) => {
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);

  const NextButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity onPress={onPress} style={style.nextButtonContainer}>
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
    <ScreenContainer edge={horizontalEdge}>
      <View style={style.container}>
        <Label style={style.titleStyle}>{t('onBoard.keepNotified.title')}</Label>
        <Label style={style.descStyle}>
          {t('onBoard.keepNotified.description')}
        </Label>
        <View style={style.contentStyle}>
          <KeepNotifiedWidget />
        </View>
        <NextButton
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: ScreensConstants.AppNavigator }],
            })
          }
        />
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const KeepNotifiedScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
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
      marginBottom: normalize(15),
    },
    contentStyle: {
      marginBottom: normalize(200),
    },
    nextButtonContainer: {
      width: '90%',
      height: normalize(51),
      flexDirection: 'row-reverse',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: normalize(51 / 2),
      marginTop: normalize(10),
      marginBottom: normalize(20),
      position: 'absolute',
      bottom: 0,
    },
    nextButtonIconContainer: { flex: 0.1, marginEnd: normalize(10) },
    nextButtonTextContainer: { flex: 1, left: normalize(-18) },
    nextButtonText: {
      color: theme.primary,
      fontSize: normalize(16),
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: normalize(20),
    },
  });
  return KeepNotifiedScreenStyle;
};

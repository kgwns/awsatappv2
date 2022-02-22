import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {Label, NextButton} from 'src/components/atoms';
import {normalize} from 'src/shared/utils';
import KeepNotifiedWidget from 'src/components/organisms/KeepNotifiedWidget';
import {useTranslation} from 'react-i18next';
import {ScreensConstants} from 'src/constants';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';

export const KeepNotifiedScreen = ({navigation}: any) => {
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);


  return (
    <View style={style.container}>
      <Label style={style.titleStyle}>{t('onBoard.keepNotified.title')}</Label>
      <Label style={style.descStyle}>
        {t('onBoard.keepNotified.description')}
      </Label>
      <View style={style.contentStyle}>
        <KeepNotifiedWidget />
      </View>
      <NextButton
        title={t('onBoard.common.nextBtn')}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: ScreensConstants.AppNavigator}],
          })
        }
        style={style}
      />
    </View>
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
      marginBottom: normalize(30),
      position: 'absolute',
      bottom: 0,
    },
    nextButtonIconContainer: {flex: 0.1, marginEnd: normalize(10)},
    nextButtonTextContainer: {flex: 1, left: normalize(-18)},
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

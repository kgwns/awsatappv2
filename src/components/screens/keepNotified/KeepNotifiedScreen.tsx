import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {Label, NextButton} from 'src/components/atoms';
import {horizontalEdge, isTab, normalize} from 'src/shared/utils';
import KeepNotifiedWidget from 'src/components/organisms/KeepNotifiedWidget';
import {useTranslation} from 'react-i18next';
import {ScreensConstants} from 'src/constants';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ScreenContainer} from '..';
import {ScreenHeight} from 'react-native-elements/dist/helpers';

export const KeepNotifiedScreen = ({navigation}: any) => {
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);

  return (
    <ScreenContainer edge={horizontalEdge}>
      <View style={style.container}>
        <View
          style={[
            style.textContainer,
            {justifyContent: isTab ? 'center' : 'flex-end'},
          ]}>
          <Label style={style.titleStyle}>
            {t('onBoard.keepNotified.title')}
          </Label>
          <Label style={style.descStyle}>
            {t('onBoard.keepNotified.description')}
          </Label>
        </View>
        <View style={style.contentStyle}>
          <KeepNotifiedWidget />
        </View>
        <View style={style.nextButtonView}>
          <NextButton
            testID="nextButtonTestId"
            title={t('onBoard.common.completed')}
            icon={false}
            onPress={() => navigation.navigate(ScreensConstants.SUCCESS_SCREEN)}
            style={style}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const KeepNotifiedScreenStyle = StyleSheet.create({
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
    nextButtonIconContainer: {position: 'absolute', left: normalize(20)},
    nextButtonText: {
      color: 'white',
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      fontWeight: 'bold',
      lineHeight: normalize(20),
    },
  });
  return KeepNotifiedScreenStyle;
};

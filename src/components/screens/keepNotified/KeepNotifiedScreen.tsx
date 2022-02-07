import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from 'src/shared/styles/colors';
import {Label, Image} from 'src/components/atoms';
import {normalize} from 'src/shared/utils';
import {ImagesName} from 'src/shared/styles';
import KeepNotifiedWidget from 'src/components/organisms/KeepNotifiedWidget';
import {useTranslation} from 'react-i18next';
import {ScreensConstants} from 'src/constants';

export const KeepNotifiedScreen = ({navigation}: any) => {
  const [t] = useTranslation();
  return (
    <View style={KeepNotifiedScreenStyle.container}>
      <Label style={KeepNotifiedScreenStyle.titleStyle}>
        {t('onBoard.keepNotified.title')}
      </Label>
      <Label style={KeepNotifiedScreenStyle.descStyle}>
        {t('onBoard.keepNotified.description')}
      </Label>
      <View style={KeepNotifiedScreenStyle.contentStyle}>
        <KeepNotifiedWidget />
      </View>
      <NextButton
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: ScreensConstants.AppNavigator}],
          })
        }
      />
    </View>
  );
};

const NextButton = ({onPress}: any) => {
  const [t] = useTranslation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={KeepNotifiedScreenStyle.nextButtonContainer}>
      <View style={KeepNotifiedScreenStyle.nextButtonIconContainer}>
        <Image name={ImagesName.arrowNext} />
      </View>
      <View style={KeepNotifiedScreenStyle.nextButtonTextContainer}>
        <Label style={KeepNotifiedScreenStyle.nextButtonText}>
          {t('onBoard.common.nextBtn')}
        </Label>
      </View>
    </TouchableOpacity>
  );
};
const KeepNotifiedScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
    shadowColor: colors.transparent,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: colors.greenishBlue,
    lineHeight: normalize(30),
    marginTop: normalize(10),
  },
  descStyle: {
    textAlign: 'center',
    fontSize: normalize(15),
    color: colors.davyGrey,
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
    backgroundColor: colors.cyanGreen,
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
    color: colors.greenishBlue,
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: normalize(20),
  },
});

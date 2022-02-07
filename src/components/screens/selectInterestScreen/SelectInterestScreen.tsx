import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../shared/styles/colors';
import { Label, Image } from '../../atoms';
import { normalize } from '../../../shared/utils';
import { ImagesName } from '../../../shared/styles';
import { RoutesName } from '../../../navigation';
import { useTranslation } from 'react-i18next';
import { InterestSection } from '../../organisms';

export const SelectInterestScreen = ({ navigation }: any) => {
  const [t] = useTranslation();
  return (
    <View style={selectInterestScreenStyle.container}>
      <View style={selectInterestScreenStyle.textContainer}>
        <Label style={selectInterestScreenStyle.titleStyle}>
          {t('onBoard.selectInterests.title')}
        </Label>
        <Label style={selectInterestScreenStyle.descStyle}>
          {t('onBoard.selectInterests.description')}
        </Label>
      </View>
      <View style={selectInterestScreenStyle.widgetContainer}>
        <InterestSection />
      </View>
      <NextButton
        onPress={() => navigation.navigate(RoutesName.followFavoriteAuthorScreen)}
      />
    </View>
  );
};

const NextButton = ({ onPress }: any) => {
  const [t] = useTranslation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={selectInterestScreenStyle.nextButtonContainer}>
      <View style={selectInterestScreenStyle.nextButtonIconContainer}>
        <Image name={ImagesName.arrowNext} />
      </View>

      <View style={selectInterestScreenStyle.nextButtonTextContainer}>
        <Label style={selectInterestScreenStyle.nextButtonText}>
          {t('onBoard.common.nextBtn')}
        </Label>
      </View>
    </TouchableOpacity>
  );
};
const selectInterestScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
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
    color: colors.greenishBlue,
    lineHeight: normalize(30),
    marginTop: normalize(10),
  },
  descStyle: {
    textAlign: 'center',
    fontSize: normalize(15),
    color: colors.davyGrey,
    lineHeight: normalize(30),
  },
  nextButtonContainer: {
    width: '90%',
    height: normalize(51),
    flexDirection: 'row-reverse',
    backgroundColor: colors.cyanGreen,
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
    color: colors.greenishBlue,
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: normalize(20),
  },
});

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from 'src/shared/styles/colors';
import {Label, Image} from 'src/components/atoms';
import {normalize} from 'src/shared/utils';
import FollowFavoriteAuthorWidget from 'src/components/organisms/FollowFavoriteAuthorWidget';
import {ImagesName} from 'src/shared/styles';
import {useNavigation} from '@react-navigation/native';
import {RoutesName} from 'src/navigation';
import {useTranslation} from 'react-i18next';

export const FollowFavoriteAuthorScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  return (
    <View style={FollowFavoriteAuthorScreenStyle.container}>
      <View style={FollowFavoriteAuthorScreenStyle.textContainer}>
        <Label style={FollowFavoriteAuthorScreenStyle.titleStyle}>
          {t('onBoard.followFavoriteAuthor.title')}
        </Label>
        <Label style={FollowFavoriteAuthorScreenStyle.descStyle}>
          {t('onBoard.followFavoriteAuthor.description')}
        </Label>
      </View>
      <View style={FollowFavoriteAuthorScreenStyle.widgetContainer}>
        <FollowFavoriteAuthorWidget />
      </View>
      <NextButton
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: RoutesName.appNavigator}],
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
      style={FollowFavoriteAuthorScreenStyle.nextButtonContainer}>
      <View style={FollowFavoriteAuthorScreenStyle.nextButtonIconContainer}>
        <Image name={ImagesName.arrowNext} />
      </View>

      <View style={FollowFavoriteAuthorScreenStyle.nextButtonTextContainer}>
        <Label style={FollowFavoriteAuthorScreenStyle.nextButtonText}>
          {t('onBoard.followFavoriteAuthor.nextBtn')}
        </Label>
      </View>
    </TouchableOpacity>
  );
};

const FollowFavoriteAuthorScreenStyle = StyleSheet.create({
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
    marginBottom: normalize(20),
    position: 'absolute',
    bottom: 0,
  },
  nextButtonIconContainer: {flex: 0.1, marginEnd: normalize(10)},
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

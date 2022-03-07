import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {Label, NextButton} from 'src/components/atoms';
import {horizontalEdge, isTab, normalize} from 'src/shared/utils';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ScreenContainer} from '..';
import {ScreensConstants} from 'src/constants';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
import {NewsLettersWidget} from 'src/components/organisms';

interface NewsLetterScreenProps {
  route: any
}

export const NewsLetterScreen = ({route} : NewsLetterScreenProps) => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);

  const data = [
    {
      title: 'النشره الصباحيه',
      subTitle: 'الاثنين الى السبت',
      image:'earlyEditionImg',
    },
    {
      title: 'المال و الأعمال',
      subTitle: 'يومياً',
      image: 'moneyAndBusinessImg',
    },
    {
      title: 'التكنولوجيا',
      subTitle: 'كل سبت',
      image: 'technologyImg',
    },
  ];

  const onPressNext = () => {
    if (route.params && route.params.canBoBack) {
      navigation.goBack()
    } else {
      navigation.navigate(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN)
    }
  }

  return (
    <ScreenContainer edge={horizontalEdge}>
      <View style={style.container}>
        <View style={[style.textContainer,{justifyContent:isTab?'center':'flex-end'}]}>
          <Label style={style.titleStyle}>
            {t('onBoard.newsLetter.title')}
          </Label>
          <Label style={style.descStyle}>
            {t('onBoard.newsLetter.description')}
          </Label>
        </View>
        <View style={style.contentStyle}>
          <View>
            <NewsLettersWidget data={data} />
          </View>
        </View>
        <View style={style.nextButtonView}>
          <NextButton
            testID="nextButtonTestId"
            title={t('onBoard.common.nextBtn')}
            onPress={onPressNext}
            style={style}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const NewsLetterScreenStyle = StyleSheet.create({
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
      flex: 0.15,
      paddingHorizontal: normalize(5),
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
      lineHeight: normalize(22),
    },
    contentStyle: {
      flex: 0.75,
      justifyContent: 'flex-start',
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
  return NewsLetterScreenStyle;
};

import React, {FunctionComponent, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {View, StyleSheet} from 'react-native';
import {isTab, normalize, recordLogEvent} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {ButtonOnboard, Label} from 'src/components/atoms';
import TickAnimation from '../../../assets/lottie-animation/tick.json';
import {ScreensConstants, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import { useDispatch } from 'react-redux';
import { onBoardingSuccess } from 'src/redux/login/action';
import AdjustAnalyticsManager, { AdjustEventID } from 'src/shared/utils/AdjustAnalyticsManager';
import { useAllWriters, useNewsLetters, useOrientation } from 'src/hooks';
import { fonts } from 'src/shared/styles/fonts';
import { LottieViewAnimation } from 'src/shared/utils/LottieViewAnimation';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export const SuccessScreen: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const styles = useThemeAwareObject(createStyles);
  const dispatch = useDispatch();
  const {isPortrait} = useOrientation();
  const buttonContainerStyle = (isTab && !isPortrait) ? styles.buttonContainerLandscape : styles.buttonContainer

  const { emptySelectedWritersDataOnboard } = useAllWriters();
  const { emptySelectedNewsletterDataOnboard } = useNewsLetters();

  useEffect(() => {
    emptySelectedWritersDataOnboard()
    emptySelectedNewsletterDataOnboard()
    AdjustAnalyticsManager.trackEvent(AdjustEventID.LOGIN)
  }, [])

  return (
    <ScreenContainer backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {getSvgImages({
            name: ImagesName.headerLogo,
            width: styles.logo.width,
            height: styles.logo.height,
          })}
        </View>
        <LottieViewAnimation 
          source={TickAnimation} 
          style={styles.tickContainer}/>
        <View style={styles.messageContainer}>
          <Label style={styles.titleStyle} labelType="h1" children={TranslateConstants({key: TranslateKey.ONBOARD_SUCCESS_MESSAGE})} />
          <Label
            labelType="content"
            style={styles.mailAcknowledgement}
            children={TranslateConstants({key: TranslateKey.ONBOARD_SUCCESS_MAIL_ACKNOWLEDGEMENT})}
          />
        </View>
        <View style={buttonContainerStyle}>
          <ButtonOnboard
            title={TranslateConstants({key: TranslateKey.ONBOARD_SUCCESS_GO_TO_HOME})}
            onPress={() => {
              recordLogEvent(AnalyticsEvents.COMPLETED_ONBOARDING);
              dispatch(onBoardingSuccess());
              navigation.reset({
                index: 0,
                routes: [{name: ScreensConstants.AppNavigator}],
              });
            }}
          />
        </View>
        <View style={styles.buttonMargin}>
          <ButtonOnboard
            title={TranslateConstants({key: TranslateKey.ONBOARD_SUCCESS_GO_TO_MY_NEWS})}
            onPress={() => {
              recordLogEvent(AnalyticsEvents.COMPLETED_ONBOARDING);
              dispatch(onBoardingSuccess());
              navigation.reset({
                index: 0,
                routes: [{name: ScreensConstants.AppNavigator, params: {isGoToMyNews: true}}],
              });
            }}
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: normalize(20),
      marginHorizontal: normalize(20),
      // justifyContent: 'space-evenly',
      backgroundColor: theme.onBoardBackground,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.3,
    },
    logo: {
      width: normalize(150),
      height: normalize(37),
    },
    tickContainer: {
      width: normalize(150),
      height: normalize(150),
      marginVertical: isTab ? '4%' : '10%',
      alignSelf: 'center',
    },
    messageContainer: {
      alignItems: 'center',
    },
    mailAcknowledgement: {
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      fontSize: normalize(13),
      marginTop: '5%',
      lineHeight: 22,
      textAlign: 'center',
    },
    buttonContainer: {
      marginTop: '15%',
    },
    buttonContainerLandscape: {
      marginTop: '5%',
    },
    titleStyle: {
      fontSize: normalize(22),
    },
    buttonStyle: {
      backgroundColor: theme.secondaryGreen
    },
    buttonTitleStyle: {
      color: theme.goToLabelTitle
    },
    buttonMargin: {
      marginTop: 15
    },
    screenBackgroundColor: {
      backgroundColor: theme.onBoardBackground
    }
  });

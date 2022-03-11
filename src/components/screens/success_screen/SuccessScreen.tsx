import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {View, StyleSheet, TouchableOpacity, AppState} from 'react-native';
import {normalize} from '../../../shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {ButtonOnboard, Label} from 'src/components/atoms';
import LottieView from 'lottie-react-native';
import TickAnimation from '../../../assets/lottie-animation/tick.json';
import {ScreensConstants} from 'src/constants';
import { useDispatch } from 'react-redux';
import { onBoardingSuccess } from 'src/redux/login/action';

export const SuccessScreen: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [animationRef,setAnimationRef] = useState<LottieView>()

  useEffect(() => {
    console.log('useeffectstart',animationRef)
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        if (animationRef) {
          console.log('animationref',appState.current)
          animationRef?.resume();
        }
      }
      appState.current = nextAppState;
    });
    return () => { subscription.remove(); };
  }, [animationRef]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {getSvgImages({
            name: ImagesName.headerLogo,
            width: styles.logo.width,
            height: styles.logo.height,
          })}
        </View>
        <LottieView
          source={TickAnimation}
          autoPlay
          style={styles.tickContainer}
          ref={ref => setAnimationRef(ref)}
        />
        <View style={styles.messageContainer}>
          <Label labelType="h1" children={t('onboardSuccess.successMessage')} />
          <Label
            labelType="content"
            style={styles.mailAcknowledgement}
            children={t('onboardSuccess.mailAcknowledgement')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonOnboard
            title={t('onboardSuccess.goToHome')}
            onPress={() => {
              dispatch(onBoardingSuccess());
              navigation.reset({
                index: 0,
                routes: [{name: ScreensConstants.AppNavigator}],
              });
            }}
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
      backgroundColor: theme.backgroundColor,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.3,
    },
    logo: {
      width: normalize(150),
      height: normalize(30),
    },
    tickContainer: {
      width: normalize(150),
      height: normalize(150),
      marginVertical: '10%',
      alignSelf: 'center',
    },
    messageContainer: {
      alignItems: 'center',
    },
    mailAcknowledgement: {
      fontSize: normalize(13),
      marginTop: '5%',
      lineHeight: 19,
      textAlign: 'center',
    },
    buttonContainer: {
      marginTop: '15%',
    },
  });

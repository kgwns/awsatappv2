import React from 'react';
import {
  StyleSheet,
  StatusBar,
  StatusBarStyle,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {isDarkTheme, normalize} from '../../../shared/utils';
import {useAppCommon} from '../../../hooks/useAppCommon';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Label, LoadingState, Image} from 'src/components/atoms';
import {useNavigation} from '@react-navigation/native';
import {Styles} from 'src/shared/styles';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import DeviceInfo from 'react-native-device-info';
import {AlertModal} from 'src/components/organisms';
import {ScreensConstants} from 'src/constants';

const isIphoneX = DeviceInfo.hasNotch();

export interface AlertPayloadType {
  title: string;
  message: string;
  buttonTitle: string;
}

export interface ScreenContainerProps {
  children: any;
  edge?: Edge[];
  isLoading?: boolean;
  isOverlayLoading?: boolean;
  barStyle?: StatusBarStyle;
  showHeader?: boolean;
  headerTitle?: string;
  statusbarColor?: string;
  isSignUpAlertVisible?: boolean;
  onCloseSignUpAlert?: () => void;
  isAlertVisible?: boolean;
  setIsAlertVisible?: any;
  alertPayload?: AlertPayloadType;
  alertOnPress?: () => void;
}

export const ScreenContainer = ({
  children,
  edge,
  isLoading = false,
  barStyle,
  showHeader = false,
  headerTitle,
  statusbarColor,
  isOverlayLoading = false,
  isSignUpAlertVisible = false,
  onCloseSignUpAlert,
  alertPayload,
  alertOnPress,
  isAlertVisible,
  setIsAlertVisible,
}: ScreenContainerProps) => {
  const {theme} = useAppCommon();
  const isDarkMode = isDarkTheme(theme);
  const style = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const {themeData} = useTheme();

  const [t] = useTranslation();

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSignUp = () => {
    onCloseSignUpAlert && onCloseSignUpAlert();
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  };

  const header = (title?: string) => {
    return (
      <View style={style.headerContainer}>
        {title && (
          <Label
            labelType="h2"
            color={themeData.secondaryDarkSlate}
            style={style.headerTitle}>
            {title}
          </Label>
        )}
        <TouchableOpacity style={style.returnStyle} onPress={onPressBack}>
          <Image name="returnIcon" style={style.returnIconStyle} />
          <Label style={style.prevTitleStyle}>
            {t('onBoard.common.return')}
          </Label>
        </TouchableOpacity>
      </View>
    );
  };

  const statusBarBackgroundColor = statusbarColor || themeData.backgroundColor;
  return (
      <SafeAreaView
        style={style.container}
        edges={edge ? edge : ['left', 'right', 'top']}>
        {showHeader && header(headerTitle)}
        <StatusBar
          backgroundColor={statusBarBackgroundColor}
          barStyle={
            barStyle ? barStyle : isDarkMode ? 'light-content' : 'dark-content'
          }
        />
        {children}
        {isLoading && <LoadingState />}
        {isOverlayLoading && (
          <View style={style.loadingOverlay}>
            <LoadingState />
          </View>
        )}
        {isSignUpAlertVisible && (
          <AlertModal
            title={t('signUpAlert.notSubscribed')}
            message={t('signUpAlert.description')}
            buttonText={t('signUpAlert.signUp')}
            isVisible={isSignUpAlertVisible}
            onPressSuccess={onPressSignUp}
            onClose={() => onCloseSignUpAlert && onCloseSignUpAlert()}
          />
        )}

        {isAlertVisible && (
          <AlertModal
            title={alertPayload ? alertPayload.title : ''}
            message={alertPayload ? alertPayload.message : ''}
            buttonText={alertPayload ? alertPayload.buttonTitle : ''}
            isVisible={isAlertVisible}
            onPressSuccess={alertOnPress}
            onClose={() => setIsAlertVisible && setIsAlertVisible(false)}
          />
        )}
      </SafeAreaView>
  );
};

const createStyles = (theme: CustomThemeType) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    prevIconStyle: {
      width: normalize(12),
      height: normalize(8.8),
      marginEnd: normalize(5),
      alignItems: 'center',

      paddingHorizontal: normalize(10),
    },
    prevTitleStyle: {
      fontSize: normalize(13),
      lineHeight: normalize(16),
      color: theme.secondaryDarkSlate,
    },
    returnStyle: {
      flexDirection: 'row',
      position: 'absolute',
      left: normalize(10),
      alignContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      color: Styles.color.white,
    },
    headerContainer: {
      height: normalize(55),
      backgroundColor: theme.backgroundColor,
      justifyContent: 'center',
    },
    returnIconStyle: {
      tintColor: theme.secondaryDarkSlate,
      marginRight: normalize(5),
      width: normalize(12),
      height: normalize(12),
    },
    headerTitle: {
      position: 'absolute',
      alignSelf: 'center',
    },
    loadingOverlay: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.backgroundColor,
      opacity: 0.8,
      position: 'absolute',
    },
  });
  return styles;
};

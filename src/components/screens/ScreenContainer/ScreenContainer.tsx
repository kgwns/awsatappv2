import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  StatusBarStyle,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {DEFAULT_HIT_SLOP, isDarkTheme, isNotEmpty, isTab, normalize, screenWidth} from '../../../shared/utils';
import {useAppCommon} from '../../../hooks/useAppCommon';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Label, LoadingState, Image} from 'src/components/atoms';
import {useNavigation} from '@react-navigation/native';
import {ImagesName, Styles} from 'src/shared/styles';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import DeviceInfo from 'react-native-device-info';
import {AlertModal, PopUp} from 'src/components/organisms';
import {ScreensConstants} from 'src/constants';
import { PopUpType } from 'src/components/organisms/popUp/PopUp';
import { getSvgImages } from 'src/shared/styles/svgImages';
import TrackPlayer from 'react-native-track-player';
import { PodCastMiniPlayer } from 'src/components/molecules';
import  { useAppPlayer } from 'src/hooks/useAppPlayer';

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
  headerLeft?: any;
  playerPosition?: StyleProp<ViewStyle>;
  showPlayer?: boolean;
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
  headerLeft,
  playerPosition,
  showPlayer = true,
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

  const { showMiniPlayer, setShowMiniPlayer, setPlayerTrack } = useAppPlayer()
  const [showPlayerControls, setShowPlayerControls] = useState(false);

  const onClose = async () => {
    setShowMiniPlayer(false)
    setPlayerTrack(null)
    await TrackPlayer.stop();
    await TrackPlayer.reset();
  }

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
        {isNotEmpty(title) && (
          <Label
            labelType="h2"
            color={themeData.secondaryDarkSlate}
            style={[style.headerTitle, { marginLeft: (title && title?.length > 20) ? normalize(30) : 0 }]}>
            {title}
          </Label>
        )}
        {headerLeft && headerLeft()}
        <TouchableOpacity hitSlop={isTab ? { top: 15, bottom: 15, left: 15, right: 15 } : DEFAULT_HIT_SLOP} style={style.returnStyle} onPress={onPressBack}>
          {getSvgImages({ name: ImagesName.returnBlackSvg, size: normalize(12), style: { marginRight: 5 }})}
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
        {/* {isSignUpAlertVisible && (
          <AlertModal
            title={t('signUpAlert.notSubscribed')}
            message={t('signUpAlert.description')}
            buttonText={t('signUpAlert.signUp')}
            isVisible={isSignUpAlertVisible}
            onPressSuccess={onPressSignUp}
            onClose={() => onCloseSignUpAlert && onCloseSignUpAlert()}
          />
        )} */}
        {isSignUpAlertVisible && <PopUp type={PopUpType.rbSheet}
        onPressButton={onPressSignUp}
        showPopUp={isSignUpAlertVisible}
        onClosePopUp={() => onCloseSignUpAlert && onCloseSignUpAlert()} />}

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

        { showPlayer && showMiniPlayer && <PodCastMiniPlayer onClose={onClose} toggleControl={() => { setShowPlayerControls(!showPlayerControls)}} playerPosition={playerPosition} />}
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
      left: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
      alignContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      color: Styles.color.white,
    },
    headerContainer: {
      height: normalize(55),
      backgroundColor: theme.backgroundColor,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    returnIconStyle: {
      tintColor: theme.secondaryDarkSlate,
      marginRight: normalize(5),
      width: normalize(12),
      height: normalize(12),
    },
    headerTitle: {
      paddingLeft: 0
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

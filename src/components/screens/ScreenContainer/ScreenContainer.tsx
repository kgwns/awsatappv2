import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  StatusBarStyle,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { DEFAULT_HIT_SLOP, isAndroid, isDarkTheme, isIOS, isNotEmpty, isTab, normalize, screenWidth } from '../../../shared/utils';
import { useAppCommon } from '../../../hooks/useAppCommon';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { Label, LoadingState } from 'src/components/atoms';
import { useNavigation } from '@react-navigation/native';
import { ImagesName } from 'src/shared/styles';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { AlertModal, PopUp } from 'src/components/organisms';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { PopUpType } from 'src/components/organisms/popUp/PopUp';
import { getSvgImages } from 'src/shared/styles/svgImages';
import TrackPlayer from 'react-native-track-player';
import { PodCastMiniPlayer } from 'src/components/molecules';
import { useAppPlayer } from 'src/hooks/useAppPlayer';
import { fonts } from 'src/shared/styles/fonts';

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
  textStyle?: StyleProp<TextStyle>;
  showPlayer?: boolean;
  isLandscape?: boolean;
  backgroundColor?: string;
  isAlertCloseIconVisible?: boolean;
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
  isLandscape = false,
  backgroundColor = '',
  isAlertCloseIconVisible = true,
  textStyle,
}: ScreenContainerProps) => {
  const { theme } = useAppCommon();
  const isDarkMode = isDarkTheme(theme);
  const style = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const { themeData } = useTheme();

  const onPressBack = () => {
    navigation.goBack();
  };

  const { showMiniPlayer, setShowMiniPlayer, setPlayerTrack } = useAppPlayer()
  const [showPlayerControls, setShowPlayerControls] = useState(false);

  const CONST_RETURN = TranslateConstants({ key: TranslateKey.RETURN })

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
      routes: [{ name: ScreensConstants.AuthNavigator }],
    });
  };

  const renderBack = () => (
    <TouchableOpacity
      hitSlop={isTab ? style.tabHitSlop : DEFAULT_HIT_SLOP}
      style={style.returnStyle}
      onPress={onPressBack}>
      <Label style={style.prevTitleStyle}>{CONST_RETURN}</Label>
      {getSvgImages({
        name: ImagesName.returnGreenish,
        width: style.prevIconStyle.width,
        height: style.prevIconStyle.height,
        style: style.prevIconStyle,
      })}
    </TouchableOpacity>
  );

  const header = (title?: string) => {
    const titleStyle = { marginLeft: title && ((isTab && title.length > 60) || (title?.length > 15)) ? 35 : 0 }
    return (
      <View style={style.headerContainer}>
        {isNotEmpty(title) && (
          <Label
            labelType="h2"
            color={themeData.secondaryDarkSlate}
            style={[style.headerTitle, titleStyle, textStyle]}>
            {title}
          </Label>
        )}
        {headerLeft && headerLeft()}
        {renderBack()}
      </View>
    );
  };

  const statusBarBackgroundColor = statusbarColor || isNotEmpty(backgroundColor) ? backgroundColor : themeData.backgroundColor;
  const contentStyle = isDarkMode ? 'light-content' : 'dark-content';
  return (
    <SafeAreaView
      style={[style.container,
      isNotEmpty(backgroundColor) && { backgroundColor: backgroundColor }
      ]} // Intensively added inline style to update screen size when rotate
      edges={edge ? edge : ['left', 'right', 'top']}>
      {showHeader && header(headerTitle)}
      <StatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={
          barStyle ? barStyle : contentStyle
        }
      />
      {children}
      {isLoading && <LoadingState />}
      {isOverlayLoading && (
        <View style={[style.loadingOverlay, isNotEmpty(backgroundColor) && { backgroundColor: backgroundColor }]}>
          <LoadingState />
        </View>
      )}
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
          isCloseIconVisible={isAlertCloseIconVisible}
        />
      )}

      {showPlayer && showMiniPlayer && !isLoading &&
        <PodCastMiniPlayer
          onClose={onClose}
          toggleControl={() => { setShowPlayerControls(!showPlayerControls) }}
          playerPosition={playerPosition}
        />
      }

    </SafeAreaView>
  );
};

const createStyles = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    prevIconStyle: {
      width: isTab ? 14 : 12,
      height: isTab ? 10.8 : 8.8,
      marginEnd: 5,
      marginTop: isAndroid ? 2 : 0,
    },
    prevTitleStyle: {
      color: theme.primaryDarkSlateGray,
      fontSize: isTab ? 16 : 12,
      lineHeight: 50,
      fontFamily: fonts.AwsatDigital_Regular,
    },
    returnStyle: {
      flexDirection: 'row-reverse',
      position: 'absolute',
      left: isTab ? normalize(0.02 * screenWidth) : (0.04 * screenWidth),
      top: isIOS ? 6 : 5,
      alignContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      minHeight: 55,
      backgroundColor: theme.backgroundColor,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 16,
      lineHeight: 30,
      color: theme.primaryDarkSlateGray,
      fontFamily: fonts.IBMPlexSansArabic_Bold,
      paddingLeft: 0,
      paddingVertical: 0,
      paddingTop: 8,
      maxWidth: screenWidth - 100,
    },
    loadingOverlay: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.backgroundColor,
      opacity: 0.8,
      position: 'absolute',
    },
    tabHitSlop: {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15
    }
  });
};

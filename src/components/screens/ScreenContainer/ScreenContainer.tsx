import React from 'react'
import { StyleSheet, StatusBar, StatusBarStyle, View, TouchableOpacity } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { isDarkTheme, normalize } from '../../../shared/utils'
import { useAppCommon } from '../../../hooks/useAppCommon'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { Label, LoadingState, Image } from 'src/components/atoms';
import { useNavigation } from '@react-navigation/native';
import { Styles } from 'src/shared/styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import DeviceInfo from 'react-native-device-info';

const isIphoneX = DeviceInfo.hasNotch();

export interface ScreenContainerProps {
  children: any,
  edge?: Edge[],
  isLoading?: boolean;
  barStyle?: StatusBarStyle;
  showHeader?: boolean;
  headerTitle?: string;
}

export const ScreenContainer = ({ children, edge, isLoading = false, barStyle, showHeader = false, headerTitle }: ScreenContainerProps) => {
  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)
  const style = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const { themeData } = useTheme();

  const [t] = useTranslation();

  const onPressBack = () => {
    navigation.goBack();
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

  return (
    <SafeAreaView
      style={style.container}
      edges={edge ? edge : ['left', 'right', 'top']}>
      {showHeader && header(headerTitle)}
      <StatusBar backgroundColor={themeData.backgroundColor} barStyle={barStyle ? barStyle : (isDarkMode ? 'light-content' : 'dark-content')} />
      {children}
      {isLoading && <LoadingState />}
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
      marginTop: isIphoneX ? normalize(30) : 0
    },
    returnIconStyle: {
      tintColor: theme.secondaryDarkSlate,
      marginRight: 10,
    },
    headerTitle: {
      position: 'absolute',
      alignSelf: 'center',
    },
  });
  return styles;
};

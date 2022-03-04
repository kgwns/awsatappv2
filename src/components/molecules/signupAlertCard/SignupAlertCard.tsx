import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Label} from 'src/components/atoms';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {isDarkTheme, normalize} from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { useAppCommon } from 'src/hooks';

interface SignupAlertCardProps {
    title: string;
    message: string;
    buttonText: string;
    onPress?: string;

}

export const SignupAlertCard = ({title, message, buttonText, onPress}: SignupAlertCardProps) => {

    const styles = useThemeAwareObject(customStyle)
    const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)
  return (
    <View style={styles.container}>
      <View>
        <Label children={title} style={styles.titleTextStyle} />
        <Label
          children={message}
          style={styles.instructionTextStyle}
          numberOfLines={2}
        />
        <TouchableOpacity onPress={() => onPress}>
          <View style={styles.buttonBackgroundStyle}>
            <Label style={styles.buttonLabelStyle} children={buttonText} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const customStyle = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: normalize(324),
      width: normalize(349),
      backgroundColor: theme.secondaryWhite,
      borderRadius: normalize(30),
    },
    titleTextStyle: {
      fontSize: normalize(24),
      color: theme.primary,
      lineHeight: normalize(29),
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center',
      paddingBottom: normalize(20),
    },
    instructionTextStyle: {
      fontSize: normalize(16),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(25),
      textAlign: 'center',
      paddingBottom: normalize(50),
      width: normalize(278),
    },
    buttonBackgroundStyle: {
      height: normalize(46),
      backgroundColor: theme.primary,
      borderRadius: normalize(23),
      justifyContent: 'center',
      width: normalize(172),
      alignSelf: 'center',
    },
    buttonLabelStyle: {
      paddingHorizontal: normalize(10),
      fontSize: normalize(16),
      fontWeight: 'bold',
      color: colors.white,
      lineHeight: normalize(20),
      textAlign: 'center',
    },
    iconStyle: {
      alignSelf: 'flex-end',
      bottom: normalize(20),
      marginRight: normalize(30),
      paddingBottom: normalize(20),
    },
  });

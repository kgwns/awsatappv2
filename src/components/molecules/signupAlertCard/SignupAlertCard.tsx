import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Label} from 'src/components/atoms/label/Label';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import { normalize} from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';

interface SignupAlertCardProps {
    title: string;
    subTitle?: string;
    description?: string;
    message: string;
    buttonText: string;
    onPress?:() => void;

}

export const SignupAlertCard = ({
  title,
  subTitle = TranslateConstants({key:TranslateKey.NOT_SUBSCRIBED_POP_UP}),
  description = TranslateConstants({key:TranslateKey.CREATE_ACCOUNT_DESCRIPTION}),
  message, 
  buttonText, 
  onPress
}: SignupAlertCardProps) => {

    const styles = useThemeAwareObject(customStyle)
    return (
    <View style={styles.container} testID='signUpAlertContainerID'>
      <View>
        <Label children={subTitle} style={styles.titleTextStyle} />
        <Label
          children={description}
          style={styles.instructionTextStyle}
          numberOfLines={4}
        />
        <TouchableOpacity onPress={onPress}>
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
      lineHeight: normalize(42),
      fontFamily: fonts.AwsatDigital_Bold,
      justifyContent: 'center',
      textAlign: 'center',
      paddingBottom: normalize(20),
    },
    instructionTextStyle: {
      fontSize: normalize(16),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(28),
      textAlign: 'center',
      paddingBottom: normalize(50),
      paddingHorizontal: normalize(20),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
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
      fontFamily: fonts.AwsatDigital_Bold,
      color: colors.white,
      lineHeight: normalize(26),
      textAlign: 'center',
    },
    iconStyle: {
      alignSelf: 'flex-end',
      bottom: normalize(20),
      marginRight: normalize(30),
      paddingBottom: normalize(20),
    },
  });

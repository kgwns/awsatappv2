import React, { FC } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { isIOS, isTab, normalize, testProps } from 'src/shared/utils';
import { Label } from '../../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';
import { fonts } from 'src/shared/styles/fonts';

type AuthHeaderType = {
  backTitle: string;
  onPressBack(): void;
  testId: string;
};

export const AuthHeader: FC<AuthHeaderType> = ({
  backTitle,
  onPressBack,
  testId,
}) => {
  const styles = useThemeAwareObject(signUpStyles);

  const { themeData } = useTheme();

  const HeaderLogo = () => getSvgImages({
    name: ImagesName.headerLogo,
    width: styles.logo.width,
    height: styles.logo.height
  });

  return (
    <>
      <View style={styles.headerStyle}>
        <TouchableOpacity
          {...testProps(testId)}
          onPress={onPressBack}>
          <View style={styles.headerContainer}>
            <BackIcon fill={themeData.backIconColor} style={{ marginBottom: isIOS ? 5 : 0 }} />
            <Label
              children={backTitle}
              style={styles.headerLabelStyle}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        {HeaderLogo()}
      </View>
    </>
  );
};

const signUpStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.1,
      marginBottom: isTab ? 35 : normalize(35),
      marginTop: isTab ? 20 : normalize(20)
    },
    headerStyle: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    headerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerLabelStyle: {
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: isTab ? 12 : normalize(12),
      color: theme.backIconColor,
      lineHeight: isTab ? 16 : normalize(16),
      marginLeft: isTab ? 5 : normalize(5),
    },
    logo: {
      width: isTab ? 150 : normalize(150),
      height: isTab ? 37 : normalize(37),
    },
  });

import { StyleSheet } from 'react-native';
import { Styles } from 'src/shared/styles';
import { normalize, isIOS } from 'src/shared/utils';
import { CustomThemeType } from 'src/shared/styles/colors'
import { fonts } from 'src/shared/styles/fonts';

export const customBorderLabelStyles = (theme: CustomThemeType) => {
  const containerHeight = isIOS ? normalize(36) : normalize(40);
  const fontSizeValue = isIOS ? normalize(14) : normalize(17);
  const lineHeightValue = isIOS ? normalize(24) : normalize(28);
  const BorderLabelStyle = StyleSheet.create({
    tagContainer: {
      height: containerHeight,
      paddingVertical: normalize(6),
      borderRadius: normalize(20),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: Styles.color.cyanGray,
      backgroundColor: theme.backgroundColor
    },
    labelStyle: {
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
      fontSize: fontSizeValue,
      lineHeight: lineHeightValue,
      paddingHorizontal: normalize(20),
      paddingBottom: normalize(5),
      color: theme.primaryBlack
    },
    selectedTagContainer: {
      height: containerHeight,
      paddingVertical: normalize(6),
      borderRadius: normalize(20),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: theme.primary
    },
    selectedLabelStyle: {
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
      fontSize: fontSizeValue,
      lineHeight: lineHeightValue,
      paddingHorizontal: normalize(20),
      paddingBottom: normalize(5),
      color: Styles.color.white
    }
  });
  return BorderLabelStyle
}

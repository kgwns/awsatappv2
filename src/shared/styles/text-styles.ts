import {StyleSheet, TextStyle} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {isTab, normalize} from 'src/shared/utils/dimensions';
import { fonts } from './fonts';

export enum ImageResize {
  CONTAIN = 'contain',
  COVER = 'cover'
}

enum FontWeight {
  REGULAR = 'normal',
  MEDIUM = '500',
  SEMI_BOLD = '600',
  EXTRA_BOLD = '800',
  BOLD = 'bold'
}

enum FontStyle {
  NORMAL = 'normal',
}

enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export const textStyles = (theme: CustomThemeType) => {
  return StyleSheet.create<Record<string, TextStyle>>({
    h2: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontStyle: FontStyle.NORMAL,
      fontSize: isTab ? normalize(20) : normalize(16),
      lineHeight: isTab ? normalize(32) : normalize(26),
      textAlign: TextAlign.LEFT,
      paddingVertical: normalize(8),
      color: theme.primaryBlack
    },
    h3: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontStyle: FontStyle.NORMAL,
      fontSize: isTab ? 20 : 17, lineHeight: isTab ? 42 : 30,
      textAlign: TextAlign.LEFT,
      color: theme.primaryBlack,
    },
    content: {
      width: 365,
      color: colors.greyLight,
      fontSize: 12,
      letterSpacing: 0,
      lineHeight: 19,
      marginTop: 8,
      marginBottom: 10,
    },
    h4: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(13), lineHeight: normalize(16),
      fontWeight: FontWeight.BOLD,
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    h5: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(12), lineHeight: normalize(16),
      fontWeight: FontWeight.BOLD,
      textAlign: TextAlign.LEFT,
      color: colors.black,
    },
    h6: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 11, lineHeight: 17,
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    h8: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 9, lineHeight: 13,
      textAlign: TextAlign.CENTER,
      color: colors.white,
    },
    caption6: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 10, lineHeight: 16,
      textAlign: TextAlign.CENTER,
      color: colors.greyDark,
    },
    caption7: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 9, lineHeight: 13,
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    caption5: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(11),  lineHeight: normalize(17),
      textAlign: TextAlign.LEFT,
      color: colors.greyLight,
    },
    caption4: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 12, lineHeight: 18,
      textAlign: TextAlign.LEFT,
      color: colors.blue,
    },
    caption2: {
      fontFamily: fonts.Effra_Arbc_Regular,
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(17), lineHeight: normalize(36),
      textAlign: TextAlign.LEFT,
      color: colors.smokeyGrey,
    },
    caption9: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 16, lineHeight: 25,
      textAlign: TextAlign.LEFT,
      color: colors.blue,
    },
    caption8: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 14, lineHeight: 21,
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    p2: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(16), lineHeight: normalize(25),
      textAlign: TextAlign.LEFT,
      color: theme.primaryBlack,
    },
    p3: {
      fontFamily: fonts.Effra_Arbc_Regular,
      fontStyle: FontStyle.NORMAL,
      fontSize: isTab ? normalize(16) : normalize(15), lineHeight: normalize(26),
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    p4: {
      fontFamily: fonts.Effra_Arbc_Regular,
      fontStyle: FontStyle.NORMAL,
      fontSize: 14, lineHeight: 18,
      textAlign: TextAlign.LEFT,
      color: colors.smokeyGrey,
    },
    p5: {
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      fontStyle: FontStyle.NORMAL,
      fontSize: 12, lineHeight: 16,
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    p6: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 10, lineHeight: 16,
      textAlign: TextAlign.RIGHT,
      color: colors.red,
    },
    h1: {
      fontFamily: fonts.IBMPlexSansArabic_Bold,
      fontStyle: FontStyle.NORMAL,
      fontSize: 21, lineHeight: 45,
      textAlign: TextAlign.LEFT,
      color: theme.primaryBlack,
    },
    caption3: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(12),
      textAlign: TextAlign.RIGHT,
      color: colors.white
    },
    default: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 12, lineHeight: 13,
    },
    label10: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 10, lineHeight: 18,
      fontWeight: FontWeight.REGULAR,
      color: colors.greyLight,
      fontFamily: fonts.AwsatDigital_Regular,
    },
    underlinedTitle: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(12), lineHeight: normalize(18),
      fontWeight: FontWeight.REGULAR,
      textDecorationLine: 'underline',
      borderBottomColor: colors.blue,
      borderBottomWidth: 1,
      color: colors.blue,
    },
    title1: {
      fontFamily: fonts.AwsatDigital_Black,
      fontSize: 24, lineHeight: 36,
      textAlign: TextAlign.LEFT,
      color: theme.primaryBlack,
    },
    title3: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(20), lineHeight: normalize(32),
      textAlign: TextAlign.LEFT,
      color: theme.primaryBlack,
    },
    title4: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(17), lineHeight: normalize(28),
      textAlign: TextAlign.LEFT,
      color: theme.primaryBlack,
    }
  })
}

import {StyleSheet, TextStyle} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {normalize} from 'src/shared/utils/dimensions';

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
  const style = StyleSheet.create<Record<string, TextStyle>>({
    h2: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(16),
      lineHeight: normalize(26),
      textAlign: TextAlign.LEFT,
      fontWeight: FontWeight.SEMI_BOLD,
      paddingVertical: normalize(8),
      color: theme.primaryBlack
    },
    h3: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(14),
      lineHeight: normalize(23),
      textAlign: TextAlign.LEFT,
      fontWeight: FontWeight.SEMI_BOLD,
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
      fontSize: normalize(13),
      fontWeight: FontWeight.BOLD,
      lineHeight: normalize(16),
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    h5: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 12,
      lineHeight: 18,
      textAlign: TextAlign.LEFT,
      color: colors.blue,
    },
    h6: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 11,
      lineHeight: 17,
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    h8: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 9,
      lineHeight: 13,
      textAlign: TextAlign.CENTER,
      color: colors.white,
    },
    caption6: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 10,
      lineHeight: 16,
      textAlign: TextAlign.CENTER,
      color: colors.greyDark,
    },
    caption7: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 9,
      lineHeight: 13,
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    caption5: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(11),
      lineHeight: normalize(17),
      textAlign: TextAlign.LEFT,
      color: colors.greyLight,
    },
    caption4: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 12,
      lineHeight: 18,
      textAlign: TextAlign.LEFT,
      color: colors.blue,
    },
    caption2: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 22,
      lineHeight: 33,
      textAlign: TextAlign.RIGHT,
      color: colors.white,
    },
    caption9: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 16,
      lineHeight: 25,
      textAlign: TextAlign.LEFT,
      color: colors.blue,
    },
    caption8: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 14,
      lineHeight: 21,
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    p2: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(16),
      lineHeight: normalize(25),
      textAlign: TextAlign.LEFT,
      color: theme.primaryBlack,
    },
    p3: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(15),
      lineHeight: normalize(25),
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    p4: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(14),
      lineHeight: normalize(18),
      textAlign: TextAlign.LEFT,
      color: colors.smokeyGrey,
    },
    p5: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(12),
      lineHeight: normalize(16),
      textAlign: TextAlign.LEFT,
      color: colors.greyDark,
    },
    p6: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 10,
      lineHeight: 16,
      textAlign: TextAlign.RIGHT,
      color: colors.red,
    },
    h1: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(21),
      lineHeight: normalize(33),
      textAlign: TextAlign.LEFT,
      fontWeight: FontWeight.SEMI_BOLD,
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
      fontSize: 12,
      lineHeight: 13,
      fontWeight: FontWeight.REGULAR,
    },
    label10: {
      fontStyle: FontStyle.NORMAL,
      fontSize: 10,
      lineHeight: 13,
      fontWeight: FontWeight.REGULAR,
      color: colors.greyLight,
    },
    underlinedTitle: {
      fontStyle: FontStyle.NORMAL,
      fontSize: normalize(12),
      lineHeight: normalize(18),
      fontWeight: FontWeight.REGULAR,
      textDecorationLine: 'underline',
      borderBottomColor: colors.blue,
      borderBottomWidth: 1,
      color: colors.blue,
    },
  })

    return style
}


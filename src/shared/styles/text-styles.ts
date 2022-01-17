import {StyleSheet, TextStyle} from 'react-native';
import {fonts} from 'src/shared/styles/fonts';
import {colors} from 'src/shared/styles/colors';
import {normalize} from 'src/shared/utils/dimensions';

enum FontWeight {
  REGULAR = 'normal',
  MEDIUM = '500',
  SEMI_BOLD = '600',
  EXTRA_BOLD = '800',
}

enum FontStyle {
  NORMAL = 'normal',
}

enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}
export const textStyles = StyleSheet.create<Record<string, TextStyle>>({
  h2: {
    fontStyle: FontStyle.NORMAL,
    fontSize: 18,
    lineHeight: 25,
    textAlign: TextAlign.LEFT,
    color: colors.greyDark,
  },
  h3: {
    fontStyle: FontStyle.NORMAL,
    fontSize: 16,
    lineHeight: 25,
    textAlign: TextAlign.LEFT,
    color: colors.greyDark,
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
    fontSize: 14,
    lineHeight: 22,
    textAlign: TextAlign.CENTER,
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
    fontSize: 11,
    lineHeight: 17,
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
  p3: {
    fontStyle: FontStyle.NORMAL,
    fontSize: 14,
    lineHeight: 21,
    textAlign: TextAlign.CENTER,
    color: colors.white,
  },
  p4: {
    fontStyle: FontStyle.NORMAL,
    fontSize: 12,
    lineHeight: 18,
    textAlign: TextAlign.RIGHT,
    color: colors.red,
  },
  p5: {
    fontStyle: FontStyle.NORMAL,
    fontSize: 11,
    lineHeight: 17,
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
    fontSize: normalize(28),
    textAlign: TextAlign.LEFT,
  },
  caption3: {
    fontStyle: FontStyle.NORMAL,
    fontSize: normalize(18),
    textAlign: TextAlign.LEFT,
    color: colors.greyLight,
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
    fontSize: 12,
    lineHeight: 18,
    fontWeight: FontWeight.REGULAR,
    textDecorationLine: 'underline',
    borderBottomColor: colors.blue,
    borderBottomWidth: 1,
    color: colors.blue,
  },
});

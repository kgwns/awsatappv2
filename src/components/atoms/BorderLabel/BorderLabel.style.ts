import { StyleSheet } from 'react-native';
import { Styles } from 'src/shared/styles';
import { normalize } from 'src/shared/utils';
import { CustomThemeType } from 'src/shared/styles/colors'
import { fonts } from 'src/shared/styles/fonts';

export const customBorderLabelStyles = (theme: CustomThemeType) => {
  const BorderLabelStyle = StyleSheet.create({
    tagContainer: {
      height: normalize(36),
      paddingVertical: normalize(6),
      borderRadius: normalize(20),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: Styles.color.cyanGray,
      backgroundColor: theme.backgroundColor
    },
    labelStyle: {
      fontFamily: fonts.Almaria_Regular,
      fontSize: normalize(14),
      lineHeight: normalize(22),
      paddingHorizontal: normalize(20),
      paddingBottom: normalize(5),
      color: theme.primaryBlack
    },
    selectedTagContainer: {
      height: normalize(36),
      paddingVertical: normalize(6),
      borderRadius: normalize(20),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: theme.primary
    },
    selectedLabelStyle: {
      fontFamily: fonts.Almaria_Regular,
      fontSize: normalize(14),
      lineHeight: normalize(22),
      paddingHorizontal: normalize(20),
      paddingBottom: normalize(5),
      color: Styles.color.white
    }
  });
  return BorderLabelStyle
}
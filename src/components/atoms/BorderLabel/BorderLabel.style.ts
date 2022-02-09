import { StyleSheet } from 'react-native';
import { Styles } from 'src/shared/styles';
import { normalize } from 'src/shared/utils';
import { CustomThemeType } from 'src/shared/styles/colors'

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
      height: normalize(18),
      fontSize: normalize(12),
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
      height: normalize(18),
      fontSize: normalize(12),
      paddingHorizontal: normalize(20),
      paddingBottom: normalize(5),
      color: Styles.color.white
    }
  });
  return BorderLabelStyle
}
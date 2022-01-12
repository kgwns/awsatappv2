import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils/dimensions';
import {fonts} from 'src/shared/styles/fonts';

export const linkButtonStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textStyle: {
    lineHeight: 20,
    color: Styles.color.red,
    marginRight: 7,
    fontSize: normalize(14),
    fontFamily: fonts.Poppins_Medium,
    fontWeight: '500',
  },
});

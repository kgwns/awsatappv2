import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';

export const buttonWideStyle = StyleSheet.create({
  container: {
    height: normalize(54),
    borderRadius: 20,
    backgroundColor: Styles.color.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disableStyle: {
    backgroundColor: Styles.color.greyLight,
  },
  labelStyle: {
    color: Styles.color.white,
    fontSize: normalize(16),
    lineHeight: 25,
    fontFamily: Styles.font.Poppins_SemiBold,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
export const menuButtonStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    color: Styles.color.greyDark,
    marginLeft: normalize(10),
  },
  iconStyle: {
    tintColor: Styles.color.greyLight,
  },
});

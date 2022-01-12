import {StyleSheet} from 'react-native';
import {normalize} from 'src/shared/utils/dimensions';
import {Styles} from 'src/shared/styles';

export const checkBoxStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: normalize(10),
  },
  iconStyle: {
    tintColor: Styles.color.blue,
  },
  lableStyle: {
    color: Styles.color.greyLight,
    fontSize: normalize(12),
    marginLeft: 10,
    lineHeight: normalize(18),
  },
});

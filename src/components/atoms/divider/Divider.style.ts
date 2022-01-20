import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import { normalize } from '../../../shared/utils';

export const dividerStyle = StyleSheet.create({
  container: {
    backgroundColor: Styles.color.greyLight,
    width: '100%',
    height: normalize(1),
    marginVertical: normalize(20)
  },
});

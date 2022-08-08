import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import { normalizeBy320, normalize } from '../../../shared/utils';

export const dividerStyle = StyleSheet.create({
  container: {
    backgroundColor: Styles.color.smokeyGrey,
    width: '100%',
    height: normalizeBy320(0.4),
    marginTop: normalize(20)
  },
})

import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';

export const horizontalProgressStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: Styles.color.greyLight,
  },
  progressBarStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Styles.color.blue,
    borderRadius: 6,
  },
});

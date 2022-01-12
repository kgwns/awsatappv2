import {StyleSheet} from 'react-native';

import {Styles} from 'src/shared/styles';

export const loadingStateStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.color.blue,
    borderRadius: 10,
    marginBottom: 100,
  },
});

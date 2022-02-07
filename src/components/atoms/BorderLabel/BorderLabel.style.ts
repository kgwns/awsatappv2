import { StyleSheet } from 'react-native';
import { Styles } from 'src/shared/styles';
import { normalize } from 'src/shared/utils';
export const BorderLabelStyle = StyleSheet.create({
  tagContainer: {
    height: normalize(36),
    paddingVertical: normalize(6),
    borderRadius: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Styles.color.cyanGray,
  },
  labelStyle: {
    height: normalize(18),
    fontSize: normalize(12),
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(5),
  },
});
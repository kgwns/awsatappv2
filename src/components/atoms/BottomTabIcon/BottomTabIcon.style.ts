import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils/dimensions';
import {colors} from 'src/shared/styles/colors';

export const bottomTabIconStyle = StyleSheet.create({
  selectedIconContainer: {
    alignItems: 'center',
    backgroundColor: colors.red,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 13,
    marginBottom: 15,
  },
  lableStyle: {
    marginTop: normalize(6),
    color: Styles.color.white,
    opacity: 0.5,
    fontSize: normalize(12),
    paddingHorizontal: 4,
  },
  iconStyle: {
    tintColor: Styles.color.white,
    opacity: 0.5,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 13,
    marginBottom: 15,
  },
  lableActiveStyle: {
    marginTop: normalize(6),
    color: Styles.color.white,
    fontSize: normalize(12),
    paddingHorizontal: 4,
  },
  iconActiveStyle: {
    tintColor: Styles.color.white,
  },
});

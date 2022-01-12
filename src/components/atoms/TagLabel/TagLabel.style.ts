import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils/dimensions';
export const tagLableStyle = StyleSheet.create({
  container: {
    backgroundColor: Styles.color.blueOpacity5,
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(6),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    marginBottom: normalize(15),
  },
  labelStyle: {
    fontSize: normalize(16),
    lineHeight: 20,
    color: Styles.color.blue,
  },
  iconStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Styles.color.red,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

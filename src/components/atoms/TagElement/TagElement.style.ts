import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils/dimensions';
export const tagElementStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(15),
    alignItems: 'center',
  },
  tagContainer: {
    backgroundColor: Styles.color.white10,
    width: normalize(70),
    height: normalize(36),
    paddingVertical: normalize(6),
    borderRadius: normalize(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: normalize(10),
    color: Styles.color.white,
    fontFamily: Styles.font.Poppins_Regular,
    paddingVertical: normalize(11),
  },
});

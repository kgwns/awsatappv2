import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';

export const interestItemStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(80),
    height: normalize(80),
    marginTop: normalize(20),
  },
  titleStyle: {
    fontFamily: Styles.font.Poppins_Regular,
    fontSize: normalize(10),
    lineHeight: 17,
    textAlign: 'center',
    color: Styles.color.blue,
  },
  iconContainer: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  selectedIconContainer: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(32),
    padding: 4,
    backgroundColor: Styles.color.red,
  },
});

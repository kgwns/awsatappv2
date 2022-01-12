import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';

export const inputFieldStyle = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: Styles.font.Poppins_Regular,
    position: 'absolute',
    top: normalize(13),
    color: Styles.color.greyLight,
    fontSize: normalize(14),
    lineHeight: 20,
  },
  activeLabelStyle: {
    fontFamily: Styles.font.Poppins_Regular,
    position: 'absolute',
    top: -7,
    color: Styles.color.greyLight,
  },
  textInputStyle: {
    fontFamily: Styles.font.Poppins_Regular,
    fontSize: normalize(14),
    color: Styles.color.greyDark,
    marginTop: normalize(10),
    flex: 1,
    marginRight: normalize(20),
    paddingVertical: 0,
  },
  lineStyle: {
    height: 1,
    marginTop: normalize(12),
    backgroundColor: Styles.color.blue10,
  },
  errorTextStyle: {
    color: Styles.color.red,
    marginTop: normalize(5),
  },
  iconStyle: {
    tintColor: Styles.color.red,
  },
  iconGreyStyle: {
    tintColor: Styles.color.greyLight,
  },
});

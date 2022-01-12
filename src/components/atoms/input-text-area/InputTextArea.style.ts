import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils/dimensions';

export const inputTextAreaStyle = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    minHeight: 200,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 4,
    marginVertical: 12,
    borderRadius: 8,
    borderColor: Styles.color.greyDark10,
    borderWidth: 1,
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
    color: Styles.color.greyLight,
  },
  textInputHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    fontFamily: Styles.font.Poppins_Regular,
    fontSize: normalize(14),
    color: Styles.color.greyDark,
    marginTop: normalize(8),
    flex: 1,
    marginRight: normalize(8),
    paddingVertical: 0,
  },
  errorTextStyle: {
    color: Styles.color.red,
    marginTop: normalize(5),
  },
  textCountContainer: {
    flexDirection: 'row',
  },
});

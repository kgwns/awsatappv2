import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';

const ICON_DIMENSION = 25;

export const numberTabStyle = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: ICON_DIMENSION,
    height: ICON_DIMENSION,
    borderRadius: ICON_DIMENSION / 2,
    alignContent: 'center',
    justifyContent: 'center',
  },
  numberLabel: {
    alignSelf: 'center',
    fontSize: 11,
    fontFamily: Styles.font.Poppins_SemiBold,
  },
  textLabel: {
    alignSelf: 'center',
    fontSize: 11,
    fontFamily: Styles.font.Poppins_Regular,
    color: Styles.color.greyDark,
    marginVertical: 10,
  },
});

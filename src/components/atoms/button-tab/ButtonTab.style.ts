import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils/dimensions';

export const buttonTabStyle = StyleSheet.create({
  tabStyle: {
    alignItems: 'center',
    height: normalize(54),
    backgroundColor: Styles.color.blue03,
    flex: 1,
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: normalize(16),
    lineHeight: 25,
    color: Styles.color.greyDark,
  },
  tabActiveStyle: {
    alignItems: 'center',
    height: normalize(54),
    backgroundColor: Styles.color.red,
    flex: 1,
    justifyContent: 'center',
  },
  labelActiveStyle: {
    fontSize: normalize(16),
    lineHeight: 25,
    color: Styles.color.white,
  },
});

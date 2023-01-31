import React, {FunctionComponent} from 'react';
import {StyleProp, ViewStyle, TouchableOpacity, TextStyle, StyleSheet, View} from 'react-native';
import { Label,LabelType } from 'src/components/atoms/label/Label';
import {normalize} from 'src/shared/utils/dimensions';
import { Styles } from 'src/shared/styles';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import { isIOS } from 'src/shared/utils';
import { fonts } from 'src/shared/styles/fonts';

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  container: {
    width: '100%',
    height: isIOS ? normalize(42) : normalize(45),
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: normalize(25),
    borderColor: Styles.color.greyLight1,
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(8),
    marginVertical: normalize(7)
  },
  textStyle: {
    fontFamily: fonts.AwsatDigital_Bold,
    fontSize: normalize(16),
    lineHeight: normalize(15),
    color: theme.signInTextColor,
  },
  labelContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
});
interface SocialLoginButtonProps {
  label: string;
  labelType?: LabelType;
  color?: string;
  onPress: () => void;
  icon?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelContainer?: StyleProp<TextStyle>;
  testID?: string;
}
export const SocialLoginButton: FunctionComponent<SocialLoginButtonProps> = ({
  label,
  labelType,
  color = Styles.color.doveGray,
  icon,
  style,
  onPress,
  labelStyle,
  labelContainer,
  testID,
}) => {
  const styles = useThemeAwareObject(createStyles);
  return (
  <TouchableOpacity
    testID={testID}
    accessibilityLabel={testID}
    onPress={onPress}
    style={[styles.container, style]}
  >
    <View style={[styles.labelContainer, labelContainer]}>
      <Label color={color} style={[styles.textStyle, labelStyle]} labelType={labelType}>
        {label}
      </Label>
    </View>
      {icon && icon()}
  </TouchableOpacity>
  );
};



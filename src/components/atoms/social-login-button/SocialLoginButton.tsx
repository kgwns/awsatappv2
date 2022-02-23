import React, {FunctionComponent} from 'react';
import {StyleProp, ViewStyle, TouchableOpacity, TextStyle, StyleSheet, View} from 'react-native';
import { Label} from 'src/components/atoms';
import {LabelType} from 'src/components/atoms/label/Label';
import {normalize} from 'src/shared/utils/dimensions';
import { Styles } from 'src/shared/styles';

const linkButtonStyle = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: normalize(25),
    borderColor: Styles.color.greyDark,
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(7),
    marginVertical: normalize(7)
  },
  textStyle: {
    fontSize: normalize(14),
    lineHeight: normalize(15),
  },
  labelContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
});

const {container, textStyle, labelContainer} = linkButtonStyle;

interface SocialLoginButtonProps {
  label: string;
  labelType?: LabelType;
  color?: string;
  onPress: () => void;
  icon?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
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
  testID,
}) => (
  <TouchableOpacity
    testID={testID}
    accessibilityLabel={testID}
    onPress={onPress}
    style={[container, style]}
  >
    <View style={[labelContainer, style]}>
      <Label color={color} style={[textStyle, labelStyle]} labelType={labelType}>
        {label}
      </Label>
    </View>
    {icon && icon()}
  </TouchableOpacity>
);



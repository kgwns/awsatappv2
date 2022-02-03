import React, {FunctionComponent} from 'react';
import {StyleProp, ViewStyle, TouchableOpacity, TextStyle, StyleSheet, View} from 'react-native';
import {Image, ImageName, Label} from 'src/components/atoms';
import {LabelType} from 'src/components/atoms/label/Label';
import {normalize} from 'src/shared/utils/dimensions';
import { colors } from '../../../shared/styles/colors';

const linkButtonStyle = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: normalize(25),
    borderColor: colors.greyDark,
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(7),
    marginVertical: normalize(7)
  },
  textStyle: {
    fontSize: normalize(14),
    lineHeight: normalize(15),
  },
  imageContainer: {
    flex: 0.2,
    justifyContent:'center',
    alignItems:'center',
  },
  labelContainer: {
    flex: 0.8,
    justifyContent:'center',
    alignItems:'center',
  },
});

const {container, textStyle, imageContainer,labelContainer} = linkButtonStyle;

interface SocialLoginButtonProps {
  label: string;
  labelType?: LabelType;
  color?: string;
  onPress: () => void;
  icon?: ImageName;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
}
export const SocialLoginButton: FunctionComponent<SocialLoginButtonProps> = ({
  label,
  labelType,
  color,
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
    {icon &&
      <View style={[imageContainer, style]}>
        <Image name={icon} size={normalize(25)} />
      </View>
      }
  </TouchableOpacity>
);



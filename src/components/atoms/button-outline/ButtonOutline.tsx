import React, {FunctionComponent} from 'react';
import {StyleProp, ViewStyle, TouchableOpacity, TextStyle, StyleSheet, View} from 'react-native';
import { Label,LabelType} from 'src/components/atoms/label/Label';
import { normalize} from 'src/shared/utils/dimensions';
import { colors } from '../../../shared/styles/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: normalize(45),
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
    marginRight: 10
  },
  imageContainer: {
    flex: 0.2,
    justifyContent:'center',
    alignItems:'center',
  },
  labelContainer: {
    flexDirection: 'row',
    flex: 0.8,
    justifyContent:'center',
    alignItems:'center',
  },
});

const {container, textStyle, imageContainer,labelContainer} = styles;

interface ButtonOutlineProps {
  title: string;
  titleType?: LabelType;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
  leftIcon?: () => void;
  rightIcon?: () => void;
  isDisable?: boolean
}
export const ButtonOutline: FunctionComponent<ButtonOutlineProps> = ({
  title,
  titleType,
  color,
  style,
  onPress,
  labelStyle,
  testID,
  leftIcon,
  rightIcon,
  isDisable = false
}) => (
  <TouchableOpacity
    disabled={isDisable}
    testID={testID}
    accessibilityLabel={testID}
    onPress={onPress}
    style={[container, style, isDisable? createStyles.disableStyle : null]}
  >
    <View style={[labelContainer]}>
      {rightIcon && rightIcon()}
      <Label color={color} style={[textStyle, labelStyle]} labelType={titleType}>
        {title}
      </Label>
      {leftIcon && leftIcon()}
    </View>
  </TouchableOpacity>
);

const createStyles = StyleSheet.create({
    disableStyle: {
      opacity: 0.7
    },
  })



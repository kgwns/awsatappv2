import React, {FunctionComponent, useState} from 'react';
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {Label} from 'src/components/atoms/label/Label';
import { Image, ImageName} from 'src/components/atoms/image/Image';
import {normalize} from 'src/shared/utils';
import {inputFieldStyle} from 'src/components/atoms/input-field/InputField.style';

const {
  container,
  labelStyle,
  activeLabelStyle,
  textInputStyle,
  lineStyle,
  inputContainer,
  errorTextStyle,
  iconStyle,
  iconGreyStyle,
} = inputFieldStyle;

interface InputFieldProps {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  icon?: ImageName;
  isPassword?: boolean;
  style?: StyleProp<ViewStyle>;
  maxLength?: number;
  autoFocus?: boolean;
  testID?: string;
}

export const InputField: FunctionComponent<InputFieldProps> = ({
  label,
  value = '',
  onChangeText,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmitEditing = () => ({}),
  keyboardType = 'default',
  error = '',
  icon,
  isPassword = false,
  style,
  maxLength = 30,
  autoFocus = false,
  testID,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(isPassword);
  // Update the document title using the browser API
  // inputType === 'password' && setIsPasswordVisible(false)
  const handleFocus = () => {
    if (!isFocused) {
      setIsFocused(true);
    }
  };
  const handleBlur = () => {
    if ((isFocused && value === '') || !value) {
      setIsFocused(false);
    }
  };

  return (
    <View style={[container, style]}>
      <Label style={isFocused ? activeLabelStyle : labelStyle}>{label}</Label>
      <View style={inputContainer}>
        <TextInput
          testID={testID}
          autoFocus={autoFocus}
          value={value.toString()}
          style={textInputStyle}
          underlineColorAndroid="transparent"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSubmitEditing(value.toString())}
          keyboardType={keyboardType}
          secureTextEntry={!!isPasswordVisible}
          maxLength={maxLength}
          {...props}
        />

        {isPassword ? (
          <TouchableOpacity
            testID={`${testID}_passwordVisibilityID`}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Image
              style={!isPasswordVisible ? iconStyle : iconGreyStyle}
              name={icon}
              size={normalize(24)}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          error !== '' && (
            <Image
              name={icon}
              size={normalize(24)}
              resizeMode="contain"
              style={iconStyle}
            />
          )
        )}
      </View>
      <View style={lineStyle} />
      <Label style={errorTextStyle}>{error}</Label>
    </View>
  );
};

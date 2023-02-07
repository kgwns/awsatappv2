import React, {FunctionComponent, useState} from 'react';
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {Label} from 'src/components/atoms/label/Label';
import {inputTextAreaStyle} from 'src/components/atoms/input-text-area/InputTextArea.style';

const {
  container,
  activeLabelStyle,
  textInputStyle,
  inputContainer,
  errorTextStyle,
  textInputHeader,
  textCountContainer,
} = inputTextAreaStyle;

interface InputTextAreaProps {
  label: string;
  value?: string;
  testID?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  style?: StyleProp<ViewStyle>;
  maxLength?: number;
}

export const InputTextArea: FunctionComponent<InputTextAreaProps> = ({
  label,
  value = '',
  onChangeText,
  testID,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmitEditing = () => ({}),
  keyboardType = 'default',
  error = '',
  style,
  maxLength = 150,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
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
      <View style={textInputHeader}>
        <Label style={activeLabelStyle}>{label}</Label>

        <View style={textCountContainer}>
          <Label style={activeLabelStyle}>
            {value.length}
            {'/'}
          </Label>
          <Label style={activeLabelStyle}>{maxLength}</Label>
        </View>
      </View>
      <View style={inputContainer}>
        <TextInput
          testID={testID}
          value={value.toString()}
          style={textInputStyle}
          underlineColorAndroid="transparent"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSubmitEditing(value.toString())}
          keyboardType={keyboardType}
          maxLength={maxLength}
          {...props}
        />
      </View>
      <Label style={errorTextStyle}>{error}</Label>
    </View>
  );
};

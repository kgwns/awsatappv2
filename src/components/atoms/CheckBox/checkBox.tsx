import React, {useState, FunctionComponent} from 'react';
import {StyleProp, View, ViewStyle, TouchableWithoutFeedback} from 'react-native';
import {Image, ImageName} from 'src/components/atoms/image/Image';
import {Label} from 'src/components/atoms/label/Label'
import {checkBoxStyle} from './CheckBox.style';

interface CheckBoxProps {
  icon?: ImageName;
  selectedIcon?: ImageName;
  selected?: boolean;
  onChange: (isSelected: boolean) => void;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CheckBox: FunctionComponent<CheckBoxProps> = ({
  selected = false,
  icon = 'homeIcon',
  selectedIcon = 'close',
  onChange,
  label,
  containerStyle,
}) => {
  const [isSelected, setIsSelected] = useState(selected);
  return (
    <TouchableWithoutFeedback
    testID="checkBoxBtn"
      style={containerStyle}
      onPress={() => {
        setIsSelected(!isSelected);
        onChange(isSelected);
      }}
    >
      <View style={checkBoxStyle.container}>
        <Image
          size={25}
          name={isSelected ? selectedIcon : icon}
          style={checkBoxStyle.iconStyle}
        />
        <Label labelType="caption6" style={checkBoxStyle.lableStyle}>
          {label}
        </Label>
      </View>
    </TouchableWithoutFeedback>
  );
};

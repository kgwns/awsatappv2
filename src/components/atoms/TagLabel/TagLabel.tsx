import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Label, Image} from 'src/components/atoms';
import {tagLableStyle} from 'src/components/atoms/TagLabel/TagLabel.style';

const {container, labelStyle, iconStyle} = tagLableStyle;

interface TagLabelProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
}
export const TagLabel: FunctionComponent<TagLabelProps> = ({
  label,
  onPress = () => {
    console.log('fired');
  },
  disabled = true,
  isSelected = false,
}) => (
  <View style={container}>
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Label style={labelStyle}>{label}</Label>
    </TouchableOpacity>
    {isSelected && (
      <View style={iconStyle}>
        <Image name={'tick'} size={24} />
      </View>
    )}
  </View>
);

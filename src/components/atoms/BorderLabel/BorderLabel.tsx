import React, { FunctionComponent, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Styles } from 'src/shared/styles';
import { BorderLabelStyle } from './BorderLabel.style';

const { labelStyle, tagContainer } = BorderLabelStyle;
interface BorderLabelProps {
  testID?: string;
  label: string;
  isSelected?: boolean;
  onPress: (isSelected: boolean) => void;
}
export const BorderLabel: FunctionComponent<BorderLabelProps> = ({
  testID, label, onPress, isSelected }
) => {
  const [isSelectedState, setIsSelectedState] = useState(isSelected);
  return (
    <TouchableOpacity style={[tagContainer, { backgroundColor: isSelectedState ? Styles.color.greenishBlue : Styles.color.aquaHaze }]} testID={testID} onPress={() => {

      onPress(!isSelectedState)
      setIsSelectedState(!isSelectedState)
    }}>
      <Text style={[labelStyle, { color: isSelectedState ? Styles.color.white : Styles.color.black }]}>{label}</Text>
    </TouchableOpacity>
  )
};
import React, { FunctionComponent, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Styles } from 'src/shared/styles';
import { customBorderLabelStyles } from './BorderLabel.style';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

interface BorderLabelProps {
  testID?: string;
  label: string;
  isSelected?: boolean;
  onPress: (isSelected: boolean) => void;
}
export const BorderLabel: FunctionComponent<BorderLabelProps> = ({
  testID, label, onPress, isSelected }
) => {
  const style = useThemeAwareObject(customBorderLabelStyles)
  const [isSelectedState, setIsSelectedState] = useState(isSelected);
  return (
    <TouchableOpacity style={isSelectedState ? style.selectedTagContainer : style.tagContainer} testID={testID} onPress={() => {

      onPress(!isSelectedState)
      setIsSelectedState(!isSelectedState)
    }}>
      <Text style={isSelectedState ? style.selectedLabelStyle : style.labelStyle}>{label}</Text>
    </TouchableOpacity>
  )
};
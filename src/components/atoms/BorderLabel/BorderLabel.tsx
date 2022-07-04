import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import { customBorderLabelStyles } from './BorderLabel.style';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface BorderLabelProps {
  testID?: string;
  label: string;
  isSelected?: boolean;
  onPress: (isSelected: boolean) => void;
  clickable? : boolean;
}
export const BorderLabel: FunctionComponent<BorderLabelProps> = ({
  testID, label, onPress, isSelected,clickable=true }
) => {
  const style = useThemeAwareObject(customBorderLabelStyles)
  return (
    <TouchableWithoutFeedback style={isSelected ? style.selectedTagContainer : style.tagContainer} testID={testID} 
      onPress={() => {
        if (clickable) {
          onPress((isSelected === false || isSelected === true)  ? !isSelected : true)
        }
      }}>
      <Text style={isSelected ? style.selectedLabelStyle : style.labelStyle}>{label}</Text>
    </TouchableWithoutFeedback>
  )
};
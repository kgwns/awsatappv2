import React, { FunctionComponent } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { customBorderLabelStyles } from './BorderLabel.style';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

interface BorderLabelProps {
  testID?: string;
  label: string;
  isSelected?: boolean;
  onPress: (isSelected: boolean) => void;
  clickable?: boolean;
}
export const BorderLabel: FunctionComponent<BorderLabelProps> = ({
  testID, label, onPress, isSelected, clickable = true }
) => {
  const style = useThemeAwareObject(customBorderLabelStyles)
  return (
    <TouchableWithoutFeedback testID={testID}
      onPress={() => {
        if (clickable) {
          onPress((isSelected === false || isSelected === true) ? !isSelected : true)
        }
      }}>
      <View style={isSelected ? style.selectedTagContainer : style.tagContainer}>
        <Text style={isSelected ? style.selectedLabelStyle : style.labelStyle}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
};
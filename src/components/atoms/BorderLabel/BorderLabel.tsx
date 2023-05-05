import React, { FunctionComponent } from 'react';
import { StyleProp, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { customBorderLabelStyles } from './BorderLabel.style';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

interface BorderLabelProps {
  testID?: string;
  label: string;
  isSelected?: boolean;
  onPress: (isSelected: boolean) => void;
  clickable?: boolean;
  tabEnable?: boolean;
  unSelectedContainerStyle?: StyleProp<ViewStyle>;
  selectedTopicContainerStyle?: StyleProp<ViewStyle>;
  selectedTopicLabelStyle?: StyleProp<TextStyle>;
}
export const BorderLabel: FunctionComponent<BorderLabelProps> = ({
  testID, label, onPress, isSelected, clickable = true, unSelectedContainerStyle, tabEnable = false, selectedTopicContainerStyle,selectedTopicLabelStyle }
) => {
  const style = useThemeAwareObject(customBorderLabelStyles)
  const tagSTyle = tabEnable ? (isSelected ? style.selectedTabTagContainer : style.tagTabContainer) : (isSelected ? style.selectedTagContainer : style.tagContainer);
  const labelSTyle = tabEnable ? (isSelected ? style.selectedTabLabelStyle : style.labelTabStyle) : (isSelected ? style.selectedLabelStyle : style.labelStyle);
  return (
    <TouchableWithoutFeedback testID={testID}
      onPress={() => {
        if (clickable) {
          onPress((isSelected === false || isSelected === true) ? !isSelected : true)
        }
      }}>
      <View style={[tagSTyle, !isSelected && unSelectedContainerStyle,selectedTopicContainerStyle]}>
        <Text style={[labelSTyle,selectedTopicLabelStyle]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
};

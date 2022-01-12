import React, {FunctionComponent} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Label} from 'src/components/atoms/label/Label';
import {buttonTabStyle} from 'src/components/atoms/button-tab/ButtonTab.style';

const {labelActiveStyle, labelStyle, tabActiveStyle, tabStyle} = buttonTabStyle;

interface ButtonTabProps {
  tabActive: number;
  label: string;
  onPress: (index: number) => void;
  tabIndex: number;
}

export const ButtonTab: FunctionComponent<ButtonTabProps> = ({
  tabActive,
  label,
  tabIndex,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress(tabIndex);
      }}
    >
      <View style={[tabStyle, tabActive === tabIndex && tabActiveStyle]}>
        <Label style={[labelStyle, tabActive === tabIndex && labelActiveStyle]}>
          {label}
        </Label>
      </View>
    </TouchableWithoutFeedback>
  );
};

import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {numberTabStyle} from 'src/components/atoms/number-tab/NumberTab.style';
import {Styles} from 'src/shared/styles';

const {container, itemContainer, numberLabel, textLabel} = numberTabStyle;

export interface NumberTabProps {
  numberBgColor?: string;
  labelBgColor?: string;
  numberValue: number;
  labelValue: string;
}

export interface NumberTabDataProps {
  number: number;
  label: string;
}

export const NumberTab: FunctionComponent<NumberTabProps> = ({
  numberBgColor = Styles.color.mysticGray,
  labelBgColor = Styles.color.greyLight,
  numberValue,
  labelValue,
}) => {
  return (
    <View style={container}>
      <View style={[itemContainer, {backgroundColor: numberBgColor}]}>
        <Text style={numberLabel}>{numberValue}</Text>
      </View>

      <Text style={[textLabel, {color: labelBgColor}]}>{labelValue}</Text>
    </View>
  );
};

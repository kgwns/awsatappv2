import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {Label} from 'src/components/atoms/label/Label';

import {tagElementStyle} from './TagElement.style';

const {container, labelStyle, tagContainer} = tagElementStyle;

interface TagElementProps {
  label: string;
  icon: string;
}
export const TagElement: FunctionComponent<TagElementProps> = ({label}) => (
  <View style={container}>
    <View style={tagContainer} />
    <Label style={labelStyle}>{label}</Label>
  </View>
);

import React, {FunctionComponent} from 'react';
import {View, ViewStyle, StyleProp} from 'react-native';

import {dividerStyle} from 'src/components/atoms/divider/Divider.style';

const {container} = dividerStyle;

interface DividerProps {
  style?: StyleProp<ViewStyle>;
  mode?: string;
}

export const Divider: FunctionComponent<DividerProps> = ({style}) => {
  return <View style={[container, style]} testID={'dividerLineId'} />;
};

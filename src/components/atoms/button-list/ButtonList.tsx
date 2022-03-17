import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, StyleProp, TextStyle, ViewStyle} from 'react-native';
import LeftArrow from 'src/assets/images/icons/left_arrow.svg';
import { ImagesName } from '/shared/styles';
import {Label} from '../';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { normalize } from 'src/shared/utils';

interface ButtonListProps {
  title: string;
  onPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  showIcon?: boolean,
  iconName?: ImagesName,
  iconSize?: number,
  onPressIcon?: () => void,
  iconStyle?: StyleProp<ViewStyle>
}

export const ButtonList = (props: ButtonListProps) => {
  const renderIcon = () => {
    return <TouchableOpacity onPress={props.onPressIcon ? props.onPressIcon : props.onPress} style={props.iconStyle}>
      {props.iconName ? getSvgImages({
        name: props.iconName,
        size: normalize(props.iconSize || 12)
      }) : <LeftArrow />}
    </TouchableOpacity>
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={styles.container}>
        <Label labelType="h3" style={props.titleStyle}>
          {props.title}
        </Label>
        {props.showIcon ? renderIcon() : null
      }
      </View>
    </TouchableOpacity>
  );
};

ButtonList.defaultProps = {
  showIcon: true
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

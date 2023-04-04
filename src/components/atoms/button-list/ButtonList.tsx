import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, StyleProp, TextStyle, ViewStyle, Insets} from 'react-native';
import { ImagesName } from 'src/shared/styles';
import {Label} from 'src/components/atoms/label/Label';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { isTab, normalize } from 'src/shared/utils';

interface ButtonListProps {
  title: string;
  onPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  showIcon?: boolean,
  iconName?: ImagesName,
  iconSize?: number,
  onPressIcon?: () => void,
  iconStyle?: any,
  hitSlop?: Insets,
  containerStyle?: StyleProp<ViewStyle>;
}

export const ButtonList = (props: ButtonListProps) => {
  const buttonIconName = props.iconName ? props.iconName : isTab ? null : ImagesName.leftArrowIcon;
  const buttonIconStyle = props.iconStyle ? props.iconStyle : { size: normalize(12) }
  const renderIcon = () => {
    return <TouchableOpacity hitSlop={props.hitSlop} onPress={props.onPressIcon ? props.onPressIcon : props.onPress} style={props.iconStyle}>
      {getSvgImages({ name: buttonIconName, ...buttonIconStyle })}
    </TouchableOpacity>
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[styles.container, props.containerStyle]}>
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
  showIcon: true,
  hitSlop: {}
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

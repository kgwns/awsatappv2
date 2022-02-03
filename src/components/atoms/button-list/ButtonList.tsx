import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, StyleProp, TextStyle} from 'react-native';
import LeftArrow from 'src/assets/images/icons/left_arrow.svg';
import {Label} from '../';

interface ButtonListProps {
  title: string;
  onPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
}

export const ButtonList = (props: ButtonListProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={styles.container}>
        <Label labelType="h3" style={props.titleStyle}>
          {props.title}
        </Label>
        <LeftArrow />
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

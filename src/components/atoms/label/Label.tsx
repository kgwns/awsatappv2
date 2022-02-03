import React, {FunctionComponent} from 'react';
import {StyleProp, Text, TextStyle, TextProps} from 'react-native';
import {Styles} from 'src/shared/styles'

export enum LabelTypeProp {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  p3 = 'p3',
  p4 = 'p4',
  p5 = 'p5',
  caption3 = 'caption3'
}

export type LabelType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h8'
  | 'p3'
  | 'caption7'
  | 'caption6'
  | 'caption5'
  | 'caption4'
  | 'caption2'
  | 'caption8'
  | 'caption9'
  | 'p4'
  | 'p5'
  | 'p6'
  | 'title'
  | 'caption3'
  | 'label10'
  | 'underlinedTitle'
  | 'content'
  | undefined;
export interface LabelProps extends TextProps {
  labelType?: LabelType;
  style?: StyleProp<TextStyle>;
  color?: string;
}
export const Label: FunctionComponent<LabelProps> = ({
  labelType,
  children,
  style,
  color,
  ...props
}) => {
  let textStyle: StyleProp<TextStyle> = {};
  switch (labelType) {
    case 'h2':
      textStyle = Styles.text.h2;
      break;
    case 'h3':
      textStyle = Styles.text.h3;
      break;
    case 'h4':
      textStyle = Styles.text.h4;
      break;
    case 'h5':
      textStyle = Styles.text.h5;
      break;
    case 'h6':
      textStyle = Styles.text.h6;
      break;
    case 'h8':
      textStyle = Styles.text.h8;
      break;
    case 'caption2':
      textStyle = Styles.text.caption2;
      break;
    case 'caption4':
      textStyle = Styles.text.caption4;
      break;
    case 'caption5':
      textStyle = Styles.text.caption5;
      break;
    case 'caption6':
      textStyle = Styles.text.caption6;
      break;
    case 'caption7':
      textStyle = Styles.text.caption7;
      break;
    case 'caption8':
      textStyle = Styles.text.caption8;
      break;
    case 'caption9':
      textStyle = Styles.text.caption9;
      break;
    case 'p5':
      textStyle = Styles.text.p5;
      break;
    case 'p6':
      textStyle = Styles.text.p6;
      break;
    case 'p3':
      textStyle = Styles.text.p3;
      break;
    case 'p4':
      textStyle = Styles.text.p4;
      break;
    case 'h1':
      textStyle = Styles.text.h1;
      break;
    case 'caption3':
      textStyle = Styles.text.caption3;
      break;
    case 'label10':
      textStyle = Styles.text.label10;
      break;
    case 'content':
      textStyle = Styles.text.content;
      break;
    case 'underlinedTitle':
      textStyle = Styles.text.underlinedTitle;
      break;
    default:
      textStyle = Styles.text.default;
  }
  if (color) {
    textStyle = {...textStyle, color};
  }
  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};

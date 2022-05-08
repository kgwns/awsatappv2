import React, {FunctionComponent} from 'react';
import {StyleProp, Text, TextStyle, TextProps} from 'react-native';
import {Styles} from 'src/shared/styles'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

export enum LabelTypeProp {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  p2 = 'p2',
  p3 = 'p3',
  p4 = 'p4',
  p5 = 'p5',
  caption3 = 'caption3',
  caption2 = 'caption2',
  title1 = 'title1',
  title3 = 'title3',
  title4 = 'title4',
}

export type LabelType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h8'
  | 'p2'
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
  | 'title1'
  | 'title3'
  | 'title4'
  | undefined;
export interface LabelProps extends TextProps {
  labelType?: LabelType | LabelTypeProp;
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
  const labelStyle = useThemeAwareObject(Styles.text)
  let textStyle: StyleProp<TextStyle> = {};
  switch (labelType) {
    case 'h2':
      textStyle = labelStyle.h2;
      break;
    case 'h3':
      textStyle = labelStyle.h3;
      break;
    case 'h4':
      textStyle = labelStyle.h4;
      break;
    case 'h5':
      textStyle = labelStyle.h5;
      break;
    case 'h6':
      textStyle = labelStyle.h6;
      break;
    case 'h8':
      textStyle = labelStyle.h8;
      break;
    case 'caption2':
      textStyle = labelStyle.caption2;
      break;
    case 'caption4':
      textStyle = labelStyle.caption4;
      break;
    case 'caption5':
      textStyle = labelStyle.caption5;
      break;
    case 'caption6':
      textStyle = labelStyle.caption6;
      break;
    case 'caption7':
      textStyle = labelStyle.caption7;
      break;
    case 'caption8':
      textStyle = labelStyle.caption8;
      break;
    case 'caption9':
      textStyle = labelStyle.caption9;
      break;
    case 'p5':
      textStyle = labelStyle.p5;
      break;
    case 'p6':
      textStyle = labelStyle.p6;
      break;
    case 'p3':
      textStyle = labelStyle.p3;
      break;
    case 'p4':
      textStyle = labelStyle.p4;
      break;
    case 'p2':
      textStyle = labelStyle.p2;
      break;
    case 'h1':
      textStyle = labelStyle.h1;
      break;
    case 'caption3':
      textStyle = labelStyle.caption3;
      break;
    case 'label10':
      textStyle = labelStyle.label10;
      break;
    case 'content':
      textStyle = labelStyle.content;
      break;
    case 'underlinedTitle':
      textStyle = labelStyle.underlinedTitle;
      break;
    case 'title1':
      textStyle = labelStyle.title1;
      break;
    case 'title3':
      textStyle = labelStyle.title3;
      break;
    case 'title4':
      textStyle = labelStyle.title4;
      break;
    default:
      textStyle = labelStyle.default;
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

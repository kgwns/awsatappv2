import React, {FunctionComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ImagesName} from 'src/shared/styles/images';
import {Label} from 'src/components/atoms/label/Label';
import {getSvgImages} from '../../../shared/styles/svgImages';
import {normalize} from 'src/shared/utils';

interface NextButtonProps {
  title: string;
  onPress: () => void;
  style: {
    nextButtonContainer: {};
    nextButtonIconContainer?: {};
    nextButtonText: {};
  };
  icon?:boolean
  testID?: string;
  disabled?: boolean
}

export const NextButton: FunctionComponent<NextButtonProps> = ({
  title,
  onPress,
  style,
  icon=true,
  testID,
  disabled=false
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={[style.nextButtonContainer, disabled && {opacity: 0.6}]}>
    {  icon && <View style={style.nextButtonIconContainer}>
        {getSvgImages({
          name: ImagesName.arrowNext,
          size: normalize(20),
        })}
      </View>}
      <Label style={style.nextButtonText}>{title}</Label>
    </TouchableOpacity>
  );
};

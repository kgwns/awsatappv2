import React, {FunctionComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ImagesName} from '../../../shared/styles';
import {Label} from '../../atoms';
import {getSvgImages} from '../../../shared/styles/svgImages';
import {normalize} from 'src/shared/utils';

interface NextButtonProps {
  title: string;
  onPress: () => void;
  style: {
    nextButtonContainer: {};
    nextButtonIconContainer: {};
    nextButtonText: {};
  };
  testID?: string;
}

export const NextButton: FunctionComponent<NextButtonProps> = ({
  title,
  onPress,
  style,
  testID,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={testID}
      style={style.nextButtonContainer}>
      <View style={style.nextButtonIconContainer}>
        {getSvgImages({
          name: ImagesName.arrowNext,
          size: normalize(20),
        })}
      </View>
      <Label style={style.nextButtonText}>{title}</Label>
    </TouchableOpacity>
  );
};

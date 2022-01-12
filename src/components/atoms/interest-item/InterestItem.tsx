import React, {FunctionComponent, useState} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Image, Label} from 'src/components/atoms';
import {normalize} from 'src/shared/utils';
import {interestItemStyle} from 'src/components/atoms/interest-item/InterestItem.style';

const {container, titleStyle, iconContainer, selectedIconContainer} =
  interestItemStyle;

interface InterestItemProps {
  title: string;
  imageUrl: string;
  onPress: (isSelected: boolean) => void;
}

export const InterestItem: FunctionComponent<InterestItemProps> = ({
  title,
  imageUrl,
  onPress,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableWithoutFeedback
      testID="interestItemBtn"
      onPress={() => {
        onPress(!isSelected);
        setIsSelected(!isSelected);
      }}
    >
      <View style={container}>
        <View style={[iconContainer, isSelected && selectedIconContainer]}>
          <Image
            size={normalize(60)}
            resizeMode={'contain'}
            url={imageUrl}
            type={'round'}
            backgroundColor={'white'}
          />
        </View>
        <Label labelType={'caption7'} style={titleStyle}>
          {title}
        </Label>
      </View>
    </TouchableWithoutFeedback>
  );
};

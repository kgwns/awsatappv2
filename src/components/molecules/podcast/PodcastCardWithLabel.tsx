import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Label, Image} from 'src/components/atoms';
import {CustomThemeType, colors} from 'src/shared/styles/colors';

export interface PodcastCardWithLabelProps {
  imageUrl?: string;
  testID?: string;
  title?: string;
  description?: string;
  itemOnPress?: ()=> void;
}

export const PodcastCardWithLabel = ({
  imageUrl,
  title,
  description,
  itemOnPress,
  testID,
}: PodcastCardWithLabelProps) => {
  const style = useThemeAwareObject(customStyle);
  return (
    <TouchableWithoutFeedback testID={testID} accessibilityLabel={testID} onPress={itemOnPress} >
      <View style={style.cardContainer}>
        <Image fallback url={imageUrl} style={style.imageStyle} />
        <Label style={style.title} numberOfLines={1}>
          {title}
        </Label>
        <Label style={style.description} numberOfLines={1}>
          {description}
        </Label>
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    cardContainer: {
      width: normalize(257),
      height: normalize(233),
      alignItems: 'flex-start',
      margin: normalize(10),
      backgroundColor: theme.secondaryWhite,
    },
    imageStyle: {width: normalize(257), height: normalize(174)},
    title: {
      fontSize: normalize(15),
      lineHeight: normalize(16),
      fontWeight: 'bold',
      color: theme.primaryBlack,
      marginTop: normalize(12),
    },
    description: {
      fontSize: normalize(12),
      lineHeight: normalize(14),
      color: colors.spanishGray,
      marginTop: normalize(8),
    },
  });
};

export default PodcastCardWithLabel;

import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Label, Image} from 'src/components/atoms';
import {CustomThemeType, colors} from 'src/shared/styles/colors';

export interface PodcastVerticalListProps {
  imageUrl?: string;
  testID?: string;
  title?: string;
  description?: string;
  footerLeft?: string;
  footerRight?: string;
  itemOnPress?: ()=> void;
}

export const PodcastVerticalList = ({
  imageUrl,
  title,
  description,
  itemOnPress,
  testID,
  footerLeft,
  footerRight,
}: PodcastVerticalListProps) => {
  const style = useThemeAwareObject(customStyle);
  return (
    <TouchableWithoutFeedback testID={testID} accessibilityLabel={testID} onPress={itemOnPress} >
      <View style={style.cardContainer}>
        <View style={style.headerStyle}>
          <Image url={imageUrl} style={style.imageStyle} />
        </View>
        
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
  const PodcastCardStyle = StyleSheet.create({
    cardContainer: {
      flex:1,
      backgroundColor: theme.secondaryWhite,
    },
    headerStyle: {
      flexDirection: 'row',
    },
    imageStyle: {width: normalize(50), height: normalize(50)},
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
  return PodcastCardStyle;
};

export default PodcastVerticalList;

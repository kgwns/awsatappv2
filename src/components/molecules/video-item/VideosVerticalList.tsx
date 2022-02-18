import React, {useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Label, Image} from 'src/components/atoms';
import {CustomThemeType, colors} from 'src/shared/styles/colors';
import {useTheme} from 'src/shared/styles/ThemeProvider';

export interface VideosVerticalListProps {
  imageUrl?: string;
  testID?: string;
  title?: string;
  time?: string;
  itemOnPress?: ()=> void;
}

export const VideosVerticalList = ({
  imageUrl,
  title,
  itemOnPress,
  testID,
  time,
}: VideosVerticalListProps) => {
  const style = useThemeAwareObject(customStyle);
  const [isSaved, setIsSaved] = useState(false);
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback testID={testID} accessibilityLabel={testID} onPress={itemOnPress} >
      <View style={style.cardContainer}>
        <View style={style.headerStyle}>
          <View style={style.imageContainer}>
            <Image url={imageUrl} style={style.imageStyle} />
            <Label style={style.timeStyle} numberOfLines={1}>
              {time}
            </Label>
          </View>
          <View style={style.titleContainer}>
            <Label style={style.title} numberOfLines={3}>
              {title}
            </Label>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const PodcastCardStyle = StyleSheet.create({
    cardContainer: {
      flex:1,
      backgroundColor: theme.backgroundColor,
      paddingVertical: normalize(15),
    },
    headerStyle: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    imageContainer: {
      width: normalize(100),
      height: normalize(70),
    },
    imageStyle: {
      width: normalize(100),
      height: normalize(70),
      resizeMode: 'cover'
    },
    titleContainer: {
      flex:1,
      justifyContent: 'center',
    },
    title: {
      fontSize: normalize(14),
      lineHeight: normalize(22),
      fontWeight: '400',
      color: theme.primaryBlack,
      marginLeft: normalize(10),
      textAlign: 'left',
    },
    timeStyle: {
      right: 0,
      bottom: 0,
      position: 'absolute',
      backgroundColor: colors.greyDark,
      paddingHorizontal: normalize(5),
      paddingVertical: normalize(3),
      marginVertical: 3,
      fontSize: normalize(10),
      color: colors.white,
    },
  });
  return PodcastCardStyle;
};

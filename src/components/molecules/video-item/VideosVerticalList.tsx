import React, { useCallback, useState } from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {isTab, normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Label, Image} from 'src/components/atoms';
import {CustomThemeType, colors} from 'src/shared/styles/colors';
import { decode } from 'html-entities';
import { fonts } from 'src/shared/styles/fonts';

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
  const [isTitleLineCount, setIsTitleLineCount] = useState(1)

  const onTextLayout = useCallback((e) => {
    setIsTitleLineCount(e.nativeEvent.lines ? e.nativeEvent.lines.length : 1)
  }, []);

  return (
    <TouchableWithoutFeedback testID={testID} accessibilityLabel={testID} onPress={itemOnPress} >
      <View style={style.cardContainer}>
        <View style={[style.headerStyle, isTitleLineCount > 2 && style.headerTitleStyle]}>
          <View style={style.imageContainer}>
            <Image fallback url={imageUrl} style={style.imageStyle} resizeMode={'cover'} />
            {time && <Label style={style.timeStyle} >
              {time}
            </Label>}
          </View>
          <View style={style.titleContainer}>
            <Label testID='onTextLayout' style={style.title} onTextLayout={onTextLayout}>
              {decode(title)}
            </Label>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
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
    },
    titleContainer: {
      flex:1,
      justifyContent: 'center',
    },
    title: {
      fontSize: isTab ? 20 : 14,
      lineHeight: isTab ? 32 : 24,
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.primaryBlack,
      marginLeft: normalize(10),
      textAlign: 'left',
    },
    timeStyle: {
      right: 0,
      bottom: 3,
      position: 'absolute',
      opacity: 0.9,
      backgroundColor: colors.darkGreenishBlue,
      paddingHorizontal: normalize(5),
      fontSize: normalize(10),
      color: colors.white,
      fontFamily: fonts.AwsatDigital_Bold,
      lineHeight: 20
    },
    headerTitleStyle: {
      alignItems: 'flex-start'
    }
  });
};

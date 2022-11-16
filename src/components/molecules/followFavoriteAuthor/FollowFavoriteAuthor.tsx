import React, {useEffect, useState} from 'react';
import {Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Image, Label} from 'src/components/atoms';
import {isIOS, isTab, normalize, screenHeight, screenWidth} from 'src/shared/utils';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import { ImagesName } from 'src/shared/styles';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { fonts } from 'src/shared/styles/fonts';

export interface FollowFavoriteAuthorProps {
  authorName: string;
  authorDescription?: string;
  authorImage: string;
  isSelected?: boolean;
  testId?: string;
  onPress: (isSelected: boolean) => void;
  clickable?: boolean;
  imageSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const FollowFavoriteAuthor = ({
  authorName,
  authorImage,
  authorDescription,
  isSelected,
  onPress,
  testId,
  clickable = true,
  imageSize = 0.099 * screenHeight,
  containerStyle,
}: FollowFavoriteAuthorProps) => {
  const [fallback, setFallBack] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFallBack(true)
    },2000)
  }, [])


  const changeStatus = () => {
    if(clickable) {
      onPress((isSelected === false || isSelected === true)  ? !isSelected : true)
    }
  };
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const size = imageSize;
  const tabSize = 0.11 * screenHeight;
  return (
    <TouchableWithoutFeedback
      onPress={changeStatus}
      testID={testId}
      style={[style.container,containerStyle]}>
      <View
        style={{
          alignItems: 'center',
        }}>
        {!isSelected ? (
          <Grayscale>
            <Image
              url={authorImage}
              type="round"
              size={isTab ? normalize(tabSize) : normalize(size)}
              resizeMode="cover"
              fallback={fallback}
              fallbackName={ImagesName.authorDefault}
            />
          </Grayscale>
        ) : (
          <Image
            url={authorImage}
            type="round"
            size={isTab ? normalize(tabSize) : normalize(size)}
            resizeMode="cover"
              fallback={fallback}
              fallbackName={ImagesName.authorDefault}
            />
        )}
        <View style={style.tickIconContainer}>
          {clickable &&
            getSvgImages({
              name: isSelected
                ? ImagesName.authorItemActive
                : ImagesName.authorItem,
              size: normalize(22),
            })}
        </View>
        {authorName && (
          <Label
            color={
              isSelected
                ? theme.themeData.primaryBlack
                : colors.spanishGray
            }
            style={[
              style.titleStyle,
              {
                width: isTab ? normalize(tabSize) : normalize(size),
                marginTop: clickable ? 0 : (0.02 * screenWidth),
              },
            ]}
            numberOfLines={2}>
            {authorName}
          </Label>
        )}
        {authorDescription && (
          <Label
            color={
              isSelected
                ? theme.themeData.secondaryDavyGrey
                : colors.spanishGray
            }
            style={[
              style.descStyle,
              {
                width: isTab ? normalize(tabSize) : normalize(size),
              },
            ]}
            numberOfLines={1}>
            {authorDescription}
          </Label>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const FollowFavoriteAuthorStyle = StyleSheet.create({
    container: {
      marginVertical: isIOS ? normalize(0.015 * screenWidth) : normalize(0.030 * screenWidth),
      marginEnd: (Platform.OS==='ios')
      ?normalize(0.020 * screenHeight)
      :normalize(0.026 * screenHeight),
      justifyContent: 'center',
      backgroundColor: theme.onBoardBackground,
    },
    titleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
      fontSize: normalize(14),
      lineHeight: normalize(22),
    },
    descStyle: {
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      textAlign: 'center',
      fontSize: normalize(10),
      lineHeight: normalize(17),
    },
    tickIconContainer: {
      bottom: isTab ? normalize(5) : normalize(6)
    }
  });
  return FollowFavoriteAuthorStyle;
};

export default FollowFavoriteAuthor;

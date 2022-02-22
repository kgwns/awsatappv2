import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'src/components/atoms';
import { Label } from 'src/components/atoms';
import { normalize, screenWidth } from 'src/shared/utils';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { ImagesName } from 'src/shared/styles';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import { getSvgImages } from 'src/shared/styles/svgImages';

export interface FollowFavoriteAuthorProps {
  authorName: string;
  authorDescription?: string;
  authorImage: string;
  isSelected?: boolean;
  testId?: string;
  onPress: (isSelected: boolean) => void;
}

const FollowFavoriteAuthor = ({
  authorName,
  authorImage,
  authorDescription,
  isSelected,
  onPress,
  testId,
}: FollowFavoriteAuthorProps) => {
  const [isSelectedState, setIsSelectedState] = useState(isSelected);
  const changeStatus = () => {
    onPress(!isSelectedState);
    setIsSelectedState(!isSelectedState);
  };
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={changeStatus} testID={testId}>
        <View style={style.imageWrapper}>
          <View style={style.imageContainer}>
            <View style={style.innerCircle}>
              {!isSelectedState ?
                <Grayscale>
                  <Image backgroundColor={theme.themeData.secondaryDavyGrey} url={authorImage} resizeMode='cover' style={[style.bookImage]} />
                </Grayscale> :
                <Image backgroundColor={theme.themeData.secondaryDavyGrey} url={authorImage} resizeMode='cover' style={[style.bookImage]} />
              }
            </View>
            <View style={style.tickContainer}>
              {getSvgImages({
                name: isSelectedState ? ImagesName.authorItemActive : ImagesName.authorItem,
                width: style.tickImage.width,
                height: style.tickImage.height
              })}
            </View>
          </View>
        </View>
        <View style={style.titleContainer}>
          <Label
            style={[
              style.titleStyle,
              {
                color: isSelectedState
                  ? theme.themeData.primaryBlack
                  : colors.spanishGray,
              },
            ]}>
            {authorName}
          </Label>
          <Label
            style={[
              style.descriptionStyle,
              {
                color: isSelectedState
                  ? theme.themeData.secondaryDavyGrey
                  : colors.spanishGray,
              },
            ]}>
            {authorDescription}
          </Label>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const FollowFavoriteAuthorStyle = StyleSheet.create({
    bookImage: {
      height: '100%',
      width: '100%',
    },
    container: {
      width: 0.29 * screenWidth,
      height: normalize(170),
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: normalize(10),
    },
    imageWrapper: {
      width: '100%',
      height: '65%',
    },
    imageContainer: {
      width: normalize(99),
      height: normalize(99),
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerCircle: {
      height: normalize(99),
      width: normalize(99),
      borderRadius: normalize(99 / 2),
      overflow: 'hidden',
    },
    tickContainer: {
      position: 'absolute',
      bottom: normalize(-15),
    },
    tickImage: {
      width: normalize(22),
      height: normalize(22),
    },
    titleContainer: {
      width: normalize(99),
      height: '35%',
      marginTop: normalize(5),
    },
    titleStyle: {
      fontSize: normalize(14),
      lineHeight: normalize(19),
      textAlign: 'center',
    },
    descriptionStyle: {
      fontSize: normalize(10),
      lineHeight: normalize(14),
      textAlign: 'center',
    },
  });
  return FollowFavoriteAuthorStyle;
};

export default FollowFavoriteAuthor;

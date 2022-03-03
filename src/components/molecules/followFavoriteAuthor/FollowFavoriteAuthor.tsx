import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Image} from 'src/components/atoms';
import {Label} from 'src/components/atoms';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {ImagesName} from 'src/shared/styles';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ScreenHeight} from 'react-native-elements/dist/helpers';

export interface FollowFavoriteAuthorProps {
  authorName: string;
  authorDescription?: string;
  authorImage: string;
  isSelected?: boolean;
  testId?: string;
  onPress: (isSelected: boolean) => void;
  clickable?: boolean;
}

const FollowFavoriteAuthor = ({
  authorName,
  authorImage,
  authorDescription,
  isSelected,
  onPress,
  testId,
  clickable = true,
}: FollowFavoriteAuthorProps) => {
  const [isSelectedState, setIsSelectedState] = useState(isSelected);
  const changeStatus = () => {
    if(clickable){
    onPress(!isSelectedState);
    setIsSelectedState(!isSelectedState);}
  };
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const size = 0.11 * ScreenHeight;
  const tabSize = 0.11 * ScreenHeight;
  return (
    <TouchableWithoutFeedback
      onPress={changeStatus}
      testID={testId}
      style={style.container}>
      <View
        style={{
          alignItems: 'center',
        }}>
        {!isSelectedState ? (
          <Grayscale>
            <Image
              url={authorImage}
              type="round"
              size={isTab ? normalize(tabSize) : normalize(size)}
              resizeMode="cover"
              backgroundColor={theme.themeData.secondaryDavyGrey}
            />
          </Grayscale>
        ) : (
          <Image
            url={authorImage}
            type="round"
            size={isTab ? normalize(tabSize) : normalize(size)}
            resizeMode="cover"
            backgroundColor={theme.themeData.secondaryDavyGrey}
          />
        )}
        <View style={style.tickIconContainer}>
          {clickable &&
            getSvgImages({
              name: isSelectedState
                ? ImagesName.authorItemActive
                : ImagesName.authorItem,
              size: normalize(22),
            })}
        </View>
        {authorName && (
          <Label
            color={
              isSelectedState
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
              isSelectedState
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
      marginVertical: normalize(0.025 * screenWidth),
      marginHorizontal: normalize(0.045 * screenWidth),
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor,
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: normalize(14),
      lineHeight: normalize(17),
      fontWeight: 'bold',
    },
    descStyle: {
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

import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleProp, StyleSheet, View, ViewStyle,TouchableWithoutFeedback, Dimensions} from 'react-native';
import {Image, Label} from 'src/components/atoms';
import {isIOS, isTab, normalize, screenHeight, screenWidth} from 'src/shared/utils';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import { ImagesName } from 'src/shared/styles';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { fonts } from 'src/shared/styles/fonts';
import { useOrientation } from 'src/hooks';

export interface FollowFavoriteAuthorProps {
  authorName: string;
  authorDescription?: string;
  authorImage: string;
  isSelected?: boolean;
  testId?: string;
  onPress: (isSelected: boolean) => void;
  imageSize?: number;
  numColumns?: number;
  containerStyle?: StyleProp<ViewStyle>;
  tabContainerStyle?: StyleProp<ViewStyle>;
  tabEnable?: boolean
}

const FollowFavoriteAuthor = ({
  authorName,
  authorImage,
  authorDescription,
  isSelected,
  onPress,
  testId,
  imageSize = 0.099 * screenHeight,
  containerStyle,
  tabContainerStyle,
  tabEnable = false,
  numColumns,
}: FollowFavoriteAuthorProps) => {
  const timerRef = useRef<any>(null);
  const [fallback, setFallBack] = useState(false)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setFallBack(true)
    },2000)
    return(() => {
      if(timerRef.current){
        clearTimeout(timerRef.current)
      }
    })
  }, [])


  const changeStatus = () => {
    onPress((isSelected === false || isSelected === true)  ? !isSelected : true)
  };
  const {isPortrait} = useOrientation();
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const size = imageSize;
  const getSize = () => {
    const { width } = Dimensions.get('window');
    const marginHorizontal = (0.04 * width) * 2;
    if (numColumns) {
      const columnSize = (width - (marginHorizontal + 120)) / (numColumns)
      return columnSize;
    } else {
      return isPortrait ? 0.1 * screenWidth : 0.09 * screenHeight;
    }
  }
  const tabSize = isTab ? getSize() : isPortrait ? 0.1 * screenWidth : 0.09 * screenHeight;
  if(isTab){
    return(
      <TouchableWithoutFeedback
      onPress={changeStatus}
      testID={testId}
     >
        <View style={[{width: getSize()},style.tabContainer]}>
        {!isSelected ? (
          <Grayscale>
            <Image
              url={authorImage}
              type="round"
              size={getSize()}
              resizeMode="cover"
              fallback={fallback}
              fallbackName={ImagesName.authorDefaultName}
            />
          </Grayscale>
        ) : (
          <Image
            url={authorImage}
            type="round"
            size={getSize()}
            resizeMode="cover"
              fallback={fallback}
              fallbackName={ImagesName.authorDefaultName}
            />
        )}
        <View style={style.tickIconContainer}>
          {getSvgImages({
              name: isSelected
                ? ImagesName.authorItemActive
                : isTab ? ImagesName.tabletAuthorItem : ImagesName.authorItem,
              size: normalize(22)
            })}
        </View>
        {authorName && (
          <Label
            color={
              isSelected
                ? theme.themeData.primaryBlack
                : colors.spanishGray
            }
            style={[style.tabletTitleStyle,
              {
                width: getSize(),
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
                width: getSize(),
              },
            ]}
            numberOfLines={1}>
            {authorDescription}
          </Label>
        )}
        </View>
      </TouchableWithoutFeedback>
    )
  }
  return (
    <TouchableWithoutFeedback
      onPress={changeStatus}
      testID={testId}
     >
      <View
        style={[style.container,containerStyle,tabContainerStyle]}>
        {!isSelected ? (
          <Grayscale>
            <Image
              url={authorImage}
              type="round"
              size={ tabEnable ? tabSize : isTab ? normalize(tabSize) : normalize(size)}
              resizeMode="cover"
              fallback={fallback}
              fallbackName={ImagesName.authorDefaultName}
            />
          </Grayscale>
        ) : (
          <Image
            url={authorImage}
            type="round"
            size={tabEnable ? tabSize : isTab ? normalize(tabSize) : normalize(size)}
            resizeMode="cover"
              fallback={fallback}
              fallbackName={ImagesName.authorDefaultName}
            />
        )}
        <View style={style.tickIconContainer}>
          {getSvgImages({
              name: isSelected
                ? ImagesName.authorItemActive
                : isTab ? ImagesName.tabletAuthorItem : ImagesName.authorItem,
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
              isTab ? style.tabletTitleStyle : style.titleStyle,
              {
                width: tabEnable ? tabSize : isTab ? normalize(tabSize) : normalize(size),
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
                width: tabEnable ? tabSize : isTab ? normalize(tabSize) : normalize(size),
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
  return StyleSheet.create({
    container: {
      marginVertical: isIOS ? normalize(0.015 * screenWidth) : normalize(0.030 * screenWidth),
      marginEnd: (Platform.OS==='ios')
      ?normalize(0.020 * screenHeight)
      :normalize(0.026 * screenHeight),
      alignItems: 'center',
      backgroundColor: colors.transparent, 
    },
    titleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
      fontSize: normalize(14),
      lineHeight: normalize(22),
    },
    tabletTitleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
      fontSize: normalize(15),
      lineHeight: normalize(24),
    },
    descStyle: {
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      textAlign: 'center',
      fontSize: normalize(10),
      lineHeight: normalize(17),
    },
    tickIconContainer: {
      bottom: isTab ? normalize(10) : normalize(6)
    },
    tabContainer: {
      backgroundColor: colors.transparent, 
      marginHorizontal: 10, 
      marginVertical: 10, 
      alignItems: 'center'
    },
  });
};

export default FollowFavoriteAuthor;

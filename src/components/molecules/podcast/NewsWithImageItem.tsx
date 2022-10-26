import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { isTab, normalize } from 'src/shared/utils';
import { Label, Image, LabelTypeProp } from 'src/components/atoms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { ImageResize } from 'src/shared/styles/text-styles';
import { fonts } from 'src/shared/styles/fonts';

export interface NewsWithImageItemProps {
  imageUrl?: string;
  highlightedTitle?: string;
  title?: string;
  description?: string;
  footerRightLabel?: string;
  footerRightHighlight?: boolean;
  footerLeftHighlight?: boolean;
  footerLeftLabel?: string;
  showHighlightTitle?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const NewsWithImageItem = ({
  imageUrl,
  highlightedTitle,
  title,
  description,
  footerRightLabel,
  footerRightHighlight = false,
  footerLeftHighlight = false,
  footerLeftLabel,
  showHighlightTitle = true,
  containerStyle
}: NewsWithImageItemProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  return (
    <View style={StyleSheet.flatten([style.container, containerStyle])}>
      {imageUrl &&
        <Image url={imageUrl} style={isTab ? style.tabImage : style.image}
          resizeMode={ImageResize.COVER} fallback
          defaultImageStyle={style.image}
        />
      }
      { showHighlightTitle && <Label style={style.highlightedTitle} children={highlightedTitle} labelType={LabelTypeProp.h5} />}
      {title &&
        <Label style={style.title}
          children={title}
        />
      }
      {description && (
        <Label children={description}
          style={style.description}
          numberOfLines={2}
          labelType={LabelTypeProp.h3}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: normalize(10),
        }}>
        {footerRightLabel && (
          <Label
            style={style.footerRightLabel}
            color={
              footerRightHighlight
                ? theme.themeData.primary
                : theme.themeData.secondaryDavyGrey
            }>
            {footerRightLabel}
          </Label>
        )}
        {footerLeftLabel && footerRightLabel && <Label children={'|'} />}
        {footerLeftLabel && (
          <Label
            style={style.footerLeftLabel}
            color={
              footerLeftHighlight
                ? theme.themeData.primary
                : theme.themeData.secondaryDavyGrey
            }>
            {footerLeftLabel}
          </Label>
        )}
      </View>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const NewsWithImageItemStyle = StyleSheet.create({
    container: {
      width: isTab ? normalize(262) : normalize(162),
      alignItems: 'flex-start',
      marginStart: normalize(15),
    },
    image: {
      width: normalize(162),
      height: 'auto',
      aspectRatio: 4/3,
    },
    tabImage: {
      width: normalize(262),
      height: 'auto',
      aspectRatio: 4/3,
    },
    highlightedTitle: {
      fontSize: 12,
      lineHeight: 18,
      marginTop: normalize(10),
      color: theme.primary,
      fontFamily: fonts.Effra_Arbc_Regular,
    },
    title: {
      fontSize: 14,
      lineHeight: 22,
      marginTop: normalize(8),
      color: theme.primaryBlack,
      textAlign: 'left',
      fontFamily: fonts.AwsatDigital_Bold,
    },
    description: {
      textAlign: 'left',
      fontSize: normalize(13),
      lineHeight: normalize(23),
      color: theme.secondaryDavyGrey,
      marginTop: normalize(5),
    },
    footerRightLabel: {
      marginEnd: normalize(5)
    },
    footerLeftLabel: {
      marginStart: normalize(5),
    },
  });
  return NewsWithImageItemStyle;
};

export default NewsWithImageItem;

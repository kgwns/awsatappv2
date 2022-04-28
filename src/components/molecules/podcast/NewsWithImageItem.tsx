import React from 'react';
import { StyleSheet, View } from 'react-native';
import { normalize } from 'src/shared/utils';
import { Label, Image, LabelTypeProp } from 'src/components/atoms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { ImageResize } from 'src/shared/styles/text-styles';

export interface NewsWithImageItemProps {
  imageUrl?: string;
  highlightedTitle?: string;
  title?: string;
  description?: string;
  footerRightLabel?: string;
  footerRightHighlight?: boolean;
  footerLeftHighlight?: boolean;
  footerLeftLabel?: string;
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
}: NewsWithImageItemProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  return (
    <View style={style.container}>
      {imageUrl && (
        <Image url={imageUrl} style={style.image} resizeMode={ImageResize.COVER} fallback/>
      )}
      {highlightedTitle && 
        <Label style={style.highlightedTitle} children={highlightedTitle} labelType={LabelTypeProp.h5}/>
      }
      {title &&
        <Label style={style.title}
          children={title}
          numberOfLines={2}
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
      width: normalize(162),
      alignItems: 'flex-start',
      backgroundColor: theme.backgroundColor,
      marginStart: normalize(15),
    },
    image: {
      width: normalize(162),
      height: normalize(114)
    },
    highlightedTitle: {
      fontSize: normalize(12),
      lineHeight: normalize(12),
      marginTop: normalize(6),
      color: theme.primary,
    },
    title: {
      fontSize: normalize(14),
      lineHeight: normalize(16),
      fontWeight: 'bold',
      marginTop: normalize(10),
      color: theme.primaryBlack,
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

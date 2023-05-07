import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils';
import { Label, Image, LabelTypeProp, RenderPhotoIcon } from 'src/components/atoms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { ImageResize } from 'src/shared/styles/text-styles';
import { fonts } from 'src/shared/styles/fonts';
import { ArticleLabel } from '../articleLabel/ArticleLabel';
import { Styles } from 'src/shared/styles';

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
  isAlbum: boolean;
  displayType?: string;
  tabImageStyle?: StyleProp<ViewStyle>;
  tabContainerStyle?: StyleProp<ViewStyle>;
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
  containerStyle,
  isAlbum,
  displayType,
  tabImageStyle,
  tabContainerStyle
}: NewsWithImageItemProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();

  const renderArticleLabel = () => (
    <View style={style.tagContainer}>
      <ArticleLabel displayType={displayType} />
    </View>
  );
  const getImageWidth = () => {
    if (isTab && tabImageStyle) {
      return tabImageStyle
    } else {
      return { width: ((isTab ? 0.5 : 0.92) * screenWidth - 15) }
    }
  }
  const getContainerWidth = () => {
    if (isTab && tabContainerStyle) {
      return tabContainerStyle
    } else {
      return { width: ((isTab ? 0.5 : 0.92) * screenWidth - 15) }
    }
  }

  return (
    <View style={StyleSheet.flatten([style.container, getContainerWidth(), containerStyle])}>
      {imageUrl &&
        <View style={[isTab ? style.tabImage : style.image,getImageWidth()]}>
          <Image url={imageUrl}
            resizeMode={ImageResize.COVER} fallback
            style={style.imageStyle}
          />
          {isAlbum && <RenderPhotoIcon />}
          {isNotEmpty(displayType) && renderArticleLabel()}
        </View>
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
        style={style.footerContainer}>
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
  return StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      marginStart: normalize(15),
    },
    image: {
      height: 'auto',
      aspectRatio: 4/3,
    },
    tabImage: {
      height: 'auto',
      aspectRatio: 4/3,
    },
    highlightedTitle: {
      fontSize: isTab ? 14 : 12,
      lineHeight: isTab ? 20 : 18,
      marginTop: normalize(10),
      color: theme.primary,
      fontFamily: fonts.Effra_Arbc_Regular,
    },
    title: {
      fontSize: isTab ? 20 : 14,
      lineHeight: isTab ? 32 : 22,
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
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: normalize(10),
    },
    imageStyle: {
       width: '100%', 
       height: '100%' 
    },
    tagContainer: {
      position: 'absolute',
      left: 0,
      backgroundColor: Styles.color.greenishBlue,
      flexWrap: 'wrap',
  },
  });
};

export default NewsWithImageItem;

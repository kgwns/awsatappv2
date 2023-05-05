import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ButtonImage, Image, Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {getSvgImages} from 'src/shared/styles/svgImages';

export interface ArticleRectangleCardProps {
  trendingNumber?: number;
  imageUrl?: string;
  imageType?: 'round' | 'standard';
  imageSize?: number;
  title?: string;
  footerRight?: string;
  footerLeft?: string;
  footerLeftHighlight?: boolean;
  footerRightHighlight?: boolean;
}

export const ArticleRectangleCard = ({
  trendingNumber,
  imageUrl,
  imageType = 'standard',
  imageSize = normalize(66),
  title,
  footerRight,
  footerLeft,
  footerLeftHighlight = false,
  footerRightHighlight = false,
}: ArticleRectangleCardProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const [isSaved, setIsSaved] = useState(false);
  return (
    <View style={style.mainContainer}>
      <View style={style.container}>
        <View>
          {trendingNumber && (
            <View style={style.startMargin}>
              <Label style={style.trendingNumber}>{trendingNumber}</Label>
            </View>
          )}
        </View>

        <View>
          {imageUrl && (
            <View style={style.startMargin}>
              <Image
                url={imageUrl}
                size={imageSize}
                style={style.image}
                type={imageType === 'round' ? 'round' : 'standard'}
              />
            </View>
          )}
        </View>

        <View style={style.contentcontainer}>
          {title && (
            <View style={style.titleContainer}>
              <Label style={style.title} numberOfLines={2}>
                {title}
              </Label>
            </View>
          )}
          <View style={style.footerContent}>
            {footerRight && (
              <Label
                style={style.footerRight}
                color={
                  footerRightHighlight
                    ? theme.themeData.primary
                    : theme.themeData.secondaryDavyGrey
                }>
                {footerRight}
              </Label>
            )}
            {footerLeft && footerRight && (
              <Label
                style={style.verticalDivider}
                color={theme.themeData.secondaryDavyGrey}>
                |
              </Label>
            )}
            {footerLeft && (
              <Label
                style={style.footerLeft}
                color={
                  footerLeftHighlight
                    ? theme.themeData.primary
                    : theme.themeData.secondaryDavyGrey
                }>
                {footerLeft}
              </Label>
            )}
          </View>
        </View>
      </View>
      <View style={style.bookmark}>
        <ButtonImage
          testId={'bookMarkTestId'}
          icon={() => {
            return getSvgImages({
                  name: isSaved ? ImagesName.bookMarkActiveSVG : ImagesName.bookMarkSVG,
                  size: normalize(13),
                })
          }}
          onPress={() => setIsSaved(!isSaved)}
        />
      </View>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    mainContainer: {
      width: normalize(314),
      height: normalize(76),
      bottom: 0,
      alignItems: 'flex-end',
      backgroundColor: theme.secondaryWhite,
      marginStart: normalize(10),
      marginBottom: normalize(10),
      overflow: 'hidden',
    },
    container: {
      width: normalize(314),
      height: normalize(76),
      backgroundColor: theme.secondaryWhite,
      flexDirection: 'row',
      alignItems: 'center',
    },
    trendingNumber: {
      fontSize: normalize(20),
      fontWeight: 'bold',
      lineHeight: normalize(20),
      color: theme.primary,
      marginStart: normalize(5),
      marginEnd: normalize(5),
    },
    image: {},
    contentcontainer: {
      flexDirection: 'column',
      marginStart: normalize(8),
    },
    title: {
      fontSize: normalize(13),
      fontWeight: 'bold',
      lineHeight: normalize(16),
      textAlign: 'left',
      color: theme.primaryBlack,
    },
    footerContent: {
      flexDirection: 'row',
      marginTop: normalize(20),
    },
    footerRight: {},
    verticalDivider: {
      marginStart: normalize(8),
      marginEnd: normalize(8),
    },
    bookmark: {
      bottom: normalize(23),
      left: normalize(-20),
    },
    footerLeft: {},
    titleContainer: {
      marginTop: normalize(5), 
      width: 220
    },
    startMargin: {
      marginStart: normalize(4)
    }
  });
};

export default ArticleRectangleCard;

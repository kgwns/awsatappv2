import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {isIOS, isTab, normalize, screenWidth} from 'src/shared/utils';
import {HtmlRenderer, Label, Image} from 'src/components/atoms';
import {Styles} from 'src/shared/styles';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {MixedStyleRecord} from 'react-native-render-html';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {
  decodeHTMLTags,
  dateTimeAgo,
  TimeIcon,
  isNonEmptyArray,
  getImageUrl,
  isNotEmpty,
} from 'src/shared/utils/utilities';
import {ArticleFontSize} from 'src/redux/appCommon/types';
import {fonts} from 'src/shared/styles/fonts';
import {ArticleFooter} from 'src/components/molecules';
import {useTranslation} from 'react-i18next';
import {ImageResize} from 'src/shared/styles/text-styles';

export interface PhotoGalleryDetailWidgetProps {
  data: any;
  fontSize: ArticleFontSize;
  hideBackArrow?: boolean;
  onPressBack?: () => void;
}

export const PhotoGalleryDetailWidget = ({
  data,
  fontSize,
}: PhotoGalleryDetailWidgetProps) => {
  const [t] = useTranslation();
  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);

  const htmlTagStyle: MixedStyleRecord = {
    p: {
      color: colors.white,
      textAlign: 'justify',
      direction: 'rtl',
      fontSize: fontSize,
      lineHeight: 1.8 * fontSize,
      fontFamily: fonts.Effra_Arbc_Regular,
      writingDirection: 'rtl',
    },
  };

  const timeFormat = dateTimeAgo(data.created);

  const footerData: any = {
    leftTitleColor: Styles.color.spanishGray,
    leftIcon: () => TimeIcon(timeFormat.icon),
    leftTitleStyle: {
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      fontSize: 12,
      lineHeight: isIOS ? 20 : 25,
    },
    hideBookmark: true,
    style: {marginVertical: normalize(0.01 * screenWidth)},
  };

  const articleHtmlContent = () => (
    <View>
      <HtmlRenderer source={data.body_export} tagsStyles={htmlTagStyle} />
    </View>
  );

  const renderTextHtml = (content: any) => (
    <View>
      <HtmlRenderer source={content} tagsStyles={htmlTagStyle} />
    </View>
  );

  const renderImageList = () => {
    if (isNonEmptyArray(data.field_photo_album_export)) {
      return data.field_photo_album_export.map(
        (image: string, index: number) => {
          const imageUrl = image ? getImageUrl(image) : undefined;
          return (
            <View key={index}>
              <View>
                <Image
                  url={imageUrl}
                  resizeMode={ImageResize.COVER}
                  style={{
                    width: Dimensions.get('window').width,
                    height: 'auto',
                    aspectRatio: 3 / 2,
                  }}
                  fallback={true}
                />
              </View>
              <View style={style.textContainer}>
                {isNonEmptyArray(data.field_album_source_export) &&
                  isNotEmpty(data.field_album_source_export[index]) &&
                  renderTextHtml(data.field_album_source_export[index])}
              </View>
            </View>
          );
        },
      );
    }
  };

  return (
    <View>
      <View style={style.contentContainer}>
        <Label style={style.title} children={decodeHTMLTags(data.title)} />
        <ArticleFooter {...footerData} leftTitle={timeFormat.time} />
        {articleHtmlContent()}
      </View>
      {renderImageList()}
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const styles = StyleSheet.create({
    contentContainer: {
      paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 30,
      lineHeight: 45,
      color: colors.white,
      textAlign: 'left',
      marginVertical: normalize(0.01 * screenWidth),
      fontFamily: fonts.AwsatDigital_Bold,
      paddingTop: 20,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor,
    },
    prevIconStyle: {
      width: normalize(12),
      height: normalize(8.8),
      paddingTop: isIOS ? 10 : 9,
      alignItems: 'center',
      paddingHorizontal: normalize(10),
    },
    returnLabel: {
      marginStart: normalize(5),
      fontSize: normalize(14),
      lineHeight: normalize(32),
      color: theme.primaryBlack,
      fontFamily: fonts.AwsatDigital_Regular,
    },
    textContainer: {
      paddingTop: 20,
      paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
    },
  });
  return styles;
};

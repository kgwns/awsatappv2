import React, { useEffect } from 'react';
import {StyleSheet, View, useWindowDimensions, ScrollView} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {isIOS, isTab, normalize, screenWidth} from 'src/shared/utils';
import { Label, Image } from 'src/components/atoms';
import {Styles} from 'src/shared/styles';
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
import {ImageResize} from 'src/shared/styles/text-styles';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { articleHtml } from 'src/components/screens/articleDetail/components/ArticleDetailRichContent';

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
  const style = useThemeAwareObject(customStyle);
  const webviewRef: any[] = [React.createRef()];

  useEffect(() => {
    if (webviewRef) {
      webviewRef[0] && webviewRef[0].injectJavaScript(script());
    }
  }, [fontSize])

  const timeFormat = dateTimeAgo(data.created);

  const footerData: any = {
    leftTitleColor: Styles.color.spanishGray,
    leftIcon: () => TimeIcon(timeFormat.icon),
    leftTitleStyle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      fontSize: 12,
      lineHeight: isIOS ? 20 : 25,
    },
    hideBookmark: true,
    style: {marginVertical: normalize(0.01 * screenWidth)},
  };

  const script = () => {
    return `
      var pTagElement = document.getElementsByTagName("p");
      //   This css to apply all the p tag element
      if(pTagElement && pTagElement.length > 0) {
        for(i=0; i < pTagElement.length; i++) {
          pTagElement[i].style.fontSize = "${fontSize}px"
          pTagElement[i].style.lineHeight = "${1.8 * fontSize}px"
          pTagElement[i].style.color = "${colors.white}"
          pTagElement[i].style.textAlign = "justify"
          pTagElement[i].style.direction = "rtl"
          pTagElement[i].style.writingDirection = "rtl"
        }
      }`;
  };

  const updateWebViewStyle = () => {
    webviewRef && webviewRef[0] && webviewRef[0].injectJavaScript(script())
  }

  const renderWebView = () => (
    <AutoHeightWebView
      style={style.webView}
      source={{ html: articleHtml({ body: data.body_export }), baseUrl: '' }}
      domStorageEnabled={true}
      bounces={false}
      originWhitelist={["*"]}
      nestedScrollEnabled={false}
      scalesPageToFit={false}
      ref={(r) => (webviewRef[0] = r)}
      onLoadEnd={updateWebViewStyle}
      onLoadProgress={updateWebViewStyle}
      injectedJavaScript={script()}
      injectedJavaScriptBeforeContentLoaded={script()}
      androidLayerType="hardware"
      scrollEnabled={false}
    />
  )

  const articleHtmlContent = () => {
    if (isIOS) {
      return (
        <View style={style.htmlBodyStyle}>
          {renderWebView()}
        </View>
      )
    } else {
      //Android needs to use scroll view otherwise when press back, App will crash
      return (
        <ScrollView scrollEnabled={true} style={style.htmlBodyStyle}>
          {renderWebView()}
        </ScrollView>
      )
    }
  };

  const labelStyle ={ 
    fontSize,
    lineHeight: 1.8 * fontSize
  }

  const renderTextHtml = (content: any) => (
    <View>
      <Label style={[style.bodyStyle, labelStyle]} children={decodeHTMLTags(content)} />
    </View>
  );

  const { width } = useWindowDimensions();

  const renderImagesWithText = (image: string, caption: string) => {
    const imageUrl = image ? getImageUrl(image) : undefined;
    return (
      <View key={image}>
        <View>
          <Image
            url={imageUrl}
            resizeMode={ImageResize.COVER}
            style={{
              width: width,
              height: 'auto',
              aspectRatio: 3 / 2,
            }}
            fallback={true}
          />
        </View>
        <View style={style.textContainer}>
          {renderTextHtml(caption)}
        </View>
      </View>
    )
  }

  const renderImageList = () => {
    if (isNonEmptyArray(data.field_photo_album_export)) {
      return data.field_photo_album_export.map(
        (image: string, index: number) => {
          const caption = isNonEmptyArray(data.captions) && isNotEmpty(data.captions[index]) ? data.captions[index] : ' '
          return renderImagesWithText(image, caption)
        },
      );
    } else {
      return renderImagesWithText(data.field_album_img_export, data.field_album_img)
    }
  };

  return (
    <View style={style.container}>
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
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
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
      paddingVertical: 15,
      paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
    },
    bodyStyle: {
      color: colors.white,
      textAlign: 'justify',
      direction: 'rtl',
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      writingDirection: 'rtl',
    },
    webView: {
      width: '100%',
      backgroundColor: 'transparent',
      opacity: 0.99,
      flex: 1,
    },
    htmlBodyStyle: {
      paddingVertical: normalize(15)
    }
  });
};

import { View, StyleSheet, ScrollView, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { decodeHTMLTags, isIOS, isNonEmptyArray, isNotEmpty, isObjectNonEmpty, isTab, screenWidth } from 'src/shared/utils'
import { ArticleContentDataType, 
    ArticleDescriptionDataType, 
    ArticleDetailDataType, 
    ArticleNumberDataType, 
    ArticleOpinionDataType, 
    ArticleQuoteDataType, 
    ArticleReadAlsoDataType, 
    RichHTMLType } from 'src/redux/articleDetail/types'
import { Styles } from 'src/shared/styles'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Label, TitleWithUnderLine } from 'src/components/atoms'
import { fonts } from 'src/shared/styles/fonts'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType, DARK_THEME_ID } from 'src/shared/styles/colors'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { ReadAlsoArticle } from './ReadAlsoArticle'
import { ContentBundleWidget } from './ContentBundleWidget'
import { decode } from 'html-entities'
import { WebViewErrorEvent, WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes'
import { RichHTMLOpinonWidget } from './RichHTMLOpinonWidget'

export const RenderRichHTMLContent = ({
    articleItem,
    articleFontSize,
}: {
    articleItem: ArticleDetailDataType,
    articleFontSize: number,
}) => {
    const htmlContent = articleItem.richHTML ?? []
    if (!isNonEmptyArray(htmlContent)) {
        return null
    }

    const style = useThemeAwareObject(customStyle)
    const updatedFontSize = isTab ? 1.3 * articleFontSize : isIOS ? 1.15 * articleFontSize : articleFontSize
    return (
        <View style={style.itemContainer}>
            {
                htmlContent?.map((item, index) => {
                    if (!item || !item.type) {
                        return null
                    }

                    switch (item.type) {
                        case RichHTMLType.QUOTE:
                            return <RenderQuoteElement paragraphInfo={item.data} key={index}/>
                        case RichHTMLType.CONTENT:
                            return <RenderContentElement paragraphInfo={item.data} key={index}/>
                        case RichHTMLType.DESCRIPTION:
                            return <RenderDescriptionElement paragraphInfo={item.data} fontSize={updatedFontSize} key={index}/>
                        case RichHTMLType.OPINION:
                            return <RenderOpinionElement paragraphInfo={item.data} key={index}/>
                        case RichHTMLType.READ_ALSO:
                            return <RenderReadAlsoElement paragraphInfo={item.data} key={index}/>
                        case RichHTMLType.NUMBERS:
                            return <RenderNumberElement paragraphInfo={item.data} fontSize={updatedFontSize} key={index}/>
                        default: return null
                    }
                })
            }
        </View>
    )
}

export const RenderQuoteElement = ({ paragraphInfo }: { paragraphInfo: ArticleQuoteDataType }) => {
    if (!isNotEmpty(paragraphInfo.title) && !isNotEmpty(paragraphInfo.description)) {
        return null
    }

    const style = useThemeAwareObject(customStyle)

    const { themeData } = useTheme()
    const isDark = themeData.id === DARK_THEME_ID ? true : false

    const injectedStyle = `
    setTimeout(function() {
    const quoteText = document.getElementsByTagName("p");
    window.ReactNativeWebView.postMessage(quoteText.length)
    if(quoteText && quoteText.length > 0) {
        quoteText[0].style["font-size"] = "0.9375rem";
        quoteText[0].style["color"] = "${isDark ? Styles.color.white : "#253C3A"}";
        quoteText[0].style["font-weight"] = "bold";
        quoteText[0].style["direction"] = "rtl"
        quoteText[0].style["line-height"] = "inherit";
        quoteText[0].style["text-align"] = "justify";
    }
    }, ` + 0 + `)
  `

    return (
        <View style={style.quoteContainer}>
            <Label style={style.upperArrow} children={`${'"'}`} />
            {isNotEmpty(paragraphInfo.description) &&
                <View style={style.descriptionStyle}>
                    {RenderWebView(richContentTagStyle({ body: paragraphInfo.description }) || '', injectedStyle)}
                </View>
            }
            <View style={style.quoteFooter}>
                <Label style={style.quoteTitle} children={decode(decodeHTMLTags(paragraphInfo.title))} />
                <Label style={style.bottomArrow} children={`${'"'}`} />
            </View>
        </View>
    )
}

export const RenderContentElement = ({ paragraphInfo }: { paragraphInfo: ArticleContentDataType }) => {
    
    const CONTENT_BUNDLE_TITLE = TranslateConstants({key: TranslateKey.CONTENT_BUNDLE_WIDGET_TITLE})
    const style = useThemeAwareObject(customStyle)
    
    if (!paragraphInfo || !isObjectNonEmpty(paragraphInfo.contentData)) {
        return null
    }

    return (
        <View style={style.contentContainer}>
            <ContentBundleWidget title={CONTENT_BUNDLE_TITLE} data={paragraphInfo.contentData} />
        </View>
    )
}

export const RenderDescriptionElement = ({ paragraphInfo, fontSize }: { paragraphInfo: ArticleDescriptionDataType, fontSize: number }) => {
    if (!isObjectNonEmpty(paragraphInfo.description) || !isNotEmpty(paragraphInfo.description)) {
        return null
    }

    const style = useThemeAwareObject(customStyle)

    const { themeData } = useTheme()
    const webviewRef = React.useRef<AutoHeightWebView>()

    const injectedStyle = `
    setTimeout(function() {   
        //Description Element
        var descriptionText = document.getElementsByTagName("p");
        window.ReactNativeWebView.postMessage(descriptionText.length)
        if(descriptionText && descriptionText.length > 0) {
            for(i=0; i < descriptionText.length; i++) {
                descriptionText[i].style["font-size"] = "${fontSize}px";
                descriptionText[i].style.lineHeight = "${1.8 * fontSize}px";
                descriptionText[i].style["direction"] = "rtl"
                descriptionText[i].style["text-align"] = "justify";  
                descriptionText[i].style["color"] = "${themeData.primaryBlack}";
            } 
        }

        var imageElement = document.getElementsByTagName("img");
        if(imageElement && imageElement.length > 0) {
            for(i=0; i < imageElement.length; i++) {
              imageElement[i].style["max-width"] = "100%"; 
              imageElement[i].style["height"] = "auto"; 
            } 
        }
    }, ` + 0 + `)
    `

    useEffect(() => {
        if (webviewRef && webviewRef.current) {
            webviewRef.current.injectJavaScript(injectedStyle)
        }
    }, [fontSize])

    return (
        <View style={style.descriptionContainer}>
            {/* <TitleWithUnderLine title={'CONST_FACTS'} titleContainerStyle={{ backgroundColor: themeData.backgroundColor }} /> */}
            {RenderWebView(richContentTagStyle({ body: paragraphInfo.description }), injectedStyle, webviewRef)}
        </View>
    )
}

export const RenderOpinionElement = ({ paragraphInfo }: { paragraphInfo: ArticleOpinionDataType }) => {
    if (!isObjectNonEmpty(paragraphInfo.opinionData)) {
        return null
    }

    return (
        <View>
            <RichHTMLOpinonWidget data={paragraphInfo.opinionData} />
        </View>
    )
}

export const RenderReadAlsoElement = ({ paragraphInfo }: { paragraphInfo: ArticleReadAlsoDataType }) => {
    if (!isNonEmptyArray(paragraphInfo.readAlsoData)) {
        return null
    }
    const READ_ALSO_BUNDLE_TITLE = TranslateConstants({key: TranslateKey.CONTENT_BUNDLE_WIDGET_TITLE})

    return (
        <View>
            <ReadAlsoArticle title={READ_ALSO_BUNDLE_TITLE} data={paragraphInfo.readAlsoData} />
        </View>
    )
}

export const RenderNumberElement = ({ paragraphInfo, fontSize }: { paragraphInfo: ArticleNumberDataType, fontSize: number }) => {
    if (!paragraphInfo) {
        return null
    }

    const webviewRef = React.useRef<AutoHeightWebView>()
    const style = useThemeAwareObject(customStyle)
    const CONST_FACTS = TranslateConstants({ key: TranslateKey.RICH_HTML_FACTS })

    const { themeData } = useTheme()

    const injectedStyle = `
    setTimeout(function() {   
        //Description Element
        var descriptionText = document.getElementsByTagName("p");
        if(descriptionText && descriptionText.length > 0) {
            for(i=0; i < descriptionText.length; i++) {
                descriptionText[i].style["font-size"] = "${fontSize}px";
                descriptionText[i].style.lineHeight = "${1.8 * fontSize}px";
                descriptionText[i].style["font-family"] = "inherit";
                descriptionText[i].style["direction"] = "rtl"
                descriptionText[i].style["text-align"] = "justify";  
                descriptionText[i].style["color"] = "${themeData.primaryBlack}";
            } 
        }

        var imageElement = document.getElementsByTagName("img");
        if(imageElement && imageElement.length > 0) {
            for(i=0; i < imageElement.length; i++) {
              imageElement[i].style["max-width"] = "100%"; 
              imageElement[i].style["height"] = "auto"; 
            } 
        }
    }, ` + 0 + `)
    `

    useEffect(() => {
        if (webviewRef && webviewRef.current) {
            webviewRef.current.injectJavaScript(injectedStyle)
        }
    }, [fontSize])

    return (
        <View style={style.descriptionContainer}>
            <TitleWithUnderLine title={CONST_FACTS} />
            <View style={style.numberBodyMainContainer}>
                <View style={style.numberBodyContainer}>
                    {isNotEmpty(paragraphInfo.title) && <Label children={paragraphInfo.title} style={style.numberTitle} />}
                    {isNotEmpty(paragraphInfo.description) && RenderWebView(richContentTagStyle({ body: paragraphInfo.description }) || '', injectedStyle, webviewRef)}
                </View>
            </View>
        </View>
    )
}

export const RenderWebView = (htmlInfo: string, injectedStyle?: string, webViewRef?: React.MutableRefObject<AutoHeightWebView | undefined | null>) => {
    const style = useThemeAwareObject(customStyle)

    const updateWebViewRef = (ref: any) => {
        if (webViewRef) {
            webViewRef.current = ref
            return webViewRef.current;
        } else {
            return ref
        }

    }

    return (
        <ScrollView scrollEnabled={false} style={style.webViewContainer}>
            <AutoHeightWebView
                style={style.webview}
                ref={(ref) => { updateWebViewRef(ref) }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={["*"]}
                bounces={false}
                nestedScrollEnabled={false}
                injectedJavaScript={injectedStyle}
                injectedJavaScriptBeforeContentLoaded={injectedStyle}
                source={{ html: htmlInfo, baseUrl: '' }}
                scrollEnabled={false}
                onMessage={(event: WebViewMessageEvent) => {
                    console.log("🚀 ~ file: ArticleDetailRichContent.tsx ~ line 176 ~ RenderWebView ~ event", event.nativeEvent.data)
                }}
                onError={(error: WebViewErrorEvent) => console.log('Error ::::::::::', error.nativeEvent)}
            />
        </ScrollView>
    )
}

export const generateAssetFontCss = ({
    fontFileName,
    extension = 'ttf',
}: {
    fontFileName: string;
    extension?: string;
}) => {
    const fileUri = Platform.select({
        ios: `${fontFileName}.${extension}`,
        android: `file:///android_asset/fonts/${fontFileName}.${extension}`,
    });

    return `@font-face {
        font-family: '${fontFileName}';
        src: local('${fontFileName}'), url('${fileUri}') ;
    }`;
};

export const articleHtml = ({ body }: { body: string }) => `
  <html>
  <head>
      <style>
          ${generateAssetFontCss({
    fontFileName: 'Effra-Regular',
    extension: 'ttf',
})}
          body {
            font-family: Effra-Regular;
            padding: 0;
            margin: 0;
            width:99.5%;
            height: 100%;
          }
          p {
            font-family: Effra-Regular;
            text-align: justify;
            direction: rtl;
            writing-direction: rtl;
          }
          div {
            font-family: Effra-Regular;
            text-align: justify;
            direction: rtl;
            writing-direction: rtl;
          }
          figcaption {
            max-width: 100%;
            height: auto;
            padding: 8px;
            font-family: Effra-Regular;
            text-align: justify;
            direction: rtl;
            writing-direction: rtl;
            font-size: 15px;
            line-height: 22px;
          }
      </style>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
      />
  </head>
  <body style="padding:0px">
      ${body}
      <script async=\"\" src=\"https://platform.instagram.com/en_US/embeds.js\"></script>
      <script async=\"\" src=\"https://if-cdn.com/embed.js"></script>
      <script>
      document.addEventListener('copy',function(){
        const selectedText = window.getSelection().toString()
        const copiedData = {
            copiedText:selectedText,
            isClipboard:true
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(copiedData))
      });
      </script>
  </body>
  </html>
  `;

export const richContentTagStyle = ({ body }: { body: string }) => `
  <html>
  <head>
      <style>
          ${generateAssetFontCss({
    fontFileName: 'Effra-Regular',
    extension: 'ttf',
})}
          body {
              font-family: Effra-Regular;
          }
          p {
            font-family: Effra-Regular;
          }
      </style>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
      />
  </head>
  <body style="padding:0px">
      ${body}
  </body>
  </html>
  `;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    quoteContainer: {
        backgroundColor: theme.secondaryGreen,
        paddingVertical: 10,
        height: 'auto',
        marginBottom: 20,
    },
    upperArrow: {
        textAlign: 'left',
        marginLeft: 30,
        fontSize: 40,
        lineHeight: 45,
        fontWeight: 'bold',
        color: Styles.color.greenishBlue,
    },
    quoteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 30,
        paddingLeft: 40,
        paddingTop: 20,
        overflow: 'hidden',
        flex: 1,
    },
    bottomArrow: {
        fontSize: 40,
        lineHeight: 45,
        fontWeight: 'bold',
        color: Styles.color.greenishBlue,
        flex: 0.3,
    },
    quoteTitle: {
        color: Styles.color.greenishBlue,
        fontFamily: fonts.Effra_Arbc_Medium,
        fontSize: 14,
        lineHeight: 18,
        flex: 0.7,
        textAlign: 'left',
    },
    descriptionContainer: {
        paddingVertical: 20,
    },
    numberBodyMainContainer: {
        backgroundColor: theme.whiteSurface,
    },
    numberBodyContainer: {
        backgroundColor: theme.whiteSurface,
        marginHorizontal: 0.04 * screenWidth,
        paddingVertical: 30,
    },
    numberTitle: {
        fontSize: 32,
        lineHeight: 45,
        textAlign: 'left',
        color: Styles.color.greenishBlue,
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    webview: {
        width: '100%',
        backgroundColor: 'transparent',
        opacity: 0.99,
        flex: 1,
    },
    itemContainer: {
        padding: isTab ? 0 : 0.04 * screenWidth 
    },
    descriptionStyle: {
        paddingHorizontal: 40 
    },
    contentContainer: {
        paddingBottom: 20 
    },
    webViewContainer: {
        overflow: 'hidden' 
    }
})

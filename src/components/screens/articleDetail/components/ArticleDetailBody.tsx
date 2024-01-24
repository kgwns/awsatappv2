import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { decodeHTMLTags, EventsValue, isAndroid, isIOS, isTab, recordLogEvent, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { articleHtml } from './ArticleDetailRichContent'
import AutoHeightWebView, { SizeUpdate } from 'react-native-autoheight-webview'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { ANDROID_WEBVIEW_URL, IOS_WEBVIEW_URL } from 'src/constants/Constants'
import { AnalyticsEvents } from 'src/shared/utils/analytics'
import { fonts } from 'src/shared/styles/fonts'

type ArticleDetailBodyProps = {
    body: string;
    index: number;
    articleFontSize: number;
    orientation: string;
    title: string;
    author: string;
    publishedDate: string;
    tagTopicsList: string
}

export const ArticleDetailBody = React.memo(({
    body,
    index,
    articleFontSize,
    title,
    author,
    publishedDate,
    tagTopicsList
}: ArticleDetailBodyProps) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle);
   
    const myTimeOutReference = useRef<any>(null)

    const [dynamicHeight, setDynamicHeight] = useState<number>(0)
    const [webViewHeight, setWebViewHeight] = useState<number>(0)

    let webviewRef: any =React.createRef();

    useEffect(() => {
        updateHeightValue()
    }, [dynamicHeight])

    const updateHeightValue = () => {
        clearTimeout(myTimeOutReference.current)
        myTimeOutReference.current = setTimeout(() => {
            setWebViewHeight(dynamicHeight)
        }, 500);
    }

    useEffect(() => {
        updateWebViewStyle();
    }, [articleFontSize])

    const iFrameInjectCss = () => {

        return `
        //   This css to apply all the iFrame tag element
        var iFrameElement = document.getElementsByTagName("iframe");
        if(iFrameElement && iFrameElement.length > 0) {
          for(i=0; i < iFrameElement.length; i++) {
            iFrameElement[i].style["width"] = "${window.innerWidth}";
            iFrameElement[i].style["aspect-ratio"] = "2/4"; 
          } 
        }
        `
    }

    const script = () => {
        const newFontSize = isTab ? 1.3 * articleFontSize : isIOS ? 1.12 * articleFontSize : articleFontSize;
        return `
          var pTagElement = document.getElementsByTagName("p");
          //   This css to apply all the p tag element
          if(pTagElement && pTagElement.length > 0) {
            for(i=0; i < pTagElement.length; i++) {
              pTagElement[i].style.fontFamily = "${fonts.AwsatDigital_Regular}"
              pTagElement[i].style.fontSize = "${newFontSize}px"
              pTagElement[i].style.lineHeight = "${1.65 * newFontSize}px"
              pTagElement[i].style.color = "${themeData.primaryBlack}"
              pTagElement[i].style.textAlign = "justify"
              pTagElement[i].style.direction = "rtl"
              pTagElement[i].style.writingDirection = "rtl"
            }
          }

          var h2Element = document.getElementsByTagName("h2");
          var strongElementsInParagraphs = document.querySelectorAll("p > strong");
          var subTitleElements = Array.from(h2Element).concat(Array.from(strongElementsInParagraphs));
          //   This css to apply all the p tag element
          if(subTitleElements && subTitleElements.length > 0) {
            for(i=0; i < subTitleElements.length; i++) {
              subTitleElements[i].style.fontFamily = "${fonts.AwsatDigital_Regular}"
              subTitleElements[i].style.fontSize = "22px"
              subTitleElements[i].style.lineHeight = "${1.65 * newFontSize}px"
              subTitleElements[i].style.color = "${themeData.primaryBlack}"
              subTitleElements[i].style.textAlign = "justify"
              subTitleElements[i].style.direction = "rtl"
              subTitleElements[i].style.writingDirection = "rtl"
              subTitleElements[i].style.marginBottom = "20px"
            }
          }
    
          //   This css to apply all the div tag element
          var divTagElement = document.getElementsByTagName("div");
          if(divTagElement && divTagElement.length > 0) {
            for(i=0; i < divTagElement.length; i++) {
              divTagElement[i].style.fontSize = "${newFontSize}px"
              divTagElement[i].style.lineHeight = "${1.8 * newFontSize}px"
              divTagElement[i].style.color = "${themeData.primaryBlack}"
              divTagElement[i].style.textAlign = "justify"
              divTagElement[i].style.direction = "rtl"
              divTagElement[i].style.writingDirection = "rtl"
            }
          }

          //   This css to apply all the image tag element
          var figureElement = document.getElementsByTagName("figure");
          if(figureElement && figureElement.length > 0) {
            for(i=0; i < figureElement.length; i++) {
              figureElement[i].style["max-width"] = "${window.innerWidth}"; 
              figureElement[i].style["margin-right"] = "1px"; 
              figureElement[i].style["margin-left"] = "1px"; 
            } 
          }
    
          //   This css to apply all the image tag element
          var imageElement = document.getElementsByTagName("img");
          if(imageElement && imageElement.length > 0) {
            for(i=0; i < imageElement.length; i++) {
              imageElement[i].style["max-width"] = "100%"; 
              imageElement[i].style["min-width"] = "100%"; 
              imageElement[i].style["height"] = "auto"; 
            } 
          }

          //   This css to apply all the figcaption tag element
          var captionElement = document.getElementsByTagName("figcaption");
          if(captionElement && captionElement.length > 0) {
            for(i=0; i < captionElement.length; i++) {
              captionElement[i].style["color"] = "${themeData.articleCaption}"; 
              captionElement[i].style["background-color"] = "${themeData.whiteSurface}"; 
            } 
          }

          var meta = document.createElement('meta');
          meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
          meta.setAttribute('name', 'viewport');
          document.getElementsByTagName('head')[0].appendChild(meta);
    
          ${iFrameInjectCss()}
           
          true;  // note: this is required, or you'll sometimes get silent failures
          `;
    };

    const browserOptions = async (url: string) => {
        try {
            const result = await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'close',
                readerMode: false,
                modalEnabled: true,
                animated: true,
                enableBarCollapsing: true,
                // // Android Properties
                showTitle: true,
            })
            console.log('InAppBrowser result', JSON.stringify(result))
        } catch (error: any) {
            console.log('InAppBrowser ERROR', error.message)
        }
    }
    
    const onShouldStartLoadWithRequest = (event: any) => {
        const HTML_URL = isIOS ? IOS_WEBVIEW_URL : ANDROID_WEBVIEW_URL; // "file:///" : "about:blank"
        const URL = event.url

        if((isIOS && event.navigationType === 'click') || (isAndroid && !URL.includes(HTML_URL))) {
            browserOptions(URL);
            return false
        }
        return true
    }

    const updateWebViewStyle = () => {
        webviewRef && webviewRef.injectJavaScript(script())
    }

    const onSizeUpdated = (size: SizeUpdate) => {
        if (!isIOS && isTab) {
            return
        }
        setDynamicHeight(size.height + 2)
    }

    const storeCopiedTextInAnalytics = (data:string) => {
        try {
            const copiedData = JSON.parse(data);
            const { copiedText, isClipboard } = copiedData;
            if(isClipboard) {
                const decodeBody = decodeHTMLTags(body);
                const eventParameter = {
                    copied_text: copiedText,
                    copied_text_length: copiedText.split(' ').length,
                    article_name: title,
                    article_category: EventsValue.article,
                    article_author: author,
                    article_length: decodeBody.split(' ').length,
                    article_publish_date: publishedDate,
                    tags: tagTopicsList
                }
                recordLogEvent(AnalyticsEvents.TEXT_COPY,eventParameter)
            }
        } catch(error) {
            console.log(error)
        }
    }

    const renderWebView = () => (
        <AutoHeightWebView
            key={index}
            style={[style.webView, isIOS && !isTab && { height: webViewHeight }]}
            source={{ html: articleHtml({ body }), baseUrl: '' }}
            ref={(r) => (webviewRef = r)}
            domStorageEnabled={true}
            bounces={false}
            originWhitelist={["*"]}
            nestedScrollEnabled={false}
            scalesPageToFit={false}
            onLoadEnd={updateWebViewStyle}
            onLoadProgress={updateWebViewStyle}
            injectedJavaScript={script()}
            injectedJavaScriptBeforeContentLoaded={script()}
            onShouldStartLoadWithRequest={(event) => onShouldStartLoadWithRequest(event)}
            androidLayerType="hardware"
            allowsFullscreenVideo={true}
            scrollEnabled={false}
            onSizeUpdated={onSizeUpdated}
            onMessage={(event) => storeCopiedTextInAnalytics(event.nativeEvent?.data)}
        />
    )

    if (isIOS) {
        return (
            <View style={style.iosContainerViewStyle}>
                {renderWebView()}
            </View>
        )
    } else {
        //Android needs to use scroll view otherwise when press back, App will crash
        return (
            <ScrollView scrollEnabled={true} style={style.scrollViewStyle}> 
                {renderWebView()}
            </ScrollView>
        )
    }
   
})

const customStyle = () => StyleSheet.create({
    scrollViewStyle: {
        marginHorizontal: isTab ? 0 : 0.04 * screenWidth,
        overflow: 'hidden',
        marginTop: 20,
    },
    iosContainerViewStyle: {
        marginHorizontal: isTab ? 0 : 0.04 * screenWidth,
        marginTop: 20,
    },
    webView: {
        width: '100%',
        backgroundColor: 'transparent',
        opacity: 0.99,
        flex: 1,
    },
})

import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { isIOS, isTab, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { articleHtml } from './ArticleDetailRichContent'
import AutoHeightWebView, { SizeUpdate } from 'react-native-autoheight-webview'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { ANDROID_WEBVIEW_URL, IOS_WEBVIEW_URL } from 'src/constants/Constants'

type ArticleDetailBodyProps = {
    body: string;
    index: number;
    articleFontSize: number;
    orientation: string;
}

export const ArticleDetailBody = React.memo(({
    body,
    index,
    articleFontSize,
    orientation,
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
        webviewRef && webviewRef.injectJavaScript(script());
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
        const newFontSize = isTab ? 1.3 * articleFontSize : isIOS ? 1.15 * articleFontSize : articleFontSize
        return `
          var pTagElement = document.getElementsByTagName("p");
          //   This css to apply all the p tag element
          if(pTagElement && pTagElement.length > 0) {
            for(i=0; i < pTagElement.length; i++) {
              pTagElement[i].style.fontSize = "${newFontSize}px"
              pTagElement[i].style.lineHeight = "${1.8 * newFontSize}px"
              pTagElement[i].style.color = "${themeData.primaryBlack}"
              pTagElement[i].style.textAlign = "justify"
              pTagElement[i].style.direction = "rtl"
              pTagElement[i].style.writingDirection = "rtl"
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

        if (isIOS) {
            if (event.navigationType === 'click') {
                browserOptions(URL);
                return false
            }
        } else {
            if (!URL.includes(HTML_URL)) {
                browserOptions(URL);
                return false
            }
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

    const renderWebView = () => (
        <AutoHeightWebView
            key={index}
            style={[style.webView, isIOS && !isTab && { height: webViewHeight }]}
            source={{ html: articleHtml({ body: body }), baseUrl: '' }}
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
        marginHorizontal: 0.04 * screenWidth,
        overflow: 'hidden',
        marginTop: 20,
    },
    iosContainerViewStyle: {
        marginHorizontal: 0.04 * screenWidth,
        marginTop: 20,
    },
    webView: {
        width: '100%',
        backgroundColor: 'transparent',
        opacity: 0.99,
        flex: 1,
    },
})

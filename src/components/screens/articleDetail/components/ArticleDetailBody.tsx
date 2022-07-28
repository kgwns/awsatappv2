import { StyleSheet, ScrollView, Dimensions, View } from 'react-native'
import React, { useEffect } from 'react'
import { isIOS, isTab, screenHeight, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { articleHtml } from './ArticleDetailRichContent'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { ANDROID_WEBVIEW_URL, IOS_WEBVIEW_URL } from 'src/constants/SharedConstants'

type ArticleDetailBodyProps = {
    body: string;
    index: number;
    articleFontSize: number;
    webviewRef: any;
    orientation: string;
}

export const ArticleDetailBody = React.memo(({
    body,
    index,
    articleFontSize,
    webviewRef,
    orientation,
}: ArticleDetailBodyProps) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle);

    useEffect(() => {
        if (webviewRef) {
            webviewRef.forEach((_: any, index: number) => {
                webviewRef[index].injectJavaScript(script());
            })
        }
    }, [articleFontSize])

    useEffect(() => {
        if (webviewRef) {
            webviewRef.forEach((_: any, index: number) => {
                webviewRef[index].injectJavaScript(iFrameInjectCss());
            })
        }
    }, [orientation])

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const iFrameInjectCss = () => {
        const size = isPortrait() ? screenWidth : screenHeight

        return `
        //   This css to apply all the iFrame tag element
        var iFrameElement = document.getElementsByTagName("iframe");
        if(iFrameElement && iFrameElement.length > 0) {
          for(i=0; i < iFrameElement.length; i++) {
            iFrameElement[i].style["width"] = "${0.92 * size}px";
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
          var imageElement = document.getElementsByTagName("img");
          if(imageElement && imageElement.length > 0) {
            for(i=0; i < imageElement.length; i++) {
              imageElement[i].style["max-width"] = "100%"; 
              imageElement[i].style["height"] = "auto"; 
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
            if (event.navigationType == 'click') {
                browserOptions(URL);
                return false
            }
        }
        else {
            if (!URL.includes(HTML_URL)) {
                browserOptions(URL);
                return false
            }
        }
        return true
    }

    const updateWebViewStyle = () => {
        webviewRef && webviewRef[index] && webviewRef[index].injectJavaScript(script())
    }

    return (
        <View style={style.scrollViewStyle}>
            <AutoHeightWebView
                style={style.webView}
                source={{ html: articleHtml({ body: body }), baseUrl: '' }}
                ref={(r) => (webviewRef[index] = r)}
                domStorageEnabled={true}
                bounces={false}
                originWhitelist={["*"]}
                nestedScrollEnabled={false}
                scalesPageToFit={false}
                onMessage={(event) => {
                    // console.log(event.nativeEvent.data);
                }}
                onLoadEnd={updateWebViewStyle}
                onLoadProgress={updateWebViewStyle}
                injectedJavaScript={script()}
                injectedJavaScriptBeforeContentLoaded={script()}
                onShouldStartLoadWithRequest={(event) => onShouldStartLoadWithRequest(event)}
                androidLayerType="hardware"
                allowsFullscreenVideo={true}
                scrollEnabled={false}
            />
        </View>
    )
})

const customStyle = () => StyleSheet.create({
    scrollViewStyle: {
        marginHorizontal: 0.04 * screenWidth,
        overflow: 'hidden',
        marginTop: 20,
    },
    webView: {
        width: '100%',
        backgroundColor: 'transparent',
        opacity: 0.99,
        flex: 1,
    },
})

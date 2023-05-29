import { StyleSheet, ScrollView, View, Linking } from 'react-native'
import React from 'react'
import { isIOS, screenWidth } from 'src/shared/utils'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { LIVE_BLOG_URL } from 'src/services/apiUrls'

type ArticleLiveBlogProps = {
    scribbleId: string;
}

export const ArticleLiveBlog = React.memo(({
    scribbleId,
}: ArticleLiveBlogProps) => {

    const style = useThemeAwareObject(customStyle);
    let webviewRef: any = React.createRef();
    const liveBlogUrl = `${LIVE_BLOG_URL}${scribbleId}`;

    const onShouldStartLoadWithRequest = (event: any) => {
        if (event.url !== liveBlogUrl) {
            webviewRef.stopLoading();
            Linking.openURL(event.url);
            return false
        }
        return true
    }

    const renderLiveBlogView = () => (
        <AutoHeightWebView
            key={scribbleId}
            style={style.webViewContainer}
            source={{ uri: liveBlogUrl }}
            ref={(r) => (webviewRef = r)}
            bounces={false}
            originWhitelist={["*"]}
            nestedScrollEnabled={false}
            mediaPlaybackRequiresUserAction={false}
            androidLayerType="hardware"
            allowsFullscreenVideo={true}
            scrollEnabled={false}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            scalesPageToFit={false}
            setBuiltInZoomControls={false}
            viewportContent={'width=device-width, user-scalable=no'}
        />
    )

    if (isIOS) {
        return (
            <View style={style.iosContainerViewStyle}>
                {renderLiveBlogView()}
            </View>
        )
    } else {
        //Android needs to use scroll view otherwise when press back, App will crash
        return (
            <ScrollView scrollEnabled={true} style={style.scrollViewStyle}>
                {renderLiveBlogView()}
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
    webViewContainer: {
        width: '100%' 
    }
})

export default ArticleLiveBlog;

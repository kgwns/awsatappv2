import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { isIOS, isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { fonts } from 'src/shared/styles/fonts'
import { Label } from '../atoms'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { colors } from 'src/shared/styles/colors'
import { generateAssetFontCss } from '../screens/articleDetail/components/ArticleDetailRichContent'

type InfoGraphicMapWidgetProps = {
    title: string
    htmlContent: string
}

const InfoGraphicMapWidget = ({
    title = '', htmlContent
}: InfoGraphicMapWidgetProps) => {

    const infoGraphicHTML = ({ body }: { body: string }) => `
        <html>
        <head>
            <style>
            ${generateAssetFontCss({
                fontFileName: 'Effra-Regular',
                extension: 'ttf',
            })}
                p {
                    font-family: Effra-Regular;
                    text-align: justify;
                    direction: rtl;
                    writing-direction: rtl;
                }
            </style>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
        </head>
        <body style="padding:0px">
            <div style="padding:20px;">
                ${body}
            <div>
        </body>
        </html>`;

    const htmlSource = { html: isNotEmpty(htmlContent) ? infoGraphicHTML({body: htmlContent}) : '<div></div>' , baseUrl:''}

    const renderWebview = () => (
        <AutoHeightWebView
            scrollEnabled={false}
            nestedScrollEnabled={false}
            originWhitelist={['*']}
            source={htmlSource}
            scalesPageToFit={false}
            viewportContent={'width=device-width, user-scalable=no'}
            style={isTab && styles.tabWebViewContainer}
        />
    )

    return (
            <View style={isTab ? styles.tabWidgetContainer : styles.widgetContainer}>
            <View style={styles.headerContainer}>
                <Label
                    children={title}
                    style={styles.titleStyle}
                />
            </View>

            {isIOS ? renderWebview() : <ScrollView scrollEnabled={true} style={styles.scrollViewStyle}>
                {renderWebview()}
            </ScrollView>}
        </View>
    )
}

export default InfoGraphicMapWidget

const styles = StyleSheet.create({

    widgetContainer: {
        width: '100%',
        backgroundColor: colors.aliceDimBlue
    },
    tabWidgetContainer: {
        width: '100%',
        height:'100%',
        backgroundColor: colors.aliceDimBlue
    },
    headerContainer: {
        width: '100%',
        marginLeft: 15,
        paddingBottom: isTab ? normalize(30) : 0,
    },
    titleStyle: {
        marginTop: isTab ? 25 : 10,
        textAlign: 'left',
        fontFamily: fonts.AwsatDigitalV2_Black,
        fontSize: isTab ? 25 : 24,
        lineHeight: 36,
        color: colors.black,
        fontWeight: isTab ? '500' : 'normal',
    },
    scrollViewStyle: {
        overflow: 'hidden',
    },
    tabWebViewContainer: {
        width: '100%',
    },
})

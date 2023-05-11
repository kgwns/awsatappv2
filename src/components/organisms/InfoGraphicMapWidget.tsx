import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { isIOS, isNotEmpty, isTab, screenWidth } from 'src/shared/utils'
import { fonts } from 'src/shared/styles/fonts'
import { Label, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { colors } from 'src/shared/styles/colors'
import { generateAssetFontCss } from '../screens/articleDetail/components/ArticleDetailRichContent'
import { useTheme } from 'src/shared/styles/ThemeProvider';

type InfoGraphicMapWidgetProps = {
    headerTitle: string
    htmlContent: string
}

const InfoGraphicMapWidget = ({
    headerTitle = '', htmlContent
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
    const { themeData } = useTheme();

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

    const widgetHeaderData: WidgetHeaderProps = {
        headerLeft: {
          title: headerTitle,
          color: themeData.primaryBlack,
          labelType: LabelTypeProp.title3,
          textStyle: { fontFamily: fonts.AwsatDigital_Black }
        },
      };

    return (
            <View style={isTab ? styles.tabWidgetContainer : styles.widgetContainer}>
            
            {isTab ? <View style={styles.widgetHeaderContainer}>
                <WidgetHeader {...widgetHeaderData} />
            </View> :
                <View style={styles.headerContainer}>
                    <Label
                        children={headerTitle}
                        style={styles.titleStyle}
                    />
                </View>}
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
    },
    tabHeaderContainer: {
        width: '95%',
        height: '13.5%',
        marginLeft: 5,
        justifyContent: 'center'
    },
    titleStyle: {
        marginTop: 10,
        textAlign: 'left',
        fontFamily: fonts.AwsatDigitalV2_Black,
        fontSize: 24,
        lineHeight: 36,
        color: colors.black,
        fontWeight: 'normal',
    },
    tabTitleStyle: {
        textAlign: 'left',
        fontFamily: fonts.AwsatDigitalV2_Black,
        fontSize: 25,
        lineHeight: 36,
        color: colors.black,
        fontWeight: '500',
    },
    scrollViewStyle: {
        overflow: 'hidden',
    },
    tabWebViewContainer: {
        width: '100%',
    },
    widgetHeaderContainer: {
        paddingHorizontal: isTab ? 0 : 0.04 * screenWidth,
        paddingVertical: isIOS ? 20 : 21,
    },
})
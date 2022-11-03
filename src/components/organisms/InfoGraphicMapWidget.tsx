import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { isIOS, isNotEmpty } from 'src/shared/utils'
import { fonts } from 'src/shared/styles/fonts'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { ImagesName } from 'src/shared/styles'
import { Label } from '../atoms'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { colors } from 'src/shared/styles/colors'

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
                p {
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

    const htmlSource = { html: isNotEmpty(htmlContent) ? infoGraphicHTML({body: htmlContent}) : '<div></div>' }
    const Flag = () =>
        <View style={styles.flagContainer}>
            {getSvgImages({
                name: ImagesName.flagIcon,
                width: styles.flag.width,
                height: styles.flag.height,
                style: styles.flag
            })}
        </View>

    const renderWebview = () => (
        <AutoHeightWebView
            scrollEnabled={false}
            nestedScrollEnabled={false}
            originWhitelist={['*']}
            source={htmlSource}
            scalesPageToFit={false}
            viewportContent={'width=device-width, user-scalable=no'}
        />
    )

    return (
        <View style={styles.widgetContainer}>
            <View style={styles.headerContainer}>
                {/* Commented as per the ticket AMAR-1075 
                <Flag /> */}
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

    flagContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    flag: {
        width: 16,
        height: 16,
        marginTop: 5,
        marginRight: 10
    },
    widgetContainer: {
        width: '100%',
        backgroundColor: colors.aliceDimBlue
    },
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 15
    },
    titleStyle: {
        marginTop: 10,
        textAlign: 'left',
        fontFamily: fonts.AwsatDigitalV2_Black,
        fontSize: 24,
        lineHeight: 36,
        color: colors.black
    },
    scrollViewStyle: {
        overflow: 'hidden',
    }
})

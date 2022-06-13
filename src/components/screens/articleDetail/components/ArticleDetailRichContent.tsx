import { View, StyleSheet } from 'react-native'
import React from 'react'
import { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview'
import { isNonEmptyArray, screenWidth } from 'src/shared/utils'
import { ArticleContentDataType, ArticleDescriptionDataType, ArticleNumberDataType, ArticleOpinionDataType, ArticleQuoteDataType, ArticleReadAlsoDataType } from 'src/redux/articleDetail/types'
import { Styles } from 'src/shared/styles'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Label, TitleWithUnderLine } from 'src/components/atoms'
import { fonts } from 'src/shared/styles/fonts'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType, DARK_THEME_ID } from 'src/shared/styles/colors'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants'
import { ReadAlsoArticle } from './ReadAlsoArticle'

export const RenderQuoteElement = ({ paragraphInfo }: { paragraphInfo: ArticleQuoteDataType }) => {
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
            <View style={{ paddingHorizontal: 40 }}>
                {renderWebView(paragraphInfo.description, injectedStyle)}
            </View>
            <View style={style.quoteFooter}>
                <Label style={style.quoteTitle} children={paragraphInfo.title} />
                <Label style={style.bottomArrow} children={`${'"'}`} />
            </View>
        </View>
    )
}

export const RenderContentElement = (paragraphInfo: ArticleContentDataType) => {
    return (
        <View style={{ backgroundColor: Styles.color.greenishBlue, paddingVertical: 20 }}>
            {renderWebView(paragraphInfo.content)}
        </View>
    )
}

export const RenderDescriptionElement = ({ paragraphInfo }: { paragraphInfo: ArticleDescriptionDataType }) => {
    const style = useThemeAwareObject(customStyle)

    const { themeData } = useTheme()

    var injectedStyle = `
    setTimeout(function() {   
        //Description Element
        var descriptionText = document.getElementsByTagName("p");
        window.ReactNativeWebView.postMessage(descriptionText.length)
        if(descriptionText && descriptionText.length > 0) {
            for(i=0; i < descriptionText.length; i++) {
                descriptionText[i].style["font-size"] = "inherit";
                descriptionText[i].style["font-family"] = "inherit";
                descriptionText[i].style["direction"] = "rtl"
                descriptionText[i].style["line-height"] = "inherit";
                descriptionText[i].style["text-align"] = "justify";  
                descriptionText[i].style["color"] = "${themeData.primaryBlack}";
            } 
        }
    }, ` + 0 + `)
    `

    return (
        <View style={style.descriptionContainer}>
            {/* <TitleWithUnderLine title={'CONST_FACTS'} titleContainerStyle={{ backgroundColor: themeData.backgroundColor }} /> */}
            {renderWebView(paragraphInfo.description, injectedStyle)}
        </View>
    )
}

export const RenderOpinionElement = (paragraphInfo: ArticleOpinionDataType) => {
    return (
        <View style={{ backgroundColor: Styles.color.greenishBlue, paddingVertical: 20 }}>
            {renderWebView(paragraphInfo.opinion)}
        </View>
    )
}

export const RenderReadAlsoElement = (paragraphInfo: ArticleReadAlsoDataType) => {
    if (!isNonEmptyArray(paragraphInfo.related_content)) {
        return null
    }

    return (
        <View style={{ backgroundColor: Styles.color.greenishBlue }}>
            <ReadAlsoArticle title={paragraphInfo.title} data={Array(5).fill({ title: "This is read also title :::", nid: '123456' })} />
        </View>
    )
}

export const RenderNumberElement = ({ paragraphInfo }: { paragraphInfo: ArticleNumberDataType }) => {
    const style = useThemeAwareObject(customStyle)
    const CONST_FACTS = TranslateConstants({ key: TranslateKey.RICH_HTML_FACTS })

    const { themeData } = useTheme()

    var injectedStyle = `
    setTimeout(function() {   
        //Description Element
        var descriptionText = document.getElementsByTagName("p");
        window.ReactNativeWebView.postMessage(descriptionText.length)

        if(descriptionText && descriptionText.length > 0) {
            for(i=0; i < descriptionText.length; i++) {
                descriptionText[i].style["font-size"] = "inherit";
                descriptionText[i].style["font-family"] = "inherit";
                descriptionText[i].style["direction"] = "rtl"
                descriptionText[i].style["line-height"] = "inherit";
                descriptionText[i].style["text-align"] = "justify";  
                descriptionText[i].style["color"] = "${themeData.primaryBlack}";
            } 
        }
    }, ` + 0 + `)
    `

    return (
        <View style={style.descriptionContainer}>
            <TitleWithUnderLine title={CONST_FACTS} />
            <View style={style.numberBodyMainContainer}>
                <View style={style.numberBodyContainer}>
                    <Label children={paragraphInfo.title} style={style.numberTitle} />
                    {renderWebView(paragraphInfo.description, injectedStyle)}
                </View>
            </View>
        </View>
    )
}

const renderWebView = (htmlInfo: string, injectedStyle?: string) => {
    return (
        <AutoHeightWebView style={{ width: '100%', backgroundColor: 'transparent' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            bounces={false}
            nestedScrollEnabled={false}
            injectedJavaScript={injectedStyle}
            injectedJavaScriptBeforeContentLoaded={injectedStyle}
            onMessage={onMessage}
            source={{ html: htmlInfo }}
            scrollEnabled={false}
            onNavigationStateChange={onNavigationStateChange}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        />
    )
}

const onMessage = (event: WebViewMessageEvent) => {
    console.log('Event :::::::', event.nativeEvent.data)
}

const onNavigationStateChange = (event: WebViewNavigation) => {
    // console.log("🚀 ~ file: ArticleDetailRichHtmlContent.tsx ~ line 77 ~ onNavigationStateChange ~ event", event)
}

const onShouldStartLoadWithRequest = (request: any) => {
    // console.log("🚀 ~ file: ArticleDetailRichHtmlContent.tsx ~ line 81 ~ onShouldStartLoadWithRequest ~ request", request)
    return true
}


const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    quoteContainer: {
        backgroundColor: theme.secondaryGreen,
        paddingVertical: 10,
        height: 'auto',
        marginBottom: 20,
    },
    upperArrow: {
        textAlign: 'left',
        paddingLeft: 30,
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
        paddingTop: 20
    },
    bottomArrow: {
        paddingLeft: 30,
        fontSize: 40,
        lineHeight: 45,
        fontWeight: 'bold',
        color: Styles.color.greenishBlue,
    },
    quoteTitle: {
        color: Styles.color.greenishBlue,
        fontFamily: fonts.Effra_Arbc_Medium,
        fontSize: 14,
        lineHeight: 18,
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
        fontSize: 40,
        lineHeight: 50,
        textAlign: 'left',
        color: Styles.color.greenishBlue,
        fontWeight: 'bold',
        paddingBottom: 20,
    }
})

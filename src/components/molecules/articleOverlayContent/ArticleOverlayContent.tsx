import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArticleFooter } from 'src/components/molecules'
import { Label, LabelTypeProp, AdvertisedContentLabel } from 'src/components/atoms'
import { ArticleFooterProps } from 'src/components/molecules/articleFooter/ArticleFooter'
import { isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { fonts } from 'src/shared/styles/fonts'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { dateTimeAgo, decodeHTMLTags, TimeIcon } from 'src/shared/utils/utilities'
import { decode } from 'html-entities'

const articleDetailFooterData: ArticleFooterProps = {
    leftTitleColor: Styles.color.white,
    leftIcon: () => {
        return getSvgImages({
            name: ImagesName.clock,
            size: normalize(12),
            style: { marginRight: normalize(7) }
        })
    },
    rightTitleColor: Styles.color.white,
    hideBookmark: true,
    leftTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular, fontSize: 12, lineHeight:20 },
    rightTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular, fontSize: 12, lineHeight: 20 }
}

export interface ArticleOverlayContentProps {
    category?: string,
    title?: string,
    containerStyle?: ViewStyle,
    author: string,
    created: string,
    subtitle?: string, 
    showFooter?: boolean,
    isAd?: boolean
}

export const ArticleOverlayContent = ({
    title, created, subtitle, showFooter = true, isAd = false
}: ArticleOverlayContentProps) => {
    const { themeData } = useTheme()
    const imageArticleStyle = useThemeAwareObject(customStyle)
    const textColor =  themeData.primaryBlack
    const footerTextColor = themeData.footerTextColor
    articleDetailFooterData.leftTitleColor = footerTextColor
    articleDetailFooterData.rightTitleColor = footerTextColor
    const timeFormat = dateTimeAgo(created)

    return (
        <View>
            <Label labelType={LabelTypeProp.h1}
                children={decodeHTMLTags(decode(title))}
                color={textColor}
                style={imageArticleStyle.title} />
            {isNotEmpty(subtitle) &&
                <Label
                    numberOfLines={3}
                    children={decodeHTMLTags(decode(subtitle))}
                    color={textColor}
                    style={imageArticleStyle.subtitle}
                />
            }
            {showFooter && <ArticleFooter {...articleDetailFooterData} isDetail={true}
                // rightTitle={decodeHTMLTags(decode(author))} 
                leftTitle={timeFormat.time}
                leftIcon={() => TimeIcon(timeFormat.icon)}
            />}
            { !isTab &&
                <AdvertisedContentLabel isAd={isAd}/>
            }
        </View>
    )
}

const customStyle = (theme:CustomThemeType) => StyleSheet.create({
    title: {
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: isTab ? 33 : 30,
        lineHeight: isTab ? 46 : 42,
        textAlign: 'left',
        color: theme.primaryBlack,
        paddingBottom: normalize(5),
        paddingTop: normalize(15),
    },
    subtitle: {
        fontFamily: fonts.AwsatDigital_Regular,
        fontSize: 21,
        lineHeight: 33,
        textAlign: 'left',
        color: theme.primaryBlack,
        paddingBottom: normalize(10),
    }
})

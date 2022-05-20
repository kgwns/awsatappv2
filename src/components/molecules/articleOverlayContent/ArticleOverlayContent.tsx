import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArticleFooter } from 'src/components/molecules'
import { Label, LabelTypeProp } from 'src/components/atoms'
import { articleFooterProps } from 'src/components/molecules/articleFooter/ArticleFooter'
import { isNotEmpty, normalize, timeAgo } from 'src/shared/utils'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { fonts } from 'src/shared/styles/fonts'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'

const articleDetailFooterData: articleFooterProps = {
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
    leftTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular },
    rightTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular }
}

export interface ArticleOverlayContentProps {
    category?: string,
    title?: string,
    containerStyle?: ViewStyle,
    author: string,
    created: string,
    subtitle?: string 
}

export const ArticleOverlayContent = ({
    category, title, author, created, subtitle
}: ArticleOverlayContentProps) => {
    const [t] = useTranslation();
    
    const { themeData } = useTheme()
    const imageArticleStyle = useThemeAwareObject(customStyle)
    const textColor =  themeData.primaryBlack
    const footerTextColor = themeData.secondaryMediumGrey
    articleDetailFooterData.leftTitleColor = footerTextColor
    articleDetailFooterData.rightTitleColor = footerTextColor

    return (
        <View>
            {isNotEmpty(category) &&
                <View style={imageArticleStyle.tagNameViewStyle}>
                    <Label labelType={LabelTypeProp.h3} children={category}
                        color={Styles.color.white} style={imageArticleStyle.tagNameStyle}
                    />
                </View>
            }
            <Label labelType={LabelTypeProp.h1}
                children={title}
                color={textColor}
                style={imageArticleStyle.title} />
            <Label
                numberOfLines={2} 
                children={subtitle}
                color={textColor}
                style={imageArticleStyle.subtitle} />
            <ArticleFooter {...articleDetailFooterData} isDetail={true} rightTitle={author} leftTitle={t(timeAgo(created))} />
        </View>
    )
}

const customStyle = (theme:CustomThemeType) => StyleSheet.create({
    tagNameViewStyle: {
        opacity: 0.7,
        flexWrap: 'wrap'
    },
    tagNameStyle: {
        paddingHorizontal: normalize(10),
        backgroundColor: Styles.color.darkGreenishBlue,
        flexWrap: 'wrap',
        fontFamily: fonts.Effra_Arbc_Regular,
    },
    title: {
        fontFamily: fonts.AwsatDigitalBetav10_Bold,
        fontSize: normalize(30),
        lineHeight: normalize(33),
        textAlign: 'left',
        color: theme.primaryBlack,
        paddingBottom: normalize(5),
        paddingTop: normalize(15),
    },
    subtitle: {
        fontFamily: fonts.AwsatDigitalBetav10_Regular,
        fontSize: normalize(21),
        lineHeight: normalize(33),
        textAlign: 'left',
        color: theme.primaryBlack,
        paddingBottom: normalize(10),
    }
})

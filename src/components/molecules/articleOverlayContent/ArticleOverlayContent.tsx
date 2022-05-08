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
    leftTitleStyle: { fontFamily: fonts.Effra_Arbc_Regular },
    rightTitleStyle: { fontFamily: fonts.Effra_Arbc_Regular }
}

export interface ArticleOverlayContentProps {
    category?: string,
    title?: string,
    containerStyle?: ViewStyle,
    author: string,
    created: string
}

export const ArticleOverlayContent = ({
    category, title, author, created
}: ArticleOverlayContentProps) => {
    const [t] = useTranslation();
    
    const { themeData } = useTheme()
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
                style={{ paddingBottom: normalize(5), paddingTop: normalize(15), fontFamily: fonts.AwsatDigitalBetav10_Bold }} />
            <ArticleFooter {...articleDetailFooterData} rightTitle={author} leftTitle={t(timeAgo(created))} />
        </View>
    )
}

const imageArticleStyle = StyleSheet.create({
    tagNameViewStyle: {
        opacity: 0.7,
        flexWrap: 'wrap'
    },
    tagNameStyle: {
        paddingHorizontal: normalize(10),
        backgroundColor: Styles.color.darkGreenishBlue,
        flexWrap: 'wrap',
        fontFamily: fonts.Effra_Arbc_Regular,
    }
})

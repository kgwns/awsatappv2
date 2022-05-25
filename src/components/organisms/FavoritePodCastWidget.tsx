import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize, screenWidth } from 'src/shared/utils'
import { Divider, Image } from 'src/components/atoms'
import { Label, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { ImageResize } from 'src/shared/styles/text-styles';
import { DetailPodCastFooter } from 'src/components/molecules'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useTranslation } from 'react-i18next'
import { decodeHTMLTags, getSecondsToHms } from 'src/shared/utils/utilities'
import { CustomThemeType } from 'src/shared/styles/colors'
import { fonts } from 'src/shared/styles/fonts'


export interface ArticlePodCastWidgetProps {
    imageUrl: string
    title: string
    body: string
    podcastHeader: string
    allEpisodes: string
    tagName: string
    timeDuration: string
    rightTitle: string,
    isBookmarked: boolean,
    onPressBookmark: () => void,
    onPress: () => void
}

const ArticlePodCastWidget = ({
    imageUrl,
    title,
    body,
    timeDuration,
    rightTitle,
    isBookmarked,
    onPressBookmark,
    onPress
}: ArticlePodCastWidgetProps) => {
    const [t] = useTranslation()
    const style = useThemeAwareObject(customStyle)
    const { themeData } = useTheme()
    return (
        <TouchableOpacity style={style.container} onPress={onPress}>
            <View style={style.topViewContainer}>
                <View style={style.leftContainer}>
                    <Label labelType={LabelTypeProp.h1} children={title} color={themeData.primaryBlack} style={style.title} numberOfLines={1} />
                    <Label labelType={LabelTypeProp.h3} children={decodeHTMLTags(body)} color={themeData.secondaryDavyGrey} style={style.body} numberOfLines={2} />
                </View>
                <Image style={style.imageContainer} url={imageUrl} resizeMode={ImageResize.COVER} />
            </View>
            <DetailPodCastFooter leftTitle={t('podcastHome.listen_to_podcast')}
                leftTitleColor={themeData.primary}
                leftTimeLabel={getSecondsToHms(timeDuration)}
                leftTimeLabelColor={Styles.color.spanishGray}
                rightTitle={rightTitle}
                rightIconColor={themeData.primaryBlack}
                rightTitleColor={themeData.primaryBlack}
                isBookmarked={isBookmarked}
                onPressBookmark={onPressBookmark}
                onPress={onPress}
            />
            <Divider style={style.divider} />
        </TouchableOpacity>
    )
}

export default ArticlePodCastWidget
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: normalize(10),
        paddingHorizontal: normalize(0.04 * screenWidth)
    },
    topViewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        width: normalize(92),
        height: normalize(73)
    },
    title: {
        fontSize: 16,
        lineHeight: 36,
        fontFamily: fonts.AwsatDigitalBetav10_Bold
    },
    body: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fonts.Effra_Arbc_Regular
    },
    leftContainer: {
        flex: 1,
        paddingRight: normalize(10),
    },
    divider: {
        height: 1,
        backgroundColor: theme.dividerColor
    },
})

import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize, screenWidth } from 'src/shared/utils'
import { Image } from 'src/components/atoms'
import { Label, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { ImageResize } from 'src/shared/styles/text-styles';
import { DetailPodCastFooter } from 'src/components/molecules'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useTranslation } from 'react-i18next'
import { getSecondsToHms } from 'src/shared/utils/utilities'


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
            <View style={{ flexDirection: 'row' }}>
                <View style={{paddingRight: normalize(10)}}>
                    <Label labelType={LabelTypeProp.h1} children={title} color={themeData.primaryBlack} style={style.titleContainer} numberOfLines={1}/>
                    <Label labelType={LabelTypeProp.h3} children={body} color={themeData.secondaryDavyGrey} style={style.bodyContainer} numberOfLines={2} />
                </View>
                <Image style={style.imageContainer} url={imageUrl} resizeMode={ImageResize.COVER} />
            </View>
            <DetailPodCastFooter leftTitle={t('listen_to_podcast')}
                leftTitleColor={themeData.primary}
                leftTimeLabel={getSecondsToHms(timeDuration)}
                leftTimeLabelColor={Styles.color.spanishGray}
                rightTitle={rightTitle}
                rightIconColor={themeData.primaryBlack}
                rightTitleColor={themeData.primaryBlack}
                isBookmarked={isBookmarked}
                onPressBookmark={onPressBookmark}
            />
        </TouchableOpacity>
    )
}

export default ArticlePodCastWidget
const customStyle = (theme: CustomThemeType) => {
    const detailPodCastStyle = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.secondaryWhite,
            height: normalize(120),
            paddingTop: normalize(10),
            paddingHorizontal: 0.04 * screenWidth
        },
        imageContainer: {
            width: normalize(92),
            height: normalize(73)
        },
        titleContainer: {
            fontSize: normalize(15),
            width: normalize(240)
        },
        bodyContainer: {
            fontSize: normalize(13),
            width: normalize(240)
        }
    })
    return detailPodCastStyle
}

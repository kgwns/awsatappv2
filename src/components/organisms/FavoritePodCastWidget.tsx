import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { isTab, normalize, screenWidth } from 'src/shared/utils'
import { Divider, Image, Label, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { ImageResize } from 'src/shared/styles/text-styles';
import { DetailPodCastFooter } from 'src/components/molecules'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { convertSecondsToHMS, getString, isNotEmpty, isObjectNonEmpty } from 'src/shared/utils/utilities'
import { CustomThemeType } from 'src/shared/styles/colors'
import { fonts } from 'src/shared/styles/fonts'
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService'
import { TranslateConstants, TranslateKey } from '../../constants/Constants'


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
    onPress: () => void,
    spreakerEpisode: string
}

const ArticlePodCastWidget = ({
    imageUrl,
    title,
    body,
    spreakerEpisode,
    rightTitle,
    isBookmarked,
    onPressBookmark,
    onPress
}: ArticlePodCastWidgetProps) => {
    const PODCAST_HOME_LISTEN_TO_PODCAST = TranslateConstants({key:TranslateKey.PODCAST_HOME_LISTEN_TO_PODCAST})
    const style = useThemeAwareObject(customStyle)
    const { themeData } = useTheme()
    const [duration, setDurartion] = useState(0)

    useEffect(() => {
        getPodcastDuration()
    },[])
    
    const getPodcastDuration = async () => {
            if(isNotEmpty(spreakerEpisode)){
              try {
                const response: any = await fetchSingleEpisodeSpreakerApi({ episodeId: spreakerEpisode })
                if (isObjectNonEmpty(response.response) && isObjectNonEmpty(response.response.episode)) {
                  const episode = response.response.episode
                  setDurartion( Math.floor(episode.duration / 1000) )
                }
              }catch(error){
                setDurartion(0)
              }
        }
    }

    const containerStyle = isTab ? style.containerTab : style.container;
    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <View style={style.topViewContainer}>
                <View style={style.leftContainer}>
                    <Label labelType={LabelTypeProp.h1} children={getString(title)} color={themeData.primaryBlack} style={style.title} numberOfLines={1} />
                    <Label labelType={LabelTypeProp.h3} children={getString(body)} color={themeData.secondaryDavyGrey} style={style.body} numberOfLines={2} />
                </View>
                <Image style={style.imageContainer} url={imageUrl} resizeMode={ImageResize.COVER} />
            </View>
            <DetailPodCastFooter leftTitle={PODCAST_HOME_LISTEN_TO_PODCAST}
                leftTitleColor={themeData.primary}
                leftTimeLabel={convertSecondsToHMS(duration)}
                leftTimeLabelColor={Styles.color.spanishGray}
                rightTitle={rightTitle}
                rightIconColor={themeData.primaryBlack}
                rightTitleColor={themeData.primaryBlack}
                isBookmarked={isBookmarked}
                onPressBookmark={onPressBookmark}
                onPress={onPress}
            />
            {!isTab && <Divider style={style.divider} />}
        </TouchableOpacity>
    )
}

export default ArticlePodCastWidget
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: normalize(10),
        paddingHorizontal: 0.04 * screenWidth,
    },
    containerTab: {
        paddingVertical: normalize(10),
        paddingHorizontal: 0.025 * screenWidth,
        backgroundColor: theme.secondaryWhite,
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
        fontFamily: fonts.AwsatDigital_Bold
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

import React, { useEffect, useState } from 'react'
import { View, StyleSheet,TouchableOpacity } from 'react-native'
import { ButtonImage, Image, Label, LabelTypeProp } from '../atoms'
import { isNonEmptyArray, isObjectNonEmpty, normalize, isNotEmpty } from '../../shared/utils'
import { ImagesName, Styles } from '../../shared/styles'
import { isTab } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { useTranslation } from 'react-i18next'
import AuthorDefault from 'src/assets/images/icons/authorDefault.svg';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';
import { useOpinionArticleDetail } from 'src/hooks/useOpinionArticleDetail';
import { getSecondsToHms } from 'src/shared/utils/utilities'

export interface AuthorItemProps {
    author: string,
    authorId: string,
    body: string,
    duration: string | null,
    image: string,
    index?: number,
    nid?: string,
    mediaVisibility: boolean,
    jwPlayerID?: string | null
    togglePlayback?: (nid: string, mediaData: any)=> void,
    selectedTrack?: string,
    selectedType?: string,
}

const AuthorItem = ({
    author,
    authorId,
    body,
    duration,
    image,
    index,
    nid,
    mediaVisibility,
    jwPlayerID = null,
    togglePlayback,
    selectedTrack,
    selectedType
}: AuthorItemProps) => {
    const { themeData } = useTheme()
    const [t] = useTranslation();
    const style = useThemeAwareObject(customStyle);
    const navigation = useNavigation<StackNavigationProp<any>>()
    const playbackState = usePlaybackState();
    const { narratedOpinionData, fetchNarratedOpinionData} = useOpinionArticleDetail();
    const[mediaData, setMediaData] = useState<any>({});
    const[timeDuration, setTimeDuration] = useState<any>(null);
  
    useEffect(() => {
        if(jwPlayerID){
          fetchNarratedOpinionData({jwPlayerID: jwPlayerID})
        }
    }, [])
  
    useEffect(() => {
        if(isObjectNonEmpty(narratedOpinionData)){
          setMediaData(narratedOpinionData);
          let playList = isNonEmptyArray(narratedOpinionData.playlist) ? narratedOpinionData.playlist[0] : null;
            if(playList){
            let time = playList.duration? getSecondsToHms(playList.duration) : null;
            setTimeDuration(time)
            } 
        }
    }, [narratedOpinionData])
    
    const onPress = () => {
        if (nid) {
            navigation.navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid:nid})
        }
    }

    const onPressPlay = () => {
        if (nid && mediaData && togglePlayback) {
          togglePlayback(nid, mediaData)
        }
      }
    const onPressWriter = (tid: string) => {
        if (isNotEmpty(tid)) {
            navigation.navigate(ScreensConstants.WRITERS_DETAIL_SCREEN, { tid })
        }
    }

    return (
        <TouchableOpacity key={index} style={[style.container, isTab && { paddingRight: 20 }]} onPress={onPress}>
            <View style={{ flex: 1 }}>
                <Label children={author} labelType={LabelTypeProp.p4}
                    color={themeData.authorTitle} numberOfLines={1} onPress={() => onPressWriter(authorId)} />
                <Label children={body} labelType={LabelTypeProp.h3}
                    numberOfLines={2} style={style.body} />
                {mediaVisibility && <View style={style.mediaFooter}>
                    <ButtonImage
                    icon={() =>
                        playbackState === State.Playing && selectedType == 'OPINION' && selectedTrack == nid ? getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                        getSvgImages({name: ImagesName.playIconSVG, size: normalize(12)})
                      }
                    onPress={onPressPlay} />
                    <Label children={t('opinion.listenToActicleText')} style={style.articleLabelSyle}
                        labelType={LabelTypeProp.h3} color={themeData.primary} />
                    { timeDuration && <Label children={timeDuration} style={style.durationLabel} /> }
                </View>}
            </View>
            <View>
                <Image url={image} size={normalize(80)} resizeMode={'cover'} type={'round'}
                    fallback={true}
                    fallbackContent={<AuthorDefault
                    style={{backgroundColor:Styles.color.cyanGreen}}
                    width={normalize(80)} 
                    height={normalize(80)}/>}
                    onPress={() => onPressWriter(authorId)}
                />
            </View>
        </TouchableOpacity>
    )
}

export default AuthorItem

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body: {
        paddingVertical: normalize(10),
        paddingRight: normalize(5)
    },
    durationLabel: {
        paddingHorizontal: normalize(10),
        color: Styles.color.spanishGray
    },
    articleLabelSyle: {
        paddingHorizontal: normalize(10),
        color: theme.primary

    },
    mediaFooter: {
        flexDirection: 'row',
        alignItems: 'center' 
    }
})

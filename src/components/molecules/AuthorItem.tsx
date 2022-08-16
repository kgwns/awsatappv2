import React, { useEffect, useState } from 'react'
import { View, StyleSheet,TouchableOpacity } from 'react-native'
import { ButtonImage, Image, Label, LabelTypeProp } from '../atoms'
import { isNonEmptyArray, isObjectNonEmpty, normalize, isNotEmpty, isIOS } from '../../shared/utils'
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
import TrackPlayer, { State, usePlaybackState, } from 'react-native-track-player';
import { convertSecondsToHMS } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts'
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';
import { useAppPlayer } from 'src/hooks'

enum LabelsType  {
    title = 'title',
    authorName = 'authorName'
}

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
    renderLabelsOrder?: any,
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
    selectedType,
    renderLabelsOrder = [LabelsType.authorName,LabelsType.title]
}: AuthorItemProps) => {
    const { themeData } = useTheme()
    const [t] = useTranslation();
    const style = useThemeAwareObject(customStyle);
    const navigation = useNavigation<StackNavigationProp<any>>()
    const playbackState = usePlaybackState();
    const[mediaData, setMediaData] = useState<any>({});
    const[timeDuration, setTimeDuration] = useState<any>(null);

    const { setShowMiniPlayer, setPlayerTrack, selectedTrack: trackData, showMiniPlayer } = useAppPlayer()
  
    useEffect(() => {
        if(jwPlayerID){
          getNarratedOpinion()
        }
    }, [])

    const getNarratedOpinion = async() => {
        try {
          const opinionData = await fetchNarratedOpinionArticleApi({jwPlayerID: jwPlayerID})
          if(isObjectNonEmpty(opinionData)){
            setMediaData(opinionData);
            const playList = isNonEmptyArray(opinionData.playlist) ? opinionData.playlist[0] : null;
              if(playList){
              const time = playList.duration? convertSecondsToHMS(playList.duration) : null;
              setTimeDuration(time)
              } 
          }
        } catch (error) {
          const errorResponse: AxiosError = error as AxiosError;
          if (errorResponse.response) {
            const errorMessage: { message: string } = errorResponse.response.data;
          }
        }
      }
 
    
    const onPress = () => {
        if (nid) {
            navigation.navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid:nid})
        }
    }

    const onPlayPausePress = async (playbackState: any) => {
        const state = await TrackPlayer.getState()
    
        if(trackData != null){
            if(state == State.Paused){
                await TrackPlayer.play()
            }else{
                await TrackPlayer.pause()
            }
        }
    };
    
    const onPressPlay = () => {
      console.log('onPressPlay');
      if (nid && isObjectNonEmpty(mediaData)) {
        const playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};
    
        if (!isObjectNonEmpty(playList)) {
          return
        }
    
        const trackPlayerData = {
          id: nid + 'opinion',
          url: playList.sources[0]?.file ? playList.sources[0]?.file : '',
          title: isNotEmpty(body) ? body : '',
          duration: playList.duration? convertSecondsToHMS(playList.duration) : 0,
          artist: mediaData.title ? mediaData.title : '',
          artwork: image
        }
    
        if((trackData && trackData.id != trackPlayerData.id) || trackData == null ){
          setPlayerTrack(trackPlayerData);
          !showMiniPlayer && setShowMiniPlayer(true);
        }else{
          showMiniPlayer ? onPlayPausePress(playbackState) : setShowMiniPlayer(true);
          
        }
        
      }
      // Older Opinion Implementation for reference
      // if (nid && mediaData && togglePlayback) {
      //   togglePlayback(nid, mediaData)
      // }
    }
    const onPressWriter = (tid: string) => {
        if (isNotEmpty(tid)) {
            navigation.navigate(ScreensConstants.WRITERS_DETAIL_SCREEN, { tid })
        }
    }

    const renderLabels = () => {
      return renderLabelsOrder.map((item: LabelsType, index: number) => {
        switch (item) {
          case LabelsType.authorName:
            return (
                <Label 
                  key={index}
                  children={author}
                  labelType={LabelTypeProp.p4}
                  style={style.authorTitle}
                  testID={'AutherItemLabel1'}
                  color={themeData.authorTitle}
                  numberOfLines={1}
                  onPress={() => onPressWriter(authorId)}
                  suppressHighlighting={true}
                />
            );
          case LabelsType.title:
            return (
                <Label
                  key={index}
                  children={body}
                  labelType={LabelTypeProp.h3}
                  numberOfLines={2}
                  style={style.body}
                />
            );
          default:
            return null;
        }
      });
    };

    return (
        <TouchableOpacity testID='AutherItemTO1' key={index} style={[style.container, isTab && { paddingRight: 20 }]} onPress={onPress}>
            <View style={{ flex: 1 }}>
                {renderLabels()}
                {mediaVisibility && <View style={style.mediaFooter}>
                    <TouchableOpacity testID='AutherItemTO2' onPress={onPressPlay} style={style.mediaFooter}>
                        <ButtonImage
                        icon={() =>
                            trackData && trackData.id == (nid+'opinion') && playbackState === State.Playing ? getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                            getSvgImages({name: ImagesName.playIconSVG, size: normalize(12)})
                        }
                        onPress={onPressPlay} />
                        <Label children={t('opinion.listenToActicleText')} style={style.articleLabelSyle}
                        labelType={LabelTypeProp.h3} color={themeData.primary} />
                    </TouchableOpacity>
                    { timeDuration && <Label children={timeDuration} style={style.durationLabel} /> }
                </View>}
            </View>
            <View>
                <TouchableOpacity testID='AutherItemTO3' onPress={() => onPressWriter(authorId)}>
                    <Image url={image} size={normalize(80)} resizeMode={'cover'} type={'round'}
                        fallback={true}
                        fallbackContent={<AuthorDefault
                        style={{backgroundColor:Styles.color.cyanGreen}}
                        width={normalize(80)} 
                        height={normalize(80)}/>}
                        fallbackName={ImagesName.authorDefault}
                    />
                </TouchableOpacity>
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
        color: theme.primary,
        fontFamily: fonts.AwsatDigital_Regular,
        lineHeight: isIOS ? 36 : 25,
    },
    mediaFooter: {
        flexDirection: 'row',
        alignItems: 'center' 
    },
    authorTitle: {
        fontSize: 14,
        lineHeight:22,
        fontFamily: fonts.IBMPlexSansArabic_Regular
    }
})

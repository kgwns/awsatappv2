import React, { useEffect, useState } from 'react'
import { View, StyleSheet,TouchableOpacity } from 'react-native'
import { ButtonImage} from 'src/components/atoms/button-image/ButtonImage'
import { Image} from 'src/components/atoms/image/Image'
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { isNonEmptyArray, isObjectNonEmpty, normalize, isNotEmpty, isIOS } from '../../shared/utils'
import { ImagesName, Styles } from '../../shared/styles'
import { isTab } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import TrackPlayer, { State, usePlaybackState, } from 'react-native-track-player';
import { convertSecondsToHMS, isDarkTheme } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts'
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';
import { useAppCommon, useAppPlayer } from 'src/hooks'
import { Divider } from '../atoms'

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
    showDivider?: boolean,
    showInMainScreen?: boolean
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
    showDivider,
    showInMainScreen = false,
    renderLabelsOrder = [LabelsType.authorName,LabelsType.title]
}: AuthorItemProps) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle);
    const navigation = useNavigation<StackNavigationProp<any>>()
    const playbackState = usePlaybackState();
    const[mediaData, setMediaData] = useState<any>({});
    const[timeDuration, setTimeDuration] = useState<any>('');
    const [prevPlayBackState, setPrevPlayBackState] = useState<State | null>(null);
    const [isBuffering, setIsBuffering] = useState<boolean>(false);
    const {theme} = useAppCommon();
    const isDarkMode = isDarkTheme(theme);
    const { setShowMiniPlayer, setPlayerTrack, selectedTrack: trackData, showMiniPlayer } = useAppPlayer()
    const CONST_OPINION_LISTEN_TO_ARTICLE_LIST = TranslateConstants({key:TranslateKey.OPINION_LISTEN_TO_ARTICLE_LIST})
    useEffect(() => {
        if(jwPlayerID){
          getNarratedOpinion()
        }
    }, [])

    useEffect(() => {
      if (trackData && trackData.id === (nid+'opinion') && prevPlayBackState === State.Playing && playbackState === State.Buffering) {
        setIsBuffering(true);
      } else {
        setIsBuffering(false);
      }
      setPrevPlayBackState(playbackState);
    }, [playbackState])

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
            console.log(errorMessage,'errorMessage');
          }
        }
      }
 
    
    const onPress = () => {
        if (nid) {
            navigation.navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid:nid})
        }
    }

    const onPlayPausePress = async () => {
        const state = await TrackPlayer.getState()
        if(trackData != null){
            if(state === State.Paused){
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
        if((trackData && trackData.id !== trackPlayerData.id) || trackData == null ){
          setPlayerTrack(trackPlayerData);
          !showMiniPlayer && setShowMiniPlayer(true);
        }else{
          showMiniPlayer ? onPlayPausePress() : setShowMiniPlayer(true);
          
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
      return renderLabelsOrder.map((item: LabelsType, indexKey: number) => {
        switch (item) {
          case LabelsType.authorName:
            return (
                <Label 
                  key={indexKey}
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
              <TouchableOpacity key={indexKey} onPress={onPress} testID = "titleId">
                <Label
                  children={body}
                  labelType={LabelTypeProp.h3}
                  numberOfLines={2}
                  style={style.body}
                />
              </TouchableOpacity>
            );
          default:
            return null;
        }
      });
    };
    return (
        showInMainScreen ? 
        <View style = {style.tabAuthorContainer}>
          <View testID='AutherItemTO1' key={index} style={[style.tabContainer]} >
            <View style={style.tabContentContainer}>
              <TouchableOpacity key={`indexKey${index}`} onPress={onPress} testID = "titleId">
                  <Label
                    children={body}
                    numberOfLines={2}
                    style={style.tabletBody}
                    color={themeData.primaryBlack}
                  />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity testID='AutherItemTO3' onPress={() => onPressWriter(authorId)}>
                    <Image url={image} size={normalize(80)} resizeMode={'cover'} type={'round'}
                        fallback={true}
                        fallbackName={ImagesName.authorDefault} 
                    />
                </TouchableOpacity>
            </View>
        </View>
        <View style = {style.tabFooterContainer}>
          {mediaVisibility && <View style={style.tabMediaFooter}>

              <TouchableOpacity testID={'AutherItemTO2'} onPress={onPressPlay} style={style.tabMediaFooter}>
                <ButtonImage
                  icon={() =>
                    trackData && trackData.id === (nid + 'opinion') &&
                      playbackState === State.Playing || isBuffering ?
                      getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                      getSvgImages({ name: ImagesName.playIconSVG, size: normalize(12) })
                  }
                  onPress={onPressPlay} />
                {isNotEmpty(timeDuration) && <Label children={timeDuration} style={style.tabDurationLabel} />}

                <Label children={CONST_OPINION_LISTEN_TO_ARTICLE_LIST} color={ isDarkMode ? themeData.summaryColor : Styles.color.green600}  style={style.tabArticleLabelSyle} />
              </TouchableOpacity>

            </View>}

           <Label
              key={`title${index}`}
              children={author}
              style={style.tabAuthorTitle}
              testID={'AutherItemLabel1'}
              color={themeData.primary}
              numberOfLines={1}
              onPress={() => onPressWriter(authorId)}
              suppressHighlighting={true}
            />
              
        </View>
        {showDivider && <Divider style = {style.tabDivider} />}
        </View>
        :
        <View testID='AutherItemTO1' key={index} style={[style.container, isTab && { paddingRight: 20 }]} >
            <View style={style.contentContainer}>
                {renderLabels()}
                {mediaVisibility && <View style={style.mediaFooter}>
                    <TouchableOpacity testID='AutherItemTO2' onPress={onPressPlay} style={style.mediaFooter}>
                        <ButtonImage
                        icon={() =>
                            trackData && trackData.id === (nid+'opinion') && 
                            playbackState === State.Playing || isBuffering ? 
                            getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                            getSvgImages({name: ImagesName.playIconSVG, size: normalize(12)})
                        }
                        onPress={onPressPlay} />
                        <Label children={CONST_OPINION_LISTEN_TO_ARTICLE_LIST} style={style.articleLabelSyle}
                        labelType={LabelTypeProp.h3} color={themeData.primary} />
                    </TouchableOpacity>
                    { timeDuration && <Label children={timeDuration} style={style.durationLabel} /> }
                </View>}
            </View>
            <View>
                <TouchableOpacity testID='AutherItemTO3' onPress={() => onPressWriter(authorId)}>
                    <Image url={image} size={normalize(80)} resizeMode={'cover'} type={'round'}
                        fallback={true}
                        fallbackName={ImagesName.authorDefault} 
                    />
                </TouchableOpacity>
            </View>
        </View>
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
        paddingRight: normalize(5),
    },
    durationLabel: {
      fontSize: isTab ? 13 : 12,
      lineHeight: 36,
      color: theme.secondaryDavyGrey,
      fontFamily: fonts.Effra_Arbc_Medium,
      marginBottom: isIOS ? 3: 0
    },
    articleLabelSyle: {
        paddingHorizontal: normalize(10),
        color: theme.primary,
        fontFamily: fonts.AwsatDigital_Regular,
        fontSize: 13,
        lineHeight: 36,
    },
    mediaFooter: {
        flexDirection: 'row',
        alignItems: 'center' 
    },
    authorTitle: {
      fontSize: 14,
      lineHeight:22,
      fontFamily: fonts.IBMPlexSansArabic_Regular,
    },
    tabAuthorTitle: {
      fontSize: 14,
      lineHeight:22,
      fontFamily: fonts.Effra_Regular,
      marginLeft:'auto',
    },
    contentContainer: {
      flex: 1
    },
    tabContainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems:'flex-start',
    },
    tabContentContainer: {
      flex: 1,
      alignItems:'flex-start',
    },
    tabletBody: {
      fontSize: 16,
      fontFamily: fonts.AwsatDigital_Bold,
      fontWeight: '700',
      lineHeight: 26
  },
  tabArticleLabelSyle: {
    fontFamily: fonts.AwsatDigital_Regular,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 28,
  },
  tabMediaFooter: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexWrap:'wrap'
  },
  tabDurationLabel: {
    fontSize: 13,
    lineHeight: 28,
    color: theme.primary,
    fontFamily: fonts.Effra_Arbc_Medium,
    marginBottom: isIOS ? 3: 0,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: '500'
  },
  tabAuthorContainer: {
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
  },
  tabFooterContainer: {
    marginTop:10,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row-reverse',
    flexWrap:'wrap',
  },
  tabDivider:{
    marginBottom:10,
    height: 1,
    backgroundColor: Styles.color.lightAlterGray,
  },
})

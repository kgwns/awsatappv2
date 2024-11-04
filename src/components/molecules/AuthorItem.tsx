import React, { useEffect, useState } from 'react'
import { View, StyleSheet,TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
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
import { convertSecondsToHMS } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts'
import { useAppPlayer } from 'src/hooks'
import { Divider } from '../atoms'
import { getNarratedOpinion } from 'src/shared/utils/getNarratedOpinion'
import { AlignItemsTo, FlexDirectionTo, FlexWrapTo, JustifyContentTo } from 'src/shared/styles/styleProperties'

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
    containerStyle?: StyleProp<ViewStyle>;
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
    renderLabelsOrder = [LabelsType.authorName,LabelsType.title],
    containerStyle,
}: AuthorItemProps) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle);
    const navigation = useNavigation<StackNavigationProp<any>>()
    const playbackState = usePlaybackState();
    const[mediaData, setMediaData] = useState<any>({});
    const[timeDuration, setTimeDuration] = useState<any>('');
    const [prevPlayBackState, setPrevPlayBackState] = useState<State | undefined>(undefined);
    const [isBuffering, setIsBuffering] = useState<boolean>(false);
    const { setShowMiniPlayer, setPlayerTrack, selectedTrack: trackData, showMiniPlayer } = useAppPlayer()
    const CONST_OPINION_LISTEN_TO_ARTICLE_LIST = TranslateConstants({key:TranslateKey.OPINION_LISTEN_TO_ARTICLE_LIST})
    useEffect(() => {
        if(jwPlayerID){
          getNarratedOpinion(jwPlayerID,setMediaData,setTimeDuration);
        }
    }, [])

    useEffect(() => {
      if (trackData && trackData.id === (nid+'opinion') && prevPlayBackState === State.Playing && playbackState.state === State.Buffering) {
        setIsBuffering(true);
      } else {
        setIsBuffering(false);
      }
      setPrevPlayBackState(playbackState.state);
    }, [playbackState])
 
    const onPress = () => {
        if (nid) {
            navigation.navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid})
        }
    }

    const onPlayPausePress = async () => {
        const playback = await TrackPlayer.getPlaybackState()
        if(trackData != null){
            if(playback.state === State.Paused){
                await TrackPlayer.play()
            }else{
                await TrackPlayer.pause()
            }
        }
    };
    
    const onPressPlay = () => {
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
          <View testID='MainScreenAuthorId' key={index} style={[style.tabContainer]} >
            <View style={style.tabContentContainer}>
              <TouchableOpacity key={`indexKey${index}`} onPress={onPress} testID = "authorId">
                  <Label
                    children={body}
                    numberOfLines={2}
                    style={style.tabletBody}
                    color={themeData.primaryBlack}
                  />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity testID='mainScreenAuthorItemId' onPress={() => onPressWriter(authorId)}>
                    <Image url={image} size={58} resizeMode={'cover'} type={'round'}
                        fallback={true}
                        fallbackName={ImagesName.authorDefaultName} 
                    />
                </TouchableOpacity>
            </View>
        </View>
        <View style = {style.tabFooterContainer}>
          {mediaVisibility && <View style={style.tabMediaFooter}>

              <TouchableOpacity testID={'mainScreenMediaId'} onPress={onPressPlay} style={style.tabMediaFooter}>
                <ButtonImage
                  icon={() =>
                    trackData && trackData.id === (nid + 'opinion') &&
                      playbackState.state === State.Playing || isBuffering ?
                      getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                      getSvgImages({ name: ImagesName.playIconSVG, size: normalize(12) })
                  }
                  onPress={onPressPlay} />
                {isNotEmpty(timeDuration) && <Label children={timeDuration} style={style.tabDurationLabel} testID={'mainScreenTimeDuration'} />}
              </TouchableOpacity>

            </View>}

           <Label
              key={`title${index}`}
              children={author}
              style={style.tabAuthorTitle}
              testID={'mainScreenAuthorLabelId'}
              color={themeData.primary}
              numberOfLines={1}
              onPress={() => onPressWriter(authorId)}
              suppressHighlighting={true}
            />
              
        </View>
        {showDivider && <Divider style = {style.tabDivider} />}
        </View>
        :
        <View testID='AutherItemTO1' key={index} style={[style.container, isTab && { paddingRight: 20 }, containerStyle]} >
            <View style={style.contentContainer}>
                {renderLabels()}
                {mediaVisibility && <View style={style.mediaFooter}>
                    <TouchableOpacity testID='AutherItemTO2' onPress={onPressPlay} style={style.mediaFooter}>
                        <ButtonImage
                        icon={() =>
                            trackData && trackData.id === (nid+'opinion') && 
                            playbackState.state === State.Playing || isBuffering ? 
                            getSvgImages({ name: ImagesName.pauseIcon, width: normalize(12), height: normalize(14) }) :
                            getSvgImages({name: ImagesName.playIconSVG, size: normalize(12)})
                        }
                        onPress={onPressPlay} />
                        <Label children={CONST_OPINION_LISTEN_TO_ARTICLE_LIST} style={style.articleLabelSyle}
                        labelType={LabelTypeProp.h3} color={themeData.primary} />
                    </TouchableOpacity>
                    { isNotEmpty(timeDuration) && <Label children={timeDuration} style={style.durationLabel} testID={'authorTimeDuration'} /> }
                </View>}
            </View>
            <View>
                <TouchableOpacity testID='AutherItemTO3' onPress={() => onPressWriter(authorId)}>
                    <Image url={image} size={normalize(80)} resizeMode={'cover'} type={'round'}
                        fallback={true}
                        fallbackName={ImagesName.authorDefaultName} 
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
        width: '95%',
        flexDirection: 'row',
        justifyContent: JustifyContentTo.SPACE_BETWEEN,
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
        flexDirection: FlexDirectionTo.ROW,
        alignItems: AlignItemsTo.CENTER,
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
      flexDirection: FlexDirectionTo.ROW,
      alignItems:AlignItemsTo.FLEX_START,
    },
    tabContentContainer: {
      flex: 1,
      alignItems:AlignItemsTo.FLEX_START,
    },
    tabletBody: {
      fontSize: 16,
      fontFamily: fonts.AwsatDigital_Bold,
      fontWeight: '700',
      lineHeight: 26
  },
  tabMediaFooter: {
    flexDirection: FlexDirectionTo.ROW_REVERSE,
    alignItems: AlignItemsTo.CENTER,
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
    flexDirection:FlexDirectionTo.COLUMN,
    justifyContent:JustifyContentTo.SPACE_BETWEEN,
  },
  tabFooterContainer: {
    marginTop:10,
    alignItems:AlignItemsTo.CENTER,
    justifyContent:JustifyContentTo.SPACE_BETWEEN,
    flexDirection:FlexDirectionTo.ROW_REVERSE,
    flexWrap:FlexWrapTo.WRAP,
  },
  tabDivider:{
    marginBottom:10,
    height: 1,
    backgroundColor: Styles.color.lightAlterGray,
  },
})

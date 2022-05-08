import React, { useRef, useState } from 'react';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomThemeType} from 'src/shared/styles/colors';
import {AuthorItem} from 'src/components/molecules';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { isIOS, isTab, normalize, screenWidth } from 'src/shared/utils';
import { getImageUrl, isNonEmptyArray, isNotEmpty, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { Divider, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { t } from 'i18next';
import { ImagesName, Styles } from 'src/shared/styles';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScreensConstants } from 'src/constants';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';

const AuthorSlider = ({
    data,
    widgetHeader,
    containerStyle,
    widgetHeaderStyle,
    widgetHeaderContainerStyle,
    getSelectedTrack,
    selectedType,
    onClose
}: {
    data: any, listKey?: string,
    widgetHeader?: string,
    containerStyle?: StyleProp<ViewStyle>,
    widgetHeaderContainerStyle?: StyleProp<ViewStyle>,
    widgetHeaderStyle?: StyleProp<ViewStyle>
    getSelectedTrack?: (id: any, type: 'OPINION' | 'PODCAST')=> void,
    selectedType?: string,
    onClose?: ()=> void
}) => {
  const style = useThemeAwareObject(customStyle);
  const scrollRef = useRef<ScrollView>(null);
  const { themeData } = useTheme()
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const playbackState = usePlaybackState();

  const togglePlayback = async (nid: string, mediaData: any) => {
    let playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};

    if (!isObjectNonEmpty(playList) || !isObjectNonEmpty(mediaData)) {
      return
    }

    const id = nid
    const media = playList.sources[0]?.file ? playList.sources[0]?.file : '';
    const title = mediaData.title ? mediaData.title : '';

    let setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({ stopWithApp: true });
      await TrackPlayer.add({
        id: id,
        url: media,
        title: title,
        artist: title,
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      await TrackPlayer.play();
    }

    if(selectedType == 'PODCAST' && onClose){
      onClose();
      await TrackPlayer.reset();
      setupPlayer();
    }else{
      if(selectedTrack == nid){
        if (playbackState === State.Playing) {
          await TrackPlayer.pause();
        }
        else if (playbackState === State.Paused) {
          await TrackPlayer.play();
        }
        else if ( playbackState === State.Paused ||  playbackState == State.None || playbackState == State.Stopped) {
          setupPlayer()
        }
      }else{
          await TrackPlayer.reset();
          setupPlayer()
      }
    }
    setSelectedTrack(nid)
    if(getSelectedTrack) getSelectedTrack(nid, 'OPINION');
  }

  const renderItem = (item: any, index: number) => {
    return (
        <FlatList
            data={item}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            listKey={'AuthorSlider'+ index + new Date().getTime().toString()}
            renderItem={({ item, index }) => renderAuthorList(item, index)}
            style={[style.itemListContainer, isTab && index === 2 && {marginLeft: 0}]}
            ItemSeparatorComponent={() => <Divider style={style.divider} />}
        />
    );
  };

  const renderAuthorList = (item: any, index: number) => {
    return (
        <View style={{}}>
            <AuthorItem body={item.title}  
            mediaVisibility={isNotEmpty(item.field_jwplayer_id_opinion_export)} 
            jwPlayerID={isNotEmpty(item.field_jwplayer_id_opinion_export) ? item.field_jwplayer_id_opinion_export : null}
            togglePlayback={togglePlayback}
            selectedTrack={selectedTrack}
            selectedType={selectedType}
            author={
                isNonEmptyArray(item.field_opinion_writer_node_export)
                ? item.field_opinion_writer_node_export[0].name
                : item.field_opinion_writer_node_export.opinion_writer_photo
            }
            authorId={
              isNonEmptyArray(item.field_opinion_writer_node_export) && item.field_opinion_writer_node_export[0].id
            }
            duration={''} 
            image={
                isNonEmptyArray(item.field_opinion_writer_node_export)
                ? getImageUrl(
                    item.field_opinion_writer_node_export[0].opinion_writer_photo
                    )
                : getImageUrl(
                    item.field_opinion_writer_node_export.opinion_writer_photo,
                    )
            }
            index={index} 
            nid={item.nid}
            />
        </View>
    );
  };

  const scrollToStart = () => {
    if (isIOS) return
    scrollRef.current?.scrollToEnd();
  }
  const widgetHeaderData: WidgetHeaderProps = {
    headerLeft: {
        title: widgetHeader ? widgetHeader : t('latestNewsTab.sectionWriters.headerLeft'),
        color: themeData.primary,
        labelType: LabelTypeProp.title3,
        elementContainerStyle: style.headerLeftContainer
    },
    headerRight: {
        title: t('latestNewsTab.sectionComboOne.headerRight'),
      icon: () => {
        return getSvgImages({
          name: ImagesName.arrowLeftFaced,
          size: normalize(12),
          style: { marginLeft: normalize(10) }
        })
      },
      labelType: LabelTypeProp.caption2,
      clickable: true,
    },
};

  const onPressMore = () => {
    const params = { sectionId: null, title: "الرأي", keyName: "opinion" }
    navigation.navigate(ScreensConstants.SectionArticlesParentScreen, params)
  }

  return (
    <View style={StyleSheet.flatten([style.container,containerStyle])}>
        <View style={StyleSheet.flatten([style.headerContainer, widgetHeaderContainerStyle])}>
            <WidgetHeader {...widgetHeaderData} widgetHeaderStyle={widgetHeaderStyle} onPress={onPressMore} />
        </View>
        <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={()=> scrollToStart()}
        bounces={false}
        style={style.container}>
            <FlatList
            listKey={'AuthorSlider' + new Date().getTime().toString()}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => renderItem(item, index)}
            style={style.listContainer}
            bounces={false}
        />
    </ScrollView>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const AuthorSliderStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      alignContent: 'center',
      flex: 1
    },
    headerContainer: {
        paddingHorizontal:0.04 * screenWidth,
        backgroundColor: theme.secondaryWhite,
        paddingTop:normalize(30),
        paddingBottom: normalize(10),
    },
    headerLeftContainer: {
        paddingHorizontal: 0,
    },
    listContainer: {
        flex: 1,
        paddingTop: normalize(20),
        backgroundColor: theme.secondaryWhite,
        paddingBottom:normalize(20),
        paddingEnd: (isTab ? 0.02 : 0.04) * screenWidth
    },
    itemListContainer: {
        width: screenWidth * (isTab ? 0.43 : 0.84),
        marginStart: 0.04 * screenWidth,
        marginEnd: isTab ? 0 : 0.04 * screenWidth,
    },
    itemStyle: {
        flex: 1,
        flexWrap: 'wrap'
    },
    divider: {
        marginBottom: normalize(20),
        height: 1,
        backgroundColor: theme.dividerColor
    },
  });
  return AuthorSliderStyle;
};
export default AuthorSlider;

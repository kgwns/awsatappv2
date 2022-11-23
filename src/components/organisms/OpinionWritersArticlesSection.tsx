import React, { useState } from 'react';
import {ActivityIndicator, FlatList, Platform, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants/Constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import OpinionWritersCardView from 'src/components/molecules/opinionWriters/OpinionWriterCardView';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {OpinionsListItemType} from 'src/redux/opinions/types';
import {
  decodeHTMLTags,
  getImageUrl,
  isNonEmptyArray,
  isNotEmpty,
  isObjectNonEmpty,
} from 'src/shared/utils/utilities';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';
import { fonts } from 'src/shared/styles/fonts';
import { Label } from '../atoms';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';

interface OpinionWritersArticlesSectionProps {
  data: OpinionsListItemType[];
  onScroll: () => void;
  isLoading: boolean;
  onUpdateOpinionArticlesBookmark: (index: number) => void
  hideImageView?: boolean
}

const OpinionWritersArticlesSection = ({
  data,
  onScroll,
  isLoading,
  onUpdateOpinionArticlesBookmark,
  hideImageView
}: OpinionWritersArticlesSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();

  const audioLabel = TranslateConstants({ key: TranslateKey.LISTEN_TO_ARTICLE });

  const slice = screenWidth * 0.80;
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const playbackState = usePlaybackState();

  const CONST_OPINION_ARTICLE_TITLE = TranslateConstants({key: TranslateKey.OPINION_ARTICLE_TITLE})

  const togglePlayback = async (nid: string, mediaData: any) => {
    const playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};

    if (!isObjectNonEmpty(playList) || !isObjectNonEmpty(mediaData)) {
      return
    }

    const id = nid
    const media = playList.sources[0]?.file ? playList.sources[0]?.file : '';
    const title = mediaData.title ? mediaData.title : '';

    const setupPlayer = async () => {
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
    setSelectedTrack(nid) 
  }

  const renderItem = (item: any, index: number) => {
    return (
      <View key={flatListUniqueKey.OPINION_WRITER_ARTICLES_SECTION + index}>
        <OpinionWritersCardView
          authorId={
            isNonEmptyArray(item.field_opinion_writer_node_export) && item.field_opinion_writer_node_export[0].id
          } 
          imageUrl={
            isNonEmptyArray(item.field_opinion_writer_node_export)
              ? getImageUrl(
                  item.field_opinion_writer_node_export[0].opinion_writer_photo,
                )
              : getImageUrl(
                  item.field_opinion_writer_node_export.opinion_writer_photo,
                )
          }
          writerTitle={ isNonEmptyArray(item.field_opinion_writer_node_export)
            ?item.field_opinion_writer_node_export[0].name
            :item.field_opinion_writer_node_export.name}
          headLine={decodeHTMLTags(item.title)}
          subHeadLine={ (Platform.OS==='android')
          ?decodeHTMLTags(item.body.slice(0,slice))
          :decodeHTMLTags(item.body)}
          duration={''} //TODO: duration key should be passed from backend
          nid={item.nid}
          isBookmarked={item.isBookmarked}
          mediaVisibility={item.field_jwplayer_id_opinion_export ? isNotEmpty(item.field_jwplayer_id_opinion_export) : isNotEmpty(item.jwplayer)}
          jwPlayerID={isNotEmpty(item.field_jwplayer_id_opinion_export) ? item.field_jwplayer_id_opinion_export : (isNotEmpty(item.jwplayer) ? item.jwplayer : null)}
          togglePlayback={togglePlayback}
          selectedTrack={selectedTrack}
          onPressBookmark={() => {onUpdateOpinionArticlesBookmark(index)}}
          audioLabel={audioLabel}
          hideImageView={hideImageView}
        />
        {isLoading && data.length - 1 == index && (
          <View style={{margin: normalize(28)}}>
            <ActivityIndicator size={'small'} color={theme.themeData.primary} />
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={style.container}>
      <Label style={style.headerStyle} children={CONST_OPINION_ARTICLE_TITLE} />
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={()=> onScroll()} 
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionWritersArticlesSectionStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      paddingTop: normalize(15),
    },
    scrollMore: {
      fontSize: normalize(16),
      lineHeight: normalize(73),
      color: theme.primary,
      textAlign: 'center',
    },
    headerStyle: {
      fontSize: 20,
      lineHeight: 42,
      color: theme.primary,
      textAlign: 'left',
      marginLeft: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
      marginBottom: normalize(8),
      fontFamily: fonts.AwsatDigital_Bold,
    },
  });
  return OpinionWritersArticlesSectionStyle;
};

export default OpinionWritersArticlesSection;

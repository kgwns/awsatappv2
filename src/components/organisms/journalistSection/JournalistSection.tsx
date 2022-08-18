import React, { useState } from 'react';
import {ActivityIndicator, FlatList, Platform, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import OpinionWritersCardView from 'src/components/molecules/opinionWriters/OpinionWriterCardView';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {OpinionsListItemType} from 'src/redux/opinions/types';
import {
    dateTimeAgo,
  decodeHTMLTags,
  getImageUrl,
  isNonEmptyArray,
  isNotEmpty,
  isObjectNonEmpty,
  TimeIcon,
} from 'src/shared/utils/utilities';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';
import { fonts } from 'src/shared/styles/fonts';
import { Label } from 'src/components/atoms';
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants';
import { ArticleItem } from 'src/components/molecules';

interface OpinionWritersArticlesSectionProps {
  data: any;
  onScroll: () => void;
  isLoading: boolean;
  onUpdateOpinionArticlesBookmark: (index: number) => void
  hideImageView?: boolean
}

export const JournalistSection = ({
  data,
  onScroll,
  isLoading,
  onUpdateOpinionArticlesBookmark,
  hideImageView
}: OpinionWritersArticlesSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const numberOfColumn = isTab ? 2 : 1;
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
  const onPressBookmark = (index: number) => {
    const updatedData = [...data]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus
}

  const renderItem = (item: any, index: number) => {
    const timeFormat = dateTimeAgo(item.created_export)
    const articleItemStyle = isTab ? numberOfColumn > 1 && data.length > 1 ? (index % 2 === 0) ? style.evenStyle : style.oddStyle : {} : style.mobileArticleItem
    const tagName = isObjectNonEmpty(item.field_news_categories_export) ? item.field_news_categories_export[0].title : ''
    return (
        <View style={style.itemContainer}>
            <ArticleItem
                index={index}
                nid={item.nid}
                image={getImageUrl(item.field_new_photo) || 'placeholderImg'}
                imageStyle={isTab ? style.tabImageStyle : style.imageStyle}
                tagName={tagName}
                title={item.title}
                titleStyle={style.titleStyle}
                footerInfo={{
                    rightIcon: () => TimeIcon(timeFormat.icon),
                    rightTitle: timeFormat.time,
                    hideBookmark: false,
                    rightTitleColor: theme.themeData.signinRightsColor,
                }}
                author={''} created={''} isBookmarked={true}
                onPressBookmark={() => onPressBookmark(index)}
                showDivider={false}
                containerStyle={{ paddingTop: normalize(20) }}
                articleItemStyle={articleItemStyle}
                isJournalist={true}
            />
        </View>
    );
  };
  return (
    <View style={style.container}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={()=> onScroll()} 
        onEndReachedThreshold={0.5}
        numColumns={numberOfColumn}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: normalize(20),
      paddingTop: normalize(25)
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
    itemContainer: {
        flex: 1,
    },
    titleStyle: {
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: 20,
        lineHeight: 28,
        textAlign: 'left',
        paddingVertical: normalize(8),
        color: theme.primaryBlack,
    },
    imageStyle: {
      width: '100%',
      height: 'auto',
      aspectRatio: 1.62,
  },
  tabImageStyle: {
      width: 0.5 * screenWidth,
      height: 'auto',
      aspectRatio: 1.62,
  },
    evenStyle: {
        marginRight: normalize(10),
    },
    oddStyle: {
        marginLeft: normalize(10),
    },
    mobileArticleItem: {
        paddingBottom: normalize(20),
    },
  });


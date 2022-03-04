import React, {useState,useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import { ScreenContainer } from '..';
import {PodcastProgramHeader} from 'src/components/molecules';
import Share from 'react-native-share';
import {VideosList, VideoInfo} from 'src/components/organisms';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { normalize, horizontalAndBottomEdge, isNonEmptyArray} from 'src/shared/utils';
import { colors } from 'src/shared/styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useBookmark, useVideoList } from 'src/hooks';
import { VideoItemType } from 'src/redux/videoList/types';

export interface VideoDetailScreenProps {
  route: any
}

export const VideoDetailScreen = ({route}: VideoDetailScreenProps) => {

  const {isLoading,videoData,fetchVideoRequest} = useVideoList();
  useEffect(() => { fetchVideoRequest(); }, []);
  const styles = useThemeAwareObject(createStyles);
  const [isSaved, setIsSaved] = useState(false);
  const insets = useSafeAreaInsets();

  const [isBookmarked, setIsBookmarked] = useState(false)

  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()

  useEffect(() => {
    if (isNonEmptyArray(videoData)) {
      const isBookmarked = validateBookmark(videoData[0].nid)
      setIsBookmarked(isBookmarked)
    }
  }, [videoData,bookmarkIdInfo])

  const validateBookmark = (nid: string): boolean => {
    const index = isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.findIndex(value => value.nid == nid) : -1
    return index >= 0 ? true : false
  }

  const onPressSave = (nid: string) => {
    const newBookmarked = !isBookmarked
    const data = [...videoData]
    data[0].isBookmarked = !data[0].isBookmarked
    setIsBookmarked(newBookmarked)
    onUpdateBookMark(nid, newBookmarked)
  }

  const onUpdateBookMark = (nid: string, hasBookmarked: boolean) => {
    hasBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
  }

  const onPressShare = async () => {
    const { title, imageUrl } = route.params.data
    await Share.open({
        title,
        url: imageUrl,
        failOnCancel: true,
        subject: title
    }).then(response => {
        console.log('Shared successfully :::', response)
    }).catch((error) => {
        console.log('Cancelled share request :::', error)
    })
}

  const renderItem = () => (
    <View >
      <View style={styles.headerStyle}>
        <PodcastProgramHeader
          headerShareIconTestId={'video_detail_share'}
          headerBookmarkIconTestId={'video_detail_save'}
          headerBackIconTestId={'video_detail_back'}
          onPressShare={onPressShare}
          onPressSave={()=>onPressSave(videoData[0].nid)}
          isSaved={isBookmarked}
          isCloseIcon
        />
        {videoData.length&&<VideoInfo data={videoData[0]} onPress={(item:VideoItemType)=>{console.log(item)}}/>}
      </View>
      <View style={styles.container}>
        <VideosList data={videoData.slice(1)} onItemActionPress={(item:VideoItemType)=>console.log(item,'item pressed')} />
      </View>
    </View>
  )
  return (
    <ScreenContainer edge={horizontalAndBottomEdge} barStyle={'light-content'} isLoading={isLoading}>
      <View style={{height:insets.top,backgroundColor: colors.black}} />
      <FlatList
        style={{ flex: 1, height: '100%' }}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  )
}

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(15),
    backgroundColor: theme.backgroundColor,
  },
  headerStyle: {
    backgroundColor: colors.black,
  },
})
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, ListRenderItem} from 'react-native';

import {VideoItem, VideoItemProps} from 'src/components/molecules';
import {isNonEmptyArray, normalize} from 'src/shared/utils';
// import {videoTabData} from 'src/constants/SampleData';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {  ScreensConstants } from 'src/constants';
import {useTranslation} from 'react-i18next';
import { useBookmark, useLogin, useVideoList } from 'src/hooks';
import {VideoItemType} from 'src/redux/videoList/types';
import { ScreenContainer } from '..';

interface VideoScreenProps {}

export const VideoScreen = (props: VideoScreenProps) => {

  const {isLoading,videoData,fetchVideoRequest} = useVideoList();
  const [showupUp,setShowPopUp] = useState(false)
  const navigation = useNavigation<StackNavigationProp<any>>()

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()

  const { isLoggedIn } = useLogin()

  useEffect(() => {
    updateVideoData()
  }, [videoData,bookmarkIdInfo])

  const updateVideoData = () => {
    if(isNonEmptyArray(videoData)) {
      const videos = updateBookmark(videoData)
      setVideoDataInfo(videos)
    }
  }
  const updateBookmark = (data: VideoItemType[]) => {
    return data.map((item: VideoItemType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
  }
  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }
  const updatedChangeBookmark = (data: VideoItemType[], index: number) => {
    const updatedData = [...data]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus
    updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
    return updatedData
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    if (isLoggedIn) {
      isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const updateVideosBookmark = (index: number) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    
    const updatedData = updatedChangeBookmark(videoDataInfo, index)
    setVideoDataInfo(updatedData)
  }

  
  useEffect(() => { fetchVideoRequest(); }, []);
  const onPressItem = (item:VideoItemType)=>{
    navigation.navigate(ScreensConstants.VideoDetailScreen, {data: item})
  }
  const [t] = useTranslation();

  const [videoDataInfo, setVideoDataInfo] = useState(videoData)

  const renderItem: ListRenderItem<VideoItemType> = ({item, index}) => {
    return (
      <VideoItem
        title={item.title}
        imageUrl={item.field_thumbnil_multimedia_export}
        des={item.description}
        date={item.created_export}
        isFirstItem={index === 0}
        testID='video_screen_id'
        onPress={()=>onPressItem(item)}
        video={item.field_mp4_link_export}
        isBookmarked={item.isBookmarked}
        onPressBookmark={() => {updateVideosBookmark(index)}}
      />
    );
  };
  return (
    <ScreenContainer isLoading={isLoading}
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert}>
      <View style={styles.container}>
        <FlatList
          data={videoDataInfo}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: normalize(15)},
});

import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, ListRenderItem, Animated} from 'react-native';

import {VideoItem} from 'src/components/molecules';
import {horizontalEdge, isNonEmptyArray, isTab, normalize} from 'src/shared/utils';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {  ScreensConstants } from 'src/constants/Constants';
import { useBookmark, useLogin, useVideoList, useDocumentaryVideo, useAppPlayer } from 'src/hooks';
import {VideoItemType} from 'src/redux/videoList/types';
import { ScreenContainer } from '..';
import { RequestDocumentaryVideoPayload } from 'src/redux/documentaryVideo/types';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const documentaryVideoPayload: RequestDocumentaryVideoPayload = {
  items_per_page: 1,
  page: 1,
}

export const VideoScreen = React.memo(({tabIndex, currentIndex, scrollY}: {tabIndex?:number; currentIndex?:number; scrollY?: any}) => {

  const styles = useThemeAwareObject(customStyle);
  const scrollYValue = scrollY ? scrollY : new Animated.Value(0);
  const {isLoading,videoData,fetchVideoRequest} = useVideoList();
  const {isVideoLoading, videoDocumentaryData, fetchDocumentaryVideoRequest} = useDocumentaryVideo();
  const [showupUp,setShowPopUp] = useState(false)
  const navigation = useNavigation<StackNavigationProp<any>>()
  const [isShowPlayer, setIsShowPlayer] = useState(false)
  const { showMiniPlayer } = useAppPlayer()

  const ref = React.useRef(null);
  useEffect(() => {
    if(tabIndex === currentIndex){
      global.refFlatList = ref;
    }
  }, [currentIndex])

  useEffect(() => {
    setIsShowPlayer(true)  
  },[])
  
  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()

  const { isLoggedIn } = useLogin()

  useEffect(() => {
    updateVideoData()
  }, [videoData,bookmarkIdInfo])

  useEffect(() => {
    updateDocumentaryVideoData()
  }, [videoDocumentaryData,bookmarkIdInfo])

  const updateVideoData = () => {
    if(isNonEmptyArray(videoData)) {
      const videos = updateBookmark(videoData)
      setVideoDataInfo(videos)
    }
  }

  const updateDocumentaryVideoData = () => {
    if(isNonEmptyArray(videoDocumentaryData)) {
      const videos = updateBookmark(videoDocumentaryData)
      setVideoDocumentaryInfo(videos)
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
      isBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.VIDEO }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const updateVideosBookmark = (index: number, data: any) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    
    const updatedData = updatedChangeBookmark(data, index)
    if(data === videoDataInfo){
      setVideoDataInfo(updatedData)
    }else{
      setVideoDocumentaryInfo(updatedData);
    }
  }
  useEffect(() => { 
    fetchDocumentaryVideoRequest(documentaryVideoPayload);
    fetchVideoRequest();
   }, []);

  const onPressItem = (item:VideoItemType, isDocumentary:boolean)=>{
    navigation.navigate(ScreensConstants.VideoDetailScreen, {data: item, isDocumentary: isDocumentary})
  }

  const [videoDataInfo, setVideoDataInfo] = useState(videoData)
  const [videoDocumentaryInfo, setVideoDocumentaryInfo] = useState(videoDocumentaryData)

  const renderItem = () => (
    <View>
      <FlatList
          data={videoDocumentaryInfo}
          testID='documentary_Video_Item_FlatList1'
          listKey={'videoDocumentary'+ new Date().getTime().toString()}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderDocumentaryVideoItem}
          showsVerticalScrollIndicator={false}
        />
      <FlatList
          data={videoDataInfo}
          numColumns={isTab? 2 : 1}
          testID='video_Item_FlatList1'
          listKey={'videoList'+ new Date().getTime().toString()}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderVideoItem}
          showsVerticalScrollIndicator={false}
        />
    </View>
  );

  const renderDocumentaryVideoItem: ListRenderItem<VideoItemType> = ({item, index}) => {
    return (
      <VideoItem
        title={item.title}
        imageUrl={item.field_thumbnil_multimedia_export}
        des={item.body_export}
        date={item.created_export}
        testID='video_documentary_screen_id'
        onPress={()=>onPressItem(item, true)}
        video={item.field_mp4_link_export}
        isBookmarked={item.isBookmarked}
        time={item.field_jwplayerinfo_export}
        videoLabel={isNonEmptyArray(item.field_multimedia_section_export) ? item.field_multimedia_section_export[0]?.title : undefined}
        onPressBookmark={() => {updateVideosBookmark(index, videoDocumentaryInfo)}}
        isDocumentary={true}
      />
    );
  };
  const renderVideoItem: ListRenderItem<VideoItemType> = ({item, index}) => {
    return (
      <VideoItem
        title={item.title}
        imageUrl={item.field_thumbnil_multimedia_export}
        des={!isTab && item.body_export}
        date={item.created_export}
        testID='video_screen_id'
        onPress={()=>onPressItem(item, false)}
        video={item.field_mp4_link_export}
        isBookmarked={item.isBookmarked}
        time={item.field_jwplayerinfo_export}
        videoLabel={isNonEmptyArray(item.field_multimedia_section_export) ? item.field_multimedia_section_export[0]?.title : undefined}
        isVideoContents={true} 
        onPressBookmark={() => {updateVideosBookmark(index, videoDataInfo)}}
      />
    );
  };
  

  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isLoading || isVideoLoading}
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert} showPlayer={isShowPlayer}
      backgroundColor={styles.screenBackgroundColor?.backgroundColor} >
      <View style={styles.container}>
        <AnimatedFlatList
           ref={ref}
           testID='main_FlatList1'
           onScrollBeginDrag={() => global.refFlatList = ref}
           onScroll={Animated.event(
            [{nativeEvent: { contentOffset: {y: scrollYValue}}}],
            {useNativeDriver: false}
          )}
          scrollEventThrottle={16}
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={showMiniPlayer && styles.contentContainer}
        />
      </View>
    </ScreenContainer>
  );
});

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      marginBottom: normalize(10)
    },
    contentContainer: {
      paddingBottom: normalize(80)
    },
    screenBackgroundColor: {
      backgroundColor: theme.backgroundColor,
    }
  });
}

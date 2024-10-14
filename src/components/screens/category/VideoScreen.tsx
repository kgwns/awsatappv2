import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, ListRenderItem, Animated, ActivityIndicator} from 'react-native';

import {VideoItem} from 'src/components/molecules';
import {decodeHTMLTags, EventsValue, horizontalEdge, isNonEmptyArray, isTab, normalize, recordLogEvent, screenWidth} from 'src/shared/utils';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {  ScreensConstants } from 'src/constants/Constants';
import { useBookmark, useLogin, useVideoList, useDocumentaryVideo, useAppPlayer } from 'src/hooks';
import {VideoItemType} from 'src/redux/videoList/types';
import { ScreenContainer } from '..';
import { RequestDocumentaryVideoPayload } from 'src/redux/documentaryVideo/types';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { AnalyticsEvents, EventParameterProps } from 'src/shared/utils/analytics';
import { isVideoAdIndex, VIDEOS_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const documentaryVideoPayload: RequestDocumentaryVideoPayload = {
  items_per_page: 1,
  page: 1,
}

export const VideoScreen = React.memo(({tabIndex, currentIndex, scrollY}: {tabIndex?:number; currentIndex?:number; scrollY?: any}) => {
  const { params } = useRoute<RouteProp<any>>();
  const sectionId = params?.sectionId;
  
  const styles = useThemeAwareObject(customStyle);
  const scrollYValue = scrollY ? scrollY : new Animated.Value(0);
  const {isVideoLoading: isLoading,videoPaginationData, fetchVideoWithPagination} = useVideoList();
  const {isVideoLoading, videoDocumentaryData, fetchDocumentaryVideoRequest} = useDocumentaryVideo();
  const [showupUp,setShowPopUp] = useState(false)
  const navigation = useNavigation<StackNavigationProp<any>>()
  const [isShowPlayer, setIsShowPlayer] = useState(false)
  const [page, setPage] = useState<number>(0)
  const { showMiniPlayer } = useAppPlayer()
  const { themeData } = useTheme()
  const VIDEO_ITEMS_PER_PAGE = isTab ? 9 : 10;

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
    bookmarkIdInfo,
    validateBookmark,
  } = useBookmark()

  const { isLoggedIn } = useLogin()

  useEffect(() => {
    updateVideoData()
  }, [videoPaginationData,bookmarkIdInfo])

  useEffect(() => {
    updateDocumentaryVideoData()
  }, [videoDocumentaryData,bookmarkIdInfo])

  const updateVideoData = () => {
    if(isNonEmptyArray(videoPaginationData)) {
      const videos = updateBookmark([...videoDataInfo, ...videoPaginationData]) as any;
      setVideoDataInfo([...videos]);
    }
  }

  const updateDocumentaryVideoData = () => {
    if(isNonEmptyArray(videoDocumentaryData)) {
      const videos = updateBookmark(videoDocumentaryData)
      setVideoDocumentaryInfo(videos)
    }
  }

  const updateBookmark = (data: VideoItemType[]): VideoItemType[] => {
    return data.map((item: VideoItemType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
  }

  const updatedChangeBookmark = (data: VideoItemType[], index: number) => {
    const updatedData = [...data]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus;
    const { title,body_export } = updatedData[index];
    const decodeBody = decodeHTMLTags(body_export);
    const eventParameter = {
      content_type: EventsValue.video,
      article_name: title,
      article_category: EventsValue.video,
      article_length: decodeBody?.split(' ').length
    }
    updateBookmarkInfo(updatedData[index].nid, bookmarkStatus, eventParameter)
    return updatedData
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean,eventParameter: EventParameterProps) => {
    if (isLoggedIn) {
      if (isBookmarked) {
        recordLogEvent(AnalyticsEvents.ARTICLE_SAVE, eventParameter)
        sendBookmarkInfo({ nid, bundle: PopulateWidgetType.VIDEO })
      } else {
        recordLogEvent(AnalyticsEvents.ARTICLE_UNSAVE, eventParameter)
        removeBookmarkedInfo({ nid })
      }
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
    setPage(0);
    setVideoDataInfo([]);
    fetchDocumentaryVideoRequest(documentaryVideoPayload);
    fetchVideoWithPagination({page: 0, id: sectionId, items_per_page: VIDEO_ITEMS_PER_PAGE});
   }, []);

  useEffect(() => { 
    if (page !== 0) {
      fetchVideoWithPagination({ page, id: sectionId, items_per_page: VIDEO_ITEMS_PER_PAGE });
    }
   }, [page]);

  const onPressItem = (item:VideoItemType, isVideoDocumentary:boolean)=>{
    navigation.navigate(ScreensConstants.VideoDetailScreen, {data: item, isDocumentary: isVideoDocumentary} as never)
  }

  const [videoDataInfo, setVideoDataInfo] = useState(videoPaginationData)
  const [videoDocumentaryInfo, setVideoDocumentaryInfo] = useState(videoDocumentaryData)

  const onLoadMore = () => {
    if(!isLoading){
      setPage(page+1)
    }
  }

  const renderFooterComponent = () => {
    if (!isLoading || isVideoLoading) {
      return null;
    }
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size={'small'} color={themeData.primary} />
      </View>
    )
  }

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
          numColumns={isTab? 3 : 1}
          testID='video_Item_FlatList1'
          listKey={'videoList'+ new Date().getTime().toString()}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderVideoItem}
          onEndReachedThreshold={0.5}
          onEndReached={onLoadMore}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooterComponent()}
        />
    </View>
  );

  const renderDocumentaryVideoItem: ListRenderItem<VideoItemType> = ({item, index}) => {
    return (
      <>
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
          index={index}
          subTitle={''}
          showShare
          link_node={item.link_node}
        />
      </>
    );
  };
  const renderVideoItem: ListRenderItem<VideoItemType> = ({item, index}) => {    
    return (
      <>
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
          index={index}
          showShare
          link_node={item.link_node}
        />
        { isVideoAdIndex(index) && 
          <AdContainer style={{marginBottom: 20}} unitId={VIDEOS_UNIT_ID} width={isTab ? screenWidth / 3 : screenWidth} size={AdContainerSize.MEDIUM}/>
        }
      </>
    );
  };
  

  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isVideoLoading}
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
    },
    loaderStyle: {
      margin: normalize(28) 
    }
  });
}

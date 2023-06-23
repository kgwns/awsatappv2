import React, {useState,useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import { ScreenContainer } from '..';
import {PodcastProgramHeader} from 'src/components/molecules';
import Share from 'react-native-share';
import {VideosList, VideoInfo} from 'src/components/organisms';
import {CustomThemeType,colors} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { normalize, horizontalAndBottomEdge, isNonEmptyArray, isObjectNonEmpty, isNotEmpty, videoEvents } from 'src/shared/utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useAppPlayer, useBookmark, useLogin, useVideoList } from 'src/hooks';
import { RequestVideoUrlSuccessResponse, VideoItemType } from 'src/redux/videoList/types';
import {useNavigation} from '@react-navigation/native';
import {ScreensConstants} from 'src/constants/Constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { Styles } from 'src/shared/styles';
import { fetchVideoDetailInfo } from 'src/services/VideoServices';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { getVideoDetail } from 'src/services/videoDetailService';
import { decodeHTMLTags, getShareUrl } from 'src/shared/utils/utilities';
import { AnalyticsEvents } from 'src/shared/utils/analytics';
 
export interface VideoDetailScreenProps {
  route: any
}

export const VideoDetailScreen = ({route}: VideoDetailScreenProps) => {

  const {isLoading,videoData,fetchVideoRequest} = useVideoList();
  const styles = useThemeAwareObject(createStyles);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<any>>()

  const [selectedVideo, setSelectedVideo] = useState(route.params.data)
  const isDocumentary = route.params.isDocumentary
  const [videolistData, setVideolistData] = useState<VideoItemType[]>([])
  const [detailData, setDetailData] = useState<VideoItemType[]>([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(true)
  const [showupUp,setShowPopUp] = useState(false)
  const [videoUrl,setVideoUrl] = useState('')
  const { showMiniPlayer } = useAppPlayer()
  
  const { isLoggedIn } = useLogin()
  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo, validateBookmark } = useBookmark()
  const videoPayload = {page: 0, items_per_page: 10}

  useEffect(() => {
    fetchDetailData();
    fetchVideoRequest(videoPayload);
  }, []);

  useEffect(() => {
    formatVideoListData()
    getVideoUrlInfo()
  }, [videoData,bookmarkIdInfo])

  const fetchDetailData = async () => {
    const requestBody = { nid: selectedVideo.nid };
    const detailList = await getVideoDetail(requestBody);
    isNonEmptyArray(detailList) && setDetailData(detailList);
    setIsDetailLoading(false);
}

  const getVideoUrlInfo = async () => {
    if (isObjectNonEmpty(selectedVideo) && isNotEmpty(selectedVideo.mediaId)) {
      try {
        const response: RequestVideoUrlSuccessResponse =
          await fetchVideoDetailInfo({mediaID: selectedVideo.mediaId});
        if (
          isNonEmptyArray(response.playlist) &&
          isNonEmptyArray(response.playlist[0].sources)
        ) {
          const sources = response.playlist[0].sources;
          const videoItem = sources.find(
            item => item.type && item.type.includes('mp4'),
          );
          videoItem &&
            isObjectNonEmpty(videoItem) &&
            setVideoUrl(videoItem.file);
        }
      } catch (error) {
        console.log('video url error');
      }
    }
  };

  const formatVideoListData = () => {
    const selectedVideoId = route.params.data.nid
    const selectedVideoIndex = videoData.findIndex((item: any) => item.nid === selectedVideoId);
    const videoInfo = videoData && selectedVideoIndex !== -1 ? videoData[selectedVideoIndex] : selectedVideo
    const otherVideosList = videoData.filter((item: any) => item.nid !== selectedVideoId);
    if (isNonEmptyArray(videoData)) {
      const isBookmark = validateBookmark(videoInfo.nid)
      setIsBookmarked(isBookmark)
    }
    setSelectedVideo(videoInfo)
    setVideolistData(otherVideosList)
  }

  const onPressSave = (nid: string) => {
    const newBookmarked = !isBookmarked
    selectedVideo.isBookmarked = !selectedVideo.isBookmarked
    setIsBookmarked(newBookmarked)
    onUpdateBookMark(nid, newBookmarked)
  }

  const checkAndUpdateBookmark = (nid: string) => {
    isLoggedIn ? onPressSave(nid) : setShowPopUp(true)
  }

  const onUpdateBookMark = (nid: string, hasBookmarked: boolean) => {
    if (isLoggedIn) {
      hasBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.VIDEO }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const onPressShare = async () => {
    if(!isNonEmptyArray(detailData) && !isObjectNonEmpty(detailData[0]) && (!isNotEmpty(detailData[0].field_shorturl_export) && !isNotEmpty(detailData[0].link_node))) {
      return;
    }
    const videoDetailData = detailData[0];
    const { title, field_shorturl_export, link_node, body_export } = videoDetailData;
    const decodeBody = decodeHTMLTags(body_export);
    const bodyLength =  decodeBody.split(' ').length;
    const eventName = AnalyticsEvents.SOCIAL_SHARE;
    videoEvents(title,bodyLength,eventName);
    await Share.open({
        title,
        url: getShareUrl(field_shorturl_export!, link_node!),
        failOnCancel: true,
        subject: title
    }).then(response => {
        console.log('Shared successfully :::', response)
    }).catch((error) => {
        console.log('Cancelled share request :::', error)
    })
  }

  const goToPlayer = (item:VideoItemType) =>{
    if(item.mediaId || item.field_video_media_id_export){
      navigation.navigate(ScreensConstants.VideoPlayerScreen,{mediaID: item.mediaId ? item.mediaId : item.field_video_media_id_export , nid: item.nid, title: item.title} as never)
    }
  }

  const onGoBack = () => {
    navigation.goBack()
  }

  const renderItem = () => (
    <View >
      <View style={styles.headerStyle}>
        <PodcastProgramHeader
          headerShareIconTestId={'video_detail_share'}
          headerBookmarkIconTestId={'video_detail_save'}
          headerBackIconTestId={'video_detail_back'}
          onPressShare={onPressShare}
          onGoBack={onGoBack}
          onPressSave={()=> isNonEmptyArray(videoData) && selectedVideo && checkAndUpdateBookmark(selectedVideo.nid)}
          isSaved={isBookmarked}
          isCloseIcon
        />
        {selectedVideo!==undefined && <VideoInfo data={selectedVideo} onPress={(item:VideoItemType)=>{goToPlayer(item)}} isDocumentary={isDocumentary} />}
      </View>
      <View style={styles.container}>
        <VideosList data={videolistData} onItemActionPress={(item:VideoItemType)=>goToPlayer(item)} />
      </View>
    </View>
  )
  return (
    <ScreenContainer edge={horizontalAndBottomEdge} barStyle={'light-content'} isLoading={isLoading || isDetailLoading}
      isSignUpAlertVisible={showupUp}
      statusbarColor={Styles.color.black}
      onCloseSignUpAlert={onCloseSignUpAlert}>
      <View style={{height:insets.top,backgroundColor: colors.black}} />
      <FlatList
        style={styles.contentContainerStyle}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={showMiniPlayer && styles.contentContainer}
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
  contentContainer: {
    paddingBottom: normalize(80)
  },
  contentContainerStyle: {
    flex: 1, height: '100%' 
  }
})

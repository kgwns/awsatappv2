import React, {useState,useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import { ScreenContainer } from '..';
import {PodcastProgramHeader} from 'src/components/molecules';
import Share from 'react-native-share';
import {VideosList, VideoInfo} from 'src/components/organisms';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { normalize, horizontalAndBottomEdge, isNonEmptyArray } from 'src/shared/utils';
import { colors } from 'src/shared/styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useBookmark, useLogin, useVideoList } from 'src/hooks';
import { VideoItemType } from 'src/redux/videoList/types';
import {useNavigation} from '@react-navigation/native';
import {ScreensConstants} from 'src/constants/ScreenConstants';
import { StackNavigationProp } from '@react-navigation/stack';
 
export interface VideoDetailScreenProps {
  route: any
}

export const VideoDetailScreen = ({route}: VideoDetailScreenProps) => {

  const {isLoading,videoData,fetchVideoRequest} = useVideoList();
  useEffect(() => { fetchVideoRequest(); }, []);
  const styles = useThemeAwareObject(createStyles);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<any>>()

  const [selectedVideo, setSelectedVideo] = useState(route.params.data)
  const [videolistData, setVideolistData] = useState<VideoItemType[]>([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showupUp,setShowPopUp] = useState(false)
  
  const { isLoggedIn } = useLogin()
  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()

  useEffect(() => {
    formatVideoListData()
  }, [videoData,bookmarkIdInfo])

  const formatVideoListData = () => {
    let selectedVideoId = selectedVideo.nid
    const selectedVideoIndex = videoData.findIndex((item: any) => item.nid === selectedVideoId);
    const videoInfo = videoData ? videoData[selectedVideoIndex] : selectedVideo
    const otherVideosList = videoData.filter((item: any) => item.nid != selectedVideoId);
    if (isNonEmptyArray(videoData)) {
      const isBookmarked = validateBookmark(videoInfo.nid)
      setIsBookmarked(isBookmarked)
    }
    setSelectedVideo(videoInfo)
    setVideolistData(otherVideosList)
  }

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
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
      hasBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const onPressShare = async () => {
    if(!selectedVideo) return;
    const { title, field_mp4_link_export } = selectedVideo
    await Share.open({
        title,
        url: field_mp4_link_export,
        failOnCancel: true,
        subject: title
    }).then(response => {
        console.log('Shared successfully :::', response)
    }).catch((error) => {
        console.log('Cancelled share request :::', error)
    })
  }

  const goToPlayer = (item:VideoItemType) =>{
    if(item.field_mp4_link_export){
      navigation.navigate(ScreensConstants.VideoPlayerScreen,{videoUrl:item.field_mp4_link_export, nid: item.nid})
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
          onPressSave={()=> isNonEmptyArray(videoData) && checkAndUpdateBookmark(selectedVideo.nid)}
          isSaved={isBookmarked}
          isCloseIcon
        />
        {videoData.length&&<VideoInfo data={selectedVideo} onPress={(item:VideoItemType)=>{goToPlayer(item)}}/>}
      </View>
      <View style={styles.container}>
        <VideosList data={videolistData} onItemActionPress={(item:VideoItemType)=>goToPlayer(item)} />
      </View>
    </View>
  )
  return (
    <ScreenContainer edge={horizontalAndBottomEdge} barStyle={'light-content'} isLoading={isLoading}
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert}>
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
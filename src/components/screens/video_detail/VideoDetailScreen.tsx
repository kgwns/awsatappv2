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

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showupUp,setShowPopUp] = useState(false)
  
  const { isLoggedIn } = useLogin()
  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()

  useEffect(() => {
    if (isNonEmptyArray(videoData)) {
      const isBookmarked = validateBookmark(videoData[0].nid)
      setIsBookmarked(isBookmarked)
    }
  }, [videoData,bookmarkIdInfo])

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const onPressSave = (nid: string) => {
    const newBookmarked = !isBookmarked
    const data = [...videoData]
    data[0].isBookmarked = !data[0].isBookmarked
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

  const goToPlayer = (item:VideoItemType) =>{
    if(item.field_mp4_link_export){
       navigation.navigate(ScreensConstants.VideoPlayerScreen,{videoUrl:item.field_mp4_link_export})
    }
  }

  const renderItem = () => (
    <View >
      <View style={styles.headerStyle}>
        <PodcastProgramHeader
          headerShareIconTestId={'video_detail_share'}
          headerBookmarkIconTestId={'video_detail_save'}
          headerBackIconTestId={'video_detail_back'}
          onPressShare={onPressShare}
          onPressSave={()=> isNonEmptyArray(videoData) && checkAndUpdateBookmark(videoData[0].nid)}
          isSaved={isBookmarked}
          isCloseIcon
        />
        {videoData.length&&<VideoInfo data={videoData[0]} onPress={(item:VideoItemType)=>{goToPlayer(item)}}/>}
      </View>
      <View style={styles.container}>
        <VideosList data={videoData.slice(1)} onItemActionPress={(item:VideoItemType)=>goToPlayer(item)} />
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
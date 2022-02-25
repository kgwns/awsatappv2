import React, { useEffect } from 'react';
import {View, StyleSheet, FlatList, ListRenderItem} from 'react-native';

import {VideoItem, VideoItemProps} from 'src/components/molecules';
import {normalize} from 'src/shared/utils';
// import {videoTabData} from 'src/constants/SampleData';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {  ScreensConstants } from 'src/constants';
import {useTranslation} from 'react-i18next';
import { useVideoList } from 'src/hooks';
import {VideoItemType} from 'src/redux/videoList/types';
import { ScreenContainer } from '..';

interface VideoScreenProps {}

export const VideoScreen = (props: VideoScreenProps) => {

  const {isLoading,videoData,fetchVideoRequest} = useVideoList();
  const navigation = useNavigation<StackNavigationProp<any>>()
  useEffect(() => { fetchVideoRequest(); }, []);
  const onPressItem = (item:VideoItemProps)=>{
    navigation.navigate(ScreensConstants.VideoDetailScreen, {data: item})
  }
  const [t] = useTranslation();
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
      />
    );
  };
  return (
    <ScreenContainer isLoading={isLoading}>
      <View style={styles.container}>
        <FlatList
          data={videoData}
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

import * as React from 'react';
import {Text, View, StyleSheet, FlatList, ListRenderItem} from 'react-native';

import {VideoItem, VideoItemProps} from 'src/components/molecules';
import {normalize} from 'src/shared/utils';
import {videoTabData} from 'src/constants/SampleData';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {  ScreensConstants } from 'src/constants';
import {useTranslation} from 'react-i18next';

interface VideoScreenProps {}

export const VideoScreen = (props: VideoScreenProps) => {

  const navigation = useNavigation<StackNavigationProp<any>>()
  const onPressItem = (item:VideoItemProps)=>{
    navigation.navigate(ScreensConstants.VideoDetailScreen, {data: item})
  }

  const [t] = useTranslation();
  const renderItem: ListRenderItem<VideoItemProps> = ({item, index}) => {
    return (
      <VideoItem
        title={item.title}
        imageUrl={item.imageUrl}
        videoLabel={item.videoLabel}
        time={item.time}
        des={item.des}
        date={item.date}
        views={item.views}
        isFirstItem={index === 0}
        testID='video_screen_id'
        onPress={()=>onPressItem(item)}
        toWatchTitle={t('sectionVideo.toWatch')}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={videoTabData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {margin: normalize(15)},
});

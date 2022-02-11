import * as React from 'react';
import {Text, View, StyleSheet, FlatList, ListRenderItem} from 'react-native';

import {VideoItem, VideoItemProps} from 'src/components/molecules';
import {normalize} from 'src/shared/utils';
import {videoTabData} from 'src/constants/SampleData';

interface VideoScreenProps {}

export const VideoScreen = (props: VideoScreenProps) => {

  const renderItem: ListRenderItem<VideoItemProps> = ({item, index}) => {
    return (
      <VideoItem
        title={item.title}
        imageUrl={item.imageUrl}
        videoLabel={item.videoLabel}
        time={item.time}
        des={item.des}
        month={item.month}
        date={item.date}
        views={item.views}
         isFirstItem={index === 0}
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

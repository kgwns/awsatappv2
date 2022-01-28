import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { flatListUniqueKey } from '../../constants';
import { StoryCircle, StoryTitle, StoryHeader } from '../molecules';
import { colors } from '../../shared/styles/colors';
import { normalize } from '../../shared/utils';

const data = [
  {
    storyImage: "https://picsum.photos/200",
    storyTitle: "كوفيد-19"
  },
  {
    storyImage: "https://picsum.photos/200",
    storyTitle: "رحلة إلى المريخ"
  },
  {
    storyImage: "https://picsum.photos/200",
    storyTitle: "فضاء رأس مالي"
  },
  {
    storyImage: "https://picsum.photos/200",
    storyTitle: "أمريكا 2020"
  },
  {
    storyImage: "https://picsum.photos/200",
    storyTitle: "كوفيد-19"
  },
  {
    storyImage: "https://picsum.photos/200",
    storyTitle: "رحلة إلى المريخ"
  },
  {
    storyImage: "https://picsum.photos/200",
    storyTitle: "فضاء رأس مالي"
  },
  {
    storyImage: "https://picsum.photos/200",
    storyTitle: "أمريكا 2020"
  },
]

const StoryWidget = () => {
  const renderItem = (item: any, index: number) => {
    return (
      <View style={StoryWidgetStyle.storyContainer} key={flatListUniqueKey.STORY_WIDGET + index}>
        <View style={StoryWidgetStyle.circleContainer}>
          <StoryCircle storyImageUrl={item.storyImage} onPress={() => console.log('story pressed')} />
        </View>
        <View style={StoryWidgetStyle.titleContainer}>
          <StoryTitle storyTitle={item.storyTitle} />
        </View>
      </View>
    )
  }

  return (
    <View style={StoryWidgetStyle.container}>
      <StoryHeader headerTitle={'مذا يحدث الآن'} />
      <FlatList
        horizontal
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.STORY_WIDGET + new Date().getTime().toString()}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </View>
  );
};

export default StoryWidget;

const StoryWidgetStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: normalize(170),
    backgroundColor: colors.white
  },
  storyContainer: {
    width: normalize(71),
    justifyContent: 'flex-end',
    marginVertical: normalize(10),
    marginLeft: normalize(14)
  },
  circleContainer: {
    height: '50%'
  },
  titleContainer: {
    height: '25%',
    marginTop: normalize(24)
  }
})
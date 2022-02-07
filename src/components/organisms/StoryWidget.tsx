import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { flatListUniqueKey } from '../../constants';
import { StoryCircle, StoryTitle, StoryHeader } from '../molecules';
import { normalize } from '../../shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'

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
  const style = useThemeAwareObject(storyWidgetStyle)

  const renderItem = (item: any, index: number) => {
    return (
      <View style={style.storyContainer} key={flatListUniqueKey.STORY_WIDGET + index}>
        <View style={style.circleContainer}>
          <StoryCircle storyImageUrl={item.storyImage} onPress={() => console.log('story pressed')} />
        </View>
        <View style={style.titleContainer}>
          <StoryTitle storyTitle={item.storyTitle} />
        </View>
      </View>
    )
  }

  return (
    <View style={style.container}>
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

const storyWidgetStyle = (theme: CustomThemeType) => {
  const style = StyleSheet.create({
    container: {
      width: '100%',
      height: normalize(170),
      backgroundColor: theme.secondaryWhite
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
  return style
}
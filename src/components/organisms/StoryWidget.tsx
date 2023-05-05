import { View, StyleSheet, FlatList } from 'react-native';
import React, {FunctionComponent} from 'react';
import { flatListUniqueKey, TranslateConstants, TranslateKey } from '../../constants/Constants';
import { StoryCircle, StoryTitle, StoryHeader } from '../molecules';
import { normalize, recordLogEvent } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { StoryListProps } from 'src/components/organisms';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export interface StoryWidgetProps {
  testID?: string;
  onPress?: (item: StoryListProps,index:number) => void;
  data: StoryListProps[];
}

const StoryWidget: FunctionComponent<StoryWidgetProps> = ({
  onPress,
  data,
  testID,
}) =>{
  const style = useThemeAwareObject(storyWidgetStyle)
  const STORY_WIDGET_HEADER_TITLE = TranslateConstants({key:TranslateKey.STORY_WIDGET_HEADER_TITLE});
  const handleOnItemPressAction = (item: StoryListProps,index:number) => {
    if (onPress) {
      onPress(item,index);
    }
  };

  const renderItem = (item: any, index: number) => {
    return (
      <View style={style.storyContainer} key={flatListUniqueKey.STORY_WIDGET + index}>
        <View style={style.circleContainer}>
          <StoryCircle testID={`${testID}_${index}`} storyImageUrl={item.data[0]?.imageUrl}
              onPress={() => {
                recordLogEvent(AnalyticsEvents.VIEWED_STORY, {storyId: item.id});
                handleOnItemPressAction(item,index);
              }}
          />
        </View>
        <View style={style.titleContainer}>
          <StoryTitle storyTitle={item.data[0]?.title} />
        </View>
      </View>
    )
  }

  return (
    <View style={style.container}>
      <StoryHeader headerTitle= {STORY_WIDGET_HEADER_TITLE} />
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
  return StyleSheet.create({
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
}

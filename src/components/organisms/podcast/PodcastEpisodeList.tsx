import React, {useState, FunctionComponent} from 'react';
import {Keyboard, View, FlatList, ListRenderItem, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import { Label, LoadingState } from 'src/components/atoms/';
import { PodcastVerticalList, PodcastVerticalListProps } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';

export interface PodcastEpisodeListProps {
  onItemActionPress?: (item: PodcastVerticalListProps) => void;
  data: PodcastVerticalListProps[];
}

const keyExtractor = (_item:PodcastVerticalListProps,index: number) => {
  return `serachResults-${index}`;
};

export const PodcastEpisodeList: FunctionComponent<PodcastEpisodeListProps> = ({
  onItemActionPress,
  data,
}) => {
  const styles = useThemeAwareObject(createStyles);

  const handleOnItemPressAction = (item: PodcastVerticalListProps) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

  const renderItem: ListRenderItem<PodcastVerticalListProps> = ({item,index}) => {
    return (
      <PodcastVerticalList
        imageUrl={item.imageUrl}
        title={item.title}
        description={item.description}
        testID={`podcastepisode_${index}`}
        itemOnPress={()=>handleOnItemPressAction(item)}
      />
    );
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.rowStyle} >

      </View>
      <FlatList
        testID={'episodeListTestId'}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
      />
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  containerStyle: {
    flex : 1,
    paddingHorizontal: normalize(20),
  },
  rowStyle: {
    flexDirection: 'row',
  }
});

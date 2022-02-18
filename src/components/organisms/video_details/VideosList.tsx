import React, {FunctionComponent} from 'react';
import {View, FlatList, ListRenderItem, StyleSheet} from 'react-native';
import { Label } from 'src/components/atoms/';
import { VideosVerticalList, VideosVerticalListProps, VideoItemProps } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import { colors } from 'src/shared/styles/colors';

export interface VideosListProps {
  onItemActionPress?: (item: VideoItemProps) => void;
  data: VideoItemProps[];
}

const keyExtractor = (_item:VideoItemProps,index: number) => {
  return `podcastEpisodeContent-${index}`;
};

export const VideosList: FunctionComponent<VideosListProps> = ({
  onItemActionPress,
  data,
}) => {
  const styles = useThemeAwareObject(createStyles);
  const [t] = useTranslation();

  const handleOnItemPressAction = (item: VideoItemProps) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

  const renderItem: ListRenderItem<VideoItemProps> = ({item,index}) => {
    return (
      <VideosVerticalList
        imageUrl={item.imageUrl}
        title={item.title}
        time={item.time}
        testID={`podcastepisodecontent_${index}`}
        itemOnPress={()=>handleOnItemPressAction(item)}
      />
    );
  };

  return (
    <View style={styles.containerStyle}>
      <FlatList
        testID={'videosListId'}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
        ItemSeparatorComponent={()=><View style={styles.dividerStyle} />}
      />
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  containerStyle: {
    flex : 1,
    marginHorizontal: normalize(10),
  },
  dividerStyle: {
    height: 0.5,
    backgroundColor: colors.altoGray,
  }
});

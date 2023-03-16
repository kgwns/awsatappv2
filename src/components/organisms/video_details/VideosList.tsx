import React, {FunctionComponent} from 'react';
import {View, FlatList, ListRenderItem, StyleSheet} from 'react-native';
import { VideosVerticalList } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType,colors} from 'src/shared/styles/colors';
import {getImageUrl, convertSecondsToHMS} from 'src/shared/utils/utilities';

export interface VideosListProps {
  onItemActionPress?: (item: any) => void;
  data: any;
}

const keyExtractor = (_item:any,index: number) => {
  return `podcastEpisodeContent-${index}`;
};

export const VideosList: FunctionComponent<VideosListProps> = ({
  onItemActionPress,
  data,
}) => {
  const styles = useThemeAwareObject(createStyles);

  const handleOnItemPressAction = (item: any) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

  const renderItem: ListRenderItem<any> = ({item,index}) => {
    const imageLink = item.field_thumbnil_multimedia_export ? getImageUrl(item.field_thumbnil_multimedia_export) : undefined;
    const time = item.field_jwplayerinfo_export ? convertSecondsToHMS(item.field_jwplayerinfo_export.split('|')[1]) : undefined;
    return (
      <VideosVerticalList
        imageUrl={imageLink}
        title={item.title}
        time={time}
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

const createStyles = (_theme: CustomThemeType) =>
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

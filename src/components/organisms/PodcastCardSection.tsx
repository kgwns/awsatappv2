import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants/Constants';
import {normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {PodcastCardWithLabel} from 'src/components/molecules';

export interface PodcastCardProps {
  imageUrl: string;
  podcastTitle: string;
  announcerName: string;
}

interface PodcastCardSectionProps {
  data: PodcastCardProps[];
  onPress?: (item: PodcastCardProps)=> void;
}

export const PodcastCardSection = ({data,onPress}: PodcastCardSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const handleOnItemPressAction = (item: PodcastCardProps) => {
    if (onPress) {
      onPress(item);
    }
  };
  const renderItem = (item: PodcastCardProps, index: number) => {
    return (
      <View
        style={style.cardContainer}
        key={flatListUniqueKey.PODCAST_CARD_SECTION + index}>
        <PodcastCardWithLabel
          imageUrl={item.imageUrl}
          title={item.podcastTitle}
          description={item.announcerName}
          testID={`podcast_${index}`}
          itemOnPress={()=>handleOnItemPressAction(item)}
        />
      </View>
    );
  };
  return (
    <View style={style.container}>
      <FlatList
        horizontal
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.PODCAST_CARD_SECTION +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.secondaryWhite,
    },
    cardContainer: {
      width: normalize(257),
      height: normalize(233),
      alignItems: 'flex-start',
      margin: normalize(10),
      backgroundColor: theme.secondaryWhite,
    },
  });
};

export default PodcastCardSection;

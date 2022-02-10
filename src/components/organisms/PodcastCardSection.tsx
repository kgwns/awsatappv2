import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants';
import {normalize} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {PodcastCardWithLabel} from 'src/components/molecules';

export interface podcastCardProps {
  imageUrl: string;
  podcastTitle: string;
  announcerName: string;
}

interface podcastCardSectionProps {
  data: podcastCardProps[];
}

export const PodcastCardSection = ({data}: podcastCardSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const renderItem = (item: podcastCardProps, index: number) => {
    return (
      <View
        style={style.cardContainer}
        key={flatListUniqueKey.PODCAST_CARD_SECTION + index}>
        <PodcastCardWithLabel
          imageUrl={item.imageUrl}
          title={item.podcastTitle}
          description={item.announcerName}
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
  const PodcastCardStyle = StyleSheet.create({
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
  return PodcastCardStyle;
};

export default PodcastCardSection;

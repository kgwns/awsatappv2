import React, {FunctionComponent} from 'react';
import {View, FlatList, ListRenderItem, StyleSheet} from 'react-native';
import { Label } from 'src/components/atoms/';
import { PodcastVerticalList, PodcastVerticalListProps } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import { colors } from 'src/shared/styles/colors';

export interface PodcastEpisodeContentProps {
  onItemActionPress?: (item: PodcastVerticalListProps) => void;
  data: PodcastVerticalListProps[];
  onPressBookmark: (nid: string) => void
}

const keyExtractor = (_item:PodcastVerticalListProps,index: number) => {
  return `podcastEpisodeContent-${index}`;
};

export const PodcastEpisodeContent: FunctionComponent<PodcastEpisodeContentProps> = ({
  onItemActionPress,
  data,
  onPressBookmark
}) => {
  const styles = useThemeAwareObject(createStyles);
  const [t] = useTranslation();

  const handleOnItemPressAction = (item: any) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

  const renderItem: ListRenderItem<any> = ({item,index}) => {
    return (
      <PodcastVerticalList
        nid={item?.nid}
        imageUrl={item?.field_podcast_sect_export?.img_podcast_mobile}
        title={item?.title}
        description={item?.body_export}
        footerLeft={item?.field_total_duration_export}
        footerRight={item?.created_export}
        testID={`podcastepisode_${index}`}
        itemOnPress={() => handleOnItemPressAction(item)}
        isBookmarked={item.isBookmarked}
        onPressBookmark={() => onPressBookmark(item.nid)}
      />
    );
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.rowStyle} >
        <View style={styles.headerLeftStyle}>
          <Label style={styles.textStyle} children={t('podcastEpisode.moreEpisodes')} />
        </View>
      </View>
      <FlatList
        testID={'episodeContentListTestId'}
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
  },
  rowStyle: {
    flexDirection: 'row',
    paddingVertical: normalize(15),
  },
  headerLeftStyle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  headerRightStyle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textStyle: {
    fontSize: normalize(14),
    lineHeight: normalize(16),
    fontWeight: 'bold',
    color: colors.greenishBlue,
  },
  dividerStyle: {
    height: 0.5,
    backgroundColor: colors.altoGray,
    marginHorizontal: normalize(10),
  }
});

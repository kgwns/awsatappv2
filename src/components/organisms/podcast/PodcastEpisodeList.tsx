import React, { FunctionComponent } from 'react';
import { View, FlatList, ListRenderItem, StyleSheet} from 'react-native';
import { Label } from 'src/components/atoms/label/Label';
import { PodcastVerticalList, PodcastVerticalListProps } from 'src/components/molecules/';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType,colors} from 'src/shared/styles/colors';
import { fonts } from 'src/shared/styles/fonts';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';
 
export interface PodcastEpisodeListProps {
  onItemActionPress?: (item: any) => void;
  data: PodcastVerticalListProps[];
  onUpdateBookmark: (index: number) => void
}

const keyExtractor = (_item:PodcastVerticalListProps,index: number) => {
  return `podcastEpisodeList-${index}`;
};

export const PodcastEpisodeList: FunctionComponent<PodcastEpisodeListProps> = ({
  onItemActionPress,
  data,
  onUpdateBookmark
}) => {
  const styles = useThemeAwareObject(createStyles);
  const PODCAST_PROGRAM_EPISODES = TranslateConstants({key:TranslateKey.PODCAST_PROGRAM_EPISODES})

  const handleOnItemPressAction = (item: any) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

  const renderItem: ListRenderItem<any> = ({item,index}) => {
    return (
      <PodcastVerticalList
        nid={item?.nid}
        secondaryTitle={item?.type}
        author={item?.field_announcer_name_export}
        imageUrl={item?.field_podcast_sect_export?.image}
        title={item?.title}
        description={item?.body_export}
        footerLeft={item?.field_total_duration_export}
        footerRight={item?.created_export}
        testID={`podcastepisode_${index}`}
        itemOnPress={() => handleOnItemPressAction(item)}
        isBookmarked={item.isBookmarked}
        onPressBookmark={() => onUpdateBookmark(index)}
        spreakerId={item?.field_spreaker_episode_export}
      />
    );
  };

  return (
    <View style={{ marginHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth) }}>
      <View style={styles.rowStyle} >
        <View style={styles.headerLeftStyle}>
          <Label style={styles.textStyle} children={PODCAST_PROGRAM_EPISODES} />
        </View>
        <View style={styles.headerRightStyle}>
          {/* <ArrowUpDown /> will enable this icon once mini player implementation started  */} 
        </View>
      </View>
      <View style={styles.containerStyle}>
        <FlatList
          testID={'episodeListTestId'}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          bounces={false}
          ItemSeparatorComponent={() => <View style={styles.dividerStyle} />}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  containerStyle: {
    paddingTop: normalize(10),
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: theme.podcastEpisodeCardColor
  },
  rowStyle: {
    flexDirection: 'row',
    paddingBottom: normalize(15),
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
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.AwsatDigital_Bold,
    color: colors.greenishBlue,
  },
  dividerStyle: {
    height: 0.5,
    backgroundColor: colors.altoGray,
    marginHorizontal: normalize(10),
  }
});

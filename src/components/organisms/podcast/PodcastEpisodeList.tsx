import React, { FunctionComponent } from 'react';
import { View, FlatList, ListRenderItem, StyleSheet} from 'react-native';
import { Label } from 'src/components/atoms/';
import { PodcastVerticalList, PodcastVerticalListProps } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import ArrowUpDown from 'src/assets/images/icons/arrow_up_down.svg';
import { colors } from 'src/shared/styles/colors';
 
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
        secondaryTitle={item?.type}
        author={item?.field_announcer_name_export}
        imageUrl={item?.field_podcast_sect_export.img_podcast_mobile}
        title={item?.title}
        description={item?.body_export}
        footerLeft={item?.field_duration_export_1}
        footerRight={item?.footerRight}
        testID={`podcastepisode_${index}`}
        itemOnPress={() => handleOnItemPressAction(item)}
        isBookmarked={item.isBookmarked}
        onPressBookmark={() => onUpdateBookmark(index)}
      />
    );
  };

  return (
    <View style={{ marginHorizontal: normalize(20) }}>
      <View style={styles.rowStyle} >
        <View style={styles.headerLeftStyle}>
          <Label style={styles.textStyle} children={t('podcastProgram.episodes')} />
        </View>
        <View style={styles.headerRightStyle}>
          <ArrowUpDown />
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

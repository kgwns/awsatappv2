import React, {useState, FunctionComponent} from 'react';
import {Keyboard, View, FlatList, ListRenderItem, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import { Label, LoadingState } from 'src/components/atoms/';
import { PodcastVerticalList, PodcastVerticalListProps } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import ArrowUpDown from 'src/assets/images/icons/arrow_up_down.svg';
import { colors } from 'src/shared/styles/colors';
 
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
  const [t] = useTranslation();

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
        footerLeft={item.footerLeft}
        footerRight={item.footerRight}
        testID={`podcastepisode_${index}`}
        itemOnPress={()=>handleOnItemPressAction(item)}
      />
    );
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.rowStyle} >
        <View style={styles.headerLeftStyle}>
          <Label style={styles.textStyle} children={t('podcastProgram.episodes')} />
        </View>
        <View style={styles.headerRightStyle}>
          <ArrowUpDown />
        </View>
      </View>
      <FlatList
        testID={'episodeListTestId'}
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

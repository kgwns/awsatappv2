import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {flatListUniqueKey, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import {NewsWithImageItem} from '../molecules';
import {SectionHeader} from '../molecules/podcast/SectionHeader';
import {NewsWithImageItemProps} from '../molecules/podcast/NewsWithImageItem';
import {Divider} from '../atoms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';

interface LatestNewsSummarySectionProps {
  data: NewsWithImageItemProps[];
}

export const LatestNewsSummarySection = ({
  data,
}: LatestNewsSummarySectionProps) => {
  const style = useThemeAwareObject(customStyle)
  const LATEST_NEWS_SUMMARY_HEADER_LEFT = TranslateConstants({key:TranslateKey.LATEST_NEWS_SUMMARY_HEADER_LEFT})
  const LATEST_NEWS_SUMMARY_HEADER_RIGHT = TranslateConstants({key:TranslateKey.LATEST_NEWS_SUMMARY_HEADER_RIGHT})

  const renderItem = (item: NewsWithImageItemProps, index: number) => (
    <View key={flatListUniqueKey.LATEST_NEWS_SUMMARY_WIDGET + index}>
      <NewsWithImageItem
        imageUrl={item.imageUrl}
        title={item.title}
        description={item.description}
        footerRightLabel={item.footerRightLabel}
        footerLeftLabel={item.footerLeftLabel}
        footerRightHighlight={true}
      />
    </View>
  );

  return (
    <View>
      <SectionHeader headerLeft={LATEST_NEWS_SUMMARY_HEADER_LEFT} headerRight={LATEST_NEWS_SUMMARY_HEADER_RIGHT} />
      <FlatList
        horizontal
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.LATEST_NEWS_SUMMARY_WIDGET +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      <Divider style={style.divider}/>
    </View>
  );
};

export default LatestNewsSummarySection;
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  divider: {
      height: 1,
      backgroundColor: theme.dividerColor
  },
});

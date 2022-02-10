import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {flatListUniqueKey} from 'src/constants';
import {NewsWithImageItem} from '../molecules';
import {SectionHeader} from '../molecules/podcast/SectionHeader';
import {NewsWithImageItemProps} from '../molecules/podcast/NewsWithImageItem';
import {Divider} from '../atoms';

interface LatestNewsSummarySectionProps {
  data: NewsWithImageItemProps[];
}

export const LatestNewsSummarySection = ({
  data,
}: LatestNewsSummarySectionProps) => {
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
      <SectionHeader headerLeft={'المزيد'} headerRight={'ملخص آخر الأخبار'} />
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
      <Divider />
    </View>
  );
};

export default LatestNewsSummarySection;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {flatListUniqueKey} from 'src/constants/Constants';
import {Divider} from '../atoms';
import {ArticleRectangleCard} from '../molecules';
import {SectionHeader} from '../molecules/podcast/SectionHeader';
import {ArticleRectangleCardProps} from '../molecules/podcast/ArticleRectangleCard';

interface mostPlayedSectionProps {
  data: ArticleRectangleCardProps[];
}

const MostPlayedSection = ({data}: mostPlayedSectionProps) => {
  const style = useThemeAwareObject(customStyle);

  const renderItem = (item: ArticleRectangleCardProps, index: number) => {
    return (
      <View key={flatListUniqueKey.MOST_PLAYED_CARD + index}>
        <ArticleRectangleCard
          trendingNumber={item.trendingNumber}
          title={item.title}
          imageUrl={item.imageUrl}
          footerLeft={item.footerLeft}
          footerRight={item.footerRight}
        />
      </View>
    );
  };

  const makeColumn = () => {
    return (
      <FlatList
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.MOST_PLAYED_CARD + new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    );
  };

  return (
    <View style={style.container}>
      <SectionHeader
        headerLeft={'المزيد'}
        headerRight={'اكثر الحلقات التي تم تشغيلها'}
      />
      <FlatList
        horizontal
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.MOST_PLAYED_CARD + new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={() => makeColumn()}
      />
      <Divider style={style.divider}/>
    </View>
  );
};

export default MostPlayedSection;

const customStyle = (theme: CustomThemeType) => {
  const MostPlayedSectionStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      width: '100%',
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
  },
  });
  return MostPlayedSectionStyle;
};

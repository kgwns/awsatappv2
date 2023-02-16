import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CustomThemeType} from 'src/shared/styles/colors';
import {flatListUniqueKey, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import {Divider} from '../atoms';
import {ArticleRectangleCardProps} from '../molecules/podcast/ArticleRectangleCard';
import {SectionHeader} from '../molecules/podcast/SectionHeader';
import {ArticleRectangleCard} from '../molecules';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';

interface PodcastOpinionArticleSectionProps {
  data: ArticleRectangleCardProps[];
}
export const PodcastOpinionArticleSection = ({
  data,
}: PodcastOpinionArticleSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const PODCAST_OPINION_ARTICLE_HEADER_LEFT = TranslateConstants({key:TranslateKey.PODCAST_OPINION_ARTICLE_HEADER_LEFT})
  const PODCAST_OPINION_ARTICLE_HEADER_RIGHT = TranslateConstants({key:TranslateKey.PODCAST_OPINION_ARTICLE_HEADER_RIGHT})

  const renderItem = (item: ArticleRectangleCardProps, index: number) => {
    return (
      <View key={flatListUniqueKey.PODCAST_OPINION_ARTICLE_WIDGET + index}>
        <ArticleRectangleCard
          trendingNumber={item.trendingNumber}
          title={item.title}
          imageUrl={item.imageUrl}
          footerLeft={item.footerLeft}
          footerRight={item.footerRight}
          footerRightHighlight={true}
          imageType="round"
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
          flatListUniqueKey.PODCAST_OPINION_ARTICLE_WIDGET +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    );
  };

  return (
    <View>
      <SectionHeader headerLeft={PODCAST_OPINION_ARTICLE_HEADER_LEFT} headerRight={PODCAST_OPINION_ARTICLE_HEADER_RIGHT} />
      <FlatList
        horizontal
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.PODCAST_OPINION_ARTICLE_WIDGET +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={() => makeColumn()}
      />
      <Divider style={style.divider}/>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      width: '100%',
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
  },
  });
};

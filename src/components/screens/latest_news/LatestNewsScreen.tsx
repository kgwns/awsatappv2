import React from 'react';
import { FlatList, View } from 'react-native';
import {
  ArticleSection, CarouselSlider, PodcastWidget,
  ShortArticle, StoryWidget, AuthorWidget, BannerArticleSection, ShortArticleProps
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { articleSectionData, shortArticleData, shortArticleWithTagData } from 'src/constants/SampleData';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { horizontalEdge } from 'src/shared/utils';

export const LatestNewsScreen = () => {
  const { themeData } = useTheme()

  shortArticleWithTagData.map((item: ShortArticleProps) => item.titleColor = themeData.primaryBlack)

  const renderItem = () => (
    <View>
      <CarouselSlider />
      <PodcastWidget />
      <ArticleSection data={articleSectionData}/>
      <ShortArticle data={shortArticleWithTagData} />
      <StoryWidget />
      <ShortArticle data={shortArticleData} />
      <BannerArticleSection />
      <AuthorWidget />
    </View>
  )

  return (
    <ScreenContainer edge={horizontalEdge}>
      <FlatList
        style={{ flex: 1, height: '100%' }}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ }) => renderItem()}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  )
}
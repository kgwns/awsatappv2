import React from 'react';
import { FlatList, View } from 'react-native';
import {
  ArticleSection, CarouselSlider, PodcastWidget,
  ShortArticle, StoryWidget, AuthorWidget, BannerArticleSection
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { articleSectionData, shortArticleData, shortArticleWithTagData } from 'src/constants/SampleData';
import { colors } from 'src/shared/styles/colors';

export const LatestNewsScreen = () => {

  const renderItem = () => (
    <View style={{ backgroundColor: colors.aquaHaze }}>
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
    <ScreenContainer>
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
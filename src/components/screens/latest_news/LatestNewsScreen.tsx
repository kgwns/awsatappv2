import React from 'react';
import {
  FlatList,
  View
} from 'react-native';
import { ArticleSection, CarouselSlider, PodcastWidget, ShortArticle, StoryWidget } from '../../../components/organisms'
import { ScreenContainer } from '..'
import { shortArticleData, shortArticleWithTagData } from '../../../constants/SampleData';
import { AuthorWidget } from '../../../components/organisms';
import { colors } from '../../../shared/styles/colors';
import { BannerArticleSection } from '../../../components/organisms'

export const LatestNewsScreen = () => {

  const renderItem = () => (
    <View style={{ backgroundColor: colors.aquaHaze }}>
      <CarouselSlider />
      <PodcastWidget />
      <ArticleSection />
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
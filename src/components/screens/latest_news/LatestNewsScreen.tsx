import React from 'react';
import {
  FlatList,
  View
} from 'react-native';
import { ArticleSection, CarouselSlider, PodcastWidget, ShortArticle, StoryWidget } from '../../../components/organisms'
import { ScreenContainer } from '..'
import { normalize, screenWidth } from '../../../shared/utils'
import { shortArticleData, shortArticleWithTagData } from '../../../constants/SampleData';
import { AuthorWidget } from '../../../components/organisms';
import { colors } from '../../../shared/styles/colors';

export const LatestNewsScreen = () => {

  //TODO: need to remove view component once pod cast added
  const renderItem = () => (
    <View style={{ backgroundColor: colors.aquaHaze }}>
      <CarouselSlider />
      <PodcastWidget />
      <ArticleSection />
      <ShortArticle data={shortArticleWithTagData} />
      <View style={{ width: screenWidth, height: normalize(20) }} />
      <ShortArticle data={shortArticleData} />
      <AuthorWidget />
      <StoryWidget />
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
import React from 'react';
import {
  FlatList,
  View
} from 'react-native';
import { ArticleSection, CarouselSlider, ShortArticle } from '../../../components/organisms'
import { ScreenContainer } from '..'
import { normalize, screenWidth } from '../../../shared/utils'
import { shortArticleData, shortArticleWithTagData } from '../../../constants/SampleData';
import { AuthorWidget } from '../../../components/organisms';

export const LatestNewsScreen = () => {

  //TODO: need to remove view component once pod cast added
  const renderItem = () => (
    <>
      <CarouselSlider />
      <View style={{ width: screenWidth, height: normalize(20) }} />
      <ArticleSection />
      <ShortArticle data={shortArticleWithTagData} />
      <View style={{ width: screenWidth, height: normalize(20) }} />
      <ShortArticle data={shortArticleData}/>
      <AuthorWidget />
    </>
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
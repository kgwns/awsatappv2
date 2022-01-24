import React from 'react';
import {
  StatusBar,
  useColorScheme,
  FlatList,
  View
} from 'react-native';
import { ArticleSection, CarouselSlider, ShortArticle } from '../../../components/organisms'
import { ScreenContainer } from '..'
import { normalize, screenWidth } from '../../../shared/utils'

export const LatestNewsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark'

  //TODO: need to remove once pod cast added
  const renderItem = () => (
    <>
      <CarouselSlider />
      <View style={{ width: screenWidth, height: normalize(20) }} />
      <ArticleSection />
      <ShortArticle />
    </>
  )
  return (
    <ScreenContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
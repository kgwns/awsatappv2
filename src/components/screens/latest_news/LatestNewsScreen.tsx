import React from 'react';
import {
  StatusBar,
  useColorScheme,
  FlatList
} from 'react-native';
import { ArticleSection, ShortArticle } from '../../../components/organisms'
import { ScreenContainer } from '..'

export const LatestNewsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const renderItem = () => (
    <>
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
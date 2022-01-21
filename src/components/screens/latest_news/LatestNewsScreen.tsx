import React from 'react';
import {
  StatusBar,
  useColorScheme,
  ScrollView
} from 'react-native';
import { ArticleSection, ShortArticle } from '../../../components/organisms'
import { ScreenContainer } from '..'

export const LatestNewsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <ScreenContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <ArticleSection />
        <ShortArticle />
      </ScrollView>
    </ScreenContainer>
  );
};
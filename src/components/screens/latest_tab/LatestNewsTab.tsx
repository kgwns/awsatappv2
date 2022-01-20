import React from 'react'
import { ScrollView } from 'react-native'
import { ArticleSection, ShortArticle } from '../../../components/organisms'
import { ScreenContainer } from '..'

const LatestNewsTab = () => {
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <ArticleSection />
        <ShortArticle />
      </ScrollView>
    </ScreenContainer>
  )
}

export default LatestNewsTab

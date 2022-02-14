import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  ArticleSection, CarouselSlider, PodcastWidget,
  ShortArticle, StoryWidget, AuthorWidget, BannerArticleSection, SectionComboOne
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { shortArticleWithTagProperties } from 'src/constants/SampleData';
import { horizontalEdge, isTab, normalize } from 'src/shared/utils';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useLatestNewsTab } from 'src/hooks';
import { LatestArticleBodyGet, LatestArticleDataType, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';

const tickerAndHeroPayload: LatestArticleBodyGet = {
  items_per_page: 10,
  page: 0,
  offset: 0
}

const heroListTopListPayload: LatestArticleBodyGet = {
  items_per_page: 10,
  page: 0,
  offset: 6
}

const sectionComboOnePayload: RequestSectionComboBodyGet = {
  id: 726
}

const sectionComboTwoPayload: RequestSectionComboBodyGet = {
  id: 871
}

const sectionComboThreePayload: RequestSectionComboBodyGet = {
  id: 11
}

const sectionComboFourPayload: RequestSectionComboBodyGet = {
  id: 10
}

export const LatestNewsScreen = () => {
  const { themeData } = useTheme()

  const {
    isLoading, ticker, hero, heroList, topList,
    sectionComboOne, sectionComboTwo, sectionComboThree, sectionComboFour,
    fetchTickerAndHeroArticle, fetchHeroListTopList,
    fetchSectionComboOne, fetchSectionComboTwo,
    fetchSectionComboThree, fetchSectionComboFour
  } = useLatestNewsTab()

  const heroListData = isTab ? heroList.slice(0, 1) : heroList
  const topListData = topList.map((item: LatestArticleDataType) => {
    return {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
    }
  })

  useEffect(() => {
    fetchTickerAndHeroArticle(tickerAndHeroPayload)
    fetchHeroListTopList(heroListTopListPayload)
    fetchSectionComboOne(sectionComboOnePayload)
    fetchSectionComboTwo(sectionComboTwoPayload)
    fetchSectionComboThree(sectionComboThreePayload)
    fetchSectionComboFour(sectionComboFourPayload)
  }, [])

  const renderItem = () => (
    <View>
      <CarouselSlider tickerData={ticker} heroData={hero} />
      {
        isTab ? <View style={latestNewsScreenStyle.tabSplitter}>
          <View style={latestNewsScreenStyle.tabWidgetContainer}>
            <ArticleSection data={heroListData} />
            <PodcastWidget />
          </View>
          <View style={latestNewsScreenStyle.tabWidgetContainer}>
            <ShortArticle data={topListData} />
          </View>
        </View>
          :
          <>
            <PodcastWidget />
            <ArticleSection data={heroListData} />
            <ShortArticle data={topListData} />
          </>
      }
      <StoryWidget />
      <SectionComboOne data={sectionComboOne}/>
      <BannerArticleSection data={sectionComboTwo} />
      <Divider style={{ height: normalize(20) }} />
      <AuthorWidget />
      <BannerArticleSection data={sectionComboThree} />
      <Divider style={{ height: normalize(20) }} />
      <BannerArticleSection data={sectionComboFour} />
      <Divider style={{ height: normalize(50) }} />
    </View>
  )

  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isLoading}>
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

const latestNewsScreenStyle = StyleSheet.create({
  tabSplitter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: normalize(40)
  },
  tabWidgetContainer: {
    flex: 0.5
  }
})
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  ArticleSection, CarouselSlider, PodcastWidget,
  ShortArticle, StoryWidget, AuthorWidget, BannerArticleSection, ShortArticleProps, StoryListProps
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { shortArticleData, shortArticleWithTagProperties, storyWidgetData } from 'src/constants/SampleData';
import { horizontalEdge, isTab, normalize } from 'src/shared/utils';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useLatestNewsTab } from 'src/hooks';
import { LatestArticleBodyGet, LatestArticleDataType } from 'src/redux/latestNews/types';
import {ScreensConstants} from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

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

export const LatestNewsScreen = () => {
  const { themeData } = useTheme()
  const navigation = useNavigation<StackNavigationProp<any>>()

  const {
    isLoading, ticker, hero, heroList, topList, fetchTickerAndHeroArticle, fetchHeroListTopList
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
      <StoryWidget  data={storyWidgetData}
        onPress={(item: StoryListProps,index: number)=>
          navigation.navigate(ScreensConstants.StoryScreen,
            {id:item.id,selectedIndex:index}
          )}
      />
      {
        isTab ? <View style={latestNewsScreenStyle.tabSplitter}>
          <View style={latestNewsScreenStyle.tabWidgetContainer}>
          </View>
          <View style={latestNewsScreenStyle.tabWidgetContainer}>
            <ShortArticle data={shortArticleData} />
          </View>
        </View>
          :
          <ShortArticle data={shortArticleData} />
      }
      <BannerArticleSection />
      <Divider style={{ height: normalize(30) }} />
      <AuthorWidget />
      <BannerArticleSection />
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
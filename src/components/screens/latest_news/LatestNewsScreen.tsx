import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  ArticleSection, CarouselSlider, PodcastWidget,
  ShortArticle, StoryWidget, AuthorWidget, BannerArticleSection, SectionComboOne, StoryListProps
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { shortArticleWithTagProperties, storyWidgetData } from 'src/constants/SampleData';
import { horizontalEdge, isTab, normalize } from 'src/shared/utils';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useLatestNewsTab } from 'src/hooks';
import { LatestArticleBodyGet, LatestArticleDataType, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { ScreensConstants } from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

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
const opinionListPayload: LatestArticleBodyGet = {
  items_per_page: 4,
  page: 0,
  offset: 0
}

const sectionComboOnePayload: RequestSectionComboBodyGet = {
  id: 726
}

const sectionComboTwoPayload: RequestSectionComboBodyGet = {
  id: 871,
  items_per_page: 10,
  page: 0
}

const sectionComboThreePayload: RequestSectionComboBodyGet = {
  id: 11,
  items_per_page: 10,
  page: 0
}

const sectionComboFourPayload: RequestSectionComboBodyGet = {
  id: 10,
  items_per_page: 10,
  page: 0
}

export const LatestNewsScreen = () => {
  const { themeData } = useTheme()
  const [t] = useTranslation()
  const navigation = useNavigation<StackNavigationProp<any>>()

  const {
    isLoading, ticker, hero, heroList, topList, opinionList,
    sectionComboOne, sectionComboTwo, sectionComboThree, sectionComboFour,
    fetchTickerAndHeroArticle, fetchHeroListTopList, fetchOpinionTopList,
    fetchSectionComboOne, fetchSectionComboTwo,
    fetchSectionComboThree, fetchSectionComboFour
  } = useLatestNewsTab()

  const heroListInfo = isTab ? heroList.slice(0, 1) : heroList
  const heroListData = heroListInfo.map((item: LatestArticleDataType) => (
    {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
      tagName: item.news_categories.title
    }
  ))

  const topListData = topList.map((item: LatestArticleDataType) => (
    {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
      flag: item.news_categories.title
    }
  ))

  useEffect(() => {
    fetchTickerAndHeroArticle(tickerAndHeroPayload)
    fetchHeroListTopList(heroListTopListPayload)
    fetchOpinionTopList(opinionListPayload)
    fetchSectionComboOne(sectionComboOnePayload)
    fetchSectionComboTwo(sectionComboTwoPayload)
    fetchSectionComboThree(sectionComboThreePayload)
    fetchSectionComboFour(sectionComboFourPayload)
  }, [])


  const onPressArticle = (nid: string) => {
    nid && navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
  }

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
            <ShortArticle data={topListData} onPress={onPressArticle} />
          </View>
        </View>
          :
          <>
            <PodcastWidget />
            <ArticleSection data={heroListData} />
            <ShortArticle data={topListData} onPress={onPressArticle} />
          </>
      }
      <StoryWidget data={storyWidgetData}
        onPress={(item: StoryListProps, index: number) =>
          navigation.navigate(ScreensConstants.StoryScreen,
            { id: item.id, selectedIndex: index }
          )}
      />
      <SectionComboOne data={sectionComboOne} onPress={onPressArticle} sectionId={'726'} />
      <BannerArticleSection data={sectionComboTwo} title={t('latestNewsTab.sectionComboTwo.headerLeft')}  sectionId={'871'}  />
      <Divider style={{ height: normalize(20) }} />
      <AuthorWidget data={opinionList} />
      <BannerArticleSection data={sectionComboThree} title={t('latestNewsTab.sectionComboThree.headerLeft')} sectionId={'11'}  />
      <Divider style={{ height: normalize(20) }} />
      <BannerArticleSection data={sectionComboFour} title={t('latestNewsTab.sectionComboTwo.headerLeft')} sectionId={'10'} />
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
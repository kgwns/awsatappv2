import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  ArticleSection, CarouselSlider, PodcastWidget,
  ShortArticle, StoryWidget, AuthorWidget, BannerArticleSection, ShortArticleProps, StoryListProps
} from 'src/components/organisms'
import { ScreenContainer } from '..'
import { articleSectionData, shortArticleData, shortArticleWithTagData, storyWidgetData } from 'src/constants/SampleData';
import { isTab, normalize } from 'src/shared/utils';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { horizontalEdge } from 'src/shared/utils';
import {useNavigation} from '@react-navigation/native';
import {ScreensConstants} from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';

export const LatestNewsScreen = () => {
  const { themeData } = useTheme()
  const articleData = isTab ? articleSectionData.slice(0,1) : articleSectionData
  const navigation = useNavigation<StackNavigationProp<any>>()
  shortArticleWithTagData.map((item: ShortArticleProps) => item.titleColor = themeData.primaryBlack)

  const renderItem = () => (
    <View>
      <CarouselSlider />
      {
        isTab ? <View style={latestNewsScreenStyle.tabSplitter}>
          <View style={latestNewsScreenStyle.tabWidgetContainer}>
            <ArticleSection data={articleData} />
            <PodcastWidget />
          </View>
          <View style={latestNewsScreenStyle.tabWidgetContainer}>
            <ShortArticle data={shortArticleWithTagData} />
          </View>
        </View>
          :
          <>
            <PodcastWidget />
            <ArticleSection data={articleSectionData} />
            <ShortArticle data={shortArticleWithTagData} />
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
    <ScreenContainer edge={horizontalEdge}>
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
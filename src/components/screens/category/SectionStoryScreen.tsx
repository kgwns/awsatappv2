import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShortArticle, NewsFeed } from '../../organisms'
import { isTab, normalize, screenWidth } from '../../../shared/utils'
import { VideoContent } from 'src/components/organisms/VideoContent'
import { SectionArticleItem, ImageArticle } from 'src/components/molecules';
import { FlatList } from 'react-native-gesture-handler';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { newsFeedData, articleSampleData, videoTabData, shortArticleData } from '../../../constants/SampleData';

export const SectionStoryScreen = () => {
  const { themeData } = useTheme()
  const style = useThemeAwareObject(customStyle);

  const renderItem = () => (
    <View style={{ backgroundColor: themeData.backgroundColor }}>
      <ImageArticle image={articleSampleData.image} title={articleSampleData.title}
        containerStyle={isTab ? style.tabletImageStyle : style.imageStyle} />
      <View style={{ paddingTop: normalize(15), paddingHorizontal: normalize(15) }}>
        <SectionArticleItem
          headerTitle={articleSampleData.title}
          description={articleSampleData.description}
          image={articleSampleData.image}
          imageStyle={{ height: normalize(184), paddingHorizontal: normalize(10) }}
          hideFooter={true}
        />
      </View>
      <ShortArticle data={shortArticleData} />
      <VideoContent data={videoTabData} />
      <NewsFeed data={newsFeedData} />
    </View>
  );
  return (
    <View >
      <FlatList
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ }) => renderItem()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const customStyle = (theme: CustomThemeType) => {
  const sectionStoryStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
    imageStyle: {
      height: 1.05 * screenWidth
    },
    tabletImageStyle: {
      height: 0.5 * screenWidth
    }
  });
  return sectionStoryStyle;
};

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  EditorsPickSection,
  LatestNewsSummarySection,
  PodcastCardSection,
} from 'src/components/organisms';
import {
  EditorsPickSectionData,
  LatestNewsSummarySectionData,
  mostPlayedSectionData,
  podcastCardSectionData,
  PodcastOpinionArticleSectionData,
} from 'src/constants/SampleData';
import MostPlayedSection from 'src/components/organisms/MostPlayedSection';
import {CustomThemeType} from 'src/shared/styles/colors';
import {FlatList} from 'react-native-gesture-handler';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {PodcastOpinionArticleSection} from 'src/components/organisms/PodcastOpinionArticleSection';

export const PodcastScreen = () => {
  const style = useThemeAwareObject(customStyle);
  const renderItem = () => (
    <View>
      <PodcastCardSection data={podcastCardSectionData} />
      <MostPlayedSection data={mostPlayedSectionData} />
      <LatestNewsSummarySection data={LatestNewsSummarySectionData} />
      <EditorsPickSection data={EditorsPickSectionData} />
      <PodcastOpinionArticleSection data={PodcastOpinionArticleSectionData} />
    </View>
  );
  return (
    <View style={style.container}>
      <FlatList
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({}) => renderItem()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionScreenStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
  });
  return OpinionScreenStyle;
};

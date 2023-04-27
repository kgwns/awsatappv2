import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  EditorsPickSection,
  LatestNewsSummarySection,
  PodcastCardProps,
  PodcastCardSection,
} from 'src/components/organisms';
import {
  EditorsPickSectionData,
  LatestNewsSummarySectionData,
  mostPlayedSectionData,
  podcastCardSectionData,
  PodcastOpinionArticleSectionData,
  ScreensConstants,
} from 'src/constants/Constants';
import MostPlayedSection from 'src/components/organisms/MostPlayedSection';
import {CustomThemeType} from 'src/shared/styles/colors';
import {FlatList} from 'react-native-gesture-handler';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {PodcastOpinionArticleSection} from 'src/components/organisms/PodcastOpinionArticleSection';
import {useNavigation} from '@react-navigation/native';

export const PodcastScreen = () => {
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation();
  const onPressItem = (item:PodcastCardProps)=>{
    navigation.navigate(ScreensConstants.PodcastProgram)
  }
  const renderItem = () => (
    <View>
      <PodcastCardSection onPress={(item:PodcastCardProps)=>onPressItem(item)} data={podcastCardSectionData} />
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
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
  });
};

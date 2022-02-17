import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import { ScreenContainer } from '..';
import {PodcastProgramHeader} from 'src/components/molecules';
import Share from 'react-native-share';
import MostPlayedSection from 'src/components/organisms/MostPlayedSection';
import {PodcastEpisodeContent, PodcastEpisodeInfo} from 'src/components/organisms';
import {mostPlayedSectionData, PodcastEpisodeData} from 'src/constants/SampleData';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { normalize, horizontalAndBottomEdge} from 'src/shared/utils';
import { colors } from 'src/shared/styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface PodcastEpisodeProps {
  route: any
}

export const PodcastEpisode = ({route}: PodcastEpisodeProps) => {

  const styles = useThemeAwareObject(createStyles);
  const [isSaved, setIsSaved] = useState(false);
  const insets = useSafeAreaInsets();
  const onPressShare = async () => {
    const { title, imageUrl } = route.params.data
    await Share.open({
        title,
        url: imageUrl,
        failOnCancel: true,
        subject: title
    }).then(response => {
        console.log('Shared successfully :::', response)
    }).catch((error) => {
        console.log('Cancelled share request :::', error)
    })
}

  const renderItem = () => (
    <View >
      <View style={styles.headerStyle}>
        <PodcastProgramHeader
          headerShareIconTestId={'podcast_episode_share'}
          headerBookmarkIconTestId={'podcast_episode_save'}
          headerBackIconTestId={'podcast_episode_back'}
          onPressShare={onPressShare}
          onPressSave={()=>setIsSaved(!isSaved)}
          isSaved={isSaved}
        />
        <PodcastEpisodeInfo data={route.params.data}/>
      </View>
      <View style={styles.container}>
        <PodcastEpisodeContent data={PodcastEpisodeData} onItemActionPress={()=>console.log('item pressed')} />
      </View>
      <MostPlayedSection data={mostPlayedSectionData} />
    </View>
  )
  return (
    <ScreenContainer edge={horizontalAndBottomEdge} barStyle={'light-content'}>
      <View style={{height:insets.top,backgroundColor: colors.black}} />
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

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(15),
    backgroundColor: theme.backgroundColor,
  },
  headerStyle: {
    backgroundColor: colors.black,
  },
})
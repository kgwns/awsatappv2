import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import { ScreenContainer } from '..';
import {PodcastProgramHeader} from 'src/components/molecules';
import Share from 'react-native-share';
import {VideosList, VideoInfo} from 'src/components/organisms';
import {videoTabData, PodcastEpisodeData} from 'src/constants/SampleData';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { normalize, horizontalAndBottomEdge} from 'src/shared/utils';
import { colors } from 'src/shared/styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface VideoDetailScreenProps {
  route: any
}

export const VideoDetailScreen = ({route}: VideoDetailScreenProps) => {

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
          headerShareIconTestId={'video_detail_share'}
          headerBookmarkIconTestId={'video_detail_save'}
          headerBackIconTestId={'video_detail_back'}
          onPressShare={onPressShare}
          onPressSave={()=>setIsSaved(!isSaved)}
          isSaved={isSaved}
          isCloseIcon
        />
        <VideoInfo data={route.params.data}/>
      </View>
      <View style={styles.container}>
        <VideosList data={videoTabData} onItemActionPress={()=>console.log('item pressed')} />
      </View>
    </View>
  )
  return (
    <ScreenContainer edge={horizontalAndBottomEdge} barStyle={'light-content'}>
      <View style={{height:insets.top,backgroundColor: colors.black}} />
      <FlatList
        style={{ flex: 1, height: '100%' }}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => renderItem()}
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
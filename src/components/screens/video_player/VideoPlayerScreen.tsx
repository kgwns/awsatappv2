import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { VideoPlayerComponent } from 'src/components/molecules';
import { useNavigation } from '@react-navigation/native';
export interface VideoPlayerScreenProps {
  route: any
}

export const VideoPlayerScreen = ({route}: VideoPlayerScreenProps) => {

  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const goBack = () =>{
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <VideoPlayerComponent url={route.params.videoUrl} goBack={goBack}/>
    </View>
  )
}

const createStyles = () =>
StyleSheet.create({
  container: {
    flex: 1,
  },
})
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { ScreenContainer } from '..';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { normalize } from 'src/shared/utils';
import { VideoPlayer } from 'src/components/molecules';
import { useNavigation } from '@react-navigation/native';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { Edge } from 'react-native-safe-area-context';
import { horizontalEdge } from 'src/shared/utils';

export interface VideoPlayerScreenProps {
  route: any
}

export const VideoPlayerScreen = ({route}: VideoPlayerScreenProps) => {

  const styles = useThemeAwareObject(createStyles);
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge)
  const navigation = useNavigation();

  const goBack = () =>{
    navigation.goBack();
  }

  useEffect(() => {
    Orientation.unlockAllOrientations()
    Orientation.getDeviceOrientation(updateScreenEdge)
    Orientation.addDeviceOrientationListener(updateScreenEdge)
    return () => {
      Orientation.lockToPortrait()
      Orientation.removeOrientationListener(updateScreenEdge)
    }
  }, [])

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    const edge = getScreenEdge(deviceOrientation)
    setEdge(edge)
  }


  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT': return ['right']
      case 'LANDSCAPE-RIGHT': return ['left']
      case 'PORTRAIT': return horizontalEdge
      default: return horizontalEdge
    }
  }

  return (
    <ScreenContainer edge={edge}>
      <View style={styles.container}>
        <VideoPlayer url={route.params.videoUrl} goBack={goBack}/>
      </View>
    </ScreenContainer>
  )
}

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  container: {
    flex: 1,
  },
})
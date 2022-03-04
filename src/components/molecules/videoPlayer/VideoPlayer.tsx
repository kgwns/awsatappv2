import React, {FunctionComponent, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import Video from 'react-native-video';
import {colors} from 'src/shared/styles/colors';

export interface VideoPlayerProps {
  goBack?: () => void;
  testID?: string;
  url: string;
}
export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  goBack,
  testID,
  url,
}) => {

  const styles = useThemeAwareObject(createStyles);
  const videoPlayer = useRef(null);
  const [isPaused, setIsPaused] = useState(true)

  const goBackToScreen = () =>{
    console.log('error')
    if(goBack){
      goBack()
    }
  }
  const onLoadStart = (data:any) => {
    setIsPaused(false)
    console.log(data,'load start');
  };
  const onLoad = (data:any) => {
    console.log(data,'load success');
  };
  const onBuffer = (data:any) => {
    console.log(data,'buffering');
  };
  return (
    <View style={styles.container}>
      <Video source={{uri:url}}
        // repeat={true}
        controls={true}
        resizeMode={'contain'}
        fullscreen={false}
        testID={testID}
        accessibilityLabel={testID}
        ref={videoPlayer}
        style={styles.videoStyles}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onError={goBackToScreen}
        onBuffer={onBuffer}
        paused={isPaused}
        ignoreSilentSwitch="ignore"
      />
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: 'green',
    },
    videoStyles: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height*0.35,
      backgroundColor: colors.white,
    }
  });

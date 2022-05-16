import * as React from 'react';
import { View, requireNativeComponent } from 'react-native';

interface DownloadNewsProps {}

export const DownloadNews = (props: DownloadNewsProps) => {
  return (
    <View style={{flex: 1}}>
      <PSPDFView />
    </View>
  );
};

const PSPDFView = requireNativeComponent('SampleViewController')
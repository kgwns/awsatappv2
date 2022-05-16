import * as React from 'react';
import { Text, View, requireNativeComponent } from 'react-native';

interface DownloadNewsProps {}

export const DownloadNews = (props: DownloadNewsProps) => {
  return (
    <View>
      <Text>DownloadNews</Text>
      <PSPDFView />
    </View>
  );
};

const PSPDFView = requireNativeComponent('SampleViewController')
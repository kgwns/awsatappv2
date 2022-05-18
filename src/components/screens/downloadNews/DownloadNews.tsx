import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import {requireNativeComponent} from 'react-native'
import { ScreensConstants } from 'src/constants';


const NativeView: any = requireNativeComponent('SampleViewController');

export const DownloadNews = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const onClickOpenPDF = (selectedPDF: any) => {
      navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, {selectedPDF: selectedPDF})
  }

  return (
      <NativeView style={{ flex: 1 }}
          onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}
      />
  );
};

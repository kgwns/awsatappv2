import * as React from 'react';
import { requireNativeComponent } from 'react-native';

const Props = {
  style: { flex: 1 }
}

const PDFView = requireNativeComponent('SampleViewController')

export const DownloadNews = () => {
  return (
    <PDFView {...Props} />
  );
};

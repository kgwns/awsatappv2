import * as React from 'react';
import {requireNativeComponent} from 'react-native'

const NativeView = requireNativeComponent('SampleViewController');

const PDFDownloadView = () => {
    return (
        <NativeView style={{flex: 1}}/>
    );
}

export default PDFDownloadView;
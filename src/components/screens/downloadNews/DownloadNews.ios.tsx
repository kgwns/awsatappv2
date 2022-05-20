import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { requireNativeComponent } from 'react-native'
import { ScreensConstants } from 'src/constants';

const NativeView: any = requireNativeComponent('RNTodayTabView');

export const DownloadNewsIOS = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()

    const onClickOpenPDF = (selectedPDF: any) => {
        navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, { selectedPDF: selectedPDF })
    }

    const onClickArchive = () => {
        navigation.navigate(ScreensConstants.PDFArchive)
    }

    return (
        <NativeView style={{ flex: 1 }}
            onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}
            onArchiveButtonClick={onClickArchive}
        />
    );
};

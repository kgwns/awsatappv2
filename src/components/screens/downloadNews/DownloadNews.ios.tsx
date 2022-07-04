import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { requireNativeComponent } from 'react-native'
import { ScreensConstants } from 'src/constants';
import { ScreenContainer } from 'src/components/screens/ScreenContainer/ScreenContainer';
import { horizontalEdge } from 'src/shared/utils/utilities';

const NativeView: any = requireNativeComponent('RNTodayTabView');

export const DownloadNewsIOS = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const isActive = useIsFocused();

    const onClickOpenPDF = (selectedPDF: any) => {
        navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, { selectedPDF: selectedPDF })
    }

    const onClickArchive = () => {
        navigation.navigate(ScreensConstants.PDFArchive)
    }

    return (
        <ScreenContainer edge={horizontalEdge}>
            <NativeView style={{ flex: 1 }}
                onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}
                onArchiveButtonClick={onClickArchive}
                isActive={isActive}
            />
        </ScreenContainer>
    );
};

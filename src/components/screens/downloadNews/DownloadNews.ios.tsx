import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ScreensConstants } from 'src/constants/Constants';
import { ScreenContainer } from 'src/components/screens/ScreenContainer/ScreenContainer';
import { getFullDate, horizontalEdge } from 'src/shared/utils/utilities';
import { getRequiredNativeComponent } from 'src/shared/utils/NativeComponent';
import { recordLogEvent } from 'src/shared/utils';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export const NativeView: any = getRequiredNativeComponent('RNTodayTabView');

export const DownloadNewsIOS = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const isActive = useIsFocused();

    const style = useThemeAwareObject(customStyle);

    const onClickOpenPDF = (selectedPDF: any) => {
        navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, { selectedPDF })
    }

    const onClickArchive = () => {
        navigation.navigate(ScreensConstants.PDFArchive)
    }

    const handleDownloadComplete = (downloadedPdf:any) => {
        const createdDate = getFullDate(downloadedPdf.issueDate * 1000);
        recordLogEvent(AnalyticsEvents.TODAY_COPY_DOWNLOAD,{newspaper_date: createdDate});
    }

    return (
        <ScreenContainer edge={horizontalEdge}>
            <NativeView style={style.container}
                onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}
                onArchiveButtonClick={onClickArchive}
                isActive={isActive}
                onDownloadComplete = {(data:any) => handleDownloadComplete(data.nativeEvent.DownloadedPdf)}
            />
        </ScreenContainer>
    );
};
const customStyle = () => StyleSheet.create({
    container: {
        flex: 1
    }
  })

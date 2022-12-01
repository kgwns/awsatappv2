import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ScreensConstants } from 'src/constants/Constants';
import { ScreenContainer } from 'src/components/screens/ScreenContainer/ScreenContainer';
import { horizontalEdge } from 'src/shared/utils/utilities';
import { getRequiredNativeComponent } from 'src/shared/utils/NativeComponent';

export const NativeView: any = getRequiredNativeComponent('RNTodayTabView');

export const DownloadNewsIOS = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const isActive = useIsFocused();

    const style = useThemeAwareObject(customStyle);

    const onClickOpenPDF = (selectedPDF: any) => {
        navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, { selectedPDF: selectedPDF })
    }

    const onClickArchive = () => {
        navigation.navigate(ScreensConstants.PDFArchive)
    }

    return (
        <ScreenContainer edge={horizontalEdge}>
            <NativeView style={style.container}
                onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}
                onArchiveButtonClick={onClickArchive}
                isActive={isActive}
            />
        </ScreenContainer>
    );
};
const customStyle = () => StyleSheet.create({
    container: {
        flex: 1
    }
  })
